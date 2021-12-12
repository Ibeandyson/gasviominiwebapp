import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";

type resData = {
    message: string;
    success: boolean;
}
export default async (req: NextApiRequest, res: NextApiResponse<resData>) => {
    try {
        let { db } = await connectToDatabase();
        await db.collection('staff').insertOne(req.body.data);
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