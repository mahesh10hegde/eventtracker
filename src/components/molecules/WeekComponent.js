import React, {Component} from 'react';


class WeekComponent extends Component{
  
  render(){
    return (
        
        <div className="week">
            
            <div className="one-seventh weekday">MON</div>
            <div className="one-seventh weekday">TUE</div>
            <div className="one-seventh weekday">WED</div>
            <div className="one-seventh weekday">THU</div>
            <div className="one-seventh weekday">FRI</div>
            <div className="one-seventh weekday">SAT</div>
            <div className="one-seventh weekday">SUN</div>
        </div>
    );
  }
  
}

export default WeekComponent;
