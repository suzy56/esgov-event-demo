import request from '../utils/request'


const Event={
    namespace:"event",

    //定义state结构
    state:{
        list:[],
        visibleModea:false
    },

    //同步方法
    reducers:{
        save(state,{payload:{data:list}}){
            return{
                ...state,
                list
            }
        }
    },
    effects:{
        * query(a={},{call,put}){
            const {data} = yield call(request,'/api/events',{method:'GET'});
            //异步调用成功后同步更新本地state树
            yield put({type:'save',payload:{data}});
        },
        * create({payload:{event}},{call,put}){
            yield call(request,'/api/addevents',{
                body:JSON.stringify(event),
                method:'POST'
            })
            yield put({type:'query',payload:{  }});
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            console.log('正在监听');
            return history.listen(({pathname,search}) => {
                console.log(`pathname : ${pathname}`);
                //state发生变化会调用query方法刷新列表
                dispatch({type:'query'})

            })
        }
    }
}

export default Event