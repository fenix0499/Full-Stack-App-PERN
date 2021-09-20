import app from "./src/app.js";
import { sequelize } from "./sql/config.js";
import { PORT, API_VERSION, IP_SERVER } from "./sql/config.js";

const main = async () => {
  await app.listen(PORT);
  console.log("##############################");
  console.log("########## API REST ##########");
  console.log("##############################");
  console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
