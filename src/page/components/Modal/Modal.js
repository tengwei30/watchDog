import React from 'react';
import { Modal, Button, Form, Input,Select, Col, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import APIs from '../../../common/api.js';
const FormItem = Form.Item;
const Option = Select.Option;
import './Modal.css';

@inject('modalStore')
@observer
class showModal extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        let body = {
            userId: '',
            day: `${this.props.modalStore.modalData.day}`,
            roomId: this.props.roomId,
            id: '' || this.props.modalStore.isModalData.id,
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.description === '') {
                    notification.open({
                        message:'使用者和描述不能为空~'
                    })
                    return false;
                }
                if(new Date(moment(values.endTime)).getTime() < new Date(moment(values.beginTime)).getTime()) {
                    notification.open({
                        message:'结束时间不能大于开始时间~'
                    })
                    return false; 
                }
                if(new Date().getTime() > new Date(moment(values.endTime)).getTime()) {
                    notification.open({
                        message:'开始时间不能大于当前时间~'
                    })
                    return false;  
                }
                let data = Object.assign(body,values)
                axios({
                    method: 'PUT',
                    url: APIs.PUT_ROOM_STATUS,
                    data: data,
                    header: {
                        'Content-Type': 'application/json;charset=utf8'
                    }
                }).then(res => {
                    notification.open({
                        message: '创建成功',
                    });
                    setTimeout(() => {
                        this.props.handleCancel()
                    },300)
                }).catch(err => {
                    notification.open({
                        message: '创建失败',
                    });
                    setTimeout(() => {
                        this.props.handleCancel()
                    },300)
                    console.warn(err)
                })
            }
        });
    }
    handleSelectChangeBegin = (value) => {
        this.props.form.setFieldsValue({
            beginTime: value
        })
    }
    handleSelectChangeEnd = (value) => {
        this.props.form.setFieldsValue({
            endTime: value
        })
    }
    DeleteMessage = () => {
        const roomId = this.props.roomId;
        const stateId = this.props.modalStore.isModalData.id;
        axios.delete(`${APIs.DELETE_ROOM_STATUS}${roomId}/state/${stateId}`).then(res => {
            notification.open({
                message: '删除成功',
            });
            setTimeout(() => {
                this.props.handleCancel()
            },300)
        }).catch(err => {
            console.warn('error --->', err)
        })
    }
    render() {
        console.log(this.props.modalStore)
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={ this.props.modalStore.visible }
                title="新建预定"
                onOk={this.handleOk}
                onCancel={this.props.handleCancel}
                footer={[]}
                className="showModal"
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Col span={11}>
                            <FormItem>
                                {getFieldDecorator('beginTime',{
                                    initialValue: this.props.modalStore.isModalData.beginTime ? moment(this.props.modalStore.isModalData.beginTime).format('YYYY-MM-DD HH:mm:ss') : moment(this.props.modalStore.isModalData.time).format('YYYY-MM-DD HH:mm:ss')
                                })(
                                    <Select
                                    placeholder="开始时间"
                                    onChange={this.handleSelectChangeBegin}
                                    >
                                   {
                                      (this.props.modalStore.modalData.times) ? (
                                        this.props.modalStore.modalData.times.map(item => {
                                            return(
                                               <Option key={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>{moment(item.time).format('HH:mm')}</Option>
                                            )
                                        })
                                       ) : (null)
                                   }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            -
                        </span>
                        </Col>
                        <Col span={11}>
                            <FormItem>
                                {getFieldDecorator('endTime',{
                                    initialValue: this.props.modalStore.isModalData.endTime ? moment(this.props.modalStore.isModalData.endTime).format('YYYY-MM-DD HH:mm:ss') : moment(this.props.modalStore.isModalData.time).format('YYYY-MM-DD HH:mm:ss')
                                })(
                                    <Select
                                    placeholder="结束时间"
                                    onChange={this.handleSelectChangeEnd}
                                    >
                                        {
                                            (this.props.modalStore.modalData.times) ? (
                                                this.props.modalStore.modalData.times.map(item => {
                                                    return(
                                                    <Option key={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>{moment(item.time).format('HH:mm')}</Option>
                                                    )
                                                
                                                })
                                            ) : (null)
                                        } 
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('description',{
                            initialValue: this.props.modalStore.isModalData.description ? this.props.modalStore.isModalData.description : '' 
                        })(
                            <Input placeholder="请添写使用者和主题" />
                        )}
                    </FormItem>
                    <FormItem span={12}>
                        {
                            (this.props.modalStore.isModalData.id) ? (
                                <div>
                                    <Col span={11}>
                                        <Button style={{width:'100%'}} type="default" onClick={this.DeleteMessage}>
                                            删除
                                        </Button>
                                    </Col>
                                    <Col span={2}></Col>
                                    <Col span={11}>
                                        <Button style={{width:'100%'}} type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Col>
                                </div>
                            ): (
                                <Button style={{width:'100%'}} type="primary" htmlType="submit">
                                    提交
                                </Button> 
                            )
                        }
                    </FormItem>
                    
                </Form>
            </Modal>
        )
    }

}
export default Form.create()(showModal)

