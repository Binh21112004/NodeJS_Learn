import { Request, Response } from "express"
const getDashBoard = async (req : Request, res : Response) => {
  
  return res.render("admin/dashboard/show");
}

const getAdminUserPage = async (req : Request, res : Response) => {
  
  return res.render("admin/user/show");
}
export {getDashBoard , getAdminUserPage}