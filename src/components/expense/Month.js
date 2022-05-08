import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {getMonths, monthName, getMonthlyExpenses} from '../../data';
import Breadcrumbs from '../Breadcrumbs';


const Month = () => {
  let params = useParams();

  // calculating all months
  let months = getMonths(params.yearId);

  const breadcrumb = [
    {
      name : 'Expenses',
      link : '/exp'
    },
    {
      name : params.yearId,
      link : ''
    }
  ];


  return (
    <div className="">
        {/*<div className="headline">Year {params.yearId}</div>*/}

        <Breadcrumbs breadcrumb={breadcrumb} />

        <div className="mainArea">
          <div className="containtArea">

            {months.map((month, index) =>
              (
                <Link to={`/${params.yearId}/${month}`} key={index} className="cardDisp">
                  <div className="cardInfo">{monthName[month]}</div>
                  <div className="cardAmt">Rs. {getMonthlyExpenses(params.yearId, month)}</div>
                </Link>
              )
            )}




          </div>
        </div>

    </div>
  );
}

export default Month;
