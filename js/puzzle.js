/**
 * @author reenuchahal
 */

// Logo Animation

	$("#logo").hover(function(){
		$(this).filter(':not(:animated)').animate({ marginLeft:'15px'},'slow');
	}, 
	function() {
		$(this).animate({ marginLeft:'0px'},'slow');
	});
	

// Content display and Menu Functionality

	$(".menu").click(function(){
	
		var myMenu = $(this).attr("id");
		
		if (myMenu == 'puzzles-nav' || 'puzzles-display'){
			$("#dream-puzzles").removeClass("hideDiv").addClass("show");
			$("#hero-unit, #learnTables, #makeCard").removeClass("show").addClass("hideDiv");
			$("#puzzles-nav").addClass("active");
			$("#home, #learnTab, #makeACard").removeClass("active");
		} 
	
		if (myMenu == 'home'){
			$("#hero-unit").removeClass("hideDiv").addClass("show");
			$("#dream-puzzles, #learnTables, #makeCard").removeClass("show").addClass("hideDiv");
			$("#home").addClass("active");
			$("#puzzles-nav, #learnTab, #makeACard").removeClass("active");
		} 
		if (myMenu == 'learnTab'){
			$("#learnTables").removeClass("hideDiv").addClass("show");
			$("#dream-puzzles, #hero-unit, #makeCard").removeClass("show").addClass("hideDiv");
			$("#learnTab").addClass("active");
			$("#puzzles-nav, #home, #makeACard").removeClass("active");	
		}
		if (myMenu == 'makeACard'){
			$("#makeCard").removeClass("hideDiv").addClass("show");
			$("#dream-puzzles, #hero-unit, #learnTables").removeClass("show").addClass("hideDiv");
			$("#makeACard").addClass("active");
			$("#puzzles-nav, #home, #learnTab").removeClass("active");	
		}
	
	});
	
// Menu 2: Puzzles
// Sortable Puzzle 

	// Select the Puzzle
	$('select').change(puzzleSwitch);
	
	function puzzleSwitch(){
		var selectPuzzle = $("#selectPuzzle").val();
		
		if (selectPuzzle == "p-butterfly"){
			$(".final_result").removeClass("show");
			$("#puzzleResult").html("Completed Puzzle");
			$(".butterfly").css("display","block");
			$(".babyRegalo").css("display","none");
			$("#dream-puzzles h2").html("Butterfly")
			$(".movement").html(" ");
		} else if (selectPuzzle == "p-babyRegalo"){
			$(".final_result").removeClass("show");
			$("#puzzleResult").html("Completed Puzzle");
			$(".babyRegalo").css("display","block");
			$(".butterfly").css("display","none");
			$("#dream-puzzles h2").html("Baby Regalo")
			$(".movement").html(" ");
		}
	}
	
	
	// Sort the Puzzle
	$(function(){
		$('.sortable').sortable({
			start: function(event, ui) {
				var start_pos = ui.item.index();
				ui.item.data('start_pos', start_pos);
			},
			
			change: function(event, ui) {
				
				var start_pos = ui.item.data('start_pos');
				var index = ui.placeholder.index();
				
				if (start_pos < index) {
					$('.sortable li:nth-child(' + index + ')').addClass('highlights');
					$(" .movement").html("Moving forward, at position "+ index  );
					ui.item.css('border', '2px solid red');
				} else {
					$('.sortable li:eq(' + (index + 1) + ')').addClass('highlights');
					$(" .movement").html("Moving backward at position "+ (index +1));
					ui.item.css('border', '2px solid red');
				}
			},
	
			update: function(event, ui) {
				$('.sortable li').removeClass('highlights');
				ui.item.css('border', '');
			}
		});
	
		$( "ul.sortable li" ).disableSelection();
	});


	// Reset Variables
	var sortableElementsOne = $("#sort-butterfly li");
	var sortableElementsTwo = $("#sort-babyRegalo li");
	
	// Reset the Sortable Puzzle
	$("#reset").click(function(){
		$("#sort-butterfly").append(sortableElementsOne);
		$("#sort-babyRegalo").append(sortableElementsTwo);
		$(".movement").html(" ");
	});
	

	// Toggle Completed puzzle 
	$("#puzzleResult").click(function(){
		
		// Toggle show class
		$(".final_result").toggleClass("show");
		
		// Get the button value
		var buttonVal = $(this).html();
		
		// Match the button value and Change it
		if (buttonVal == "Completed Puzzle"){
			
			//change html to close
			$("#puzzleResult").html("Close")
			
		} else {
			
			// Change html to completed Puzzle
			$("#puzzleResult").html("Completed Puzzle");
			
		}
	});
	

	// close the Completed Puzzle by clicking 'X' button on puzzle
	$(".close").click(function(){
		
		// remove class show
		$(".final_result").removeClass("show");
		
		// change html of #puzzleResult to 'Completed Puzzle'
		$("#puzzleResult").html("Completed Puzzle");
	});


	// Match Sorted puzzle with the Result and Declare the Result.
	$('.sortable').mouseover(showResult);
	
	
	// Butterfly puzzle result 
	var butterfly = Array(
		'<img src="images/butterfly/Butterfly_open-(1)_01.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_02.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_03.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_04.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_05.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_06.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_07.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_08.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_09.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_10.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_11.png" alt="butterfly">',
		'<img src="images/butterfly/Butterfly_open-(1)_12.png" alt="butterfly">'
	);

	// Baby Regalo puzzle result 			
	var babyRegalo = Array(
		'<img src="images/babyRegalo/babyRegalo_01.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_02.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_03.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_04.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_05.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_06.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_07.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_08.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_09.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_10.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_11.png" alt="babyRegalo">',
		'<img src="images/babyRegalo/babyRegalo_12.png" alt="babyRegalo">'
	);

	// Match Users Sorted puzzle results to the final Result Array
	function showResult(){
		
	    // Get Sorted puzzle in Array form
	    var x = $("#sort-butterfly li").toArray();
		var y = $( "#sort-babyRegalo li").toArray();
	    
	    // Innocent until proven guilty
	    var butterflySolved = true;
	    var babyRegaloSolved = true;
		
		// Match Solved ButterFly with Result
		for (i = 0; i < x.length; i++){
		
			// If any of them don't match, solved will be set to false
			if((x[i].innerHTML) != butterfly[i]){
				butterflySolved = false;
			}
		
			// Solved or not solved?
			if(butterflySolved == true){		
				$(".butterfly .puzzle_result").html("Puzzle Solved");
			} else {
				$(".butterfly .puzzle_result").html("Solve the Butterfly Puzzle.");
			}
		}
		
		// Match Solved Baby Ragelo with Result
		for (i = 0; i < y.length; i++){
		
			// If any of them don't match, solved will be set to false
			if((y[i].innerHTML) != babyRegalo[i]){
				babyRegaloSolved = false;
			}
		
			// Solved or not solved?
			if(babyRegaloSolved == true){		
				$(".babyRegalo .puzzle_result").html("Puzzle Solved");
			} else {
				$(".babyRegalo .puzzle_result").html("Solve the babyRegala Puzzle.");
			}
		}
	};

// Menu Learn Tables: Page 3 Content
	
	//  call function calulate on keyup
	$('input').keyup(calculate);
	
	// create a multiplication table
	function calculate() {
		
		// get the input value in variable
		var y = $("#column").val();
		
		if($.isNumeric(y)) {
			
			// delete an error message 
			$("#table_error").html(" ");
			
			// create an empty variable for row
			var newRow=" ";
			
			// create first row of table
			var firstRow = "<tr><th> ***</th><th>Table</th><th>For</th><th>"+ y +"</th><th>***</th></tr>";
			
			// add first row in table out of the loop
			$("#multiplicationTable").html(firstRow);
			
			// create a loop to get multiplication value for a number
			// this loop is for 10 rows / cycles
			for (var x=1; x<=10; x++) {
				
				// this will create columns with in each row
				newRow="<tr>";
				newRow += "<td>" + y + "</td>"+ "<td> &#215; </td>"+"<td>" + x + "</td>"+"<td>" + "=" + "</td>"+"<td>&nbsp;" + x*y + "</td>"; 
				newRow += "</tr>";
				
				// at the end of each cycle, add a row in the table
				$("#multiplicationTable").append(newRow);
			}
		
		} else {
			
			// Show the following error.
			$("#table_error").html("<ul>Enter a valid number. <li>No special characters or String</li><li>No negative Number.</li><li>No empty spaces.</li></ul>");
			
			 //reset table html to empty
			$("#multiplicationTable").html(" ");
			
		}
	};
	
	// reset Table
	$("#resetTable").click(function(){
		
		// reset column to empty
		$("#column").val(" ");
		
		// reset table html to empty
		$("#multiplicationTable").html(" ");
		
		//delete error message
		$("#table_error").html(" ");
	});
	

	// print table
	$('#print-btn').click(function() {
		
		// get the input value in variable
		var y = $("#column").val();
		
		if($.isNumeric(y)){
			
			// Take the existing card on the page (in the #canvas div) and clone it for the new tab
			var table_clone = $('#multiplicationTable').clone();
			var table = table_clone.prop('outerHTML'); 
		
			// For the new tab, we need to basically construct all the pieces we need for any HTML page starting with a start <html> tag.
			var new_tab_contents  = '<html>';
		
			// adding onto our new_tab_contents variable one line at a time
			new_tab_contents += '<head>';
			new_tab_contents += '<link rel="stylesheet" href="css/style.css" type="text/css">'; // Add CSS
			new_tab_contents += '<link rel="stylesheet" href="css/bootstrap.css" type="text/css">'; // Add CSS
			new_tab_contents += '</head>';
			new_tab_contents += '<body>'; 
			new_tab_contents += table; // Here's where we add the card to our HTML for the new tab
			new_tab_contents += '</body></html>';
			
			//  create a new tab 
			var new_tab =  window.open();
			
			//  open access to the document to make changes
			new_tab.document.open();
			
			// Here's the change we'll make
			new_tab.document.write(new_tab_contents);
			
			// Then close the tab. 
			new_tab.document.close();
		
		} else {
			
			// Show the following error.
			$("#table_error").html("There is nothing to print. Enter a numeric value in Input to print");
		}
	});
	
	