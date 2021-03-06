import {staffCount} from "../../src/backend/controller/staff"

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {

        case "GET": {
            return staffCount(req, res);
        }

    }
}
