import * as pageeditServices from '../services/pageedit';
import { message } from 'antd';
import router from 'umi/router';
export default {

  namespace: 'pageedit',

  state: {
    page_name: '',
    url: '',
    crud_url: '',
    page_template: null,
    searchFields: [],
    selected_components: [],
    showFields: [],
    list: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/pageedit.html') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      let page_id = yield select(state => state.pages.curPage);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      if (!page_id) {
        page_id = localStorage.getItem('curPage');
      }
      const rst = yield call(pageeditServices.fetch, { id, page_id });

      const data = rst[0].data;
      const { page_config = { url: '', selected_components: [], fields: {} }, crud_url, page_name, page_template } = data.info;

      const data_c = rst[1].data;
      const { list } = yield data_c.info;
      const a = yield list.filter(item => {
        return item.temp_id === page_template
      })[0];

      yield put({
        type: 'save',
        payload: {
          page_name,
          url: page_config.url || '',
          crud_url: crud_url || '',
          page_template,
          selected_components: page_config.selected_components || [],
          searchFields: page_config.fields.searchFields || [],
          showFields: page_config.fields.showFields || [],
          list: a.temp_components || []
        },
      });
    },
    *submit({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      let page_id = yield select(state => state.pages.curPage);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      if (!page_id) {
        page_id = localStorage.getItem('curPage');
      }
      const values = yield select(state => state.pageedit)
      const { data } = yield call(pageeditServices.submit, { id, page_id, values });
      if (data.code === 0) {
        message.success('保存成功');
        router.push('/pages.html');
      } else {
        message.error(data.message)
      }
    }
  },

  reducers: {
    save(state, { payload: { page_name, crud_url, url, page_template, selected_components, searchFields, showFields, list } }) {
      return { ...state, crud_url, page_name, url, page_template, selected_components, searchFields, showFields, list };
    },
    addSearch(state, action) {
      const { searchFields } = state;
      return { ...state, searchFields: [...searchFields, action.payload] }
    },
    removeSearch(state, action) {
      const { searchFields } = state;
      searchFields.splice(action.payload.index, 1);
      return { ...state, searchFields: [...searchFields] }
    },
    addShow(state, action) {
      const { showFields } = state;
      return { ...state, showFields: [...showFields, action.payload] }
    },
    removeShow(state, action) {
      const { showFields } = state;
      showFields.splice(action.payload.index, 1);
      return { ...state, showFields: [...showFields] }
    },
    urlChange(state, action) {
      return { ...state, url: action.payload }
    },
    crudUrlChange(state, action) {
      return { ...state, crud_url: action.payload }
    },
    toggleComponent(state, action) {
      const payload = action.payload;
      const selected_components = state.selected_components;
      const nextSelected = payload.checked
        ? [...selected_components, payload.item]
        : selected_components.filter(t => t !== payload.item);
      const nextFields = payload.checked ? state[payload.item] : [];
      return { ...state, selected_components: nextSelected, [payload.item]: nextFields }
    }
  },

};
