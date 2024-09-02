import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const url = `https://official-joke-api.appspot.com/jokes/random/`
  const [jokeData, setJokeData] = useState();
  const [opacity, setOpacity] = useState(0);
  const [style, setStyle] = useState('light');

  const toggleOpacity = () => {
    setOpacity(prevOpacity => prevOpacity === 0 ? 1 : 0)
  }


  const changeStyle = () => {
    setStyle((prevStyle) => prevStyle === 'light' ? 'dark' : 'light');
  }

  async function getAllJokes() {
    let res = await fetch(url)
    let data = await res.json()
    console.log(data);
    setJokeData(data);
    setOpacity(0);
  }

  useEffect(() => {
    getAllJokes();
  }, []);

  console.log("Data: ", jokeData);

  return (
    <>
      <div className={style}>
        <h1>Joke.API</h1>
        <h2>{jokeData?.setup}</h2>
        <button onClick={toggleOpacity}>Show Answer</button>
        <h3 style={{ opacity: opacity }}>{jokeData?.punchline}</h3>
        <button onClick={() => getAllJokes()}>Get New Random Joke</button>
        <button onClick={changeStyle}>Light / Dark Mode</button>
      </div>


    </>
  )
}

export default App
