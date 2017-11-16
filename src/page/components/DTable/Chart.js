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
const roomId = '58f98fcf9d570c8583074629'

export default class DTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekDay: [],
            visible: false,
            roomId: this.props.params.id
        }
    }
    componentDidMount() {
        this._getData(this.state.roomId)
    }
    componentWillReceiveProps(nextProps,nextState) {
        this._getData(nextProps.params.id)
        debugger;
    }
    _getData = (roomId) => {
        axios({
            method: "GET",
            url: APIs.GET_ROOM_ORDERS.replace(':roomId', roomId),
            headers: {
                'Content-Type': 'application/json;charset=utf8',
                'userid': sessionStorage.getItem('userid')
            }
        }).then(res => {
            console.log('res', res)
            return res.data.splice(0,7)
        }).then(res => {
            res.data = res.map((week) => {
                return {
                    date: moment(week[0].startTime).format('dddd'),
                    blocks: week
                }
            })
            this.setState({
                weekDay: res.data
            })
        }).catch(err => {
            console.warn("error->",err)
        })
    }

    showCreateRoom = () => {
        this.setState({
            visible:true
        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
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
                                        times.map((item,key) => {
                                            return(
                                                <div key={key} className="clock">{item}</div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.state.weekDay.map((week,outerIndex) => {
                                        return (
                                            <div className="weekday" key={outerIndex}>
                                                <div className="weekdayHeader">
                                                    {week.date}
                                                </div>
                                                {
                                                    week.blocks.map((block,innerIndex) => {
                                                        return (
                                                            <div key={innerIndex} className="timeSingleBlock">
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
