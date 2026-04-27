const express=require('express')
const jwt=require('jsonwebtoken')
const authRouter = express.Router()

const USER = {
  email: "test@gmail.com",
  password: "123456"
}

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body

  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    })
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  res.json({
    success: true,
    message: "Login successful"
  })
})

module.exports=authRouter