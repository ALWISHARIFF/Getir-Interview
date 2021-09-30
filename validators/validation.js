import JoiBase  from  "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const caseStudyValidation = (data) => {
  const schema = Joi.object({
    startDate: Joi.date().required().format("YYYY-MM-DD"),
    endDate: Joi.date().required().format("YYYY-MM-DD"),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required(),
    
  });
  return schema.validate(data);
};



export {caseStudyValidation};