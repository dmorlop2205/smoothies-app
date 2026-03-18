import './StoriesComponent.css';
function StoriesComponent() {
  return (
    <section className="stories">
        <div className="you">
            <div className="circle">
                <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"/>
                    <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"/>
                </svg>
            </div>
            <p>You</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/user1.jpg" alt="" />
            </div>
            <p>John</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/user2.jpg" alt="" />
            </div>
            <p>Marie</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/user3.jpg" alt="" />
            </div>
            <p>Julia</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/Alexelcapo.webp" alt="" />
            </div>
            <p>Alex</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/user 4.jpg" alt="" />
            </div>
            <p>Robert</p>
        </div>
        <div className="storie">
            <div className="circle">
                <img src="assets/user 5.jpg" alt="" />
            </div>
            <p>James</p>
        </div>
    </section>
  )
}

export default StoriesComponent
