'use client';
import ViewAll from '../viewall/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import LoginCard from '../components/LoginCard';

export default function WebApp() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // localStorage.removeItem('webapp')
    // if (!isAuthenticated) {
    //   router.replace('/');
    // }
  },[]);
  return (
    <>
      <ViewAll webapp={true} setShowLogin={setShowLogin}/>
      {showLogin ? (<LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />) : (<></>)}
    </>
  );
}
