import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
    // load username from authState of AuthCOntext
    const {logoutUser, authState: {user: {username}}} = useContext(AuthContext)

    // logout
    const logout = () => logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Container fluid>
                <Navbar.Brand className='font-weight-bolder text-white'>
                    DuongTung
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title={`Wellcome ${username}`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">My Posts</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Button variant='danger' className='font-weight-bolder text-white' onClick={logout}>
                            Logout
                        </Button> 
                    </Nav>
                </Navbar.Collapse>
            </Container>            
        </Navbar>
    )
}

export default NavbarMenu
