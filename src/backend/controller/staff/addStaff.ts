import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateRegisterInput from '../../Validation/signup'
import bcrypt from 'bcryptjs'


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { errors, isValid } = validateRegisterInput(req.body.data);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.data.email;
    const password = req.body.data.password;
    const phone = req.body.data.phone
    const address = req.body.data.address
    const firstName = req.body.data.firstName
    const lastName = req.body.data.lastName
    const role = req.body.data.role
    const date: any =  new Date(Date.now())
    const nowDate =  date.toString()

    try {
        let { db } = await connectToDatabase();

        if (await db.collection("staff").findOne({ email })) {
            return res.status(403).json({ emailError: 'The email has already been used' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('staff').insertOne(
            {
                email: email,
                phone: phone,
                address: address,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                role: role,
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