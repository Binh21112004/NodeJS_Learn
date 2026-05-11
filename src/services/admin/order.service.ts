import { prisma } from "config/client"

const getOrderAdmin = async () => {
  const results = await prisma.order.findMany({
    include: {
      user : true

    }
  });

  return results;
}

const getOrderDetailAdmin = async (orderId :number) => {
  return await prisma.orderDetail.findMany({
    where: {
      orderId
    }
    ,
    include: {
      product: true
    }
  })
}

export {getOrderAdmin, getOrderDetailAdmin}