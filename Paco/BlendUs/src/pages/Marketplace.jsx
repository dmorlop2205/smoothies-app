import { Link } from 'react-router-dom'
import NavComponent from '../components/NavComponent'
import TagFilter from '../components/TagFilter'
import './Marketplace.css'

function Marketplace() {
  return (
    <section className="marketplace-wrapper">
      <NavComponent></NavComponent>
      <div className="marketplace-header">
        <div className="header-title">
          <Link to="/feed" className="back">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>
          <h2 className='title'>Marketplace</h2>
        </div>
        <p className="subtitle">Discover amazing smoothies tools from creators around the world.</p>
      </div>
      <section className="products-grid">
          <Link to="/product" className="product-card">
            <img src="public/assets/smoothie.avif" className="product-image"/>

            <div className="product-content">
                <span className="product-category">
                    Kitchen tools
                </span>

                <h3 className="product-title">
                    Turbo Blender
                </h3>

                <p className="product-description">
                    The true power of Turbo Blender lies in its ability to effortlessly crush even the toughest ingredients.
                </p>

                <div className="product-rating">
                    <div className="stars">
                        {'★★★★★'}
                    </div>

                    <span className="rating-text">
                        4.5 (200)
                    </span>
                </div>

                <div className="product-footer">
                    <span className="product-price">
                        € 19.99
                    </span>

                    <button className="add-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                        <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                        </svg>

                        Get it!
                    </button>
                </div>
            </div>
        </Link>    
      </section>
    </section>
  )
}

export default Marketplace
