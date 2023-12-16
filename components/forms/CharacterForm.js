import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCharacter, updateCharacters } from '../../api/characterData';
import { getCampaign } from '../../api/campaignData';

const initialState = {
  image: '',
  name: '',
  notes: '',
  class: '',
  ac: '',
  hp: '',
  str: '',
  dex: '',
  con: '',
  int: '',
  wisdom: '',
  cha: '',
  campaign_id: '',
  passive_perception: '',
  investigation: '',
  insight: '',
};

function CharacterForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [campaigns, setCampaigns] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCampaign(user.uid).then(setCampaigns);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'campaign_id') {
      setFormInput((prevState) => ({
        ...prevState,
        campaign_id: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    console.warn('handlesubmit triggered');
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCharacters(formInput).then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCharacter(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCharacters(patchPayload).then(() => {
          router.back();
        });
      });
    }
  };

  const dndClasses = [
    'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter',
    'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer',
    'Warlock', 'Wizard',
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Character</h1>

      <FloatingLabel controlId="floatingInput2" label="Character Image" className="mb-3">
        <Form.Control
          type="url"
          aria-label="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelectClass" label="Class" className="mb-3">
        <Form.Select
          aria-label="Class"
          name="class"
          onChange={handleChange}
          value={formInput.class}
          required
        >
          <option value="">Select a Class</option>
          {dndClasses.map((dndClass) => (
            <option key={dndClass} value={dndClass}>{dndClass}</option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          aria-label="name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="AC" className="mb-3">
        <Form.Control
          aria-label="ac"
          name="ac"
          type="number"
          value={formInput.ac}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="HP" className="mb-3">
        <Form.Control
          type="number"
          aria-label="hp"
          name="hp"
          value={formInput.hp}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="STR" className="mb-3">
        <Form.Control
          type="number"
          aria-label="STR"
          name="str"
          value={formInput.str}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="DEX" className="mb-3">
        <Form.Control
          type="number"
          aria-label="DEX"
          name="dex"
          value={formInput.dex}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="CON" className="mb-3">
        <Form.Control
          type="number"
          aria-label="CON"
          name="con"
          value={formInput.con}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="INT" className="mb-3">
        <Form.Control
          type="number"
          aria-label="INT"
          name="int"
          value={formInput.int}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="WIS" className="mb-3">
        <Form.Control
          type="number"
          aria-label="WIS"
          name="wisdom"
          value={formInput.wisdom}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="CHA" className="mb-3">
        <Form.Control
          type="number"
          aria-label="CHA"
          name="cha"
          value={formInput.cha}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Passive Perception" className="mb-3">
        <Form.Control
          type="number"
          aria-label="passive"
          name="passive_perception"
          value={formInput.passive_perception}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Passive Investigation" className="mb-3">
        <Form.Control
          type="number"
          aria-label="investigation"
          name="investigation"
          value={formInput.investigation}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Passive Insight" className="mb-3">
        <Form.Control
          type="number"
          aria-label="insight"
          name="insight"
          value={formInput.insight}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Notes" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Notes"
          name="notes"
          value={formInput.notes}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="campaign">
        <Form.Select
          aria-label="campaign"
          name="campaign_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.campaign_id}
          required
        >
          <option value="">Select A campaign</option>
          {
            campaigns.map((campaign) => (
              <option
                key={campaign.firebaseKey}
                value={campaign.firebaseKey}
              >
                {campaign.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Character </Button>
    </Form>
  );
}

CharacterForm.propTypes = {
  obj: PropTypes.shape({
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
    passive_perception: PropTypes.number,
    investigation: PropTypes.number,
    insight: PropTypes.number,
  }),
};

CharacterForm.defaultProps = {
  obj: initialState,
};

export default CharacterForm;
