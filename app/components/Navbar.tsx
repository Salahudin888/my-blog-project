
import Link from "next/link"
import { getSession } from "../lib/session"
import { logoutUser } from "../actions/auth"
import "./Navbar.css"
import { connection } from "next/server"

export default async function Navbar() {
   await connection()
    const session = await getSession()

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          Blog
        </Link>

        <div className="links">
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <form action={logoutUser} className="logoutForm">
                <button type="submit" className="logoutButton">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
