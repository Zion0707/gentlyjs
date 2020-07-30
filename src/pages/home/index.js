import React, { Component } from 'react';
import { Scene, Group, Path, Rect, Round } from '@/utils/gentjs';
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
        const round1 = new Round({
            strokeColor: '#000000',
            lineWidth: 1,
            startAngle: 0,
            endAngle: 360,
            diameter: 50,
        });

        group1.append(round1);
        scene.append(group1);
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
