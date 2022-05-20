import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

import './Page.css'

const Page = (props) => {

  const breadcrumb = [
    {
      name : 'Choose a Task',
      link : ''
    }
  ];

  const openNewPannelFun = () => {
    document.getElementById('blockArea').style.display = 'block';
  }

  const openNewDeposPannelFun = () => {
    document.getElementById('blockAreaDepos').style.display = 'block';
  }

  useEffect(() => {
    props.setShowBtn(true);
  }, [props]);

  return(
    <>

      <Breadcrumbs breadcrumb={breadcrumb} />

      <div className="mainArea">
        <div className="containtArea">

          <Link to='' onClick={openNewPannelFun} className="cardDisp">
            <div className="cardInfo">Add Expense</div>
            <div className="cardAmt">Add new expense</div>
          </Link>

          <Link to={``} onClick={openNewDeposPannelFun} className="cardDisp">
            <div className="cardInfo">Add Deposit</div>
            <div className="cardAmt">Add new Deposit</div>
          </Link>

          <Link to='/react-calculating-app/depos' className="cardDisp">
            <div className="cardInfo">Deposit</div>
            <div className="cardAmt">View All Deposit</div>
          </Link>

          <Link to='/react-calculating-app/exp' className="cardDisp">
            <div className="cardInfo">Expenses</div>
            <div className="cardAmt">View All Expenses</div>
          </Link>

          <Link to='/react-calculating-app/bs' className="cardDisp">
            <div className="cardInfo">Balance Sheet</div>
            <div className="cardAmt">View All Transaction</div>
          </Link>

        </div>
      </div>
    </>

  );
}

export default Page;
