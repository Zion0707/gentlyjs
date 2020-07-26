import React, { Component } from 'react';
import { Scene,  Group, Path } from '@/utils/gentjs';
// Rect,Round,
import './index.less';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    init() {
        const stage = document.getElementById('stage');
        const scene = new Scene({
            el: stage,
        });
        // 组
        const group1 = new Group({
            left: 10,
            top: 10,
        });
        // 路径
        const path1 = new Path({
            left: 20,
            top: 20,
            strokeColor: 'blue',
            // fillColor: 'red',
            points: [0, 0, 100, 0, 100, 100, 0, 100, 0, 0],
            // points: [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]],
        });

        group1.append(path1);
        scene.append(group1);

        document
            .getElementsByTagName('canvas')[0]
            .addEventListener('click', () => {
                // group1.append(rect1, rect2);
                // rect1.attr({
                //     left: 30,
                //     top: 40,
                // })
                // group1.attr({
                //     left: 20,
                //     top: 20,
                // });
            });
    }
    componentDidMount() {
        this.init();
    }
    render() {
        return (
            <>
                <div className="views" id="stage"></div>
            </>
        );
    }
}

export default Home;
