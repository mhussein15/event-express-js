const express = require("express");
const app = express();
// const PORT = 8000;
const db = require("./db/models");
const eventRouter = require("./routes/event");

app.listen(8001);
app.use(express.json());
app.use("/event", eventRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

db.sequelize.sync({ alter: true });
