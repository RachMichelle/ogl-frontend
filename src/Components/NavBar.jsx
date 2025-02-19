// Navbar
// conditional logic for what to display based on whether or not a user is logged in

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
} from 'reactstrap';
import '../stylesheets/NavBar.css';
import userContext from "../userContext";

const NavBar = () => {
    const { user, clearUser } = useContext(userContext);
    const navigate= useNavigate();

    // onClick function for logout --> clearUser (userContext) & go to home page
    const handleLogout = () => {
        clearUser();
        navigate('/');
    }

    return (
        <Navbar expand='md'>
            <NavLink tag={Link} to='/' className='Navbar-brand'>
                OGL
            </NavLink>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to='/staff'>Staff</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/players'>Players</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/teams'>Teams</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
                {/* determine what to diplay based on presence of user.username */}
                {!user.username && <NavItem>
                    <NavLink tag={Link} to='/login'>Staff Login</NavLink>
                </NavItem>}
                {user.username &&
                    <>
                        <NavbarText className='Nav-user-link'>Hi,
                            <Link to={`/staff/edit/${user.username}`}>
                                {user.username}
                            </Link>!
                        </NavbarText>
                        <NavItem>
                            <Button color='link'
                                onClick={handleLogout}>
                                log out
                            </Button>
                        </NavItem>
                    </>}
            </Nav>
        </Navbar>
    );
}

export default NavBar;