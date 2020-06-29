/**
 * gentjs canvas 2d 类库
 *
 * */
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
let globalCtx = null;

/**
 * class Scene
 * 场景对象 (相当于一个舞台，所有要显示的元素都放置在舞台中呈现)
 * */
class Scene {
    constructor(argObj) {
        const def = {
            el: '', //id元素 (type: el, def: 空字符串)
            width: winWidth, //canvas宽度  (type: number, def: 0px)
            height: winHeight, //canvas高度  (type: number, def: 0px)
            bgColor: 'transparent', //canvas背景颜色  (type: color, def: 透明)
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
    // 添加方法
    append() {
        if (arguments.length === 0) return;
        let argArr = [];
        if (arguments[0] instanceof Array) {
            argArr = arguments[0];
        } else {
            for (let i = 0, len = arguments.length; i < len; i++) {
                argArr.push(arguments[i]);
            }
        }
        console.log(argArr[0]);
    }
}

/**
 * class Rect
 * Rect 元素可以绘制一个矩形。
 * */
class Rect {
    constructor(argObj) {
        const def = {
            x: 0, // 元素 X 轴坐标 (type: number, def: 0px)
            y: 0, // 元素 Y 轴坐标 (type: number, def: 0px)
            width: 0, // 矩形宽度 (type: number, def: 0px)
            height: 0, // 矩形高度 (type: number, def: 0px)
            lineWidth: 0, //描边宽度 (type: number, def: 1px)
            strokeColor: '', //描边颜色 (type: color, def: 空字符串)
            fillColor: '', //填充颜色 (type: color, def:  空字符串)
        };
        const config = Object.assign(def, argObj);
        const { x, y, width, height, lineWidth, strokeColor, fillColor } = config;
        globalCtx.beginPath();
        globalCtx.lineWidth = lineWidth;
        // 描边矩形
        if( strokeColor ){
            globalCtx.strokeStyle = strokeColor;
            globalCtx.strokeRect(x, y, width, height);
            console.log(strokeColor);
        }
        // 填充矩形
        if( fillColor ){
            globalCtx.fillStyle = fillColor;
            globalCtx.fillRect(x, y, width, height);
            console.log(fillColor);
        }

        // 把参数暴露出去
        for (let item in config) {
            this[item] = config[item];
        }
    }
}
export { Scene, Rect };
