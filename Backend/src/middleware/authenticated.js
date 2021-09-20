import * as jwt from "../../services/jwt.js";
import moment from "moment";
import { SECRET_KEY } from "../../sql/config.js";

const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La peticion no tiene cabecera de autenticacion..." });
  }

  let token = req.headers.authorization.replace(/['"]+/g, "");
  token = token.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.decodeToken(token);
    if (payload.exp <= moment.unix()) {
      return res.status(404).send({ message: "El token ha expirado." });
    }
  } catch (ex) {
    return res.status(404).send({ message: "Token invalido." });
  }

  req.user = payload;
  next();
};

export default ensureAuth;
