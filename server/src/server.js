import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("You have requested the home route with GET");
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
