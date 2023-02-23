$(document).ready(function() {
  const url = 'http://0.0.0.0:5001/api/v1/';
  $.get(url + 'status/', function(data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: url + 'places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces
  });

  const checkedAmenities = {};

  $('.amenities input[type="checkbox"]').on('change', function() {
    if ($(this).is(':checked')) {
      checkedAmenities[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete checkedAmenities[this.getAttribute('data-id')];
    }
    if (Object.values(checkedAmenities).length == 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.values(checkedAmenities).join(', '))
    };
  });

  $("BUTTON").click(function() {
    $.ajax({
      url: url + 'places_search/',
      type: 'POST',
      data: JSON.stringify({
        'amenities': Object.values(checkedAmenities)
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: appendPlaces
    })
  })


  function appendPlaces(data) {
    $('SECTION.places').empty();
    $('SECTION.places').append(data.map(place => {
		console.log(place)
      return `<article>
	  				<div class="title_box">
	    				<h2>${place.name}</h2>
	    				<div class="price_by_night">$${place.price_by_night}</div>
	  				</div>
	  				<div class="information">
	    				<div class="max_guest">${place.max_guest} ${place.max_guest !== 1 ? 'Guests' : 'Guest'}</div>
            			<div class="number_rooms">${place.number_rooms} ${place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom'}</div>
            			<div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}</div>
	  				</div>
          			<div class="description">
	    				${place.description}
          			</div>
				</article>`;
    }))
  }
});
