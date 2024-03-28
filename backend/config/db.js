// database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hr", "hr", "hr", {
  dialect: "oracle",
  host: "localhost",
  port: "1521",
  dialectOptions: {
    connectString: "localhost:1521/XEPDB1", // Add the service string here
  },
});

// Sync the Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = sequelize;
