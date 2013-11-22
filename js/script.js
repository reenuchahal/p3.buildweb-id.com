/**
 * @author reenuchahal
 */

 
$('select').change(calculate);

function calculate(){
 var table = $("#tables").val();
 
 
if (table == "2"){
	$(".two").css("display","block");
	$(".two").addClass("active")
	$(".three").css("display","none");
	$(".three").removeClass("active");
}
else if ( table == "3"){
	$(".three").css("display","block");
	$(".three").addClass("active");
	$(".two").css("display","none");
	$(".two").removeClass("active")
}

};

// Temperature

$('input,select').change(calculateTemp);
			function calculateTemp(){
				
				var temperature = $("#temperature").val();
				var tempVal = $("#temp").val();
				if (tempVal == " "){
					$("input[name='temp']").val("0") ;
				}
				
				
				if (temperature == "cels") {
					
					var converter = ((9/5 )* tempVal + 32) + " F";
				}
				
				else {
					var converter = ((tempVal -32) * 5/9) + " C";
				}
				
				$("input[name='result']").val(converter);
				
			}
			$("button").click(function(){
				$("input[name='temp']").val(" ") ;
				$("input[name='result']").val(" ") ;
			});
	
// Tables

$('input,select').change(calculateT);
		
		
	function calculateT() {
			
			
			var tables    = $('#table_count').val();
			var multiplications = $('input[name=multiplications]:checked');
			var multiply = $('#multiply_count').val();
			var table= $("#multiplicationTable");
			//var total    = 0;
			
			//var result2 = tables  *  multiply;
			
			
			for (var x=1; x<= tables ; x++)
				{
					newRow="<tr>";
					
					for (var y=1; y<= multiply; y++)
					{
						newRow += "<td>" + x*y + "</td>"; 
					}
					newRow += "</tr>";
					
					table.append(newRow);
				}
							
			
			//multiplications.each(function() {
				
				//var row = $(this).val();
				
				//var result =   row * tables  ;
				
				//var final_result =row +" * "+ tables +" = "+result+ "<br/>";
				
			     
				 //	$('#output').append(final_result);
				 	
				 
				
			//}); 
			
			//for (i = 0; i < 10; i++){
				
			//};
			
			
				
		
			
			// end of loop
			//$('#output').html(result2);
			
			
		}
					
			