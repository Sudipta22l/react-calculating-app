import {useState } from 'react';
import './NewExpences.css';
import closeIcon from '../images/close.png';
import pinIcon from '../images/pin.png';
import getData from '../../data';
//import uuid v4
import { v4 as uuid } from 'uuid';



const NewExpences = (props) => {

  const unique_id = uuid();
  let appData = getData();

  const closeNewPannelFun = () => {
    document.getElementById('blockArea').style.display = 'none';
  }

  const [newDate, setNewDateFun] = useState('');
  const dateChangeFun = (e) => {
    setNewDateFun(e.target.value);
  }

  const [newDetails, setNewDetailsFun] = useState('');
  const detailsChangeFun = (e) => {
    setNewDetailsFun(e.target.value);
  }

  const [newAmount, setNewAmountFun] = useState('');
  const amountChangeFun = (e) => {
    setNewAmountFun(e.target.value);
  }


  const onSubminFun = (e) => {
    e.preventDefault();

    if (newDate.trim() !== '' && newDetails.trim() !== '' && parseInt(newAmount) > 0) {
      const newData = [...appData, {id:unique_id, date:new Date(newDate), detail:newDetails, amount:newAmount}];
      localStorage.setItem('expenses', JSON.stringify(newData));

      setNewDateFun('');
      setNewDetailsFun('');
      setNewAmountFun('');

      props.addNewDataFun(newData);
    }
  }

  const [pinTop, setPinTop] = useState(false);
  const pinToTopFun = () => setPinTop(!pinTop)

  return (

    <div className={(pinTop)? 'pinTop' : 'blockArea'} id="blockArea">
      <div className='newPannel'>

      <div className="newPannelCloseBtn" onClick={closeNewPannelFun}><img src={closeIcon} alt="Close" /></div>
      <div className="newExpPinToTop" onClick={pinToTopFun}><img src={pinIcon} alt="pin to top" /></div>

        <div className="pannelHead">Add New Expenses</div>

        <form onSubmit={onSubminFun} className="form">
          <div className="fldArea">
            <input className="inputFld" value={newDate} placeholder="date" type="date" onChange={dateChangeFun} />
          </div>

          <div className="fldArea">
            <input className="inputFld" value={newDetails} placeholder="Details" type="text" onChange={detailsChangeFun} />
          </div>

          <div className="fldArea">
            <input className="inputFld" value={newAmount} placeholder="Amount" type="number" step="1" onChange={amountChangeFun} />
          </div>

          <div className="pannelFooter">
            <input type="submit" className="submit_button" value="ADD NEW EXPENCES" />
          </div>
        </form>
      </div>
    </div>

  );

}

export default NewExpences;
