import React from 'react'
import styles from './Home.module.css'
import Card from '../../components/Card'

/**
 * Composant représentant la page d'accueil de l'application RHnet.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX de la page d'accueil.
 */
const Home = () => (
  <main className={styles.homeContainer}>
    <h1 className={styles.title}>RHnet</h1>
    <div className={styles.cardsContainer}>
      <Card icon="fa-pencil" linkTo="/add-employee" text="Create" />
      <Card icon="fa-search" linkTo="/employees-list" text="View" />
    </div>
  </main>
)

export default Home
