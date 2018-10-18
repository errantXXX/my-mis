
export default {
    namespace: 'helperStore',
    state: {
    },
    reducers: {
      updateState (state, { payload }) {
          return {
              ...state,
              ...payload,
          }
      },
    },
  }
  