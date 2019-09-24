$(document).ready(function(){
	$("button:eq(0)").click(function(){
		$("table tr").first().after('<tr>'+ 
			'<td>'+
				'<select class="item" size="1">'+
					'<option value="pizza">Pizza</option>'+
					'<option value="hamburger">Hamburger</option>'+
					'<option value="hotdog">Hotdog</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select class="pricePerItem" size="1">'+
					'<option value="10000">Rp.10.000</option>'+
					'<option value="20000">Rp.20.000</option>'+
					'<option value="30000">Rp.30.000</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select class="numberOfItem" size="1">'+
					'<option value="1">1</option>'+
					'<option value="2">2</option>'+
					'<option value="3">3</option>'+
				'</select>'+
			'</td>'+
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

			pushValueIntoEachArray()

			calculatePayment()

			$("#billDisplay").prepend("<p>Date of transaction: "+dateTransaction+"</p>");
			
			// split the string into array with delimiter \
			// "\\" is the escape character for \
			let logoName = pathLogoName.split("\\");
			// the logo name is always in array with index 2
			$("#billDisplay").prepend('<img src="img/'+logoName[2]+'">');

			$("#billDisplay").append('<table class="table table-bordered">'+
				'<tr>'+
					'<th>Name Item</th>'+
					'<th>Price Per Item</th>'+
					'<th>Number of Item</th>'+
					'<th>Cost of Item</th>'+
				'</tr>'+
			'</table>');

			for(let i=0; i < nameItem.length; i++){
				$("#billDisplay table").append('<tr>'+
					'<td>'+nameItem[i]+'</td>'+
					'<td> Rp.'+pricePerItem[i]+'</td>'+
					'<td>'+numberOfItem[i]+'</td>'+
					'<td> Rp.'+costOfItem[i]+'</td>'+
				'</tr>');
			}

			$("#billDisplay").append('<ul class="list-group list-group-horizontal">'+
				'<li class="list-group-item">Sub Total: Rp.'+subPay+'</li>'+
				'<li class="list-group-item">Tax(10%): Rp.'+Tax+'</li>'+
				'<li class="list-group-item">Total: Rp.'+Total+'</li>'+
				'<li class="list-group-item">Payment: Rp.'+Pay+'</li>'+
				'<li class="list-group-item">Changes: Rp.'+changes+'</li>'+
			'</ul>');
		}
	});
	
	function putDotSeperator(){

		subPay = subPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		Tax = Tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		Total = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		Pay = Pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		changes = changes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

		for(let i=0; i<pricePerItem.length; i++){
			pricePerItem[i] = pricePerItem[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}

		for(let i=0; i<costOfItem.length; i++){
			costOfItem[i] = costOfItem[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	}

	function calculatePayment(){
		for(let i=0; i < costOfItem.length; i++){
			subPay = subPay + costOfItem[i];
		}
		Tax = subPay * 0.1;
		Total = subPay + Tax;
		changes = Pay - Total;

		putDotSeperator()
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