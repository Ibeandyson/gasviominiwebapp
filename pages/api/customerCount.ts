import {customerCount} from "../../src/backend/controller/customers"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET": {
            return customerCount(req, res);
        }

    }
}
