/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, NavDropdown,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar id="navBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <NavDropdown title="Characters" id="nav-dropdown-characters" className="custom-dropdown">
              <Link href="/characters" passHref>
                <NavDropdown.Item as="a">View Characters</NavDropdown.Item>
              </Link>
              <Link href="/character/new" passHref>
                <NavDropdown.Item as="a">New Character</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Campaigns" id="nav-dropdown-campaigns" className="custom-dropdown">
              <Link href="/campaigns" passHref>
                <NavDropdown.Item as="a">View Campaigns</NavDropdown.Item>
              </Link>
              <Link href="/campaign/new" passHref>
                <NavDropdown.Item as="a">New Campaign</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
