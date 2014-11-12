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
    document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';

    var list = document.getElementById('scroller'),
        listItems = list.getElementsByTagName('li'),
        listItemsWidth = listItems[0].offsetWidth;

    list.style.width = (listItems.length * listItemsWidth) + 'px';

    ak.width = window.innerWidth;
};

function hasClass (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

function loaded () {
    document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';

    var list = document.getElementById('scroller'),
        listItems = list.getElementsByTagName('li'),
        listItemsWidth = listItems[0].offsetWidth;

    list.style.width = (listItems.length * listItemsWidth) + 'px';

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
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

document.getElementById('scrollerNext').addEventListener('tap', function (e) {
    myScroll.next(400, IScroll.utils.ease.quadratic);
}, false);

document.getElementById('scrollerPrevious').addEventListener('tap', function (e) {
    myScroll.prev(400, IScroll.utils.ease.quadratic);
}, false);

var videoLinks = document.querySelectorAll('#scroller a'),
    i;

function addVideo (videoHref) {
    var vimeoHTML = '<iframe src="' + videoHref + '?api=1&amp;player_id=player&amp;autoplay=1&amp;badge=0&amp;byline=0&amp;color=F22E9C&amp;portrait=0&amp;title=0" width="576" height="315" frameborder="0" webkitallowfullscreen allowfullscreen></iframe>',
        videoPlayer = document.getElementById('videoPlayer'),
        videoContent = document.getElementById('videoContent');

    videoPlayer.className = "dropin";

    setTimeout(function () {
        videoContent.innerHTML = vimeoHTML;
    }, 2000);
}

for (i = 0; i < videoLinks.length; i += 1) {
    videoLinks[i].addEventListener('tap', function (e) {
        if (ak.width > 620) {
            e.preventDefault();
            addVideo(this.href);
            return false;
        } else {
            window.location = this.href;
            return true;
        }
    }, false);

    videoLinks[i].addEventListener('click', function (e) {
        if (ak.width > 620) {
            e.preventDefault();
            addVideo(this.href);
            return false;
        } else {
            window.location = this.href;
            return true;
        }
    }, false);
}

document.getElementById('videoClose').addEventListener('click', function (e) {
    document.getElementById('videoPlayer').className = '';
    setTimeout(function () {
        document.getElementById('videoContent').innerHTML = '';
    }, 2000);
    return false;
}, false);

document.getElementById('mobileTab').addEventListener('click', function (e) {
    var mobileNavigation = document.getElementById('mobileNavigation'),
        mobileCaptureEvent = document.getElementById('mobileCaptureEvent');

    if (hasClass(mobileNavigation, "open")) {
        mobileNavigation.className = "";
        mobileCaptureEvent.className = "";

    } else {
        mobileNavigation.className = "open";
        mobileCaptureEvent.className = "open";
    }
}, false);

document.getElementById('mobileCaptureEvent').addEventListener('click', function (e) {
    document.getElementById('mobileNavigation').className = "";
    document.getElementById('mobileCaptureEvent').className = "";
}, false);

window.onresize();