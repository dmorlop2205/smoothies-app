import { useState } from 'react'

import './App.css'
import NavComponent from './components/NavComponent'
import PostComponent from './components/PostComponent'
import FiltersComponent from './components/FiltersComponent'
import StoriesComponent from './components/StoriesComponent'
import TrendingComponent from './components/TrendingComponent'
import SuggestedComponent from './components/SuggestedComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="wrapper">
        <div className="right-wrapper">
          <section className="right-content">
            <TrendingComponent></TrendingComponent>
            <SuggestedComponent></SuggestedComponent>
          </section>
        </div>
        <div className="left-wrapper">
          <section className="left-content">
            <NavComponent></NavComponent>
            <StoriesComponent></StoriesComponent>
            <FiltersComponent></FiltersComponent>
            <PostComponent></PostComponent>
          </section>
        </div>
      </section>
    </>
  )
}

export default App
