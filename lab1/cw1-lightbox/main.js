//pobranie referencji
const gallery = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const galleryCount = gallery.length;
//zapisanie się na zdarzenie click


for (let idx = 0; idx < gallery.length; idx++){
    const img = gallery[idx];
    img.addEventListener('click',showLightboxEvent);
}


function showLightboxEvent(ev) {
    showLightbox(ev.target);
}

function showLightbox(target) {
    const prevEl = target.previousElementSibling;
    const nextEl = target.nextElementSibling;
    const img = document.querySelector('.lightbox img');
    const imgUrl = target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');
    if(prevEl != null){
        const prevImg = document.querySelector('.prev');
        prevImg.children[0].href = prevEl.src;
        console.log(prevImg);
        prevImg.addEventListener('click', prevImage);
        document.querySelector('.prev').style.display = "block";
    } else {
        document.querySelector('.prev').style.display = "none";
    }

    if(nextEl != null){
        const nextImg = document.querySelector('.next');
        nextImg.children[0].href = nextEl.src;
        console.log(nextImg);
        nextImg.addEventListener('click', nextImage);
        document.querySelector('.next').style.display = "block";
    } else {
        document.querySelector('.next').style.display = "none";
    }

}

function prevImage(ev){
    for (let idx = 0; idx < gallery.length; idx++){
        const img = gallery[idx];
        if(img.src == ev.target.children[0].href){
            showLightbox(img);
            break;
        }
    }
}

function nextImage(ev){
    for (let idx = 0; idx < gallery.length; idx++){
        const img = gallery[idx];
        if(img.src === ev.target.children[0].href){
            showLightbox(img);
            break;
        }
    }
}

//hideLightbox
const lightBox = document.querySelector('.lightbox');

lightbox.addEventListener('click', hideLightbox);

function hideLightbox(e) {
    if (e.target == e.currentTarget) {
        return lightBox.classList.remove('visible');
    }
}
s
