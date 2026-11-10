import { cookies } from "next/headers"
import { randomBytes } from "crypto"
import { getcollection } from "./db"


export async function createSession(userId:string) {
    
const sessionid = randomBytes(32).toString("hex")
const sessions = await getcollection("sessions")
const expiresAt = new Date(Date.now()+7*24*60*60*1000)

await sessions.insertOne({
    sessionId: sessionid,
    userId,
    expiresAt
})
const cookiStore = await cookies()
cookiStore.set("session",sessionid,{
    httpOnly : true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path:"/"
})
}
export async function getSession() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value
    if (!sessionId) {
          return null
   }
   const sessions = await getcollection("sessions")

   const session = await sessions.findOne({
    sessionId
   })
   if(!session){
    return null
   }
   if(session.expiresAt < new Date()){
    await sessions.deleteOne({sessionId})
    return null
   }
   return session
}
export async function deleteSession() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    return
  }

  const sessions = await getcollection("sessions")

  await sessions.deleteOne({
    sessionId
  })

  cookieStore.delete("session")
}