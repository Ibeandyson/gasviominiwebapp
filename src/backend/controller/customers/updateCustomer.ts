import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const _id = req.body.data._id
    const lastRefillDate = req.body.data.lastRefillDate
    const lastRefillKg = req.body.data.lastRefillKg
    const date: any = new Date(Date.now())
    const nowDate = date.toString()

    try {
        let { db } = await connectToDatabase();

        await db.collection('customer').updateOne(_id, {
            $set: {
                lastRefillDate: lastRefillDate,
                lastRefillKg: lastRefillKg,
                update_at: nowDate,
            }
        }

        );

        return res.status(200).json({
            message: 'Customer data updated successfully',
            success: true,
        });


    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};