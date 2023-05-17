import axios from "axios";

async function validateSignUpInputs(displayName, email, password) {

    const DISPLAY_NAME_UNDEFINED = 'Choose a display name';
    const DISPLAY_NAME_INVALID_LENGTH = 'Display name must be between 3-25 characters';
    const DISPLAY_NAME_IN_USE = 'Darn, someone already took that one';
    const EMAIL_UNDEFINED = 'Email address required';
    const EMAIL_INVALID = 'Provide a valid email address';
    const EMAIL_IN_USE = 'Email already in use';
    const PASSWORD_UNDEFINED = 'Choose a password';
    const PASSWORD_INVALID_LENGTH = 'Password must be at least 8 characters';
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const emailIsValid = (email) => {
        return EMAIL_REGEX.test(email);
    }

    let errors = [];

    if (!displayName) {
        errors.push({ displayName: DISPLAY_NAME_UNDEFINED });
    } else {
        if (displayName.length < 3 || displayName.length > 25) {
            errors.push({ displayName: DISPLAY_NAME_INVALID_LENGTH });
        } else {
            try {
                const response =
                    await axios.post('http://localhost:3005/auth/displayNameInUse', { displayName });

                    if (response.data.inUse) {
                        errors.push ({ displayName: DISPLAY_NAME_IN_USE })
                    }
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (!email) {
        errors.push({ email: EMAIL_UNDEFINED });
    } else {
        if (!emailIsValid(email)) {
            errors.push({ email: EMAIL_INVALID });
        } else {
            try {
                const response =
                    await axios.post('http://localhost:3005/auth/emailInUse', { email });

                    if (response.data.inUse) {
                        errors.push ({ email: EMAIL_IN_USE })
                    }
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (!password) {
        errors.push({ password: PASSWORD_UNDEFINED });
    } else {
        if (password.length < 8) {
            errors.push ({ password: PASSWORD_INVALID_LENGTH })
        }
    }

    return errors;
}

export default validateSignUpInputs;