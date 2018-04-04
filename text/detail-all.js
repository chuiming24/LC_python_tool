﻿var fileModule = {
	init: function() {
		$(".wrap_library").on("click", "a", function() {
			$(".wrap_library").hide()
		});
		$(".wrap_library").on("click", "input", function() {
			location.href = $(this).attr("aUrl");
			$(".wrap_library").hide()
		})
	},
	downloadFileInit: function(b, a) {
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectProductPDFAndPCBListJsonp.action?callback='loadFilePDFData'&annexNumber=" + b,
			dataType: "jsonp",
			timeout: 15000,
			success: function(f) {
				var e = f.status;
				if (e == "success") {
					var j = {
						fileList: [{
							noFile: 1
						}, {
							noFile: 2
						}, {
							noFile: 3
						}]
					};
					for (var g = 0; g < f.fileList.length; g++) {
						var d = f.fileList[g];
						var k = d.annexRealName;
						var m = d.annexRemark;
						var c = webSiteShareData.lcMallContextPath;
						var l = "";
						var h = "";
						if (d.annexType == "productpdfzip") {
							if (d.annexSuffix == "pdf" || d.annexSuffix == "PDF" || d.annexSuffix == ".pdf" || d.annexSuffix == ".PDF") {
								l = webSiteShareData.lcMallContextPath + "/product/pdf/A_" + d.annexNumber + ".PDF";
								h = webSiteShareData.lcMallContextPath + "/product/pdf/B_" + d.annexNumber + ".PDF";
								d.aHref = "javascript:fileModule.downloadFileNoRemark('" + l + "','" + b + "','proudct_pdf_doc_pdf','pdf');";
								d.bHref = "javascript:fileModule.downloadFileNoRemark('" + h + "','" + b + "','proudct_pdf_doc_pdf','');"
							} else {
								l = webSiteShareData.lcMallContextPath + "/member/downloadFile-" + d.annexNumber + "-proudct_pdf_doc-pdf.html";
								d.aHref = "javascript:fileModule.downloadFileNoRemark('" + l + "','" + b + "','proudct_pdf_doc_pdf','');";
								d.downTxt = "下载数据手册压缩包"
							}
							j.fileList[0] = d
						} else {
							if (d.annexType == "productpdf") {
								if (d.annexSuffix == "pdf" || d.annexSuffix == "PDF" || d.annexSuffix == ".pdf" || d.annexSuffix == ".PDF") {
									l = webSiteShareData.lcMallContextPath + "/product/pdf/A_" + d.annexNumber + ".PDF";
									h = webSiteShareData.lcMallContextPath + "/product/pdf/B_" + d.annexNumber + ".PDF";
									d.aHref = "javascript:fileModule.downloadFileNoRemark('" + l + "','" + b + "','new_pdf_doc_pdf','pdf');";
									d.bHref = "javascript:fileModule.downloadFileNoRemark('" + h + "','" + b + "','new_pdf_doc_pdf','');"
								} else {
									l = webSiteShareData.lcMallContextPath + "/member/downloadFile-" + d.annexNumber + "-productpdf-pdf_download.html";
									d.aHref = "javascript:fileModule.downloadFileNoRemark('" + l + "','" + b + "','new_pdf_doc_pdf','');";
									d.downTxt = "下载数据手册压缩包"
								}
								j.fileList[0] = d
							} else {
								if (d.annexType == "product_pcb_doc" || d.annexType == "productencap") {
									if (d.annexSuffix == "d" || d.annexSuffix == "D") {
										l = c + "/member/downloadFile-" + d.annexNumber + "-product_pcb_doc-d.html";
										d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + l + "','" + b + "','product_pcb_doc_d');";
										j.fileList[2] = d
									} else {
										if (d.annexSuffix.toUpperCase() == "PCBLIB") {
											l = c + "/member/downloadFile-" + d.annexNumber + "-product_pcb_doc-Pcblib.html";
											d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + l + "','" + b + "','product_pcb_doc_lib');";
											j.fileList[1] = d
										} else {
											if (d.annexSuffix.toUpperCase() == "ZIP") {
												l = c + "/member/downloadFile-" + d.annexNumber + "-product_pcb_doc-zip.html";
												d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + l + "','" + b + "','product_pcb_doc_zip');";
												j.fileList[2] = d
											} else {
												if (d.annexSuffix.toUpperCase() == "RAR") {
													l = c + "/member/downloadFile-" + d.annexNumber + "-product_pcb_doc-rar.html";
													d.aHref = "javascript:fileModule.downloadFileDivRemarkShow('" + l + "','" + b + "','product_pcb_doc_rar');";
													j.fileList[2] = d
												}
											}
										}
									}
								}
							}
						}
					}
					$(".hint_cue").css("height", $(document).height() + "px");
					$(".hint_cue").show();
					$("#hint_down").show();
					$("#hint_down").html("");
					$("#hint_downTmpl").tmpl(j).appendTo("#hint_down")
				} else {
					if (e == "fail") {
						showWindowLogin();
						$("#downLoadFileFlag").val("yes");
						$("#downLoadFileProductId").val(b);
						$("#downLoadFileDataType").val(a);
						return false
					}
				}
			},
			error: function() {
				alert(constantModule.errorPrompt)
			}
		})
	},
	downloadFileDivRemarkShow: function(c, d, b) {
		var a = webSiteShareData.lcMallContextPath + "/order/ProductSalesViewRecordAction!insertViewRecordAndCheckJsonp.action?callback='loadFromProductSaleData'&dataId=" + d + "&dataType=" + b;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				var h = g.status;
				var e = g.limitedTimes;
				if (h == "fail") {
					commonModule.alertFail("抱歉，您今天下载资料的次数已经超过" + e + "次，请明天再试！");
					return
				} else {
					if (h == "forbid") {
						commonModule.showWindowLogin();
						return
					} else {
						var f = {
							aUrl: c
						};
						$(".wrap_library").show().html("");
						$("#downloadTitleTmpl").tmpl(f).appendTo(".wrap_library")
					}
				}
			}
		})
	},
	downloadFileNoRemark: function(c, d, b, e) {
		var a = webSiteShareData.lcMallContextPath + "/order/ProductSalesViewRecordAction!insertViewRecordAndCheckJsonp.action?callback='loadFromProductSaleData'&dataId=" + d + "&dataType=" + b;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				var h = g.status;
				var f = g.limitedTimes;
				if (h == "fail") {
					commonModule.alertFail("抱歉，您今天下载资料的次数已经超过" + f + "次，请明天再试！");
					return
				} else {
					if (h == "forbid") {
						commonModule.showWindowLogin();
						return
					} else {
						if (e == "pdf" || e == "PDF") {
							window.open(c, "_blank")
						} else {
							window.location.href = c
						}
					}
				}
			}
		})
	}
};
var productGuideModule = {
	guideGoodsData: null,
	guideStartIndex: 0,
	guideRefreshId: null,
	guideNextId: null,
	guideSignUrl: null,
	showGuideProductNum: 6,
	guideSourcePage: "index",
	init: function() {
		if (webSiteShareData.detailsFlag) {
			productGuideModule.guideSourcePage = "productDetails";
			productGuideModule.showGuideProductNum = 4
		}
		$(".need_bt a").click(function() {
			productGuideModule.changeNextBatchProduct()
		});
		$(".need").on("click", ".ned_border", function() {
			productGuideModule.addFeedBackClick($(this).attr("data-productId"))
		})
	},
	loadProductGuide: function() {
		var a = "";
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/home/getSignUrl.html?callback='loadSignUrlData'",
			cache: false,
			dataType: "jsonp",
			timeout: 15000,
			success: function(c) {
				productGuideModule.guideSignUrl = c;
				var b = webSiteShareData.lcGuideUrl + "guideSearch/searchGoodsGuide.action?currentProductId=" + a;
				$.ajax({
					url: b,
					dataType: "jsonp",
					data: productGuideModule.guideSignUrl,
					timeout: 15000,
					success: function(g) {
						if (g != null) {
							if (g.refreshId) {
								var f = g.refreshId.split(",");
								productGuideModule.guideRefreshId = f[0];
								productGuideModule.guideNextId = f[1]
							}
							productGuideModule.guideGoodsData = g.data;
							if (productGuideModule.guideGoodsData != null && productGuideModule.guideGoodsData.length > 0) {
								for (var d = 0; d < productGuideModule.guideGoodsData.length; d++) {
									var j = webSiteShareData.lcMallContextPath + "/images/no-pic.jpg";
									if (productGuideModule.guideGoodsData[d].product_img_path) {
										j = productGuideModule.guideGoodsData[d].product_img_path;
										j = j.replace("H://webapps//jlc-shop.com//LCMall/", "");
										var h = new RegExp("//", "g");
										j = j.replace(h, "/");
										j = webSiteShareData.imgProjectUrl + j
									}
									productGuideModule.guideGoodsData[d].product_img_path = j
								}
								productGuideModule.showGuide(0, true);
								if (productGuideModule.guideGoodsData.length <= productGuideModule.showGuideProductNum) {
									$(".need .need_bt a").hide();
									$("#changePage").hide()
								}
							}
						}
					},
					error: function() {}
				})
			},
			error: function() {}
		})
	},
	changeNextBatchProduct: function() {
		productGuideModule.guideStartIndex += productGuideModule.showGuideProductNum;
		if (productGuideModule.guideStartIndex >= productGuideModule.guideGoodsData.length) {
			if (productGuideModule.guideGoodsData.length < productGuideModule.showGuideProductNum) {
				productGuideModule.guideStartIndex = 0
			} else {
				productGuideModule.guideStartIndex -= productGuideModule.guideGoodsData.length
			}
		}
		productGuideModule.showGuide(productGuideModule.guideStartIndex)
	},
	showGuide: function(a, h) {
		if (productGuideModule.guideGoodsData != null) {
			var b = productGuideModule.guideGoodsData.length;
			var k = "";
			var l = 0;
			var f = {
				productList: [],
				lcMallContextPath: webSiteShareData.lcMallContextPath,
				lcItemContextPath: webSiteShareData.lcItemContextPath
			};
			for (i = 0; i < productGuideModule.showGuideProductNum; i++) {
				var g = a + i;
				if (g >= b) {
					if (b < productGuideModule.showGuideProductNum) {
						break
					} else {
						g = g - b
					}
				}
				l++;
				k += productGuideModule.guideGoodsData[g].product_id + ",";
				f.productList[i] = productGuideModule.guideGoodsData[g]
			}
			var d = null;
			if (productGuideModule.guideSourcePage == "productDetails") {
				$.ajax({
					type: "GET",
					url: "/product/encapsulateJsonp.html?callback='loadEncapsulateData'&productIds=" + k.substring(0, k.length - 1),
					dataType: "jsonp",
					timeout: 15000,
					success: function(j) {
						if (j != null && j.status == "success") {
							d = j.recordList
						}
					},
					error: function() {}
				});
				if (d != null && d.length > 0 && f.productList.length > 0) {
					for (i = 0; i < f.productList.length; i++) {
						var m = f.productList[i];
						for (var e = 0; e < d.length; e++) {
							if (d[e].productId == m.product_id) {
								m.encapsulate = d[e].encapsulate;
								break
							}
						}
					}
				}
			}
			if (productGuideModule.guideSourcePage == "productDetails") {
				$("#detailLike").show().html("");
				$("#like_wraper").addClass("active");
				$("#likeTmpl").tmpl(f).appendTo("#detailLike")
			} else {
				$(".need").show();
				$("#suggestionProduct").html("");
				$("#suggestionTmpl").tmpl(f).appendTo("#suggestionProduct")
			}
			if (!h) {
				var c = "productIds=" + k + "&productSize=" + l;
				productGuideModule.addFeedBackNext(c)
			}
		}
	},
	addFeedBackNext: function(b) {
		if (b && productGuideModule.guideRefreshId) {
			productGuideModule.guideNextId = null;
			b += "&" + productGuideModule.guideSignUrl;
			b += "&feedbackRefreshId=" + productGuideModule.guideRefreshId;
			var a = webSiteShareData.lcGuideUrl + "guideSearch/nextFeedback.action";
			$.ajax({
				url: a,
				data: b,
				dataType: "jsonp",
				success: function(c) {
					productGuideModule.guideNextId = c.nextId
				}
			})
		}
	},
	addFeedBackClick: function(b) {
		try {
			productGuideModule.addClickHistory(b)
		} catch (c) {}
		if (b && productGuideModule.guideNextId) {
			data = "productId=" + b;
			data += "&" + productGuideModule.guideSignUrl;
			data += "&feedbackNextId=" + productGuideModule.guideNextId;
			var a = webSiteShareData.lcGuideUrl + "guideSearch/clickFeedback.action";
			$.ajax({
				url: a,
				data: data,
				dataType: "jsonp",
				success: function(d) {}
			})
		}
	},
	addClickHistory: function(c) {
		var b = $("#custom").attr("title");
		var f = window.location.pathname;
		var g = f.substring(f.indexOf("_") + 1, f.indexOf("."));
		var e = productGuideModule.guideSourcePage == "productDetails" ? g : "";
		var a = webSiteShareData.lcGuideUrl + "guideSearch/addClickHistory.action";
		var d = "customerCode=" + b;
		d += "&productId=" + c;
		d += "&position=" + productGuideModule.guideSourcePage;
		d += "&sourceProductId=" + e;
		$.ajax({
			url: a,
			data: d,
			dataType: "jsonp",
			success: function(h) {}
		})
	}
};
var addShoppingCartModule = {
	Product: {},
	sampleNum: 0,
	hasSample: "",
	init: function() {
		$(".parameter").on("click", "li.trade_btn #detail_buy_btn", function(d) {
			var f = $(this).attr("param-click").split("|");
			if (true) {
				addShoppingCartModule.removeAddShoppingCartView();
				$("#buyTmpl").tmpl().appendTo("#detail_buy");
				var a = $(".c_whole");
				var c = d.pageY - d.offsetY - a.height() - $(this).height() / 3;
				var b = d.pageX - d.offsetX + $(this).width() / 3 - a.width() / 2;
				a.css("top", c + "px").css("left", b + "px");
				$(".tip").css("top", a.height() - 1 + "px");
				$(".tip").css("left", a.width() / 2 + "px")
			}
			addShoppingCartModule.commonCheckProducByProductId(this, f[0], f[1], f[2], f[3], f[4], true, f[5])
		});
		$(".list_right").on("click", ".inside li.pan_list .addCartBtn,.yuDing", function() {
			addShoppingCartModule.removeAddShoppingCartView();
			$("#buyTmpl").tmpl().appendTo($(this).parent());
			$(".c_whole").css("top", (-$(".c_whole").height() - 6) + "px");
			$(".tip").css("top", ($(".c_whole").height() - 1) + "px");
			var a = $(this).attr("param-click").split("|");
			addShoppingCartModule.commonCheckProducByProductId(this, a[0], a[1], a[2], a[3], a[4], true, a[5])
		});
		$(".list_right").on("click", ".can_order1 .can_btn", function() {
			addShoppingCartModule.removeAddShoppingCartView()
		});
		$(".list_right").on("click", ".choose_buy_type", function() {
			if ($(this).attr("id") == "choose_buy_pian_radio") {
				$("#productOrderNumber_pan").attr("disabled", true);
				$("#productOrderNumber").attr("disabled", false)
			} else {
				$("#productOrderNumber").attr("disabled", true);
				$("#productOrderNumber_pan").attr("disabled", false)
			}
		});
		$(".list_right").on("keyup", "#productOrderNumber_pan", function() {
			var b = $("#productOrderNumber_pan").val();
			if (!isNaN(b)) {
				var a = $("#add_shopping_cart_view");
				var c = $("#count_unit_number", a).attr("minEncaptionNumber");
				addShoppingCartModule.updateNumberPriceMoney(b * c)
			}
		})
	},
	commonCheckProducByProductId: function(d, c, b, j, e, i, g, h) {
		var f = "false";
		if (g) {
			f = "true"
		}
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!commonCheckProducByProductIdJsonp.action?callback='loadCheckProducData'&productIdStr=" + c + "&isAloneStr=" + f;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(q) {
				$(":button[sign=cart_control_btn]").attr("disabled", false);
				var p = q.resultList;
				if (p != null && p.length > 0) {
					if (p.length == 1 && p[0] && p[0].status == 3) {
						productListModule.notifyProductOffLoading(p[0], d)
					} else {
						productListModule.notifyProductOffReason(p)
					}
				} else {
					if (b != "yes") {
						var m = j.lastIndexOf(",");
						j = j.substring(0, m);
						var k = j.split(",");
						var o = k[0];
						var n = k[1];
						var l = e.split(",");
						var r = 0;
						if (l[2]) {
							r = l[2]
						}
						productListModule.showEnquiryDiv(d, "no", n, c, o, r);
						return
					}
					addShoppingCartModule.showAddShoppingCartView(d, c, j, e, "", i, h)
				}
			},
			error: function(k) {
				if (k && k != "") {
					if (k == "Timeout") {
						commonModule.alertFail(constantModule.addShoppingCartFail)
					} else {
						commonModule.alertFail(constantModule.systemBusy)
					}
				}
				$(":button[sign=cart_control_btn]").attr("disabled", false)
			}
		})
	},
	removeAddShoppingCartView: function() {
		$(".c_whole").remove()
	},
	hideAddShoppingCartView: function() {
		$(".c_whole").hide()
	},
	displayAddShoppingCartView: function() {
		$(".c_whole").show()
	},
	showAddShoppingCartView: function(m, x, o, t, b, A, r) {
		addShoppingCartModule.Product = {};
		addShoppingCartModule.sampleNum = 0;
		addShoppingCartModule.hasSample = "";
		$("#window_login_around_mask").hide();
		$(".order").remove();
		var B = $("#add_shopping_cart_view");
		$("#min_unit_span", B).html("");
		var s = o.lastIndexOf(",");
		var C = o.substring(s + 1, o.length);
		o = o.substring(0, s);
		var J = o.split(",");
		addShoppingCartModule.Product.unit = J[0];
		addShoppingCartModule.Product.ratio = J[1];
		addShoppingCartModule.Product.stock = J[2];
		addShoppingCartModule.Product.minbuy = J[3];
		addShoppingCartModule.Product.maxbuy = J[4];
		addShoppingCartModule.Product.prices = new Array();
		for (var E = 5, e = J.length; E < e; E += 3) {
			addShoppingCartModule.Product.prices.push({
				min: J[E],
				max: J[E + 1],
				price: J[E + 2]
			})
		}
		if (b != null && b != "") {
			C = "<font color='red'>不接受订货，最多购买数量：" + b + "</font>"
		} else {
			if (C == "-1") {
				C = ""
			} else {
				C = ""
			}
		}
		$("span[sign=productMaxBuyNumberText]", B).html(C);
		$("span[sign=current_unit_span]", B).html(addShoppingCartModule.Product.unit);
		$("#stock_number_span", B).html(addShoppingCartModule.Product.stock * addShoppingCartModule.Product.ratio);
		if (addShoppingCartModule.Product.stock < 0) {
			$("#stock_number_span", B).html("0")
		}
		var a = "";
		var g = "";
		if (r != undefined && r != null && r != "") {
			g = r.split(",")[0];
			a = r.split(",")[1]
		}
		if (A != undefined && A != null && A != "" && (addShoppingCartModule.Product.prices.length > 2 || (g != null && g > 2))) {
			var p = A.split(",,");
			addShoppingCartModule.sampleNum = parseInt(p[0].replace(",", ""));
			addShoppingCartModule.hasSample = p[1];
			var d = $("#stock_number_p", B);
			var l = $("#sample_number_p", B);
			var n = $("#bat_number_p", B);
			if (d != undefined && l != undefined && n != undefined) {
				if (addShoppingCartModule.sampleNum > 0) {
					d.css("display", "inline");
					if (addShoppingCartModule.Product.stock < 0) {
						$("#sample_number_span", B).html("0")
					}
					if (addShoppingCartModule.Product.stock >= parseInt(a)) {
						var v = addShoppingCartModule.Product.stock * addShoppingCartModule.Product.ratio - addShoppingCartModule.sampleNum;
						n.css("display", "inline");
						if (v >= (parseInt(a) * addShoppingCartModule.Product.ratio) && addShoppingCartModule.hasSample != "yes") {
							if (t && t != "") {
								var k = t.split(",");
								if (("-" != k[0]) && k[0] && k[0] != "" && k[2] && k[2] != "" && parseInt(k[2]) > 0) {
									var I = Math.floor((addShoppingCartModule.Product.stock * addShoppingCartModule.Product.ratio - addShoppingCartModule.sampleNum) / k[2]);
									if (I >= 100) {
										v = I;
										$("span[sign=bat_unit_span]", B).html(k[0] + "多")
									} else {
										$("span[sign=bat_unit_span]", B).html(addShoppingCartModule.Product.unit)
									}
								}
							}
						} else {
							if (v < (parseInt(a) * addShoppingCartModule.Product.ratio) || addShoppingCartModule.hasSample == "yes") {
								v = (parseInt(a) - 1) * addShoppingCartModule.Product.ratio;
								$("span[sign=bat_unit_span]", B).html(addShoppingCartModule.Product.unit)
							} else {
								n.css("display", "none")
							}
						}
						$("#bat_number_span", B).html(v)
					}
				} else {
					l.css("display", "none");
					d.css("display", "inline");
					n.css("display", "none")
				}
			}
		}
		var w = false;
		var h = 0;
		if (t && t != "") {
			var k = t.split(",");
			if (("-" != k[0]) && k[0] && k[0] != "" && k[2] && k[2] != "" && parseInt(k[2]) > 0) {
				w = (k[2]­ dShoppingCartModule.Product.ratio == 0 && parseFloat(k[2]) > parseFloat(addShoppingCartModule.Product.ratio));
				h = k[2];
				var q = "(1" + k[0] + "有<span class='STYLE10' style='font-weight:bold;'>" + k[2] + "</span>" + k[1] + ")";
				$("#min_unit_span", B).html(q);
				$("span[sign=current_unit_span_pan]", B).html(k[0]);
				$("#current_unit_span_pan").html(k[0]);
				$("#count_unit_number", B).attr("productUnit", k[1]);
				$("#count_unit_number", B).attr("minEncaptionUnit", k[0]);
				$("#count_unit_number", B).attr("minEncaptionNumber", k[2])
			} else {
				$("#choose_buy_type_pan").hide()
			}
		}
		var j = addShoppingCartModule.Product.prices[0].price;
		var D = $("#shopping_content_among_tbody", B);
		D.empty();
		var F = parseFloat(webSiteShareData.limitNumberPrice);
		var c = parseFloat(webSiteShareData.limitNumberEncapPrice);
		var u = 0;
		var z = 0;
		var H = false;
		$.each(addShoppingCartModule.Product.prices, function(Q, V) {
			var X = D.append("<tr></tr>").children("tr:last");
			var L;
			if (addShoppingCartModule.sampleNum > 0 && V.max != -1 && addShoppingCartModule.Product.prices.length > 2) {
				if (V.max == 499) {
					L = X.append("<td class='price1 bat_price'><b>批量价格：</b></td>").children("td:last")
				} else {
					L = X.append("<td class='price1'><b>样品价格" + (Q + 1) + "：</b></td>").children("td:last")
				}
			} else {
				if (addShoppingCartModule.sampleNum > 0 && V.max == -1 && addShoppingCartModule.Product.prices.length > 2) {
					var K = "";
					if (addShoppingCartModule.Product.prices.length == 5) {
						K = 2
					}
					L = X.append("<td class='price1 bat_price'><b>批量价格" + K + "：</b></td>").children("td:last")
				} else {
					L = X.append("<td class='price1'><b>价格区间" + (Q + 1) + "：</b></td>").children("td:last")
				}
			}
			if ((V.max == -1 && addShoppingCartModule.hasSample == "yes")) {
				L.append("<td class='price1 can_enquiry'><b>可询价</b></td>").children("div:last");
				return false
			}
			var U = [];
			if (V.min == 1) {
				if (V.max == 9) {
					U = [1, 2, 3, 4, 5, 6, 8, 9]
				} else {
					if (V.max == 29) {
						U = [1, 3, 5, 8, 12, 18, 25, 29]
					} else {
						if (V.max == 99) {
							U = [1, 5, 10, 20, 30, 50, 70, 99]
						} else {
							if (V.max == -1) {
								U = [1, 2, 3, 4, 5, 6, 8, 9]
							} else {
								U = addShoppingCartModule.findStepNumbers(Q)
							}
						}
					}
				}
			} else {
				if (V.min == 10) {
					if (V.max == 29) {
						U = [10, 12, 15, 18, 20, 25, 29]
					} else {
						if (V.max == 99) {
							U = [10, 20, 30, 40, 50, 60, 80, 99]
						} else {
							if (V.max == -1) {
								U = [10, 50, 100, 200, 300, 500]
							} else {
								U = addShoppingCartModule.findStepNumbers(Q)
							}
						}
					}
				} else {
					if (V.min == 30) {
						if (V.max == 99) {
							U = [30, 35, 40, 50, 70, 80, 99]
						} else {
							if (V.max == -1) {
								U = [30, 100, 200, 300, 400, 500]
							} else {
								U = addShoppingCartModule.findStepNumbers(Q)
							}
						}
					} else {
						if (V.min == 100) {
							U = [100, 150, 200, 300, 400, 500]
						} else {
							U = addShoppingCartModule.findStepNumbers(Q)
						}
					}
				}
			}
			for (var N = 0; N < U.length; N++) {
				if (w) {
					if (u == 0) {
						if (V.price < F && F > 0) {
							if (h <= U[N] * addShoppingCartModule.Product.ratio) {
								if (c > 0 && (h * V.price) < c) {
									u = U[N];
									H = true
								}
							}
						}
					}
					var W = null;
					var S = null;
					if (u > 0 && u <= U[N] * addShoppingCartModule.Product.ratio) {
						var M = parseInt(U[N] * addShoppingCartModule.Product.ratio / k[2]);
						if (N == 0 && (U[N] * addShoppingCartModule.Product.ratio % k[2]) > 0) {
							M++
						}
						if (z < M) {
							z = M;
							if (k[0] != "-") {
								W = L.append("<div class='sale_price_grid' num=" + M * k[2] + ">" + M + k[0] + "</div>").children("div:last")
							} else {
								W = L.append("<div class='sale_price_grid' num=" + M * k[2] + ">" + M * k[2] + "</div>").children("div:last")
							}
						}
					} else {
						W = L.append("<div class='sale_price_grid' num=" + U[N] * addShoppingCartModule.Product.ratio + ">" + U[N] * addShoppingCartModule.Product.ratio + "</div>").children("div:last")
					}
				} else {
					W = L.append("<div class='sale_price_grid' num=" + U[N] * addShoppingCartModule.Product.ratio + ">" + U[N] * addShoppingCartModule.Product.ratio + "</div>").children("div:last")
				}
				if (W != null) {
					W.click(function() {
						$(".sale_price_grid", B).removeClass("curr");
						$(this).addClass("curr");
						$("#choose_buy_pian_radio").click();
						addShoppingCartModule.updateNumberPriceMoney($(this).attr("num"))
					})
				}
			}
			var P = null;
			var R = false;
			var O = "<span>(";
			if (V.max == -1) {
				O += V.min * addShoppingCartModule.Product.ratio + addShoppingCartModule.Product.unit + "以上,";
				if (k[2] && k[2] != null && k[2] && k[2] > 0) {
					P = k[2] * parseFloat(V.price).basicRound(5);
					R = true
				}
			} else {
				O += V.min * addShoppingCartModule.Product.ratio + "~" + V.max * addShoppingCartModule.Product.ratio + addShoppingCartModule.Product.unit + ",";
				if (k[2] && k[2] != null && k[2] && k[2] > 0 && k[2] <= V.max * addShoppingCartModule.Product.ratio) {
					P = k[2] * parseFloat(V.price).basicRound(5);
					R = true
				}
			}
			if (Q == 0) {
				O += "样片价格"
			} else {
				var T = ((j - V.price) / j * 100).basicRound(0);
				O += "比样片降" + T + "%<font color='green'>↓</font>"
			}
			O += ")</span>";
			if (R && ("-" != k[0]) && "" != k[0] && null != k[0]) {
				O += "折合1" + k[0] + "<b style='color:#f00;'>" + parseFloat(P).basicRound(2) + "</b>元"
			}
			X.append("<td class='red_a'><span>￥" + V.price + "</span> / " + addShoppingCartModule.Product.unit + O + "</td>")
		});
		$("#productOrderNumber").unbind("blur");
		$("#productOrderNumber").blur(function() {
			addShoppingCartModule.checkProductNumber(H);
			$(".sale_price_grid", B).removeClass("curr")
		});
		$($(".sale_price_grid", B)[0]).click();
		var y = $.trim($("#catalogParamTextVal").html());
		if (y == "") {
			var G = $(".productTypeCode_" + x).attr("ptc");
			if (G && G > 0) {
				var f = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!getCatalogParamTextJsonp.action?callback='loadCatalogParamData'&productTypeCode=" + G;
				$.ajax({
					type: "GET",
					url: f,
					dataType: "jsonp",
					timeout: 15000,
					success: function(i) {
						i = i.result;
						if (i != null && i != "") {
							y = i;
							$("#shopping_product_ratio_div", B).html(y);
							addShoppingCartModule.positionAddShoppingCartView(m, B)
						}
					},
					error: function(i) {}
				})
			}
		}
		$("#shopping_product_ratio_div", B).html(y);
		addShoppingCartModule.positionAddShoppingCartView(m, B);
		$(".add_suces").remove();
		B.css("visibility", "visible");
		B.css("z-index", "9998");
		B.show();
		$("#number_prices_confirm_btn").unbind("click");
		$("#number_prices_confirm_btn").click(function() {
			var Q = $("#productOrderNumber");
			var L = parseInt(Q.val());
			if (!addShoppingCartModule.checkProductNumber(H)) {
				Q.select();
				return
			}
			if (b != null && b != "") {
				if (L > parseInt(b)) {
					commonModule.alertFail("该商品最多只能购买" + b + "片，请修改您的购买数量。");
					Q.select();
					return
				}
			}
			var M = L / addShoppingCartModule.Product.ratio;
			if ($(":input[name=choose_buy_type]:checked").val() == "number_unit_pan") {
				var S = $("#productOrderNumber_pan");
				addShoppingCartModule.checkCurrentValue(S.get(0), S.val());
				M = S.val() * k[2] / addShoppingCartModule.Product.ratio
			}
			if (addShoppingCartModule.sampleNum != undefined && parseInt(addShoppingCartModule.sampleNum) > 0) {
				var O = (parseInt(addShoppingCartModule.sampleNum) / addShoppingCartModule.Product.ratio);
				if (addShoppingCartModule.Product.stock > O) {
					var i = parseInt(addShoppingCartModule.Product.prices[addShoppingCartModule.Product.prices.length - 1].min);
					var P = addShoppingCartModule.Product.stock - O;
					if (M >= i && M > P) {
						productListModule.showEnquiryDiv(m, "yes", addShoppingCartModule.Product.ratio, x, addShoppingCartModule.Product.unit, $("#count_unit_number", B).attr("minEncaptionNumber"), L);
						$("#depotType").text("批量限购数量");
						return
					}
				} else {
					if (M > addShoppingCartModule.Product.stock) {
						productListModule.showEnquiryDiv(m, "yes", addShoppingCartModule.Product.ratio, x, addShoppingCartModule.Product.unit, $("#count_unit_number", B).attr("minEncaptionNumber"), L);
						return
					}
				}
			} else {
				if (M > addShoppingCartModule.Product.stock) {
					productListModule.showEnquiryDiv(m, "yes", addShoppingCartModule.Product.ratio, x, addShoppingCartModule.Product.unit, $("#count_unit_number", B).attr("minEncaptionNumber"), L);
					return
				}
			}
			if (M < addShoppingCartModule.Product.minbuy) {
				commonModule.alertFail("该商品至少需要购买" + (addShoppingCartModule.Product.minbuy * addShoppingCartModule.Product.ratio) + addShoppingCartModule.Product.unit + "，请修改您的购买数量。");
				Q.select();
				return
			}
			if (M > addShoppingCartModule.Product.maxbuy && addShoppingCartModule.Product.maxbuy != -1) {
				commonModule.alertFail("该商品最多只能购买" + (addShoppingCartModule.Product.maxbuy * addShoppingCartModule.Product.ratio) + addShoppingCartModule.Product.unit + "，请修改您的购买数量。");
				Q.select();
				return
			}
			if (addShoppingCartModule.sampleNum != undefined && parseInt(addShoppingCartModule.sampleNum) > 0) {
				var T = "";
				var N = "";
				var K = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectProductSampleStockNumberJsonp.action?callback='loadSampleStockNumberData'&productId=" + x + "&number=" + M;
				$.ajax({
					type: "GET",
					url: K,
					dataType: "jsonp",
					timeout: 15000,
					success: function(U) {
						N = U.result;
						if (N == "success") {
							T = U.isNumberMax
						}
					}
				});
				if (T == "yes" && addShoppingCartModule.hasSample == "yes") {
					productListModule.showEnquiryDiv(m, "yes", addShoppingCartModule.Product.ratio, x, addShoppingCartModule.Product.unit, $("#count_unit_number", B).attr("minEncaptionNumber"), L);
					$("#depotType").text("批量限购数量");
					return
				}
			}
			$(":button[sign=cart_control_btn]").attr("disabled", true);
			var R = "[{" + x + " : " + M + "}]";
			var K = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!calcNumbersAllowedBuyJsonp.action?callback='loadNumbersAllowedData'&productId=" + x + "&number=" + M;
			$.ajax({
				type: "GET",
				url: K,
				dataType: "jsonp",
				timeout: 15000,
				success: function(V) {
					var W = [];
					for (var U in V.dataMap) {
						W.push(U)
					}
					if (W.length > 0) {
						var X = "您购买的商品为限购商品，限购时不能购买超过" + V.maxEncapsulationsAllowedBuy + "圆盘，当前最大购买现货数量为" + V.dataMap[W[0]] + "pcs，请您谅解！点击确定继续添加到购物车，点击取消修改数量";
						commonModule.commonConfirm(X, function() {
							productListModule.putProductInCart(m, x, M, webSiteShareData.cartPageFlag)
						}, function() {
							Q.select()
						})
					} else {
						productListModule.putProductInCart(m, x, M, webSiteShareData.cartPageFlag)
					}
					$(":button[sign=cart_control_btn]").attr("disabled", false)
				},
				error: function(U) {
					if (U && U != "") {
						if (U == "Timeout") {
							commonModule.alertFail(constantModule.validateLimitBuyTimeout)
						} else {
							commonModule.alertFail(constantModule.pleaseContactSystemUser)
						}
					}
					$(":button[sign=cart_control_btn]").attr("disabled", false)
				}
			})
		})
	},
	checkProductNumber: function(a) {
		var b = $("#add_shopping_cart_view");
		var d = $("#productOrderNumber");
		addShoppingCartModule.checkCurrentValue(d.get(0), d.val());
		if (d.val()­ dShoppingCartModule.Product.ratio != 0) {
			var c = (parseInt(d.val() / addShoppingCartModule.Product.ratio) + 1) * addShoppingCartModule.Product.ratio;
			commonModule.alertFail("该商品的购买数量须为" + addShoppingCartModule.Product.ratio + "的倍数，您可以输入" + c);
			d.val(c);
			d.select();
			addShoppingCartModule.updateNumberPriceMoney(c);
			return false
		} else {
			if (a) {}
			addShoppingCartModule.updateNumberPriceMoney(d.val())
		}
		return true
	},
	updateNumberPriceMoney: function(c) {
		var h = $("#add_shopping_cart_view").width();
		var k = $("#add_shopping_cart_view .can_data").width();
		var a = $("#add_shopping_cart_view .data_left").width();
		var d = $("#add_shopping_cart_view .data_right").width();
		var b = 0;
		for (var g = addShoppingCartModule.Product.prices.length - 1; g >= 0; g--) {
			var f = addShoppingCartModule.Product.prices[g];
			if (c >= f.min * addShoppingCartModule.Product.ratio) {
				b = f.price;
				if (addShoppingCartModule.hasSample == "yes" && g == addShoppingCartModule.Product.prices.length - 1) {
					b = addShoppingCartModule.Product.prices[g - 1].price
				}
				break
			}
		}
		$("#productOrderNumber").val(c);
		$("#current_price_span").html("￥" + b);
		$("#current_money_span").html("￥" + (parseFloat(b).basicRound(5) * c).basicRound(2));
		addShoppingCartModule.countUnitNumber(c, b, "count_unit_number");
		var j = $("#add_shopping_cart_view .data_left").width();
		var l = $("#add_shopping_cart_view .data_right").width();
		if (j + l + 20 > k) {
			var e = (j - a) + (l - d);
			$("#add_shopping_cart_view").width(h + e);
			$("#add_shopping_cart_view").css("max-width", (h + e) + "px")
		}
	},
	countUnitNumber: function(d, c, h) {
		var b = $("#add_shopping_cart_view");
		var f = $("#count_unit_number", b).attr("productUnit");
		var a = $("#count_unit_number", b).attr("minEncaptionUnit");
		var e = $("#count_unit_number", b).attr("minEncaptionNumber");
		if (e != null && e != "" && parseInt(e) > 0 && d != null && d != "") {
			var g = parseInt(d / e);
			if (g > 0) {
				$("#count_unit_number").html("(相当于:<b style='color:#f00;'>" + g + "</b>" + a + "多)");
				$("#count_unit_number_pan").html("(相当于:<b style='color:#f00;'>" + g * e + "</b>" + f + ")");
				$(".show_count_unit_price", b).html("(折合1" + a + "<b style='color:#f00;'>" + parseFloat(e * parseFloat(c).basicRound(5)).basicRound(2) + "</b>元)")
			} else {
				$("#count_unit_number").html("(不足1" + a + ")");
				$("#count_unit_number_pan").html("");
				$(".show_count_unit_price", b).html("");
				$("#choose_buy_pian_radio").click()
			}
			$("#productOrderNumber_pan").val(g)
		}
	},
	positionAddShoppingCartView: function(b, a) {
		var c = $(b).offset();
		if ($(b).attr("id") == "detail_buy_btn") {
			$(".c_whole").css({
				top: c.top - $(".c_whole").height() - 12 + "px"
			})
		} else {
			$(".c_whole").css("top", (-$(".c_whole").height() - 6) + "px")
		}
		$(".tip").css({
			top: ($(".c_whole").height() - 1) + "px"
		})
	},
	findStepNumbers: function(a) {
		if (a == 0) {
			return [1, 2, 3, 4, 5, 6, 8, 9]
		} else {
			if (a == 1) {
				return [10, 12, 15, 18, 20, 25, 29]
			} else {
				if (a == 2) {
					return [30, 35, 40, 50, 70, 80, 99]
				} else {
					if (a == 3) {
						return [100, 150, 200, 300, 400, 499]
					} else {
						if (a == 4) {
							return [500, 600, 700, 800, 900, 1000]
						}
					}
				}
			}
		}
		return []
	},
	checkCurrentValue: function(a, b) {
		if (commonModule.isStrEmpty(b) || !commonModule.isInteger(b) || parseInt(b) < 1) {
			a.value = "1"
		}
	}
};

function Calendar(b, f, e, d, a, c) {
	this.beginYear = b || 1990;
	this.endYear = f || 2020;
	this.language = e || 0;
	this.patternDelimiter = d || "-";
	this.date2StringPattern = a || Calendar.language.date2StringPattern[this.language].replace(/\-/g, this.patternDelimiter);
	this.string2DatePattern = c || Calendar.language.string2DatePattern[this.language];
	this.dateControl = null;
	this.panel = this.getElementById("__calendarPanel");
	this.iframe = window.frames.__calendarIframe;
	this.form = null;
	this.date = new Date();
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.colors = {
		bg_cur_day: "#00CC33",
		bg_over: "#EFEFEF",
		bg_out: "#FFCC00"
	}
}
Calendar.language = {
	year: ["年", "", "", "年", "年"],
	months: [
		["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
		["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
		["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	],
	weeks: [
		["日", "一", "二", "三", "四", "五", "六"],
		["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"],
		["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"],
		["日", "一", "二", "三", "四", "五", "六"],
		["日", "月", "火", "水", "木", "金", "土"],
	],
	clear: ["清空", "Clear", "Clear", "清空", "削除"],
	today: ["今天", "Today", "Today", "今天", "今日"],
	close: ["关闭", "Close", "Close", "關閉", "戻る"],
	date2StringPattern: ["yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd"],
	string2DatePattern: ["ymd", "ymd", "ymd", "ymd", "ymd"]
};
Calendar.prototype.draw = function() {
	calendar = this;
	var c = [];
	c[c.length] = '<form id="__calendarForm" name="__calendarForm" method="post">';
	c[c.length] = '<table id="__calendarTable" width="100%" border="0" cellpadding="3" cellspacing="1" align="center">';
	c[c.length] = " <tr>";
	c[c.length] = '  <th><input class="l" name="goPrevMonthButton" type="button" id="goPrevMonthButton" value="&lt;" /></th>';
	c[c.length] = '  <th colspan="5"><select class="year" name="yearSelect" id="yearSelect"></select><select class="month" name="monthSelect" id="monthSelect"></select></th>';
	c[c.length] = '  <th><input class="r" name="goNextMonthButton" type="button" id="goNextMonthButton" value="&gt;" /></th>';
	c[c.length] = " </tr>";
	c[c.length] = " <tr>";
	for (var b = 0; b < 7; b++) {
		c[c.length] = '<th class="theader">';
		c[c.length] = Calendar.language.weeks[this.language][b];
		c[c.length] = "</th>"
	}
	c[c.length] = "</tr>";
	for (var b = 0; b < 6; b++) {
		c[c.length] = '<tr align="center">';
		for (var a = 0; a < 7; a++) {
			switch (a) {
				case 0:
					c[c.length] = '<td class="sun">&nbsp;</td>';
					break;
				case 6:
					c[c.length] = '<td class="sat">&nbsp;</td>';
					break;
				default:
					c[c.length] = '<td class="normal">&nbsp;</td>';
					break
			}
		}
		c[c.length] = "</tr>"
	}
	c[c.length] = " <tr>";
	c[c.length] = '  <th colspan="2"><input type="button" class="b" name="clearButton" id="clearButton" /></th>';
	c[c.length] = '  <th colspan="3"><input type="button" class="b" name="selectTodayButton" id="selectTodayButton" /></th>';
	c[c.length] = '  <th colspan="2"><input type="button" class="b" name="closeButton" id="closeButton" /></th>';
	c[c.length] = " </tr>";
	c[c.length] = "</table>";
	c[c.length] = "</form>";
	this.iframe.document.body.innerHTML = c.join("");
	this.form = this.iframe.document.forms.__calendarForm;
	this.form.clearButton.value = Calendar.language.clear[this.language];
	this.form.selectTodayButton.value = Calendar.language.today[this.language];
	this.form.closeButton.value = Calendar.language.close[this.language];
	this.form.goPrevMonthButton.onclick = function() {
		calendar.goPrevMonth(this)
	};
	this.form.goNextMonthButton.onclick = function() {
		calendar.goNextMonth(this)
	};
	this.form.yearSelect.onchange = function() {
		calendar.update(this)
	};
	this.form.monthSelect.onchange = function() {
		calendar.update(this)
	};
	this.form.clearButton.onclick = function() {
		calendar.dateControl.value = "";
		calendar.hide()
	};
	this.form.closeButton.onclick = function() {
		calendar.hide()
	};
	this.form.selectTodayButton.onclick = function() {
		var d = new Date();
		calendar.date = d;
		calendar.year = d.getFullYear();
		calendar.month = d.getMonth();
		calendar.dateControl.value = d.format(calendar.date2StringPattern);
		calendar.hide()
	}
};
Calendar.prototype.bindYear = function() {
	var b = this.form.yearSelect;
	b.length = 0;
	for (var a = this.beginYear; a <= this.endYear; a++) {
		b.options[b.length] = new Option(a + Calendar.language.year[this.language], a)
	}
};
Calendar.prototype.bindMonth = function() {
	var a = this.form.monthSelect;
	a.length = 0;
	for (var b = 0; b < 12; b++) {
		a.options[a.length] = new Option(Calendar.language.months[this.language][b], b)
	}
};
Calendar.prototype.goPrevMonth = function(a) {
	if (this.year == this.beginYear && this.month == 0) {
		return
	}
	this.month--;
	if (this.month == -1) {
		this.year--;
		this.month = 11
	}
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData()
};
Calendar.prototype.goNextMonth = function(a) {
	if (this.year == this.endYear && this.month == 11) {
		return
	}
	this.month++;
	if (this.month == 12) {
		this.year++;
		this.month = 0
	}
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData()
};
Calendar.prototype.changeSelect = function() {
	var c = this.form.yearSelect;
	var a = this.form.monthSelect;
	for (var b = 0; b < c.length; b++) {
		if (c.options[b].value == this.date.getFullYear()) {
			c[b].selected = true;
			break
		}
	}
	for (var b = 0; b < a.length; b++) {
		if (a.options[b].value == this.date.getMonth()) {
			a[b].selected = true;
			break
		}
	}
};
Calendar.prototype.update = function(a) {
	this.year = a.form.yearSelect.options[a.form.yearSelect.selectedIndex].value;
	this.month = a.form.monthSelect.options[a.form.monthSelect.selectedIndex].value;
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData()
};
Calendar.prototype.bindData = function() {
	var e = this;
	var d = this.getMonthViewDateArray(this.date.getFullYear(), this.date.getMonth());
	var c = this.getElementsByTagName("td", this.getElementById("__calendarTable", this.iframe.document));
	for (var b = 0; b < c.length; b++) {
		c[b].style.backgroundColor = e.colors.bg_over;
		c[b].onclick = null;
		c[b].onmouseover = null;
		c[b].onmouseout = null;
		c[b].innerHTML = d[b] || "&nbsp;";
		if (b > d.length - 1) {
			continue
		}
		if (d[b]) {
			c[b].onclick = function() {
				if (e.dateControl) {
					e.dateControl.value = new Date(e.date.getFullYear(), e.date.getMonth(), this.innerHTML).format(e.date2StringPattern)
				}
				e.hide()
			};
			c[b].onmouseover = function() {
				this.style.backgroundColor = e.colors.bg_out;
				this.style.cursor = "pointer"
			};
			c[b].onmouseout = function() {
				this.style.backgroundColor = e.colors.bg_over
			};
			var a = new Date();
			if (a.getFullYear() == e.date.getFullYear()) {
				if (a.getMonth() == e.date.getMonth()) {
					if (a.getDate() == d[b]) {
						c[b].style.backgroundColor = e.colors.bg_cur_day;
						c[b].onmouseover = function() {
							this.style.backgroundColor = e.colors.bg_out;
							this.style.cursor = "pointer"
						};
						c[b].onmouseout = function() {
							this.style.backgroundColor = e.colors.bg_cur_day
						}
					}
				}
			}
		}
	}
};
Calendar.prototype.getMonthViewDateArray = function(f, a) {
	var d = new Array(42);
	var b = new Date(f, a, 1).getDay();
	var e = new Date(f, a + 1, 0).getDate();
	for (var c = 0; c < e; c++) {
		d[c + b] = c + 1
	}
	return d
};
Calendar.prototype.show = function(a, c) {
	if (this.panel.style.display == "block") {
		this.panel.style.display = "none"
	}
	if (!a) {
		throw new Error("arguments[0] is necessary!")
	}
	this.dateControl = a;
	c = c || a;
	this.draw();
	this.bindYear();
	this.bindMonth();
	if (a.value.length > 0) {
		this.date = new Date(a.value.toDate(this.patternDelimiter, this.string2DatePattern));
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth()
	}
	this.changeSelect();
	this.bindData();
	var b = this.getAbsPoint(c);
	this.panel.style.left = b.x + "px";
	this.panel.style.top = (b.y + a.offsetHeight) + "px";
	this.panel.style.display = "block";
	this.panel.style.zIndex = 999999999
};
Calendar.prototype.hide = function() {
	this.panel.style.display = "none"
};
Calendar.prototype.getElementById = function(b, a) {
	a = a || document;
	return document.getElementById ? a.getElementById(b) : document.all(b)
};
Calendar.prototype.getElementsByTagName = function(b, a) {
	a = a || document;
	return document.getElementsByTagName ? a.getElementsByTagName(b) : document.all.tags(b)
};
Calendar.prototype.getAbsPoint = function(b) {
	var a = b.offsetLeft;
	var c = b.offsetTop;
	while (b = b.offsetParent) {
		a += b.offsetLeft;
		c += b.offsetTop
	}
	return {
		x: a,
		y: c
	}
};
Date.prototype.format = function(b) {
	var c = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"w+": "日一二三四五六".charAt(this.getDay()),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	if (/(y+)/.test(b)) {
		b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var a in c) {
		if (new RegExp("(" + a + ")").test(b)) {
			b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
		}
	}
	return b
};
String.prototype.toDate = function(e, f) {
	e = e || "-";
	f = f || "ymd";
	var c = this.split(e);
	var h = parseInt(c[f.indexOf("y")], 10);
	if (h.toString().length <= 2) {
		h += 2000
	}
	if (isNaN(h)) {
		h = new Date().getFullYear()
	}
	var b = parseInt(c[f.indexOf("m")], 10) - 1;
	var g = parseInt(c[f.indexOf("d")], 10);
	if (isNaN(g)) {
		g = 1
	}
	return new Date(h, b, g)
};
var divs = [];
divs[divs.length] = '<div id="__calendarPanel" style="position:absolute;display:none;background-color:#FFFFFF;border:1px solid #666666;width:200px;height:216px;">';
divs[divs.length] = '<iframe name="__calendarIframe" id="__calendarIframe" width="100%" height="100%" scrolling="no" frameborder="0" style="margin:0px;"></iframe>';
divs[divs.length] = "</div>";
document.write(divs.join(""));
var __ci = window.frames.__calendarIframe;
var cis = [];
cis[cis.length] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
cis[cis.length] = '<html xmlns="http://www.w3.org/1999/xhtml">';
cis[cis.length] = "<head>";
cis[cis.length] = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
cis[cis.length] = "<title>Web Calendar(UTF-8) Written By KimSoft</title>";
cis[cis.length] = '<style type="text/css">';
cis[cis.length] = "<!--";
cis[cis.length] = "body {font-size:12px;margin:0px;text-align:center;}";
cis[cis.length] = "form {margin:0px;}";
cis[cis.length] = "select {font-size:12px;background-color:#EFEFEF;}";
cis[cis.length] = "table {border:0px solid #CCCCCC;background-color:#FFFFFF}";
cis[cis.length] = "th {font-size:12px;font-weight:normal;background-color:#FFFFFF;}";
cis[cis.length] = "th.theader {font-weight:normal;background-color:#666666;color:#FFFFFF;width:24px;}";
cis[cis.length] = "select.year {width:64px;}";
cis[cis.length] = "select.month {width:60px;}";
cis[cis.length] = "td {font-size:12px;text-align:center;}";
cis[cis.length] = "td.sat {color:#0000FF;background-color:#EFEFEF;}";
cis[cis.length] = "td.sun {color:#FF0000;background-color:#EFEFEF;}";
cis[cis.length] = "td.normal {background-color:#EFEFEF;}";
cis[cis.length] = "input.l {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:20px;height:20px;}";
cis[cis.length] = "input.r {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:20px;height:20px;}";
cis[cis.length] = "input.b {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:100%;height:20px;cursor:pointer;}";
cis[cis.length] = "-->";
cis[cis.length] = "</style>";
cis[cis.length] = "</head>";
cis[cis.length] = "<body>";
cis[cis.length] = "</body>";
cis[cis.length] = "</html>";
__ci.document.writeln(cis.join(""));
__ci.document.close();
var calendar = new Calendar();
(function(b, a) {
	"object" === typeof module && module.exports ? module.exports = b.document ? a(b) : a : b.Highcharts = a(b)
})("undefined" !== typeof window ? window : this, function(b) {
	b = function() {
		var g = window,
			k = g.document,
			d = g.navigator && g.navigator.userAgent || "",
			h = k && k.createElementNS && !!k.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			j = /(edge|msie|trident)/i.test(d) && !window.opera,
			c = !h,
			i = /Firefox/.test(d),
			e = i && 4 > parseInt(d.split("Firefox/")[1], 10);
		return g.Highcharts ? g.Highcharts.error(16, !0) : {
			product: "Highcharts",
			version: "5.0.14",
			deg2rad: 2 * Math.PI / 360,
			doc: k,
			hasBidiBug: e,
			hasTouch: k && void 0 !== k.documentElement.ontouchstart,
			isMS: j,
			isWebKit: /AppleWebKit/.test(d),
			isFirefox: i,
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(d),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: h,
			vml: c,
			win: g,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function() {},
			charts: []
		}
	}();
	(function(d) {
		var g = [],
			c = d.charts,
			e = d.doc,
			f = d.win;
		d.error = function(h, i) {
			h = d.isNumber(h) ? "Highcharts error #" + h + ": www.highcharts.com/errors/" + h : h;
			if (i) {
				throw Error(h)
			}
			f.console && console.log(h)
		};
		d.Fx = function(i, j, h) {
			this.options = j;
			this.elem = i;
			this.prop = h
		};
		d.Fx.prototype = {
			dSetter: function() {
				var i = this.paths[0],
					n = this.paths[1],
					h = [],
					m = this.now,
					j = i.length,
					k;
				if (1 === m) {
					h = this.toD
				} else {
					if (j === n.length && 1 > m) {
						for (; j--;) {
							k = parseFloat(i[j]), h[j] = isNaN(k) ? i[j] : m * parseFloat(n[j] - k) + k
						}
					} else {
						h = n
					}
				}
				this.elem.attr("d", h, null, !0)
			},
			update: function() {
				var i = this.elem,
					k = this.prop,
					h = this.now,
					j = this.options.step;
				if (this[k + "Setter"]) {
					this[k + "Setter"]()
				} else {
					i.attr ? i.element && i.attr(k, h, null, !0) : i.style[k] = h + this.unit
				}
				j && j.call(i, h, this)
			},
			run: function(j, o, i) {
				var n = this,
					h = function(l) {
						return h.stopped ? !1 : n.step(l)
					},
					k;
				this.startTime = +new Date;
				this.start = j;
				this.end = o;
				this.unit = i;
				this.now = this.start;
				this.pos = 0;
				h.elem = this.elem;
				h.prop = this.prop;
				h() && 1 === g.push(h) && (h.timerId = setInterval(function() {
					for (k = 0; k < g.length; k++) {
						g[k]() || g.splice(k--, 1)
					}
					g.length || clearInterval(h.timerId)
				}, 13))
			},
			step: function(h) {
				var p = +new Date,
					i, o = this.options,
					j = this.elem,
					k = o.complete,
					n = o.duration,
					q = o.curAnim;
				j.attr && !j.element ? h = !1 : h || p >= n + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), i = q[this.prop] = !0, d.objectEach(q, function(l) {
					!0 !== l && (i = !1)
				}), i && k && k.call(j), h = !1) : (this.pos = o.easing((p - this.startTime) / n), this.now = this.start + (this.end - this.start) * this.pos, this.update(), h = !0);
				return h
			},
			initPath: function(o, w, p) {
				function i(k) {
					var m, l;
					for (j = k.length; j--;) {
						m = "M" === k[j] || "L" === k[j], l = /[a-zA-Z]/.test(k[j + 3]), m && l && k.splice(j + 1, 0, k[j + 1], k[j + 2], k[j + 1], k[j + 2])
					}
				}

				function G(l, m) {
					for (; l.length < F;) {
						l[0] = m[F - l.length];
						var k = l.slice(0, x);
						[].splice.apply(l, [0, 0].concat(k));
						h && (k = l.slice(l.length - x), [].splice.apply(l, [l.length, 0].concat(k)), j--)
					}
					l[0] = "M"
				}

				function H(k, m) {
					for (var l = (F - k.length) / x; 0 < l && l--;) {
						B = k.slice().splice(k.length / E - x, x * E), B[0] = m[F - x - l * x], C && (B[x - 6] = B[x - 2], B[x - 5] = B[x - 1]), [].splice.apply(k, [k.length / E, 0].concat(B)), h && l--
					}
				}
				w = w || "";
				var s, z = o.startX,
					q = o.endX,
					C = -1 < w.indexOf("C"),
					x = C ? 7 : 3,
					F, B, j;
				w = w.split(" ");
				p = p.slice();
				var h = o.isArea,
					E = h ? 2 : 1,
					A;
				C && (i(w), i(p));
				if (z && q) {
					for (j = 0; j < z.length; j++) {
						if (z[j] === q[0]) {
							s = j;
							break
						} else {
							if (z[0] === q[q.length - z.length + j]) {
								s = j;
								A = !0;
								break
							}
						}
					}
					void 0 === s && (w = [])
				}
				w.length && d.isNumber(s) && (F = p.length + s * E * x, A ? (G(w, p), H(p, w)) : (G(p, w), H(w, p)));
				return [w, p]
			}
		};
		d.Fx.prototype.fillSetter = d.Fx.prototype.strokeSetter = function() {
			this.elem.attr(this.prop, d.color(this.start).tweenTo(d.color(this.end), this.pos), null, !0)
		};
		d.extend = function(i, j) {
			var h;
			i || (i = {});
			for (h in j) {
				i[h] = j[h]
			}
			return i
		};
		d.merge = function() {
			var h, n = arguments,
				i, k = {},
				j = function(m, l) {
					"object" !== typeof m && (m = {});
					d.objectEach(l, function(p, o) {
						!d.isObject(p, !0) || d.isClass(p) || d.isDOMElement(p) ? m[o] = l[o] : m[o] = j(m[o] || {}, p)
					});
					return m
				};
			!0 === n[0] && (k = n[1], n = Array.prototype.slice.call(n, 2));
			i = n.length;
			for (h = 0; h < i; h++) {
				k = j(k, n[h])
			}
			return k
		};
		d.pInt = function(h, i) {
			return parseInt(h, i || 10)
		};
		d.isString = function(h) {
			return "string" === typeof h
		};
		d.isArray = function(h) {
			h = Object.prototype.toString.call(h);
			return "[object Array]" === h || "[object Array Iterator]" === h
		};
		d.isObject = function(h, i) {
			return !!h && "object" === typeof h && (!i || !d.isArray(h))
		};
		d.isDOMElement = function(h) {
			return d.isObject(h) && "number" === typeof h.nodeType
		};
		d.isClass = function(h) {
			var i = h && h.constructor;
			return !(!d.isObject(h, !0) || d.isDOMElement(h) || !i || !i.name || "Object" === i.name)
		};
		d.isNumber = function(h) {
			return "number" === typeof h && !isNaN(h)
		};
		d.erase = function(i, j) {
			for (var h = i.length; h--;) {
				if (i[h] === j) {
					i.splice(h, 1);
					break
				}
			}
		};
		d.defined = function(h) {
			return void 0 !== h && null !== h
		};
		d.attr = function(h, k, i) {
			var j;
			d.isString(k) ? d.defined(i) ? h.setAttribute(k, i) : h && h.getAttribute && (j = h.getAttribute(k)) : d.defined(k) && d.isObject(k) && d.objectEach(k, function(l, m) {
				h.setAttribute(m, l)
			});
			return j
		};
		d.splat = function(h) {
			return d.isArray(h) ? h : [h]
		};
		d.syncTimeout = function(i, j, h) {
			if (j) {
				return setTimeout(i, j, h)
			}
			i.call(0, h)
		};
		d.pick = function() {
			var i = arguments,
				k, h, j = i.length;
			for (k = 0; k < j; k++) {
				if (h = i[k], void 0 !== h && null !== h) {
					return h
				}
			}
		};
		d.css = function(h, i) {
			d.isMS && !d.svg && i && void 0 !== i.opacity && (i.filter = "alpha(opacity\x3d" + 100 * i.opacity + ")");
			d.extend(h.style, i)
		};
		d.createElement = function(h, o, i, n, j) {
			h = e.createElement(h);
			var k = d.css;
			o && d.extend(h, o);
			j && k(h, {
				padding: 0,
				border: "none",
				margin: 0
			});
			i && k(h, i);
			n && n.appendChild(h);
			return h
		};
		d.extendClass = function(h, j) {
			var i = function() {};
			i.prototype = new h;
			d.extend(i.prototype, j);
			return i
		};
		d.pad = function(i, j, h) {
			return Array((j || 2) + 1 - String(i).length).join(h || 0) + i
		};
		d.relativeLength = function(i, j, h) {
			return /%$/.test(i) ? j * parseFloat(i) / 100 + (h || 0) : parseFloat(i)
		};
		d.wrap = function(i, k, h) {
			var j = i[k];
			i[k] = function() {
				var l = Array.prototype.slice.call(arguments),
					n = arguments,
					m = this;
				m.proceed = function() {
					j.apply(m, arguments.length ? arguments : n)
				};
				l.unshift(j);
				l = h.apply(this, l);
				m.proceed = null;
				return l
			}
		};
		d.getTZOffset = function(h) {
			var i = d.Date;
			return 60000 * (i.hcGetTimezoneOffset && i.hcGetTimezoneOffset(h) || i.hcTimezoneOffset || 0)
		};
		d.dateFormat = function(j, s, o) {
			if (!d.defined(s) || isNaN(s)) {
				return d.defaultOptions.lang.invalidDate || ""
			}
			j = d.pick(j, "%Y-%m-%d %H:%M:%S");
			var h = d.Date,
				C = new h(s - d.getTZOffset(s)),
				D = C[h.hcGetHours](),
				q = C[h.hcGetDay](),
				x = C[h.hcGetDate](),
				p = C[h.hcGetMonth](),
				A = C[h.hcGetFullYear](),
				w = d.defaultOptions.lang,
				B = w.weekdays,
				z = w.shortWeekdays,
				i = d.pad,
				h = d.extend({
					a: z ? z[q] : B[q].substr(0, 3),
					A: B[q],
					d: i(x),
					e: i(x, 2, " "),
					w: q,
					b: w.shortMonths[p],
					B: w.months[p],
					m: i(p + 1),
					y: A.toString().substr(2, 2),
					Y: A,
					H: i(D),
					k: D,
					I: i(D || 12),
					l: D || 12,
					M: i(C[h.hcGetMinutes]()),
					p: 12 > D ? "AM" : "PM",
					P: 12 > D ? "am" : "pm",
					S: i(C.getSeconds()),
					L: i(Math.round(s 00), 3)
				}, d.dateFormats);
			d.objectEach(h, function(k, l) {
				for (; - 1 !== j.indexOf("%" + l);) {
					j = j.replace("%" + l, "function" === typeof k ? k(s) : k)
				}
			});
			return o ? j.substr(0, 1).toUpperCase() + j.substr(1) : j
		};
		d.formatSingle = function(h, k) {
			var i = /\.([0-9])/,
				j = d.defaultOptions.lang;
			/f$/.test(h) ? (i = (i = h.match(i)) ? i[1] : -1, null !== k && (k = d.numberFormat(k, i, j.decimalPoint, -1 < h.indexOf(",") ? j.thousandsSep : ""))) : k = d.dateFormat(h, k);
			return k
		};
		d.format = function(i, p) {
			for (var j = "{", h = !1, v, w, o, q, n = [], s; i;) {
				j = i.indexOf(j);
				if (-1 === j) {
					break
				}
				v = i.slice(0, j);
				if (h) {
					v = v.split(":");
					w = v.shift().split(".");
					q = w.length;
					s = p;
					for (o = 0; o < q; o++) {
						s = s[w[o]]
					}
					v.length && (s = d.formatSingle(v.join(":"), s));
					n.push(s)
				} else {
					n.push(v)
				}
				i = i.slice(j + 1);
				j = (h = !h) ? "}" : "{"
			}
			n.push(i);
			return n.join("")
		};
		d.getMagnitude = function(h) {
			return Math.pow(10, Math.floor(Math.log(h) / Math.LN10))
		};
		d.normalizeTickInterval = function(h, p, i, o, j) {
			var k, n = h;
			i = d.pick(i, 1);
			k = h / i;
			p || (p = j ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === o && (1 === i ? p = d.grep(p, function(l) {
				return 0 === l % 1
			}) : 0.1 >= i && (p = [1 / i])));
			for (o = 0; o < p.length && !(n = p[o], j && n * i >= h || !j && k <= (p[o] + (p[o + 1] || p[o])) / 2); o++) {}
			return n = d.correctFloat(n * i, -Math.round(Math.log(0.001) / Math.LN10))
		};
		d.stableSort = function(j, n) {
			var i = j.length,
				k, h;
			for (h = 0; h < i; h++) {
				j[h].safeI = h
			}
			j.sort(function(l, m) {
				k = n(l, m);
				return 0 === k ? l.safeI - m.safeI : k
			});
			for (h = 0; h < i; h++) {
				delete j[h].safeI
			}
		};
		d.arrayMin = function(i) {
			for (var j = i.length, h = i[0]; j--;) {
				i[j] < h && (h = i[j])
			}
			return h
		};
		d.arrayMax = function(i) {
			for (var j = i.length, h = i[0]; j--;) {
				i[j] > h && (h = i[j])
			}
			return h
		};
		d.destroyObjectProperties = function(h, i) {
			d.objectEach(h, function(j, k) {
				j && j !== i && j.destroy && j.destroy();
				delete h[k]
			})
		};
		d.discardElement = function(h) {
			var i = d.garbageBin;
			i || (i = d.createElement("div"));
			h && i.appendChild(h);
			i.innerHTML = ""
		};
		d.correctFloat = function(h, i) {
			return parseFloat(h.toPrecision(i || 14))
		};
		d.setAnimation = function(h, i) {
			i.renderer.globalAnimation = d.pick(h, i.options.chart.animation, !0)
		};
		d.animObject = function(h) {
			return d.isObject(h) ? d.merge(h) : {
				duration: h ? 500 : 0
			}
		};
		d.timeUnits = {
			millisecond: 1,
			second: 1000,
			minute: 60000,
			hour: 3600000,
			day: 86400000,
			week: 604800000,
			month: 2419200000,
			year: 31449600000
		};
		d.numberFormat = function(i, p, j, h) {
			i = +i || 0;
			p = +p;
			var s = d.defaultOptions.lang,
				v = (i.toString().split(".")[1] || "").split("e")[0].length,
				o, q, n = i.toString().split("e"); - 1 === p ? p = Math.min(v, 20) : d.isNumber(p) || (p = 2);
			q = (Math.abs(n[1] ? n[0] : i) + Math.pow(10, -Math.max(p, v) - 1)).toFixed(p);
			v = String(d.pInt(q));
			o = 3 < v.length ? v.length % 3 : 0;
			j = d.pick(j, s.decimalPoint);
			h = d.pick(h, s.thousandsSep);
			i = (0 > i ? "-" : "") + (o ? v.substr(0, o) + h : "");
			i += v.substr(o).replace(/(\d{3})(?=\d)/g, "$1" + h);
			p && (i += j + q.slice(-p));
			n[1] && (i += "e" + n[1]);
			return i
		};
		Math.easeInOutSine = function(h) {
			return -0.5 * (Math.cos(Math.PI * h) - 1)
		};
		d.getStyle = function(h, j, i) {
			if ("width" === j) {
				return Math.min(h.offsetWidth, h.scrollWidth) - d.getStyle(h, "padding-left") - d.getStyle(h, "padding-right")
			}
			if ("height" === j) {
				return Math.min(h.offsetHeight, h.scrollHeight) - d.getStyle(h, "padding-top") - d.getStyle(h, "padding-bottom")
			}
			if (h = f.getComputedStyle(h, void 0)) {
				h = h.getPropertyValue(j), d.pick(i, !0) && (h = d.pInt(h))
			}
			return h
		};
		d.inArray = function(h, i) {
			return i.indexOf ? i.indexOf(h) : [].indexOf.call(i, h)
		};
		d.grep = function(h, i) {
			return [].filter.call(h, i)
		};
		d.find = function(h, i) {
			return [].find.call(h, i)
		};
		d.map = function(j, n) {
			for (var i = [], k = 0, h = j.length; k < h; k++) {
				i[k] = n.call(j[k], j[k], k, j)
			}
			return i
		};
		d.offset = function(h) {
			var i = e.documentElement;
			h = h.getBoundingClientRect();
			return {
				top: h.top + (f.pageYOffset || i.scrollTop) - (i.clientTop || 0),
				left: h.left + (f.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
			}
		};
		d.stop = function(i, j) {
			for (var h = g.length; h--;) {
				g[h].elem !== i || j && j !== g[h].prop || (g[h].stopped = !0)
			}
		};
		d.each = function(i, j, h) {
			return Array.prototype.forEach.call(i, j, h)
		};
		d.objectEach = function(i, k, h) {
			for (var j in i) {
				i.hasOwnProperty(j) && k.call(h, i[j], j, i)
			}
		};
		d.addEvent = function(h, n, i) {
			function k(l) {
				l.target = l.srcElement || f;
				i.call(h, l)
			}
			var j = h.hcEvents = h.hcEvents || {};
			h.addEventListener ? h.addEventListener(n, i, !1) : h.attachEvent && (h.hcEventsIE || (h.hcEventsIE = {}), i.hcGetKey || (i.hcGetKey = d.uniqueKey()), h.hcEventsIE[i.hcGetKey] = k, h.attachEvent("on" + n, k));
			j[n] || (j[n] = []);
			j[n].push(i);
			return function() {
				d.removeEvent(h, n, i)
			}
		};
		d.removeEvent = function(h, p, i) {
			function o(m, l) {
				h.removeEventListener ? h.removeEventListener(m, l, !1) : h.attachEvent && (l = h.hcEventsIE[l.hcGetKey], h.detachEvent("on" + m, l))
			}

			function j() {
				var m, l;
				h.nodeName && (p ? (m = {}, m[p] = !0) : m = n, d.objectEach(m, function(r, s) {
					if (n[s]) {
						for (l = n[s].length; l--;) {
							o(s, n[s][l])
						}
					}
				}))
			}
			var k, n = h.hcEvents,
				q;
			n && (p ? (k = n[p] || [], i ? (q = d.inArray(i, k), -1 < q && (k.splice(q, 1), n[p] = k), o(p, i)) : (j(), n[p] = [])) : (j(), h.hcEvents = {}))
		};
		d.fireEvent = function(h, p, i, o) {
			var j;
			j = h.hcEvents;
			var k, n;
			i = i || {};
			if (e.createEvent && (h.dispatchEvent || h.fireEvent)) {
				j = e.createEvent("Events"), j.initEvent(p, !0, !0), d.extend(j, i), h.dispatchEvent ? h.dispatchEvent(j) : h.fireEvent(p, j)
			} else {
				if (j) {
					for (j = j[p] || [], k = j.length, i.target || d.extend(i, {
							preventDefault: function() {
								i.defaultPrevented = !0
							},
							target: h,
							type: p
						}), p = 0; p < k; p++) {
						(n = j[p]) && !1 === n.call(h, i) && i.preventDefault()
					}
				}
			}
			o && !i.defaultPrevented && o(i)
		};
		d.animate = function(h, p, i) {
			var o, j = "",
				k, n, q;
			d.isObject(i) || (q = arguments, i = {
				duration: q[2],
				easing: q[3],
				complete: q[4]
			});
			d.isNumber(i.duration) || (i.duration = 400);
			i.easing = "function" === typeof i.easing ? i.easing : Math[i.easing] || Math.easeInOutSine;
			i.curAnim = d.merge(p);
			d.objectEach(p, function(m, l) {
				d.stop(h, l);
				n = new d.Fx(h, i, l);
				k = null;
				"d" === l ? (n.paths = n.initPath(h, h.d, p.d), n.toD = p.d, o = 0, k = 1) : h.attr ? o = h.attr(l) : (o = parseFloat(d.getStyle(h, l)) || 0, "opacity" !== l && (j = "px"));
				k || (k = m);
				k && k.match && k.match("px") && (k = k.replace(/px/g, ""));
				n.run(o, k, j)
			})
		};
		d.seriesType = function(h, p, i, o, j) {
			var k = d.getOptions(),
				n = d.seriesTypes;
			k.plotOptions[h] = d.merge(k.plotOptions[p], i);
			n[h] = d.extendClass(n[p] || function() {}, o);
			n[h].prototype.type = h;
			j && (n[h].prototype.pointClass = d.extendClass(d.Point, j));
			return n[h]
		};
		d.uniqueKey = function() {
			var h = Math.random().toString(36).substring(2, 9),
				i = 0;
			return function() {
				return "highcharts-" + h + "-" + i++
			}
		}();
		f.jQuery && (f.jQuery.fn.highcharts = function() {
			var h = [].slice.call(arguments);
			if (this[0]) {
				return h[0] ? (new(d[d.isString(h[0]) ? h.shift() : "Chart"])(this[0], h[0], h[1]), this) : c[d.attr(this[0], "data-highcharts-chart")]
			}
		});
		e && !e.defaultView && (d.getStyle = function(h, j) {
			var i = {
				width: "clientWidth",
				height: "clientHeight"
			}[j];
			if (h.style[j]) {
				return d.pInt(h.style[j])
			}
			"opacity" === j && (j = "filter");
			if (i) {
				return h.style.zoom = 1, Math.max(h[i] - 2 * d.getStyle(h, "padding"), 0)
			}
			h = h.currentStyle[j.replace(/\-(\w)/g, function(k, l) {
				return l.toUpperCase()
			})];
			"filter" === j && (h = h.replace(/alpha\(opacity=([0-9]+)\)/, function(k, l) {
				return l / 100
			}));
			return "" === h ? 1 : d.pInt(h)
		});
		Array.prototype.forEach || (d.each = function(j, n, i) {
			for (var k = 0, h = j.length; k < h; k++) {
				if (!1 === n.call(i, j[k], k, j)) {
					return k
				}
			}
		});
		Array.prototype.indexOf || (d.inArray = function(i, k) {
			var h, j = 0;
			if (k) {
				for (h = k.length; j < h; j++) {
					if (k[j] === i) {
						return j
					}
				}
			}
			return -1
		});
		Array.prototype.filter || (d.grep = function(j, n) {
			for (var i = [], k = 0, h = j.length; k < h; k++) {
				n(j[k], k) && i.push(j[k])
			}
			return i
		});
		Array.prototype.find || (d.find = function(i, k) {
			var h, j = i.length;
			for (h = 0; h < j; h++) {
				if (k(i[h], h)) {
					return i[h]
				}
			}
		})
	})(b);
	(function(e) {
		var h = e.each,
			d = e.isNumber,
			f = e.map,
			g = e.merge,
			c = e.pInt;
		e.Color = function(i) {
			if (!(this instanceof e.Color)) {
				return new e.Color(i)
			}
			this.init(i)
		};
		e.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(i) {
					return [c(i[1]), c(i[2]), c(i[3]), parseFloat(i[4], 10)]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function(i) {
					return [c(i[1]), c(i[2]), c(i[3]), 1]
				}
			}],
			names: {
				none: "rgba(255,255,255,0)",
				white: "#ffffff",
				black: "#000000"
			},
			init: function(o) {
				var j, n, i, k;
				if ((this.input = o = this.names[o && o.toLowerCase ? o.toLowerCase() : ""] || o) && o.stops) {
					this.stops = f(o.stops, function(l) {
						return new e.Color(l[1])
					})
				} else {
					if (o && "#" === o.charAt() && (j = o.length, o = parseInt(o.substr(1), 16), 7 === j ? n = [(o & 16711680) >> 16, (o & 65280) >> 8, o & 255, 1] : 4 === j && (n = [(o & 3840) >> 4 | (o & 3840) >> 8, (o & 240) >> 4 | o & 240, (o & 15) << 4 | o & 15, 1])), !n) {
						for (i = this.parsers.length; i-- && !n;) {
							k = this.parsers[i], (j = k.regex.exec(o)) && (n = k.parse(j))
						}
					}
				}
				this.rgba = n || []
			},
			get: function(j) {
				var l = this.input,
					k = this.rgba,
					i;
				this.stops ? (i = g(l), i.stops = [].concat(i.stops), h(this.stops, function(n, m) {
					i.stops[m] = [i.stops[m][0], n.get(j)]
				})) : i = k && d(k[0]) ? "rgb" === j || !j && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === j ? k[3] : "rgba(" + k.join(",") + ")" : l;
				return i
			},
			brighten: function(i) {
				var k, j = this.rgba;
				if (this.stops) {
					h(this.stops, function(l) {
						l.brighten(i)
					})
				} else {
					if (d(i) && 0 !== i) {
						for (k = 0; 3 > k; k++) {
							j[k] += c(255 * i), 0 > j[k] && (j[k] = 0), 255 < j[k] && (j[k] = 255)
						}
					}
				}
				return this
			},
			setOpacity: function(i) {
				this.rgba[3] = i;
				return this
			},
			tweenTo: function(k, j) {
				var n, i;
				k.rgba.length ? (n = this.rgba, k = k.rgba, i = 1 !== k[3] || 1 !== n[3], k = (i ? "rgba(" : "rgb(") + Math.round(k[0] + (n[0] - k[0]) * (1 - j)) + "," + Math.round(k[1] + (n[1] - k[1]) * (1 - j)) + "," + Math.round(k[2] + (n[2] - k[2]) * (1 - j)) + (i ? "," + (k[3] + (n[3] - k[3]) * (1 - j)) : "") + ")") : k = k.input || "none";
				return k
			}
		};
		e.color = function(i) {
			return new e.Color(i)
		}
	})(b);
	(function(aw) {
		var Y, aa, V = aw.addEvent,
			W = aw.animate,
			al = aw.attr,
			aq = aw.charts,
			am = aw.color,
			ah = aw.css,
			af = aw.createElement,
			ag = aw.defined,
			ap = aw.deg2rad,
			at = aw.destroyObjectProperties,
			an = aw.doc,
			av = aw.each,
			ar = aw.extend,
			ae = aw.erase,
			ac = aw.grep,
			ak = aw.hasTouch,
			X = aw.inArray,
			N = aw.isArray,
			au = aw.isFirefox,
			U = aw.isMS,
			ai = aw.isObject,
			Z = aw.isString,
			M = aw.isWebKit,
			aj = aw.merge,
			ab = aw.noop,
			S = aw.objectEach,
			x = aw.pick,
			ao = aw.pInt,
			ad = aw.removeEvent,
			o = aw.stop,
			T = aw.svg,
			s = aw.SVG_NS,
			j = aw.symbolSizes,
			i = aw.win;
		Y = aw.SVGElement = function() {
			return this
		};
		ar(Y.prototype, {
			opacity: 1,
			SVG_NS: s,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
			init: function(c, d) {
				this.element = "span" === d ? af(d) : an.createElementNS(this.SVG_NS, d);
				this.renderer = c
			},
			animate: function(d, e, f) {
				e = aw.animObject(x(e, this.renderer.globalAnimation, !0));
				0 !== e.duration ? (f && (e.complete = f), W(this, d, e)) : (this.attr(d, null, f), e.step && e.step.call(this));
				return this
			},
			colorGradient: function(E, r, D) {
				var F = this.renderer,
					A, l, y, B, m, t, p, J, K, I, C = [],
					u;
				E.radialGradient ? l = "radialGradient" : E.linearGradient && (l = "linearGradient");
				l && (y = E[l], m = F.gradients, p = E.stops, I = D.radialReference, N(y) && (E[l] = y = {
					x1: y[0],
					y1: y[1],
					x2: y[2],
					y2: y[3],
					gradientUnits: "userSpaceOnUse"
				}), "radialGradient" === l && I && !ag(y.gradientUnits) && (B = y, y = aj(y, F.getRadialAttr(I, B), {
					gradientUnits: "userSpaceOnUse"
				})), S(y, function(d, c) {
					"id" !== c && C.push(c, d)
				}), S(p, function(c) {
					C.push(c)
				}), C = C.join(","), m[C] ? I = m[C].attr("id") : (y.id = I = aw.uniqueKey(), m[C] = t = F.createElement(l).attr(y).add(F.defs), t.radAttr = B, t.stops = [], av(p, function(c) {
					0 === c[1].indexOf("rgba") ? (A = aw.color(c[1]), J = A.get("rgb"), K = A.get("a")) : (J = c[1], K = 1);
					c = F.createElement("stop").attr({
						offset: c[0],
						"stop-color": J,
						"stop-opacity": K
					}).add(t);
					t.stops.push(c)
				})), u = "url(" + F.url + "#" + I + ")", D.setAttribute(r, u), D.gradient = C, E.toString = function() {
					return u
				})
			},
			applyTextOutline: function(d) {
				var g = this.element,
					n, f, m, l, k; - 1 !== d.indexOf("contrast") && (d = d.replace(/contrast/g, this.renderer.getContrast(g.style.fill)));
				d = d.split(" ");
				f = d[d.length - 1];
				if ((m = d[0]) && "none" !== m && aw.svg) {
					this.fakeTS = !0;
					d = [].slice.call(g.getElementsByTagName("tspan"));
					this.ySetter = this.xSetter;
					m = m.replace(/(^[\d\.]+)(.*?)$/g, function(e, c, p) {
						return 2 * c + p
					});
					for (k = d.length; k--;) {
						n = d[k], "highcharts-text-outline" === n.getAttribute("class") && ae(d, g.removeChild(n))
					}
					l = g.firstChild;
					av(d, function(e, c) {
						0 === c && (e.setAttribute("x", g.getAttribute("x")), c = g.getAttribute("y"), e.setAttribute("y", c || 0), null === c && g.setAttribute("y", 0));
						e = e.cloneNode(1);
						al(e, {
							"class": "highcharts-text-outline",
							fill: f,
							stroke: f,
							"stroke-width": m,
							"stroke-linejoin": "round"
						});
						g.insertBefore(e, l)
					})
				}
			},
			attr: function(r, g, m, u) {
				var t, f = this.element,
					l, d = this,
					n, k;
				"string" === typeof r && void 0 !== g && (t = r, r = {}, r[t] = g);
				"string" === typeof r ? d = (this[r + "Getter"] || this._defaultGetter).call(this, r, f) : (S(r, function(c, e) {
					n = !1;
					u || o(this, e);
					this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(e) && (l || (this.symbolAttr(r), l = !0), n = !0);
					!this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0);
					n || (k = this[e + "Setter"] || this._defaultSetter, k.call(this, c, e, f), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, c, k))
				}, this), this.afterSetters());
				m && m();
				return d
			},
			afterSetters: function() {
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			},
			updateShadows: function(f, g, k) {
				for (var d = this.shadows, e = d.length; e--;) {
					k.call(d[e], "height" === f ? Math.max(g - (d[e].cutHeight || 0), 0) : "d" === f ? this.d : g, f, d[e])
				}
			},
			addClass: function(d, e) {
				var c = this.attr("class") || ""; - 1 === c.indexOf(d) && (e || (d = (c + (c ? " " : "") + d).replace("  ", " ")), this.attr("class", d));
				return this
			},
			hasClass: function(c) {
				return -1 !== X(c, (this.attr("class") || "").split(" "))
			},
			removeClass: function(c) {
				return this.attr("class", (this.attr("class") || "").replace(c, ""))
			},
			symbolAttr: function(d) {
				var c = this;
				av("x y r start end width height innerR anchorX anchorY".split(" "), function(e) {
					c[e] = x(d[e], c[e])
				});
				c.attr({
					d: c.renderer.symbols[c.symbolName](c.x, c.y, c.width, c.height, c)
				})
			},
			clip: function(c) {
				return this.attr("clip-path", c ? "url(" + this.renderer.url + "#" + c.id + ")" : "none")
			},
			crisp: function(f, g) {
				var d = this,
					k = {},
					e;
				g = g || f.strokeWidth || 0;
				e = Math.round(g) % 2 / 2;
				f.x = Math.floor(f.x || d.x || 0) + e;
				f.y = Math.floor(f.y || d.y || 0) + e;
				f.width = Math.floor((f.width || d.width || 0) - 2 * e);
				f.height = Math.floor((f.height || d.height || 0) - 2 * e);
				ag(f.strokeWidth) && (f.strokeWidth = g);
				S(f, function(c, l) {
					d[l] !== c && (d[l] = k[l] = c)
				});
				return k
			},
			css: function(m) {
				var r = this.styles,
					k = {},
					t = this.element,
					f, e = "",
					l, h = !r,
					g = ["textOutline", "textOverflow", "width"];
				m && m.color && (m.fill = m.color);
				r && S(m, function(c, d) {
					c !== r[d] && (k[d] = c, h = !0)
				});
				h && (r && (m = ar(r, k)), f = this.textWidth = m && m.width && "auto" !== m.width && "text" === t.nodeName.toLowerCase() && ao(m.width), this.styles = m, f && !T && this.renderer.forExport && delete m.width, U && !T ? ah(this.element, m) : (l = function(d, c) {
					return "-" + c.toLowerCase()
				}, S(m, function(d, c) {
					-1 === X(c, g) && (e += c.replace(/([A-Z])/g, l) + ":" + d + ";")
				}), e && al(t, "style", e)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), m && m.textOutline && this.applyTextOutline(m.textOutline)));
				return this
			},
			strokeWidth: function() {
				return this["stroke-width"] || 0
			},
			on: function(e, f) {
				var d = this,
					g = d.element;
				ak && "click" === e ? (g.ontouchstart = function(c) {
					d.touchEventFired = Date.now();
					c.preventDefault();
					f.call(g, c)
				}, g.onclick = function(c) {
					(-1 === i.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired || 0)) && f.call(g, c)
				}) : g["on" + e] = f;
				return this
			},
			setRadialReference: function(d) {
				var c = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = d;
				c && c.radAttr && c.animate(this.renderer.getRadialAttr(d, c.radAttr));
				return this
			},
			translate: function(c, d) {
				return this.attr({
					translateX: c,
					translateY: d
				})
			},
			invert: function(c) {
				this.inverted = c;
				this.updateTransform();
				return this
			},
			updateTransform: function() {
				var f = this.translateX || 0,
					g = this.translateY || 0,
					n = this.scaleX,
					d = this.scaleY,
					m = this.inverted,
					l = this.rotation,
					k = this.element;
				m && (f += this.width, g += this.height);
				f = ["translate(" + f + "," + g + ")"];
				m ? f.push("rotate(90) scale(-1,1)") : l && f.push("rotate(" + l + " " + (k.getAttribute("x") || 0) + " " + (k.getAttribute("y") || 0) + ")");
				(ag(n) || ag(d)) && f.push("scale(" + x(n, 1) + " " + x(d, 1) + ")");
				f.length && k.setAttribute("transform", f.join(" "))
			},
			toFront: function() {
				var c = this.element;
				c.parentNode.appendChild(c);
				return this
			},
			align: function(t, k, n) {
				var u, v, g, l, f = {};
				v = this.renderer;
				g = v.alignedObjects;
				var r, m;
				if (t) {
					if (this.alignOptions = t, this.alignByTranslate = k, !n || Z(n)) {
						this.alignTo = u = n || "renderer", ae(g, this), g.push(this), n = null
					}
				} else {
					t = this.alignOptions, k = this.alignByTranslate, u = this.alignTo
				}
				n = x(n, v[u], v);
				u = t.align;
				v = t.verticalAlign;
				g = (n.x || 0) + (t.x || 0);
				l = (n.y || 0) + (t.y || 0);
				"right" === u ? r = 1 : "center" === u && (r = 2);
				r && (g += (n.width - (t.width || 0)) / r);
				f[k ? "translateX" : "x"] = Math.round(g);
				"bottom" === v ? m = 1 : "middle" === v && (m = 2);
				m && (l += (n.height - (t.height || 0)) / m);
				f[k ? "translateY" : "y"] = Math.round(l);
				this[this.placed ? "animate" : "attr"](f);
				this.placed = !0;
				this.alignAttr = f;
				return this
			},
			getBBox: function(y, r) {
				var z, v = this.renderer,
					A, f = this.element,
					e = this.styles,
					u, l = this.textStr,
					m, t = v.cache,
					B = v.cacheKeys,
					C;
				r = x(r, this.rotation);
				A = r * ap;
				u = e && e.fontSize;
				void 0 !== l && (C = l.toString(), -1 === C.indexOf("\x3c") && (C = C.replace(/[0-9]/g, "0")), C += ["", r || 0, u, e && e.width, e && e.textOverflow].join());
				C && !y && (z = t[C]);
				if (!z) {
					if (f.namespaceURI === this.SVG_NS || v.forExport) {
						try {
							(m = this.fakeTS && function(c) {
								av(f.querySelectorAll(".highcharts-text-outline"), function(d) {
									d.style.display = c
								})
							}) && m("none"), z = f.getBBox ? ar({}, f.getBBox()) : {
								width: f.offsetWidth,
								height: f.offsetHeight
							}, m && m("")
						} catch (g) {}
						if (!z || 0 > z.width) {
							z = {
								width: 0,
								height: 0
							}
						}
					} else {
						z = this.htmlGetBBox()
					}
					v.isSVG && (y = z.width, v = z.height, e && "11px" === e.fontSize && 17 === Math.round(v) && (z.height = v = 14), r && (z.width = Math.abs(v * Math.sin(A)) + Math.abs(y * Math.cos(A)), z.height = Math.abs(v * Math.cos(A)) + Math.abs(y * Math.sin(A))));
					if (C && 0 < z.height) {
						for (; 250 < B.length;) {
							delete t[B.shift()]
						}
						t[C] || B.push(C);
						t[C] = z
					}
				}
				return z
			},
			show: function(c) {
				return this.attr({
					visibility: c ? "inherit" : "visible"
				})
			},
			hide: function() {
				return this.attr({
					visibility: "hidden"
				})
			},
			fadeOut: function(d) {
				var c = this;
				c.animate({
					opacity: 0
				}, {
					duration: d || 150,
					complete: function() {
						c.attr({
							y: -9999
						})
					}
				})
			},
			add: function(e) {
				var d = this.renderer,
					f = this.element,
					g;
				e && (this.parentGroup = e);
				this.parentInverted = e && e.inverted;
				void 0 !== this.textStr && d.buildText(this);
				this.added = !0;
				if (!e || e.handleZ || this.zIndex) {
					g = this.zIndexSetter()
				}
				g || (e ? e.element : d.box).appendChild(f);
				if (this.onAdd) {
					this.onAdd()
				}
				return this
			},
			safeRemoveChild: function(d) {
				var c = d.parentNode;
				c && c.removeChild(d)
			},
			destroy: function() {
				var e = this,
					f = e.element || {},
					g = e.renderer.isSVG && "SPAN" === f.nodeName && e.parentGroup,
					d = f.ownerSVGElement;
				f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
				o(e);
				e.clipPath && d && (av(d.querySelectorAll("[clip-path]"), function(c) {
					-1 < c.getAttribute("clip-path").indexOf(e.clipPath.element.id + ")") && c.removeAttribute("clip-path")
				}), e.clipPath = e.clipPath.destroy());
				if (e.stops) {
					for (d = 0; d < e.stops.length; d++) {
						e.stops[d] = e.stops[d].destroy()
					}
					e.stops = null
				}
				e.safeRemoveChild(f);
				for (e.destroyShadows(); g && g.div && 0 === g.div.childNodes.length;) {
					f = g.parentGroup, e.safeRemoveChild(g.div), delete g.div, g = f
				}
				e.alignTo && ae(e.renderer.alignedObjects, e);
				S(e, function(c, k) {
					delete e[k]
				});
				return null
			},
			shadow: function(v, l, t) {
				var y = [],
					z, g, f = this.element,
					m, u, r, k;
				if (!v) {
					this.destroyShadows()
				} else {
					if (!this.shadows) {
						u = x(v.width, 3);
						r = (v.opacity || 0.15) / u;
						k = this.parentInverted ? "(-1,-1)" : "(" + x(v.offsetX, 1) + ", " + x(v.offsetY, 1) + ")";
						for (z = 1; z <= u; z++) {
							g = f.cloneNode(0), m = 2 * u + 1 - 2 * z, al(g, {
								isShadow: "true",
								stroke: v.color || "#000000",
								"stroke-opacity": r * z,
								"stroke-width": m,
								transform: "translate" + k,
								fill: "none"
							}), t && (al(g, "height", Math.max(al(g, "height") - m, 0)), g.cutHeight = m), l ? l.element.appendChild(g) : f.parentNode.insertBefore(g, f), y.push(g)
						}
						this.shadows = y
					}
				}
				return this
			},
			destroyShadows: function() {
				av(this.shadows || [], function(c) {
					this.safeRemoveChild(c)
				}, this);
				this.shadows = void 0
			},
			xGetter: function(c) {
				"circle" === this.element.nodeName && ("x" === c ? c = "cx" : "y" === c && (c = "cy"));
				return this._defaultGetter(c)
			},
			_defaultGetter: function(c) {
				c = x(this[c], this.element ? this.element.getAttribute(c) : null, 0);
				/^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
				return c
			},
			dSetter: function(d, e, f) {
				d && d.join && (d = d.join(" "));
				/(NaN| {2}|^$)/.test(d) && (d = "M 0 0");
				this[e] !== d && (f.setAttribute(e, d), this[e] = d)
			},
			dashstyleSetter: function(e) {
				var d, f = this["stroke-width"];
				"inherit" === f && (f = 1);
				if (e = e && e.toLowerCase()) {
					e = e.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for (d = e.length; d--;) {
						e[d] = ao(e[d]) * f
					}
					e = e.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", e)
				}
			},
			alignSetter: function(c) {
				this.element.setAttribute("text-anchor", {
					left: "start",
					center: "middle",
					right: "end"
				}[c])
			},
			opacitySetter: function(d, e, f) {
				this[e] = d;
				f.setAttribute(e, d)
			},
			titleSetter: function(c) {
				var d = this.element.getElementsByTagName("title")[0];
				d || (d = an.createElementNS(this.SVG_NS, "title"), this.element.appendChild(d));
				d.firstChild && d.removeChild(d.firstChild);
				d.appendChild(an.createTextNode(String(x(c), "").replace(/<[^>]*>/g, "")))
			},
			textSetter: function(c) {
				c !== this.textStr && (delete this.bBox, this.textStr = c, this.added && this.renderer.buildText(this))
			},
			fillSetter: function(d, e, f) {
				"string" === typeof d ? f.setAttribute(e, d) : d && this.colorGradient(d, e, f)
			},
			visibilitySetter: function(d, e, f) {
				"inherit" === d ? f.removeAttribute(e) : this[e] !== d && f.setAttribute(e, d);
				this[e] = d
			},
			zIndexSetter: function(n, l) {
				var r = this.renderer,
					t = this.parentGroup,
					g = (t || r).element || r.box,
					f, h = this.element,
					m;
				f = this.added;
				var k;
				ag(n) && (h.zIndex = n, n = +n, this[l] === n && (f = !1), this[l] = n);
				if (f) {
					(n = this.zIndex) && t && (t.handleZ = !0);
					l = g.childNodes;
					for (k = 0; k < l.length && !m; k++) {
						t = l[k], f = t.zIndex, t !== h && (ao(f) > n || !ag(n) && ag(f) || 0 > n && !ag(f) && g !== r.box) && (g.insertBefore(h, t), m = !0)
					}
					m || g.appendChild(h)
				}
				return m
			},
			_defaultSetter: function(d, e, f) {
				f.setAttribute(e, d)
			}
		});
		Y.prototype.yGetter = Y.prototype.xGetter;
		Y.prototype.translateXSetter = Y.prototype.translateYSetter = Y.prototype.rotationSetter = Y.prototype.verticalAlignSetter = Y.prototype.scaleXSetter = Y.prototype.scaleYSetter = function(c, d) {
			this[d] = c;
			this.doTransform = !0
		};
		Y.prototype["stroke-widthSetter"] = Y.prototype.strokeSetter = function(d, e, f) {
			this[e] = d;
			this.stroke && this["stroke-width"] ? (Y.prototype.fillSetter.call(this, this.stroke, "stroke", f), f.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === d && this.hasStroke && (f.removeAttribute("stroke"), this.hasStroke = !1)
		};
		aa = aw.SVGRenderer = function() {
			this.init.apply(this, arguments)
		};
		ar(aa.prototype, {
			Element: Y,
			SVG_NS: s,
			init: function(g, k, f, n, l, m) {
				var d;
				n = this.createElement("svg").attr({
					version: "1.1",
					"class": "highcharts-root"
				}).css(this.getStyle(n));
				d = n.element;
				g.appendChild(d); - 1 === g.innerHTML.indexOf("xmlns") && al(d, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = d;
				this.boxWrapper = n;
				this.alignedObjects = [];
				this.url = (au || M) && an.getElementsByTagName("base").length ? i.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, " ") : "";
				this.createElement("desc").add().element.appendChild(an.createTextNode("Created with Highcharts 5.0.14"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = m;
				this.forExport = l;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(k, f, !1);
				var c;
				au && g.getBoundingClientRect && (k = function() {
					ah(g, {
						left: 0,
						top: 0
					});
					c = g.getBoundingClientRect();
					ah(g, {
						left: Math.ceil(c.left) - c.left + "px",
						top: Math.ceil(c.top) - c.top + "px"
					})
				}, k(), this.unSubPixelFix = V(i, "resize", k))
			},
			getStyle: function(c) {
				return this.style = ar({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, c)
			},
			setStyle: function(c) {
				this.boxWrapper.css(this.getStyle(c))
			},
			isHidden: function() {
				return !this.boxWrapper.getBBox().width
			},
			destroy: function() {
				var c = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				at(this.gradients || {});
				this.gradients = null;
				c && (this.defs = c.destroy());
				this.unSubPixelFix && this.unSubPixelFix();
				return this.alignedObjects = null
			},
			createElement: function(c) {
				var d = new this.Element;
				d.init(this, c);
				return d
			},
			draw: ab,
			getRadialAttr: function(c, d) {
				return {
					cx: c[0] - c[2] / 2 + d.cx * c[2],
					cy: c[1] - c[2] / 2 + d.cy * c[2],
					r: d.r * c[2]
				}
			},
			getSpanWidth: function(d, e) {
				var f = d.getBBox(!0).width;
				!T && this.forExport && (f = this.measureSpanWidth(e.firstChild.data, d.styles));
				return f
			},
			applyEllipsis: function(v, l, t, z) {
				var y = v.rotation,
					g = t,
					f, m = 0,
					u = t.length,
					r = function(c) {
						l.removeChild(l.firstChild);
						c && l.appendChild(an.createTextNode(c))
					},
					k;
				v.rotation = 0;
				g = this.getSpanWidth(v, l);
				if (k = g > z) {
					for (; m <= u;) {
						f = Math.ceil((m + u) / 2), g = t.substring(0, f) + "…", r(g), g = this.getSpanWidth(v, l), m === u ? m = u + 1 : g > z ? u = f - 1 : m = f
					}
					0 === u && r("")
				}
				v.rotation = y;
				return k
			},
			buildText: function(aF) {
				var aE = aF.element,
					C = this,
					A = C.forExport,
					ax = x(aF.textStr, "").toString(),
					R = -1 !== ax.indexOf("\x3c"),
					aC = aE.childNodes,
					aD, ay, aA, E, F = al(aE, "x"),
					m = aF.styles,
					aB = aF.textWidth,
					y = m && m.lineHeight,
					Q = m && m.textOutline,
					O = m && "ellipsis" === m.textOverflow,
					az = m && "nowrap" === m.whiteSpace,
					h = m && m.fontSize,
					L, r, H = aC.length,
					m = aB && !aF.added && this.box,
					k = function(d) {
						var c;
						c = /(px|em)$/.test(d && d.style.fontSize) ? d.style.fontSize : h || C.style.fontSize || 12;
						return y ? ao(y) : C.fontMetrics(c, d.getAttribute("style") ? d : aE).h
					};
				L = [ax, O, az, y, Q, h, aB].join();
				if (L !== aF.textCache) {
					for (aF.textCache = L; H--;) {
						aE.removeChild(aC[H])
					}
					R || Q || O || aB || -1 !== ax.indexOf(" ") ? (aD = /<.*class="([^"]+)".*>/, ay = /<.*style="([^"]+)".*>/, aA = /<.*href="([^"]+)".*>/, m && m.appendChild(aE), ax = R ? ax.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [ax], ax = ac(ax, function(c) {
						return "" !== c
					}), av(ax, function(c, g) {
						var d, f = 0;
						c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
						d = c.split("|||");
						av(d, function(l) {
							if ("" !== l || 1 === d.length) {
								var v = {},
									q = an.createElementNS(C.SVG_NS, "tspan"),
									u, w;
								aD.test(l) && (u = l.match(aD)[1], al(q, "class", u));
								ay.test(l) && (w = l.match(ay)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), al(q, "style", w));
								aA.test(l) && !A && (al(q, "onclick", 'location.href\x3d"' + l.match(aA)[1] + '"'), ah(q, {
									cursor: "pointer"
								}));
								l = (l.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
								if (" " !== l) {
									q.appendChild(an.createTextNode(l));
									f ? v.dx = 0 : g && null !== F && (v.x = F);
									al(q, v);
									aE.appendChild(q);
									!f && r && (!T && A && ah(q, {
										display: "block"
									}), al(q, "dy", k(q)));
									if (aB) {
										v = l.replace(/([^\^])-/g, "$1- ").split(" ");
										u = 1 < d.length || g || 1 < v.length && !az;
										var e = [],
											p, n = k(q),
											D = aF.rotation;
										for (O && (E = C.applyEllipsis(aF, q, l, aB)); !O && u && (v.length || e.length);) {
											aF.rotation = 0, p = C.getSpanWidth(aF, q), l = p > aB, void 0 === E && (E = l), l && 1 !== v.length ? (q.removeChild(q.firstChild), e.unshift(v.pop())) : (v = e, e = [], v.length && !az && (q = an.createElementNS(s, "tspan"), al(q, {
												dy: n,
												x: F
											}), w && al(q, "style", w), aE.appendChild(q)), p > aB && (aB = p)), v.length && q.appendChild(an.createTextNode(v.join(" ").replace(/- /g, "-")))
										}
										aF.rotation = D
									}
									f++
								}
							}
						});
						r = r || aE.childNodes.length
					}), E && aF.attr("title", aF.textStr), m && m.removeChild(aE), Q && aF.applyTextOutline && aF.applyTextOutline(Q)) : aE.appendChild(an.createTextNode(ax.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
				}
			},
			getContrast: function(c) {
				c = am(c).rgba;
				return 510 < c[0] + c[1] + c[2] ? "#000000" : "#FFFFFF"
			},
			button: function(D, p, A, E, e, B, u, l, r) {
				var C = this.label(D, p, A, r, null, null, null, null, "button"),
					m = 0;
				C.attr(aj({
					padding: 8,
					r: 2
				}, e));
				var y, G, F, t;
				e = aj({
					fill: "#f7f7f7",
					stroke: "#cccccc",
					"stroke-width": 1,
					style: {
						color: "#333333",
						cursor: "pointer",
						fontWeight: "normal"
					}
				}, e);
				y = e.style;
				delete e.style;
				B = aj(e, {
					fill: "#e6e6e6"
				}, B);
				G = B.style;
				delete B.style;
				u = aj(e, {
					fill: "#e6ebf5",
					style: {
						color: "#000000",
						fontWeight: "bold"
					}
				}, u);
				F = u.style;
				delete u.style;
				l = aj(e, {
					style: {
						color: "#cccccc"
					}
				}, l);
				t = l.style;
				delete l.style;
				V(C.element, U ? "mouseover" : "mouseenter", function() {
					3 !== m && C.setState(1)
				});
				V(C.element, U ? "mouseout" : "mouseleave", function() {
					3 !== m && C.setState(m)
				});
				C.setState = function(c) {
					1 !== c && (C.state = m = c);
					C.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][c || 0]);
					C.attr([e, B, u, l][c || 0]).css([y, G, F, t][c || 0])
				};
				C.attr(e).css(ar({
					cursor: "default"
				}, y));
				return C.on("click", function(c) {
					3 !== m && E.call(C, c)
				})
			},
			crispLine: function(c, d) {
				c[1] === c[4] && (c[1] = c[4] = Math.round(c[1]) - d % 2 / 2);
				c[2] === c[5] && (c[2] = c[5] = Math.round(c[2]) + d % 2 / 2);
				return c
			},
			path: function(c) {
				var d = {
					fill: "none"
				};
				N(c) ? d.d = c : ai(c) && ar(d, c);
				return this.createElement("path").attr(d)
			},
			circle: function(d, e, f) {
				d = ai(d) ? d : {
					x: d,
					y: e,
					r: f
				};
				e = this.createElement("circle");
				e.xSetter = e.ySetter = function(g, k, l) {
					l.setAttribute("c" + k, g)
				};
				return e.attr(d)
			},
			arc: function(f, g, l, e, k, d) {
				ai(f) ? (e = f, g = e.y, l = e.r, f = e.x) : e = {
					innerR: e,
					start: k,
					end: d
				};
				f = this.symbol("arc", f, g, l, l, e);
				f.r = l;
				return f
			},
			rect: function(g, k, m, f, l, e) {
				l = ai(g) ? g.r : l;
				var d = this.createElement("rect");
				g = ai(g) ? g : void 0 === g ? {} : {
					x: g,
					y: k,
					width: Math.max(m, 0),
					height: Math.max(f, 0)
				};
				void 0 !== e && (g.strokeWidth = e, g = d.crisp(g));
				g.fill = "none";
				l && (g.r = l);
				d.rSetter = function(n, p, q) {
					al(q, {
						rx: n,
						ry: n
					})
				};
				return d.attr(g)
			},
			setSize: function(e, f, k) {
				var d = this.alignedObjects,
					g = d.length;
				this.width = e;
				this.height = f;
				for (this.boxWrapper.animate({
						width: e,
						height: f
					}, {
						step: function() {
							this.attr({
								viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
							})
						},
						duration: x(k, !0) ? void 0 : 0
					}); g--;) {
					d[g].align()
				}
			},
			g: function(c) {
				var d = this.createElement("g");
				return c ? d.attr({
					"class": "highcharts-" + c
				}) : d
			},
			image: function(f, g, l, e, k) {
				var d = {
					preserveAspectRatio: "none"
				};
				1 < arguments.length && ar(d, {
					x: g,
					y: l,
					width: e,
					height: k
				});
				d = this.createElement("image").attr(d);
				d.element.setAttributeNS ? d.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", f) : d.element.setAttribute("hc-svg-href", f);
				return d
			},
			symbol: function(B, l, u, D, f, e) {
				var C = this,
					r, k = /^url\((.*?)\)$/,
					m = k.test(B),
					t = !m && (this.symbols[B] ? B : "circle"),
					I = t && this.symbols[t],
					F = ag(l) && I && I.call(this.symbols, Math.round(l), Math.round(u), D, f, e),
					E, A;
				I ? (r = this.path(F), r.attr("fill", "none"), ar(r, {
					symbolName: t,
					x: l,
					y: u,
					width: D,
					height: f
				}), e && ar(r, e)) : m && (E = B.match(k)[1], r = this.image(E), r.imgwidth = x(j[E] && j[E].width, e && e.width), r.imgheight = x(j[E] && j[E].height, e && e.height), A = function() {
					r.attr({
						width: r.width,
						height: r.height
					})
				}, av(["width", "height"], function(c) {
					r[c + "Setter"] = function(g, n) {
						var v = {},
							d = this["img" + n],
							q = "width" === n ? "translateX" : "translateY";
						this[n] = g;
						ag(d) && (this.element && this.element.setAttribute(n, d), this.alignByTranslate || (v[q] = ((this[n] || 0) - d) / 2, this.attr(v)))
					}
				}), ag(l) && r.attr({
					x: l,
					y: u
				}), r.isImg = !0, ag(r.imgwidth) && ag(r.imgheight) ? A() : (r.attr({
					width: 0,
					height: 0
				}), af("img", {
					onload: function() {
						var c = aq[C.chartIndex];
						0 === this.width && (ah(this, {
							position: "absolute",
							top: "-999em"
						}), an.body.appendChild(this));
						j[E] = {
							width: this.width,
							height: this.height
						};
						r.imgwidth = this.width;
						r.imgheight = this.height;
						r.element && A();
						this.parentNode && this.parentNode.removeChild(this);
						C.imgCount--;
						if (!C.imgCount && c && c.onload) {
							c.onload()
						}
					},
					src: E
				}), this.imgCount++));
				return r
			},
			symbols: {
				circle: function(e, f, g, d) {
					return this.arc(e + g / 2, f + d / 2, g / 2, d / 2, {
						start: 0,
						end: 2 * Math.PI,
						open: !1
					})
				},
				square: function(e, f, g, d) {
					return ["M", e, f, "L", e + g, f, e + g, f + d, e, f + d, "Z"]
				},
				triangle: function(e, f, g, d) {
					return ["M", e + g / 2, f, "L", e + g, f + d, e, f + d, "Z"]
				},
				"triangle-down": function(e, f, g, d) {
					return ["M", e, f, "L", e + g, f, e + g / 2, f + d, "Z"]
				},
				diamond: function(e, f, g, d) {
					return ["M", e + g / 2, f, "L", e + g, f + d / 2, e + g / 2, f + d, e, f + d / 2, "Z"]
				},
				arc: function(z, m, v, B, k) {
					var f = k.start,
						y = k.r || v,
						A = k.r || B || v,
						t = k.end - 0.001;
					v = k.innerR;
					B = x(k.open, 0.001 > Math.abs(k.end - k.start - 2 * Math.PI));
					var u = Math.cos(f),
						l = Math.sin(f),
						r = Math.cos(t),
						t = Math.sin(t);
					k = 0.001 > k.end - f - Math.PI ? 0 : 1;
					y = ["M", z + y * u, m + A * l, "A", y, A, 0, k, 1, z + y * r, m + A * t];
					ag(v) && y.push(B ? "M" : "L", z + v * r, m + v * t, "A", v, v, 0, k, 0, z + v * u, m + v * l);
					y.push(B ? "" : "Z");
					return y
				},
				callout: function(t, k, n, u, g) {
					var f = Math.min(g && g.r || 0, n, u),
						r = f + 6,
						l = g && g.anchorX;
					g = g && g.anchorY;
					var m;
					m = ["M", t + f, k, "L", t + n - f, k, "C", t + n, k, t + n, k, t + n, k + f, "L", t + n, k + u - f, "C", t + n, k + u, t + n, k + u, t + n - f, k + u, "L", t + f, k + u, "C", t, k + u, t, k + u, t, k + u - f, "L", t, k + f, "C", t, k, t, k, t + f, k];
					l && l > n ? g > k + r && g < k + u - r ? m.splice(13, 3, "L", t + n, g - 6, t + n + 6, g, t + n, g + 6, t + n, k + u - f) : m.splice(13, 3, "L", t + n, u / 2, l, g, t + n, u / 2, t + n, k + u - f) : l && 0 > l ? g > k + r && g < k + u - r ? m.splice(33, 3, "L", t, g + 6, t - 6, g, t, g - 6, t, k + f) : m.splice(33, 3, "L", t, u / 2, l, g, t, u / 2, t, k + f) : g && g > u && l > t + r && l < t + n - r ? m.splice(23, 3, "L", l + 6, k + u, l, k + u + 6, l - 6, k + u, t + f, k + u) : g && 0 > g && l > t + r && l < t + n - r && m.splice(3, 3, "L", l - 6, k, l, k - 6, l + 6, k, n - f, k);
					return m
				}
			},
			clipRect: function(f, l, e, k) {
				var g = aw.uniqueKey(),
					d = this.createElement("clipPath").attr({
						id: g
					}).add(this.defs);
				f = this.rect(f, l, e, k, 0).add(d);
				f.id = g;
				f.clipPath = d;
				f.count = 0;
				return f
			},
			text: function(e, f, l, d) {
				var k = !T && this.forExport,
					g = {};
				if (d && (this.allowHTML || !this.forExport)) {
					return this.html(e, f, l)
				}
				g.x = Math.round(f || 0);
				l && (g.y = Math.round(l));
				if (e || 0 === e) {
					g.text = e
				}
				e = this.createElement("text").attr(g);
				k && e.css({
					position: "absolute"
				});
				d || (e.xSetter = function(r, t, y) {
					var n = y.getElementsByTagName("tspan"),
						v, u = y.getAttribute(t),
						m;
					for (m = 0; m < n.length; m++) {
						v = n[m], v.getAttribute(t) === u && v.setAttribute(t, r)
					}
					y.setAttribute(t, r)
				});
				return e
			},
			fontMetrics: function(d, e) {
				d = d || e && e.style && e.style.fontSize || this.style && this.style.fontSize;
				d = /px/.test(d) ? ao(d) : /em/.test(d) ? parseFloat(d) * (e ? this.fontMetrics(null, e.parentNode).f : 16) : 12;
				e = 24 > d ? d + 3 : Math.round(1.2 * d);
				return {
					h: e,
					b: Math.round(0.8 * e),
					f: d
				}
			},
			rotCorr: function(e, f, g) {
				var d = e;
				f && g && (d = Math.max(d * Math.cos(f * ap), 4));
				return {
					x: -e / 3 * Math.sin(f * ap),
					y: d
				}
			},
			label: function(aQ, aU, aL, aT, aM, aR, aP, az, aF) {
				var aD = this,
					aE = aD.g("button" !== aF && "label"),
					aG = aE.text = aD.text("", 0, 0, aP).attr({
						zIndex: 1
					}),
					aS, aB, aC = 0,
					aK = 3,
					aI = 0,
					aJ, aO, C, aN, aA, E = {},
					ax, aH, F = /^url\((.*?)\)$/.test(aT),
					ay = F,
					p, t, A, w;
				aF && aE.addClass("highcharts-" + aF);
				ay = F;
				p = function() {
					return (ax || 0) % 2 / 2
				};
				t = function() {
					var c = aG.element.style,
						d = {};
					aB = (void 0 === aJ || void 0 === aO || aA) && ag(aG.textStr) && aG.getBBox();
					aE.width = (aJ || aB.width || 0) + 2 * aK + aI;
					aE.height = (aO || aB.height || 0) + 2 * aK;
					aH = aK + aD.fontMetrics(c && c.fontSize, aG).b;
					ay && (aS || (aE.box = aS = aD.symbols[aT] || F ? aD.symbol(aT) : aD.rect(), aS.addClass(("button" === aF ? "" : "highcharts-label-box") + (aF ? " highcharts-" + aF + "-box" : "")), aS.add(aE), c = p(), d.x = c, d.y = (az ? -aH : 0) + c), d.width = Math.round(aE.width), d.height = Math.round(aE.height), aS.attr(ar(d, E)), E = {})
				};
				A = function() {
					var c = aI + aK,
						d;
					d = az ? 0 : aH;
					ag(aJ) && aB && ("center" === aA || "right" === aA) && (c += {
						center: 0.5,
						right: 1
					}[aA] * (aJ - aB.width));
					if (c !== aG.x || d !== aG.y) {
						aG.attr("x", c), void 0 !== d && aG.attr("y", d)
					}
					aG.x = c;
					aG.y = d
				};
				w = function(c, d) {
					aS ? aS.attr(c, d) : E[c] = d
				};
				aE.onAdd = function() {
					aG.add(aE);
					aE.attr({
						text: aQ || 0 === aQ ? aQ : "",
						x: aU,
						y: aL
					});
					aS && ag(aM) && aE.attr({
						anchorX: aM,
						anchorY: aR
					})
				};
				aE.widthSetter = function(c) {
					aJ = aw.isNumber(c) ? c : null
				};
				aE.heightSetter = function(c) {
					aO = c
				};
				aE["text-alignSetter"] = function(c) {
					aA = c
				};
				aE.paddingSetter = function(c) {
					ag(c) && c !== aK && (aK = aE.padding = c, A())
				};
				aE.paddingLeftSetter = function(c) {
					ag(c) && c !== aI && (aI = c, A())
				};
				aE.alignSetter = function(c) {
					c = {
						left: 0,
						center: 0.5,
						right: 1
					}[c];
					c !== aC && (aC = c, aB && aE.attr({
						x: C
					}))
				};
				aE.textSetter = function(c) {
					void 0 !== c && aG.textSetter(c);
					t();
					A()
				};
				aE["stroke-widthSetter"] = function(c, d) {
					c && (ay = !0);
					ax = this["stroke-width"] = c;
					w(d, c)
				};
				aE.strokeSetter = aE.fillSetter = aE.rSetter = function(c, d) {
					"r" !== d && ("fill" === d && c && (ay = !0), aE[d] = c);
					w(d, c)
				};
				aE.anchorXSetter = function(c, d) {
					aM = aE.anchorX = c;
					w(d, Math.round(c) - p() - C)
				};
				aE.anchorYSetter = function(c, d) {
					aR = aE.anchorY = c;
					w(d, c - aN)
				};
				aE.xSetter = function(c) {
					aE.x = c;
					aC && (c -= aC * ((aJ || aB.width) + 2 * aK));
					C = Math.round(c);
					aE.attr("translateX", C)
				};
				aE.ySetter = function(c) {
					aN = aE.y = Math.round(c);
					aE.attr("translateY", aN)
				};
				var e = aE.css;
				return ar(aE, {
					css: function(c) {
						if (c) {
							var d = {};
							c = aj(c);
							av(aE.textProps, function(f) {
								void 0 !== c[f] && (d[f] = c[f], delete c[f])
							});
							aG.css(d)
						}
						return e.call(aE, c)
					},
					getBBox: function() {
						return {
							width: aB.width + 2 * aK,
							height: aB.height + 2 * aK,
							x: aB.x - aK,
							y: aB.y - aK
						}
					},
					shadow: function(c) {
						c && (t(), aS && aS.shadow(c));
						return aE
					},
					destroy: function() {
						ad(aE.element, "mouseenter");
						ad(aE.element, "mouseleave");
						aG && (aG = aG.destroy());
						aS && (aS = aS.destroy());
						Y.prototype.destroy.call(aE);
						aE = aD = t = A = w = null
					}
				})
			}
		});
		aw.Renderer = aa
	})(b);
	(function(s) {
		var e = s.attr,
			h = s.createElement,
			x = s.css,
			y = s.defined,
			i = s.each,
			p = s.extend,
			j = s.isFirefox,
			c = s.isMS,
			v = s.isWebKit,
			w = s.pInt,
			o = s.SVGRenderer,
			q = s.win,
			n = s.wrap;
		p(s.SVGElement.prototype, {
			htmlCss: function(f) {
				var d = this.element;
				if (d = f && "SPAN" === d.tagName && f.width) {
					delete f.width, this.textWidth = d, this.updateTransform()
				}
				f && "ellipsis" === f.textOverflow && (f.whiteSpace = "nowrap", f.overflow = "hidden");
				this.styles = p(this.styles, f);
				x(this.element, f);
				return this
			},
			htmlGetBBox: function() {
				var d = this.element;
				"text" === d.nodeName && (d.style.position = "absolute");
				return {
					x: d.offsetLeft,
					y: d.offsetTop,
					width: d.offsetWidth,
					height: d.offsetHeight
				}
			},
			htmlUpdateTransform: function() {
				if (this.added) {
					var I = this.renderer,
						E = this.element,
						F = this.translateX || 0,
						C = this.translateY || 0,
						z = this.x || 0,
						A = this.y || 0,
						D = this.textAlign || "left",
						H = {
							left: 0,
							center: 0.5,
							right: 1
						}[D],
						J = this.styles;
					x(E, {
						marginLeft: F,
						marginTop: C
					});
					this.shadows && i(this.shadows, function(d) {
						x(d, {
							marginLeft: F + 1,
							marginTop: C + 1
						})
					});
					this.inverted && i(E.childNodes, function(d) {
						I.invertChild(d, E)
					});
					if ("SPAN" === E.tagName) {
						var m = this.rotation,
							u = w(this.textWidth),
							l = J && J.whiteSpace,
							t = [m, D, E.innerHTML, this.textWidth, this.textAlign].join();
						t !== this.cTT && (J = I.fontMetrics(E.style.fontSize).b, y(m) && this.setSpanRotation(m, H, J), x(E, {
							width: "",
							whiteSpace: l || "nowrap"
						}), E.offsetWidth > u && /[ \-]/.test(E.textContent || E.innerText) && x(E, {
							width: u + "px",
							display: "block",
							whiteSpace: l || "normal"
						}), this.getSpanCorrection(E.offsetWidth, J, H, m, D));
						x(E, {
							left: z + (this.xCorr || 0) + "px",
							top: A + (this.yCorr || 0) + "px"
						});
						v && (J = E.offsetHeight);
						this.cTT = t
					}
				} else {
					this.alignOnAdd = !0
				}
			},
			setSpanRotation: function(f, l, k) {
				var d = {},
					m = c ? "-ms-transform" : v ? "-webkit-transform" : j ? "MozTransform" : q.opera ? "-o-transform" : "";
				d[m] = d.transform = "rotate(" + f + "deg)";
				d[m + (j ? "Origin" : "-origin")] = d.transformOrigin = 100 * l + "% " + k + "px";
				x(this.element, d)
			},
			getSpanCorrection: function(f, g, k) {
				this.xCorr = -f * k;
				this.yCorr = -g
			}
		});
		p(o.prototype, {
			html: function(k, r, t) {
				var f = this.createElement("span"),
					z = f.element,
					m = f.renderer,
					l = m.isSVG,
					u = function(d, g) {
						i(["opacity", "visibility"], function(A) {
							n(d, A + "Setter", function(C, E, D, B) {
								C.call(this, E, D, B);
								g[D] = E
							})
						})
					};
				f.textSetter = function(d) {
					d !== z.innerHTML && delete this.bBox;
					z.innerHTML = this.textStr = d;
					f.htmlUpdateTransform()
				};
				l && u(f, f.element.style);
				f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function(d, g) {
					"align" === g && (g = "textAlign");
					f[g] = d;
					f.htmlUpdateTransform()
				};
				f.attr({
					text: k,
					x: Math.round(r),
					y: Math.round(t)
				}).css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize,
					position: "absolute"
				});
				z.style.whiteSpace = "nowrap";
				f.css = f.htmlCss;
				l && (f.add = function(g) {
					var A, B = m.box.parentNode,
						C = [];
					if (this.parentGroup = g) {
						if (A = g.div, !A) {
							for (; g;) {
								C.push(g), g = g.parentGroup
							}
							i(C.reverse(), function(d) {
								var D, E = e(d.element, "class");
								E && (E = {
									className: E
								});
								A = d.div = d.div || h("div", E, {
									position: "absolute",
									left: (d.translateX || 0) + "px",
									top: (d.translateY || 0) + "px",
									display: d.display,
									opacity: d.opacity,
									pointerEvents: d.styles && d.styles.pointerEvents
								}, A || B);
								D = A.style;
								p(d, {
									classSetter: function(F) {
										this.element.setAttribute("class", F);
										A.className = F
									},
									on: function() {
										C[0].div && f.on.apply({
											element: C[0].div
										}, arguments);
										return d
									},
									translateXSetter: function(G, F) {
										D.left = G + "px";
										d[F] = G;
										d.doTransform = !0
									},
									translateYSetter: function(G, F) {
										D.top = G + "px";
										d[F] = G;
										d.doTransform = !0
									}
								});
								u(d, D)
							})
						}
					} else {
						A = B
					}
					A.appendChild(z);
					f.added = !0;
					f.alignOnAdd && f.htmlUpdateTransform();
					return f
				});
				return f
			}
		})
	})(b);
	(function(P) {
		var w, z, j = P.createElement,
			p = P.css,
			G = P.defined,
			L = P.deg2rad,
			H = P.discardElement,
			x = P.doc,
			o = P.each,
			q = P.erase,
			K = P.extend;
		w = P.extendClass;
		var N = P.isArray,
			I = P.isNumber,
			O = P.isObject,
			M = P.merge;
		z = P.noop;
		var i = P.pick,
			h = P.pInt,
			B = P.SVGElement,
			s = P.SVGRenderer,
			c = P.win;
		P.svg || (z = {
			docMode8: x && 8 === x.documentMode,
			init: function(g, f) {
				var m = ["\x3c", f, ' filled\x3d"f" stroked\x3d"f"'],
					k = ["position: ", "absolute", ";"],
					l = "div" === f;
				("shape" === f || l) && k.push("left:0;top:0;width:1px;height:1px;");
				k.push("visibility: ", l ? "hidden" : "visible");
				m.push(' style\x3d"', k.join(""), '"/\x3e');
				f && (m = l || "span" === f || "img" === f ? m.join("") : g.prepVML(m), this.element = j(m));
				this.renderer = g
			},
			add: function(g) {
				var m = this.renderer,
					f = this.element,
					k = m.box,
					l = g && g.inverted,
					k = g ? g.element || g : k;
				g && (this.parentGroup = g);
				l && m.invertChild(f, k);
				k.appendChild(f);
				this.added = !0;
				this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
				if (this.onAdd) {
					this.onAdd()
				}
				this.className && this.attr("class", this.className);
				return this
			},
			updateTransform: B.prototype.htmlUpdateTransform,
			setSpanRotation: function() {
				var e = this.rotation,
					d = Math.cos(e * L),
					f = Math.sin(e * L);
				p(this.element, {
					filter: e ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", d, ", M12\x3d", -f, ", M21\x3d", f, ", M22\x3d", d, ", sizingMethod\x3d'auto expand')"].join("") : "none"
				})
			},
			getSpanCorrection: function(A, y, f, t, u) {
				var v = t ? Math.cos(t * L) : 1,
					l = t ? Math.sin(t * L) : 0,
					r = i(this.elemHeight, this.element.offsetHeight),
					m;
				this.xCorr = 0 > v && -A;
				this.yCorr = 0 > l && -r;
				m = 0 > v * l;
				this.xCorr += l * y * (m ? 1 - f : f);
				this.yCorr -= v * y * (t ? m ? f : 1 - f : 1);
				u && "left" !== u && (this.xCorr -= A * f * (0 > v ? -1 : 1), t && (this.yCorr -= r * f * (0 > l ? -1 : 1)), p(this.element, {
					textAlign: u
				}))
			},
			pathToVML: function(e) {
				for (var f = e.length, d = []; f--;) {
					I(e[f]) ? d[f] = Math.round(10 * e[f]) - 5 : "Z" === e[f] ? d[f] = "x" : (d[f] = e[f], !e.isArc || "wa" !== e[f] && "at" !== e[f] || (d[f + 5] === d[f + 7] && (d[f + 7] += e[f + 7] > e[f + 5] ? 1 : -1), d[f + 6] === d[f + 8] && (d[f + 8] += e[f + 8] > e[f + 6] ? 1 : -1)))
				}
				return d.join(" ") || "x"
			},
			clip: function(e) {
				var f = this,
					d;
				e ? (d = e.members, q(d, f), d.push(f), f.destroyClip = function() {
					q(d, f)
				}, e = e.getCSS(f)) : (f.destroyClip && f.destroyClip(), e = {
					clip: f.docMode8 ? "inherit" : "rect(auto)"
				});
				return f.css(e)
			},
			css: B.prototype.htmlCss,
			safeRemoveChild: function(d) {
				d.parentNode && H(d)
			},
			destroy: function() {
				this.destroyClip && this.destroyClip();
				return B.prototype.destroy.apply(this)
			},
			on: function(e, d) {
				this.element["on" + e] = function() {
					var f = c.event;
					f.target = f.srcElement;
					d(f)
				};
				return this
			},
			cutOffPath: function(e, d) {
				var f;
				e = e.split(/[ ,]/);
				f = e.length;
				if (9 === f || 11 === f) {
					e[f - 4] = e[f - 2] = h(e[f - 2]) - 10 * d
				}
				return e.join(" ")
			},
			shadow: function(Q, J, C) {
				var F = [],
					m, r = this.element,
					E = this.renderer,
					t, y = r.style,
					v, R = r.path,
					u, S, A, l;
				R && "string" !== typeof R.value && (R = "x");
				S = R;
				if (Q) {
					A = i(Q.width, 3);
					l = (Q.opacity || 0.15) / A;
					for (m = 1; 3 >= m; m++) {
						u = 2 * A + 1 - 2 * m, C && (S = this.cutOffPath(R.value, u + 0.5)), v = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', u, '" filled\x3d"false" path\x3d"', S, '" coordsize\x3d"10 10" style\x3d"', r.style.cssText, '" /\x3e'], t = j(E.prepVML(v), null, {
							left: h(y.left) + i(Q.offsetX, 1),
							top: h(y.top) + i(Q.offsetY, 1)
						}), C && (t.cutOff = u + 1), v = ['\x3cstroke color\x3d"', Q.color || "#000000", '" opacity\x3d"', l * m, '"/\x3e'], j(E.prepVML(v), null, null, t), J ? J.element.appendChild(t) : r.parentNode.insertBefore(t, r), F.push(t)
					}
					this.shadows = F
				}
				return this
			},
			updateShadows: z,
			setAttr: function(e, d) {
				this.docMode8 ? this.element[e] = d : this.element.setAttribute(e, d)
			},
			classSetter: function(d) {
				(this.added ? this.element : this).className = d
			},
			dashstyleSetter: function(f, d, g) {
				(g.getElementsByTagName("stroke")[0] || j(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, g))[d] = f || "solid";
				this[d] = f
			},
			dSetter: function(f, d, g) {
				var k = this.shadows;
				f = f || [];
				this.d = f.join && f.join(" ");
				g.path = f = this.pathToVML(f);
				if (k) {
					for (g = k.length; g--;) {
						k[g].path = k[g].cutOff ? this.cutOffPath(f, k[g].cutOff) : f
					}
				}
				this.setAttr(d, f)
			},
			fillSetter: function(f, d, g) {
				var k = g.nodeName;
				"SPAN" === k ? g.style.color = f : "IMG" !== k && (g.filled = "none" !== f, this.setAttr("fillcolor", this.renderer.color(f, g, d, this)))
			},
			"fill-opacitySetter": function(f, d, g) {
				j(this.renderer.prepVML(["\x3c", d.split("-")[0], ' opacity\x3d"', f, '"/\x3e']), null, null, g)
			},
			opacitySetter: z,
			rotationSetter: function(f, d, g) {
				g = g.style;
				this[d] = g[d] = f;
				g.left = -Math.round(Math.sin(f * L) + 1) + "px";
				g.top = Math.round(Math.cos(f * L)) + "px"
			},
			strokeSetter: function(f, d, g) {
				this.setAttr("strokecolor", this.renderer.color(f, g, d, this))
			},
			"stroke-widthSetter": function(f, d, g) {
				g.stroked = !!f;
				this[d] = f;
				I(f) && (f += "px");
				this.setAttr("strokeweight", f)
			},
			titleSetter: function(e, d) {
				this.setAttr(d, e)
			},
			visibilitySetter: function(f, d, g) {
				"inherit" === f && (f = "visible");
				this.shadows && o(this.shadows, function(e) {
					e.style[d] = f
				});
				"DIV" === g.nodeName && (f = "hidden" === f ? "-999em" : 0, this.docMode8 || (g.style[d] = f ? "visible" : "hidden"), d = "top");
				g.style[d] = f
			},
			xSetter: function(f, d, g) {
				this[d] = f;
				"x" === d ? d = "left" : "y" === d && (d = "top");
				this.updateClipping ? (this[d] = f, this.updateClipping()) : g.style[d] = f
			},
			zIndexSetter: function(f, d, g) {
				g.style[d] = f
			}
		}, z["stroke-opacitySetter"] = z["fill-opacitySetter"], P.VMLElement = z = w(B, z), z.prototype.ySetter = z.prototype.widthSetter = z.prototype.heightSetter = z.prototype.xSetter, z = {
			Element: z,
			isIE8: -1 < c.navigator.userAgent.indexOf("MSIE 8.0"),
			init: function(g, f, l) {
				var n, m;
				this.alignedObjects = [];
				n = this.createElement("div").css({
					position: "relative"
				});
				m = n.element;
				g.appendChild(n.element);
				this.isVML = !0;
				this.box = m;
				this.boxWrapper = n;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(f, l, !1);
				if (!x.namespaces.hcv) {
					x.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
					try {
						x.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					} catch (k) {
						x.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					}
				}
			},
			isHidden: function() {
				return !this.box.offsetWidth
			},
			clipRect: function(f, k, l, r) {
				var m = this.createElement(),
					g = O(f);
				return K(m, {
					members: [],
					count: 0,
					left: (g ? f.x : f) + 1,
					top: (g ? f.y : k) + 1,
					width: (g ? f.width : l) - 1,
					height: (g ? f.height : r) - 1,
					getCSS: function(t) {
						var A = t.element,
							d = A.nodeName,
							u = t.inverted,
							n = this.top - ("shape" === d ? A.offsetTop : 0),
							y = this.left,
							A = y + this.width,
							v = n + this.height,
							n = {
								clip: "rect(" + Math.round(u ? y : n) + "px," + Math.round(u ? v : A) + "px," + Math.round(u ? A : v) + "px," + Math.round(u ? n : y) + "px)"
							};
						!u && t.docMode8 && "DIV" === d && K(n, {
							width: A + "px",
							height: v + "px"
						});
						return n
					},
					updateClipping: function() {
						o(m.members, function(d) {
							d.element && d.css(m.getCSS(d))
						})
					}
				})
			},
			color: function(ao, ap, am, an) {
				var ac = this,
					ae, af = /^rgba/,
					ak, ai, aj = "none";
				ao && ao.linearGradient ? ai = "gradient" : ao && ao.radialGradient && (ai = "pattern");
				if (ai) {
					var T, V, S = ao.linearGradient || ao.radialGradient,
						al, Y, Q, R, aa, ab = "";
					ao = ao.stops;
					var ah, U = [],
						ag = function() {
							ak = ['\x3cfill colors\x3d"' + U.join(",") + '" opacity\x3d"', Q, '" o:opacity2\x3d"', Y, '" type\x3d"', ai, '" ', ab, 'focus\x3d"100%" method\x3d"any" /\x3e'];
							j(ac.prepVML(ak), null, null, ap)
						};
					al = ao[0];
					ah = ao[ao.length - 1];
					0 < al[0] && ao.unshift([0, al[1]]);
					1 > ah[0] && ao.push([1, ah[1]]);
					o(ao, function(d, e) {
						af.test(d[1]) ? (ae = P.color(d[1]), T = ae.get("rgb"), V = ae.get("a")) : (T = d[1], V = 1);
						U.push(100 * d[0] + "% " + T);
						e ? (Q = V, R = T) : (Y = V, aa = T)
					});
					if ("fill" === am) {
						if ("gradient" === ai) {
							am = S.x1 || S[0] || 0, ao = S.y1 || S[1] || 0, al = S.x2 || S[2] || 0, S = S.y2 || S[3] || 0, ab = 'angle\x3d"' + (90 - 180 * Math.atan((S - ao) / (al - am)) / Math.PI) + '"', ag()
						} else {
							var aj = S.r,
								X = 2 * aj,
								F = 2 * aj,
								ad = S.cx,
								Z = S.cy,
								W = ap.radialReference,
								u, aj = function() {
									W && (u = an.getBBox(), ad += (W[0] - u.x) / u.width - 0.5, Z += (W[1] - u.y) / u.height - 0.5, X *= W[2] / u.width, F *= W[2] / u.height);
									ab = 'src\x3d"' + P.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + X + "," + F + '" origin\x3d"0.5,0.5" position\x3d"' + ad + "," + Z + '" color2\x3d"' + aa + '" ';
									ag()
								};
							an.added ? aj() : an.onAdd = aj;
							aj = R
						}
					} else {
						aj = T
					}
				} else {
					af.test(ao) && "IMG" !== ap.tagName ? (ae = P.color(ao), an[am + "-opacitySetter"](ae.get("a"), am, ap), aj = ae.get("rgb")) : (aj = ap.getElementsByTagName(am), aj.length && (aj[0].opacity = 1, aj[0].type = "solid"), aj = ao)
				}
				return aj
			},
			prepVML: function(d) {
				var e = this.isIE8;
				d = d.join("");
				e ? (d = d.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), d = -1 === d.indexOf('style\x3d"') ? d.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : d.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : d = d.replace("\x3c", "\x3chcv:");
				return d
			},
			text: s.prototype.html,
			path: function(d) {
				var e = {
					coordsize: "10 10"
				};
				N(d) ? e.d = d : O(d) && K(e, d);
				return this.createElement("shape").attr(e)
			},
			circle: function(f, g, k) {
				var l = this.symbol("circle");
				O(f) && (k = f.r, g = f.y, f = f.x);
				l.isCircle = !0;
				l.r = k;
				return l.attr({
					x: f,
					y: g
				})
			},
			g: function(d) {
				var e;
				d && (e = {
					className: "highcharts-" + d,
					"class": "highcharts-" + d
				});
				return this.createElement("div").attr(e)
			},
			image: function(g, f, k, l, r) {
				var m = this.createElement("img").attr({
					src: g
				});
				1 < arguments.length && m.attr({
					x: f,
					y: k,
					width: l,
					height: r
				});
				return m
			},
			createElement: function(d) {
				return "rect" === d ? this.symbol(d) : s.prototype.createElement.call(this, d)
			},
			invertChild: function(f, d) {
				var k = this;
				d = d.style;
				var g = "IMG" === f.tagName && f.style;
				p(f, {
					flip: "x",
					left: h(d.width) - (g ? h(g.top) : 1),
					top: h(d.height) - (g ? h(g.left) : 1),
					rotation: -90
				});
				o(f.childNodes, function(e) {
					k.invertChild(e, f)
				})
			},
			symbols: {
				arc: function(C, A, u, v, l) {
					var y = l.start,
						f = l.end,
						t = l.r || u || v;
					u = l.innerR;
					v = Math.cos(y);
					var m = Math.sin(y),
						r = Math.cos(f),
						D = Math.sin(f);
					if (0 === f - y) {
						return ["x"]
					}
					y = ["wa", C - t, A - t, C + t, A + t, C + t * v, A + t * m, C + t * r, A + t * D];
					l.open && !u && y.push("e", "M", C, A);
					y.push("at", C - u, A - u, C + u, A + u, C + u * r, A + u * D, C + u * v, A + u * m, "x", "e");
					y.isArc = !0;
					return y
				},
				circle: function(g, f, k, l, m) {
					m && G(m.r) && (k = l = 2 * m.r);
					m && m.isCircle && (g -= k / 2, f -= l / 2);
					return ["wa", g, f, g + k, f + l, g + k, f + l / 2, g + k, f + l / 2, "e"]
				},
				rect: function(g, f, k, l, m) {
					return s.prototype.symbols[G(m) && m.r ? "callout" : "square"].call(0, g, f, k, l, m)
				}
			}
		}, P.VMLRenderer = w = function() {
			this.init.apply(this, arguments)
		}, w.prototype = M(s.prototype, z), P.Renderer = w);
		s.prototype.measureSpanWidth = function(e, d) {
			var f = x.createElement("span");
			e = x.createTextNode(e);
			f.appendChild(e);
			p(f, d);
			this.box.appendChild(f);
			d = f.offsetWidth;
			H(f);
			return d
		}
	})(b);
	(function(j) {
		function d() {
			var o = j.defaultOptions.global,
				m = c.moment;
			if (o.timezone) {
				if (m) {
					return function(f) {
						return -m.tz(f, o.timezone).utcOffset()
					}
				}
				j.error(25)
			}
			return o.useUTC && o.getTimezoneOffset
		}

		function e() {
			var p = j.defaultOptions.global,
				m, o = p.useUTC,
				q = o ? "getUTC" : "get",
				l = o ? "setUTC" : "set";
			j.Date = m = p.Date || c.Date;
			m.hcTimezoneOffset = o && p.timezoneOffset;
			m.hcGetTimezoneOffset = d();
			m.hcMakeTime = function(s, v, w, t, x, u) {
				var r;
				o ? (r = m.UTC.apply(0, arguments), r += g(r)) : r = (new m(s, v, h(w, 1), h(t, 0), h(x, 0), h(u, 0))).getTime();
				return r
			};
			n("Minutes Hours Day Date Month FullYear".split(" "), function(f) {
				m["hcGet" + f] = q + f
			});
			n("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(f) {
				m["hcSet" + f] = l + f
			})
		}
		var k = j.color,
			n = j.each,
			g = j.getTZOffset,
			i = j.merge,
			h = j.pick,
			c = j.win;
		j.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {
				useUTC: !0,
				VMLRadialGradientURL: "http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"
			},
			chart: {
				borderRadius: 0,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 20
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				layout: "horizontal",
				labelFormatter: function() {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					fontSize: "12px",
					fontWeight: "bold",
					textOverflow: "ellipsis"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: 0.5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: j.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: j.isTouchDevice ? 25 : 10,
				backgroundColor: k("#f7f7f7").setOpacity(0.85).get(),
				borderWidth: 1,
				headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e●\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				href: "http://www.highcharts.com",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: "Highcharts.com"
			}
		};
		j.setOptions = function(f) {
			j.defaultOptions = i(!0, j.defaultOptions, f);
			e();
			return j.defaultOptions
		};
		j.getOptions = function() {
			return j.defaultOptions
		};
		j.defaultPlotOptions = j.defaultOptions.plotOptions;
		e()
	})(b);
	(function(g) {
		var k = g.correctFloat,
			d = g.defined,
			h = g.destroyObjectProperties,
			j = g.isNumber,
			c = g.merge,
			i = g.pick,
			e = g.deg2rad;
		g.Tick = function(n, p, m, o) {
			this.axis = n;
			this.pos = p;
			this.type = m || "";
			this.isNewLabel = this.isNew = !0;
			m || o || this.addLabel()
		};
		g.Tick.prototype = {
			addLabel: function() {
				var w = this.axis,
					m = w.options,
					z = w.chart,
					p = w.categories,
					r = w.names,
					o = this.pos,
					u = m.labels,
					q = w.tickPositions,
					x = o === q[0],
					s = o === q[q.length - 1],
					r = p ? i(p[o], r[o], o) : o,
					p = this.label,
					q = q.info,
					f;
				w.isDatetimeAxis && q && (f = m.dateTimeLabelFormats[q.higherRanks[o] || q.unitName]);
				this.isFirst = x;
				this.isLast = s;
				m = w.labelFormatter.call({
					axis: w,
					chart: z,
					isFirst: x,
					isLast: s,
					dateTimeLabelFormat: f,
					value: w.isLog ? k(w.lin2log(r)) : r,
					pos: o
				});
				d(p) ? p && p.attr({
					text: m
				}) : (this.labelLength = (this.label = p = d(m) && u.enabled ? z.renderer.text(m, 0, 0, u.useHTML).css(c(u.style)).add(w.labelGroup) : null) && p.getBBox().width, this.rotation = 0)
			},
			getLabelSize: function() {
				return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
			},
			handleOverflow: function(B) {
				var l = this.axis,
					p = B.x,
					s = l.chart.chartWidth,
					u = l.chart.spacing,
					q = i(l.labelLeft, Math.min(l.pos, u[3])),
					u = i(l.labelRight, Math.max(l.pos + l.len, s - u[1])),
					z = this.label,
					t = this.rotation,
					C = {
						left: 0,
						center: 0.5,
						right: 1
					}[l.labelAlign],
					x = z.getBBox().width,
					o = l.getSlotWidth(),
					f = o,
					A = 1,
					w, E = {};
				if (t) {
					0 > t && p - C * x < q ? w = Math.round(p / Math.cos(t * e) - q) : 0 < t && p + C * x > u && (w = Math.round((s - p) / Math.cos(t * e)))
				} else {
					if (s = p + (1 - C) * x, p - C * x < q ? f = B.x + f * (1 - C) - q : s > u && (f = u - B.x + f * C, A = -1), f = Math.min(o, f), f < o && "center" === l.labelAlign && (B.x += A * (o - f - C * (o - Math.min(x, f)))), x > f || l.autoRotation && (z.styles || {}).width) {
						w = f
					}
				}
				w && (E.width = w, (l.options.labels.style || {}).textOverflow || (E.textOverflow = "ellipsis"), z.css(E))
			},
			getPosition: function(o, r, n, q) {
				var s = this.axis,
					p = s.chart,
					m = q && p.oldChartHeight || p.chartHeight;
				return {
					x: o ? s.translate(r + n, null, null, q) + s.transB : s.left + s.offset + (s.opposite ? (q && p.oldChartWidth || p.chartWidth) - s.right - s.left : 0),
					y: o ? m - s.bottom + s.offset - (s.opposite ? s.height : 0) : m - s.translate(r + n, null, null, q) - s.transB
				}
			},
			getLabelPosition: function(C, u, q, t, x, s, B, w) {
				var E = this.axis,
					A = E.transA,
					p = E.reversed,
					o = E.staggerLines,
					l = E.tickRotCorr || {
						x: 0,
						y: 0
					},
					z = x.y;
				d(z) || (z = 0 === E.side ? q.rotation ? -8 : -q.getBBox().height : 2 === E.side ? l.y + 8 : Math.cos(q.rotation * e) * (l.y - q.getBBox(!1, 0).height / 2));
				C = C + x.x + l.x - (s && t ? s * A * (p ? -1 : 1) : 0);
				u = u + z - (s && !t ? s * A * (p ? 1 : -1) : 0);
				o && (q = B / (w || 1) % o, E.opposite && (q = o - q - 1), u += E.labelOffset / o * q);
				return {
					x: C,
					y: Math.round(u)
				}
			},
			getMarkPath: function(n, q, m, p, r, o) {
				return o.crispLine(["M", n, q, "L", n + (r ? 0 : -m), q + (r ? m : 0)], p)
			},
			renderGridLine: function(C, u, q) {
				var t = this.axis,
					x = t.options,
					s = this.gridLine,
					B = {},
					w = this.pos,
					E = this.type,
					A = t.tickmarkOffset,
					p = t.chart.renderer,
					o = E ? E + "Grid" : "grid",
					m = x[o + "LineWidth"],
					z = x[o + "LineColor"],
					x = x[o + "LineDashStyle"];
				s || (B.stroke = z, B["stroke-width"] = m, x && (B.dashstyle = x), E || (B.zIndex = 1), C && (B.opacity = 0), this.gridLine = s = p.path().attr(B).addClass("highcharts-" + (E ? E + "-" : "") + "grid-line").add(t.gridGroup));
				if (!C && s && (C = t.getPlotLinePath(w + A, s.strokeWidth() * q, C, !0))) {
					s[this.isNew ? "attr" : "animate"]({
						d: C,
						opacity: u
					})
				}
			},
			renderMark: function(B, s, q) {
				var u = this.axis,
					x = u.options,
					t = u.chart.renderer,
					A = this.type,
					w = A ? A + "Tick" : "tick",
					C = u.tickSize(w),
					z = this.mark,
					p = !z,
					o = B.x;
				B = B.y;
				var f = i(x[w + "Width"], !A && u.isXAxis ? 1 : 0),
					x = x[w + "Color"];
				C && (u.opposite && (C[0] = -C[0]), p && (this.mark = z = t.path().addClass("highcharts-" + (A ? A + "-" : "") + "tick").add(u.axisGroup), z.attr({
					stroke: x,
					"stroke-width": f
				})), z[p ? "attr" : "animate"]({
					d: this.getMarkPath(o, B, C[0], z.strokeWidth() * q, u.horiz, t),
					opacity: s
				}))
			},
			renderLabel: function(B, s, q, u) {
				var x = this.axis,
					t = x.horiz,
					A = x.options,
					w = this.label,
					C = A.labels,
					z = C.step,
					p = x.tickmarkOffset,
					o = !0,
					f = B.x;
				B = B.y;
				w && j(f) && (w.xy = B = this.getLabelPosition(f, B, w, t, C, p, u, z), this.isFirst && !this.isLast && !i(A.showFirstLabel, 1) || this.isLast && !this.isFirst && !i(A.showLastLabel, 1) ? o = !1 : !t || x.isRadial || C.step || C.rotation || s || 0 === q || this.handleOverflow(B), z && u % z && (o = !1), o && j(B.y) ? (B.opacity = q, w[this.isNewLabel ? "attr" : "animate"](B), this.isNewLabel = !1) : (w.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1)
			},
			render: function(p, o, n) {
				var r = this.axis,
					t = r.horiz,
					q = this.getPosition(t, this.pos, r.tickmarkOffset, o),
					f = q.x,
					s = q.y,
					r = t && f === r.pos + r.len || !t && s === r.pos ? -1 : 1;
				n = i(n, 1);
				this.isActive = !0;
				this.renderGridLine(o, n, r);
				this.renderMark(q, n, r);
				this.renderLabel(q, o, n, p)
			},
			destroy: function() {
				h(this, this.axis)
			}
		}
	})(b);
	var a = function(ah) {
		var R = ah.addEvent,
			W = ah.animObject,
			M = ah.arrayMax,
			O = ah.arrayMin,
			Y = ah.color,
			ac = ah.correctFloat,
			Z = ah.defaultOptions,
			S = ah.defined,
			N = ah.deg2rad,
			P = ah.destroyObjectProperties,
			ab = ah.each,
			ae = ah.extend,
			aa = ah.fireEvent,
			ag = ah.format,
			ad = ah.getMagnitude,
			H = ah.grep,
			s = ah.inArray,
			X = ah.isArray,
			Q = ah.isNumber,
			o = ah.isString,
			af = ah.merge,
			x = ah.normalizeTickInterval,
			U = ah.objectEach,
			T = ah.pick,
			j = ah.removeEvent,
			V = ah.splat,
			i = ah.syncTimeout,
			w = ah.Tick,
			h = function() {
				this.init.apply(this, arguments)
			};
		ah.extend(h.prototype, {
			defaultOptions: {
				dateTimeLabelFormats: {
					millisecond: "%H:%M:%S.%L",
					second: "%H:%M:%S",
					minute: "%H:%M",
					hour: "%H:%M",
					day: "%e. %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y"
				},
				endOnTick: !1,
				labels: {
					enabled: !0,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					},
					x: 0
				},
				minPadding: 0.01,
				maxPadding: 0.01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickmarkPlacement: "between",
				tickPixelInterval: 100,
				tickPosition: "outside",
				title: {
					align: "middle",
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				maxPadding: 0.05,
				minPadding: 0.05,
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					allowOverlap: !1,
					enabled: !1,
					formatter: function() {
						return ah.numberFormat(this.total, -1)
					},
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "#000000",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			},
			defaultRightAxisOptions: {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			},
			defaultBottomAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			defaultTopAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			init: function(g, m) {
				var k = m.isX,
					d = this;
				d.chart = g;
				d.horiz = g.inverted && !d.isZAxis ? !k : k;
				d.isXAxis = k;
				d.coll = d.coll || (k ? "xAxis" : "yAxis");
				d.opposite = m.opposite;
				d.side = m.side || (d.horiz ? d.opposite ? 0 : 2 : d.opposite ? 1 : 3);
				d.setOptions(m);
				var f = this.options,
					l = f.type;
				d.labelFormatter = f.labels.formatter || d.defaultLabelFormatter;
				d.userOptions = m;
				d.minPixelPadding = 0;
				d.reversed = f.reversed;
				d.visible = !1 !== f.visible;
				d.zoomEnabled = !1 !== f.zoomEnabled;
				d.hasNames = "category" === l || !0 === f.categories;
				d.categories = f.categories || d.hasNames;
				d.names = d.names || [];
				d.plotLinesAndBandsGroups = {};
				d.isLog = "logarithmic" === l;
				d.isDatetimeAxis = "datetime" === l;
				d.positiveValuesOnly = d.isLog && !d.allowNegativeLog;
				d.isLinked = S(f.linkedTo);
				d.ticks = {};
				d.labelEdge = [];
				d.minorTicks = {};
				d.plotLinesAndBands = [];
				d.alternateBands = {};
				d.len = 0;
				d.minRange = d.userMinRange = f.minRange || f.maxZoom;
				d.range = f.range;
				d.offset = f.offset || 0;
				d.stacks = {};
				d.oldStacks = {};
				d.stacksTouched = 0;
				d.max = null;
				d.min = null;
				d.crosshair = T(f.crosshair, V(g.options.tooltip.crosshairs)[k ? 0 : 1], !1);
				m = d.options.events; - 1 === s(d, g.axes) && (k ? g.axes.splice(g.xAxis.length, 0, d) : g.axes.push(d), g[d.coll].push(d));
				d.series = d.series || [];
				g.inverted && !d.isZAxis && k && void 0 === d.reversed && (d.reversed = !0);
				U(m, function(c, e) {
					R(d, e, c)
				});
				d.lin2log = f.linearToLogConverter || d.lin2log;
				d.isLog && (d.val2lin = d.log2lin, d.lin2val = d.lin2log)
			},
			setOptions: function(c) {
				this.options = af(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], af(Z[this.coll], c))
			},
			defaultLabelFormatter: function() {
				var m = this.axis,
					v = this.value,
					t = m.categories,
					k = this.dateTimeLabelFormat,
					u = Z.lang,
					l = u.numericSymbols,
					u = u.numericSymbolMagnitude || 1000,
					f = l && l.length,
					y, r = m.options.labels.format,
					m = m.isLog ? Math.abs(v) : m.tickInterval;
				if (r) {
					y = ag(r, this)
				} else {
					if (t) {
						y = v
					} else {
						if (k) {
							y = ah.dateFormat(k, v)
						} else {
							if (f && 1000 <= m) {
								for (; f-- && void 0 === y;) {
									t = Math.pow(u, f + 1), m >= t && 0 === 10 * v % t && null !== l[f] && 0 !== v && (y = ah.numberFormat(v / t, -1) + l[f])
								}
							}
						}
					}
				}
				void 0 === y && (y = 10000 <= Math.abs(v) ? ah.numberFormat(v, -1) : ah.numberFormat(v, -1, void 0, ""));
				return y
			},
			getSeriesExtremes: function() {
				var d = this,
					c = d.chart;
				d.hasVisibleSeries = !1;
				d.dataMin = d.dataMax = d.threshold = null;
				d.softThreshold = !d.isXAxis;
				d.buildStacks && d.buildStacks();
				ab(d.series, function(g) {
					if (g.visible || !c.options.chart.ignoreHiddenSeries) {
						var l = g.options,
							f = l.threshold,
							k;
						d.hasVisibleSeries = !0;
						d.positiveValuesOnly && 0 >= f && (f = null);
						if (d.isXAxis) {
							l = g.xData, l.length && (g = O(l), Q(g) || g instanceof Date || (l = H(l, function(e) {
								return Q(e)
							}), g = O(l)), d.dataMin = Math.min(T(d.dataMin, l[0]), g), d.dataMax = Math.max(T(d.dataMax, l[0]), M(l)))
						} else {
							if (g.getExtremes(), k = g.dataMax, g = g.dataMin, S(g) && S(k) && (d.dataMin = Math.min(T(d.dataMin, g), g), d.dataMax = Math.max(T(d.dataMax, k), k)), S(f) && (d.threshold = f), !l.softThreshold || d.positiveValuesOnly) {
								d.softThreshold = !1
							}
						}
					}
				})
			},
			translate: function(z, y, v, t, k, u) {
				var m = this.linkedParent || this,
					A = 1,
					l = 0,
					f = t ? m.oldTransA : m.transA;
				t = t ? m.oldMin : m.min;
				var r = m.minPixelPadding;
				k = (m.isOrdinal || m.isBroken || m.isLog && k) && m.lin2val;
				f || (f = m.transA);
				v && (A *= -1, l = m.len);
				m.reversed && (A *= -1, l -= A * (m.sector || m.len));
				y ? (z = (z * A + l - r) / f + t, k && (z = m.lin2val(z))) : (k && (z = m.val2lin(z)), z = A * (z - t) * f + l + A * r + (Q(u) ? f * u : 0));
				return z
			},
			toPixels: function(d, c) {
				return this.translate(d, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
			},
			toValue: function(d, c) {
				return this.translate(d - (c ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function(E, D, C, A, m) {
				var u = this.chart,
					F = this.left,
					B = this.top,
					r, l, y = C && u.oldChartHeight || u.chartHeight,
					t = C && u.oldChartWidth || u.chartWidth,
					z;
				r = this.transB;
				var G = function(d, e, c) {
					if (d < e || d > c) {
						A ? d = Math.min(Math.max(e, d), c) : z = !0
					}
					return d
				};
				m = T(m, this.translate(E, null, null, C));
				E = C = Math.round(m + r);
				r = l = Math.round(y - m - r);
				Q(m) ? this.horiz ? (r = B, l = y - this.bottom, E = C = G(E, F, F + this.width)) : (E = F, C = t - this.right, r = l = G(r, B, B + this.height)) : z = !0;
				return z && !A ? null : u.renderer.crispLine(["M", E, r, "L", C, l], D || 1)
			},
			getLinearTickPositions: function(g, d, m) {
				var k, f = ac(Math.floor(d / g) * g);
				m = ac(Math.ceil(m / g) * g);
				var l = [];
				if (this.single) {
					return [d]
				}
				for (d = f; d <= m;) {
					l.push(d);
					d = ac(d + g);
					if (d === k) {
						break
					}
					k = d
				}
				return l
			},
			getMinorTickPositions: function() {
				var g = this,
					f = g.options,
					u = g.tickPositions,
					m = g.minorTickInterval,
					l = [],
					r = g.pointRangePadding || 0,
					t = g.min - r,
					r = g.max + r,
					k = r - t;
				if (k && k / m < g.len / 3) {
					if (g.isLog) {
						ab(this.paddedTicks, function(e, d, n) {
							d && l.push.apply(l, g.getLogTickPositions(m, n[d - 1], n[d], !0))
						})
					} else {
						if (g.isDatetimeAxis && "auto" === f.minorTickInterval) {
							l = l.concat(g.getTimeTicks(g.normalizeTimeTickInterval(m), t, r, f.startOfWeek))
						} else {
							for (f = t + (u[0] - t) % m; f <= r && f !== l[0]; f += m) {
								l.push(f)
							}
						}
					}
				}
				0 !== l.length && g.trimTicks(l);
				return l
			},
			adjustForMinRange: function() {
				var B = this.options,
					A = this.min,
					z = this.max,
					u, l, y, m, g, r, t, C;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (S(B.min) || S(B.max) ? this.minRange = null : (ab(this.series, function(c) {
					r = c.xData;
					for (m = t = c.xIncrement ? 1 : r.length - 1; 0 < m; m--) {
						if (g = r[m] - r[m - 1], void 0 === y || g < y) {
							y = g
						}
					}
				}), this.minRange = Math.min(5 * y, this.dataMax - this.dataMin)));
				z - A < this.minRange && (l = this.dataMax - this.dataMin >= this.minRange, C = this.minRange, u = (C - z + A) / 2, u = [A - u, T(B.min, A - u)], l && (u[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), A = M(u), z = [A + C, T(B.max, A + C)], l && (z[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), z = O(z), z - A < C && (u[0] = z - C, u[1] = T(B.min, z - C), A = M(u)));
				this.min = A;
				this.max = z
			},
			getClosest: function() {
				var c;
				this.categories ? c = 1 : ab(this.series, function(e) {
					var d = e.closestPointRange,
						f = e.visible || !e.chart.options.chart.ignoreHiddenSeries;
					!e.noSharedTooltip && S(d) && f && (c = S(c) ? Math.min(c, d) : d)
				});
				return c
			},
			nameToX: function(f) {
				var g = X(this.categories),
					d = g ? this.categories : this.names,
					l = f.options.x,
					k;
				f.series.requireSorting = !1;
				S(l) || (l = !1 === this.options.uniqueNames ? f.series.autoIncrement() : s(f.name, d)); - 1 === l ? g || (k = d.length) : k = l;
				void 0 !== k && (this.names[k] = f.name);
				return k
			},
			updateNames: function() {
				var c = this;
				0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, ab(this.series || [], function(d) {
					d.xIncrement = null;
					if (!d.points || d.isDirtyData) {
						d.processData(), d.generatePoints()
					}
					ab(d.points, function(f, k) {
						var g;
						f.options && (g = c.nameToX(f), void 0 !== g && g !== f.x && (f.x = g, d.xData[k] = g))
					})
				}))
			},
			setAxisTranslation: function(B) {
				var t = this,
					A = t.max - t.min,
					z = t.axisPointRange || 0,
					v, l = 0,
					y = 0,
					m = t.linkedParent,
					g = !!t.categories,
					r = t.transA,
					u = t.isXAxis;
				if (u || g || z) {
					v = t.getClosest(), m ? (l = m.minPointOffset, y = m.pointRangePadding) : ab(t.series, function(d) {
						var c = g ? 1 : u ? T(d.options.pointRange, v, 0) : t.axisPointRange || 0;
						d = d.options.pointPlacement;
						z = Math.max(z, c);
						t.single || (l = Math.max(l, o(d) ? 0 : c / 2), y = Math.max(y, "on" === d ? 0 : c))
					}), m = t.ordinalSlope && v ? t.ordinalSlope / v : 1, t.minPointOffset = l *= m, t.pointRangePadding = y *= m, t.pointRange = Math.min(z, A), u && (t.closestPointRange = v)
				}
				B && (t.oldTransA = r);
				t.translationSlope = t.transA = r = t.options.staticScale || t.len / (A + y || 1);
				t.transB = t.horiz ? t.left : t.bottom;
				t.minPixelPadding = r * l
			},
			minFromRange: function() {
				return this.max - this.range
			},
			setTickInterval: function(an) {
				var aq = this,
					ap = aq.chart,
					aj = aq.options,
					ao = aq.isLog,
					ak = aq.log2lin,
					G = aq.isDatetimeAxis,
					C = aq.isXAxis,
					D = aq.isLinked,
					g = aj.maxPadding,
					r = aj.minPadding,
					am = aj.tickInterval,
					B = aj.tickPixelInterval,
					al = aq.categories,
					k = aq.threshold,
					F = aq.softThreshold,
					e, E, f, ai;
				G || al || D || this.getTickAmount();
				f = T(aq.userMin, aj.min);
				ai = T(aq.userMax, aj.max);
				D ? (aq.linkedParent = ap[aq.coll][aj.linkedTo], ap = aq.linkedParent.getExtremes(), aq.min = T(ap.min, ap.dataMin), aq.max = T(ap.max, ap.dataMax), aj.type !== aq.linkedParent.options.type && ah.error(11, 1)) : (!F && S(k) && (aq.dataMin >= k ? (e = k, r = 0) : aq.dataMax <= k && (E = k, g = 0)), aq.min = T(f, e, aq.dataMin), aq.max = T(ai, E, aq.dataMax));
				ao && (aq.positiveValuesOnly && !an && 0 >= Math.min(aq.min, T(aq.dataMin, aq.min)) && ah.error(10, 1), aq.min = ac(ak(aq.min), 15), aq.max = ac(ak(aq.max), 15));
				aq.range && S(aq.max) && (aq.userMin = aq.min = f = Math.max(aq.dataMin, aq.minFromRange()), aq.userMax = ai = aq.max, aq.range = null);
				aa(aq, "foundExtremes");
				aq.beforePadding && aq.beforePadding();
				aq.adjustForMinRange();
				!(al || aq.axisPointRange || aq.usePercentage || D) && S(aq.min) && S(aq.max) && (ak = aq.max - aq.min) && (!S(f) && r && (aq.min -= ak * r), !S(ai) && g && (aq.max += ak * g));
				Q(aj.softMin) && (aq.min = Math.min(aq.min, aj.softMin));
				Q(aj.softMax) && (aq.max = Math.max(aq.max, aj.softMax));
				Q(aj.floor) && (aq.min = Math.max(aq.min, aj.floor));
				Q(aj.ceiling) && (aq.max = Math.min(aq.max, aj.ceiling));
				F && S(aq.dataMin) && (k = k || 0, !S(f) && aq.min < k && aq.dataMin >= k ? aq.min = k : !S(ai) && aq.max > k && aq.dataMax <= k && (aq.max = k));
				aq.tickInterval = aq.min === aq.max || void 0 === aq.min || void 0 === aq.max ? 1 : D && !am && B === aq.linkedParent.options.tickPixelInterval ? am = aq.linkedParent.tickInterval : T(am, this.tickAmount ? (aq.max - aq.min) / Math.max(this.tickAmount - 1, 1) : void 0, al ? 1 : (aq.max - aq.min) * B / Math.max(aq.len, B));
				C && !an && ab(aq.series, function(c) {
					c.processData(aq.min !== aq.oldMin || aq.max !== aq.oldMax)
				});
				aq.setAxisTranslation(!0);
				aq.beforeSetTickPositions && aq.beforeSetTickPositions();
				aq.postProcessTickInterval && (aq.tickInterval = aq.postProcessTickInterval(aq.tickInterval));
				aq.pointRange && !am && (aq.tickInterval = Math.max(aq.pointRange, aq.tickInterval));
				an = T(aj.minTickInterval, aq.isDatetimeAxis && aq.closestPointRange);
				!am && aq.tickInterval < an && (aq.tickInterval = an);
				G || ao || am || (aq.tickInterval = x(aq.tickInterval, null, ad(aq.tickInterval), T(aj.allowDecimals, !(0.5 < aq.tickInterval && 5 > aq.tickInterval && 1000 < aq.max && 9999 > aq.max)), !!this.tickAmount));
				this.tickAmount || (aq.tickInterval = aq.unsquish());
				this.setTickPositions()
			},
			setTickPositions: function() {
				var g = this.options,
					f, n = g.tickPositions,
					l = g.tickPositioner,
					k = g.startOnTick,
					m = g.endOnTick;
				this.tickmarkOffset = this.categories && "between" === g.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
				this.minorTickInterval = "auto" === g.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : g.minorTickInterval;
				this.single = this.min === this.max && S(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== g.allowDecimals);
				this.tickPositions = f = n && n.slice();
				!f && (f = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, g.units), this.min, this.max, g.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), f.length > this.len && (f = [f[0], f.pop()]), this.tickPositions = f, l && (l = l.apply(this, [this.min, this.max]))) && (this.tickPositions = f = l);
				this.paddedTicks = f.slice(0);
				this.trimTicks(f, k, m);
				this.isLinked || (this.single && 2 > f.length && (this.min -= 0.5, this.max += 0.5), n || l || this.adjustTickAmount())
			},
			trimTicks: function(f, d, m) {
				var g = f[0],
					l = f[f.length - 1],
					k = this.minPointOffset || 0;
				if (!this.isLinked) {
					if (d && -Infinity !== g) {
						this.min = g
					} else {
						for (; this.min - k > f[0];) {
							f.shift()
						}
					}
					if (m) {
						this.max = l
					} else {
						for (; this.max + k < f[f.length - 1];) {
							f.pop()
						}
					}
					0 === f.length && S(g) && f.push((l + g) / 2)
				}
			},
			alignToOthers: function() {
				var e = {},
					d, f = this.options;
				!1 === this.chart.options.chart.alignTicks || !1 === f.alignTicks || this.isLog || ab(this.chart[this.coll], function(g) {
					var k = g.options,
						k = [g.horiz ? k.left : k.top, k.width, k.height, k.pane].join();
					g.series.length && (e[k] ? d = !0 : e[k] = 1)
				});
				return d
			},
			getTickAmount: function() {
				var e = this.options,
					d = e.tickAmount,
					f = e.tickPixelInterval;
				!S(e.tickInterval) && this.len < f && !this.isRadial && !this.isLog && e.startOnTick && e.endOnTick && (d = 2);
				!d && this.alignToOthers() && (d = Math.ceil(this.len / f) + 1);
				4 > d && (this.finalTickAmt = d, d = 5);
				this.tickAmount = d
			},
			adjustTickAmount: function() {
				var f = this.tickInterval,
					d = this.tickPositions,
					l = this.tickAmount,
					k = this.finalTickAmt,
					g = d && d.length;
				if (g < l) {
					for (; d.length < l;) {
						d.push(ac(d[d.length - 1] + f))
					}
					this.transA *= (g - 1) / (l - 1);
					this.max = d[d.length - 1]
				} else {
					g > l && (this.tickInterval *= 2, this.setTickPositions())
				}
				if (S(k)) {
					for (f = l = d.length; f--;) {
						(3 === k && 1 === f % 2 || 2 >= k && 0 < f && f < l - 1) && d.splice(f, 1)
					}
					this.finalTickAmt = void 0
				}
			},
			setScale: function() {
				var d, c;
				this.oldMin = this.min;
				this.oldMax = this.max;
				this.oldAxisLength = this.len;
				this.setAxisSize();
				c = this.len !== this.oldAxisLength;
				ab(this.series, function(e) {
					if (e.isDirtyData || e.isDirty || e.xAxis.isDirty) {
						d = !0
					}
				});
				c || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
			},
			setExtremes: function(f, d, q, l, k) {
				var g = this,
					m = g.chart;
				q = T(q, !0);
				ab(g.series, function(c) {
					delete c.kdTree
				});
				k = ae(k, {
					min: f,
					max: d
				});
				aa(g, "setExtremes", k, function() {
					g.userMin = f;
					g.userMax = d;
					g.eventArgs = k;
					q && m.redraw(l)
				})
			},
			zoom: function(f, d) {
				var g = this.dataMin,
					m = this.dataMax,
					l = this.options,
					k = Math.min(g, T(l.min, g)),
					l = Math.max(m, T(l.max, m));
				if (f !== this.min || d !== this.max) {
					this.allowZoomOutside || (S(g) && (f < k && (f = k), f > l && (f = l)), S(m) && (d < k && (d = k), d > l && (d = l))), this.displayBtn = void 0 !== f || void 0 !== d, this.setExtremes(f, d, !1, void 0, {
						trigger: "zoom"
					})
				}
				return !0
			},
			setAxisSize: function() {
				var f = this.chart,
					t = this.options,
					l = t.offsets || [0, 0, 0, 0],
					k = this.horiz,
					m = this.width = Math.round(ah.relativeLength(T(t.width, f.plotWidth - l[3] + l[1]), f.plotWidth)),
					r = this.height = Math.round(ah.relativeLength(T(t.height, f.plotHeight - l[0] + l[2]), f.plotHeight)),
					g = this.top = Math.round(ah.relativeLength(T(t.top, f.plotTop + l[0]), f.plotHeight, f.plotTop)),
					t = this.left = Math.round(ah.relativeLength(T(t.left, f.plotLeft + l[3]), f.plotWidth, f.plotLeft));
				this.bottom = f.chartHeight - r - g;
				this.right = f.chartWidth - m - t;
				this.len = Math.max(k ? m : r, 0);
				this.pos = k ? t : g
			},
			getExtremes: function() {
				var d = this.isLog,
					c = this.lin2log;
				return {
					min: d ? ac(c(this.min)) : this.min,
					max: d ? ac(c(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			},
			getThreshold: function(e) {
				var d = this.isLog,
					f = this.lin2log,
					g = d ? f(this.min) : this.min,
					d = d ? f(this.max) : this.max;
				null === e ? e = g : g > e ? e = g : d < e && (e = d);
				return this.translate(e, 0, 1, 0, 1)
			},
			autoLabelAlign: function(c) {
				c = (T(c, 0) - 90 * this.side + 720) 60;
				return 15 < c && 165 > c ? "right" : 195 < c && 345 > c ? "left" : "center"
			},
			tickSize: function(e) {
				var d = this.options,
					f = d[e + "Length"],
					g = T(d[e + "Width"], "tick" === e && this.isXAxis ? 1 : 0);
				if (g && f) {
					return "inside" === d[e + "Position"] && (f = -f), [f, g]
				}
			},
			labelMetrics: function() {
				var c = this.tickPositions && this.tickPositions[0] || 0;
				return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[c] && this.ticks[c].label)
			},
			unsquish: function() {
				var D = this.options.labels,
					C = this.horiz,
					B = this.tickInterval,
					u = B,
					l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / B),
					y, m = D.rotation,
					g = this.labelMetrics(),
					r, t = Number.MAX_VALUE,
					E, A = function(c) {
						c /= l || 1;
						c = 1 < c ? Math.ceil(c) : 1;
						return c * B
					};
				C ? (E = !D.staggerLines && !D.step && (S(m) ? [m] : l < T(D.autoRotationLimit, 80) && D.autoRotation)) && ab(E, function(d) {
					var c;
					if (d === m || d && -90 <= d && 90 >= d) {
						r = A(Math.abs(g.h / Math.sin(N * d))), c = r + Math.abs(d / 360), c < t && (t = c, y = d, u = r)
					}
				}) : D.step || (u = A(g.h));
				this.autoRotation = E;
				this.labelRotation = T(y, m);
				return u
			},
			getSlotWidth: function() {
				var f = this.chart,
					d = this.horiz,
					l = this.options.labels,
					k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
					g = f.margin[3];
				return d && 2 > (l.step || 0) && !l.rotation && (this.staggerLines || 1) * this.len / k || !d && (g && g - f.spacing[3] || 0.33 * f.chartWidth)
			},
			renderUnsquish: function() {
				var J = this.chart,
					G = J.renderer,
					B = this.tickPositions,
					m = this.ticks,
					C = this.options.labels,
					r = this.horiz,
					g = this.getSlotWidth(),
					u = Math.max(1, Math.round(g - 2 * (C.padding || 5))),
					A = {},
					L = this.labelMetrics(),
					E = C.style && C.style.textOverflow,
					c, F = 0,
					t, K;
				o(C.rotation) || (A.rotation = C.rotation || 0);
				ab(B, function(d) {
					(d = m[d]) && d.labelLength > F && (F = d.labelLength)
				});
				this.maxLabelLength = F;
				if (this.autoRotation) {
					F > u && F > L.h ? A.rotation = this.labelRotation : this.labelRotation = 0
				} else {
					if (g && (c = {
							width: u + "px"
						}, !E)) {
						for (c.textOverflow = "clip", t = B.length; !r && t--;) {
							if (K = B[t], u = m[K].label) {
								u.styles && "ellipsis" === u.styles.textOverflow ? u.css({
									textOverflow: "clip"
								}) : m[K].labelLength > g && u.css({
									width: g + "px"
								}), u.getBBox().height > this.len / B.length - (L.h - L.f) && (u.specCss = {
									textOverflow: "ellipsis"
								})
							}
						}
					}
				}
				A.rotation && (c = {
					width: (F > 0.5 * J.chartHeight ? 0.33 * J.chartHeight : J.chartHeight) + "px"
				}, E || (c.textOverflow = "ellipsis"));
				if (this.labelAlign = C.align || this.autoLabelAlign(this.labelRotation)) {
					A.align = this.labelAlign
				}
				ab(B, function(e) {
					var d = (e = m[e]) && e.label;
					d && (d.attr(A), c && d.css(af(c, d.specCss)), delete d.specCss, e.rotation = A.rotation)
				});
				this.tickRotCorr = G.rotCorr(L.b, this.labelRotation || 0, 0 !== this.side)
			},
			hasData: function() {
				return this.hasVisibleSeries || S(this.min) && S(this.max) && !!this.tickPositions
			},
			addTitle: function(f) {
				var d = this.chart.renderer,
					m = this.horiz,
					g = this.opposite,
					l = this.options.title,
					k;
				this.axisTitle || ((k = l.textAlign) || (k = (m ? {
					low: "left",
					middle: "center",
					high: "right"
				} : {
					low: g ? "right" : "left",
					middle: "center",
					high: g ? "left" : "right"
				})[l.align]), this.axisTitle = d.text(l.text, 0, 0, l.useHTML).attr({
					zIndex: 7,
					rotation: l.rotation || 0,
					align: k
				}).addClass("highcharts-axis-title").css(l.style).add(this.axisGroup), this.axisTitle.isNew = !0);
				l.style.width || this.isRadial || this.axisTitle.css({
					width: this.len
				});
				this.axisTitle[f ? "show" : "hide"](!0)
			},
			generateTick: function(d) {
				var c = this.ticks;
				c[d] ? c[d].addLabel() : c[d] = new w(this, d)
			},
			getOffset: function() {
				var aw = this,
					av = aw.chart,
					au = av.renderer,
					ar = aw.options,
					al = aw.tickPositions,
					at = aw.ticks,
					am = aw.horiz,
					ap = aw.side,
					aq = av.inverted && !aw.isZAxis ? [1, 0, 3, 2][ap] : ap,
					F, r, ak = 0,
					B, ao = 0,
					C = ar.title,
					an = ar.labels,
					E = 0,
					A = av.axisOffset,
					av = av.clipOffset,
					aj = [-1, 1, 1, -1][ap],
					g = ar.className,
					ai = aw.axisParent,
					q = this.tickSize("tick");
				F = aw.hasData();
				aw.showAxis = r = F || T(ar.showEmpty, !0);
				aw.staggerLines = aw.horiz && an.staggerLines;
				aw.axisGroup || (aw.gridGroup = au.g("grid").attr({
					zIndex: ar.gridZIndex || 1
				}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (g || "")).add(ai), aw.axisGroup = au.g("axis").attr({
					zIndex: ar.zIndex || 2
				}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (g || "")).add(ai), aw.labelGroup = au.g("axis-labels").attr({
					zIndex: an.zIndex || 7
				}).addClass("highcharts-" + aw.coll.toLowerCase() + "-labels " + (g || "")).add(ai));
				F || aw.isLinked ? (ab(al, function(d, e) {
					aw.generateTick(d, e)
				}), aw.renderUnsquish(), !1 === an.reserveSpace || 0 !== ap && 2 !== ap && {
					1: "left",
					3: "right"
				}[ap] !== aw.labelAlign && "center" !== aw.labelAlign || ab(al, function(c) {
					E = Math.max(at[c].getLabelSize(), E)
				}), aw.staggerLines && (E *= aw.staggerLines, aw.labelOffset = E * (aw.opposite ? -1 : 1))) : U(at, function(d, c) {
					d.destroy();
					delete at[c]
				});
				C && C.text && !1 !== C.enabled && (aw.addTitle(r), r && !1 !== C.reserveSpace && (aw.titleOffset = ak = aw.axisTitle.getBBox()[am ? "height" : "width"], B = C.offset, ao = S(B) ? 0 : T(C.margin, am ? 5 : 10)));
				aw.renderLine();
				aw.offset = aj * T(ar.offset, A[ap]);
				aw.tickRotCorr = aw.tickRotCorr || {
					x: 0,
					y: 0
				};
				au = 0 === ap ? -aw.labelMetrics().h : 2 === ap ? aw.tickRotCorr.y : 0;
				ao = Math.abs(E) + ao;
				E && (ao = ao - au + aj * (am ? T(an.y, aw.tickRotCorr.y + 8 * aj) : an.x));
				aw.axisTitleMargin = T(B, ao);
				A[ap] = Math.max(A[ap], aw.axisTitleMargin + ak + aj * aw.offset, ao, F && al.length && q ? q[0] + aj * aw.offset : 0);
				al = 2 * Math.floor(aw.axisLine.strokeWidth() / 2);
				0 < ar.offset && (al -= 2 * ar.offset);
				av[aq] = Math.max(av[aq] || al, al)
			},
			getLinePath: function(f) {
				var d = this.chart,
					m = this.opposite,
					g = this.offset,
					l = this.horiz,
					k = this.left + (m ? this.width : 0) + g,
					g = d.chartHeight - this.bottom - (m ? this.height : 0) + g;
				m && (f *= -1);
				return d.renderer.crispLine(["M", l ? this.left : k, l ? g : this.top, "L", l ? d.chartWidth - this.right : k, l ? g : d.chartHeight - this.bottom], f)
			},
			renderLine: function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
					stroke: this.options.lineColor,
					"stroke-width": this.options.lineWidth,
					zIndex: 7
				}))
			},
			getTitlePosition: function() {
				var D = this.horiz,
					C = this.left,
					B = this.top,
					z = this.len,
					m = this.options.title,
					A = D ? C : B,
					r = this.opposite,
					l = this.offset,
					t = m.x || 0,
					u = m.y || 0,
					y = this.axisTitle,
					E = this.chart.renderer.fontMetrics(m.style && m.style.fontSize, y),
					y = Math.max(y.getBBox(null, 0).height - E.h - 1, 0),
					z = {
						low: A + (D ? 0 : z),
						middle: A + z / 2,
						high: A + (D ? z : 0)
					}[m.align],
					C = (D ? B + this.height : C) + (D ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + [-y, y, E.f, -y][this.side];
				return {
					x: D ? z + t : C + (r ? this.width : 0) + l + t,
					y: D ? C + u - (r ? this.height : 0) + l : z + u
				}
			},
			renderMinorTick: function(e) {
				var d = this.chart.hasRendered && Q(this.oldMin),
					f = this.minorTicks;
				f[e] || (f[e] = new w(this, e, "minor"));
				d && f[e].isNew && f[e].render(null, !0);
				f[e].render(null, !1, 1)
			},
			renderTick: function(f, d) {
				var l = this.isLinked,
					k = this.ticks,
					g = this.chart.hasRendered && Q(this.oldMin);
				if (!l || f >= this.min && f <= this.max) {
					k[f] || (k[f] = new w(this, f)), g && k[f].isNew && k[f].render(d, !0, 0.1), k[f].render(d)
				}
			},
			render: function() {
				var aq = this,
					ap = aq.chart,
					an = aq.options,
					K = aq.isLog,
					ao = aq.lin2log,
					ai = aq.isLinked,
					al = aq.tickPositions,
					am = aq.axisTitle,
					C = aq.ticks,
					z = aq.minorTicks,
					ak = aq.alternateBands,
					aj = an.stackLabels,
					F = an.alternateGridColor,
					I = aq.tickmarkOffset,
					A = aq.axisLine,
					q = aq.showAxis,
					E = W(ap.renderer.globalAnimation),
					g, D;
				aq.labelEdge.length = 0;
				aq.overlap = !1;
				ab([C, z, ak], function(c) {
					U(c, function(d) {
						d.isActive = !1
					})
				});
				if (aq.hasData() || ai) {
					aq.minorTickInterval && !aq.categories && ab(aq.getMinorTickPositions(), function(c) {
						aq.renderMinorTick(c)
					}), al.length && (ab(al, function(d, e) {
						aq.renderTick(d, e)
					}), I && (0 === aq.min || aq.single) && (C[-1] || (C[-1] = new w(aq, -1, null, !0)), C[-1].render(-1))), F && ab(al, function(d, c) {
						D = void 0 !== al[c + 1] ? al[c + 1] + I : aq.max - I;
						0 === c % 2 && d < aq.max && D <= aq.max + (ap.polar ? -I : I) && (ak[d] || (ak[d] = new ah.PlotLineOrBand(aq)), g = d + I, ak[d].options = {
							from: K ? ao(g) : g,
							to: K ? ao(D) : D,
							color: F
						}, ak[d].render(), ak[d].isActive = !0)
					}), aq._addedPlotLB || (ab((an.plotLines || []).concat(an.plotBands || []), function(c) {
						aq.addPlotBandOrLine(c)
					}), aq._addedPlotLB = !0)
				}
				ab([C, z, ak], function(d) {
					var c, k = [],
						f = E.duration;
					U(d, function(l, e) {
						l.isActive || (l.render(e, !1, 0), l.isActive = !1, k.push(e))
					});
					i(function() {
						for (c = k.length; c--;) {
							d[k[c]] && !d[k[c]].isActive && (d[k[c]].destroy(), delete d[k[c]])
						}
					}, d !== ak && ap.hasRendered && f ? f : 0)
				});
				A && (A[A.isPlaced ? "animate" : "attr"]({
					d: this.getLinePath(A.strokeWidth())
				}), A.isPlaced = !0, A[q ? "show" : "hide"](!0));
				am && q && (an = aq.getTitlePosition(), Q(an.y) ? (am[am.isNew ? "attr" : "animate"](an), am.isNew = !1) : (am.attr("y", -9999), am.isNew = !0));
				aj && aj.enabled && aq.renderStackTotals();
				aq.isDirty = !1
			},
			redraw: function() {
				this.visible && (this.render(), ab(this.plotLinesAndBands, function(c) {
					c.render()
				}));
				ab(this.series, function(c) {
					c.isDirty = !0
				})
			},
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function(f) {
				var d = this,
					l = d.stacks,
					k = d.plotLinesAndBands,
					g;
				f || j(d);
				U(l, function(e, c) {
					P(e);
					l[c] = null
				});
				ab([d.ticks, d.minorTicks, d.alternateBands], function(c) {
					P(c)
				});
				if (k) {
					for (f = k.length; f--;) {
						k[f].destroy()
					}
				}
				ab("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(c) {
					d[c] && (d[c] = d[c].destroy())
				});
				for (g in d.plotLinesAndBandsGroups) {
					d.plotLinesAndBandsGroups[g] = d.plotLinesAndBandsGroups[g].destroy()
				}
				U(d, function(e, m) {
					-1 === s(m, d.keepProps) && delete d[m]
				})
			},
			drawCrosshair: function(g, f) {
				var q, m = this.crosshair,
					k = T(m.snap, !0),
					l, n = this.cross;
				g || (g = this.cross && this.cross.e);
				this.crosshair && !1 !== (S(f) || !k) ? (k ? S(f) && (l = this.isXAxis ? f.plotX : this.len - f.plotY) : l = g && (this.horiz ? g.chartX - this.pos : this.len - g.chartY + this.pos), S(l) && (q = this.getPlotLinePath(f && (this.isXAxis ? f.x : T(f.stackY, f.y)), null, null, null, l) || null), S(q) ? (f = this.categories && !this.isRadial, n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (f ? "category " : "thin ") + m.className).attr({
					zIndex: T(m.zIndex, 2)
				}).add(), n.attr({
					stroke: m.color || (f ? Y("#ccd6eb").setOpacity(0.25).get() : "#cccccc"),
					"stroke-width": T(m.width, 1)
				}), m.dashStyle && n.attr({
					dashstyle: m.dashStyle
				})), n.show().attr({
					d: q
				}), f && !m.width && n.attr({
					"stroke-width": this.transA
				}), this.cross.e = g) : this.hideCrosshair()) : this.hideCrosshair()
			},
			hideCrosshair: function() {
				this.cross && this.cross.hide()
			}
		});
		return ah.Axis = h
	}(b);
	(function(p) {
		var e = p.Axis,
			h = p.Date,
			v = p.dateFormat,
			w = p.defaultOptions,
			i = p.defined,
			n = p.each,
			j = p.extend,
			c = p.getMagnitude,
			q = p.getTZOffset,
			s = p.normalizeTickInterval,
			k = p.pick,
			o = p.timeUnits;
		e.prototype.getTimeTicks = function(F, E, y, J) {
			var x = [],
				u = {},
				d = w.global.useUTC,
				f, C = new h(E - Math.max(q(E), q(y))),
				K = h.hcMakeTime,
				g = F.unitRange,
				m = F.count,
				L, l;
			if (i(E)) {
				C[h.hcSetMilliseconds](g >= o.second ? 0 : m * Math.floor(C.getMilliseconds() / m));
				if (g >= o.second) {
					C[h.hcSetSeconds](g >= o.minute ? 0 : m * Math.floor(C.getSeconds() / m))
				}
				if (g >= o.minute) {
					C[h.hcSetMinutes](g >= o.hour ? 0 : m * Math.floor(C[h.hcGetMinutes]() / m))
				}
				if (g >= o.hour) {
					C[h.hcSetHours](g >= o.day ? 0 : m * Math.floor(C[h.hcGetHours]() / m))
				}
				if (g >= o.day) {
					C[h.hcSetDate](g >= o.month ? 1 : m * Math.floor(C[h.hcGetDate]() / m))
				}
				g >= o.month && (C[h.hcSetMonth](g >= o.year ? 0 : m * Math.floor(C[h.hcGetMonth]() / m)), f = C[h.hcGetFullYear]());
				if (g >= o.year) {
					C[h.hcSetFullYear](f - f % m)
				}
				if (g === o.week) {
					C[h.hcSetDate](C[h.hcGetDate]() - C[h.hcGetDay]() + k(J, 1))
				}
				f = C[h.hcGetFullYear]();
				J = C[h.hcGetMonth]();
				var A = C[h.hcGetDate](),
					H = C[h.hcGetHours]();
				if (h.hcTimezoneOffset || h.hcGetTimezoneOffset) {
					l = (!d || !!h.hcGetTimezoneOffset) && (y - E > 4 * o.month || q(E) !== q(y)), C = C.getTime(), L = q(C), C = new h(C + L)
				}
				d = C.getTime();
				for (E = 1; d < y;) {
					x.push(d), d = g === o.year ? K(f + E * m, 0) : g === o.month ? K(f, J + E * m) : !l || g !== o.day && g !== o.week ? l && g === o.hour ? K(f, J, A, H + E * m, 0, 0, L) - L : d + g * m : K(f, J, A + E * m * (g === o.day ? 1 : 7)), E++
				}
				x.push(d);
				g <= o.hour && 10000 > x.length && n(x, function(r) {
					0 === r 00000 && "000000000" === v("%H%M%S%L", r) && (u[r] = "day")
				})
			}
			x.info = j(F, {
				higherRanks: u,
				totalRange: g * m
			});
			return x
		};
		e.prototype.normalizeTimeTickInterval = function(f, d) {
			var r = d || [
				["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1, 2]],
				["week", [1, 2]],
				["month", [1, 2, 3, 4, 6]],
				["year", null]
			];
			d = r[r.length - 1];
			var l = o[d[0]],
				m = d[1],
				t;
			for (t = 0; t < r.length && !(d = r[t], l = o[d[0]], m = d[1], r[t + 1] && f <= (l * m[m.length - 1] + o[r[t + 1][0]]) / 2); t++) {}
			l === o.year && f < 5 * l && (m = [1, 2, 5]);
			f = s(f / l, m, "year" === d[0] ? Math.max(c(f / l), 1) : 1);
			return {
				unitRange: l,
				count: f,
				unitName: d[0]
			}
		}
	})(b);
	(function(e) {
		var h = e.Axis,
			d = e.getMagnitude,
			f = e.map,
			g = e.normalizeTickInterval,
			c = e.pick;
		h.prototype.getLogTickPositions = function(A, o, j, C) {
			var s = this.options,
				q = this.len,
				w = this.lin2log,
				p = this.log2lin,
				z = [];
			C || (this._minorAutoInterval = null);
			if (0.5 <= A) {
				A = Math.round(A), z = this.getLinearTickPositions(A, o, j)
			} else {
				if (0.08 <= A) {
					for (var q = Math.floor(o), t, B, x, m, i, s = 0.3 < A ? [1, 2, 4] : 0.15 < A ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; q < j + 1 && !i; q++) {
						for (B = s.length, t = 0; t < B && !i; t++) {
							x = p(w(q) * s[t]), x > o && (!C || m <= j) && void 0 !== m && z.push(m), m > j && (i = !0), m = x
						}
					}
				} else {
					o = w(o), j = w(j), A = s[C ? "minorTickInterval" : "tickInterval"], A = c("auto" === A ? null : A, this._minorAutoInterval, s.tickPixelInterval / (C ? 5 : 1) * (j - o) / ((C ? q / this.tickPositions.length : q) || 1)), A = g(A, null, d(A)), z = f(this.getLinearTickPositions(A, o, j), p), C || (this._minorAutoInterval = A / 5)
				}
			}
			C || (this.tickInterval = A);
			return z
		};
		h.prototype.log2lin = function(i) {
			return Math.log(i) / Math.LN10
		};
		h.prototype.lin2log = function(i) {
			return Math.pow(10, i)
		}
	})(b);
	(function(j, d) {
		var e = j.arrayMax,
			n = j.arrayMin,
			o = j.defined,
			g = j.destroyObjectProperties,
			i = j.each,
			h = j.erase,
			c = j.merge,
			k = j.pick;
		j.PlotLineOrBand = function(f, l) {
			this.axis = f;
			l && (this.options = l, this.id = l.id)
		};
		j.PlotLineOrBand.prototype = {
			render: function() {
				var P = this,
					O = P.axis,
					R = O.horiz,
					M = P.options,
					T = M.label,
					Q = P.label,
					x = M.to,
					J = M.from,
					F = M.value,
					y = o(J) && o(x),
					H = o(F),
					S = P.svgElem,
					w = !S,
					C = [],
					A = M.color,
					t = k(M.zIndex, 0),
					E = M.events,
					C = {
						"class": "highcharts-plot-" + (y ? "band " : "line ") + (M.className || "")
					},
					s = {},
					u = O.chart.renderer,
					r = y ? "bands" : "lines",
					N = O.log2lin;
				O.isLog && (J = N(J), x = N(x), F = N(F));
				H ? (C = {
					stroke: A,
					"stroke-width": M.width
				}, M.dashStyle && (C.dashstyle = M.dashStyle)) : y && (A && (C.fill = A), M.borderWidth && (C.stroke = M.borderColor, C["stroke-width"] = M.borderWidth));
				s.zIndex = t;
				r += "-" + t;
				(A = O.plotLinesAndBandsGroups[r]) || (O.plotLinesAndBandsGroups[r] = A = u.g("plot-" + r).attr(s).add());
				w && (P.svgElem = S = u.path().attr(C).add(A));
				if (H) {
					C = O.getPlotLinePath(F, S.strokeWidth())
				} else {
					if (y) {
						C = O.getPlotBandPath(J, x, M)
					} else {
						return
					}
				}
				w && C && C.length ? (S.attr({
					d: C
				}), E && j.objectEach(E, function(l, f) {
					S.on(f, function(m) {
						E[f].apply(P, [m])
					})
				})) : S && (C ? (S.show(), S.animate({
					d: C
				})) : (S.hide(), Q && (P.label = Q = Q.destroy())));
				T && o(T.text) && C && C.length && 0 < O.width && 0 < O.height && !C.flat ? (T = c({
					align: R && y && "center",
					x: R ? !y && 4 : 10,
					verticalAlign: !R && y && "middle",
					y: R ? y ? 16 : 10 : y ? 6 : -4,
					rotation: R && !y && 90
				}, T), this.renderLabel(T, C, y, t)) : Q && Q.hide();
				return P
			},
			renderLabel: function(l, p, r, m) {
				var f = this.label,
					q = this.axis.chart.renderer;
				f || (f = {
					align: l.textAlign || l.align,
					rotation: l.rotation,
					"class": "highcharts-plot-" + (r ? "band" : "line") + "-label " + (l.className || "")
				}, f.zIndex = m, this.label = f = q.text(l.text, 0, 0, l.useHTML).attr(f).add(), f.css(l.style));
				m = [p[1], p[4], r ? p[6] : p[1]];
				p = [p[2], p[5], r ? p[7] : p[2]];
				r = n(m);
				q = n(p);
				f.align(l, !1, {
					x: r,
					y: q,
					width: e(m) - r,
					height: e(p) - q
				});
				f.show()
			},
			destroy: function() {
				h(this.axis.plotLinesAndBands, this);
				delete this.axis;
				g(this)
			}
		};
		j.extend(d.prototype, {
			getPlotBandPath: function(l, p) {
				var r = this.getPlotLinePath(p, null, null, !0),
					m = this.getPlotLinePath(l, null, null, !0),
					f = this.horiz,
					q = 1;
				l = l < this.min && p < this.min || l > this.max && p > this.max;
				m && r ? (l && (m.flat = m.toString() === r.toString(), q = 0), m.push(f && r[4] === m[4] ? r[4] + q : r[4], f || r[5] !== m[5] ? r[5] : r[5] + q, f && r[1] === m[1] ? r[1] + q : r[1], f || r[2] !== m[2] ? r[2] : r[2] + q)) : m = null;
				return m
			},
			addPlotBand: function(f) {
				return this.addPlotBandOrLine(f, "plotBands")
			},
			addPlotLine: function(f) {
				return this.addPlotBandOrLine(f, "plotLines")
			},
			addPlotBandOrLine: function(p, m) {
				var q = (new j.PlotLineOrBand(this, p)).render(),
					l = this.userOptions;
				q && (m && (l[m] = l[m] || [], l[m].push(p)), this.plotLinesAndBands.push(q));
				return q
			},
			removePlotBandOrLine: function(l) {
				for (var p = this.plotLinesAndBands, q = this.options, m = this.userOptions, f = p.length; f--;) {
					p[f].id === l && p[f].destroy()
				}
				i([q.plotLines || [], m.plotLines || [], q.plotBands || [], m.plotBands || []], function(r) {
					for (f = r.length; f--;) {
						r[f].id === l && h(r, r[f])
					}
				})
			},
			removePlotBand: function(f) {
				this.removePlotBandOrLine(f)
			},
			removePlotLine: function(f) {
				this.removePlotBandOrLine(f)
			}
		})
	})(b, a);
	(function(n) {
		var d = n.dateFormat,
			e = n.each,
			q = n.extend,
			s = n.format,
			h = n.isNumber,
			k = n.map,
			i = n.merge,
			c = n.pick,
			o = n.splat,
			p = n.syncTimeout,
			j = n.timeUnits;
		n.Tooltip = function() {
			this.init.apply(this, arguments)
		};
		n.Tooltip.prototype = {
			init: function(f, g) {
				this.chart = f;
				this.options = g;
				this.crosshairs = [];
				this.now = {
					x: 0,
					y: 0
				};
				this.isHidden = !0;
				this.split = g.split && !f.inverted;
				this.shared = g.shared || this.split
			},
			cleanSplit: function(f) {
				e(this.chart.series, function(l) {
					var g = l && l.tt;
					g && (!g.isActive || f ? l.tt = g.destroy() : g.isActive = !1)
				})
			},
			getLabel: function() {
				var f = this.chart.renderer,
					g = this.options;
				this.label || (this.split ? this.label = f.g("tooltip") : (this.label = f.label("", 0, 0, g.shape || "callout", null, null, g.useHTML, null, "tooltip").attr({
					padding: g.padding,
					r: g.borderRadius
				}), this.label.attr({
					fill: g.backgroundColor,
					"stroke-width": g.borderWidth
				}).css(g.style).shadow(g.shadow)), this.label.attr({
					zIndex: 8
				}).add());
				return this.label
			},
			update: function(f) {
				this.destroy();
				i(!0, this.chart.options.tooltip.userOptions, f);
				this.init(this.chart, i(!0, this.options, f))
			},
			destroy: function() {
				this.label && (this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
				clearTimeout(this.hideTimer);
				clearTimeout(this.tooltipTimeout)
			},
			move: function(m, r, l, v) {
				var w = this,
					t = w.now,
					x = !1 !== w.options.animation && !w.isHidden && (1 < Math.abs(m - t.x) || 1 < Math.abs(r - t.y)),
					u = w.followPointer || 1 < w.len;
				q(t, {
					x: x ? (2 * t.x + m) / 3 : m,
					y: x ? (t.y + r) / 2 : r,
					anchorX: u ? void 0 : x ? (2 * t.anchorX + l) / 3 : l,
					anchorY: u ? void 0 : x ? (t.anchorY + v) / 2 : v
				});
				w.getLabel().attr(t);
				x && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
					w && w.move(m, r, l, v)
				}, 32))
			},
			hide: function(f) {
				var g = this;
				clearTimeout(this.hideTimer);
				f = c(f, this.options.hideDelay, 500);
				this.isHidden || (this.hideTimer = p(function() {
					g.getLabel()[f ? "fadeOut" : "hide"]();
					g.isHidden = !0
				}, f))
			},
			getAnchor: function(C, w) {
				var B, y = this.chart,
					z = y.inverted,
					x = y.plotTop,
					t = y.plotLeft,
					v = 0,
					u = 0,
					A, f;
				C = o(C);
				B = C[0].tooltipPos;
				this.followPointer && w && (void 0 === w.chartX && (w = y.pointer.normalize(w)), B = [w.chartX - y.plotLeft, w.chartY - x]);
				B || (e(C, function(g) {
					A = g.series.yAxis;
					f = g.series.xAxis;
					v += g.plotX + (!z && f ? f.left - t : 0);
					u += (g.plotLow ? (g.plotLow + g.plotHigh) / 2 : g.plotY) + (!z && A ? A.top - x : 0)
				}), v /= C.length, u /= C.length, B = [z ? y.plotWidth - u : v, this.shared && !z && 1 < C.length && w ? w.chartY - x : z ? y.plotHeight - v : u]);
				return k(B, Math.round)
			},
			getPosition: function(H, A, G) {
				var D = this.chart,
					E = this.distance,
					z = {},
					w = G.h || 0,
					C, y = ["y", D.chartHeight, A, G.plotY + D.plotTop, D.plotTop, D.plotTop + D.plotHeight],
					F = ["x", D.chartWidth, H, G.plotX + D.plotLeft, D.plotLeft, D.plotLeft + D.plotWidth],
					x = !this.followPointer && c(G.ttBelow, !D.inverted === !!G.negative),
					r = function(N, M, L, K, m, l) {
						var t = L < K - E,
							B = K + E + L < M,
							J = K - E - L;
						K += E;
						if (x && B) {
							z[N] = K
						} else {
							if (!x && t) {
								z[N] = J
							} else {
								if (t) {
									z[N] = Math.min(l - L, 0 > J - w ? J : J - w)
								} else {
									if (B) {
										z[N] = Math.max(m, K + w + L > M ? K : K + w)
									} else {
										return !1
									}
								}
							}
						}
					},
					v = function(g, f, t, m) {
						var l;
						m < E || m > f - E ? l = !1 : z[g] = m < t / 2 ? 1 : m > f - t / 2 ? f - t - 2 : m - t / 2;
						return l
					},
					I = function(g) {
						var f = y;
						y = F;
						F = f;
						C = g
					},
					u = function() {
						!1 !== r.apply(0, y) ? !1 !== v.apply(0, F) || C || (I(!0), u()) : C ? z.x = z.y = 0 : (I(!0), u())
					};
				(D.inverted || 1 < this.len) && I();
				u();
				return z
			},
			defaultFormatter: function(g) {
				var l = this.points || o(this),
					f;
				f = [g.tooltipFooterHeaderFormatter(l[0])];
				f = f.concat(g.bodyFormatter(l));
				f.push(g.tooltipFooterHeaderFormatter(l[0], !0));
				return f
			},
			refresh: function(A, u) {
				var z, w = this.options,
					x, t = A,
					m, v = {},
					r = [];
				z = w.formatter || this.defaultFormatter;
				var v = this.shared,
					y;
				w.enabled && (clearTimeout(this.hideTimer), this.followPointer = o(t)[0].series.tooltipOptions.followPointer, m = this.getAnchor(t, u), u = m[0], x = m[1], !v || t.series && t.series.noSharedTooltip ? v = t.getLabelConfig() : (e(t, function(f) {
					f.setState("hover");
					r.push(f.getLabelConfig())
				}), v = {
					x: t[0].category,
					y: t[0].y
				}, v.points = r, t = t[0]), this.len = r.length, v = z.call(v, this), y = t.series, this.distance = c(y.tooltipOptions.distance, 16), !1 === v ? this.hide() : (z = this.getLabel(), this.isHidden && z.attr({
					opacity: 1
				}).show(), this.split ? this.renderSplit(v, A) : (w.style.width || z.css({
					width: this.chart.spacingBox.width
				}), z.attr({
					text: v && v.join ? v.join("") : v
				}), z.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + c(t.colorIndex, y.colorIndex)), z.attr({
					stroke: w.borderColor || t.color || y.color || "#666666"
				}), this.updatePosition({
					plotX: u,
					plotY: x,
					negative: t.negative,
					ttBelow: t.ttBelow,
					h: m[2] || 0
				})), this.isHidden = !1))
			},
			renderSplit: function(z, v) {
				var B = this,
					y = [],
					w = this.chart,
					x = w.renderer,
					r = !0,
					u = this.options,
					t = 0,
					A = this.getLabel();
				e(z.slice(0, v.length + 1), function(f, D) {
					if (!1 !== f) {
						D = v[D - 1] || {
							isHeader: !0,
							plotX: v[0].plotX
						};
						var l = D.series || B,
							g = l.tt,
							m = D.series || {},
							C = "highcharts-color-" + c(D.colorIndex, m.colorIndex, "none");
						g || (l.tt = g = x.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + C).attr({
							padding: u.padding,
							r: u.borderRadius,
							fill: u.backgroundColor,
							stroke: u.borderColor || D.color || m.color || "#333333",
							"stroke-width": u.borderWidth
						}).add(A));
						g.isActive = !0;
						g.attr({
							text: f
						});
						g.css(u.style).shadow(u.shadow);
						f = g.getBBox();
						m = f.width + g.strokeWidth();
						D.isHeader ? (t = f.height, m = Math.max(0, Math.min(D.plotX + w.plotLeft - m / 2, w.chartWidth - m))) : m = D.plotX + w.plotLeft - c(u.distance, 16) - m;
						0 > m && (r = !1);
						f = (D.series && D.series.yAxis && D.series.yAxis.pos) + (D.plotY || 0);
						f -= w.plotTop;
						y.push({
							target: D.isHeader ? w.plotHeight + t : f,
							rank: D.isHeader ? 1 : 0,
							size: l.tt.getBBox().height + 1,
							point: D,
							x: m,
							tt: g
						})
					}
				});
				this.cleanSplit();
				n.distribute(y, w.plotHeight + t);
				e(y, function(g) {
					var f = g.point,
						l = f.series;
					g.tt.attr({
						visibility: void 0 === g.pos ? "hidden" : "inherit",
						x: r || f.isHeader ? g.x : f.plotX + w.plotLeft + c(u.distance, 16),
						y: g.pos + w.plotTop,
						anchorX: f.isHeader ? f.plotX + w.plotLeft : f.plotX + l.xAxis.pos,
						anchorY: f.isHeader ? g.pos + w.plotTop - 15 : f.plotY + l.yAxis.pos
					})
				})
			},
			updatePosition: function(g) {
				var l = this.chart,
					f = this.getLabel(),
					f = (this.options.positioner || this.getPosition).call(this, f.width, f.height, g);
				this.move(Math.round(f.x), Math.round(f.y || 0), g.plotX + l.plotLeft, g.plotY + l.plotTop)
			},
			getDateFormat: function(z, u, y, w) {
				var x = d("%m-%d %H:%M:%S.%L", u),
					v, g, t = {
						millisecond: 15,
						second: 12,
						minute: 9,
						hour: 6,
						day: 3
					},
					r = "millisecond";
				for (g in j) {
					if (z === j.week && +d("%w", u) === y && "00:00:00.000" === x.substr(6)) {
						g = "week";
						break
					}
					if (j[g] > z) {
						g = r;
						break
					}
					if (t[g] && x.substr(t[g]) !== "01-01 00:00:00.000".substr(t[g])) {
						break
					}
					"week" !== g && (r = g)
				}
				g && (v = w[g]);
				return v
			},
			getXDateFormat: function(l, m, f) {
				m = m.dateTimeLabelFormats;
				var r = f && f.closestPointRange;
				return (r ? this.getDateFormat(r, l.x, f.options.startOfWeek, m) : m.day) || m.year
			},
			tooltipFooterHeaderFormatter: function(l, r) {
				var f = r ? "footer" : "header";
				r = l.series;
				var t = r.tooltipOptions,
					u = t.xDateFormat,
					m = r.xAxis,
					v = m && "datetime" === m.options.type && h(l.key),
					f = t[f + "Format"];
				v && !u && (u = this.getXDateFormat(l, t, m));
				v && u && (f = f.replace("{point.key}", "{point.key:" + u + "}"));
				return s(f, {
					point: l,
					series: r
				})
			},
			bodyFormatter: function(f) {
				return k(f, function(l) {
					var g = l.series.tooltipOptions;
					return (g.pointFormatter || l.point.tooltipFormatter).call(l.point, g.pointFormat)
				})
			}
		}
	})(b);
	(function(J) {
		var p = J.addEvent,
			s = J.attr,
			i = J.charts,
			n = J.color,
			w = J.css,
			D = J.defined,
			x = J.each,
			q = J.extend,
			j = J.find,
			o = J.fireEvent,
			B = J.isObject,
			H = J.offset,
			z = J.pick,
			I = J.removeEvent,
			G = J.splat,
			h = J.Tooltip,
			c = J.win;
		J.Pointer = function(e, d) {
			this.init(e, d)
		};
		J.Pointer.prototype = {
			init: function(e, d) {
				this.options = d;
				this.chart = e;
				this.runChartClick = d.chart.events && !!d.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				h && (e.tooltip = new h(e, d.tooltip), this.followTouchMove = z(d.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function(f) {
				var d = this.chart,
					g = d.options.chart,
					k = g.zoomType || "",
					d = d.inverted;
				/touch/.test(f.type) && (k = z(g.pinchType, k));
				this.zoomX = f = /x/.test(k);
				this.zoomY = k = /y/.test(k);
				this.zoomHor = f && !d || k && d;
				this.zoomVert = k && !d || f && d;
				this.hasZoom = f || k
			},
			normalize: function(f, d) {
				var g, k;
				f = f || c.event;
				f.target || (f.target = f.srcElement);
				k = f.touches ? f.touches.length ? f.touches.item(0) : f.changedTouches[0] : f;
				d || (this.chartPosition = d = H(this.chart.container));
				void 0 === k.pageX ? (g = Math.max(f.x, f.clientX - d.left), d = f.y) : (g = k.pageX - d.left, d = k.pageY - d.top);
				return q(f, {
					chartX: Math.round(g),
					chartY: Math.round(d)
				})
			},
			getCoordinates: function(e) {
				var d = {
					xAxis: [],
					yAxis: []
				};
				x(this.chart.axes, function(f) {
					d[f.isXAxis ? "xAxis" : "yAxis"].push({
						axis: f,
						value: f.toValue(e[f.horiz ? "chartX" : "chartY"])
					})
				});
				return d
			},
			findNearestKDPoint: function(f, d, g) {
				var k;
				x(f, function(e) {
					var m = !(e.noSharedTooltip && d) && 0 > e.options.findNearestPointBy.indexOf("y");
					e = e.searchPoint(g, m);
					if ((m = B(e, !0)) && !(m = !B(k, !0))) {
						var m = k.distX - e.distX,
							r = k.dist - e.dist,
							l = (e.series.group && e.series.group.zIndex) - (k.series.group && k.series.group.zIndex),
							m = 0 < (0 !== m && d ? m : 0 !== r ? r : 0 !== l ? l : k.series.index > e.series.index ? -1 : 1)
					}
					m && (k = e)
				});
				return k
			},
			getPointFromEvent: function(e) {
				e = e.target;
				for (var d; e && !d;) {
					d = e.point, e = e.parentNode
				}
				return d
			},
			getChartCoordinatesFromPoint: function(f, d) {
				var g = f.series,
					k = g.xAxis,
					g = g.yAxis;
				if (k && g) {
					return d ? {
						chartX: k.len + k.pos - f.clientX,
						chartY: g.len + g.pos - f.plotY
					} : {
						chartX: f.clientX + k.pos,
						chartY: f.plotY + g.pos
					}
				}
			},
			getHoverData: function(y, r, t, u, m, g) {
				var l, A = [];
				u = !(!u || !y);
				var k = r && !r.stickyTracking ? [r] : J.grep(t, function(d) {
					return d.visible && !(!m && d.directTouch) && z(d.options.enableMouseTracking, !0) && d.stickyTracking
				});
				r = (l = u ? y : this.findNearestKDPoint(k, m, g)) && l.series;
				l && (m && !r.noSharedTooltip ? (k = J.grep(t, function(d) {
					return d.visible && !(!m && d.directTouch) && z(d.options.enableMouseTracking, !0) && !d.noSharedTooltip
				}), x(k, function(d) {
					d = j(d.points, function(e) {
						return e.x === l.x
					});
					B(d) && !d.isNull && A.push(d)
				})) : A.push(l));
				return {
					hoverPoint: l,
					hoverSeries: r,
					hoverPoints: A
				}
			},
			runPointActions: function(k, t) {
				var u = this.chart,
					A = u.tooltip,
					m = A ? A.shared : !1,
					y = t || u.hoverPoint,
					r = y && y.series || u.hoverSeries,
					r = this.getHoverData(y, r, u.series, !!t || r && r.directTouch && this.isDirectTouch, m, k),
					l, y = r.hoverPoint;
				l = r.hoverPoints;
				t = (r = r.hoverSeries) && r.tooltipOptions.followPointer;
				m = m && r && !r.noSharedTooltip;
				if (y && (y !== u.hoverPoint || A && A.isHidden)) {
					x(u.hoverPoints || [], function(d) {
						-1 === J.inArray(d, l) && d.setState()
					});
					x(l || [], function(d) {
						d.setState("hover")
					});
					if (u.hoverSeries !== r) {
						r.onMouseOver()
					}
					u.hoverPoint && u.hoverPoint.firePointEvent("mouseOut");
					y.firePointEvent("mouseOver");
					u.hoverPoints = l;
					u.hoverPoint = y;
					A && A.refresh(m ? l : y, k)
				} else {
					t && A && !A.isHidden && (y = A.getAnchor([{}], k), A.updatePosition({
						plotX: y[0],
						plotY: y[1]
					}))
				}
				this.unDocMouseMove || (this.unDocMouseMove = p(u.container.ownerDocument, "mousemove", function(d) {
					var e = i[J.hoverChartIndex];
					if (e) {
						e.pointer.onDocumentMouseMove(d)
					}
				}));
				x(u.axes, function(g) {
					var f = z(g.crosshair.snap, !0),
						d = f ? J.find(l, function(e) {
							return e.series[g.coll] === g
						}) : void 0;
					d || !f ? g.drawCrosshair(k, d) : g.hideCrosshair()
				})
			},
			reset: function(l, e) {
				var u = this.chart,
					y = u.hoverSeries,
					r = u.hoverPoint,
					v = u.hoverPoints,
					t = u.tooltip,
					m = t && t.shared ? v : r;
				l && m && x(G(m), function(d) {
					d.series.isCartesian && void 0 === d.plotX && (l = !1)
				});
				if (l) {
					t && m && (t.refresh(m), r && (r.setState(r.state, !0), x(u.axes, function(d) {
						d.crosshair && d.drawCrosshair(null, r)
					})))
				} else {
					if (r) {
						r.onMouseOut()
					}
					v && x(v, function(d) {
						d.setState()
					});
					if (y) {
						y.onMouseOut()
					}
					t && t.hide(e);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					x(u.axes, function(d) {
						d.hideCrosshair()
					});
					this.hoverX = u.hoverPoints = u.hoverPoint = null
				}
			},
			scaleGroups: function(f, d) {
				var g = this.chart,
					k;
				x(g.series, function(e) {
					k = f || e.getPlotBox();
					e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(k), e.markerGroup && (e.markerGroup.attr(k), e.markerGroup.clip(d ? g.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(k))
				});
				g.clipRect.attr(d || g.clipBox)
			},
			dragStart: function(e) {
				var d = this.chart;
				d.mouseIsDown = e.type;
				d.cancelClick = !1;
				d.mouseDownX = this.mouseDownX = e.chartX;
				d.mouseDownY = this.mouseDownY = e.chartY
			},
			drag: function(Q) {
				var P = this.chart,
					M = P.options.chart,
					O = Q.chartX,
					N = Q.chartY,
					K = this.zoomHor,
					y = this.zoomVert,
					L = P.plotLeft,
					u = P.plotTop,
					E = P.plotWidth,
					S = P.plotHeight,
					C, F = this.selectionMarker,
					R = this.mouseDownX,
					A = this.mouseDownY,
					t = M.panKey && Q[M.panKey + "Key"];
				F && F.touch || (O < L ? O = L : O > L + E && (O = L + E), N < u ? N = u : N > u + S && (N = u + S), this.hasDragged = Math.sqrt(Math.pow(R - O, 2) + Math.pow(A - N, 2)), 10 < this.hasDragged && (C = P.isInsidePlot(R - L, A - u), P.hasCartesianSeries && (this.zoomX || this.zoomY) && C && !t && !F && (this.selectionMarker = F = P.renderer.rect(L, u, K ? 1 : E, y ? 1 : S, 0).attr({
					fill: M.selectionMarkerFill || n("#335cad").setOpacity(0.25).get(),
					"class": "highcharts-selection-marker",
					zIndex: 7
				}).add()), F && K && (O -= R, F.attr({
					width: Math.abs(O),
					x: (0 < O ? 0 : O) + R
				})), F && y && (O = N - A, F.attr({
					height: Math.abs(O),
					y: (0 < O ? 0 : O) + A
				})), C && !F && M.panning && P.pan(Q, M.panning)))
			},
			drop: function(C) {
				var A = this,
					t = this.chart,
					y = this.hasPinched;
				if (this.selectionMarker) {
					var u = {
							originalEvent: C,
							xAxis: [],
							yAxis: []
						},
						r = this.selectionMarker,
						l = r.attr ? r.attr("x") : r.x,
						m = r.attr ? r.attr("y") : r.y,
						f = r.attr ? r.attr("width") : r.width,
						F = r.attr ? r.attr("height") : r.height,
						E;
					if (this.hasDragged || y) {
						x(t.axes, function(K) {
							if (K.zoomEnabled && D(K.min) && (y || A[{
									xAxis: "zoomX",
									yAxis: "zoomY"
								}[K.coll]])) {
								var d = K.horiz,
									k = "touchend" === C.type ? K.minPixelPadding : 0,
									v = K.toValue((d ? l : m) + k),
									d = K.toValue((d ? l + f : m + F) - k);
								u[K.coll].push({
									axis: K,
									min: Math.min(v, d),
									max: Math.max(v, d)
								});
								E = !0
							}
						}), E && o(t, "selection", u, function(d) {
							t.zoom(q(d, y ? {
								animation: !1
							} : null))
						})
					}
					this.selectionMarker = this.selectionMarker.destroy();
					y && this.scaleGroups()
				}
				t && (w(t.container, {
					cursor: t._cursor
				}), t.cancelClick = 10 < this.hasDragged, t.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function(d) {
				d = this.normalize(d);
				this.zoomOption(d);
				d.preventDefault && d.preventDefault();
				this.dragStart(d)
			},
			onDocumentMouseUp: function(d) {
				i[J.hoverChartIndex] && i[J.hoverChartIndex].pointer.drop(d)
			},
			onDocumentMouseMove: function(f) {
				var d = this.chart,
					g = this.chartPosition;
				f = this.normalize(f, g);
				!g || this.inClass(f.target, "highcharts-tracker") || d.isInsidePlot(f.chartX - d.plotLeft, f.chartY - d.plotTop) || this.reset()
			},
			onContainerMouseLeave: function(d) {
				var f = i[J.hoverChartIndex];
				f && (d.relatedTarget || d.toElement) && (f.pointer.reset(), f.pointer.chartPosition = null)
			},
			onContainerMouseMove: function(d) {
				var f = this.chart;
				D(J.hoverChartIndex) && i[J.hoverChartIndex] && i[J.hoverChartIndex].mouseIsDown || (J.hoverChartIndex = f.index);
				d = this.normalize(d);
				d.returnValue = !1;
				"mousedown" === f.mouseIsDown && this.drag(d);
				!this.inClass(d.target, "highcharts-tracker") && !f.isInsidePlot(d.chartX - f.plotLeft, d.chartY - f.plotTop) || f.openMenu || this.runPointActions(d)
			},
			inClass: function(f, d) {
				for (var g; f;) {
					if (g = s(f, "class")) {
						if (-1 !== g.indexOf(d)) {
							return !0
						}
						if (-1 !== g.indexOf("highcharts-container")) {
							return !1
						}
					}
					f = f.parentNode
				}
			},
			onTrackerMouseOut: function(e) {
				var d = this.chart.hoverSeries;
				e = e.relatedTarget || e.toElement;
				this.isDirectTouch = !1;
				if (!(!d || !e || d.stickyTracking || this.inClass(e, "highcharts-tooltip") || this.inClass(e, "highcharts-series-" + d.index) && this.inClass(e, "highcharts-tracker"))) {
					d.onMouseOut()
				}
			},
			onContainerClick: function(g) {
				var f = this.chart,
					k = f.hoverPoint,
					m = f.plotLeft,
					l = f.plotTop;
				g = this.normalize(g);
				f.cancelClick || (k && this.inClass(g.target, "highcharts-tracker") ? (o(k.series, "click", q(g, {
					point: k
				})), f.hoverPoint && k.firePointEvent("click", g)) : (q(g, this.getCoordinates(g)), f.isInsidePlot(g.chartX - m, g.chartY - l) && o(f, "click", g)))
			},
			setDOMEvents: function() {
				var f = this,
					g = f.chart.container,
					k = g.ownerDocument;
				g.onmousedown = function(d) {
					f.onContainerMouseDown(d)
				};
				g.onmousemove = function(d) {
					f.onContainerMouseMove(d)
				};
				g.onclick = function(d) {
					f.onContainerClick(d)
				};
				p(g, "mouseleave", f.onContainerMouseLeave);
				1 === J.chartCount && p(k, "mouseup", f.onDocumentMouseUp);
				J.hasTouch && (g.ontouchstart = function(d) {
					f.onContainerTouchStart(d)
				}, g.ontouchmove = function(d) {
					f.onContainerTouchMove(d)
				}, 1 === J.chartCount && p(k, "touchend", f.onDocumentTouchEnd))
			},
			destroy: function() {
				var f = this,
					g = this.chart.container.ownerDocument;
				f.unDocMouseMove && f.unDocMouseMove();
				I(f.chart.container, "mouseleave", f.onContainerMouseLeave);
				J.chartCount || (I(g, "mouseup", f.onDocumentMouseUp), J.hasTouch && I(g, "touchend", f.onDocumentTouchEnd));
				clearInterval(f.tooltipTimeout);
				J.objectEach(f, function(e, d) {
					f[d] = null
				})
			}
		}
	})(b);
	(function(e) {
		var j = e.charts,
			d = e.each,
			g = e.extend,
			i = e.map,
			c = e.noop,
			h = e.pick;
		g(e.Pointer.prototype, {
			pinchTranslate: function(l, p, k, n, o, q) {
				this.zoomHor && this.pinchTranslateDirection(!0, l, p, k, n, o, q);
				this.zoomVert && this.pinchTranslateDirection(!1, l, p, k, n, o, q)
			},
			pinchTranslateDirection: function(Z, U, P, F, T, W, R, Y) {
				var V = this.chart,
					D = Z ? "x" : "y",
					Q = Z ? "X" : "Y",
					O = "chart" + Q,
					H = Z ? "width" : "height",
					E = V["plot" + (Z ? "Left" : "Top")],
					X, C, M = Y || 1,
					J = V.inverted,
					x = V.bounds[Z ? "h" : "v"],
					N = 1 === U.length,
					s = U[0][O],
					y = P[0][O],
					o = !N && U[1][O],
					S = !N && P[1][O],
					A;
				P = function() {
					!N && 20 < Math.abs(s - o) && (M = Y || Math.abs(y - S) / Math.abs(s - o));
					C = (E - y) / M + s;
					X = V["plot" + (Z ? "Width" : "Height")] / M
				};
				P();
				U = C;
				U < x.min ? (U = x.min, A = !0) : U + X > x.max && (U = x.max - X, A = !0);
				A ? (y -= 0.8 * (y - R[D][0]), N || (S -= 0.8 * (S - R[D][1])), P()) : R[D] = [y, S];
				J || (W[D] = C - E, W[H] = X);
				W = J ? 1 / M : M;
				T[H] = X;
				T[D] = U;
				F[J ? Z ? "scaleY" : "scaleX" : "scale" + Q] = M;
				F["translate" + Q] = W * E + (y - W * s)
			},
			pinch: function(x) {
				var m = this,
					A = m.chart,
					B = m.pinchDown,
					p = x.touches,
					r = p.length,
					o = m.lastValidTouch,
					w = m.hasZoom,
					q = m.selectionMarker,
					z = {},
					s = 1 === r && (m.inClass(x.target, "highcharts-tracker") && A.runTrackerClick || m.runChartClick),
					f = {};
				1 < r && (m.initiated = !0);
				w && m.initiated && !s && x.preventDefault();
				i(p, function(k) {
					return m.normalize(k)
				});
				"touchstart" === x.type ? (d(p, function(l, k) {
					B[k] = {
						chartX: l.chartX,
						chartY: l.chartY
					}
				}), o.x = [B[0].chartX, B[1] && B[1].chartX], o.y = [B[0].chartY, B[1] && B[1].chartY], d(A.axes, function(n) {
					if (n.zoomEnabled) {
						var l = A.bounds[n.horiz ? "h" : "v"],
							v = n.minPixelPadding,
							y = n.toPixels(h(n.options.min, n.dataMin)),
							u = n.toPixels(h(n.options.max, n.dataMax)),
							t = Math.max(y, u);
						l.min = Math.min(n.pos, Math.min(y, u) - v);
						l.max = Math.max(n.pos + n.len, t + v)
					}
				}), m.res = !0) : m.followTouchMove && 1 === r ? this.runPointActions(m.normalize(x)) : B.length && (q || (m.selectionMarker = q = g({
					destroy: c,
					touch: !0
				}, A.plotBox)), m.pinchTranslate(B, p, z, q, f, o), m.hasPinched = w, m.scaleGroups(z, f), m.res && (m.res = !1, this.reset(!1, 0)))
			},
			touch: function(k, f) {
				var p = this.chart,
					n, o;
				if (p.index !== e.hoverChartIndex) {
					this.onContainerMouseLeave({
						relatedTarget: !0
					})
				}
				e.hoverChartIndex = p.index;
				1 === k.touches.length ? (k = this.normalize(k), (o = p.isInsidePlot(k.chartX - p.plotLeft, k.chartY - p.plotTop)) && !p.openMenu ? (f && this.runPointActions(k), "touchmove" === k.type && (f = this.pinchDown, n = f[0] ? 4 <= Math.sqrt(Math.pow(f[0].chartX - k.chartX, 2) + Math.pow(f[0].chartY - k.chartY, 2)) : !1), h(n, !0) && this.pinch(k)) : f && this.reset()) : 2 === k.touches.length && this.pinch(k)
			},
			onContainerTouchStart: function(f) {
				this.zoomOption(f);
				this.touch(f, !0)
			},
			onContainerTouchMove: function(f) {
				this.touch(f)
			},
			onDocumentTouchEnd: function(k) {
				j[e.hoverChartIndex] && j[e.hoverChartIndex].pointer.drop(k)
			}
		})
	})(b);
	(function(v) {
		var e = v.addEvent,
			h = v.charts,
			y = v.css,
			z = v.doc,
			i = v.extend,
			p = v.noop,
			j = v.Pointer,
			c = v.removeEvent,
			w = v.win,
			x = v.wrap;
		if (!v.hasTouch && (w.PointerEvent || w.MSPointerEvent)) {
			var o = {},
				q = !!w.PointerEvent,
				n = function() {
					var d = [];
					d.item = function(f) {
						return this[f]
					};
					v.objectEach(o, function(f) {
						d.push({
							pageX: f.pageX,
							pageY: f.pageY,
							target: f.target
						})
					});
					return d
				},
				s = function(f, l, k, m) {
					"touch" !== f.pointerType && f.pointerType !== f.MSPOINTER_TYPE_TOUCH || !h[v.hoverChartIndex] || (m(f), m = h[v.hoverChartIndex].pointer, m[l]({
						type: k,
						target: f.currentTarget,
						preventDefault: p,
						touches: n()
					}))
				};
			i(j.prototype, {
				onContainerPointerDown: function(d) {
					s(d, "onContainerTouchStart", "touchstart", function(f) {
						o[f.pointerId] = {
							pageX: f.pageX,
							pageY: f.pageY,
							target: f.currentTarget
						}
					})
				},
				onContainerPointerMove: function(d) {
					s(d, "onContainerTouchMove", "touchmove", function(f) {
						o[f.pointerId] = {
							pageX: f.pageX,
							pageY: f.pageY
						};
						o[f.pointerId].target || (o[f.pointerId].target = f.currentTarget)
					})
				},
				onDocumentPointerUp: function(d) {
					s(d, "onDocumentTouchEnd", "touchend", function(f) {
						delete o[f.pointerId]
					})
				},
				batchMSEvents: function(d) {
					d(this.chart.container, q ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
					d(this.chart.container, q ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
					d(z, q ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
				}
			});
			x(j.prototype, "init", function(g, f, k) {
				g.call(this, f, k);
				this.hasZoom && y(f.container, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				})
			});
			x(j.prototype, "setDOMEvents", function(d) {
				d.apply(this);
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(e)
			});
			x(j.prototype, "destroy", function(d) {
				this.batchMSEvents(c);
				d.call(this)
			})
		}
	})(b);
	(function(s) {
		var e = s.addEvent,
			h = s.css,
			x = s.discardElement,
			y = s.defined,
			i = s.each,
			p = s.isFirefox,
			j = s.marginNames,
			c = s.merge,
			v = s.pick,
			w = s.setAnimation,
			o = s.stableSort,
			q = s.win,
			n = s.wrap;
		s.Legend = function(d, f) {
			this.init(d, f)
		};
		s.Legend.prototype = {
			init: function(d, f) {
				this.chart = d;
				this.setOptions(f);
				f.enabled && (this.render(), e(this.chart, "endResize", function() {
					this.legend.positionCheckboxes()
				}))
			},
			setOptions: function(f) {
				var d = v(f.padding, 8);
				this.options = f;
				this.itemStyle = f.itemStyle;
				this.itemHiddenStyle = c(this.itemStyle, f.itemHiddenStyle);
				this.itemMarginTop = f.itemMarginTop || 0;
				this.padding = d;
				this.initialItemY = d - 5;
				this.itemHeight = this.maxItemWidth = 0;
				this.symbolWidth = v(f.symbolWidth, 16);
				this.pages = []
			},
			update: function(f, g) {
				var d = this.chart;
				this.setOptions(c(!0, this.options, f));
				this.destroy();
				d.isDirtyLegend = d.isDirtyBox = !0;
				v(g, !0) && d.redraw()
			},
			colorizeItem: function(E, A) {
				E.legendGroup[A ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				var D = this.options,
					B = E.legendItem,
					u = E.legendLine,
					z = E.legendSymbol,
					t = this.itemHiddenStyle.color,
					D = A ? D.itemStyle.color : t,
					C = A ? E.color || t : t,
					r = E.options && E.options.marker,
					m = {
						fill: C
					};
				B && B.css({
					fill: D,
					color: D
				});
				u && u.attr({
					stroke: C
				});
				z && (r && z.isMarker && (m = E.pointAttribs(), A || (m.stroke = m.fill = t)), z.attr(m))
			},
			positionItem: function(m) {
				var l = this.options,
					z = l.symbolPadding,
					l = !l.rtl,
					t = m._legendItemPos,
					u = t[0],
					t = t[1],
					r = m.checkbox;
				(m = m.legendGroup) && m.element && m.translate(l ? u : this.legendWidth - u - 2 * z - 4, t);
				r && (r.x = u, r.y = t)
			},
			destroyItem: function(f) {
				var d = f.checkbox;
				i(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(g) {
					f[g] && (f[g] = f[g].destroy())
				});
				d && x(f.checkbox)
			},
			destroy: function() {
				function d(f) {
					this[f] && (this[f] = this[f].destroy())
				}
				i(this.getAllItems(), function(f) {
					i(["legendItem", "legendGroup"], d, f)
				});
				i("clipRect up down pager nav box title group".split(" "), d, this);
				this.display = null
			},
			positionCheckboxes: function(l) {
				var k = this.group && this.group.alignAttr,
					t, m = this.clipHeight || this.legendHeight,
					r = this.titleHeight;
				k && (t = k.translateY, i(this.allItems, function(f) {
					var d = f.checkbox,
						g;
					d && (g = t + r + d.y + (l || 0) + 3, h(d, {
						left: k.translateX + f.checkboxOffset + d.x - 20 + "px",
						top: g + "px",
						display: g > t - 6 && g < t + m - 6 ? "" : "none"
					}))
				}))
			},
			renderTitle: function() {
				var f = this.options,
					l = this.padding,
					m = f.title,
					k = 0;
				m.text && (this.title || (this.title = this.chart.renderer.label(m.text, l - 3, l - 4, null, null, null, f.useHTML, null, "legend-title").attr({
					zIndex: 1
				}).css(m.style).add(this.group)), f = this.title.getBBox(), k = f.height, this.offsetWidth = f.width, this.contentGroup.attr({
					translateY: k
				}));
				this.titleHeight = k
			},
			setText: function(d) {
				var f = this.options;
				d.legendItem.attr({
					text: f.labelFormat ? s.format(f.labelFormat, d) : f.labelFormatter.call(d)
				})
			},
			renderItem: function(aa) {
				var Z = this.chart,
					X = Z.renderer,
					V = this.options,
					W = "horizontal" === V.layout,
					T = this.symbolWidth,
					S = V.symbolPadding,
					Y = this.itemStyle,
					R = this.itemHiddenStyle,
					M = this.padding,
					K = W ? v(V.itemDistance, 20) : 0,
					J = !V.rtl,
					Q = V.width,
					D = V.itemMarginBottom || 0,
					E = this.itemMarginTop,
					C = aa.legendItem,
					U = !aa.series,
					G = !U && aa.series.drawLegendSymbol ? aa.series : aa,
					r = G.options,
					F = this.createCheckboxForItem && r && r.showCheckbox,
					r = T + S + K + (F ? 20 : 0),
					u = V.useHTML,
					N = aa.options.className;
				C || (aa.legendGroup = X.g("legend-item").addClass("highcharts-" + G.type + "-series highcharts-color-" + aa.colorIndex + (N ? " " + N : "") + (U ? " highcharts-series-" + aa.index : "")).attr({
					zIndex: 1
				}).add(this.scrollGroup), aa.legendItem = C = X.text("", J ? T + S : -S, this.baseline || 0, u).css(c(aa.visible ? Y : R)).attr({
					align: J ? "left" : "right",
					zIndex: 2
				}).add(aa.legendGroup), this.baseline || (T = Y.fontSize, this.fontMetrics = X.fontMetrics(T, C), this.baseline = this.fontMetrics.f + 3 + E, C.attr("y", this.baseline)), this.symbolHeight = V.symbolHeight || this.fontMetrics.f, G.drawLegendSymbol(this, aa), this.setItemEvents && this.setItemEvents(aa, C, u), F && this.createCheckboxForItem(aa));
				this.colorizeItem(aa, aa.visible);
				Y.width || C.css({
					width: (V.itemWidth || V.width || Z.spacingBox.width) - r
				});
				this.setText(aa);
				X = C.getBBox();
				Y = aa.checkboxOffset = V.itemWidth || aa.legendItemWidth || X.width + r;
				this.itemHeight = X = Math.round(aa.legendItemHeight || X.height || this.symbolHeight);
				W && this.itemX - M + Y > (Q || Z.spacingBox.width - 2 * M - V.x) && (this.itemX = M, this.itemY += E + this.lastLineHeight + D, this.lastLineHeight = 0);
				this.maxItemWidth = Math.max(this.maxItemWidth, Y);
				this.lastItemY = E + this.itemY + D;
				this.lastLineHeight = Math.max(X, this.lastLineHeight);
				aa._legendItemPos = [this.itemX, this.itemY];
				W ? this.itemX += Y : (this.itemY += E + X + D, this.lastLineHeight = X);
				this.offsetWidth = Q || Math.max((W ? this.itemX - M - (aa.checkbox ? 0 : K) : Y) + M, this.offsetWidth)
			},
			getAllItems: function() {
				var d = [];
				i(this.chart.series, function(f) {
					var g = f && f.options;
					f && v(g.showInLegend, y(g.linkedTo) ? !1 : void 0, !0) && (d = d.concat(f.legendItems || ("point" === g.legendType ? f.data : f)))
				});
				return d
			},
			adjustMargins: function(k, m) {
				var f = this.chart,
					r = this.options,
					l = r.align.charAt(0) + r.verticalAlign.charAt(0) + r.layout.charAt(0);
				r.floating || i([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(g, d) {
					g.test(l) && !y(k[d]) && (f[j[d]] = Math.max(f[j[d]], f.legend[(d + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][d] * r[d % 2 ? "x" : "y"] + v(r.margin, 12) + m[d]))
				})
			},
			render: function() {
				var F = this,
					C = F.chart,
					D = C.renderer,
					A = F.group,
					z, r, H, E, G = F.box,
					g = F.options,
					m = F.padding;
				F.itemX = m;
				F.itemY = F.initialItemY;
				F.offsetWidth = 0;
				F.lastItemY = 0;
				A || (F.group = A = D.g("legend").attr({
					zIndex: 7
				}).add(), F.contentGroup = D.g().attr({
					zIndex: 1
				}).add(A), F.scrollGroup = D.g().add(F.contentGroup));
				F.renderTitle();
				z = F.getAllItems();
				o(z, function(f, d) {
					return (f.options && f.options.legendIndex || 0) - (d.options && d.options.legendIndex || 0)
				});
				g.reversed && z.reverse();
				F.allItems = z;
				F.display = r = !!z.length;
				F.lastLineHeight = 0;
				i(z, function(d) {
					F.renderItem(d)
				});
				H = (g.width || F.offsetWidth) + m;
				E = F.lastItemY + F.lastLineHeight + F.titleHeight;
				E = F.handleOverflow(E);
				E += m;
				G || (F.box = G = D.rect().addClass("highcharts-legend-box").attr({
					r: g.borderRadius
				}).add(A), G.isNew = !0);
				G.attr({
					stroke: g.borderColor,
					"stroke-width": g.borderWidth || 0,
					fill: g.backgroundColor || "none"
				}).shadow(g.shadow);
				0 < H && 0 < E && (G[G.isNew ? "attr" : "animate"](G.crisp({
					x: 0,
					y: 0,
					width: H,
					height: E
				}, G.strokeWidth())), G.isNew = !1);
				G[r ? "show" : "hide"]();
				F.legendWidth = H;
				F.legendHeight = E;
				i(z, function(d) {
					F.positionItem(d)
				});
				r && A.align(c(g, {
					width: H,
					height: E
				}), !0, "spacingBox");
				C.isResizing || this.positionCheckboxes()
			},
			handleOverflow: function(P) {
				var O = this,
					J = this.chart,
					G = J.renderer,
					H = this.options,
					E = H.y,
					D = this.padding,
					J = J.spacingBox.height + ("top" === H.verticalAlign ? -E : E) - D,
					E = H.maxHeight,
					N, m = this.clipRect,
					u = H.navigation,
					C = v(u.animation, !0),
					R = u.arrowSize || 12,
					A = this.nav,
					M = this.pages,
					Q, K = this.allItems,
					F = function(d) {
						"number" === typeof d ? m.attr({
							height: d
						}) : m && (O.clipRect = m.destroy(), O.contentGroup.clip());
						O.contentGroup.div && (O.contentGroup.div.style.clip = d ? "rect(" + D + "px,9999px," + (D + d) + "px,0)" : "auto")
					};
				"horizontal" !== H.layout || "middle" === H.verticalAlign || H.floating || (J /= 2);
				E && (J = Math.min(J, E));
				M.length = 0;
				P > J && !1 !== u.enabled ? (this.clipHeight = N = Math.max(J - 20 - this.titleHeight - D, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = P, i(K, function(g, f) {
					var k = g._legendItemPos[1];
					g = Math.round(g.legendItem.getBBox().height);
					var l = M.length;
					if (!l || k - M[l - 1] > N && (Q || k) !== M[l - 1]) {
						M.push(Q || k), l++
					}
					f === K.length - 1 && k + g - M[l - 1] > N && M.push(k);
					k !== Q && (Q = k)
				}), m || (m = O.clipRect = G.clipRect(0, D, 9999, 0), O.contentGroup.clip(m)), F(N), A || (this.nav = A = G.g().attr({
					zIndex: 1
				}).add(this.group), this.up = G.symbol("triangle", 0, 0, R, R).on("click", function() {
					O.scroll(-1, C)
				}).add(A), this.pager = G.text("", 15, 10).addClass("highcharts-legend-navigation").css(u.style).add(A), this.down = G.symbol("triangle-down", 0, 0, R, R).on("click", function() {
					O.scroll(1, C)
				}).add(A)), O.scroll(0), P = J) : A && (F(), this.nav = A.destroy(), this.scrollGroup.attr({
					translateY: 1
				}), this.clipHeight = 0);
				return P
			},
			scroll: function(m, z) {
				var l = this.pages,
					A = l.length;
				m = this.currentPage + m;
				var t = this.clipHeight,
					u = this.options.navigation,
					r = this.pager,
					B = this.padding;
				m > A && (m = A);
				0 < m && (void 0 !== z && w(z, this.chart), this.nav.attr({
					translateX: B,
					translateY: t + this.padding + 7 + this.titleHeight,
					visibility: "visible"
				}), this.up.attr({
					"class": 1 === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), r.attr({
					text: m + "/" + A
				}), this.down.attr({
					x: 18 + this.pager.getBBox().width,
					"class": m === A ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}), this.up.attr({
					fill: 1 === m ? u.inactiveColor : u.activeColor
				}).css({
					cursor: 1 === m ? "default" : "pointer"
				}), this.down.attr({
					fill: m === A ? u.inactiveColor : u.activeColor
				}).css({
					cursor: m === A ? "default" : "pointer"
				}), z = -l[m - 1] + this.initialItemY, this.scrollGroup.animate({
					translateY: z
				}), this.currentPage = m, this.positionCheckboxes(z))
			}
		};
		s.LegendSymbolMixin = {
			drawRectangle: function(g, k) {
				var f = g.symbolHeight,
					l = g.options.squareSymbol;
				k.legendSymbol = this.chart.renderer.rect(l ? (g.symbolWidth - f) / 2 : 0, g.baseline - f + 1, l ? f : g.symbolWidth, f, v(g.options.symbolRadius, f / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(k.legendGroup)
			},
			drawLineMarker: function(E) {
				var D = this.options,
					B = D.marker,
					z = E.symbolWidth,
					A = E.symbolHeight,
					u = A / 2,
					t = this.chart.renderer,
					C = this.legendGroup;
				E = E.baseline - Math.round(0.3 * E.fontMetrics.b);
				var r;
				r = {
					"stroke-width": D.lineWidth || 0
				};
				D.dashStyle && (r.dashstyle = D.dashStyle);
				this.legendLine = t.path(["M", 0, E, "L", z, E]).addClass("highcharts-graph").attr(r).add(C);
				B && !1 !== B.enabled && (D = Math.min(v(B.radius, u), u), 0 === this.symbol.indexOf("url") && (B = c(B, {
					width: A,
					height: A
				}), D = 0), this.legendSymbol = B = t.symbol(this.symbol, z / 2 - D, E - D, 2 * D, 2 * D, B).addClass("highcharts-point").add(C), B.isMarker = !0)
			}
		};
		(/Trident\/7\.0/.test(q.navigator.userAgent) || p) && n(s.Legend.prototype, "positionItem", function(g, k) {
			var f = this,
				l = function() {
					k._legendItemPos && g.call(f, k)
				};
			l();
			setTimeout(l)
		})
	})(b);
	(function(aw) {
		var Y = aw.addEvent,
			aa = aw.animate,
			V = aw.animObject,
			W = aw.attr,
			al = aw.doc,
			aq = aw.Axis,
			am = aw.createElement,
			ah = aw.defaultOptions,
			af = aw.discardElement,
			ag = aw.charts,
			ap = aw.css,
			at = aw.defined,
			an = aw.each,
			av = aw.extend,
			ar = aw.find,
			ae = aw.fireEvent,
			ac = aw.getStyle,
			ak = aw.grep,
			X = aw.isNumber,
			N = aw.isObject,
			au = aw.isString,
			U = aw.Legend,
			ai = aw.marginNames,
			Z = aw.merge,
			M = aw.objectEach,
			aj = aw.Pointer,
			ab = aw.pick,
			S = aw.pInt,
			x = aw.removeEvent,
			ao = aw.seriesTypes,
			ad = aw.splat,
			o = aw.svg,
			T = aw.syncTimeout,
			s = aw.win,
			j = aw.Renderer,
			i = aw.Chart = function() {
				this.getArgs.apply(this, arguments)
			};
		aw.chart = function(e, d, f) {
			return new i(e, d, f)
		};
		av(i.prototype, {
			callbacks: [],
			getArgs: function() {
				var c = [].slice.call(arguments);
				if (au(c[0]) || c[0].nodeName) {
					this.renderTo = c.shift()
				}
				this.init(c[0], c[1])
			},
			init: function(f, r) {
				var n, q, k = f.series,
					m = f.plotOptions || {};
				f.series = null;
				n = Z(ah, f);
				for (q in n.plotOptions) {
					n.plotOptions[q].tooltip = m[q] && Z(m[q].tooltip) || void 0
				}
				n.tooltip.userOptions = f.chart && f.chart.forExport && f.tooltip.userOptions || f.tooltip;
				n.series = f.series = k;
				this.userOptions = f;
				f = n.chart;
				q = f.events;
				this.margin = [];
				this.spacing = [];
				this.bounds = {
					h: {},
					v: {}
				};
				this.callback = r;
				this.isResizing = 0;
				this.options = n;
				this.axes = [];
				this.series = [];
				this.hasCartesianSeries = f.showAxes;
				var l = this;
				l.index = ag.length;
				ag.push(l);
				aw.chartCount++;
				q && M(q, function(d, c) {
					Y(l, c, d)
				});
				l.xAxis = [];
				l.yAxis = [];
				l.pointCount = l.colorCounter = l.symbolCounter = 0;
				l.firstRender()
			},
			initSeries: function(d) {
				var e = this.options.chart;
				(e = ao[d.type || e.type || e.defaultSeriesType]) || aw.error(17, !0);
				e = new e;
				e.init(this, d);
				return e
			},
			orderSeries: function(d) {
				var c = this.series;
				for (d = d || 0; d < c.length; d++) {
					c[d] && (c[d].index = d, c[d].name = c[d].name || "Series " + (c[d].index + 1))
				}
			},
			isInsidePlot: function(f, d, h) {
				var g = h ? d : f;
				f = h ? f : d;
				return 0 <= g && g <= this.plotWidth && 0 <= f && f <= this.plotHeight
			},
			redraw: function(F) {
				var C = this.axes,
					D = this.series,
					y = this.pointer,
					r = this.legend,
					A = this.isDirtyLegend,
					B, k, v = this.hasCartesianSeries,
					t = this.isDirtyBox,
					E, u = this.renderer,
					G = u.isHidden(),
					H = [];
				this.setResponsive && this.setResponsive(!1);
				aw.setAnimation(F, this);
				G && this.temporaryDisplay();
				this.layOutTitles();
				for (F = D.length; F--;) {
					if (E = D[F], E.options.stacking && (B = !0, E.isDirty)) {
						k = !0;
						break
					}
				}
				if (k) {
					for (F = D.length; F--;) {
						E = D[F], E.options.stacking && (E.isDirty = !0)
					}
				}
				an(D, function(c) {
					c.isDirty && "point" === c.options.legendType && (c.updateTotals && c.updateTotals(), A = !0);
					c.isDirtyData && ae(c, "updatedData")
				});
				A && r.options.enabled && (r.render(), this.isDirtyLegend = !1);
				B && this.getStacks();
				v && an(C, function(c) {
					c.updateNames();
					c.setScale()
				});
				this.getMargins();
				v && (an(C, function(c) {
					c.isDirty && (t = !0)
				}), an(C, function(d) {
					var e = d.min + "," + d.max;
					d.extKey !== e && (d.extKey = e, H.push(function() {
						ae(d, "afterSetExtremes", av(d.eventArgs, d.getExtremes()));
						delete d.eventArgs
					}));
					(t || B) && d.redraw()
				}));
				t && this.drawChartBox();
				ae(this, "predraw");
				an(D, function(c) {
					(t || c.isDirty) && c.visible && c.redraw();
					c.isDirtyData = !1
				});
				y && y.reset(!0);
				u.draw();
				ae(this, "redraw");
				ae(this, "render");
				G && this.temporaryDisplay(!0);
				an(H, function(c) {
					c.call()
				})
			},
			get: function(f) {
				function e(c) {
					return c.id === f || c.options && c.options.id === f
				}
				var l, k = this.series,
					g;
				l = ar(this.axes, e) || ar(this.series, e);
				for (g = 0; !l && g < k.length; g++) {
					l = ar(k[g].points || [], e)
				}
				return l
			},
			getAxes: function() {
				var e = this,
					d = this.options,
					f = d.xAxis = ad(d.xAxis || {}),
					d = d.yAxis = ad(d.yAxis || {});
				an(f, function(g, c) {
					g.index = c;
					g.isX = !0
				});
				an(d, function(g, c) {
					g.index = c
				});
				f = f.concat(d);
				an(f, function(c) {
					new aq(e, c)
				})
			},
			getSelectedPoints: function() {
				var c = [];
				an(this.series, function(d) {
					c = c.concat(ak(d.data || [], function(e) {
						return e.selected
					}))
				});
				return c
			},
			getSelectedSeries: function() {
				return ak(this.series, function(c) {
					return c.selected
				})
			},
			setTitle: function(g, f, n) {
				var l = this,
					m = l.options,
					k;
				k = m.title = Z({
					style: {
						color: "#333333",
						fontSize: m.isStock ? "16px" : "18px"
					}
				}, m.title, g);
				m = m.subtitle = Z({
					style: {
						color: "#666666"
					}
				}, m.subtitle, f);
				an([
					["title", g, k],
					["subtitle", f, m]
				], function(p, e) {
					var t = p[0],
						r = l[t],
						q = p[1];
					p = p[2];
					r && q && (l[t] = r = r.destroy());
					p && p.text && !r && (l[t] = l.renderer.text(p.text, 0, 0, p.useHTML).attr({
						align: p.align,
						"class": "highcharts-" + t,
						zIndex: p.zIndex || 4
					}).add(), l[t].update = function(c) {
						l.setTitle(!e && c, e && c)
					}, l[t].css(p.style))
				});
				l.layOutTitles(n)
			},
			layOutTitles: function(f) {
				var m = 0,
					k, l = this.renderer,
					g = this.spacingBox;
				an(["title", "subtitle"], function(c) {
					var n = this[c],
						h = this.options[c];
					c = "title" === c ? -3 : h.verticalAlign ? 0 : m + 2;
					var d;
					n && (d = h.style.fontSize, d = l.fontMetrics(d, n).b, n.css({
						width: (h.width || g.width + h.widthAdjust) + "px"
					}).align(av({
						y: c + d
					}, h), !1, "spacingBox"), h.floating || h.verticalAlign || (m = Math.ceil(m + n.getBBox(h.useHTML).height)))
				}, this);
				k = this.titleOffset !== m;
				this.titleOffset = m;
				!this.isDirtyBox && k && (this.isDirtyBox = k, this.hasRendered && ab(f, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function() {
				var d = this.options.chart,
					g = d.width,
					d = d.height,
					f = this.renderTo;
				at(g) || (this.containerWidth = ac(f, "width"));
				at(d) || (this.containerHeight = ac(f, "height"));
				this.chartWidth = Math.max(0, g || this.containerWidth || 600);
				this.chartHeight = Math.max(0, aw.relativeLength(d, this.chartWidth) || this.containerHeight || 400)
			},
			temporaryDisplay: function(d) {
				var e = this.renderTo;
				if (d) {
					for (; e && e.style;) {
						e.hcOrigStyle && (aw.css(e, e.hcOrigStyle), delete e.hcOrigStyle), e.hcOrigDetached && (al.body.removeChild(e), e.hcOrigDetached = !1), e = e.parentNode
					}
				} else {
					for (; e && e.style;) {
						al.body.contains(e) || (e.hcOrigDetached = !0, al.body.appendChild(e));
						if ("none" === ac(e, "display", !1) || e.hcOricDetached) {
							e.hcOrigStyle = {
								display: e.style.display,
								height: e.style.height,
								overflow: e.style.overflow
							}, d = {
								display: "block",
								overflow: "hidden"
							}, e !== this.renderTo && (d.height = 0), aw.css(e, d), e.offsetWidth || e.style.setProperty("display", "block", "important")
						}
						e = e.parentNode;
						if (e === al.body) {
							break
						}
					}
				}
			},
			setClassName: function(c) {
				this.container.className = "highcharts-container " + (c || "")
			},
			getContainer: function() {
				var r, t = this.options,
					l = t.chart,
					q, m;
				r = this.renderTo;
				var n = aw.uniqueKey(),
					c;
				r || (this.renderTo = r = l.renderTo);
				au(r) && (this.renderTo = r = al.getElementById(r));
				r || aw.error(13, !0);
				q = S(W(r, "data-highcharts-chart"));
				X(q) && ag[q] && ag[q].hasRendered && ag[q].destroy();
				W(r, "data-highcharts-chart", this.index);
				r.innerHTML = "";
				l.skipClone || r.offsetWidth || this.temporaryDisplay();
				this.getChartSize();
				q = this.chartWidth;
				m = this.chartHeight;
				c = av({
					position: "relative",
					overflow: "hidden",
					width: q + "px",
					height: m + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				}, l.style);
				this.container = r = am("div", {
					id: n
				}, c, r);
				this._cursor = r.style.cursor;
				this.renderer = new(aw[l.renderer] || j)(r, q, m, null, l.forExport, t.exporting && t.exporting.allowHTML);
				this.setClassName(l.className);
				this.renderer.setStyle(l.style);
				this.renderer.chartIndex = this.index
			},
			getMargins: function(f) {
				var d = this.spacing,
					h = this.margin,
					g = this.titleOffset;
				this.resetMargins();
				g && !at(h[0]) && (this.plotTop = Math.max(this.plotTop, g + this.options.title.margin + d[0]));
				this.legend.display && this.legend.adjustMargins(h, d);
				this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
				this.extraTopMargin && (this.plotTop += this.extraTopMargin);
				f || this.getAxisMargins()
			},
			getAxisMargins: function() {
				var e = this,
					d = e.axisOffset = [0, 0, 0, 0],
					f = e.margin;
				e.hasCartesianSeries && an(e.axes, function(c) {
					c.visible && c.getOffset()
				});
				an(ai, function(g, c) {
					at(f[c]) || (e[g] += d[c])
				});
				e.setChartSize()
			},
			reflow: function(f) {
				var d = this,
					m = d.options.chart,
					l = d.renderTo,
					g = at(m.width) && at(m.height),
					k = m.width || ac(l, "width"),
					m = m.height || ac(l, "height"),
					l = f ? f.target : s;
				if (!g && !d.isPrinting && k && m && (l === s || l === al)) {
					if (k !== d.containerWidth || m !== d.containerHeight) {
						clearTimeout(d.reflowTimeout), d.reflowTimeout = T(function() {
							d.container && d.setSize(void 0, void 0, !1)
						}, f ? 100 : 0)
					}
					d.containerWidth = k;
					d.containerHeight = m
				}
			},
			initReflow: function() {
				var d = this,
					c;
				c = Y(s, "resize", function(e) {
					d.reflow(e)
				});
				Y(d, "destroy", c)
			},
			setSize: function(f, m, k) {
				var l = this,
					g = l.renderer;
				l.isResizing += 1;
				aw.setAnimation(k, l);
				l.oldChartHeight = l.chartHeight;
				l.oldChartWidth = l.chartWidth;
				void 0 !== f && (l.options.chart.width = f);
				void 0 !== m && (l.options.chart.height = m);
				l.getChartSize();
				f = g.globalAnimation;
				(f ? aa : ap)(l.container, {
					width: l.chartWidth + "px",
					height: l.chartHeight + "px"
				}, f);
				l.setChartSize(!0);
				g.setSize(l.chartWidth, l.chartHeight, k);
				an(l.axes, function(c) {
					c.isDirty = !0;
					c.setScale()
				});
				l.isDirtyLegend = !0;
				l.isDirtyBox = !0;
				l.layOutTitles();
				l.getMargins();
				l.redraw(k);
				l.oldChartHeight = null;
				ae(l, "resize");
				T(function() {
					l && ae(l, "endResize", null, function() {
						--l.isResizing
					})
				}, V(f).duration)
			},
			setChartSize: function(G) {
				function F(c) {
					c = A[c] || 0;
					return Math.max(u || c, c) / 2
				}
				var E = this.inverted,
					B = this.renderer,
					C = this.chartWidth,
					w = this.chartHeight,
					r = this.options.chart,
					y = this.spacing,
					A = this.clipOffset,
					k, t, v, D, u;
				this.plotLeft = k = Math.round(this.plotLeft);
				this.plotTop = t = Math.round(this.plotTop);
				this.plotWidth = v = Math.max(0, Math.round(C - k - this.marginRight));
				this.plotHeight = D = Math.max(0, Math.round(w - t - this.marginBottom));
				this.plotSizeX = E ? D : v;
				this.plotSizeY = E ? v : D;
				this.plotBorderWidth = r.plotBorderWidth || 0;
				this.spacingBox = B.spacingBox = {
					x: y[3],
					y: y[0],
					width: C - y[3] - y[1],
					height: w - y[0] - y[2]
				};
				this.plotBox = B.plotBox = {
					x: k,
					y: t,
					width: v,
					height: D
				};
				u = 2 * Math.floor(this.plotBorderWidth / 2);
				E = Math.ceil(F(3));
				B = Math.ceil(F(0));
				this.clipBox = {
					x: E,
					y: B,
					width: Math.floor(this.plotSizeX - F(1) - E),
					height: Math.max(0, Math.floor(this.plotSizeY - F(2) - B))
				};
				G || an(this.axes, function(c) {
					c.setAxisSize();
					c.setAxisTranslation()
				})
			},
			resetMargins: function() {
				var d = this,
					c = d.options.chart;
				an(["margin", "spacing"], function(h) {
					var f = c[h],
						g = N(f) ? f : [f, f, f, f];
					an(["Top", "Right", "Bottom", "Left"], function(l, k) {
						d[h][k] = ab(c[h + l], g[k])
					})
				});
				an(ai, function(e, f) {
					d[e] = ab(d.margin[f], d.spacing[f])
				});
				d.axisOffset = [0, 0, 0, 0];
				d.clipOffset = []
			},
			drawChartBox: function() {
				var aB = this.options.chart,
					aA = this.renderer,
					az = this.chartWidth,
					ax = this.chartHeight,
					ay = this.chartBackground,
					P = this.plotBackground,
					H = this.plotBorder,
					Q, R = this.plotBGImage,
					O = aB.backgroundColor,
					G = aB.plotBackgroundColor,
					L = aB.plotBackgroundImage,
					J, t = this.plotLeft,
					K = this.plotTop,
					C = this.plotWidth,
					A = this.plotHeight,
					D = this.plotBox,
					E = this.clipRect,
					F = this.clipBox,
					u = "animate";
				ay || (this.chartBackground = ay = aA.rect().addClass("highcharts-background").add(), u = "attr");
				Q = aB.borderWidth || 0;
				J = Q + (aB.shadow ? 8 : 0);
				O = {
					fill: O || "none"
				};
				if (Q || ay["stroke-width"]) {
					O.stroke = aB.borderColor, O["stroke-width"] = Q
				}
				ay.attr(O).shadow(aB.shadow);
				ay[u]({
					x: J / 2,
					y: J / 2,
					width: az - J - Q % 2,
					height: ax - J - Q % 2,
					r: aB.borderRadius
				});
				u = "animate";
				P || (u = "attr", this.plotBackground = P = aA.rect().addClass("highcharts-plot-background").add());
				P[u](D);
				P.attr({
					fill: G || "none"
				}).shadow(aB.plotShadow);
				L && (R ? R.animate(D) : this.plotBGImage = aA.image(L, t, K, C, A).add());
				E ? E.animate({
					width: F.width,
					height: F.height
				}) : this.clipRect = aA.clipRect(F);
				u = "animate";
				H || (u = "attr", this.plotBorder = H = aA.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add());
				H.attr({
					stroke: aB.plotBorderColor,
					"stroke-width": aB.plotBorderWidth || 0,
					fill: "none"
				});
				H[u](H.crisp({
					x: t,
					y: K,
					width: C,
					height: A
				}, -H.strokeWidth()));
				this.isDirtyBox = !1
			},
			propFromSeries: function() {
				var g = this,
					f = g.options.chart,
					m, k = g.options.series,
					l, h;
				an(["inverted", "angular", "polar"], function(c) {
					m = ao[f.type || f.defaultSeriesType];
					h = f[c] || m && m.prototype[c];
					for (l = k && k.length; !h && l--;) {
						(m = ao[k[l].type]) && m.prototype[c] && (h = !0)
					}
					g[c] = h
				})
			},
			linkSeries: function() {
				var d = this,
					c = d.series;
				an(c, function(e) {
					e.linkedSeries.length = 0
				});
				an(c, function(f) {
					var g = f.options.linkedTo;
					au(g) && (g = ":previous" === g ? d.series[f.index - 1] : d.get(g)) && g.linkedParent !== f && (g.linkedSeries.push(f), f.linkedParent = g, f.visible = ab(f.options.visible, g.options.visible, f.visible))
				})
			},
			renderSeries: function() {
				an(this.series, function(c) {
					c.translate();
					c.render()
				})
			},
			renderLabels: function() {
				var d = this,
					e = d.options.labels;
				e.items && an(e.items, function(g) {
					var k = av(e.style, g.style),
						c = S(k.left) + d.plotLeft,
						f = S(k.top) + d.plotTop + 12;
					delete k.left;
					delete k.top;
					d.renderer.text(g.html, c, f).attr({
						zIndex: 2
					}).css(k).add()
				})
			},
			render: function() {
				var g = this.axes,
					f = this.renderer,
					n = this.options,
					l, m, k;
				this.setTitle();
				this.legend = new U(this, n.legend);
				this.getStacks && this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				n = this.plotWidth;
				l = this.plotHeight -= 21;
				an(g, function(c) {
					c.setScale()
				});
				this.getAxisMargins();
				m = 1.1 < n / this.plotWidth;
				k = 1.05 < l / this.plotHeight;
				if (m || k) {
					an(g, function(c) {
						(c.horiz && m || !c.horiz && k) && c.setTickInterval(!0)
					}), this.getMargins()
				}
				this.drawChartBox();
				this.hasCartesianSeries && an(g, function(c) {
					c.visible && c.render()
				});
				this.seriesGroup || (this.seriesGroup = f.g("series-group").attr({
					zIndex: 3
				}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.hasRendered = !0
			},
			addCredits: function(d) {
				var c = this;
				d = Z(!0, this.options.credits, d);
				d.enabled && !this.credits && (this.credits = this.renderer.text(d.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
					d.href && (s.location.href = d.href)
				}).attr({
					align: d.position.align,
					zIndex: 8
				}).css(d.style).add().align(d.position), this.credits.update = function(e) {
					c.credits = c.credits.destroy();
					c.addCredits(e)
				})
			},
			destroy: function() {
				var f = this,
					n = f.axes,
					l = f.series,
					m = f.container,
					g, k = m && m.parentNode;
				ae(f, "destroy");
				f.renderer.forExport ? aw.erase(ag, f) : ag[f.index] = void 0;
				aw.chartCount--;
				f.renderTo.removeAttribute("data-highcharts-chart");
				x(f);
				for (g = n.length; g--;) {
					n[g] = n[g].destroy()
				}
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (g = l.length; g--;) {
					l[g] = l[g].destroy()
				}
				an("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(d) {
					var e = f[d];
					e && e.destroy && (f[d] = e.destroy())
				});
				m && (m.innerHTML = "", x(m), k && af(m));
				M(f, function(d, e) {
					delete f[e]
				})
			},
			isReadyToRender: function() {
				var c = this;
				return o || s != s.top || "complete" === al.readyState ? !0 : (al.attachEvent("onreadystatechange", function() {
					al.detachEvent("onreadystatechange", c.firstRender);
					"complete" === al.readyState && c.firstRender()
				}), !1)
			},
			firstRender: function() {
				var d = this,
					c = d.options;
				if (d.isReadyToRender()) {
					d.getContainer();
					ae(d, "init");
					d.resetMargins();
					d.setChartSize();
					d.propFromSeries();
					d.getAxes();
					an(c.series || [], function(e) {
						d.initSeries(e)
					});
					d.linkSeries();
					ae(d, "beforeRender");
					aj && (d.pointer = new aj(d, c));
					d.render();
					if (!d.renderer.imgCount && d.onload) {
						d.onload()
					}
					d.temporaryDisplay(!0)
				}
			},
			onload: function() {
				an([this.callback].concat(this.callbacks), function(c) {
					c && void 0 !== this.index && c.apply(this, [this])
				}, this);
				ae(this, "load");
				ae(this, "render");
				at(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
				this.onload = null
			}
		})
	})(b);
	(function(j) {
		var d, e = j.each,
			o = j.extend,
			p = j.erase,
			g = j.fireEvent,
			i = j.format,
			h = j.isArray,
			c = j.isNumber,
			k = j.pick,
			n = j.removeEvent;
		j.Point = d = function() {};
		j.Point.prototype = {
			init: function(l, q, m) {
				this.series = l;
				this.color = l.color;
				this.applyOptions(q, m);
				l.options.colorByPoint ? (q = l.options.colors || l.chart.options.colors, this.color = this.color || q[l.colorCounter], q = q.length, m = l.colorCounter, l.colorCounter++, l.colorCounter === q && (l.colorCounter = 0)) : m = l.colorIndex;
				this.colorIndex = k(this.colorIndex, m);
				l.chart.pointCount++;
				return this
			},
			applyOptions: function(l, q) {
				var m = this.series,
					f = m.options.pointValKey || m.pointValKey;
				l = d.prototype.optionsToObject.call(this, l);
				o(this, l);
				this.options = this.options ? o(this.options, l) : l;
				l.group && delete this.group;
				f && (this.y = this[f]);
				this.isNull = k(this.isValid && !this.isValid(), null === this.x || !c(this.y, !0));
				this.selected && (this.state = "select");
				"name" in this && void 0 === q && m.xAxis && m.xAxis.hasNames && (this.x = m.xAxis.nameToX(this));
				void 0 === this.x && m && (this.x = void 0 === q ? m.autoIncrement(this) : q);
				return this
			},
			optionsToObject: function(r) {
				var v = {},
					s = this.series,
					q = s.options.keys,
					u = q || s.pointArrayMap || ["y"],
					t = u.length,
					l = 0,
					w = 0;
				if (c(r) || null === r) {
					v[u[0]] = r
				} else {
					if (h(r)) {
						for (!q && r.length > t && (s = typeof r[0], "string" === s ? v.name = r[0] : "number" === s && (v.x = r[0]), l++); w < t;) {
							q && void 0 === r[l] || (v[u[w]] = r[l]), l++, w++
						}
					} else {
						"object" === typeof r && (v = r, r.dataLabels && (s._hasPointLabels = !0), r.marker && (s._hasPointMarkers = !0))
					}
				}
				return v
			},
			getClassName: function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
			},
			getZone: function() {
				var m = this.series,
					r = m.zones,
					m = m.zoneAxis || "y",
					q = 0,
					l;
				for (l = r[q]; this[m] >= l.value;) {
					l = r[++q]
				}
				l && l.color && !this.options.color && (this.color = l.color);
				return l
			},
			destroy: function() {
				var l = this.series.chart,
					q = l.hoverPoints,
					m;
				l.pointCount--;
				q && (this.setState(), p(q, this), q.length || (l.hoverPoints = null));
				if (this === l.hoverPoint) {
					this.onMouseOut()
				}
				if (this.graphic || this.dataLabel) {
					n(this), this.destroyElements()
				}
				this.legendItem && l.legend.destroyItem(this);
				for (m in this) {
					this[m] = null
				}
			},
			destroyElements: function() {
				for (var l = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], q, m = 6; m--;) {
					q = l[m], this[q] && (this[q] = this[q].destroy())
				}
			},
			getLabelConfig: function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function(q) {
				var t = this.series,
					r = t.tooltipOptions,
					f = k(r.valueDecimals, ""),
					s = r.valuePrefix || "",
					m = r.valueSuffix || "";
				e(t.pointArrayMap || ["y"], function(l) {
					l = "{point." + l;
					if (s || m) {
						q = q.replace(l + "}", s + l + "}" + m)
					}
					q = q.replace(l + "}", l + ":,." + f + "f}")
				});
				return i(q, {
					point: this,
					series: this.series
				})
			},
			firePointEvent: function(m, s, q) {
				var l = this,
					r = this.series.options;
				(r.point.events[m] || l.options && l.options.events && l.options.events[m]) && this.importEvents();
				"click" === m && r.allowPointSelect && (q = function(f) {
					l.select && l.select(null, f.ctrlKey || f.metaKey || f.shiftKey)
				});
				g(this, m, s, q)
			},
			visible: !0
		}
	})(b);
	(function(Z) {
		var I = Z.addEvent,
			O = Z.animObject,
			s = Z.arrayMax,
			x = Z.arrayMin,
			Q = Z.correctFloat,
			U = Z.Date,
			R = Z.defaultOptions,
			L = Z.defaultPlotOptions,
			w = Z.defined,
			z = Z.each,
			T = Z.erase,
			W = Z.extend,
			S = Z.fireEvent,
			Y = Z.grep,
			V = Z.isArray,
			p = Z.isNumber,
			j = Z.isString,
			P = Z.merge,
			H = Z.objectEach,
			i = Z.pick,
			X = Z.removeEvent,
			o = Z.splat,
			N = Z.SVGElement,
			M = Z.syncTimeout,
			h = Z.win;
		Z.Series = Z.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: {
				duration: 1000
			},
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				radius: 4,
				states: {
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				align: "center",
				formatter: function() {
					return null === this.y ? "" : Z.numberFormat(this.y, -1)
				},
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				padding: 5
			},
			cropThreshold: 300,
			pointRange: 0,
			softThreshold: !0,
			states: {
				hover: {
					animation: {
						duration: 50
					},
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: 0.25
					}
				},
				select: {
					marker: {}
				}
			},
			stickyTracking: !0,
			turboThreshold: 1000,
			findNearestPointBy: "x"
		}, {
			isCartesian: !0,
			pointClass: Z.Point,
			sorted: !0,
			requireSorting: !0,
			directTouch: !1,
			axisTypes: ["xAxis", "yAxis"],
			colorCounter: 0,
			parallelArrays: ["x", "y"],
			coll: "series",
			init: function(f, d) {
				var m = this,
					l, g = f.series,
					k;
				m.chart = f;
				m.options = d = m.setOptions(d);
				m.linkedSeries = [];
				m.bindAxes();
				W(m, {
					name: d.name,
					state: "",
					visible: !1 !== d.visible,
					selected: !0 === d.selected
				});
				l = d.events;
				H(l, function(e, c) {
					I(m, c, e)
				});
				if (l && l.click || d.point && d.point.events && d.point.events.click || d.allowPointSelect) {
					f.runTrackerClick = !0
				}
				m.getColor();
				m.getSymbol();
				z(m.parallelArrays, function(c) {
					m[c + "Data"] = []
				});
				m.setData(d.data, !1);
				m.isCartesian && (f.hasCartesianSeries = !0);
				g.length && (k = g[g.length - 1]);
				m._i = i(k && k._i, -1) + 1;
				f.orderSeries(this.insert(g))
			},
			insert: function(e) {
				var d = this.options.index,
					f;
				if (p(d)) {
					for (f = e.length; f--;) {
						if (d >= i(e[f].options.index, e[f]._i)) {
							e.splice(f + 1, 0, this);
							break
						}
					} - 1 === f && e.unshift(this);
					f += 1
				} else {
					e.push(this)
				}
				return i(f, e.length - 1)
			},
			bindAxes: function() {
				var f = this,
					l = f.options,
					g = f.chart,
					k;
				z(f.axisTypes || [], function(c) {
					z(g[c], function(d) {
						k = d.options;
						if (l[c] === k.index || void 0 !== l[c] && l[c] === k.id || void 0 === l[c] && 0 === k.index) {
							f.insert(d.series), f[c] = d, d.isDirty = !0
						}
					});
					f[c] || f.optionalAxis === c || Z.error(18, !0)
				})
			},
			updateParallelArrays: function(g, f) {
				var m = g.series,
					k = arguments,
					l = p(f) ? function(c) {
						var n = "y" === c && m.toYData ? m.toYData(g) : g[c];
						m[c + "Data"][f] = n
					} : function(c) {
						Array.prototype[f].apply(m[c + "Data"], Array.prototype.slice.call(k, 2))
					};
				z(m.parallelArrays, l)
			},
			autoIncrement: function() {
				var f = this.options,
					d = this.xIncrement,
					k, g = f.pointIntervalUnit,
					d = i(d, f.pointStart, 0);
				this.pointInterval = k = i(this.pointInterval, f.pointInterval, 1);
				g && (f = new U(d), "day" === g ? f = +f[U.hcSetDate](f[U.hcGetDate]() + k) : "month" === g ? f = +f[U.hcSetMonth](f[U.hcGetMonth]() + k) : "year" === g && (f = +f[U.hcSetFullYear](f[U.hcGetFullYear]() + k)), k = f - d);
				this.xIncrement = d + k;
				return d
			},
			setOptions: function(g) {
				var f = this.chart,
					n = f.options,
					l = n.plotOptions,
					m = (f.userOptions || {}).plotOptions || {},
					k = l[this.type];
				this.userOptions = g;
				f = P(k, l.series, g);
				this.tooltipOptions = P(R.tooltip, R.plotOptions.series && R.plotOptions.series.tooltip, R.plotOptions[this.type].tooltip, n.tooltip.userOptions, l.series && l.series.tooltip, l[this.type].tooltip, g.tooltip);
				this.stickyTracking = i(g.stickyTracking, m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking);
				null === k.marker && delete f.marker;
				this.zoneAxis = f.zoneAxis;
				g = this.zones = (f.zones || []).slice();
				!f.negativeColor && !f.negativeFillColor || f.zones || g.push({
					value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
					className: "highcharts-negative",
					color: f.negativeColor,
					fillColor: f.negativeFillColor
				});
				g.length && w(g[g.length - 1].value) && g.push({
					color: this.color,
					fillColor: this.fillColor
				});
				return f
			},
			getCyclic: function(y, v, u) {
				var r, t = this.chart,
					l = this.userOptions,
					q = y + "Index",
					n = y + "Counter",
					m = u ? u.length : i(t.options.chart[y + "Count"], t[y + "Count"]);
				v || (r = i(l[q], l["_" + q]), w(r) || (t.series.length || (t[n] = 0), l["_" + q] = r = t[n] % m, t[n] += 1), u && (v = u[r]));
				void 0 !== r && (this[q] = r);
				this[y] = v
			},
			getColor: function() {
				this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || L[this.type].color, this.chart.options.colors)
			},
			getSymbol: function() {
				this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
			},
			drawLegendSymbol: Z.LegendSymbolMixin.drawLineMarker,
			setData: function(ab, aa, J, G) {
				var E = this,
					v = E.points,
					F = v && v.length || 0,
					D, t = E.options,
					C = E.chart,
					y = null,
					A = E.xAxis,
					K = t.turboThreshold,
					e = this.xData,
					u = this.yData,
					ac = (D = E.pointArrayMap) && D.length;
				ab = ab || [];
				D = ab.length;
				aa = i(aa, !0);
				if (!1 !== G && D && F === D && !E.cropped && !E.hasGroupedData && E.visible) {
					z(ab, function(d, c) {
						v[c].update && d !== t.data[c] && v[c].update(d, !1, null, !1)
					})
				} else {
					E.xIncrement = null;
					E.colorCounter = 0;
					z(this.parallelArrays, function(c) {
						E[c + "Data"].length = 0
					});
					if (K && D > K) {
						for (J = 0; null === y && J < D;) {
							y = ab[J], J++
						}
						if (p(y)) {
							for (J = 0; J < D; J++) {
								e[J] = this.autoIncrement(), u[J] = ab[J]
							}
						} else {
							if (V(y)) {
								if (ac) {
									for (J = 0; J < D; J++) {
										y = ab[J], e[J] = y[0], u[J] = y.slice(1, ac + 1)
									}
								} else {
									for (J = 0; J < D; J++) {
										y = ab[J], e[J] = y[0], u[J] = y[1]
									}
								}
							} else {
								Z.error(12)
							}
						}
					} else {
						for (J = 0; J < D; J++) {
							void 0 !== ab[J] && (y = {
								series: E
							}, E.pointClass.prototype.applyOptions.apply(y, [ab[J]]), E.updateParallelArrays(y, J))
						}
					}
					j(u[0]) && Z.error(14, !0);
					E.data = [];
					E.options.data = E.userOptions.data = ab;
					for (J = F; J--;) {
						v[J] && v[J].destroy && v[J].destroy()
					}
					A && (A.minRange = A.userMinRange);
					E.isDirty = C.isDirtyBox = !0;
					E.isDirtyData = !!v;
					J = !1
				}
				"point" === t.legendType && (this.processData(), this.generatePoints());
				aa && C.redraw(J)
			},
			processData: function(ab) {
				var aa = this.xData,
					J = this.yData,
					K = aa.length,
					E;
				E = 0;
				var y, G, F = this.xAxis,
					D, u = this.options;
				D = u.cropThreshold;
				var A = this.getExtremesFromAll || u.getExtremesFromAll,
					C = this.isCartesian,
					u = F && F.val2lin,
					B = F && F.isLog,
					ac, t;
				if (C && !this.isDirty && !F.isDirty && !this.yAxis.isDirty && !ab) {
					return !1
				}
				F && (ab = F.getExtremes(), ac = ab.min, t = ab.max);
				if (C && this.sorted && !A && (!D || K > D || this.forceCrop)) {
					if (aa[K - 1] < ac || aa[0] > t) {
						aa = [], J = []
					} else {
						if (aa[0] < ac || aa[K - 1] > t) {
							E = this.cropData(this.xData, this.yData, ac, t), aa = E.xData, J = E.yData, E = E.start, y = !0
						}
					}
				}
				for (D = aa.length || 1; --D;) {
					K = B ? u(aa[D]) - u(aa[D - 1]) : aa[D] - aa[D - 1], 0 < K && (void 0 === G || K < G) ? G = K : 0 > K && this.requireSorting && Z.error(15)
				}
				this.cropped = y;
				this.cropStart = E;
				this.processedXData = aa;
				this.processedYData = J;
				this.closestPointRange = G
			},
			cropData: function(y, v, u, r) {
				var t = y.length,
					l = 0,
					n = t,
					q = i(this.cropShoulder, 1),
					m;
				for (m = 0; m < t; m++) {
					if (y[m] >= u) {
						l = Math.max(0, m - q);
						break
					}
				}
				for (u = m; u < t; u++) {
					if (y[u] > r) {
						n = u + q;
						break
					}
				}
				return {
					xData: y.slice(l, n),
					yData: v.slice(l, n),
					start: l,
					end: n
				}
			},
			generatePoints: function() {
				var aa = this.options,
					K = aa.data,
					J = this.data,
					F, G = this.processedXData,
					D = this.processedYData,
					E = this.pointClass,
					C = G.length,
					u = this.cropStart || 0,
					y, B = this.hasGroupedData,
					aa = aa.keys,
					A, ab = [],
					t;
				J || B || (J = [], J.length = K.length, J = this.data = J);
				aa && B && (this.options.keys = !1);
				for (t = 0; t < C; t++) {
					y = u + t, B ? (A = (new E).init(this, [G[t]].concat(o(D[t]))), A.dataGroup = this.groupMap[t]) : (A = J[y]) || void 0 === K[y] || (J[y] = A = (new E).init(this, K[y], G[t])), A && (A.index = y, ab[t] = A)
				}
				this.options.keys = aa;
				if (J && (C !== (F = J.length) || B)) {
					for (t = 0; t < F; t++) {
						t !== u || B || (t += C), J[t] && (J[t].destroyElements(), J[t].plotX = void 0)
					}
				}
				this.data = J;
				this.points = ab
			},
			getExtremes: function(E) {
				var D = this.yAxis,
					C = this.processedXData,
					B, v = [],
					m = 0;
				B = this.xAxis.getExtremes();
				var y = B.min,
					A = B.max,
					u, e, r, t;
				E = E || this.stackedYData || this.processedYData || [];
				B = E.length;
				for (t = 0; t < B; t++) {
					if (e = C[t], r = E[t], u = (p(r, !0) || V(r)) && (!D.positiveValuesOnly || r.length || 0 < r), e = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (C[t] || e) >= y && (C[t] || e) <= A, u && e) {
						if (u = r.length) {
							for (; u--;) {
								null !== r[u] && (v[m++] = r[u])
							}
						} else {
							v[m++] = r
						}
					}
				}
				this.dataMin = x(v);
				this.dataMax = s(v)
			},
			translate: function() {
				this.processedXData || this.processData();
				this.generatePoints();
				var ar = this.options,
					aq = ar.stacking,
					ap = this.xAxis,
					an = ap.categories,
					ao = this.yAxis,
					al = this.points,
					am = al.length,
					ak = !!this.modifyValue,
					ag = ar.pointPlacement,
					ai = "between" === ag || p(ag),
					aj = ar.threshold,
					ae = ar.startFromThreshold ? aj : 0,
					af, u, ab, v, ac = Number.MAX_VALUE;
				"between" === ag && (ag = 0.5);
				p(ag) && (ag *= i(ar.pointRange || ap.pointRange));
				for (ar = 0; ar < am; ar++) {
					var m = al[ar],
						ah = m.x,
						ad = m.y;
					u = m.low;
					var aa = aq && ao.stacks[(this.negStacks && ad < (ae ? 0 : aj) ? "-" : "") + this.stackKey],
						J;
					ao.positiveValuesOnly && null !== ad && 0 >= ad && (m.isNull = !0);
					m.plotX = af = Q(Math.min(Math.max(-100000, ap.translate(ah, 0, 0, 0, 1, ag, "flags" === this.type)), 100000));
					aq && this.visible && !m.isNull && aa && aa[ah] && (v = this.getStackIndicator(v, ah, this.index), J = aa[ah], ad = J.points[v.key], u = ad[0], ad = ad[1], u === ae && v.key === aa[ah].base && (u = i(aj, ao.min)), ao.positiveValuesOnly && 0 >= u && (u = null), m.total = m.stackTotal = J.total, m.percentage = J.total && m.y / J.total * 100, m.stackY = ad, J.setOffset(this.pointXOffset || 0, this.barW || 0));
					m.yBottom = w(u) ? ao.translate(u, 0, 1, 0, 1) : null;
					ak && (ad = this.modifyValue(ad, m));
					m.plotY = u = "number" === typeof ad && Infinity !== ad ? Math.min(Math.max(-100000, ao.translate(ad, 0, 1, 0, 1)), 100000) : void 0;
					m.isInside = void 0 !== u && 0 <= u && u <= ao.len && 0 <= af && af <= ap.len;
					m.clientX = ai ? Q(ap.translate(ah, 0, 0, 0, 1, ag)) : af;
					m.negative = m.y < (aj || 0);
					m.category = an && void 0 !== an[m.x] ? an[m.x] : m.x;
					m.isNull || (void 0 !== ab && (ac = Math.min(ac, Math.abs(af - ab))), ab = af);
					m.zone = this.zones.length && m.getZone()
				}
				this.closestPointRangePx = ac
			},
			getValidPoints: function(d, g) {
				var f = this.chart;
				return Y(d || this.points || [], function(c) {
					return g && !f.isInsidePlot(c.plotX, c.plotY, f.inverted) ? !1 : !c.isNull
				})
			},
			setClip: function(B) {
				var A = this.chart,
					y = this.options,
					u = A.renderer,
					v = A.inverted,
					m = this.clipBox,
					r = m || A.clipBox,
					t = this.sharedClipKey || ["_sharedClip", B && B.duration, B && B.easing, r.height, y.xAxis, y.yAxis].join(),
					n = A[t],
					l = A[t + "m"];
				n || (B && (r.width = 0, A[t + "m"] = l = u.clipRect(-99, v ? -A.plotLeft : -A.plotTop, 99, v ? A.chartWidth : A.chartHeight)), A[t] = n = u.clipRect(r), n.count = {
					length: 0
				});
				B && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
				!1 !== y.clip && (this.group.clip(B || m ? n : A.clipRect), this.markerGroup.clip(l), this.sharedClipKey = t);
				B || (n.count[this.index] && (delete n.count[this.index], --n.count.length), 0 === n.count.length && t && A[t] && (m || (A[t] = A[t].destroy()), A[t + "m"] && (A[t + "m"] = A[t + "m"].destroy())))
			},
			animate: function(f) {
				var d = this.chart,
					k = O(this.options.animation),
					g;
				f ? this.setClip(k) : (g = this.sharedClipKey, (f = d[g]) && f.animate({
					width: d.plotSizeX
				}, k), d[g + "m"] && d[g + "m"].animate({
					width: d.plotSizeX + 99
				}, k), this.animate = null)
			},
			afterAnimate: function() {
				this.setClip();
				S(this, "afterAnimate");
				this.finishedAnimating = !0
			},
			drawPoints: function() {
				var K = this.points,
					J = this.chart,
					G, E, F, D, C = this.options.marker,
					B, u, v, A, y = this[this.specialGroup] || this.markerGroup,
					t = i(C.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * C.radius);
				if (!1 !== C.enabled || this._hasPointMarkers) {
					for (E = 0; E < K.length; E++) {
						F = K[E], G = F.plotY, D = F.graphic, B = F.marker || {}, u = !!F.marker, v = t && void 0 === B.enabled || B.enabled, A = F.isInside, v && p(G) && null !== F.y ? (G = i(B.symbol, this.symbol), F.hasImage = 0 === G.indexOf("url"), v = this.markerAttribs(F, F.selected && "select"), D ? D[A ? "show" : "hide"](!0).animate(v) : A && (0 < v.width || F.hasImage) && (F.graphic = D = J.renderer.symbol(G, v.x, v.y, v.width, v.height, u ? B : C).add(y)), D && D.attr(this.pointAttribs(F, F.selected && "select")), D && D.addClass(F.getClassName(), !0)) : D && (F.graphic = D.destroy())
					}
				}
			},
			markerAttribs: function(g, f) {
				var m = this.options.marker,
					k = g.marker || {},
					l = i(k.radius, m.radius);
				f && (m = m.states[f], f = k.states && k.states[f], l = i(f && f.radius, m && m.radius, l + (m && m.radiusPlus || 0)));
				g.hasImage && (l = 0);
				g = {
					x: Math.floor(g.plotX) - l,
					y: g.plotY - l
				};
				l && (g.width = g.height = 2 * l);
				return g
			},
			pointAttribs: function(l, k) {
				var u = this.options.marker,
					r = l && l.options,
					t = r && r.marker || {},
					n = this.color,
					m = r && r.color,
					q = l && l.color,
					r = i(t.lineWidth, u.lineWidth);
				l = l && l.zone && l.zone.color;
				n = m || l || q || n;
				l = t.fillColor || u.fillColor || n;
				n = t.lineColor || u.lineColor || n;
				k && (u = u.states[k], k = t.states && t.states[k] || {}, r = i(k.lineWidth, u.lineWidth, r + i(k.lineWidthPlus, u.lineWidthPlus, 0)), l = k.fillColor || u.fillColor || l, n = k.lineColor || u.lineColor || n);
				return {
					stroke: n,
					"stroke-width": r,
					fill: l
				}
			},
			destroy: function() {
				var k = this,
					c = k.chart,
					r = /AppleWebKit\/533/.test(h.navigator.userAgent),
					t, m, q = k.data || [],
					u, g;
				S(k, "destroy");
				X(k);
				z(k.axisTypes || [], function(d) {
					(g = k[d]) && g.series && (T(g.series, k), g.isDirty = g.forceRedraw = !0)
				});
				k.legendItem && k.chart.legend.destroyItem(k);
				for (m = q.length; m--;) {
					(u = q[m]) && u.destroy && u.destroy()
				}
				k.points = null;
				clearTimeout(k.animationTimeout);
				H(k, function(e, d) {
					e instanceof N && !e.survive && (t = r && "group" === d ? "hide" : "destroy", e[t]())
				});
				c.hoverSeries === k && (c.hoverSeries = null);
				T(c.series, k);
				c.orderSeries();
				H(k, function(d, e) {
					delete k[e]
				})
			},
			getGraphPath: function(B, A, y) {
				var u = this,
					v = u.options,
					t = v.step,
					r, m = [],
					n = [],
					l;
				B = B || u.points;
				(r = B.reversed) && B.reverse();
				(t = {
					right: 1,
					center: 2
				}[t] || t && 3) && r && (t = 4 - t);
				!v.connectNulls || A || y || (B = this.getValidPoints(B));
				z(B, function(e, f) {
					var k = e.plotX,
						d = e.plotY,
						c = B[f - 1];
					(e.leftCliff || c && c.rightCliff) && !y && (l = !0);
					e.isNull && !w(A) && 0 < f ? l = !v.connectNulls : e.isNull && !A ? l = !0 : (0 === f || l ? f = ["M", e.plotX, e.plotY] : u.getPointSpline ? f = u.getPointSpline(B, e, f) : t ? (f = 1 === t ? ["L", c.plotX, d] : 2 === t ? ["L", (c.plotX + k) / 2, c.plotY, "L", (c.plotX + k) / 2, d] : ["L", k, c.plotY], f.push("L", k, d)) : f = ["L", k, d], n.push(e.x), t && n.push(e.x), m.push.apply(m, f), l = !1)
				});
				m.xMap = n;
				return u.graphPath = m
			},
			drawGraph: function() {
				var f = this,
					d = this.options,
					k = (this.gappedPath || this.getGraphPath).call(this),
					g = [
						["graph", "highcharts-graph", d.lineColor || this.color, d.dashStyle]
					];
				z(this.zones, function(l, e) {
					g.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (l.className || ""), l.color || f.color, l.dashStyle || d.dashStyle])
				});
				z(g, function(m, n) {
					var c = m[0],
						l = f[c];
					l ? (l.endX = k.xMap, l.animate({
						d: k
					})) : k.length && (f[c] = f.chart.renderer.path(k).addClass(m[1]).attr({
						zIndex: 1
					}).add(f.group), l = {
						stroke: m[2],
						"stroke-width": d.lineWidth,
						fill: f.fillGraph && f.color || "none"
					}, m[3] ? l.dashstyle = m[3] : "square" !== d.linecap && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), l = f[c].attr(l).shadow(2 > n && d.shadow));
					l && (l.startX = k.xMap, l.isArea = k.isArea)
				})
			},
			applyZones: function() {
				var an = this,
					am = this.chart,
					al = am.renderer,
					aj = this.zones,
					ak, ai, ah = this.clips || [],
					ag, ac = this.graph,
					ad = this.area,
					af = Math.max(am.chartWidth, am.chartHeight),
					ae = this[(this.zoneAxis || "y") + "Axis"],
					aa, E, ab = am.inverted,
					A, F, C, J, t = !1;
				aj.length && (ac || ad) && ae && void 0 !== ae.min && (E = ae.reversed, A = ae.horiz, ac && ac.hide(), ad && ad.hide(), aa = ae.getExtremes(), z(aj, function(d, c) {
					ak = E ? A ? am.plotWidth : 0 : A ? 0 : ae.toPixels(aa.min);
					ak = Math.min(Math.max(i(ai, ak), 0), af);
					ai = Math.min(Math.max(Math.round(ae.toPixels(i(d.value, aa.max), !0)), 0), af);
					t && (ak = ai = ae.toPixels(aa.max));
					F = Math.abs(ak - ai);
					C = Math.min(ak, ai);
					J = Math.max(ak, ai);
					ae.isXAxis ? (ag = {
						x: ab ? J : C,
						y: 0,
						width: F,
						height: af
					}, A || (ag.x = am.plotHeight - ag.x)) : (ag = {
						x: 0,
						y: ab ? J : C,
						width: af,
						height: F
					}, A && (ag.y = am.plotWidth - ag.y));
					ab && al.isVML && (ag = ae.isXAxis ? {
						x: 0,
						y: E ? C : J,
						height: ag.width,
						width: am.chartWidth
					} : {
						x: ag.y - am.plotLeft - am.spacingBox.x,
						y: 0,
						width: ag.height,
						height: am.chartHeight
					});
					ah[c] ? ah[c].animate(ag) : (ah[c] = al.clipRect(ag), ac && an["zone-graph-" + c].clip(ah[c]), ad && an["zone-area-" + c].clip(ah[c]));
					t = d.value > aa.max
				}), this.clips = ah)
			},
			invertGroups: function(g) {
				function f() {
					z(["group", "markerGroup"], function(c) {
						m[c] && (k.renderer.isVML && m[c].attr({
							width: m.yAxis.len,
							height: m.xAxis.len
						}), m[c].width = m.yAxis.len, m[c].height = m.xAxis.len, m[c].invert(g))
					})
				}
				var m = this,
					k = m.chart,
					l;
				m.xAxis && (l = I(k, "resize", f), I(m, "destroy", l), f(g), m.invertGroups = f)
			},
			plotGroup: function(k, g, r, n, q) {
				var l = this[k],
					m = !l;
				m && (this[k] = l = this.chart.renderer.g().attr({
					zIndex: n || 0.1
				}).add(q));
				l.addClass("highcharts-" + g + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);
				l.attr({
					visibility: r
				})[m ? "attr" : "animate"](this.getPlotBox());
				return l
			},
			getPlotBox: function() {
				var e = this.chart,
					d = this.xAxis,
					f = this.yAxis;
				e.inverted && (d = f, f = this.xAxis);
				return {
					translateX: d ? d.left : e.plotLeft,
					translateY: f ? f.top : e.plotTop,
					scaleX: 1,
					scaleY: 1
				}
			},
			render: function() {
				var C = this,
					B = C.chart,
					A, v = C.options,
					y = !!C.animate && B.renderer.isSVG && O(v.animation).duration,
					u = C.visible ? "inherit" : "hidden",
					t = v.zIndex,
					r = C.hasRendered,
					l = B.seriesGroup,
					m = B.inverted;
				A = C.plotGroup("group", "series", u, t, l);
				C.markerGroup = C.plotGroup("markerGroup", "markers", u, t, l);
				y && C.animate(!0);
				A.inverted = C.isCartesian ? m : !1;
				C.drawGraph && (C.drawGraph(), C.applyZones());
				C.drawDataLabels && C.drawDataLabels();
				C.visible && C.drawPoints();
				C.drawTracker && !1 !== C.options.enableMouseTracking && C.drawTracker();
				C.invertGroups(m);
				!1 === v.clip || C.sharedClipKey || r || A.clip(B.clipRect);
				y && C.animate();
				r || (C.animationTimeout = M(function() {
					C.afterAnimate()
				}, y));
				C.isDirty = !1;
				C.hasRendered = !0
			},
			redraw: function() {
				var g = this.chart,
					f = this.isDirty || this.isDirtyData,
					m = this.group,
					k = this.xAxis,
					l = this.yAxis;
				m && (g.inverted && m.attr({
					width: g.plotWidth,
					height: g.plotHeight
				}), m.animate({
					translateX: i(k && k.left, g.plotLeft),
					translateY: i(l && l.top, g.plotTop)
				}));
				this.translate();
				this.render();
				f && delete this.kdTree
			},
			kdAxisArray: ["clientX", "plotY"],
			searchPoint: function(g, f) {
				var m = this.xAxis,
					k = this.yAxis,
					l = this.chart.inverted;
				return this.searchKDTree({
					clientX: l ? m.len - g.chartY + m.pos : g.chartX - m.pos,
					plotY: l ? k.len - g.chartX + k.pos : g.chartY - k.pos
				}, f)
			},
			buildKDTree: function() {
				function e(n, l, m) {
					var g, k;
					if (k = n && n.length) {
						return g = d.kdAxisArray[l % m], n.sort(function(q, c) {
							return q[g] - c[g]
						}), k = Math.floor(k / 2), {
							point: n[k],
							left: e(n.slice(0, k), l + 1, m),
							right: e(n.slice(k + 1), l + 1, m)
						}
					}
				}
				this.buildingKdTree = !0;
				var d = this,
					f = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete d.kdTree;
				M(function() {
					d.kdTree = e(d.getValidPoints(null, !d.directTouch), f, f);
					d.buildingKdTree = !1
				}, d.options.kdNow ? 0 : 1)
			},
			searchKDTree: function(l, k) {
				function t(A, y, v, u) {
					var d = y.point,
						c = q.kdAxisArray[v % u],
						e, g, f = d;
					g = w(A[r]) && w(d[r]) ? Math.pow(A[r] - d[r], 2) : null;
					e = w(A[n]) && w(d[n]) ? Math.pow(A[n] - d[n], 2) : null;
					e = (g || 0) + (e || 0);
					d.dist = w(e) ? Math.sqrt(e) : Number.MAX_VALUE;
					d.distX = w(g) ? Math.sqrt(g) : Number.MAX_VALUE;
					c = A[c] - d[c];
					e = 0 > c ? "left" : "right";
					g = 0 > c ? "right" : "left";
					y[e] && (e = t(A, y[e], v + 1, u), f = e[m] < f[m] ? e : d);
					y[g] && Math.sqrt(c * c) < f[m] && (A = t(A, y[g], v + 1, u), f = A[m] < f[m] ? A : f);
					return f
				}
				var q = this,
					r = this.kdAxisArray[0],
					n = this.kdAxisArray[1],
					m = k ? "distX" : "dist";
				k = -1 < q.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				this.kdTree || this.buildingKdTree || this.buildKDTree();
				if (this.kdTree) {
					return t(l, this.kdTree, k, k)
				}
			}
		})
	})(b);
	(function(j) {
		var d = j.Axis,
			e = j.Chart,
			o = j.correctFloat,
			p = j.defined,
			g = j.destroyObjectProperties,
			i = j.each,
			h = j.format,
			c = j.objectEach,
			k = j.pick,
			n = j.Series;
		j.StackItem = function(m, t, r, l, s) {
			var q = m.chart.inverted;
			this.axis = m;
			this.isNegative = r;
			this.options = t;
			this.x = l;
			this.total = null;
			this.points = {};
			this.stack = s;
			this.rightCliff = this.leftCliff = 0;
			this.alignOptions = {
				align: t.align || (q ? r ? "left" : "right" : "center"),
				verticalAlign: t.verticalAlign || (q ? "middle" : r ? "bottom" : "top"),
				y: k(t.y, q ? 4 : r ? 14 : -6),
				x: k(t.x, q ? r ? -6 : 6 : 0)
			};
			this.textAlign = t.textAlign || (q ? r ? "right" : "left" : "center")
		};
		j.StackItem.prototype = {
			destroy: function() {
				g(this, this.axis)
			},
			render: function(l) {
				var q = this.options,
					m = q.format,
					m = m ? h(m, this) : q.formatter.call(this);
				this.label ? this.label.attr({
					text: m,
					visibility: "hidden"
				}) : this.label = this.axis.chart.renderer.text(m, null, null, q.useHTML).css(q.style).attr({
					align: this.textAlign,
					rotation: q.rotation,
					visibility: "hidden"
				}).add(l)
			},
			setOffset: function(m, s) {
				var q = this.axis,
					l = q.chart,
					r = q.translate(q.usePercentage ? 100 : this.total, 0, 0, 0, 1),
					q = q.translate(0),
					q = Math.abs(r - q);
				m = l.xAxis[0].translate(this.x) + m;
				r = this.getStackBox(l, this, m, r, s, q);
				if (s = this.label) {
					s.align(this.alignOptions, null, r), r = s.alignAttr, s[!1 === this.options.crop || l.isInsidePlot(r.x, r.y) ? "show" : "hide"](!0)
				}
			},
			getStackBox: function(r, w, u, m, v, q) {
				var t = w.axis.reversed,
					s = r.inverted;
				r = r.plotHeight;
				w = w.isNegative && !t || !w.isNegative && t;
				return {
					x: s ? w ? m : m - q : u,
					y: s ? r - u - v : w ? r - m - q : r - m,
					width: s ? q : v,
					height: s ? v : q
				}
			}
		};
		e.prototype.getStacks = function() {
			var f = this;
			i(f.yAxis, function(l) {
				l.stacks && l.hasVisibleSeries && (l.oldStacks = l.stacks)
			});
			i(f.series, function(l) {
				!l.options.stacking || !0 !== l.visible && !1 !== f.options.chart.ignoreHiddenSeries || (l.stackKey = l.type + k(l.options.stack, ""))
			})
		};
		d.prototype.buildStacks = function() {
			var m = this.series,
				r = k(this.options.reversedStacks, !0),
				q = m.length,
				l;
			if (!this.isXAxis) {
				this.usePercentage = !1;
				for (l = q; l--;) {
					m[r ? l : q - l - 1].setStackedPoints()
				}
				if (this.usePercentage) {
					for (l = 0; l < q; l++) {
						m[l].setPercentStacks()
					}
				}
			}
		};
		d.prototype.renderStackTotals = function() {
			var m = this.chart,
				r = m.renderer,
				q = this.stacks,
				l = this.stackTotalGroup;
			l || (this.stackTotalGroup = l = r.g("stack-labels").attr({
				visibility: "visible",
				zIndex: 6
			}).add());
			l.translate(m.plotLeft, m.plotTop);
			c(q, function(f) {
				c(f, function(s) {
					s.render(l)
				})
			})
		};
		d.prototype.resetStacks = function() {
			var f = this,
				l = f.stacks;
			f.isXAxis || c(l, function(m) {
				c(m, function(q, r) {
					q.touched < f.stacksTouched ? (q.destroy(), delete m[r]) : (q.total = null, q.cum = null)
				})
			})
		};
		d.prototype.cleanStacks = function() {
			var f;
			this.isXAxis || (this.oldStacks && (f = this.stacks = this.oldStacks), c(f, function(l) {
				c(l, function(m) {
					m.cum = m.total
				})
			}))
		};
		n.prototype.setStackedPoints = function() {
			if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var Q = this.processedXData,
					S = this.processedYData,
					O = [],
					U = S.length,
					R = this.options,
					N = R.threshold,
					M = R.startFromThreshold ? N : 0,
					L = R.stack,
					R = R.stacking,
					D = this.stackKey,
					C = "-" + D,
					T = this.negStacks,
					y = this.yAxis,
					F = y.stacks,
					E = y.oldStacks,
					s, J, u, v, H, P, x;
				y.stacksTouched += 1;
				for (H = 0; H < U; H++) {
					P = Q[H], x = S[H], s = this.getStackIndicator(s, P, this.index), v = s.key, u = (J = T && x < (M ? 0 : N)) ? C : D, F[u] || (F[u] = {}), F[u][P] || (E[u] && E[u][P] ? (F[u][P] = E[u][P], F[u][P].total = null) : F[u][P] = new j.StackItem(y, y.options.stackLabels, J, P, L)), u = F[u][P], null !== x && (u.points[v] = u.points[this.index] = [k(u.cum, M)], p(u.cum) || (u.base = v), u.touched = y.stacksTouched, 0 < s.index && !1 === this.singleStacks && (u.points[v][0] = u.points[this.index + "," + P + ",0"][0])), "percent" === R ? (J = J ? D : C, T && F[J] && F[J][P] ? (J = F[J][P], u.total = J.total = Math.max(J.total, u.total) + Math.abs(x) || 0) : u.total = o(u.total + (Math.abs(x) || 0))) : u.total = o(u.total + (x || 0)), u.cum = k(u.cum, M) + (x || 0), null !== x && (u.points[v].push(u.cum), O[H] = u.cum)
				}
				"percent" === R && (y.usePercentage = !0);
				this.stackedYData = O;
				y.oldStacks = {}
			}
		};
		n.prototype.setPercentStacks = function() {
			var l = this,
				r = l.stackKey,
				m = l.yAxis.stacks,
				f = l.processedXData,
				q;
			i([r, "-" + r], function(v) {
				for (var u = f.length, t, s; u--;) {
					if (t = f[u], q = l.getStackIndicator(q, t, l.index, v), t = (s = m[v] && m[v][t]) && s.points[q.key]) {
						s = s.total ? 100 / s.total : 0, t[0] = o(t[0] * s), t[1] = o(t[1] * s), l.stackedYData[u] = t[1]
					}
				}
			})
		};
		n.prototype.getStackIndicator = function(m, r, q, l) {
			!p(m) || m.x !== r || l && m.key !== l ? m = {
				x: r,
				index: 0,
				key: l
			} : m.index++;
			m.key = [q, r, m.index].join();
			return m
		}
	})(b);
	(function(T) {
		var z = T.addEvent,
			H = T.animate,
			p = T.Axis,
			s = T.createElement,
			K = T.css,
			O = T.defined,
			L = T.each,
			B = T.erase,
			q = T.extend,
			w = T.fireEvent,
			N = T.inArray,
			Q = T.isNumber,
			M = T.isObject,
			S = T.isArray,
			P = T.merge,
			o = T.objectEach,
			i = T.pick,
			I = T.Point,
			x = T.Series,
			h = T.seriesTypes,
			R = T.setAnimation,
			j = T.splat;
		q(T.Chart.prototype, {
			addSeries: function(g, f, m) {
				var k, l = this;
				g && (f = i(f, !0), w(l, "addSeries", {
					options: g
				}, function() {
					k = l.initSeries(g);
					l.isDirtyLegend = !0;
					l.linkSeries();
					f && l.redraw(m)
				}));
				return k
			},
			addAxis: function(k, e, r, n) {
				var m = e ? "xAxis" : "yAxis",
					l = this.options;
				k = P(k, {
					index: this[m].length,
					isX: e
				});
				e = new p(this, k);
				l[m] = j(l[m] || {});
				l[m].push(k);
				i(r, !0) && this.redraw(n);
				return e
			},
			showLoading: function(k) {
				var g = this,
					r = g.options,
					m = g.loadingDiv,
					n = r.loading,
					l = function() {
						m && K(m, {
							left: g.plotLeft + "px",
							top: g.plotTop + "px",
							width: g.plotWidth + "px",
							height: g.plotHeight + "px"
						})
					};
				m || (g.loadingDiv = m = s("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, g.container), g.loadingSpan = s("span", {
					className: "highcharts-loading-inner"
				}, null, m), z(g, "redraw", l));
				m.className = "highcharts-loading";
				g.loadingSpan.innerHTML = k || r.lang.loading;
				K(m, q(n.style, {
					zIndex: 10
				}));
				K(g.loadingSpan, n.labelStyle);
				g.loadingShown || (K(m, {
					opacity: 0,
					display: ""
				}), H(m, {
					opacity: n.style.opacity || 0.5
				}, {
					duration: n.showDuration || 0
				}));
				g.loadingShown = !0;
				l()
			},
			hideLoading: function() {
				var d = this.options,
					c = this.loadingDiv;
				c && (c.className = "highcharts-loading highcharts-loading-hidden", H(c, {
					opacity: 0
				}, {
					duration: d.loading.hideDuration || 100,
					complete: function() {
						K(c, {
							display: "none"
						})
					}
				}));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
			update: function(y, v, u) {
				var l = this,
					f = {
						credits: "addCredits",
						title: "setTitle",
						subtitle: "setSubtitle"
					},
					e = y.chart,
					g, t, d = [];
				if (e) {
					P(!0, l.options.chart, e);
					"className" in e && l.setClassName(e.className);
					if ("inverted" in e || "polar" in e) {
						l.propFromSeries(), g = !0
					}
					"alignTicks" in e && (g = !0);
					o(e, function(k, c) {
						-1 !== N("chart." + c, l.propsRequireUpdateSeries) && (t = !0); - 1 !== N(c, l.propsRequireDirtyBox) && (l.isDirtyBox = !0)
					});
					"style" in e && l.renderer.setStyle(e.style)
				}
				y.colors && (this.options.colors = y.colors);
				y.plotOptions && P(!0, this.options.plotOptions, y.plotOptions);
				o(y, function(k, c) {
					if (l[c] && "function" === typeof l[c].update) {
						l[c].update(k, !1)
					} else {
						if ("function" === typeof l[f[c]]) {
							l[f[c]](k)
						}
					}
					"chart" !== c && -1 !== N(c, l.propsRequireUpdateSeries) && (t = !0)
				});
				L("xAxis yAxis zAxis series colorAxis pane".split(" "), function(c) {
					y[c] && (L(j(y[c]), function(k, m) {
						(m = O(k.id) && l.get(k.id) || l[c][m]) && m.coll === c && (m.update(k, !1), u && (m.touched = !0));
						if (!m && u) {
							if ("series" === c) {
								l.addSeries(k, !1).touched = !0
							} else {
								if ("xAxis" === c || "yAxis" === c) {
									l.addAxis(k, "xAxis" === c, !1).touched = !0
								}
							}
						}
					}), u && L(l[c], function(k) {
						k.touched ? delete k.touched : d.push(k)
					}))
				});
				L(d, function(c) {
					c.remove(!1)
				});
				g && L(l.axes, function(c) {
					c.update({}, !1)
				});
				t && L(l.series, function(c) {
					c.update({}, !1)
				});
				y.loading && P(!0, l.options.loading, y.loading);
				g = e && e.width;
				e = e && e.height;
				Q(g) && g !== l.chartWidth || Q(e) && e !== l.chartHeight ? l.setSize(g, e) : i(v, !0) && l.redraw()
			},
			setSubtitle: function(c) {
				this.setTitle(void 0, c)
			}
		});
		q(I.prototype, {
			update: function(D, C, A, v) {
				function y() {
					u.applyOptions(D);
					null === u.y && r && (u.graphic = r.destroy());
					M(D, !0) && (r && r.element && D && D.marker && void 0 !== D.marker.symbol && (u.graphic = r.destroy()), D && D.dataLabels && u.dataLabel && (u.dataLabel = u.dataLabel.destroy()));
					m = u.index;
					t.updateParallelArrays(u, m);
					k.data[m] = M(k.data[m], !0) || M(D, !0) ? u.options : D;
					t.isDirty = t.isDirtyData = !0;
					!t.fixedBox && t.hasCartesianSeries && (n.isDirtyBox = !0);
					"point" === k.legendType && (n.isDirtyLegend = !0);
					C && n.redraw(A)
				}
				var u = this,
					t = u.series,
					r = u.graphic,
					m, n = t.chart,
					k = t.options;
				C = i(C, !0);
				!1 === v ? y() : u.firePointEvent("update", {
					options: D
				}, y)
			},
			remove: function(d, c) {
				this.series.removePoint(N(this, this.series.data), d, c)
			}
		});
		q(x.prototype, {
			addPoint: function(V, U, J, F) {
				var G = this.options,
					E = this.data,
					D = this.chart,
					C = this.xAxis,
					C = C && C.hasNames && C.names,
					A = G.data,
					t, y, r = this.xData,
					u, v;
				U = i(U, !0);
				t = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(t, [V]);
				v = t.x;
				u = r.length;
				if (this.requireSorting && v < r[u - 1]) {
					for (y = !0; u && r[u - 1] > v;) {
						u--
					}
				}
				this.updateParallelArrays(t, "splice", u, 0, 0);
				this.updateParallelArrays(t, u);
				C && t.name && (C[v] = t.name);
				A.splice(u, 0, V);
				y && (this.data.splice(u, 0, null), this.processData());
				"point" === G.legendType && this.generatePoints();
				J && (E[0] && E[0].remove ? E[0].remove(!1) : (E.shift(), this.updateParallelArrays(t, "shift"), A.shift()));
				this.isDirtyData = this.isDirty = !0;
				U && D.redraw(F)
			},
			removePoint: function(A, y, u) {
				var v = this,
					t = v.data,
					r = t[A],
					m = v.points,
					n = v.chart,
					c = function() {
						m && m.length === t.length && m.splice(A, 1);
						t.splice(A, 1);
						v.options.data.splice(A, 1);
						v.updateParallelArrays(r || {
							series: v
						}, "splice", A, 1);
						r && r.destroy();
						v.isDirty = !0;
						v.isDirtyData = !0;
						y && n.redraw()
					};
				R(u, n);
				y = i(y, !0);
				r ? r.firePointEvent("remove", null, c) : c()
			},
			remove: function(k, g, r) {
				function m() {
					n.destroy();
					l.isDirtyLegend = l.isDirtyBox = !0;
					l.linkSeries();
					i(k, !0) && l.redraw(g)
				}
				var n = this,
					l = n.chart;
				!1 !== r ? w(n, "remove", null, m) : m()
			},
			update: function(E, D) {
				var C = this,
					A = C.chart,
					y = C.userOptions,
					v = C.oldType || C.type,
					t = E.type || y.type || A.options.chart.type,
					u = h[v].prototype,
					l, e = ["group", "markerGroup", "dataLabelsGroup", "navigatorSeries", "baseSeries"],
					r = C.finishedAnimating && {
						animation: !1
					};
				if (Object.keys && "data" === Object.keys(E).toString()) {
					return this.setData(E.data, D)
				}
				if (t && t !== v || void 0 !== E.zIndex) {
					e.length = 0
				}
				L(e, function(c) {
					e[c] = C[c];
					delete C[c]
				});
				E = P(y, r, {
					index: C.index,
					pointStart: C.xData[0]
				}, {
					data: C.options.data
				}, E);
				C.remove(!1, null, !1);
				for (l in u) {
					C[l] = void 0
				}
				q(C, h[t || v].prototype);
				L(e, function(c) {
					C[c] = e[c]
				});
				C.init(A, E);
				C.oldType = v;
				A.linkSeries();
				i(D, !0) && A.redraw(!1)
			}
		});
		q(p.prototype, {
			update: function(e, d) {
				var f = this.chart;
				e = f.options[this.coll][this.options.index] = P(this.userOptions, e);
				this.destroy(!0);
				this.init(f, q(e, {
					events: void 0
				}));
				f.isDirtyBox = !0;
				i(d, !0) && f.redraw()
			},
			remove: function(g) {
				for (var n = this.chart, l = this.coll, m = this.series, k = m.length; k--;) {
					m[k] && m[k].remove(!1)
				}
				B(n.axes, this);
				B(n[l], this);
				S(n.options[l]) ? n.options[l].splice(this.options.index, 1) : delete n.options[l];
				L(n[l], function(d, c) {
					d.options.index = c
				});
				this.destroy();
				n.isDirtyBox = !0;
				i(g, !0) && n.redraw()
			},
			setTitle: function(d, c) {
				this.update({
					title: d
				}, c)
			},
			setCategories: function(d, c) {
				this.update({
					categories: d
				}, c)
			}
		})
	})(b);
	(function(e) {
		var j = e.color,
			d = e.each,
			g = e.map,
			i = e.pick,
			c = e.Series,
			h = e.seriesType;
		h("area", "line", {
			softThreshold: !1,
			threshold: 0
		}, {
			singleStacks: !1,
			getStackPoints: function(w) {
				var r = [],
					q = [],
					E = this.xAxis,
					u = this.yAxis,
					z = u.stacks[this.stackKey],
					s = {},
					B = this.index,
					x = u.series,
					C = x.length,
					A, p = i(u.options.reversedStacks, !0) ? 1 : -1,
					o;
				w = w || this.points;
				if (this.options.stacking) {
					for (o = 0; o < w.length; o++) {
						s[w[o].x] = w[o]
					}
					e.objectEach(z, function(k, f) {
						null !== k.total && q.push(f)
					});
					q.sort(function(k, f) {
						return k - f
					});
					A = g(x, function() {
						return this.visible
					});
					d(q, function(k, t) {
						var n = 0,
							m, l;
						if (s[k] && !s[k].isNull) {
							r.push(s[k]), d([-1, 1], function(D) {
								var v = 1 === D ? "rightNull" : "leftNull",
									f = 0,
									y = z[q[t + D]];
								if (y) {
									for (o = B; 0 <= o && o < C;) {
										m = y.points[o], m || (o === B ? s[k][v] = !0 : A[o] && (l = z[k].points[o]) && (f -= l[1] - l[0])), o += p
									}
								}
								s[k][1 === D ? "rightCliff" : "leftCliff"] = f
							})
						} else {
							for (o = B; 0 <= o && o < C;) {
								if (m = z[k].points[o]) {
									n = m[1];
									break
								}
								o += p
							}
							n = u.translate(n, 0, 1, 0, 1);
							r.push({
								isNull: !0,
								plotX: E.translate(k, 0, 0, 0, 1),
								x: k,
								plotY: n,
								yBottom: n
							})
						}
					})
				}
				return r
			},
			getGraphPath: function(E) {
				var u = c.prototype.getGraphPath,
					q = this.options,
					I = q.stacking,
					s = this.yAxis,
					x, r, C = [],
					w = [],
					F = this.index,
					B, p = s.stacks[this.stackKey],
					m = q.threshold,
					o = s.getThreshold(q.threshold),
					z, q = q.connectNulls || "percent" === I,
					H = function(G, D, A) {
						var v = E[G];
						G = I && p[v.x].points[F];
						var t = v[A + "Null"] || 0;
						A = v[A + "Cliff"] || 0;
						var y, n, v = !0;
						A || t ? (y = (t ? G[0] : G[1]) + A, n = G[0] + A, v = !!t) : !I && E[D] && E[D].isNull && (y = n = m);
						void 0 !== y && (w.push({
							plotX: B,
							plotY: null === y ? o : s.getThreshold(y),
							isNull: v,
							isCliff: !0
						}), C.push({
							plotX: B,
							plotY: null === n ? o : s.getThreshold(n),
							doCurve: !1
						}))
					};
				E = E || this.points;
				I && (E = this.getStackPoints(E));
				for (x = 0; x < E.length; x++) {
					if (r = E[x].isNull, B = i(E[x].rectPlotX, E[x].plotX), z = i(E[x].yBottom, o), !r || q) {
						q || H(x, x - 1, "left"), r && !I && q || (w.push(E[x]), C.push({
							x: x,
							plotX: B,
							plotY: z
						})), q || H(x, x + 1, "right")
					}
				}
				x = u.call(this, w, !0, !0);
				C.reversed = !0;
				r = u.call(this, C, !0, !0);
				r.length && (r[0] = "L");
				r = x.concat(r);
				u = u.call(this, w, !1, q);
				r.xMap = x.xMap;
				this.areaPath = r;
				return u
			},
			drawGraph: function() {
				this.areaPath = [];
				c.prototype.drawGraph.apply(this);
				var k = this,
					n = this.areaPath,
					l = this.options,
					m = [
						["area", "highcharts-area", this.color, l.fillColor]
					];
				d(this.zones, function(o, p) {
					m.push(["zone-area-" + p, "highcharts-area highcharts-zone-area-" + p + " " + o.className, o.color || k.color, o.fillColor || l.fillColor])
				});
				d(m, function(o) {
					var p = o[0],
						f = k[p];
					f ? (f.endX = n.xMap, f.animate({
						d: n
					})) : (f = k[p] = k.chart.renderer.path(n).addClass(o[1]).attr({
						fill: i(o[3], j(o[2]).setOpacity(i(l.fillOpacity, 0.75)).get()),
						zIndex: 0
					}).add(k.group), f.isArea = !0);
					f.startX = n.xMap;
					f.shiftUnit = l.step ? 2 : 1
				})
			},
			drawLegendSymbol: e.LegendSymbolMixin.drawRectangle
		})
	})(b);
	(function(c) {
		var d = c.pick;
		c = c.seriesType;
		c("spline", "line", {}, {
			getPointSpline: function(o, s, v) {
				var h = s.plotX,
					k = s.plotY,
					i = o[v - 1];
				v = o[v + 1];
				var e, p, q, j;
				if (i && !i.isNull && !1 !== i.doCurve && !s.isCliff && v && !v.isNull && !1 !== v.doCurve && !s.isCliff) {
					o = i.plotY;
					q = v.plotX;
					v = v.plotY;
					var n = 0;
					e = (1.5 * h + i.plotX) / 2.5;
					p = (1.5 * k + o) / 2.5;
					q = (1.5 * h + q) / 2.5;
					j = (1.5 * k + v) / 2.5;
					q !== e && (n = (j - p) * (q - h) / (q - e) + k - j);
					p += n;
					j += n;
					p > o && p > k ? (p = Math.max(o, k), j = 2 * k - p) : p < o && p < k && (p = Math.min(o, k), j = 2 * k - p);
					j > v && j > k ? (j = Math.max(v, k), p = 2 * k - j) : j < v && j < k && (j = Math.min(v, k), p = 2 * k - j);
					s.rightContX = q;
					s.rightContY = j
				}
				s = ["C", d(i.rightContX, i.plotX), d(i.rightContY, i.plotY), d(e, h), d(p, k), h, k];
				i.rightContX = i.rightContY = null;
				return s
			}
		})
	})(b);
	(function(d) {
		var e = d.seriesTypes.area.prototype,
			c = d.seriesType;
		c("areaspline", "spline", d.defaultPlotOptions.area, {
			getStackPoints: e.getStackPoints,
			getGraphPath: e.getGraphPath,
			drawGraph: e.drawGraph,
			drawLegendSymbol: d.LegendSymbolMixin.drawRectangle
		})
	})(b);
	(function(j) {
		var d = j.animObject,
			e = j.color,
			o = j.each,
			p = j.extend,
			g = j.isNumber,
			i = j.merge,
			h = j.pick,
			c = j.Series,
			k = j.seriesType,
			n = j.svg;
		k("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: 0.2,
			marker: null,
			pointPadding: 0.1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: 0.1,
					shadow: !1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000",
					shadow: !1
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function() {
				c.prototype.init.apply(this, arguments);
				var f = this,
					l = f.chart;
				l.hasRendered && o(l.series, function(m) {
					m.type === f.type && (m.isDirty = !0)
				})
			},
			getColumnMetrics: function() {
				var A = this,
					x = A.options,
					v = A.xAxis,
					z = A.yAxis,
					w = v.reversed,
					s, l = {},
					q = 0;
				!1 === x.grouping ? q = 1 : o(A.chart.series, function(u) {
					var r = u.options,
						t = u.yAxis,
						m;
					u.type !== A.type || !u.visible && A.chart.options.chart.ignoreHiddenSeries || z.len !== t.len || z.pos !== t.pos || (r.stacking ? (s = u.stackKey, void 0 === l[s] && (l[s] = q++), m = l[s]) : !1 !== r.grouping && (m = q++), u.columnIndex = m)
				});
				var C = Math.min(Math.abs(v.transA) * (v.ordinalSlope || x.pointRange || v.closestPointRange || v.tickInterval || 1), v.len),
					B = C * x.groupPadding,
					y = (C - 2 * B) / (q || 1),
					x = Math.min(x.maxPointWidth || v.len, h(x.pointWidth, y * (1 - 2 * x.pointPadding)));
				A.columnMetrics = {
					width: x,
					offset: (y - x) / 2 + (B + ((A.columnIndex || 0) + (w ? 1 : 0)) * y - C / 2) * (w ? -1 : 1)
				};
				return A.columnMetrics
			},
			crispCol: function(m, u, s, l) {
				var t = this.chart,
					r = this.borderWidth,
					q = -(r % 2 ? 0.5 : 0),
					r = r % 2 ? 0.5 : 1;
				t.inverted && t.renderer.isVML && (r += 1);
				this.options.crisp && (s = Math.round(m + s) + q, m = Math.round(m) + q, s -= m);
				l = Math.round(u + l) + r;
				q = 0.5 >= Math.abs(u) && 0.5 < l;
				u = Math.round(u) + r;
				l -= u;
				q && l && (--u, l += 1);
				return {
					x: m,
					y: u,
					width: s,
					height: l
				}
			},
			translate: function() {
				var z = this,
					w = z.chart,
					s = z.options,
					y = z.dense = 2 > z.closestPointRange * z.xAxis.transA,
					y = z.borderWidth = h(s.borderWidth, y ? 0 : 1),
					v = z.yAxis,
					r = z.translatedThreshold = v.getThreshold(s.threshold),
					C = h(s.minPointLength, 5),
					q = z.getColumnMetrics(),
					B = q.width,
					l = z.barW = Math.max(B, 1 + 2 * y),
					x = z.pointXOffset = q.offset;
				w.inverted && (r -= 0.5);
				s.pointPadding && (l = Math.ceil(l));
				c.prototype.translate.apply(z);
				o(z.points, function(m) {
					var E = h(m.yBottom, r),
						D = 999 + Math.abs(E),
						D = Math.min(Math.max(-D, m.plotY), v.len + D),
						u = m.plotX + x,
						G = l,
						A = Math.min(D, E),
						t, F = Math.max(D, E) - A;
					Math.abs(F) < C && C && (F = C, t = !v.reversed && !m.negative || v.reversed && m.negative, A = Math.abs(A - r) > C ? E - C : r - (t ? C : 0));
					m.barX = u;
					m.pointWidth = B;
					m.tooltipPos = w.inverted ? [v.len + v.pos - w.plotLeft - D, z.xAxis.len - u - G / 2, F] : [u + G / 2, D + v.pos - w.plotTop, F];
					m.shapeType = "rect";
					m.shapeArgs = z.crispCol.apply(z, m.isNull ? [u, r, G, 0] : [u, A, G, F])
				})
			},
			getSymbol: j.noop,
			drawLegendSymbol: j.LegendSymbolMixin.drawRectangle,
			drawGraph: function() {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function(y, w) {
				var u = this.options,
					x, v = this.pointAttrToOptions || {};
				x = v.stroke || "borderColor";
				var t = v["stroke-width"] || "borderWidth",
					s = y && y.color || this.color,
					q = y[x] || u[x] || this.color || s,
					f = y[t] || u[t] || this[t] || 0,
					v = u.dashStyle;
				y && this.zones.length && (s = y.getZone(), s = y.options.color || s && s.color || this.color);
				w && (y = i(u.states[w], y.options.states && y.options.states[w] || {}), w = y.brightness, s = y.color || void 0 !== w && e(s).brighten(y.brightness).get() || s, q = y[x] || q, f = y[t] || f, v = y.dashStyle || v);
				x = {
					fill: s,
					stroke: q,
					"stroke-width": f
				};
				v && (x.dashstyle = v);
				return x
			},
			drawPoints: function() {
				var q = this,
					t = this.chart,
					r = q.options,
					f = t.renderer,
					s = r.animationLimit || 250,
					m;
				o(q.points, function(l) {
					var u = l.graphic;
					if (g(l.plotY) && null !== l.y) {
						m = l.shapeArgs;
						if (u) {
							u[t.pointCount < s ? "animate" : "attr"](i(m))
						} else {
							l.graphic = u = f[l.shapeType](m).add(l.group || q.group)
						}
						r.borderRadius && u.attr({
							r: r.borderRadius
						});
						u.attr(q.pointAttribs(l, l.selected && "select")).shadow(r.shadow, null, r.stacking && !r.borderRadius);
						u.addClass(l.getClassName(), !0)
					} else {
						u && (l.graphic = u.destroy())
					}
				})
			},
			animate: function(m) {
				var t = this,
					r = this.yAxis,
					l = t.options,
					s = this.chart.inverted,
					q = {};
				n && (m ? (q.scaleY = 0.001, m = Math.min(r.pos + r.len, Math.max(r.pos, r.toPixels(l.threshold))), s ? q.translateX = m - r.len : q.translateY = m, t.group.attr(q)) : (q[s ? "translateX" : "translateY"] = r.pos, t.group.animate(q, p(d(t.options.animation), {
					step: function(u, f) {
						t.group.attr({
							scaleY: Math.max(0.001, f.pos)
						})
					}
				})), t.animate = null))
			},
			remove: function() {
				var f = this,
					l = f.chart;
				l.hasRendered && o(l.series, function(m) {
					m.type === f.type && (m.isDirty = !0)
				});
				c.prototype.remove.apply(f, arguments)
			}
		})
	})(b);
	(function(c) {
		c = c.seriesType;
		c("bar", "column", null, {
			inverted: !0
		})
	})(b);
	(function(c) {
		var d = c.Series;
		c = c.seriesType;
		c("scatter", "line", {
			lineWidth: 0,
			findNearestPointBy: "xy",
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e●\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
			}
		}, {
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			drawGraph: function() {
				this.options.lineWidth && d.prototype.drawGraph.call(this)
			}
		})
	})(b);
	(function(d) {
		var e = d.pick,
			c = d.relativeLength;
		d.CenteredSeriesMixin = {
			getCenter: function() {
				var i = this.options,
					p = this.chart,
					g = 2 * (i.slicedOffset || 0),
					o = p.plotWidth - 2 * g,
					p = p.plotHeight - 2 * g,
					h = i.center,
					h = [e(h[0], "50%"), e(h[1], "50%"), i.size || "100%", i.innerSize || 0],
					n = Math.min(o, p),
					j, k;
				for (j = 0; 4 > j; ++j) {
					k = h[j], i = 2 > j || 2 === j && /%$/.test(k), h[j] = c(k, [o, p, n, h[2]][j]) + (i ? g : 0)
				}
				h[3] > h[2] && (h[3] = h[2]);
				return h
			}
		}
	})(b);
	(function(n) {
		var d = n.addEvent,
			e = n.defined,
			q = n.each,
			s = n.extend,
			h = n.inArray,
			k = n.noop,
			i = n.pick,
			c = n.Point,
			o = n.Series,
			p = n.seriesType,
			j = n.setAnimation;
		p("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				distance: 30,
				enabled: !0,
				formatter: function() {
					return this.point.isNull ? void 0 : this.point.name
				},
				x: 0
			},
			ignoreHiddenPoint: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			states: {
				hover: {
					brightness: 0.1,
					shadow: !1
				}
			}
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: n.seriesTypes.column.prototype.pointAttribs,
			animate: function(g) {
				var m = this,
					f = m.points,
					l = m.startAngleRad;
				g || (q(f, function(t) {
					var r = t.graphic,
						u = t.shapeArgs;
					r && (r.attr({
						r: t.startR || m.center[3] / 2,
						start: l,
						end: l
					}), r.animate({
						r: u.r,
						start: u.start,
						end: u.end
					}, m.options.animation))
				}), m.animate = null)
			},
			updateTotals: function() {
				var t, v = 0,
					m = this.points,
					w = m.length,
					u, r = this.options.ignoreHiddenPoint;
				for (t = 0; t < w; t++) {
					u = m[t], v += r && !u.visible ? 0 : u.isNull ? 0 : u.y
				}
				this.total = v;
				for (t = 0; t < w; t++) {
					u = m[t], u.percentage = 0 < v && (u.visible || !r) ? u.y / v * 100 : 0, u.total = v
				}
			},
			generatePoints: function() {
				o.prototype.generatePoints.call(this);
				this.updateTotals()
			},
			translate: function(J) {
				this.generatePoints();
				var F = 0,
					I = this.options,
					E = I.slicedOffset,
					D = E + (I.borderWidth || 0),
					C, y, A, l = I.startAngle || 0,
					H = this.startAngleRad = Math.PI / 180 * (l - 90),
					l = (this.endAngleRad = Math.PI / 180 * (i(I.endAngle, l + 360) - 90)) - H,
					L = this.points,
					v, x = I.dataLabels.distance,
					I = I.ignoreHiddenPoint,
					K, w = L.length,
					G;
				J || (this.center = J = this.getCenter());
				this.getX = function(f, m, g) {
					A = Math.asin(Math.min((f - J[1]) / (J[2] / 2 + g.labelDistance), 1));
					return J[0] + (m ? -1 : 1) * Math.cos(A) * (J[2] / 2 + g.labelDistance)
				};
				for (K = 0; K < w; K++) {
					G = L[K];
					G.labelDistance = i(G.options.dataLabels && G.options.dataLabels.distance, x);
					this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, G.labelDistance);
					C = H + F * l;
					if (!I || G.visible) {
						F += G.percentage / 100
					}
					y = H + F * l;
					G.shapeType = "arc";
					G.shapeArgs = {
						x: J[0],
						y: J[1],
						r: J[2] / 2,
						innerR: J[3] / 2,
						start: Math.round(1000 * C) / 1000,
						end: Math.round(1000 * y) / 1000
					};
					A = (y + C) / 2;
					A > 1.5 * Math.PI ? A -= 2 * Math.PI : A < -Math.PI / 2 && (A += 2 * Math.PI);
					G.slicedTranslation = {
						translateX: Math.round(Math.cos(A) * E),
						translateY: Math.round(Math.sin(A) * E)
					};
					y = Math.cos(A) * J[2] / 2;
					v = Math.sin(A) * J[2] / 2;
					G.tooltipPos = [J[0] + 0.7 * y, J[1] + 0.7 * v];
					G.half = A < -Math.PI / 2 || A > Math.PI / 2 ? 1 : 0;
					G.angle = A;
					C = Math.min(D, G.labelDistance / 5);
					G.labelPos = [J[0] + y + Math.cos(A) * G.labelDistance, J[1] + v + Math.sin(A) * G.labelDistance, J[0] + y + Math.cos(A) * C, J[1] + v + Math.sin(A) * C, J[0] + y, J[1] + v, 0 > G.labelDistance ? "center" : G.half ? "right" : "left", A]
				}
			},
			drawGraph: null,
			drawPoints: function() {
				var t = this,
					v = t.chart.renderer,
					m, w, u, r, x = t.options.shadow;
				x && !t.shadowGroup && (t.shadowGroup = v.g("shadow").add(t.group));
				q(t.points, function(g) {
					if (!g.isNull) {
						w = g.graphic;
						r = g.shapeArgs;
						m = g.getTranslate();
						var f = g.shadowGroup;
						x && !f && (f = g.shadowGroup = v.g("shadow").add(t.shadowGroup));
						f && f.attr(m);
						u = t.pointAttribs(g, g.selected && "select");
						w ? w.setRadialReference(t.center).attr(u).animate(s(r, m)) : (g.graphic = w = v[g.shapeType](r).setRadialReference(t.center).attr(m).add(t.group), g.visible || w.attr({
							visibility: "hidden"
						}), w.attr(u).attr({
							"stroke-linejoin": "round"
						}).shadow(x, f));
						w.addClass(g.getClassName())
					}
				})
			},
			searchPoint: k,
			sortByAngle: function(g, l) {
				g.sort(function(f, m) {
					return void 0 !== f.angle && (m.angle - f.angle) * l
				})
			},
			drawLegendSymbol: n.LegendSymbolMixin.drawRectangle,
			getCenter: n.CenteredSeriesMixin.getCenter,
			getSymbol: k
		}, {
			init: function() {
				c.prototype.init.apply(this, arguments);
				var g = this,
					l;
				g.name = i(g.name, "Slice");
				l = function(f) {
					g.slice("select" === f.type)
				};
				d(g, "select", l);
				d(g, "unselect", l);
				return g
			},
			isValid: function() {
				return n.isNumber(this.y, !0) && 0 <= this.y
			},
			setVisible: function(m, t) {
				var l = this,
					u = l.series,
					v = u.chart,
					r = u.options.ignoreHiddenPoint;
				t = i(t, r);
				m !== l.visible && (l.visible = l.options.visible = m = void 0 === m ? !l.visible : m, u.options.data[h(l, u.data)] = l.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function(f) {
					if (l[f]) {
						l[f][m ? "show" : "hide"](!0)
					}
				}), l.legendItem && v.legend.colorizeItem(l, m), m || "hover" !== l.state || l.setState(""), r && (u.isDirty = !0), t && v.redraw())
			},
			slice: function(l, m, g) {
				var r = this.series;
				j(g, r.chart);
				i(m, !0);
				this.sliced = this.options.sliced = e(l) ? l : !this.sliced;
				r.options.data[h(this, r.data)] = this.options;
				this.graphic.animate(this.getTranslate());
				this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
			},
			getTranslate: function() {
				return this.sliced ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}
			},
			haloPath: function(f) {
				var g = this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(g.x, g.y, g.r + f, g.r + f, {
					innerR: this.shapeArgs.r,
					start: g.start,
					end: g.end
				})
			}
		})
	})(b);
	(function(v) {
		var e = v.addEvent,
			h = v.arrayMax,
			y = v.defined,
			z = v.each,
			i = v.extend,
			p = v.format,
			j = v.map,
			c = v.merge,
			w = v.noop,
			x = v.pick,
			o = v.relativeLength,
			q = v.Series,
			n = v.seriesTypes,
			s = v.stableSort;
		v.distribute = function(r, C) {
			function B(f, d) {
				return f.target - d.target
			}
			var A, u = !0,
				t = r,
				D = [],
				l;
			l = 0;
			for (A = r.length; A--;) {
				l += r[A].size
			}
			if (l > C) {
				s(r, function(f, d) {
					return (d.rank || 0) - (f.rank || 0)
				});
				for (l = A = 0; l <= C;) {
					l += r[A].size, A++
				}
				D = r.splice(A - 1, r.length)
			}
			s(r, B);
			for (r = j(r, function(d) {
					return {
						size: d.size,
						targets: [d.target]
					}
				}); u;) {
				for (A = r.length; A--;) {
					u = r[A], l = (Math.min.apply(0, u.targets) + Math.max.apply(0, u.targets)) / 2, u.pos = Math.min(Math.max(0, l - u.size / 2), C - u.size)
				}
				A = r.length;
				for (u = !1; A--;) {
					0 < A && r[A - 1].pos + r[A - 1].size > r[A].pos && (r[A - 1].size += r[A].size, r[A - 1].targets = r[A - 1].targets.concat(r[A].targets), r[A - 1].pos + r[A - 1].size > C && (r[A - 1].pos = C - r[A - 1].size), r.splice(A, 1), u = !0)
				}
			}
			A = 0;
			z(r, function(f) {
				var d = 0;
				z(f.targets, function() {
					t[A].pos = f.pos + d;
					d += t[A].size;
					A++
				})
			});
			t.push.apply(t, D);
			s(t, B)
		};
		q.prototype.drawDataLabels = function() {
			var I = this,
				G = I.options,
				F = G.dataLabels,
				E = I.points,
				D, C, H = I.hasRendered || 0,
				J, f, r = x(F.defer, !!G.animation),
				t = I.chart.renderer;
			if (F.enabled || I._hasPointLabels) {
				I.dlProcessOptions && I.dlProcessOptions(F), f = I.plotGroup("dataLabelsGroup", "data-labels", r && !H ? "hidden" : "visible", F.zIndex || 6), r && (f.attr({
					opacity: +H
				}), H || e(I, "afterAnimate", function() {
					I.visible && f.show(!0);
					f[G.animation ? "animate" : "attr"]({
						opacity: 1
					}, {
						duration: 200
					})
				})), C = F, z(E, function(L) {
					var u, g = L.dataLabel,
						K, l, m = L.connector,
						d = !g,
						A;
					D = L.dlOptions || L.options && L.options.dataLabels;
					if (u = x(D && D.enabled, C.enabled) && null !== L.y) {
						F = c(C, D), K = L.getLabelConfig(), J = F.format ? p(F.format, K) : F.formatter.call(K, F), A = F.style, K = F.rotation, A.color = x(F.color, A.color, I.color, "#000000"), "contrast" === A.color && (L.contrastColor = t.getContrast(L.color || I.color), A.color = F.inside || 0 > x(L.labelDistance, F.distance) || G.stacking ? L.contrastColor : "#000000"), G.cursor && (A.cursor = G.cursor), l = {
							fill: F.backgroundColor,
							stroke: F.borderColor,
							"stroke-width": F.borderWidth,
							r: F.borderRadius || 0,
							rotation: K,
							padding: F.padding,
							zIndex: 1
						}, v.objectEach(l, function(B, k) {
							void 0 === B && delete l[k]
						})
					}!g || u && y(J) ? u && y(J) && (g ? l.text = J : (g = L.dataLabel = t[K ? "text" : "label"](J, 0, -9999, F.shape, null, null, F.useHTML, null, "data-label"), g.addClass("highcharts-data-label-color-" + L.colorIndex + " " + (F.className || "") + (F.useHTML ? "highcharts-tracker" : ""))), g.attr(l), g.css(A).shadow(F.shadow), g.added || g.add(f), I.alignDataLabel(L, g, F, null, d)) : (L.dataLabel = g = g.destroy(), m && (L.connector = m.destroy()))
				})
			}
		};
		q.prototype.alignDataLabel = function(K, J, G, E, D) {
			var F = this.chart,
				H = F.inverted,
				C = x(K.plotX, -9999),
				B = x(K.plotY, -9999),
				A = J.getBBox(),
				m, t = G.rotation,
				L = G.align,
				M = this.visible && (K.series.forceDL || F.isInsidePlot(C, Math.round(B), H) || E && F.isInsidePlot(C, H ? E.x + 1 : E.y + E.height - 1, H)),
				I = "justify" === x(G.overflow, "justify");
			if (M && (m = G.style.fontSize, m = F.renderer.fontMetrics(m, J).b, E = i({
					x: H ? this.yAxis.len - B : C,
					y: Math.round(H ? this.xAxis.len - C : B),
					width: 0,
					height: 0
				}, E), i(G, {
					width: A.width,
					height: A.height
				}), t ? (I = !1, C = F.renderer.rotCorr(m, t), C = {
					x: E.x + G.x + E.width / 2 + C.x,
					y: E.y + G.y + {
						top: 0,
						middle: 0.5,
						bottom: 1
					}[G.verticalAlign] * E.height
				}, J[D ? "attr" : "animate"](C).attr({
					align: L
				}), B = (t + 720) 60, B = 180 < B && 360 > B, "left" === L ? C.y -= B ? A.height : 0 : "center" === L ? (C.x -= A.width / 2, C.y -= A.height / 2) : "right" === L && (C.x -= A.width, C.y -= B ? 0 : A.height)) : (J.align(G, null, E), C = J.alignAttr), I ? K.isLabelJustified = this.justifyDataLabel(J, G, C, A, E, D) : x(G.crop, !0) && (M = F.isInsidePlot(C.x, C.y) && F.isInsidePlot(C.x + A.width, C.y + A.height)), G.shape && !t)) {
				J[D ? "attr" : "animate"]({
					anchorX: H ? F.plotWidth - K.plotY : K.plotX,
					anchorY: H ? F.plotHeight - K.plotX : K.plotY
				})
			}
			M || (J.attr({
				y: -9999
			}), J.placed = !1)
		};
		q.prototype.justifyDataLabel = function(I, H, F, D, C, B) {
			var G = this.chart,
				E = H.align,
				A = H.verticalAlign,
				u, t, r = I.box ? 0 : I.padding || 0;
			u = F.x + r;
			0 > u && ("right" === E ? H.align = "left" : H.x = -u, t = !0);
			u = F.x + D.width - r;
			u > G.plotWidth && ("left" === E ? H.align = "right" : H.x = G.plotWidth - u, t = !0);
			u = F.y + r;
			0 > u && ("bottom" === A ? H.verticalAlign = "top" : H.y = -u, t = !0);
			u = F.y + D.height - r;
			u > G.plotHeight && ("top" === A ? H.verticalAlign = "bottom" : H.y = G.plotHeight - u, t = !0);
			t && (I.placed = !B, I.align(H, null, C));
			return t
		};
		n.pie && (n.pie.prototype.drawDataLabels = function() {
			var ac = this,
				aa = ac.data,
				Z, X = ac.chart,
				W = ac.options.dataLabels,
				V = x(W.connectorPadding, 10),
				ab = x(W.connectorWidth, 1),
				S = X.plotWidth,
				T = X.plotHeight,
				N, P = ac.center,
				U = P[2] / 2,
				E = P[1],
				G, D, Y, K, B = [
					[],
					[]
				],
				J, A, t, d, F = [0, 0, 0, 0];
			ac.visible && (W.enabled || ac._hasPointLabels) && (z(aa, function(f) {
				f.dataLabel && f.visible && f.dataLabel.shortened && (f.dataLabel.attr({
					width: "auto"
				}).css({
					width: "auto",
					textOverflow: "clip"
				}), f.dataLabel.shortened = !1)
			}), q.prototype.drawDataLabels.apply(ac), z(aa, function(f) {
				f.dataLabel && f.visible && (B[f.half].push(f), f.dataLabel._pos = null)
			}), z(B, function(H, r) {
				var m, l, C = H.length,
					g = [],
					k;
				if (C) {
					for (ac.sortByAngle(H, r - 0.5), 0 < ac.maxLabelDistance && (m = Math.max(0, E - U - ac.maxLabelDistance), l = Math.min(E + U + ac.maxLabelDistance, X.plotHeight), z(H, function(f) {
							0 < f.labelDistance && f.dataLabel && (f.top = Math.max(0, E - U - f.labelDistance), f.bottom = Math.min(E + U + f.labelDistance, X.plotHeight), k = f.dataLabel.getBBox().height || 21, f.positionsIndex = g.push({
								target: f.labelPos[1] - f.top + k / 2,
								size: k,
								rank: f.y
							}) - 1)
						}), v.distribute(g, l + k - m)), d = 0; d < C; d++) {
						Z = H[d], l = Z.positionsIndex, Y = Z.labelPos, G = Z.dataLabel, t = !1 === Z.visible ? "hidden" : "inherit", m = Y[1], g && y(g[l]) ? void 0 === g[l].pos ? t = "hidden" : (K = g[l].size, A = Z.top + g[l].pos) : A = m, delete Z.positionIndex, J = W.justify ? P[0] + (r ? -1 : 1) * (U + Z.labelDistance) : ac.getX(A < Z.top + 2 || A > Z.bottom - 2 ? m : A, r, Z), G._attr = {
							visibility: t,
							align: Y[6]
						}, G._pos = {
							x: J + W.x + ({
								left: V,
								right: -V
							}[Y[6]] || 0),
							y: A + W.y - 10
						}, Y.x = J, Y.y = A, x(W.crop, !0) && (D = G.getBBox().width, m = null, J - D < V ? (m = Math.round(D - J + V), F[3] = Math.max(m, F[3])) : J + D > S - V && (m = Math.round(J + D - S + V), F[1] = Math.max(m, F[1])), 0 > A - K / 2 ? F[0] = Math.max(Math.round(-A + K / 2), F[0]) : A + K / 2 > T && (F[2] = Math.max(Math.round(A + K / 2 - T), F[2])), G.sideOverflow = m)
					}
				}
			}), 0 === h(F) || this.verifyDataLabelOverflow(F)) && (this.placeDataLabels(), ab && z(this.points, function(f) {
				var g;
				N = f.connector;
				if ((G = f.dataLabel) && G._pos && f.visible && 0 < f.labelDistance) {
					t = G._attr.visibility;
					if (g = !N) {
						f.connector = N = X.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + f.colorIndex).add(ac.dataLabelsGroup), N.attr({
							"stroke-width": ab,
							stroke: W.connectorColor || f.color || "#666666"
						})
					}
					N[g ? "attr" : "animate"]({
						d: ac.connectorPath(f.labelPos)
					});
					N.attr("visibility", t)
				} else {
					N && (f.connector = N.destroy())
				}
			}))
		}, n.pie.prototype.connectorPath = function(g) {
			var f = g.x,
				k = g.y;
			return x(this.options.dataLabels.softConnector, !0) ? ["M", f + ("left" === g[6] ? 5 : -5), k, "C", f, k, 2 * g[2] - g[4], 2 * g[3] - g[5], g[2], g[3], "L", g[4], g[5]] : ["M", f + ("left" === g[6] ? 5 : -5), k, "L", g[2], g[3], "L", g[4], g[5]]
		}, n.pie.prototype.placeDataLabels = function() {
			z(this.points, function(f) {
				var d = f.dataLabel;
				d && f.visible && ((f = d._pos) ? (d.sideOverflow && (d._attr.width = d.getBBox().width - d.sideOverflow, d.css({
					width: d._attr.width + "px",
					textOverflow: "ellipsis"
				}), d.shortened = !0), d.attr(d._attr), d[d.moved ? "animate" : "attr"](f), d.moved = !0) : d && d.attr({
					y: -9999
				}))
			}, this)
		}, n.pie.prototype.alignDataLabel = w, n.pie.prototype.verifyDataLabelOverflow = function(l) {
			var g = this.center,
				u = this.options,
				t = u.center,
				r = u.minSize || 80,
				m, A = null !== u.size;
			A || (null !== t[0] ? m = Math.max(g[2] - Math.max(l[1], l[3]), r) : (m = Math.max(g[2] - l[1] - l[3], r), g[0] += (l[3] - l[1]) / 2), null !== t[1] ? m = Math.max(Math.min(m, g[2] - Math.max(l[0], l[2])), r) : (m = Math.max(Math.min(m, g[2] - l[0] - l[2]), r), g[1] += (l[0] - l[2]) / 2), m < g[2] ? (g[2] = m, g[3] = Math.min(o(u.innerSize || 0, m), m), this.translate(g), this.drawDataLabels && this.drawDataLabels()) : A = !0);
			return A
		});
		n.column && (n.column.prototype.alignDataLabel = function(F, E, B, A, u) {
			var C = this.chart.inverted,
				D = F.series,
				t = F.dlBox || F.shapeArgs,
				r = x(F.below, F.plotY > x(this.translatedThreshold, D.yAxis.len)),
				d = x(B.inside, !!this.options.stacking);
			t && (A = c(t), 0 > A.y && (A.height += A.y, A.y = 0), t = A.y + A.height - D.yAxis.len, 0 < t && (A.height -= t), C && (A = {
				x: D.yAxis.len - A.y - A.height,
				y: D.xAxis.len - A.x - A.width,
				width: A.height,
				height: A.width
			}), d || (C ? (A.x += r ? 0 : A.width, A.width = 0) : (A.y += r ? A.height : 0, A.height = 0)));
			B.align = x(B.align, !C || d ? "center" : r ? "right" : "left");
			B.verticalAlign = x(B.verticalAlign, C || d ? "middle" : r ? "top" : "bottom");
			q.prototype.alignDataLabel.call(this, F, E, B, A, u);
			F.isLabelJustified && F.contrastColor && F.dataLabel.css({
				color: F.contrastColor
			})
		})
	})(b);
	(function(e) {
		var h = e.Chart,
			d = e.each,
			f = e.objectEach,
			g = e.pick,
			c = e.addEvent;
		h.prototype.callbacks.push(function(i) {
			function j() {
				var k = [];
				d(i.yAxis || [], function(l) {
					l.options.stackLabels && !l.options.stackLabels.allowOverlap && f(l.stacks, function(m) {
						f(m, function(n) {
							k.push(n.label)
						})
					})
				});
				d(i.series || [], function(n) {
					var m = n.options.dataLabels,
						o = n.dataLabelCollections || ["dataLabel"];
					(m.enabled || n._hasPointLabels) && !m.allowOverlap && n.visible && d(o, function(l) {
						d(n.points, function(p) {
							p[l] && (p[l].labelrank = g(p.labelrank, p.shapeArgs && p.shapeArgs.height), k.push(p[l]))
						})
					})
				});
				i.hideOverlappingLabels(k)
			}
			j();
			c(i, "redraw", j)
		});
		h.prototype.hideOverlappingLabels = function(s) {
			var n = s.length,
				i, x, z, l, p, j, r, o, w, q = function(t, m, B, C, A, y, v, u) {
					return !(A > t + B || A + v < t || y > m + C || y + u < m)
				};
			for (x = 0; x < n; x++) {
				if (i = s[x]) {
					i.oldOpacity = i.opacity, i.newOpacity = 1, i.width || (z = i.getBBox(), i.width = z.width, i.height = z.height)
				}
			}
			s.sort(function(m, k) {
				return (k.labelrank || 0) - (m.labelrank || 0)
			});
			for (x = 0; x < n; x++) {
				for (z = s[x], i = x + 1; i < n; ++i) {
					if (l = s[i], z && l && z !== l && z.placed && l.placed && 0 !== z.newOpacity && 0 !== l.newOpacity && (p = z.alignAttr, j = l.alignAttr, r = z.parentGroup, o = l.parentGroup, w = 2 * (z.box ? 0 : z.padding || 0), p = q(p.x + r.translateX, p.y + r.translateY, z.width - w, z.height - w, j.x + o.translateX, j.y + o.translateY, l.width - w, l.height - w))) {
						(z.labelrank < l.labelrank ? z : l).newOpacity = 0
					}
				}
			}
			d(s, function(m) {
				var k, t;
				m && (t = m.newOpacity, m.oldOpacity !== t && m.placed && (t ? m.show(!0) : k = function() {
					m.hide()
				}, m.alignAttr.opacity = t, m[m.isOld ? "animate" : "attr"](m.alignAttr, null, k)), m.isOld = !0)
			})
		}
	})(b);
	(function(P) {
		var w = P.addEvent,
			z = P.Chart,
			j = P.createElement,
			p = P.css,
			G = P.defaultOptions,
			L = P.defaultPlotOptions,
			H = P.each,
			x = P.extend,
			o = P.fireEvent,
			q = P.hasTouch,
			K = P.inArray,
			N = P.isObject,
			I = P.Legend,
			O = P.merge,
			M = P.pick,
			i = P.Point,
			h = P.Series,
			B = P.seriesTypes,
			s = P.svg,
			c;
		c = P.TrackerMixin = {
			drawTrackerPoint: function() {
				var f = this,
					e = f.chart.pointer,
					g = function(d) {
						var k = e.getPointFromEvent(d);
						void 0 !== k && (e.isDirectTouch = !0, k.onMouseOver(d))
					};
				H(f.points, function(d) {
					d.graphic && (d.graphic.element.point = d);
					d.dataLabel && (d.dataLabel.div ? d.dataLabel.div.point = d : d.dataLabel.element.point = d)
				});
				f._hasTracking || (H(f.trackerGroups, function(d) {
					if (f[d]) {
						f[d].addClass("highcharts-tracker").on("mouseover", g).on("mouseout", function(k) {
							e.onTrackerMouseOut(k)
						});
						if (q) {
							f[d].on("touchstart", g)
						}
						f.options.cursor && f[d].css(p).css({
							cursor: f.options.cursor
						})
					}
				}), f._hasTracking = !0)
			},
			drawTrackerGraph: function() {
				var R = this,
					Q = R.options,
					J = Q.trackByArea,
					F = [].concat(J ? R.areaPath : R.graphPath),
					E = F.length,
					D = R.chart,
					A = D.pointer,
					y = D.renderer,
					t = D.options.tooltip.snap,
					C = R.tracker,
					l, T = function() {
						if (D.hoverSeries !== R) {
							R.onMouseOver()
						}
					},
					S = "rgba(192,192,192," + (s ? 0.0001 : 0.002) + ")";
				if (E && !J) {
					for (l = E + 1; l--;) {
						"M" === F[l] && F.splice(l + 1, 0, F[l + 1] - t, F[l + 2], "L"), (l && "M" === F[l] || l === E) && F.splice(l, 0, "L", F[l - 2] + t, F[l - 1])
					}
				}
				C ? C.attr({
					d: F
				}) : R.graph && (R.tracker = y.path(F).attr({
					"stroke-linejoin": "round",
					visibility: R.visible ? "visible" : "hidden",
					stroke: S,
					fill: J ? S : "none",
					"stroke-width": R.graph.strokeWidth() + (J ? 0 : 2 * t),
					zIndex: 2
				}).add(R.group), H([R.tracker, R.markerGroup], function(d) {
					d.addClass("highcharts-tracker").on("mouseover", T).on("mouseout", function(e) {
						A.onTrackerMouseOut(e)
					});
					Q.cursor && d.css({
						cursor: Q.cursor
					});
					if (q) {
						d.on("touchstart", T)
					}
				}))
			}
		};
		B.column && (B.column.prototype.drawTracker = c.drawTrackerPoint);
		B.pie && (B.pie.prototype.drawTracker = c.drawTrackerPoint);
		B.scatter && (B.scatter.prototype.drawTracker = c.drawTrackerPoint);
		x(I.prototype, {
			setItemEvents: function(k, r, n) {
				var t = this,
					m = t.chart.renderer.boxWrapper,
					l = "highcharts-legend-" + (k.series ? "point" : "series") + "-active";
				(n ? r : k.legendGroup).on("mouseover", function() {
					k.setState("hover");
					m.addClass(l);
					r.css(t.options.itemHoverStyle)
				}).on("mouseout", function() {
					r.css(O(k.visible ? t.itemStyle : t.itemHiddenStyle));
					m.removeClass(l);
					k.setState()
				}).on("click", function(d) {
					var e = function() {
						k.setVisible && k.setVisible()
					};
					d = {
						browserEvent: d
					};
					k.firePointEvent ? k.firePointEvent("legendItemClick", d, e) : o(k, "legendItemClick", d, e)
				})
			},
			createCheckboxForItem: function(d) {
				d.checkbox = j("input", {
					type: "checkbox",
					checked: d.selected,
					defaultChecked: d.selected
				}, this.options.itemCheckboxStyle, this.chart.container);
				w(d.checkbox, "click", function(e) {
					o(d.series || d, "checkboxClick", {
						checked: e.target.checked,
						item: d
					}, function() {
						d.select()
					})
				})
			}
		});
		G.legend.itemStyle.cursor = "pointer";
		x(z.prototype, {
			showResetZoom: function() {
				var l = this,
					k = G.lang,
					t = l.options.chart.resetZoomButton,
					r = t.theme,
					n = r.states,
					m = "chart" === t.relativeTo ? null : "plotBox";
				this.resetZoomButton = l.renderer.button(k.resetZoom, null, null, function() {
					l.zoomOut()
				}, r, n && n.hover).attr({
					align: t.position.align,
					title: k.resetZoomTitle
				}).addClass("highcharts-reset-zoom").add().align(t.position, !1, m)
			},
			zoomOut: function() {
				var d = this;
				o(d, "selection", {
					resetSelection: !0
				}, function() {
					d.zoom()
				})
			},
			zoom: function(e) {
				var d, m = this.pointer,
					l = !1,
					k;
				!e || e.resetSelection ? (H(this.axes, function(f) {
					d = f.zoom()
				}), m.initiated = !1) : H(e.xAxis.concat(e.yAxis), function(f) {
					var g = f.axis;
					m[g.isXAxis ? "zoomX" : "zoomY"] && (d = g.zoom(f.min, f.max), g.displayBtn && (l = !0))
				});
				k = this.resetZoomButton;
				l && !k ? this.showResetZoom() : !l && N(k) && (this.resetZoomButton = k.destroy());
				d && this.redraw(M(this.options.chart.animation, e && e.animation, 100 > this.pointCount))
			},
			pan: function(g, f) {
				var m = this,
					l = m.hoverPoints,
					k;
				l && H(l, function(d) {
					d.setState()
				});
				H("xy" === f ? [1, 0] : [1], function(D) {
					D = m[D ? "xAxis" : "yAxis"][0];
					var C = D.horiz,
						A = g[C ? "chartX" : "chartY"],
						C = C ? "mouseDownX" : "mouseDownY",
						y = m[C],
						v = (D.pointRange || 0) / 2,
						u = D.getExtremes(),
						t = D.toValue(y - A, !0) + v,
						v = D.toValue(y + D.len - A, !0) - v,
						r = v < t,
						y = r ? v : t,
						t = r ? t : v,
						v = Math.min(u.dataMin, D.toValue(D.toPixels(u.min) - D.minPixelPadding)),
						r = Math.max(u.dataMax, D.toValue(D.toPixels(u.max) + D.minPixelPadding)),
						e;
					e = v - y;
					0 < e && (t += e, y = v);
					e = t - r;
					0 < e && (t = r, y -= e);
					D.series.length && y !== u.min && t !== u.max && (D.setExtremes(y, t, !1, !1, {
						trigger: "pan"
					}), k = !0);
					m[C] = A
				});
				k && m.redraw(!1);
				p(m.container, {
					cursor: "move"
				})
			}
		});
		x(i.prototype, {
			select: function(g, e) {
				var m = this,
					l = m.series,
					k = l.chart;
				g = M(g, !m.selected);
				m.firePointEvent(g ? "select" : "unselect", {
					accumulate: e
				}, function() {
					m.selected = m.options.selected = g;
					l.options.data[K(m, l.data)] = m.options;
					m.setState(g && "select");
					e || H(k.getSelectedPoints(), function(d) {
						d.selected && d !== m && (d.selected = d.options.selected = !1, l.options.data[K(d, l.data)] = d.options, d.setState(""), d.firePointEvent("unselect"))
					})
				})
			},
			onMouseOver: function(e) {
				var d = this.series.chart,
					f = d.pointer;
				e = e ? f.normalize(e) : f.getChartCoordinatesFromPoint(this, d.inverted);
				f.runPointActions(e, this)
			},
			onMouseOut: function() {
				var d = this.series.chart;
				this.firePointEvent("mouseOut");
				H(d.hoverPoints || [], function(e) {
					e.setState()
				});
				d.hoverPoints = d.hoverPoint = null
			},
			importEvents: function() {
				if (!this.hasImportedEvents) {
					var f = this,
						e = O(f.series.options.point, f.options).events;
					f.events = e;
					P.objectEach(e, function(g, d) {
						w(f, d, g)
					});
					this.hasImportedEvents = !0
				}
			},
			setState: function(V, U) {
				var S = Math.floor(this.plotX),
					R = this.plotY,
					Q = this.series,
					F = Q.options.states[V] || {},
					E = L[Q.type].marker && Q.options.marker,
					D = E && !1 === E.enabled,
					r = E && E.states && E.states[V] || {},
					J = !1 === r.enabled,
					Y = Q.stateMarkerGraphic,
					X = this.marker || {},
					W = Q.chart,
					T = Q.halo,
					f, e = E && Q.markerAttribs;
				V = V || "";
				if (!(V === this.state && !U || this.selected && "select" !== V || !1 === F.enabled || V && (J || D && !1 === r.enabled) || V && X.states && X.states[V] && !1 === X.states[V].enabled)) {
					e && (f = Q.markerAttribs(this, V));
					if (this.graphic) {
						this.state && this.graphic.removeClass("highcharts-point-" + this.state), V && this.graphic.addClass("highcharts-point-" + V), this.graphic.animate(Q.pointAttribs(this, V), M(W.options.chart.animation, F.animation)), f && this.graphic.animate(f, M(W.options.chart.animation, r.animation, E.animation)), Y && Y.hide()
					} else {
						if (V && r) {
							E = X.symbol || Q.symbol;
							Y && Y.currentSymbol !== E && (Y = Y.destroy());
							if (Y) {
								Y[U ? "animate" : "attr"]({
									x: f.x,
									y: f.y
								})
							} else {
								E && (Q.stateMarkerGraphic = Y = W.renderer.symbol(E, f.x, f.y, f.width, f.height).add(Q.markerGroup), Y.currentSymbol = E)
							}
							Y && Y.attr(Q.pointAttribs(this, V))
						}
						Y && (Y[V && W.isInsidePlot(S, R, W.inverted) ? "show" : "hide"](), Y.element.point = this)
					}(S = F.halo) && S.size ? (T || (Q.halo = T = W.renderer.path().add((this.graphic || Y).parentGroup)), T[U ? "animate" : "attr"]({
						d: this.haloPath(S.size)
					}), T.attr({
						"class": "highcharts-halo highcharts-color-" + M(this.colorIndex, Q.colorIndex)
					}), T.point = this, T.attr(x({
						fill: this.color || Q.color,
						"fill-opacity": S.opacity,
						zIndex: -1
					}, S.attributes))) : T && T.point && T.point.haloPath && T.animate({
						d: T.point.haloPath(0)
					});
					this.state = V
				}
			},
			haloPath: function(d) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - d, this.plotY - d, 2 * d, 2 * d)
			}
		});
		x(h.prototype, {
			onMouseOver: function() {
				var e = this.chart,
					d = e.hoverSeries;
				if (d && d !== this) {
					d.onMouseOut()
				}
				this.options.events.mouseOver && o(this, "mouseOver");
				this.setState("hover");
				e.hoverSeries = this
			},
			onMouseOut: function() {
				var g = this.options,
					f = this.chart,
					l = f.tooltip,
					k = f.hoverPoint;
				f.hoverSeries = null;
				if (k) {
					k.onMouseOut()
				}
				this && g.events.mouseOut && o(this, "mouseOut");
				!l || this.stickyTracking || l.shared && !this.noSharedTooltip || l.hide();
				this.setState()
			},
			setState: function(k) {
				var e = this,
					r = e.options,
					n = e.graph,
					m = r.states,
					l = r.lineWidth,
					r = 0;
				k = k || "";
				if (e.state !== k && (H([e.group, e.markerGroup, e.dataLabelsGroup], function(d) {
						d && (e.state && d.removeClass("highcharts-series-" + e.state), k && d.addClass("highcharts-series-" + k))
					}), e.state = k, !m[k] || !1 !== m[k].enabled) && (k && (l = m[k].lineWidth || l + (m[k].lineWidthPlus || 0)), n && !n.dashstyle)) {
					for (l = {
							"stroke-width": l
						}, n.animate(l, M(e.chart.options.chart.animation, m[k] && m[k].animation)); e["zone-graph-" + r];) {
						e["zone-graph-" + r].attr(l), r += 1
					}
				}
			},
			setVisible: function(m, l) {
				var y = this,
					v = y.chart,
					u = y.legendItem,
					t, r = v.options.chart.ignoreHiddenSeries,
					n = y.visible;
				t = (y.visible = m = y.options.visible = y.userOptions.visible = void 0 === m ? !n : m) ? "show" : "hide";
				H(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(d) {
					if (y[d]) {
						y[d][t]()
					}
				});
				if (v.hoverSeries === y || (v.hoverPoint && v.hoverPoint.series) === y) {
					y.onMouseOut()
				}
				u && v.legend.colorizeItem(y, m);
				y.isDirty = !0;
				y.options.stacking && H(v.series, function(d) {
					d.options.stacking && d.visible && (d.isDirty = !0)
				});
				H(y.linkedSeries, function(d) {
					d.setVisible(m, !1)
				});
				r && (v.isDirtyBox = !0);
				!1 !== l && v.redraw();
				o(y, t)
			},
			show: function() {
				this.setVisible(!0)
			},
			hide: function() {
				this.setVisible(!1)
			},
			select: function(d) {
				this.selected = d = void 0 === d ? !this.selected : d;
				this.checkbox && (this.checkbox.checked = d);
				o(this, d ? "select" : "unselect")
			},
			drawTracker: c.drawTrackerGraph
		})
	})(b);
	(function(g) {
		var k = g.Chart,
			d = g.each,
			h = g.inArray,
			j = g.isArray,
			c = g.isObject,
			i = g.pick,
			e = g.splat;
		k.prototype.setResponsive = function(q) {
			var o = this.options.responsive,
				n = [],
				p = this.currentResponsive;
			o && o.rules && d(o.rules, function(f) {
				void 0 === f._id && (f._id = g.uniqueKey());
				this.matchResponsiveRule(f, n, q)
			}, this);
			var r = g.merge.apply(0, g.map(n, function(f) {
					return g.find(o.rules, function(l) {
						return l._id === f
					}).chartOptions
				})),
				n = n.toString() || void 0;
			n !== (p && p.ruleIds) && (p && this.update(p.undoOptions, q), n ? (this.currentResponsive = {
				ruleIds: n,
				mergedOptions: r,
				undoOptions: this.currentOptions(r)
			}, this.update(r, q)) : this.currentResponsive = void 0)
		};
		k.prototype.matchResponsiveRule = function(o, n) {
			var f = o.condition;
			(f.callback || function() {
				return this.chartWidth <= i(f.maxWidth, Number.MAX_VALUE) && this.chartHeight <= i(f.maxHeight, Number.MAX_VALUE) && this.chartWidth >= i(f.minWidth, 0) && this.chartHeight >= i(f.minHeight, 0)
			}).call(this) && n.push(o._id)
		};
		k.prototype.currentOptions = function(n) {
			function m(q, s, p, o) {
				var r;
				g.objectEach(q, function(f, t) {
					if (!o && -1 < h(t, ["series", "xAxis", "yAxis"])) {
						for (q[t] = e(q[t]), p[t] = [], r = 0; r < q[t].length; r++) {
							s[t][r] && (p[t][r] = {}, m(f[r], s[t][r], p[t][r], o + 1))
						}
					} else {
						c(f) ? (p[t] = j(f) ? [] : {}, m(f, s[t] || {}, p[t], o + 1)) : p[t] = s[t] || null
					}
				})
			}
			var l = {};
			m(n, this.options, l, 0);
			return l
		}
	})(b);
	return b
});
var productListModule = {
	tempData: {},
	timer: null,
	imgIdx: 0,
	isLoad: false,
	init: function() {
		$(".pan_list").on("mouseenter", ".shifting", function() {
			$("#receipt_tip").show()
		});
		$(".pan_list").on("mouseleave", ".shifting", function() {
			$("#receipt_tip").hide()
		});
		$("#tmpl_load").load("/resources/template/catalogTemp.html", function() {
			var a = window.location.href;
			if (webSiteShareData.detailsFlag) {
				setTimeout(function() {
					detailModule.ajaxEvaluateData()
				}, 20)
			} else {
				productListModule.VisitRecord()
			}
			commonModule.ieTest()
		});
		$(".product_list_right").on("click", ".stock a", function() {
			var c = this.getAttribute("data-index");
			var a = $(this).attr("param-click") || "";
			var b = a.split("|");
			switch (c) {
				case "0":
				case "1":
				case "2":
					productListModule.sortChangeEvent(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9]);
					break;
				case "3":
					productListModule.changeShowTypeAndSubmit("SHORTLIST");
					break;
				case "4":
					productListModule.changeShowTypeAndSubmit("GRIDLIST");
					break
			}
		});
		$("#show_out_sock_product").click(function() {
			var a = $(this).attr("param-click") || "";
			var b = a.split("|");
			productListModule.sortChangeEvent(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9])
		});
		$(".list_right").on("hover", ".inside", function() {
			$(".inside").removeClass("active");
			$(this).addClass("active")
		});
		$(".list_right").on("click", ".alien a", function(d) {
			var f = this.getAttribute("data-index");
			var c = this.getAttribute("data-productId");
			switch (f) {
				case "0":
					var b = c.split(",");
					$(this).parent().parent().next().next().find(".xuxian").removeClass("active");
					$(this).addClass("active").siblings().removeClass("active");
					productListModule.showGlobalSimilarProduct(b[0], b[1]);
					break;
				case "1":
					var b = c.split(",");
					$(this).parent().parent().next().next().find(".xuxian").removeClass("active");
					$(this).addClass("active").siblings().removeClass("active");
					productListModule.showGlobalSimilarProduct(b[0], b[1]);
					break;
				case "2":
					$(this).siblings(".alien_more").children("a").removeClass("active");
					$(this).parent().next().next().find(".xuxian").addClass("active");
					productListModule.spreadGradeLevelList(c);
					break;
				case "3":
					var a = webSiteShareData.lcMallContextPath + "/product/compareProductDetailList.html?productIds=" + $(this).attr("data-productId");
					window.open(a);
					break
			}
		});
		$(".list_right").on("hover", ".alien .a_bt02,.alien .a_bt04", function() {
			var a = ($(this).siblings(".a_bt01").offset() || $(this).siblings(".a_bt03").offset()).left;
			var b = $(this).offset().left - a + $(this).width() / 2 - 45;
			$(this).parent().siblings(".grade_cue").toggle().css("left", b + "px")
		});
		$("#searchInResult").click(function() {
			var a = $(this).attr("param-click") || "";
			var b = a.split("|");
			productListModule.chooseStartLocalSearch(this, this.form, b[0], b[1], b[2], b[3], b[4], b[5], b[6])
		});
		$(".ch_right a").click(function() {
			if ($(this).text() == "更多") {
				$(this).text("收起");
				filterData.lcCatalogPrefix = webSiteShareData.lcCatalogPrefix;
				if ($(this).hasClass("product_standard")) {
					var a = {};
					$("#standardList").html("");
					$("#standardListTmpl").tmpl(filterData).appendTo("#standardList")
				} else {
					$("#brandList").html("");
					$("#brandListTmpl").tmpl(filterData).appendTo("#brandList")
				}
				$(this).text("收起")
			} else {
				if ($(this).hasClass("product_standard")) {
					$("#standardList").html("")
				} else {
					$("#brandList").html("")
				}
				$(this).text("更多")
			}
		});
		$("#more_standard").click(function() {
			productListModule.selectMore(this, $("#selectMoreTmpl"))
		});
		$(".product_list_right").on("click", ".hoice_ys input", function() {
			if (this.value == "取消") {
				$(this).closest(".pick").hide().prev().show()
			} else {
				if (this.value == "确定") {
					var a = $(this).attr("param-click") || "";
					var b = a.split("|");
					productListModule.commitMoreConditionCatalog(b[0] || "", b[1] || "", b[2] || "", b[3] || "", b[4] || "", b[5] || "")
				}
			}
		});
		$("#more_brand").click(function() {
			productListModule.selectMore(this, $("#selectMoreBrandTmpl"))
		});
		$("#more_method").click(function() {
			productListModule.selectMore(this, $("#selectMoreMethodTmpl"))
		});
		$(".list_left .record").on("click", "div b", function() {
			$(this).toggleClass("active").parent().next().slideToggle(400)
		});
		$(".list_left .slide_all").click(function() {
			var a = this.className;
			if (a == "slide_all") {
				$(".list_left .record_item ul").slideDown(400);
				$(this).addClass("active");
				$(".list_left .record div b").addClass("active")
			} else {
				$(this).removeClass("active");
				$(".list_left .record_item ul").slideUp(400);
				$(".list_left .record div b").removeClass("active")
			}
		});
		$(".list_right").on("click", ".lower .pp01", function() {
			var a = $(this).attr("param-click").split("|");
			productListModule.showPDFImgInit(a[0], a[1])
		});
		$("#lookPDF").on("click", ".title span", function() {
			$(".hint_cue").hide();
			$("#lookPDF").hide()
		});
		$(document).on("click", ".l02_yb .down a,#downloadFile", function() {
			var a = $(this).attr("param-click");
			fileModule.downloadFileInit(a)
		});
		$("#hint_down").on("click", ".down_tit a", function() {
			$(".hint_cue").hide();
			$("#hint_down").hide()
		});
		$(".list_right").on("click", ".recent_buy", function() {
			var a = $(this).attr("param-click") || "";
			var b = a.split("|");
			productListModule.showThisProductSaleRecord(b[0], b[1], this);
			commonModule.showLoginParams.push(b[0], b[1], this)
		});
		$(".list_right").on("click", ".replenish_notify", function() {
			var a = this.getAttribute("param-click").split("|");
			$.ajax({
				type: "GET",
				url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!checkCustomerLoginJsonp.action?callback='loadCustomerLoginData'",
				dataType: "jsonp",
				timeout: 15000,
				success: function(b) {
					if (b.result == "yes") {
						productListModule.showReplenishNotify(a[0], a[1], a[2])
					} else {
						commonModule.responseLoginMask = "PutProductInCart";
						commonModule.showLoginParams[0] = {
							method: productListModule.showReplenishNotify,
							param: [a[0], a[1], a[2]]
						};
						commonModule.showWindowLogin()
					}
				},
				error: function() {
					commonModule.alertFail(constantModule.errorPrompt)
				}
			})
		});
		$(".product_remind").on("click", ".product_remind_btn .submint_tj", function() {
			productListModule.submitReplenishNotify(this)
		});
		$(".product_remind").on("click", ".product_remind_tit a,.product_remind_btn .submint_fq", function() {
			$(".product_remind").hide();
			$(".hint_cue").hide();
			calendar.hide()
		});
		$(".product_remind").on("click", ".product_remind_cont span", function() {
			calendar = new Calendar();
			calendar.show($("#replenishDate")[0]);
			$("#__calendarPanel").css({
				position: "fixed"
			})
		});
		$(".list_right").on("click", ".note_btn a", function(a) {
			a.stopPropagation();
			$(this).closest(".sold_note").hide().html("")
		});
		$(".list_right").on("click", ".note_login a", function(a) {
			a.stopPropagation();
			window.location.href = webSiteShareData.lcMallContextPath + "/home/register.html"
		});
		$(".list_right").on("click", ".note_login input", function(a) {
			a.stopPropagation();
			commonModule.responseLoginMask = "ProductSales";
			commonModule.showWindowLogin()
		});
		$(".list_right").on("click", ".qs04 a", function() {
			var a = $(this).attr("param-click") || "";
			var b = a.split("|");
			if (!productListModule.isLoad) {
				$.getScript("/resources/js/plugins/highcharts.js").done(function() {
					productListModule.isLoad = true;
					productListModule.showPriceTrend(b[0], b[1], b[2])
				})
			} else {
				productListModule.showPriceTrend(b[0], b[1], b[2])
			}
		});
		$(document).on("click", ".trend_tit a", function(a) {
			$(".trend").remove();
			$(".hint_cue").hide()
		});
		$(".list_right").on("mouseenter", ".batch_state", function() {
			var a = $(this).siblings(".agios");
			$("#bstateTmpl").tmpl().appendTo(a);
			a.show()
		});
		$(".list_right").on("mouseleave", ".batch_state", function() {
			var a = $(this).siblings(".agios");
			a.hide().html("")
		});
		$(".list_right").on("mouseenter", ".zy_xt_discount", function() {
			var a = {};
			a.lcMallContextPath = webSiteShareData.lcMallContextPath;
			var b = $(this).siblings(".agio");
			$("#agioTmpl").tmpl(a).appendTo(b);
			if (commonModule.isICMember == "true") {
				$(".agio_tips2 .red1").remove()
			}
			b.show()
		});
		$(".list_right").on("mouseleave", ".zy_xt", function() {
			var a = $(this).children(".agio");
			a.hide().html("")
		});
		$(".list_right").on("mouseleave", ".alien", function() {
			var a = $(this).children(".agio");
			a.hide().html("")
		});
		$(".list_right").on("click", ".agio_btn", function() {
			window.open(webSiteShareData.lcMallContextPath + "/product/icConsgin.html")
		});
		$(".list_right").on("click", ".agio_btn1", function() {
			window.open(webSiteShareData.lcMallContextPath + "/order/icConsignRegulation.html#discount98")
		});
		$(".list_right").on("click", ".common_sc", function() {
			productListModule.insertProductFavoriteRecord($(this).attr("data-productId"))
		});
		$(".list_right").on("click", ".one .db", function() {
			var a = $(this).attr("data-add_compare");
			commonModule.addProductToCompare(a)
		});
		$("#collect").on("click", ".collect_tit a,.col_btn", function() {
			$("#collect").hide().html("")
		});
		$(".list_right").on("mouseenter", ".one .a_01,.one .a_02,.one .a_03,.one .a_04,.one .a_05,.one .a_06", function(d) {
			var a = {};
			if (this.className == "a_01") {
				a.content = "IC代付代售，指由会员提供型号并出资，由立创商城负责采购（确保原装正品）并销售，可能享受意想不到的可观代售收入！现在还有本金最高万元保底，赶紧来参与吧！";
				a.url = webSiteShareData.lcMallContextPath + "/product/icConsgin.html"
			} else {
				if (this.className == "a_02") {
					a.content = "当前商品为了能让更多的客户购买到，商城采取限购措施。当库存过低时商品限制" + webSiteShareData.limitDays + "天内整盘购买只允许买" + webSiteShareData.maxEncapsulationsAllowedBuy + "盘，样片不限制。";
					a.url = webSiteShareData.lcMallContextPath + "/bulletin/details_1279.html"
				} else {
					if (this.className == "a_03") {
						a.content = "兼职选型，指“会员提供的IC型号审核通过后，由立创商城全额出资采购（确保原装正品）并销售，选型工程师可享受有效期为一年的商品销售额回报”的业务。回报期内，立创商城兼职选型工程师拥有优先IC代付代售权！0风险、0投入、高回报，赶紧加入立创商城兼职选型工程师阵营吧！";
						a.url = webSiteShareData.lcMallContextPath + "/jzxxgcs.html"
					} else {
						if (this.className == "a_04" || this.className == "a_05" || this.className == "a_06") {
							a.content = "立创商城官方团队从Digi-Key、贸泽、艾睿等海外正品电子商城采购元器件样品，入库到商城仓库进行现货销售，从而为您节省高昂的运费和时间成本。";
							a.url = webSiteShareData.lcMallContextPath + "/bulletin/details_11553.html"
						}
					}
				}
			}
			var c = d.pageY + $(this).height() - d.offsetY,
				b = d.pageX - d.offsetX + $(this).height() / 2;
			$(".dy_pay").show().html("");
			$("#dy_payTmpl").tmpl(a).appendTo(".dy_pay");
			$(".dy_pay").css("top", c + "px").css("left", b + "px")
		});
		$(".list_right").on("mouseleave", ".one .a_01,.one .a_02,.one .a_03,.one .a_04,.one .a_05,.one .a_06", function(a) {
			var b = setTimeout(function() {
				$(".dy_pay").hide().html("")
			}, 10);
			$(".dy_pay").on({
				mouseenter: function() {
					clearTimeout(b);
					b = null;
					$(".dy_pay").show()
				},
				mouseleave: function() {
					$(".dy_pay").hide()
				}
			})
		});
		$(".list_right").on("mouseenter", ".warn", function(d) {
			var a = {};
			a.content = "该链接的内容为商城用户提供，代表发帖者个人的观点，仅供参考!";
			var c = d.pageY + $(this).height() - d.offsetY,
				b = d.pageX - d.offsetX + $(this).height() / 2;
			$(".dy_pay").show().html("");
			$("#dy_payTmpl").tmpl(a).appendTo(".dy_pay");
			$(".dy_pay").css("top", c + "px").css("left", b - 29 + "px");
			$(".dy_pay").width(250);
			$(".dy_pay02").width(245);
			$(".dy_pay02 span").width(230);
			$(".dy_pay02 a").hide()
		});
		$(".list_right").on("mouseleave", " .warn", function(a) {
			var b = setTimeout(function() {
				$(".dy_pay").hide().html("")
			}, 10);
			$(".dy_pay").on({
				mouseenter: function() {
					clearTimeout(b);
					b = null;
					$(".dy_pay").show()
				},
				mouseleave: function() {
					$(".dy_pay").hide()
				}
			})
		});
		$(".list_right").on("mouseenter", ".one img", function(g) {
			var c = this.getAttribute("data-urls");
			if (!c) {
				return
			}
			if (productListModule.timer) {
				clearTimeout(productListModule.timer);
				productListModule.timer = null
			}
			var a = {
				urls: this.getAttribute("data-urls").split("<$>"),
				productid: this.getAttribute("productid"),
				lcMallContextPath: webSiteShareData.lcMallContextPath
			};
			var h = $(this).attr("src").replace("product/breviary", "product/source");
			var b = $(".img_show");
			var f = g.pageY - g.offsetY + $(this).height() / 2 - 180,
				d = g.pageX - g.offsetX + $(this).height();
			b.show().html("");
			$("#imgShowTmpl").tmpl(a).appendTo(b);
			$(".img_show2 span img").attr("src", h);
			if (a.urls.length > 5) {
				$(".show_switch a").addClass("active")
			}
			b.css("top", f + "px").css("left", d + "px");
			$(".img_cont img:gt(4)").hide();
			$(".img_cont img:eq(0)").addClass("img_cls")
		});
		$(".img_show").on("click", ".img_cont img", function(a) {
			var b = $(this).attr("src").replace("product/breviary", "product/source");
			$(".img_show2 span img").attr("src", b);
			$(this).addClass("img_cls").siblings().removeClass("img_cls");
			$(".img_show2 span img").attr("index", this.getAttribute("index"))
		});
		$(".img_show").on("click", ".img_left", function() {
			var a = $(".img_cont img").length;
			if (a <= 5) {
				return
			}
			if (productListModule.imgIdx > 0) {
				productListModule.imgIdx -= 1
			}
			productListModule.imgChange()
		});
		$(".img_show").on("click", ".img_right", function() {
			var a = $(".img_cont img").length;
			if (a <= 5) {
				return
			}
			if (productListModule.imgIdx < a - 5) {
				productListModule.imgIdx += 1
			}
			productListModule.imgChange()
		});
		$(".img_show").on("click", "span a", function() {
			var c = this.getAttribute("productid");
			var a = $(this).find("img").attr("index");
			var b = document.createElement("a");
			b.setAttribute("href", "/product/jpg_" + c + "_" + a + ".html");
			b.setAttribute("target", "_blank");
			b.click()
		});
		$(".list_right").on("mouseleave", ".one img", function(a) {
			productListModule.timer = setTimeout(function() {
				$(".img_show").hide().html("")
			}, 10)
		});
		$(".img_show").on({
			mouseenter: function() {
				clearTimeout(productListModule.timer);
				productListModule.timer = null;
				$(".img_show").show()
			},
			mouseleave: function() {
				$(".img_show").hide()
			}
		});
		$(".list_right").on("click", ".inside .notice", function() {
			var a = $(this).attr("param-click").split("|");
			productListModule.showAddNotifyDiv(a[0], a[1], this, a[2], a[3])
		});
		$(document).on("click", ".notice_tit a", function() {
			$(".hint_cue").hide();
			$(".notice_wraper").remove()
		});
		$(document).on("click", ".n_fill .fill_btn1", function() {
			productListModule.addNotify()
		});
		$(".list_right").on("click", ".commom_pp04", function() {
			var a = $(this).attr("param-click").split(",");
			a.unshift(0);
			productListModule.goBlankBoard.apply(productListModule, a)
		});
		$(".arm_give").on("click", ".give_tle a", function() {
			$(".hint_cue").hide();
			$(".arm_give").hide()
		});
		$(".list_right").on("click", ".commom_pp05", function() {
			var a = $(this).attr("param-click").split(",");
			a.unshift(1);
			productListModule.goBlankBoard.apply(productListModule, a)
		});
		$(document).on("click", ".remind .remind_tle a,.remind .remind_btn .rem_btn2", function() {
			$(".remind").remove();
			$(".hint_cue").hide()
		});
		$(document).on("click", ".list_b_an input", function() {
			productListModule.noCustomerWantProduct()
		});
		$(document).on("click", "#helpBuy", function() {
			productListModule.checkBrokageProduct(this)
		});
		$(".current").on("click", ".common_filter a,.cleanCondition", function() {
			var a = $(this).attr("param-click").split("|");
			productListModule.cancelOneConditionCatalog(a[0], a[1])
		});
		productListModule.scrollLoad();
		$("#errorCorrectionFilter").click(function() {
			productListModule.showMaskDiv(filterData.catalogId)
		})
	},
	getNum: function(c, b) {
		var a = parseInt(b / c);
		if (a >= 1) {
			$(".yuanPanNum").show();
			$(".noYuanPan").hide();
			$(".sigleNum").show();
			$(".yuanPanNum b").html(a);
			$(".sigleNum b").html(a * c);
			$(".num_txt").eq(1).val(a)
		} else {
			$(".yuanPanNum").hide();
			$(".noYuanPan").show();
			$(".sigleNum").hide();
			$(".yuanPanNum b").html(a);
			$(".num_txt").eq(1).val(a)
		}
	},
	imgChange: function() {
		$(".img_cont img").each(function(a, b) {
			if (a >= productListModule.imgIdx && a < productListModule.imgIdx + 5) {
				$(b).show()
			} else {
				$(b).hide()
			}
		})
	},
	selectMore: function(c, a) {
		var b = $(c).closest(".choice").next();
		$(c).closest(".choice").hide();
		b.show().html("");
		a.tmpl(filterData).appendTo(b)
	},
	commitMoreConditionCatalog: function(k, c, a, n, m, j) {
		var g = $("#queryBeginPrice").val();
		a = $("#localQueryKeyword").val();
		if (g.length > 0 && isNaN(g) || parseFloat(g) < 0) {
			commonModule.alertFail(constantModule.priceErrorPrompt, function() {
				$("#queryBeginPrice").focus()
			});
			return
		}
		var f = $("#queryEndPrice").val();
		if (f.length > 0 && isNaN(f) || parseFloat(f) < 0) {
			commonModule.alertFail(constantModule.priceErrorPrompt, function() {
				$("#queryEndPrice").focus()
			});
			return
		}
		if (g.length > 0 && f.length > 0 && parseFloat(g) > parseFloat(f)) {
			commonModule.alertFail(constantModule.glPricePrompt, function() {
				$("#queryEndPrice").focus()
			});
			return
		}
		if (j == "brand") {
			var d = $("input[name=brandCheckbox]:checked");
			if (d.length == 0) {
				commonModule.alertFail(constantModule.selectMorePrompt);
				return false
			}
			var l = "";
			for (var e = 0; e < d.length; e++) {
				if (l == "") {
					l = d[e].value
				} else {
					l = l + "$" + d[e].value
				}
			}
			var b = webSiteShareData.lcCatalogPrefix + "_" + k + "_" + c + "_" + l + ".html?queryProductArrange=" + n + "&keyword=" + encodeURIComponent(encodeURIComponent(a)) + "&queryBeginPrice=" + g + "&queryEndPrice=" + f + "&queryProductStandard=" + m;
			window.location.href = b
		}
		if (j == "encapsulationModel") {
			var d = $("input[name=encapsulationModelCheckbox]:checked");
			if (d.length == 0) {
				commonModule.alertFail(constantModule.selectMorePrompt);
				return false
			}
			var l = "";
			for (var e = 0; e < d.length; e++) {
				if (l == "") {
					l = d[e].value
				} else {
					l = l + "$" + d[e].value
				}
			}
			var b = webSiteShareData.lcCatalogPrefix + "_" + k + "_" + c + "_" + m + ".html?queryProductArrange=" + n + "&keyword=" + encodeURIComponent(encodeURIComponent(a)) + "&queryBeginPrice=" + g + "&queryEndPrice=" + f + "&queryProductStandard=" + l;
			window.location.href = b
		}
		if (j == "queryProductArrange") {
			var h = $("input[name=arrangeCheckbox]:checked");
			if (h.length == 0) {
				commonModule.alertFail(constantModule.selectMorePrompt);
				return false
			}
			var l = "";
			for (var e = 0; e < h.length; e++) {
				if (l == "") {
					l = h[e].value
				} else {
					l = l + "$" + h[e].value
				}
			}
			var b = webSiteShareData.lcCatalogPrefix + "_" + k + "_" + c + "_" + m + ".html?queryProductArrange=" + l + "&keyword=" + encodeURIComponent(encodeURIComponent(a)) + "&queryBeginPrice=" + g + "&queryEndPrice=" + f + "&queryProductStandard=" + n;
			window.location.href = b
		}
	},
	chooseStartLocalSearch: function(c, b, l, d, m, e, j, h, k) {
		var i = $("#localQueryKeyword").val();
		if (i == "请输入关键字") {
			i == ""
		}
		var g = $("#queryBeginPrice").val();
		if (g.length > 0 && isNaN(g) || parseFloat(g) < 0) {
			commonModule.alertFail(constantModule.priceErrorPrompt);
			return
		}
		var f = $("#queryEndPrice").val();
		if (f.length > 0 && isNaN(f) || parseFloat(f) < 0) {
			commonModule.alertFail(constantModule.priceErrorPrompt);
			return
		}
		if (g.length > 0 && f.length > 0 && parseFloat(g) > parseFloat(f)) {
			commonModule.alertFail(constantModule.glPricePrompt);
			return
		}
		var a = webSiteShareData.lcCatalogPrefix + "_" + (l.substring(0, l.lastIndexOf("-")) + "-0") + "-" + d + "-0-" + e + "_" + j + ".html";
		a += "?queryProductArrange=" + h + "&keyword=" + encodeURIComponent(encodeURIComponent(i)) + "&queryBeginPrice=" + g + "&queryEndPrice=" + f + "&queryProductStandard=" + k;
		c.disabled = true;
		window.location.href = a
	},
	changeShowTypeAndSubmit: function(b) {
		if (b != null && b != $("#queryShowType").val()) {
			var a = webSiteShareData.lcMallContextPath + "/so/setQueryDisplayTypeInSession";
			$.ajax({
				type: "POST",
				url: a,
				data: "displayType=" + b,
				async: false,
				success: function(c) {
					if (c == "success") {
						window.location.reload(true)
					}
				},
				error: function() {
					commonModule.alertFail(constantModule.errorPrompt)
				}
			})
		}
	},
	sortChangeEvent: function(o, n, e, d, a, h, j, b, k, m) {
		if (h == "" || h == undefined) {
			j = 0
		} else {
			if (h == "minusStockNumber,5,false") {
				j = 5
			} else {
				if (h == "minusStockNumber,5,true") {
					j = 4
				} else {
					if (h == "productConsultPrice,5,true" || h == "productConsultPriceRatio,5,true") {
						j = 2
					} else {
						if (h == "productConsultPrice,5,false" || h == "productConsultPriceRatio,5,false") {
							j = 1
						}
					}
				}
			}
		}
		if (b == null) {
			b = 0
		}
		$("#querySortBySign").val(j);
		if (o == "search_by_group") {
			var i = $("#queryBeginPrice").val();
			if (i.length > 0 && isNaN(i) || parseFloat(i) < 0) {
				commonModule.alertFail(constantModule.priceErrorPrompt);
				return
			}
			var g = $("#queryEndPrice").val();
			if (g.length > 0 && isNaN(g) || parseFloat(g) < 0) {
				commonModule.alertFail(constantModule.priceErrorPrompt);
				return
			}
			if (i.length > 0 && g.length > 0 && parseFloat(i) > parseFloat(g)) {
				commonModule.alertFail(constantModule.glPricePrompt);
				return
			}
			var l = $("#show_out_sock_product").get(0);
			var f = l.checked ? 0 : 1;
			var c = n.substring(0, n.lastIndexOf("-")) + "-" + e + "-" + d + "-" + j + "-" + f + "_" + b + ".html?queryProductArrange=" + k + "&keyword=" + a + "&queryBeginPrice=" + i + "&queryEndPrice=" + g + "&queryProductStandard=" + m;
			window.location.href = webSiteShareData.lcCatalogPrefix + "_" + c
		}
	},
	showPriceTrend: function(b, c, d) {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!showProductPriceTrendJsonp.action?callback='loadPriceTrendData'&enProductId=" + b + "&theRatio=" + c;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				var f = g.isChangeUnitFlag;
				var j = d;
				var l = "";
				if (g.status == "success") {
					if (f == "yes") {
						j = g.productMinEncapsulationUnit;
						l = "(1" + g.productMinEncapsulationUnit + "有" + g.productMinEncapsulationNumber + d + ")"
					}
					var m = g;
					m.showText = l;
					$(".hint_cue").css("height", $(document).height() + "px");
					$(".hint_cue").show();
					$(".trend").html("");
					$("#priceTrendTmpl").tmpl(m).appendTo($("body"));
					var n = [];
					var k = [];
					for (var h = 0, e = m.data.length; h < e; h++) {
						n.push(m.data[h].label);
						k.push(Number(m.data[h].value).toFixed(2) - 0)
					}
					$("#trendWraper").highcharts({
						chart: {
							type: "line"
						},
						title: {
							text: "商品价格趋势(￥/" + j + ")"
						},
						subtitle: {
							text: ""
						},
						xAxis: {
							categories: n
						},
						yAxis: {
							title: {
								text: "商品价格 (￥/" + j + ")"
							}
						},
						plotOptions: {
							line: {
								dataLabels: {
									enabled: true
								},
								enableMouseTracking: false
							}
						},
						series: [{
							name: "时间",
							data: k
						}]
					})
				} else {
					if (g.status == "no") {
						commonModule.alertFail(constantModule.noPriceChangePrompt)
					}
				}
			},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		})
	},
	insertProductFavoriteRecord: function(b) {
		$(":button[sign=cart_control_btn]").attr("disabled", true);
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!insertProductFavoriteRecordJsonp.action?callback='loadProductFavoriteData'&productId=" + b;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(f) {
				f = f.result;
				if (f == "success") {
					$("#collect").show().html("");
					var c = {
						content: constantModule.conlectSuccessPrompt,
						showClass: "success",
						lcMallContextPath: webSiteShareData.lcMallContextPath
					};
					$("#collectTmpl").tmpl(c).appendTo("#collect")
				} else {
					if (f == "forbid") {
						if (window.confirm(constantModule.conlectLoginPrompt)) {
							var g = document.location.href;
							if (g.indexOf("jsessionid") == -1) {
								var d = g.indexOf("?");
								if (d == -1) {
									d = g.indexOf("&")
								}
								if (d != -1) {
									var e = "";
									e += g.substring(0, d) + ";jsessionid=" + $("#product_list_session_id").val();
									e += g.substring(d, g.length);
									g = e
								} else {
									g += ";jsessionid=" + $("#product_list_session_id").val()
								}
							}
							document.location.href = webSiteShareData.casUrl + "/login?service=" + encodeURIComponent(g)
						}
					} else {
						if (f == "existed") {
							$("#collect").show().html("");
							var c = {
								content: constantModule.conlectExistedPrompt,
								showClass: "fail",
								lcMallContextPath: webSiteShareData.lcMallContextPath
							};
							$("#collectTmpl").tmpl(c).appendTo("#collect")
						} else {
							commonModule.alertFail(constantModule.errorPrompt)
						}
					}
				}
				$(":button[sign=cart_control_btn]").attr("disabled", false)
			}
		})
	},
	spreadGradeLevelList: function(a) {
		$("table[groupid=" + a + "]").attr("showStatus", "yes").show()
	},
	showGlobalSimilarProduct: function(a, b) {
		$("table[groupid=" + a + "]").attr("showStatus", "no").hide();
		var c = $("#product_tbody_line_" + b);
		c.attr("showStatus", "yes");
		c.show()
	},
	generateSessionCart: function(b) {
		if (b) {
			var a = b.split("~");
			$("#product_tbody_line_" + (a[2] || b)).addClass("product_in_cart_highlight")
		}
	},
	showAddNotifyDiv: function(c, e, b, d, a) {
		productListModule.tempData.arriveNotifyFlagId = c;
		productListModule.tempData.arriveNotifyFlagCode = e;
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!checkCustomerLoginJsonp.action?callback='loadCustomerLoginData'",
			dataType: "jsonp",
			timeout: 15000,
			success: function(h) {
				var f = h.result;
				var g = {
					customerPhone: h.customerPhone ? h.customerPhone : "",
					customerEmail: h.customerEmail ? h.customerEmail : ""
				};
				if (f == "yes") {
					if (!d || !a) {
						g.txt = "若商品到货，我们会通过邮件或短信来通知你哦~"
					} else {
						g.txt = "该商品已订货，到货数量" + d + "，预计" + parseInt(a) + "周内到货，数量有限，售完即止！到货后将通过邮件或短信来通知您哦~"
					}
					$(".hint_cue").css("height", $(document).height() + "px");
					$(".hint_cue").show();
					$("#noticeTmpl").tmpl(g).appendTo($("body"));
					return
				} else {
					commonModule.showLoginParams.push(c, e, b, d, a);
					commonModule.responseLoginMask = "ArriveNotify";
					commonModule.showWindowLogin()
				}
			},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		})
	},
	addNotify: function() {
		var b = productListModule.tempData.arriveNotifyFlagId;
		var e = productListModule.tempData.arriveNotifyFlagCode;
		var a = $("#customerPhoneText").val();
		var c = $("#customerEmailText").val();
		if (a == "" && c == "") {
			commonModule.alertFail(constantModule.noticePhonePrompt);
			return
		}
		var d = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
		if (c != "" && !d.test(c)) {
			commonModule.alertFail(constantModule.noticeEmailErrorPrompt);
			document.getElementById("customerEmailText").select();
			return
		}
		if (a != "") {
			if (isNaN(a) || a.length != 11) {
				commonModule.alertFail(constantModule.noticePhoneErrorPrompt);
				document.getElementById("customerPhoneText").select();
				return
			}
		}
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!addProductArriveNotifyJsonp.action?callback='loadProductArriveData'&productId=" + b + "&productCode=" + e + "&customerPhone=" + a + "&customerEmail=" + c,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				var f = g.result;
				if (f == "success") {
					$(".hint_cue").hide();
					$(".notice_wraper").remove();
					commonModule.alertSuccess(constantModule.noticeSuccessPrompt)
				} else {
					commonModule.alertFail(constantModule.noticeFailPrompt);
					return
				}
			},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		})
	},
	goBlankBoard: function() {
		var a = arguments;
		if (a.length == 1) {
			if (a[0] == 0) {
				commonModule.alertFail(constantModule.freeBanPrompt)
			} else {
				commonModule.alertFail(constantModule.methodBanPrompt)
			}
		} else {
			var b = "";
			for (var c = 1; c < arguments.length; c++) {
				b = b + arguments[c] + ","
			}
			$.ajax({
				type: "GET",
				url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectMultipleBoardNeedProjectInfoJsonp.action?callback='loadNeedProjectData'&productIds=" + b,
				dataType: "jsonp",
				timeout: 15000,
				success: function(e) {
					if (e.status == "success") {
						var d = $(".arm_give");
						var f = e;
						if (a[0] == 0) {
							f.title = "免费开发板赠送";
							f.subTitle = "此商品有以下免费空白开发板赠送"
						} else {
							f.title = "方案验证板选择";
							f.subTitle = "此商品有以下验证板供选择"
						}
						f.lcItemContextPath = webSiteShareData.lcItemContextPath;
						$(".hint_cue").css("height", $(document).height() + "px");
						$(".hint_cue").show();
						d.show().html("");
						$("#freeGoodsTmpl").tmpl(f).appendTo(d);
						d.css("marginTop", -d.height() / 2 + "px")
					} else {
						commonModule.alertFail(constantModule.errorPrompt)
					}
				},
				error: function(d) {
					commonModule.alertFail(constantModule.errorPrompt)
				}
			})
		}
	},
	showThisProductSaleRecord: function(d, f, g, h, c) {
		var a = webSiteShareData.lcMallContextPath + "/order/ProductSalesViewRecordAction!insertViewRecordAndCheckJsonp.action?callback='loadFromProductSaleData'&dataId=" + d + "&dataType=" + b;
		var b = "product_sale";
		var i = "";
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(l) {
				var m = l.status;
				var j = l.limitedTimes;
				i = l.isCustomerLogin;
				if (m == "fail") {
					commonModule.alertFail("抱歉，您今天查看购买记录的次数已经超过" + j + "次，请明天再试！")
				} else {
					var e = "";
					if (f && f > 0) {
						var k = webSiteShareData.lcMallContextPath + "/order/queryProductSaleJsonp.html?callback='loadProductSaleData'&queryProductId=" + d;
						$.ajax({
							type: "GET",
							url: k,
							dataType: "jsonp",
							timeout: 15000,
							success: function(q) {
								if (q && q != null) {
									var s = q;
									s.isLogin = true;
									var w = q.count;
									if (w > 0 && q.list.length > 0) {
										var t = q.list.length;
										if (i == "no") {
											s.isLogin = false;
											if (t > 2) {
												s.list.length = 2
											}
										}
									}
									$(".sold_note").hide();
									var u = c == "detail" ? $("#recent_buy_wraper .sold_note") : $(g).children(".sold_note");
									u.show().html("");
									for (var r = 0, o = s.list.length; r < o; r++) {
										var n = s.list[r].customerCode;
										s.list[r].customerCode = n.substring(0, 2) + "***" + n.substring(n.length - 2)
									}
									$("#sold_noteTmpl").tmpl(s).appendTo(u);
									if (c == "detail") {
										var v = h.pageY - h.offsetY - u.height() - $(g).height() / 3,
											p = h.pageX - h.offsetX - u.width() / 2 - 70;
										u.css("top", v + "px").css("left", p + "px")
									} else {
										u.css("top", -u.height() + "px")
									}
								}
							},
							error: function() {}
						})
					} else {
						commonModule.alertFail(constantModule.buyRecordPrompt);
						return
					}
				}
			}
		})
	},
	showPDFImgInit: function(b, c) {
		var a = webSiteShareData.lcMallContextPath + "/order/findPdfImgInfoJsonp.html?callback='loadPDFImgData'&productId=" + b;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(d) {
				if (d.msg == "success") {
					$(".hint_cue").css("height", $(document).height() + "px");
					$(".hint_cue").show();
					$("#lookPDF").show();
					$("#lookPDF").html("");
					$("#lookPDFtmpl").tmpl(d).appendTo("#lookPDF");
					$("#lookPDF ul").css("height", $(window).height() * 0.8 + "px");
					$("#lookPDF").css("marginTop", -$("#lookPDF").height() / 2 + "px")
				} else {
					commonModule.alertFail(constantModule.errorPrompt)
				}
			},
			error: function(d) {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		});
		productListModule.downFileLoadMorePDF(c)
	},
	downFileLoadMorePDF: function(a) {
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectProductPDFAndPCBListJsonp.action?callback='loadFilePDFData'&annexNumber=" + a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(f) {
				var e = f.status;
				var b = $("#downloadMorePDF");
				var c = $("#PDFNameShow");
				if (e == "success") {
					var k = f.fileList;
					for (var g = 0; g < k.length; g++) {
						var d = k[g];
						var h = d.annexRealName;
						var l = d.annexRemark;
						var j = "";
						if (d.annexType == "productpdfzip") {
							if (d.annexSuffix == "pdf" || d.annexSuffix == "PDF" || d.annexSuffix == ".pdf" || d.annexSuffix == ".PDF") {
								j = webSiteShareData.lcMallContextPath + "/product/pdf/A_" + d.annexNumber + ".PDF";
								b.attr("href", "javascript:fileModule.downloadFileNoRemark('" + j + "','" + a + "','proudct_pdf_doc_pdf','pdf');");
								b.attr("title", "点击在线预览“" + d.annexRealName + "”");
								c.html(d.annexRealName)
							}
						} else {
							if (d.annexType == "productpdf") {
								if (d.annexSuffix == "pdf" || d.annexSuffix == "PDF" || d.annexSuffix == ".pdf" || d.annexSuffix == ".PDF") {
									j = webSiteShareData.lcMallContextPath + "/product/pdf/A_" + d.annexNumber + ".PDF";
									b.attr("title", "点击在线预览“" + d.annexRealName + "”");
									b.attr("href", "javascript:fileModule.downloadFileNoRemark('" + j + "','" + a + "','new_pdf_doc_pdf','pdf');");
									c.html(d.annexRealName)
								}
							}
						}
					}
				}
			},
			error: function() {}
		})
	},
	showEnquiryDiv: function(b, a, e, d, f, h, c) {
		var g = {
			result: "",
			hotLevel: "",
			limitNumber: "",
			validStocknumber: "",
			warmText: "",
			unit: f,
			num: c || 100,
			sign: a,
			ratio: e,
			productId: d
		};
		if (c) {
			addShoppingCartModule.hideAddShoppingCartView()
		}
		if (typeof(h) != "undefined" && (h > 1)) {
			$.ajax({
				type: "GET",
				url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectProductHotLevelJsonp.action?callback='loadProductHotLevelData'&productId=" + d,
				dataType: "jsonp",
				timeout: 15000,
				success: function(i) {
					g.result = i.result;
					if (i.result == "success") {
						g.hotLevel = i.hotLevel;
						if (i.limitPercent != null) {
							g.limitNumber = parseInt(h * i.limitPercent)
						}
						g.validStocknumber = i.validstocknumber;
						if (!isNaN(g.limitNumber)) {
							g.warmText = " "
						} else {
							g.warmText = "温馨提示：该物料销量" + g.hotLevel + "，商城需足够订货量才可补充库存，起订量为" + g.limitNumber + "个"
						}
					}
				}
			})
		}
		$(".order").remove();
		$(document).off("click", ".order .order_cont2 input[data-flag=confirmed]");
		$(document).on("click", ".order .order_cont2 input[data-flag=confirmed]", function() {
			var i = $(this).attr("param-click").split("|");
			productListModule.confirmedEnquiryDiv(b, i[0], i[1], i[2], i[3], i[4], i[5], i[6])
		});
		$(document).off("click", ".order .order_tle a,.order .order_cont .order_cont2 input[data-flag=cancel]");
		$(document).on("click", ".order .order_tle a,.order .order_cont .order_cont2 input[data-flag=cancel]", function() {
			$(".order").remove();
			if (a == "yes") {
				addShoppingCartModule.displayAddShoppingCartView()
			}
		});
		$("#orderTmpl").tmpl(g).appendTo("body");
		if ($(b).attr("orderPosition") === "center") {
			$(".order").css("top", $(b).offset().top - $(".order").height() - 10 + "px");
			$(".order").css("left", $(b).offset().left - ($(".order").width() - $(b).width()) / 2 + "px")
		} else {
			$(".order").css("top", $(b).offset().top - $(".order").height() - 10 + "px");
			$(".order").css("left", $(b).offset().left - $(".order").width() + $(b).width() + "px")
		}
	},
	confirmedEnquiryDiv: function(b, c, i, l, k, g, a, e) {
		if ($("input[name=isOrderProduct]:checked").length < 1) {
			commonModule.alertFail(constantModule.orderGoodsPrompt);
			return
		}
		var h = $("input[name=isOrderProduct]:checked").val();
		if (h == "no") {
			$(".order").remove();
			if (c == "yes") {
				$(".order").remove();
				addShoppingCartModule.displayAddShoppingCartView()
			} else {
				commonModule.alertFail(constantModule.notBuyPrompt)
			}
			return false
		}
		var f = $(".order input.num_txt").val();
		if (!f || isNaN(f) || parseInt(f) < 1) {
			f = 1;
			$(".order input.num_txt").val(f)
		}
		if (l == "success") {
			if (f - g < 0) {
				commonModule.alertFail("订货数量必须为" + g + "个以上!");
				$(".order input.num_txt").val(g);
				return false
			}
			if (f - a > 0) {
				commonModule.alertFail("订货数量超过现有库存数量，请您慎重考虑，若确需该订货数量，请联系客服人员！");
				$(".order input.num_txt").val(g);
				return false
			}
		}
		var d = f / i;
		if (f % i != 0) {
			var d = (parseInt(f / i) + 1) * i;
			commonModule.alertFail("该商品的购买数量须为" + i + "的倍数，您可以输入" + d);
			$(".order input.num_txt").val(d);
			$(".order input.num_txt").select();
			return false
		}
		var j = "[{'0~0~" + e + "' : '" + d + "'}]";
		$(".order").remove();
		productListModule.putProductInCart(b, e, d)
	},
	putProductInCart: function(b, c, d, e) {
		var f = "[{'0~0~" + c + "' : '" + d + "'}]";
		c = "0~0~" + c;
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!putProductListIntoCartJsonp.action?callback='loadProductListIntoCartData'&productIdStr=" + c + "&number=" + d + "&entryTypeVal=" + e;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				if (g.shifting != undefined && g.shifting != "") {
					commonModule.alertFail(g.shifting)
				} else {
					if (g.max_shop_cart == "yes") {
						commonModule.alertFail("购物车超出最大存储限制")
					} else {
						if (g.tipLogin != "yes") {
							addShoppingCartModule.removeAddShoppingCartView();
							productListModule.showAddCartTip(b, g, c)
						} else {
							productListModule.showAddCartLogin({
								method: productListModule.putProductInCart,
								param: [b, c, d, e]
							})
						}
					}
				}
			},
			error: function(g) {
				if (g && g != "") {
					if (g == "Timeout") {
						alertFail("添加购物车超时，请稍候再试")
					} else {
						alertFail(g)
					}
				}
			}
		})
	},
	showAddCartLogin: function(a) {
		commonModule.showLoginParams[0] = a;
		commonModule.responseLoginMask = "PutProductInCart";
		commonModule.showWindowLogin()
	},
	showAddCartTip: function(a, c, b) {
		$("#shop > b").html(c.cart_contains_count);
		$(".add_suces").remove();
		if (productListModule.tempData.shopTimekey) {
			clearTimeout(productListModule.tempData.shopTimekey);
			productListModule.tempData.shopTimekey = ""
		}
		c.lcMallContextPath = webSiteShareData.lcMallContextPath;
		$("#addCartSuccessTmpl").tmpl(c).appendTo("body");
		var d = $(a).offset();
		$(".add_suces").css({
			left: (d.left + $(a).width() / 2) + "px",
			top: d.top - $(".add_suces").height() - 12 + "px"
		});
		productListModule.generateSessionCart(b);
		$(document).off("click", ".add_suces > span,.add_suces .setment a");
		$(document).on("click", ".add_suces > span,.add_suces .setment a", function() {
			$(".add_suces").remove()
		});
		productListModule.tempData.shopTimekey = setTimeout(function() {
			$(".add_suces").remove();
			if (productListModule.tempData.shopTimekey) {
				clearTimeout(productListModule.tempData.shopTimekey);
				productListModule.tempData.shopTimekey = ""
			}
		}, 5000)
	},
	notifyProductOffLoading: function(c, b) {
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		var a = {
			srcId: c.productId,
			srcCode: c.productCode,
			stockNumber: c.maxRepeatProduct,
			replaceCode: c.productRepeatCode || "",
			replaceId: c.productRepeatId || "",
			sosuoPrefix: webSiteShareData.lcMallContextPath
		};
		$(".remind").remove();
		$("#remindTmpl").tmpl(a).appendTo("body");
		$(".remind").css("margin-top", -$(".remind").height() / 2);
		$(document).off("click", ".remind .remind_btn .rem_btn1");
		$(document).on("click", ".remind .remind_btn .rem_btn1", function() {
			$(".remind").remove();
			$(".hint_cue").hide();
			var d = $(b).attr("param-click").split("|");
			addShoppingCartModule.showAddShoppingCartView(b, d[0], d[2], d[3], a.stockNumber, d[4])
		})
	},
	notifyProductOffReason: function(b) {
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		$(".off_shelf").remove();
		var a = {
			productList: b,
			lcItemContextPath: webSiteShareData.lcItemContextPath
		};
		$("#productOffReasonTmpl").tmpl(a).appendTo("body");
		$(document).on("click", ".off_shelf .off_shelf_sure", function() {
			$(".off_shelf").remove();
			$(".hint_cue").hide()
		})
	},
	noCustomerWantProduct: function() {
		if (filterData.globalSearchKeyword || filterData.localQueryKeyword) {
			var a = filterData.globalSearchKeyword || filterData.localQueryKeyword;
			location.href = webSiteShareData.lcMallContextPath + "/member/perfectBrokage/" + encodeURI(encodeURIComponent(a)) + ".html"
		} else {
			location.href = webSiteShareData.lcMallContextPath + "/member/perfectBrokage.html?displayType=SHORTLIST"
		}
	},
	checkBrokageProduct: function(b) {
		var c = $.trim($("#productMode1").val());
		var a = $.trim($("#productSpce1").val());
		if (c == "") {
			alert("请填写厂家型号");
			return
		}
		if (a == "") {
			alert("请填写封装规格");
			return
		}
		c = productListModule.replaceLinkAddressChar(c);
		a = productListModule.replaceLinkAddressChar(a);
		$("#productMode1").val(c);
		$("#productSpce1").val(a);
		url = webSiteShareData.lcMallContextPath + "/order/checkBrokage.html";
		window.location.href = url + "?productModel=" + c + "&encapsulationModel=" + a
	},
	replaceLinkAddressChar: function(a) {
		if (!(a && a != "")) {
			return ""
		}
		re = new RegExp("'", "g");
		var a = a.replace(re, "’");
		re = new RegExp('"', "g");
		a = a.replace(re, "”");
		return a
	},
	changeShowTypeAndSubmit: function(b) {
		if ($("#queryShowType").val() == b) {
			return
		}
		var a = webSiteShareData.lcMallContextPath + "/so/setQueryDisplayTypeInSession";
		$.ajax({
			type: "POST",
			url: a,
			data: "displayType=" + b,
			async: false,
			success: function(c) {
				if (c == "success") {
					window.location.reload(true)
				}
			},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		})
	},
	scrollLoad: (function(b) {
		var d = (arguments.length == 0) ? {
			src: "xpath",
			time: 300
		} : {
			src: b.src || "xpath",
			time: b.time || 300
		};
		var a = function(e) {
			return e.replace(/-(\w)/g, function(f, g) {
				return g.toUpperCase()
			})
		};
		window.getStyle = function(f, h) {
			if (arguments.length != 2) {
				return false
			}
			var g = f.style[a(h)];
			if (!g) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					var e = document.defaultView.getComputedStyle(f, null);
					g = e ? e.getPropertyValue(h) : null
				} else {
					if (f.currentStyle) {
						g = f.currentStyle[a(h)]
					}
				}
			}
			return g == "auto" ? "" : g
		};
		var c = function() {
			productListModule.refreshImg()
		};
		$(window).on("scroll", function() {
			setTimeout(function() {
				c()
			}, d.time)
		});
		return c()
	}),
	refreshImg: function() {
		var b = (arguments.length == 0) ? {
			src: "xpath",
			time: 300
		} : {
			src: options.src || "xpath",
			time: options.time || 300
		};
		var g = $(".home_scroll_img_mark");
		var h = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop,
			l = h + Number(window.innerHeight ? window.innerHeight : document.documentElement.clientHeight),
			j = $(".home_scroll_img_mark").find("img"),
			k = j.length;
		if (!k) {
			return false
		}
		for (var e = 0; e < k; e++) {
			var f = j[e].getAttribute(b.src),
				a = j[e],
				m = a.nodeName.toLowerCase();
			if (a) {
				postPage = a.getBoundingClientRect().top + window.document.documentElement.scrollTop;
				postWindow = postPage + Number(window.getStyle(a, "height").replace("px", ""));
				if ((postPage >= 0 && postPage < l) || (postWindow > 0 && postWindow <= l)) {
					if (m === "img" && f !== null) {
						var d = $(j[e]);
						var c = d.attr("showFlag");
						if (d.attr("src").indexOf("/resources/images/loading_logo.gif") != -1 && c == "no") {
							d.attr("showFlag", "yes");
							d.attr("src", f)
						}
					}
					a = null
				}
			}
		}
	},
	VisitRecord: function() {
		var a = webSiteShareData.lcMallContextPath + "/so/addSearchRecord.html";
		if (typeof searchRecord != "undefined" && searchRecord && searchRecord.pageAddSearchRecord == "1") {
			$.ajax({
				type: "post",
				url: a,
				dataType: "json",
				data: searchRecord,
				timeout: 15000,
				success: function(b) {},
				error: function() {}
			})
		}
	},
	showReplenishNotify: function(c, d, b) {
		var a = {
			productId: c,
			productCode: d,
			productModel: b
		};
		calendar.hide();
		$(".product_remind").show().html("");
		$("#productRemindTmpl").tmpl(a).appendTo(".product_remind");
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show()
	},
	submitReplenishNotify: function(c) {
		var d = c.getAttribute("param-click").split("|");
		var g = d[0];
		var i = d[1];
		var a = $("#replenishNumber").val();
		if (a == "") {
			$("#replenishNumber").focus();
			return
		}
		if (!(/^\+?[1-9][0-9]*$/.test(a))) {
			$("#replenishNumber").val("");
			$("#replenishNumber").focus();
			return
		}
		var h = $("#replenishPhone").val();
		if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(h))) {
			$("#replenishPhone").val();
			$("#replenishPhone").focus();
			return
		}
		var e = $("#replenishDate").val();
		if (e == "") {
			$("#replenishDate").focus();
			return
		}
		var f = $('.product_remind_cont input[name="replenishSendMsg"]:checked ').val();
		var b = webSiteShareData.lcMallContextPath + "/member/MemberPersonAction!addCustomerRemindReplenishRecordJsonp.action?callback='loadCustomerRemindData'&productId=" + g + "&productCode=" + i + "&replenishNumber=" + a + "&phoneNumber=" + h + "&date=" + e + "&receivesms=" + f;
		$.ajax({
			type: "GET",
			url: b,
			dataType: "jsonp",
			timeout: 15000,
			success: function(j) {
				if (j.status == "success") {
					$(".product_remind").hide();
					$(".hint_cue").hide();
					calendar.hide();
					commonModule.alertSuccess("感谢您的反馈，我们会在7个工作日内对该商品是否需要补货进行评估，评估结果将以短信形式发送到您填写的手机上。")
				} else {
					commonModule.alertFail(j.message)
				}
			}
		})
	},
	showMaskDiv: function(a) {
		$("#filter_correction_div").show();
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		$("#filter_correction_iframe").attr("src", webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!loadFilterCorrectionInner.action?productSortManager.productTypeManagerId=" + a)
	},
	cancelOneConditionCatalog: function(e, g) {
		var f = {
			beginPrice: $("#queryBeginPrice").val(),
			endPrice: $("#queryEndPrice").val(),
			localKeyWord: $("#localQueryKeyword").val(),
			queryProductGradePlateId: filterData.queryProductGradePlateId,
			queryProductStandard: filterData.queryProductStandard,
			queryProductArrange: filterData.queryProductArrange,
			standardUrlPrefix: filterData.standardUrlPrefix,
			standardUrlPostfix: filterData.standardUrlPostfix
		};
		if (g && g != 0) {
			var a = f[e].split("$");
			var c = "";
			for (var d = 0; d < a.length; d++) {
				if (a[d] && a[d] != g) {
					if (c != "") {
						c += "$"
					}
					c += a[d]
				}
			}
			f[e] = c || 0
		} else {
			f[e] = 0
		}
		var b = webSiteShareData.lcCatalogPrefix + "_" + f.standardUrlPrefix + "_" + f.standardUrlPostfix + "_" + f.queryProductGradePlateId + ".html?queryProductArrange=" + f.queryProductArrange + "&keyword=" + encodeURIComponent(encodeURIComponent(f.localKeyWord)) + "&queryBeginPrice=" + f.beginPrice + "&queryEndPrice=" + f.endPrice + "&queryProductStandard=" + f.queryProductStandard;
		window.location.href = b
	}
};

function hideMaskDiv() {
	$("#filter_correction_div").hide();
	$(".hint_cue").hide();
	$("#filter_correction_iframe").attr("src", "")
}
if (webSiteShareData.catalogFlag) {
	commonModule.init();
	searchModule.init();
	fileModule.init();
	addShoppingCartModule.init();
	productListModule.init()
};
var detailModule = {
	init: function() {
		$(".batch_state").on("mouseenter", function() {
			var $agios = $(this).children(".agiod");
			$("#bstateTmpl").tmpl().appendTo($agios);
			$agios.show()
		});
		$(".batch_state").on("mouseleave", function() {
			var $agios = $(this).children(".agiod");
			$agios.hide().html("")
		});
		$("#detailLike").on("click", "#changePage", function() {
			productGuideModule.changeNextBatchProduct()
		});
		$("#detailLike").on("click", ".brandlist_s a", function() {
			productGuideModule.addFeedBackClick($(this).closest("li").attr("data-productId"))
		});
		$(".product_info h3").on("mouseenter", ".info_type,.info_type1,.info_type2,.info_type3,.info_type4,.info_type5", function(e) {
			var txt = {};
			if (this.className == "info_type") {
				txt.content = "IC代付代售，指由会员提供型号并出资，由立创商城负责采购（确保原装正品）并销售，可能享受意想不到的可观代售收入！现在还有本金最高万元保底，赶紧来参与吧！";
				txt.url = webSiteShareData.lcMallContextPath + "/product/icConsgin.html"
			} else {
				if (this.className == "info_type1") {
					txt.content = "兼职选型，指“会员提供的IC型号审核通过后，由立创商城全额出资采购（确保原装正品）并销售，选型工程师可享受有效期为一年的商品销售额回报”的业务。回报期内，立创商城兼职选型工程师拥有优先IC代付代售权！0风险、0投入、高回报，赶紧加入立创商城兼职选型工程师阵营吧！";
					txt.url = webSiteShareData.lcMallContextPath + "/jzxxgcs.html"
				} else {
					if (this.className == "info_type2") {
						txt.content = "当前商品为了能让更多的客户购买到，商城采取限购措施。当库存过低时商品限制" + webSiteShareData.limitDays + "天内整盘购买只允许买" + webSiteShareData.maxEncapsulationsAllowedBuy + "盘，样片不限制。";
						txt.url = webSiteShareData.lcMallContextPath + "/bulletin/details_1279.html"
					} else {
						if (this.className == "info_type3" || this.className == "info_type4" || this.className == "info_type5") {
							txt.content = "立创商城官方团队从Digi-Key、贸泽、艾睿等海外正品电子商城采购元器件样品，入库到商城仓库进行现货销售，从而为您节省高昂的运费和时间成本。";
							txt.url = webSiteShareData.lcMallContextPath + "/bulletin/details_11553.html"
						}
					}
				}
			}
			var top = e.pageY + $(this).height() - e.offsetY,
				left = e.pageX - e.offsetX + $(this).height() / 2;
			$(".dy_pay").show().html("");
			$("#dy_payTmpl").tmpl(txt).appendTo(".dy_pay");
			$(".dy_pay").css("top", top + "px").css("left", left + "px")
		});
		$(".product_info h3").on("mouseleave", ".info_type,.info_type1,.info_type2,.info_type3,.info_type4,.info_type5", function(e) {
			var timer = setTimeout(function() {
				$(".dy_pay").hide().html("")
			}, 10);
			$(".dy_pay").on({
				mouseenter: function() {
					clearTimeout(timer);
					timer = null;
					$(".dy_pay").show()
				},
				mouseleave: function() {
					$(".dy_pay").hide()
				}
			})
		});
		$(".parameter").on("mouseenter", ".warn", function(e) {
			var txt = {};
			txt.content = "该链接的内容为商城用户提供，代表发帖者个人的观点，仅供参考!";
			var top = e.pageY + $(this).height() - e.offsetY,
				left = e.pageX - e.offsetX + $(this).height() / 2;
			$(".dy_pay").show().html("");
			$("#dy_payTmpl").tmpl(txt).appendTo(".dy_pay");
			$(".dy_pay").css("top", top + "px").css("left", left - 28 + "px");
			$(".dy_pay").width(250);
			$(".dy_pay02").width(245);
			$(".dy_pay02 span").width(230);
			$(".dy_pay02 a").hide()
		});
		$(".parameter").on("mouseleave", " .warn", function(e) {
			var timer = setTimeout(function() {
				$(".dy_pay").hide().html("")
			}, 10);
			$(".dy_pay").on({
				mouseenter: function() {
					clearTimeout(timer);
					timer = null;
					$(".dy_pay").show()
				},
				mouseleave: function() {
					$(".dy_pay").hide()
				}
			})
		});
		$(".parameter li.trade_btn #notice").click(function(e) {
			var arr = $(this).attr("param-click").split("|");
			productListModule.showAddNotifyDiv(arr[0], arr[1], this, arr[2], arr[3])
		});
		$(".share .recom").click(function() {
			$(".hint_cue").css("height", $(document).height() + "px");
			$(".hint_cue").show();
			$(".groom").show().html("");
			$("#groomTmpl").tmpl().appendTo($(".groom"))
		});
		$("#groom").on("click", "p", function() {
			$(".hint_cue").hide();
			$(".groom").hide().html("")
		});
		$("#groom").on("click", "#groomSubmit", function() {
			detailModule.sendProductIntroduceEmail(this, detailModule.productId)
		});
		$("#detailCompare").click(function() {
			var productId = $(this).attr("data-add_compare");
			commonModule.addProductToCompare(productId)
		});
		$("#recent_buy").click(function(e) {
			var params = $(this).attr("data-recent_sale").split("|");
			productListModule.showThisProductSaleRecord(params[0], params[1], this, e, "detail");
			commonModule.showLoginParams.push(params[0], params[1], this, e, "detail")
		});
		$("#lookAllPdf").click(function() {
			detailModule.previewPDFInit($(this).attr("data-pdf_des_product_id"))
		});
		productListModule.isLoad = true;
		if (productPriceChangeData) {
			$("#detailTrend").highcharts({
				chart: {
					type: "line"
				},
				title: {
					text: "商品价格趋势(￥/" + productPriceChangeData.productUintTemp + ")"
				},
				subtitle: {
					text: ""
				},
				xAxis: {
					categories: productPriceChangeData.conlectionX
				},
				yAxis: {
					title: {
						text: "商品价格 (￥/" + productPriceChangeData.productUintTemp + ")"
					}
				},
				plotOptions: {
					line: {
						dataLabels: {
							enabled: true
						},
						enableMouseTracking: false
					}
				},
				series: [{
					name: "时间",
					data: productPriceChangeData.conlectionY
				}]
			})
		}
		$(".tab_menu0").on("click", function() {
			$(this).addClass("currs");
			$(this).siblings().removeClass("currs");
			var index = $(this).index();
			$(".relation_product").hide().eq(index).show()
		});
		$(".tab_trigger .tab_menu1").on("click", function() {
			$(this).addClass("currs");
			$(this).siblings().removeClass("currs");
			var index = $(this).index();
			if (index == 1) {
				$(".low_s").css("display", "none")
			} else {
				$(".low_s").css("display", "inline")
			}
			$(".con_one").hide().eq(index).show()
		});
		$(".tab_trigger .tab_menu3").on("click", function() {
			$(this).addClass("currs");
			$(this).siblings().removeClass("currs");
			var index = $(this).index();
			$(".evaluate").hide().eq(index).show()
		});
		$(".eva_consult").on("click", ".consult_list a", function() {
			var consultId = $(this).closest("li").attr("data-id");
			var node = $(this).find("span")[0];
			if ($(this).index() == 0) {
				detailModule.gradePurchaseConsult("purchase_consult", consultId, 1, node)
			} else {
				detailModule.gradePurchaseConsult("purchase_consult", consultId, -1, node)
			}
		});
		$("#evaluate").on("click", ".comm_list a", function() {
			var replyId = $(this).attr("data-replyId");
			detailModule.replyEvaluate(replyId, detailModule.productId)
		});
		if ($(".thum_cont img").length > 0) {
			detailModule.initSrc = $(".thum_cont img").eq(0).attr("src").replace("product/breviary", "product/source");
			$("#look_big_pic img").attr("src", detailModule.initSrc);
			$(".thum_cont img").eq(0).addClass("thum_cls")
		}
		if ($(".thum_cont img").length > 3) {
			$(".thumbnail_01 a").addClass("active")
		}
		$(".detail_cont .thumbnail").on("click", ".thum_cont img", function(e) {
			var src = $(this).attr("src").replace("product/breviary", "product/source");
			$("#look_big_pic img").attr("src", src);
			$(this).addClass("thum_cls").siblings().removeClass("thum_cls")
		});
		$(".detail_cont .thumbnail").on("click", ".thum_left", function() {
			var length = $(".thum_cont img").length;
			if (length <= 3) {
				return
			}
			var selectedImg = $(".thum_cont .thum_cls");
			var src = selectedImg.prev().attr("src").replace("product/breviary", "product/source");
			$("#look_big_pic img").attr("src", src);
			selectedImg.prev().addClass("thum_cls").siblings().removeClass("thum_cls");
			if (detailModule.imgIdx > 0) {
				detailModule.imgIdx -= 1
			}
			detailModule.imgChange()
		});
		$(".detail_cont .thumbnail").on("click", ".thum_right", function() {
			var length = $(".thum_cont img").length;
			if (length <= 3) {
				return
			}
			var selectedImg = $(".thum_cont .thum_cls");
			var src = selectedImg.next().attr("src").replace("product/breviary", "product/source");
			$("#look_big_pic img").attr("src", src);
			selectedImg.next().addClass("thum_cls").siblings().removeClass("thum_cls");
			if (detailModule.imgIdx < length - 3) {
				detailModule.imgIdx += 1
			}
			detailModule.imgChange()
		});
		$(".detail_cont .thumbnail").on("mouseenter", "#look_big_pic", function(e) {
			var enterX = $("#look_big_pic img").width() / 2;
			var enterY = $("#look_big_pic img").height() / 2;
			var src = $(this).find("img").attr("src");
			$("#big_pic_wraper").show().find("img").attr("src", src);
			$("#pic_zz").show();
			$(this).on("mousemove", function(eve) {
				var moveX = eve.pageX - $(".detail_cont .thumbnail")[0].offsetLeft - enterX,
					moveY = eve.pageY - $(".detail_cont .thumbnail")[0].offsetTop - enterY,
					left = -225 - moveX * 3,
					top = -225 - moveY * 3,
					picLeft = 75 + moveX,
					picTop = 75 + moveY;
				if (left >= 0) {
					left = 0
				} else {
					if (left < -450) {
						left = -450
					}
				}
				if (top >= 0) {
					top = 0
				} else {
					if (top < -450) {
						top = -450
					}
				}
				if (picLeft <= 0) {
					picLeft = 0
				} else {
					if (picLeft > 150) {
						picLeft = 150
					}
				}
				if (picTop <= 0) {
					picTop = 0
				} else {
					if (picTop > 150) {
						picTop = 150
					}
				}
				$("#big_pic_wraper img").css("marginLeft", left + "px");
				$("#big_pic_wraper img").css("marginTop", top + "px");
				$("#pic_zz").css("left", picLeft + "px");
				$("#pic_zz").css("top", picTop + "px")
			})
		});
		$(".detail_cont .thumbnail").on("mouseleave", "#look_big_pic", function(e) {
			$("#big_pic_wraper").hide();
			$("#pic_zz").hide()
		});
		$("#look_big_pic").on("click", function() {
			var id = detailModule.productId;
			var index = $(".thum_cont").find(".thum_cls").index();
			var aTarget = document.createElement("a");
			aTarget.setAttribute("href", "/product/jpg_" + id + "_" + index + ".html");
			aTarget.setAttribute("target", "_blank");
			aTarget.click()
		});
		$(window).load(function() {
			window._bd_share_config = {
				common: {
					bdSnsKey: {},
					bdText: "",
					bdMini: "2",
					bdMiniList: false,
					bdPic: "",
					bdStyle: "1",
					bdSize: "16"
				},
				share: {}
			};
			with(document) {
				0[(body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date() / 3600000)]
			}
		});
		$(".content_box2 .similar a").click(function() {
			var url = webSiteShareData.lcMallContextPath + "/product/compareProductDetailList.html?productIds=" + $(this).attr("param-click");
			window.open(url)
		});
		$("#load_more").click(function() {
			var params = $(this).attr("data-similar_product").split("|");
			var obj = {
				productId: params[0],
				similarGroupCode: params[1],
			};
			var url = "/selectAllSimilarProductRecordList.html";
			$.ajax({
				type: "POST",
				url: url,
				data: obj,
				success: function(result) {
					$("#load_more").hide().parent().html(result);
					productListModule.refreshImg()
				},
				error: function() {
					alert(constantModule.errorPrompt)
				}
			})
		});
		$("#errorCorrection").click(function() {
			detailModule.showMaskDiv(detailModule.productId)
		});
		detailModule.pageLocation();
		detailModule.VisitRecord()
	},
	imgChange: function() {
		$(".thum_cont img").each(function(a, b) {
			if (a >= detailModule.imgIdx && a < detailModule.imgIdx + 3) {
				$(b).show()
			} else {
				$(b).hide()
			}
		})
	},
	imgIdx: 0,
	initSrc: "",
	sendProductIntroduceEmail: function(e, i) {
		var k = document.getElementById("emails");
		var h = document.getElementById("guideContent");
		var c = document.getElementById("yourName");
		var g = k.value;
		var j = h.value;
		var l = c.value;
		if (!g) {
			commonModule.alertFail(constantModule.emailPrompt);
			k.select();
			return
		}
		if (!j) {
			commonModule.alertFail(constantModule.txtPrompt);
			h.select();
			return
		}
		if (j.length > 200) {
			commonModule.alertFail(constantModule.txtLimitPrompt);
			h.select();
			return
		}
		if (!l) {
			commonModule.alertFail(constantModule.inputNamePrompt);
			c.select();
			return
		}
		if (l.length > 20) {
			commonModule.alertFail(constantModule.inputNameLimitPrompt);
			c.select();
			return
		}
		var a = null;
		if ($.browser.msie) {
			a = g.replace(/\r\n/g, ",").split(",")
		} else {
			a = g.replace(/\n/g, ",").split(",")
		}
		var f = new Array();
		$.each(a, function(o, n) {
			if (!commonModule.isStrEmpty(n)) {
				f.push($.trim(n))
			}
		});
		if (f.length > 5) {
			commonModule.alertFail(constantModule.emailLimitPrompt);
			return
		}
		var m = true;
		var d = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;
		$.each(f, function(o, n) {
			if (!d.test(n)) {
				commonModule.alertFail("“" + n + "”" + constantModule.emailErrorPrompt);
				k.select();
				m = false;
				return false
			}
		});
		if (m) {
			$(e).attr("disabled", true);
			var b = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!sendProductIntroduceEmailJsonp.action?callback='loadProductIntroduceData'&arr=" + f + "&content=" + j + "&yourName=" + l + "&theProductId=" + i;
			$.ajax({
				type: "GET",
				url: b,
				dataType: "jsonp",
				timeout: 15000,
				success: function(n) {
					n = n.result;
					if ("success" == n) {
						$(".hint_cue").hide();
						$(".groom").hide().html("");
						commonModule.alertSuccess(constantModule.sendSuccessPrompt)
					} else {
						if ("forbid" == n) {
							commonModule.alertFail(constantModule.sendErrorPrompt)
						} else {
							if ("fail" == n) {
								commonModule.alertFail(constantModule.sendNetErrorPrompt)
							} else {
								commonModule.alertFail(constantModule.sendNetErrorPrompt)
							}
						}
					}
					$(e).attr("disabled", false)
				}
			})
		}
	},
	productId: window.location.href.split("/")[3].split(".")[0],
	previewPDFInit: function(a) {
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!selectProductPDFAndPCBListJsonp.action?callback='loadFilePDFData'&annexNumber=" + a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(g) {
				var b = g.status;
				if (b == "success") {
					var c = g.fileList;
					var f = "";
					for (var e = 0; e < c.length; e++) {
						var d = c[e];
						if (d.annexSuffix == "pdf" || d.annexSuffix == "PDF" || d.annexSuffix == ".pdf" || d.annexSuffix == ".PDF") {
							f = webSiteShareData.lcMallContextPath + "/product/pdf/A_" + d.annexNumber + ".PDF"
						}
					}
					fileModule.downloadFileNoRemark(f, a, "new_pdf_doc_pdf", "pdf")
				}
			}
		})
	},
	pageLocation: function(d) {
		var b = window.location.href;
		var a = $("#tab_trigger_similar");
		var c = false;
		if (b.indexOf("pos=set") > -1) {
			c = true;
			$(".tab_similar").addClass("currs").siblings().removeClass("currs")
		}
		if (b.indexOf("pos=similar") > -1) {
			c = true;
			$(".tab_pt").addClass("currs").siblings().removeClass("currs")
		}
		if (c) {
			$("html,body").animate({
				scrollTop: a.offset().top - 230
			}, 1)
		}
	},
	ajaxEvaluateData: function() {
		var a = "/selectProductPurchaseEvaluatesAndConsult.html?productId=" + detailModule.productId;
		$.ajax({
			url: a,
			dataType: "json",
			data: {},
			timeout: 15000,
			success: function(c) {
				var d = c;
				for (var b = 0; b < d.purchaseEvaluateRecordList.length; b++) {
					switch (d.purchaseEvaluateRecordList[b].intergralLeval) {
						case "general":
							d.purchaseEvaluateRecordList[b].intergralLeval = "注册会员";
							d.purchaseEvaluateRecordList[b].className = "rank1";
							break;
						case "bronzemodal":
							d.purchaseEvaluateRecordList[b].intergralLeval = "铜牌会员";
							d.purchaseEvaluateRecordList[b].className = "rank5";
							break;
						case "silvermedal":
							d.purchaseEvaluateRecordList[b].intergralLeval = "银牌会员";
							d.purchaseEvaluateRecordList[b].className = "rank4";
							break;
						case "silvermedal":
							d.purchaseEvaluateRecordList[b].intergralLeval = "金牌会员";
							d.purchaseEvaluateRecordList[b].className = "rank3";
							break;
						case "diamondmedal":
							d.purchaseEvaluateRecordList[b].intergralLeval = "钻石会员";
							d.purchaseEvaluateRecordList[b].className = "rank2";
							break;
						case "lmperialcrown":
							d.purchaseEvaluateRecordList[b].intergralLeval = "皇冠会员";
							d.purchaseEvaluateRecordList[b].className = "rank";
							break
					}
				}
				$("#evaluateTmpl").tmpl(d).appendTo("#evaluate");
				if (d.topPurchaseEvaluateCustomerInfo) {
					$(".satisfy_nr p").show();
					$(".satisfy_nr p span").html(d.topPurchaseEvaluateCustomerInfo)
				}
				if (d.purchaseConsultRecordList.length > 0) {
					$(".eva_consult .no_consult").hide();
					$("#buyAskTmpl").tmpl(d).appendTo(".eva_consult");
					$(".eva_consult .consult_list:odd").addClass("discolour")
				}
			},
			error: function() {}
		})
	},
	gradePurchaseConsult: function(a, e, c, d) {
		var b = "/insertPurchaseGradeRecord.html";
		$.ajax({
			url: b,
			dataType: "json",
			data: {
				gradeType: a,
				referenceId: e,
				gradeScore: c
			},
			timeout: 15000,
			success: function(f) {
				if ("forbid" == f.status) {
					if (window.confirm(constantModule.noLoginPrompt)) {
						document.location.href = webSiteShareData.lcMallContextPath + "/home/login.html"
					}
				} else {
					if ("existed" == f.status) {
						commonModule.alertFail(constantModule.consultedPrompt)
					} else {
						if ("success" == f.status) {
							if ("purchase_consult" == a) {
								if (c == 1) {
									$(d).html($(d).html() - 0 + 1)
								} else {
									if (c == -1) {
										$(d).html($(d).html() - 0 + 1)
									}
								}
							}
						} else {
							commonModule.alertFail(constantModule.consultFailPrompt)
						}
					}
				}
			},
			error: function() {
				alert(constantModule.errorPrompt)
			}
		})
	},
	replyEvaluate: function(a, b) {
		var c = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!validateCustomerLoginJsonp.action?callback='loadCustomerLoginData'";
		$.ajax({
			type: "GET",
			url: c,
			dataType: "jsonp",
			timeout: 15000,
			success: function(e) {
				if (!e.result == "yes") {
					if (window.confirm(constantModule.evaluateLoginPrompt)) {
						var d = webSiteShareData.lcMallContextPath + "/member/evaluate-reply-add_" + b + "_" + a + ".html";
						window.location.href = d
					}
				} else {
					var d = webSiteShareData.lcMallContextPath + "/member/evaluate-reply-add_" + b + "_" + a + ".html";
					window.location.href = d
				}
			}
		})
	},
	showMaskDiv: function(a) {
		$("#product_correction_div").show();
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		$("#product_correction_iframe").attr("src", "/loadProductCorrectionInner.html?productId=" + a)
	},
	VisitRecord: function() {
		var a = "/insertProductDetailsVisitRecord.html";
		var b = $("#logo");
		$.ajax({
			url: a,
			type: "POST",
			dataType: "json",
			data: {
				productId: b.attr("data-product_id"),
				productCode: b.attr("data-product_code"),
				productName: b.attr("data-product_name")
			},
			timeout: 15000,
			success: function(c) {},
			error: function() {}
		})
	},
	blockDivClickDetails: function(e) {
		var d = "";
		var c = $("#look_big_pic img");
		var g = $.trim(c.attr("src"));
		if (g.indexOf("Detailedpage_pic_tu_03.gif") >= 0) {
			d = webSiteShareData.lcMallContextPath + "/product/image-" + e + "_empty.html"
		} else {
			var f = g.split("/");
			var h = g.substring(g.lastIndexOf(".") + 1);
			var b = f[f.length - 2];
			var i = f[f.length - 1];
			var a = i.substring(0, i.lastIndexOf("."));
			d = webSiteShareData.lcMallContextPath + "/product/" + h + "_" + e + "_" + b + "_" + a + ".html"
		}
		window.open(d)
	}
};

function hideMaskDiv() {
	$("#product_correction_div").hide();
	$(".hint_cue").hide();
	$("#product_correction_iframe").attr("src", "")
}
if (webSiteShareData.detailsFlag) {
	commonModule.init();
	searchModule.init();
	fileModule.init();
	addShoppingCartModule.init();
	productListModule.init();
	productGuideModule.init();
	detailModule.init()
};