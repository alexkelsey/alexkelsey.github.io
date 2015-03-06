var ak = window.ak || {};

WebFontConfig = {'google':{'families':['Lato:300:latin', 'Lato:100:latin']}};

(function() {
var f = document.createElement('script');
f.src = 'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
f.type = 'text/javascript';
f.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(f, s);
})();

function getPrefix(prop) {
    var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'],
        elem = document.createElement('div'),
        upper = prop.charAt(0).toUpperCase() + prop.slice(1);

    if (prop in elem.style) {
        return prop;
    }

    for (var len = prefixes.length; len--;) {
        if ((prefixes[len] + upper)  in elem.style) {
            return (prefixes[len] + upper);
        }
    }

    return false;
}

var myScroll,
    grid = document.getElementById('grid');
    transformPrefixed = getPrefix('transform');

window.onresize = function () {
    $('body').css({'height': window.innerHeight + 'px'});

    var $list = $('#scroller'),
        $listItems = $list.find('li'),
        listItemsWidth = $listItems[0].offsetWidth;

    $list.css({'width': ($listItems.length * listItemsWidth) + 'px'});

    ak.width = window.innerWidth;
};

$(function () {
    $('body').css({'height': window.innerHeight + 'px'});

    var $list = $('#scroller'),
        $listItems = $list.find('li'),
        listItemsWidth = $listItems[0].offsetWidth;

    $list.css({'width': ($listItems.length * listItemsWidth) + 'px'});

    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        snap: 'li',
        scrollX: true,
        scrollY: false,
        tap: true
    });

    myScroll.on('scroll', function () {
        grid.style[transformPrefixed] = "rotateX(80deg) translate(" + this.x * 0.43 + "px, 0px)";
    });

    myScroll.on('scrollEnd', function () {
        grid.style[transformPrefixed] = "rotateX(80deg) translate(" + this.x * 0.43 + "px, 0px)";
        if (this.currentPage.pageX === 0) {
            document.getElementById('scrollerPrevious').className = "scrollerNavigation disabled";
            document.getElementById('scrollerNext').className = "scrollerNavigation";
        } else if (this.currentPage.pageX === this.pages.length - 1) {
            document.getElementById('scrollerPrevious').className = "scrollerNavigation";
            document.getElementById('scrollerNext').className = "scrollerNavigation disabled";
        } else {
            document.getElementById('scrollerPrevious').className = "scrollerNavigation";
            document.getElementById('scrollerNext').className = "scrollerNavigation";
        }
    });

    ak.width = window.innerWidth;
});


document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

/* Navigation previous and next icons */
$('#scrollerNext').on('vclick', function () {
    myScroll.next(400, IScroll.utils.ease.quadratic);
});

$('#scrollerPrevious').on('vclick', function () {
    myScroll.prev(400, IScroll.utils.ease.quadratic);
});

/* Add video into the page */
function addVideo (videoHref) {
    $('#videoPlayer').addClass('dropin');
    setTimeout(function () {
        $('#videoContent').html('<iframe src="' + videoHref + '?api=1&amp;player_id=player&amp;autoplay=1&amp;badge=0&amp;byline=0&amp;color=F22E9C&amp;portrait=0&amp;title=0" width="576" height="315" frameborder="0" webkitallowfullscreen allowfullscreen></iframe>');
    }, 2000);
}

/* How to open the video */
$('#scroller a').on('vclick', function (e) {
    var $this = $(this);

    if (ak.width > 620) {
        e.preventDefault();
        addVideo($this.attr('href'));
        return false;

    } else {
        window.location = $this.attr('href');
    }
});

/* Animate closing of videos */
$('#videoClose').on('vclick', function() {
    $('#videoPlayer').attr('class', '');
    setTimeout(function () {
        $('#videoContent').html('');
    }, 2000);
    return false;
});

/* Open and close the navigation */
$('#menuToggle').on('click', function() {
    $('#menu').toggleClass('open');
    $('#menuToggleIcon').toggleClass('close');
});

window.onresize();