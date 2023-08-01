import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/tool-splash-screen.module.css';
import style from '../../../styles/create-tool.module.css';
import ToolSplashScreen from "../ToolSplashScreen";
import TextToImageStep1 from "./TextToImageStep1"
import ChooseFinalVersion from "../ChooseFinalVersion";
import openAIlogo from '../../../icons/openAI.svg';
import ToolContainer from '../ToolContainer';
import { validateAuthToken } from '../../../utils/validateAuthToken';


function TextToImage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [finalVersion, setFinalVersion] = useState(null);

  const goToNextStep = () => {
    setStep(step + 1);
  }

  const goToPrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  let currentStep;
  let progressPercentageAsNumber;

  switch (step) {
    case 0:
      currentStep =
        <ToolSplashScreen
          next={goToNextStep}
        >
          <div className={styles.subtitle}>
            USE YOUR IMAGINATION
          </div>
          <p className={styles.paragraph}>
            Come up with something you can only see in your mind's eye. Imaginary things can be brought to life. 
          </p>
          <div className={styles.subtitle}>
            BE DETAILED
          </div>
          <p className={styles.paragraph}>
            DALL-E can play with sizes, art styles, and even different types of photography.
          </p>
          <div className={styles.subtitle}>
            TAKE YOUR TIME
          </div>
          <p className={styles.paragraph}>
            The best images are generated when you take your time to make a good prompt.
          </p>
        </ToolSplashScreen>
        progressPercentageAsNumber = 0;
      break;
    case 1:
      currentStep =
        <TextToImageStep1
          onSubmit={setPrompt}
          next={goToNextStep}
        />;
        progressPercentageAsNumber = 0.33;
      break;
    case 2:
      currentStep =
        <ChooseFinalVersion
          prompt={prompt}
          onSelect={setFinalVersion}
          next={goToNextStep}
        />;
        progressPercentageAsNumber = 0.66;
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
    <div className={style.createTool}>
      <ToolContainer
        icon={openAIlogo}
        label={'Text to Image'}
        fillPercentageAsNumber={progressPercentageAsNumber}
      >
        {currentStep}
      </ToolContainer>
    </div>
  );

}

export default TextToImage;