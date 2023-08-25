import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';
import { fetchWorksByArtist } from '../utils/fetchWorksByArtist';
import { AuthContext } from '../contexts/AuthContext';
import { validateAuthToken } from '../utils/validateAuthToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UpdateProfileImageInput from './UpdateProfileImageInput';
import { validateUpdateFormInputs } from '../utils/validateUpdateFormInputs';
import { updateProfileImage } from '../utils/updateProfileImage';
import { updateProfileInformation } from '../utils/updateProfileInformation';

function Dashboard() {
  const { userData, signOut, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artistData, setArtistData] = useState(userData);
  const [works, setWorks] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [updatedInformation, setUpdatedInformation] = useState({
    displayName: userData && userData.displayName,
    bio: userData && userData.bio,
    slug: userData && userData.slug,
    profileImage: undefined
  });
  const [invalidValues, setInvalidValues] = useState([]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const result = await validateUpdateFormInputs(artistData, updatedInformation);

      // If there are errors, show errors
      if (result.length > 0) {
        setInvalidValues(result);
        return;
      }

      // If there is a new profile image, update it.
      if (updatedInformation.profileImage) {
        const uploadResult = await updateProfileImage(updatedInformation.profileImage);
      }
    
      const { displayName, bio, slug } = updatedInformation;
      const updateResult = await updateProfileInformation(displayName, bio, slug)
      signIn(updateResult.newAuthToken);
      setEditProfile(false);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    validateAuthToken()
      .then(() => {
        setArtistData(userData);
        setUpdatedInformation({
          displayName: userData && userData.displayName,
          bio: userData && userData.bio,
          slug: userData && userData.slug,
          profileImage: undefined
        });
      })
      .catch(error => {
        console.error(error);
        navigate('/');
      })
  }, [userData]);
  

  useEffect(() => {
    if (!userData) return;
    fetchWorksByArtist(userData._id)
      .then(response => setWorks(response))
      .catch(error => console.log(error));
  }, [userData]);

  return (
    <div className={styles.content}>

      {editProfile && (
        <div className={styles.modal}>
          <form
            className={`${styles.form} ${styles.caForm}`}
            onSubmit={handleUpdate}
            noValidate  
          >
            <div className={styles.formContent}>
              <div>
                <UpdateProfileImageInput
                  currentProfileImage={artistData && artistData.profileImage}
                  onChange={(img) =>
                    setUpdatedInformation({ ...updatedInformation, profileImage: img })
                  }
                />
                {invalidValues.find(error => error.profileImage) && 
                  <div className={styles.error}>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    {invalidValues.find(error => error.profileImage).profileImage}
                  </div>
                }
              </div>

              <div className={styles.nameInput}>
                <label htmlFor="displayName">Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={updatedInformation.displayName}
                  onChange={(e) => {
                    setUpdatedInformation({ ...updatedInformation, displayName: e.target.value});
                  }}
                />
                {invalidValues.find(error => error.displayName) && (
                  <div className={styles.nameError}>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    {invalidValues.find(error => error.displayName).displayName}
                  </div>
                )}
              </div>
            </div>

            <label htmlFor="bio">Bio</label>
                <textarea
                  className={styles.bioInput}
                  type="text"
                  id="bio"
                  value={updatedInformation.bio}
                  onChange={(e) =>
                    setUpdatedInformation({ ...updatedInformation, bio: e.target.value })
                  }
                />
                {invalidValues.find(error => error.bio) && 
                  <div className={styles.error}>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    {invalidValues.find(error => error.bio).bio}
                  </div>
                }


                <div className={styles.slugRow}>
                  <label htmlFor="slug">genna.one /</label>
                  <input
                    type="text"
                    id="slug"
                    value={updatedInformation.slug}
                    onChange={(e) =>
                      setUpdatedInformation({ ...updatedInformation, slug: e.target.value })
                    }
                  />
                </div>
                {invalidValues.find(error => error.slug) && 
                  <div className={styles.error}>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    {invalidValues.find(error => error.slug).slug}
                  </div>
                }

            <div className={styles.modalButtonRow}>
              <button className={`${styles.button} ${styles.caSubmit}`} type="submit">
                Update
              </button>
              <div
                className={styles.cancel}
                onClick={() => {
                  setEditProfile(false);
                  setUpdatedInformation({
                    displayName: userData.displayName,
                    bio: userData.bio,
                    slug: userData.slug,
                    profileImage: undefined
                  });
                  setInvalidValues([]);
                }}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}


      {artistData && (
        <>
          <div className={styles.contentCard}>
            <div className={styles.artistHeader}>
              <div className={styles.profileImage}>
                <img src={artistData.profileImage} alt="" />
              </div>
              <div className={styles.headerText}>
                <div className={styles.artistName}>{artistData.displayName}</div>
                <div className={styles.bio}>{artistData.bio ? artistData.bio : `${artistData.displayName} hasn't written a bio yet.` }</div>
              </div>
            </div>
            <div className={styles.buttonRow}>
              <div
                className={styles.button}
                onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </div>
              <Link
                to={userData && `/artist/${userData.slug}`}
                className={styles.button}
              >
                View as Public
              </Link>
            </div>
          </div>

          {works && (
            <div className={styles.contentCard}>
              <div className={styles.sectionHeader}>
                Your Generated Art
              </div>
              <div className={styles.grid}>
                <Link 
                  to={'https://genna.one/create'}
                  className={`${styles.card} ${styles[`size-1`]} ${styles.button} ${styles.createIcon}`}
                >
                  +
                </Link>
                {works.toReversed().map((work, index) => (
                  <Link 
                    to={`https://genna.one/work/${work._id}`}
                    key={index} 
                    className={`${styles.card} ${styles[`size-1`]}`}
                    style={{backgroundImage: `url(${work.url})`}}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div
            className={`${styles.button} ${styles.signOutButton}`}
            onClick={() => {
              signOut();
              navigate('/');
            }}
          >
            Sign Out
          </div>

        </>
      )}
    </div>
  );
}

export default Dashboard;
