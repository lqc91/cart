// 若将var cart = document.querySelector("#cart");注释，代码为何正常运行而不报错？
var cartWrap = document.querySelector("#cart");
var cartElem = {
	selAll: cartWrap.querySelector(".sel-all-ipt"),
	sel: cartWrap.querySelectorAll(".sel-ipt"),
	add: cartWrap.querySelectorAll(".add"),
	subtract: cartWrap.querySelectorAll(".subtract"),
	quantity: cartWrap.querySelectorAll(".quantity"),
	price: cartWrap.querySelectorAll(".j-price"),
	total: cartWrap.querySelectorAll(".j-total")
};
var money = document.querySelector(".money");
var selLen = cartElem.sel.length;
var idx = 0;
// 运算
var operation = {
	// 累加
	add: function() {
		idx = this.id.slice(4);
		cartElem.quantity[idx].value = +cartElem.quantity[idx].value + 1;
		calMoney();
	},
	// 累减
	subtract: function() {
		idx = this.id.slice(9);
		if ( +cartElem.quantity[idx].value > 1 ) {
			cartElem.quantity[idx].value -= 1;
			calMoney();
		}
	}
};

// 全选按钮全选与全不选事件
cartElem.selAll.onclick = selAllHandler;

for(var i = 0; i < selLen; i ++ ) {
	// 商品选择按钮选择与不选事件
	cartElem.sel[i].onclick = selHandler;
	// 为加号按钮添加id
	appendId(cartElem.add[i], i);
	// 添加加号按钮点击事件
	cartElem.add[i].onclick = operation.add;
	// 为减号按钮添加id
	appendId(cartElem.subtract[i], i);
	// 添加减号按钮点击事件
	cartElem.subtract[i].onclick = operation.subtract;
	// 为数量输入框添加id
	appendId(cartElem.quantity[i], i);
	// 添加鼠标失焦事件
	cartElem.quantity[i].onblur = quantity;
}

// 全选/全不选
function selAllHandler() {
	if ( this.checked === false ) {
		for ( var i = 0; i < selLen; i ++ ) {
			cartElem.sel[i].checked = false;
		}
	} else {
		for ( var i = 0; i < selLen; i ++ ) {
			cartElem.sel[i].checked = true;
		}
	}
	calMoney();
}
// 选择
function selHandler() {
	if ( this.checked === false ) {
		cartElem.selAll.checked = false;
		calMoney();
	} else {
		for ( var i = 0; i < selLen; i++ ) {
			if (cartElem.sel[i].checked === false) {
				calMoney();
				break;
			}
			if (  i === selLen-1 ) {
				cartElem.selAll.checked = true;
				calMoney();
				break;
			}
		}
	}
}
// 判断输入的数量是否合法
function quantity() {
	idx = this.id.slice(9);
	if ( isNaN( +cartElem.quantity[idx].value ) || +cartElem.quantity[idx].value < 1 ) {
		alert( "请输入不小于1的正确数字！" );
		cartElem.quantity[idx].value = 1;
	}
	calMoney();
}
// 添加id
function appendId(elem, index) {
	return elem.id = elem.title + "-" + index;
}
// 计算总价与应付金额
function calMoney () {
	var sum = 0;
	for ( var i = 0; i < selLen; i++ ) {
		updateMoney(cartElem.total[i], getMoney(cartElem.price[i]) * cartElem.quantity[i].value);
		if ( cartElem.sel[i].checked === true ) {
			sum += getMoney(cartElem.total[i]);
		}
	}
	updateMoney(money, sum);
}
// 获取金额的值
function getMoney(elem) {
	return +elem.innerHTML.slice(1);
}
// 更新金额
function updateMoney(elem, num) {
	return elem.innerHTML = "￥" + num;
}