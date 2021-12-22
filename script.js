let quotesData;

var colors = [
    '#1688f0',
    '#0a0a0f',
    '#0DBC79',
    '#364554',
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224'
];
var currentQuote = '',
    currentAuthor = '';

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: 'https://raw.githubusercontent.com/2KAbhishek/quote-me/main/data/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=QuoteMe&related=2KAbhishek&text=' +
            encodeURIComponent('"' + currentQuote + '" - ' + currentAuthor)
    );

    $('.quote-text').animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $('#author').html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuotes();
    $('#new-quote').on('click', getQuote);
});
