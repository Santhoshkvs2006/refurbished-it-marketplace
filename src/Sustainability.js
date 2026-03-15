import React from "react";

function Sustainability({ category }) {

  let ewaste = 0;

  if (category === "Laptop") ewaste = 3;
  if (category === "Desktop") ewaste = 8;
  if (category === "Printer") ewaste = 6;

  return (

    <div style={{
      marginTop: "20px",
      padding: "15px",
      border: "1px solid gray",
      borderRadius: "10px"
    }}>

      <h3>♻ Sustainability Impact</h3>

      <p>Buying this device saves <b>{ewaste}kg</b> of electronic waste.</p>

      <h4>✔ Refurbishment Certificate</h4>

      <p>Technician: Ravi Kumar</p>
      <p>Battery Health: 85%</p>
      <p>Hardware Tested: Passed</p>
      <p>Warranty: 3 Months</p>

    </div>

  )

}

export default Sustainability;