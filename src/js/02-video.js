import throttle from "lodash.throttle";



const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


const onPlay = function (timeupdate) {
    console.log(timeupdate);
    localStorage.setItem('videoplayer-current-time', timeupdate.seconds)
};

player.on('play', throttle(onPlay, 100));


player.setCurrentTime().then(function(seconds) {
    seconds = localStorage.getItem('videoplayer-current-time')
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

