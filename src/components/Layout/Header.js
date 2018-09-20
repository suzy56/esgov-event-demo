import React from 'react';
import { Menu, Icon, Popover } from 'antd';
import styles from './main.less';
import Menus from './Menus';
import logo from '../../assets/header_bg.png'

import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

function Header ({users, logout, tokenUrl,switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover}) {
	let handleClickMenu = e =>{
		e.key === 'logout' && logout();
		e.key === 'switch' && logout();
	}
	const menusProps = {
		siderFold: false,
		darkTheme: false,
		isNavbar,
		handleClickNavMenu: switchMenuPopover,
		location
	};
	var imgStyle = {
		backgroundImage: 'url('+logo+') no-repeat center center'
	}
	return (
		<div className={styles.header} style={{backgroundImage: "url(" + require("../../assets/header_bg.png") + ")"}}>
			<div className={styles.header_title}>系统综合配置</div>
			<div className={styles.header_tab}>
				<div className={styles.header_tab_item_active}>系统管理</div>
				<div className={styles.header_tab_item}>单点登录</div>
			</div>
			<iframe style={{"display":"none"}} src={tokenUrl}></iframe>
			<Menu mode='horizontal' className='headermenu' onClick={handleClickMenu}>

				<SubMenu title={<span><Icon type='poweroff'/>{users.userName}，欢迎你！</span>}>
					<Menu.Item key='switch'>
						<a>切换账号</a>
					</Menu.Item>
					<Menu.Item key='logout'>
						<a>退出</a>
					</Menu.Item>
				</SubMenu>
			</Menu>
			
		</div>
	);
}

export default Header;


