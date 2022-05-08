import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getDepositData, monthName, getDalyDeposit, getDayData} from '../../data';
import '../expense/Expenses.css';
import Deposit from './Deposit';
import Breadcrumbs from '../Breadcrumbs';

const Deposits = (props) => {
  const params = useParams();
  const [appData, setAppData ] = useState(getDepositData());

  useEffect(() => {

    const {yearId, monthId, dayId} = params;
    const updatedTotal = () => {
      setTotalDeposit(getDalyDeposit(yearId, monthId, dayId));
      setCurrentDayData(getDayData(yearId, monthId, dayId, 'depos'));
      setAppData(getDepositData());
    }

    props.updateTotalOnNewDeposit.current = updatedTotal;
  }, [params, props]);

  const [currentDayData, setCurrentDayData] = useState(getDayData(params.yearId, params.monthId, params.dayId, 'depos'));


  // calculating all days
  const [totalDeposit, setTotalDeposit] = useState(getDalyDeposit(params.yearId, params.monthId, params.dayId));

  //  Deleting deposit.....
  const deleteDeposit = (eid) => {

    if (window.confirm('Do you want to delete this?')) {
      let newData = [...appData];
      let datas = newData.filter(entry => entry.id !==  eid);

      localStorage.setItem('deposit', JSON.stringify(datas));
      setAppData(datas);
      setCurrentDayData(getDayData(params.yearId, params.monthId, params.dayId, 'depos'));

      // updating the total Deposit
      setTotalDeposit(getDalyDeposit(params.yearId, params.monthId, params.dayId));

    }
  }

  // Editing Deposit.......
  const editDeposit = (eid, detailsValue, amountValue) => {

      let newData = [...appData];
      const indexNo = appData.findIndex((data) => data.id === eid);
      newData[indexNo].detail = detailsValue;
      newData[indexNo].amount = amountValue;
      localStorage.setItem('deposit', JSON.stringify(newData));
      setAppData(getDepositData());

      setTotalDeposit(getDalyDeposit(params.yearId, params.monthId, params.dayId));
  }


  const breadcrumb = [
    {
      name : 'Deposit',
      link : '/depos'
    },
    {
      name : `Year ${params.yearId}`,
      link : `/depos/${params.yearId}`
    },
    {
      name : monthName[params.monthId],
      link : `/depos/${params.yearId}/${params.monthId}`
    },
    {
      name : `Date ${params.dayId}`,
      link : ''
    }
  ];
  let d = params.dayId;
  if ((parseInt(d)% 20) === 1) {
    d = d +'st';
  } else if ((parseInt(d)% 20) === 2) {
    d= d+'nd';
  } else if ((parseInt(d)% 20) === 3) {
    d= d+'rd';
  } else {
    d= d+'th';
  }


  return (

    <>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <div className="expCont">
          <div className="headline">{`Total Deposits of ${d} ${monthName[params.monthId]}, ${params.yearId}`}</div>
            <div className="containtArea">
              {currentDayData.map((details) =>
                (
                  <Deposit key={details.id} details={details} editDeposit={editDeposit} deleteDeposit={deleteDeposit} />
                )
              )}
              <div className="expTotal">
                <div>Total Deposit</div>
                <div className="amt">Rs {totalDeposit}</div>
              </div>
            </div>
      </div>
    </>
  );
}

export default Deposits;
