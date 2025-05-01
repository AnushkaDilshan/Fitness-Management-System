const mongoose = require('mongoose');
const SavedWorkoutSchema = new mongoose.Schema(
{

    userid:{
        type:String,
        required:true
    },

    workoutid:{
        type:String,
        required:true
    },


},

{ timestamps: true }
   
);




module.exports = mongoose.model('SavedWorkout',SavedWorkoutSchema);