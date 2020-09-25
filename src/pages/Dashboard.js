import React, {Component} from 'react';
import Header from '../components/header/Header';
import WeekComponent from '../components/molecules/WeekComponent';
import DayComponent from '../components/molecules/DayComponent';
import '../../src/assets/css/dashboard.css';
class Dashboard extends Component{
  
  render(){
    return (
       
        <div className="dashboard-container">
           <Header></Header>
           <div className="month-calender">
               
                   <WeekComponent></WeekComponent>
               
              
                   <DayComponent></DayComponent>
              
           </div>
        </div>
    );
  }
  
}

export default Dashboard;
