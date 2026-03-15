import React from "react";
import "./App.css";

function Dashboard({ setPage, setSelectedProduct }) {
  const featuredProducts = [
    {
      id: 1,
      name: "Refurbished Lenovo ThinkPad T440 (Core i5 4th Gen)",
      price: 13500,
      category: "Laptop",
      condition: "Fair - Minor Scratches",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Standard issue government office laptop. Features Intel Core i5-4300U, 4GB RAM, and 500GB HDD. Durable design suitable for basic office tasks, data entry, and web browsing. Battery holds charge for 1.5 hours."
    },
    {
      id: 2,
      name: "Dell OptiPlex 3020 SFF Desktop (Core i3)",
      price: 8500,
      category: "Desktop",
      condition: "Good - Refurbished",
      image: "https://tse4.mm.bing.net/th/id/OIP.SN2Di37ixGm-Vl9xDmBrVwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Compact form factor desktop salvaged from public sector offices. Intel Core i3-4130, 4GB DDR3 RAM, 500GB HDD. Excellent for accounting software and word processing. Thoroughly cleaned and tested."
    },
    {
      id: 3,
      name: "Logitech B100 Wired Optical Mouse",
      price: 50,
      category: "Mouse",
      condition: "Acceptable",
      image: "https://c1.neweggimages.com/ProductImageCompressAll1280/26-104-370_R05.jpg",
      description: "Basic wired USB optical mouse. Standard 3-button design used across various clerical departments. Tested for click consistency and wheel scrolling functionality."
    }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage("productDetails");
  };

  return (
    <div className="dashboard">
      <header style={{ display: "none" }}>
        <h1>♻️ Refurbished Product Marketplace</h1>
        <nav>
          <button onClick={() => setPage("dashboard")}>🏠 Home</button>
          <button onClick={() => setPage("products")}>🛒 Products</button>
          <button onClick={() => setPage("login")}>🚪 Logout</button>
        </nav>
      </header>
      <main>

        



        {/* Featured Products Section */}
        <div style={{ marginTop: "60px", marginBottom: "40px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>Featured Refurbished Deals</h2>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            {featuredProducts.map(product => (
              <div key={product.id} style={{
                background: "#f5f5f5",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                width: "300px",
                transition: "transform 0.3s ease"
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }} 
                />
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem", textAlign: "center", color: "#333", minHeight: "2.4em" }}>{product.name}</h3>
                <p style={{ margin: "5px 0", color: "#444" }}><strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}</p>
                <p style={{ margin: "5px 0", color: "#444" }}><strong>Condition:</strong> {product.condition}</p>
                
                <button 
                  onClick={() => handleProductClick(product)}
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "15px",
                    width: "100%",
                    transition: "background 0.3s"
                  }}
                  onMouseOver={(e) => e.target.style.background = "#45a049"}
                  onMouseOut={(e) => e.target.style.background = "#4CAF50"}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button 
              onClick={() => setPage("products")}
              style={{
                background: "transparent",
                color: "#4CAF50",
                border: "2px solid #4CAF50",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => { e.target.style.background = "#4CAF50"; e.target.style.color = "white"; }}
              onMouseOut={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#4CAF50"; }}
            >
              View Full Store Catalog →
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
