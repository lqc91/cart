// 若将var cart = document.querySelector("#cart");注释，代码为何正常运行而不报错？
var cart = document.querySelector("#cart");
var selAll = cart.querySelector(".sel-all-ipt");
var sel = cart.querySelectorAll(".sel-ipt");
var selLen = sel.length;

// 全选按钮全选与全不选事件
selAll.onclick = selAllHandler;

var add = cart.querySelectorAll(".add");
var subtract = cart.querySelectorAll(".subtract");
var quantity = cart.querySelectorAll(".quantity");
var price = cart.querySelectorAll(".j-price");
var idx = 0;
for(var i = 0; i < selLen; i ++ ) {
	// 商品选择按钮选择与不选事件
	sel[i].onclick = selHandler;
	
	add[i].id = "add-" + i;
	// 加号按钮点击事件：
	// 点击加号按钮一次，对应商品数量加一，并改变相应商品总价与应付金额
	add[i].onclick = addHandler;
	
	subtract[i].id = "subtract-" + i;
	// 减号按钮点击事件：
	// 点击减号按钮一次，判断对应商品数量是否不小于1
	// 若是，对应商品数量减一，并改变相应商品总价与应付金额；
	// 若否，不进行任何操作
	subtract[i].onclick = subtractHandler;
	
	quantity[i].id = "quantity-" + i;
	// 鼠标失焦事件：
	// 键盘输入商品数量，鼠标失焦，判断输入是否为不小于1的数字，并执行相应代码
	quantity[i].onblur = quantityHandler;
}

var money = document.querySelector(".money");
var total = cart.querySelectorAll(".j-total");
var priceValue = [];
var quantityValue = [];
var totalValue = [];
// 全选/全不选
function selAllHandler() {
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
// 选择
function selHandler() {
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
// 累加
function addHandler() {
	idx = this.id.slice(4);
	quantity[idx].value = +quantity[idx].value + 1;
	settle();
}
// 累减
function subtractHandler() {
	idx = this.id.slice(9);
	if ( quantity[idx].value > 1 ) {
		quantity[idx].value -= 1;
		settle();
	}
}
// 更新数量
function quantityHandler() {
	idx = this.id.slice(9);
	if ( isNaN( +quantity[idx].value ) || +quantity[idx].value < 1 ) {
		alert( "请输入不小于1的正确数字！" );
		quantity[idx].value = 1;
	}
	settle();
}
// 结算：计算应付金额
function settle () {
	var sum = 0;
	for ( var i = 0; i < selLen; i++ ) {
		// console.log(price[i].innerHTML);
		priceValue[i] = +price[i].innerHTML.slice(1);
		quantityValue[i] = +quantity[i].value;
		totalValue[i] = priceValue[i] * quantityValue[i];
		total[i].innerHTML = "￥" + totalValue[i];
		if ( sel[i].checked === true ) {
			sum += totalValue[i];
		}
	}
	money.innerHTML = "￥" + sum;
}