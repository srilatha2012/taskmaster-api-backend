const projectRoutes = require("express").Router();
const Project = require("../../model/Project");

const {authMiddleware} = require("../../utils/auth");


projectRoutes.use(authMiddleware);
//POST 
projectRoutes.post("/projects", async (req,res) =>{
  try {
    console.log("Project routes has been called", req.body);
      const project = await Project.create(
        { ...req.body,
            user: req.user._id

        });
      res.status(201).json({
        message: "Project added Successfully",
        project: project,
      });
  }
  catch(error){
    res.status(400).json({
        message: "Failed to Add project",
        error: error.message
    })
  }

});

projectRoutes.get("/projects", (req,res) =>{

});

projectRoutes.get("/projects/:id", (req,res) =>{

});

projectRoutes.put("/projects/:id", (req,res) =>{

});

projectRoutes.delete("/projects/:id", (req,res) =>{

});

module.exports = projectRoutes;