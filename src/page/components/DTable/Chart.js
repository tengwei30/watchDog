import React from 'react';
import { Button, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import getWeekDays from '../../../common/weekTimes';
import axios from 'axios';
import APIs from '../../../common/api.js';
import AddIcon from '../../../../assets/images/iconAddGrey.png';
import moment from 'moment';
import DModal from '../Modal/Modal.js';
import Header from '../Header/Header.jsx';
import './Chart.css';

@inject('chartStore','modalStore')
@observer
export default class DTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekTrue: true,
            key: 1
        }
    }
    componentDidMount() {
        autorun(() => {
            this._getRoomOrder()
            this._roomStates()
        })
    }
    _roomStates () {
        let _this = this
        socket.on('roomStates',function(data) {
            for (let i in data.states) {
                data.states[i].beginTime = new Date(moment(data.states[i].beginTime)).getTime()
                data.states[i].endTime = new Date(moment(data.states[i].endTime)).getTime()
            }
            _this.props.chartStore.setresponseData(data.states)
        })
    }
    _getRoomOrder () {
        axios(`${APIs.GET_ROOM_ORDERS}${this.props.params.id}`)
            .then(res => {
            for (let i in res.data) {
                res.data[i].beginTime = new Date(moment(res.data[i].beginTime)).getTime()
                res.data[i].endTime = new Date(moment(res.data[i].endTime)).getTime()
            }
            return res.data
            })
            .then(data => {
                this.props.chartStore.setresponseData(data)
            })
            .catch(err => {
                console.warn('error ---> ', err)
            })
    }
    shouldComponentUpdate(nextProps,nextState) {
        if(!nextState.visible && nextState.key === 0) {
            this.setState({
                weeks: getWeekDays()
            },() => {
                this._getRoomOrder(this.props.params.id)
            })
        }
        this.setState({
            key:1
        })
        return true
    }
    showCreateRoom = (item,val) => {
        this.props.modalStore.setmodalData(item)
        this.props.modalStore.setisModalData(val)
        this.props.modalStore.setVisible(true)
    }
    handleCancel = () => {  // 隐藏弹窗
        this.props.modalStore.setVisible(false) 
        this.setState({
            key: 0
        });
    }
    switch = () => { // 本周/下周
        this.setState({
            weekTrue: !this.state.weekTrue,
        })
    }
    _renderColumn() {
        return (
            <div>
                <div className="content">
                    <div className="timeBlock">
                        <div style={{borderBottom: '3px solid #f3f3f3', height: 21,width:'100%',paddingBottom:'48px'}}></div>
                        {
                            this.props.chartStore.times[0].map((item,key) => {
                                return(
                                    <div key={key} className="clock">{item}</div>
                                )
                            })
                        }
                    </div>
                    {
                        this.state.weekTrue ? (
                            this.props.chartStore.columnData.slice(0,7).map((item) => {
                                return (
                                    <div className="weekday" key={item.day}>
                                        {
                                            (moment().format('YYYY-MM-DD') == item.day)?(
                                                <div className="weekdayHeader">
                                                    <span style={{color:'rgb(112,157,228)'}}>{ item.day }</span>
                                                    <span style={{color:'rgb(112,157,228)'}}>{ item.week }</span>
                                                </div>
                                            ) : (
                                                <div className="weekdayHeader">
                                                    <span>{ item.day }</span>
                                                    <span>{ item.week }</span>
                                                </div>
                                            )
                                        }
                                        
                                        {
                                            item['times'].map((val,key) => {
                                                console.log('time',item,'now',moment().format('YYYY-MM-DD'))
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
                            this.props.chartStore.columnData.slice(7,14).map((item) => {
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
                        )
                    }
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {/*------ header -----*/}
                <Header />
                {/*------- room -------*/}
                <div className="btnDate">
                    <p>今天：{moment().locale('zh-cn').format('dddd')}</p>
                    <p><Button type="primary" onClick={this.switch}>{this.state.weekTrue ? '下周' : '本周' }</Button></p>
                </div>
                <div className="Chart">
                    <div className="CtContent">
                        <div className="calendar">
                            {this._renderColumn()}
                        </div>
                    </div>
                    {/*------- dialog --------*/}
                    <DModal
                        handleCancel = {this.handleCancel}
                        modalTimes = {this.state.modalTimes}
                        roomId = {this.props.params.id}
                        val = {this.state.val}
                    />
                </div>
            </div>
        )
    }
}
