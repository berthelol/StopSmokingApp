import {
  FETCH_HOME_ADDRESS,
  FETCH_HOME_ADDRESS_SUCCESS,
  FETCH_HOME_ADDRESS_FAILURE,
  FETCH_WORK_ADDRESS,
  FETCH_WORK_ADDRESS_SUCCESS,
  FETCH_WORK_ADDRESS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  home_address_loading: null,
  home_address: null,
  home_address_success: null,
  work_address_loading: null,
  work_address: null,
  work_address_success: null
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOME_ADDRESS:
      return {
        ...state,
        home_address_loading: true
      };
    case FETCH_HOME_ADDRESS_SUCCESS:
      return {
        ...state,
        home_address_loading: false,
        home_address: action.payload,
        home_address_success: true
      };
    case FETCH_HOME_ADDRESS_FAILURE:
      return {
        ...state,
        home_address_loading: false,
        home_address: null,
        home_address_success: false
      };
    case FETCH_WORK_ADDRESS:
      return {
        ...state,
        work_address_loading: true
      };
    case FETCH_WORK_ADDRESS_SUCCESS:
      return {
        ...state,
        work_address_loading: false,
        work_address: action.payload,
        work_address_success: true
      };
    case FETCH_WORK_ADDRESS_FAILURE:
      return {
        ...state,
        work_address_loading: false,
        work_address: null,
        work_address_success: false
      };
    default:
      return state;
  }
}
