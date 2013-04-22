/*!
 * jBehance - jQuery Plugin
 * version: 1.0.0 (Mon, 22 Apr 2013)
 * @requires jQuery v1.6 or later
 *
 * Copyright 2013 Jepson Rae Ltd - www.jepsonrae.com
 *
 *
 * Access your Behance feed from jQuery
 *
 */
(function( $ ){

  $.fn.jBehance = function( options ) {  

    // Default settings
    var settings = $.extend( {
      'username'  : 'jepsonrae',
      'limit'     		: 10
    }, options);


    return this.each(function() {        

     	
     	var container = $(this);
      var output = '';
      var url = 'http://www.behance.net/'+ settings.username +'.xml';

      
      $.ajax({
		    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+ parseInt(settings.limit) +'&callback=?&q=' + encodeURIComponent(url),
		    dataType: 'json',
		    success: function(data) {
		      
		      $(data.responseData.feed.entries).each(function(){
			    	
			    	// Start a new Behance entry div
			    	var outputEntry = '<div class="behance-entry">';
			    	

			    	// Data extracted from feed
			    	var project_title 		= $(this)[0].title;
			    	var link_href 				= $(this)[0].link;
			    	
			    	
			    	var content_html_nodes = $.parseHTML( $(this)[0].content);
			    	
			    	var project_caption 	= content_html_nodes[2].textContent;
			    	var image_src 				= content_html_nodes[0].src;
			    	
			    	

			    	// HTML output data
			    	var be_title 		= '<div class="behance-entry-title"><a href="'+link_href+'" title="View project on Behance">'+project_title+'</a></div>';
			    	var be_image 		= '<div class="behance-entry-image"><a href="'+link_href+'" title="View project on Behance"><img src="'+image_src+'" alt="'+project_title+'"></a></div>';
			    	var be_caption 	= '<div class="behance-entry-caption">'+project_caption+'</div>';
			    	
			    	
			    	// Concatenate the data and close the output entry div
			    	outputEntry += (be_title+be_image+be_caption)+'</div>';
			    	
			    	
			    	// Append entry to main output string
			    	output += outputEntry;
		      });
		      
		     
		      // Close the output div
		      output += '<div class="clear"></div></div>';
		     
		      // Insert contents onto page inside the containing element
			    container.html(output); 
		    }
		  });

    });

  };
})( jQuery );