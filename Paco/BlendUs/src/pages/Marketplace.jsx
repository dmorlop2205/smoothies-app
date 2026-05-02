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
        <div className="grid">
        

        </div>
        
      </section>
    </section>
  )
}

export default Marketplace
