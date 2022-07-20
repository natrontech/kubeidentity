import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import LoginForm from '../components/login/LoginForm';
import { User, useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {

  const { user, loading, logoutUser }: any = useUserContext();
  const router = useRouter();

  if (user && !loading) {
    router.push('/dashboard');
  }


  return (
    <div
      className="h-screen"
    >
      <LoginForm />
    </div>
  )
}

export default Home
