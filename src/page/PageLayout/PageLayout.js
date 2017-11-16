import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import './pageLayout.css';
import APIs from '../../common/api.js';
import axios from 'axios';
import logoSmall from '../../../assets/images/logoSmall.png';
import avatar from '../../../assets/images/avatar.png';

const { Sider, Content } = Layout

@inject('menuStore')
@observer
export default class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            axios({
                method: 'GET',
                url: APIs.GET_ROOMS,
                header: {
                    'Content-Type': 'application/json;charset=utf8',
                    'userid': sessionStorage.getItem('userid')
                }
            }).then(res => {
                this.props.menuStore.setMenuList(res.data)
            }).catch(err => {
                console.warn('error -> ', err)
            })
        },300)
    };

    onSkip = (item) => {
        const roomId = item.key;
        this.props.router.push({pathname:`index/meet/${item.key}`});
    }
    render () {
        const {children} = this.props;
        return (
            <Layout>
                <Sider style={{background:'#fff'}}>
                    <div className="logo">
                        <img className="logo_small" src={logoSmall} />
                        <header>
                            <img src={avatar}/>
                            <div className="avatar">
                                <p className="name">{ sessionStorage.getItem('nickname') }</p>
                                <p className="email">{ sessionStorage.getItem('email') }</p>
                            </div>
                            
                        </header>
                    </div>
                    <Menu mode="inline" onClick = { this.onSkip }>
                        {
                            this.props.menuStore.menuList.map((item) => {
                                return(
                                    <Menu.Item key={ item._id } className="trigger">
                                        <span>{ item.name }</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px', padding: 24, background: 'rgb(245,245,245)', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}