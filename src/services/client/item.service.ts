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
          decrement: 1,
        }
      }
    })
  }
}

export { getProducts, getProductById, addProductToCart, getProductInCart ,deleteProductInCart}