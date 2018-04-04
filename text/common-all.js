/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e, t) {
	function _(e) {
		var t = M[e] = {};
		return v.each(e.split(y), function(e, n) {
			t[n] = !0
		}), t
	}

	function H(e, n, r) {
		if (r === t && e.nodeType === 1) {
			var i = "data-" + n.replace(P, "-$1").toLowerCase();
			r = e.getAttribute(i);
			if (typeof r == "string") {
				try {
					r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
				} catch (s) {}
				v.data(e, n, r)
			} else {
				r = t
			}
		}
		return r
	}

	function B(e) {
		var t;
		for (t in e) {
			if (t === "data" && v.isEmptyObject(e[t])) {
				continue
			}
			if (t !== "toJSON") {
				return !1
			}
		}
		return !0
	}

	function et() {
		return !1
	}

	function tt() {
		return !0
	}

	function ut(e) {
		return !e || !e.parentNode || e.parentNode.nodeType === 11
	}

	function at(e, t) {
		do {
			e = e[t]
		} while (e && e.nodeType !== 1);
		return e
	}

	function ft(e, t, n) {
		t = t || 0;
		if (v.isFunction(t)) {
			return v.grep(e, function(e, r) {
				var i = !!t.call(e, r, e);
				return i === n
			})
		}
		if (t.nodeType) {
			return v.grep(e, function(e, r) {
				return e === t === n
			})
		}
		if (typeof t == "string") {
			var r = v.grep(e, function(e) {
				return e.nodeType === 1
			});
			if (it.test(t)) {
				return v.filter(t, r, !n)
			}
			t = v.filter(t, r)
		}
		return v.grep(e, function(e, r) {
			return v.inArray(e, t) >= 0 === n
		})
	}

	function lt(e) {
		var t = ct.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) {
			while (t.length) {
				n.createElement(t.pop())
			}
		}
		return n
	}

	function Lt(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}

	function At(e, t) {
		if (t.nodeType !== 1 || !v.hasData(e)) {
			return
		}
		var n, r, i, s = v._data(e),
			o = v._data(t, s),
			u = s.events;
		if (u) {
			delete o.handle, o.events = {};
			for (n in u) {
				for (r = 0, i = u[n].length; r < i; r++) {
					v.event.add(t, n, u[n][r])
				}
			}
		}
		o.data && (o.data = v.extend({}, o.data))
	}

	function Ot(e, t) {
		var n;
		if (t.nodeType !== 1) {
			return
		}
		t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando)
	}

	function Mt(e) {
		return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
	}

	function _t(e) {
		Et.test(e.type) && (e.defaultChecked = e.checked)
	}

	function Qt(e, t) {
		if (t in e) {
			return t
		}
		var n = t.charAt(0).toUpperCase() + t.slice(1),
			r = t,
			i = Jt.length;
		while (i--) {
			t = Jt[i] + n;
			if (t in e) {
				return t
			}
		}
		return r
	}

	function Gt(e, t) {
		return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
	}

	function Yt(e, t) {
		var n, r, i = [],
			s = 0,
			o = e.length;
		for (; s < o; s++) {
			n = e[s];
			if (!n.style) {
				continue
			}
			i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
		}
		for (s = 0; s < o; s++) {
			n = e[s];
			if (!n.style) {
				continue
			}
			if (!t || n.style.display === "none" || n.style.display === "") {
				n.style.display = t ? i[s] || "" : "none"
			}
		}
		return e
	}

	function Zt(e, t, n) {
		var r = Rt.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function en(e, t, n, r) {
		var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
			s = 0;
		for (; i < 4; i += 2) {
			n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0))
		}
		return s
	}

	function tn(e, t, n) {
		var r = t === "width" ? e.offsetWidth : e.offsetHeight,
			i = !0,
			s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
		if (r <= 0 || r == null) {
			r = Dt(e, t);
			if (r < 0 || r == null) {
				r = e.style[t]
			}
			if (Ut.test(r)) {
				return r
			}
			i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
		}
		return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
	}

	function nn(e) {
		if (Wt[e]) {
			return Wt[e]
		}
		var t = v("<" + e + ">").appendTo(i.body),
			n = t.css("display");
		t.remove();
		if (n === "none" || n === "") {
			Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			}));
			if (!Ht || !Pt.createElement) {
				Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close()
			}
			t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)
		}
		return Wt[e] = n, n
	}

	function fn(e, t, n, r) {
		var i;
		if (v.isArray(t)) {
			v.each(t, function(t, i) {
				n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
			})
		} else {
			if (!n && v.type(t) === "object") {
				for (i in t) {
					fn(e + "[" + i + "]", t[i], n, r)
				}
			} else {
				r(e, t)
			}
		}
	}

	function Cn(e) {
		return function(t, n) {
			typeof t != "string" && (n = t, t = "*");
			var r, i, s, o = t.toLowerCase().split(y),
				u = 0,
				a = o.length;
			if (v.isFunction(n)) {
				for (; u < a; u++) {
					r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
				}
			}
		}
	}

	function kn(e, n, r, i, s, o) {
		s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
		var u, a = e[s],
			f = 0,
			l = a ? a.length : 0,
			c = e === Sn;
		for (; f < l && (c || !u); f++) {
			u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)))
		}
		return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
	}

	function Ln(e, n) {
		var r, i, s = v.ajaxSettings.flatOptions || {};
		for (r in n) {
			n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r])
		}
		i && v.extend(!0, e, i)
	}

	function An(e, n, r) {
		var i, s, o, u, a = e.contents,
			f = e.dataTypes,
			l = e.responseFields;
		for (s in l) {
			s in r && (n[l[s]] = r[s])
		}
		while (f[0] === "*") {
			f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"))
		}
		if (i) {
			for (s in a) {
				if (a[s] && a[s].test(i)) {
					f.unshift(s);
					break
				}
			}
		}
		if (f[0] in r) {
			o = f[0]
		} else {
			for (s in r) {
				if (!f[0] || e.converters[s + " " + f[0]]) {
					o = s;
					break
				}
				u || (u = s)
			}
			o = o || u
		}
		if (o) {
			return o !== f[0] && f.unshift(o), r[o]
		}
	}

	function On(e, t) {
		var n, r, i, s, o = e.dataTypes.slice(),
			u = o[0],
			a = {},
			f = 0;
		e.dataFilter && (t = e.dataFilter(t, e.dataType));
		if (o[1]) {
			for (n in e.converters) {
				a[n.toLowerCase()] = e.converters[n]
			}
		}
		for (; i = o[++f];) {
			if (i !== "*") {
				if (u !== "*" && u !== i) {
					n = a[u + " " + i] || a["* " + i];
					if (!n) {
						for (r in a) {
							s = r.split(" ");
							if (s[1] === i) {
								n = a[u + " " + s[0]] || a["* " + s[0]];
								if (n) {
									n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
									break
								}
							}
						}
					}
					if (n !== !0) {
						if (n && e["throws"]) {
							t = n(t)
						} else {
							try {
								t = n(t)
							} catch (l) {
								return {
									state: "parsererror",
									error: n ? l : "No conversion from " + u + " to " + i
								}
							}
						}
					}
				}
				u = i
			}
		}
		return {
			state: "success",
			data: t
		}
	}

	function Fn() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}

	function In() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}

	function $n() {
		return setTimeout(function() {
			qn = t
		}, 0), qn = v.now()
	}

	function Jn(e, t) {
		v.each(t, function(t, n) {
			var r = (Vn[t] || []).concat(Vn["*"]),
				i = 0,
				s = r.length;
			for (; i < s; i++) {
				if (r[i].call(e, t, n)) {
					return
				}
			}
		})
	}

	function Kn(e, t, n) {
		var r, i = 0,
			s = 0,
			o = Xn.length,
			u = v.Deferred().always(function() {
				delete a.elem
			}),
			a = function() {
				var t = qn || $n(),
					n = Math.max(0, f.startTime + f.duration - t),
					r = n / f.duration || 0,
					i = 1 - r,
					s = 0,
					o = f.tweens.length;
				for (; s < o; s++) {
					f.tweens[s].run(i)
				}
				return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1)
			},
			f = u.promise({
				elem: e,
				props: v.extend({}, t),
				opts: v.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: qn || $n(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n, r) {
					var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
					return f.tweens.push(i), i
				},
				stop: function(t) {
					var n = 0,
						r = t ? f.tweens.length : 0;
					for (; n < r; n++) {
						f.tweens[n].run(1)
					}
					return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
				}
			}),
			l = f.props;
		Qn(l, f.opts.specialEasing);
		for (; i < o; i++) {
			r = Xn[i].call(f, e, l, f.opts);
			if (r) {
				return r
			}
		}
		return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
			anim: f,
			queue: f.opts.queue,
			elem: e
		})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
	}

	function Qn(e, t) {
		var n, r, i, s, o;
		for (n in e) {
			r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
			if (o && "expand" in o) {
				s = o.expand(s), delete e[r];
				for (n in s) {
					n in e || (e[n] = s[n], t[n] = i)
				}
			} else {
				t[r] = i
			}
		}
	}

	function Gn(e, t, n) {
		var r, i, s, o, u, a, f, l, c, h = this,
			p = e.style,
			d = {},
			m = [],
			g = e.nodeType && Gt(e);
		n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
			l.unqueued || c()
		}), l.unqueued++, h.always(function() {
			h.always(function() {
				l.unqueued--, v.queue(e, "fx").length || l.empty.fire()
			})
		})), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function() {
			p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
		}));
		for (r in t) {
			s = t[r];
			if (Un.exec(s)) {
				delete t[r], a = a || s === "toggle";
				if (s === (g ? "hide" : "show")) {
					continue
				}
				m.push(r)
			}
		}
		o = m.length;
		if (o) {
			u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function() {
				v(e).hide()
			}), h.done(function() {
				var t;
				v.removeData(e, "fxshow", !0);
				for (t in d) {
					v.style(e, t, d[t])
				}
			});
			for (r = 0; r < o; r++) {
				i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0))
			}
		}
	}

	function Yn(e, t, n, r, i) {
		return new Yn.prototype.init(e, t, n, r, i)
	}

	function Zn(e, t) {
		var n, r = {
				height: e
			},
			i = 0;
		t = t ? 1 : 0;
		for (; i < 4; i += 2 - t) {
			n = $t[i], r["margin" + n] = r["padding" + n] = e
		}
		return t && (r.opacity = r.width = e), r
	}

	function tr(e) {
		return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
	}
	var n, r, i = e.document,
		s = e.location,
		o = e.navigator,
		u = e.jQuery,
		a = e.$,
		f = Array.prototype.push,
		l = Array.prototype.slice,
		c = Array.prototype.indexOf,
		h = Object.prototype.toString,
		p = Object.prototype.hasOwnProperty,
		d = String.prototype.trim,
		v = function(e, t) {
			return new v.fn.init(e, t, n)
		},
		m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
		g = /\S/,
		y = /\s+/,
		b = /^[\s﻿\xA0]+|[\s﻿\xA0]+$/g,
		w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		S = /^[\],:{}\s]*$/,
		x = /(?:^|:|,)(?:\s*\[)+/g,
		T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
		C = /^-ms-/,
		k = /-([\da-z])/gi,
		L = function(e, t) {
			return (t + "").toUpperCase()
		},
		A = function() {
			i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
		},
		O = {};
	v.fn = v.prototype = {
		constructor: v,
		init: function(e, n, r) {
			var s, o, u, a;
			if (!e) {
				return this
			}
			if (e.nodeType) {
				return this.context = this[0] = e, this.length = 1, this
			}
			if (typeof e == "string") {
				e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
				if (s && (s[1] || !n)) {
					if (s[1]) {
						return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e)
					}
					o = i.getElementById(s[2]);
					if (o && o.parentNode) {
						if (o.id !== s[2]) {
							return r.find(e)
						}
						this.length = 1, this[0] = o
					}
					return this.context = i, this.selector = e, this
				}
				return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
			}
			return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
		},
		selector: "",
		jquery: "1.8.3",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return l.call(this)
		},
		get: function(e) {
			return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
		},
		pushStack: function(e, t, n) {
			var r = v.merge(this.constructor(), e);
			return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
		},
		each: function(e, t) {
			return v.each(this, e, t)
		},
		ready: function(e) {
			return v.ready.promise().done(e), this
		},
		eq: function(e) {
			return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function() {
			return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
		},
		map: function(e) {
			return this.pushStack(v.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: f,
		sort: [].sort,
		splice: [].splice
	}, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function() {
		var e, n, r, i, s, o, u = arguments[0] || {},
			a = 1,
			f = arguments.length,
			l = !1;
		typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
		for (; a < f; a++) {
			if ((e = arguments[a]) != null) {
				for (n in e) {
					r = u[n], i = e[n];
					if (u === i) {
						continue
					}
					l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
				}
			}
		}
		return u
	}, v.extend({
		noConflict: function(t) {
			return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? v.readyWait++ : v.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? --v.readyWait : v.isReady) {
				return
			}
			if (!i.body) {
				return setTimeout(v.ready, 1)
			}
			v.isReady = !0;
			if (e !== !0 && --v.readyWait > 0) {
				return
			}
			r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready")
		},
		isFunction: function(e) {
			return v.type(e) === "function"
		},
		isArray: Array.isArray || function(e) {
			return v.type(e) === "array"
		},
		isWindow: function(e) {
			return e != null && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return e == null ? String(e) : O[h.call(e)] || "object"
		},
		isPlainObject: function(e) {
			if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) {
				return !1
			}
			try {
				if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) {
					return !1
				}
			} catch (n) {
				return !1
			}
			var r;
			for (r in e) {}
			return r === t || p.call(e, r)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) {
				return !1
			}
			return !0
		},
		error: function(e) {
			throw new Error(e)
		},
		parseHTML: function(e, t, n) {
			var r;
			return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
		},
		parseJSON: function(t) {
			if (!t || typeof t != "string") {
				return null
			}
			t = v.trim(t);
			if (e.JSON && e.JSON.parse) {
				return e.JSON.parse(t)
			}
			if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) {
				return (new Function("return " + t))()
			}
			v.error("Invalid JSON: " + t)
		},
		parseXML: function(n) {
			var r, i;
			if (!n || typeof n != "string") {
				return null
			}
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
			} catch (s) {
				r = t
			}
			return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
		},
		noop: function() {},
		globalEval: function(t) {
			t && g.test(t) && (e.execScript || function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(C, "ms-").replace(k, L)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, n, r) {
			var i, s = 0,
				o = e.length,
				u = o === t || v.isFunction(e);
			if (r) {
				if (u) {
					for (i in e) {
						if (n.apply(e[i], r) === !1) {
							break
						}
					}
				} else {
					for (; s < o;) {
						if (n.apply(e[s++], r) === !1) {
							break
						}
					}
				}
			} else {
				if (u) {
					for (i in e) {
						if (n.call(e[i], i, e[i]) === !1) {
							break
						}
					}
				} else {
					for (; s < o;) {
						if (n.call(e[s], s, e[s++]) === !1) {
							break
						}
					}
				}
			}
			return e
		},
		trim: d && !d.call("﻿ ") ? function(e) {
			return e == null ? "" : d.call(e)
		} : function(e) {
			return e == null ? "" : (e + "").replace(b, "")
		},
		makeArray: function(e, t) {
			var n, r = t || [];
			return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
		},
		inArray: function(e, t, n) {
			var r;
			if (t) {
				if (c) {
					return c.call(t, e, n)
				}
				r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
				for (; n < r; n++) {
					if (n in t && t[n] === e) {
						return n
					}
				}
			}
			return -1
		},
		merge: function(e, n) {
			var r = n.length,
				i = e.length,
				s = 0;
			if (typeof r == "number") {
				for (; s < r; s++) {
					e[i++] = n[s]
				}
			} else {
				while (n[s] !== t) {
					e[i++] = n[s++]
				}
			}
			return e.length = i, e
		},
		grep: function(e, t, n) {
			var r, i = [],
				s = 0,
				o = e.length;
			n = !!n;
			for (; s < o; s++) {
				r = !!t(e[s], s), n !== r && i.push(e[s])
			}
			return i
		},
		map: function(e, n, r) {
			var i, s, o = [],
				u = 0,
				a = e.length,
				f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
			if (f) {
				for (; u < a; u++) {
					i = n(e[u], u, r), i != null && (o[o.length] = i)
				}
			} else {
				for (s in e) {
					i = n(e[s], s, r), i != null && (o[o.length] = i)
				}
			}
			return o.concat.apply([], o)
		},
		guid: 1,
		proxy: function(e, n) {
			var r, i, s;
			return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function() {
				return e.apply(n, i.concat(l.call(arguments)))
			}, s.guid = e.guid = e.guid || v.guid++, s) : t
		},
		access: function(e, n, r, i, s, o, u) {
			var a, f = r == null,
				l = 0,
				c = e.length;
			if (r && typeof r == "object") {
				for (l in r) {
					v.access(e, n, l, r[l], 1, o, i)
				}
				s = 1
			} else {
				if (i !== t) {
					a = u === t && v.isFunction(i), f && (a ? (a = n, n = function(e, t, n) {
						return a.call(v(e), n)
					}) : (n.call(e, i), n = null));
					if (n) {
						for (; l < c; l++) {
							n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u)
						}
					}
					s = 1
				}
			}
			return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
		},
		now: function() {
			return (new Date).getTime()
		}
	}), v.ready.promise = function(t) {
		if (!r) {
			r = v.Deferred();
			if (i.readyState === "complete") {
				setTimeout(v.ready, 1)
			} else {
				if (i.addEventListener) {
					i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1)
				} else {
					i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
					var n = !1;
					try {
						n = e.frameElement == null && i.documentElement
					} catch (s) {}
					n && n.doScroll && function o() {
						if (!v.isReady) {
							try {
								n.doScroll("left")
							} catch (e) {
								return setTimeout(o, 50)
							}
							v.ready()
						}
					}()
				}
			}
		}
		return r.promise(t)
	}, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
		O["[object " + t + "]"] = t.toLowerCase()
	}), n = v(i);
	var M = {};
	v.Callbacks = function(e) {
		e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
		var n, r, i, s, o, u, a = [],
			f = !e.once && [],
			l = function(t) {
				n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
				for (; a && u < o; u++) {
					if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
						n = !1;
						break
					}
				}
				i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
			},
			c = {
				add: function() {
					if (a) {
						var t = a.length;
						(function r(t) {
							v.each(t, function(t, n) {
								var i = v.type(n);
								i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
							})
						})(arguments), i ? o = a.length : n && (s = t, l(n))
					}
					return this
				},
				remove: function() {
					return a && v.each(arguments, function(e, t) {
						var n;
						while ((n = v.inArray(t, a, n)) > -1) {
							a.splice(n, 1), i && (n <= o && o--, n <= u && u--)
						}
					}), this
				},
				has: function(e) {
					return v.inArray(e, a) > -1
				},
				empty: function() {
					return a = [], this
				},
				disable: function() {
					return a = f = n = t, this
				},
				disabled: function() {
					return !a
				},
				lock: function() {
					return f = t, n || c.disable(), this
				},
				locked: function() {
					return !f
				},
				fireWith: function(e, t) {
					return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
				},
				fire: function() {
					return c.fireWith(this, arguments), this
				},
				fired: function() {
					return !!r
				}
			};
		return c
	}, v.extend({
		Deferred: function(e) {
			var t = [
					["resolve", "done", v.Callbacks("once memory"), "resolved"],
					["reject", "fail", v.Callbacks("once memory"), "rejected"],
					["notify", "progress", v.Callbacks("memory")]
				],
				n = "pending",
				r = {
					state: function() {
						return n
					},
					always: function() {
						return i.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return v.Deferred(function(n) {
							v.each(t, function(t, r) {
								var s = r[0],
									o = e[t];
								i[r[1]](v.isFunction(o) ? function() {
									var e = o.apply(this, arguments);
									e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
								} : n[s])
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return e != null ? v.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, v.each(t, function(e, s) {
				var o = s[2],
					u = s[3];
				r[s[1]] = o.add, u && o.add(function() {
					n = u
				}, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function(e) {
			var t = 0,
				n = l.call(arguments),
				r = n.length,
				i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
				s = i === 1 ? e : v.Deferred(),
				o = function(e, t, n) {
					return function(r) {
						t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
					}
				},
				u, a, f;
			if (r > 1) {
				u = new Array(r), a = new Array(r), f = new Array(r);
				for (; t < r; t++) {
					n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
				}
			}
			return i || s.resolveWith(f, n), s.promise()
		}
	}), v.support = function() {
		var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
		p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];
		if (!n || !r || !n.length) {
			return {}
		}
		s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
			leadingWhitespace: p.firstChild.nodeType === 3,
			tbody: !p.getElementsByTagName("tbody").length,
			htmlSerialize: !!p.getElementsByTagName("link").length,
			style: /top/.test(r.getAttribute("style")),
			hrefNormalized: r.getAttribute("href") === "/a",
			opacity: /^0.5/.test(r.style.opacity),
			cssFloat: !!r.style.cssFloat,
			checkOn: u.value === "on",
			optSelected: o.selected,
			getSetAttribute: p.className !== "t",
			enctype: !!i.createElement("form").enctype,
			html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			boxModel: i.compatMode === "CSS1Compat",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
		try {
			delete p.test
		} catch (d) {
			t.deleteExpando = !1
		}!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function() {
			t.noCloneEvent = !1
		}), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
		if (p.attachEvent) {
			for (l in {
					submit: !0,
					change: !0,
					focusin: !0
				}) {
				f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c
			}
		}
		return v(function() {
			var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
				a = i.getElementsByTagName("body")[0];
			if (!a) {
				return
			}
			n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
				width: "4px"
			}).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null
		}), a.removeChild(p), n = r = s = o = u = a = p = null, t
	}();
	var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		P = /([A-Z])/g;
	v.extend({
		cache: {},
		deletedIds: [],
		uuid: 0,
		expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(e) {
			return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e)
		},
		data: function(e, n, r, i) {
			if (!v.acceptData(e)) {
				return
			}
			var s, o, u = v.expando,
				a = typeof n == "string",
				f = e.nodeType,
				l = f ? v.cache : e,
				c = f ? e[u] : e[u] && u;
			if ((!c || !l[c] || !i && !l[c].data) && a && r === t) {
				return
			}
			c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
			if (typeof n == "object" || typeof n == "function") {
				i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n)
			}
			return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o
		},
		removeData: function(e, t, n) {
			if (!v.acceptData(e)) {
				return
			}
			var r, i, s, o = e.nodeType,
				u = o ? v.cache : e,
				a = o ? e[v.expando] : v.expando;
			if (!u[a]) {
				return
			}
			if (t) {
				r = n ? u[a] : u[a].data;
				if (r) {
					v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
					for (i = 0, s = t.length; i < s; i++) {
						delete r[t[i]]
					}
					if (!(n ? B : v.isEmptyObject)(r)) {
						return
					}
				}
			}
			if (!n) {
				delete u[a].data;
				if (!B(u[a])) {
					return
				}
			}
			o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
		},
		_data: function(e, t, n) {
			return v.data(e, t, n, !0)
		},
		acceptData: function(e) {
			var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), v.fn.extend({
		data: function(e, n) {
			var r, i, s, o, u, a = this[0],
				f = 0,
				l = null;
			if (e === t) {
				if (this.length) {
					l = v.data(a);
					if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
						s = a.attributes;
						for (u = s.length; f < u; f++) {
							o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]))
						}
						v._data(a, "parsedAttrs", !0)
					}
				}
				return l
			}
			return typeof e == "object" ? this.each(function() {
				v.data(this, e)
			}) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function(n) {
				if (n === t) {
					return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l
				}
				r[1] = n, this.each(function() {
					var t = v(this);
					t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
				})
			}, null, n, arguments.length > 1, null, !1))
		},
		removeData: function(e) {
			return this.each(function() {
				v.removeData(this, e)
			})
		}
	}), v.extend({
		queue: function(e, t, n) {
			var r;
			if (e) {
				return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []
			}
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = v.queue(e, t),
				r = n.length,
				i = n.shift(),
				s = v._queueHooks(e, t),
				o = function() {
					v.dequeue(e, t)
				};
			i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return v._data(e, n) || v._data(e, n, {
				empty: v.Callbacks("once memory").add(function() {
					v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
				})
			})
		}
	}), v.fn.extend({
		queue: function(e, n) {
			var r = 2;
			return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = v.queue(this, e, n);
				v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				v.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var r, i = 1,
				s = v.Deferred(),
				o = this,
				u = this.length,
				a = function() {
					--i || s.resolveWith(o, [o])
				};
			typeof e != "string" && (n = e, e = t), e = e || "fx";
			while (u--) {
				r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a))
			}
			return a(), s.promise(n)
		}
	});
	var j, F, I, q = /[\t\r\n]/g,
		R = /\r/g,
		U = /^(?:button|input)$/i,
		z = /^(?:button|input|object|select|textarea)$/i,
		W = /^a(?:rea|)$/i,
		X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		V = v.support.getSetAttribute;
	v.fn.extend({
		attr: function(e, t) {
			return v.access(this, v.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				v.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return v.access(this, v.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = v.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function(e) {
			var t, n, r, i, s, o, u;
			if (v.isFunction(e)) {
				return this.each(function(t) {
					v(this).addClass(e.call(this, t, this.className))
				})
			}
			if (e && typeof e == "string") {
				t = e.split(y);
				for (n = 0, r = this.length; n < r; n++) {
					i = this[n];
					if (i.nodeType === 1) {
						if (!i.className && t.length === 1) {
							i.className = e
						} else {
							s = " " + i.className + " ";
							for (o = 0, u = t.length; o < u; o++) {
								s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ")
							}
							i.className = v.trim(s)
						}
					}
				}
			}
			return this
		},
		removeClass: function(e) {
			var n, r, i, s, o, u, a;
			if (v.isFunction(e)) {
				return this.each(function(t) {
					v(this).removeClass(e.call(this, t, this.className))
				})
			}
			if (e && typeof e == "string" || e === t) {
				n = (e || "").split(y);
				for (u = 0, a = this.length; u < a; u++) {
					i = this[u];
					if (i.nodeType === 1 && i.className) {
						r = (" " + i.className + " ").replace(q, " ");
						for (s = 0, o = n.length; s < o; s++) {
							while (r.indexOf(" " + n[s] + " ") >= 0) {
								r = r.replace(" " + n[s] + " ", " ")
							}
						}
						i.className = e ? v.trim(r) : ""
					}
				}
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e,
				r = typeof t == "boolean";
			return v.isFunction(e) ? this.each(function(n) {
				v(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if (n === "string") {
					var i, s = 0,
						o = v(this),
						u = t,
						a = e.split(y);
					while (i = a[s++]) {
						u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
					}
				} else {
					if (n === "undefined" || n === "boolean") {
						this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
					}
				}
			})
		},
		hasClass: function(e) {
			var t = " " + e + " ",
				n = 0,
				r = this.length;
			for (; n < r; n++) {
				if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) {
					return !0
				}
			}
			return !1
		},
		val: function(e) {
			var n, r, i, s = this[0];
			if (!arguments.length) {
				if (s) {
					return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r)
				}
				return
			}
			return i = v.isFunction(e), this.each(function(r) {
				var s, o = v(this);
				if (this.nodeType !== 1) {
					return
				}
				i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function(e) {
					return e == null ? "" : e + ""
				})), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
				if (!n || !("set" in n) || n.set(this, s, "value") === t) {
					this.value = s
				}
			})
		}
	}), v.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function(e) {
					var t, n, r = e.options,
						i = e.selectedIndex,
						s = e.type === "select-one" || i < 0,
						o = s ? null : [],
						u = s ? i + 1 : r.length,
						a = i < 0 ? u : s ? i : 0;
					for (; a < u; a++) {
						n = r[a];
						if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
							t = v(n).val();
							if (s) {
								return t
							}
							o.push(t)
						}
					}
					return o
				},
				set: function(e, t) {
					var n = v.makeArray(t);
					return v(e).find("option").each(function() {
						this.selected = v.inArray(v(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attrFn: {},
		attr: function(e, n, r, i) {
			var s, o, u, a = e.nodeType;
			if (!e || a === 3 || a === 8 || a === 2) {
				return
			}
			if (i && v.isFunction(v.fn[n])) {
				return v(e)[n](r)
			}
			if (typeof e.getAttribute == "undefined") {
				return v.prop(e, n, r)
			}
			u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
			if (r !== t) {
				if (r === null) {
					v.removeAttr(e, n);
					return
				}
				return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r)
			}
			return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s)
		},
		removeAttr: function(e, t) {
			var n, r, i, s, o = 0;
			if (t && e.nodeType === 1) {
				r = t.split(y);
				for (; o < r.length; o++) {
					i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
				}
			}
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (U.test(e.nodeName) && e.parentNode) {
						v.error("type property can't be changed")
					} else {
						if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
							var n = e.value;
							return e.setAttribute("type", t), n && (e.value = n), t
						}
					}
				}
			},
			value: {
				get: function(e, t) {
					return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
				},
				set: function(e, t, n) {
					if (j && v.nodeName(e, "button")) {
						return j.set(e, t, n)
					}
					e.value = t
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(e, n, r) {
			var i, s, o, u = e.nodeType;
			if (!e || u === 3 || u === 8 || u === 2) {
				return
			}
			return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), F = {
		get: function(e, n) {
			var r, i = v.prop(e, n);
			return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
		},
		set: function(e, t, n) {
			var r;
			return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
		}
	}, V || (I = {
		name: !0,
		id: !0,
		coords: !0
	}, j = v.valHooks.button = {
		get: function(e, n) {
			var r;
			return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
		},
		set: function(e, t, n) {
			var r = e.getAttributeNode(n);
			return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
		}
	}, v.each(["width", "height"], function(e, t) {
		v.attrHooks[t] = v.extend(v.attrHooks[t], {
			set: function(e, n) {
				if (n === "") {
					return e.setAttribute(t, "auto"), n
				}
			}
		})
	}), v.attrHooks.contenteditable = {
		get: j.get,
		set: function(e, t, n) {
			t === "" && (t = "false"), j.set(e, t, n)
		}
	}), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function(e, n) {
		v.attrHooks[n] = v.extend(v.attrHooks[n], {
			get: function(e) {
				var r = e.getAttribute(n, 2);
				return r === null ? t : r
			}
		})
	}), v.support.style || (v.attrHooks.style = {
		get: function(e) {
			return e.style.cssText.toLowerCase() || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function() {
		v.valHooks[this] = {
			get: function(e) {
				return e.getAttribute("value") === null ? "on" : e.value
			}
		}
	}), v.each(["radio", "checkbox"], function() {
		v.valHooks[this] = v.extend(v.valHooks[this], {
			set: function(e, t) {
				if (v.isArray(t)) {
					return e.checked = v.inArray(v(e).val(), t) >= 0
				}
			}
		})
	});
	var $ = /^(?:textarea|input|select)$/i,
		J = /^([^\.]*|)(?:\.(.+)|)$/,
		K = /(?:^|\s)hover(\.\S+|)\b/,
		Q = /^key/,
		G = /^(?:mouse|contextmenu)|click/,
		Y = /^(?:focusinfocus|focusoutblur)$/,
		Z = function(e) {
			return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
		};
	v.event = {
			add: function(e, n, r, i, s) {
				var o, u, a, f, l, c, h, p, d, m, g;
				if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) {
					return
				}
				r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function(e) {
					return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
				}, u.elem = e), n = v.trim(Z(n)).split(" ");
				for (f = 0; f < n.length; f++) {
					l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
						type: c,
						origType: l[1],
						data: i,
						handler: r,
						guid: r.guid,
						selector: s,
						needsContext: s && v.expr.match.needsContext.test(s),
						namespace: h.join(".")
					}, d), m = a[c];
					if (!m) {
						m = a[c] = [], m.delegateCount = 0;
						if (!g.setup || g.setup.call(e, i, h, u) === !1) {
							e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
						}
					}
					g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0
				}
				e = null
			},
			global: {},
			remove: function(e, t, n, r, i) {
				var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
				if (!g || !(h = g.events)) {
					return
				}
				t = v.trim(Z(t || "")).split(" ");
				for (s = 0; s < t.length; s++) {
					o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
					if (!u) {
						for (u in h) {
							v.event.remove(e, u + t[s], n, r, !0)
						}
						continue
					}
					p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
					for (c = 0; c < d.length; c++) {
						m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m))
					}
					d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
				}
				v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
			},
			customEvent: {
				getData: !0,
				setData: !0,
				changeData: !0
			},
			trigger: function(n, r, s, o) {
				if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
					var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
						b = [];
					if (Y.test(y + v.event.triggered)) {
						return
					}
					y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
					if ((!s || v.event.customEvent[y]) && !v.event.global[y]) {
						return
					}
					n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
					if (!s) {
						u = v.cache;
						for (f in u) {
							u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0)
						}
						return
					}
					n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
					if (p.trigger && p.trigger.apply(s, r) === !1) {
						return
					}
					m = [
						[s, p.bindType || y]
					];
					if (!o && !p.noBubble && !v.isWindow(s)) {
						g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
						for (c = s; l; l = l.parentNode) {
							m.push([l, g]), c = l
						}
						c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
					}
					for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
						l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault()
					}
					return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
				}
				return
			},
			dispatch: function(n) {
				n = v.event.fix(n || e.event);
				var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
					m = d.delegateCount,
					g = l.call(arguments),
					y = !n.exclusive && !n.namespace,
					b = v.event.special[n.type] || {},
					w = [];
				g[0] = n, n.delegateTarget = this;
				if (b.preDispatch && b.preDispatch.call(this, n) === !1) {
					return
				}
				if (m && (!n.button || n.type !== "click")) {
					for (s = n.target; s != this; s = s.parentNode || this) {
						if (s.disabled !== !0 || n.type !== "click") {
							u = {}, f = [];
							for (r = 0; r < m; r++) {
								c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c)
							}
							f.length && w.push({
								elem: s,
								matches: f
							})
						}
					}
				}
				d.length > m && w.push({
					elem: this,
					matches: d.slice(m)
				});
				for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
					a = w[r], n.currentTarget = a.elem;
					for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
						c = a.matches[i];
						if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) {
							n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
						}
					}
				}
				return b.postDispatch && b.postDispatch.call(this, n), n.result
			},
			props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(e, t) {
					return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(e, n) {
					var r, s, o, u = n.button,
						a = n.fromElement;
					return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
				}
			},
			fix: function(e) {
				if (e[v.expando]) {
					return e
				}
				var t, n, r = e,
					s = v.event.fixHooks[e.type] || {},
					o = s.props ? this.props.concat(s.props) : this.props;
				e = v.Event(r);
				for (t = o.length; t;) {
					n = o[--t], e[n] = r[n]
				}
				return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					delegateType: "focusin"
				},
				blur: {
					delegateType: "focusout"
				},
				beforeunload: {
					setup: function(e, t, n) {
						v.isWindow(this) && (this.onbeforeunload = n)
					},
					teardown: function(e, t) {
						this.onbeforeunload === t && (this.onbeforeunload = null)
					}
				}
			},
			simulate: function(e, t, n, r) {
				var i = v.extend(new v.Event, n, {
					type: e,
					isSimulated: !0,
					originalEvent: {}
				});
				r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
			}
		}, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function(e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n, !1)
		} : function(e, t, n) {
			var r = "on" + t;
			e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
		}, v.Event = function(e, t) {
			if (!(this instanceof v.Event)) {
				return new v.Event(e, t)
			}
			e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0
		}, v.Event.prototype = {
			preventDefault: function() {
				this.isDefaultPrevented = tt;
				var e = this.originalEvent;
				if (!e) {
					return
				}
				e.preventDefault ? e.preventDefault() : e.returnValue = !1
			},
			stopPropagation: function() {
				this.isPropagationStopped = tt;
				var e = this.originalEvent;
				if (!e) {
					return
				}
				e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = tt, this.stopPropagation()
			},
			isDefaultPrevented: et,
			isPropagationStopped: et,
			isImmediatePropagationStopped: et
		}, v.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(e, t) {
			v.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function(e) {
					var n, r = this,
						i = e.relatedTarget,
						s = e.handleObj,
						o = s.selector;
					if (!i || i !== r && !v.contains(r, i)) {
						e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t
					}
					return n
				}
			}
		}), v.support.submitBubbles || (v.event.special.submit = {
			setup: function() {
				if (v.nodeName(this, "form")) {
					return !1
				}
				v.event.add(this, "click._submit keypress._submit", function(e) {
					var n = e.target,
						r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
					r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function(e) {
						e._submit_bubble = !0
					}), v._data(r, "_submit_attached", !0))
				})
			},
			postDispatch: function(e) {
				e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
			},
			teardown: function() {
				if (v.nodeName(this, "form")) {
					return !1
				}
				v.event.remove(this, "._submit")
			}
		}), v.support.changeBubbles || (v.event.special.change = {
			setup: function() {
				if ($.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") {
						v.event.add(this, "propertychange._change", function(e) {
							e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
						}), v.event.add(this, "click._change", function(e) {
							this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
						})
					}
					return !1
				}
				v.event.add(this, "beforeactivate._change", function(e) {
					var t = e.target;
					$.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function(e) {
						this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
					}), v._data(t, "_change_attached", !0))
				})
			},
			handle: function(e) {
				var t = e.target;
				if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") {
					return e.handleObj.handler.apply(this, arguments)
				}
			},
			teardown: function() {
				return v.event.remove(this, "._change"), !$.test(this.nodeName)
			}
		}), v.support.focusinBubbles || v.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			var n = 0,
				r = function(e) {
					v.event.simulate(t, e.target, v.event.fix(e), !0)
				};
			v.event.special[t] = {
				setup: function() {
					n++ === 0 && i.addEventListener(e, r, !0)
				},
				teardown: function() {
					--n === 0 && i.removeEventListener(e, r, !0)
				}
			}
		}), v.fn.extend({
			on: function(e, n, r, i, s) {
				var o, u;
				if (typeof e == "object") {
					typeof n != "string" && (r = r || n, n = t);
					for (u in e) {
						this.on(u, n, r, e[u], s)
					}
					return this
				}
				r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
				if (i === !1) {
					i = et
				} else {
					if (!i) {
						return this
					}
				}
				return s === 1 && (o = i, i = function(e) {
					return v().off(e), o.apply(this, arguments)
				}, i.guid = o.guid || (o.guid = v.guid++)), this.each(function() {
					v.event.add(this, e, i, r, n)
				})
			},
			one: function(e, t, n, r) {
				return this.on(e, t, n, r, 1)
			},
			off: function(e, n, r) {
				var i, s;
				if (e && e.preventDefault && e.handleObj) {
					return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
				}
				if (typeof e == "object") {
					for (s in e) {
						this.off(s, n, e[s])
					}
					return this
				}
				if (n === !1 || typeof n == "function") {
					r = n, n = t
				}
				return r === !1 && (r = et), this.each(function() {
					v.event.remove(this, e, r, n)
				})
			},
			bind: function(e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function(e, t) {
				return this.off(e, null, t)
			},
			live: function(e, t, n) {
				return v(this.context).on(e, this.selector, t, n), this
			},
			die: function(e, t) {
				return v(this.context).off(e, this.selector || "**", t), this
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function(e, t, n) {
				return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
			},
			trigger: function(e, t) {
				return this.each(function() {
					v.event.trigger(e, t, this)
				})
			},
			triggerHandler: function(e, t) {
				if (this[0]) {
					return v.event.trigger(e, t, this[0], !0)
				}
			},
			toggle: function(e) {
				var t = arguments,
					n = e.guid || v.guid++,
					r = 0,
					i = function(n) {
						var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
						return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
					};
				i.guid = n;
				while (r < t.length) {
					t[r++].guid = n
				}
				return this.click(i)
			},
			hover: function(e, t) {
				return this.mouseenter(e).mouseleave(t || e)
			}
		}), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
			v.fn[t] = function(e, n) {
				return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
			}, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
		}),
		function(e, t) {
			function nt(e, t, n, r) {
				n = n || [], t = t || g;
				var i, s, a, f, l = t.nodeType;
				if (!e || typeof e != "string") {
					return n
				}
				if (l !== 1 && l !== 9) {
					return []
				}
				a = o(t);
				if (!a && !r) {
					if (i = R.exec(e)) {
						if (f = i[1]) {
							if (l === 9) {
								s = t.getElementById(f);
								if (!s || !s.parentNode) {
									return n
								}
								if (s.id === f) {
									return n.push(s), n
								}
							} else {
								if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) {
									return n.push(s), n
								}
							}
						} else {
							if (i[2]) {
								return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n
							}
							if ((f = i[3]) && Z && t.getElementsByClassName) {
								return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
							}
						}
					}
				}
				return vt(e.replace(j, "$1"), t, n, r, a)
			}

			function rt(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return n === "input" && t.type === e
				}
			}

			function it(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return (n === "input" || n === "button") && t.type === e
				}
			}

			function st(e) {
				return N(function(t) {
					return t = +t, N(function(n, r) {
						var i, s = e([], n.length, t),
							o = s.length;
						while (o--) {
							n[i = s[o]] && (n[i] = !(r[i] = n[i]))
						}
					})
				})
			}

			function ot(e, t, n) {
				if (e === t) {
					return n
				}
				var r = e.nextSibling;
				while (r) {
					if (r === t) {
						return -1
					}
					r = r.nextSibling
				}
				return 1
			}

			function ut(e, t) {
				var n, r, s, o, u, a, f, l = L[d][e + " "];
				if (l) {
					return t ? 0 : l.slice(0)
				}
				u = e, a = [], f = i.preFilter;
				while (u) {
					if (!n || (r = F.exec(u))) {
						r && (u = u.slice(r[0].length) || u), a.push(s = [])
					}
					n = !1;
					if (r = I.exec(u)) {
						s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ")
					}
					for (o in i.filter) {
						(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r)
					}
					if (!n) {
						break
					}
				}
				return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
			}

			function at(e, t, r) {
				var i = t.dir,
					s = r && t.dir === "parentNode",
					o = w++;
				return t.first ? function(t, n, r) {
					while (t = t[i]) {
						if (s || t.nodeType === 1) {
							return e(t, n, r)
						}
					}
				} : function(t, r, u) {
					if (!u) {
						var a, f = b + " " + o + " ",
							l = f + n;
						while (t = t[i]) {
							if (s || t.nodeType === 1) {
								if ((a = t[d]) === l) {
									return t.sizset
								}
								if (typeof a == "string" && a.indexOf(f) === 0) {
									if (t.sizset) {
										return t
									}
								} else {
									t[d] = l;
									if (e(t, r, u)) {
										return t.sizset = !0, t
									}
									t.sizset = !1
								}
							}
						}
					} else {
						while (t = t[i]) {
							if (s || t.nodeType === 1) {
								if (e(t, r, u)) {
									return t
								}
							}
						}
					}
				}
			}

			function ft(e) {
				return e.length > 1 ? function(t, n, r) {
					var i = e.length;
					while (i--) {
						if (!e[i](t, n, r)) {
							return !1
						}
					}
					return !0
				} : e[0]
			}

			function lt(e, t, n, r, i) {
				var s, o = [],
					u = 0,
					a = e.length,
					f = t != null;
				for (; u < a; u++) {
					if (s = e[u]) {
						if (!n || n(s, r, i)) {
							o.push(s), f && t.push(u)
						}
					}
				}
				return o
			}

			function ct(e, t, n, r, i, s) {
				return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function(s, o, u, a) {
					var f, l, c, h = [],
						p = [],
						d = o.length,
						v = s || dt(t || "*", u.nodeType ? [u] : u, []),
						m = e && (s || !t) ? lt(v, h, e, u, a) : v,
						g = n ? i || (s ? e : d || r) ? [] : o : m;
					n && n(m, g, u, a);
					if (r) {
						f = lt(g, p), r(f, [], u, a), l = f.length;
						while (l--) {
							if (c = f[l]) {
								g[p[l]] = !(m[p[l]] = c)
							}
						}
					}
					if (s) {
						if (i || e) {
							if (i) {
								f = [], l = g.length;
								while (l--) {
									(c = g[l]) && f.push(m[l] = c)
								}
								i(null, g = [], f, a)
							}
							l = g.length;
							while (l--) {
								(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
							}
						}
					} else {
						g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
					}
				})
			}

			function ht(e) {
				var t, n, r, s = e.length,
					o = i.relative[e[0].type],
					u = o || i.relative[" "],
					a = o ? 1 : 0,
					f = at(function(e) {
						return e === t
					}, u, !0),
					l = at(function(e) {
						return T.call(t, e) > -1
					}, u, !0),
					h = [function(e, n, r) {
						return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
					}];
				for (; a < s; a++) {
					if (n = i.relative[e[a].type]) {
						h = [at(ft(h), n)]
					} else {
						n = i.filter[e[a].type].apply(null, e[a].matches);
						if (n[d]) {
							r = ++a;
							for (; r < s; r++) {
								if (i.relative[e[r].type]) {
									break
								}
							}
							return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
						}
						h.push(n)
					}
				}
				return ft(h)
			}

			function pt(e, t) {
				var r = t.length > 0,
					s = e.length > 0,
					o = function(u, a, f, l, h) {
						var p, d, v, m = [],
							y = 0,
							w = "0",
							x = u && [],
							T = h != null,
							N = c,
							C = u || s && i.find.TAG("*", h && a.parentNode || a),
							k = b += N == null ? 1 : Math.E;
						T && (c = a !== g && a, n = o.el);
						for (;
							(p = C[w]) != null; w++) {
							if (s && p) {
								for (d = 0; v = e[d]; d++) {
									if (v(p, a, f)) {
										l.push(p);
										break
									}
								}
								T && (b = k, n = ++o.el)
							}
							r && ((p = !v && p) && y--, u && x.push(p))
						}
						y += w;
						if (r && w !== y) {
							for (d = 0; v = t[d]; d++) {
								v(x, m, a, f)
							}
							if (u) {
								if (y > 0) {
									while (w--) {
										!x[w] && !m[w] && (m[w] = E.call(l))
									}
								}
								m = lt(m)
							}
							S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
						}
						return T && (b = k, c = N), x
					};
				return o.el = 0, r ? N(o) : o
			}

			function dt(e, t, n) {
				var r = 0,
					i = t.length;
				for (; r < i; r++) {
					nt(e, t[r], n)
				}
				return n
			}

			function vt(e, t, n, r, s) {
				var o, u, f, l, c, h = ut(e),
					p = h.length;
				if (!r && h.length === 1) {
					u = h[0] = h[0].slice(0);
					if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
						t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
						if (!t) {
							return n
						}
						e = e.slice(u.shift().length)
					}
					for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
						f = u[o];
						if (i.relative[l = f.type]) {
							break
						}
						if (c = i.find[l]) {
							if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
								u.splice(o, 1), e = r.length && u.join("");
								if (!e) {
									return S.apply(n, x.call(r, 0)), n
								}
								break
							}
						}
					}
				}
				return a(e, h)(r, t, s, n, z.test(e)), n
			}

			function mt() {}
			var n, r, i, s, o, u, a, f, l, c, h = !0,
				p = "undefined",
				d = ("sizcache" + Math.random()).replace(".", ""),
				m = String,
				g = e.document,
				y = g.documentElement,
				b = 0,
				w = 0,
				E = [].pop,
				S = [].push,
				x = [].slice,
				T = [].indexOf || function(e) {
					var t = 0,
						n = this.length;
					for (; t < n; t++) {
						if (this[t] === e) {
							return t
						}
					}
					return -1
				},
				N = function(e, t) {
					return e[d] = t == null || t, e
				},
				C = function() {
					var e = {},
						t = [];
					return N(function(n, r) {
						return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r
					}, e)
				},
				k = C(),
				L = C(),
				A = C(),
				O = "[\\x20\\t\\r\\n\\f]",
				M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
				_ = M.replace("w", "w#"),
				D = "([*^$|!~]?=)",
				P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
				H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
				B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
				j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
				F = new RegExp("^" + O + "*," + O + "*"),
				I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
				q = new RegExp(H),
				R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
				U = /^:not/,
				z = /[\x20\t\r\n\f]*[+~]/,
				W = /:not\($/,
				X = /h\d/i,
				V = /input|select|textarea|button/i,
				$ = /\\(?!\\)/g,
				J = {
					ID: new RegExp("^#(" + M + ")"),
					CLASS: new RegExp("^\\.(" + M + ")"),
					NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
					TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
					ATTR: new RegExp("^" + P),
					PSEUDO: new RegExp("^" + H),
					POS: new RegExp(B, "i"),
					CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
					needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
				},
				K = function(e) {
					var t = g.createElement("div");
					try {
						return e(t)
					} catch (n) {
						return !1
					} finally {
						t = null
					}
				},
				Q = K(function(e) {
					return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
				}),
				G = K(function(e) {
					return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
				}),
				Y = K(function(e) {
					e.innerHTML = "<select></select>";
					var t = typeof e.lastChild.getAttribute("multiple");
					return t !== "boolean" && t !== "string"
				}),
				Z = K(function(e) {
					return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
				}),
				et = K(function(e) {
					e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
					var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
					return r = !g.getElementById(d), y.removeChild(e), t
				});
			try {
				x.call(y.childNodes, 0)[0].nodeType
			} catch (tt) {
				x = function(e) {
					var t, n = [];
					for (; t = this[e]; e++) {
						n.push(t)
					}
					return n
				}
			}
			nt.matches = function(e, t) {
				return nt(e, null, null, t)
			}, nt.matchesSelector = function(e, t) {
				return nt(t, null, null, [e]).length > 0
			}, s = nt.getText = function(e) {
				var t, n = "",
					r = 0,
					i = e.nodeType;
				if (i) {
					if (i === 1 || i === 9 || i === 11) {
						if (typeof e.textContent == "string") {
							return e.textContent
						}
						for (e = e.firstChild; e; e = e.nextSibling) {
							n += s(e)
						}
					} else {
						if (i === 3 || i === 4) {
							return e.nodeValue
						}
					}
				} else {
					for (; t = e[r]; r++) {
						n += s(t)
					}
				}
				return n
			}, o = nt.isXML = function(e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return t ? t.nodeName !== "HTML" : !1
			}, u = nt.contains = y.contains ? function(e, t) {
				var n = e.nodeType === 9 ? e.documentElement : e,
					r = t && t.parentNode;
				return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
			} : y.compareDocumentPosition ? function(e, t) {
				return t && !!(e.compareDocumentPosition(t) & 16)
			} : function(e, t) {
				while (t = t.parentNode) {
					if (t === e) {
						return !0
					}
				}
				return !1
			}, nt.attr = function(e, t) {
				var n, r = o(e);
				return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
			}, i = nt.selectors = {
				cacheLength: 50,
				createPseudo: N,
				match: J,
				attrHandle: G ? {} : {
					href: function(e) {
						return e.getAttribute("href", 2)
					},
					type: function(e) {
						return e.getAttribute("type")
					}
				},
				find: {
					ID: r ? function(e, t, n) {
						if (typeof t.getElementById !== p && !n) {
							var r = t.getElementById(e);
							return r && r.parentNode ? [r] : []
						}
					} : function(e, n, r) {
						if (typeof n.getElementById !== p && !r) {
							var i = n.getElementById(e);
							return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
						}
					},
					TAG: Q ? function(e, t) {
						if (typeof t.getElementsByTagName !== p) {
							return t.getElementsByTagName(e)
						}
					} : function(e, t) {
						var n = t.getElementsByTagName(e);
						if (e === "*") {
							var r, i = [],
								s = 0;
							for (; r = n[s]; s++) {
								r.nodeType === 1 && i.push(r)
							}
							return i
						}
						return n
					},
					NAME: et && function(e, t) {
						if (typeof t.getElementsByName !== p) {
							return t.getElementsByName(name)
						}
					},
					CLASS: Z && function(e, t, n) {
						if (typeof t.getElementsByClassName !== p && !n) {
							return t.getElementsByClassName(e)
						}
					}
				},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n;
						if (J.CHILD.test(e[0])) {
							return null
						}
						if (e[3]) {
							e[2] = e[3]
						} else {
							if (t = e[4]) {
								q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t
							}
						}
						return e.slice(0, 3)
					}
				},
				filter: {
					ID: r ? function(e) {
						return e = e.replace($, ""),
							function(t) {
								return t.getAttribute("id") === e
							}
					} : function(e) {
						return e = e.replace($, ""),
							function(t) {
								var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
								return n && n.value === e
							}
					},
					TAG: function(e) {
						return e === "*" ? function() {
							return !0
						} : (e = e.replace($, "").toLowerCase(), function(t) {
							return t.nodeName && t.nodeName.toLowerCase() === e
						})
					},
					CLASS: function(e) {
						var t = k[d][e + " "];
						return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function(e) {
							return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
						})
					},
					ATTR: function(e, t, n) {
						return function(r, i) {
							var s = nt.attr(r, e);
							return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
						}
					},
					CHILD: function(e, t, n, r) {
						return e === "nth" ? function(e) {
							var t, i, s = e.parentNode;
							if (n === 1 && r === 0) {
								return !0
							}
							if (s) {
								i = 0;
								for (t = s.firstChild; t; t = t.nextSibling) {
									if (t.nodeType === 1) {
										i++;
										if (e === t) {
											break
										}
									}
								}
							}
							return i -= r, i === n || i % n === 0 && i / n >= 0
						} : function(t) {
							var n = t;
							switch (e) {
								case "only":
								case "first":
									while (n = n.previousSibling) {
										if (n.nodeType === 1) {
											return !1
										}
									}
									if (e === "first") {
										return !0
									}
									n = t;
								case "last":
									while (n = n.nextSibling) {
										if (n.nodeType === 1) {
											return !1
										}
									}
									return !0
							}
						}
					},
					PSEUDO: function(e, t) {
						var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
						return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
							var i, s = r(e, t),
								o = s.length;
							while (o--) {
								i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
							}
						}) : function(e) {
							return r(e, 0, n)
						}) : r
					}
				},
				pseudos: {
					not: N(function(e) {
						var t = [],
							n = [],
							r = a(e.replace(j, "$1"));
						return r[d] ? N(function(e, t, n, i) {
							var s, o = r(e, null, i, []),
								u = e.length;
							while (u--) {
								if (s = o[u]) {
									e[u] = !(t[u] = s)
								}
							}
						}) : function(e, i, s) {
							return t[0] = e, r(t, null, s, n), !n.pop()
						}
					}),
					has: N(function(e) {
						return function(t) {
							return nt(e, t).length > 0
						}
					}),
					contains: N(function(e) {
						return function(t) {
							return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
						}
					}),
					enabled: function(e) {
						return e.disabled === !1
					},
					disabled: function(e) {
						return e.disabled === !0
					},
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return t === "input" && !!e.checked || t === "option" && !!e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					parent: function(e) {
						return !i.pseudos.empty(e)
					},
					empty: function(e) {
						var t;
						e = e.firstChild;
						while (e) {
							if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) {
								return !1
							}
							e = e.nextSibling
						}
						return !0
					},
					header: function(e) {
						return X.test(e.nodeName)
					},
					text: function(e) {
						var t, n;
						return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
					},
					radio: rt("radio"),
					checkbox: rt("checkbox"),
					file: rt("file"),
					password: rt("password"),
					image: rt("image"),
					submit: it("submit"),
					reset: it("reset"),
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return t === "input" && e.type === "button" || t === "button"
					},
					input: function(e) {
						return V.test(e.nodeName)
					},
					focus: function(e) {
						var t = e.ownerDocument;
						return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
					},
					active: function(e) {
						return e === e.ownerDocument.activeElement
					},
					first: st(function() {
						return [0]
					}),
					last: st(function(e, t) {
						return [t - 1]
					}),
					eq: st(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: st(function(e, t) {
						for (var n = 0; n < t; n += 2) {
							e.push(n)
						}
						return e
					}),
					odd: st(function(e, t) {
						for (var n = 1; n < t; n += 2) {
							e.push(n)
						}
						return e
					}),
					lt: st(function(e, t, n) {
						for (var r = n < 0 ? n + t : n; --r >= 0;) {
							e.push(r)
						}
						return e
					}),
					gt: st(function(e, t, n) {
						for (var r = n < 0 ? n + t : n; ++r < t;) {
							e.push(r)
						}
						return e
					})
				}
			}, f = y.compareDocumentPosition ? function(e, t) {
				return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
			} : function(e, t) {
				if (e === t) {
					return l = !0, 0
				}
				if (e.sourceIndex && t.sourceIndex) {
					return e.sourceIndex - t.sourceIndex
				}
				var n, r, i = [],
					s = [],
					o = e.parentNode,
					u = t.parentNode,
					a = o;
				if (o === u) {
					return ot(e, t)
				}
				if (!o) {
					return -1
				}
				if (!u) {
					return 1
				}
				while (a) {
					i.unshift(a), a = a.parentNode
				}
				a = u;
				while (a) {
					s.unshift(a), a = a.parentNode
				}
				n = i.length, r = s.length;
				for (var f = 0; f < n && f < r; f++) {
					if (i[f] !== s[f]) {
						return ot(i[f], s[f])
					}
				}
				return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
			}, [0, 0].sort(f), h = !l, nt.uniqueSort = function(e) {
				var t, n = [],
					r = 1,
					i = 0;
				l = h, e.sort(f);
				if (l) {
					for (; t = e[r]; r++) {
						t === e[r - 1] && (i = n.push(r))
					}
					while (i--) {
						e.splice(n[i], 1)
					}
				}
				return e
			}, nt.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, a = nt.compile = function(e, t) {
				var n, r = [],
					i = [],
					s = A[d][e + " "];
				if (!s) {
					t || (t = ut(e)), n = t.length;
					while (n--) {
						s = ht(t[n]), s[d] ? r.push(s) : i.push(s)
					}
					s = A(e, pt(i, r))
				}
				return s
			}, g.querySelectorAll && function() {
				var e, t = vt,
					n = /'|\\/g,
					r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
					i = [":focus"],
					s = [":active"],
					u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
				K(function(e) {
					e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
				}), K(function(e) {
					e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
				}), i = new RegExp(i.join("|")), vt = function(e, r, s, o, u) {
					if (!o && !u && !i.test(e)) {
						var a, f, l = !0,
							c = d,
							h = r,
							p = r.nodeType === 9 && e;
						if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
							a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
							while (f--) {
								a[f] = c + a[f].join("")
							}
							h = z.test(e) && r.parentNode || r, p = a.join(",")
						}
						if (p) {
							try {
								return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
							} catch (v) {} finally {
								l || r.removeAttribute("id")
							}
						}
					}
					return t(e, r, s, o, u)
				}, u && (K(function(t) {
					e = u.call(t, "div");
					try {
						u.call(t, "[test!='']:sizzle"), s.push("!=", H)
					} catch (n) {}
				}), s = new RegExp(s.join("|")), nt.matchesSelector = function(t, n) {
					n = n.replace(r, "='$1']");
					if (!o(t) && !s.test(n) && !i.test(n)) {
						try {
							var a = u.call(t, n);
							if (a || e || t.document && t.document.nodeType !== 11) {
								return a
							}
						} catch (f) {}
					}
					return nt(n, null, null, [t]).length > 0
				})
			}(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
		}(e);
	var nt = /Until$/,
		rt = /^(?:parents|prev(?:Until|All))/,
		it = /^.[^:#\[\.,]*$/,
		st = v.expr.match.needsContext,
		ot = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	v.fn.extend({
		find: function(e) {
			var t, n, r, i, s, o, u = this;
			if (typeof e != "string") {
				return v(e).filter(function() {
					for (t = 0, n = u.length; t < n; t++) {
						if (v.contains(u[t], this)) {
							return !0
						}
					}
				})
			}
			o = this.pushStack("", "find", e);
			for (t = 0, n = this.length; t < n; t++) {
				r = o.length, v.find(e, this[t], o);
				if (t > 0) {
					for (i = r; i < o.length; i++) {
						for (s = 0; s < r; s++) {
							if (o[s] === o[i]) {
								o.splice(i--, 1);
								break
							}
						}
					}
				}
			}
			return o
		},
		has: function(e) {
			var t, n = v(e, this),
				r = n.length;
			return this.filter(function() {
				for (t = 0; t < r; t++) {
					if (v.contains(this, n[t])) {
						return !0
					}
				}
			})
		},
		not: function(e) {
			return this.pushStack(ft(this, e, !1), "not", e)
		},
		filter: function(e) {
			return this.pushStack(ft(this, e, !0), "filter", e)
		},
		is: function(e) {
			return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function(e, t) {
			var n, r = 0,
				i = this.length,
				s = [],
				o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
			for (; r < i; r++) {
				n = this[r];
				while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
					if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
						s.push(n);
						break
					}
					n = n.parentNode
				}
			}
			return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
		},
		index: function(e) {
			return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add: function(e, t) {
			var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
				r = v.merge(this.get(), n);
			return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
		},
		addBack: function(e) {
			return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
		}
	}), v.fn.andSelf = v.fn.addBack, v.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && t.nodeType !== 11 ? t : null
		},
		parents: function(e) {
			return v.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return v.dir(e, "parentNode", n)
		},
		next: function(e) {
			return at(e, "nextSibling")
		},
		prev: function(e) {
			return at(e, "previousSibling")
		},
		nextAll: function(e) {
			return v.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return v.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return v.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return v.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return v.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return v.sibling(e.firstChild)
		},
		contents: function(e) {
			return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
		}
	}, function(e, t) {
		v.fn[e] = function(n, r) {
			var i = v.map(this, t, n);
			return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
		}
	}), v.extend({
		filter: function(e, t, n) {
			return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
		},
		dir: function(e, n, r) {
			var i = [],
				s = e[n];
			while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
				s.nodeType === 1 && i.push(s), s = s[n]
			}
			return i
		},
		sibling: function(e, t) {
			var n = [];
			for (; e; e = e.nextSibling) {
				e.nodeType === 1 && e !== t && n.push(e)
			}
			return n
		}
	});
	var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		ht = / jQuery\d+="(?:null|\d+)"/g,
		pt = /^\s+/,
		dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		vt = /<([\w:]+)/,
		mt = /<tbody/i,
		gt = /<|&#?\w+;/,
		yt = /<(?:script|style|link)/i,
		bt = /<(?:script|object|embed|option|style)/i,
		wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
		Et = /^(?:checkbox|radio)$/,
		St = /checked\s*(?:[^=]|=\s*.checked.)/i,
		xt = /\/(java|ecma)script/i,
		Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
		Nt = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		Ct = lt(i),
		kt = Ct.appendChild(i.createElement("div"));
	Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
			text: function(e) {
				return v.access(this, function(e) {
					return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
				}, null, e, arguments.length)
			},
			wrapAll: function(e) {
				if (v.isFunction(e)) {
					return this.each(function(t) {
						v(this).wrapAll(e.call(this, t))
					})
				}
				if (this[0]) {
					var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
					this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
						var e = this;
						while (e.firstChild && e.firstChild.nodeType === 1) {
							e = e.firstChild
						}
						return e
					}).append(this)
				}
				return this
			},
			wrapInner: function(e) {
				return v.isFunction(e) ? this.each(function(t) {
					v(this).wrapInner(e.call(this, t))
				}) : this.each(function() {
					var t = v(this),
						n = t.contents();
					n.length ? n.wrapAll(e) : t.append(e)
				})
			},
			wrap: function(e) {
				var t = v.isFunction(e);
				return this.each(function(n) {
					v(this).wrapAll(t ? e.call(this, n) : e)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
				}).end()
			},
			append: function() {
				return this.domManip(arguments, !0, function(e) {
					(this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
				})
			},
			prepend: function() {
				return this.domManip(arguments, !0, function(e) {
					(this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
				})
			},
			before: function() {
				if (!ut(this[0])) {
					return this.domManip(arguments, !1, function(e) {
						this.parentNode.insertBefore(e, this)
					})
				}
				if (arguments.length) {
					var e = v.clean(arguments);
					return this.pushStack(v.merge(e, this), "before", this.selector)
				}
			},
			after: function() {
				if (!ut(this[0])) {
					return this.domManip(arguments, !1, function(e) {
						this.parentNode.insertBefore(e, this.nextSibling)
					})
				}
				if (arguments.length) {
					var e = v.clean(arguments);
					return this.pushStack(v.merge(this, e), "after", this.selector)
				}
			},
			remove: function(e, t) {
				var n, r = 0;
				for (;
					(n = this[r]) != null; r++) {
					if (!e || v.filter(e, [n]).length) {
						!t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n)
					}
				}
				return this
			},
			empty: function() {
				var e, t = 0;
				for (;
					(e = this[t]) != null; t++) {
					e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
					while (e.firstChild) {
						e.removeChild(e.firstChild)
					}
				}
				return this
			},
			clone: function(e, t) {
				return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
					return v.clone(this, e, t)
				})
			},
			html: function(e) {
				return v.access(this, function(e) {
					var n = this[0] || {},
						r = 0,
						i = this.length;
					if (e === t) {
						return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t
					}
					if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
						e = e.replace(dt, "<$1></$2>");
						try {
							for (; r < i; r++) {
								n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e)
							}
							n = 0
						} catch (s) {}
					}
					n && this.empty().append(e)
				}, null, e, arguments.length)
			},
			replaceWith: function(e) {
				return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function(t) {
					var n = v(this),
						r = n.html();
					n.replaceWith(e.call(this, t, r))
				}) : (typeof e != "string" && (e = v(e).detach()), this.each(function() {
					var t = this.nextSibling,
						n = this.parentNode;
					v(this).remove(), t ? v(t).before(e) : v(n).append(e)
				}))
			},
			detach: function(e) {
				return this.remove(e, !0)
			},
			domManip: function(e, n, r) {
				e = [].concat.apply([], e);
				var i, s, o, u, a = 0,
					f = e[0],
					l = [],
					c = this.length;
				if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) {
					return this.each(function() {
						v(this).domManip(e, n, r)
					})
				}
				if (v.isFunction(f)) {
					return this.each(function(i) {
						var s = v(this);
						e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
					})
				}
				if (this[0]) {
					i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
					if (s) {
						n = n && v.nodeName(s, "tr");
						for (u = i.cacheable || c - 1; a < c; a++) {
							r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
						}
					}
					o = s = null, l.length && v.each(l, function(e, t) {
						t.src ? v.ajax ? v.ajax({
							url: t.src,
							type: "GET",
							dataType: "script",
							async: !1,
							global: !1,
							"throws": !0
						}) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
					})
				}
				return this
			}
		}), v.buildFragment = function(e, n, r) {
			var s, o, u, a = e[0];
			return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
				fragment: s,
				cacheable: o
			}
		}, v.fragments = {}, v.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(e, t) {
			v.fn[e] = function(n) {
				var r, i = 0,
					s = [],
					o = v(n),
					u = o.length,
					a = this.length === 1 && this[0].parentNode;
				if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) {
					return o[t](this[0]), this
				}
				for (; i < u; i++) {
					r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r)
				}
				return this.pushStack(s, e, o.selector)
			}
		}), v.extend({
			clone: function(e, t, n) {
				var r, i, s, o;
				v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
				if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
					Ot(e, o), r = Mt(e), i = Mt(o);
					for (s = 0; r[s]; ++s) {
						i[s] && Ot(r[s], i[s])
					}
				}
				if (t) {
					At(e, o);
					if (n) {
						r = Mt(e), i = Mt(o);
						for (s = 0; r[s]; ++s) {
							At(r[s], i[s])
						}
					}
				}
				return r = i = null, o
			},
			clean: function(e, t, n, r) {
				var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
					b = [];
				if (!t || typeof t.createDocumentFragment == "undefined") {
					t = i
				}
				for (s = 0;
					(u = e[s]) != null; s++) {
					typeof u == "number" && (u += "");
					if (!u) {
						continue
					}
					if (typeof u == "string") {
						if (!gt.test(u)) {
							u = t.createTextNode(u)
						} else {
							y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
							while (l--) {
								c = c.lastChild
							}
							if (!v.support.tbody) {
								h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
								for (o = p.length - 1; o >= 0; --o) {
									v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
								}
							}!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
						}
					}
					u.nodeType ? b.push(u) : v.merge(b, u)
				}
				c && (u = c = y = null);
				if (!v.support.appendChecked) {
					for (s = 0;
						(u = b[s]) != null; s++) {
						v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t)
					}
				}
				if (n) {
					m = function(e) {
						if (!e.type || xt.test(e.type)) {
							return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
						}
					};
					for (s = 0;
						(u = b[s]) != null; s++) {
						if (!v.nodeName(u, "script") || !m(u)) {
							n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
						}
					}
				}
				return b
			},
			cleanData: function(e, t) {
				var n, r, i, s, o = 0,
					u = v.expando,
					a = v.cache,
					f = v.support.deleteExpando,
					l = v.event.special;
				for (;
					(i = e[o]) != null; o++) {
					if (t || v.acceptData(i)) {
						r = i[u], n = r && a[r];
						if (n) {
							if (n.events) {
								for (s in n.events) {
									l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle)
								}
							}
							a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
						}
					}
				}
			}
		}),
		function() {
			var e, t;
			v.uaMatch = function(e) {
				e = e.toLowerCase();
				var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
				return {
					browser: t[1] || "",
					version: t[2] || "0"
				}
			}, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function() {
				function e(t, n) {
					return new e.fn.init(t, n)
				}
				v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(r, i) {
					return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
				}, e.fn.init.prototype = e.fn;
				var t = e(i);
				return e
			}
		}();
	var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
		jt = /opacity=([^)]*)/,
		Ft = /^(top|right|bottom|left)$/,
		It = /^(none|table(?!-c[ea]).+)/,
		qt = /^margin/,
		Rt = new RegExp("^(" + m + ")(.*)$", "i"),
		Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
		zt = new RegExp("^([-+])=(" + m + ")", "i"),
		Wt = {
			BODY: "block"
		},
		Xt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Vt = {
			letterSpacing: 0,
			fontWeight: 400
		},
		$t = ["Top", "Right", "Bottom", "Left"],
		Jt = ["Webkit", "O", "Moz", "ms"],
		Kt = v.fn.toggle;
	v.fn.extend({
		css: function(e, n) {
			return v.access(this, function(e, n, r) {
				return r !== t ? v.style(e, n, r) : v.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return Yt(this, !0)
		},
		hide: function() {
			return Yt(this)
		},
		toggle: function(e, t) {
			var n = typeof e == "boolean";
			return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function() {
				(n ? e : Gt(this)) ? v(this).show(): v(this).hide()
			})
		}
	}), v.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = Dt(e, "opacity");
						return n === "" ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": v.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, r, i) {
			if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
				return
			}
			var s, o, u, a = v.camelCase(n),
				f = e.style;
			n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
			if (r === t) {
				return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n]
			}
			o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
			if (r == null || o === "number" && isNaN(r)) {
				return
			}
			o === "number" && !v.cssNumber[a] && (r += "px");
			if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) {
				try {
					f[n] = r
				} catch (l) {}
			}
		},
		css: function(e, n, r, i) {
			var s, o, u, a = v.camelCase(n);
			return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
		},
		swap: function(e, t, n) {
			var r, i, s = {};
			for (i in t) {
				s[i] = e.style[i], e.style[i] = t[i]
			}
			r = n.call(e);
			for (i in t) {
				e.style[i] = s[i]
			}
			return r
		}
	}), e.getComputedStyle ? Dt = function(t, n) {
		var r, i, s, o, u = e.getComputedStyle(t, null),
			a = t.style;
		return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
	} : i.documentElement.currentStyle && (Dt = function(e, t) {
		var n, r, i = e.currentStyle && e.currentStyle[t],
			s = e.style;
		return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i
	}), v.each(["height", "width"], function(e, t) {
		v.cssHooks[t] = {
			get: function(e, n, r) {
				if (n) {
					return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function() {
						return tn(e, t, r)
					}) : tn(e, t, r)
				}
			},
			set: function(e, n, r) {
				return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
			}
		}
	}), v.support.opacity || (v.cssHooks.opacity = {
		get: function(e, t) {
			return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
				s = r && r.filter || n.filter || "";
			n.zoom = 1;
			if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
				n.removeAttribute("filter");
				if (r && !r.filter) {
					return
				}
			}
			n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
		}
	}), v(function() {
		v.support.reliableMarginRight || (v.cssHooks.marginRight = {
			get: function(e, t) {
				return v.swap(e, {
					display: "inline-block"
				}, function() {
					if (t) {
						return Dt(e, "marginRight")
					}
				})
			}
		}), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function(e, t) {
			v.cssHooks[t] = {
				get: function(e, n) {
					if (n) {
						var r = Dt(e, t);
						return Ut.test(r) ? v(e).position()[t] + "px" : r
					}
				}
			}
		})
	}), v.expr && v.expr.filters && (v.expr.filters.hidden = function(e) {
		return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
	}, v.expr.filters.visible = function(e) {
		return !v.expr.filters.hidden(e)
	}), v.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		v.cssHooks[e + t] = {
			expand: function(n) {
				var r, i = typeof n == "string" ? n.split(" ") : [n],
					s = {};
				for (r = 0; r < 4; r++) {
					s[e + $t[r] + t] = i[r] || i[r - 2] || i[0]
				}
				return s
			}
		}, qt.test(e) || (v.cssHooks[e + t].set = Zt)
	});
	var rn = / /g,
		sn = /\[\]$/,
		on = /\r?\n/g,
		un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		an = /^(?:select|textarea)/i;
	v.fn.extend({
		serialize: function() {
			return v.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? v.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
			}).map(function(e, t) {
				var n = v(this).val();
				return n == null ? null : v.isArray(n) ? v.map(n, function(e, n) {
					return {
						name: t.name,
						value: e.replace(on, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(on, "\r\n")
				}
			}).get()
		}
	}), v.param = function(e, n) {
		var r, i = [],
			s = function(e, t) {
				t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
		if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) {
			v.each(e, function() {
				s(this.name, this.value)
			})
		} else {
			for (r in e) {
				fn(r, e[r], n, s)
			}
		}
		return i.join("&").replace(rn, "+")
	};
	var ln, cn, hn = /#.*$/,
		pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		vn = /^(?:GET|HEAD)$/,
		mn = /^\/\//,
		gn = /\?/,
		yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		bn = /([?&])_=[^&]*/,
		wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		En = v.fn.load,
		Sn = {},
		xn = {},
		Tn = ["*/"] + ["*"];
	try {
		cn = s.href
	} catch (Nn) {
		cn = i.createElement("a"), cn.href = "", cn = cn.href
	}
	ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function(e, n, r) {
		if (typeof e != "string" && En) {
			return En.apply(this, arguments)
		}
		if (!this.length) {
			return this
		}
		var i, s, o, u = this,
			a = e.indexOf(" ");
		return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({
			url: e,
			type: s,
			dataType: "html",
			data: n,
			complete: function(e, t) {
				r && u.each(r, o || [e.responseText, t, e])
			}
		}).done(function(e) {
			o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
		}), this
	}, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
		v.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), v.each(["get", "post"], function(e, n) {
		v[n] = function(e, r, i, s) {
			return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
				type: n,
				url: e,
				data: r,
				success: i,
				dataType: s
			})
		}
	}), v.extend({
		getScript: function(e, n) {
			return v.get(e, t, n, "script")
		},
		getJSON: function(e, t, n) {
			return v.get(e, t, n, "json")
		},
		ajaxSetup: function(e, t) {
			return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
		},
		ajaxSettings: {
			url: cn,
			isLocal: dn.test(ln[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": Tn
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": v.parseJSON,
				"text xml": v.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: Cn(Sn),
		ajaxTransport: Cn(xn),
		ajax: function(e, n) {
			function T(e, n, s, a) {
				var l, y, b, w, S, T = n;
				if (E === 2) {
					return
				}
				E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
				if (e >= 200 && e < 300 || e === 304) {
					c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b)
				} else {
					b = T;
					if (!T || e) {
						T = "error", e < 0 && (e = 0)
					}
				}
				x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
			}
			typeof e == "object" && (n = e, e = t), n = n || {};
			var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
				h = c.context || c,
				p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
				d = v.Deferred(),
				m = v.Callbacks("once memory"),
				g = c.statusCode || {},
				b = {},
				w = {},
				E = 0,
				S = "canceled",
				x = {
					readyState: 0,
					setRequestHeader: function(e, t) {
						if (!E) {
							var n = e.toLowerCase();
							e = w[n] = w[n] || e, b[e] = t
						}
						return this
					},
					getAllResponseHeaders: function() {
						return E === 2 ? i : null
					},
					getResponseHeader: function(e) {
						var n;
						if (E === 2) {
							if (!s) {
								s = {};
								while (n = pn.exec(i)) {
									s[n[1].toLowerCase()] = n[2]
								}
							}
							n = s[e.toLowerCase()]
						}
						return n === t ? null : n
					},
					overrideMimeType: function(e) {
						return E || (c.mimeType = e), this
					},
					abort: function(e) {
						return e = e || S, o && o.abort(e), T(0, e), this
					}
				};
			d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function(e) {
				if (e) {
					var t;
					if (E < 2) {
						for (t in e) {
							g[t] = [g[t], e[t]]
						}
					} else {
						t = e[x.status], x.always(t)
					}
				}
				return this
			}, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
			if (E === 2) {
				return x
			}
			f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
			if (!c.hasContent) {
				c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
				if (c.cache === !1) {
					var N = v.now(),
						C = c.url.replace(bn, "$1_=" + N);
					c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
				}
			}(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
			for (l in c.headers) {
				x.setRequestHeader(l, c.headers[l])
			}
			if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
				S = "abort";
				for (l in {
						success: 1,
						error: 1,
						complete: 1
					}) {
					x[l](c[l])
				}
				o = kn(xn, c, n, x);
				if (!o) {
					T(-1, "No Transport")
				} else {
					x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function() {
						x.abort("timeout")
					}, c.timeout));
					try {
						E = 1, o.send(b, T)
					} catch (k) {
						if (!(E < 2)) {
							throw k
						}
						T(-1, k)
					}
				}
				return x
			}
			return x.abort()
		},
		active: 0,
		lastModified: {},
		etag: {}
	});
	var Mn = [],
		_n = /\?/,
		Dn = /(=)\?(?=&|$)|\?\?/,
		Pn = v.now();
	v.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Mn.pop() || v.expando + "_" + Pn++;
			return this[e] = !0, e
		}
	}), v.ajaxPrefilter("json jsonp", function(n, r, i) {
		var s, o, u, a = n.data,
			f = n.url,
			l = n.jsonp !== !1,
			c = l && Dn.test(f),
			h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
		if (n.dataTypes[0] === "jsonp" || c || h) {
			return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function() {
				return u || v.error(s + " was not called"), u[0]
			}, n.dataTypes[0] = "json", e[s] = function() {
				u = arguments
			}, i.always(function() {
				e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
			}), "script"
		}
	}), v.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(e) {
				return v.globalEval(e), e
			}
		}
	}), v.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), v.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
			return {
				send: function(s, o) {
					n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, i) {
						if (i || !n.readyState || /loaded|complete/.test(n.readyState)) {
							n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success")
						}
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function() {
					n && n.onload(0, 1)
				}
			}
		}
	});
	var Hn, Bn = e.ActiveXObject ? function() {
			for (var e in Hn) {
				Hn[e](0, 1)
			}
		} : !1,
		jn = 0;
	v.ajaxSettings.xhr = e.ActiveXObject ? function() {
			return !this.isLocal && Fn() || In()
		} : Fn,
		function(e) {
			v.extend(v.support, {
				ajax: !!e,
				cors: !!e && "withCredentials" in e
			})
		}(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function(n) {
			if (!n.crossDomain || v.support.cors) {
				var r;
				return {
					send: function(i, s) {
						var o, u, a = n.xhr();
						n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
						if (n.xhrFields) {
							for (u in n.xhrFields) {
								a[u] = n.xhrFields[u]
							}
						}
						n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (u in i) {
								a.setRequestHeader(u, i[u])
							}
						} catch (f) {}
						a.send(n.hasContent && n.data || null), r = function(e, i) {
							var u, f, l, c, h;
							try {
								if (r && (i || a.readyState === 4)) {
									r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
									if (i) {
										a.readyState !== 4 && a.abort()
									} else {
										u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
										try {
											c.text = a.responseText
										} catch (p) {}
										try {
											f = a.statusText
										} catch (p) {
											f = ""
										}!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
									}
								}
							} catch (d) {
								i || s(-1, d)
							}
							c && s(u, f, c, l)
						}, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
					},
					abort: function() {
						r && r(0, 1)
					}
				}
			}
		});
	var qn, Rn, Un = /^(?:toggle|show|hide)$/,
		zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
		Wn = /queueHooks$/,
		Xn = [Gn],
		Vn = {
			"*": [function(e, t) {
				var n, r, i = this.createTween(e, t),
					s = zn.exec(t),
					o = i.cur(),
					u = +o || 0,
					a = 1,
					f = 20;
				if (s) {
					n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
					if (r !== "px" && u) {
						u = v.css(i.elem, e, !0) || n || 1;
						do {
							a = a || ".5", u /= a, v.style(i.elem, e, u + r)
						} while (a !== (a = i.cur() / o) && a !== 1 && --f)
					}
					i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
				}
				return i
			}]
		};
	v.Animation = v.extend(Kn, {
		tweener: function(e, t) {
			v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			var n, r = 0,
				i = e.length;
			for (; r < i; r++) {
				n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
			}
		},
		prefilter: function(e, t) {
			t ? Xn.unshift(e) : Xn.push(e)
		}
	}), v.Tween = Yn, Yn.prototype = {
		constructor: Yn,
		init: function(e, t, n, r, i, s) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = Yn.propHooks[this.prop];
			return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = Yn.propHooks[this.prop];
			return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
		}
	}, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
			},
			set: function(e) {
				v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, v.each(["toggle", "show", "hide"], function(e, t) {
		var n = v.fn[t];
		v.fn[t] = function(r, i, s) {
			return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
		}
	}), v.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(Gt).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(e, t, n, r) {
			var i = v.isEmptyObject(e),
				s = v.speed(t, n, r),
				o = function() {
					var t = Kn(this, v.extend({}, e), s);
					i && t.stop(!0)
				};
			return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
		},
		stop: function(e, n, r) {
			var i = function(e) {
				var t = e.stop;
				delete e.stop, t(r)
			};
			return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = e != null && e + "queueHooks",
					s = v.timers,
					o = v._data(this);
				if (n) {
					o[n] && o[n].stop && i(o[n])
				} else {
					for (n in o) {
						o[n] && o[n].stop && Wn.test(n) && i(o[n])
					}
				}
				for (n = s.length; n--;) {
					s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1))
				}(t || !r) && v.dequeue(this, e)
			})
		}
	}), v.each({
		slideDown: Zn("show"),
		slideUp: Zn("hide"),
		slideToggle: Zn("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		v.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), v.speed = function(e, t, n) {
		var r = e && typeof e == "object" ? v.extend({}, e) : {
			complete: n || !n && t || v.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !v.isFunction(t) && t
		};
		r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
		if (r.queue == null || r.queue === !0) {
			r.queue = "fx"
		}
		return r.old = r.complete, r.complete = function() {
			v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
		}, r
	}, v.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return 0.5 - Math.cos(e * Math.PI) / 2
		}
	}, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function() {
		var e, n = v.timers,
			r = 0;
		qn = v.now();
		for (; r < n.length; r++) {
			e = n[r], !e() && n[r] === e && n.splice(r--, 1)
		}
		n.length || v.fx.stop(), qn = t
	}, v.fx.timer = function(e) {
		e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
	}, v.fx.interval = 13, v.fx.stop = function() {
		clearInterval(Rn), Rn = null
	}, v.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function(e) {
		return v.grep(v.timers, function(t) {
			return e === t.elem
		}).length
	});
	var er = /^(?:body|html)$/i;
	v.fn.offset = function(e) {
		if (arguments.length) {
			return e === t ? this : this.each(function(t) {
				v.offset.setOffset(this, e, t)
			})
		}
		var n, r, i, s, o, u, a, f = {
				top: 0,
				left: 0
			},
			l = this[0],
			c = l && l.ownerDocument;
		if (!c) {
			return
		}
		return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
			top: f.top + u - s,
			left: f.left + a - o
		}) : f)
	}, v.offset = {
		bodyOffset: function(e) {
			var t = e.offsetTop,
				n = e.offsetLeft;
			return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
				top: t,
				left: n
			}
		},
		setOffset: function(e, t, n) {
			var r = v.css(e, "position");
			r === "static" && (e.style.position = "relative");
			var i = v(e),
				s = i.offset(),
				o = v.css(e, "top"),
				u = v.css(e, "left"),
				a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
				f = {},
				l = {},
				c, h;
			a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
		}
	}, v.fn.extend({
		position: function() {
			if (!this[0]) {
				return
			}
			var e = this[0],
				t = this.offsetParent(),
				n = this.offset(),
				r = er.test(t[0].nodeName) ? {
					top: 0,
					left: 0
				} : t.offset();
			return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
				top: n.top - r.top,
				left: n.left - r.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent || i.body;
				while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
					e = e.offsetParent
				}
				return e || i.body
			})
		}
	}), v.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		v.fn[e] = function(i) {
			return v.access(this, function(e, i, s) {
				var o = tr(e);
				if (s === t) {
					return o ? n in o ? o[n] : o.document.documentElement[i] : e[i]
				}
				o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
			}, e, i, arguments.length, null)
		}
	}), v.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		v.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(r, i) {
			v.fn[i] = function(i, s) {
				var o = arguments.length && (r || typeof i != "boolean"),
					u = r || (i === !0 || s === !0 ? "margin" : "border");
				return v.access(this, function(n, r, i) {
					var s;
					return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
				}, n, o ? i : t, o, null)
			}
		})
	}), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return v
	})
})(window);
(function(V) {
	var E = V.fn.domManip,
		S = "_tmplitem",
		F = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		U = {},
		Q = {},
		R, G = {
			key: 0,
			data: {}
		},
		N = 0,
		T = 0,
		K = [];

	function P(b, i, a, f) {
		var j = {
			data: f || (f === 0 || f === false) ? f : i ? i.data : {},
			_wrap: i ? i._wrap : null,
			tmpl: null,
			parent: i || null,
			nodes: [],
			calls: B,
			nest: z,
			wrap: y,
			html: A,
			update: C
		};
		b && V.extend(j, b, {
			nodes: [],
			parent: i
		});
		if (a) {
			j.tmpl = a;
			j._ctnt = j._ctnt || j.tmpl(V, j);
			j.key = ++N;
			(K.length ? Q : U)[N] = j
		}
		return j
	}
	V.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		V.fn[a] = function(r) {
			var q = [],
				o = V(r),
				e, p, c, d, f = this.length === 1 && this[0].parentNode;
			R = U || {};
			if (f && f.nodeType === 11 && f.childNodes.length === 1 && o.length === 1) {
				o[b](this[0]);
				q = this
			} else {
				for (p = 0, c = o.length; p < c; p++) {
					T = p;
					e = (p > 0 ? this.clone(true) : this).get();
					V(o[p])[b](e);
					q = q.concat(e)
				}
				T = 0;
				q = this.pushStack(q, a, o.selector)
			}
			d = R;
			R = null;
			V.tmpl.complete(d);
			return q
		}
	});
	V.fn.extend({
		tmpl: function(e, f, a) {
			return V.tmpl(this[0], e, f, a)
		},
		tmplItem: function() {
			return V.tmplItem(this[0])
		},
		template: function(a) {
			return V.template(a, this[0])
		},
		domManip: function(p, a, b) {
			if (p[0] && V.isArray(p[0])) {
				var n = V.makeArray(arguments),
					l = p[0],
					c = l.length,
					e = 0,
					o;
				while (e < c && !(o = V.data(l[e++], "tmplItem"))) {}
				if (o && T) {
					n[2] = function(d) {
						V.tmpl.afterManip(this, d, b)
					}
				}
				E.apply(this, n)
			} else {
				E.apply(this, arguments)
			}
			T = 0;
			!R && V.tmpl.complete(U);
			return this
		}
	});
	V.extend({
		tmpl: function(j, f, g, l) {
			var b, a = !l;
			if (a) {
				l = G;
				j = V.template[j] || V.template(null, j);
				Q = {}
			} else {
				if (!j) {
					j = l.tmpl;
					U[l.key] = l;
					l.nodes = [];
					l.wrapped && I(l, l.wrapped);
					return V(M(l, null, l.tmpl(V, l)))
				}
			}
			if (!j) {
				return []
			}
			if (typeof f === "function") {
				f = f.call(l || {})
			}
			g && g.wrapped && I(g, g.wrapped);
			b = V.isArray(f) ? V.map(f, function(c) {
				return c ? P(g, l, j, c) : null
			}) : [P(g, l, j, f)];
			return a ? V(M(l, null, b)) : b
		},
		tmplItem: function(a) {
			var d;
			if (a instanceof V) {
				a = a[0]
			}
			while (a && a.nodeType === 1 && !(d = V.data(a, "tmplItem")) && (a = a.parentNode)) {}
			return d || G
		},
		template: function(d, a) {
			if (a) {
				if (typeof a === "string") {
					a = H(a)
				} else {
					if (a instanceof V) {
						a = a[0] || {}
					}
				}
				if (a.nodeType) {
					a = V.data(a, "tmpl") || V.data(a, "tmpl", H(a.innerHTML))
				}
				return typeof d === "string" ? (V.template[d] = a) : a
			}
			return d ? typeof d !== "string" ? V.template(null, d) : V.template[d] || V.template(null, F.test(d) ? d : V(d)) : null
		},
		encode: function(b) {
			return ("" + b).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
		}
	});
	V.extend(V.tmpl, {
		tag: {
			tmpl: {
				_default: {
					$2: "null"
				},
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
			},
			wrap: {
				_default: {
					$2: "null"
				},
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			each: {
				_default: {
					$2: "$index, $value"
				},
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: {
					$1: "true"
				},
				open: "}else if(($notnull_1) && $1a){"
			},
			html: {
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				_default: {
					$1: "$data"
				},
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				open: ""
			}
		},
		complete: function() {
			U = {}
		},
		afterManip: function(c, a, h) {
			var g = a.nodeType === 11 ? V.makeArray(a.childNodes) : a.nodeType === 1 ? [a] : [];
			h.call(c, a);
			J(g);
			T++
		}
	});

	function M(i, d, h) {
		var a, j = h ? V.map(h, function(b) {
			return typeof b === "string" ? i.key ? b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + S + '="' + i.key + '" $2') : b : M(b, i, b._ctnt)
		}) : i;
		if (d) {
			return j
		}
		j = j.join("");
		j.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(b, l, g, k) {
			a = V(g).get();
			J(a);
			if (l) {
				a = L(l).concat(a)
			}
			if (k) {
				a = a.concat(L(k))
			}
		});
		return a ? a : L(j)
	}

	function L(d) {
		var a = document.createElement("div");
		a.innerHTML = d;
		return V.makeArray(a.childNodes)
	}

	function H(a) {
		return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + V.trim(a).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(h, n, o, r, w, v, u) {
			var p = V.tmpl.tag[o],
				q, t, s;
			if (!p) {
				throw "Unknown template tag: " + o
			}
			q = p._default || [];
			if (v && !/\w$/.test(w)) {
				w += v;
				v = ""
			}
			if (w) {
				w = O(w);
				u = u ? "," + O(u) + ")" : v ? ")" : "";
				t = v ? w.indexOf(".") > -1 ? w + O(v) : "(" + w + ").call($item" + u : w;
				s = v ? t : "(typeof(" + w + ")==='function'?(" + w + ").call($item):(" + w + "))"
			} else {
				s = t = q.$1 || "null"
			}
			r = O(r);
			return "');" + p[n ? "close" : "open"].split("$notnull_1").join(w ? "typeof(" + w + ")!=='undefined' && (" + w + ")!=null" : "true").split("$1a").join(s).split("$1").join(t).split("$2").join(r || q.$2 || "") + "__.push('"
		}) + "');}return __;")
	}

	function I(d, a) {
		d._wrap = M(d, true, V.isArray(a) ? a : [F.test(a) ? a : V(a).html()]).join("")
	}

	function O(b) {
		return b ? b.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
	}

	function D(c) {
		var d = document.createElement("div");
		d.appendChild(c.cloneNode(true));
		return d.innerHTML
	}

	function J(b) {
		var c = "_" + T,
			g, i, f = {},
			r, a, q;
		for (r = 0, a = b.length; r < a; r++) {
			if ((g = b[r]).nodeType !== 1) {
				continue
			}
			i = g.getElementsByTagName("*");
			for (q = i.length - 1; q >= 0; q--) {
				d(i[q])
			}
			d(g)
		}

		function d(s) {
			var v, t = s,
				n, u, l;
			if (l = s.getAttribute(S)) {
				while (t.parentNode && (t = t.parentNode).nodeType === 1 && !(v = t.getAttribute(S))) {}
				if (v !== l) {
					t = t.parentNode ? t.nodeType === 11 ? 0 : t.getAttribute(S) || 0 : 0;
					if (!(u = U[l])) {
						u = Q[l];
						u = P(u, U[t] || Q[t]);
						u.key = ++N;
						U[N] = u
					}
					T && w(l)
				}
				s.removeAttribute(S)
			} else {
				if (T && (u = V.data(s, "tmplItem"))) {
					w(u.key);
					U[u.key] = u;
					t = V.data(s.parentNode, "tmplItem");
					t = t ? t.key : 0
				}
			}
			if (u) {
				n = u;
				while (n && n.key != t) {
					n.nodes.push(s);
					n = n.parent
				}
				delete u._ctnt;
				delete u._wrap;
				V.data(s, "tmplItem", u)
			}

			function w(e) {
				e = e + c;
				u = f[e] = f[e] || P(u, U[u.parent.key + c] || u.parent)
			}
		}
	}

	function B(f, g, h, e) {
		if (!f) {
			return K.pop()
		}
		K.push({
			_: f,
			tmpl: g,
			item: this,
			data: h,
			options: e
		})
	}

	function z(e, f, a) {
		return V.tmpl(V.template(e), f, a, this)
	}

	function y(a, e) {
		var f = a.options || {};
		f.wrapped = e;
		return V.tmpl(V.template(a.tmpl), a.data, f, a.item)
	}

	function A(e, f) {
		var a = this._wrap;
		return V.map(V(V.isArray(a) ? a.join("") : a).filter(e || "*"), function(b) {
			return f ? b.innerText || b.textContent : b.outerHTML || D(b)
		})
	}

	function C() {
		var a = this.nodes;
		V.tmpl(null, null, null, this).insertBefore(a[0]);
		V(a).remove()
	}
})(jQuery);
var constantModule = {
	logoutPrompt: "是否要退出系统?",
	favTitle: "立创商城-专业电子元器件网络零售商城",
	collectPrompt: "收藏失败，您的浏览器不支持该方式收藏，请使用 <span style='color:#2e8ded'>Ctrl+D</span> 收藏立创商城网站。",
	setHomePrompt: "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。",
	compareExistPrompt: "对比栏商品已存在",
	compareFullPrompt: "对比栏已满",
	comparePrompt: "至少选择两种商品进行对比！",
	searchPrompt: "请输入型号或者产品相关信息进行搜索",
	errorPrompt: "系统异常！",
	emailPrompt: "请输入对方对方E-mail",
	txtPrompt: "请输入您的推荐附言",
	txtLimitPrompt: "附言字数不能大于200字",
	inputNamePrompt: "请输入您的姓名",
	inputNameLimitPrompt: "姓名不能大于20字",
	emailLimitPrompt: "每次最多可发 5 封邮件",
	emailErrorPrompt: "不是一个有效的邮箱地址，请更正。",
	sendSuccessPrompt: "您商品推荐邮件已成功发出。",
	sendErrorPrompt: "邮件发送失败，请检查您的输入信息。",
	sendNetErrorPrompt: "邮件发送失败，请稍候重试。",
	noLoginPrompt: "您还没有登录，不能进行此评分。是否现在登录？",
	consultedPrompt: "这条记录您已经评过分了，不允许重复评分。",
	consultFailPrompt: "评分失败，请稍候再试。",
	evaluateLoginPrompt: "您还没有登录，不能进行回复。是否现在登录？",
	priceErrorPrompt: "请输入正确的价格!",
	glPricePrompt: "第二个价格不能比第一个价格小!",
	selectMorePrompt: "至少需要勾选一项",
	noPriceChangePrompt: "当前商品没有价格变化！",
	conlectSuccessPrompt: "该商品已经成功添加到了您的收藏夹",
	conlectLoginPrompt: "您还没登录，请登录后再收藏。是否现在登录？",
	conlectExistedPrompt: "该商品已存在于您的收藏夹中，无需重复添加。",
	noticePhonePrompt: "请输入手机号码或邮箱！",
	noticeEmailErrorPrompt: "请输入正确的邮箱地址！",
	noticePhoneErrorPrompt: "请输入正确的联系手机号码！",
	noticeSuccessPrompt: "到货通知订阅成功！",
	noticeFailPrompt: "到货通知失败，请填正确的联系方式提交！",
	freeBanPrompt: "该商品没有空白开发板！",
	methodBanPrompt: "该商品没有方案验证板！",
	buyRecordPrompt: "该商品暂时没有购买记录",
	orderGoodsPrompt: "请选择是否需要订货",
	notBuyPrompt: "当前商品库存不足，不能添加到购物车，请选择其它商品下单。",
	addShoppingCartFail: "添加购物车超时，请稍候再试！",
	systemBusy: "系统繁忙，请刷新页面或稍后再试！",
	validateLimitBuyTimeout: "验证限购超时，请稍后重试！",
	pleaseContactSystemUser: "请联系工作人员！",
	showedAll: "已显示所有搜索结果！",
	inputNumPrompt: "请填写购买数量！",
	gtTotal: "你要购买的数量大于库存量！",
	gtLimit: "购物车超出最大存储限制"
};
var searchModule = {
	liLength: Math.floor($(".sch_bd_catalog li").length / 2),
	stopkeywordAutoRefresh: false,
	calStartDate: Date.parse("2017-01-01 00:00:00"),
	keywordIndex: -1,
	searchCache: {},
	init: function() {
		searchModule.searchInit();
		setInterval(searchModule.keywordAutoRefresh, 1000);
		searchModule.keywordAutoRefresh();
		if ($(".sch_bd_catalog li").length % 2 != 0) {
			$(".sch_bd_catalog li").last().remove()
		}
		$(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").hide();
		$(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").show();
		$(".sch_search").click(function(a) {
			a.stopPropagation();
			$(".sch_bd01").parent().next().toggle()
		});
		$(".sch_bd_catalog").on("click", "li", function() {
			$(".sch_bd01").html($(this).attr("title"));
			$(".sch_bd01").attr("data-id", $(this).attr("data-id"));
			$(".sch_bd01").attr("title", $(this).attr("title"))
		});
		$(document).bind("click", function() {
			$(".sch_bd01").parent().next().hide();
			$("#search_list").hide()
		});
		$(".sch .more_list").click(function(b) {
			b.stopPropagation();
			var a = $(".sch_bd_catalog li");
			if (a[0].style.display == "none") {
				$(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").hide();
				$(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").show();
				$(this).children().css({
					backgroundPosition: "0 -90px"
				})
			} else {
				$(".sch_bd_catalog li:gt(" + (searchModule.liLength - 1) + ")").show();
				$(".sch_bd_catalog li:lt(" + searchModule.liLength + ")").hide();
				$(this).children().css({
					backgroundPosition: "0 -80px"
				})
			}
		});
		$(".sch_bd .sch_bd03").click(function() {
			searchModule.startGlobalSearch(0)
		});
		$("#search_list").on("click", "li", function() {
			$("#search_input").val($(this).find(".search_word ").text());
			searchModule.startGlobalSearch(1)
		});
		$("#search_list").on("mouseenter", "li", function() {
			$(this).addClass("active").siblings().removeClass("active");
			searchModule.keywordIndex = $(this).index()
		});
		$("#search_input").on("keydown", function(b) {
			var a = $("#search_list li").length;
			if (a > 0 && !$("#search_list").is(":hidden")) {
				if (b.keyCode == 38) {
					searchModule.keywordIndex = searchModule.keywordIndex <= 0 ? 0 : searchModule.keywordIndex - 1;
					var c = $("#search_list li").eq(searchModule.keywordIndex);
					c.addClass("active").siblings().removeClass("active");
					$("#search_input").val(c.find(".search_word").text())
				} else {
					if (b.keyCode == 40) {
						searchModule.keywordIndex = searchModule.keywordIndex >= a - 1 ? a - 1 : searchModule.keywordIndex + 1;
						var c = $("#search_list li").eq(searchModule.keywordIndex);
						c.addClass("active").siblings().removeClass("active");
						$("#search_input").val(c.find(".search_word").text())
					}
				}
			}
			if (b.keyCode == 13) {
				searchModule.startGlobalSearch(0);
				return false
			}
		});
		$(".sch .hot").on("click", ".hotNoHref", function() {
			$("#search_input").val($(this).text());
			searchModule.startGlobalSearch(0)
		})
	},
	keywordBold: function(e, d) {
		$("#search_list").show();
		$("#search_list").html("");
		$("#search_tmpl").tmpl(e).appendTo("#search_list");
		var b = $("#search_list .search_word");
		for (var a = 0; a < b.length; a++) {
			var c = $(b[a]).text().replace(d.toLowerCase(), "<b>" + d.toLowerCase() + "</b>");
			$(b[a]).html(c)
		}
	},
	searchInit: function() {
		var a = true;
		var c = "";
		var d = $("#search_input");
		d.focus();
		var b = null;
		d.bind("keyup", function(h) {
			if (h.keyCode == 38 || h.keyCode == 40 || h.keyCode == 13) {
				return
			}
			var g = $.trim(d.val());
			if (!g) {
				$("#search_list").hide().html("");
				c = "";
				return
			}
			if (g == c) {
				return
			}
			if (g.indexOf(c) == 0 && c != "") {
				if (!a) {
					return
				}
			}
			c = g;
			searchModule.keywordIndex = -1;
			if (g in searchModule.searchCache) {
				a = true;
				var f = {
					searchList: searchModule.searchCache[g]
				};
				searchModule.keywordBold(f, g);
				return
			}
			if (b) {
				clearTimeout(b)
			}
			b = setTimeout(function() {
				var e = "?keyword=" + encodeURI(encodeURI($.trim(d.val()))) + "&catalogId=" + $(".sch_bd01").attr("data-id");
				$.ajax({
					url: webSiteShareData.lcSearchUrl + "search/searchTip.html" + e,
					dataType: "jsonp",
					data: {},
					timeout: 3000,
					success: function(k) {
						if (k.length == 0) {
							$("#search_list").hide().html("");
							a = false
						} else {
							a = true;
							var o = {
								searchList: []
							};
							for (var m = 0, n = k.length; m < n; m++) {
								var p = {};
								for (var l in k[m]) {
									p.word = k[m][l];
									p.num = l
								}
								o.searchList.push(p)
							}
							if (!(g in searchModule.searchCache)) {
								searchModule.searchCache[g] = o.searchList
							}
							searchModule.keywordBold(o, g)
						}
					},
					error: function() {}
				})
			}, 300)
		})
	},
	replaceSpecialChar: function(b) {
		if (!(b && b != "")) {
			return ""
		}
		var c = new RegExp("'", "g");
		var a = $.trim(b);
		a = a.replace(c, " ");
		c = new RegExp('"', "g");
		a = a.replace(c, " ");
		c = new RegExp("=", "g");
		a = a.replace(c, " ");
		c = new RegExp(":", "g");
		a = a.replace(c, " ");
		c = new RegExp("‘", "g");
		a = a.replace(c, " ");
		c = new RegExp("“", "g");
		a = a.replace(c, " ");
		c = new RegExp("：", "g");
		a = a.replace(c, " ");
		return a
	},
	startGlobalSearch: function(b, f) {
		var e = "";
		if (b == 1) {
			e = "drop_box"
		}
		var d = $("#search_input");
		var a = searchModule.replaceSpecialChar($.trim(d.val()));
		if (a == "" && d.attr("placeholder") != "请输入型号或者产品相关信息...") {
			window.location.href = webSiteShareData.activityWebsite;
			return
		}
		if (a == "请输入型号或者产品相关信息...") {
			a = ""
		}
		if (a) {
			if (webSiteShareData.globleSearchNeedLogin == "true") {
				window.location.href = webSiteShareData.casUrl + "/login?service=" + document.location.href
			} else {
				var c = document.getElementById("global-search-form");
				c.action = webSiteShareData.lcSoContextPath;
				d.val(a);
				$("#hidden_search_input").val(encodeURI(a));
				$("#global_current_catalog").val($(".sch_bd .sch_bd01").attr("data-id"));
				c.submit()
			}
		} else {
			commonModule.alertFail(constantModule.searchPrompt)
		}
	},
	keywordAutoRefresh: function() {
		if (searchModule.stopkeywordAutoRefresh) {
			return
		}
		var e = Date.parse(new Date());
		var f = (e - searchModule.calStartDate) / 1000;
		var d = 0;
		for (var c = 0; c < activityKeyword.length; c++) {
			d = d + parseInt(activityKeyword[c].showTime)
		}
		if (d > 0) {
			var b = f % d;
			d = 0;
			for (var c = 0; c < activityKeyword.length; c++) {
				d = d + parseInt(activityKeyword[c].showTime);
				if (b < d) {
					var a = activityKeyword[c].activityKeyword;
					if (a != undefined && a != "") {
						$("#search_input").attr("placeholder", a);
						webSiteShareData.activityWebsite = activityKeyword[c].activityWebsite
					}
					break
				}
			}
		}
	}
};
var commonModule = {
	isICMember: "false",
	responseLoginMask: "",
	showLoginParams: [],
	browsePage: 2,
	onlineServiceQQ: "4000800709",
	init: function() {
		$("#hint").on("click", "#ieShow", function() {
			commonModule.hideHint()
		});
		$("#hint").on("click", "#ieContinue", function() {
			commonModule.gotoVisit()
		});
		$(window).load(function() {
			var d = d || [];
			var e = document.createElement("script");
			e.src = "//hm.baidu.com/hm.js?e2986f4b6753d376004696a1628713d2";
			var c = document.getElementsByTagName("script")[0];
			var b = document.getElementsByTagName("script");
			var c = b[b.length - 1];
			c.parentNode.insertBefore(e, c)
		});
		commonModule.checkPlaceholder();
		var a = commonModule.getOperCode() || "";
		$.ajax({
			url: webSiteShareData.lcMallContextPath + '/sharedata/ShareDataAction!getShareData.action?callback="loadShareData"&operCode=' + a + "&randX=" + Math.random(),
			dataType: "jsonp",
			type: "GET",
			timeout: 15000,
			success: function(c) {
				$("#shop b").text(c.orderTotalCount);
				if (parseInt(c.systemMessageCount) > 0 && parseInt(c.systemMessageCount) < 99) {
					$(".enter .dope").html(c.systemMessageCount)
				} else {
					if (parseInt(c.systemMessageCount) > 99) {
						$(".enter .dope").html("99+")
					}
				}
				if (window.location.href.indexOf("catalog") > -1 && c.cartProductIds) {
					var d = c.cartProductIds.split(",");
					for (var b = 0; b < d.length; b++) {
						productListModule.generateSessionCart(d[b])
					}
				}
				$("#complaintPhone").text(c.complaintPhone);
				if (c.onlineServiceQQ["SYSTEM.COMMON.ONLINE.SERVICE.PHONE"]) {
					$(".logo .shop .tel").attr("title", "专属业务员服务热线").html(c.onlineServiceQQ["SYSTEM.COMMON.ONLINE.SERVICE.PHONE"][0]);
					$(".susp_qq .cus01").siblings().eq(0).html("服务专员：<b>" + c.onlineServiceQQ.salerName[0] + "</b><br>业务电话：<b>" + c.onlineServiceQQ["SYSTEM.COMMON.ONLINE.SERVICE.PHONE"][0] + "</b>")
				} else {
					$(".logo .shop .tel").attr("title", "立创商城400电话").html("400-8302-058")
				}
				commonModule.onlineServiceQQ = c.onlineServiceQQ["SYSTEM.COMMON.ONLINE.SERVICE.QQ"];
				$(".susp_qq #forQQ dd b").html(c.onlineServiceQQ["SYSTEM.COMMON.ONLINE.SERVICE.QQ"])
			},
			error: function() {
				$(".logo .shop .tel").attr("title", "立创商城400电话").html("400-8302-058")
			}
		});
		onscroll = function() {
			var b = document.documentElement.scrollTop || document.body.scrollTop;
			if (b > 250) {
				if ($(".logo_wraper")[0].className.indexOf("active") == -1) {
					$(".logo_wraper").css("top", "-110px").addClass("active").animate({
						top: 0
					});
					if (webSiteShareData.detailsFlag && $("#detail_buy #add_shopping_cart_view").length > 0) {
						$("#add_shopping_cart_view").css("top", $("#detail_buy #add_shopping_cart_view").offset().top - 110 + "px")
					}
					if (webSiteShareData.detailsFlag && $("#recent_buy_wraper .sold_note").length > 0) {
						$("#recent_buy_wraper .sold_note").css("top", $("#recent_buy_wraper .sold_note").offset().top - 110 + "px")
					}
				}
				return
			}
			if (b < 140) {
				if ($(".logo_wraper")[0].className.indexOf("active") > -1) {
					if (webSiteShareData.detailsFlag && $("#detail_buy #add_shopping_cart_view").length > 0) {
						$("#add_shopping_cart_view").css("top", $("#detail_buy #add_shopping_cart_view").offset().top + 110 + "px")
					}
					if (webSiteShareData.detailsFlag && $("#recent_buy_wraper .sold_note").length > 0) {
						$("#recent_buy_wraper .sold_note").css("top", $("#recent_buy_wraper .sold_note").offset().top + 110 + "px")
					}
				}
				$(".logo_wraper").removeClass("active")
			}
		};
		$(".hd .er01").mouseenter(function() {
			$(this).addClass("active");
			$(".member_list").show()
		}).mouseleave(function() {
			$(this).removeClass("active");
			$(".member_list").hide()
		});
		$(".hd .member_list").mouseleave(function() {
			$(".er01").removeClass("active");
			$(this).hide()
		}).mouseenter(function() {
			$(this).show();
			$(".er01").addClass("active")
		});
		$(".hd .er04").mouseenter(function() {
			$(this).addClass("active");
			$(".inlet").show()
		}).mouseleave(function() {
			$(this).removeClass("active");
			$(".inlet").hide()
		});
		$(".hd .inlet").mouseleave(function() {
			$(".er04").removeClass("active");
			$(this).hide()
		}).mouseenter(function() {
			$(this).show();
			$(".er04").addClass("active")
		});
		$(".hd .logout").click(function() {
			commonModule.commonConfirm(constantModule.logoutPrompt, function() {
				window.top.location.href = webSiteShareData.casUrl + "/logout?service=" + webSiteShareData.lcMallContextPath + "/jsp/pass/logout.jsp"
			})
		});
		$(".ass ul").mouseover(function(g) {
			$(".s-submnu").hide();
			var d = $(g.target).closest(".ass_list").children(".s-submnu"),
				c = $(".ass").height(),
				b = d.height(),
				f = $(".ass ul").children().index($(g.target).closest(".ass_list")) * $(".ass ul li").height();
			if (f > c - b) {
				d.show().css({
					top: c - b - 10 + "px"
				})
			} else {
				d.show().css({
					top: f + "px"
				})
			}
			$(".ass ul li").removeClass("active").children("p").show();
			$(g.target).closest(".ass_list").addClass("active").children("p").hide()
		}).mouseleave(function() {
			$(".s-submnu").hide()
		});
		$(".s-submnu").mouseleave(function() {
			$(this).hide()
		});
		$(".hint_cue1").on("click", ".hint_tit a,input", function() {
			$(".hint_cue").hide();
			$(".hint_cue1").hide()
		});
		$(".suspend .item_db").click(function() {
			var b = $("#contrast .first").find("a.hover").length;
			if ($("#contrast").is(":hidden") || b == 0) {
				commonModule.selectProductFromCookie()
			} else {
				$("#contrast").hide().html("")
			}
		});
		$(".suspend .item_slot").click(function() {
			var b = $("#contrast .first").find("a.hover").length;
			if ($("#contrast").is(":hidden") || b > 0) {
				commonModule.browsePage = 2;
				commonModule.rollProductBrowse()
			} else {
				$("#contrast").hide().html("")
			}
		});
		$("#contrast").on("click", ".contrast_bt li", function(b) {
			$(".contrast_bt li").children().removeClass("hover");
			$(this).children().addClass("hover");
			if ($(this).children().html() == "对比栏") {
				commonModule.selectProductFromCookie()
			} else {
				commonModule.browsePage = 2;
				commonModule.rollProductBrowse()
			}
		});
		$("#contrast").on("click", ".contrast_h1 h1", function(b) {
			$(this).children(".contrast_xq").show()
		});
		$("#contrast").on("click", ".contrast_h1 ul li", function(b) {
			b.stopPropagation();
			$(this).closest("h1").children("span").html($(this).html());
			$(".contrast_h1 .contrast_xq").hide()
		});
		$("#contrast").on("mouseleave", ".contrast_h1 ul", function() {
			$(".contrast_h1 .contrast_xq").hide()
		});
		$("#contrast").on("click", ".lcsc_2015db_nr2_2", function() {
			var b = $(this).prev().attr("productId");
			commonModule.removeCompareProduct(b)
		});
		$("#contrast").on("click", ".contrast_btn a", function() {
			commonModule.removeAllCompareProduct()
		});
		$("#contrast").on("click", ".contrast_yc", function() {
			$("#contrast").hide()
		});
		$("#contrast").on("click", ".contrast_btn input", function() {
			commonModule.showCompareProductDetail()
		});
		$("#contrast").on("click", ".lcsc_2015_lbdb1", function() {
			var b = $(this).closest("dd").find("a").attr("href").match("[0-9]+(?=.html)")[0];
			commonModule.addProductToCompare(b, "browse")
		});
		$("#contrast").on("click", ".contrast_next,.contrast_pre", function() {
			commonModule.rollProductBrowse()
		});
		$("#contrast").on("click", ".lcsc_2015db_nr2_fd li", function() {
			var c = $(this).attr("id");
			var b = $(this).parent().attr("id");
			commonModule.showProductPriceList(b, c)
		});
		$(".suspend .item_top").click(function() {
			window.scrollTo(0, 0)
		});
		$(".suspend #fixed_hide").click(function() {
			$(".susp_qq").toggle(500);
			var c = $(this).children("p");
			var b = $(this).children("span");
			if (b.text() == "收起") {
				b.text("展开");
				c.css("backgroundPosition", "0 -189px")
			} else {
				b.text("收起");
				c.css("backgroundPosition", "0 -174px")
			}
		});
		$("#forQQ").click(function() {
			commonModule._loadQQ("forQQ")
		});
		$("#QQ_contact").click(function() {
			commonModule._loadQQ("QQ_contact")
		});
		$(window).resize(function() {
			var b = $(window).width();
			if (b < 1160) {
				$(".lcsc").css("width", "23%");
				$(".lcsc b").css("display", "none");
				$(".sch").css("width", "60%")
			} else {
				$(".lcsc").css("width", "34%");
				$(".lcsc b").css("display", "block");
				$(".sch").css("width", "53%")
			}
			if (b < 1200) {
				var c = $(".nav .sort")[0].offsetWidth;
				$(".ass div.s-submnu").css("left", c + "px")
			}
			if ($("#lookPDF").length > 0) {
				$("#lookPDF ul").css("height", $(window).height() * 0.8 + "px");
				$("#lookPDF").css("marginTop", -$("#lookPDF").height() / 2 + "px")
			}
		}).resize();
		$("#setLove").click(function() {
			commonModule.addFav()
		});
		$("#setHome").click(function() {
			commonModule.setHome(this)
		});
		commonModule.navCatalogEvent()
	},
	alertFail: function(a, b) {
		$(".hint_nr a").removeClass("active");
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		$(".hint_cue1").show();
		$(".hint_nr").children("b").html(a);
		$(".hint_cue1 input").off("click");
		$(".hint_cue1 input").on("click", function() {
			if (b) {
				b()
			}
		})
	},
	alertSuccess: function(a) {
		this.alertFail(a);
		$(".hint_nr a").addClass("active")
	},
	commonConfirm: function(a, c, b) {
		$(".hint_cue").css("height", $(document).height() + "px");
		$(".hint_cue").show();
		$("#confirmtmpl").tmpl().appendTo("body");
		$(".confirm_nr").children("b").html(a);
		$(".confirm_cue1 input").off("click");
		$(".confirm_tit a").off("click");
		$(".confirm_cue1 input").on("click", function() {
			if (this.value == "确定") {
				if (c) {
					c()
				}
			} else {
				if (b) {
					b()
				}
			}
			$(".hint_cue").hide();
			$(".confirm_cue1").remove()
		});
		$(".confirm_tit a").on("click", function() {
			$(".hint_cue").hide();
			$(".confirm_cue1").remove()
		})
	},
	autoRefreshLoginInfo: function(d, f, c) {
		var e = "";
		var b = "";
		var a = "";
		if (d == null || d == "") {
			return
		}
		if (f != undefined && f != null && f != "null" && f != "") {
			if (f.length <= 7) {
				a = f
			} else {
				a = f.slice(0, 6) + "..."
			}
			b = a + "(" + d + ")";
			e = f
		} else {
			a = d;
			b = d;
			e = d
		}
		$("#custom").show().text(b);
		$("#custom").attr("title", d);
		$("#login").hide();
		$("#register").hide();
		$(".member_list dt").hide();
		$(".hello ul").eq(0).hide();
		$(".hello ul").eq(1).show();
		$(".hello ul").eq(1).children().eq(0).children("a").text(a);
		$(".index_center").css("marginTop", "18px");
		$("#coupon_number_for_index").text("(" + c + ")");
		$(".logout").show();
		$(".reg span").text("欢迎您：")
	},
	checkPlaceholder: function() {
		var a = "placeholder" in document.createElement("input");
		if (!a) {
			$("input").each(function(b, c) {
				if ($(this).attr("type") == "text") {
					if ($(this).val() == "") {
						$(this).val($(this).attr("placeholder"));
						$(this).addClass("placehd")
					}
					$(this).focus(function() {
						if ($(this).val() == $(this).attr("placeholder")) {
							$(this).val("")
						}
						$(this).removeClass("placehd")
					});
					$(this).blur(function() {
						if ($(this).val() == "") {
							$(this).val($(this).attr("placeholder"));
							$(this).addClass("placehd")
						}
					})
				}
			})
		}
	},
	addFav: function() {
		var a = window.location.origin;
		if (document.all) {
			try {
				window.external.addFavorite(a, constantModule.favTitle)
			} catch (b) {
				commonModule.alertFail(constantModule.collectPrompt)
			}
		} else {
			if (window.sidebar) {
				window.sidebar.addPanel(constantModule.favTitle, a, "")
			} else {
				commonModule.alertFail(constantModule.collectPrompt)
			}
		}
	},
	setHome: function(d) {
		var b = window.location.origin;
		try {
			d.style.behavior = "url(#default#homepage)";
			d.setHomePage(b)
		} catch (c) {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
				} catch (c) {
					commonModule.alertFail(constantModule.setHomePrompt)
				}
				var a = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
				a.setCharPref("browser.startup.homepage", b)
			}
		}
	},
	_loadQQ: function(a) {
		var b = "http://wpa.b.qq.com/cgi/wpa.php";
		if (commonModule.onlineServiceQQ[0] == "2852512828") {
			b = "http://q.url.cn/CD7o8O?_type=wpa&qidian=true";
			window.open(b);
			return
		} else {
			if (commonModule.onlineServiceQQ[0] == "2852370705") {
				b = "http://q.url.cn/ABZSGn?_type=wpa&qidian=true";
				window.open(b);
				return
			}
		}
		$.getScript(b, function() {
			$("#forQQ").unbind("click");
			$("#QQ_contact").unbind("click");
			BizQQWPA.addCustom({
				aty: "0",
				nameAccount: commonModule.onlineServiceQQ,
				selector: "forQQ"
			});
			BizQQWPA.addCustom({
				aty: "0",
				nameAccount: commonModule.onlineServiceQQ,
				selector: "QQ_contact"
			});
			setTimeout(function() {
				$("#" + a)[0].click()
			}, 800)
		})
	},
	addProductToCompare: function(c, b) {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!checkAndAddCompareProductCountJsonp.action?callback='loadCompareData'&productId=" + c;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(d) {
				if (!b) {
					commonModule.selectProductFromCookie()
				}
				switch (d.check_result) {
					case "existed":
						commonModule.alertFail(constantModule.compareExistPrompt);
						break;
					case "fail":
						commonModule.alertFail(constantModule.compareFullPrompt);
						break;
					default:
						if (b) {
							commonModule.selectProductFromCookie()
						}
				}
			}
		})
	},
	selectProductFromCookie: function() {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!addProductToCompareAndSelectInfoJsonp.action?callback='loadFromCookieData'";
		$.ajax({
			type: "get",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(d) {
				var c = {
					isHistory: false,
					id: "product_compare_list_div",
					lcMallContextPath: webSiteShareData.lcMallContextPath
				};
				$("#contrast").html("");
				$("#contrast").show();
				$("#contrastTmpl").tmpl(c).appendTo("#contrast");
				$("#product_compare_list_div").addClass("lcsc_2015db_nr2");
				var b = "";
				$.each(d, function(g, f) {
					if (f.productId != -1) {
						var j = parseInt(f.convesionRatio);
						b += '<dl style="position: relative;';
						if (g == 2) {
							b += "border-right: medium none;"
						}
						b += '"><dt><a href="' + webSiteShareData.lcItemContextPath + "/" + f.productId + '.html" target="_blank">';
						if (null != f.breviaryImageUrl && f.breviaryImageUrl.trim() != "") {
							b += '<img src="' + f.breviaryImageUrl + '" />'
						} else {
							b += '<img src="' + webSiteShareData.lcMallContextPath + '/image/common/no_goods_pic_big.png" />'
						}
						b += '</a></dt><dd class="lfy_btg"><a href="' + webSiteShareData.lcItemContextPath + "/" + f.productId + '.html" productId= ' + f.productId + ' target="_blank" class="lcsc_2015db_nr2_1">' + f.productName.trim() + "</a>";
						b += '<a href="javaScript:void(0);"';
						b += "";
						b += ' class="lcsc_2015db_nr2_2">删除</a></dd>';
						b += '<dd class="lfy_btg"><b>' + f.productModel + "</b></dd>";
						b += '<dd><div class="lcsc_2015db_nr2_3" style="float: left;"><div class="lcsc_2015db_nr2_fd">';
						b += '<ul id="price_ul_browse_' + g + '">';
						var k = 0;
						var h = f.productPriceList.length;
						var e = false;
						if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
							if ((f.productMinEncapsulationNumber % j) == 0 && (f.productMinEncapsulationNumber > j)) {
								e = true
							}
						}
						$.each(f.productPriceList, function(t, v) {
							var u = parseInt(v.startPurchasedNumber);
							var l = parseInt(v.endPurchasedNumber);
							var w = parseFloat(((v.productPrice * f.sessionDecimalOnlineDiscount).basicRound(2) / j).basicRound(5));
							var x = parseFloat(w.basicRound(5));
							var q = parseFloat(w.basicRound(5));
							var m = false;
							var i = 0;
							var s = f.limitNumberPrice > x;
							var r = false;
							var p = false;
							var o = "";
							var n = 0;
							b += '<li id="price_li_browse_' + g + "_" + t + '"';
							if (t < (h - 1)) {
								b += 'style="display:none;cursor: default;"'
							} else {
								b += 'style="background:url(' + webSiteShareData.lcMallContextPath + '/image/productCompare/jlc_2015db_xs.gif) no-repeat right ;"'
							}
							b += 'onclick="showProductPriceList("price_ul_browse_' + g + '","price_li_browse_' + g + "_" + t + '")"    > ';
							if (h < 2) {
								b += '<font color="red">￥' + x + " / " + f.productUnit + "</font>&nbsp;"
							} else {
								b += '<span class="bubbleInfo1">';
								if (l == -1) {
									if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
										m = true;
										i = q * f.productMinEncapsulationNumber;
										p = true;
										o = f.productMinEncapsulationUnit;
										n = i.basicRound(2);
										r = f.limitNumberEncapPrice > n
									}
									b += '<span class="trigger1" style="cursor: pointer;">';
									if (r && s && u * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										if (f.productMinEncapsulationUnit != "-") {
											b += k + f.productMinEncapsulationUnit + "以上："
										} else {
											b += u * j + "&nbsp;" + f.productUnit + "以上："
										}
									} else {
										b += u * j + "&nbsp;" + f.productUnit + "以上："
									}
									b += "</span>"
								} else {
									if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
										if (f.productMinEncapsulationNumber <= l * j) {
											m = true;
											i = q * f.productMinEncapsulationNumber;
											r = f.limitNumberEncapPrice > i.basicRound(2)
										}
									}
									b += '<span class="trigger1" style="cursor: pointer;">';
									if (r && s && u * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										b += k + f.productMinEncapsulationUnit + ":"
									} else {
										b += u * j
									}
									b += "~";
									if (r && s && l * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										if (f.productMinEncapsulationUnit != "-") {
											b += k + f.productMinEncapsulationUnit + "："
										} else {
											b += u * j + "&nbsp;" + f.productUnit + "："
										}
									} else {
										b += u * j + "&nbsp;" + f.productUnit + "："
									}
									b += "</span>"
								}
								if (m) {
									b += '<span class="bubbleInfo">';
									b += '<span class="trigger" style="cursor: pointer;" title="折合1' + f.productMinEncapsulationUnit + "(" + f.productMinEncapsulationNumber + f.productUnit + ")" + i.basicRound(2) + '元">￥' + x + "</span>";
									b += "</span>"
								} else {
									b += '<span class="STYLE10">￥' + x + "</span>"
								}
							}
							b += "</li>"
						});
						b += "</ul></div></div></dd></dl>"
					} else {
						b += '<dl class="lcsc_2015db_nr2_4"><dt><b>' + (g + 1) + "</b></dt>";
						b += "<dd>你还可以继续添加</dd></dl>"
					}
				});
				$("#product_compare_list_div").html(b);
				$(".lcsc_2015db_nr2_2").attr("onclick", null);
				$(".lcsc_2015db_nr2_fd li").attr("onclick", null)
			},
			error: function() {}
		})
	},
	removeCompareProduct: function(b) {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!removeCompareProductJsonp.action?callback='loadFromRemoveCompareData'&productId=" + b;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(c) {
				commonModule.selectProductFromCookie()
			}
		})
	},
	removeAllCompareProduct: function() {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!removeCompareProductJsonp.action?callback='loadRemoveAllCompareData'&removeAll=yes";
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(b) {
				commonModule.selectProductFromCookie()
			}
		})
	},
	showCompareProductDetail: function() {
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!checkCompareProductCountJsonp.action?callback='loadCompareProductCountData'";
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(d) {
				var c = d.check_result;
				if (c == "fail") {
					commonModule.alertFail(constantModule.comparePrompt)
				} else {
					var b = webSiteShareData.lcMallContextPath + "/product/productCompare.html";
					window.open(b)
				}
			}
		})
	},
	rollProductBrowse: function() {
		if (commonModule.browsePage == 1) {
			commonModule.browsePage = 2
		} else {
			commonModule.browsePage = 1
		}
		var a = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!clickRollProductToBrowseJsonp.action?callback='loadBrowseData'&browsePage=" + commonModule.browsePage;
		$.ajax({
			type: "GET",
			url: a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(d) {
				var c = {
					isHistory: true,
					id: "product_compare_list_div1",
					lcMallContextPath: webSiteShareData.lcMallContextPath
				};
				$("#contrast").html("");
				$("#contrast").show();
				$("#contrastTmpl").tmpl(c).appendTo("#contrast");
				$(".contrast_bt li").eq(0).children().removeClass("hover");
				$(".contrast_bt li").eq(1).children().addClass("hover");
				var b = "";
				$.each(d, function(g, f) {
					if (f.productId != -1) {
						var j = parseInt(f.convesionRatio);
						b += '<dl style="position: relative;';
						if (g == 2) {
							b += "border-right: medium none;"
						}
						b += '"><dt><a href="' + webSiteShareData.lcItemContextPath + "/" + f.productId + '.html" target="_blank">';
						if (null != f.breviaryImageUrl && f.breviaryImageUrl.trim() != "") {
							b += '<img src="' + f.breviaryImageUrl + '" />'
						} else {
							b += '<img src="' + webSiteShareData.lcMallContextPath + '/image/common/no_goods_pic_big.png" />'
						}
						b += '</a></dt><dd class="lfy_btg"><a href="' + webSiteShareData.lcItemContextPath + "/" + f.productId + '.html" target="_blank" class="lcsc_2015db_nr2_1">' + f.productName.trim();
						b += '</a><span class="lcsc_2015ll_nr1"><input name="" class="lcsc_2015_lbdb1" type="button" onclick="addProductToCompareByBrowse(' + f.productId + ');" onmousemove="showButColol(this,"Y")" onmouseout="showButColol(this,"N")"  value="对比" /></span></dd>';
						b += '<dd class="lfy_btg"><b>' + f.productModel + "</b></dd>";
						b += '<dd><div class="lcsc_2015db_nr2_3" style="float: left;"><div class="lcsc_2015db_nr2_fd">';
						b += '<ul id="price_ul_browse_' + g + '">';
						var k = 0;
						var h = f.productPriceList.length;
						var e = false;
						if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
							if ((f.productMinEncapsulationNumber % j) == 0 && (f.productMinEncapsulationNumber > j)) {
								e = true
							}
						}
						$.each(f.productPriceList, function(t, v) {
							var u = parseInt(v.startPurchasedNumber);
							var l = parseInt(v.endPurchasedNumber);
							var w = parseFloat(((v.productPrice * f.sessionDecimalOnlineDiscount).basicRound(2) / j).basicRound(5));
							var x = parseFloat(w.basicRound(5));
							var q = parseFloat(w.basicRound(5));
							var m = false;
							var i = 0;
							var s = f.limitNumberPrice > x;
							var r = false;
							var p = false;
							var o = "";
							var n = 0;
							b += '<li id="price_li_browse_' + g + "_" + t + '"';
							if (t < (h - 1)) {
								b += 'style="display:none;cursor: default;"'
							} else {
								b += 'style="background:url(' + webSiteShareData.lcMallContextPath + '/image/productCompare/jlc_2015db_xs.gif) no-repeat right ;"'
							}
							b += 'onclick="showProductPriceList("price_ul_browse_' + g + '","price_li_browse_' + g + "_" + t + '")"    > ';
							if (h < 2) {
								b += '<font color="red">￥' + x + " / " + f.productUnit + "</font>&nbsp;"
							} else {
								b += '<span class="bubbleInfo1">';
								if (l == -1) {
									if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
										m = true;
										i = q * f.productMinEncapsulationNumber;
										p = true;
										o = f.productMinEncapsulationUnit;
										n = i.basicRound(2);
										r = f.limitNumberEncapPrice > n
									}
									b += '<span class="trigger1" style="cursor: pointer;">';
									if (r && s && u * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										if (f.productMinEncapsulationUnit != "-") {
											b += k + f.productMinEncapsulationUnit + "以上："
										} else {
											b += u * j + "&nbsp;" + f.productUnit + "以上："
										}
									} else {
										b += u * j + "&nbsp;" + f.productUnit + "以上："
									}
									b += "</span>"
								} else {
									if (f.productMinEncapsulationUnit != "" && f.productMinEncapsulationNumber > 0) {
										if (f.productMinEncapsulationNumber <= l * j) {
											m = true;
											i = q * f.productMinEncapsulationNumber;
											r = f.limitNumberEncapPrice > i.basicRound(2)
										}
									}
									b += '<span class="trigger1" style="cursor: pointer;">';
									if (r && s && u * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										b += k + f.productMinEncapsulationUnit + ":"
									} else {
										b += u * j
									}
									b += "~";
									if (r && s && l * j >= f.productMinEncapsulationNumber && e) {
										k = parseInt(u * j / f.productMinEncapsulationNumber);
										if (u * j % parseInt(f.productMinEncapsulationNumber) > 0) {
											k = k + 1
										}
										if (f.productMinEncapsulationUnit != "-") {
											b += k + f.productMinEncapsulationUnit + "："
										} else {
											b += u * j + "&nbsp;" + f.productUnit + "："
										}
									} else {
										b += u * j + "&nbsp;" + f.productUnit + "："
									}
									b += "</span>"
								}
								if (m) {
									b += '<span class="bubbleInfo">';
									b += '<span class="trigger" style="cursor: pointer;" title="折合1' + f.productMinEncapsulationUnit + "(" + f.productMinEncapsulationNumber + f.productUnit + ")" + i.basicRound(2) + '元">￥' + x + "</span>";
									b += "</span>"
								} else {
									b += '<span class="STYLE10">￥' + x + "</span>"
								}
							}
							b += "</li>"
						});
						b += "</ul></div></div></dd></dl>"
					}
				});
				$("#product_compare_list_div1").html(b);
				$("#product_compare_list_div1").addClass("lcsc_2015ll_nr");
				$(".lcsc_2015_lbdb1").attr("onmousemove", null);
				$(".lcsc_2015_lbdb1").attr("onmouseout", null);
				$(".lcsc_2015_lbdb1").attr("onclick", null);
				$(".lcsc_2015db_nr2_fd li").attr("onclick", null)
			}
		})
	},
	showProductPriceList: function(c, b) {
		var a = $("#" + c).find("li");
		if (a.size() > 1) {
			a.each(function(d) {
				a.eq(d).toggle()
			});
			$("#" + b).show()
		}
		$("#" + c).mouseleave(function() {
			commonModule.hideProductPriceList(c, b)
		})
	},
	hideProductPriceList: function(c, b) {
		if (c != "") {
			var a = $("#" + c).find("li");
			if (a.size() > 1) {
				a.each(function(d) {
					a.eq(d).hide()
				})
			}
			if (b != "") {
				$("#" + b).show()
			} else {
				a.eq(a.size() - 1).show()
			}
		}
	},
	showWindowLogin: function() {
		$("#window_login_iframe").attr("src", webSiteShareData.windowLoginUrl);
		$("#window_login_around_mask").show();
		commonModule.adjustLoginWindow()
	},
	adjustLoginWindow: function() {
		if ($("#window_login_around_mask:visible").length == 1) {
			var a = $("#window_login_around_mask");
			a.height($(document).height());
			a.width($(document).width());
			var d = ($(window).height() - $("#window_login_main_div").height()) / 2;
			var c = ($(window).width() - $("#window_login_main_div").width()) / 2;
			var b = $(document).scrollTop();
			var e = $(document).scrollLeft();
			$("#window_login_main_div").css({
				position: "absolute",
				top: d + b,
				left: c + e
			})
		}
	},
	hideHint: function() {
		var a = "cookie";
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/hideHintJsonp.html?callback='loadHideHintData'&hideHint=" + a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(b) {},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		});
		$("#hint").css("display", "none")
	},
	gotoVisit: function() {
		var a = "session";
		$.ajax({
			type: "GET",
			url: webSiteShareData.lcMallContextPath + "/hideHintJsonp.html?callback='loadHideHintData'&hideHint=" + a,
			dataType: "jsonp",
			timeout: 15000,
			success: function(b) {},
			error: function() {
				commonModule.alertFail(constantModule.errorPrompt)
			}
		});
		$("#hint").css("display", "none")
	},
	ieTest: function() {
		var b = window.navigator.userAgent.toLowerCase();
		if (b.indexOf("msie") >= 0) {
			var a = b.match(/msie ([\d.]+)/)[1];
			if (a < 9) {
				$.ajax({
					type: "GET",
					url: "/isShowHintJsonp.html?callback='loadShowHintData'&_=" + Math.ceil(Math.random() * 1000000),
					dataType: "jsonp",
					timeout: 15000,
					success: function(c) {
						if (c && c.version_hint == "yes") {
							$("#hint").show();
							$("#ieTestTmpl").tmpl().appendTo("#hint")
						}
					},
					error: function() {}
				})
			}
		}
	},
	navCatalogEvent: function() {
		$(".nav .sort").mouseenter(function() {
			var a = $(this).width() - 2;
			$("#noIndex").show().css("width", a + "px");
			$(".nav_bd .catalog_icon").addClass("active")
		}).mouseleave(function() {
			$("#noIndex").hide();
			$(".nav_bd .catalog_icon").removeClass("active")
		})
	},
	isStrEmpty: function(a) {
		if ($.trim(a) == "") {
			return true
		}
		return false
	},
	isDigit: function(b) {
		if (b != null || b.length == 1) {
			var a = "1234567890";
			if (a.indexOf(b) != -1) {
				return true
			}
		}
		return false
	},
	isInteger: function(b) {
		for (var a = 0; a < b.length; a++) {
			if (!commonModule.isDigit(b.charAt(a))) {
				return false
			}
		}
		return true
	},
	getOperCode: function() {
		var c = window.location.search;
		if (!c) {
			return null
		}
		c = c.substr(1);
		var b = c.split("&");
		for (var a = 0; a < b.length; a++) {
			if (b[a].length > 2 && b[a][0] === "c" && b[a][1] === "=") {
				return b[a].substr(2)
			}
		}
		return null
	}
};

function autoRefreshLoginInfo(e, g, a) {
	commonModule.isICMember = a;
	var f = "";
	var d = "";
	var b = "";
	if (e == null || e == "") {
		return
	}
	var c = webSiteShareData.lcMallContextPath + "/member/hiddenAutoLoginJsonp.html?callback='loadLcMallAutoLoginData'";
	$.ajax({
		type: "GET",
		url: c,
		dataType: "jsonp",
		timeout: 15000,
		success: function(h) {}
	});
	if (g != undefined && g != null && g != "null" && g != "") {
		if (g.length <= 7) {
			b = g
		} else {
			b = g.slice(0, 6) + "..."
		}
		d = b + "(" + e + ")";
		f = g
	} else {
		b = e;
		d = e;
		f = e
	}
	$("#custom").show().text(d);
	$("#custom").attr("title", e);
	$("#login").hide();
	$("#register").hide();
	$(".member_list dt").hide();
	$(".hello ul").eq(0).hide();
	$(".hello ul").eq(1).show();
	$(".hello ul").eq(1).children().eq(0).children("a").text(b);
	$(".logout").show();
	$(".reg span").text("欢迎您：");
	if (webSiteShareData.detailsFlag) {
		productGuideModule.loadProductGuide()
	}
}

function responseLogin(b) {
	hideWindowLogin();
	var a = webSiteShareData.lcMallContextPath + "/member/hiddenAutoLoginJsonp.html?callback='loadLcMallAutoLoginData'";
	$.ajax({
		type: "GET",
		url: a,
		dataType: "jsonp",
		timeout: 15000,
		success: function(d) {
			autoRefreshLoginInfo(b.customerCode, b.nickName);
			if (commonModule.responseLoginMask == "ProductSales") {
				productListModule.showThisProductSaleRecord.apply(productListModule, commonModule.showLoginParams)
			}
			if (commonModule.responseLoginMask == "ArriveNotify") {
				productListModule.showAddNotifyDiv.apply(productListModule, commonModule.showLoginParams)
			}
			if (commonModule.responseLoginMask == "PutProductInCart") {
				var c = commonModule.showLoginParams[0];
				c.method.apply(c.method, c.param)
			}
		}
	})
}

function hideWindowLogin() {
	$("#window_login_around_mask").hide()
}
Number.prototype.basicRound = function(e, a) {
	var d = new String(Math.round(this * Math.pow(10, e)) / Math.pow(10, e));
	if (a) {
		d += ""
	} else {
		if (e > 0) {
			if (d.indexOf(".") < 0) {
				d += "."
			}
			var f = d.split(".");
			for (var c = 0, b = e - f[1].length; c < b; c++) {
				d += "0"
			}
		}
	}
	return d
};
if (DWREngine == null) {
	var DWREngine = {}
}
DWREngine.setErrorHandler = function(a) {
	DWREngine._errorHandler = a
};
DWREngine.setWarningHandler = function(a) {
	DWREngine._warningHandler = a
};
DWREngine.setTimeout = function(a) {
	DWREngine._timeout = a
};
DWREngine.setPreHook = function(a) {
	DWREngine._preHook = a
};
DWREngine.setPostHook = function(a) {
	DWREngine._postHook = a
};
DWREngine.XMLHttpRequest = 1;
DWREngine.IFrame = 2;
DWREngine.setMethod = function(a) {
	if (a != DWREngine.XMLHttpRequest && a != DWREngine.IFrame) {
		DWREngine._handleError("Remoting method must be one of DWREngine.XMLHttpRequest or DWREngine.IFrame");
		return
	}
	DWREngine._method = a
};
DWREngine.setVerb = function(a) {
	if (a != "GET" && a != "POST") {
		DWREngine._handleError("Remoting verb must be one of GET or POST");
		return
	}
	DWREngine._verb = a
};
DWREngine.setOrdered = function(a) {
	DWREngine._ordered = a
};
DWREngine.setAsync = function(a) {
	DWREngine._async = a
};
DWREngine.setTextHtmlHandler = function(a) {
	DWREngine._textHtmlHandler = a
};
DWREngine.defaultMessageHandler = function(a) {
	if (typeof a == "object" && a.name == "Error" && a.description) {
		alert("Error: " + a.description)
	} else {
		if (a.toString().indexOf("0x80040111") == -1) {}
	}
};
DWREngine.beginBatch = function() {
	if (DWREngine._batch) {
		DWREngine._handleError("Batch already started.");
		return
	}
	DWREngine._batch = {
		map: {
			callCount: 0
		},
		paramCount: 0,
		ids: [],
		preHooks: [],
		postHooks: []
	}
};
DWREngine.endBatch = function(b) {
	var a = DWREngine._batch;
	if (a == null) {
		DWREngine._handleError("No batch in progress.");
		return
	}
	if (b && b.preHook) {
		a.preHooks.unshift(b.preHook)
	}
	if (b && b.postHook) {
		a.postHooks.push(b.postHook)
	}
	if (DWREngine._preHook) {
		a.preHooks.unshift(DWREngine._preHook)
	}
	if (DWREngine._postHook) {
		a.postHooks.push(DWREngine._postHook)
	}
	if (a.method == null) {
		a.method = DWREngine._method
	}
	if (a.verb == null) {
		a.verb = DWREngine._verb
	}
	if (a.async == null) {
		a.async = DWREngine._async
	}
	if (a.timeout == null) {
		a.timeout = DWREngine._timeout
	}
	a.completed = false;
	DWREngine._batch = null;
	if (!DWREngine._ordered) {
		DWREngine._sendData(a);
		DWREngine._batches[DWREngine._batches.length] = a
	} else {
		if (DWREngine._batches.length == 0) {
			DWREngine._sendData(a);
			DWREngine._batches[DWREngine._batches.length] = a
		} else {
			DWREngine._batchQueue[DWREngine._batchQueue.length] = a
		}
	}
};
DWREngine._errorHandler = DWREngine.defaultMessageHandler;
DWREngine._warningHandler = null;
DWREngine._preHook = null;
DWREngine._postHook = null;
DWREngine._batches = [];
DWREngine._batchQueue = [];
DWREngine._handlersMap = {};
DWREngine._method = DWREngine.XMLHttpRequest;
DWREngine._verb = "POST";
DWREngine._ordered = false;
DWREngine._async = true;
DWREngine._batch = null;
DWREngine._timeout = 0;
DWREngine._DOMDocument = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];
DWREngine._XMLHTTP = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
DWREngine._execute = function(o, d, m, l) {
	var h = false;
	if (DWREngine._batch == null) {
		DWREngine.beginBatch();
		h = true
	}
	var k = [];
	for (var g = 0; g < arguments.length - 3; g++) {
		k[g] = arguments[g + 3]
	}
	if (DWREngine._batch.path == null) {
		DWREngine._batch.path = o
	} else {
		if (DWREngine._batch.path != o) {
			DWREngine._handleError("Can't batch requests to multiple DWR Servlets.");
			return
		}
	}
	var f;
	var c;
	var e = k[0];
	var n = k[k.length - 1];
	if (typeof e == "function") {
		c = {
			callback: k.shift()
		};
		f = k
	} else {
		if (typeof n == "function") {
			c = {
				callback: k.pop()
			};
			f = k
		} else {
			if (n != null && typeof n == "object" && n.callback != null && typeof n.callback == "function") {
				c = k.pop();
				f = k
			} else {
				if (e == null) {
					if (n == null && k.length > 2) {
						DWREngine._handleError("Ambiguous nulls at start and end of parameter list. Which is the callback function?")
					}
					c = {
						callback: k.shift()
					};
					f = k
				} else {
					if (n == null) {
						c = {
							callback: k.pop()
						};
						f = k
					} else {
						DWREngine._handleError("Missing callback function or metadata object.");
						return
					}
				}
			}
		}
	}
	var b = Math.floor(Math.random() * 10001);
	var a = (b + "_" + new Date().getTime()).toString();
	var j = "c" + DWREngine._batch.map.callCount + "-";
	DWREngine._batch.ids.push(a);
	if (c.method != null) {
		DWREngine._batch.method = c.method;
		delete c.method
	}
	if (c.verb != null) {
		DWREngine._batch.verb = c.verb;
		delete c.verb
	}
	if (c.async != null) {
		DWREngine._batch.async = c.async;
		delete c.async
	}
	if (c.timeout != null) {
		DWREngine._batch.timeout = c.timeout;
		delete c.timeout
	}
	if (c.preHook != null) {
		DWREngine._batch.preHooks.unshift(c.preHook);
		delete c.preHook
	}
	if (c.postHook != null) {
		DWREngine._batch.postHooks.push(c.postHook);
		delete c.postHook
	}
	if (c.errorHandler == null) {
		c.errorHandler = DWREngine._errorHandler
	}
	if (c.warningHandler == null) {
		c.warningHandler = DWREngine._warningHandler
	}
	DWREngine._handlersMap[a] = c;
	DWREngine._batch.map[j + "scriptName"] = d;
	DWREngine._batch.map[j + "methodName"] = m;
	DWREngine._batch.map[j + "id"] = a;
	for (g = 0; g < f.length; g++) {
		DWREngine._serializeAll(DWREngine._batch, [], f[g], j + "param" + g)
	}
	DWREngine._batch.map.callCount++;
	if (h) {
		DWREngine.endBatch()
	}
};
DWREngine._sendData = function(e) {
	if (e.map.callCount == 0) {
		return
	}
	for (var d = 0; d < e.preHooks.length; d++) {
		e.preHooks[d]()
	}
	e.preHooks = null;
	if (e.timeout && e.timeout != 0) {
		e.interval = setInterval(function() {
			DWREngine._abortRequest(e)
		}, e.timeout)
	}
	var g;
	if (e.map.callCount == 1) {
		g = e.map["c0-scriptName"] + "." + e.map["c0-methodName"] + ".dwr"
	} else {
		g = "Multiple." + e.map.callCount + ".dwr"
	}
	if (e.method == DWREngine.XMLHttpRequest) {
		if (window.XMLHttpRequest) {
			e.req = new XMLHttpRequest()
		} else {
			if (window.ActiveXObject && !(navigator.userAgent.indexOf("Mac") >= 0 && navigator.userAgent.indexOf("MSIE") >= 0)) {
				e.req = DWREngine._newActiveXObject(DWREngine._XMLHTTP)
			}
		}
	}
	var k = "";
	var a;
	if (e.req) {
		e.map.xml = "true";
		if (e.async) {
			e.req.onreadystatechange = function() {
				DWREngine._stateChange(e)
			}
		}
		var b = navigator.userAgent.indexOf("Safari/");
		if (b >= 0) {
			var h = navigator.userAgent.substring(b + 7);
			if (parseInt(h, 10) < 400) {
				e.verb == "GET"
			}
		}
		if (e.verb == "GET") {
			e.map.callCount = "" + e.map.callCount;
			for (a in e.map) {
				var c = encodeURIComponent(a);
				var l = encodeURIComponent(e.map[a]);
				if (l == "") {
					DWREngine._handleError("Found empty qval for qkey=" + c)
				}
				k += c + "=" + l + "&"
			}
			try {
				e.req.open("GET", e.path + "/exec/" + g + "?" + k, e.async);
				e.req.send(null);
				if (!e.async) {
					DWREngine._stateChange(e)
				}
			} catch (j) {
				DWREngine._handleMetaDataError(null, j)
			}
		} else {
			for (a in e.map) {
				if (typeof e.map[a] != "function") {
					k += a + "=" + e.map[a] + "\n"
				}
			}
			try {
				e.req.open("POST", e.path + "/exec/" + g, e.async);
				e.req.setRequestHeader("Content-Type", "text/plain");
				e.req.send(k);
				if (!e.async) {
					DWREngine._stateChange(e)
				}
			} catch (j) {
				DWREngine._handleMetaDataError(null, j)
			}
		}
	} else {
		e.map.xml = "false";
		var f = "dwr-if-" + e.map["c0-id"];
		e.div = document.createElement("div");
		e.div.innerHTML = "<iframe src='javascript:void(0)' frameborder='0' width='0' height='0' id='" + f + "' name='" + f + "'></iframe>";
		document.body.appendChild(e.div);
		e.iframe = document.getElementById(f);
		e.iframe.setAttribute("style", "width:0px; height:0px; border:0px;");
		if (e.verb == "GET") {
			for (a in e.map) {
				if (typeof e.map[a] != "function") {
					k += encodeURIComponent(a) + "=" + encodeURIComponent(e.map[a]) + "&"
				}
			}
			k = k.substring(0, k.length - 1);
			e.iframe.setAttribute("src", e.path + "/exec/" + g + "?" + k);
			document.body.appendChild(e.iframe)
		} else {
			e.form = document.createElement("form");
			e.form.setAttribute("id", "dwr-form");
			e.form.setAttribute("action", e.path + "/exec" + g);
			e.form.setAttribute("target", f);
			e.form.target = f;
			e.form.setAttribute("method", "POST");
			for (a in e.map) {
				var m = document.createElement("input");
				m.setAttribute("type", "hidden");
				m.setAttribute("name", a);
				m.setAttribute("value", e.map[a]);
				e.form.appendChild(m)
			}
			document.body.appendChild(e.form);
			e.form.submit()
		}
	}
};
DWREngine._stateChange = function(batch) {
	if (!batch.completed && batch.req.readyState == 4) {
		try {
			var reply = batch.req.responseText;
			if (reply == null || reply == "") {
				DWREngine._handleMetaDataWarning(null, "No data received from server")
			} else {
				var contentType = batch.req.getResponseHeader("Content-Type");
				if (!contentType.match(/^text\/plain/) && !contentType.match(/^text\/javascript/)) {
					if (DWREngine._textHtmlHandler && contentType.match(/^text\/html/)) {
						DWREngine._textHtmlHandler()
					} else {
						DWREngine._handleMetaDataWarning(null, "Invalid content type from server: '" + contentType + "'")
					}
				} else {
					if (reply.search("DWREngine._handle") == -1) {
						DWREngine._handleMetaDataWarning(null, "Invalid reply from server")
					} else {
						eval(reply)
					}
				}
			}
			DWREngine._clearUp(batch)
		} catch (ex) {
			if (ex == null) {
				ex = "Unknown error occured"
			}
			DWREngine._handleMetaDataWarning(null, ex)
		} finally {
			if (DWREngine._batchQueue.length != 0) {
				var sendbatch = DWREngine._batchQueue.shift();
				DWREngine._sendData(sendbatch);
				DWREngine._batches[DWREngine._batches.length] = sendbatch
			}
		}
	}
};
DWREngine._handleResponse = function(e, d) {
	var a = DWREngine._handlersMap[e];
	DWREngine._handlersMap[e] = null;
	if (a) {
		try {
			if (a.callback) {
				a.callback(d)
			}
		} catch (c) {
			DWREngine._handleMetaDataError(a, c)
		}
	}
	if (DWREngine._method == DWREngine.IFrame) {
		var b = DWREngine._batches[DWREngine._batches.length - 1];
		if (b.map["c" + (b.map.callCount - 1) + "-id"] == e) {
			DWREngine._clearUp(b)
		}
	}
};
DWREngine._handleServerError = function(c, b) {
	var a = DWREngine._handlersMap[c];
	DWREngine._handlersMap[c] = null;
	if (b.message) {
		DWREngine._handleMetaDataError(a, b.message, b)
	} else {
		DWREngine._handleMetaDataError(a, b)
	}
};
DWREngine._eval = function(script) {
	return eval(script)
};
DWREngine._abortRequest = function(b) {
	if (b && !b.completed) {
		clearInterval(b.interval);
		DWREngine._clearUp(b);
		if (b.req) {
			b.req.abort()
		}
		var a;
		for (var c = 0; c < b.ids.length; c++) {
			a = DWREngine._handlersMap[b.ids[c]];
			DWREngine._handleMetaDataError(a, "Timeout")
		}
	}
};
DWREngine._clearUp = function(a) {
	if (a.completed) {
		DWREngine._handleError("Double complete");
		return
	}
	if (a.div) {
		a.div.parentNode.removeChild(a.div)
	}
	if (a.iframe) {
		a.iframe.parentNode.removeChild(a.iframe)
	}
	if (a.form) {
		a.form.parentNode.removeChild(a.form)
	}
	if (a.req) {
		delete a.req
	}
	for (var b = 0; b < a.postHooks.length; b++) {
		a.postHooks[b]()
	}
	a.postHooks = null;
	for (var b = 0; b < DWREngine._batches.length; b++) {
		if (DWREngine._batches[b] == a) {
			DWREngine._batches.splice(b, 1);
			break
		}
	}
	a.completed = true
};
DWREngine._handleError = function(b, a) {
	if (DWREngine._errorHandler) {
		DWREngine._errorHandler(b, a)
	}
};
DWREngine._handleWarning = function(b, a) {
	if (DWREngine._warningHandler) {
		DWREngine._warningHandler(b, a)
	}
};
DWREngine._handleMetaDataError = function(a, c, b) {
	if (a && typeof a.errorHandler == "function") {
		a.errorHandler(c, b)
	} else {
		DWREngine._handleError(c, b)
	}
};
DWREngine._handleMetaDataWarning = function(a, c, b) {
	if (a && typeof a.warningHandler == "function") {
		a.warningHandler(c, b)
	} else {
		DWREngine._handleWarning(c, b)
	}
};
DWREngine._serializeAll = function(b, d, c, a) {
	if (c == null) {
		b.map[a] = "null:null";
		return
	}
	switch (typeof c) {
		case "boolean":
			b.map[a] = "boolean:" + c;
			break;
		case "number":
			b.map[a] = "number:" + c;
			break;
		case "string":
			b.map[a] = "string:" + encodeURIComponent(c);
			break;
		case "object":
			if (c instanceof String) {
				b.map[a] = "String:" + encodeURIComponent(c)
			} else {
				if (c instanceof Boolean) {
					b.map[a] = "Boolean:" + c
				} else {
					if (c instanceof Number) {
						b.map[a] = "Number:" + c
					} else {
						if (c instanceof Date) {
							b.map[a] = "Date:" + c.getTime()
						} else {
							if (c instanceof Array) {
								b.map[a] = DWREngine._serializeArray(b, d, c, a)
							} else {
								b.map[a] = DWREngine._serializeObject(b, d, c, a)
							}
						}
					}
				}
			}
			break;
		case "function":
			break;
		default:
			DWREngine._handleWarning("Unexpected type: " + typeof c + ", attempting default converter.");
			b.map[a] = "default:" + c;
			break
	}
};
DWREngine._lookup = function(e, c, a) {
	var d;
	for (var b = 0; b < e.length; b++) {
		if (e[b].data == c) {
			d = e[b];
			break
		}
	}
	if (d) {
		return "reference:" + d.name
	}
	e.push({
		data: c,
		name: a
	});
	return null
};
DWREngine._serializeObject = function(c, h, g, b) {
	var f = DWREngine._lookup(h, g, b);
	if (f) {
		return f
	}
	if (g.nodeName && g.nodeType) {
		return DWREngine._serializeXml(c, h, g, b)
	}
	var e = "Object:{";
	var d;
	for (d in g) {
		c.paramCount++;
		var a = "c" + DWREngine._batch.map.callCount + "-e" + c.paramCount;
		DWREngine._serializeAll(c, h, g[d], a);
		e += encodeURIComponent(d) + ":reference:" + a + ", "
	}
	if (e.substring(e.length - 2) == ", ") {
		e = e.substring(0, e.length - 2)
	}
	e += "}";
	return e
};
DWREngine._serializeXml = function(c, f, e, b) {
	var d = DWREngine._lookup(f, e, b);
	if (d) {
		return d
	}
	var a;
	if (window.XMLSerializer) {
		a = new XMLSerializer().serializeToString(e)
	} else {
		a = e.toXml
	}
	return "XML:" + encodeURIComponent(a)
};
DWREngine._serializeArray = function(c, h, g, b) {
	var f = DWREngine._lookup(h, g, b);
	if (f) {
		return f
	}
	var e = "Array:[";
	for (var d = 0; d < g.length; d++) {
		if (d != 0) {
			e += ","
		}
		c.paramCount++;
		var a = "c" + DWREngine._batch.map.callCount + "-e" + c.paramCount;
		DWREngine._serializeAll(c, h, g[d], a);
		e += "reference:";
		e += a
	}
	e += "]";
	return e
};
DWREngine._unserializeDocument = function(a) {
	var c;
	if (window.DOMParser) {
		var e = new DOMParser();
		c = e.parseFromString(a, "text/xml");
		if (!c.documentElement || c.documentElement.tagName == "parsererror") {
			var b = c.documentElement.firstChild.data;
			b += "\n" + c.documentElement.firstChild.nextSibling.firstChild.data;
			throw b
		}
		return c
	} else {
		if (window.ActiveXObject) {
			c = DWREngine._newActiveXObject(DWREngine._DOMDocument);
			c.loadXML(a);
			return c
		} else {
			var d = document.createElement("div");
			d.innerHTML = a;
			return d
		}
	}
};
DWREngine._newActiveXObject = function(a) {
	var d;
	for (var c = 0; c < a.length; c++) {
		try {
			d = new ActiveXObject(a[c]);
			break
		} catch (b) {}
	}
	return d
};

function DWRCommonMan() {}
DWRCommonMan._path = webSiteShareData.lcMallContextPath + "/dwr";
DWRCommonMan.saveVisitOnServer = function(c, a, b) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "saveVisitOnServer", c, a, false, false, b)
};
var visitModule = {
	init: function() {
		var d = {
			set: function(n, o, m) {
				var l = n + "=" + escape(o);
				if (m > 0) {
					var k = new Date();
					k.setTime(k.getTime() + m * 3600 * 1000);
					l += "; expires=" + k.toGMTString()
				}
				if (arguments[3]) {
					l += "; path=" + arguments[3]
				}
				document.cookie = l
			},
			get: function(n) {
				var l = document.cookie.split("; ");
				for (var m = 0; m < l.length; m++) {
					var k = l[m].split("=");
					if (escape(n) == k[0] && k[1]) {
						return k[1]
					}
				}
				return null
			},
			all: function() {
				var k = new Array();
				var m = document.cookie.split("; ");
				for (var n = 0; n < m.length; n++) {
					var l = m[n].split("=");
					k.push({
						key: l[0],
						value: l[1]
					})
				}
				return k
			},
			size: function() {
				return document.cookie.split("; ").length
			},
			clear: function(l) {
				var k = new Date();
				k.setTime(k.getTime() - 10000);
				document.cookie = l + "=''; expires=" + k.toGMTString() + "; path=" + arguments[1]
			},
			last: function(l) {
				var k = this.filter(l);
				return k[k.length - 1]
			},
			filter: function(p) {
				var k = new Array();
				var m = document.cookie.split("; ");
				for (var o = 0; o < m.length; o++) {
					var l = m[o].split("=");
					var n = l[0];
					if (escape(n).indexOf(p) == 0) {
						k.push({
							key: n,
							value: l[1]
						})
					}
				}
				return k
			}
		};
		Date.prototype.format = function(m) {
			var n = {
				"M+": this.getMonth() + 1,
				"d+": this.getDate(),
				"H+": this.getHours(),
				"h+": this.getHours(),
				"m+": this.getMinutes(),
				"s+": this.getSeconds(),
				"q+": Math.floor((this.getMonth() + 3) / 3),
				S: this.getMilliseconds()
			};
			if (/(y+)/.test(m)) {
				m = m.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
			}
			for (var l in n) {
				if (new RegExp("(" + l + ")").test(m)) {
					m = m.replace(RegExp.$1, (RegExp.$1.length == 1) ? n[l] : ("00" + n[l]).substr(("" + n[l]).length))
				}
			}
			return m
		};

		function j(m, k, p, l, r, o, q, n) {
			this.visitRecordId = m;
			this.storePrefix = k;
			this.visitType = p;
			this.visitType = l;
			this.targetUrl = r;
			this.localTime = o;
			this.systemTime = q;
			this.productId = n
		}
		var i = "lc.mall.cookie.visit.";
		var h = {
			X: "search.",
			Y: "product."
		};
		var f = {
			A: "global-search",
			B: "catalog-display",
			C: "catalog-search",
			D: "brand-search",
			E: "character-serach",
			F: "product-display",
			G: "other-common"
		};
		var c = {
			A: webSiteShareData.lcSoContextPath,
			B: "/catalog/",
			C: "/search/catalog_",
			D: "/search/brand.html",
			E: "/product/character_",
			F: webSiteShareData.lcItemContextPath + "/",
			G: "/so/details_"
		};

		function b(k) {
			var m = $.trim($("#vgahost").attr("host"));
			var k = $.trim(document.location.href.substring(m.length - 1));
			var l = {
				type: null,
				title: document.title,
				target: k,
				prefix: h.X,
				productId: null,
				loctime: parseInt(new Date().getTime() / 100) + "00"
			};
			if (k.indexOf(c.A) >= 0) {
				l.type = f.A
			} else {
				if (k.indexOf(c.B) >= 0) {
					l.type = f.B
				} else {
					if (k.indexOf(c.C) >= 0) {
						l.type = f.C
					} else {
						if (k.indexOf(c.D) >= 0) {
							l.target = c.D + "&queryProductBrandId=" + $("#queryProductBrandId").val() + "&queryProductBrandName=" + $("#queryProductBrandName").val() + "&queryProductBrandKeyWord=" + $("#queryProductBrandKeyWord").val();
							l.type = f.D
						} else {
							if (k.indexOf(c.E) >= 0) {
								l.type = f.E
							} else {
								if (k.indexOf(c.F) >= 0 || k.indexOf(c.G) >= 0) {
									l.type = f.F;
									l.productId = $("#logo").attr("data-product_id");
									l.prefix = h.Y
								} else {
									l.type = f.G
								}
							}
						}
					}
				}
			}
			return l
		}

		function a(o) {
			var n = i + o.prefix;
			var q = o.type + "," + o.target + ",";
			var p = d.filter(n);
			var k = true;
			for (var m = 0; m < p.length; m++) {
				var l = p[m];
				if (unescape(l.value).indexOf(q) > -1) {
					k = false;
					d.clear(l.key, "/");
					break
				}
			}
			var r = 6;
			if (o.type == f.F) {
				r = 9
			}
			if (p.length >= r && k) {
				d.clear(p[0].key, "/")
			}
			d.set(n + o.loctime, q + o.loctime, 15 * 24, "/")
		}

		function g(p) {
			var q = new j();
			q.storePrefix = p.prefix;
			q.visitType = p.type;
			q.visitTitle = p.title;
			q.targetUrl = p.target;
			q.localTime = p.loctime;
			q.productId = p.productId;
			var n = $.param(q);
			var m = "lc.mall.global.visit.control.";
			var r = m + new Date().format("yyyy.MM.dd");
			var l = "false";
			if (!d.get(r)) {
				l = "true";
				var s = d.filter(m);
				for (var o = 0; o < s.length; o++) {
					d.clear(s[o].key, "/")
				}
				d.set(r, "OK", 7 * 24, "/")
			}
			var k = webSiteShareData.lcMallContextPath + "/order/OrderCommonAction!saveVisitOnServerJsonp.action?callback='loadVisitData'&" + n + "&newVisit=" + l;
			$.ajax({
				type: "GET",
				url: k,
				dataType: "jsonp",
				timeout: 15000,
				success: function(u) {
					var t = u.msg.split(";");
					if (t.length == 3) {
						if (t[0] == "success" && t[1].length > 0 && t[2].length > 0) {
							d.set(t[1], t[2], 7 * 24, "/")
						}
					}
				}
			})
		}

		function e() {
			var k = b();
			if (k) {
				if (k.type != f.G) {
					a(k)
				}
				g(k)
			}
		}
		e()
	}
};
visitModule.init();
DWRCommonMan.commonCheckProducByProductId = function(c, a, b) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "commonCheckProducByProductId", c, a, b)
};
DWRCommonMan.getCatalogParamText = function(b, a) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "getCatalogParamText", b, a)
};
DWRCommonMan.calcNumbersAllowedBuy = function(c, a, b) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "calcNumbersAllowedBuy", c, a, false, b)
};
DWRCommonMan.sendProductIntroduceEmail = function(e, c, b, a, d) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "sendProductIntroduceEmail", e, c, b, a, false, d)
};
DWRCommonMan.validateCustomerLogin = function(a) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "validateCustomerLogin", false, a)
};
DWRCommonMan.insertProductFavoriteRecord = function(b, a) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "insertProductFavoriteRecord", b, false, a)
};
DWRCommonMan.putProductListIntoCart = function(c, a, b) {
	DWREngine._execute(DWRCommonMan._path, "DWRCommonMan", "putProductListIntoCart", c, a, false, false, b)
};

function OverseasBrokageMan() {}
OverseasBrokageMan._path = "/dwr";
OverseasBrokageMan.saveOverseasProductIntoCar = function(d, b, a, c) {
	DWREngine._execute(OverseasBrokageMan._path, "OverseasBrokageMan", "saveOverseasProductIntoCar", d, b, a, false, c)
};
OverseasBrokageMan.checkIsExsitProductInfoOfOversea = function(b, a) {
	DWREngine._execute(OverseasBrokageMan._path, "OverseasBrokageMan", "checkIsExsitProductInfoOfOversea", b, false, a)
};