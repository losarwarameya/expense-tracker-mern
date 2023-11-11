import React,{useState} from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChartExample from './LineChartExample';

Chart.register(CategoryScale);

const ChartApp = () => {

    const [chartData, setChartData] = useState(
        {
            id: 1,
            year: 2016,
            userGain: 80000,
            userLost: 823
          },
          {
            id: 2,
            year: 2017,
            userGain: 45677,
            userLost: 345
          },
          {
            id: 3,
            year: 2018,
            userGain: 78888,
            userLost: 555
          },
          {
            id: 4,
            year: 2019,
            userGain: 90000,
            userLost: 4555
          },
          {
            id: 5,
            year: 2020,
            userGain: 4300,
            userLost: 234
          }
      );

  return (
    <div>ChartApp
        <LineChartExample chartData={chartData} />
    </div>
  )
}

export default ChartApp