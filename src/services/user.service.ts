import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
  //insert into DB
  const newUser = await prisma.user.create({data : {
    fullName: fullName,
    username : email,
    address : address,
    password : "",
    accountType : ""
  }})

  return newUser;
}



const getAllUsers = async () => {
  // getAllUser using prisma
  const users = await prisma.user.findMany();
  return users;

}


const handleDeleteUser = async (id: string | string[]) => {
  // delete user by id by prisma
  const deleteUser = await prisma.user.delete({
  where: {
    id : +id
  },
});
  return deleteUser;
}

const getUserById = async (id: string | string[]) => {
  const user = await prisma.user.findUnique({
  where: {
    id : +id
  },
});
  return user;
}

const updateUserById = async (id: string | string[], fullName : string, email: string, address : string) => {
  // update user by id by prisma
  const updateUser = await prisma.user.update({
  where: {
    id : +id
  },
  data: {
    fullName: fullName,
    username : email,
    address : address,
    password : "",
    accountType : ""
  },
});

return updateUser;


}
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById }