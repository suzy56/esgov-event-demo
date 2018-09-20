import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import Products from './routes/Products';
function RouterConfig({ history,app }) {
  //组件动态加载
  const EventPage=dynamic({
      app,
      models: () => [
        import('./models/event')
      ],
      component:() => import('./routes/eventPage')
  })

    //组件动态加载
    const MainPage=dynamic({
      app,
      models: () => [
        import('./models/event')
      ],
      component:() => import('./routes/mainPage')
  })


  return (
    <Router history={history}>
      <Switch>
      <Route path="/products" exact component={Products} />
      <Route path="/events" exact component={EventPage} />
      <Route path="/main" exact component={MainPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
