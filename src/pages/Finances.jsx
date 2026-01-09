
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Link } from "react-router-dom";
import initialExpenses from "../data/Expenses";
import Metric from "../components/Metric.jsx"
import ChartCard from "../components/ChartCard.jsx";
import Navbar from "../components/Navbar.jsx";


/* ================== MAIN COMPONENT ================== */
export default function Finances() {
  const revenueChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const cashFlowChartRef = useRef(null);

  const [expenses, setExpenses] = useState(initialExpenses);
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    vendor: "",
    category: "",
  });



  useEffect(() => setAnimate(true), []);

  /* ------------------ CHART SETUP ------------------ */
  useEffect(() => {
    const revenueChart = echarts.init(revenueChartRef.current);
    const expenseChart = echarts.init(expenseChartRef.current);
    const cashFlowChart = echarts.init(cashFlowChartRef.current);

    const renderCharts = () => {
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
            data: [expenses.reduce((a, e) => a + e.amount, 0) / 4, 400, 420, 430],
          },
        ],
      });

      // Pie chart dynamic by category
      const categoryTotals = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
        return acc;
      }, {});
      const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
      }));

      expenseChart.setOption({
        tooltip: { trigger: "item" },
        series: [{ type: "pie", radius: "55%", data: pieData }],
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
    };

    renderCharts();
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
  }, [expenses]); // <-- re-render charts whenever expenses change

  /* ------------------ EXPENSE ACTIONS ------------------ */
  const approveExpense = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "approved" } : e))
    );
  };

  const rejectExpense = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "rejected" } : e))
    );
  };

  /* ------------------ FORM HANDLERS ------------------ */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount, vendor, category } = formData;
    if (!description || !amount || !vendor || !category) {
      alert("All fields are required!");
      return;
    }
    const newExpense = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      description,
      amount: Number(amount),
      vendor,
      category,
      status: "pending",
      property: "Default Property",
    };
    setExpenses((prev) => [...prev, newExpense]);
    setFormData({ description: "", amount: "", vendor: "", category: "" });
    setShowModal(false);
  };

  /* ================== UI ================== */
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      {/* <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">PropertyVision</h1>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-600">Dashboard</Link>
            <Link to="/finances" className="font-semibold">Finances</Link>
          </div>
        </div>
      </nav> */}

<Navbar />

      {/* HEADER */}
      <section className="pt-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">Financial Management</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 text-white px-5 py-2 rounded hover:opacity-90"
          >
            Add Expense
          </button>
        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Metric title="Revenue" value="$10.2M" animate={animate} />
          <Metric title="Expenses" value={`$${expenses.reduce((a, e) => a + e.amount, 0)}`} animate={animate} />
          <Metric title="NOI" value="$5.4M" animate={animate} />
          <Metric title="Profit Margin" value="52.9%" animate={animate} />
        </div>
      </section>

      {/* CHARTS */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
        <ChartCard title="Revenue vs Expenses" chartRef={revenueChartRef} />
        <ChartCard title="Expense Breakdown" chartRef={expenseChartRef} />
      </section>

      {/* CASH FLOW */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <ChartCard title="Cash Flow" chartRef={cashFlowChartRef} />
      </section>

      {/* EXPENSE TABLE */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <table className="w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-4">
                  <p className="font-medium">{e.description}</p>
                  <p className="text-sm text-gray-500">{e.vendor}</p>
                </td>
                <td className="p-4">${e.amount}</td>
                <td className="p-4">{e.category}</td>
                <td className="p-4 capitalize">{e.status}</td>
                <td className="p-4 flex gap-4">
                  {e.status === "pending" && (
                    <>
                      <button onClick={() => approveExpense(e.id)} className="text-green-600">
                        Approve
                      </button>
                      <button onClick={() => rejectExpense(e.id)} className="text-red-600">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-lg scale-100 transition"
          >
            <h3 className="text-xl font-bold mb-4">Add Expense</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                placeholder="Vendor"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
                Add Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

