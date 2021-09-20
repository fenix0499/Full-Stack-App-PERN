import jwt from "jsonwebtoken";
import moment from "moment";
import { SECRET_KEY } from "../sql/config.js";

export const createAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.sign(payload, SECRET_KEY);
};

export const createRefreshToken = (user) => {
  const payload = {
    id: user.id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.sign(payload, SECRET_KEY);
};

export const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};
