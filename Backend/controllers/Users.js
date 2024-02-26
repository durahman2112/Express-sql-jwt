import User from "../models/UsersModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"], //untuk memilih opsi atribut yang ditampilkan di respon
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserId = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"], //untuk memilih opsi atribut yang ditampilkan di respon
      where: {
        uuid: req?.params?.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password and Confirm Password Doesn't match." });
  const hassPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hassPassword,
      role: role,
    });
    res.status(201).json({ message: "Create User Successfull" });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req?.params?.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User not Found." });
  const { name, email, password, confPassword, role } = req.body;
  let hashPass;
  if (password === "" || password === null) {
    hashPass = user.password;
  } else {
    hashPass = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password and Confirm Password Doesn't match." });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPass,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "User Updated" });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req?.params?.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User not Found." });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ message: "User Deleted." });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};
