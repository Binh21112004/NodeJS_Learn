import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText : string) => {
  return await bcrypt.hash(plainText,saltRounds);
}

const comparePassword = async (plainText: string, hashPassword: string) => {
  return await bcrypt.compare(plainText,hashPassword);
}

const handleCreateUser = async (fullName: string, email: string, address: string, phone : string, avatar : string, role : string) => {
  const defaultPassword = await hashPassword("123456");
  //insert into DB
  const myRole = role === "ADMIN" ? 1 : 2;
  const newUser = await prisma.user.create({data : {
    fullName: fullName,
    username : email,
    address : address,
    password : defaultPassword,
    accountType : ACCOUNT_TYPE.SYSTEM,
    avatar : avatar,
    phone : phone,
    roleId : myRole
  }})

  return newUser;
}



const getAllUsers = async () => {
  // getAllUser using prisma
  const users = await prisma.user.findMany();
  return users;

}

const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
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

const updateUserById = async (id: string | string[], fullName : string, phone: string, role : string ,  address : string, avatar : string | undefined) => {
  // update user by id by prisma
  const updateUser = await prisma.user.update({
  where: {
    id : +id
  },
  data: {
    fullName: fullName,
    phone : phone,
    roleId : +role,
    address : address,
    ...(avatar !== undefined && { avatar: avatar }) 
  },
});

return updateUser;
}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword, comparePassword}