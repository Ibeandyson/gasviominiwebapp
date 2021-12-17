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
    const id = req.body.data._id
    const dob = req.body.data.dob
    const date: any =  new Date(Date.now())
    const nowDate =  date.toString()



    try {
        let { db } = await connectToDatabase();

        if (await db.collection("customer").findOne({ email })) {
            return res.status(403).json({ emailError: 'The email has already been used' });
        }

        await db.collection('customer').insertOne(
            {
                _id: id,
                email: email,
                phone: phone,
                address: address,
                firstName: firstName,
                lastName: lastName,
                cylinderSize:  cylinderSize,
                cylinderAge:  cylinderAge,
                dob: dob,
                created_at: nowDate ,
            }
        );

        return res.status(200).json({
            message: 'Staff added successfully',
            success: true,
        });
      

    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};