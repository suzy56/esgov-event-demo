import React from 'react';
import { Icon, Switch } from 'antd';
import styles from './main.less';
import Menus from './Menus';

function Sider ({menulist,user,cookie,siderFold, darkTheme, location, changeTheme }) {
	const menusProps = {
		menulist,
		user,
		cookie,
		siderFold,
		darkTheme,
		location
	};
	return (
		<div>
			<Menus {...menusProps} />
			{/*{!siderFold ? 
				<div className={styles.switchtheme}>
					<span><Icon type='bulb' />切换主题</span>
					<Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
				</div>
				: ''}*/}
		</div>
	);
}

export default Sider;
