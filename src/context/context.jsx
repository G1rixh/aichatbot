import { createContext, useState } from "react";
import run from "../conf/gemini";

export const Context = createContext()

const ContextProvider = (props) => {

  const[input, setInput] = useState("")
  const[recentPrompt, setRecentPrompt] = useState("")
  const[prevprompts, setPrevPrompts] = useState([])
  const[showResult, setShowResult] = useState(false)
  const[loading, setLoading] = useState(false)
  const[resultData, setResultData] = useState("")

  const delayText = async (index, nextword) => {
    setTimeout(() => {
      setResultData(prev => prev+nextword)
    }, 75*index)
  }


   const processResponse = (response) => {
     const responseArray = response.split("```");
     let newResponse = "";

     for (let i = 0; i < responseArray.length; i++) {
       if (i % 2 === 0) {
         // Explanation part
         newResponse += `<p>${responseArray[i].split("\n").join("<br/>")}</p>`;
       } else {
         // Code part
         newResponse += `<pre><code>${responseArray[i]}</code></pre>`;
       }
     }

     let newResponseArray = newResponse.split(" ");
     for (let i = 0; i < newResponseArray.length; i++) {
       const nextWord = newResponseArray[i];
       delayText(i, nextWord + " ");
     }
   };

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await run(input);
    processResponse(response);
    setLoading(false);
    setInput("");
  };

  const onCardClick = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    const response = await run(prompt);
    processResponse(response);
    setLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevprompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
    onCardClick
  };


  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider