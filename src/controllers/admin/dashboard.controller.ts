import { Request, Response } from "express"
import { getDashBoardInfo } from "services/admin/dashboard.service";
import { getOrderAdmin,getOrderDetailAdmin } from "services/admin/order.service";
import { getProductList } from "services/admin/product.service";
import { getAllUsers } from "services/user.service";

const getDashBoard = async (req : Request, res : Response) => {
  const info = await getDashBoardInfo();
  return res.render("admin/dashboard/show",{
    info
  });
}

const getAdminUserPage = async (req : Request, res : Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/show",{
    users : users
  });
  
  return res.render("admin/user/show");
}

const getAdminProductPage = async (req : Request, res : Response) => {
  const products = await getProductList();
  return res.render("admin/product/show", {
    products
  });
}

const getAdminOrderPage = async (req : Request, res : Response) => {
  const results = await getOrderAdmin();
  return res.render("admin/order/show",{
    results
  });
}

const getAdminOrderDetailPage = async (req: Request, res: Response) => {
  const {id} = req.params;
  const orderDetails = await getOrderDetailAdmin(+id);

  return res.render("admin/order/detail",{
    orderDetails,id
  })
}
export {getDashBoard , getAdminUserPage,getAdminProductPage,getAdminOrderPage,getAdminOrderDetailPage}