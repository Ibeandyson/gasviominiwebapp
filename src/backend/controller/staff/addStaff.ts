import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateRegisterInput from '../../Validation/signup'
const jwtSecret = 'SUPERSECRETE2021';
import bcrypt from 'bcryptjs'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Form validation
    const { errors, isValid }: any = validateRegisterInput(req.body.data);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.data.email;
    const password = req.body.data.password;
    const phone = req.body.data.phone
    const address = req.body.data.address
    const firstName = req.body.data.firstName
    const lastName = req.body.data.lastName


    try {
        let { db } = await connectToDatabase();
        let staff = await db.collection("users").find({ email })
        if (staff) {
            res.status(403).send({ emailError: 'The email has already been used' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.collection('staff').insertOne(
                {
                    email: email,
                    phone: phone,
                    address: address,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword
                }
            );
            return res.status(200).json({
                message: 'Staff added successfully',
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