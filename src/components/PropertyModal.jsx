import { useState } from "react";

const PropertyModal = ({ property, activeTab, setActiveTab, onClose, onUpdate }) => {
  const [newUnit, setNewUnit] = useState({
    number: "",
    type: "",
    rent: "",
    status: "available",
  });

  const handleAddUnit = () => {
    if (!newUnit.number || !newUnit.rent) return;

    const updatedUnits = [
      ...(property.units_detail || []),
      { ...newUnit, rent: Number(newUnit.rent) },
    ];

    const monthlyRevenue = updatedUnits
      .filter((u) => u.status === "occupied")
      .reduce((sum, u) => sum + u.rent, 0);

    const updatedProperty = {
      ...property,
      units_detail: updatedUnits,
      monthlyRevenue,
    };

    onUpdate(updatedProperty);

    setNewUnit({
      number: "",
      type: "",
      rent: "",
      status: "available",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-5xl w-full rounded-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold">{property.name}</h2>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 sm:gap-6 border-b mb-4 sm:mb-6 overflow-x-auto">
          {["overview", "units", "financials"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab
                  ? "border-b-2 border-orange-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-2 text-sm sm:text-base">
            <p className="text-gray-600">{property.description || "—"}</p>
            <p><b>Year Built:</b> {property.yearBuilt || "—"}</p>
            <p><b>Total Units:</b> {property.units_detail?.length || 0}</p>
          </div>
        )}

        {/* UNITS */}
        {activeTab === "units" && (
          <div className="space-y-4">
            
            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Unit</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {(property.units_detail || []).map((u) => (
                    <tr key={u.number} className="border-b">
                      <td className="py-2">{u.number}</td>
                      <td className="py-2">{u.status}</td>
                      <td className="py-2">${u.rent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ADD UNIT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <input
                placeholder="Unit No"
                className="border p-2 rounded text-sm"
                value={newUnit.number}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, number: e.target.value })
                }
              />

              <input
                placeholder="Type"
                className="border p-2 rounded text-sm"
                value={newUnit.type}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, type: e.target.value })
                }
              />

              <input
                placeholder="Rent"
                type="number"
                className="border p-2 rounded text-sm"
                value={newUnit.rent}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, rent: e.target.value })
                }
              />

              <button
                onClick={handleAddUnit}
                className="bg-orange-700 text-white rounded p-2 text-sm"
              >
                Add Unit
              </button>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeTab === "financials" && (
          <div className="space-y-2 text-sm sm:text-base">
            <p><b>Monthly Revenue:</b> ${property.monthlyRevenue}</p>
            <p><b>Annual Revenue:</b> ${property.monthlyRevenue * 12}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;
