import React from 'react';
import { Modal, Button,Input } from 'antd';
import './Modal.css';

class showModal extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:false,
        }
    }
    handleOk = () => {
        this.setState({ loading: true });
        console.info(1)
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    render() {
        const { loading } = this.state
        return (
            <Modal
                visible={ this.props.visible }
                title="新建预定"
                onOk={this.handleOk}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk} >
                        提交
                    </Button>
                ]}
                className="showModal"
            >
                <p><Input placeholder="预定主题" /></p>
                <p><Input /></p>
                <p><Input placeholder="使用人" /></p>
                <p><Input placeholder="备注" /></p>
            </Modal>
        )
    }

}
export default showModal

