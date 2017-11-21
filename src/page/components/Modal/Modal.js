import React from 'react';
import { Modal, Button, Form, Input,Select, Col } from 'antd';
const FormItem = Form.Item;
import moment from 'moment';
const Option = Select.Option;
import './Modal.css';
import axios from 'axios';
import APIs from '../../../common/api.js';

class showModal extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:false
        }
    }
    handleSubmit = (e) => {
        let body = {
            userId: '',
            day: `${this.props.modalTimes.day}`,
            roomId: '1'
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = Object.assign(body,values)
                axios({
                    method: 'PUT',
                    url: APIs.PUT_ROOM_STATUS,
                    data: data,
                    header: {
                        'Content-Type': 'application/json;charset=utf8'
                    }
                }).then(res => {
                    window.reload()
                    console.info(res)
                }).catch(err => {
                    console.warn(err)
                })
            }
        });
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
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
    render() {
        const { loading, TimeData } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={ this.props.visible }
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
                                {getFieldDecorator('beginTime')(
                                    <Select
                                    placeholder="开始时间"
                                    onChange={this.handleSelectChangeBegin}
                                    >
                                   {
                                      (this.props.modalTimes.times) ? (
                                        this.props.modalTimes.times.map(item => {
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
                                {getFieldDecorator('endTime')(
                                    <Select
                                    placeholder="结束时间"
                                    onChange={this.handleSelectChangeEnd}
                                    >
                                        {
                                            (this.props.modalTimes.times) ? (
                                                this.props.modalTimes.times.map(item => {
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
                        {getFieldDecorator('description')(
                            <Input placeholder="请添写使用者和主题" />
                        )}
                    </FormItem>
                    <FormItem span={12}>
                        <Button style={{width:'100%'}} type="primary" htmlType="submit">
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}
export default Form.create()(showModal)

