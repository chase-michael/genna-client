import { useState } from 'react';
import styles from '../styles/update-profile-image-form-input.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ProfileImageInput({ onChange, currentProfileImage }) {
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const FILE_TYPE_INVALID = 'Image must be JPG, PNG, or GIF';

  const validateImage = (file, width, height) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error(FILE_TYPE_INVALID);
    } else if (file.size > 5242880) {
      throw new Error('Exceeds max size of 5MB');
    } else if (width < 100 || height < 100) {
      throw new Error('Image must be at least 100 x 100 pixels');
    }
  }

  const handleImageChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const img = new Image();
      img.onload = function() {
        try {
          validateImage(file, this.width, this.height);
          let imageURL = URL.createObjectURL(e.target.files[0]);
          setProfileImage(imageURL);
          onChange(file);
        } catch (error) {
          setError(error.message);
        }
      }
      img.onerror = function() {
        setError(FILE_TYPE_INVALID)
      }
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div className={styles.ProfileImageFormInput}>
      <div className={styles.addProfilePhoto}>
        <div className={styles.imageUpload}>
          <label htmlFor={styles.profileImage}>
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : `linear-gradient(rgba(100 100 100 / 0.6), rgba(100 100 100 / 0.6)), url(${currentProfileImage})` }}
              >
              {!profileImage && <FontAwesomeIcon icon={faPen} size='1x' color='white' />}
            </div>
            <input
              type="file"
              id={"profile-image"}
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
      </div>
      {error && 
        <div className={styles.nameError}>
          <FontAwesomeIcon icon={faExclamationCircle}/>
          {error}
        </div>
      }
    </div>
  )
}

export default ProfileImageInput;