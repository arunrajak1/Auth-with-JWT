import React, { useState } from 'react'
import LoginPage from '../LoginPage/LoginPage'

const HomePage = () => {
    const [page,setPage]=useState(true)
  return (
    <div>
    {
        
    }
      <LoginPage></LoginPage>
    </div>
  )
}

export default HomePage
