import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {getDays, monthName, getDalyDeposit} from '../../data';
import Breadcrumbs from '../Breadcrumbs';


const DeposDay = () => {
  let params = useParams();

  // calculating all days
  let days = getDays(params.yearId, params.monthId, 'depos');
  days.sort((a,b) => a - b);

  const breadcrumb = [
    {
      name : 'Deposit',
      link : '/react-calculating-app/depos'
    },
    {
      name : `Year ${params.yearId}`,
      link : `/react-calculating-app/depos/${params.yearId}`
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
                <Link to={`/react-calculating-app/depos/${params.yearId}/${params.monthId}/${day}`} key={index} className="cardDisp">
                  <div className="cardInfo">{day}</div>
                  <div className="cardAmt">Rs. {getDalyDeposit(params.yearId, params.monthId, day)}</div>
                </Link>
              )
            )}

          </div>
        </div>

    </div>
  );
}

export default DeposDay;
