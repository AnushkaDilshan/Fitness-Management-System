import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookingTrainerApp() {
  const { id } = useParams();
  const currentTime = new Date().toLocaleTimeString();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    trainerid: id,
    date: "",
    time: currentTime,
    tbmessage: "",
    assignedPlans: "",
    paymentStatus: "",
    availableSlots: "",
    age: "",
    gender: "",
  });

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, trainerid: id }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = () => setFocused(true);

  const refreshPage = () => window.location.reload();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/book/save/", { userid: userId, ...formData })
      .then(() => {
        alert("Trainer Booking successful");
        refreshPage();
      })
      .catch((err) => {
        alert("Error: Trainer Booking unsuccessful");
        console.error(err);
      });
  };

  const styles = {
    mainContainer: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f4f6f8",
      fontFamily: "'Poppins', sans-serif",
      borderRadius: "10px",
    },
    bodyContainer: {
      backgroundColor:'rgb(130, 230, 143)',
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
    },
    center: {
      textAlign: "center",
      marginBottom: "20px",
    },
    formRow: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    formCol: {
      flex: "0 0 48%",
      marginBottom: "10px",
    },
    label: {
      fontWeight: "600",
      display: "block",
      marginBottom: "8px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      minHeight: "100px",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    radioContainer: {
      marginTop: "10px",
    },
    radioLabel: {
      marginLeft: "8px",
      marginRight: "15px",
    },
    submitButton: {
      marginTop: "20px",
      backgroundColor: "#5c6bc0",
      color: "#fff",
      padding: "12px 24px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.bodyContainer}>
        <div style={styles.center}>
          <h1>Booking Your Personal Trainer</h1>
          <h4>Give us Your Information.</h4>
        </div>

        <form onSubmit={handleSubmit}>
  <div style={styles.formRow}>
    <div style={styles.formCol}>
      <label style={styles.label}>Available Time:</label>
      <select
        style={styles.select}
        name="availableSlots"
        value={formData.availableSlots}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="9.00 AM- 10.00 AM">9.00 AM - 10.00 AM</option>
        <option value="10.00 AM- 11.00 AM">10.00 AM - 11.00 AM</option>
        <option value="11.00 AM- 1.00 PM">11.00 AM - 1.00 PM</option>
      </select>
    </div>

    <div style={styles.formCol}>
      <label style={styles.label}>Date:</label>
      <input
        type="date"
        style={styles.input}
        name="date"
        value={formData.date}
        onChange={handleChange}
        onBlur={handleFocus}
        required
      />
    </div>
  </div>

  <div style={styles.formRow}>
    <div style={styles.formCol}>
      <label style={styles.label}>Assigned Plans:</label>
      <input
        type="text"
        style={styles.input}
        name="assignedPlans"
        value={formData.assignedPlans}
        onChange={handleChange}
        required
      />
    </div>

    <div style={styles.formCol}>
      <label style={styles.label}>Age:</label>
      <input
        type="text"
        style={styles.input}
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div style={styles.formRow}>
    <div style={styles.formCol}>
      <label style={styles.label}>Message:</label>
      <textarea
        style={styles.textarea}
        name="tbmessage"
        value={formData.tbmessage}
        onChange={handleChange}
        required
      />
    </div>

    <div style={styles.formCol}>
      <label style={styles.label}>Gender:</label>
      <div style={styles.radioContainer}>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
          required
        />
        <label style={styles.radioLabel}>Male</label>
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
          required
        />
        <label style={styles.radioLabel}>Female</label>
      </div>
    </div>
  </div>

  <div style={styles.formRow}>
    <div style={styles.formCol}>
      <label style={styles.label}>Payment Status:</label>
      <div style={styles.radioContainer}>
        <input
          type="radio"
          name="paymentStatus"
          value="pending"
          checked={formData.paymentStatus === "pending"}
          onChange={handleChange}
          required
        />
        <label style={styles.radioLabel}>Pending</label>
        <input
          type="radio"
          name="paymentStatus"
          value="paid"
          checked={formData.paymentStatus === "paid"}
          onChange={handleChange}
          required
        />
        <label style={styles.radioLabel}>Paid</label>
      </div>
    </div>

    <div style={styles.formCol}>
      {/* You can add any additional field here in the second column if needed */}
    </div>
  </div>

  <div style={styles.center}>
    <input type="submit" style={styles.submitButton} value="SUBMIT" />
  </div>
</form>

      </div>
    </div>
  );
}
