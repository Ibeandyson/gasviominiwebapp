import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const id = req.body
  
    try {
        let { db } = await connectToDatabase();
        // const data = await db.collection('customer').find({ "_id": id })
        // console.log(data)
        console.log("id", id)
        return res.status(200).json({
            data: '',
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};