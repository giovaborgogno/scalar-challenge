if (process.env.NODE_ENV != 'production') require("dotenv").config();
const roomRoutes = require("./routes/roomRoutes");
const health = require("./routes/health");
const { app, server } = require("./routes/socket");
const debugPrint = require("./utils/debugPrint");

app.use("/rooms", roomRoutes);
app.use("/health", health);

server.listen(process.env.PORT | 4000, () => {
  debugPrint("SERVER RUNNING");
});
