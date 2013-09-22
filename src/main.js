(function() {
  var $_ = jQuery;
  $_(window).resize(function() {
    var newHeight = $_(".slider-cycle .displayblock").height();
    $_(".slider-cycle").css("height", newHeight);
  });
})();

