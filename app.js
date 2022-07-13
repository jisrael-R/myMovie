import get from './utils/getElement.js';

// const API_URl_key = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3`;
const movieContainer = get('.movies-container');

const navBtnCont = get('.select-container');
const btnFilterC = get('.btn-container');

const selector = [
    'browse_all',
    'now_playing',
    'popular',
    'top_rated',
    'upcoming',
];
const things = selector.filter((item) => item.indexOf('browse_all'));
console.log(things);

const tt = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3`;

const form = get('.search');
const searchInput = get('#searchBox');

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(key) {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: key,
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

// navbar search btns
const displayBtns = () => {
    const API_URl = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3`;

    const buttons = ['browse_all', ...things.map((btn) => btn)];
    console.log(buttons);
    navBtnCont.innerHTML = buttons
        .map((btn) => {
            let myval = btn.split('_').join(' ');
            if (myval.includes('browse all')) {
                return `
              
                <button id='one' class='btn fade'data-value="${tt}">browse all</button>`;
            } else if (myval) {
                return `
              
                <button class='btn fade' data-id="${btn}">${myval}</button>`;
            }
        })
        .join('');
};
displayBtns();

const k = process.env.API_key;
console.log(k);

// const allMovies = get('.container-two');

// genre filter btns
async function genreBtns() {
    const genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=856d768df6af9757eea4022493c242c3`;
    const res = await (await fetch(genres)).json();

    const genreBtn = [
        ...res.genres.map(({ id, name }) => {
            let tt = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3&with_genres=${id}`;
            // return `<button class='fade' data-id="${id}">${name}</button>`;
            const container = `<div class="all-genres-movies">
                            <h1 style="color: white;">${name}</h1>
                            <div class="genre-movie-container">
                            
                          </div>`;

            axios.get(`${tt}`).then((res) => {
                const urls = res.config.url;
                axios
                    .get(urls)
                    .then((data) => {
                        // console.log(data.data.results);

                        return data.data.results;
                    })
                    .then((Response) => {
                        const li = Response.map((item) => {
                            console.log(item);
                            return `<h1 style="color: white;">${item}</h1>`;
                        });
                        // allMovies.innerHTML = li;
                    });
            });
        }),
    ].join(' ');
    // btnFilterC.innerHTML = genreBtn;
    // allMovies.innerHTML = genreBtn;

    // getMovies(genreBtn);
}
// genreBtns();

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results
        .map((movie) => {
            // console.log(movie);
            const imagesLink = `${movie.poster_path}`;
            const movImages = `https://image.tmdb.org/t/p/original`;
            const placeHolder = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIg60j4m6mAJW12mkD9B8O8j3bw7z6QdyOOA&usqp=CAU`;

            if (movie.poster_path) {
                return `
                <div class="overlay">
                        
                    </div>
                <article class="img-post">
                        <img class="img-item"  src="${movImages}${imagesLink}"
                            alt="">
                        <div class="btn-title">
                           <button data-id="${movie.id}" class="btn-mov">${
                    movie.title
                }</button>
                           <div class="title">
                            <span class="span">${moment(
                                movie.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>
                        
                    </article>`;
            } else {
                return `<article class="img-post">
                        <img class="img-item" style="height:213px;" src="${placeHolder}"
                            alt="">
                        <div class="btn-title">
                           <button data-id="${movie.id}" class="btn-mov">${
                    movie.title
                }</button>
                           <div class="title">
                            <span class="span">${moment(
                                movie.release_date
                            ).format('MMM Do YY')}</span>
                        </div>
                           </div>
                        
                    </article>`;
            }
        })
        .join('');
    // console.log(movies);

    if (movies < 1) {
        movieContainer.innerHTML = `
        
          <div class="logo" style="color:white; padding-right:2em; border-right: 1px solid violet">
                    <p>myMovies</p>
                    <div class="dot-logo">
                        <div class="r-logo red"></div>
                        <div class="r-logo orange"></div>
                        <div class="r-logo yellow"></div>
                        <div class="r-logo violet"></div>
                        <div class="r-logo blue"></div>
                        <div class="r-logo green"></div>
                    </div>
                </div>
        <article class="img-post notFound"  class="img-post"><h1>"No Movies found"</h1> <p>Try Another Title</p></article>`;
    } else {
        movieContainer.innerHTML = movies;
    }
}

const modalCont = get('.modal-overlay');
const modal = get('.movie-info-container');
const relatedMovs = get('.related-movie-container');

async function getModal(getId) {
    const API = `https://api.themoviedb.org/3/movie/`;
    const KEY = `api_key=856d768df6af9757eea4022493c242c3`;
    const singleMov = `${API}${getId}?${KEY}&append_to_response=videos`;

    const trailer = `${API}${getId}/videos?${KEY}`;

    const reviews = `${API}${getId}/reviews?${KEY}`;
    const relatedMovies = `${API}${getId}/similar?${KEY}`;

    const single = await (await fetch(singleMov)).json();
    const related = await (await fetch(relatedMovies)).json();
    const video = await (await fetch(trailer)).json();
    console.log(single);

    const newArray = video.results.find(
        (item) => item.name === 'Official Trailer'
    );
    console.log(single);
    const genreContain = get('.genre-list');
    const genreList = single.genres
        .map(({ name }) => {
            return `<ul><li>${name}</li></ul>`;
        })
        .join('');
    // genreContain.innerHTML = genreList;
    console.log(genreList);

    const modalContent = video.results.filter((vid) => {
        // console.log(vid.name === 'Official Trailer');

        if (vid.site.includes('YouTube')) {
            return vid;
        }
    });
    const modalInfo = `  <div class="overview-container">
               
                <img src="https://image.tmdb.org/t/p/original${
                    single.poster_path
                }" width="240px" alt="">

                <div class="content-info">
                    <div class="name-title">
                        <h2>${single.title}</h2>
                        <span>(${moment(single.release_date).format(
                            'YYYY'
                        )})</span>

                    </div>
                    <div class="sideInfo">
                      <div class="genreList">${genreList}</div>
                        <div class="movie-votes">
                          <p>${single.vote_average}</p>
                            <small>voted</small>
                        </div>
                        </div>
                   
                    <div class="overview-content">
                        <p>${single.overview}</p>
                    
                        <div class="video">
                        <iframe width="360" height="215" src="https://www.youtube.com/embed/${
                            modalContent[0].key
                        }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        
                         </div>
                    </div
                        
                    </div>
                </div>
            
                <button class="close-btn btn2">
                <i class="fas fa-times"></i>
            </button>    
            </div>

           
             `;

    const movsRelated = related.results
        .map((mov) => {
            return `
                 <div class="article">
                   <article>
                       <img src="https://image.tmdb.org/t/p/original${mov.poster_path}"  alt="">
                       <h5>${mov.title}</h5>
                    </article>
                    </div>
                    `;
        })
        .join('');
    const movReviews = reviews.results;
    // (modal.style.background = `no-repeat url(https://image.tmdb.org/t/p/original${single.backdrop_path})`),
    //     (modal.style.backgroundColor = `rgba(34, 34, 34, 0.781)`);
    modal.innerHTML = modalInfo;

    relatedMovs.innerHTML = movsRelated;
}
// events

form.addEventListener('keyup', async () => {
    const inputVals = searchInput.value;
    const url = `https://api.themoviedb.org/3/search/movie?
api_key=856d768df6af9757eea4022493c242c3&language=en-US&query=${inputVals}&page=1&include_adult=false`;
    const res = await (await fetch(url)).json();
    console.log(res);
    if (inputVals) {
        getMovies(url);
    } else if (inputVals === '') {
        getMovies(tt);
    }
});

modal.addEventListener('click', (e) => {
    const btn = e.target.classList.contains('btn-related-movies');
    const contain = e.target.classList.contains('related-movie');
    if (btn) {
        contain.classList.toggle('add-related');
    }
});
const realtedContainer = get('.related-title');
const relateTitle = get('.re-title');
realtedContainer.addEventListener('click', (e) => {
    const btn = e.target.classList.contains('btn-related-movies');

    if (btn) {
        realtedContainer.classList.toggle('add-related');
        relateTitle.style.color = 'hsl(205, 63%, 48%)';
    }
    if (realtedContainer.classList.contains('add-related')) {
        return (relateTitle.innerHTML = `<h2>Related Movies</h2>
                        <i class="fas fa-angle-up btn-related-movies"></i>`);
    } else {
        relateTitle.style.color = 'hsl(209, 23%, 60%';
        return (relateTitle.innerHTML = `<h2>Related Movies</h2>
                        <i class="fas fa-angle-down btn-related-movies"></i>`);
    }
});

movieContainer.addEventListener('click', (e) => {
    const getId = e.target.dataset.id;

    const el = e.target.nodeName === 'BUTTON';
    // const ele = e.target.nodeName === 'IMG';
    if (el) {
        modalCont.classList.add('open');
    }
    getModal(getId);
});
const AllContainers = document.querySelectorAll('.grn');
AllContainers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const getId = e.target.dataset.id;
        const el = e.target.nodeName === 'BUTTON';
        // const ele = e.target.nodeName === 'IMG';
        if (el) {
            modalCont.classList.add('open');
        }
        getModal(getId);
    });
});

modalCont.addEventListener('click', (e) => {
    const close = e.target.classList.contains('fa-times');
    const relatedMovBtn = e.target.classList.contains('btn-related-movies');

    // onYouTubeIframeAPIReady(e.target.data.id);
    // to close modal
    if (close) {
        modal.innerHTML = `<div class="overview-container notFound">
        
          <button class="close-btn btn2">
                    <i class="fas fa-times"></i>
        </div>`;

        modalCont.classList.remove('open');
        realtedContainer.classList.remove('add-related');
        return (relateTitle.innerHTML = `<h2>Related Movies</h2>
                        <i class="fas fa-angle-down btn-related-movies"></i>`);
    }
    // stopVideo();
});

btnFilterC.addEventListener('click', (e) => {
    const el = e.target.dataset.id;
    const tt = `https://api.themoviedb.org/3/discover/movie?api_key=856d768df6af9757eea4022493c242c3&with_genres=${el}`;
    movieContainer.classList.toggle('add_trasition');

    getMovies(tt);
});

navBtnCont.addEventListener('click', (e) => {
    navBtnCont.classList.toggle('focused');
    const el = e.target;
    const ele = e.target.dataset.value;
    // const filterContainer = get('.filter-container');
    // filterContainer.classList.add('hide');
    const queries = el.dataset.id;
    console.log(el);
    let url = `https://api.themoviedb.org/3/movie/${queries}?api_key=856d768df6af9757eea4022493c242c3`;
    if (queries) {
        return getMovies(url);
    }
    if (ele) {
        // filterContainer.classList.remove('hide');

        return getMovies(ele);
    }
});

const seeMore = get('#see-btn');
const btnContainer = get('.btn-container');
seeMore.addEventListener('click', () => {
    btnContainer.classList.toggle('show-filters');
    if (btnContainer.classList.contains('show-filters')) {
        return (seeMore.innerHTML = `see less <i class="fas fa-chevron-up"></i>`);
    } else {
        return (seeMore.innerHTML = `see more <i class="fas fa-chevron-down"></i>`);
    }
});

getMovies(tt);
