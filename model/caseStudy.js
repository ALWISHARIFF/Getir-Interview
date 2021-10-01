//import mongoose
import mongoose from "mongoose";
//caseStudy Schema
const caseStudySchema = mongoose.Schema(
  {
    key: String,
    value: String,
    counts: [Number],
    createdAt:Date
  },
  
);
//Create Model
const caseStudy = mongoose.model("records", caseStudySchema);

export default caseStudy;
