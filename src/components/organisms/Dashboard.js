import React, {Component} from 'react';
import Header from '../molecules/header/Header';
import CalenderComponent from '../molecules/calendar/CalenderComponent';

import '../../assets/css/dashboard.css';
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
