(function() {
  'use strict';
  var preload = function (images) {
    for (var i = 0; i < images.length; ++i) {
      var img = new Image();
      img.src = images[i];
    }
  };
  var images = ['images/frenz_0.jpg', 'images/frenz_1.jpg', 'images/frenz_2.jpg', 'images/frenz_wide_0.jpg', 'images/frenz_wide_1.jpg', 'images/frenz_wide_2.jpg', 'images/pose_0.jpg', 'images/pose_1.jpg', 'images/pose_2.jpg', 'images/pose_3.jpg', 'images/pose_wide_0.jpg', 'images/pose_wide_1.jpg', 'images/pose_wide_2.jpg', 'images/pose_wide_3.jpg', 'images/travel_0.jpg', 'images/travel_1.jpg', 'images/travel_2.jpg', 'images/travel_3.jpg', 'images/travel_wide_0.jpg', 'images/travel_wide_1.jpg', 'images/travel_wide_2.jpg', 'images/travel_wide_3.jpg'];
  preload(images);

  var quotes = {
    travel: ['#wanderlust', '#wishyouwerehere', '#blessed', '#hashtag'],
    frenz: ['#frenz', '#sundayfunday', '#blessed', '#squad', '#tribe', '#squadgoals', '#hashtag'],
    pose: ['#mykneeispointing', '#pose', '#onefootontheground', '#hashtag']
  };

  var options = ['frenz', 'pose', 'travel'];

  var imageCount = {
    frenz: 3,
    pose: 4,
    travel: 4
  };

  var currentImg = undefined;
  var currentQuote = undefined;

  var picker = function (num) {
    return Math.floor(Math.random() * num);
  };

  var pickImageType = function () {
    var num = options.length;
    return options[picker(num)];
  };

  var pickImage = function (type) {
    var imgNum = picker(imageCount[type]);
    var img = type + '_' + imgNum + '.jpg';
    var imgString = type + '_' + imgNum + '.jpg';
    var windowDimensions = getWindowDimensions();
    if (windowDimensions.height < windowDimensions.width) {
      imgString = type + '_wide_' + imgNum + '.jpg';
    }
    return imgString;
  };

  var pickQuote = function (type) {
    var quoteNum = picker(quotes[type].length);
    return quotes[type][quoteNum];
  };

  var getNewImageAndQuote = function () {
    var imgType = pickImageType();
    var img = pickImage(imgType);
    var quote = pickQuote(imgType);

    while (img === currentImg) {
      img = pickImage(imgType);
    }
    while (quote === currentQuote) {
      quote = pickQuote(imgType);
    }

    return {
      img: img,
      quote: quote
    };
  };

  var getWindowDimensions = function () {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  };

  var getHeaderDimensions = function () {
    return {
      height: document.querySelector('h2').offsetHeight,
      width: document.querySelector('h2').offsetWidth
    };
  };

  var getTextPositionRange = function () {
    var windowDimensions = getWindowDimensions();
    var headerDimensions = getHeaderDimensions();
    return {
      height: windowDimensions.height - headerDimensions.height,
      width: windowDimensions.width - headerDimensions.width
    };
  };

  var translateText = function () {
    var header = document.querySelector('h2');
    var range = getTextPositionRange();
    var x = Math.round(Math.random() * range.width);
    var y = Math.round(Math.random() * range.height);
    if (x >= range.width / 2) {
      x = x - range.width / 10;
    } else {
      x = x + range.width / 10;
    }
    if (y >= range.height / 2) {
      y = y - range.height / 10;
    } else {
      y = y + range.height / 10;
    }
    var rotate = -20 + Math.round(Math.random() * 40);
    header.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate('+ rotate +'deg)';
  };

  var buildImage = function (options) {
    currentImg = options.img;
    currentQuote = options.quote;
    var quoteContainer = document.querySelector('#quote');
    document.querySelector('#background').style.backgroundImage = 'url(images/' + currentImg + ')'
    quoteContainer.innerText = currentQuote;
    translateText();
  };

  buildImage(getNewImageAndQuote());
  setInterval(function() {
    buildImage(getNewImageAndQuote());
  }, 3000)
}());
