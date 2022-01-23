import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Spinner from "react-bootstrap/esm/Spinner"
import NavbarMenu from "../layout/NavbarMenu"
import Container from "react-bootstrap/Container"

const PrivateRoute = () => {
    const {authState: {authLoading,isAuthenticated}} = useContext(AuthContext)
        
    if(authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else {
        return (
            isAuthenticated ?
            (<>
                <NavbarMenu/>
                <Container fluid>
                    <Outlet/>
                </Container>
            </>) :
            <Navigate to='/login' replace />
        )
    }    
}

export default PrivateRoute

