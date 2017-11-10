import React from 'react';
import times from '../../../common/timeConfig.js';
import axios from 'axios';
import APIs from '../../../common/api.js';
import moment from 'moment';
const roomId = '58f98fcf9d570c8583074629'

export default class DTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekDay: []
        }
    }

    componentDidMount() {
        this._getData()
    }
    _getData = () => {
        axios({
            method: "GET",
            url: APIs.GET_ROOM_ORDERS.replace(':roomId', roomId),
            headers: {
                'Content-Type': 'application/json;charset=utf8',
                'userid': sessionStorage.getItem('userid')
            }
        }).then(res => {
            return res.data.splice(0,7)
        }).then(res => {
            console.log(res)
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
    render() {
        return (
            <div style={{display: 'flex',width:'100%',height:'100%'}}>
                <div style={{flex:1,display:'flex',flexDirection:'column',backgroundColor:'#f5f6f7',padding:'60px 30px 30px 30px'}}>
                    <div style={styles.calendar}>
                        <div style={styles.content}>
                            <div style={styles.timeBlock}>
                                <div style={{borderBottom: '3px solid #f3f3f3', height: 21,width:'100%',paddingBottom:'48px'}}></div>
                                {
                                    times.map((item,key) => {
                                        return(
                                            <div key={key} style={styles.clock}>{item}</div>
                                        )
                                    })
                                }
                            </div>
                            {
                                this.state.weekDay.map((week,outerIndex) => {
                                    return (
                                        <div style={styles.weekday} key={outerIndex}>
                                            <div style={styles.weekdayHeader}>
                                                {week.date}
                                            </div>
                                            {
                                                week.blocks.map((block,innerIndex) => {
                                                    return (
                                                        <div key={innerIndex} style={styles.timeSingleBlock}>
                                                            <div style={{color:'#ccc'}}>预定</div>
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
            </div>
        )
    }
}

const styles = {
    calendar: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
        overflow: 'auto',
        flex: 1
    },
    content: {
        display:'flex'
    },
    timeBlock: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    clock: {
        display: 'flex',
        height: 100,
        justifyContent: 'center',
        color: '#bebebe',
        fontSize: 14,
        borderBottom: '1px solid #f3f3f3',
        borderRight: '1px solid #f3f3f3',
        paddingTop: 10
    },
    weekday: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    weekdayHeader: {
        borderBottom: '3px solid #f3f3f3',
        textAlign:'center',
        padding: '15px 0'
    },
    timeSingleBlock: {
        display: 'flex',
        borderRight: '1px solid #f3f3f3',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        cursor: 'pointer',
        borderBottom: '1px solid #f3f3f3'
    }
}