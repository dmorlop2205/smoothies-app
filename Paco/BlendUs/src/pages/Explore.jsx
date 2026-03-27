import NavComponent from '../components/NavComponent'
import TagFilter from '../components/TagFilter'
import './Explore.css'

function Explore() {
  return (
    <section className="explore-wrapper">
      <NavComponent></NavComponent>
      <div className='filter-search'>
        <span className="search">
          <svg className="search-icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9604 11.4802C19.9604 13.8094 19.0227 15.9176 17.5019 17.4512C16.9332 18.0247 16.2834 18.5173 15.5716 18.9102C14.3594 19.5793 12.9658 19.9604 11.4802 19.9604C6.79672 19.9604 3 16.1637 3 11.4802C3 6.79672 6.79672 3 11.4802 3C16.1637 3 19.9604 6.79672 19.9604 11.4802Z" stroke="#6B7280" stroke-width="1"/>
            <path d="M18.1553 18.1553L21.8871 21.8871" stroke="#6B7280" stroke-width="1" stroke-linecap="round"/>
          </svg>
        </span>
        <span className="filter">
          <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B7280">
            <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"/>
          </svg>
        </span>
        <input type="text" className="search-input" placeholder="Search smoothies, tags, categories...">
        </input>
      </div>
      <TagFilter></TagFilter>
      <section className="posts-grid">
        <div className="grid">
          <img src="assets/smoothie.avif" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 

        </div>
        <div className="grid">
          <img src="assets/smoothie2.jpg" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 
        </div>
        <div className="grid">
          <img src="assets/smoothie3.jpg" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 
        </div>
        <div className="grid">
          <img src="assets/smoothie4.jpg" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 
        </div>
        <div className="grid">
          <img src="assets/smoothie5.jpg" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 
        </div>
        <div className="grid">
          <img src="assets/smoothie6.jpg" alt="" />
          <div class="overlay">
            <h4 className="title">
              Tropical Sunrise Boost
            </h4>
            <div className="likes-comments">
              <span class="likes">123 ❤️</span>
              <div className="comments">2 💬</div>
            </div>
          </div> 
        </div>
      </section>
    </section>
  )
}

export default Explore
