import get from './getElement.js';
const API_URl = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3`;
// function get(el) {
//     const element = document.querySelector(el);
//     if (element) {
//         return element;
//     }
//     throw new Error(`Sorry, ${el} does not exist`);
// }

const allGenres = [
    {
        action: {
            url: `${API_URl}&with_genres=28&page=2`,
            name: 'action',
            id: 28,
        },
        adventure: {
            url: `${API_URl}&with_genres=12&page=2`,
            name: 'adventure',
            id: 12,
        },
        animation: {
            url: `${API_URl}&with_genres=16&page=3`,
            name: 'animation',
            id: 16,
        },
        comedy: {
            url: `${API_URl}&with_genres=35&page=2`,
            name: 'comedy',
        },
        crime: {
            url: `${API_URl}&with_genres=80&page=2`,
            name: 'crime',
        },
        documentary: {
            url: `${API_URl}&with_genres=99&page=2`,
            name: 'documentary',
        },
        drama: {
            url: `${API_URl}&with_genres=18&page=3`,
            name: 'drama',
        },
        family: {
            url: `${API_URl}&with_genres=10751&page=2`,
            name: 'family',
        },
        fantasy: {
            url: `${API_URl}&with_genres=14`,
            name: 'fantasy',
        },
        history: {
            url: `${API_URl}&with_genres=36`,
            name: 'history',
        },
        horror: {
            url: `${API_URl}&with_genres=27`,
            name: 'horror',
        },
        music: {
            url: `${API_URl}&with_genres=10402`,
            name: 'music',
        },
        mystery: {
            url: `${API_URl}&with_genres=9648`,
            name: 'mystery',
        },
        romance: {
            url: `${API_URl}&with_genres=10749`,
            name: 'romance',
        },
        scifi: {
            url: `${API_URl}&with_genres=878`,
            name: 'sci-fi',
        },
        tvMovie: {
            url: `${API_URl}&with_genres=10770`,
            name: 'TV Movie',
        },
        thriller: {
            url: `${API_URl}&with_genres=53`,
            name: 'thriller',
        },
        war: {
            url: `${API_URl}&with_genres=10752`,
            name: 'war',
        },
        western: {
            url: `${API_URl}&with_genres=37`,
            name: 'western',
        },
    },
];

async function genreListDisplay() {
    let endpoints = [
        allGenres[0].action.url,
        allGenres[0].adventure.url,
        allGenres[0].animation.url,
        allGenres[0].comedy.url,
        allGenres[0].crime.url,
        allGenres[0].documentary.url,
        allGenres[0].drama.url,
        allGenres[0].family.url,
        allGenres[0].history.url,
        allGenres[0].horror.url,
        allGenres[0].music.url,
        allGenres[0].mystery.url,
        allGenres[0].romance.url,
        allGenres[0].scifi.url,
        allGenres[0].thriller.url,
        allGenres[0].tvMovie.url,
        allGenres[0].war.url,
        allGenres[0].western.url,
    ];
    axios
        .all(endpoints.map((item) => axios.get(item)))
        // .then((data) => console.log(data[0].data.results));
        .then((data) => {
            const actionPost = data[0].data.results;
            const adventurePost = data[1].data.results;
            const animationPost = data[2].data.results;
            const comedyPost = data[3].data.results;
            const crimePost = data[4].data.results;
            const docuPost = data[5].data.results;
            const dramaPost = data[6].data.results;
            const familyPost = data[7].data.results;
            const historyPost = data[8].data.results;
            const horrorPost = data[9].data.results;
            const musicPost = data[10].data.results;
            const mysteryPost = data[11].data.results;

            function ggg() {
                const actionContainer = get('.action');
                const adventureContainer = get('.adventure');
                const animationContainer = get('.animation');
                const comedyContainer = get('.comedy');
                const crimeContainer = get('.crime');
                const documentaryContain = get('.documentary');
                const dramaContainer = get('.drama');
                const familyContainer = get('.family');
                const historyContainer = get('.history');
                const horrorContainer = get('.horror');
                const musicContainer = get('.family');
                const mysteryContainer = get('.mystery');
                const movImages = `https://image.tmdb.org/t/p/w500`;
                const placeHolder = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIg60j4m6mAJW12mkD9B8O8j3bw7z6QdyOOA&usqp=CAU`;
                const action = actionPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const adventure = adventurePost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');
                const animation = animationPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const comedy = comedyPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const crime = crimePost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const docu = docuPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const drama = dramaPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const family = familyPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const history = historyPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                const horror = horrorPost
                    .map((item) => {
                        const imagesLink = `${item.poster_path}`;
                        if (item.poster_path) {
                            return `<article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        } else {
                            return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="" loading="lazy">
                        <div class="btn-title">
                           <button data-id="${item.id}" class="btn-mov">${
                                item.title
                            }</button>
                           <div class="title">
                            <span class="span">${moment(
                                item.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>

                    </article>`;
                        }
                    })
                    .join('');

                actionContainer.innerHTML = action;
                adventureContainer.innerHTML = adventure;
                animationContainer.innerHTML = animation;
                comedyContainer.innerHTML = comedy;
                crimeContainer.innerHTML = crime;
                documentaryContain.innerHTML = docu;
                dramaContainer.innerHTML = drama;
                familyContainer.innerHTML = family;
                historyContainer.innerHTML = history;
                horrorContainer.innerHTML = horror;
            }
            ggg();
        });
}
genreListDisplay();
