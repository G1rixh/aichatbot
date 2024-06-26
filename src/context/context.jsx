import { createContext, useState } from "react";
import run from "../conf/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevprompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayText = async (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const processResponse = (response) => {
    // Replace markdown syntax with appropriate HTML tags
    let formattedResponse = response
      .replace(/^### (.+)$/gm, "<h3>$1</h3>") // Replace ### with <h3> tags
      .replace(/^## (.+)$/gm, "<h2>$1</h2>") // Replace ## with <h2> tags
      .replace(/^# (.+)$/gm, "<h1>$1</h1>") // Replace # with <h1> tags
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>") // Replace **bold** with <b> tags
      .replace(/\*([^*]+)\*/g, "<li>$1</li>") // Replace *text* with <li> tags
      .replace(/\n\|---\|/g, "\n") // Remove table headers separator line
      .replace(
        /\n\|([^|]+)\|([^|]+)\|([^|]+)\|/g,
        "<tr><td>$1</td><td>$2</td><td>$3</td></tr>"
      ) // Format table rows
      .replace(
        /\n\|([^|]+)\|([^|]+)\|([^|]+)\|\n/g,
        "<tr><th>$1</th><th>$2</th><th>$3</th></tr>"
      ); // Format table headers

    // Split response by ``` to differentiate between code and text
    const responseArray = formattedResponse.split("```");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        // Explanation part
        newResponse += `<p>${responseArray[i].split("\n").join("<br/>")}</p>`;
      } else {
        // Code part
        newResponse += `<pre style="background-color: #2d2929; color: white; padding: 20px; border-radius: 5px;"><code>${responseArray[i]}</code></pre>`;
      }
    }

    let newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayText(i, nextWord + " ");
    }
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response
    if (prompt !== undefined) {
      response = await run(prompt)
      setRecentPrompt(prompt)
    } else {
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response = await run(input)
    }
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
    onCardClick,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
