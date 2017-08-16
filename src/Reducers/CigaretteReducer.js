import {ADD_CIGARETTE_SUCCESS,ADD_CIGARETTE_FAILURE,CIGARETTE_FETCH_SUCCESS,CIGARETTE_FETCH_FAILURE,CIGARETTE_FETCH} from '../actions/types';

const INITIAL_STATE= {add:'',days:'',loading:false};

export default (state=INITIAL_STATE,action) =>{
  switch (action.type) {
    case CIGARETTE_FETCH_SUCCESS:
    return {...state,days:action.payload,loading:false};
    case CIGARETTE_FETCH_FAILURE:
    return {...state,days:'',loading:false};
    case CIGARETTE_FETCH:
    return {...state,days:'',loading:true};
    case ADD_CIGARETTE_SUCCESS:
    return {...state,add:action.payload};
    case ADD_CIGARETTE_FAILURE:
    return {...state,add:action.payload};
    default:
    return state;

  }
}
