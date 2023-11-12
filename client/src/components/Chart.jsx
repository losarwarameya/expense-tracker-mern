import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useResizeDetector } from "react-resize-detector";

const Chart = (props) => {
  const [data, setData] = useState({});

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    const { entries } = props;

    const formattedData = entries.map((entry) => {
      const options = { day: "2-digit", month: "short", year: "2-digit" };
      return {
        amount: entry.amount,
        date: new Date(entry.date).toLocaleDateString(undefined, options),
      };
    });

    setData(formattedData.sort((a, b) => new Date(a.date) - new Date(b.date)));
    // setData(entries.reverse());


  }, [props.entries]);

  return (
    <div ref={ref} className="bg-slate-100 w-11/12 p-3">
      <LineChart
        width={width || 400}
        height={400}
        data={data}
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
  );
};

export default Chart;
