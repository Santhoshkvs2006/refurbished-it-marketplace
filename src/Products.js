import React, { useState, useEffect } from "react";

function Products({ setPage, setSelectedProduct, searchQuery = "" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock API call to GET /products
    const fetchProducts = async () => {
      // In real app, fetch from backend
      const mockProducts = [
        {
          id: 1,
          name: "Refurbished Lenovo ThinkPad T440 (Core i5 4th Gen)",
          price: 13500,
          originalPrice: 48000,
          category: "Laptop",
          condition: "Fair - Minor Scratches",
          ewaste: "1.8 kg",
          benchmark: "PassMark: 2850 | Boot Time: 22s",
          image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600&h=400",
          description: "Standard issue government office laptop. Features Intel Core i5-4300U, 4GB RAM, and 500GB HDD. Durable design suitable for basic office tasks, data entry, and web browsing. Battery holds charge for 1.5 hours."
        },
        {
          id: 2,
          name: "Dell OptiPlex 3020 SFF Desktop (Core i3)",
          price: 8500,
          originalPrice: 28000,
          category: "Desktop",
          condition: "Good - Refurbished",
          ewaste: "6.0 kg",
          benchmark: "PassMark: 3100 | PCMark 10 Basic: 2100",
          image: "https://tse4.mm.bing.net/th/id/OIP.SN2Di37ixGm-Vl9xDmBrVwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
          description: "Compact form factor desktop salvaged from public sector offices. Intel Core i3-4130, 4GB DDR3 RAM, 500GB HDD. Excellent for accounting software and word processing. Thoroughly cleaned and tested."
        },
        {
          id: 3,
          name: "Logitech B100 Wired Optical Mouse",
          price: 50,
          originalPrice: 350,
          category: "Mouse",
          condition: "Acceptable",
          ewaste: "0.1 kg",
          benchmark: "Polling Rate: 125Hz | Optical Sensor: 800 DPI",
          image: "https://c1.neweggimages.com/ProductImageCompressAll1280/26-104-370_R05.jpg",
          description: "Basic wired USB optical mouse. Standard 3-button design used across various clerical departments. Tested for click consistency and wheel scrolling functionality."
        },
        {
          id: 4,
          name: "WD Blue 500GB 3.5\" Internal Hard Disk",
          price: 900,
          originalPrice: 2800,
          category: "Hard Disk",
          condition: "Good",
          ewaste: "0.45 kg",
          benchmark: "CrystalDiskMark Read: 110 MB/s | Health: 98% Good",
          image: "https://tse1.mm.bing.net/th/id/OIP.DMvfPvj0Vl2endB2GpqKXQHaE4?rs=1&pid=ImgDetMain&o=7&rm=3",
          description: "Standard 7200 RPM internal hard drive removed from decommissioned office PCs. Fully wiped using DoD standards and formatted. Good for secondary mass storage."
        },
        {
          id: 5,
          name: "D-Link DSL-2750U N300 ADSL2+ Router",
          price: 450,
          originalPrice: 1500,
          category: "Modem",
          condition: "Fair - Discolored",
          ewaste: "0.4 kg",
          benchmark: "Max Throughput: 300 Mbps | Network Latency: 5ms",
          image: "https://s13emagst.akamaized.net/products/54935/54934521/images/res_d4b968fb2b787739324d8e4238976e16.jpg",
          description: "Basic wireless N router previously used for BSNL broadband connections. Supports basic routing capabilities. May have yellowing from sun exposure but works perfectly."
        },
        {
          id: 6,
          name: "Hynix 4GB DDR3 1600MHz Desktop RAM",
          price: 400,
          originalPrice: 1200,
          category: "Spare Part",
          condition: "Working",
          ewaste: "0.03 kg",
          benchmark: "MemTest86: Passed (0 Errors) | Latency: CL11",
          image: "https://tse2.mm.bing.net/th/id/OIP.0NDMsjB9T0zYNrI1hj3SLwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
          description: "Standard unbuffered DDR3 memory module. Perfect replacement or upgrade piece to keeping aging Core 2 Duo and early Core i-series machines running smoothly."
        }
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage("productDetails");
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products" style={{ padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem" }}>Refurbished Products</h2>

      <div className="product-list" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No products found matching "{searchQuery}"</h3>
            <p>Try searching for a different term like "Laptop", "Mouse", or "Desktop".</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card" style={{
              background: "#f5f5f5",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              cursor: "default"
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}
              />
              <h3 style={{ margin: "0 0 15px 0", fontSize: "1.2rem", textAlign: "center", minHeight: "2.4em", display: "flex", alignItems: "center" }}>
                {product.name}
              </h3>
              <p style={{ margin: "5px 0", color: "#444" }}><strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}</p>
              <p style={{ margin: "5px 0", color: "#444" }}><strong>Category:</strong> {product.category}</p>
              <p style={{ margin: "5px 0", color: "#444" }}><strong>Condition:</strong> {product.condition}</p>

              {/* Trimmed description for card layout */}
              <p style={{
                margin: "15px 0 25px 0",
                color: "#666",
                textAlign: "center",
                fontSize: "0.9rem",
                lineHeight: "1.4",
                flexGrow: 1
              }}>
                {product.description.substring(0, 70)}...
              </p>

              <button
                onClick={() => handleProductClick(product)}
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.2s ease, transform 0.1s ease",
                  boxShadow: "0 4px 6px rgba(76, 175, 80, 0.3)"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#45a049"}
                onMouseOut={(e) => e.currentTarget.style.background = "#4CAF50"}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                View Details
              </button>
            </div>
          )))}
      </div>
    </div>
  );
}

export default Products;
