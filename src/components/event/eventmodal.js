import React,{Component} from 'react'
import { Modal,Form,Input} from 'antd'

class EventModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }

    render(){
        const { children, form:{getFieldDecorator},record,ok} = this.props;


        const showModal = () => {
            this.setState({
                visible:true
            })
        };
        const hideModal = () => {
            this.setState({
                visible:false
            })
        };

        const save = () => {
            this.props.form.validateFields((err,val) => {
                    ok(val);
                    hideModal();
            })
        }

        return(
            <div>
                <span onClick={ showModal}>
                    {children}
                </span>
                <Modal
                    title="事件上报"
                    visible={this.state.visible}
                    onCancel={hideModal}
                    onOk={save}
                >
                    <Form>
                        <Form.Item label="事件标题">
                            {
                                getFieldDecorator('eventTitle',{
                                    initiaValue:record.name
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="位置说明">
                            {
                                getFieldDecorator('eventSite',{
                                    initiaValue:record.name
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="来源渠道">
                            {
                                getFieldDecorator('eventSoure',{
                                    initiaValue:record.name
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="事件类型">
                            {
                                getFieldDecorator('eventType',{
                                    initiaValue:record.name
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="处置期限">
                            {
                                getFieldDecorator('eventDeadline',{
                                    initiaValue:record.name
                                })(<Input/>)
                            }
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        )

        
    }
}


export default Form.create()(EventModal)