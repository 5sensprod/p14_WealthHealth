import React from 'react'
import styles from './Home.module.css'
import DatePicker from '../../components/DatePicker'

const Home = () => (
  <main className={styles.homeContainer}>
    <h1>RHnet</h1>
    <DatePicker />
  </main>
)

export default Home
