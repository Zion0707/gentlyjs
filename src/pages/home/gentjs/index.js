/**
 * gentjs canvas 2d 类库
 * 
 * */ 
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
// console.log(winWidth, winHeight);
// 场景
class Scene {
    constructor(argObj) {
        const def = {
            el: '',
            width: winWidth,
            height: winHeight,
            bgColor: 'transparent',
        };
        const config = Object.assign(def, argObj);
        const { el, width, height, bgColor } = config;
        if (el === '' || el.getAttribute('id') === null) {
            console.error('请传入id元素');
        }
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        const ctx = canvas.getContext('2d');
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = bgColor;
        ctx.fill();
        el.appendChild(canvas);
    }
    // 添加方法
    append(){
        if(arguments.length===0) return;
    }
}

export { Scene };
