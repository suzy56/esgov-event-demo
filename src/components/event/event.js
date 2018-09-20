import {Table,Button} from 'antd'
import {connect} from 'dva'
import EventModal from './eventmodal'

const EventTable = ({list,dispatch}) => {
    const createEvent = (event) => {
        dispatch({
            type:'event/create',
            payload:{
                event
            }
        })
    }

    const columns = [
        {
            title: '序号',
            dataIndex:'number'
        },
        {
            title: '事件编号',
            dataIndex: 'id',
            render: value => <a >{value}</a>,
        },
        {
            title: '事件标题',
            dataIndex: 'eventTitle',
            render: value => <a >{value}</a>,
        },
        {
            title: '位置说明',
            dataIndex: 'eventSite'
        },
        {
            title: '来源渠道',
            dataIndex: 'eventSoure'
        },
        {
            title: '事件类型',
            dataIndex: 'event_type'
        },
        {
            title: '处置期限',
            dataIndex: 'eventDeadline'
        },
        {
            title: '操作'
        },
    ]

    return (
        <div>
            <EventModal record={{}}  ok={createEvent}>
                <Button type="primary">新增事件</Button>
            </EventModal>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={ t=>t.id}
                pagination={true}
            >
            </Table>
        </div>
    )
}


export default connect(({event}) => {
    console.log(event);
    return{
        list: event.list
    }
})(EventTable)