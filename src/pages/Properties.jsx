import { useState } from "react";
import PropertyModal from "../components/PropertyModal.jsx";
import Modal from "../components/Modal.jsx";
import propertiesData from "../data/propertiesData.js";
import InnerPropertyCard from "../components/InnerPropertyCard.jsx";
import Navbar from "../components/Navbar.jsx";

/* ================= CALCULATION LOGIC ================= */
const calculateStats = (units = []) => {
  const totalUnits = units.length;

  const occupiedUnits = units.filter((u) => u.status === "Occupied");
  const occupied = occupiedUnits.length;

  const monthlyRevenue = occupiedUnits.reduce(
    (sum, u) => sum + Number(u.rent || 0),
    0
  );

  const annualRevenue = monthlyRevenue * 12;

  const occupancyRate =
    totalUnits > 0 ? Math.round((occupied / totalUnits) * 100) : 0;

  return {
    units: totalUnits,
    occupied,
    monthlyRevenue,
    annualRevenue,
    occupancyRate,
  };
};

export default function Properties() {
  const [allProperties, setAllProperties] = useState(propertiesData);
  const [properties, setProperties] = useState(propertiesData);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddModal, setShowAddModal] = useState(false);

  /* ================= ADD PROPERTY STATE ================= */
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
    status: "",
    location: "",
    address: "",
    yearBuilt: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  /* ================= SEARCH ================= */
  const handleSearch = (value) => {
    setSearchTerm(value);

    const filtered = allProperties.filter((p) =>
      `${p.name} ${p.location} ${p.type}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setProperties(filtered);
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setNewProperty({
      ...newProperty,
      image: file,
      imagePreview: preview,
    });
  };

  /* ================= ADD PROPERTY ================= */
  const handleAddProperty = () => {
    const property = {
      id: Date.now(),
      name: newProperty.name,
      type: newProperty.type,
      status: newProperty.status,
      location: newProperty.location,
      address: newProperty.address,
      yearBuilt: newProperty.yearBuilt,
      description: newProperty.description,
      image: newProperty.imagePreview,
      units_detail: [],
      amenities: [],
    };

    const updated = [...allProperties, property];
    setAllProperties(updated);
    setProperties(updated);

    setNewProperty({
      name: "",
      type: "",
      status: "",
      location: "",
      address: "",
      yearBuilt: "",
      description: "",
      image: null,
      imagePreview: "",
    });

    setSearchTerm("");
    setShowAddModal(false);
  };

  /* ================= UPDATE PROPERTY ================= */
  const updateProperty = (updatedProperty) => {
    const updated = allProperties.map((p) =>
      p.id === updatedProperty.id ? updatedProperty : p
    );

    setAllProperties(updated);
    setProperties(updated);
    setSelectedProperty(updatedProperty);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
      <Navbar />

      {/* HEADER + SEARCH */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Property Portfolio
          </h1>
          <p className="text-gray-600">Manage your properties</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search properties..."
            className="border p-2 rounded w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-700 text-white px-6 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto"
          >
            Add Property
          </button>
        </div>
      </div>

      {/* PROPERTY GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => {
          const stats = calculateStats(p.units_detail);

          return (
            <InnerPropertyCard
              key={p.id}
              property={{ ...p, ...stats }}
              onClick={() => {
                setSelectedProperty(p);
                setActiveTab("overview");
              }}
            />
          );
        })}
      </div>

      {/* PROPERTY MODAL */}
      {selectedProperty && (
        <PropertyModal
          property={{
            ...selectedProperty,
            ...calculateStats(selectedProperty.units_detail),
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setSelectedProperty(null)}
          onUpdate={updateProperty}
        />
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <Modal title="Add Property" onClose={() => setShowAddModal(false)}>
          <div className="space-y-3">
            <input
              placeholder="Property Name"
              className="w-full border p-2 rounded"
              value={newProperty.name}
              onChange={(e) =>
                setNewProperty({ ...newProperty, name: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded"
              value={newProperty.type}
              onChange={(e) =>
                setNewProperty({ ...newProperty, type: e.target.value })
              }
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed Use">Mixed Use</option>
              <option value="Industrial">Industrial</option>
            </select>

            <input
              placeholder="Status"
              className="w-full border p-2 rounded"
              value={newProperty.status}
              onChange={(e) =>
                setNewProperty({ ...newProperty, status: e.target.value })
              }
            />

            <input
              placeholder="Location"
              className="w-full border p-2 rounded"
              value={newProperty.location}
              onChange={(e) =>
                setNewProperty({ ...newProperty, location: e.target.value })
              }
            />

            <input
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={newProperty.address}
              onChange={(e) =>
                setNewProperty({ ...newProperty, address: e.target.value })
              }
            />

            <input
              placeholder="Year Built"
              className="w-full border p-2 rounded"
              value={newProperty.yearBuilt}
              onChange={(e) =>
                setNewProperty({ ...newProperty, yearBuilt: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              value={newProperty.description}
              onChange={(e) =>
                setNewProperty({
                  ...newProperty,
                  description: e.target.value,
                })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={handleImageChange}
            />

            {newProperty.imagePreview && (
              <img
                src={newProperty.imagePreview}
                className="h-40 w-full object-cover rounded"
                alt="Preview"
              />
            )}

            <button
              onClick={handleAddProperty}
              className="bg-orange-700 text-white px-5 py-2 rounded w-full"
            >
              Add Property
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
