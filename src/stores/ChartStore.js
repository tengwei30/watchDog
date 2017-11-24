import { observable,action,computed } from 'mobx';
import _ from 'lodash'

class ChartStore {
    @observable responseData = []
    @observable roomId = null
    @observable weekTrue = true

    @computed
    get columnData() {
    }

    @computed
    get weekTrue() {
        this.weekTrue = !this.weekTrue
    }

    @action
    setresponseData(data) {
        this.responseData = data
    }

    @action
    setRoomId(num) {
        this.roomId = num
    }
    
}

export default ChartStore