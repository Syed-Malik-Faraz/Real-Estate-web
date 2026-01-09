// import React, { useState, useEffect } from "react";

// const PropertyModal = ({ property, activeTab, setActiveTab, onClose }) => {
//   const [units, setUnits] = useState([]);
//   const [newUnit, setNewUnit] = useState({
//     number: "",
//     type: "",
//     rent: "",
//     status: "available",
//   });

//   /* ---------- Sync units when modal opens ---------- */
//   useEffect(() => {
//     setUnits(property.units_detail || []);
//   }, [property]);

//   /* ---------- Add Unit ---------- */
//   const handleAddUnit = () => {
//     if (!newUnit.number || !newUnit.rent) return;

//     setUnits([
//       ...units,
//       {
//         ...newUnit,
//         rent: Number(newUnit.rent),
//       },
//     ]);

//     setNewUnit({
//       number: "",
//       type: "",
//       rent: "",
//       status: "available",
//     });
//   };

//   /* ---------- Revenue Calculation ---------- */
//   const monthlyRevenue = units.reduce(
//     (sum, u) => (u.status === "occupied" ? sum + u.rent : sum),
//     0
//   );

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white max-w-5xl w-full rounded-xl p-6 overflow-y-auto">
//         <div className="flex justify-between mb-6">
//           <h2 className="text-2xl font-bold">{property.name}</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* TABS */}
//         <div className="flex gap-6 border-b mb-6">
//           {["overview", "units", "financials"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-2 ${
//                 activeTab === tab
//                   ? "border-b-2 border-orange-600 font-semibold"
//                   : "text-gray-500"
//               }`}
//             >
//               {tab.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* OVERVIEW */}
//         {activeTab === "overview" && (
//           <div className="space-y-2">
//             <p className="text-gray-600">{property.description || "No description"}</p>
//             <p><b>Year Built:</b> {property.yearBuilt || "-"}</p>
//             <p><b>Total Units:</b> {units.length}</p>
//           </div>
//         )}

//         {/* UNITS */}
//         {activeTab === "units" && (
//           <div className="space-y-6">
//             {/* ADD UNIT FORM */}
//             <div className="grid grid-cols-4 gap-4">
//               <input
//                 placeholder="Unit No"
//                 className="border p-2 rounded"
//                 value={newUnit.number}
//                 onChange={(e) =>
//                   setNewUnit({ ...newUnit, number: e.target.value })
//                 }
//               />

//               <input
//                 placeholder="Type"
//                 className="border p-2 rounded"
//                 value={newUnit.type}
//                 onChange={(e) =>
//                   setNewUnit({ ...newUnit, type: e.target.value })
//                 }
//               />

//               <input
//                 placeholder="Rent"
//                 type="number"
//                 className="border p-2 rounded"
//                 value={newUnit.rent}
//                 onChange={(e) =>
//                   setNewUnit({ ...newUnit, rent: e.target.value })
//                 }
//               />

//               <button
//                 onClick={handleAddUnit}
//                 className="bg-orange-700 text-white rounded"
//               >
//                 Add Unit
//               </button>
//             </div>

//             {/* UNITS TABLE */}
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th>Unit</th>
//                   <th>Type</th>
//                   <th>Status</th>
//                   <th>Rent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {units.length > 0 ? (
//                   units.map((u) => (
//                     <tr key={u.number} className="border-b">
//                       <td>{u.number}</td>
//                       <td>{u.type}</td>
//                       <td>{u.status}</td>
//                       <td>₹{u.rent}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center py-4 text-gray-500">
//                       No units added
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* FINANCIALS */}
//         {activeTab === "financials" && (
//           <div className="space-y-2">
//             <p><b>Monthly Revenue:</b> ₹{monthlyRevenue}</p>
//             <p><b>Annual Revenue:</b> ₹{monthlyRevenue * 12}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;


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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-5xl w-full rounded-xl p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">{property.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b mb-6">
          {["overview", "units", "financials"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
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
          <div>
            <p className="text-gray-600 mb-4">{property.description || "—"}</p>
            <p><b>Year Built:</b> {property.yearBuilt || "—"}</p>
            <p><b>Total Units:</b> {property.units_detail?.length || 0}</p>
          </div>
        )}

        {/* UNITS */}
        {activeTab === "units" && (
          <div className="space-y-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Rent</th>
                </tr>
              </thead>
              <tbody>
                {(property.units_detail || []).map((u) => (
                  <tr key={u.number} className="border-b">
                    <td>{u.number}</td>
                    <td>{u.status}</td>
                    <td>${u.rent}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ADD UNIT */}
            <div className="grid grid-cols-4 gap-2">
              <input
                placeholder="Unit No"
                className="border p-2 rounded"
                value={newUnit.number}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, number: e.target.value })
                }
              />

              <input
                placeholder="Type"
                className="border p-2 rounded"
                value={newUnit.type}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, type: e.target.value })
                }
              />

              <input
                placeholder="Rent"
                type="number"
                className="border p-2 rounded"
                value={newUnit.rent}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, rent: e.target.value })
                }
              />

              <button
                onClick={handleAddUnit}
                className="bg-orange-700 text-white rounded"
              >
                Add Unit
              </button>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeTab === "financials" && (
          <div>
            <p><b>Monthly Revenue:</b> ${property.monthlyRevenue}</p>
            <p><b>Annual Revenue:</b> ${property.monthlyRevenue * 12}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;
