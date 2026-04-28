import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (data.success) {
      navigate("/") 
    } else {
      alert(data.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 w-80"
      >
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-white/20 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-white/20 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  )
}