'use client'

import { signOut } from 'next-auth/react'


export default function LogOutBtn(){
    return (
            <button className="comBtn" onClick={()=>{
                signOut()
            }} >Logout</button>
    )
}