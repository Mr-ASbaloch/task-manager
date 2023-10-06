import React from 'react'
import AddData from './Crud/AddData'
import ReadData from './Crud/ReadData'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <div className=''>
        <Navbar/>
        <AddData />
        <ReadData />

    </div>
  )
}

export default Home