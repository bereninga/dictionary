import React, { useState } from 'react';
import './style.css';
import { wordList } from './dictionary.js'

function App() {
  const alphabetizeContent = (content) => {
    content.sort((entryA, entryB) => {
      if (entryA.word.toLowerCase() > entryB.word.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    return content;
  };

  const fullDictionary = alphabetizeContent(wordList);
  const [dictionary, updateDictionary] = useState(fullDictionary);
  const [colorTheme, switchTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');

  const displayEntries = (entries) => {
    const htmlEntries = entries.map( (entry, i) => {
      return (
        <div className="entry" key={i}>
          <h3 className="word">{entry.word}</h3>
          <p className="definition">
            {entry.definition}
          </p>
        </div>
      )
    });
    return htmlEntries;
  }

  function handleColorToggle() {
    switchTheme( (colorTheme === 'dark') ? 'light' : 'dark');
  }

  const handleSearchInput = e => {
    setSearchTerm(e.target.value);
    filterContent(e.target.value);
  };

  const filterContent = term => {
    const filteredList = fullDictionary.filter( entry => {
      term = term.toLowerCase();
      const word = entry.word.toLowerCase();
      const def  = entry.definition.toLowerCase();
      return word.includes(term) || def.includes(term);
    });
    updateDictionary(filteredList);
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={colorTheme}>

      <div id="top-page"></div>

      <div className="header">
        <div className="container">
          <h1>Dictionary for Developers</h1>
          <div className="switch">
              <label>
                Dark
                <input id="toggle-color" type="checkbox" onClick={handleColorToggle} />
                <span className="lever"></span>
                Light
              </label>
            </div>
          <h5>Dictionary of words that are assumed knowledge in the dev community but may be unfamiliar to new, or even seasoned, developers.</h5>
        </div>
      </div>

      <div className="container">
        <h3>Search</h3>
        <input type="text" id="search" placeholder="Search in words and definitions here" value={searchTerm} onChange={handleSearchInput} />
      </div>

      <div className="container">
        <div id="dictionary" className="row">
          {displayEntries(dictionary)}
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <p>For more information about DevDictionary, see the <a href="https://github.com/jessmear/dictionary-for-devs">github repo</a>.</p>
        </div>
      </div>

      <svg width="100" height="100" id="scroll-top" onClick={scrollToTop}>
        <rect  x="25" y="25" width="50" height="50" />
        <polyline points="35,58 50,38 65,58" />
      </svg> 
      
    </div>
  );
}

export default App;
