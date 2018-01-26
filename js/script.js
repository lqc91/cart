// 若将var cart = document.querySelector("#cart");注释，代码为何正常运行而不报错？
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
		settle();
	}
};

// 商品选择按钮选择与不选事件
for ( var i = 0; i < selLen; i ++ ) {
	sel[i].onclick = function () {
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
	};
}

var add = document.querySelectorAll(".count-add");
var subtract = document.querySelectorAll(".count-subtract");
var value = document.querySelectorAll(".count-value");
var price = document.querySelectorAll(".item-price");
var idx = 0;
for(var i = 0; i < selLen; i ++ ) {
	add[i].id = "add-btn-" + i;
	// 加号按钮点击事件：
	// 点击加号按钮一次，对应商品数量加一，并改变相应商品总价与应付金额
	add[i].onclick = function () {
		idx = this.id.slice(8);
		value[idx].value = parseInt( value[idx].value ) + 1;
		settle();
	};
	subtract[i].id = "subtract-btn-" + i;
	// 减号按钮点击事件：
	// 点击减号按钮一次，判断对应商品数量是否不小于1
	// 若是，对应商品数量减一，并改变相应商品总价与应付金额；
	// 若否，不进行任何操作
	subtract[i].onclick = function () {
		idx = this.id.slice(13);
		if ( value[idx].value > 1 ) {
			value[idx].value -= 1;
			settle();
		}
	};
	value[i].id = "value-ipt-" + i;
	// 鼠标失焦事件：
	// 键盘输入商品数量，鼠标失焦，判断输入是否为不小于1的数字，并执行相应代码
	value[i].onblur = function () {
		idx = this.id.slice(10);
		if ( isNaN( Number( value[idx].value ) ) || Number( value[idx].value ) < 1 ) {
			alert( "请输入正确的数字！" );
		} else {
			settle();
		}
	}
}

var pay = document.querySelector("#pay");
var total = document.querySelectorAll(".item-total");
var priceValue = [];
var quantity = [];
var totalValue = [];

// 结算函数
function settle () {
	var sum = 0;
	for ( var i = 0; i < selLen; i++ ) {
		// console.log(price[i].innerHTML);
		priceValue[i] = parseInt( price[i].innerHTML.slice(1) );
		quantity[i] = parseInt( value[i].value );
		totalValue[i] = priceValue[i] * quantity[i];
		total[i].innerHTML = "￥" + totalValue[i];
		if ( sel[i].checked === true ) {
			sum += totalValue[i];
		}
	}
	pay.innerHTML = "￥" + sum;
}