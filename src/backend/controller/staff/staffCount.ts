import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let { db } = await connectToDatabase();
        const data = await db.collection('staff').count({})
        return res.status(200).json({
            data: data,
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};