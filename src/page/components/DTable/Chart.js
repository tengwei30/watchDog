import React from 'react';
import { Button, Icon } from 'antd';
import times from '../../../common/timeConfig.js';
import getWeekDays from '../../../common/weekTimes';
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
            visible: false,
            weekTrue: true,
            title: '',
            modalTimes: {},
            showOrder: false,
            weeks: [],
            roomId: this.props.params.id,
            val: {},
            key: 1
        }
    }
    componentDidMount() {
        this.setState({
            weeks: getWeekDays()
        },() => {
            this.getRoomOrder(this.state.roomId)
        })
    }
    componentWillReceiveProps(nextProps,nextState) {
        this.setState({
            weeks: getWeekDays()
        },() => {
            this.getRoomOrder(nextProps.params.id)
        })
    }
    shouldComponentUpdate(nextProps,nextState) {
        if(!nextState.visible && nextState.key === 0) {
            this.setState({
                weeks: getWeekDays()
            },() => {
                this.getRoomOrder(this.props.params.id)
            })
        }
        this.setState({
            key:1
        })
        return true
    }
    getRoomOrder = (roomId) => {
        axios({
            method: 'get',
            url: `${APIs.GET_ROOM_ORDERS}${roomId}`
        }).then(res => {
            let data = [];
            for (let i in res.data) {
                res.data[i].beginTime = new Date(moment(res.data[i].beginTime)).getTime()
                res.data[i].endTime = new Date(moment(res.data[i].endTime)).getTime()
            }
            return res.data
        }).then(res => {
            this.state.weeks.map((item,index) => {
                item['times'].map((singleItem,index) => {
                    if(res.length !== 0) {
                        res.map(val => {
                            if(singleItem.time >= val['beginTime'] && singleItem.time < val['endTime'] ) {
                                singleItem.used = true;
                                singleItem = Object.assign(singleItem,val)
                            }
                        })
                    }else {
                        singleItem.used = false;
                    }
                    
                })
            })
            setTimeout(() => {
                this.setState({
                    weeks: this.state.weeks
                })
            },100)
        }).catch(err => {
            console.warn('error --->', err)
        })
    }
    showCreateRoom = (item,val) => {
        this.setState({
            visible:true,
            modalTimes: item,
            val: val
        })
    }
    handleCancel = () => {  // 隐藏弹窗
        this.setState({
            visible: false,
            key: 0
        });
    }
    switch = () => { // 本周/下周
        this.setState({
            weekTrue: !this.state.weekTrue,
        })
    }
    render() {
        return (
            <div>
                {/*------ header -----*/}
                <Header />
                {/*------- room -------*/}
                <div className="btnDate">
                    <p>今天：{moment().format('YYYY-MM-DD')}</p>
                    <p><Button type="primary" onClick={this.switch}>{this.state.weekTrue ? '下周' : '本周' }</Button></p>
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
                                    this.state.weekTrue ? (
                                        this.state.weeks.slice(0,7).map((item) => {
                                            return (
                                                <div className="weekday" key={item.day}>
                                                    <div className="weekdayHeader">
                                                        <span>{ item.day }</span>
                                                        <span>{ item.week }</span>
                                                    </div>
                                                    {
                                                        item['times'].map((val,key) => {
                                                            if (val.used) {
                                                                return (
                                                                    <div key={val.time} className="timeSingleBlock">
                                                                        <div className="create"
                                                                        onClick={() => {this.showCreateRoom(item,val)}}
                                                                        >
                                                                            {
                                                                                (val.time == val.beginTime) ? (
                                                                                    <div className="active" style={{borderTop:'2px solid #fff'}}>
                                                                                    <span>{val.description}</span>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="active">
                                                                                        <span>.</span>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ) 
                                                            } else {
                                                                return (
                                                                    <div key={val.time} className="timeSingleBlock">
                                                                        <div className="create"
                                                                        onClick={() => {this.showCreateRoom(item,val)}}
                                                                        >
                                                                            <div className="makeMeet">
                                                                                预定
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    ) : (
                                        this.state.weeks.slice(7,14).map((item) => {
                                            return (
                                                <div className="weekday" key={item.day}>
                                                    <div className="weekdayHeader">
                                                        { item.week }
                                                    </div>
                                                    {
                                                        item['times'].map((val,key) => {
                                                            if (val.used) {
                                                                return (
                                                                    <div key={val.time} className="timeSingleBlock">
                                                                        <div className="create"
                                                                        onClick={() => {this.showCreateRoom(item,val)}}
                                                                        >
                                                                            {
                                                                                (val.time == val.beginTime) ? (
                                                                                    <div className="active" style={{borderTop:'2px solid #fff'}}>
                                                                                    <span>{val.description}</span>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="active">
                                                                                        <span>.</span>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ) 
                                                            } else {
                                                                return (
                                                                    <div key={val.time} className="timeSingleBlock">
                                                                        <div className="create"
                                                                        onClick={() => {this.showCreateRoom(item,val)}}
                                                                        >
                                                                            <div className="makeMeet">
                                                                                预定
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/*------- dialog --------*/}
                    <DModal
                        visible = { this.state.visible }
                        handleCancel = {this.handleCancel}
                        modalTimes = {this.state.modalTimes}
                        roomId = {this.state.roomId}
                        val = {this.state.val}
                    />
                </div>
            </div>
        )
    }
}
