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
            width: 10,
            height: 10,
            fillColor:'blue',
        });
        console.log(scene);
        scene.append(rect1);
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
