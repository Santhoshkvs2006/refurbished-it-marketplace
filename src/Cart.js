import React, { useState } from 'react';

function Cart({ cart, setCart, setPage, addOrder }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMode, setPaymentMode] = useState('online');
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMode === 'online') {
      alert(`Payment of ₹${totalPrice.toLocaleString("en-IN")} successful! Your order is being processed. Thank you for shopping sustainably at RefurbX!`);
    } else {
      alert(`Order placed successfully! You will pay ₹${totalPrice.toLocaleString("en-IN")} via Cash on Delivery when the item arrives. Thank you for shopping sustainably at RefurbX!`);
    }
    
    if (addOrder && cart.length > 0) {
      addOrder({
        total: totalPrice,
        items: cart.map(item => item.name)
      });
    }

    setCart([]);
    setPage('products');
  };

  if (isCheckingOut) {
    return (
      <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", color: "white" }}>
        <button
          onClick={() => setIsCheckingOut(false)}
          style={{
            padding: "8px 12px",
            border: "none",
            background: "transparent",
            color: "#aaa",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Back to Cart
        </button>

        <div style={{ background: "#222", padding: "30px", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <h2 style={{ marginTop: 0, marginBottom: "20px", borderBottom: "1px solid #444", paddingBottom: "10px" }}>Secure Checkout</h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "1.2rem" }}>
            <span>Total to pay:</span>
            <span style={{ fontWeight: "bold", color: "#4CAF50" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>

          <form onSubmit={handlePaymentSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "15px" }}>Shipping Information</h3>
              <input type="text" placeholder="Full Name" required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
              <input type="text" placeholder="Address" required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="text" placeholder="City" required style={{ width: "50%", padding: "12px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
                <input type="text" placeholder="Zip Code" required style={{ width: "50%", padding: "12px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "15px" }}>Payment Method</h3>
              
              {/* Payment Mode Selector */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value="online" 
                    checked={paymentMode === 'online'} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  Online Payment (Card)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value="cod" 
                    checked={paymentMode === 'cod'} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  Cash on Delivery (COD)
                </label>
              </div>

              {/* Conditional Card Inputs */}
              {paymentMode === 'online' && (
                <div>
                  <input type="text" placeholder="Card Number" required pattern="\d{16}" title="16 digit card number" style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input type="text" placeholder="MM/YY" required pattern="\d{2}/\d{2}" title="MM/YY format" style={{ width: "50%", padding: "12px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
                    <input type="text" placeholder="CVC" required pattern="\d{3,4}" title="3 or 4 digit CVC" style={{ width: "50%", padding: "12px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "white" }} />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {paymentMode === 'online' ? `Pay ₹${totalPrice.toLocaleString("en-IN")}` : `Place COD Order for ₹${totalPrice.toLocaleString("en-IN")}`}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
        <button
          onClick={() => setPage("products")}
          style={{
            padding: "8px 12px",
            border: "none",
            background: "#444",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
        <h2 style={{ margin: 0 }}>Your Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#222", borderRadius: "10px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🛒</div>
          <h3>Your cart is empty</h3>
          <p style={{ color: "#aaa", marginBottom: "20px" }}>Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={() => setPage("products")}
            style={{
              padding: "12px 24px",
              border: "none",
              background: "#4CAF50",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#222", borderRadius: "10px", padding: "20px" }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 0",
                  borderBottom: index < cart.length - 1 ? "1px solid #444" : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", borderRadius: "5px", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                    <span style={{ fontSize: "12px", background: "#4CAF5022", color: "#4CAF50", padding: "2px 6px", borderRadius: "3px" }}>
                      {item.condition}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{item.price.toLocaleString("en-IN")}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    style={{
                      background: "transparent",
                      border: "1px solid #E53935",
                      color: "#E53935",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#222", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
              <span style={{ color: "#aaa" }}>Subtotal</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
              <span style={{ color: "#aaa" }}>Shipping</span>
              <span style={{ color: "#4CAF50" }}>Free</span>
            </div>
            <div style={{ height: "1px", background: "#444" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold" }}>
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={() => setIsCheckingOut(true)}
              style={{
                marginTop: "10px",
                padding: "15px",
                border: "none",
                background: "#4CAF50",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%"
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
