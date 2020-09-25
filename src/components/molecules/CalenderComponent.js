import React, {Component} from 'react';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setDay(date.getDate());
    
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear ? DAYS_LEAP : DAYS;
  var daysArr = [];
  for(let i=0;i<days[month] + (startDay - 1);i++){
    if(i - (startDay - 2)>0){
      daysArr.push({
        id:i,
        appointments:[]
      });
    }else{
      daysArr.push({
        id:"prevMOnth"+i,
        appointments:[]
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
            
            return (
              <div className="one-seventh day has-event"
                key={index} id={d>0?d:"prevMonth"+(index+1)}
              >
                { 
                    item.appointments.map((val)=>{
                      return(

                       <div  key={val.id}> <span>{d}</span>
                      <span>{val.eventName}</span>
                      </div>
                      )
                    })
                  }
              </div>
            );
          })}
      </div>
    </div>
  );
}