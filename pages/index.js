import { Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';

function Home() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        padding: '30px',
        width: '100%',
        margin: '0 auto',
      }}
    >

      <div className="d-flex flex-row justify-content-around align-items-stretch" style={{ width: '100%' }}>
        <Link passHref href="/characters">
          <Card
            id="charactersCard"
            className="cardHover"
            style={{
              backgroundImage: 'url(1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent',
              flexGrow: 5,
              height: '600px',
              cursor: 'pointer',
              margin: '0 10px',
            }}
          >
            <Card.Body className="d-flex justify-content-center align-items-center">
              <Card.Title style={{
                fontWeight: '800', fontSize: '24px', color: '#FFFFFF', textShadow: '3px 3px 6px #000000',
              }}
              >View Characters
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link passHref href="/campaigns">
          <Card
            id="campaignsCard"
            className="cardHover"
            style={{
              backgroundImage: 'url(2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent',
              flexGrow: 5,
              height: '600px',
              cursor: 'pointer',
              margin: '0 10px',
            }}
          >
            <Card.Body className="d-flex justify-content-center align-items-center">
              <Card.Title style={{
                fontWeight: '800', fontSize: '24px', color: '#FFFFFF', textShadow: '3px 3px 6px #000000',
              }}
              >View Campaigns
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
}
export default Home;
