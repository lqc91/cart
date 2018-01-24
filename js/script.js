// 若将var cart = document.querySelector("#cart");注释，代码为何正常运行而不报错？
var cart = document.querySelector("#cart");
var selAll = cart.querySelector(".sel-all-ipt");
var sel = cart.querySelectorAll(".sel-ipt");
var selLen = sel.length;

// 全选按钮全选与全不选事件
selAll.onclick = selAllHandler;
function selAllHandler () {
	if ( this.checked === false ) {
		for ( var i = 0; i < selLen; i ++ ) {
			sel[i].checked = false;
		}
		money.innerHTML = "￥" + 0;
	} else {
		for ( var i = 0; i < selLen; i ++ ) {
			sel[i].checked = true;
		}
		settle();
	}
}

// 商品选择按钮选择与不选事件
for ( var i = 0; i < selLen; i ++ ) {
	sel[i].onclick = selHandler;
	function selHandler () {
		for ( var i = 0; i < selLen; i++ ) {
			if ( sel[i].checked === false ) {
				selAll.checked = false;
				settle();
				break;
			}
			if ( i === selLen-1 ) {
				selAll.checked = true;
				settle();
				break;
			}
		}
	}
}

var add = cart.querySelectorAll(".add");
var subtract = cart.querySelectorAll(".subtract");
var num = cart.querySelectorAll(".num");
var price = cart.querySelectorAll(".j-price");
// Uncaught TypeError: price.slice is not a function?
// var price = cart.querySelectorAll(".price");
// var priceArr = price.slice(1);
var idx = 0;
for(var i = 0; i < selLen; i ++ ) {
	add[i].id = "add-btn-" + i;
	// 加号按钮点击事件：
	// 点击加号按钮一次，对应商品数量加一，并改变相应商品总价与应付金额
	add[i].onclick = addHandler;
	function addHandler () {
		idx = this.id.slice(8);
		num[idx].value = +num[idx].value + 1;
		settle();
	}
	subtract[i].id = "subtract-btn-" + i;
	// 减号按钮点击事件：
	// 点击减号按钮一次，判断对应商品数量是否不小于1
	// 若是，对应商品数量减一，并改变相应商品总价与应付金额；
	// 若否，不进行任何操作
	subtract[i].onclick = subtractHandler;
	function subtractHandler () {
		idx = this.id.slice(13);
		if ( num[idx].value > 1 ) {
			num[idx].value -= 1;
			settle();
		}
	}
	num[i].id = "num-ipt-" + i;
	// 鼠标失焦事件：
	// 键盘输入商品数量，鼠标失焦，判断输入是否为不小于1的数字，并执行相应代码
	num[i].onblur = numHandler;
	function numHandler () {
		idx = this.id.slice(8);
		console.log(idx);
		if ( isNaN( +num[idx].value ) || +num[idx].value < 1 ) {
			alert( "请输入正确的数字！" );
		} else {
			settle();
		}
	}
}

var money = document.querySelector(".money");
var total = cart.querySelectorAll(".j-total");
var priceVal = [];
var numVal = [];
var totalVal = [];

// 结算函数
function settle () {
	var sum = 0;
	for ( var i = 0; i < selLen; i++ ) {
		// console.log(price[i].innerHTML);
		priceVal[i] = +price[i].innerHTML.slice(1);
		numVal[i] = +num[i].value;
		totalVal[i] = priceVal[i] * numVal[i];
		total[i].innerHTML = "￥" + totalVal[i];
		if ( sel[i].checked === true ) {
			sum += totalVal[i];
		}
	}
	money.innerHTML = "￥" + sum;
}