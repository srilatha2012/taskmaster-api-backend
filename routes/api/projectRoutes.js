const projectRoutes = require("express").Router();
const Project = require("../../model/Project");

const { authMiddleware } = require("../../utils/auth");


projectRoutes.use(authMiddleware);
//POST 
projectRoutes.post("/projects", async (req, res) => {
    try {
        console.log("Project routes has been called", req.body);
        const project = await Project.create(
            {
                ...req.body,
                user: req.user._id

            });
        res.status(201).json({
            message: "Project added Successfully",
            project: project,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to Add project",
            error: error.message
        })
    }

});
// Get all projectes owned by the user which currently logged-in
projectRoutes.get("/projects", async (req, res) => {
    try {
        console.log("get request")
        const projects = await Project.find({ user: req.user._id });
        res.json(projects);
    } catch (error) {
       res.status(500).json({error});
    }
});

//Get a single project by ID, owned by the user which currently logged-in
projectRoutes.get("/projects/:id", async (req, res) => {
 try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId);
      res.json(project);
 } catch(error) {
    res.status(500).json({error});
 }

});

projectRoutes.put("/projects/:id", (req, res) => {

});

projectRoutes.delete("/projects/:id", (req, res) => {

});

module.exports = projectRoutes;