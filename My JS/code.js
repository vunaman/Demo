// JavaScript Document

var qrdata, cover, qrlogo, checkImg, canvas;

$(document).ready(function(){
	qrlogo = document.getElementById("qrlogo");
	cover = document.getElementById("cover");
	checkImg = 0;
	
	$("#button-submit").click(showQR); //click Creat QR Code
	$("#button-download").click(downloadIMG); //click Download
});

//chỉnh kích thước nội dung của mã QR ở đây
function generateQR()
{
	qrdata = document.getElementById("qr-data");
	var data = qrdata.value;
	
	$("#qrcode").empty();
	
	var qrcode = new QRCode("qrcode",{
		text: data,
		width: 190,	//chiều rộng
		height: 190,	//chiều cao
		colorDark: "#000000",		//màu sắc của mã
		colorLight: "#FFFFFF",		//màu sắc của nền
		correctLevel: QRCode.CorrectLevel.L		//mức độ sửa lỗi: L(7%), M(15%), Q(25%), H(30%)
	});
}

function readURL(input)
{	
	checkImg = 0;
	
	if (input.files && input.files[0])
	{
    	var reader = new FileReader();
            
    	reader.onload = function (e) 
		{
			$("#qrlogo").attr("src", e.target.result);
    	}
            
		reader.readAsDataURL(input.files[0]);
		checkImg = 1;
	}
}

function showQR()
{
	var file = document.getElementById("file-logo");
	
	generateQR();
	readURL(file);
	
	if(checkImg && qrdata.value != "")
	{
		qrlogo.style.opacity = "1";
		cover.style.opacity = "1";
	}
	else
	{
		qrlogo.style.opacity = "0";
		cover.style.opacity = "0";
	}
	
	$("#canvas").remove();
	setTimeout(function(){
		creatCanvas();	
	},200);
}

function creatCanvas()
{
	html2canvas(document.querySelector("#qr-container")).then(canvas => {
    	document.getElementById("qr-container").appendChild(canvas);
		$("#qr-container > canvas").attr("id","canvas");
	});
}

function downloadIMG()
{
	canvas = document.getElementById("canvas");
 	var dataURL = canvas.toDataURL();
	
	$("#downloadQR").attr("href",dataURL);
}

function copyContent(element)
{
	var $temp = $("<input>");
  	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}