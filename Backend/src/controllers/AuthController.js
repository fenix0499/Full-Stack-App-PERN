import * as jwt from "../../services/jwt.js";
import moment from "moment";
import User from "../models/UsersModel.js";

const willExpireToken = (token) => {
  const { exp } = jwt.decodeToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }

  return false;
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);
  if (isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const token = jwt.decodeToken(refreshToken);
    const { id } = token.payload;
    const userStored = await User.findByPk(id);
    try {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado..." });
      } else {
        res.status(200).send({
          accessToken: jwt.createAccessToken(userStored),
          refreshToken: refreshToken,
        });
      }
    } catch (ex) {
      res.status(500).send({ message: "Error del servidor..." });
    }
  }
};

export default refreshAccessToken;
