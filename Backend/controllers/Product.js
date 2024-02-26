import Products from "../models/ProductModel.js";
import User from "../models/UsersModel.js";
import { Op, where } from "sequelize";

export const getProduct = async (req, res) => {
  try {
    let response;
    if (req?.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req?.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductId = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req?.params?.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Data Not Found" });
    let response;
    if (req?.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product?.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req?.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, price } = req?.body;
  try {
    await Products.create({
      name: name,
      price: price,
      userId: req?.userId,
    });
    res.status(201).json({ message: "Product Created Successfuly." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req?.params?.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Data Not Found." });
    const { name, price } = req?.body;
    if (req?.role === "admin") {
      await Products.update(
        {
          name,
          price,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req?.userId !== product.userId)
        return res.status(403).json({ message: "Access Denied !" });
      await Products.update(
        {
          name,
          price,
        },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req?.userId }],
          },
        }
      );
    }
    res.status(200).json({ message: "Product Updated Succesfuly." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req?.params?.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Data Not Found." });
    if (req?.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req?.userId !== product.userId)
        return res.status(403).json({ message: "Access Denied !" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req?.userId }],
        },
      });
    }
    res.status(200).json({ message: "Deleted Data Product!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
