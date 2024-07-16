const { fetchUnSplashImage } = require("../middlewares/unsplashAPI");
const Job = require("../models/jobModel");

exports.createJob = async (req, res, next) => {
  try {
    console.log("req.body", req.body)
    const jobName = req.body.name;
    const jobStatus = req.body.status;

    if (!jobName) {
      const error = new Error("Job Name Required");
      error.statusCode = 400;
      throw error;
    }

    if (!jobStatus) {
      const error = new Error("Job Status Required");
      error.statusCode = 400;
      throw error;
    }
    const job = await Job.create({ name: jobName, status: jobStatus });
    console.log("Job has been created", job);
    res.status(200).send({ jobId: job.id });
  } catch (error) {
    next(error);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    const jobsWithImages = await Promise.all(
      jobs.map(async (job) => {
        // Convert Mongoose document to a plain object to add new things
        const jobObject = job.toObject();

        if (job.status === "completed") {
          // Add image URL dynamically from unsplash API
          jobObject.result = await fetchUnSplashImage();
        }
        return jobObject;
      })
    );
    console.log("jobs with images", jobsWithImages);
    res.status(201).send(jobsWithImages);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      const error = new Error("Job Id required");
      error.statusCode = 400;
      throw error;
    }
    const job = await Job.findById(jobId);
    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      throw error;
    }
    console.log("jobDetail", job);

    // Convert Mongoose document to a plain object to add new things
    const jobObject = job.toObject();

    if (job.status === "completed") {
      // Add image URL dynamically from unsplash API
      jobObject.result = await fetchUnSplashImage();
    }
    res.status(200).json(jobObject);
  } catch (error) {
    next(error);
  }
};
