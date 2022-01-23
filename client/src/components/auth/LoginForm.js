import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    //context
    const {loginUser} = useContext(AuthContext)
    
    // navigate route
    //const navigate = useNavigate()

    // login user state
    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onchangeLoginForm = event => 
        setLoginForm({...loginForm,[event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {
            //    navigate('/dashboard')
            } else {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null),5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='text' 
                        placeholder='username' 
                        name='username' 
                        value={username}
                        onChange={onchangeLoginForm}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        value={password}
                        onChange={onchangeLoginForm}
                        required 
                    />
                </Form.Group>
                <Button variant='success' type='submit' className='mb-2'>Login</Button>
            </Form>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </>  

    )
}

export default LoginForm

