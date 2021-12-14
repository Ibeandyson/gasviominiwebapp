import {
    addStaff,
    getStaff,
    deleteStaff,
    updateStaff,
} from "../../src/backend/controller/staff";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:  NextApiRequest, res:  NextApiResponse) {
    switch (req.method) {
        case "GET": {
            return getStaff(req, res);
        }

        case "POST": {
            return addStaff(req, res);
        }

        case "PUT": {
            return updateStaff(req, res);
        }

        case "DELETE": {
            return deleteStaff(req, res);
        }
    }
}
