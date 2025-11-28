// Mock in-memory database for development without MongoDB
let users = [];
let items = [];

export const mockDB = {
  // User operations
  users: {
    find: (query) => {
      if (query.email) {
        return users.filter((u) => u.email === query.email);
      }
      return users;
    },
    findOne: (query) => {
      if (query.email) {
        return users.find((u) => u.email === query.email) || null;
      }
      if (query._id) {
        return users.find((u) => u._id === query._id) || null;
      }
      return null;
    },
    create: (userData) => {
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        createdAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },
    updateOne: (query, update) => {
      const index = users.findIndex((u) => u._id === query._id);
      if (index !== -1) {
        users[index] = { ...users[index], ...update };
        return users[index];
      }
      return null;
    },
  },

  // Item operations
  items: {
    find: () => items,
    create: (itemData) => {
      const newItem = {
        _id: Date.now().toString(),
        ...itemData,
        createdAt: new Date(),
      };
      items.push(newItem);
      return newItem;
    },
  },

  // Reset data
  reset: () => {
    users = [];
    items = [];
  },
};

// Initialize with some demo data
export const initMockData = () => {
  console.log("📦 Initializing mock database...");

  // Create demo items
  items = [
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
    },
    {
      _id: "4",
      item_title: "Herman Miller Chair",
      category: "furniture",
      price_per_day: 200,
      location: "Bangalore",
      district: "Whitefield",
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
      ],
    },
  ];

  console.log(`✅ Mock database initialized with ${items.length} items`);
};
