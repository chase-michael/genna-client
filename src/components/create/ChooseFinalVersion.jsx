import { getImageGenerations } from "../../utils/getImageGenerations";

 function ChooseFinalVersion({ prompt }) {
  try {
    const result = getImageGenerations(prompt);
  } catch (error) {
    console.log(error);
  }

  return <>
  {prompt}
  </>;
}

export default ChooseFinalVersion;
