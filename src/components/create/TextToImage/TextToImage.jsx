import { useState } from 'react';
import styles from '../../../styles/tool-splash-screen.module.css';
import style from '../../../styles/create-tool.module.css';
import ToolHeader from "../ToolHeader";
import ToolProgressBar from '../ToolProgressBar';
import ToolSplashScreen from "../ToolSplashScreen";
import TextToImageStep1 from "./TextToImageStep1"
import ChooseFinalVersion from "../ChooseFinalVersion";
import openAIlogo from '../../../icons/openAI.svg';
import ToolContainer from '../ToolContainer';


function TextToImage() {
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
        progressPercentageAsNumber = 0.1;
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

  return (
    <div className={style.createTool}>
      <ToolHeader
        icon={openAIlogo}
        label={'Text to Image'}
      />
      <ToolProgressBar 
        fillPercentageAsNumber={progressPercentageAsNumber}
      />
      <ToolContainer>
        {currentStep}
      </ToolContainer>
    </div>
  );

}

export default TextToImage;