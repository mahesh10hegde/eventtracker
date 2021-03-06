import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router";
import Modal from '../../../utility/Modal';
export default function CalenderComponent() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [eventsData, setSchedules] = useState([]);
  const [isPopupOpened, setModalStatus] = useState(false);

  useEffect(() => {
    setDay(date.getDate());
    
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);
  useEffect(() => {
    async function getSchedules(){
      const res=fetch('http://localhost:3000/events', {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.length){
              console.log('success');
              setSchedules(data);
            }else{
              setSchedules([]);
            }
          })
          .catch(err=>{
            console.error('Error:', err);
            setSchedules([]);
          });
    }
    getSchedules();
  }, []);
  let history = useHistory();
  function getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  function handleEventDoubleClick(obj){
    history.push("/createevent/"+obj.id);
  }
  function toggleModal(obj){
    setModalStatus(!isPopupOpened);
  }
  function handleEventOnClick(obj){
    setModalStatus(!isPopupOpened);
  }
  const days = isLeapYear ? DAYS_LEAP : DAYS;
  var daysArr = [];
  for(let i=0;i<days[month] + (startDay - 1);i++){
    var appointments=[];
    for(let j=0;j<eventsData.length;j++){
      if(eventsData[j].eventDate.split("/")[0]==(i - (startDay - 2))){
        appointments.push(eventsData[j]);
      }
    }
    if(i - (startDay - 2)>0){
      daysArr.push({
        id:i,
        appointments:appointments,
        isPopupOpened:false
      });
    }else{
      daysArr.push({
        id:"prevMOnth"+i,
        appointments:appointments,
        isPopupOpened:false
      });
    }
  }
  console.log('initial array',daysArr);
  return (
    <div className="calendar-container">
      <div>
      
        <div className="calendar-header">
          {MONTHS[month]} {year}
        </div>
       
      </div>
      <div>
        {DAYS_OF_THE_WEEK.map(d => (
          <div key={d} className="one-seventh weekday">
            <strong>{d}</strong>
          </div>
        ))}
        {
          daysArr.map((item, index) => {
            const d = index - (startDay - 2);
            if(item.appointments.length){
              return (
              
                <div className="one-seventh day has-event"
                  key={index} id={d>0?d:"prevMonth"+(index+1)}
                >
                  <div><span>{d}</span></div>
                  { 
                     item.appointments.map((val)=>{
                        return(
  
                         <div  key={val.id}> 
                            <Modal show={val.isPopupOpened} onClose={()=>{toggleModal(val)}}><h2>{val.name}</h2><div className="attendeesInfo">Attendees:{val.attendees}</div><div className="eventDate">Date: {val.eventDate}</div><div className="eventInfo">{val.description}</div></Modal>
                          <span className="event" id={val.id} onDoubleClick={()=>{handleEventDoubleClick(val)}} onMouseEnter={()=>{handleEventOnClick(val)}}>{val.name}</span>
                        </div>
                        
                        )
                      })
                    }
                </div>
              );
            }
            else{
              return (
              
                <div className="one-seventh day"
                  key={index} id={d>0?d:"prevMonth"+(index+1)}
                >
                  { 
                    d>0?d:''
                  }
                </div>
              );
            }
           
          })}
      </div>
    </div>
  );
}