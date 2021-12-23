import {
  addCustomer,
  deleteCustomer,
  getAllCustomer,
} from "../../src/backend/controller/customers";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      return getAllCustomer(req, res);
    }
    case "POST": {
      return addCustomer(req, res);
    }
    case "UPDATE": {
      return deleteCustomer(req, res);
    }
  }
}
