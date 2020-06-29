import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.less';


class Threejs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const scene = new THREE.Scene();
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(winWidth, winHeight);
        document.getElementById('main').appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);    
        camera.position.z = 5;

        function render() {
            renderer.render(scene, camera); //执行渲染操作
            requestAnimationFrame(render);
            // 自动转动
            // controls.update();
        }
        render();

        const controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
        controls.enablePan = false; //禁止右键拖拽
        // 缩放范围
        controls.minZoom = 0.5;
        controls.maxZoom = 5;

    }
    render() {
        return <div className="views" id="main"></div>;
    }
}

export default Threejs;