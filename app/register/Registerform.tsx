"use client"
export const instant = false
import "./register.css"
import { registerUser } from "../actions/auth"
import { useActionState } from "react"
export default function Rigister(){

    const[state,formAction] = useActionState(registerUser,null)

    return(
        <div className="register-continer">
            <form className="register-form" action={formAction}>
                <h1>create account</h1>
                <p >register to publish your blog posts</p>
                {state?.error&&(
                    <p className="error">{state.error}</p>
                )}
                {state?.success&&(
                    <p>{state.success}</p>
                )}
                <label htmlFor="username">username</label>
                <input 
                   type="text"
                   id="username"
                   name="username"
                   placeholder="enter your name"/>
                <label htmlFor="email">email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter your email" />
                  <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                />  <label htmlFor="password">confrim Password</label>
                <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="confrim password"
                />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )

}