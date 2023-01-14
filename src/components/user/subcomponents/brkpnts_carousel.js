var words_to_display = 70; //character_to_display
var window_innerwidth = window.innerWidth;
var slides = 1;
if (window_innerwidth >= 1400) {
  //xxl
  slides = 2;
  words_to_display = 107;
} else if (window_innerwidth >= 1200) {
  //xl
  slides = 2;
  words_to_display = 97;
} else if (window_innerwidth >= 992) {
  //lg
  slides = 1;
  words_to_display = 120;
} else if (window_innerwidth >= 768) {
  //md
  slides = 2;
  words_to_display = 88;
} else if (window_innerwidth >= 576) {
  //sm
  slides = 3;
  words_to_display = 86;
} else if (window_innerwidth >= 420) {
  //xs - 1
  slides = 2;
  words_to_display = 85;
} //xs-2
else {
  slides = 1;
  words_to_display = 110;
}

export {words_to_display,slides};