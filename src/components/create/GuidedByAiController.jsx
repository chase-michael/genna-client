import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/text-to-image.module.css';
import { validateAuthToken } from '../../utils/validateAuthToken';
import FinalVersion from "./FinalVersion";
import { getGuidedByAiOptions } from '../../utils/getGuidedByAiOptions';
import Loading from '../Loading';
import GuidedByAiChoice from './GuidedByAiChoice';
import SaveWork from './SaveWork';
import GuidedByAiFinalPrompt from './GuidedByAiFinalPrompt';

function GuidedByAiController() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [promptBuilder, setPromptBuilder] = useState([]);
  const [gptResponse, setGptResponse] = useState(null);
  const [finalVersion, setFinalVersion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    goToNextStep()
    getGuidedByAiOptions()
      .then(response => {
        const responseObject = JSON.parse(response.choices[0].message.content);
        // const responseObject = JSON.parse(response);
        setGptResponse(responseObject);
        goToNextStep();
      })
      .catch(error => console.log(error));
  }

  const goToNextStep = () => {
    setStep(step + 1);
  }

  const goToPrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  let currentStep;

  switch (step) {
    case 0:
      currentStep =
        <div className={`${styles.card} ${styles.glass}`}>
          <h2>Guided by AI</h2>
          <p className={styles.paragraph}>
            Unfold the prompt to your next masterpiece through a guided selection process powered by OpenAI's GPT-4.
          </p>
          <div
            onClick={handleStart}
            className={styles.button}  
          >
            Start
          </div>
        </div>
      break;
    case 1:
      currentStep =
        gptResponse ? (
          <GuidedByAiChoice
            currentPrompt={promptBuilder.join(' ')}
            stepNumber={step}
            category="a subject"
            options={gptResponse.Subject}
            onSelect={(selection) => {
              setPromptBuilder(promptBuilder => [...promptBuilder, selection])
              goToNextStep();
            }}
            previous={() => {
              setPromptBuilder(promptBuilder.toSpliced(promptBuilder.length - 1));
              goToPrevStep();
            }}
          />
        ) : (
          <Loading
            message="Generating ideas... please wait a moment"
          />
        );
      break;
    case 2:
      currentStep =
        <GuidedByAiChoice
          currentPrompt={promptBuilder}
          stepNumber={step}
          category="an action"
          options={gptResponse.Action}
          onSelect={(selection) => {
            setPromptBuilder(promptBuilder => [...promptBuilder, selection])
            goToNextStep();
          }}
          previous={() => {
            setPromptBuilder(promptBuilder.toSpliced(promptBuilder.length - 1));
            goToPrevStep();
          }}
        />
      break;
    case 3:
      currentStep =
        <GuidedByAiChoice
          currentPrompt={promptBuilder}
          stepNumber={step}
          category="an environment"
          options={gptResponse.Environment}
          onSelect={(selection) => {
            setPromptBuilder(promptBuilder => [...promptBuilder, selection])
            goToNextStep();
          }}
          previous={() => {
            setPromptBuilder(promptBuilder.toSpliced(promptBuilder.length - 1));
            goToPrevStep();
          }}
        />
      break;
    case 4:
      currentStep =
        <GuidedByAiChoice
          currentPrompt={promptBuilder}
          stepNumber={step}
          category="an art style"
          options={gptResponse.Style}
          onSelect={(selection) => {
            setPromptBuilder(promptBuilder => [...promptBuilder, selection])
            goToNextStep();
          }}
          previous={() => {
            setPromptBuilder(promptBuilder.toSpliced(promptBuilder.length - 1));
            goToPrevStep();
          }}
        />
      break;
    case 5:
      currentStep =
        <GuidedByAiChoice
          currentPrompt={promptBuilder}
          stepNumber={step}
          category="a perspective"
          options={gptResponse.Perspective}
          onSelect={(selection) => {
            setPromptBuilder(promptBuilder => [...promptBuilder, selection])
            goToNextStep();
          }}
          previous={() => {
            setPromptBuilder(promptBuilder.toSpliced(promptBuilder.length - 1));
            goToPrevStep();
          }}
        />
      break;
    case 6:
      currentStep = 
        <GuidedByAiFinalPrompt
          prompt={promptBuilder}
          restart={() => {
            setPromptBuilder([]);
            setStep(1);
          }}
          finish={goToNextStep}
        />
      break;
    case 7:
      currentStep = 
        <FinalVersion
          prompt={promptBuilder}
          onSelect={(image) => {
            setFinalVersion(image);
            goToNextStep();
          }}
          next={goToNextStep}
        />;
      break;
    case 8:
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

export default GuidedByAiController;