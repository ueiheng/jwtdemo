import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { log } from "console";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//key
const secret = "secret";

let user = {
  username: "admin",
  password: "123456",
  id: 999,
};

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id }, secret);
    console.log(token);
    res.json({
      message: "登陆成功",
      token: token,
      code: 200,
    });
  } else {
    res.status(403).json({ message: "Invalid Credentials" });
  }
});

app.get("/index", (req, res) => {
  console.log(req.headers.authorization);

  jwt.verify(req.headers.authorization, secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "没有权限" });
    } else {
      res.json({ message: "登录成功", code: 200, data: "Hello, world!" });
    }
  });
});

app.listen(3000, () => console.log("listening on http://localhost:3000"));
