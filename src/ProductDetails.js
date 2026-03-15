import React from "react";
import Sustainability from "./Sustainability";

function ProductDetails({ product, setPage, addToCart }) {

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
        <p>No product selected.</p>
        <button
          onClick={() => setPage("products")}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "#555",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", color: "white", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Breadcrumb / Back Button */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => setPage("products")}
          style={{
            padding: "8px 16px",
            border: "none",
            background: "transparent",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "white"}
          onMouseOut={(e) => e.currentTarget.style.color = "#aaa"}
        >
          ← Back to Products
        </button>
      </div>

      {/* Main Product Layout */}
      <div style={{ 
        display: "flex", 
        flexDirection: "row", 
        gap: "40px", 
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: "60px"
      }}>
        
        {/* Left Column: Image */}
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              border: "1px solid #333"
            }}
          />
        </div>

        {/* Right Column: Details & Buy Box */}
        <div style={{ flex: "1 1 400px", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div>
            <span style={{ 
              display: "inline-block", 
              padding: "4px 10px", 
              background: "#333", 
              color: "#aaa", 
              borderRadius: "4px", 
              fontSize: "0.85rem", 
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "10px"
            }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", lineHeight: "1.2" }}>
              {product.name}
            </h1>
            <p style={{ color: "#aaa", fontSize: "1.1rem", margin: 0 }}>
              Condition: <strong style={{ color: "#fff" }}>{product.condition}</strong>
            </p>
          </div>

          <div style={{ padding: "24px 0", borderTop: "1px solid #333", borderBottom: "1px solid #333" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "15px", marginBottom: "8px" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4CAF50" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "1.2rem", color: "#888", textDecoration: "line-through" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p style={{ color: "#4CAF50", margin: 0, fontWeight: "bold" }}>
                Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")} ({(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%)
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#eee" }}>Product Description</h3>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#ccc", margin: 0 }}>
              {product.description}
            </p>
          </div>

          {/* Eco Impact */}
          {product.ewaste && (
          <div style={{ 
            background: "rgba(76, 175, 80, 0.1)", 
            border: "1px solid rgba(76, 175, 80, 0.3)", 
            padding: "16px", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "10px"
          }}>
            <span style={{ fontSize: "1.5rem" }}>🌱</span>
            <p style={{ margin: 0, color: "#e0e0e0" }}>
              Buying this item saves <strong>{product.ewaste}</strong> of e-waste from landfills.
            </p>
          </div>
          )}

          {/* Benchmark Tests */}
          {product.benchmark && (
          <div style={{ 
            background: "rgba(33, 150, 243, 0.1)", 
            border: "1px solid rgba(33, 150, 243, 0.3)", 
            padding: "16px", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "10px"
          }}>
            <span style={{ fontSize: "1.5rem" }}>📊</span>
            <p style={{ margin: 0, color: "#e0e0e0" }}>
              <strong>Benchmark Test:</strong> {product.benchmark}
            </p>
          </div>
          )}

          {/* Add to Cart Button (Primary Action) */}
          <button
            onClick={() => addToCart(product)}
            style={{
              padding: "18px 32px",
              border: "none",
              background: "#4CAF50",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.3rem",
              width: "100%",
              marginTop: "10px",
              boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
              transition: "transform 0.1s ease, background 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#45a049";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#4CAF50";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(76, 175, 80, 0.4)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Add to Cart
          </button>
          
          <div style={{ textAlign: "center", color: "#888", fontSize: "0.9rem", marginTop: "10px" }}>
            <p style={{ margin: "5px 0" }}>✓ Free standard shipping on orders over ₹4999</p>
            <p style={{ margin: "5px 0" }}>✓ 30-day money-back guarantee</p>
            <p style={{ margin: "5px 0" }}>✓ 1-year RefurbX warranty</p>
          </div>

        </div>
      </div>

      <Sustainability category={product.category} />
    </div>
  );
}

export default ProductDetails;