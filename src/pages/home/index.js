import React, { Component } from 'react';
import { Scene, Rect, Group, Round } from '@/utils/gentjs';
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
            left:0,
            top:0,
        });
        // 圆
        const round1 = new Round({
            left: 100,
            top: 100,
            startAngle:0,
            endAngle:360,
            lineWidth:5,
            fillColor:'red',
            strokeColor:'blue',
            diameter: 30
        });

        group1.append(round1);
        scene.append(group1);
        
        document.getElementsByTagName('canvas')[0].addEventListener('click', () => {
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
