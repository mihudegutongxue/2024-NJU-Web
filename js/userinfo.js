$(function(){
  $('.cardSection').removeClass('opacity');
  setTimeout(function(){
    $('.cardSection .container').removeClass('anim');
    setTimeout(function () {
      $('.cardSection .container').addClass('movCards');
    }, 1000)
  }, 1000)
})