import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import './pageLayout.css';
import logoSmall from '../../../assets/images/logoSmall.png';
import avatar from '../../../assets/images/avatar.png'

const { Header, Sider, Content } = Layout

@inject('menuStore')
@observer
export default class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.menuStore.setMenuList(
                [{
                    name: "会议室1",
                    icon: "user",
                    id: "demo1"
                }, {
                    name: "会议室2",
                    icon: "video-camera",
                    id: "demo2"
                }, {
                    name: "会议室3",
                    icon: "video-camera",
                    id: "demo3" 
                }]
            )
        },500)
    };

    onSkip = (item) => {    // 默认路由跳转
        this.props.router.push({pathname:`index/report/${item.key}`});
    }
    render () {
        const {children,location} = this.props;
        console.log(this.props)
        return (
            <Layout>
                <Sider style={{background:'#fff'}}>
                    <div className="logo">
                        <img className="logo_small" src={logoSmall} />
                        <header>
                            <img src={avatar}/>
                            <div className="avatar">
                                <p className="name">{location.query.name}</p>
                                <p className="email">{location.query.email}</p> 
                            </div>
                            
                        </header>
                    </div>
                    <Menu mode="inline" onClick = { this.onSkip }>
                        {
                            this.props.menuStore.menuList.map((item) => {
                                return(
                                    <Menu.Item key={ item.id } className="trigger">
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