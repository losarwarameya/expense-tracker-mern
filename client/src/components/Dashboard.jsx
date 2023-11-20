import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";

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
    <div className="h-[100vh]">
      {/* <h1>Dashboard</h1> */}
      <div className="bg-slate-500 flex items-center justify-center p-5 w-full h-[50vh]">
        <Chart entries={entries} />
      </div>
      <div className="flex h-[50vh]">
        <div className="w-1/2 bg-slate-800 text-white h-full">
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
        <div className="h-full w-1/2 bg-orange-300">
          hi
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
