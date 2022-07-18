import type { NextPage } from 'next'
import { useContext } from 'react';
import { User, useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {
  return (
    <div
      className=""
    >
      <h1>Hello Next.js</h1>
    </div>
  )
}

export default Home
