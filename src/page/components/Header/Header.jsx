import React from 'react';
import './Header.css';
import iconUser from '../../../../assets/images/iconUser.png';
import iconLocation from '../../../../assets/images/iconLocation.png';
import iconComputer from '../../../../assets/images/iconComputer.png';

export default class Header extends React.Component{
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div className="Header">
                <h1>小树林</h1><br />
                {/* <div className="HdContent">
                    <span style={{paddingRight: 15}}>
                        <img src={iconUser} alt=""/>
                        <i>
                          容纳人数：<em>111</em>人  
                        </i>
                    </span>
                    <span>
                        <img src={iconLocation} alt=""/>
                        <i>位置：<em>3楼</em></i>
                    </span><br /><br />
                    <span>
                        <img src={iconComputer} alt=""/>
                        <i>设备：<em>电视、音响</em></i>
                    </span>
                </div> */}
            </div>
        )
    }
}
