import React from "react";
import { useNavigate } from "react-router-dom";

const sampleImage = "https://i.ibb.co/0fR4SMP/caregiver-demo.png";

const caregivers = [
  {
    name: "Caregiver 1",
    age: 32,
    town: "Kandy",
    hospitals: ["Kandy General", "Peradeniya Hospital"]
  },
  {
    name: "Caregiver 2",
    age: 45,
    town: "Colombo",
    hospitals: ["National Hospital", "Nawaloka Hospital"]
  },
  {
    name: "Caregiver 3",
    age: 29,
    town: "Galle",
    hospitals: ["Karapitiya Hospital", "Teaching Hospital Galle"]
  },
  {
    name: "Caregiver 4",
    age: 38,
    town: "Kurunegala",
    hospitals: ["Kurunegala Hospital"]
  },
  {
    name: "Caregiver 5",
    age: 40,
    town: "Jaffna",
    hospitals: ["Jaffna Teaching Hospital"]
  }
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#000000", marginBottom: "30px" }}>
        Welcome 
      </h2>

      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center"
        }}
      >
        {caregivers.map((cg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#2d3436",
              borderRadius: "16px",
              padding: "20px",
              width: "280px",
              position: "relative",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              color: "#fff",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={sampleImage}
              alt="Caregiver"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "2px solid #fff"
              }}
            />
            <h3 style={{ marginTop: "60px", marginBottom: "10px" }}>{cg.name}</h3>
            <p><strong>Age:</strong> {cg.age}</p>
            <p><strong>Town:</strong> {cg.town}</p>
            <p><strong>Available Hospitals:</strong></p>
            <ul style={{ paddingLeft: "18px", marginTop: "0" }}>
              {cg.hospitals.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
 {/* buttons  */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={handleLogout}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
        <button
          onClick={handleResetPassword}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#2980b9",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Reset Password
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#555",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
