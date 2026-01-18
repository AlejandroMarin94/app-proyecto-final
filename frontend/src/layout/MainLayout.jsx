import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '../components/HeaderComponent/HeaderComponent'
import FooterComponent from '../components/FooterComponent/FooterComponent'

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <>
    <HeaderComponent onSearch={handleSearch} />
    <Outlet context={{ searchQuery }} />
    <FooterComponent />
    </>
  )
}

export default MainLayout