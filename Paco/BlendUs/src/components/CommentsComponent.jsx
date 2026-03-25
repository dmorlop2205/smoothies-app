import './CommentsComponent.css'

function CommentsComponent() {
  return (
    <section className="comments-wrapper">
        <h3>Comments</h3>
        <form action="" className="comments">
            <div className="profile-picture">
                <svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#fff" stroke="#fff">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-100.000000, -255.000000)" fill="#006045">
                            <path d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z" id="comment-1" sketch:type="MSShapeGroup">
                            </path>
                        </g>
                    </g>
                </svg>
            </div>
            <input type="text" name="comment" className="comment" placeholder="Add a comment"/>
            <button type="button" className="comment-button">
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">

                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                    <g id="SVGRepo_iconCarrier">
                        <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                        </g>

                </svg>
            </button>
        </form>
        <div className="comments-section">
            <div className="public-comment">
                <div className="circle">
                    <img src="assets/user1.jpg"></img>
                </div>
                <div className="user-info">
                    <div className="info-head">
                        <p className="name">John Smoothie</p>
                        <p className="launch-date">Mar 15</p>
                    </div>
                    <p className="comment-content">
                        This is a comment, with a very long size to fill multiple lines in the box of comments. This is the first
                        comment of the section.
                    </p>
                </div>
            </div>
            <div className="public-comment">
                <div className="circle">
                    <img src="assets/user3.jpg"></img>
                </div>
                <div className="user-info">
                    <div className="info-head">
                        <p className="name">Julia Rivera</p>
                        <p className="launch-date">Mar 10</p>
                    </div>
                    <p className="comment-content">
                        This is the second comment.
                    </p>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default CommentsComponent
