import React, { Component } from 'react';
import { Tabs, Button, Icon } from 'antd';
import styles from './main.less';
const TabPane = Tabs.TabPane;

class MenuTab extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    var panes=[];
    this.state = {
      activeKey: panes.length>0?panes[0].key : '',
      panes,
      pghrefs:[]
    };
  }
  onChange = (activeKey) => {
    let nowIndex;
    let {pghrefs} = this.state;
    this.state.pghrefs.forEach((pghref, i) => {
      if (pghref.key === activeKey) {
        nowIndex = i;
      }
    });
    let topage = "#/"+pghrefs[nowIndex].path;
    this.setState({ activeKey });
    window.location.href = topage;
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const keyname = this.props.children.props.route.name;
    const menuName = this._getMenuName(keyname);
    const {panes,pghrefs} = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    let atciveHf = this.props.children.props.route.path;
    if(atciveHf.indexOf("/:")>0){//检查是否有详情
      atciveHf=atciveHf.split("/:")[0];
    };
    panes.push({ title: menuName, content: this.props.children, key: activeKey });
    pghrefs.push({path:atciveHf,key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let isHomePage=false;
    let {activeKey,pgstate}= this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        if(pane.title.indexOf('首页')>-1){
          isHomePage=true;
          return;
        }else{
           lastIndex = i - 1;
        }
      
      }
    });
    if(isHomePage){
      return
    }else{
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        const pghrefs = this.state.pghrefs.filter(pghref => pghref.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey,pghrefs});
        let theIndex = lastIndex < 0 ? 0 : lastIndex;
        if(pghrefs.length>0){
          let topage = "#/"+pghrefs[theIndex].path+pghrefs[theIndex].search;
          window.location.href = topage;
        }else{
          window.location.href = '#/homePage';
        }
    }
    
  }

  componentDidMount(){
      this.add();
  }

  componentDidUpdate(){
    let {pghrefs,activeKey} = this.state;
    let atciveHf = this.props.children.props.route.path;
    let nowpage = this._getUrlRelativePath();
    let nlength = nowpage.length;
    let nowpage2 = nowpage.substring(3,nlength);
    if(atciveHf.indexOf("/:")>0){//对详情的单独处理
      atciveHf=atciveHf.split("/:")[0];
      let tmpnumb=nowpage2.split("/");
      let number=tmpnumb[tmpnumb.length -1].length;
      nowpage2=nowpage2.substring(0,(nowpage2.length-number-1));
    } 

    if(atciveHf == nowpage2 && !this._contains(pghrefs,atciveHf)){
      this.add();
    }

    let nowIndex;
    let isnowpage=false;
      this.state.pghrefs.forEach((pghref, i) => {
        if (pghref.path === nowpage2) {
          nowIndex = i;
        }
      });

      //对第一个tab页面的单独处理
      if((nowIndex == 0 || nowIndex) && pghrefs.length>=1 && pghrefs[nowIndex].key != activeKey){
          isnowpage = true;
        }else{
          isnowpage = false;
        }

    if(this._contains(pghrefs,nowpage2) && isnowpage){     
      this.onChange(pghrefs[nowIndex].key);
    }

  }

  _contains(arr, obj) {//检查数组中是否包含相同的字符串
    let i = arr.length;  
    while (i--) {  
        if (arr[i].path === obj) {  
            return true;  
        }  
    }  
    return false;  
  }
  //获取相对路径
   _getUrlRelativePath(){
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");

　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
　　}

  //获取tab页头显示的名称，若是直接输入的，这显示对应的路径名
  _getMenuName(name){
    let menuName;
    const MList = this.props.menulist;
    outer:
    for(let i = 0;i<MList.length;i++){
        for(let j = 0;j<MList[i].children.length;j++){
          let level2 = MList[i].children[j];
            inner:
            for(let k = 0;k < level2.children.length;k++){
              let level3 = level2.children[k];
              if(level3.resourcePath.indexOf(name) > 0){
                 menuName = level3.nodeName;
                 break outer;
              }
            }
            if(level2.resourcePath.indexOf(name) > 0){
               menuName = level2.nodeName;
               break outer;
            }
        }
    }
    //if(!menuName) menuName=name;
    if(!menuName){
      switch (name){
        case 'homePage':
          menuName="首页";
          break;
        default:
          menuName = name;
        }
    }
    return menuName;
  }
  render() {
    var len = this.state.panes.length
    var data;
    this.state.panes.map((item) => {
      if(item.key == this.state.activeKey) {
        data = item
      }
    })
    return (
      <div>
        <div style={{width:'100%',height:'40px',paddingLeft:'24px',background:'#e7eaec',lineHeight:'40px',fontSize:'12px',color:'#565656'}}>
          <Icon type='home' /> 首页
          <span style={{color:'#c6c6c6',margin:'0 6px'}}>/</span>
          {data ? 
              <span style={{color:'#2f7fb8'}}>{data.title == '首页' ? '' : data.title}</span>
              : ''
          }
          
        </div>
        { data ? 
          <div>{data.content}</div> :
          <div></div>
        }
      </div>
    );
  }
}

export default MenuTab;