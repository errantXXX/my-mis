import {message, Modal} from 'antd';
import {getApi, api, apiDirect, getDirect, setToken, mock} from '../utils/api'
import Base from '../utils/base';

let historyInst = null;
let dispatchInst = null;
let jumpToIndex = false;
export default {

    namespace: 'api',

    state: {
        keyword: '',
        couponType: '',
        current_price: '',
    },

    subscriptions: {
        setup({dispatch, history}) {
            historyInst = history;
            dispatchInst = dispatch;
        },
    },

    effects: {
        * get({payload, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(getApi, payload.query, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            yield put({
                type: 'apisucc',
                name: payload.name,
                payload: data,
            });
        },
        * post({payload, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(api, payload.form, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                    url: payload.url,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    // Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            yield put({
                type: 'apisucc',
                name: payload.name,
                payload: data,
            });
        },
        * postDirect({payload, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(apiDirect, payload.form, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                    url: payload.url,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    // Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            yield put({
                type: 'apisucc',
                name: payload.name,
                payload: data,
            });
        },
         * getDirect({payload, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(getDirect, payload.form, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                    url: payload.url,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    // Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            yield put({
                type: 'apisucc',
                name: payload.name,
                payload: data,
            });
        },                 
        * mock({payload, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(mock, payload.form, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                    url: payload.url,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            yield put({
                type: 'apisucc',
                name: payload.name,
                payload: data,
            });
        },
        * portalFetch({payload, succType, dataMap, succCallback}, {call, put}) {
            yield put({
                type: 'loading',
                value: true,
                api: payload.url,
            })
            const {data, err} = yield call(api, payload.form, payload.url, payload.time)
            yield put({
                type: 'loading',
                value: false,
                api: payload.url,
            })
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            if (data && data.code === 0) {
                yield put({
                    type: `portal/${succType}`,
                    dataMap: dataMap || (a => a),
                    payload: data,
                });
            } else if (data && (data.code === 403 || data.code === 401)) {
                message.error(data.msg, 5);
                yield put({
                    type: 'logout',
                    payload: data,
                });
            } else {
                yield put({
                    type: 'postFail',
                    payload: data,
                });
            }
        },
        * login({payload, succCallback}, {call, put}) {
            // const { data } = yield call(api, payload, 'user/login', false, 'ofowork/');
            const {data, err} = yield call(api, payload, 'user/login', payload.time);
            // const { data } = yield call(api, payload, 'auth/user/login');
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                });
            }
            if (succCallback && data) {
                try {
                    succCallback(data)
                }
                catch (e) {
                    Modal.error({title: '数据错误！', content: '若要排查原因，请联系相关开发人员。'});
                }
            }
            ;
            if (data) {
                if (data.code === 200) {
                    jumpToIndex = true;
                    yield put({
                        type: 'loginSucc',
                        payload: data,
                    });
                } else {
                    yield put({
                        type: 'loginFail',
                        payload: data,
                    });
                }
            }
        },
        * loginSucc({payload}, {call, put}) {
            setToken(payload.data.token);
            localStorage.setItem('token', payload.data.token); // eslint-disable-line
            const {data, err} = yield call(api, {}, 'common/getUserInfo', payload.time);
            // const { data } = yield call(getApi, {}, 'auth/user/getUserInfo');
            if (err) {
                yield put({
                    type: 'fetchError',
                    err: err,
                    url: 'common/getUserInfo',
                });
            }
            if (data) {
                if (data.code === 0) {
                    localStorage.setItem('language', data.language ? data.language : 'en');
                    localStorage.setItem('name', data.data.name ? data.data.name : 'name');
                    localStorage.setItem('phone', data.data.phone ? data.data.phone : 'phone');
                    if (data.data && data.data.length == 0) {
                        yield put({type: 'logout'});
                    } else {
                        yield put({
                            type: 'getUserPermissionSucc',
                            payload: data,
                        });
                    }
                }else{
                    Base.ModFailSupply('操作失败', data.msg, data.data);
                }
            }
        },
        * getUserPermissionSucc({payload}, {call, put}) {
            if (jumpToIndex) {
                yield historyInst.push('/');
            }
        },
        * logout() {
            localStorage.removeItem('token'); // eslint-disable-line
            localStorage.removeItem('name'); // eslint-disable-line
            localStorage.removeItem('phone'); // eslint-disable-line
            yield historyInst.push('/login')
        },
        * fetchError({err, url}, {call, put}) {
            if (err == 'timeout') {
                yield message.error(`接口请求超时`, 5);
                if(url === 'balance/detail') {
                    historyInst.go(-1)
                }
                return;
            }
            else if ((err && err.response && err.response.status == 401) || (err && url == 'common/getUserInfo')) {
                // yield message.error("token过期或未授权，请重新登录!", 5);
                yield Modal.error({title: url, content: 'token过期或未授权，请重新登录!'});
                yield put({type: 'logout'});
                return;
            } else if (err == 'TypeError: Failed to fetch') {
                yield Modal.error({title: url, content: '接口无权限或访问失败，请联系管理员'});
                // yield put({type: 'logout'});
                // if(url === 'balance/detail') {
                //     historyInst.go(-1)
                // }
                return;
            }
            yield message.error('网络错误', 5);
            return;
        },
    },

    reducers: {
        postSucc(state, action) {

        },
        getUserPermissionSucc(state, action) {
            const a = action.payload.data.permissionList;
            // a.push('/order/list')
            return Object.assign({}, state, {
                apilist: a,
                name: action.payload.data.name,
                phone: action.payload.data.phone,
            })
        },
        postFail(state, action) {
            return Object.assign({}, state, {msg: action.payload ? action.payload.msg : '请求失败!'})
        },
        apisucc(state, action) {
            return Object.assign({}, state, {[action.name]: action.payload});
        },
        loginFail(state, action) {
            return Object.assign({}, state, {message: action.payload.msg, data: action.payload});
            // return Object.assign({}, state, { message: action.payload.message });
        },
        loginSucc(state, action) {
            return Object.assign({}, state, {token: action.payload.data.token, message: null});
        },
        loading(state, action) {
            const value = Object.assign({}, state.loading || {});
            if (action.value) {
                value[action.api] = true;
            } else {
                delete value[action.api];
            }
            return Object.assign({}, state, {loading: value});
        },
        logout(state, action) {
            return Object.assign({}, state, {token: null, message: null});
        },
        menu(state, action) {
            return Object.assign({}, state, {menuCurrent: action.payload});
        },
        changeKyeword(state, action) {
            return Object.assign({}, state, action.payload)
        }
    },

}
