import jwt from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateLoginInput from '../../Validation/login'
const jwtSecret = 'SUPERSECRETE2021';

const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { errors, isValid } = validateLoginInput(req.body.data);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.data.email;
	const password = req.body.data.password;

	try {
		let { db } = await connectToDatabase();
		let staff = await db.collection('staff').findOne({ email })
		if (!staff) {
			return res.status(404).json({ emailError: 'incorrect password or emaill' });
		}
		if (password === staff.password) {

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

			return res.status(200).json({
				data: {
					id: staff._id,
					email: staff.email,
					phone: staff.phone,
					address: staff.address,
					firstName: staff.firstName,
					lastName: staff.lastName,
					password: staff.hashedPassword,
					role: staff.role,
					token: token,
				}
			});
		} else {
			return res.status(400).json({ passwordincorrect: 'incorrect password or emaill' });
		}

	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}

}

export default login