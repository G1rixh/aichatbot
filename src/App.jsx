import React, { createContext, useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'

export const ThemeContext = createContext(null)

const App = () => {
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <Sidebar />
        <Main />
      </div>
    </ThemeContext.Provider>
  );
}

export default App