$(document).ready(function(){
	$("button:eq(0)").click(function(){
		$("table tr").first().after('<tr>'+ 
			'<td>'+
				'<select class="item" size="1">'+
					'<option value="Pizza">Pizza</option>'+
					'<option value="Hamburger">Hamburger</option>'+
					'<option value="Hotdog">Hotdog</option>'+
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
	
		if (pathLogoName == "" || dateTransaction == "" || Pay == 0 || $("select").length == 0){
			alert("Logo, Date, Pay and Items are Mandatory");
		} else {
			clearElementInBillDisplayAndInitialVariables()

			pushValueIntoEachArray()

			calculatePayment()

			$("#billDisplay").prepend("<p>Date of transaction: "+dateTransaction+"</p>");
			
			// split the string into array with delimiter \
			// "\\" is the escape character for \
			let logoName = pathLogoName.split("\\");
			// the logo name is always in array with index 2
			$("#billDisplay").prepend('<div id="divLogo"><img src="img/'+logoName[2]+'"></div>'); 

			$("#billDisplay").append('<table class="table table-striped">'+
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

			$("#billDisplay").append('<p>Thank you for your visit.</p>');
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

	$("button:eq(2)").click(function() {
		    
	    let w = window.open('', '', 'left=0,top=0,width=800,height=500,toolbar=0,scrollbars=1,status=0');

		let billDisplayContent = $("#billDisplay").html();
	    w.document.write(billDisplayContent);
	    w.document.head.innerHTML = 
		'<meta charset="utf-8">'+
		'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">'+
		'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>'+
		'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>'+
		'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>'+
		'<style> img { width: 100px; height: 100px; } p { text-align: center; } #divLogo { width: 100%; text-align: center; } </style>';

	    w.setTimeout(function(){ w.window.print(); }, 1000);
	});
});