import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";

type resData = {
    message: string;
    success: boolean;
}
export default async (req: NextApiRequest, res: NextApiResponse<resData>) => {
    const lastRefillDate = req.body.data.lastRefillDate;
    const lastRefillKg = req.body.data.lastRefillKg

    try {
        let { db } = await connectToDatabase();
        await db.collection('customer').updateOne({
            lastRefillDate: lastRefillDate,
            lastRefillKg: lastRefillKg
        });
        return res.status(200).json({
            message: 'Updated customer data successfully',
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};