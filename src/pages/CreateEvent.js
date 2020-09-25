import React, {Component} from 'react';
import Header from '../components/header/Header';

class CreateEvent extends Component{
  
  render(){
    return (
        
        <div className="event-creation-container">
           <Header></Header>
           <div className="event-creation-form">Create event</div>
        </div>
    );
  }
  
}

export default CreateEvent;
