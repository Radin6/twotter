import React, { useState } from "react"
import Container from "../components/Container"
import userSignup from "../services/users/userSignup.services"
import userStore from "../store/userStore"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import { useNavigate } from "react-router-dom"

function Signup(): React.JSX.Element {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = userStore()
  const navigate = useNavigate()

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      const response = await userSignup({email: email, password: password})

      if (!response.error) {
        setUser(response)
        toast.success("Signup successfully!")

        return setTimeout(() => navigate("/login"), 1000)
      } else {

        toast.error("Signup failed!")
        return setError(response.error)
      }

    } catch(error) {
      console.log("userSignup error: ",error)
      return toast.error("Signup error")
    }
    
    
  }

  return (
    <Container style="items-center">
      <div className="flex flex-col items-center w-[280px] border border-gray-300 p-3">
        <h3 className="font-mono text-2xl font-bold">Signup</h3>
        <form action="" onSubmit={handleSignup} className="flex flex-col h-full items-center justify-between">
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
          <Button variant="blue" className="my-5" type="submit">
            Signup
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </Container>
  )
}

export default Signup;