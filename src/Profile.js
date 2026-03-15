import React from "react";

function Profile({ setPage, user, orders = [] }) {
  // Mock User Data
  const mockUser = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 91234 56780",
    address: "123 Green Avenue, Eco-Park",
    city: "Tech City, Tamil Nadu 600001",
    joinDate: "August 2025",
    totalEwasteSaved: "14.2 kg",
    treesPlanted: 5
  };

  // Orders passed as props

  const cardStyle = { 
    background: "#222", 
    padding: "25px", 
    borderRadius: "12px", 
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    border: "1px solid transparent",
    transition: "all 0.3s ease" 
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.border = "1px solid #4CAF50";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.15)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto", color: "white", fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "80vh" }}>
      <h1 style={{ borderBottom: "1px solid #444", paddingBottom: "15px", marginBottom: "30px", fontSize: "2.5rem" }}>Your Profile</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", alignItems: "start" }}>
        
        {/* Left Column: User Details & Eco Impact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#4CAF50", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold", boxShadow: "0 4px 10px rgba(76, 175, 80, 0.4)" }}>
                {mockUser.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ margin: "0 0 5px 0", fontSize: "1.5rem" }}>{mockUser.name}</h2>
                <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>Member since {mockUser.joinDate}</p>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", color: "#ddd", marginTop: "20px", borderTop: "1px solid #444", paddingTop: "20px" }}>
              <div>
                <strong style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Contact Information</strong>
                <p style={{ margin: "8px 0 4px 0" }}>📧 {mockUser.email}</p>
                <p style={{ margin: "4px 0" }}>📱 {mockUser.phone}</p>
                <p style={{ margin: "4px 0", color: "#888", fontSize: "0.9rem" }}>Alt: {mockUser.alternatePhone}</p>
              </div>
              
              <div style={{ marginTop: "10px" }}>
                <strong style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Shipping Address</strong>
                <p style={{ margin: "8px 0 4px 0" }}>📍 {mockUser.address}</p>
                <p style={{ margin: "4px 0 0 22px", color: "#aaa" }}>{mockUser.city}</p>
              </div>
            </div>
            
            <button style={{ marginTop: "25px", width: "100%", padding: "12px", background: "transparent", border: "1px solid #4CAF50", color: "#4CAF50", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s", fontWeight: "bold", letterSpacing: "0.5px" }} onMouseOver={(e) => { e.currentTarget.style.background = "#4CAF50"; e.currentTarget.style.color = "white"; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4CAF50"; }}>
              Edit Profile Details
            </button>
          </div>

          <div style={{...cardStyle, background: "rgba(76, 175, 80, 0.05)", border: "1px solid rgba(76, 175, 80, 0.2)"}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3 style={{ margin: "0 0 15px 0", color: "#4CAF50", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem" }}>🌱 Your Eco Impact</h3>
            <p style={{ margin: "0 0 20px 0", color: "#ccc", lineHeight: "1.5" }}>By choosing refurbished technology, you've positively contributed to a greener sustainable planet!</p>
            
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", flex: 1, textAlign: "center", border: "1px solid rgba(76, 175, 80, 0.2)" }}>
                <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold", color: "white" }}>{mockUser.totalEwasteSaved}</p>
                <span style={{ fontSize: "0.85rem", color: "#aaa", textTransform: "uppercase" }}>E-waste Saved</span>
              </div>
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", flex: 1, textAlign: "center", border: "1px solid rgba(76, 175, 80, 0.2)" }}>
                <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold", color: "white" }}>{mockUser.treesPlanted}</p>
                <span style={{ fontSize: "0.85rem", color: "#aaa", textTransform: "uppercase" }}>Trees Equivalent</span>
              </div>
            </div>
          </div>
          
          {/* Payment Methods Wrapper */}
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h2 style={{ margin: "0 0 15px 0", fontSize: "1.3rem", borderBottom: "1px solid #444", paddingBottom: "10px" }}>Saved Payments</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "#333", borderRadius: "8px", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>💳</span>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>HDFC Bank Visa</p>
                  <p style={{ margin: 0, color: "#888", fontSize: "0.85rem" }}>Ending in 4242</p>
                </div>
              </div>
              <button style={{ background: "transparent", border: "none", color: "#ff5252", cursor: "pointer" }}>Remove</button>
            </div>
            <button style={{ width: "100%", padding: "10px", background: "#333", border: "1px dashed #666", color: "#aaa", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = "#4CAF50"; e.currentTarget.style.color = "white"; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.color = "#aaa"; }}>
              + Add New Payment Method
            </button>
          </div>
        </div>

        {/* Right Column: Order History & Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h2 style={{ margin: "0 0 20px 0", borderBottom: "1px solid #444", paddingBottom: "15px", fontSize: "1.5rem" }}>Recent Order History</h2>
            
            {orders.length === 0 ? (
              <p style={{ color: "#aaa" }}>You have no past orders.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {orders.map((order, idx) => (
                  <div key={idx} style={{ padding: "20px", borderRadius: "10px", background: "#333", borderLeft: order.status === "Delivered" ? "4px solid #4CAF50" : "4px solid #FF9800", transition: "transform 0.2s", cursor: "pointer" }} onMouseOver={(e) => e.currentTarget.style.background = "#3a3a3a"} onMouseOut={(e) => e.currentTarget.style.background = "#333"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{order.id}</span>
                      <span style={{ fontSize: "0.95rem", color: "#bbb" }}>{order.date}</span>
                    </div>
                    
                    <div style={{ marginBottom: "20px", padding: "15px", background: "rgba(0,0,0,0.2)", borderRadius: "8px" }}>
                      {order.items.map((item, i) => (
                        <p key={i} style={{ margin: "5px 0", color: "#ddd", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "#4CAF50" }}>📦</span> {item}
                        </p>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #444", paddingTop: "15px" }}>
                      <span style={{ 
                        padding: "6px 16px", 
                        borderRadius: "30px", 
                        fontSize: "0.85rem", 
                        fontWeight: "bold",
                        background: order.status === "Delivered" ? "rgba(76, 175, 80, 0.15)" : "rgba(255, 152, 0, 0.15)",
                        color: order.status === "Delivered" ? "#4CAF50" : "#FF9800",
                        border: order.status === "Delivered" ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(255,152,0,0.3)"
                      }}>
                        {order.status}
                      </span>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ color: "#888", fontSize: "0.85rem", marginRight: "8px" }}>Total Amount</span>
                        <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" }}>₹{order.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button style={{ marginTop: "20px", width: "100%", padding: "12px", background: "#333", border: "none", color: "white", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "#444"} onMouseOut={(e) => e.currentTarget.style.background = "#333"}>
              View All Order History →
            </button>
          </div>
          
          <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
             <h2 style={{ margin: "0 0 20px 0", borderBottom: "1px solid #444", paddingBottom: "15px", fontSize: "1.5rem" }}>Account & System Settings</h2>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
               <button style={{ textAlign: "left", padding: "15px", background: "#333", border: "1px solid #444", color: "white", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "5px" }} onMouseOver={(e) => { e.currentTarget.style.background = "#444"; e.currentTarget.style.borderColor = "#666"; }} onMouseOut={(e) => { e.currentTarget.style.background = "#333"; e.currentTarget.style.borderColor = "#444"; }}>
                 <span style={{ fontSize: "1.2rem" }}>🔒 Security</span>
                 <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Change Password & 2FA</span>
               </button>
               
               <button style={{ textAlign: "left", padding: "15px", background: "#333", border: "1px solid #444", color: "white", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "5px" }} onMouseOver={(e) => { e.currentTarget.style.background = "#444"; e.currentTarget.style.borderColor = "#666"; }} onMouseOut={(e) => { e.currentTarget.style.background = "#333"; e.currentTarget.style.borderColor = "#444"; }}>
                 <span style={{ fontSize: "1.2rem" }}>🔔 Notifications</span>
                 <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Email & SMS Preferences</span>
               </button>

               <button style={{ textAlign: "left", padding: "15px", background: "#333", border: "1px solid #444", color: "white", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "5px" }} onMouseOver={(e) => { e.currentTarget.style.background = "#444"; e.currentTarget.style.borderColor = "#666"; }} onMouseOut={(e) => { e.currentTarget.style.background = "#333"; e.currentTarget.style.borderColor = "#444"; }}>
                 <span style={{ fontSize: "1.2rem" }}>🎧 Support</span>
                 <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Contact Help Center</span>
               </button>
               
               <button onClick={() => setPage("login")} style={{ textAlign: "left", padding: "15px", background: "rgba(244, 67, 54, 0.05)", border: "1px solid rgba(244, 67, 54, 0.2)", color: "#ff5252", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "5px" }} onMouseOver={(e) => { e.currentTarget.style.background = "rgba(244, 67, 54, 0.15)"; e.currentTarget.style.borderColor = "rgba(244, 67, 54, 0.4)"; }} onMouseOut={(e) => { e.currentTarget.style.background = "rgba(244, 67, 54, 0.05)"; e.currentTarget.style.borderColor = "rgba(244, 67, 54, 0.2)"; }}>
                 <span style={{ fontSize: "1.2rem" }}>🚪 Sign Out</span>
                 <span style={{ fontSize: "0.85rem", color: "#ff8a80" }}>Log off from device</span>
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
