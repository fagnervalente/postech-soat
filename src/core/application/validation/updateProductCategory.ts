import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
	type: "object",
	properties: {
		id: {type: "integer"},
		name: { type: "string" }
	},
	required: ["id", "name"],
	additionalProperties: false
}

export default ajv.compile(schema);