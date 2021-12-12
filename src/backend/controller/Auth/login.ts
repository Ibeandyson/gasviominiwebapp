import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateLoginInput from '../../Validation/login'
const jwtSecret = 'SUPERSECRETE2021';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body.data);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;
	try {
		let { db } = await connectToDatabase();
		let staff = await db.collection('customer').find({ email })
		if (!staff) {
			return res.status(404).json({ emailError: 'Email or User name not found ' });
		} else {
			bcrypt.compare(password, staff.password).then(isMatch => {
				if (isMatch) {
					const payload = {
						id: staff.id,
						username: staff.email
					};

					const token = jwt.sign(
						payload,
						jwtSecret,
						{
							expiresIn: 3000, //50 minutes
						},
					);

					res.status(200).json({ token: token, data: staff });
				} else {
					return res.status(400).json({ passwordincorrect: 'Password incorrect' });
				}
			});
		}

	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}

}