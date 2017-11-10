import React from 'react';
import { Form, Icon, Input, Button,message,notification } from 'antd';
import LoginMain from '../../../assets/images/logoMain.png';
const FormItem = Form.Item;
import axios from 'axios';
import APIs from '../../common/api.js';

class Login extends React.Component {
	constructor(props){
		super(props)
	}
	handleSubmit = (e) => {
        const data = {
            "email": e.target.email.value,
            "nickname": e.target.password.value
        }
        if(!data) {
            notification.warning({
                message: '邮箱或者姓名不对'
            })
            return false
        }
        axios({
            url:APIs.POST_SIGNUP,
            method: "POST",
            data:data
        }).then(res => {
            sessionStorage.setItem('nickname',res.data.nickname)
            sessionStorage.setItem('email',res.data.email)
            sessionStorage.setItem('userid',res.data._id)
            this.props.router.push({pathname:'/index'})
        }).catch(err => {
            notification.warning({
                message: '邮箱或者姓名不对'
            })
            console.warn("error -> ",err)
        })
	}
	render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form style={Style.formBg} onSubmit = { this.handleSubmit } className="login-form">
                    <h2 style={Style.Headtitle}>
                        <img src={LoginMain} />
                        <h6 style={{color:'#ccc',letterSpacing:10,paddingBottom:15}}>房间预定系统</h6>
                    </h2>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入邮箱!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="请输入邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="请输入姓名" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const Style = {
    formBg:{
        width:300,
        backgroundColor:'#fff',
        padding:15,
        position:'absolute',
        top:'30%',
        left:'42%',
    },
    Headtitle:{
        textAlign:'center'
    }
}
export default Form.create()(Login);
