import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Employees from '../pages/Employees'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees-list" element={<Employees />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
