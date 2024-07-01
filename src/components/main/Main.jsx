import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../../App";
import SendIcon from "@mui/icons-material/Send";

const Main = () => {
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    onSent,
    onCardClick
  } = useContext(Context);

   const {
    toggleTheme,
    theme
   } = useContext(ThemeContext)

  return (
    <div className="main">
      <div className="nav">
        <div className="switch">
          <p>{theme === "light" ? "Light Mode" : "Dark Mode"}</p>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onCardClick(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                {/* <img src={assets.compass_icon} alt="" /> */}
              </div>
              <div
                className="card"
                onClick={() =>
                  onCardClick("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                {/* <img src={assets.bulb_icon} alt="" /> */}
              </div>
              <div
                className="card"
                onClick={() =>
                  onCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                {/* <img src={assets.message_icon} alt="" /> */}
              </div>
              <div
                className="card"
                onClick={() =>
                  onCardClick("Tell me about React js and React native")
                }
              >
                <p>Tell me about React js and React native</p>
                {/* <img src={assets.code_icon} alt="" /> */}
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your prompt"
            />
            <div>
              <SendIcon className="send" color="primary" onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
