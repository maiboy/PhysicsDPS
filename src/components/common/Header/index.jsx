import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Popover } from 'antd';
import styles from './Header.less';
import Menus from '../Menus/report';
import { getSession } from '../../../utils';

const SubMenu = Menu.SubMenu;

const Header = ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu, dispatch }) => {
  //let handleClickMenu = e => e.key === 'logout' && logout()
  const handleClickMenu = e =>{
    if(e.key === 'logout'){
      logout();
    }
  };

  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  };

  // 检测登陆
  if (!getSession('user')) {
    window.location = `/index.html#/login`;
  }


  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>
        {/*<div className={styles.button}>*/}
          {/*<Icon type="mail" />*/}
        {/*</div>*/}
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />{user.username}</span>}
          >
            <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
            <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Header
