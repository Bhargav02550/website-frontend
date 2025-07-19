'use client';
import ViewAll from '../viewall/page';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoginCard from '../components/LoginCard';

export default function WebApp() {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <>
      <ViewAll webapp={true} setShowLogin={showLogin}/>
      {showLogin ? (<LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />) : (<></>)}
    </>
  );
}
