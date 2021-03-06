import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateCustomerInput from '../../Validation/customer'


export default async (req: NextApiRequest, res: NextApiResponse) => {

	const { errors, isValid } = validateCustomerInput(req.body.data);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.data.email;
	const phone = req.body.data.phone
	const address = req.body.data.address
	const firstName = req.body.data.firstName
	const lastName = req.body.data.lastName
	const cylinderSize = req.body.data.cylinderSize
	const cylinderAge = req.body.data.cylinderAge
	const _id = req.body.data._id
	const dob = req.body.data.dob
	const staffFirstName = req.body.data.staffFirstName
	const staffLastName = req.body.data.staffLastName
	const staffRole = req.body.data.staffRole
	const date: any = new Date(Date.now())
	

	try {
		let { db } = await connectToDatabase();
		if (await db.collection("customer").findOne({ email })) {
			return res.status(403).json({ emailError: 'The email has already been used' });
		}
		if (await db.collection("customer").findOne({ _id })) {
			return res.status(403).json({ qrCodeError: 'The QR Code already been used' });
		}

		await db.collection('customer').insertOne(
			{
				_id: _id,
				email: email,
				phone: phone,
				address: address,
				firstName: firstName,
				lastName: lastName,
				cylinderSize: cylinderSize,
				cylinderAge: new Date(cylinderAge).toISOString(),
				dob: new Date(dob).toISOString(),
				created_at: date.toISOString(),
				purchase: {
					lastRefillDate: "none",
					lastRefillKg: "none",
				},	
				staffData: {
					lastName: staffLastName,
					firstName: staffFirstName,
					role: staffRole
				}

			}
		);

		return res.status(200).json({
			message: 'Customer added successfully',
			success: true,
		});


	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}
};