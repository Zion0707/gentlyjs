import React, { Component } from 'react';
import { Scene, Rect, Group, Label } from '@/utils/gentjs';
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

        const rect1 = new Rect({
            left: 0,
            top: 0,
            width: 30,
            height: 30,
            fillColor: 'blue',
        });
        const rect2 = new Rect({
            left: 20,
            top: 20,
            width: 30,
            height: 30,
            fillColor: 'red',
        });
        const label1 = new Label({
            text: '冶炼铸造机械制造玻璃陶瓷食品饲料汽车制造',
            lineHeight: 14,
            left:0,
            top:0,
            width: 30,
            textAlign:'center'
        });
        const group1 = new Group({
            left: 0,
            top: 0,
        });



        rect1.on('click', (item, evt) => {
            console.log('blue:', item, evt);
        });


        label1.on('click', (item, evt)=>{
            console.log('label:', item, evt);
        });

        rect2.on('click', (item, evt) => {
            console.log('red:', item, evt);
        });

        group1.append(rect1, label1, rect2);
        // scene.append(rect1, rect2);
        scene.append(group1);
        
        // console.log(rect1);

        group1.attr({
            left: 40, 
            top:40
        })

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
