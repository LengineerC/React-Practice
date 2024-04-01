import React, { Component } from 'react'
import store from '../../redux/store';

import './DataBar.css';

export default class DataBar extends Component {

    render() {
        return (
            <div>
                <div className='score'>
                    Score: {store.getState()}
                </div>
                <div className='time'>
                    Time: {Math.floor(this.props.time/60)}min {this.props.time%60}s
                </div>
                <div className='speed'>
                    Speed: {Math.ceil(10/(this.props.speed/1000))} px/s
                </div>
                <div className='length'>
                    Length: {this.props.snakeLength}
                </div>
            </div>
        )
    }
}
