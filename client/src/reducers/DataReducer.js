import { 
    DATAS_LOADED_SUCCESS,
    DATAS_LOADED_FAIL,
    CREATE_NEW_DATA,
    DELETE_DATA,
    UPDATE_DATA,
    FIND_DATA
    } from '../contexts/constants'

export const dataReducer = (state,action) => {
    const {type,payload} = action
    switch(type) {
        case DATAS_LOADED_SUCCESS:
            return {
                ...state,
                datas: payload,
                dataLoading: false
            }

        case DATAS_LOADED_FAIL:
            return {
                ...state,
                datas: [],
                dataLoading: false
            }

        case CREATE_NEW_DATA:
            return {
                ...state,
                datas: [...state.datas,payload]
            }
        case DELETE_DATA:
            return {
                ...state,
                datas: state.datas.filter(data => data._id !== payload)
            }
        case UPDATE_DATA:
            return {
                ...state,
                datas: state.datas.map(data => 
                    data._id === payload._id
                    ? payload
                    : data
                    )
            }
        case FIND_DATA:
            return {
                ...state,
                dataChosen: payload
            }

        default:
            return state
    }
}
