import { execSync } from "child_process";

export default function setup() {
	console.log("aaaaa");
	execSync("npm run seed");
	console.log("bbbbb");
}
