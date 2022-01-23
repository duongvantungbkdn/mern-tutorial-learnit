import { createContext,useReducer,useState } from "react";
import { dataReducer } from '../reducers/DataReducer'
import { 
    DATAS_LOADED_SUCCESS,
    DATAS_LOADED_FAIL,
    CREATE_NEW_DATA,
    DELETE_DATA,
    UPDATE_DATA,
    FIND_DATA
    } from './constants'
import { apiUrl } from "./constants";
import axios from "axios";

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
    // useReducer to rerender front-end views
    const [dataState,dispatch] = useReducer(dataReducer,{
        dataChosen: null,
        datas: [],
        dataLoading: true
    })

    const findData = id => {
        const Data = dataState.datas.find(data => id === data._id)
        dispatch({type: FIND_DATA,payload: Data})
    }

    // show or hide Modal
    const [showCreateDataModal,setShowCreateDataModal] = useState(false)
    const [showEditDataModal,setShowEditDataModal] = useState(false)
    const [showConfirmDeleteModal,setShowConfirmDeleteModal] = useState(false)
    const [showToastMessage,setShowToastMessage] = useState({
        show: false,
        message: '',
        type: null
    })

    // get all Data from database server
    const getDatas = async() => {
        try {
            const response = await axios.get(`${apiUrl}/data/list`)
            if(response.data.success) {
                dispatch({type: DATAS_LOADED_SUCCESS, payload: response.data.datas})
            }
        } catch (error) {
            dispatch({type: DATAS_LOADED_FAIL})
        }
    }

    //create new Data
    const createNewData = async createDataForm => {
        try {
            const response = await axios.post(`${apiUrl}/data/create`,createDataForm)

            if(response.data.success){
                dispatch({type: CREATE_NEW_DATA,payload: response.data.data})
                return response.data
            } 
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    // delete one Data
    const deleteData = async dataId => {
        try {
            const response = await axios.delete(`${apiUrl}/data/${dataId}`)

            if(response.data.success) {
                dispatch({type: DELETE_DATA,payload: dataId})
            }
            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    // edit one Data
    const editData = async dataUpdate => {
        try {
            const response = await axios.put(`${apiUrl}/data/${dataUpdate._id}`,dataUpdate)

            if(response.data.success) {
                dispatch({type: UPDATE_DATA,payload: response.data.data})
                return response.data
            } 
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    // export Datas, states, functions to all component through useContext
    const dataContextData = {
        getDatas,
        dataState,
        showCreateDataModal,
        setShowCreateDataModal,
        showEditDataModal,
        setShowEditDataModal,
        showConfirmDeleteModal,
        setShowConfirmDeleteModal,
        showToastMessage,
        setShowToastMessage,
        createNewData,
        deleteData,
        editData,
        findData
    }

    // return render Component
    return (
        <DataContext.Provider value={dataContextData} >
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider

