import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateSendBulkEmailsInput from '../../Validation/sendBulkEmail'
import sgMail from "@sendgrid/mail"



export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { errors, isValid } = validateSendBulkEmailsInput(req.body.data);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const emails = req.body.data.emails;
    const subject = req.body.data.subject;
    const message = req.body.data.message


    try {
        const msg = {
            to: emails, // replace these with your email addresses
            from: 'Sadie Miller <sadie@thebigdonut.party>',
            subject: subject,
            text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
            html: `<p>${message}</p>`,
        };

        sgMail.sendMultiple(msg)
        return res.status(200).json({
            message: 'Emails sent successfully',
            success: true,
        });

    } catch (error: any) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        });
    }
};