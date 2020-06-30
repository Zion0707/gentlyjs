import React, { Component } from 'react';
import { Scene, Rect, Group } from '@/utils/gentjs';
import './index.less';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    init(){
        const stage = document.getElementById('stage');
        const scene = new Scene({
            el: stage,
        });

        const rect1 = new Rect({
            left: 0,
            top: 0,
            width: 30,
            height: 30,
            fillColor:'blue',
        });
        const group1 = new Group({
            left:10,
            top:10,
        })
        group1.append(rect1);
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
