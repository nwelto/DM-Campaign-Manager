/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewCharacterDetails } from '../../api/mergedData';

export default function ViewCharacters() {
  const [characterDetails, setCharacterDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCharacterDetails(firebaseKey).then(setCharacterDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={characterDetails.image} alt={characterDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{characterDetails.name}</h5>
        <h6>Campaign: {characterDetails.campaignObj?.name}</h6>
        <h6>Class: {characterDetails.class}</h6>
        <h6>AC: {characterDetails.ac}</h6>
        <h6>HP: {characterDetails.hp}</h6>
        <div className="saves-section">
          <h5>Saving Throws</h5>
          <h6>STR: {characterDetails.str}</h6>
          <h6>DEX: {characterDetails.dex}</h6>
          <h6>CON: {characterDetails.con}</h6>
          <h6>INT: {characterDetails.int}</h6>
          <h6>WIS: {characterDetails.wisdom}</h6>
          <h6>CHA: {characterDetails.cha}</h6>
        </div>
        <h6>Notes: {characterDetails.notes}</h6>
      </div>
    </div>
  );
}
