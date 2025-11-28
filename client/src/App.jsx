import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/user/Home";
import BrowseItems from "./pages/user/BrowseItems";
import CategoriesPage from "./pages/user/CategoriesPage";
import Contact from "./pages/user/Contact";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";

function App() {
  console.log("✅ App.jsx loaded - Multi-item rental marketplace");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "40px",
              }}
            >
              <div>404 - Page Not Found</div>
              <a href="/" style={{ fontSize: "20px", marginTop: "20px" }}>
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
