import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const{onSent,prevprompts,setRecentPrompt,newChat} = useContext(Context)
  
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className={`sidebar-wrapper ${extended ? "expanded" : ""}`}>
      <div className="sidebar">
        <div className="top">
          <MenuIcon
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
          />
          <div onClick={() => newChat()} className="new-chat">
            <AddIcon/>
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevprompts.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="recent-entry"
                  >
                    <ChatBubbleOutlineIcon fontSize='small' src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {/* <div className="bottom">
           <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            
            {extended ? <p>Settings</p> : null}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar