//JWT e.g
import { Router } from "express";
import { createTokens, validateToken, authenticateToken, generateAccessToken } from "../handlers/jwt.mjs";
import { User } from "../mongoose/user.mjs";
import { comparePW } from "../utils/helpers.mjs";
import jwt from "jsonwebtoken"
import passport from "passport";

let refreshTokens = []

const router = Router();
router
// JWT_P
.post('/signin', passport.authenticate("local"), async (req, res) => {
    const { name, password } = req.body;
  // const user = await Users.findOne({ where: { username: username } });
    const user = await User.findOne({name})
    if (!user) res.status(400).json({ error: "User not found!" });

    const dbPassword = user.password;
    if (!comparePW(password, dbPassword)){
        res
        .status(400)
        .json({ error: "Invalid credentials!" })
    } else {
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60000 * 5,
          httpOnly: true, // hides your 🍪 from browser
        });
      res.json({ token: accessToken, username: name, id: user.id });
      console.log(req.session)
    }
})

.get('/status', validateToken, (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
})

//jwt - WDS - Access/Refresh token
.get('/stat', authenticateToken, (req, res) => {
  console.log(req.user)
  console.log(req.session)
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