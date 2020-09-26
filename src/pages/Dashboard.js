import React, {Component} from 'react';
import Header from '../components/molecules/header/Header';
import CalenderComponent from '../components/molecules/calendar/CalenderComponent';

import '../../src/assets/css/dashboard.css';
class Dashboard extends Component{
  
  render(){
    return (
       
        <div className="dashboard-container">
           <Header></Header>
           <div className="month-calender">
               
                  <CalenderComponent></CalenderComponent>
              
           </div>
        </div>
    );
  }
  
}

export default Dashboard;
