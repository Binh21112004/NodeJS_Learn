import { Request, Response } from "express"
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema } from "src/validation/register.schema";

const getLoginPage = (req: Request, res: Response) => {
  return res.render('client/auth/login');
}

const getRegisterPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = [];
  return res.render("client/auth/register",{
    errors, oldData
  });
}


const postRegister = async (req: Request, res: Response) => {
  const {fullName, email, password, confirmPassword} = req.body ;
  const validate = await RegisterSchema.safeParseAsync(req.body); 
  if(!validate.success){
    //error 
    const errorZod = validate.error.issues;
    const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
    const oldData = {
      fullName, email, password, confirmPassword
    }

    return res.render("client/auth/register.ejs", {
      errors, oldData
    })
  }

  await registerNewUser(fullName, email, password);
  return res.redirect("/login");
}

export { getLoginPage, getRegisterPage,postRegister }