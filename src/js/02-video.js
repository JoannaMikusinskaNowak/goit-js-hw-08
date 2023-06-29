import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);
console.log(iframe);
console.log(player);

/*player
  .ready()
  .then(function () {
    console.log('Odtwarzacz Vimeo jest gotowy do użycia.');
    // Dodaj inne operacje związane z odtwarzaczem tutaj
  })
  .catch(function (error) {
    console.error('Błąd inicjalizacji odtwarzacza Vimeo:', error);
  });*/

player.on('error', function (error) {
  console.error('Błąd odtwarzacza Vimeo:', error);
});

/* player on */
player.on('play', function () {
  console.log('played the video!');
});
/* player title */
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function saveTimeLocalStorage(player, delay) {
  const saveTime = function () {
    const videoPlayerCurrentTime = player.currentTime;
    localStorage.setItem('playerTime', 'videoPlayerCurrentTime');
    console.log(saveTime);
  };
  const throttleSaveTime = throttle(saveTime, delay);

  player.on('timeuptade', throttleSaveTime);
}

function setTimeThrottle(player, delay) {
  const savedTime = localStorage.getItem('playerTime');
  console.log(saveTimeLocalStorage);
  if (savedTime) {
    const seekTime = parseFloat(savedTime);
    player
      .setCurrentTime(seekTime)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}

saveTimeLocalStorage(player, 2000);
setTimeThrottle(player, 2000);
