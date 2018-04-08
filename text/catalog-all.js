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
    year: ["\u5e74", "", "", "\u5e74", "\u5e74"],
    months: [["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"], ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"], ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"]],
    weeks: [["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"], ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"], ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"], ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"], ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f"], ],
    clear: ["\u6e05\u7a7a", "Clear", "Clear", "\u6e05\u7a7a", "\u524a\u9664"],
    today: ["\u4eca\u5929", "Today", "Today", "\u4eca\u5929", "\u4eca\u65e5"],
    close: ["\u5173\u95ed", "Close", "Close", "\u95dc\u9589", "\u623b\u308b"],
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
        "w+": "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(this.getDay()),
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
var fileModule = {
    init: function() {
        $(".wrap_library").on("click", "a",
        function() {
            $(".wrap_library").hide()
        });
        $(".wrap_library").on("click", "input",
        function() {
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
                        },
                        {
                            noFile: 2
                        },
                        {
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
var addShoppingCartModule = {
    Product: {},
    sampleNum: 0,
    hasSample: "",
    init: function() {
        $(".parameter").on("click", "li.trade_btn #detail_buy_btn",
        function(d) {
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
        $(".list_right").on("click", ".inside li.pan_list .addCartBtn,.yuDing",
        function() {
            addShoppingCartModule.removeAddShoppingCartView();
            $("#buyTmpl").tmpl().appendTo($(this).parent());
            $(".c_whole").css("top", ( - $(".c_whole").height() - 6) + "px");
            $(".tip").css("top", ($(".c_whole").height() - 1) + "px");
            var a = $(this).attr("param-click").split("|");
            addShoppingCartModule.commonCheckProducByProductId(this, a[0], a[1], a[2], a[3], a[4], true, a[5])
        });
        $(".list_right").on("click", ".can_order1 .can_btn",
        function() {
            addShoppingCartModule.removeAddShoppingCartView()
        });
        $(".list_right").on("click", ".choose_buy_type",
        function() {
            if ($(this).attr("id") == "choose_buy_pian_radio") {
                $("#productOrderNumber_pan").attr("disabled", true);
                $("#productOrderNumber").attr("disabled", false)
            } else {
                $("#productOrderNumber").attr("disabled", true);
                $("#productOrderNumber_pan").attr("disabled", false)
            }
        });
        $(".list_right").on("keyup", "#productOrderNumber_pan",
        function() {
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
        for (var E = 5,
        e = J.length; E < e; E += 3) {
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
                w = (k[2] % addShoppingCartModule.Product.ratio == 0 && parseFloat(k[2]) > parseFloat(addShoppingCartModule.Product.ratio));
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
        $.each(addShoppingCartModule.Product.prices,
        function(Q, V) {
            var X = D.append("<tr></tr>").children("tr:last");
            var L;
            if (addShoppingCartModule.sampleNum > 0 && V.max == -1 && addShoppingCartModule.Product.prices.length > 2) {
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
                        commonModule.commonConfirm(X,
                        function() {
                            productListModule.putProductInCart(m, x, M, webSiteShareData.cartPageFlag)
                        },
                        function() {
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
        if (d.val() % addShoppingCartModule.Product.ratio != 0) {
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
            $(".c_whole").css("top", ( - $(".c_whole").height() - 6) + "px")
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
var productListModule = {
    tempData: {},
    timer: null,
    imgIdx: 0,
    isLoad: false,
    init: function() {
        $(".pan_list").on("mouseenter", ".shifting",
        function() {
            $("#receipt_tip").show()
        });
        $(".pan_list").on("mouseleave", ".shifting",
        function() {
            $("#receipt_tip").hide()
        });
        $("#tmpl_load").load("/resources/template/catalogTemp.html",
        function() {
            var a = window.location.href;
            if (webSiteShareData.detailsFlag) {
                setTimeout(function() {
                    detailModule.ajaxEvaluateData()
                },
                20)
            } else {
                productListModule.VisitRecord()
            }
            commonModule.ieTest()
        });
        $(".product_list_right").on("click", ".stock a",
        function() {
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
        $(".list_right").on("hover", ".inside",
        function() {
            $(".inside").removeClass("active");
            $(this).addClass("active")
        });
        $(".list_right").on("click", ".alien a",
        function(d) {
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
        $(".list_right").on("hover", ".alien .a_bt02,.alien .a_bt04",
        function() {
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
        $(".product_list_right").on("click", ".hoice_ys input",
        function() {
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
        $(".list_left .record").on("click", "div b",
        function() {
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
        $(".list_right").on("click", ".lower .pp01",
        function() {
            var a = $(this).attr("param-click").split("|");
            productListModule.showPDFImgInit(a[0], a[1])
        });
        $("#lookPDF").on("click", ".title span",
        function() {
            $(".hint_cue").hide();
            $("#lookPDF").hide()
        });
        $(document).on("click", ".l02_yb .down a,#downloadFile",
        function() {
            var a = $(this).attr("param-click");
            fileModule.downloadFileInit(a)
        });
        $("#hint_down").on("click", ".down_tit a",
        function() {
            $(".hint_cue").hide();
            $("#hint_down").hide()
        });
        $(".list_right").on("click", ".recent_buy",
        function() {
            var a = $(this).attr("param-click") || "";
            var b = a.split("|");
            productListModule.showThisProductSaleRecord(b[0], b[1], this);
            commonModule.showLoginParams.push(b[0], b[1], this)
        });
        $(".list_right").on("click", ".replenish_notify",
        function() {
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
        $(".product_remind").on("click", ".product_remind_btn .submint_tj",
        function() {
            productListModule.submitReplenishNotify(this)
        });
        $(".product_remind").on("click", ".product_remind_tit a,.product_remind_btn .submint_fq",
        function() {
            $(".product_remind").hide();
            $(".hint_cue").hide();
            calendar.hide()
        });
        $(".product_remind").on("click", ".product_remind_cont span",
        function() {
            calendar = new Calendar();
            calendar.show($("#replenishDate")[0]);
            $("#__calendarPanel").css({
                position: "fixed"
            })
        });
        $(".list_right").on("click", ".note_btn a",
        function(a) {
            a.stopPropagation();
            $(this).closest(".sold_note").hide().html("")
        });
        $(".list_right").on("click", ".note_login a",
        function(a) {
            a.stopPropagation();
            window.location.href = webSiteShareData.lcMallContextPath + "/home/register.html"
        });
        $(".list_right").on("click", ".note_login input",
        function(a) {
            a.stopPropagation();
            commonModule.responseLoginMask = "ProductSales";
            commonModule.showWindowLogin()
        });
        $(".list_right").on("click", ".qs04 a",
        function() {
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
        $(document).on("click", ".trend_tit a",
        function(a) {
            $(".trend").remove();
            $(".hint_cue").hide()
        });
        $(".list_right").on("mouseenter", ".batch_state",
        function() {
            var a = $(this).siblings(".agios");
            $("#bstateTmpl").tmpl().appendTo(a);
            a.show()
        });
        $(".list_right").on("mouseleave", ".batch_state",
        function() {
            var a = $(this).siblings(".agios");
            a.hide().html("")
        });
        $(".list_right").on("mouseenter", ".zy_xt_discount",
        function() {
            var b = $(this).siblings(".agio");
            var a = {};
            a.lcMallContextPath = webSiteShareData.lcMallContextPath;
            $("#agioTmpl").tmpl(a).appendTo(b);
            if (commonModule.isICMember == "true") {
                $(".agio_tips2 .red1").remove()
            }
            b.show()
        });
        $(".list_right").on("mouseleave", ".zy_xt",
        function() {
            var a = $(this).children(".agio");
            a.hide().html("")
        });
        $(".list_right").on("mouseleave", ".alien",
        function() {
            var a = $(this).children(".agio");
            a.hide().html("")
        });
        $(".list_right").on("click", ".agio_btn",
        function() {
            window.open(webSiteShareData.lcMallContextPath + "/product/icConsgin.html")
        });
        $(".list_right").on("click", ".agio_btn1",
        function() {
            window.open(webSiteShareData.lcMallContextPath + "/order/icConsignRegulation.html#discount98")
        });
        $(".list_right").on("click", ".common_sc",
        function() {
            productListModule.insertProductFavoriteRecord($(this).attr("data-productId"))
        });
        $(".list_right").on("click", ".one .db",
        function() {
            var a = $(this).attr("data-add_compare");
            commonModule.addProductToCompare(a)
        });
        $("#collect").on("click", ".collect_tit a,.col_btn",
        function() {
            $("#collect").hide().html("")
        });
        $(".list_right").on("mouseenter", ".one .a_01,.one .a_02,.one .a_03,.one .a_04,.one .a_05,.one .a_06",
        function(d) {
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
        $(".list_right").on("mouseleave", ".one .a_01,.one .a_02,.one .a_03,.one .a_04,.one .a_05,.one .a_06",
        function(a) {
            var b = setTimeout(function() {
                $(".dy_pay").hide().html("")
            },
            10);
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
        $(".list_right").on("mouseenter", ".warn",
        function(d) {
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
        $(".list_right").on("mouseleave", " .warn",
        function(a) {
            var b = setTimeout(function() {
                $(".dy_pay").hide().html("")
            },
            10);
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
        $(".list_right").on("mouseenter", ".one img",
        function(g) {
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
        $(".img_show").on("click", ".img_cont img",
        function(a) {
            var b = $(this).attr("src").replace("product/breviary", "product/source");
            $(".img_show2 span img").attr("src", b);
            $(this).addClass("img_cls").siblings().removeClass("img_cls");
            $(".img_show2 span img").attr("index", this.getAttribute("index"))
        });
        $(".img_show").on("click", ".img_left",
        function() {
            var a = $(".img_cont img").length;
            if (a <= 5) {
                return
            }
            if (productListModule.imgIdx > 0) {
                productListModule.imgIdx -= 1
            }
            productListModule.imgChange()
        });
        $(".img_show").on("click", ".img_right",
        function() {
            var a = $(".img_cont img").length;
            if (a <= 5) {
                return
            }
            if (productListModule.imgIdx < a - 5) {
                productListModule.imgIdx += 1
            }
            productListModule.imgChange()
        });
        $(".img_show").on("click", "span a",
        function() {
            var c = this.getAttribute("productid");
            var a = $(this).find("img").attr("index");
            var b = document.createElement("a");
            b.setAttribute("href", webSiteShareData.lcItemContextPath + "/product/jpg_" + c + "_" + a + ".html");
            b.setAttribute("target", "_blank");
            b.click()
        });
        $(".list_right").on("mouseleave", ".one img",
        function(a) {
            productListModule.timer = setTimeout(function() {
                $(".img_show").hide().html("")
            },
            10)
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
        $(".list_right").on("click", ".inside .notice",
        function() {
            var a = $(this).attr("param-click").split("|");
            productListModule.showAddNotifyDiv(a[0], a[1], this, a[2], a[3])
        });
        $(document).on("click", ".notice_tit a",
        function() {
            $(".hint_cue").hide();
            $(".notice_wraper").remove()
        });
        $(document).on("click", ".n_fill .fill_btn1",
        function() {
            productListModule.addNotify()
        });
        $(".list_right").on("click", ".commom_pp04",
        function() {
            var a = $(this).attr("param-click").split(",");
            a.unshift(0);
            productListModule.goBlankBoard.apply(productListModule, a)
        });
        $(".arm_give").on("click", ".give_tle a",
        function() {
            $(".hint_cue").hide();
            $(".arm_give").hide()
        });
        $(".list_right").on("click", ".commom_pp05",
        function() {
            var a = $(this).attr("param-click").split(",");
            a.unshift(1);
            productListModule.goBlankBoard.apply(productListModule, a)
        });
        $(document).on("click", ".remind .remind_tle a,.remind .remind_btn .rem_btn2",
        function() {
            $(".remind").remove();
            $(".hint_cue").hide()
        });
        $(document).on("click", ".list_b_an input",
        function() {
            productListModule.noCustomerWantProduct()
        });
        $(document).on("click", "#helpBuy",
        function() {
            productListModule.checkBrokageProduct(this)
        });
        $(".current").on("click", ".common_filter a,.cleanCondition",
        function() {
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
            commonModule.alertFail(constantModule.priceErrorPrompt,
            function() {
                $("#queryBeginPrice").focus()
            });
            return
        }
        var f = $("#queryEndPrice").val();
        if (f.length > 0 && isNaN(f) || parseFloat(f) < 0) {
            commonModule.alertFail(constantModule.priceErrorPrompt,
            function() {
                $("#queryEndPrice").focus()
            });
            return
        }
        if (g.length > 0 && f.length > 0 && parseFloat(g) > parseFloat(f)) {
            commonModule.alertFail(constantModule.glPricePrompt,
            function() {
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
            var a = webSiteShareData.lcListContextPath + "/setQueryDisplayTypeInSession";
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
                    for (var h = 0,
                    e = m.data.length; h < e; h++) {
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
                    customerPhone: h.customerPhone ? h.customerPhone: "",
                    customerEmail: h.customerEmail ? h.customerEmail: ""
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
                                    for (var r = 0,
                                    o = s.list.length; r < o; r++) {
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
        $(document).on("click", ".order .order_cont2 input[data-flag=confirmed]",
        function() {
            var i = $(this).attr("param-click").split("|");
            productListModule.confirmedEnquiryDiv(b, i[0], i[1], i[2], i[3], i[4], i[5], i[6])
        });
        $(document).off("click", ".order .order_tle a,.order .order_cont .order_cont2 input[data-flag=cancel]");
        $(document).on("click", ".order .order_tle a,.order .order_cont .order_cont2 input[data-flag=cancel]",
        function() {
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
        $(document).on("click", ".add_suces > span,.add_suces .setment a",
        function() {
            $(".add_suces").remove()
        });
        productListModule.tempData.shopTimekey = setTimeout(function() {
            $(".add_suces").remove();
            if (productListModule.tempData.shopTimekey) {
                clearTimeout(productListModule.tempData.shopTimekey);
                productListModule.tempData.shopTimekey = ""
            }
        },
        5000)
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
            sosuoPrefix: webSiteShareData.lcListContextPath
        };
        $(".remind").remove();
        $("#remindTmpl").tmpl(a).appendTo("body");
        $(".remind").css("margin-top", -$(".remind").height() / 2);
        $(document).off("click", ".remind .remind_btn .rem_btn1");
        $(document).on("click", ".remind .remind_btn .rem_btn1",
        function() {
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
        $(document).on("click", ".off_shelf .off_shelf_sure",
        function() {
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
        url = webSiteShareData.lcMallContextPath + "/so/order/checkBrokage.html";
        window.location.href = url + "?productModel=" + c + "&encapsulationModel=" + a
    },
    replaceLinkAddressChar: function(a) {
        if (! (a && a != "")) {
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
        var a = webSiteShareData.lcListContextPath + "/setQueryDisplayTypeInSession";
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
        }: {
            src: b.src || "xpath",
            time: b.time || 300
        };
        var a = function(e) {
            return e.replace(/-(\w)/g,
            function(f, g) {
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
            return g == "auto" ? "": g
        };
        var c = function() {
            productListModule.refreshImg()
        };
        $(window).on("scroll",
        function() {
            setTimeout(function() {
                c()
            },
            d.time)
        });
        return c()
    }),
    refreshImg: function() {
        var b = (arguments.length == 0) ? {
            src: "xpath",
            time: 300
        }: {
            src: options.src || "xpath",
            time: options.time || 300
        };
        var g = $(".home_scroll_img_mark");
        var h = window.pageYOffset ? window.pageYOffset: window.document.documentElement.scrollTop,
        l = h + Number(window.innerHeight ? window.innerHeight: document.documentElement.clientHeight),
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
        var a = "/addSearchRecord.html";
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
        if (! (/^\+?[1-9][0-9]*$/.test(a))) {
            $("#replenishNumber").val("");
            $("#replenishNumber").focus();
            return
        }
        var h = $("#replenishPhone").val();
        if (! (/^1(3|4|5|7|8|9)\d{9}$/.test(h))) {
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
        $("#filter_correction_iframe").attr("src", "/loadFilterCorrectionInner.html?productTypeManagerId=" + a)
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
}; (function(a) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        define(["jquery"], a)
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = function(b, c) {
                if (c === undefined) {
                    if (typeof window !== "undefined") {
                        c = require("jquery")
                    } else {
                        c = require("jquery")(b)
                    }
                }
                a(c);
                return c
            }
        } else {
            a(jQuery)
        }
    }
} (function(a) {
    var c = {
        totalData: 0,
        showData: 0,
        pageCount: 9,
        current: 1,
        prevCls: "prev",
        nextCls: "next",
        prevContent: "<",
        nextContent: ">",
        activeCls: "active",
        coping: false,
        isHide: false,
        homePage: "",
        endPage: "",
        keepShowPN: false,
        count: 3,
        jump: false,
        jumpIptCls: "jump-ipt",
        jumpBtnCls: "jump-btn",
        jumpBtn: "跳转",
        callback: function() {}
    };
    var b = function(e, d) {
        var f = d,
        g, h = a(document),
        i = a(e);
        this.setPageCount = function(j) {
            return f.pageCount = j
        };
        this.getPageCount = function() {
            return f.totalData && f.showData ? Math.ceil(parseInt(f.totalData) / f.showData) : f.pageCount
        };
        this.getCurrent = function() {
            return g
        };
        this.filling = function(l) {
            var m = '<div class="right"><span class="total_page">共<i>' + f.totalData + "</i>条记录 </span>";
            g = parseInt(l) || parseInt(f.current);
            var k = this.getPageCount();
            if (f.keepShowPN || g > 1) {
                m += '<a href="javascript:;" class="' + f.prevCls + '">' + f.prevContent + "</a>"
            } else {
                if (f.keepShowPN == false) {
                    i.find("." + f.prevCls) && i.find("." + f.prevCls).remove()
                }
            }
            if (g >= f.count + 2 && g != 1 && k != f.count) {
                var n = f.coping && f.homePage ? f.homePage: "1";
                m += f.coping ? '<a href="javascript:;" data-page="1">' + n + "</a><span>...</span>": ""
            }
            var o = (g - f.count) <= 1 ? 1 : (g - f.count);
            var j = (g + f.count) >= k ? k: (g + f.count);
            for (; o <= j; o++) {
                if (o <= k && o >= 1) {
                    if (o != g) {
                        m += '<a href="javascript:;" data-page="' + o + '">' + o + "</a>"
                    } else {
                        m += '<span class="' + f.activeCls + '">' + o + "</span>"
                    }
                }
            }
            if (g + f.count < k && g >= 1 && k > f.count) {
                var j = f.coping && f.endPage ? f.endPage: k;
                m += f.coping ? '<span>...</span><a href="javascript:;" data-page="' + k + '">' + j + "</a>": ""
            }
            if (f.keepShowPN || g < k) {
                m += '<a href="javascript:;" class="' + f.nextCls + '">' + f.nextContent + "</a>"
            } else {
                if (f.keepShowPN == false) {
                    i.find("." + f.nextCls) && i.find("." + f.nextCls).remove()
                }
            }
            m += f.jump ? '<input type="text" class="' + f.jumpIptCls + '"><a href="javascript:;" class="' + f.jumpBtnCls + '">' + f.jumpBtn + "</a>": "";
            m += "</div>";
            i.empty().html(m)
        };
        this.eventBind = function() {
            var l = this;
            var k = l.getPageCount();
            var j = 1;
            i.off().on("click", "a",
            function() {
                if (a(this).hasClass(f.nextCls)) {
                    if (i.find("." + f.activeCls).text() >= k) {
                        a(this).addClass("disabled");
                        return false
                    } else {
                        j = parseInt(i.find("." + f.activeCls).text()) + 1
                    }
                } else {
                    if (a(this).hasClass(f.prevCls)) {
                        if (i.find("." + f.activeCls).text() <= 1) {
                            a(this).addClass("disabled");
                            return false
                        } else {
                            j = parseInt(i.find("." + f.activeCls).text()) - 1
                        }
                    } else {
                        if (a(this).hasClass(f.jumpBtnCls)) {
                            if (i.find("." + f.jumpIptCls).val() !== "") {
                                j = parseInt(i.find("." + f.jumpIptCls).val())
                            } else {
                                return
                            }
                        } else {
                            j = parseInt(a(this).data("page"))
                        }
                    }
                }
                l.filling(j);
                typeof f.callback === "function" && f.callback(l)
            });
            i.on("input propertychange", "." + f.jumpIptCls,
            function() {
                var n = a(this);
                var o = n.val();
                var m = /[^\d]/g;
                if (m.test(o)) {
                    n.val(o.replace(m, ""))
                } (parseInt(o) > k) && n.val(k);
                if (parseInt(o) === 0) {
                    n.val(1)
                }
            });
            h.keydown(function(n) {
                if (n.keyCode == 13 && i.find("." + f.jumpIptCls).val()) {
                    var m = parseInt(i.find("." + f.jumpIptCls).val());
                    l.filling(m);
                    typeof f.callback === "function" && f.callback(l)
                }
            })
        };
        this.init = function() {
            this.filling(f.current);
            this.eventBind();
            if (f.isHide && this.getPageCount() == "1" || this.getPageCount() == "0") {
                i.hide()
            } else {
                i.show()
            }
        };
        this.init()
    };
    a.fn.pagination = function(f, e) {
        if (typeof f == "function") {
            e = f;
            f = {}
        } else {
            f = f || {};
            e = e ||
            function() {}
        }
        var d = a.extend({},
        c, f);
        return this.each(function() {
            var g = new b(this, d);
            e(g)
        })
    }
}));
var fillterDataMoudle = {
    searchData: {},
    selectStr: "",
    totalListStrs: {},
    tplShopList: "",
    tplSelect: "",
    cacheLi: "",
    lcsqWebsiteurl: "",
    init: function() {
        var g = this;
        var b = parameter || {};
        for (var a = 0; a < b.queryProductGradePlateId.length; a++) {
            var f = b.queryProductGradePlateId[a].split("$");
            b.queryProductGradePlateId[a] = {
                code: f[1],
                name: f[0]
            }
        }
        g.methods.appendSelectStrStatic(b);
        fillterDataMoudle.lcsqWebsiteurl = $(".l02_sq >a").eq(0).attr("href");
        var c = $(".name");
        fillterDataMoudle.totalListStrs = {};
        $.each(c,
        function(j, i) {
            var h = $(i).attr("names");
            fillterDataMoudle.totalListStrs[h] = $(i).find("li")
        });
        $("#global-products .select-resize").click(function() {
            $(this).find("span").toggleClass("rotate");
            if ($(this).find("span").hasClass("rotate")) {
                $(".name-scroll").addClass("longer")
            } else {
                $(".name-scroll").removeClass("longer")
            }
        });
        $("#global-products").on("click", "li",
        function() {
            var i = $(this).parent().attr("names"),
            h = $(this).attr("codes");
            if (!$(this).hasClass("disabled")) {
                $(this).toggleClass("active");
                if (!$(this).hasClass("active")) {
                    g.methods.removeDom("key-word-con", $(this).text(), i)
                } else {
                    g.methods.appenDom("key-word-wrap", $(this).text(), i, h)
                }
                $(".no_click").show();
                g.methods.sendAjax("POST", "/attributeSelect", fillterDataMoudle.searchData,
                function(l) {
                    g.methods.appendSelectStr(l);
                    var k = $(".name");
                    fillterDataMoudle.totalListStrs = {};
                    $.each(k,
                    function(o, n) {
                        var m = $(n).attr("names");
                        fillterDataMoudle.totalListStrs[m] = $(n).find("li")
                    });
                    $(".no_click").hide();
                    var j = $("#global-products input");
                    $.each(j,
                    function(m, n) {
                        if ($.trim($(n).val())) {
                            $(n).keyup()
                        }
                    })
                })
            }
        });
        $("#key-word-wrap").on("click", ".clear-one",
        function() {
            var h = $(this).parent().find("span").attr("key");
            g.methods.remDomAndActive(this, $(this).parent().find("span").text(), h);
            g.methods.searchParamsHandle("key-word-con");
            $("#global-products input").val("");
            g.methods.sendAjax("POST", "/attributeSelect", fillterDataMoudle.searchData,
            function(i) {
                g.methods.appendSelectStr(i)
            })
        });
        $("#clear").on("click",
        function() {
            $("#global-products input").val("");
            g.methods.removeDomAll("key-word-wrap", "global-products", "active");
            g.methods.searchParamsHandle("key-word-con");
            g.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
            function(h) {
                g.methods.render(h);
                g.methods.appendSelectStr(h)
            })
        });
        var e = false;
        $("#global-products").on("keyup", "input",
        function() {
            var h = $("#global-products input").index($(this)),
            i = $.trim($(this).val());
            setTimeout(function() {
                g.methods.appendSearchSelectStr(h, i, fillterDataMoudle.totalListStrs, e, filterData.cacheLi)
            },
            200)
        });
        $("#global-products").on("focus", "input",
        function() {
            e = true;
            var h = $(this).parent().parent().find(".name-scroll").find(".name").find("li");
            filterData.cacheLi = h
        });
        $("#global-products").on("blur", "input",
        function() {
            e = false
        });
        var d = $(".g04 >b").text();
        g.methods.initPage(1, d);
        $("#makeSure").click(function() {
            var h = $(".stock").offset().top;
            h = !$(".logo_wraper").hasClass("active") ? h - 220 : h - 110;
            $("html,body").animate({
                scrollTop: h
            },
            100);
            g.methods.searchParamsHandle("key-word-con");
            $("#global-products input").val("");
            g.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
            function(i) {
                g.methods.render(i);
                g.methods.appendSelectStr(i)
            })
        });
        $(".stock").on("click", ".aszzs",
        function() {
            var h = $(".stock .aszzs").index($(this));
            $("#global-products input").val("");
            if (h === 2) {
                if ($(this).hasClass("white_top_arrow")) {
                    $(this).addClass("white_bottom_arrow").removeClass("white_top_arrow")
                } else {
                    $(this).addClass("white_top_arrow").removeClass("white_bottom_arrow")
                }
            }
            $(this).siblings().removeClass("white_top_arrow").removeClass("white_bottom_arrow");
            $(this).addClass("qwzzs").siblings().removeClass("qwzzs");
            g.methods.searchParamsHandle("key-word-con");
            g.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
            function(i) {
                g.methods.render(i);
                g.methods.appendSelectStr(i)
            })
        });
        $("#searchInResults").click(function() {
            $("#global-products input").val("");
            g.methods.searchParamsHandle("key-word-con");
            g.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
            function(h) {
                g.methods.render(h);
                g.methods.appendSelectStr(h)
            })
        });
        $("#show_out_sock_products").click(function() {
            g.methods.searchParamsHandle("key-word-con");
            g.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
            function(h) {
                g.methods.render(h);
                g.methods.appendSelectStr(h)
            })
        })
    },
    methods: {
        appenDom: function(d, c, b, a) {
            fillterDataMoudle.tplSelect = "";
            if (a) {
                fillterDataMoudle.tplSelect = '<span><p><span class="key-word-con" codes="' + a + '"  key="' + b + '">' + c + '</span><a class="clear-one"></a></p></span>'
            } else {
                fillterDataMoudle.tplSelect = '<span><p><span class="key-word-con"   key="' + b + '">' + c + '</span><a class="clear-one"></a></p></span>'
            }
            $("#" + d).append(fillterDataMoudle.tplSelect);
            this.searchParamsHandle("key-word-con")
        },
        removeDom: function(c, b, a) {
            $("." + c).each(function(d, e) {
                if ($(e).text() === b && $(e).attr("key") === a) {
                    $(this).parent().parent().remove()
                }
            });
            this.searchParamsHandle("key-word-con")
        },
        remDomAndActive: function(a, c, b) {
            $(a).parent().parent().remove();
            $("#global-products " + b + " li").each(function(d, e) {
                if ($(e).text() === c) {
                    $(e).removeClass("active")
                }
            })
        },
        removeDomAll: function(c, a, b) {
            $("#" + c).html("");
            $("#" + a + " li").removeClass(b);
            $("#" + a + " input").val("")
        },
        searchParamsHandle: function(b) {
            var a = $("." + b);
            fillterDataMoudle.searchData = {
                catalogNodeId: filterData.catalogId,
                pageNumber: "",
                querySortBySign: "",
                showOutSockProduct: "",
                queryProductGradePlateId: "",
                queryProductArrange: "",
                keyword: "",
                queryBeginPrice: "",
                queryEndPrice: "",
                queryProductStandard: "",
                queryParameterValue: "",
                queryProductArrange: [],
                queryProductGradePlateId: [],
                queryParameterValue: [],
                queryProductStandard: [],
                showOutSockProduct: 1,
                lastParamName: ""
            };
            a.each(function(f, h) {
                var e = $(h).attr("key"),
                d = $(h).text(),
                c = "";
                if (e === "queryProductGradePlateId") {
                    c = $(h).attr("codes");
                    fillterDataMoudle.searchData[e].push(c)
                } else {
                    if (e === "queryProductArrange") {
                        fillterDataMoudle.searchData[e].push(d)
                    } else {
                        if (e === "queryProductStandard") {
                            fillterDataMoudle.searchData[e].push(d)
                        } else {
                            var g = d + "@" + e;
                            fillterDataMoudle.searchData.queryParameterValue.push(g)
                        }
                    }
                }
                fillterDataMoudle.searchData.lastParamName = e
            });
            fillterDataMoudle.searchData.keyword = $("#localQueryKeyword").val();
            fillterDataMoudle.searchData.queryBeginPrice = $("#queryBeginPrice").val();
            fillterDataMoudle.searchData.queryEndPrice = $("#queryEndPrice").val();
            fillterDataMoudle.searchData.showOutSockProduct = $("#show_out_sock_products").is(":checked") ? "0": "1";
            fillterDataMoudle.searchData.queryProductGradePlateId = fillterDataMoudle.searchData.queryProductGradePlateId.join("$");
            fillterDataMoudle.searchData.queryProductStandard = fillterDataMoudle.searchData.queryProductStandard.join("$");
            fillterDataMoudle.searchData.queryParameterValue = fillterDataMoudle.searchData.queryParameterValue.join("$");
            fillterDataMoudle.searchData.queryProductArrange = fillterDataMoudle.searchData.queryProductArrange.join("$");
            if ($(".qwzzs").attr("data-index") == 0) {
                fillterDataMoudle.searchData.querySortBySign = 0
            }
            if ($(".qwzzs").attr("data-index") == 1) {
                fillterDataMoudle.searchData.querySortBySign = 4
            }
            if ($(".qwzzs").attr("data-index") == 2) {
                if ($(".qwzzs").hasClass("white_top_arrow")) {
                    fillterDataMoudle.searchData.querySortBySign = 1
                } else {
                    fillterDataMoudle.searchData.querySortBySign = 2
                }
            }
        },
        appendSelectStrStatic: function(b) {
            var a = "";
            $.each(b,
            function(d, e) {
                if (e.length > 11) {
                    a = "";
                    $.each(e,
                    function(g, f) {
                        if (g >= 10) {
                            if (d == "queryProductGradePlateId") {
                                a += '<li  codes="' + f.code + '">' + f.name + "</li>"
                            } else {
                                a += "<li >" + f + "</li>"
                            }
                        }
                    });
                    var c = 'ul[names="' + d + '"]';
                    $(c).append(a)
                }
            })
        },
        appendSelectStr: function(b) {
            fillterDataMoudle.selectStr = "";
            $.each(b.result,
            function(c, f) {
                var d = c,
                g = "";
                fillterDataMoudle.selectStr = "";
                $.each(f,
                function(i, h) {
                    g = h.status == true ? "": "disabled";
                    if (d == "queryProductGradePlateId") {
                        fillterDataMoudle.selectStr += '<li  codes="' + h.code + '" class="' + g + '">' + h.name + "</li>"
                    } else {
                        fillterDataMoudle.selectStr += '<li  class="' + g + '">' + h.name + "</li>"
                    }
                });
                var e = 'ul[names="' + c + '"]';
                $(e).html(fillterDataMoudle.selectStr)
            });
            var a = $(".key-word-con");
            $.each(a,
            function(f, g) {
                var e = $(g).attr("key"),
                c = $(g).text();
                var d = $('ul[names="' + e + '"]').find("li");
                $.each(d,
                function(h, i) {
                    if ($(this).text() === c) {
                        if (!$(this).hasClass("active")) {
                            $(this).addClass("active")
                        }
                    }
                })
            });
            $("#totalNums").text(b.totalCount)
        },
        appendSearchSelectStr: function(h, f, a, b, e) {
            var g = [];
            var c = $(".name").eq(h).attr("names"),
            d;
            if (b && e.length > 0) {
                d = e
            } else {
                d = a[c]
            }
            d.each(function(i, j) {
                if ($(j).text().toLowerCase().indexOf(f.toLowerCase()) > -1) {
                    g.push(j)
                }
            });
            if (!f) {
                $(".name").eq(h).html(d)
            } else {
                $(".name").eq(h).html(g)
            }
        },
        render: function(c) {
            $("#shop_list").html("");
            c.lcsqWebsiteurl = fillterDataMoudle.lcsqWebsiteurl;
            c.isShowWayStock = filterData.isShowWayStock;
            c.lcMallContextPath = webSiteShareData.lcMallContextPath;
            c.lcItemContextPath = webSiteShareData.lcItemContextPath;
            c.lcListContextPath = webSiteShareData.lcListContextPath;
            c.lcBrandPrefix = webSiteShareData.lcBrandPrefix;
            c.lcCatalogPrefix = webSiteShareData.lcCatalogPrefix;
            for (var b = 0; b < c.productRecordList.length; b++) {
                c.productRecordList[b].groupProductIds = c.productRecordList[b].productId;
                c.productRecordList[b].groupProductId = c.productRecordList[b].productId;
                c.productRecordList[b].showLastEncaption = c.productRecordList[b].showLastEncaption;
                if (c.productRecordList[b].productPriceList.length < 2) {
                    c.productRecordList[b].showLastEncaption = false
                }
                for (var a = 0; a < c.productRecordList[b].productLevelList.length; a++) {
                    c.productRecordList[b].groupProductIds += "," + c.productRecordList[b].productLevelList[a].productId;
                    c.productRecordList[b].productLevelList[a].groupProductId = c.productRecordList[b].productId
                }
            }
            $("#shopListTmpl").tmpl(c).appendTo("#shop_list");
            this.initPage(1, c.totalCount);
            $(".g04 >b").text(c.totalCount);
            $("#totalNums").text(c.totalCount);
            productListModule.refreshImg()
        },
        initPage: function(b, a) {
            $(".page").pagination({
                totalData: a,
                pageCount: Math.ceil(a / 30),
                jump: false,
                coping: true,
                isHide: true,
                current: b,
                homePage: "首页",
                endPage: "末页",
                prevContent: "上一页",
                nextContent: "下一页",
                callback: function(c) {
                    fillterDataMoudle.methods.searchParamsHandle("key-word-con");
                    var d = $(".stock").offset().top;
                    d = !$(".logo_wraper").hasClass("active") ? d - 220 : d - 110;
                    $("html,body").animate({
                        scrollTop: d
                    },
                    200);
                    fillterDataMoudle.searchData.pageNumber = c.getCurrent();
                    fillterDataMoudle.methods.sendAjax("POST", "/products/list", fillterDataMoudle.searchData,
                    function(g) {
                        g.lcsqWebsiteurl = fillterDataMoudle.lcsqWebsiteurl;
                        g.isShowWayStock = filterData.isShowWayStock;
                        g.lcMallContextPath = webSiteShareData.lcMallContextPath;
                        g.lcItemContextPath = webSiteShareData.lcItemContextPath;
                        g.lcListContextPath = webSiteShareData.lcListContextPath;
                        g.lcBrandPrefix = webSiteShareData.lcBrandPrefix;
                        g.lcCatalogPrefix = webSiteShareData.lcCatalogPrefix;
                        for (var f = 0; f < g.productRecordList.length; f++) {
                            g.productRecordList[f].groupProductIds = g.productRecordList[f].productId;
                            g.productRecordList[f].groupProductId = g.productRecordList[f].productId;
                            g.productRecordList[f].showLastEncaption = g.productRecordList[f].showLastEncaption;
                            if (g.productRecordList[f].productPriceList.length < 2) {
                                g.productRecordList[f].showLastEncaption = false
                            }
                            for (var e = 0; e < g.productRecordList[f].productLevelList.length; e++) {
                                g.productRecordList[f].groupProductIds += "," + g.productRecordList[f].productLevelList[e].productId;
                                g.productRecordList[f].productLevelList[e].groupProductId = g.productRecordList[f].productId
                            }
                        }
                        $("#shop_list").html("");
                        $("#shopListTmpl").tmpl(g).appendTo("#shop_list");
                        productListModule.refreshImg()
                    })
                }
            })
        },
        sendAjax: function(c, b, d, a) {
            $.ajax({
                type: c,
                url: b,
                dataType: "json",
                data: d,
                success: function(e) {
                    a(e)
                },
                error: function() {
                    commonModule.alertFail("系统异常")
                }
            })
        }
    }
};
fillterDataMoudle.init();