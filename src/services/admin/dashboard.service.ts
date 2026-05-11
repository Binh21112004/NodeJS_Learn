import { prisma } from "config/client"

const getDashBoardInfo = async () => {
  const user = await prisma.user.count();
  const product = await prisma.product.count();
  const order = await prisma.order.count();
  return {user,product,order}

}

export {getDashBoardInfo}