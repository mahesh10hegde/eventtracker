import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../App.css';
class Header extends Component{
  
  render(){
    return (
        
        <nav className="main-navigation">
           <ul className="nav-header">
               <li><Link to="/dashboard">Dashboard</Link></li>
               <li><Link to="/createevent">Create event</Link></li>
           </ul>
        </nav>
    );
  }
  
}

export default Header;
