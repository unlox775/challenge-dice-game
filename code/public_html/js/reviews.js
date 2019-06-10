$(document).ready(function () {

	// Check if Reviews have already been downloaded
	checkForLoaded();

});

function checkForLoaded() {
	$.ajax({
		type: "POST",
		url: "/api/reviews-extract/1/5/mckaig-chevrolet-buick",
		success: function( data ) {
			// debugger;
			$('#scrape-status').html('Analysis Complete!');

			var htmlContent = '';
			for (var i = 0; i < 3 ; i++) {
				htmlContent += (
					'<h6>Worst Over-Positive Review #'+ (i+1) +' - <em>'+ data.ranked_reviews[i].username +'</em><br><b>Score: '+ Math.floor(data.ranked_reviews[i].sensationalism_rank) +'</b></h6>'
					+ '<pre id="result" style="white-space: pre-wrap; font-size: 8pt">'
					+ JSON.stringify(data.ranked_reviews[i], undefined, 2)
					+ '</pre>'
					);
			}

			$( "#result" ).html(htmlContent);
		},
		error: function( data ) {
			$('#scrape-status').html('Not Scraped Yet');
			// debugger;
		},
		dataType: 'json'
	});
}

function startScrape() {
	$('#scrape-status').html('Scraping in Progress...');
	$.post(                 "/api/scrape/1/mckaig-chevrolet-buick", function( data ) {
		$.post(             "/api/scrape/2/mckaig-chevrolet-buick", function( data ) {
			$.post(         "/api/scrape/3/mckaig-chevrolet-buick", function( data ) {
				$.post(     "/api/scrape/4/mckaig-chevrolet-buick", function( data ) {
					$.post( "/api/scrape/5/mckaig-chevrolet-buick", function( data ) {
						checkForLoaded();
					});
				});
			});
		});
	});
}
