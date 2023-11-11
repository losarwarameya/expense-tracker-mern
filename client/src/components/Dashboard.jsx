import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/entries?userId=${userId}`
        );
        setEntries(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEntries();
  }, []);

  return (
    <div className="flex">
      {/* <h1>Dashboard</h1> */}
      <div className="w-1/3 bg-slate-400">
        hi
      </div>
      <div className="w-1/3">
        <h2>Latest Entries</h2>
        <ul>
          {entries
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 3)
            .map((entry) => {
              return (
                <li key={entry._id}>
                  <h2>{entry.title}</h2>
                  <p>${entry.amount}</p>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="bg-black w-1/3">
            
      </div>
    </div>
  );
};

export default Dashboard;
