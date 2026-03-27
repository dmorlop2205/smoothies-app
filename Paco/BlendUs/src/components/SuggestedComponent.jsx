import ButtonComponent from './ButtonComponent';
import './SuggestedComponent.css';
function SuggestedComponent() {
  return (
    <section className="suggested">
        <h2>Suggested for you</h2>
        <div className="suggested-users">
            <div className="suggested-user">
                <div className="user-info">
                    <div className="circle">
                        <img src="assets/user1.jpg" alt="" />
                    </div>
                    <div className="suggested-user-info">
                        <p className="suggested-name">John Smoothie</p>
                        <p className="suggested-description">Great at fruit combinations</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
            </div>
            <div className="suggested-user">
                <div className="user-info">
                    <div className="circle">
                        <img src="assets/user2.jpg" alt="user-2" />
                    </div>
                    <div className="suggested-user-info">
                        <p className="suggested-name">Marie Parker</p>
                        <p className="suggested-description">+500 recipes</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
                
            </div>
            <div className="suggested-user">
                <div className="user-info">
                    <div className="circle">
                        <img src="assets/user3.jpg" alt="" />
                    </div>
                    <div className="suggested-user-info">
                        <p className="suggested-name">Julia Rivera</p>
                        <p className="suggested-description">Experienced nutritionist</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
            </div>
        </div>
    </section>
  )
}

export default SuggestedComponent
