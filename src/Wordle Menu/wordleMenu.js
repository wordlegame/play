window.onload = () => {
    //How to Play open button functionality
    let help_button = document.getElementById("howToPlayButton");
    help_button.onclick = openHelpForm;
    
    
    
    //How To Play close button functionality
    let close_button = document.getElementById("closeButton");
    close_button.onclick = closeHelpForm;

    //Statistics button functionality
    let statistics_button = document.getElementById("statisticsButton");
    //Add statistics onclick here

    //Play button functionality
    let play_button = document.getElementById("playButton");
    //Add play onclick here
}

const openHelpForm = () => {
    document.getElementById("howToPlay").style.display = "block";
}

const closeHelpForm = () => {
    document.getElementById("howToPlay").style.display = "none";
}


