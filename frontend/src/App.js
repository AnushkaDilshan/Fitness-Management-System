import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import components
import ViewallTrainers from './Components/WorkoutPlanManagement/ViewalltrainersAdmin';
import TrainerDashboard from './Components/WorkoutPlanManagement/TrainerDashboard';
import CreateWorkoutPlan from './Components/WorkoutPlanManagement/CreateWorkoutPlan';
import WorkoutPlanDetails from './Components/WorkoutPlanManagement/WorkoutPlanDetails';
import DisplayAllTrainers from './Components/WorkoutPlanManagement/DisplayAllTrainers';
import BookingTrainer from './Components/WorkoutPlanManagement/bookingtrainer.jsx';
import AddTrainers from './Components/WorkoutPlanManagement/Addtrainers';
import UpdateWorkoutPlan from './Components/WorkoutPlanManagement/UpdateWorkoutPlane.js';
import Admintrainer from './Components/WorkoutPlanManagement/AdminTDashbord.js';
import ALLWorkoutPlanDetail from './Components/WorkoutPlanManagement/AllWorkoutPlans.js';
import ViewSavedWorkouts from './Components/WorkoutPlanManagement/ViewSavedWorkout.js';
// components routes 
export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/tdashboard" element={<TrainerDashboard />} />
        <Route path="/v" element={<ViewallTrainers />} />
        <Route path="/Create-Workout-Plan" element={<CreateWorkoutPlan />} />
        <Route path="/workout-plan-details" element={<WorkoutPlanDetails />} /> 
        <Route path="/" element={<DisplayAllTrainers />} />
        <Route path="/booking/:id" element={<BookingTrainer />} />
        <Route path="/addtrainers" element={<AddTrainers />} />
        <Route path="/updatew/:id" element={<UpdateWorkoutPlan />} />
        <Route path="/tadmin" element={<Admintrainer />} />
        <Route path="/allworkouts" element={<ALLWorkoutPlanDetail />} />
        <Route path="/saveworkouts" element={<ViewSavedWorkouts />} />
      </Routes>
    </BrowserRouter>
  );
}
