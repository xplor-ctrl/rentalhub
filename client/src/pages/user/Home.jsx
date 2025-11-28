import styles from "../../index";
import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsSweetAlert } from "../../redux/user/userSlice";
import { setCategoriesSuccess } from "../../redux/user/categorySlice";
import Footers from "../../components/Footer";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-400"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-6xl transform hover:scale-110 transition-transform">
          {category.icon}
        </div>
        <h3 className="font-bold text-lg text-gray-800">
          {category.displayName}
        </h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>
    </div>
  );
};

function Home() {
  const ref = useRef(null);
  const { isSweetAlert } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize with default categories immediately
  useEffect(() => {
    console.log("✅ Home component mounted and rendering");
    // Set default categories first to show UI immediately
    const defaultCats = getDefaultCategories();
    console.log("✅ Default categories loaded:", defaultCats.length);
    if (!categories || categories.length === 0) {
      dispatch(setCategoriesSuccess(defaultCats));
    }
    console.log("✅ Categories in state:", categories?.length || 0);
  }, []);

  console.log(
    "🔄 Home component rendering, categories:",
    categories?.length || 0
  );

  const getDefaultCategories = () => {
    return [
      {
        id: "vehicles",
        icon: "🚗",
        displayName: "Vehicles",
        description: "Cars, Bikes, Scooters",
      },
      {
        id: "electronics",
        icon: "💻",
        displayName: "Electronics",
        description: "Cameras, Laptops, Drones",
      },
      {
        id: "tools",
        icon: "🔧",
        displayName: "Tools",
        description: "Power Tools, Equipment",
      },
      {
        id: "furniture",
        icon: "🪑",
        displayName: "Furniture",
        description: "Chairs, Tables, Sofas",
      },
      {
        id: "sports",
        icon: "⚽",
        displayName: "Sports",
        description: "Camping, Cycling Gear",
      },
      {
        id: "party",
        icon: "🎉",
        displayName: "Party",
        description: "Sound, Lights, Decorations",
      },
      {
        id: "musical",
        icon: "🎸",
        displayName: "Musical",
        description: "Instruments & Equipment",
      },
      {
        id: "photography",
        icon: "📸",
        displayName: "Photography",
        description: "Cameras, Lenses, Studio",
      },
    ];
  };

  const sweetalert = () => {
    Swal.fire({
      show: true,
      title: "",
      text: "Item Booked Successfully",
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "Go to Home",
      confirmButtonColor: "#22c55e",
      denyButtonColor: "black",
      denyButtonText: `See Orders`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        navigate("/profile/orders");
      }
    });
    dispatch(setIsSweetAlert(false));
  };

  return (
    <>
      {isSweetAlert && sweetalert()}

      {/* Hero Section */}
      <div className="relative min-h-[85vh] w-full mx-auto sm:max-w-[900px] lg:max-w-[1500px] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="px-6 lg:px-28 absolute top-0 z-10 w-full flex flex-col justify-center items-center mt-[80px] md:mt-[120px]">
          <div className="text-center max-w-4xl">
            <p className="py-2 text-sm md:text-base text-gray-600 font-medium">
              Your One-Stop Rental Marketplace
            </p>
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Rent <span className="text-blue-600">Anything</span>,<br />
              <span className="text-purple-600">Anytime</span>, Anywhere
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              From vehicles to electronics, tools to furniture - everything you
              need is just a click away. Affordable prices, flexible rental
              periods, and convenient pickup options.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate("/browse")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Browse Items
                <span className="ml-2">→</span>
              </button>
              <button
                onClick={() => {
                  ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-lg text-sm md:text-base px-6 py-3 font-semibold transition-all"
              >
                Explore Categories
                <span className="ml-2">↓</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Categories Section */}
      <div ref={ref} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose from our wide range of categories and find exactly what you
            need
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories && categories.length > 0
              ? categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => navigate(`/browse?category=${category.id}`)}
                  />
                ))
              : getDefaultCategories().map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => navigate(`/browse?category=${category.id}`)}
                  />
                ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">1. Browse & Search</h3>
              <p className="text-gray-600">
                Find the perfect item from our wide range of categories
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">2. Book & Pay</h3>
              <p className="text-gray-600">
                Select your dates and make a secure payment
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">3. Enjoy & Return</h3>
              <p className="text-gray-600">
                Use the item and return it when you're done
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose RentHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">Affordable Prices</h3>
              <p className="text-sm text-gray-600">
                Best rental rates in the market
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Safe and encrypted transactions
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Quick Delivery</h3>
              <p className="text-sm text-gray-600">Fast and reliable service</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Quality Items</h3>
              <p className="text-sm text-gray-600">
                Well-maintained and verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Items to Rent Out?
          </h2>
          <p className="text-xl mb-8">
            List your items on RentHub and start earning today
          </p>
          <button
            onClick={() => navigate("/vendorSignup")}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Become a Vendor
          </button>
        </div>
      </div>

      <Footers />
    </>
  );
}

export default Home;
