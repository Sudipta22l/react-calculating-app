import React, {useState} from 'react';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';


const Deposit = (props) => {


  //Delete handler
  const deleteItem = (eid) => props.deleteDeposit(eid);

  const [dispProperty, setDispProperty] = useState(true);
  const [detailsValue, setDetailsValue] = useState(props.details.detail);
  const [amountValue, setAmountValue] = useState(props.details.amount);


  const detailsEdit = (e) => setDetailsValue(e.target.value);
  const amountEdit = (e) => setAmountValue(e.target.value);

  const editExp = () => setDispProperty(false);
  const cancelFun = () => {
    setDetailsValue(props.details.detail);
    setAmountValue(props.details.amount);
    setDispProperty(true);
  }

  const saveFun = (eid) => {

    if(detailsValue.trim() !== '' && parseInt(amountValue) > 0 ) {
      // send values to parent to handle
      props.editDeposit(eid, detailsValue.trim(), amountValue);
    } else {
      console.log('You can not leave field empty');
    }

    setDispProperty(true);

  }

  return (
    <div className="exp">
      <div className="unit">
        <div className="actions" style={dispProperty ? {display:'flex'} : {display: 'none'}}>
          <div className="editIcon" onClick={ editExp }><img src={editIcon} alt="Edit" /></div>
          <div className="deleteIcon" onClick={() => deleteItem(props.details.id) }><img src={deleteIcon} alt="Delete" /></div>
        </div>
        <div className="dtlsArea"><input readOnly={dispProperty} type="text" value={detailsValue} onChange={detailsEdit} /></div>
        <div className="amtArea"><input readOnly={dispProperty} type="number" min='0' value={amountValue} onChange={amountEdit} /></div>
      </div>
      <div className="saveArea" style={!dispProperty ? {display:'flex'} : {display: 'none'}}>
        <div className="saveBtn" onClick={() => saveFun(props.details.id)} >Save</div>
        <div className="cancelBtn" onClick={cancelFun} >Cancel</div>
      </div>
    </div>
  );
}

export default Deposit;
