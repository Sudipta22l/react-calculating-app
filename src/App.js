import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Header from './components/Header';
import NewExpences from './components/expense/NewExpences';
import NewDeposit from './components/deposit/NewDeposit';
import Page from './components/Page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Month from './components/expense/Month';
import Days from './components/expense/Days';
import Expenses from './components/expense/Expenses';
import Years from './components/expense/Years';
import DeposYear from './components/deposit/DeposYear';
import DeposMonth from './components/deposit/DeposMonth';
import DeposDay from './components/deposit/DeposDay';
import Deposits from './components/deposit/Deposits';
import BalanceSheet from './components/balanceSheet/BalanceSheet';
import addIcon from './components/images/add.png';
import getData, {getDepositData} from './data';

const App = () => {

  const [appData, setAppData ] = useState(getData());
  const [depositData, setDepositData ] = useState(getDepositData());

  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
      setAppData(getData());
      setDepositData(getDepositData());
      setShowBtn(true);
  }, []);

  const updateTotal = useRef(null);
  const updateTotalDeposit = useRef(null);

  // appData will update after adding new one
  const addNewDataFun = () => {
    setAppData(getData());

    // this function is in child component named Expenses
    updateTotal.current();
  }

  const addNewDepositFun = () => {
    setDepositData(getDepositData());

    // this function is in child component named Deposites
    updateTotalDeposit.current();
  }

  const openNewDeposPannelFun = () => document.getElementById('blockAreaDepos').style.display = 'block';
  const openNewPannelFun = () => document.getElementById('blockArea').style.display = 'block';



  return (
    <div className="App">
      <Header />
      <div className="addNewDepos" onClick={openNewDeposPannelFun} title="Add New Deposit" style={{display: showBtn ? 'block' : 'none'}} ><div><img src={addIcon} alt='Add Deposit' /></div></div>
      <div className="addNew" onClick={openNewPannelFun} title="Add New Expense" style={{display: showBtn ? 'block' : 'none'}} ><div><img src={addIcon} alt='Add Expense' /></div></div>


      <NewDeposit addNewDepositFun={addNewDepositFun} />
      <NewExpences addNewDataFun={addNewDataFun} />


      <BrowserRouter>
        <Routes>
          <Route path="/react-calculating-app" element={<Page data={appData} setShowBtn={setShowBtn} />} />
          <Route path='/bs' element={<BalanceSheet setShowBtn={setShowBtn} />} />
          <Route path="/exp" element={<Years data={appData} />} />
          <Route path="/depos" element={<DeposYear data={depositData} />} />
          <Route path="/:yearId" element={<Month />} />
          <Route path="/depos/:yearId" element={<DeposMonth />} />
          <Route path="/:yearId/:monthId" element={<Days />} />
          <Route path="/depos/:yearId/:monthId" element={<DeposDay />} />
          <Route path="/:yearId/:monthId/:dayId" element={<Expenses updateTotalOnAddNewItem={updateTotal} />} />
          <Route path="/depos/:yearId/:monthId/:dayId" element={<Deposits updateTotalOnNewDeposit={updateTotalDeposit} />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
