'use client'

import { signIn } from 'next-auth/react'


export default function LoginBtn(){
    return (
            <button className="comBtn" onClick={()=>{
                signIn()
            }} >Login</button>
    )
}