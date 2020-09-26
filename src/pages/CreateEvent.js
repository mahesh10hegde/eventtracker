import React, {Component} from 'react';
import Header from '../components/molecules/header/Header';
import '../../src/assets/css/eventform.css';
import {withRouter} from 'react-router-dom';
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
      editMode:false,
      editId:''
    }
  }
  componentDidMount(){
    var eventId=this.props.match.params.id;
    if(eventId){
      fetch('http://localhost:3000/events/'+eventId)
      .then((res)=>res.json())
      .then((data)=>{
          this.setState({editId:data.id,editMode:true,meetingName:data.name,meetingDesc:data.description,attendees:data.attendees,dateVal:data.eventDate});
      }).catch((err)=>{
        console.log('error',err);
      });
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
      this.setState({"hasError":true,"errorMessage":"Enter correct date of current month only in dd/mm/yyyy format"});
    }else if(!this.validateAttendees(attendees)){
      this.setState({"hasError":true,"errorMessage":"Enter correct attendees email ids"});
    }else{
      this.setState({"hasError":false,"errorMessage":''});
      let data={"id":Date.now(),"name":meetingName,"description":meetingDesc,"attendees":attendees,"eventDate":dateVal};
      let url ='http://localhost:3000/events';
      let method = 'POST';
      if(this.state.editMode){
        url = 'http://localhost:3000/events/'+this.state.editId;
        method = 'PUT';
      }
      fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.props.history.push('/dashboard');
          })
          .catch(err=>{
            console.error('Error:', err);
          });
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
    var curMonth = new Date().getMonth()+1;
    var curYear = new Date().getFullYear();
    if(month!=curMonth || year!=curYear){
      return false;
    }
       

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
                  <label>Enter meting date in dd/mm/yyyy format*</label>
                  <input type="text" placeholder="" value={this.state.dateVal} onChange={this.handleDateChange}></input>
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

export default withRouter(CreateEvent);
