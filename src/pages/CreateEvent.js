import React, {Component} from 'react';
import Header from '../components/header/Header';
import '../../src/assets/css/eventform.css';
class CreateEvent extends Component{
  
  render(){
    return (
        
        <div className="event-creation-container">
           <Header></Header>
           <div className="event-creation-form">
             <form id="eventCreationForm">
                <div className="label-wrap">
                  <label>Meeting date</label>
                  <input type="date"></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting name</label>
                  <input type="text"></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting description</label>
                  <textarea type="date"></textarea>
                </div>
                <div className="label-wrap">
                  <label>Meeting Attendees</label>
                  <input type="email"></input>
                </div>
                <div className="button-wrap">
                  <button className="submit-btn">Submit</button>
                </div>
             </form>
             
           </div>
        </div>
    );
  }
  
}

export default CreateEvent;
