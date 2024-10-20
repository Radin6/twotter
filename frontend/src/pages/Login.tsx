import React, { useState } from "react"
import Container from "../components/Container"
import userLogin from "../services/users/userLogin.services"
import userStore from "../store/userStore"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login(): React.JSX.Element {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { setUser } = userStore()
  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const response = await userLogin({email: email, password: password})
    console.log("Login resp: ", response)
    
    if (!response.error) {
      setUser(response)
      toast.success("Login successfully!")

      return setTimeout(()=>navigate("/"), 1000)
    }

    toast.error("Login failed!")
    return setError(response.error)
  }

  return (
    <Container style="items-center">
      <div className="flex flex-col items-center h-[300px] w-[280px] border border-gray-300 p-3">
        <h3>Login</h3>
        <form action="" onSubmit={handleLogin} className="flex flex-col h-full items-center justify-between">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input 
              onChange={(e)=>setEmail((e.target as HTMLInputElement).value)}
              className="text-black p-1 m-1" type="email" />
            <label htmlFor="password" >Password</label>
            <input
              onChange={(e)=>setPassword((e.target as HTMLInputElement).value)} 
              className="text-black p-1 m-1" type="password" 
            />
          </div>
          <button className="bg-gray-500 py-2 px-4 rounded-lg" type="submit">
            Login
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </Container>
  )
}

export default Login;