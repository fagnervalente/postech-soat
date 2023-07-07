import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimum: 0 },
    category: { type: "object", required : ["id"] },
  },
  required: ["name", "description", "price", "category"],
  additionalProperties: false
}

export default ajv.compile(schema);