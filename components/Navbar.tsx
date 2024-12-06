import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div>
        <Link href='/'>LOGO</Link>
        <ul>
            <li>Home</li>
            <li>About</li>
        </ul>
    </div>
  )
}

export default Navbar