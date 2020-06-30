/**
 *  gentjs （canvas 2d 类库，简化原生canvas写法）
 *  作者：Zion0707
 *  联系方式：346445684@qq.com
 *  日期：2020/06/30
 * 
 *  代码格式：
 * `受保护的属性通常以下划线_为前缀。`
 *
 * */

//  全局变量
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
let globalCtx = null;

// 全局方法
const getArgsArr=(args)=>{
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
}

/**
 * class Gent
 * 通用类，集成了通用功能
 * */
const _gentRectDraw = Symbol('_gentRectDraw');
class Gent {
    // Rect矩形 - 绘制（私有）
    [_gentRectDraw](item) {
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
        if(_self.type==='Group'){
            groupLeft = _self.left;
            groupTop = _self.top;
        }

        globalCtx.beginPath();
        globalCtx.lineWidth = itemLineWidth;

        const realLeft = groupLeft + itemLeft;
        const realTop = groupTop + itemTop;
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
    // 添加元素方法（公共）
    append() {
        const _self = this;
        const argArr = getArgsArr(arguments);

        // 对传入的元素进行判断处理并绘制
        argArr.forEach(item => {
            console.log(_self.type)
            if(_self.type==='Group'||_self.type==='Scene'){
                switch(item.type) {
                    case 'Rect':
                        _self[_gentRectDraw](item);
                    break;
                    default:
                }
            }
        });
    }
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
            bgColor: 'transparent', //canvas背景颜色  (type: color, def: 透明)
            type: 'Scene', //标识，为了好区分
        };
        const config = Object.assign(def, argObj);
        const { el, width, height, bgColor } = config;
        if (el === '' || el.getAttribute('id') === null) {
            console.error('请传入id元素');
        }
        // 创建新的canvas
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        const ctx = canvas.getContext('2d');
        // 设置背景颜色
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = bgColor;
        ctx.fill();
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
class Rect {
    constructor(argObj) {
        const def = {
            left: 0, // 元素 X 轴坐标 (type: number, def: 0px)
            top: 0, // 元素 Y 轴坐标 (type: number, def: 0px)
            width: 0, // 矩形宽度 (type: number, def: 0px)
            height: 0, // 矩形高度 (type: number, def: 0px)
            lineWidth: 0, //描边宽度 (type: number, def: 1px)
            strokeColor: '', //描边颜色 (type: color, def: 空字符串)
            fillColor: '', //填充颜色 (type: color, def:  空字符串)
            type: 'Rect', //标识，为了好区分
            name: '', //设定元素的name
        };
        const config = Object.assign(def, argObj);

        // 把参数暴露出去
        for (let item in config) {
            this[item] = config[item];
        }
    }
    // 获取或设置属性值
    attr(){
        
    }
}
export { Scene, Rect, Group };
