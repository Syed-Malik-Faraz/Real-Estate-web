import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";

/* ---------------- INITIAL DATA ---------------- */
const initialTenants = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    property: "Meridian Luxury Complex",
    unit: "101",
    phone: "555-1234",
    image: "/resources/tenant-avatar-1.jpg",
    monthlyRent: 2800,
    status: "active",
    paymentStatus: "current",
    leaseEnd: "2025-01-14",
  },
  {
    id: 2,
    firstName: "Emily",
    lastName: "Rodriguez",
    property: "Central Plaza",
    unit: "201",
    phone: "555-9876",
    image: "/resources/tenant-avatar-2.jpg",
    monthlyRent: 3600,
    status: "active",
    paymentStatus: "late",
    leaseEnd: "2024-12-10",
  },
];

const Tenants = () => {
  const [tenants, setTenants] = useState(initialTenants);
  const [showAddModal, setShowAddModal] = useState(false);

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    property: "",
    unit: "",
    phone: "",
    image: "",
    monthlyRent: "",
    leaseEnd: "",
  });

  /* ---------------- METRICS ---------------- */
  const today = new Date();

  const metrics = useMemo(() => {
    const total = tenants.length;
    const active = tenants.filter((t) => t.status === "active").length;
    const late = tenants.filter((t) => t.paymentStatus === "late").length;

    const renewals = tenants.filter((t) => {
      const days =
        (new Date(t.leaseEnd) - today) / (1000 * 60 * 60 * 24);
      return days <= 30 && days > 0;
    }).length;

    return { total, active, late, renewals };
  }, [tenants]);

  /* ---------------- ADD TENANT ---------------- */
  const handleAddTenant = () => {
    if (!form.firstName || !form.property || !form.leaseEnd) return;

    setTenants((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        monthlyRent: Number(form.monthlyRent),
        status: "active",
        paymentStatus: "current",
        image: form.image || "/resources/default-avatar.png",
      },
    ]);

    setForm({
      firstName: "",
      lastName: "",
      property: "",
      unit: "",
      phone: "",
      image: "",
      monthlyRent: "",
      leaseEnd: "",
    });

    setShowAddModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Tenants</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            + Add Tenant
          </button>
        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Total Tenants"
            value={metrics.total}
            growth="+6.4%"
            bg="bg-blue-100"
            color="text-blue-600"
            icon={<path strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4h-1" />}
          />

          <MetricCard
            title="Active Tenants"
            value={metrics.active}
            growth="+3.1%"
            bg="bg-green-100"
            color="text-green-600"
            icon={<path strokeWidth="2" d="M5 13l4 4L19 7" />}
          />

          <MetricCard
            title="Late Payments"
            value={metrics.late}
            growth="-1.8%"
            bg="bg-red-100"
            color="text-red-600"
            icon={<path strokeWidth="2" d="M12 8v4l3 3" />}
          />

          <MetricCard
            title="Lease Renewals"
            value={metrics.renewals}
            growth="+2.9%"
            bg="bg-orange-100"
            color="text-orange-600"
            icon={<path strokeWidth="2" d="M12 6v6l4 2" />}
          />
        </div>

        {/* TENANT CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.firstName}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>
                  <h3 className="text-lg font-semibold">
                    {t.firstName} {t.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t.property} • Unit {t.unit}
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <b>📞 Contact:</b>{" "}
                  <span className="text-gray-700">
                    {t.phone || "N/A"}
                  </span>
                </p>

                <p>
                  <b>💰 Rent:</b> ${t.monthlyRent}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      t.paymentStatus === "late"
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {t.paymentStatus}
                  </span>
                </p>

                <p>
                  <b>📅 Lease Ends:</b>{" "}
                  {new Date(t.leaseEnd).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD TENANT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Add Tenant</h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["property", "Property"],
                ["unit", "Unit"],
                ["phone", "Phone Number"],
                ["image", "Image URL"],
                ["monthlyRent", "Monthly Rent"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              ))}

              <input
                type="date"
                value={form.leaseEnd}
                onChange={(e) =>
                  setForm({ ...form, leaseEnd: e.target.value })
                }
                className="border p-2 rounded col-span-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button
                onClick={handleAddTenant}
                className="bg-amber-700 text-white px-6 py-2 rounded"
              >
                Add Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
