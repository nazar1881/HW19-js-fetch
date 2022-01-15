albomsUrl = " https://jsonplaceholder.typicode.com/albums";
photosUrl = "https://jsonplaceholder.typicode.com/photos?albumId=";
let listOfAlboms = document.getElementById('list-of-alboms');
let listOfPhotos = document.getElementById('list-of-photos');

async function getAlboms() {
    try {
        const response = await fetch(albomsUrl)
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getPhotos(id) {
    try {
        const response = await fetch(`${photosUrl + id}`)
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderAlboms() {
    let alboms = '';
    await getAlboms()
        .then((data) => {
            for (let item of data) {
                if (!item) {
                    return;
                } else {
                    alboms += `<li class="albom-titles" id="${item.id}">${item.title}</li>`
                }
            }
            listOfAlboms.innerHTML = alboms;
        })
        .catch(error => error)
}

async function renderPhotos(id) {
    let photos = '';
    await getPhotos(id)
        .then((data) => {
            for (let item of data) {
                if (!item) {
                    return;
                } else {
                    photos += `<img src="${item.thumbnailUrl}" class="photos" id="${item.id}"></img>`
                }
            }
            listOfPhotos.innerHTML = photos;
        })
        .catch(error => error)
}

renderAlboms();
renderPhotos(1);

listOfAlboms.addEventListener('click', function (e) {
    let target = e.target;

    getPhotos(target.id);
    renderPhotos(target.id);
});