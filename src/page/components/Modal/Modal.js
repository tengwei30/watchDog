import React from 'react';
import { Modal, Button, Form, Input,Select, Col } from 'antd';
const FormItem = Form.Item;
import moment from 'moment';
const Option = Select.Option;
import times from '../../../common/timeConfig.js';
import './Modal.css';

class showModal extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:false,
        }
    }
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
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
                        {getFieldDecorator('meetTheme')(
                            <Input placeholder="预定主题" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Col span={11}>
                            <FormItem>
                                {getFieldDecorator('beginTime')(
                                    <Select
                                    placeholder="开始时间"
                                    onChange={this.handleSelectChangeBegin}
                                    >
                                    {
                                       times[1].map((item,index) => {
                                            return (
                                                <Option value={`${item}`} key={index}>{item}</Option>
                                            )
                                        })
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
                                        times[1].map((item,index) => {
                                            return (
                                                <Option value={`${item}`} key={index}>{item}</Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('userPeople')(
                            <Input placeholder="使用人" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('memo')(
                            <Input placeholder="备注" />
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

