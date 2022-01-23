import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import About from './views/About'
import DataContextProvider from './contexts/DataContext'

function App() {
    return (
        <AuthContextProvider>
            <DataContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="login" element={<Auth authRoute='login' />} />
                        <Route path="register" element={<Auth authRoute='register' />} />

                        <Route element={<PrivateRoute/>}>
                            <Route path="dashboard" element={<Dashboard/>}/>
                            <Route path="about" element={<About/>}/>
                        </Route>                        
                    </Routes>
                </BrowserRouter>
            </DataContextProvider>
        </AuthContextProvider>
    );
}

export default App;
