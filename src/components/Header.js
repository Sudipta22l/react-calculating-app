import React from 'react';
import './Header.css';
import {monthName} from '../data';

const Header = () => {

  let currentTime = new Date();
  let d = currentTime.getDate();
  if ((parseInt(d)% 20) === 1) {
    d = d +'st';
  } else if ((parseInt(d)% 20) === 2) {
    d= d+'nd';
  } else if ((parseInt(d)% 20) === 3) {
    d= d+'rd';
  } else {
    d= d+'th';
  }
  let m = currentTime.getMonth();
  m = monthName[parseInt(m)]
  let y = currentTime.getFullYear();
  // console.log(d, m, y);

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = currentTime.getDay();



  return(
      <div className="header">
        <div className="leftName">Daily Expenses</div>
        <div className="currentDate">
          <div className="curTime">{d} {m}, {y}</div>
          <div className="curDt">{days[day]}</div>
        </div>

      </div>
  );

}

export default Header;
