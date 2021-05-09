import React from 'react'
import Link from 'next/link'
import {useState} from 'react'
import {auth} from './fb'
export default function login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
            try{
                const result = await auth.signInWithEmailAndPassword(email,password)
            M.toast({html: `welcome ${result.user.displayName}`,classes:"green"})
            } catch(err){
                M.toast({html: err.messsage,classes:"red"})
        }
        
        
    }
    return (
        <div className="container center">
            <h3>Please Login!!</h3>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="input field">
                    <input type = "email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type = "password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className=" btn #d500f9 purple accent-3">Login</button>
                <Link href="/signup"><a><h5>Dont have an account</h5></a></Link>
            </form>
        </div>
    )
}
