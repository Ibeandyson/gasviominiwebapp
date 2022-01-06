import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";


export default async (req: NextApiRequest, res: NextApiResponse,) => {
	const { query: { name, keyword } } = req
	try {
		let { db } = await connectToDatabase();

		if (name === "email") {
			const data = await db.collection('customer').findOne({ email: keyword })
			return res.status(200).json({
				data: [data],
				success: true,
			});
		}

		if (name === "_id") {
			const data = await db.collection('customer').findOne({ _id: keyword })
			return res.status(200).json({
				data: [data],
				success: true,
			});
		}
		if (name === "cylinderSize") {
			const data = await db.collection('customer').find({ cylinderSize: keyword }).toArray()
			return res.status(200).json({
				data: data,
				success: true,
			});
		}

		if (name === "lastRefillKg") {
			const data = await db.collection('customer').find({ 'purchase.lastRefillKg': keyword }).toArray()
			return res.status(200).json({
				data: data,
				success: true,
			});
		}

		if (name === "cylinderAge") {
			let val: any = keyword
			let date = new Date(val)
			const data = await db.collection('customer').aggregate([
				{
					'$addFields': {
						'created_at_converted': {
							'$dateToParts': {
								'date': {
									'$toDate': '$cylinderAge'
								}
							}
						}
					}
				},
				{
					'$addFields': {
						'created_at_converted': {
							'$dateFromParts': {
								'year': '$created_at_converted.year',
								'month': '$created_at_converted.month',
								'day': '$created_at_converted.day'
							}
						}
					}
				},
				{
					'$match': {
						'created_at_converted': date
					}
				}
			]).toArray()
			return res.status(200).json({
				data: data,
				success: true,
			});
		}


		if (name === "created_at") {
			let val: any = keyword
			let date = new Date(val)
			const data = await db.collection('customer').aggregate([
				{
					'$addFields': {
						'created_at_converted': {
							'$dateToParts': {
								'date': {
									'$toDate': '$created_at'
								}
							}
						}
					}
				},
				{
					'$addFields': {
						'created_at_converted': {
							'$dateFromParts': {
								'year': '$created_at_converted.year',
								'month': '$created_at_converted.month',
								'day': '$created_at_converted.day'
							}
						}
					}
				},
				{
					'$match': {
						'created_at_converted': date
					}
				}
			]).toArray()
			return res.status(200).json({
				data: data,
				success: true,
			});
		}

		if (name === "lastRefillDate") {
			let val: any = keyword
			let date = new Date(val)
			const data = await db.collection('customer').aggregate([
				{
					'$addFields': {
						'created_at_converted': {
							'$dateToParts': {
								'date': {
									'$toDate': '$purchase.lastRefillDate'
								}
							}
						}
					}
				},
				{
					'$addFields': {
						'created_at_converted': {
							'$dateFromParts': {
								'year': '$created_at_converted.year',
								'month': '$created_at_converted.month',
								'day': '$created_at_converted.day'
							}
						}
					}
				},
				{
					'$match': {
						'created_at_converted': date
					}
				}
			]).toArray()
			return res.status(200).json({
				data: data,
				success: true,
			});
		}

	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}
};