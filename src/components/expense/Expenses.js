import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Expenses.css';
import getData, {monthName, getDalyExpenses, getDayData} from '../../data';
import Expense from './Expense';
import Breadcrumbs from '../Breadcrumbs';

const Expences = (props) => {
  const params = useParams();
  const [appData, setAppData ] = useState(getData());

  useEffect(() => {

    const {yearId, monthId, dayId} = params;
    const updatedTotal = () => {
      setTotalExp(getDalyExpenses(yearId, monthId, dayId));
      setCurrentDayData(getDayData(yearId, monthId, dayId));
      setAppData(getData());
    }

    props.updateTotalOnAddNewItem.current = updatedTotal;
  }, [params, props]);

  const [currentDayData, setCurrentDayData] = useState(getDayData(params.yearId, params.monthId, params.dayId));


  // calculating all days
  const [totalExp, setTotalExp] = useState(getDalyExpenses(params.yearId, params.monthId, params.dayId));

  //  Deleting Expense.....
  const deleteExp = (eid) => {

    if (window.confirm('Do you want to delete this?')) {
      let newData = [...appData];
      let datas = newData.filter(entry => entry.id !==  eid);

      localStorage.setItem('expenses', JSON.stringify(datas));
      setAppData(getData());
      setCurrentDayData(getDayData(params.yearId, params.monthId, params.dayId));

      // updating the parent component's total Expenses
      setTotalExp(getDalyExpenses(params.yearId, params.monthId, params.dayId));

    }
  }

  // Editing Expense.......
  const editExpense = (eid, detailsValue, amountValue) => {

    let newData = [...appData];
    const indexNo = appData.findIndex((data) => data.id === eid);
    newData[indexNo].detail = detailsValue.trim();
    newData[indexNo].amount = amountValue;
    localStorage.setItem('expenses', JSON.stringify(newData));
    setAppData(getData());

    setTotalExp(getDalyExpenses(params.yearId, params.monthId, params.dayId));

  }



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
      link : `/${params.yearId}/${params.monthId}`
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
          <div className="headline">{`Total Expenses of ${d} ${monthName[params.monthId]}, ${params.yearId}`}</div>
            <div className="containtArea">
              {currentDayData.map((details) =>
                (
                  <Expense key={details.id} details={details} editExpense={editExpense} deleteExpense={deleteExp} />
                )
              )}
              <div className="expTotal">
                <div>Total Expance</div>
                <div className="amt">Rs {totalExp}</div>
              </div>
            </div>
      </div>
    </>
  );
}

export default Expences;
