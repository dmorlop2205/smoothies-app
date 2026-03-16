import ButtonComponent from './ButtonComponent';
import './SuggestedComponent.css';
function SuggestedComponent() {
  return (
    <section class="suggested">
        <h2>Suggested for you</h2>
        <div class="suggested-users">
            <div class="suggested-user">
                <div class="user-info">
                    <div class="circle">
                        <img src="assets/user1.jpg" alt="" />
                    </div>
                    <div class="suggested-user-info">
                        <p class="suggested-name">John Smoothie</p>
                        <p class="suggested-description">Great at fruit combinations</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
            </div>
            <div class="suggested-user">
                <div class="user-info">
                    <div class="circle">
                        <img src="assets/user2.jpg" alt="" />
                    </div>
                    <div class="suggested-user-info">
                        <p class="suggested-name">Marie Parker</p>
                        <p class="suggested-description">+500 recipes</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
                
            </div>
            <div class="suggested-user">
                <div class="user-info">
                    <div class="circle">
                        <img src="assets/user3.jpg" alt="" />
                    </div>
                    <div class="suggested-user-info">
                        <p class="suggested-name">Julia Rivera</p>
                        <p class="suggested-description">Experienced nutritionist</p>
                    </div>
                </div>
                <ButtonComponent></ButtonComponent>
            </div>
        </div>
    </section>
  )
}

export default SuggestedComponent
