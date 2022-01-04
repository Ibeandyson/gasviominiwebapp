import { senBulkMails } from "../../src/backend/controller/staff"

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "POST": {
            return senBulkMails(req, res);
        }
    }
}
export default handler;