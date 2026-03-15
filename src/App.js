import React, { useState } from "react";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./services-module/Dashboard";
import BrowseProducts from "./services-module/BrowseProducts";
import ProductDetails from "./services-module/ProductDetails";
import RepairService from "./services-module/RepairService";
import WomenCategory from "./services-module/WomenCategory";
import EmiRequest from "./services-module/EmiRequest";
import PaymentMethod from "./services-module/PaymentMethod";
import Cart from "./Cart";
import Profile from "./Profile";
import Terms from "./Terms";
import './App.css'; // Premium UI Styles

function App(){

const [page,setPage] = useState("login");
const [user,setUser] = useState(null);
const [selectedProduct, setSelectedProduct] = useState(null);
const [cart, setCart] = useState([]);
const [globalSearchQuery, setGlobalSearchQuery] = useState("");
const [paymentDetails, setPaymentDetails] = useState(null);
const [orders, setOrders] = useState([
  {
    id: "ORD-98234-A",
    date: "Oct 12, 2025",
    status: "Delivered",
    total: 85000,
    items: ["Refurbished Dell XPS 15 - 4K Touch"]
  },
  {
    id: "ORD-87112-B",
    date: "Nov 04, 2025",
    status: "Processing",
    total: 4999,
    items: ["Logitech MX Master 3 Advanced Wireless Mouse"]
  }
]);

const addOrder = (order) => {
  setOrders(prev => [{
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Processing",
    total: order.total,
    items: order.items
  }, ...prev]);
};

const addToCart = (product) => {
  setCart([...cart, product]);
  alert(`${product.name} added to cart!`);
};

const renderPage = () => {
  switch(page) {
    case "login":
      return <Login setPage={setPage} user={user} setUser={setUser} />;
    case "register":
      return <Register setPage={setPage} setUser={setUser} />;
    case "dashboard":
      return <Dashboard onProductSelect={(product) => { setSelectedProduct(product); setPage("productDetails"); }} onAddToCart={addToCart} />;
    case "products":
      return <BrowseProducts onProductSelect={(product) => { setSelectedProduct(product); setPage("productDetails"); }} onAddToCart={addToCart} searchQuery={globalSearchQuery} />;
    case "productDetails":
      return <ProductDetails 
        product={selectedProduct} 
        onBack={() => setPage("dashboard")} 
        onAddToCart={addToCart} 
        onBuyNow={(amount, method) => {
          setPaymentDetails({ amount, method });
          setPage("payment");
        }} 
      />;
    case "payment":
      return <PaymentMethod 
        product={selectedProduct} 
        amount={paymentDetails?.amount} 
        method={paymentDetails?.method} 
        onBack={() => setPage("productDetails")} 
        onSuccess={() => {
          addOrder({
            total: parseInt(paymentDetails?.amount) || selectedProduct?.price || 0,
            items: [selectedProduct?.name]
          });
          setPage("dashboard");
        }} 
      />;
    case "repair":
      return <RepairService onBack={() => setPage("dashboard")} />;
    case "women":
      return <WomenCategory onProductSelect={(product) => { setSelectedProduct(product); setPage("productDetails"); }} onAddToCart={addToCart} />;
    case "emi":
      return <EmiRequest />;
    case "cart":
      return <Cart cart={cart} setCart={setCart} setPage={setPage} addOrder={addOrder} />;
    case "profile":
      return <Profile setPage={setPage} user={user} orders={orders} />;
    case "terms":
      return <Terms setPage={setPage} />;
    default:
      return <Login setPage={setPage} user={user} setUser={setUser} />;
  }
};

return(
<div className="app-container">
  {page !== "login" && page !== "register" && page !== "terms" && (
    <nav className="app-navbar">
      <div className="nav-left">
        <h2 className="brand-logo" onClick={() => setPage("products")}>RefurbX</h2>
        
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            className="search-input"
            placeholder="Search laptops, desktops, accessories..." 
            value={globalSearchQuery}
            onChange={(e) => {
              setGlobalSearchQuery(e.target.value);
              if (page !== "products") {
                setPage("products");
              }
            }}
          />
        </div>
      </div>

      <div className="nav-right">
        <button onClick={() => setPage("dashboard")} className={`nav-btn ${page === "dashboard" ? "active" : ""}`}>🏠 Home</button>
        <button onClick={() => setPage("products")} className={`nav-btn ${page === "products" ? "active" : ""}`}>🛍️ Store</button>
        <button onClick={() => setPage("repair")} className={`nav-btn ${page === "repair" ? "active" : ""}`}>🔧 Repair</button>
        <button onClick={() => setPage("women")} className={`nav-btn ${page === "women" ? "active" : ""}`}>✨ Women</button>
        <button onClick={() => setPage("emi")} className={`nav-btn ${page === "emi" ? "active" : ""}`}>💳 EMI</button>
        
        <button onClick={() => setPage("cart")} className={`nav-btn ${page === "cart" ? "active" : ""}`}>
          🛒 Cart • {cart.length}
        </button>
        
        <button onClick={() => setPage("profile")} className={`nav-btn ${page === "profile" ? "active" : ""}`}>👤 Profile</button>
        <button onClick={() => { setUser(null); setPage("login"); }} className="nav-btn logout">🚪 Logout</button>
      </div>
    </nav>
  )}
  <main className="main-content">
    {renderPage()}
  </main>
</div>
);

}

export default App;