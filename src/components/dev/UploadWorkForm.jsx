import { useState } from 'react';
import axios from 'axios';

function UploadWorkForm() {
  const [workDetails, setWorkDetails] = useState({
    title: '',
    description: '',
    alt: '',
    artistId: '646e6ac6c0ba556ed4cdc51a',
    collection: 'Blobart',
    image: null,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { title, description, alt, artistId, collection, image } = workDetails;
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('alt', alt || title);
    formData.append('artistId', artistId);
    formData.append('collection', collection);
    formData.append('image', image);
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

    try {
      const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/upload/uploadWork', formData, config);
      setWorkDetails({
        title: '',
        description: '',
        alt: '',
        artistId: '646e6ac6c0ba556ed4cdc51a',
        collection: 'Blobart',
        image: null,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setWorkDetails({ ...workDetails, [id]: value });
  }

  const handleImageChange = (e) => {
    setWorkDetails({ ...workDetails, image: e.target.files[0] });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          value={workDetails.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          id="description"
          value={workDetails.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          id="alt"
          value={workDetails.alt}
          onChange={handleChange}
          placeholder="Alt Text"
        />
        <input
          type="text"
          id="artistId"
          value={workDetails.artistId}
          onChange={handleChange}
          placeholder="Artist ID"
          required
        />
        <input
          type="text"
          id="collection"
          value={workDetails.collection}
          onChange={handleChange}
          placeholder="Collection"
          required
        />
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Upload Work</button>
      </form>
    </div>
  );
}

export default UploadWorkForm;
