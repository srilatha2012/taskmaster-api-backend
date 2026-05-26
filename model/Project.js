const mongoose = require("mongoose");

//Define Project schema 
const projectSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    unique: true,
   },
   description: {
    type: String,
   },
   user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true,
   }
});

//Create Project module with projectSchema
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;