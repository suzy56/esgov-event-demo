import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();
//  const app = dva({
//        initialState: {
//          products: [
//            { id: '1', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '2', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '3', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '4', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '5', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '6', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '7', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '1', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '2', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '3', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '4', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '5', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '6', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//            { id: '7', num: 898999211,title:'新增事件',place:'广州',type:'突发',time:'2018-09-08',step:'网格员' },
//          ],
//        },
//      });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
//app.model(require('./models/products').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
