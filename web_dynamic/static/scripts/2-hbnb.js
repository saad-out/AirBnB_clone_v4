$(document).ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  const checkedAmenities = {};

  $('.amenities input[type="checkbox"]').on('change', function () {
    if ($(this).is(':checked')) {
      checkedAmenities[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete checkedAmenities[this.getAttribute('data-id')];
    }
    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });
});
