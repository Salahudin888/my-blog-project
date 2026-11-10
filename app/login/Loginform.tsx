"use client"
import "../register/register.css"
import { loginUser } from "../actions/auth"
import { useActionState } from "react"

export default function Login(){
    const[state,formAction] = useActionState(loginUser,null)

    return(
        <div className="register-continer">
            <form className="register-form" action={formAction}>
                <h1>create account</h1>
                <p>register to publish your blog posts</p>
                {state?.error&&(
                    <p className="error">{state.error}</p>
                )}
                <label htmlFor="username">username</label>
                <input 
                   type="text"
                   id="username"
                   name="username"
                   placeholder="enter your name"/>
                  <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                />  

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )

}