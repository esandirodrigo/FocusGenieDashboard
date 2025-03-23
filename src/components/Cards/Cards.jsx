import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './Cards.css'; 
import Loader from './Loader';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const chartHeight = 200;

  useEffect(() => {
    fetch('https://focusgenie-backend-production.up.railway.app/get_scores/Player01')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log('Fetched Data:', json); // Log the fetched data
        const formattedData = json.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleDateString(), // Format the timestamp
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (data.length === 0) {
    return <Loader />;
  }

  return (
    <div className="parentContainer">
      <div className="chartTitle">
        <h1>Player Progress Dashboard</h1>
      </div>

      <div className="charts-grid">
        {/* Line Chart for Score Over Time */}
        <div className="chart-card">
          <h2>Score Over Time</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Accuracy Over Time */}
        <div className="chart-card">
          <h2>Accuracy Over Time</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Response Time Over Time */}
        <div className="chart-card">
          <h2>Response Time Over Time</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="response_time" stroke="#ff7300" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Complexity Over Time */}
        <div className="chart-card">
          <h2>Complexity Over Time</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="complexity" fill="#413ea0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;