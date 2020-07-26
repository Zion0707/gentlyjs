/**
 * @param {type: number, desc: 当前点击的图片索引} imgIndex
 * @param {type: array, desc: 传入的图片列表，结构也应该是[{bigUrl:'imgUrl', alt:'图片描述'}]} imgs
 * @param {type: string, desc: 弹框显示出来的大图} bigUrl
 * @param {type: string, desc: 默认显示的小图片} url
 * @param {type: string, desc: 图片描述} alt
 * @param {type: object, desc: 操作按钮显示，默认都显示，如果对象中指定哪个按钮为false那么表示不显示, 
    example : {
        toSmall: bool,  //缩小按钮是否显示
        toBig: bool,   //放大按钮是否显示
        turnLeft: bool, //左转按钮是否显示
        turnRight: bool  //右转按钮是否显示
        close: bool, //关闭按钮是否显示
        esc: bool, //键盘中的esc键事件是否触发
        mousewheel: bool, // 鼠标滚轮事件是否触发
    }} tool
 *
 * 示例: @example
 *  <PhotoPreview 
 *      bigUrl={item.bigUrl} 
 *      url={item.url} 
 *      alt={item.alt} 
 *      tool={{ turnLeft: false, turnRight: false }} 
 *   />
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@/less/components/photo-preview.less';

class PhotoPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigUrl: props.bigUrl === '' ? props.url : props.bigUrl,
            tool: Object.assign(PhotoPreview.defaultProps.tool, props.tool),
            imgIndex: props.imgIndex,
            imgs: props.imgs,

            loadEl: true, // loading元素显示隐藏
            figureEl: false, // 生成图片预览元素
            imgOriginalWidth: 0, // 当前大图默认宽度值
            imgOriginalHeight: 0, // 当前大图默认高度值
            imgAttr: {
                // 大图的地址及描述
                src: '',
                alt: '',
            },
            imgParentStyle: {
                // 大图父级div元素样式
                width: '0px',
                height: '0px',
            },
            rotateDeg: 0, // 图片旋转角度
            increaseNum: 20, // 图片放大时距离空隙
        };

        // 获取相关元素
        this.bigImgRef = React.createRef();
        this.ppiRef = React.createRef();
    }

    // 预览图片超出window宽或高的处理
    beyondWindow = () => {
        const { imgParentStyle, rotateDeg, increaseNum } = this.state;
        const iWidth = parseFloat(imgParentStyle.width);
        const iHeight = parseFloat(imgParentStyle.height);
        let ips = imgParentStyle;
        if (rotateDeg % 360 === 90 || rotateDeg % 360 === 270) {
            if (iHeight > window.innerWidth) {
                ips = { ...ips, left: `${(iHeight - iWidth) / 2 + increaseNum}px` };
            } else {
                ips = { ...ips, left: 'auto' };
            }
            if (iWidth > window.innerHeight) {
                ips = { ...ips, top: `${(iWidth - iHeight) / 2 + increaseNum}px` };
            } else {
                ips = { ...ips, top: 'auto' };
            }
        } else {
            if (iWidth > window.innerWidth) {
                ips = { ...ips, left: `${increaseNum}px` };
            } else {
                ips = { ...ips, left: 'auto' };
            }
            if (iHeight > window.innerHeight) {
                ips = { ...ips, top: `${increaseNum}px` };
            } else {
                ips = { ...ips, top: 'auto' };
            }
        }
        this.setState({
            imgParentStyle: ips,
        });
    };

    // 图片缩小事件
    toSmallEvent = () => {
        const { tool, imgParentStyle, imgOriginalWidth, imgOriginalHeight } = this.state;
        if (tool.toSmall === false) {
            return;
        }
        let width = parseFloat(imgParentStyle.width) / 1.5;
        let height = parseFloat(imgParentStyle.height) / 1.5;
        // 图片缩小不能超过5倍
        if (width < imgOriginalWidth / 5) {
            width = imgOriginalWidth / 5;
            height = imgOriginalHeight / 5;
        }
        this.setState(
            {
                imgParentStyle: Object.assign(imgParentStyle, { width: `${width}px`, height: `${height}px` }),
            },
            () => {
                this.beyondWindow();
            }
        );
    };

    // 图片放大事件
    toBigEvent = () => {
        const { tool, imgParentStyle, imgOriginalWidth, imgOriginalHeight } = this.state;
        if (tool.toBig === false) {
            return;
        }
        let width = parseFloat(imgParentStyle.width) * 1.5;
        let height = parseFloat(imgParentStyle.height) * 1.5;
        // 图片放大不能超过5倍
        if (width > imgOriginalWidth * 5) {
            width = imgOriginalWidth * 5;
            height = imgOriginalHeight * 5;
        }
        this.setState(
            {
                imgParentStyle: Object.assign(imgParentStyle, { width: `${width}px`, height: `${height}px` }),
            },
            () => {
                this.beyondWindow();
            }
        );
    };

    // 向左旋转事件
    turnLeftEvent = () => {
        const { tool, rotateDeg, imgParentStyle } = this.state;
        if (tool.turnLeft === false) {
            return;
        }
        const iRotateDeg = rotateDeg - 90;
        this.setState(
            {
                imgParentStyle: Object.assign(imgParentStyle, { transform: `rotate(${iRotateDeg}deg)` }),
                rotateDeg: iRotateDeg,
            },
            () => {
                this.beyondWindow();
            }
        );
    };

    // 向右旋转事件
    turnRightEvent = () => {
        const { tool, rotateDeg, imgParentStyle } = this.state;
        if (tool.turnRight === false) {
            return;
        }
        const iRotateDeg = rotateDeg + 90;
        this.setState(
            {
                imgParentStyle: Object.assign(imgParentStyle, { transform: `rotate(${iRotateDeg}deg)` }),
                rotateDeg: iRotateDeg,
            },
            () => {
                this.beyondWindow();
            }
        );
    };

    // 上一张图片
    goLeftEvent = () => {
        const { imgIndex, imgs, loadEl } = this.state;
        // 如果还在loading加载中，不予许上一张下一张操作
        if (loadEl) {
            return;
        }
        const nImgIndex = imgIndex - 1;
        // console.log(nImgIndex);
        if (nImgIndex < 0) {
            return;
        }
        this.setState(
            {
                imgIndex: nImgIndex,
                rotateDeg: 0,
                imgParentStyle: {
                    width: '0px',
                    height: '0px',
                },
            },
            () => {
                this.photoShow(imgs[nImgIndex].bigUrl, imgs[nImgIndex].alt, false);
            }
        );
    };

    // 下一张图片
    goRightEvent = () => {
        const { imgIndex, imgs, loadEl } = this.state;
        // 如果还在loading加载中，不予许上一张下一张操作
        if (loadEl) {
            return;
        }
        const nImgIndex = imgIndex + 1;
        // console.log(nImgIndex);
        if (nImgIndex > imgs.length - 1) {
            return;
        }
        this.setState(
            {
                imgIndex: nImgIndex,
                rotateDeg: 0,
                imgParentStyle: {
                    width: '0px',
                    height: '0px',
                },
            },
            () => {
                // 如果不存在大图，那么直接拿小图代替。
                const bigUrl = imgs[nImgIndex].bigUrl || imgs[nImgIndex].url;
                this.photoShow(bigUrl, imgs[nImgIndex].alt);
            }
        );
    };

    // 关闭事件
    closeEvent = () => {
        // 恢复到默认值
        const { imgIndex, imgs } = this.props;
        this.setState({
            imgIndex,
            imgs,
            figureEl: false,
            rotateDeg: 0,
            imgParentStyle: {
                width: '0px',
                height: '0px',
            },
        });
        window.removeEventListener('mousewheel', this._psMousewheelEvent);
        window.removeEventListener('keydown', this._psKeydownEvent);
        window.removeEventListener('resize', this._psWindowResize);
        document.body.removeAttribute('photo-preview-show');
    };

    //大图被执行拖拽操作
    bigImgMouseDown = (event) => {
        event.preventDefault();
        const ppiEl = this.ppiRef.current;
        const bigImgEl = this.bigImgRef.current;
        let diffX = event.clientX - bigImgEl.offsetLeft;
        let diffY = event.clientY - bigImgEl.offsetTop;
        // 鼠标移动的时候
        bigImgEl.onmousemove = (event) => {
            let moveX = parseFloat(event.clientX - diffX);
            let moveY = parseFloat(event.clientY - diffY);
            let mx = moveX > 0 ? -moveX : Math.abs(moveX);
            let my = moveY > 0 ? -moveY : Math.abs(moveY);
            let sl = ppiEl.scrollLeft + mx * 0.1;
            let sr = ppiEl.scrollTop + my * 0.1;
            if (sl <= 0) {
                sl = 0;
            } else if (sl >= ppiEl.scrollWidth - ppiEl.clientWidth) {
                sl = ppiEl.scrollWidth - ppiEl.clientWidth;
            }
            if (sr <= 0) {
                sr = 0;
            } else if (sr >= ppiEl.scrollHeight - ppiEl.clientHeight) {
                sr = ppiEl.scrollHeight - ppiEl.clientHeight;
            }
            ppiEl.scrollTo(sl, sr);
        };
        // 鼠标抬起的时候
        bigImgEl.onmouseup = () => {
            bigImgEl.onmousemove = null;
            bigImgEl.onmouseup = null;
        };
        // 鼠标离开的时候
        bigImgEl.onmouseout = () => {
            bigImgEl.onmousemove = null;
            bigImgEl.onmouseup = null;
        };
    };

    // 鼠标滚轮事件
    _psMousewheelEvent = (event) => {
        // event.preventDefault();
        const { figureEl, tool } = this.state;
        if (figureEl && tool.mousewheel) {
            if (event.wheelDelta > 0) {
                this.toBigEvent();
            } else {
                this.toSmallEvent();
            }
        }
    };

    // 键盘按下事
    _psKeydownEvent = (event) => {
        const { figureEl, tool } = this.state;
        if (event.keyCode === 27 && tool.esc && figureEl) {
            this.closeEvent();
        }
    };

    // 窗口发生改变的时候
    _psWindowResize = () => {
        const { figureEl } = this.state;
        if (figureEl) {
            this.beyondWindow();
        }
    };

    // 图片展示
    photoShow = (url, alt, winEventToggle) => {
        // 图片加载并处理
        this.setState({
            loadEl: true,
            figureEl: true,
        });
        const img = new Image();
        img.src = url;
        img.onload = async () => {
            this.setState(
                {
                    loadEl: false,
                    imgOriginalWidth: img.width,
                    imgOriginalHeight: img.height,
                    imgAttr: {
                        src: url,
                        alt,
                    },
                    imgParentStyle: {
                        width: `${img.width}px`,
                        height: `${img.height}px`,
                    },
                },
                () => {
                    this.beyondWindow();
                }
            );
        };

        // 是否需再次执行window事件
        const wev = winEventToggle || true;
        if (wev) {
            // console.log('wev');
            // window触发事件
            window.addEventListener('mousewheel', this._psMousewheelEvent);
            window.addEventListener('keydown', this._psKeydownEvent);
            window.addEventListener('resize', this._psWindowResize);
            document.body.setAttribute('photo-preview-show', 'true');
        }
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        console.log(`new-props:${newProps.nImgIndex}`);
    }

    render() {
        const { alt, url } = this.props;
        const { bigUrl, tool, figureEl, loadEl, imgAttr, imgParentStyle, imgIndex, imgs, increaseNum } = this.state;
        const iParentStyle = { ...imgParentStyle };
        const iSpanStyle = {
            width: `${parseFloat(imgParentStyle.width) + increaseNum * 2}px`,
            height: `${parseFloat(imgParentStyle.height) + increaseNum * 2}px`,
        };
        return (
            <>
                <img
                    onClick={this.photoShow.bind(this, bigUrl, alt)}
                    src={url}
                    alt={alt}
                    className="photo-preview__thumb-img"
                />
                {figureEl
                    ? ReactDOM.createPortal(
                          <>
                              <figure className="photo-preview">
                                  <div className="photo-preview__in" ref={this.ppiRef}>
                                      {loadEl ? (
                                          <div className="photo-preview__loading"></div>
                                      ) : (
                                          <div className="photo-preview__img-wrap" style={iParentStyle}>
                                              <span
                                                  className="photo-preview__img-placeholder"
                                                  style={{
                                                      ...iSpanStyle,
                                                      marginLeft: `-${increaseNum}px`,
                                                      marginTop: `-${increaseNum}px`,
                                                  }}
                                              ></span>
                                              <img
                                                  src={imgAttr.src}
                                                  alt={imgAttr.alt}
                                                  onMouseDown={this.bigImgMouseDown}
                                                  ref={this.bigImgRef}
                                              />
                                          </div>
                                      )}
                                      <div className="photo-preview__tool">
                                          {tool.toSmall ? (
                                              <i className="iconfont icon-to-small" onClick={this.toSmallEvent}></i>
                                          ) : null}
                                          {tool.toBig ? (
                                              <i className="iconfont icon-to-big" onClick={this.toBigEvent}></i>
                                          ) : null}
                                          {tool.turnLeft ? (
                                              <i className="iconfont icon-turn-left" onClick={this.turnLeftEvent}></i>
                                          ) : null}
                                          {tool.turnRight ? (
                                              <i className="iconfont icon-turn-right" onClick={this.turnRightEvent}></i>
                                          ) : null}

                                          {imgIndex !== '' && imgs.length > 1 ? (
                                              <>
                                                  <i
                                                      className="iconfont icon-go-left"
                                                      onClick={this.goLeftEvent}
                                                      data-disable={loadEl ? 'true' : 'false'}
                                                  ></i>
                                                  <i
                                                      className="iconfont icon-go-right"
                                                      onClick={this.goRightEvent}
                                                      data-disable={loadEl ? 'true' : 'false'}
                                                  ></i>
                                              </>
                                          ) : null}

                                          {tool.close ? (
                                              <i className="iconfont icon-close" onClick={this.closeEvent}></i>
                                          ) : null}
                                      </div>
                                  </div>
                              </figure>
                          </>,
                          document.body
                      )
                    : null}
            </>
        );
    }
}

PhotoPreview.defaultProps = {
    bigUrl: '',
    alt: '',
    tool: {
        toSmall: true, // 缩小按钮
        toBig: true, // 放大按钮
        turnLeft: true, // 左转按钮
        turnRight: true, // 右转按钮
        close: true, // 关闭按钮
        esc: true, // esc键触发
        mousewheel: true, // 鼠标滚轮事件是否触发
    },
    imgIndex: '',
    imgs: [],
};
PhotoPreview.propTypes = {
    bigUrl: PropTypes.string,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    tool: PropTypes.object,
    imgIndex: PropTypes.number,
    imgs: PropTypes.array,
};
export default PhotoPreview;
