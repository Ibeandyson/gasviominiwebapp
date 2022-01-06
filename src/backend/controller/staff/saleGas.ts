import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateSaleGasInput from '../../Validation/saleGas'


export default async (req: NextApiRequest, res: NextApiResponse) => {

	const { errors, isValid } = validateSaleGasInput(req.body.data);
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
	const user_id = req.body.data.user_id
	const staffFirstName = req.body.data.staffFirstName
	const staffLastName = req.body.data.staffLastName
	const staffRole = req.body.data.staffRole
	const refillDate = new Date(Date.now())
	const refillKg = req.body.data.refillKg
	const amount = req.body.data.amount
	const date: any = new Date(Date.now())


	try {
		let { db } = await connectToDatabase();
		await db.collection('gas_purchased').insertOne(
			{
				user_id: user_id,
				email: email,
				phone: phone,
				address: address,
				firstName: firstName,
				lastName: lastName,
				cylinderSize: cylinderSize,
				cylinderAge: cylinderAge,
				created_at: date.toISOString(),
				purchase: {
					refillKg: refillKg,
					amount: amount,
					refillDate: refillDate.toISOString()
				},
				staffData: {
					lastName: staffLastName,
					firstName: staffFirstName,
					role: staffRole
				}

			}
		);

		return res.status(200).json({
			message: 'Gas purchased successfully',
			success: true,
		});


	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}
};