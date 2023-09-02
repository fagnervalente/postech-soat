import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    id: {type: "integer"}
  },
  required: ["id"]
}

export default ajv.compile(schema);