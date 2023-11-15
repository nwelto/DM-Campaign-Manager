import { Button } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Time to start your adventure, {user.displayName}! </h1>
      <div className="buttonWrapper">
        <Link passHref href="/characters">
          <Button variant="warning" className="indexBtn m-2">View Characters</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
