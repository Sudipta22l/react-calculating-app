import React from 'react';
import './Breadcrumbs.css';
import HomeIcon from './images/home.png';
import {Link} from 'react-router-dom';

const Breadcrumbs = (props) => {

  return (

    <ul className="breadcrumb">
      <li><Link to={`/react-calculating-app`}>
        <div className="textBC"><img className="homeIcon" src={HomeIcon} alt="Home" /></div>
        <div className="rightBC"></div>
      </Link></li>

      {
          props.breadcrumb.map((data, index) => (
            <li key={index}><Link to={data.link} >
              <div className="leftBC"></div>
              <div className="leftBC1"></div>
              <div className="textBC">{data.name}</div>
              <div className="rightBC"></div>
            </Link></li>
          )
      )}
    </ul>

  );
}

export default Breadcrumbs;
