import React, {Component} from 'react';
import Header from '../components/header/Header';
import '../../src/assets/css/eventform.css';
class CreateEvent extends Component{
  constructor(props){
    super(props);
    this.state={
      hasError:false,
      errorMessage:'',
      dateVal:'',
      meetingName:'',
      meetingDesc:'',
      attendees:'',
      editMode:false
    }
  }
  componentDidMount(){
    if(this.state.editMode){
      
    }
  }
  render(){
    return (
        
        <div className="event-creation-container">
           <Header></Header>
           <div className="event-creation-form">
             <form id="eventCreationForm">
                <div className="label-wrap">
                  <label>Meeting date</label>
                  <input type="text" value={this.state.dateVal}></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting name</label>
                  <input type="text" value={this.state.meetingName}></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting description</label>
                  <textarea type="date" value={this.state.meetingDesc}></textarea>
                </div>
                <div className="label-wrap">
                  <label>Meeting Attendees</label>
                  <input type="text" value={this.state.attendees}></input>
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
