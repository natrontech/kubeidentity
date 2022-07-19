import type { NextPage } from 'next'
import { useContext } from 'react';
import LoginForm from '../components/login/LoginForm';
import { User, useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {
  return (
    <div
      className=""
    >
      <h1>Hello Next.js</h1>
      <LoginForm />
    </div>
  )
}

export default Home
