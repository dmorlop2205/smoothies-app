import NavComponent from '../components/NavComponent'
import TrendingComponent from '../components/TrendingComponent'
import SuggestedComponent from '../components/SuggestedComponent'
import StoriesComponent from '../components/StoriesComponent'
import FiltersComponent from '../components/FiltersComponent'
import PostComponent from '../components/PostComponent'

import './Feed.css';

function Feed() {
  return (
    <>
        <NavComponent></NavComponent>
        <section className="wrapper">
            <div className="right-wrapper">
                <section className="right-content">
                    <TrendingComponent></TrendingComponent>
                    <SuggestedComponent></SuggestedComponent>
                </section>
            </div>
            <div className="left-wrapper">
                <section className="left-content">
                    <StoriesComponent></StoriesComponent>
                    <FiltersComponent></FiltersComponent>
                    <PostComponent></PostComponent>
                </section>
            </div>
        </section>
    </>
  )
}

export default Feed
