import React, { Component } from 'react';
import { Scene, Rect } from '@/utils/gentjs';
import './index.less';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const stage = document.getElementById('stage');
        const scene = new Scene({
            el: stage,
        });

        const rect1 = new Rect({
            left: 20,
            top: 20,
            width: 100,
            height: 100,
            fillColor:'blue',
        });
        const rect2 = new Rect({
            left: 120,
            top: 120,
            width: 100,
            height: 100,
            strokeColor:'blue',
        });
        console.log(scene);
        scene.append(rect1, rect2);
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
