import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimum: 0 },
    categoryId: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false
}

export default ajv.compile(schema);