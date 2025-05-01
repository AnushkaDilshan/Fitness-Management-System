import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function SavedWorkout() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userid = "001";

  const searchAppointment = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [userid]);

  const fetchWorkouts = () => {
    if (userid) {
      axios
        .get(`http://localhost:8000/saveworkout/view/${userid}`)
        .then((res) => {
          setSavedWorkouts(res.data.data);
        })
        .catch((err) => {
          alert("Error fetching saved workouts: " + err.message);
        });
    }
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:8000/saveworkout/delete/${id}`)
      .then(() => {
        // Refresh the list after deletion
        setSavedWorkouts(savedWorkouts.filter((workout) => workout._id !== id));
      })
      .catch((err) => {
        alert("Error deleting workout: " + err.message);
      });
  };

  const filteredWorkouts = savedWorkouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: "0 10px" }}>Saved Workout Plan</h3>
        <input
          onChange={searchAppointment}
          type="search"
          placeholder="Search by title"
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: "200px",
          }}
        />
      </div>

      <div style={{ display: "flex" }}>
        <Navbar />

        <div style={{ flex: 1, marginLeft: "20px" }}>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div
                key={workout._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <p><strong>Title:</strong> {workout.title}</p>
                <p><strong>Description:</strong> {workout.description}</p>
                <p><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p><strong>Created At:</strong> {workout.createdAt.split("T")[0]}</p>
                <button
                  onClick={() => handleRemove(workout._id)}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ marginTop: "20px" }}>No saved workouts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
