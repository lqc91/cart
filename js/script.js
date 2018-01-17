var cart = document.querySelector("#cart");
var selAll = cart.querySelector(".sel-all-ipt");
var sel = cart.querySelectorAll(".sel-ipt");
var selLen = sel.length;

// 全选按钮全选与全不选事件
selAll.onclick = function () {
	if ( this.checked === false ) {
		for ( var i = 0; i < selLen; i ++ ) {
			sel[i].checked = false;
		}
		pay.innerHTML = "￥" + 0;
	} else {
		for ( var i = 0; i < selLen; i ++ ) {
			sel[i].checked = true;
		}
		payCal();
	}
};

// 商品选择按钮选择与不选事件
for ( var i = 0; i < selLen; i ++ ) {
	sel[i].onclick = function () {
		for ( var i = 0; i < selLen; i++ ) {
			if ( sel[i].checked === false ) {
				selAll.checked = false;
				payCal();
				break;
			}
			if ( i === selLen-1 ) {
				selAll.checked = true;
				payCal();
				break;
			}
		}
	}
}

// 计算应付金额
var pay = document.querySelector("#pay");
var totalArr = document.querySelectorAll(".item-total");
function payCal () {
	var sum = 0;
	for ( var i = 0; i < totalArr.length; i++ ) {
		 if ( sel[i].checked === true ) {
		 	sum += parseInt(totalArr[i].innerHTML.slice(1));
		 }
	}
	pay.innerHTML = "￥" + sum;
}

// 加减按钮点击事件
var countAdd = document.querySelectorAll(".count-add");
var countSubtract = document.querySelectorAll(".count-subtract");
var countValue = document.querySelectorAll(".count-value");
var priceArr = document.querySelectorAll(".item-price");
var index = 0;
for(var i = 0; i < countValue.length; i ++ ) {
	countAdd[i].id = "add-btn-" + i;
	countAdd[i].onclick = function () {
		index = this.id.slice(8);
		countValue[index].value = parseInt( countValue[index].value ) + 1;
		totalArr[index].innerHTML = "￥" + parseInt( priceArr[index].innerHTML.slice(1) ) * parseInt( countValue[index].value );
		payCal();
	}
	countSubtract[i].id = "subtract-btn-" + i;
	countSubtract[i].onclick = function () {
		index = this.id.slice(13);
		if ( countValue[index].value == 1 ) {
			countValue[index].value = 1;
		} else {
			countValue[index].value -= 1;
		}
		totalArr[index].innerHTML = "￥" + parseInt( priceArr[index].innerHTML.slice(1) ) * parseInt( countValue[index].value );
		payCal();
	}
}