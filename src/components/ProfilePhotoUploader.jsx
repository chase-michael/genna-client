import { useState } from 'react';
import '../styles/ProfilePhotoUploader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ProfilePhotoUploader({ onChange }) {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = URL.createObjectURL(e.target.files[0]);
            setProfileImage(img);
            onChange(img);
        }
    };

    return (
        <div className="add-profile-photo">
            <div className="image-upload">
                <label htmlFor="profile-image">
                    <div
                        className={'image-container'}
                        style={{ backgroundImage: profileImage ? `url(${profileImage})` : '' }}
                    >
                        {!profileImage && <FontAwesomeIcon icon={faPlus} size="1x" color="grey" />}
                    </div>
                </label>
                <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />
            </div>
            <div className="instructions">
                <div id="title">Add a profile photo</div>
                <div id="details">Recommended! You can update this later.</div>
            </div>
        </div>
    )
}

export default ProfilePhotoUploader;