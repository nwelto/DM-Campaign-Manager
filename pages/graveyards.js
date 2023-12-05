import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getGraveyard } from '../api/graveData';
import GraveyardCard from '../components/GraveyardCard';

function ShowGraveyard() {
  const [graveyards, setGraveyard] = useState([]);

  const { user } = useAuth();

  const getAllGraveyard = () => {
    getGraveyard(user.uid).then((data) => {
      console.warn('Fetched Graveyard Data:', data);
      setGraveyard(data);
    });
  };

  useEffect(() => {
    getAllGraveyard();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {graveyards.map((graveyard) => (
          <GraveyardCard key={graveyard.firebaseKey} graveyardObj={graveyard} onUpdate={getAllGraveyard} />
        ))}
      </div>

    </div>
  );
}

export default ShowGraveyard;
