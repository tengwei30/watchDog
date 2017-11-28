import { observable,action,computed } from 'mobx';
import * as mobx from 'mobx'
import times from '../common/timeConfig.js';
import getWeekDays from '../common/weekTimes';
import moment from 'moment';
import _ from 'lodash';

class ChartStore {
    @observable defaultTimes = getWeekDays()
    @observable responseData = []
    @observable roomId = null
    @observable times = times
    @observable switchTime = true;

    @computed
    get columnData() {
        let weeks = []
        mobx.toJS(this.defaultTimes).forEach((item, i) => {
            item['times'].forEach((singleItem, j) => {
                if (_.isEmpty(this.responseData)) {
                    singleItem.used = false
                }else {
                    mobx.toJS(this.responseData).forEach( (val, k) => {
                        if(singleItem.time >= val['beginTime'] && singleItem.time < val['endTime'] ) {
                            singleItem.used = true;
                            singleItem = Object.assign(singleItem,val)
                        }
                    })
                }
            })
            weeks.push(item)
        })
        return weeks
    }

    @action
    setresponseData(data) {
        this.responseData = data
    }

    @action
    setRoomId(num) {
        this.roomId = num
    }
    
    @action
    setSwitchTime (boolean) {
        this.switchTime = boolean
    }
}

export default ChartStore