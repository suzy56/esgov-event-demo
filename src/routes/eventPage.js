import {connect} from 'dva'
import Main from '../components/temlayout/main'
import EventTable from '../components/event/event'
const EventPage = () => {
    return(
        <Main>
            <h1>上报事件</h1>
            <EventTable/>
        </Main>
    )
}

export default connect()(EventPage)