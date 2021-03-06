import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SET_HOME_ADDRESS_SUCCESS,
  SET_HOME_ADDRESS_FAILURE,
  SET_WORK_ADDRESS_SUCCESS,
  SET_WORK_ADDRESS_FAILURE,
  REGISTER_BEGIN,
  REGISTER_USER,
  USER_ALREADY_EXIST
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  user: '',
  error: '',
  loading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return {
        ...state,
        username: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Problèmes d\'authentification.',
        password: '',
        loading: false
      };
    case USER_ALREADY_EXIST:
    return {
      ...state,
      error:'Username deja pris',
      loading: false
    }
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case SET_HOME_ADDRESS_SUCCESS:
      return {...state,user:{...state.user,home_address:action.payload}};
    case SET_WORK_ADDRESS_SUCCESS:
      return {...state,user:{...state.user,work_address:action.payload}};
    case REGISTER_BEGIN :
      return INITIAL_STATE;
    default:
      return state;

  }
}
