import { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [currentPayments, setCurrentPayments] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const upcomingResponse = await axios.get("http://localhost:3000/upcomingPayments");
        const currentResponse = await axios.get("http://localhost:3000/currentPayments");
        setUpcomingPayments(upcomingResponse.data);
        setCurrentPayments(currentResponse.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchPayments();
    fetchAnalytics();
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-lg mb-4">Overview of upcoming and current payments, and analytical data</p>
      </div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Payments</h2>
            {upcomingPayments.length === 0 ? (
              <p>No upcoming payments found.</p>
            ) : (
              <ul>
                {upcomingPayments.map((payment, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    <p className="font-semibold">{payment.name}</p>
                    <p className="text-sm">{payment.date}</p>
                    <p className="text-sm">{payment.amount}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Current Payments</h2>
            {currentPayments.length === 0 ? (
              <p>No current payments found.</p>
            ) : (
              <ul>
                {currentPayments.map((payment, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    <p className="font-semibold">{payment.name}</p>
                    <p className="text-sm">{payment.date}</p>
                    <p className="text-sm">{payment.amount}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Analytical Charts</h2>
          <Line data={analyticsData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
