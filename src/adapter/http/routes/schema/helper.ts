import Ajv, { ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { Request, Response } from "express";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function validateSchema(validate: ValidateFunction) {
  return (req: Request, res: Response, next: Function) => {
    const valid = validate(req.body);
    if (!valid) {
      const errors = validate.errors;
      return res.status(400).json(errors);
    }
    next();
  };
}

export {
  ajv,
  validateSchema
}