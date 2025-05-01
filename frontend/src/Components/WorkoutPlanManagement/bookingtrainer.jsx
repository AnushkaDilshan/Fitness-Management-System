import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookingTrainerApp() {
    const { id } = useParams();
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); 
    const [userid, setUserid] = useState('');
    const [trainerid, setTrainerid] = useState('');
    const [date, setDate] = useState('');
    const [tbmessage, setTbmessage] = useState('');
    const [assignedPlans, setAssignedPlans] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [availableSlots, setAvailableSlots] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setTrainerid(id);
    }, [id]);

    const handleFocus = () => {
        setFocused(true);
    };

    function refreshPage() {
        window.location.reload(false);
    }

    function sendData(s) {
        s.preventDefault();
        const newBooking = {
            userid,
            trainerid,
            date,
            time,
            tbmessage,
            assignedPlans,
            paymentStatus,
            availableSlots,
            age,
            gender
        };

        axios.post("http://localhost:8000/book/save/", newBooking)
            .then(() => {
                alert("Trainer Booking successful");
                refreshPage();
            })
            .catch((err) => {
                alert("Error: Trainer Booking unsuccessful");
                console.log(err);
            });
    }

    // Inline styles
    const styles = {
        mainContainer: {
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#f4f6f8",
            fontFamily: "'Poppins', sans-serif",
            borderRadius: "10px"
        },
        bodyContainer: {
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 5px 20px rgba(0,0,0,0.1)"
        },
        center: {
            textAlign: "center",
            marginBottom: "20px"
        },
        form: {
            width: "100%"
        },
        formRow: {
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "20px",
            justifyContent: "space-between"
        },
        formCol: {
            flex: "0 0 48%",
            marginBottom: "10px"
        },
        label: {
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
            color: "#555"
        },
        input: {
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box"
        },
        textarea: {
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minHeight: "100px",
            fontSize: "1rem",
            boxSizing: "border-box"
        },
        select: {
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box"
        },
        radioContainer: {
            marginTop: "10px"
        },
        radioLabel: {
            marginLeft: "8px",
            marginRight: "15px"
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
            fontWeight: "600"
        }
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.bodyContainer}>
                <div style={styles.center}>
                    <h1>Booking Your Personal Trainer</h1>
                    <h4>Give us Your Information.</h4><br/><br/>
                </div>

                <form style={styles.form} onSubmit={sendData}>
                    <div style={styles.formRow}>
                        <div style={styles.formCol}>
                            <label style={styles.label}>User ID:</label>
                            <input
                                type="text"
                                style={styles.input}
                                name="userid"
                                onChange={(e) => setUserid(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.formCol}>
                            <label style={styles.label}>Available Time:</label>
                            <select
                                style={styles.select}
                                name="availableSlots"
                                onChange={(e) => setAvailableSlots(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="9.00 AM- 10.00 AM">9.00 AM- 10.00 AM</option>
                                <option value="11.00 AM- 1.00 PM">11.00 AM- 1.00 PM</option>
                                <option value="10.00 AM- 11.00 AM">10.00 AM- 11.00 AM</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formCol}>
                            <label style={styles.label}>Date:</label>
                            <input
                                type="date"
                                style={styles.input}
                                name="date"
                                onChange={(e) => setDate(e.target.value)}
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                required
                            />
                        </div>

                        <div style={styles.formCol}>
                            <label style={styles.label}>Assigned Plans:</label>
                            <input
                                type="text"
                                style={styles.input}
                                name="assignedPlans"
                                onChange={(e) => setAssignedPlans(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formCol}>
                            <label style={styles.label}>Age:</label>
                            <input
                                type="text"
                                style={styles.input}
                                name="age"
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.formCol}>
                            <label style={styles.label}>Message:</label>
                            <textarea
                                style={styles.textarea}
                                name="tbmessage"
                                onChange={(e) => setTbmessage(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formCol}>
                            <label style={styles.label}>Gender:</label>
                            <div style={styles.radioContainer}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <label style={styles.radioLabel}>Male</label>

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
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
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    required
                                />
                                <label style={styles.radioLabel}>Pending</label>

                                <input
                                    type="radio"
                                    name="paymentStatus"
                                    value="paid"
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    required
                                />
                                <label style={styles.radioLabel}>Paid</label>
                            </div>
                        </div>
                    </div>

                    {/* Hidden trainer id */}
                    <input
                        type="text"
                        name="trainerid"
                        value={id}
                        hidden
                        required
                    />

                    <div style={styles.center}>
                        <input
                            type="submit"
                            style={styles.submitButton}
                            value="SUBMIT"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
