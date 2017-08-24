var loadingNextPage = false;

$(document).on('scroll', _.throttle(function (e) {
  if (loadingNextPage) {
    return;
  }

  if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 1000) {
    return;
  }

  loadingNextPage = true;

  $('.pagination_links').hide();

  var $nextPageButton = $('.pagination_links_container .element.page.selected + a');

  if ($nextPageButton.length === 0) {
    return;
  }

  $.get({
    url: $nextPageButton.attr('href'),
    success: function (data) {
      $nextPage = $(data);
      $('.mainList .tabsContent ul').append($nextPage.find('.mainList .tabsContent ul').children());
      $('.pagination_links_container').empty().append($nextPage.find('.pagination_links_container').children());
      $('.pagination_links').show();

      loadingNextPage = false;
    }
  });
}, 500));
