import React from 'react';
import {Link} from 'react-router-dom';
import {getYears, getYearlyExpenses} from '../../data';
import Breadcrumbs from '../Breadcrumbs';

const Years = (props) => {

  // calculating how many years entred in database
  let years = getYears();

  const breadcrumb = [
    {
      name : 'Expenses',
      link : ''
    }
  ];

  return(
    <>

      <Breadcrumbs breadcrumb={breadcrumb} />

      <div className="mainArea">
        <div className="containtArea">

          {years.map((year, index) =>
            (
              <Link to={`/react-calculating-app/exp/${year}`} key={index} className="cardDisp">
                <div className="cardInfo">Year {year}</div>
                <div className="cardAmt">Rs. {getYearlyExpenses(year)}</div>
              </Link>
            )
          )}




        </div>
      </div>
    </>

  );
}

export default Years;
