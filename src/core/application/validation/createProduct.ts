import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimun: 0 },
    categoryId: { type: "integer" },
  },
  required: ["name", "description", "price", "categoryId"],
  additionalProperties: false
}

export default ajv.compile(schema);