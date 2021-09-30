import mongoose from "mongoose";
const caseStudySchema = mongoose.Schema(
  {
    key: String,
    value: String,
    counts: [Number],
    createdAt:Date
  },
  
);

const caseStudy = mongoose.model("records", caseStudySchema);

export default caseStudy;
