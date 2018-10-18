const Fetch = module.exports = {}
// 公共fetch
const comFetch = (flag, url, name, dispatch, formData, succCallback, apibase) => {
  if (flag === 'get') {
    dispatch({
      type: 'api/get',
      payload: { url, name, query: formData, apibase },
      succCallback,
    });
  } else if (flag === 'post') {
    dispatch({
      type: 'api/post',
      payload: { url, name, form: formData, apibase },
      succCallback,
    });
  }
}
/*
* 一些通用方法的抽象
*/
Fetch.getSuggestList = (dispatch, url, dispatchName, formData, succCallback) => {
  comFetch('get', url, dispatchName, dispatch, formData, succCallback);
}

/**
 * [sendRequest description]
 * @param  {[type]} url          [description]
 * @param  {[type]} method       [description]
 * @param  {[type]} dispatchName [description]
 * @param  {[type]} params       [description]
 * @param  {[type]} succCallback [description]
 * @param  {[type]} apiBase      [description]
 * @return {[type]}              [description]
 */
Fetch.sendRequest = (url, method, dispatchName, dispatch, params, succCallback, apiBase) => {
  method = method || 'get';
  comFetch(method, url, dispatchName, dispatch, params, succCallback, apiBase)
  //comFetch('get', 'supplier/get_list', 'getList', dispatch, formData, succCallback);
}

// ===========================================用户管理===============================================
 //用户列表
Fetch.userList = (dispatch, formData, succCallback) => {
  comFetch('get', 'user/backend/list', 'userList', dispatch, formData, succCallback);
}
 //用户禁用
Fetch.userForbidden = (dispatch, formData, succCallback) => {
  comFetch('post', 'user/backend/forbidden', 'userForbidden', dispatch, formData, succCallback);
}
 //用户启用
Fetch.userEnable = (dispatch, formData, succCallback) => {
  comFetch('post', 'user/backend/enable', 'userEnable', dispatch, formData, succCallback);
}
 //用户重置密码
Fetch.userReset = (dispatch, formData, succCallback) => {
  comFetch('post', 'user/backend/reset', 'userReset', dispatch, formData, succCallback);
}
// 解绑用户
Fetch.userUnbind = (dispatch, formData, succCallback) => {
  comFetch('post', 'user/backend/unbind', 'userUnbind', dispatch, formData, succCallback);
}
// 用户信息
Fetch.userInfo = (dispatch, formData, succCallback) => {
  comFetch('get', 'user/backend/info', 'userInfo', dispatch, formData, succCallback);
}
// 添加/更新 用户
Fetch.userInsert = (dispatch, formData, succCallback) => {
  comFetch('post', 'user/backend/insert', 'userInsert', dispatch, formData, succCallback);
}
// 部门列表
Fetch.userDepartmentList = (dispatch, formData, succCallback) => {
  comFetch('get', 'user/department/list', 'userDepartmentList', dispatch, formData, succCallback);
}
// work 的学校列表
Fetch.workSchoolList = (dispatch, formData, succCallback) => {
  comFetch('get', 'work/school/list', 'workSchoolList', dispatch, formData, succCallback);
}
// work的电子围栏列表
Fetch.workSocietyList = (dispatch, formData, succCallback) => {
  comFetch('get', 'work/society/list', 'workSocietyList', dispatch, formData, succCallback);
}
// work维修站列表
Fetch.workRepairList = (dispatch, formData, succCallback) => {
  comFetch('get', 'scm/repair/list', 'workRepairList', dispatch, formData, succCallback);
}
// 供应链仓库列表
Fetch.scmWarehouseList = (dispatch, formData, succCallback) => {
  comFetch('get', 'scm/warehouse/list', 'scmWarehouseList', dispatch, formData, succCallback);
}
// 供应链厂商
Fetch.scmFactoryList = (dispatch, formData, succCallback) => {
  comFetch('get', 'scm/factory/list', 'scmFactoryList', dispatch, formData, succCallback);
}
// 用户角色列表
Fetch.userRoleList = (dispatch, formData, succCallback) => {
  comFetch('get', 'role/backend/user/list', 'userRoleList', dispatch, formData, succCallback);
}
// 获取城市
Fetch.cityList = (dispatch, formData, succCallback) => {
  comFetch('get', 'work/city/list', 'cityList', dispatch, formData, succCallback);
}

// ===========================================角色管理===============================================
// 角色列表
Fetch.roleList = (dispatch, formData, succCallback) => {
  comFetch('get', 'role/backend/list', 'roleList', dispatch, formData, succCallback);
}
// 子角色列表
Fetch.childRoleList = (dispatch, formData, succCallback) => {
  comFetch('get', 'role/childRole/list', 'childRoleList', dispatch, formData, succCallback);
}
// 角色组列表
Fetch.roleGroupList = (dispatch, formData, succCallback) => {
  comFetch('get', 'role/group/list', 'roleGroupList', dispatch, formData, succCallback);
}
// 添加角色组
Fetch.roleGroupInsert = (dispatch, formData, succCallback) => {
  comFetch('post', 'role/group/insert', 'roleGroupInsert', dispatch, formData, succCallback);
}
// 角色信息
Fetch.roleInfo = (dispatch, formData, succCallback) => {
  comFetch('post', 'role/backend/info', 'roleInfo', dispatch, formData, succCallback);
}
// 角色添加
Fetch.roleInsert = (dispatch, formData, succCallback) => {
  comFetch('post', 'role/backend/insert', 'roleInsert', dispatch, formData, succCallback);
}
// app列表
Fetch.appList = (dispatch, formData, succCallback) => {
  comFetch('get', 'app/list', 'appList', dispatch, formData, succCallback);
}
// OA列表
Fetch.roleUrlList = (dispatch, formData, succCallback) => {
  comFetch('get', 'role/url/list', 'roleUrlList', dispatch, formData, succCallback);
}
