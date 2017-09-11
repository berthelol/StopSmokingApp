import {ADD_CIGARETTE,ADD_CIGARETTE_SUCCESS,ADD_CIGARETTE_FAILURE,CIGARETTE_FETCH_SUCCESS,CIGARETTE_FETCH_FAILURE,CIGARETTE_FETCH,LAST_CIGARETTE_FETCH_SUCCESS,LAST_CIGARETTE_FETCH_FAILURE,CIGARETTE_DELETE_SUCCESS,CIGARETTE_DELETE_FAILURE} from '../actions/types';

const INITIAL_STATE= {lastDelete:null,label:null,add_loading:false,days:'',loading:false,last:''};

export default (state=INITIAL_STATE,action) =>{
  switch (action.type) {
    case CIGARETTE_FETCH_SUCCESS:
    return {...state,days:action.payload,loading:false};
    case CIGARETTE_FETCH_FAILURE:
    return {...state,days:'',loading:false};
    case CIGARETTE_FETCH:
    return {...state,days:'',loading:true};
    case ADD_CIGARETTE :
    return {...state,add_loading:true};
    case ADD_CIGARETTE_SUCCESS:
    return {...state,label:action.payload,add_loading:false};
    case ADD_CIGARETTE_FAILURE:
    return {...state,add_loading:false};
    case LAST_CIGARETTE_FETCH_SUCCESS:
    return {...state,last:action.payload};
    case LAST_CIGARETTE_FETCH_FAILURE:
    return {...state,last:null};
    case CIGARETTE_DELETE_SUCCESS:
    return {...state,lastDelete:true};
    case CIGARETTE_DELETE_FAILURE:
    return {...state,lastDelete:false};
    default:
    return state;

  }
}
