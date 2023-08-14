import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/text-to-image.module.css';
import { validateAuthToken } from '../../utils/validateAuthToken';
import TextToImageFlow1 from "./TextToImageFlow1"
import FinalVersion from "./FinalVersion";
import SaveWork from './SaveWork';


function TextToImageController() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [finalVersion, setFinalVersion] = useState(null);
  console.log("TTI render");


  const goToNextStep = () => {
    setStep(step + 1);
  }

  let currentStep;

  switch (step) {
    case 0:
      currentStep =
        <div className={`${styles.card} ${styles.glass}`}>
          <h2>Text to Image</h2>
          <div className={styles.splashSubtitle}>
            Use your imagination
          </div>
          <p className={styles.paragraph}>
            Come up with something you can see in your mind's eye. Imaginary things can be brought to life. 
          </p>
          <div className={styles.splashSubtitle}>
            Be detailed
          </div>
          <p className={styles.paragraph}>
            DALL-E can play with sizes, art styles, and even different types of photography.
          </p>
          <div className={styles.splashSubtitle}>
            Take your time
          </div>
          <p className={styles.paragraph}>
            You get the best results when you take your time to make a good prompt.
          </p>
          <div
            onClick={() => goToNextStep()}
            className={styles.button}  
          >
            Start
          </div>
        </div>
      break;
    case 1:
      currentStep =
        <TextToImageFlow1
          onSubmit={setPrompt}
          next={goToNextStep}
        />;
      break;
    case 2:
      currentStep =
        <FinalVersion
          prompt={prompt}
          onSelect={(image) => {
            setFinalVersion(image);
            goToNextStep();
          }}
          next={goToNextStep}
        />;
      break;
    case 3:
      currentStep = 
        <SaveWork
          work={finalVersion}
        />
      break;
    default:
      currentStep = null;
  }

  useEffect(() => {
    validateAuthToken()
      .catch(error => {
        console.error(error);
        navigate('/sign-in', { state: {
          notification: 'Sign in to start creating genart',
          next: '/create'
        }});
      })
  }, []);

  return (
    <div className={styles.content}>
      {currentStep}
    </div>
  );

}

export default TextToImageController;