import { useState, useEffect } from 'react'
import '../App.css'

// import axios from 'axios'

function App() {

  const [wordList, setWordList] = useState([])
  // const [typedWordList, setTypedWordList] = useState([])
  const [typedWordsString, setTypedWordsString] = useState('')
  // const [currentWord, setCurrentWord] = useState('')

  async function getWords() {
    // try {
    //   const response = await axios.get('http://localhost/api/keeptyping')
    //   console.log(response)
    // } catch(error) {
    //   console.log(error)
    // }
    fetch('/english.json')
      .then((response) => response.json())
      .then((json) => setWordList(json))
      .catch((error) => console.error('Error fetching data: ', error));

    function handleKeyPress(event: KeyboardEvent) {
      const { key, code } = event;
      console.log(key, code);
      
      if (code === 'Enter') {
        setTypedWordsString('')
      } else if (code === 'Backspace') {
        setTypedWordsString((prev) => prev.slice(0, -1))
      } else {
        setTypedWordsString((prev) => prev + key)
      }
    }

    function handleBackspace(event: KeyboardEvent) {
      const { code } = event;
      
      if (code === 'Backspace') setTypedWordsString((prev) => prev.slice(0, -1))
    }

    
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", handleBackspace);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", handleBackspace);
    }
  }

  useEffect(() => {
    console.log('hello world')
    getWords()
  }, [])

  return (
    <>
      <h1>keeptyping</h1>
      {/* {wordList.map((word: string) => (
        <span key={word}>
          {word}{' '}
        </span>
      ))} */}
      <div className='wordList'>{wordList.join(' ')}</div>
      <div className='typedWordList'>{typedWordsString}</div>
    </>
  )
}

export default App
