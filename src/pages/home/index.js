import React, { Component } from 'react';
import { Scene, Group, Path, Rect, Round, Sprite } from '@/utils/gentjs';
import spriteUrl1 from '@/statics/imgs/mock.png';
import spriteUrl2 from '@/statics/imgs/gent.png';
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
            left: 20,
            top: 20,
        });
        const round1 = new Round({
            strokeColor: '#F00',
            lineWidth: 1,
            startAngle: 0,
            endAngle: 360,
            diameter: 50,
        });
        const sprite1 = new Sprite({
            left: 0,
            top: 0,
            // url: 'http://dummyimage.com/200x100/4A7BF7&text=Hello',
            url: spriteUrl1,
        });
        const round2 = new Round({
            strokeColor: '#000',
            lineWidth: 1,
            startAngle: 0,
            endAngle: 360,
            diameter: 50,
            left: 100,
        });
        const sprite2 = new Sprite({
            left: 0,
            top: 0,
            // url: 'http://dummyimage.com/200x100/FF6600',
            url: spriteUrl2,
        });

        group1.append(round1, sprite1, round2, sprite2);
        scene.append(group1);

        stage.onclick = function () {
            sprite1.attr({ left: 10, top: 10 });
        };
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
