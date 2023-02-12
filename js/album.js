let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);

let search = new URLSearchParams(window.location.search)

let album = albums[search.get(`i`)];

container.innerHTML = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${album.img}" alt="" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-4">
                            <div class="card-body">
                                <h5 class="card-title">${album.title}</h5>
                                <p class="card-text">${album.description}</p>
                                <p class="card-text"><small class="text-muted">${album.year}</small></p>
                            </div>
                        </div>
                    </div>
              </div>`;

let tracks = album.tracks;
            
for(j = 0; j < tracks.length; j++){
    let track = tracks[j];
   playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="assets/playlist-play.png" alt="" height="30px" class="me-3">
            <div>
                <div>${track.title}</div>
                <div class="text-secondary">${track.author}</div>
            </div>
            <div class="time ms-auto">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
            </li>` 
}

function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`);;
    let timeNode = document.querySelector(`.time`);
    
    for(let i = 0; i < trackNodes.length; i++) {
        let node = trackNodes[i];
        let audio = node.querySelector(`.audio`);
        let timeNode = node.querySelector(`.time`);
        let isPlaying = false;
        node.addEventListener(`click`, function() {
            if(!isPlaying){
                isPlaying = true;
                audio.play();
                updateProgress();
            } else{
                isPlaying = true;
                audio.pause();
                
            }  
        });
        
        function updateProgress() {
            let time = getTime(audio.currentTime);
            // Нарисовать актуальное время
            timeNode.innerHTML = time;
        
            // Нужно ли вызвать её ещё раз?
            if (isPlaying = true) {
                requestAnimationFrame(updateProgress);
            }
        }
        
        function getTime(time){
            let currentSeconds = Math.floor(time);
            let minutes = Math.floor(currentSeconds / 60)
            let seconds = Math.floor(currentSeconds % 60);

            if(minutes < 10){
                minutes = `0` + minutes;
            }
        
            if(seconds < 10){
                seconds = `0` + seconds;
            }
            return `${minutes}:${seconds}`
        }
    }
}

setupAudio();