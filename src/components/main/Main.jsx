import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import SendIcon from "@mui/icons-material/Send";
import ExploreIcon from "@mui/icons-material/Explore";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CodeIcon from "@mui/icons-material/Code";

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


  return (
    <div className="main">
      <div className="nav">
        {/* ADD TITLE */}
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
                <ExploreIcon className="icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onCardClick("Briefly summarize this concept: HTTPS networking")
                }
              >
                <p>Briefly summarize this concept: HTTPS networking</p>
                <TipsAndUpdatesIcon className="icon" />
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
                <StickyNote2Icon className="icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onCardClick(
                    "Write a javascript program to calculate factorial of a number"
                  )
                }
              >
                <p>
                  Write a javascript program to calculate factorial of a number
                </p>
                <CodeIcon className="icon"/>
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
              <SendIcon
                className="send"
                color="primary"
                onClick={() => onSent()}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="bottom-info">
            AI may display inaccurate info, including about people, so
            double-check its responses. Your privacy and other.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
