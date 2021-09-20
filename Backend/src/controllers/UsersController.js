import User from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import * as jwt from "../../services/jwt.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (ex) {
    throw ex;
  }
};

export const createAcount = async (req, res) => {
  const { name, lastname, email, password, repeatPassword } = req.body;

  if (!password || !repeatPassword || !name || !lastname || !email) {
    res.status(404).send({ message: "Uno de los campos esta vacio..." });
  } else if (password !== repeatPassword) {
    res.status(404).send({ message: "Hay un error en la contrasenia..." });
  } else {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Error al crear el hash de la contrasenia..." });
      } else {
        try {
          let newAcount = await User.create(
            {
              name,
              lastname,
              email,
              password: hash,
            },
            {
              fields: ["name", "lastname", "email", "password"],
            }
          );
          if (newAcount) {
            res.status(200).send({ user: newAcount });
          } else {
            res.status(404).send({ message: "Error al crear el usuario..." });
          }
        } catch (ex) {
          res.status(500).send({
            message: "El usuario ya existe...",
            data: {},
          });
        }
      }
    });
  }
};

export const loginAcount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newLogin = await User.findOne({ where: { email } });
    if (!newLogin) {
      res.status(404).send({ message: "Cuenta no encontrada..." });
    } else {
      bcrypt.compare(password, newLogin.password, (err, check) => {
        if (err) {
          res.status(500).send({ message: err });
        } else if (!check) {
          res.status(404).send({ message: "La contrasenia es incorrecta..." });
        } else {
          const { name, lastname, email } = newLogin;
          res.status(200).send({
            name,
            lastname,
            email,
            accessToken: jwt.createAccessToken(newLogin),
            refreshToken: jwt.createRefreshToken(newLogin),
          });
        }
      });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error del servidor..." });
  }
};
