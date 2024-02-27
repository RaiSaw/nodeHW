import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/helpers.mjs";
import { User } from "../mongoose/user.mjs";

export const createUserHandler = async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.status(400).send(result.array());
	const data = matchedData(req);
	data.password = hashPassword(data.password);
	const newUser = new User(data);
	try {
		const savedUser = await newUser.save();
		console.log(savedUser)
		res.status(201).send(savedUser);
	} catch (error) {
		return res.status(400).send("User not created!");
	}
};

export const authorize = async (req, res, next) => {
	if (!req.user) return res.sendStatus(401)
	next()
}
