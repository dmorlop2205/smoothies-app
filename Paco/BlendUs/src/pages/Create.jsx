import { Link } from "react-router-dom"
import NavComponent from "../components/NavComponent"
import CreateForm from "../components/CreateForm"
import './Create.css';

function Create() {
  return (
    <>
        <NavComponent></NavComponent>
        <section className="create">
            <section className="page-title">
                <Link to="/feed" className="back">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4a5565">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </Link>
                <div className="title-subtitle">    
                    <h1>New Smoothie</h1>
                    <h3>Share your latest creation!</h3>
                </div>
            </section>
            <CreateForm></CreateForm>
        </section>
    </>
  )
}

export default Create
