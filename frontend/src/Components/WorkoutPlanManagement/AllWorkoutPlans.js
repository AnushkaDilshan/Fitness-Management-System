import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import NavBar from "./navbar";
//import { useParams } from "react-router-dom";
import "../../style/retrivetable.css";
import "../../style/header.css";
import "../../style/bookingtrainer.css";
import Navbar from "./WorkoutNavbar";
export default function Doc() {
  const navigate = useNavigate();
  // State hook to store trainer data and search query
  const [workout, setWorkout] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect hook to fetch trainer data once the component mounts
  useEffect(() => {
    getTrainer(); // Fetch trainer data from the server when the component loads
  }, []);

  // Function to fetch trainer data from the server
  function getTrainer() {
    axios
      .get(`http://localhost:8070/GetAllWorkout/view/`)
      .then((res) => {
        setWorkout(res.data.existingProject); // Store the fetched data in state
      })
      .catch((err) => {
        alert(err.message); // Show an alert if there's an error fetching data
      });
  }

  const deleteData = (id) => {
    const dataToDelete = workout.find((e) => e._id === id);

    axios
      .delete(`http://localhost:8070/workoutDelete/${id}`)
      .then(() => {
        getTrainer();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // const saveDataToAnotherTable = (data) => {
  //     // Ensure that the data being sent does not contain functions
  //     const cleanData = removeFunctions(data);

  //     axios.post("http://localhost:8000/DeEmergency/save", cleanData)
  //         .then(() => {
  //             console.log("Data saved to another table successfully");
  //         })
  //         .catch((error) => {
  //             alert(error.message);
  //         });
  // };

  // const removeFunctions = (data) => {
  //     // Recursive function to remove functions from nested objects
  //     if (typeof data === "object" && data !== null) {
  //         const cleanObject = {};
  //         for (let key in data) {
  //             if (typeof data[key] !== "function") {
  //                 cleanObject[key] = removeFunctions(data[key]);
  //             }
  //         }
  //         return cleanObject;
  //     } else {
  //         return data;
  //     }
  // };

  // Function to handle the search query input change
  const searchAppointment = (title) => {
    setSearchQuery(title.target.value); // Update the search query state with input value
  };
  const saveWorkout = (workoutid) => {
    const userid = localStorage.getItem("userId"); // or however you get the current user ID
    //const userid = "001";
    if (!userid) {
      alert("User ID not found. Please log in.");
      return;
    }
  
    const data = {
      userid: userid,
      workoutid: workoutid,
    };
  
    axios
      .post("http://localhost:8070/saveworkout/save", data)
      .then(() => {
        alert("Workout saved successfully!");
      })
      .catch((error) => {
        alert("Failed to save workout: " + error.message);
      });
  };
  
  return (
    <div className="main-container">
      <div className="body-container clearfix">
        {/* Section for heading and search */}
        <div className="order-section-one-container ">
          <div className="order-section-one-left ">
            <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
              Workout Plan
            </h3>
          </div>
          <div className="order-section-one-right">
            {/* Search box to filter trainers based on input */}
            <input
              onChange={searchAppointment} // Call searchAppointment when the input value changes
              type="search"
              placeholder="Search"
              className="search-box"
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
        <Navbar />
        {/* Section to display trainer cards */}
        <div className="order-section-two-container">
          {/* Loop through the trainers and filter based on the search query */}
          {workout &&
            workout
              .filter((e) =>
                // Filter trainers by their full name (case-insensitive)
                e.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((e, index) => (
                <div key={e._id} className="col-md-4 col-sm-6 col-lg-3 ">
                  <div
                    className="cardtwo"
                    style={{
                      border: "1px solid #ddd",
                      backgroundColor: "rgb(130, 230, 143)",
                    }}
                  >
                    <div className="card-body">
                      {/* Display trainer details */}
                      {/* <h5 className="card-title">{e.title}</h5> */}
                      <p className="card-text">
                        <strong>Title:</strong> {e.title}
                      </p>
                      <p className="card-text">
                        <strong>Description:</strong> {e.description}
                      </p>
                      <p className="card-text">
                        <strong>Difficulty:</strong> {e.difficulty}
                      </p>

                      <p className="card-text">
                        <strong>CreatedAt:</strong>{" "}
                        {e.createdAt ? e.createdAt.split("T")[0] : ""}
                      </p>

                      <p>
                        {/* <button
                          id="table-button"
                          className="btn btn-outline-success btn-sm"
                        //   onClick={() => saveData(e._id)}
                        >
                          <i className="fas fa-save"></i>&nbsp;Save
                        </button> */}
                        <button
  id="table-button"
  className="btn btn-outline-success btn-sm"
  onClick={() => saveWorkout(e._id)} // Pass the workout ID
>
  <i className="fas fa-save"></i>&nbsp;Save
</button>

                        &nbsp;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      </div>
    </div>
  );
}
