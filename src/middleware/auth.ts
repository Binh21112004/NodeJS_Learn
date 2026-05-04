import { NextFunction,Request, Response } from "express"

const isLogin = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticate = req.isAuthenticated();
  if(isAuthenticate){
    res.redirect("/");
    return;
  }
  else {
    next();
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if(req.path.startsWith('/admin')){
    const user = req.user;
    if(user?.role?.name === "ADMIN"){
      next();
    }
    else res.render("status/403.ejs");
    return;
  }
  next();
}
export {isLogin, isAdmin}