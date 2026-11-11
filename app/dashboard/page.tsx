import { connection } from "next/server"
import { getSession } from "../lib/session"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getcollection } from "../lib/db"
import "./dashboard.css"

export const instant = false
export default async function Dashboard() {
    await connection()
    const session = await getSession()
    if (!session) {
      redirect("/login")
 }

 const users = await getcollection("users")
 
 const user = await users.findOne({
  _id : new ObjectId(session.userId)
 })

 if(!user) redirect("/login")
  return (
  <main className="dashboard">
    <div className="dashboardCard">
      <h1>Welcome to Your Dashboard</h1>
      <p>
        <span>{user?.["username"]}</span>, you are successfully logged in!
      </p>
    </div>
  </main>
)
}