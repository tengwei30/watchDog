import { hashHistory, Router, Route } from 'react-router'
import Home from '../page/Home/index';
import PageLayout from '../page/PageLayout';
import NoMatch from '../page/NoMatch';
import Login from '../page/Login';

// 在这里面进行路由界面的添加

const createRoutes = [{
    path: '/login',
    component: Login,
},{
    path: '/index',
    component: PageLayout,
    indexRoute: Home,   //home 界面
    childRoutes: [
        NoMatch(),
    ]
}];

export default createRoutes;
