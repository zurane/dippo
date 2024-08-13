import React from 'react'
import Navigation from './Navigation'

export default function Layout({children}) {
  return (
    // Layout component will contain our navigation component docked at the top of every page 
    // of our application
    <div>
      <Navigation/>
      <div className='max-w-6xl mx-auto px-5'>
        {children}
      </div>
    </div>
  )
}
