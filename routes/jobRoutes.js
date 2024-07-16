const express = require("express");
const { createJob, getJobs, getJob } = require("../controllers/jobController");
const router = express.Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:jobId", getJob);

module.exports = router;
