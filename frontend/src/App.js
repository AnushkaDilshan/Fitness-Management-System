import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import components
import ViewallTrainers from './Components/WorkoutPlanManagement/ViewalltrainersAdmin';
//import TrainerDashboard from './Components/WorkoutPlanManagement/TrainerDashboard';
import CreateWorkoutPlan from './Components/WorkoutPlanManagement/CreateWorkoutPlan';
import WorkoutPlanDetails from './Components/WorkoutPlanManagement/WorkoutPlanDetails';
import DisplayAllTrainers from './Components/WorkoutPlanManagement/DisplayAllTrainers';
import BookingTrainer from './Components/WorkoutPlanManagement/bookingtrainer.jsx';
import AddTrainers from './Components/WorkoutPlanManagement/Addtrainers';
import UpdateWorkoutPlan from './Components/WorkoutPlanManagement/UpdateWorkoutPlane.js';
import Admintrainer from './Components/WorkoutPlanManagement/AdminTDashbord.js';
import ALLWorkoutPlanDetail from './Components/WorkoutPlanManagement/AllWorkoutPlans.js';
import ViewSavedWorkouts from './Components/WorkoutPlanManagement/ViewSavedWorkout.js';
import MyAppoinment from './Components/WorkoutPlanManagement/MyAppoinment.js';


import Signup from './Components/Signup';
import Login from './Components/Login'; // Make sure to import Login component
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import UpdateUser from './Components/UpdateUser';
import Dashboard from './Components/Dashboard';
import TrainerDashboard from './Components/TrainerDashboard';
import DeliveryDashboard from './Components/DeliveryDashboard';
import EStore from './Components/EStore';
import HealthyMeals from './Components/HealthyMeals';
import WorkoutPlans from './Components/WorkoutPlans';
import Footer from './Components/Footer';
// components routes 
export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* <Route path="/tdashboard" element={<TrainerDashboard />} /> */}
        <Route path="/viewmytrainers" element={<ViewallTrainers />} />
        <Route path="/Create-Workout-Plan" element={<CreateWorkoutPlan />} />
        <Route path="/workout-plan-details" element={<WorkoutPlanDetails />} /> 
        <Route path="/dalltrainers" element={<DisplayAllTrainers />} />
        <Route path="/booking/:id" element={<BookingTrainer />} />
        <Route path="/addtrainers" element={<AddTrainers />} />
        <Route path="/updatew/:id" element={<UpdateWorkoutPlan />} />
        <Route path="/tadmin" element={<Admintrainer />} />
        <Route path="/allworkouts" element={<ALLWorkoutPlanDetail />} />
        <Route path="/saveworkouts" element={<ViewSavedWorkouts />} />
        <Route path="/myappoinments" element={<MyAppoinment />} />

        <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<><Dashboard/><Footer/></>} />
          <Route path="/admin" element={<><AdminDashboard/><Footer/></>} />
          <Route path="/trainer" element={<><TrainerDashboard/><Footer/></>} />
          <Route path="/delivery" element={<><DeliveryDashboard/><Footer/></>} />
          <Route path="/update/:id" element={<><UpdateUser/><Footer/></>} />
          <Route path="/estore" element={<><EStore/><Footer/></>} />
          <Route path="/meals" element={<><HealthyMeals/><Footer/></>} />
          <Route path="/workouts" element={<><WorkoutPlans/><Footer/></>} />

      </Routes>
    </BrowserRouter>
  );
}
