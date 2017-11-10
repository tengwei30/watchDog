const domain = 'http://10.8.3.211:3000';

const APIs = {
    POST_SIGNUP: '/signup',
    GET_ME: '/me',
    POST_CREATE_ROOM: '/room',
    GET_ROOMS: '/rooms',
    POST_CREATE_ROOM_ORDER: '/roomstatus',
    GET_ROOM_ORDERS: '/roomStatus?roomId=:roomId',
    DELETE_ROOM_STATUS: '/roomStatus?startTime=:startTime',
};

const addDomain = api => domain + api;

for (const key in APIs) {
    if (Object.prototype.hasOwnProperty.call(APIs, key)) {
        APIs[key] = addDomain(APIs[key])
    }
}

export default APIs;
