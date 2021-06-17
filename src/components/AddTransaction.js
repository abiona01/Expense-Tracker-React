import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";

function AddTransaction() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);
  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: uuid(),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
  };
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            value={text}
            onChange={handleTextChange}
            placeholder='Enter text...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='text'
            value={amount}
            onChange={handleAmountChange}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>Add Transaction</button>
      </form>
    </>
  );
}

export default AddTransaction;
