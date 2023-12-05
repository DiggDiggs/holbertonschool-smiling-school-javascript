/** Your Javascript must be executed only when the document is loaded  */

$(document).ready(function() {
    /** Carousel QUOTES loader*/
    loadQuotes('https://smileschool-api.hbtn.info/quotes', '#carouselExampleControls');
    /** Carousel Video Loader */
    loadVideos('https://smileschool-api.hbtn.info/popular-tutorials', '#carouselExampleControls2');

});

/** Create Quote cards */
function createQuoteCard(quote, isActive) {
    return $(`
        <div class="carousel-item${isActive ? ' active' : ''}">
            <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                    <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}">
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                    <div class="quote-text">
                        <p class="text-white">« ${quote.text}</p>
                        <h4 class="text-white font-weight-bold">${quote.name}</h4>
                        <span class="text-white">${quote.title}</span>
                    </div>
                </div>
            </div>
        </div>
    `);
}

/** Carousel QUOTES Loader */

function loadQuotes(url, idSelector) {
    const carouselInner = $(idSelector + ' .carousel-inner .loadItems');
    $('.loader').show();

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(quotes) {
            $('.loader').hide();
            carouselInner.empty();

            $.each(quotes, function(index, quote) {
                const carouselItem = createQuoteCard(quote, index === 0);
                carouselInner.append(carouselItem);
            });

        },
        error: function(error) {
            console.error('Error: ', error);
            $('.loader').hide();
        }
    });
}

/* function to load video carousel
with cards 4 columns in the row at a time
looping trough 7 items from a json get request
shows a loading spinner while fetching data
*/

/** Create Video cards */

function createVideoCard(video) {
    // Create star rating element
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < video.star) {
            stars += '<img src="images/star_on.png" alt="Star On" width="15px" />';
        } else {
            stars += '<img src="images/star_off.png" alt="Star Off" width="15px" />';
        }
    }

    // create a column for every item
    let cardCol = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');

    // Create card HTML
    let cardHtml = `
        <div class="card">
            <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
            <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
            </div>
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${video.title}</h5>
                <p class="card-text text-muted">${video['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                    <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating ">${video.star > 0 ? stars : ''}
                    </div>
                    <span class="main-color">${video.duration}</span>
                </div>
            </div>
        </div>
    `;
    // append card to column
    cardCol.append(cardHtml);

    return cardCol;
}

function getItemsPerSlide() {
    const width = $(window).width();
    if (width >= 992) {
        return 4;
    } else if (width >= 768) {
        return 2;
    } else {
        return 1;
    }
}

/** Carousel Video Loader */

function loadVideos(url, idSelector) {
    const carouselInner = $(idSelector + ' .carousel-inner .loadItems2');
    $('.loader2').show();

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(videos) {
            $('.loader2').hide();
            carouselInner.empty();

            $.each(videos, function(index, video) {
                const videoCard = createVideoCard(video);
                carouselInner.append(videoCard);

                let itemsPerSlide = getItemsPerSlide();
                if ((index % itemsPerSlide) === 0) {
                    const carouselItem = $('<div>').addClass('carousel-item');
                    carouselInner.append(carouselItem);
                    if (index === 0) {
                        carouselItem.addClass('active');
                    }
                }
            });
        },
        error: function(error) {
            $('.loader2').hide();
            console.error('Error:', error);
        }
    });
}