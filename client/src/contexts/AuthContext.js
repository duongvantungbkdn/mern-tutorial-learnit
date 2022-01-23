import axios from 'axios'
import { createContext,useReducer,useEffect} from 'react'
import { authReducer } from '../reducers/AuthReducer'
import setAuthToken from '../utils/setAuthToken'
import { apiUrl,LOCAL_STORAGE_TOKEN_NAME } from './constants'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //authenticate user
    const loadUser = async() => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}`)
            if(response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {isAuthenticated: true, user: response.data.user}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(() => loadUser(),[])

    //Login
    const loginUser = async loginForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/auth/login`,loginForm)
        
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //Register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/auth/register`,registerForm)
        
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // logout user
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({
            type: 'SET_AUTH',
            payload: {isAuthenticated: false, user: null}
        })
    }

    // Context data
    const authContextData = {loginUser,registerUser,logoutUser,authState}

    // return Provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider
