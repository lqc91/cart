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
	} else {
		for ( var i = 0; i < selLen; i ++ ) {
			sel[i].checked = true;
		}
	}
};

// 商品选择按钮选择与不选事件
for ( var i = 0; i < selLen; i ++ ) {
	sel[i].onclick = function () {
		for ( var i = 0; i < selLen; i++ ) {
			if ( sel[i].checked === false ) {
				selAll.checked = false;
				break;
			}
			if ( i === selLen-1 ) {
				selAll.checked = true;
				break;
			}
		}
	}
}