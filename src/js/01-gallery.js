// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);
const findGallery = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(
      item => `<a class="gallery__item" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
    </a>`
    )

    .join('');
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);
findGallery.insertAdjacentHTML('afterbegin', addGalleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
