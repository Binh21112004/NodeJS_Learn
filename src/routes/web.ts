import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoard,getAdminOrderDetailPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage,postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage, postHandleCartToCheckOut,postPlaceOrder, getThanksPage,getOrderHistoryPage , postAddToCartFromDetailPage} from "controllers/client/product.controller";
import { getAdminCreatePage, postAdminCreateProduct, getViewProduct, postAdminUpdateProduct, postDeleteProduct } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, postRegister,getSuccessRedirectPage,postLogout } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin } from "src/middleware/auth";

const webRoutes = (app: Express) => {
  const router = express.Router();
  router.get("/", getHomePage)
  router.get("/success-redirect",getSuccessRedirectPage)
  router.get("/product/:id", getProductPage)
  router.get('/login' ,getLoginPage)
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/success-redirect',
    failureRedirect: '/login',
    failureMessage: true
  }))
  router.post('/logout',postLogout);
  router.get('/register', getRegisterPage)
  router.post('/register', postRegister)

  router.post('/add-product-to-cart/:id',postAddProductToCart)
  router.get("/cart", getCartPage)
  router.post("/delete-product-in-cart/:id", postDeleteProductInCart)
  router.post("/handle-cart-to-checkout", postHandleCartToCheckOut)
  router.get("/checkout", getCheckOutPage)
  router.post("/place-order",postPlaceOrder);
  router.get("/thanks", getThanksPage)
  router.get("/order-history",getOrderHistoryPage)
  router.post("/add-to-cart-from-detail-page/:id", postAddToCartFromDetailPage)



  // admin routes
  router.get("/admin",getDashBoard);
  router.get('/admin/user', getAdminUserPage)
  router.get("/admin/create-user", getCreateUserPage)
  router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUser)
  router.post("/admin/delete-user/:id", postDeleteUser)
  router.get("/admin/view-user/:id", getViewUser)
  router.post("/admin/update-user", fileUploadMiddleware('avatar'), postUpdateUser)

  router.get('/admin/product', getAdminProductPage)
  router.get('/admin/create-product', getAdminCreatePage)
  router.post('/admin/create-product', fileUploadMiddleware('image', "images/product"), postAdminCreateProduct)
  router.get('/admin/view-product/:id', getViewProduct)
  router.post('/admin/update-product', fileUploadMiddleware('image', "images/product"), postAdminUpdateProduct)
  router.get('/admin/order', getAdminOrderPage)
  router.get('/admin/order/:id', getAdminOrderDetailPage)
  router.post('/admin/delete-product/:id', postDeleteProduct)

  app.use("/", isAdmin,router);

}

export default webRoutes;