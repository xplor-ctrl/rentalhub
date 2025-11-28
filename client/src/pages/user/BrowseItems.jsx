import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footers from "../../components/Footer";

export default function BrowseItems() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Items", icon: "🏪" },
    { id: "vehicles", name: "Vehicles", icon: "🚗" },
    { id: "electronics", name: "Electronics", icon: "💻" },
    { id: "tools", name: "Tools", icon: "🔧" },
    { id: "furniture", name: "Furniture", icon: "🪑" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "party", name: "Party", icon: "🎉" },
    { id: "musical", name: "Musical", icon: "🎸" },
    { id: "photography", name: "Photography", icon: "📷" },
  ];

  const mockItems = [
    {
      _id: "1",
      item_title: "Canon EOS R6 Camera",
      category: "photography",
      price_per_day: 2500,
      location: "Bangalore",
      district: "Koramangala",
      images: [
        "https://images.unsplash.com/photo-1606981285008-c8301c5e50ce?w=500",
      ],
      description: "Professional mirrorless camera with 20MP sensor",
    },
    {
      _id: "2",
      item_title: 'MacBook Pro 16" M2',
      category: "electronics",
      price_per_day: 1500,
      location: "Mumbai",
      district: "Andheri",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      ],
      description: "High-performance laptop for professionals",
    },
    {
      _id: "3",
      item_title: "Bosch Drill Machine",
      category: "tools",
      price_per_day: 300,
      location: "Pune",
      district: "Kothrud",
      images: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500",
      ],
      description: "Heavy-duty cordless drill with batteries",
    },
    {
      _id: "4",
      item_title: "Herman Miller Office Chair",
      category: "furniture",
      price_per_day: 200,
      location: "Bangalore",
      district: "Whitefield",
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
      ],
      description: "Ergonomic office chair with lumbar support",
    },
    {
      _id: "5",
      item_title: "Trek Mountain Bike",
      category: "sports",
      price_per_day: 500,
      location: "Goa",
      district: "Panaji",
      images: [
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500",
      ],
      description: "21-speed mountain bike for adventures",
    },
    {
      _id: "6",
      item_title: "JBL PartyBox 310",
      category: "party",
      price_per_day: 1200,
      location: "Mumbai",
      district: "Bandra",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      ],
      description: "Powerful party speaker with lights",
    },
    {
      _id: "7",
      item_title: "Yamaha F280 Guitar",
      category: "musical",
      price_per_day: 300,
      location: "Bangalore",
      district: "Indiranagar",
      images: [
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
      ],
      description: "Acoustic guitar perfect for beginners",
    },
    {
      _id: "8",
      item_title: "DJI Mini 3 Pro Drone",
      category: "electronics",
      price_per_day: 3000,
      location: "Delhi",
      district: "Connaught Place",
      images: [
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
      ],
      description: "4K camera drone with obstacle avoidance",
    },
  ];

  const locations = ["all", "Bangalore", "Mumbai", "Pune", "Goa", "Delhi"];

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.item_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || item.location === locationFilter;

    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = item.price_per_day < 500;
    if (priceFilter === "medium")
      matchesPrice = item.price_per_day >= 500 && item.price_per_day < 1500;
    if (priceFilter === "high") matchesPrice = item.price_per_day >= 1500;

    return matchesCategory && matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse All Items
          </h1>
          <p className="text-xl">
            Rent anything you need - from electronics to party equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Search & Filter</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search items by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Price Filter */}
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹500/day</option>
                <option value="medium">₹500 - ₹1500/day</option>
                <option value="high">Above ₹1500/day</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "item" : "items"}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() =>
                  alert(`Booking feature coming soon for ${item.item_title}`)
                }
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.item_title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{item.price_per_day}/day
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {item.item_title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">📍 {item.location}</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      <Footers />
    </div>
  );
}
