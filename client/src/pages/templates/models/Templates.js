import * as templatesServices from '../services/Templates';
export default {

  namespace: 'templates',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/templates.html') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(templatesServices.fetch);
      const { code, info, message } = data;
      if (code === 0) {
        yield put({
          type: 'save',
          payload: {
            list: info.list
          },
        });
      } else {
        console.log(message)
      }
    }
  },

  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
  },

};
