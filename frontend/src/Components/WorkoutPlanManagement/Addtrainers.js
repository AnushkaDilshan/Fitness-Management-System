import React, { useState } from "react";
import axios from "axios";

export default function AddTrainerForm() {
    const [formData, setFormData] = useState({
        full_name: "",
        specialization: "",
        email: "",
        phone_number: "",
        age: "",
        gender: "",
        address: "",
        profilePicture: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/trainer/save", formData)
            .then(() => {
                alert("Trainer added successfully!");
                setFormData({
                    full_name: "",
                    specialization: "",
                    email: "",
                    phone_number: "",
                    age: "",
                    gender: "",
                    address: "",
                    profilePicture: "test"
                });
            })
            .catch((err) => {
                alert("Failed to add trainer.");
                console.error(err);
            });
    };

    return (
        <div style={{
            maxWidth: "500px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Trainer</h2>
            <form onSubmit={handleSubmit}>

                <label style={{ display: "block", marginBottom: "5px" }}>Full Name:</label>
                <input 
                    type="text" 
                    name="full_name" 
                    value={formData.full_name} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />

                <label style={{ display: "block", marginBottom: "5px" }}>Specialization:</label>
                <input 
                    type="text" 
                    name="specialization" 
                    value={formData.specialization} 
                    onChange={handleChange} 
                    style={inputStyle}
                />

                <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />

                <label style={{ display: "block", marginBottom: "5px" }}>Phone Number:</label>
                <input 
                    type="text" 
                    name="phone_number" 
                    value={formData.phone_number} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />

                <label style={{ display: "block", marginBottom: "5px" }}>Age:</label>
                <input 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />

                <label style={{ display: "block", marginBottom: "5px" }}>Gender:</label>
                <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label style={{ display: "block", marginBottom: "5px" }}>Address:</label>
                <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle}
                />

                
              

                <button type="submit" style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginTop: "20px"
                }}>
                    Add Trainer
                </button>

            </form>
        </div>
    );
}

// Common input style
const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
};
