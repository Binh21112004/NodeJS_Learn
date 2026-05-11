import { prisma } from "config/client"

const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
}

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id
    }
  })
}

const addProductToCart = async (quantity: number, productId: number, user: Express.User | undefined) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user?.id
    }
  })

  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  if (cart) {
    //update
    // cập nhật sum giỏ hằng
    await prisma.cart.update({
      where: {
        id: cart.id
      },
      data: {
        sum: {
          increment: quantity
        }
      }
    })

    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id
      }
    })

    await prisma.cartDetail.upsert({
      where: {
        id: currentCartDetail?.id ?? 0
      },
      update: {
        quantity: {
          increment: quantity
        }
      },
      create: {
        price: product?.price,
        quantity: quantity,
        productId: productId,
        cartId: cart.id

      }
    })

  }
  else {
    //create
    await prisma.cart.create({
      data: {
        sum: 1,
        userId: user?.id,
        cartDetails: {
          create: [
            {
              price: product?.price,
              quantity: quantity,
              productId: productId
            }
          ]
        }
      }
    })
  }
}


const getProductInCart = async (id: number) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: id
    }
  });
  if (cart) {
    const cartDetail = await prisma.cartDetail.findMany({
      where: {
        cartId: cart?.id ?? 0
      },
      include: {
        product: true
      }
    })
    return cartDetail;
  }
  

  return [];

}

const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number|undefined) => {
  
  const currentCartDetail = await prisma.cartDetail.findUnique({
    where: {
      id: cartDetailId
    }
  })
  

  const quantity = currentCartDetail?.quantity;
  
  await prisma.cartDetail.delete({
    where:{
      id: cartDetailId
    }
  })

  if(sumCart === 1){
    // deleteCart
    await prisma.cart.delete({
      where:{
        userId
      }
    })
  }
  else{
    //update Cart
    await prisma.cart.update({
      where: {
        userId
      },
      data: {
        sum: {
          decrement: quantity,
        }
      }
    })
  }
}

const updateCartDetailBeforeCheckout = async (data: {id: string; quantity: string} []) => {
  for(let i = 0; i < data.length; i++){
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id
      },
      data: {
        quantity: +data[i].quantity
      }
    })
  }
}

const handlePlaceOrder = async (userId: number, receiverName: string,receiverAddress:string, receiverPhone: string, totalPrice: number) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId
    },
    include: {
      cartDetails: true
    }
  })

  if(cart){
    const dataOrderDetail = cart?.cartDetails?.map(
      item => ({
        price: item.price,
        quantity: item.quantity,
        productId : item.productId
      })
    ) ?? []
    await prisma.order.create({
      data: {
        receiverName,
        receiverAddress,receiverPhone,
        paymentMethod: "COD",
        paymentStatus: "PAYMENT_UNPAID",
        status: "PENDING",
        totalPrice: totalPrice,
        userId,
        orderDetails: {
          create: dataOrderDetail
        }
      }
    })

    //remove cart detail va cart
    await prisma.cartDetail.deleteMany({
      where: {
        cartId: cart.id
      }
    })

    await prisma.cart.delete({
      where: {
        id: cart.id
      }
    })
  }


}


const getOrderHistory = async (userId : number) => {
  return await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      orderDetails:{
        include: {
          product: true
        }
      }
    }
  })
}
export { getProducts, getProductById, addProductToCart, getProductInCart ,deleteProductInCart,updateCartDetailBeforeCheckout ,handlePlaceOrder, getOrderHistory }