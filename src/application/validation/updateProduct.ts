import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
	type: "object",
	properties: {
		id: { type: "integer", minimum: 0 },
		name: { type: "string", minLength: 1 },
		description: { type: "string", minLength: 1 },
		price: { type: "number", minimum: 0 },
		category: {
			type: "object",
			properties: {
				id: { type: "integer", minimum: 0 },
				name: { type: "string", minLength: 1 },
			}
		},
	},
	required: ["id"]
}

export default ajv.compile(schema);