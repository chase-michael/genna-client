import axios from 'axios';

export async function validateUpdateFormInputs(artistData, userInputs) {

  const DISPLAY_NAME_INVALID_LENGTH = 'Display name must be between 3-25 characters';
  const DISPLAY_NAME_IN_USE = 'Darn, someone already took that one';
  const BIO_INVALID_LENGTH = 'Bio length must be between 1-60 characters';
  const SLUG_INVALID = 'Slug must be between 3-15 lowercase letters, numbers and hyphens';
  const SLUG_IN_USE = 'Darn, someone already took that one';
  const SLUG_REGEX = /^[a-z0-9-]+$/;

  const slugIsValid = (slug) => {
      return SLUG_REGEX.test(slug);
  }

  let errors = [];

  if (artistData.displayName !== userInputs.displayName) {
    if (userInputs.displayName.length < 3 || userInputs.displayName.length > 25) {
      errors.push({ displayName: DISPLAY_NAME_INVALID_LENGTH });
    } else {
      try {
        const nameToCheck = userInputs.displayName;
        const response = await axios.get('http://localhost:3005/auth/displayNameInUse', { params: { displayName: nameToCheck } });
        if (response.data.inUse) {
          errors.push ({ displayName: DISPLAY_NAME_IN_USE })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (artistData.bio !== userInputs.bio) {
    if (userInputs.bio.length < 1 || userInputs.bio.length > 60) {
      errors.push({ bio: BIO_INVALID_LENGTH });
    }
  }

  if (artistData.slug !== userInputs.slug) {
    if (userInputs.slug.length < 3 || userInputs.slug.length > 15 || !slugIsValid(userInputs.slug)) {
      errors.push({ slug: SLUG_INVALID });
    } else {
      try {
        const slugToCheck = userInputs.slug;
        const response =
          await axios.get('http://localhost:3005/auth/slugInUse', { params: { slug: slugToCheck } });
          if (response.data.inUse) {
            errors.push({ slug: SLUG_IN_USE })
          }
      } catch (error) {
          console.log(error);
      }
    }
  }

  return errors;
}