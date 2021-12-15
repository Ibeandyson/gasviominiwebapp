import {
 login
} from "../../src/backend/controller/auth"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:  NextApiRequest, res:  NextApiResponse) {
    switch (req.method) {
    
        case "POST": {
            return login(req, res);
        }

    }
}
