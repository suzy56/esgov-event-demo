import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';

class Menus extends Component{
	constructor(props){
		super(props);
		this.state = {
			openKeys: [],
		};
	}
	onOpenChange = (openKeys) => {
		let rootSubmenuKeys=this._getSubmenuKeys();
	    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
	    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
	      this.setState({ openKeys });
	    } else {
	      this.setState({
	        openKeys: latestOpenKey ? [latestOpenKey] : [],
	      });
	    }
	}

	_getSubmenuKeys(){
	    let rootSubmenuKeys=[];
	    const MList = this.props.menulist;
	    for(let i = 0;i<MList.length;i++){
	        rootSubmenuKeys.push(MList[i].id);
	    }
	    return rootSubmenuKeys;
	 }
	 
	componentWillMount(){
	}

	componentDidMount(){
    }

    toPms = (pmsurl) =>{
    	let jsonpurl="";
    	let rePath=pmsurl.split("//")[1];
    	let domain=rePath.split("/")[0];
    	//用户管理
    	if(pmsurl.indexOf("user") > 0) jsonpurl='http://'+ domain + '/alog-pms-web/pms/userRest/list?appCode=alog-oss-web';
    	//角色管理
    	if(pmsurl.indexOf("role") > 0) jsonpurl='http://'+ domain + '/alog-pms-web/pms/roleRest/listTree?appCode=alog-oss-web';
    	//仓库管理
    	if(pmsurl.indexOf("warehouse") > 0) jsonpurl='http://'+ domain + '/alog-pms-web/pms/warehouseRest/list';
    	this._getJsonp(jsonpurl,pmsurl);
		}

		_getJsonp(jsonpurl,pmsurl){//jsonp的调用
			fetchJsonp(jsonpurl,{
		    timeout: 3000,
		    jsonpCallback: 'callback',
		    jsonpCallbackFunction: 'pmstest'//回调函数名
		  	}).then((response) => {
	        	response.json();
	        	return response.json();
	        }).then(
	        	(data) => {
	          if(data.code=='3'){//后台访问认证中心不成功继续回调
	          	this._getJsonp(data.url,pmsurl);
	          }
	          if(data.code=='0'){//后台访问认证中心成功，单点登录成功，跳转页面
	          	if(data.msg){
	          		fetchJsonp(data.msg,{
					    timeout: 3000,
					    jsonpCallback: 'callback',
					    jsonpCallbackFunction: 'pmstest'
					  }).then((response) => {
			        	response.json(); 
			        	return response.json();
			        }).then((data)=>{
			        	window.location.href=pmsurl; //跳转
			        })
	          	}else{
	          		 window.location.href=pmsurl;
	          	}
	                    
	          }
	    	});
		}

   render(){

    	const {siderFold, darkTheme, Location, isNavbar } = this.props;
    	const menu=this.props.menulist;
    	const topMenus = menu.map(item => item.id);
    	const theToPms = this.toPms;
		const getMenus = function (menuArray, siderFold, parentPath) {
			parentPath = parentPath || '/';
			return menuArray.map(item => {
				if(item.children.length > 0) {
					return (
						<Menu.SubMenu key={item.id} title={<span>{item.staff ? <Icon type={item.staff} /> : ''}{siderFold && topMenus.indexOf(item.id) >= 0 ? '' : item.nodeName}</span>}>
							{getMenus(item.children, siderFold)}
						</Menu.SubMenu>
					)
				} else {
					let href = item.resourcePath;
					if(href.indexOf("http://") == -1){
						href = parentPath + href;
						return (		
							<Menu.Item key={item.id}>	
								<a href={href}>
									{/*{item.staff ? <Icon type={item.staff} /> : ''}*/}
									{siderFold && topMenus.indexOf(item.id) >= 0 ? '' : item.nodeName}
								</a>
							</Menu.Item>
						);
					}else{
						return (		
							<Menu.Item key={item.id}>	
								<a href='javascript:void(0);' onClick={() => theToPms(href)}>
									{siderFold && topMenus.indexOf(item.id) >= 0 ? '' : item.nodeName}
								</a>
							</Menu.Item>
						);
					}
					   
				
				}
			});
		};
		const menuItems = getMenus(menu, siderFold);
		return (
			<Menu
				mode={siderFold ? 'vertical' : 'inline'}
				theme='dark'
        		onOpenChange={this.onOpenChange}
        		defaultOpenKeys={['7926102ad3ad42e59c60a57c2da825a1']}
        		defaultSelectedKeys={['5caecb98d5d14b9892fdd429d20c744a']}
        	>
				{menuItems}
			</Menu>
		);
    }
}

export default Menus;



