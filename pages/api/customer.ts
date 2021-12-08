import {
  addCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../../src/backend/controller/customers";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      return getCustomer(req, res);
    }

    case "POST": {
      return addCustomer(req, res);
    }

    case "PUT": {
      return updateCustomer(req, res);
    }

    case "DELETE": {
      return deleteCustomer(req, res);
    }
  }
}
