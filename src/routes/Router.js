import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Employees from '../pages/ListEmployees'
import NotFound from '../pages/NotFound'
import AddEmployee from '../pages/AddEmployee'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees-list" element={<Employees />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
