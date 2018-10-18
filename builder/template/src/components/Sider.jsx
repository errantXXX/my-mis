import React, {Component, PropTypes} from 'react';
import {Menu, Icon} from 'antd';
import {connect} from 'dva';
import kefu from '../routes/pages';
import {antTranlateWrappedComponent} from './Translate';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;

//set icon for Sider
const iconFilter = (name) => {
  let iconType = 'appstore';
  if(name==='城市数据'){
    iconType = 'line-chart';
  }else if(name==='国际版'){
    iconType = 'global';
  }else if(name==='财务报表'){
    iconType = 'bars';
  }else if(name==='围栏管理'){
    iconType = 'environment';
  }else if(name==='运营后台'){
    iconType = 'desktop';
  }else if(name==='Work后台'){
    iconType = 'user';
  }else if(name==='供应链系统'){
    iconType = 'fork';
  }else if(name==='NOAH后台'){
    iconType = 'user';
  }else if(name==='客服系统'){
    iconType = 'customer-service';
  }else if(name==='运营监控'){
    iconType = 'eye-o';
  }else if(name==='700BIKE'){
  }else if(name==='探索型需求'){
    iconType = 'rocket';
  }else if(name==='人员管理'){
    iconType = 'team';
  }else if(name==='交易订单'){
    iconType = 'bank';
  }else if(name==='用户信息'){
    iconType = 'user';
  }else if(name==='申诉审核'){
    iconType = 'check-square-o';  
  }else if(name==='小工具'){
    iconType = 'key';  
  }else if(name==='权限管理'){
    iconType = 'usergroup-add'; 
  }else if(name==='数据看板'){
    iconType = 'area-chart';   
  }else if(name==='首页'){
    
  };
    if(name==='骑行订单'){
        return <span><span className="ride-logo"/><span>{name}</span></span>;
    } else {
        return <span><Icon type={iconType}/><span>{name}</span></span>;
    }
}

const mapDef2Menu = (def, root, apilist) => {
  return def.map((item) => {
    const url = `${root}/${item.name}`;
    if (item.type === 'PAGE') {
      // const portals = item.portals.filter((portal) => {
      //     let api = portal.api;
      //   if (!api) return false
      //   if (api.substr(0, 1) !== '/') {
      //     api = `/${api}`;
      //   }
      //   return ((apilist || []).indexOf(api) >= 0);
      // })
      const portals = item.portals;
      if (portals.length > 0) {
        return <Menu.Item key={url} url={url}>{item.label}</Menu.Item>
      }
      return null;
    }
    if (!item.flag) {
      return null;
    }
    return (
      <SubMenu key={url} title={iconFilter(item.label)}>
        {mapDef2Menu(item.children, url, apilist)}
      </SubMenu>
    );
  }).filter((item) => {
    return item
  });
}

class Sider extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    //this.setState({ current: e.key });
    // console.log('handleClick', e.keyPath.reverse());
    this.props.dispatch({type: 'api/menu', payload: e.keyPath.reverse()});
    this.props.onMenuSelect(e.item.props);
  }

  /**
   * 判断带有chirlden的noah对象是否应该显示，被getFilterNoah调用
   * 给noah容器页面添加flag标志，标志容器页面是否存在
   * @param kefu {Object}：noah对象
   * @param noahItem {Array}：noah下面带有children的Item
   */
  isNoahItemExist = (kefu, noahItem) => {
    noahItem && noahItem.forEach((item) => {
      if (item.children) {
        this.isNoahItemExist(kefu, item.children);
      } else {
        item.portals && item.portals.forEach((portal) => {
          if (portal.api && this.props.apilist.indexOf(`/${portal.api}`) >= 0) {
            kefu.flag = true;
          }
        });
      }
    });
  }

  /**
   * 获取过滤无权限侧边栏后的noah列表
   * @param noahs {Object}
   * @returns {Array}
   */
  getFilterNoah = (noahs) => {
    if (noahs && this.props.apilist) {
      for (let i = 0, max = noahs.length; i < max; i++) {
        if (noahs[i] && noahs[i].children) {
          noahs[i].flag = false;
          noahs[i].isOpened = false;
          this.isNoahItemExist(noahs[i], noahs[i].children);
          if (!noahs[i].flag) {
            noahs[i] = null;
          } else {
            noahs[i].children = this.getFilterNoah(noahs[i].children)
          }
        }
      }
    }

    let filterNoahs = [];
    noahs.forEach((kefu) => kefu && filterNoahs.push(kefu));

    return filterNoahs;
  }

  /**
   * 根据选中的key，获取defaultOpenkeys
   * @param seleKey {Array}
   * @returns {Array}
   */
  getDefaultOpenKeys = (seleKey) => {
    if (seleKey[0]== undefined) {
      return []
    }
    let defaultOpenKeys = [],
        openKey = '',
        keys = seleKey[0].split('/');
    for (let i = 1, max = keys.length -1; i < max; i++) {
      openKey += `/${keys[i]}`;
      defaultOpenKeys.push(openKey);
    }

    return defaultOpenKeys
  }

  render() {
    let FilterNoahs,
        noahList = [],
        menuList = '',
        defaultSelectedKeys = [],
        defaultOpenKeys;
    this.props.location && defaultSelectedKeys.push(this.props.location.pathname);
    defaultSelectedKeys.length > 0 && (defaultOpenKeys = this.getDefaultOpenKeys(defaultSelectedKeys));
    kefu.forEach((item) => noahList.push(item));
    FilterNoahs = this.getFilterNoah(noahList);
    menuList = mapDef2Menu(FilterNoahs, '', this.props.apilist);
    return (
      FilterNoahs.length == 0 ?
        <div style={{width: '100%', position: 'absolute', textAlign: 'center', marginTop: '200px'}}>
          <span>暂无任何权限，请找相关人员咨询！</span>
        </div> :
        <Menu
          theme="dark"
          style={{width: '240px', minHeight: '100%'}}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          onClick={this.handleClick.bind(this)}
        >
          {menuList}
        </Menu>
    );
  }
}


Sider.propTypes = {};

const mapStateToProps = (state) => {
  return {
    menuCurrent: state.api.menuCurrent,
    apilist: state.api.apilist,
  }
}

export default connect(mapStateToProps)(antTranlateWrappedComponent(Sider));