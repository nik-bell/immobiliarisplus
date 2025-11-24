import { useState } from "react";
import { getProperties, createValuation } from "../api/api";

export default function Test() {
  const [log, setLog] = useState("");

  function addLog(text) {
    console.log(text);
    setLog((prev) => prev + "\n" + text);
  }

  async function testGet() {
    addLog("Eseguo GET /properties...");
    const data = await getProperties();
    addLog("Risultato GET:");
    addLog(JSON.stringify(data, null, 2));
  }

  async function testPost() {
    addLog("Eseguo POST /valuations/calculate...");
    const sampleBody = {
      zipCode: "10121",
      city: "Torino",
      address: "Via Roma 1",
      sizeMq: 85,
      floor: "THIRD",
      numberOfRooms: 3,
      numberOfBathrooms: 1,
      condition: "GOOD_CONDITION",
      propertyType: "APARTMENT",
      heatingType: "AUTONOMOUS",
      hasTerrace: true,
      hasElevator: true,
      hasGarden: false,
      hasBasement: true,
      hasGarage: true,
      ownerName: "Luca",
      ownerSurname: "Rossi",
      ownerEmail: "test@example.com",
      ownerPhone: "+39 333 1234567",
    };

    const data = await createValuation(sampleBody);
    addLog("Risultato POST:");
    addLog(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: "30px", background: "#fff" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🔧 Test API</h1>

      <button
        onClick={testGet}
        style={{
          padding: "10px 20px",
          marginRight: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Test GET Properties
      </button>

      <button
        onClick={testPost}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Test POST Valuation
      </button>

      <pre
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {log || "Nessun test eseguito."}
      </pre>
    </div>
  );
}
