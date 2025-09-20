import { Job } from "../Models/job.model.js";

//create job

export const createJob = async(req,res)=>{
    const {company,role, salary,location,status,jobtype,applicationDate} = req.body;

    try {
        if(!company || !role){
            return res.status(400).json({message:"please fill all the fields"})
        }
        const job = await Job.create({
            company,
            role,
            salary,
            location,
            status,
            jobtype,
            applicationDate,
            createdBy: req.user.id
        })
        res.status(201).json({message:"Job create Successfully",job})
    } catch (error) {
        console.log(error)
    }
}
//get all jobs
export const getAllJobs = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
       res.status(401).json({ message: "Unauthorized" });
    }

    const jobs = await Job.find({ createdBy: req.user.id }).populate("createdBy", "name email");

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({ message: "All jobs", jobs });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//get sigle job

export const getsingleJob = async(req,res)=>{
    const {id} = req.params;
    try {
        const job = await Job.findById(id).populate("createdBy","name email");
        if(!job){
            return res.status(404).json({message:"job not found"})
        }
       return res.status(200).json({message:"job found",job})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something  went wrong"})
    }
}

//update job
export const updateJob = async(req,res)=>{
    console.log("Params:", req.params);

    const {id} = req.params;
    console.log(id);

    const{company,role,salary,status,jobtype,applicationDate} = req.body;
    try {
        const job = await Job.findById(id);
        if(!job){
            return res.status(404).json({message:"job not found"})
        }
        if(job.createdBy.toString()!== req.user.id.toString()){
            return res.status(401).json({message:"you are not authorized to update this job"})
        }
        const updatedjob = await Job.findByIdAndUpdate(id,{
            company,
            role,
            salary,
            status,
            jobtype,
            applicationDate
        
        } ,{new:true,runValidators:true })
        res.status(200).json({message:"job updated successfully ",updatedjob})
    } 
    catch (error) {
        console.log(error)
    }
}

//delete job
export const deleteJob = async(req,res)=>{
    const{id} =req.params;
    try {
        const job = await  Job.findById(id);
        if(!job){
            return res.status(404).json({message:"job not found"})
        }
        if(job.createdBy.toString()!==req.user.id.toString()){
            return res.status(401).json({message:"you are not authorized to delete this job"})
        }
        await Job.findByIdAndDelete(id);
        res.status(200).json({message:"job deleted successfully"})
        
    } catch (error) {
        console.log(error)}
}