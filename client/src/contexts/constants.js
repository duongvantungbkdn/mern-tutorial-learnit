export const apiUrl = 
    process.env.NODE_ENV !== 'production' 
        //? 'http://localhost:5000' 
        ? 'https://lit-peak-41408.herokuapp.com'
        //? 'https://blooming-refuge-50059.herokuapp.com'
        : 'someDeployUrl'

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

export const DATAS_LOADED_SUCCESS ='DATAS_LOADED_SUCCESS'
export const DATAS_LOADED_FAIL = 'DATAS_LOADED_FAIL'
export const CREATE_NEW_DATA = 'CREATE_NEW_DATA'
export const DELETE_DATA = 'DELETE_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'
export const FIND_DATA = 'FIND_DATA'