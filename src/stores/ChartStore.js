import { observable,action,computed } from 'mobx';
import _ from 'lodash'

class ChartStore {
    @observable responseData = []
    @observable weekDay = []

    @action
    setresponseData(data) {
        this.responseData = data
    }

    @computed
    get TableData() {
        if(_.empty(this.responseData)) return {}
        this.weekDay = this.responseData.splice(0,7).map(week => {
            return {
                date: moment(week[0].startTime).format('dddd'),
                blocks: week
            }
        })
    }
}

export default ChartStore