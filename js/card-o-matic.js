// Tool tip for delete icon
	$(function() {
		$(".myToolTip").tooltip();
	});
	
	
// Change font for card
	$("#fonts").change(function() {
		
		// Get font family
		var fontFamily = $(this).val();
		
		// Set font Family for Canvas Elements
		$('#card-background #message-output, #card-background #recipient-output').css("font-family", fontFamily);
	});


// Change Background color for canvas and texture divs
	$(".colors").click(function() {
		
		// Get the value of clicked color
		var myColor = $(this).css("background-color");
		
		// Set selected color for canvas 
		$("#canvas").css('background-color', myColor);
		
		// Set selected color for texture divs
		$(".textures").css('background-color', myColor);
	});



// Change texture of the card
	$(".textures").click(function() {
		
		// Get the value of clicked texture
		var myTexture = $(this).css('background-image');
		
		// Set texture to canvas
		$("#canvas").css("background-image", myTexture);
	});


// Display selected message on canvas
	$(".messages").click(function() {
		
		// Get Selected message radio button
		var mySelection = $(this);
		
		// Get it's label, Which is next to it.
		var myLabel = mySelection.next();
		
		// Get labels Value
		var myMessage = myLabel.html();
		
		// match the message 
		if (myMessage == "No Message") {
			
			// Display nothing
			$('#message-output').html(" ");
			
		} else {
			
			// display Label's text
			$('#message-output').html(myMessage);
		}
	});


// Make message Draggable
	$("#message-output").draggable({ 
		containment: '#canvas', 
		cursor: "move", 
		cursorAt: { top: 56, left: 56 } 
	});


// Display Recepient Name on Canvas
	$("input#recipient").keyup(function() {
		
		// Get the Value types in input
		var recipient = $(this).val();
		
		$("#recipient-output").html(recipient);
		
		
		// Make the Recepient name draggable
		$("#recipient-output").draggable({
			containment: '#canvas', 
			opacity:.35, 
			cursor: "move", 
			cursorAt: { top: 56, left: 56 },
		});
		
		// check the length of the types name
		var length = recipient.length;
		
		// Check the length
		if (length == 14){
			
			// if length is 14 show the error
			$("#recipient-error").html("Max characters: 14");
			
		} else {
			
			// display nothing
			$("#recipient-error").html("");
		}
	});
	

// Make Sticker Draggable. Create Delete optio  to delete individual images on canvas
	$('.stickers').draggable(
		{ revert: true },
		{ revertDuration: 0 }, 
		{stop: function( event, ui ) {
	
			// Clone what I dragged
			var mySticker = $(this).clone();
	        
			// Set mySticker position and cursor
			mySticker.css({"position":"absolute", "left":"0", "top":"0", "cursor":"move"});
			
			// add a new class to mySticker
			mySticker.addClass('stickers_on_card');
			
			// add to canvas at the beginning 
			$("#canvas").prepend(mySticker);
			
			//  make mySticker draggable with in Canvas
			mySticker.draggable({containment: '#canvas'});
	
			// drop individual image on canvas
			// to Make Recepient delete more efficient in different order of deletion with stickers
			$( "#droppable" ).droppable({
				accept: ".stickers_on_card",
				activeClass: "ui-state-hover",
				hoverClass: "ui-state-active",
				drop: function( event, ui ) {
					
					// add this delete icon
					$(this).html('<br/><br/><span class="glyphicon glyphicon-trash" title="Drag the sticker here to delete."></span><p></p>');
					
					// add tool tip
					$(this).find(".glyphicon-trash").tooltip();
					
					// Find 'p' element, display Image Dropped, Fade it slowly
					$( this )
						.find( "p" )
							.html("Sticker dropped!")
								.fadeOut( "slow" );
					
					// Delete Image			
					$( ui.draggable ).remove();	
				}
			});
		}
	});


// Refresh The card
	$('#refresh-btn').click(function() {
		
		// Reset color and texture
		$('#preview #canvas').css('background-color', 'white');
		$('#preview #canvas').css('background-image', '');
		
		// Clear message and recipient divs
		$('#preview #message-output').html("");
		$('#preview #recipient-output').html("");
			
		// Remove any stickers
		$('#preview .stickers_on_card').remove();
		
		// clear error message
		$("#print_error").html("");
		
		// Delete save error
		$("#save_error").html(" ");
	});
	
	
// Function myCanvas for print and save card
	function myCanvas() {
		
		// Take the existing card on the page (in the #canvas div) and clone it for the new tab
		var canvas_clone = $('#canvas').clone();
		
		// Give us the whole canvas, i.e the complete card from our clone
		var canvas = canvas_clone.prop('outerHTML');
		
		// For the new tab, we need to basically construct all the pieces we need for any HTML page starting with a start <html> tag.
		var new_tab_contents = '<html>';
		
		// Adding onto our new_tab_contents variable one line at a time)
		new_tab_contents += '<head>';
		new_tab_contents += '<link rel="stylesheet" href="css/main.css" type="text/css">'; // Add CSS
		new_tab_contents += '<link rel="stylesheet" href="css/features.css" type="text/css">'; // Add CSS
		new_tab_contents += '</head>';
		new_tab_contents += '<body>';
		new_tab_contents += canvas; // Here's where we add the card to our HTML for the new tab
		new_tab_contents += '</body></html>';
		
		return new_tab_contents;
	}


// Print Card in new Tab
	$('#print-btn-card').click(function() {
		
		var canvasVal = $('#canvas img').attr("src");
		var messageVal = $('#message-output').html();
		var recepientVal = $('#recipient-output').html();
		
		// print error the any of these conditions are true
		if ((canvasVal == undefined) || (messageVal == "") ) {
			
			// Delete save error
			$("#save_error").html(" ");
			
			// Print the following Error
			$("#print_error").html("You can not print a blank card. <br/> You need to select an image, a message and a recepient.<br/> If you don't want to write a message. Please select No message option.")
			
		} else if ((recepientVal == "") || ($.trim($("#recipient-output").html()) === "")) {
			
			// Delete save error
			$("#save_error").html(" ");
			
			// clear error message first
			$("#print_error").html("");
			
			// Add another error message
			$("#print_error").html("Recepient Name is Important. <br/>");
			
		} else {
			
			// clear error message first
			$("#print_error").html("");
			
			// call function myCanvas
			var new_tab_contents = myCanvas();
			
			// To create a new tab
			var new_tab = window.open();
			
			// To open access to the document so we can make changes
			new_tab.document.open();
			
			// Here's the change we'll make: we'll write our card (i.e., new_tab_contents) to the document of the tab
			new_tab.document.write(new_tab_contents);
			
			// Then close the tab. 
			new_tab.document.close();
		}
	});
	
	
// Save Different Versions

	// Function to save cards at the bottom
	var count = 0;
	
	$( "#save-btn-card" ).click(function() {
		
		// clear error message first
		$("#print_error").html("");
		
		// show the button
		$("#clear-copy").removeClass("hidden").addClass("show");
		
		// call function myCanvas
		var new_tab_contents = myCanvas();
		
		var newColumn=" ";
		
		// add a new div / column if saved copies are less than 3
		if (++count <= 3) {
		
			// this will create one column every time save button is clicked
			newColumn += "<div class='saveCopy pull-left'>" + new_tab_contents + "</div>";
		
			// at the end of each cycle, add a div.saveCopy inside div#saved-canvas
			$("#saved-canvas").append(newColumn);
		
		} else {
			
			// If saved copies are more than 3 show this error
			$("#save_error").html("Max Saved Designs: 3")
		}
	});
	
	
	// Function to clear saved cards
	$('#clear-copy').click(function() {
		
		// set count to zero
		count = 0;
		
		// delete right margin
		$(".saveCopy").css("margin", "0 0 0 0");
		
		// delete .saveCopy div
		$(".saveCopy").html(" ");
		
		// delete an save_error
		$("#save_error").html(" ");
		
		// hide the clear copy button
		$(this).removeClass("show").addClass("hidden");
	});
	
	

	
	
	

