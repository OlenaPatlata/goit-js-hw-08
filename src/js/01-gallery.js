import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const ulRef = document.querySelector('.gallery');

const markup = galleryItems.map(({ preview, original, description }) => {
    return `<li>
    <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" loading="lazy" />
</a></li>`
}).join('');

ulRef.insertAdjacentHTML("afterbegin", markup);
const lightbox = new SimpleLightbox('.gallery a', { captionDelay
: 250, });
