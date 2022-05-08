import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {getMonths, monthName, getMonthlyDeposit} from '../../data';
import Breadcrumbs from '../Breadcrumbs';


const DeposMonth = () => {
  let params = useParams();

  // calculating all months
  let months = getMonths(params.yearId, 'depos');

  const breadcrumb = [
    {
      name : 'Deposit',
      link : '/depos'
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
                <Link to={`/depos/${params.yearId}/${month}`} key={index} className="cardDisp">
                  <div className="cardInfo">{monthName[month]}</div>
                  <div className="cardAmt">Rs. {getMonthlyDeposit(params.yearId, month)}</div>
                </Link>
              )
            )}




          </div>
        </div>

    </div>
  );
}

export default DeposMonth;
