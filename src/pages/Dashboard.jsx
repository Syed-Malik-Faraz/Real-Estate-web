import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import Metric from "../components/Metric";

import { useNavigate } from "react-router-dom";
import initialExpenses from "../data/Expenses";

function Dashboard() {
  const [showLogin, setShowLogin] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [animate, setAnimate] = useState(false);

  const revenueChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const cashFlowChartRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "Inter, sans-serif";
    setAnimate(true);
  }, []);

  /* ------------------ CHARTS ------------------ */
  useEffect(() => {
    if (
      !revenueChartRef.current ||
      !expenseChartRef.current ||
      !cashFlowChartRef.current
    )
      return;

    const revenueChart = echarts.init(revenueChartRef.current);
    const expenseChart = echarts.init(expenseChartRef.current);
    const cashFlowChart = echarts.init(cashFlowChartRef.current);

    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);

    revenueChart.setOption({
      tooltip: { trigger: "axis" },
      legend: { data: ["Revenue", "Expenses"] },
      xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr"] },
      yAxis: { type: "value" },
      series: [
        { name: "Revenue", type: "bar", data: [780, 820, 850, 880] },
        {
          name: "Expenses",
          type: "bar",
          data: [totalExpenses / 4, 400, 420, 430],
        },
      ],
    });

    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {});

    expenseChart.setOption({
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: "55%",
          data: Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
          })),
        },
      ],
    });

    cashFlowChart.setOption({
      tooltip: { trigger: "axis" },
      legend: { data: ["Operating", "Investing"] },
      xAxis: { type: "category", data: ["Q1", "Q2", "Q3", "Q4"] },
      yAxis: { type: "value" },
      series: [
        { name: "Operating", type: "line", data: [1200, 1350, 1500, 1600] },
        { name: "Investing", type: "line", data: [-800, -600, -700, -500] },
      ],
    });

    const resize = () => {
      revenueChart.resize();
      expenseChart.resize();
      cashFlowChart.resize();
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      revenueChart.dispose();
      expenseChart.dispose();
      cashFlowChart.dispose();
    };
  }, [expenses]);

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen pt-24 flex items-center bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-6">
              Enterprise Real Estate Management
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Smart analytics • Portfolio tracking • Revenue insights
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-amber-700 text-white px-8 py-3 rounded-lg"
              >
                Access Dashboard
              </button>
              <a href="#portfolio" className="border px-8 py-3 rounded-lg">
                View Portfolio
              </a>
            </div>
          </div>

          <img
            src="/resources/hero-architecture.jpg"
            className="rounded-2xl shadow-xl h-96 w-full object-cover"
          />
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Portfolio Dashboard</h3>
            <p className="text-xl text-gray-600">
              Real-time insights and analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Metric title="Total Properties" value="24" animate={animate} />
            <Metric title="Occupancy Rate" value="94.7%" animate={animate}/>
            <Metric title="Monthly Revenue" value="$847K" animate={animate}/>
            <Metric title="NOI" value="$521K" animate={animate}/>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <Metric title="Revenue" value="$10.2M" animate={animate} />
            <Metric
              title="Expenses"
              value={`$${expenses.reduce((a, e) => a + e.amount, 0)}`}
              animate={animate}
            />
            <Metric title="NOI" value="$5.4M" animate={animate} />
            <Metric title="Profit Margin" value="52.9%" animate={animate} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartCard title="Revenue vs Expenses" chartRef={revenueChartRef} />
            <ChartCard title="Expense Breakdown" chartRef={expenseChartRef} />
            <ChartCard title="Cash Flow" chartRef={cashFlowChartRef} />
          </div>
{/* 
          <div className="bg-gray-50 p-8 rounded-2xl mt-12">
            <h4 className="text-xl font-semibold mb-6">Quick Actions</h4>
            <div className="grid md:grid-cols-3 gap-4">
              
              <button onClick={()=>{
                navigate('/properties')
              }}>
              <ActionCard title="Add Property" />
              </button>
<button onClick={()=>{
  navigate('/tenants')
}}>
              <ActionCard title="Add Tenant" />
        </button>
<button onClick={()=>{
  navigate('/')
}}>
              <ActionCard title="Maintenance" />
        </button>
            </div>
          </div> */}


        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-12">
            Property Portfolio
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCard img="/resources/property-1.jpg" title="Meridian" />
            <PropertyCard img="/resources/property-2.jpg" title="TechHub" />
            <PropertyCard img="/resources/property-3.jpg" title="Central Plaza" />
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/properties")}
              className="bg-[#b45309] text-white px-8 py-3 rounded-lg"
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-center mb-6">
              Welcome Back
            </h3>
            <input className="w-full border p-3 rounded mb-4" placeholder="Email" />
            <input className="w-full border p-3 rounded mb-4" placeholder="Password" />
            <button className="w-full bg-amber-700 text-white py-3 rounded">
              Sign In
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-10 text-center">
        © {new Date().getFullYear()} PropertyVision
      </footer>
    </div>
  );
}

export default Dashboard;
