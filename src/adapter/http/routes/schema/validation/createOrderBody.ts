import { Schema } from "ajv";
import { ajv } from "../helper";

const schema: Schema = {
  type: "object",
  properties: {
    products: { type: "array", items: { type: "number" }, minItems: 1 },
    cpf: { type: "string", nullable: true },
  },
  required: ["products"],
  additionalProperties: false
}

export default ajv.compile(schema);