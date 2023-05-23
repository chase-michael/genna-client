import { useState } from 'react';
import '../styles/ProfileImageFormInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ProfileImageFormInput({ onChange }) {
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
        <div className="ProfileImageFormatInput" >
            <div className="add-profile-photo">
                <div className="image-upload">
                    <label htmlFor="profile-image">
                        <div
                            className="image-container"
                            style={{ backgroundImage: profileImage ? `url(${profileImage})` : '' }}
                        >
                            {!profileImage && <FontAwesomeIcon icon={faPlus} size='1x' color='grey' />}
                        </div>
                    </label>
                    <input
                        type="file"
                        id="profile-image"
                        onChange={handleImageChange}
                        hidden
                    />
                </div>
                <div className="instructions">
                    <div id="title">Add a profile image</div>
                    <div id="details"> We need it to keep our gallery looking spiffy. You can change it later!</div>
                </div>
            </div>
            {error && 
                <div className="error">
                <FontAwesomeIcon icon={faExclamationCircle}/>
                {error}
                </div>
            }
        </div>
        
    )
}

export default ProfileImageFormInput;