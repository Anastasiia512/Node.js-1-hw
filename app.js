const { app } = require("./index");

app.listen(process.env.PORT, () => {
  console.log(`App configured on port : ${process.env.PORT}`);
});
