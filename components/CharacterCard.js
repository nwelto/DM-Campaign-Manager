import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FaSkull, FaHeartbeat } from 'react-icons/fa';
import { deleteCharacter, updateCharacters } from '../api/characterData';

function CharacterCard({ characterObj, onUpdate }) {
  // Function to toggle the isDead status
  const toggleIsDead = () => {
    const updatedCharacter = {
      ...characterObj,
      isDead: !characterObj.isDead,
    };

    updateCharacters(updatedCharacter).then(() => onUpdate());
  };

  // Function to delete the character
  const deleteThisCharacter = () => {
    if (window.confirm(`Delete ${characterObj.name}?`)) {
      deleteCharacter(characterObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px', position: 'relative' }}>
      <Button
        variant="link"
        style={{
          position: 'absolute', top: '10px', right: '10px', color: characterObj.isDead ? 'green' : 'red',
        }}
        onClick={toggleIsDead}
      >
        {characterObj.isDead ? <FaHeartbeat /> : <FaSkull />}
      </Button>
      <Card.Body>
        <Card.Title>{characterObj.name}</Card.Title>
        <Card.Img variant="top" src={characterObj.image} alt={characterObj.name} style={{ height: '200px' }} />
        <h6>Class: {characterObj.class}</h6>
        <h6>AC: {characterObj.ac}</h6>
        <h6>HP: {characterObj.hp}</h6>
        <div className="saves-section">
          <h5>Saving Throws</h5>
          <h6>STR: {characterObj.str}</h6>
          <h6>DEX: {characterObj.dex}</h6>
          <h6>CON: {characterObj.con}</h6>
          <h6>INT: {characterObj.int}</h6>
          <h6>WIS: {characterObj.wisdom}</h6>
          <h6>CHA: {characterObj.cha}</h6>
        </div>
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
    notes: PropTypes.string,
    class: PropTypes.string,
    ac: PropTypes.number,
    hp: PropTypes.number,
    str: PropTypes.number,
    dex: PropTypes.number,
    con: PropTypes.number,
    int: PropTypes.number,
    wisdom: PropTypes.number,
    cha: PropTypes.number,
    firebaseKey: PropTypes.string,
    isDead: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CharacterCard;
