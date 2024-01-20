import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCampaign, updateCampaign } from '../../api/campaignData';
import { uploadFileToStorage } from '../../api/characterData';

const initialState = {
  image: '',
  name: '',
};

function CampaignForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [uploadProgress, setUploadProgress] = useState(0); // Optional: for upload progress
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length) {
      setImageFile(files[0]);
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formInput.image;

    if (imageFile) {
      try {
        setUploadProgress(0);
        imageUrl = await uploadFileToStorage(user.uid, imageFile, setUploadProgress);
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }

    const payload = { ...formInput, image: imageUrl, uid: user.uid };
    if (obj.firebaseKey) {
      await updateCampaign(payload);
      router.push('/campaigns/');
    } else {
      createCampaign(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCampaign(patchPayload).then(() => {
          router.push('/campaigns/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Campaign</h1>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInputImage" label="Campaign Image" className="mb-3">
        <Form.Control
          type="file"
          name="image"
          onChange={handleChange}
          required={!obj.firebaseKey}
        />
        {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Campaign</Button>
    </Form>
  );
}

CampaignForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CampaignForm.defaultProps = {
  obj: initialState,
};

export default CampaignForm;
