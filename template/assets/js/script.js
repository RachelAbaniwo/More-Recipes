$(() => {
    let windowHeight = $(window).height();

    $(".fullHeight").css ("height", windowHeight);
    $(".carousel-item img").each(function() {
        let imgSource = $(this).attr("src");
        $(this).parent().css({'background-image': 'url('+imgSource+')'});
        $(this).remove();
    });

    $(window).resize(() => {
        let windowHeight = $(window).height(); 
        $(".fullHeight").css ("height", windowHeight);
  })
})





