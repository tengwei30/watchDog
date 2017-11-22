import { observable,action,computed } from 'mobx';
import _ from 'lodash';

class MenuStore {
    @observable menuList = [];
    @observable SelectStr = sessionStorage.getItem('SelectStr') || 'meeting'

    @computed
    get ListData() {
        if (_.isEmpty(this.menuList)) return [];
        let newListArr = [];
        this.menuList.map( (item) => {
            if(item.type === this.SelectStr) {
                newListArr.push(item)
            }
        })
        return newListArr
    }

    @action
    setMenuList(list) {
        this.menuList = list;
    }

    @action
    setSelectStr(str) {
        this.SelectStr = str
    }
}

export default MenuStore;


