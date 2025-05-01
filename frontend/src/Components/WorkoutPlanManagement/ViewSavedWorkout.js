import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./WorkoutNavbar";
import jsPDF from "jspdf";

export default function SavedWorkout() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const userid = "001";
  const userid = localStorage.getItem("userId");
  const searchAppointment = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [userid]);

  const fetchWorkouts = () => {
    if (userid) {
      axios
        .get(`http://localhost:8070/saveworkout/view/${userid}`)
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
      .delete(`http://localhost:8070/saveworkout/delete/${id}`)
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

  const handleDone = (id) => {
    const currentDate = new Date().toISOString().split('T')[0];

    axios
    .get(`http://localhost:8070/cworkout/view/${id}`)
    .then((response) => {
      const workout = response.data
      
      if (workout.completed && workout.completed.includes(currentDate)) {
        alert("Workout already completed today.");
      } else {
        axios
          .put(`http://localhost:8070/saveworkout/done/${id}`)
          .then(() => {
            alert("Workout marked as completed");
          })
          .catch((err) => {
            alert("Error progressing workout: " + err.message);
          });
      }
    })
    .catch((err) => {
      alert("Error fetching workout data: " + err.message);
    });
  }

  const viewWorkout = (id) => {
    axios
      .get(`http://localhost:8070/cworkout/view/${id}`)
      .then((response) => {
        const workout = response.data;
  
        if (!workout.completed || workout.completed.length === 0) {
          alert("No completed dates found.");
          return;
        }
  
        const doc = new jsPDF();
  
        doc.setFontSize(16);
        doc.text("Workout Completion Report", 20, 20);
  
        doc.setFontSize(12);
        workout.completed.forEach((date, index) => {
          doc.text(`${index + 1}. ${date}`, 20, 30 + index * 10);
        });
  
        doc.save("workout-completed.pdf");
      })
      .catch((err) => {
        alert("Error fetching workout data: " + err.message);
      });
  };

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
                <section style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <button
                    onClick={() => handleDone(workout._id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Toady Workout is Completed
                  </button>
                  <button
                    onClick={() => viewWorkout(workout._id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      backgroundColor: "#2563EB",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    View Status
                  </button>
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
                </section>
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
