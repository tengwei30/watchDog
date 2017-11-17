import React from 'react';
import { Button, Icon } from 'antd';
import times from '../../../common/timeConfig.js';
import axios from 'axios';
import APIs from '../../../common/api.js';
import AddIcon from '../../../../assets/images/iconAddGrey.png';
import moment from 'moment';
import DModal from '../Modal/Modal.js';
import Header from '../Header/Header.jsx';
import './Chart.css';

export default class DTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekDay: ['星期一','星期二','星期三','星期四','星期五','星期六','星期七'],
            visible: false,
        }
    }
    componentDidMount() {
        console.log(moment().day(0).format('YYYY-MM-DD'))
    }

    showCreateRoom = () => {
        this.setState({
            visible:true
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                {/*------ header -----*/}
                <Header />
                {/*------- room -------*/}
                <div className="btnDate">
                    <p>2017年11月</p>
                    <p>
                        <Button disabled>
                            <Icon type="left" />上一周
                        </Button>
                        <Button>
                            下一周<Icon type="right" />
                        </Button>
                    </p>
                </div>
                <div className="Chart">
                    <div className="CtContent">
                        <div className="calendar">
                            <div className="content">
                                <div className="timeBlock">
                                    <div style={{borderBottom: '3px solid #f3f3f3', height: 21,width:'100%',paddingBottom:'48px'}}></div>
                                    {
                                        times[0].map((item,key) => {
                                            return(
                                                <div key={key} className="clock">{item}</div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.state.weekDay.map((item,key) => {
                                        return (
                                            <div className="weekday" key={key}>
                                                <div className="weekdayHeader">
                                                    { item }
                                                </div>
                                                {
                                                    times[1].map((item,key) => {
                                                        return (
                                                            <div key={key} className="timeSingleBlock">
                                                                <div className="create" onClick={this.showCreateRoom}>
                                                                    <div className="makeMeet">
                                                                        <img src={AddIcon} />
                                                                        预定
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/*------- dialog --------*/}
                    <DModal
                        visible = { this.state.visible }
                        handleCancel = {this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}
