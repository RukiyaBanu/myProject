import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

 class Header extends Component {
    render(){
    return (
        <div> 
        <header className = "header">
            <nav className = "headerMenu">
            <NavLink to="/" className="route">General</NavLink>
            <NavLink to="/delegations" className="route">Delegation</NavLink>
            <NavLink to="/favorites" className="route">Favorite List</NavLink>
            </nav>
        </header>
       
        
        </div>
       
    )
}
 }
export default Header