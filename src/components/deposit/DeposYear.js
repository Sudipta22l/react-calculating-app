import React from 'react';
import {Link} from 'react-router-dom';
import {getYears, getYearlyDeposit} from '../../data';
import Breadcrumbs from '../Breadcrumbs';


const DeposYear = (props) => {

  // calculating how many years entred in database
  let years = getYears('depos');

  const breadcrumb = [
    {
      name : 'Deposit',
      link : ''
    }
  ];

  return (
    <>

      <Breadcrumbs breadcrumb={breadcrumb} />

      <div className="mainArea">
        <div className="containtArea">

          {years.map((year, index) =>
            (
              <Link to={`/depos/${year}`} key={index} className="cardDisp">
                <div className="cardInfo">Year {year}</div>
                <div className="cardAmt">Rs. {getYearlyDeposit(year)}</div>
              </Link>
            )
          )}

        </div>
      </div>
    </>
  );
}


export default DeposYear;
