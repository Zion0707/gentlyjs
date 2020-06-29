import React, { Component } from 'react';
import { Scene } from './gentjs';
import './index.less';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const stage = document.getElementById('stage');
        const scene = new Scene({
            el: stage,
            bgColor:'#000'
        });

        console.log(scene);
        scene.append('aa','bb');
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
