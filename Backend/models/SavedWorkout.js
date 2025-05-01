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
    completed: [{
        type: String,
        required: false
    }]
},

{ timestamps: true }
   
);




module.exports = mongoose.model('SavedWorkout',SavedWorkoutSchema);