const csvQueue = require("../jobs/queue");
const path = require("path");

const uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File is required" });
  const job = await csvQueue.add("csv-processing", {
    filePath: req.file.path,
  });
  res
    .status(200)
    .json({ jobId: job.id, message: "File uploaded and job queued." });
};

const getJobStatus = async (req, res) => {
  const job = await csvQueue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  const state = await job.getState();
  const result = job.returnvalue || {};
  res.status(200).json({
    status: state,
    ...result,
  });
};

const deleteJobStatus = async (req, res) => {
  const job = await csvQueue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  await csvQueue.removeJobs(req.params.id);
  res.status(200).json({
    message: "Job deleted successfully",
  });
};

const getCSVTemplate = async (req, res) => {
  const filePath = path.join(__dirname, "../uploads/temple-csv-file.csv");
  res.download(filePath, "template.csv", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Error downloading the file.");
    }
  });
};

module.exports = {
  uploadCSV,
  getJobStatus,
  deleteJobStatus,
  getCSVTemplate,
};
