import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {getDays, monthName, getDalyExpenses} from '../../data';
import Breadcrumbs from '../Breadcrumbs';


const Days = () => {
  let params = useParams();

  // calculating all days
  let days = getDays(params.yearId, params.monthId);
  days.sort((a,b) => a - b);

  const breadcrumb = [
    {
      name : 'Expenses',
      link : '/exp'
    },
    {
      name : `Year ${params.yearId}`,
      link : `/${params.yearId}`
    },
    {
      name : monthName[params.monthId],
      link : ''
    }
  ];


  return (
    <div className="">
        {/*<div className="headline">{`${monthName[params.monthId]}, ${params.yearId}`}</div>*/}
        <Breadcrumbs breadcrumb={breadcrumb} />

        <div className="mainArea">
          <div className="containtArea">

            {days.map((day, index) =>
              (
                <Link to={`/${params.yearId}/${params.monthId}/${day}`} key={index} className="cardDisp">
                  <div className="cardInfo">{day}</div>
                  <div className="cardAmt">Rs. {getDalyExpenses(params.yearId, params.monthId, day)}</div>
                </Link>
              )
            )}




          </div>
        </div>

    </div>
  );
}

export default Days;
