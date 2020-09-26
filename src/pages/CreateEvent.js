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
  handleDateChange = (e) =>{
    this.setState({"dateVal":e.target.value});
  }
  handleMeetingNameChange = (e) =>{
    this.setState({"meetingName":e.target.value});
  }
  handleMeetingDescChange = (e) =>{
    this.setState({"meetingDesc":e.target.value});
  }
  handleAttendeesChange = (e) =>{
    this.setState({"attendees":e.target.value});
  }
  handleEventFormSubmit = (e) =>{
    e.preventDefault();
    let dateVal=this.state.dateVal;
    let meetingName = this.state.meetingName;
    let meetingDesc = this.state.meetingDesc;
    let attendees = this.state.attendees;
    if(!dateVal || !attendees || !meetingName){
      this.setState({"hasError":true,"errorMessage":"fill all the required fields"});
    }
    else if(!this.isValidDate(dateVal)){
      this.setState({"hasError":true,"errorMessage":"Enter correct date in dd/mm/yyyy format"});
    }else if(!this.validateAttendees(attendees)){
      this.setState({"hasError":true,"errorMessage":"Enter correct attendees email ids"});
    }else{
      this.setState({"hasError":false,"errorMessage":''});
    }
  }
  validateAttendees(emailString){
  var emailList=emailString.split(",");
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var isValid =false;
  if(emailList.length>1){
    var filteredArr= emailList.filter((email)=>{
      return !reg.test(email);
    });
    if(filteredArr.length>0){
      isValid=false;
    }else{
      isValid = true;
    }
  }else{
    if(reg.test(emailString)){
      isValid = true
    }
  }
  return isValid
  }
isValidDate(dateString){

    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
  render(){
    return (
        
        <div className="event-creation-container">
           <Header></Header>
           <div className="event-creation-form">
             <form id="eventCreationForm">
               {this.state.hasError?<p className="error">{this.state.errorMessage}</p>:''}
                <div className="label-wrap">
                  <label>Meeting date*</label>
                  <input type="text" value={this.state.dateVal} onChange={this.handleDateChange}></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting name*</label>
                  <input type="text" value={this.state.meetingName} onChange={this.handleMeetingNameChange}></input>
                </div>
                <div className="label-wrap">
                  <label>Meeting description</label>
                  <textarea type="date" value={this.state.meetingDesc} onChange={this.handleMeetingDescChange}></textarea>
                </div>
                <div className="label-wrap">
                  <label>Meeting Attendees*</label>
                  <input type="text" value={this.state.attendees} onChange={this.handleAttendeesChange}></input>
                </div>
                <div className="button-wrap">
                  <button className="submit-btn" onClick={this.handleEventFormSubmit}>Submit</button>
                </div>
             </form>
             
           </div>
        </div>
    );
  }
  
}

export default CreateEvent;
