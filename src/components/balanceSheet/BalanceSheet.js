import React, {useState, useEffect} from 'react';
import './BalanceSheet.css';
import Breadcrumbs from '../Breadcrumbs';
import {getYears, monthName, getYearData, getMonthData} from '../../data';

const BalanceSheet = (props) => {

  const breadcrumb = [{name : 'Balance Sheet', link : ''}];

  const [allMonth, setAllMonth] = useState([]);

  const [selectedYear, setSelectedYear] = useState('');
  const selectYearFun = (e) => {
    setSelectedYear(e.target.value);
    if(e.target.value !== '') {
      setAllMonth(monthName);
    } else{
      setAllMonth([]);
    }
  }

  const [selectedMonth, setSelectedMonth] = useState('');
  const selectMonthFun = (e) => setSelectedMonth(e.target.value);

  const years = getYears();

  const [expenses, setExpenses] = useState([]);
  const [deposit, setDeposit] = useState([]);

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [balanceShow, setBalanceShow] = useState('initial');
  const [balance, setBalance] = useState(0);
  const [finalAmt, setFinalAmt] = useState(0);

  const getDateFormat = (data) => {
    const date = new Date(data);
    const d = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
    const m = (date.getMonth() < 10) ? '0'+(date.getMonth() + 1) : date.getMonth() +1;
    return `${d}/${m}/${date.getFullYear()}`;
  }

  const calculatingTotalExp = () => {
    let total = 0;
    expenses.map((exp) => {
      total += parseInt(exp.amount);
      return '';
    });
    return total;
  }

  const calculatingTotalDeposit = () => {
    let total = 0;
    deposit.map((depos) => {
      total += parseInt(depos.amount);
      return '';
    });
    return total;
  }

  const showBalanceAmt = () => {
    if ((totalDeposit - totalExpense) > 0) {
      // console.log('balance in CR', (totalDeposit - totalExpense));
      setBalance(totalDeposit - totalExpense);
      setBalanceShow('DR');
      setFinalAmt(totalDeposit);
    } else if ((totalExpense - totalDeposit) > 0) {
      // console.log('balance in DR', (totalExpense - totalDeposit));
      setBalance(totalExpense - totalDeposit);
      setBalanceShow('CR');
      setFinalAmt(totalExpense);
    }
  }


  const showFun = () => {

    if (selectedYear && selectedMonth) {
      setExpenses(getMonthData(selectedYear, selectedMonth));
      setDeposit(getMonthData(selectedYear, selectedMonth, 'depos'));
      document.getElementById('totalAreaofBS').style.display = 'block';
    } else if (selectedYear) {
      setExpenses(getYearData(selectedYear));
      setDeposit(getYearData(selectedYear, 'depos'));
      document.getElementById('totalAreaofBS').style.display = 'block';
    } else {
      document.getElementById('totalAreaofBS').style.display = 'none';
    }
  }

  useEffect(() => {
    setTotalExpense(calculatingTotalExp());
    setTotalDeposit(calculatingTotalDeposit());

  }, [expenses, deposit]);

  useEffect(() => {
    showBalanceAmt();

  }, [totalDeposit, totalExpense]);

  useEffect(() => {
    props.setShowBtn(false);
  }, [props]);

  return (

    <>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <div className="headerBS">

        <div className="title">Select Date Range : </div>

        <div className="yearSelection">
          <select className='yearSelect' value={selectedYear} onChange={selectYearFun}>
            <option value=''>Select Year</option>
            {
              years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))
            }
          </select>
        </div>

        <div className="monthSelection">
          <select className='monthSelect' value={selectedMonth} onChange={selectMonthFun}>
            <option value=''>All</option>
            {
              allMonth.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))
            }
          </select>
        </div>

        <div className='btnHolder' >
          <div className='showBtn' onClick={showFun} >Show</div>
        </div>

      </div>

      <div className='totalAreaofBS' id="totalAreaofBS">
        <div className='balanceSheetHead'>Balance sheet of {monthName[selectedMonth]} {selectedYear}</div>

        <div className='mainareabs'>

          <div className='depositSide'>
            <div className='deposHead'>Deposits</div>
            {
              deposit.map((depos) => (
                <div className='bsunit' key={depos.id}>
                  <div className='unitDate'>{getDateFormat(depos.date)}</div>
                  <div className='unitDetail'>{depos.detail}</div>
                  <div>{depos.amount}</div>
                </div>
              ))
            }
          </div>

          <div className='expenseSide'>
            <div className='expHead'>Expense</div>
            {
              expenses.map((exp) => (
                <div className='bsunit' key={exp.id}>
                  <div className='unitDate'>{getDateFormat(exp.date)}</div>
                  <div className='unitDetail'>{exp.detail}</div>
                  <div>{exp.amount}</div>
                </div>
              ))
            }
          </div>

        </div>

        <div className='bsFooter'>

          <div className='balanceArea'>

            <div className='mainareabs'>
              <div className='depositSide'>
                <div className='bsunit'>
                  <div> </div> <div className='balanceAmtDepos' style={{display: (balanceShow === 'CR') ? 'block' : 'none'}}>Balance <div className="bal">{balance}</div> </div>
                </div>
              </div>

              <div className='expenseSide'>
                <div className='bsunit'>
                  <div></div> <div className='balanceAmtExp' style={{display: (balanceShow === 'DR') ? 'block' : 'none'}}>Balance <div className="bal">{balance}</div></div>
                </div>
              </div>

            </div>
          </div>

          <div className='bsAmtArea'>

            <div className='mainareabs'>
              <div className='depositSide'>
                <div className='bsunit'>
                  <div> </div> <div className='finalAmt'>{finalAmt}</div>
                </div>
              </div>

              <div className='expenseSide'>
                <div className='bsunit'>
                  <div></div> <div className='finalAmt'>{finalAmt}</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>

  );

}

export default BalanceSheet;
