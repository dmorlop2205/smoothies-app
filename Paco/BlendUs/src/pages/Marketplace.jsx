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
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
          <div className="product-card">
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
                        <svg
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM160-120q-33 0-56.5-23.5T80-200v-560h80v560h560v80H160Zm160-160q-33 0-56.5-23.5T240-360v-440q0-33 23.5-56.5T320-880h440q33 0 56.5 23.5T840-800v440q0 33-23.5 56.5T760-280H320Zm0-80h440v-440H320v440Zm0 0v-440 440Z"/>
                        </svg>

                        Añadir
                    </button>
                </div>
            </div>
        </div>
        
      </section>
    </section>
  )
}

export default Marketplace
