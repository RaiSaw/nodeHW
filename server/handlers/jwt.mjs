//JWT Example
import jwt from "jsonwebtoken"
const { sign, verify } = jwt;

export const createTokens = (user) => {
    const accessToken = sign({name: user.name, password: user.password}, process.env.ACCESS_TOKEN)
    return accessToken
}

export const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    console.log(accessToken)
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });

    try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
export const generateAccessToken = (user) => {
        return jwt.sign({name: user.name, password: user.password}, process.env.ACCESS_TOKEN, {expiresIn: '1m'})
  }