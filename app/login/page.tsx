import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import  Login  from "./Loginform"


export default async function loginPage() {

    const session = await getSession()

    if(session){
        redirect("/dasheboard")
    }
    
    return <Login />
}