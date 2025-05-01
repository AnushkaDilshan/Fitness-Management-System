import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const TrainerAdminDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [message, setMessage] = useState('');
  const [newTrainer, setNewTrainer] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    specialization: '',
    age: '',
    gender: '',
    address: '',
    profilePicture: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/trainer/view');
      setTrainers(response.data.existingProject);
    } catch (error) {
      console.error(error);
      setMessage('Error loading trainers');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/trainer/delete/${id}`);
      setMessage('Trainer deleted successfully');
      fetchTrainers();
    } catch (error) {
      console.error(error);
      setMessage('Error deleting trainer');
    }
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/trainer/save', newTrainer);
      setMessage('Trainer added successfully');
      fetchTrainers();
      setNewTrainer({
        full_name: '',
        email: '',
        phone_number: '',
        specialization: '',
        age: '',
        gender: '',
        address: '',
        profilePicture: 'test'
      });
    } catch (error) {
      console.error(error);
      setMessage('Error adding trainer');
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const specializationData = trainers.reduce((acc, trainer) => {
    const spec = trainer.specialization;
    acc[spec] = (acc[spec] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(specializationData).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div style={{
      maxWidth: '1200px', margin: '40px auto', padding: '30px',
      background: '#fff', borderRadius: '12px', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Poppins', sans-serif", backgroundColor: '#f0f2f5'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Trainer Admin Dashboard</h1>

      {message && (
        <p style={{ textAlign: 'center', fontWeight: '600', color: 'green', marginTop: '20px' }}>{message}</p>
      )}

      {/* Add Trainer Form */}
      <form onSubmit={handleAddTrainer} style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* All input fields */}
        {['full_name', 'email', 'phone_number', 'specialization', 'age', 'gender', 'address'].map((field) => (
          <div key={field} style={{ flex: '1 1 20%' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              {field.replace('_', ' ').toUpperCase()}:
            </label>
            {field === 'gender' ? (
              <select
                value={newTrainer[field]}
                onChange={(e) => setNewTrainer({ ...newTrainer, [field]: e.target.value })}
                required
                style={{ padding: '10px', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                value={newTrainer[field]}
                onChange={(e) => setNewTrainer({ ...newTrainer, [field]: e.target.value })}
                required
                style={{ padding: '10px', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#5c6bc0', color: 'white', padding: '10px 20px',
            border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '20px'
          }}
        >
          Add Trainer
        </button>
      </form>

      {/* Pie Chart */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Trainer Specialization Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Trainer Specializations (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pieData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trainers Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', marginTop: '40px' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', background: '#5c6bc0', color: 'white', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Full Name</th>
            <th style={{ padding: '12px', background: '#5c6bc0', color: 'white', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', background: '#5c6bc0', color: 'white', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Phone</th>
            <th style={{ padding: '12px', background: '#5c6bc0', color: 'white', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Specialization</th>
            <th style={{ padding: '12px', background: '#5c6bc0', color: 'white', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(trainers) && trainers.length > 0 ? (
            trainers.map((trainer) => (
              <tr key={trainer._id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{trainer.full_name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{trainer.email}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{trainer.phone_number}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{trainer.specialization}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <button
                    style={{
                      backgroundColor: '#f44336', color: 'white', padding: '6px 12px',
                      margin: '5px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
                    }}
                    onClick={() => handleDelete(trainer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }} colSpan="5">No trainers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerAdminDashboard;
