import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCharacter, updateCharacters, uploadFileToStorage } from '../../api/characterData';
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

  const handleScroll = (e) => {
    e.target.blur();
  };

  useEffect(() => {
    getCampaign(user.uid).then(setCampaigns);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumericField = ['ac', 'hp', 'str', 'dex', 'con', 'int', 'wisdom', 'cha', 'passive_perception', 'investigation', 'insight'].includes(name);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: isNumericField ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    if (typeof window !== 'undefined' && e.target.files[0]) {
      setFormInput((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numeric values just before submission
    const numericFields = ['ac', 'hp', 'str', 'dex', 'con', 'int', 'wisdom', 'cha', 'passive_perception', 'investigation', 'insight'];
    const convertedInput = { ...formInput };
    numericFields.forEach((field) => {
      if (convertedInput[field]) {
        convertedInput[field] = Number(convertedInput[field]);
      }
    });

    // Handle image upload
    if (typeof window !== 'undefined' && convertedInput.image && convertedInput.image instanceof File) {
      try {
        setUploadProgress(0); // Reset progress on new upload
        const imageUrl = await uploadFileToStorage(user.uid, convertedInput.image, setUploadProgress);
        convertedInput.image = imageUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
        return; // Exit the function if upload fails
      }
    }

    // Create or update the character with converted input
    const payload = { ...convertedInput, uid: user.uid };
    if (obj.firebaseKey) {
      updateCharacters(payload).then(() => router.back());
    } else {
      createCharacter(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCharacters(patchPayload).then(() => router.back());
      });
    }
  };

  const dndClasses = [
    'Artificer', 'Barbarian', 'Bard', 'Blood Hunter', 'Cleric', 'Druid',
    'Fighter', 'Gunslinger', 'Monk', 'Paladin', 'Ranger', 'Rogue',
    'Sorcerer', 'Warlock', 'Wizard',
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Character</h1>

      <FloatingLabel controlId="floatingInputImage" label="Character Image" className="mb-3">
        <Form.Control
          type="file"
          aria-label="Upload an image"
          name="image"
          onChange={handleImageChange}
          required={!obj.firebaseKey}
        />
        {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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
          onWheel={handleScroll}
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

      <FloatingLabel controlId="floatingSelect" label="Campaign" className="mb-3">
        <Form.Select
          aria-label="Campaign"
          name="campaign_id"
          onChange={handleChange}
          value={formInput.campaign_id}
        >
          <option value="">Select a Campaign</option>
          {campaigns.map((campaign) => (
            <option key={campaign.firebaseKey} value={campaign.firebaseKey}>
              {campaign.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Submit button */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Character</Button>
    </Form>
  );
}

CharacterForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(typeof window !== 'undefined' && window.File)]),
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
    campaign_id: PropTypes.string,
  }),
};

CharacterForm.defaultProps = {
  obj: initialState,
};

export default CharacterForm;
