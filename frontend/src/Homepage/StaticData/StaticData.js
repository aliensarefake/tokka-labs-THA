import React, { useEffect, useState } from 'react';
import './styles/StaticData.css';
import StaticDataBox from './StaticDataBox';

import { formatValue } from '../../utils/formatValue';

function StaticData() {
  const [metricsDict, setMetricsDict] = useState({
    entry1: { color: 'rgb(252, 114, 255)', bgColor: 'rgba(252, 114, 255, 0.4)', title: 'Total Transaction Fee (USDT)', value: '0' }, 
    entry2: { color: 'rgb(51 150 255)', bgColor: 'rgba(51, 150, 255, 0.4)', title: 'Total Transaction Fee (ETH)', value: '0' },
    entry3: { color: 'rgb(150 70 250)', bgColor: 'rgba(150, 70, 250, 0.4)', title: 'Current ETH/USDT Price', value: '0' },
  });

  useEffect(() => {
    const binanceApiUrl = 'https://api.binance.com';
    const backendApiUrl = 'http://localhost:4100'; 

    const fetchData = async () => {
      try {
        const priceResponse = await fetch(`${binanceApiUrl}/api/v3/ticker/price?symbol=ETHUSDT`);
        const priceData = await priceResponse.json();

        const statisticsResponse = await fetch(`${backendApiUrl}/statistics`);
        const statisticsData = await statisticsResponse.json();

        setMetricsDict((prevMetrics) => ({
          ...prevMetrics,
          entry1: { 
            ...prevMetrics.entry1,
            value: formatValue(Number(statisticsData.totalTxFeeUSDT)),
          },
          entry2: { 
            ...prevMetrics.entry2,
            value: formatValue(Number(statisticsData.totalTxFeeETH)), 
          },
          entry3: { 
            ...prevMetrics.entry3,
            value: formatValue(Number(priceData.price)),
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="static-data-wrapper">
      {Object.keys(metricsDict).map((key) => (
        <StaticDataBox
          key={key}
          color={metricsDict[key].color}
          bgColor={metricsDict[key].bgColor}
          title={metricsDict[key].title}
          value={metricsDict[key].value}
        />
      ))}
    </div>
  );
}

export default StaticData;
