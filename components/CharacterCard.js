import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCharacter } from '../api/characterData';

function CharacterCard({ characterObj, onUpdate }) {
  const deleteThisCharacter = () => {
    if (window.confirm(`Delete ${characterObj.name}?`)) {
      deleteCharacter(characterObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={characterObj.image} alt={characterObj.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{characterObj.name}</Card.Title>
        <h6>Class: {characterObj.class}</h6>
        <h6>AC: {characterObj.AC}</h6>
        <h6>HP: {characterObj.HP}</h6>
        <h6>STR: {characterObj.str}</h6>
        <h6>DEX: {characterObj.dex}</h6>
        <h6>CON: {characterObj.con}</h6>
        <h6>INT: {characterObj.int}</h6>
        <h6>WIS: {characterObj.wisdom}</h6>
        <h6>CHA: {characterObj.cha}</h6>
        <Link href={`/character/${characterObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/character/edit/${characterObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCharacter} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CharacterCard.propTypes = {
  characterObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    class: PropTypes.string,
    AC: PropTypes.number,
    HP: PropTypes.number,
    str: PropTypes.number,
    dex: PropTypes.number,
    con: PropTypes.number,
    int: PropTypes.number,
    wisdom: PropTypes.number,
    cha: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CharacterCard;
