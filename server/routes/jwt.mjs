//JWT e.g
import { Router } from "express";
import { createTokens, validateToken, authenticateToken, generateAccessToken } from "../handlers/jwt.mjs";
import { User } from "../mongoose/user.mjs";
import { comparePW } from "../utils/helpers.mjs";
import jwt from "jsonwebtoken"

let refreshTokens = []

const router = Router();
router
// JWT_P
.post('/signin', async (req, res) => {
    const { name, password } = req.body;
  // const user = await Users.findOne({ where: { username: username } });
    const user = await User.findOne({name})
    if (!user) res.status(400).json({ error: "User not found!" });

    const dbPassword = user.password;
    if (!comparePW(password, dbPassword)){
        res
        .status(400)
        .json({ error: "Bad credentials!" })
    } else {
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60000,
          httpOnly: true, // hides your 🍪
        });
      res.json(`Hello there 👋🏼, it's nice to see you back ${user.name}!`);
    }
})

.get('/profile', validateToken, (res, req) => {
  res.json("Logged in!");
})

//jwt - WDS
.get('/status', authenticateToken, (req, res) => {
  return req.user ? res.send(`Welcome, ${req.user.name} 👾!`) : res.sendStatus(401);
})

.post('/login', async(req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({name})
  if (!user) res.status(400).json({ error: "User not found" });

  const dbPassword = user.password;
  if (!comparePW(password, dbPassword)){
      res
      .status(400)
      .json({ error: "Bad credentials!" })
  } else {
      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign({name: user.name, password: user.password}, process.env.REFRESH_TOKEN)
      refreshTokens.push(refreshToken)
      res.json({accessToken: accessToken, refreshToken: refreshToken})
      /* console.log(accessToken) */
  }
})

.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken(user)
      res.json({ accessToken: accessToken })
  })
})

.delete('/signout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.status(204).send("Token deleted!")
})

export default router