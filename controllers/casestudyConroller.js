import asyncHandler from "express-async-handler";
import caseStudy from "../model/caseStudy.js";

import { caseStudyValidation } from "../validators/validation.js";
// @desc    Search Case Studies
// @route   POST /api/casestudy
export const searchCaseStudy = asyncHandler(async (req, res) => {
  const { error } = caseStudyValidation(req.body);
  const { startDate, endDate, minCount, maxCount } = req.body;
  if (error)
    return res
      .status(400)
      .json({ code: 1, msg: error.details[0].message, records: [] });
//PipeLine
  const docs = await caseStudy.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    {
      $addFields: {
        totalCount: { $sum: "$counts" },
      },
    },
    {
      $project: {
        _id: 0,
        counts: 0,
        value: 0,
      },
    },
    {
      $match: {
        totalCount: {
          $gt:parseInt(minCount),
          $lt: parseInt(maxCount),
        },
      },
    },
  ]);
  if(docs.length>0){
    res.status(200).json({ code: 0, msg: "Success", records: docs });

  }else{
    res.status(200).json({ code: 0, msg: "Success", records: [] });

  }
});
