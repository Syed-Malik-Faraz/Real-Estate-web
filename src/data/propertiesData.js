 const propertiesData  = [
  {
    id: 1,
    name: "Meridian Luxury Complex",
    type: "residential",
    status: "active",
    location: "downtown",
    image: "/resources/property-1.jpg",
    units: 156,
    occupied: 153,
    monthlyRevenue: 2400000,
    occupancyRate: 98,
    address: "123 Downtown Blvd, Metropolitan City",
    yearBuilt: 2019,
    description: "Premium residential complex featuring modern amenities.",
    amenities: ["Swimming Pool", "Fitness Center", "Concierge"],
    units_detail: [
      { number: "101", type: "1BR", status: "occupied", tenant: "Sarah", rent: 2800 },
      { number: "102", type: "2BR", status: "available", tenant: null, rent: 3200 }
    ]
  },
  {
    id: 2,
    name: "TechHub Office Park",
    type: "commercial",
    status: "active",
    location: "midtown",
    image: "/resources/property-2.jpg",
    units: 89,
    occupied: 82,
    monthlyRevenue: 1800000,
    occupancyRate: 92,
    address: "456 Innovation Drive",
    yearBuilt: 2021,
    description: "Modern office complex for tech companies.",
    amenities: ["Conference Rooms", "Parking"],
    units_detail: []
  }
];

export default propertiesData;