import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get(`http://localhost:8070/bookings/tid/${userId}`)
            .then((res) => {
                if (res.data.success) {
                    setBookings(res.data.BookPersonalTrainer);
                } else {
                    setError("Failed to load bookings.");
                }
            })
            .catch((err) => {
                setError("Error fetching bookings.");
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            axios.delete(`http://localhost:8070/book/delete/${id}`)
                .then((res) => {
                    if (res.data.success) {
                        alert("Booking deleted successfully.");
                        fetchBookings(); // Refresh list
                    }
                })
                .catch((err) => {
                    alert("Failed to delete booking.");
                    console.error(err);
                });
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
            <h2>Your Trainer Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f4f6f8" }}>
                            <th style={th}>Date</th>
                            <th style={th}>Time</th>
                            <th style={th}>Slot</th>
                            <th style={th}>Plan</th>
                            <th style={th}>Status</th>
                            <th style={th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={td}>{booking.date}</td>
                                <td style={td}>{booking.time}</td>
                                <td style={td}>{booking.availableSlots}</td>
                                <td style={td}>{booking.assignedPlans}</td>
                                <td style={td}>{booking.paymentStatus}</td>
                                <td style={td}>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        style={deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const th = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ccc"
};

const td = {
    padding: "10px",
    borderBottom: "1px solid #eee"
};

const deleteBtn = {
    padding: "6px 12px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};
