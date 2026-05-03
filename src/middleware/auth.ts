import { NextFunction,Request, Response } from "express"

const isLogin = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticate = req.isAuthenticated();
  if(isAuthenticate){
    res.redirect("/");
  }
  else {
    next();
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if(user?.role?.name === "ADMIN"){
    next()
  }
  else res.redirect("/")
}
export {isLogin, isAdmin}