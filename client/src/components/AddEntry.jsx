import React, { useState } from "react";
import axios from "axios";

const AddEntry = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [entry, setEntry] = useState({
    title: "",
    amount: 0,
    type: "expense",
    description: "",
    date:new Date().toISOString().split('T')[0],
    userId: localStorage.getItem("userId"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted ", e);
    if (entry.amount <= 0) {
      setErrorMessage("Amount must be greater than 0");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/add-entry",
        entry
      );
      console.log("Entry added : ", response.data);
      setEntry({
        title: "",
        amount: 0,
        type: "expense",
        description: "",
        date:new Date().toISOString().split('T')[0],
        userId: localStorage.getItem("userId"),
      });
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300">
      <h1>Add Entry</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
        />
        <input
          type="number"
          name="amount"
          value={entry.amount}
          onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
          className=""
        />

        <label 
        // className={`relative inline-block w-14 h-8 bg-gray-300 rounded-full p-1 ${entry.type === 'income' ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <input
            type="checkbox"
            checked={entry.type === 'income'}
            onChange={() => setEntry({ ...entry, type: entry.type==="income" ? 'expense' : 'income' })}
            className="hidden"
          />
          {/* <span className={`block transition-transform duration-300 ease-in-out w-6 h-6 bg-white rounded-full transform ${entry.type === 'income' ? 'translate-x-full' : 'translate-x-0'}`} /> */}
          <span>{entry.type}</span>
        </label>
        {/* <input
          type="checkbox"
          name="type"
          value={entry.type}
          onChange={(e) => setEntry({ ...entry, type: e.target.value })}
        /> */}
        <input type="date" value={entry.date} onChange={e => setEntry({...entry,date:e.target.value})}/>
        <input
          type="text"
          name="description"
          value={entry.description}
          onChange={(e) => setEntry({ ...entry, description: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default AddEntry;
