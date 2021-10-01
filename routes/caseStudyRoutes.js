import express from "express";
import { searchCaseStudy } from "../controllers/casestudyConroller.js";

const router = express.Router();


/**
 * @swagger
 * /api/casestudy:
 *   post:
 *     summary: Filter CaseStudies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 description: The Start Date of the case-study.
 *                 example: 2015-03-13
 *               endDate:
 *                 type: string
 *                 description: The End Date of the case-study.
 *                 example: 2015-07-13
 *               minCount:
 *                 type: integer
 *                 description: The min count of totalCount.
 *                 example: 25
 *               maxCount:
 *                 type: integer
 *                 description: The max Count of total Count.
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Success - Query Passed         
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:  
 *                   type: interger
 *                   description: 0-Success, 1-Validation Error, 2-Server Error 
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: Success - Query Passed, ${Validation Mesage}-Validation Error
 *                   example: Success
 *                 records:
 *                    type: array
 *                    description: Contains Key,createdAt and total Count of Records
 *                    example: [{key: "ncJegYPU",createdAt: "2015-07-12T15:26:25.191Z",totalCount: 150}]
 *       400:
 *         description: Validation Error - Query Failed         
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:  
 *                   type: interger
 *                   description: 0-Success, 1-Validation Error, 2-Server Error 
 *                   example: 1
 *                 msg:
 *                   type: string
 *                   description:  Query Passed, ${Validation Mesage}-Validation Error
 *                   example: "\"endDate\" must be in YYYY-MM-DD format"
 *                 records:
 *                    type: array
 *                    description: Contains Key,createdAt and total Count of Records
 *                    example: []
 *       404:
 *         description: Resource Not Found Error - Query Failed         
 *         
                          
*/
//casestudy root Route /api/casestudy/
router.route("/").post(searchCaseStudy);

export default router;
