import asyncHandler from "express-async-handler";
import caseStudy from "../model/caseStudy.js";

import { caseStudyValidation } from "../validators/validation.js";
// @desc    Search Case Studies
// @route   POST /api/casestudy
export const searchCaseStudy = asyncHandler(async (req, res) => {
  //Validate POST DATA
  const { error } = caseStudyValidation(req.body);
  const { startDate, endDate, minCount, maxCount } = req.body;
  //validation Error Send 400,code:1,msg:"Description Validation Error"
  if (error)
    return res
      .status(400)
      .json({ code: 1, msg: error.details[0].message, records: [] });
//PipeLine
  const docs = await caseStudy.aggregate([
    //Filter Date Range to fit Payload standards
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    //Add totalCountField & and sum the Counts Array
    {
      $addFields: {
        totalCount: { $sum: "$counts" },
      },
    },
    //Filter the result prune some fields
    {
      $project: {
        _id: 0,
        counts: 0,
        value: 0,
      },
    },
    //Match out the result to fit the payload total count be in range of minCount & maxCount
    {
      $match: {
        totalCount: {
          $gt:parseInt(minCount),
          $lt: parseInt(maxCount),
        },
      },
    },
  ]);
  //Received records>0
  if(docs.length>0){
    res.status(200).json({ code: 0, msg: "Success", records: docs });
 
  }else{
     //No Records 
    res.status(200).json({ code: 0, msg: "Success", records: [] });

  }
});
