$("document").ready(function () {
	let amenities = {};
	$('INPUT[type="checkbox"]').change(function () {
		if ($(this).is(':checked')) {
			//add to amenities
			amenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			//remove from amenities
			delete amenities[$(this).attr('data-id')];
		}
		$('.amenities h4').text(Object.values(amenities).join(', '));
	})
})
