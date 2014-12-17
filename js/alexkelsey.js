var ak = window.ak || {};

WebFontConfig = {
    google: {
        families: ['Lato:700:latin', 'Lato:300:latin', 'Lato:100:latin']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

function getPrefix(prop) {
    var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'],
        elem = document.createElement('div'),
        upper = prop.charAt(0).toUpperCase() + prop.slice(1);

    if (prop in elem.style) {
        return prop;
    }

    for (var len = prefixes.length; len--; ) {
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

$('#scrollerNext').on('click', function () {
    myScroll.next(400, IScroll.utils.ease.quadratic);
});

$('#scrollerPrevious').on('click', function () {
    myScroll.prev(400, IScroll.utils.ease.quadratic);
});

function addVideo (videoHref) {
    var vimeoHTML = '<iframe src="' + videoHref + '?api=1&amp;player_id=player&amp;autoplay=1&amp;badge=0&amp;byline=0&amp;color=F22E9C&amp;portrait=0&amp;title=0" width="576" height="315" frameborder="0" webkitallowfullscreen allowfullscreen></iframe>';

    $('#videoPlayer').addClass('dropin');

    setTimeout(function () {
        $('#videoContent').html(vimeoHTML);
    }, 2000);
}

$('#scroller a').on('click', function (e) {
    var $this = $(this);

    if (ak.width > 620) {
        e.preventDefault();
        addVideo($this.attr('href'));
        return false;

    } else {
        window.location = $this.attr('href');
        return true;
    }
});

$('#videoClose').on('click', function() {
    $('#videoPlayer').attr('class', '');
    setTimeout(function () {
        $('#videoContent').html('');
    }, 2000);
    return false;
});

$('#mobileMenuToggle').on('click', function() {
    $('#mobileNavigation').toggleClass('mobileMenuOpen');
});

window.onresize();