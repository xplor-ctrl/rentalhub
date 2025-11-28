const mongoose = require("mongoose");
const Item = require("./models/itemModel");
const Vehicle = require("./models/vehicleModel");

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/rental-platform";

// Sample items data
const sampleItems = [
  // Electronics
  {
    item_title: "Canon EOS R6 Camera",
    category: "photography",
    subcategory: "camera",
    brand: "Canon",
    model: "EOS R6",
    description:
      "Professional mirrorless camera with 20MP full-frame sensor. Perfect for photography and videography projects.",
    specifications: {
      resolution: "20MP",
      type: "Mirrorless",
      sensor: "Full Frame",
    },
    price_per_day: 2500,
    price_per_week: 15000,
    price_per_month: 50000,
    location: "Bangalore",
    district: "Koramangala",
    state: "Karnataka",
    images: [
      "https://images.unsplash.com/photo-1606981285008-c8301c5e50ce?w=500",
    ],
    condition: "excellent",
    rating: 4.8,
    reviews_count: 45,
    availability_status: true,
    owner_type: "vendor",
  },
  {
    item_title: 'MacBook Pro 16" M2',
    category: "electronics",
    subcategory: "laptop",
    brand: "Apple",
    model: 'MacBook Pro 16"',
    description:
      "High-performance laptop for video editing, coding, and design work. 32GB RAM, 1TB SSD.",
    specifications: {
      processor: "Apple M2 Pro",
      ram: "32GB",
      storage: "1TB SSD",
      screen: "16 inch Retina",
    },
    price_per_day: 1500,
    price_per_week: 9000,
    price_per_month: 30000,
    location: "Mumbai",
    district: "Andheri",
    state: "Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    ],
    condition: "excellent",
    rating: 4.9,
    reviews_count: 67,
    availability_status: true,
    owner_type: "vendor",
  },
  {
    item_title: "DJI Mavic Air 2 Drone",
    category: "electronics",
    subcategory: "drone",
    brand: "DJI",
    model: "Mavic Air 2",
    description:
      "Professional drone with 4K camera, 34-minute flight time. Great for aerial photography and videography.",
    specifications: {
      camera: "4K 60fps",
      flight_time: "34 minutes",
      range: "10km",
    },
    price_per_day: 3000,
    price_per_week: 18000,
    price_per_month: 60000,
    location: "Delhi",
    district: "Connaught Place",
    state: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    ],
    condition: "excellent",
    rating: 4.7,
    reviews_count: 34,
    availability_status: true,
    owner_type: "vendor",
  },

  // Tools
  {
    item_title: "Bosch Drill Machine Set",
    category: "tools",
    subcategory: "power-tools",
    brand: "Bosch",
    model: "GSB 13 RE",
    description:
      "Professional drill machine with complete accessory kit. Perfect for home repairs and construction work.",
    specifications: {
      power: "600W",
      chuck_capacity: "13mm",
      includes: "Drill bits, screwdriver bits, case",
    },
    price_per_day: 300,
    price_per_week: 1800,
    price_per_month: 6000,
    location: "Pune",
    district: "Kothrud",
    state: "Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500",
    ],
    condition: "good",
    rating: 4.5,
    reviews_count: 89,
    availability_status: true,
    owner_type: "individual",
  },
  {
    item_title: "Angle Grinder Machine",
    category: "tools",
    subcategory: "power-tools",
    brand: "Makita",
    model: "GA9020",
    description:
      "Heavy-duty angle grinder for cutting and grinding metal, tiles, and concrete.",
    specifications: {
      power: "2200W",
      disc_size: "230mm",
      speed: "6600 RPM",
    },
    price_per_day: 400,
    price_per_week: 2400,
    price_per_month: 8000,
    location: "Chennai",
    district: "Vadapalani",
    state: "Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500",
    ],
    condition: "good",
    rating: 4.6,
    reviews_count: 52,
    availability_status: true,
    owner_type: "vendor",
  },

  // Furniture
  {
    item_title: "Office Chair - Ergonomic",
    category: "furniture",
    subcategory: "chair",
    brand: "Herman Miller",
    model: "Aeron",
    description:
      "Premium ergonomic office chair with lumbar support. Perfect for long working hours.",
    specifications: {
      type: "Ergonomic",
      adjustable: "Yes",
      material: "Mesh back",
    },
    price_per_day: 200,
    price_per_week: 1200,
    price_per_month: 4000,
    location: "Bangalore",
    district: "Whitefield",
    state: "Karnataka",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
    ],
    condition: "excellent",
    rating: 4.7,
    reviews_count: 128,
    availability_status: true,
    owner_type: "vendor",
  },
  {
    item_title: "Conference Table - 8 Seater",
    category: "furniture",
    subcategory: "table",
    brand: "Godrej",
    model: "Executive Series",
    description:
      "Large conference table for meetings and events. Seats 8 people comfortably.",
    specifications: {
      size: "8 feet x 4 feet",
      material: "Engineered wood",
      seating: "8 people",
    },
    price_per_day: 800,
    price_per_week: 4800,
    price_per_month: 16000,
    location: "Hyderabad",
    district: "Hi-Tech City",
    state: "Telangana",
    images: [
      "https://images.unsplash.com/photo-1565359471792-53c9c43fff2f?w=500",
    ],
    condition: "good",
    rating: 4.4,
    reviews_count: 37,
    availability_status: true,
    owner_type: "vendor",
  },

  // Sports Equipment
  {
    item_title: "Mountain Bike - Trek",
    category: "sports",
    subcategory: "cycling",
    brand: "Trek",
    model: "Marlin 7",
    description:
      "High-quality mountain bike with 21 gears. Perfect for trails and adventure cycling.",
    specifications: {
      gears: "21 speed",
      frame: "Aluminum",
      wheel_size: "29 inch",
    },
    price_per_day: 500,
    price_per_week: 3000,
    price_per_month: 10000,
    location: "Goa",
    district: "Panaji",
    state: "Goa",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500",
    ],
    condition: "excellent",
    rating: 4.8,
    reviews_count: 94,
    availability_status: true,
    owner_type: "vendor",
  },
  {
    item_title: "Camping Tent - 4 Person",
    category: "sports",
    subcategory: "camping",
    brand: "Quechua",
    model: "Arpenaz 4.2",
    description:
      "Waterproof camping tent for 4 people. Easy setup, perfect for outdoor adventures.",
    specifications: {
      capacity: "4 people",
      waterproof: "Yes",
      setup_time: "10 minutes",
    },
    price_per_day: 600,
    price_per_week: 3600,
    price_per_month: 12000,
    location: "Manali",
    district: "Manali",
    state: "Himachal Pradesh",
    images: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500",
    ],
    condition: "good",
    rating: 4.6,
    reviews_count: 71,
    availability_status: true,
    owner_type: "individual",
  },

  // Party Equipment
  {
    item_title: "JBL Party Speaker System",
    category: "party",
    subcategory: "sound",
    brand: "JBL",
    model: "PartyBox 310",
    description:
      "Powerful party speaker with RGB lights and wireless microphone. Perfect for events and parties.",
    specifications: {
      power: "240W",
      battery: "18 hours",
      features: "Bluetooth, RGB lights, wireless mic",
    },
    price_per_day: 1200,
    price_per_week: 7200,
    price_per_month: 24000,
    location: "Mumbai",
    district: "Bandra",
    state: "Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    ],
    condition: "excellent",
    rating: 4.9,
    reviews_count: 156,
    availability_status: true,
    owner_type: "vendor",
  },
  {
    item_title: "LED Par Light Set (12 Units)",
    category: "party",
    subcategory: "lighting",
    brand: "Philips",
    model: "ColorBlast",
    description:
      "Professional LED par lights for stage and event lighting. RGB color mixing.",
    specifications: {
      units: "12 lights",
      type: "RGB LED",
      dmx: "Yes",
    },
    price_per_day: 2000,
    price_per_week: 12000,
    price_per_month: 40000,
    location: "Delhi",
    district: "Karol Bagh",
    state: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=500",
    ],
    condition: "excellent",
    rating: 4.7,
    reviews_count: 43,
    availability_status: true,
    owner_type: "vendor",
  },

  // Musical Instruments
  {
    item_title: "Yamaha Acoustic Guitar",
    category: "musical",
    subcategory: "guitar",
    brand: "Yamaha",
    model: "F310",
    description:
      "Quality acoustic guitar perfect for learning and performances. Includes carrying case.",
    specifications: {
      type: "Acoustic",
      strings: "6 steel strings",
      includes: "Case, picks, capo",
    },
    price_per_day: 300,
    price_per_week: 1800,
    price_per_month: 6000,
    location: "Bangalore",
    district: "Indiranagar",
    state: "Karnataka",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    ],
    condition: "excellent",
    rating: 4.8,
    reviews_count: 112,
    availability_status: true,
    owner_type: "individual",
  },
  {
    item_title: "Casio Keyboard - 61 Keys",
    category: "musical",
    subcategory: "keyboard",
    brand: "Casio",
    model: "CT-X700",
    description:
      "Digital keyboard with 600 tones and 195 rhythms. Perfect for practice and performances.",
    specifications: {
      keys: "61",
      tones: "600",
      rhythms: "195",
    },
    price_per_day: 400,
    price_per_week: 2400,
    price_per_month: 8000,
    location: "Chennai",
    district: "T Nagar",
    state: "Tamil Nadu",
    images: ["https://images.unsplash.com/photo-1563330232-57114bb0823c?w=500"],
    condition: "good",
    rating: 4.6,
    reviews_count: 78,
    availability_status: true,
    owner_type: "vendor",
  },
];

// Sample vehicles (to maintain existing vehicle functionality)
const sampleVehicles = [
  {
    name: "Honda City",
    company: "Honda",
    car_type: "Sedan",
    fuel_type: "Petrol",
    seats: 5,
    price: 1500,
    description: "Comfortable sedan perfect for city rides and long trips",
    image: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500",
    ],
    isDeleted: "false",
    isAdminApproved: true,
  },
  {
    name: "Toyota Fortuner",
    company: "Toyota",
    car_type: "SUV",
    fuel_type: "Diesel",
    seats: 7,
    price: 3500,
    description: "Premium SUV for family trips and adventures",
    image: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500",
    ],
    isDeleted: "false",
    isAdminApproved: true,
  },
  {
    name: "Royal Enfield Classic 350",
    company: "Royal Enfield",
    car_type: "Bike",
    fuel_type: "Petrol",
    seats: 2,
    price: 800,
    description: "Classic motorcycle for solo rides and short trips",
    image: ["https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=500"],
    isDeleted: "false",
    isAdminApproved: true,
  },
  {
    name: "Maruti Swift",
    company: "Maruti",
    car_type: "Hatchback",
    fuel_type: "Petrol",
    seats: 5,
    price: 1200,
    description: "Compact and fuel-efficient car for city driving",
    image: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500"],
    isDeleted: "false",
    isAdminApproved: true,
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing items...");
    await Item.deleteMany({});
    console.log("Existing items cleared");

    // Insert sample items
    console.log("Inserting sample items...");
    const insertedItems = await Item.insertMany(sampleItems);
    console.log(`✅ ${insertedItems.length} items inserted successfully`);

    // Insert sample vehicles
    console.log("Inserting sample vehicles...");
    const insertedVehicles = await Vehicle.insertMany(sampleVehicles);
    console.log(`✅ ${insertedVehicles.length} vehicles inserted successfully`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nSummary:");
    console.log(`- Items: ${insertedItems.length}`);
    console.log(`- Vehicles: ${insertedVehicles.length}`);
    console.log("\nCategories seeded:");
    const categories = [...new Set(sampleItems.map((item) => item.category))];
    categories.forEach((cat) => {
      const count = sampleItems.filter((item) => item.category === cat).length;
      console.log(`  - ${cat}: ${count} items`);
    });

    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
