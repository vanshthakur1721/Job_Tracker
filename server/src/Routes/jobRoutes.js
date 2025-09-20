import { Router } from "express";
import { createJob,getAllJobs,updateJob,deleteJob,getsingleJob } from "../Controllers/jobController.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";

const router = Router();
router.post("/createjob",authMiddleware,createJob);
router.get("/alljobs",authMiddleware,getAllJobs);
router.get("/getsingleJob/:id",authMiddleware,getsingleJob)
router.put("/updatejob/:id",authMiddleware,updateJob);
router.delete("/deletejob/:id",authMiddleware,deleteJob);

export default router;