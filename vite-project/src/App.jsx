import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const [keyValue, setKeyValue] = useState()

  const [opacity, setOpacity] = useState(0);
  const toggleOpacity = () => {
    setOpacity(prevOpacity => prevOpacity === 0 ? 1 : 0)
  }

  const [style, setStyle] = useState('light');
  const changeStyle = () => {
    setStyle((prevStyle) => prevStyle === 'light' ? 'dark' : 'light');
  }


  const url = `https://official-joke-api.appspot.com/jokes/random/`
  const [jokeData, setJokeData] = useState();
  async function getAllJokes() {
    let res = await fetch(url)
    let data = await res.json()
    setJokeData(data);
    setOpacity(0);
  }

  const [category, setCategory] = useState();
  const catUrl = `https://official-joke-api.appspot.com/types`
  async function getCategory() {
    let res = await fetch(catUrl);
    let data = await res.json();
    setCategory(data);
    
  }

  useEffect(() => {
    getAllJokes();
    getCategory();
  }, []);

  const [randomCatJoke, setRandomCatJoke] = useState();
  async function categoryJoke(){
    const categoryJokeUrl = `https://official-joke-api.appspot.com/${keyValue}/random`
    let res = await fetch(categoryJokeUrl);
    let data = await res.json();
    setRandomCatJoke(data);
    console.log(randomCatJoke);
    
  }

  return (
    <>
      <div className={style}>
        <h1>Joke.API</h1>
        <h2>{jokeData?.setup}</h2>
        <button onClick={toggleOpacity}>Show Answer</button>
        <h3 style={{ opacity: opacity }}>{jokeData?.punchline}</h3>
        <button onClick={() => getAllJokes()}>Get New Random Joke</button>
        <button onClick={changeStyle}>Light / Dark Mode</button>

        <h2 className={style.categoryHeader}>Joke by Category (W.I.P.)</h2>
        <div>
          <select onChange={(e) => {e.target.value; console.log(e.target.value); setKeyValue(e.target.value);
          }} name="" id="">
            {category && category.map((key) => {
              return (
                <option value={key}>{key}</option>
              )
            })};
          </select>
          <h2>{keyValue}</h2>
          <button onClick={() => categoryJoke()}>Cat joke</button>
        </div>
        <h2></h2>
      </div>


    </>
  )
}

export default App
