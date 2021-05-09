import React from 'react'
import Link from 'next/link'
import {auth} from '../fb'

export default function NavBar({user}) {
    return (
        <div>
            <nav>
    <div className="nav-wrapper #d500f9 purple accent-3">
      <Link href="/"><a className="brand-logo">Blogging</a></Link>
      <ul id="nav-mobile" className="right">
      {user?
      <>
        <li><Link href="#"><a>Sarthak(Javascript Developer)</a></Link></li>
        <li><Link href="/createblog"><a>Create New Blog</a></Link></li>
        <li> <button type="submit" className=" btn blue" onClick={()=>auth.signOut()}>Logout</button></li>
      </>
      :
      <>
      <li><Link href="/signup"><a>Signup</a></Link></li>
      <li><Link href="/login"><a>Login</a></Link></li>
      </>
      }

      </ul>
    </div>
  </nav>
        </div>
    )
}
