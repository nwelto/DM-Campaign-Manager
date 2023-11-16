import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacter } from '../../../api/characterData';
import CharacterForm from '../../../components/forms/CharacterForm';

export default function EditCharacter() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CharacterForm obj={editItem} />);
}
