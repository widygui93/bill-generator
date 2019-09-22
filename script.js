$(document).ready(function(){
	$("button:eq(0)").click(function(){
		$("table tr").first().after('<tr>'+ 
			'<td><input type="text" class="item" placeholder="..."></td>'+
			'<td><input type="text" class="pricePerItem" placeholder="..."></td>'+
			'<td><input type="text" class="numberOfItem" placeholder="..."></td>'+
		'</tr>');
	});

	let nameItem = []; let numberOfItem = [];
	let pricePerItem = []; let costOfItem = [];
	let pathLogoName; let dateTransaction;
	let Pay = 0; let changes = 0;
	let subPay = 0; let Tax = 0;
	let Total = 0;
	$("button:eq(1)").click(function(){
		pathLogoName = $('input[type="file"]').val();
		dateTransaction = $('input[type="date"]').val();
		Pay = $('#Pay').val();
	
		if (pathLogoName == "" || dateTransaction == "" || Pay == 0){
			alert("Logo, Date and Pay are Mandatory");
		} else {
			clearElementInBillDisplayAndInitialVariables()

			$("#billDisplay").prepend("<p>Date of transaction: "+dateTransaction+"</p>");
			
			// split the string into array with delimiter \
			// "\\" is the escape character for \
			let logoName = pathLogoName.split("\\");
			// the logo name is always in array with index 2
			$("#billDisplay").prepend('<img src="img/'+logoName[2]+'">');

			$("#billDisplay").append('<table class="table table-borderless">'+
				'<tr>'+
					'<th>Name Item</th>'+
					'<th>Price Per Item</th>'+
					'<th>Number of Item</th>'+
					'<th>Cost of Item</th>'+
				'</tr>'+
			'</table>');

			pushValueIntoEachArray()

			for(let i=0; i < nameItem.length; i++){
				$("#billDisplay table").append('<tr>'+
					'<td>'+nameItem[i]+'</td>'+
					'<td>'+pricePerItem[i]+'</td>'+
					'<td>'+numberOfItem[i]+'</td>'+
					'<td>'+costOfItem[i]+'</td>'+
				'</tr>');
			}

			calculatePayment()

			$("#billDisplay").append('<div>'+
				'<p> Sub Total: '+subPay+'</p>'+
				'<p> Tax(10%): '+Tax+'</p>'+
				'<p> Total: '+Total+'</p>'+
				'<p> Payment: '+Pay+'</p>'+
				'<p> Changes: '+changes+'</p>'+
			'</div>');
		}
	});
	
	function calculatePayment(){
		for(let i=0; i < costOfItem.length; i++){
			subPay = subPay + costOfItem[i];
		}
		Tax = subPay * 0.1;
		Total = subPay + Tax;
		changes = Pay - Total;
	}

	function clearElementInBillDisplayAndInitialVariables(){
		$("#billDisplay").empty();
		nameItem = []; 
		numberOfItem = [];
		pricePerItem = []; 
		costOfItem = [];
		changes = 0;
		subPay = 0; 
		Tax = 0;
		Total = 0;
	}

	function pushValueIntoEachArray(){
		$('.item').each(function(index){ 
			nameItem.push($(this).val());
		});

		$('.pricePerItem').each(function(index){ 
			pricePerItem.push($(this).val());
		});

		$('.numberOfItem').each(function(index){
			numberOfItem.push($(this).val());
		});

		for(let i=0; i < nameItem.length; i++){
			costOfItem.push(pricePerItem[i] * numberOfItem[i]);
		}
	}
});