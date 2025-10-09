'use client';
import ViewAll from '../generalComponents/viewall';
import React, { useEffect, useState } from 'react';
import LoginCard from '../components/LoginCard';

export default function WebApp() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ViewAll webapp={true} setShowLogin={setShowLogin}/>
      {showLogin ? (<LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />) : (<></>)}
    </>
  );
}