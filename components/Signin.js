import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';

function Signin() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn();
    router.push('/');
  };
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        width: '100vw',
        height: '100vh',
        padding: '30px',
        margin: '0 auto',
        backgroundImage: 'url("/dmcbbr3.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ color: 'white' }}>Welcome.</h1>
      <p style={{ color: 'white' }}>Please sign in to continue.</p>
      <Button variant="dark" type="button" size="lg" className="signin-btn" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
