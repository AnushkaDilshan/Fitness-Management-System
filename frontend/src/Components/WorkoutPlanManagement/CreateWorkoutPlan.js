import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateWorkoutPlan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', duration: '' }]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleExerciseChange = (index, event) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [event.target.name]: event.target.value } : exercise
    );
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', duration: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CreateWorkoutPlan = {
      title,
      description,
      difficulty,
      exercises,
    };

    try {
      await axios.post('http://localhost:8070/Create/workoutplan', CreateWorkoutPlan);
      setMessage('Workout Plan created successfully!');
      setTitle('');
      setDescription('');
      setDifficulty('Beginner');
      setExercises([{ name: '', sets: '', reps: '', duration: '' }]);
      navigate("/workout-plan-details");
    } catch (error) {
      setMessage('Error creating workout plan');
    }
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px',
    background: 'rgb(130, 230, 143)',
    borderRadius: '12px',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",

  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#555'
  };

  const buttonStyle = {
    backgroundColor: 'rgb(40, 40, 40)',
    color: 'white',
    padding: '10px 16px',
    marginTop: '10px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  };

  const exerciseGroupStyle = {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  };

  const messageStyle = {
    textAlign: 'center',
    fontWeight: '600',
    color: 'green',
    marginTop: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Create Workout Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={inputStyle}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <h3 style={{ marginTop: '30px', color: '#444', fontSize: '1.4rem', borderBottom: '2px solid #eee', paddingBottom: '8px' }}>Exercises</h3>

        {exercises.map((exercise, index) => (
          <div key={index} style={exerciseGroupStyle}>
            <input
              type="text"
              name="name"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Exercise Name"
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Sets"
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Reps"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="duration"
              value={exercise.duration}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Duration"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setExercises(exercises.filter((_, i) => i !== index))}
              style={buttonStyle}
            >
              Remove Exercise
            </button>
          </div>
        ))}

        <button type="button" onClick={addExercise} style={buttonStyle}>
          Add Exercise
        </button>

        <div>
          <button type="submit" style={buttonStyle}>Create Workout Plan</button>
        </div>
      </form>

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default CreateWorkoutPlan;
