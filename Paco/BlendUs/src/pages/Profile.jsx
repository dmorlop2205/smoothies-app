import NavComponent from '../components/NavComponent';
import { useState } from "react";
import './Profile.css';

function Profile() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <section className="profile">
            <NavComponent></NavComponent>
            <div className="user-container">
                <div className="user-header">
                    <div className="user-pic">
                        <img src="assets/Alexelcapo.webp" alt="profile-pic" />
                    </div>
                    <div className="user-info">
                        <h3 className='username'>Alejandro Perez Rodriguez</h3>
                        <p className='email'>alexelcapo@example.com</p>
                    </div>  
                </div>
                <p className="description">
                    🥤 Smoothie enthusiast | Blending my way through life
                </p>

                <div className="user-stats">
                    <div className="stat">
                        <h2 className="stat-number">6</h2>
                        <p className='stat-label'>Posts</p>
                    </div>
                    <div className="stat">
                        <h2 className="stat-number">248k</h2>
                        <p className='stat-label'>Followers</p>
                    </div>
                    <div className="stat">
                        <h2 className="stat-number">156</h2>
                        <p className='stat-label'>Following</p>
                    </div>
                </div>

                <div className="user-buttons">
                    <button className="btn btn-primary">Edit Profile</button>
                    <button className="btn btn-secondary">Share Profile</button>
                </div>
            </div>

            <div className="tabs">
                <button
                    type="button"
                    className={`tab ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => setActiveTab(0)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e17100">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z"/>
                    </svg>
                    <span className="tab-name">Posts</span>
                </button>

                <button
                    type="button"
                    className={`tab ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => setActiveTab(1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e17100">
                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
                    </svg>
                    <span className="tab-name">Saved</span>
                </button>

                <button
                    type="button"
                    className={`tab ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => setActiveTab(2)}
                >
                    <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#e17100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="tab-name">Liked</span>
                </button>
            </div>
            <section className="user-grid">
                <div className="grid">
                    <img src="assets/smoothie.avif" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                        Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 

                </div>
                <div className="grid">
                    <img src="assets/smoothie2.jpg" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                            Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 
                </div>
                <div className="grid">
                    <img src="assets/smoothie3.jpg" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                            Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 
                </div>
                <div className="grid">
                    <img src="assets/smoothie4.jpg" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                            Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 
                </div>
                <div className="grid">
                    <img src="assets/smoothie5.jpg" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                            Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 
                </div> 
                <div className="grid">
                    <img src="assets/smoothie6.jpg" alt="" />
                    <div className="overlay">
                        <h4 className="title">
                            Tropical Sunrise Boost
                        </h4>
                        <div className="likes-comments">
                            <span className="likes">123 ❤️</span>
                            <div className="comments">2 💬</div>
                        </div>
                    </div> 
                </div>
            </section>
        </section>
    )
}

export default Profile
