import { prisma } from "config/client"

const createProduct = async (name: string, price: number, detailDesc: string, shortDesc: string,
  quantity: number, factory: string, target: string, imageUpload: string | null
) => {
  await prisma.product.create({
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      ...(imageUpload && { image: imageUpload })
    }
  })
}

const getProductList = async () => {
  return await prisma.product.findMany();
}


const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id
    }
  })
}

const updateProduct = async (id: number , name : string, price : number, detailDesc :string, shortDesc: string,
  quantity: number, factory: string, target: string, imageUpload: string | null) => {
  return await prisma.product.update({
    where: {
      id
    },
    
      data: {
        name, 
        price, 
        detailDesc,
        shortDesc,
        quantity,
        factory,
        target,
        ...(imageUpload && { image: imageUpload })

      }
    
  })
}

const handleDeleteProduct = async (id :number) => {
  return await prisma.product.delete({
    where : {
      id
    }
  })
}

export { createProduct, getProductList, getProductById ,updateProduct, handleDeleteProduct}