import './PostComponent.css';
function PostComponent() {
  return (
    <section class="post">
        <div class="post-header">
            <div class="post-user">
                <div class="circle">
                    <img src="assets/Alexelcapo.webp"></img>
                </div>
                <div class="user-info">
                    <p class="name">Nombre Usuario</p>
                    <p class="launch-date">Mar 15</p>
                </div>
            </div>

            <div class="post-options">
                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="12" r="0.5" stroke="#99A1AF" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="0.5" stroke="#99A1AF" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="17" cy="12" r="0.5" stroke="#99A1AF" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>

        <div class="post-image"></div>

        <div class="interactions">

            <div class="like-comment-share">
                <svg class="like" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#364153" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="comment" viewBox="0 0 32 32" fill="none">
                    <path 
                        d="M16 4C9.373 4 4 8.373 4 14c0 3.314 1.657 6.248 4.224 8.12L8 28l6.4-3.2c.53.08 1.06.12 1.6.12 6.627 0 12-4.373 12-10S22.627 4 16 4z"
                        stroke="#364153"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <svg class="share" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#364153">
                    <path d="M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33T80-480q0-48 33.25-81T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Zm.04-60q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm-492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5ZM724.5-727.54q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54ZM686-194ZM194-480Zm492-286Z"/>
                </svg>
            </div>
            <div class="save">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z" fill="#364153"/>
                </svg>
            </div>
        </div>

        <div class="description">
            <p>
                <span class="name">Nombre Usuario</span>
                    Description Description Description Description Description Description Description Description Description
                <span class="expand-description">
                    <svg class="expand" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#364153">
                        <path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"/>
                    </svg>
                </span>
            </p>
        </div>

        <div class="hashtags">
            <span class="hashtag">#GreenSmoothies</span>
            <span class="hashtag">#Detox</span>
            <span class="hashtag">#alexelcapo</span>
        </div>
    </section>
  )
}

export default PostComponent
