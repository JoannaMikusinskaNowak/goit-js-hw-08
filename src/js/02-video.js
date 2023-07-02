import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);
console.log(iframe);
console.log(player);

function saveTimeLocalStorage(player, delay) {
  const saveTime = function () {
    player.getCurrentTime().then(function (currentTime) {
      localStorage.setItem('playerTime', JSON.stringify(currentTime));
      console.log('Zapisano czas odtwarzania:', currentTime);
    });
  };
  const throttleSaveTime = throttle(saveTime, delay);
  player.on('timeupdate', throttleSaveTime);
}
function getCurrentTime() {
  return player.getCurrentTime();
}

const currentTime = getCurrentTime();
console.log('Bieżący czas odtwarzania:', currentTime);

function setTimeThrottle(player, delay) {
  player.on('play', function () {
    const savedTime = localStorage.getItem('playerTime');
    console.log('Zapisano czas odtwarzania:', savedTime);

    if (savedTime) {
      const seekTime = parseFloat(savedTime);
      player
        .setCurrentTime(seekTime)
        .then(function (seconds) {
          currentTime = seconds;
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
  });
}

player
  .ready()
  .then(function () {
    console.log('Odtwarzacz Vimeo jest gotowy do użycia.');
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
    saveTimeLocalStorage(player, 2000);
    setTimeThrottle(player, 2000);
  })
  .catch(function (error) {
    console.error('Błąd inicjalizacji odtwarzacza Vimeo:', error);
  });
