if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    const getLatestAlbumBtn = document.getElementById("getLatestAlbumBtn")
    getLatestAlbumBtn.addEventListener("click", getLatestAlbum)

    const playMusicBtn = document.getElementById("playMusicBtn")
    if(playMusicBtn.classList.contains("isPlaying")-1){
        playMusicBtn.addEventListener("click", playMusic)
        console.log("Play music ready")
    } else {
        playMusicBtn.addEventListener("click", stopMusic)
        console.log("Stop music ready")
    }
    
}

function getLatestAlbum() {
    if(localStorage.getItem("lastAlbum") == null) {
        lastAlbum = true
        localStorage.setItem("lastAlbum", lastAlbum)
        swal.fire("Info","Item added to the cart!", "success");
    } else {
        swal.fire("Warning","Last album has already been added to the cart!", "warning");
    }
}

function playMusic() {
    const playMusicBtn = document.getElementById("playMusicBtn")
    if(playMusicBtn.classList.contains("isPlaying")-1){
        const toursDiv = document.getElementsByClassName("tours")[0]
        const musicDiv = document.createElement("div")
        musicDiv.classList.add("music-div")
        const musicPlayer = `<iframe width="1" height="1" src="https://www.youtube.com/embed/7P1FlZyd2xM?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        musicDiv.innerHTML = musicPlayer
        toursDiv.append(musicDiv)
        playMusicBtn.innerHTML = "&#10074;&#10074;"
        playMusicBtn.classList.add("isPlaying");
        console.log("Play music")
    }
    playMusicBtn.addEventListener("click", stopMusic);

}

function stopMusic() {
    const playMusicBtn = document.getElementById("playMusicBtn")
    if(playMusicBtn.classList.contains("isPlaying")){
        playMusicBtn.classList.remove("isPlaying");
        playMusicBtn.innerHTML = "&#9658"
        // Moze da se gadja direktno music-Div ili da se gadjaa poslednji element u tours divu
        // const musicDiv = document.getElementsByClassName("music-div")
        // musicDiv[0].remove()
            const toursDiv = document.getElementsByClassName("tours")[0]
            toursDiv.hasChildNodes()
            toursDiv.removeChild(toursDiv.lastChild)
        
        console.log("Stop playing")
    }
    // Zasto opet nece da pusti muziku?
    playMusicBtn.addEventListener("click", playMusic);

}
