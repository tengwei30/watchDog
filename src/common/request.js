// import APIs from './api.js';
import axios from 'axios';
const userid = sessionStorage.getItem('userid');

export default Request = (type,url) => {
    axios({
        method: type,
        url: url,
        header: {
            'Content-Type': 'application/json;charset=utf8',
            'userid': userid
        }
    })
}




