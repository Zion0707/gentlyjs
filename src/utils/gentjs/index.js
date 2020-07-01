/**
 *  gentjs （canvas 2d 类库）
 *
 * */

//  ---------------------------- 全局变量 start -----------------------------------
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
let globalCanvas = null; //canvas
let globalCtx = null; //cavnas ctx
let globalAllList = []; //所有节点存放处
//  ---------------------------- 全局变量 end -----------------------------------

//  ---------------------------- 全局方法 start -----------------------------------
/**
 * 获取所传入的参数，并返回参数数组
 * @param { type: any, desc: 传入的参数 } args
 */
const getArgsArr = args => {
    // 获得所有传入的参数，如果第一个参数是数组的话，那么就直接取第一个数组参数作为循环对象
    if (args.length === 0) return;
    let argArr = [];
    if (args[0] instanceof Array) {
        argArr = args[0];
    } else {
        for (let i = 0, len = args.length; i < len; i++) {
            argArr.push(args[i]);
        }
    }
    return argArr;
};
/**
 * 根据传入的参数，返回数据类型
 * @param { type: any, desc: 传入的单个参数 } arg
 * */
const getArgsType = arg => {
    switch (Object.prototype.toString.call(arg)) {
        case '[object String]':
            return 'String';
        case '[object Number]':
            return 'Number';
        case '[object Boolean]':
            return 'Boolean';
        case '[object Object]':
            return 'Object';
        case '[object Array]':
            return 'Array';
        case '[object Undefined]':
            return 'Undefined';
        case '[object Null]':
            return 'Null';
        case '[object Date]':
            return 'Date';
        case '[object HTMLDocument]':
            return 'HTMLDocument';
        case '[object global]':
            return 'window';
        default:
    }
};

/**
 * 根据传入的数值，生成随机字符串id
 * @param {type: number, desc: 随机数长度} num
 */

const randomRangeId = num => {
    var returnStr = '',
        charStr =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < num; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return returnStr;
};

const clearCanvas = beforeItem => {
    globalAllList.map(item => {
        if (JSON.stringify(beforeItem) === JSON.stringify(item)) {
            return item;
        }
        return item;
    });

    console.log(globalAllList);
    globalCtx.clearRect(
        0,
        0,
        globalCanvas.getAttribute('width'),
        globalCanvas.getAttribute('height')
    );
};

/**
 *
 * @param ctx 2d上下文对象
 * @param options 全部参数
 * 参考网址：https://blog.csdn.net/aassdffgdhbdb/article/details/88610317
 */
function textEllipsis(ctx, groupLeft, groupTop, options) {
    let params = Object.assign({}, options);
    // 转换成真是距离
    params.left = groupLeft + params.left;
    params.top = groupTop + params.top + parseInt(options.fontSize) / 2;

    // 分割文本
    let textArr = params.text.split('');
    // 文本最终占据高度
    let textHeight = 0;
    // 每行显示的文字
    let textOfLine = '';
    // 控制行数
    let limitRow = params.rows;
    let rowCount = 0;

    // 循环分割的文字数组
    for (let i = 0; i < textArr.length; i++) {
        // 获取单个文字或字符
        let singleWord = textArr[i];
        // 连接文字
        let connectText = textOfLine + singleWord;
        // 计算接下来要写的是否是最后一行
        let isLimitRow = limitRow ? rowCount === limitRow - 1 : false;
        // 最后一行则显示省略符,否则显示连接文字
        let measureText = isLimitRow ? connectText + '...' : connectText;
        // 设置字体并计算宽度,判断是否存在首行缩进
        ctx.font = `${params.fontSize}px ${params.fontWeight} ${params.fontFamily}`;
        let width = ctx.measureText(measureText).width;
        // 首行需要缩进满足条件
        let conditionIndent = params.textIndent && rowCount === 0;
        let measureWidth = conditionIndent ? width + params.textIndent : width;
        // 大于限制宽度且已绘行数不是最后一行，则写文字
        if (measureWidth > params.width && i > 0 && rowCount !== limitRow) {
            // 如果是最后一行，显示计算文本
            let canvasText = isLimitRow ? measureText : textOfLine;
            let xPos = conditionIndent
                ? params.left + params.textIndent
                : params.left;
            let yPos = params.top + params.lineHeight / 2;

            // 写文字
            if (params.fillColor) {
                ctx.fillStyle = params.fillColor;
                ctx.fillText(canvasText, xPos, yPos);
            }
            if (params.strokeColor) {
                ctx.strokeStyle = params.strokeColor;
                ctx.strokeText(canvasText, xPos, yPos);
            }
            // 下一行文字
            textOfLine = singleWord;
            // 记录下一行位置
            params.top += params.lineHeight;
            // 计算文本高度
            textHeight += params.lineHeight;
            rowCount++;
            if (isLimitRow) {
                break;
            }
        } else {
            // 不大于最大宽度
            textOfLine = connectText;
        }
    }
    if (rowCount !== limitRow) {
        let xPos =
            params.textIndent && rowCount === 0
                ? params.left + params.textIndent
                : params.left;
        let yPos = params.top + params.lineHeight / 2;
        if (params.fillColor) {
            ctx.fillStyle = params.fillColor;
            ctx.fillText(textOfLine, xPos, yPos);
        }
        if (params.strokeColor) {
            ctx.strokeStyle = params.strokeColor;
            ctx.strokeText(textOfLine, xPos, yPos);
        }
    }

    // 计算文字总高度
    let textHeightVal =
        rowCount < limitRow ? textHeight + params.lineHeight : textHeight;
    return textHeightVal;
}

//  ---------------------------- 全局方法 end -----------------------------------

/**
 * class Gent
 * 通用类，集成了通用功能
 * */
class Gent {
    // Rect矩形 - 绘制
    _gentRectDraw(item) {
        const _self = this;
        const {
            left: itemLeft,
            top: itemTop,
            width: itemWidth,
            height: itemHeight,
            lineWidth: itemLineWidth,
            strokeColor: itemStrokeColor,
            fillColor: itemFillColor,
        } = item;

        let groupLeft = 0;
        let groupTop = 0;
        if (_self.type === 'Group') {
            groupLeft = _self.left;
            groupTop = _self.top;
        }
        const realLeft = groupLeft + itemLeft;
        const realTop = groupTop + itemTop;

        // 绘制开始
        globalCtx.beginPath();
        globalCtx.lineWidth = itemLineWidth;
        // 描边矩形
        if (itemStrokeColor) {
            globalCtx.strokeStyle = itemStrokeColor;
            globalCtx.strokeRect(realLeft, realTop, itemWidth, itemHeight);
            // console.log(itemStrokeColor);
        }
        // 填充矩形
        if (itemFillColor) {
            globalCtx.fillStyle = itemFillColor;
            globalCtx.fillRect(realLeft, realTop, itemWidth, itemHeight);
            // console.log(itemFillColor);
        }
    }
    // Label文本 - 绘制
    _gentLabelDraw(item) {
        const _self = this;
        let groupLeft = 0;
        let groupTop = 0;
        if (_self.type === 'Group') {
            groupLeft = _self.left;
            groupTop = _self.top;
        }
        
        textEllipsis(
            globalCtx,
            groupLeft,
            groupTop,
            item
        );
    }

    // 重新绘制方法
    _redraw(beforeItem) {
        const _self = this;
        // 先清除画布，再把之前的元素记录拿出来
        clearCanvas(beforeItem);
        // 根据类型重新绘制
        globalAllList.forEach(item => {
            switch (item.type) {
                case 'Rect':
                    _self._gentRectDraw(item);
                    break;
                case 'Label':
                    // console.log(item);
                    _self._gentLabelDraw(item);
                    break;
                default:
            }
        });
        // console.log(globalAllList);
    }

    // 添加元素方法
    append() {
        const _self = this;
        if (_self.type === 'Group' || _self.type === 'Scene') {
            const argArr = getArgsArr(arguments);
            // 对传入的元素进行判断处理并绘制
            argArr.forEach(item => {
                // console.log(argArr);
                switch (item.type) {
                    case 'Rect':
                        _self._gentRectDraw(item);
                        break;
                    case 'Label':
                        // console.log(item);
                        _self._gentLabelDraw(item);
                        break;
                    default:
                }
                globalAllList.push(item);
            });
        }
    }

    // 获取或设置属性值
    attr() {
        let beforeItem = Object.assign({}, this);
        if (arguments.length === 0) {
            return;
        } else if (getArgsType(arguments[0]) === 'String') {
            // 如果传入的是字符串，那么返回对应的值，是get的方式
            return this[arguments[0]];
        } else if (getArgsType(arguments[0]) === 'Object') {
            // 如果传入的是对象，那么设置对应的值，是set的方式
            // console.log(arguments[0]);
            for (let item in arguments[0]) {
                // console.log(item);
                this[item] = arguments[0][item];
            }
        }
        // 属性更改之后，先把画布中的元素，需要重新渲染画布
        this._redraw(beforeItem);
    }
}

/**
 * class Label
 * Label 绘制一段文本。
 * */
class Label extends Gent {
    constructor(argObj) {
        super();
        const def = {
            text: '',
            left: 0,
            top: 0,
            width: 100, //限制宽度即可垂直显示
            fontSize: 14,
            lineHeight: 14,
            fontFamily: 'sans-serif',
            fontWeight: 'normal', //字体粗细
            strokeColor: '',
            fillColor: '#000000',
            textAlign: 'left',
            verticalAlign: 'middle',
            rows: 1000, // 限制行数
            textIndent: 0, //首行缩进
            type: 'Label', //标识，为了好区分
            id: randomRangeId(20), //生成随机id，唯一标识
        };
        const config = Object.assign(def, argObj);

        // 把参数暴露出去
        for (let item in config) {
            this[item] = config[item];
        }
    }
    // 重载继承
    append() {}
}

/**
 * class Scene
 * 场景对象 (相当于一个舞台，所有要显示的元素都放置在舞台中呈现)
 * */
class Scene extends Gent {
    constructor(argObj) {
        super();

        const def = {
            el: '', //id元素 (type: el, def: 空字符串)
            width: winWidth, //canvas宽度  (type: number, def: 0px)
            height: winHeight, //canvas高度  (type: number, def: 0px)
            type: 'Scene', //标识，为了好区分
        };
        const config = Object.assign(def, argObj);
        const { el, width, height } = config;
        if (el === '' || el.getAttribute('id') === null) {
            console.error('请传入id元素');
        }
        // 创建新的canvas
        const canvas = document.createElement('canvas');
        globalCanvas = canvas;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        const ctx = canvas.getContext('2d');
        el.appendChild(canvas);

        // 赋值操作
        this.ctx = globalCtx = ctx;
        for (let item in config) {
            this[item] = config[item];
        }
    }
}

/**
 * class Group
 * Group 元素创建一个分组。
 * */
class Group extends Gent {
    constructor(argObj) {
        super();
        const def = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            type: 'Group', //标识，为了好区分
            name: '', //设定元素的name
            id: randomRangeId(20), //生成随机id，唯一标识
        };

        const config = Object.assign(def, argObj);
        const { left, top, width, height } = config;
        globalCtx.beginPath();
        globalCtx.fillRect(left, top, width, height);

        for (let item in config) {
            this[item] = config[item];
        }
    }
}

/**
 * class Rect
 * Rect 元素可以绘制一个矩形。
 * */
class Rect extends Gent {
    constructor(argObj) {
        super();
        const def = {
            left: 0, // 元素左边距离 (type: number, def: 0px)
            top: 0, // 元素右边距离 (type: number, def: 0px)
            width: 0, // 矩形宽度 (type: number, def: 0px)
            height: 0, // 矩形高度 (type: number, def: 0px)
            lineWidth: 0, //描边宽度 (type: number, def: 1px)
            strokeColor: '', //描边颜色 (type: color, def: 空字符串)
            fillColor: '', //填充颜色 (type: color, def:  空字符串)
            type: 'Rect', //标识，为了好区分
            name: '', //设定元素的name
            show: true, //控制元素显示隐藏
            id: randomRangeId(20), //生成随机id，唯一标识
        };
        const config = Object.assign(def, argObj);

        // 把参数暴露出去
        for (let item in config) {
            this[item] = config[item];
        }
    }
    // 重载继承
    append() {}
}

export { Scene, Rect, Group, Label };
