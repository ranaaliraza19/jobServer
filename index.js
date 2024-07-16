require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use('/api', jobRoutes);  // Ensure this is a function
app.use(errorHandler);  // Ensure this is a function

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
