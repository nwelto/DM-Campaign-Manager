/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar id="navBar" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ position: 'sticky', top: 0, zIndex: 1020 }}>
      <Container>
        <Navbar.Brand>
          <img
            src="/dmcm2.png"
            alt="D&D Dice"
            style={{ maxWidth: '50px', cursor: 'pointer' }}
          />
        </Navbar.Brand>
        <Link passHref href="/">
          <Navbar.Brand>
            Home
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/characters" passHref>
              <Nav.Link as="a">Characters</Nav.Link>
            </Link>
            <Link href="/campaigns" passHref>
              <Nav.Link as="a">Campaigns</Nav.Link>
            </Link>
            <Link href="/graveyards" passHref>
              <Nav.Link as="a">Graveyard</Nav.Link>
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
