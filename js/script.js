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
	};
}

// 计算一条商品总价
function totalCal () {
	return totalArr[index].innerHTML = "￥" + parseInt( priceArr[index].innerHTML.slice(1) ) * parseInt( countValue[index].value );
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

var countAdd = document.querySelectorAll(".count-add");
var countSubtract = document.querySelectorAll(".count-subtract");
var countValue = document.querySelectorAll(".count-value");
var priceArr = document.querySelectorAll(".item-price");
var index = 0;
for(var i = 0; i < countValue.length; i ++ ) {
	countAdd[i].id = "add-btn-" + i;
	// 加号按钮点击事件：
	// 点击加号按钮一次，对应商品数量加一，并改变相应商品总价与应付金额
	countAdd[i].onclick = function () {
		index = this.id.slice(8);
		countValue[index].value = parseInt( countValue[index].value ) + 1;
		totalCal();
		payCal();
	};
	countSubtract[i].id = "subtract-btn-" + i;
	// 减号按钮点击事件：
	// 点击减号按钮一次，判断对应商品数量是否不小于1
	// 若是，对应商品数量减一，并改变相应商品总价与应付金额；
	// 若否，不进行任何操作
	countSubtract[i].onclick = function () {
		index = this.id.slice(13);
		if ( countValue[index].value > 1 ) {
			countValue[index].value -= 1;
			totalCal();
			payCal();
		}
	};
	countValue[i].id = "value-ipt-" + i;
	// 鼠标失焦事件：
	// 键盘输入商品数量，鼠标失焦，判断输入是否为不小于1的数字，并执行相应代码
	countValue[i].onblur = function () {
		index = this.id.slice(10);
		// console.log(Number( countValue[index].value ));
		if ( isNaN( Number( countValue[index].value ) ) || Number( countValue[index].value ) < 1 ) {
			alert( "请输入正确的数字！" );
		} else {
			totalCal();
			payCal();
		}
	}
}