import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let { db } = await connectToDatabase();
        const data = await db.collection('gas_purchased').find({}).toArray()
        let val = data.map((data: any) => (data.purchase.refillKg))
        let valNumber = val.map(Number)
        const reducer = (accumulator: any, curr: any) => accumulator + curr;
        let resData = valNumber.reduce(reducer)
        return res.status(200).json({
            data: resData,
            success: true,
        });

    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};