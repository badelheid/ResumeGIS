///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\\///\\\///\\\///\\\///\\\\
/// 	Program:	map javascript																				                                                       \\\
///		Summary:	displays a world map with 6 random markers. when clicked zooms in to marker and displays a window.           \\\
/// 						After 10 seconds will pan back to original map.  																		                         \\\
/// 	Methods:  THANK YOU TO IAN WRIGHT!                                                                                     \\\
///             https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/                       \\\
/// 																								                                                                         \\\
/// Date          Version        Coder           Reason												                                               \\\
/// 2021-01-29    1              Heidi           Created Framwork										                                         \\\
/// 2021-02-01    1.1            Heidi           Finished.                                                                   \\\
///																									                                                                         \\\
///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\\///\\\///\\\///\\\///\\\\

jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAT071sHnZG3tNlCZu7YVaonzRkoA-JXhg&callback=initialize";
    document.body.appendChild(script);
});

/// set maps characteristics
function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'satellite'
    };

    // Display a map on webpage where specified in html
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
    ['Kashiri Power Plant, Moscow, Russia', 54.8564801, 38.25639609], ///interesting
    ['Hohe Esse, Freiberg, Germany', 50.96093, 13.35439], ///old and cool
		['Flin Flon Smelter, Flin Flon, Manitoba, Canada',54.770571, -101.883953], ///country of birth
		['Ashbridge Bay Wastewater Treatment Plant, Scarborough, Ontario, Canada', 43.656747, -79.318723], ///country of mother's birth
		['Halliwell Bleach Works, Bolton, UK',53.597969, -2.463174], ///country of father's birth
		['Dixon Chimney, Carlisle, UK',54.891856, -2.945334] ///interesting extra because didn't want to include fanshawe's.... more data for you right?
    ];

    // Info Window Content
    ///Height
    /// built
    /// use
    /// link for more info
    var infoWindowContent = [
       ['<div class="info_content">' +
        '<h3>Kashiri Power Plant</h3>' +
        '<p>Height: 320 m <br> Built: 1922 <br> Use: Provices electricity by burning coal and natural gas <br> <a href="https://web.archive.org/web/20120429191205/http://www.ogk1.com/activities/production_capacity/kashirskaya/" target="_blank">More Info</a> </p>' +
		'</div>'],
        ['<div class="info_content">' +
        '<h3>Hohe Esse</h3>' +
        '<p>Height: 140 m <br> Built: 1889 <br> Use:  Exhaust from smelting <br> <a href="https://structurae.net/en/structures/halsbrucke-smokestack" target="_blank">More Info </a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Flin Flon Smelter</h3>' +
        '<p>Height: 251 m <br> Built: 1976 <br> Use: move pollutants from copper smelter emissions up<br><a href="https://www.thereminder.ca/news/local-news/flin-flon-1967-77-single-smoke-stack-shops-housing-shortage-and-strike-1.20337207#:~:text=StandOut-,Flin%20Flon%2C%201967-77%3A%20Single%20smoke%20stack%2C,shops%2C%20housing%20shortage%20and%20strike&text=Construction%20of%20the%20HBM%26S%20smoke,Flon%20Aqua%20Centre%20in%201974." target="_blank" >More Info</a></p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Ashbridge Bay Wastewater Treatment Plant</h3>' +
        '<p>Height: 185 m <br> Built: 1910 <br> Use: dewatered biosolid cakes were incinerated then the smoke stack was used to scrub the emissions. <br><a href="https://web.archive.org/web/20141103003630/http://www.toronto.ca/health/hphe/pdf/abtp_emissions_full.pdf" target="_blank">More Info</a></p>' +
        '</div>'] ,
		['<div class="info_content">' +
        '<h3>Halliwell Bleach Works</h3>' +
        '<p>Height: 75 m <br> Built: 1863 <br> Use: to remove boiler smoke and soot away from freshly bleached clothes<br><a href="https://www.theboltonnews.co.uk/news/16892219.bolton-tallest-chimneys/" target="_blank">More Info</a></p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Dixon Chimney</h3>' +
        '<p>Height: 88 m <br> Built: 1863 <br> Use: built to disperse noxious fumes from cotton then wool manufacturing further away from citizens. <br><a href="https://en.wikipedia.org/wiki/Dixon%27s_Chimney_and_Shaddon_Mill" target="_blank" >More Info</a></p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]

        });

        // Allow each marker to have an info window and zooms in and out on click and timer
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
				map.setZoom(17);
				window.setTimeout(() => {
				map.setZoom(4);}, 10000);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(4);
        google.maps.event.removeListener(boundsListener);
    });

}
/////
