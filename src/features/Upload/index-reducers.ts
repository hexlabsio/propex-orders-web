import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, UploadState } from './index-state';

const reducer: Reducer<UploadState, Actions.ACTIONS> = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
};

export default reducer;
