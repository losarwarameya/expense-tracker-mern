import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useResizeDetector } from "react-resize-detector";

const Chart = (props) => {
  const [data, setData] = useState({});
  const [incomeData, setIncomeData] = useState({});
  const [expenseData, setExpenseData] = useState({});

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    const { entries } = props;

    const formattedData = entries.map((entry) => {
      const options = { day: "2-digit", month: "short", year: "2-digit" };
      return {
        amount: entry.amount,
        date: new Date(entry.date).toLocaleDateString(undefined, options),
        type: entry.type,
      };
    });

    const formattedIncomeData = entries
      .reduce((acc, entry) => {
        if (entry.type !== "income") return acc;

        const date = new Date(entry.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        });
        const existingEntry = acc.find((e) => e.date === date);

        if (existingEntry) {
          existingEntry.amount += entry.amount;
        } else {
          acc.push({
            amount: entry.amount,
            date: date,
            type: entry.type,
          });
        }

        return acc;
      }, [])
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setIncomeData(formattedIncomeData);

    const formattedExpenseData = entries
      .reduce((acc, entry) => {
        if (entry.type !== "expense") return acc;

        const date = new Date(entry.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        });
        const existingEntry = acc.find((e) => e.date === date);

        if (existingEntry) {
          existingEntry.amount += entry.amount;
        } else {
          acc.push({
            amount: entry.amount,
            date: date,
            type: entry.type,
          });
        }

        return acc;
      }, [])
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setExpenseData(formattedExpenseData);

    setData(formattedData.sort((a, b) => new Date(a.date) - new Date(b.date)));
    console.log(data);
  }, [props.entries]);

  return (
    <div  
    ref={ref}
     className="flex w-full">
      <div className="bg-slate-100 w-1/2 p-3">
        <h1>Incomes</h1>
        <LineChart
          width={width/2-50 || 400}
          height={350}
          // data={data}
          data={incomeData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="incomeAmount" stroke="#8884d8" /> */}
          {/* <Line type="monotone" dataKey="expenseAmount" stroke="#d88488"  /> */}

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />
        </LineChart>
      </div>
      <div className="bg-slate-100 w-1/2 p-3">
        <h1>Expenses</h1>
        <LineChart
          width={width/2-50 || 400}
          height={350}
          // data={data}
          data={expenseData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="incomeAmount" stroke="#8884d8" /> */}
          {/* <Line type="monotone" dataKey="expenseAmount" stroke="#d88488"  /> */}

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;
