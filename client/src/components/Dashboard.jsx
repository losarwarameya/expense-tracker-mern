import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChartApp from './ChartApp';

const Dashboard = () => {
  const [entries,setEntries] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/entries?userId=${userId}`);
        setEntries(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getEntries();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ChartApp />
      <ul>
        {
          entries.map((entry) => {
            return (
              <li key={entry._id}>
                <h2>{entry.heading}</h2>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Dashboard