import { Link } from "react-router-dom";
import styles from "../..";
import Footers from "../../components/Footer";

function Enterprise() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              List Your Items with RentHub
            </h1>
            <p className="text-xl text-gray-600">
              Turn your unused items into a source of income
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why List with Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Earn Extra Income
                  </h3>
                  <p className="text-gray-600">
                    Make money from items sitting idle in your home
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Secure Platform
                  </h3>
                  <p className="text-gray-600">
                    Protected transactions and verified renters
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Easy Management
                  </h3>
                  <p className="text-gray-600">
                    Simple dashboard to manage all your listings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌟</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Build Reputation
                  </h3>
                  <p className="text-gray-600">
                    Get reviews and ratings from satisfied renters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-blue-100">
              To list your items, you need to login as a vendor first
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/vendorSignin">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Login as Vendor
                </button>
              </Link>
              <Link to="/vendorSignup">
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Create Vendor Account
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Can You List?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🚗</div>
                <p className="font-semibold">Vehicles</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">💻</div>
                <p className="font-semibold">Electronics</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🔧</div>
                <p className="font-semibold">Tools</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🪑</div>
                <p className="font-semibold">Furniture</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">⚽</div>
                <p className="font-semibold">Sports</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-semibold">Party</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🎸</div>
                <p className="font-semibold">Musical</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">📸</div>
                <p className="font-semibold">Photography</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footers />
    </>
  );
}

export default Enterprise;
