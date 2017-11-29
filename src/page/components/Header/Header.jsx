import React from 'react';
import './Header.css';
import { inject, observer } from 'mobx-react';
import {autorun} from 'mobx';
import iconUser from '../../../../assets/images/iconUser.png';
import iconLocation from '../../../../assets/images/iconLocation.png';
import iconComputer from '../../../../assets/images/iconComputer.png';

@inject('menuStore')
@observer
export default class Header extends React.Component{
    constructor (props) {
        super(props)
    }
    render() {
        const {RoomDetail} = this.props.menuStore
        return (
            <div className="Header">
                <h1>{RoomDetail.name}</h1><br />
                <div className="HdContent">
                    <span style={{paddingRight: 15}}>
                        <img src={iconUser} alt=""/>
                        <i>
                          容纳人数：<em>{RoomDetail.peopleCount}</em>人  
                        </i>
                    </span>
                    <span>
                        <img src={iconLocation} alt=""/>
                        <i>位置：<em>{RoomDetail.place}</em></i>
                    </span><br /><br />
                    <span>
                        <img src={iconComputer} alt=""/>
                        <i>设备：<em>{RoomDetail.devices}</em></i>
                    </span>
                </div>
            </div>
        )
    }
}
