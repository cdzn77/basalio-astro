import { t as e } from "./rolldown-runtime.blwatvxf.mjs";
import { A as t, D as n, I as r, M as i, N as a, V as o, c as s, d as c, l, p as u, s as d, u as f, v as p, x as ee, z as m } from "./react.p9wvsw7c.mjs";
import { S as h, a as g, r as _, t as v } from "./motion.dmld-do.mjs";
import { B as y, Ct as b, D as x, Dt as S, E as te, Et as C, N as w, O as T, S as E, St as ne, T as D, a as O, at as re, b as ie, ct as k, d as A, et as j, ft as M, g as ae, ht as oe, i as N, it as se, j as P, lt as ce, mt as le, n as ue, o as F, q as I, r as de, ut as fe, vt as pe, x as L, xt as me, yt as he, z as R } from "./framer.ce8ktlrq.mjs";
import { a as ge, i as _e, n as ve, o as ye, r as be, t as xe } from "./shared-lib.luvlxjti.mjs";
import { n as Se, t as Ce } from "./zmbraubtu.bik5i1z0.mjs";
import { i as we, n as Te, r as Ee, t as De } from "./fsubtplwb.xjuiynho.mjs";
import { i as Oe, r as ke } from "./tjhdfhvyt.dk7ddcdt.mjs";
import { i as Ae, n as je, r as Me, t as Ne } from "./rvtlpq7dr.demhmmdq.mjs";
import { n as Pe, t as Fe } from "./ca2wdshgd.d089hlv6.mjs";
import { n as Ie, t as Le } from "./unfocused.csdpqdc8.mjs";
import { a as Re, i as ze, n as Be, o as Ve, r as He, t as Ue } from "./ahp7wipee.bq7tg5ly.mjs";
import { n as We, r as Ge } from "./vwdwhxptk.co-akubh.mjs";

function Ke(e) { return new DataView(e.buffer, e.byteOffset, e.byteLength) }

function z(e, ...t) { if (!e) throw Error(`Assertion Error` + (t.length > 0 ? `: ` + t.join(` `) : ``)) }

function qe(e) { throw Error(`Unexpected value: ${e}`) }

function Je(e) { return typeof e == `string` }

function B(e) { return Number.isFinite(e) }

function Ye(e) { return e === null }

function Xe(e) { if (Ye(e)) return 0; switch (e.type) {
		case F.Array:
			return 1;
		case F.Boolean:
			return 2;
		case F.Color:
			return 3;
		case F.Date:
			return 4;
		case F.Enum:
			return 5;
		case F.File:
			return 6;
		case F.ResponsiveImage:
			return 10;
		case F.Link:
			return 7;
		case F.Number:
			return 8;
		case F.Object:
			return 9;
		case F.RichText:
			return 11;
		case F.String:
			return 12;
		case F.VectorSetItem:
			return 13;
		default:
			qe(e) } }

function Ze(e) { let t = e.readUint16(),
		n = []; for (let r = 0; r < t; r++) { let t = V.read(e);
		n.push(t) } return { type: F.Array, value: n } }

function Qe(e, t) { for (let n of (e.writeUint16(t.value.length), t.value)) V.write(e, n) }

function $e(e, t, n) { let r = e.value.length,
		i = t.value.length; if (r < i) return -1; if (r > i) return 1; for (let i = 0; i < r; i++) { let r = e.value[i],
			a = t.value[i],
			o = V.compare(r, a, n); if (o !== 0) return o } return 0 }

function et(e) { return { type: F.Boolean, value: e.readUint8() !== 0 } }

function tt(e, t) { e.writeUint8(t.value ? 1 : 0) }

function nt(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function rt(e) { return { type: F.Color, value: e.readString() } }

function it(e, t) { e.writeString(t.value) }

function at(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function ot(e) { let t = e.readInt64(),
		n = new Date(t); return { type: F.Date, value: n.toISOString() } }

function st(e, t) { let n = new Date(t.value).getTime();
	e.writeInt64(n) }

function ct(e, t) { let n = new Date(e.value),
		r = new Date(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function lt(e) { return { type: F.Enum, value: e.readString() } }

function ut(e, t) { e.writeString(t.value) }

function dt(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function ft(e) { return { type: F.File, value: e.readString() } }

function pt(e, t) { e.writeString(t.value) }

function mt(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function ht(e) { return { type: F.Link, value: e.readJson() } }

function gt(e, t) { e.writeJson(t.value) }

function _t(e, t) { let n = JSON.stringify(e.value),
		r = JSON.stringify(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function vt(e) { return { type: F.Number, value: e.readFloat64() } }

function yt(e, t) { e.writeFloat64(t.value) }

function bt(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function xt(e) { let t = e.readUint16(),
		n = {}; for (let r = 0; r < t; r++) { let t = e.readString();
		n[t] = V.read(e) } return { type: F.Object, value: n } }

function St(e, t) { let n = Object.entries(t.value); for (let [t, r] of(e.writeUint16(n.length), n)) e.writeString(t), V.write(e, r) }

function Ct(e, t, n) { let r = Object.keys(e.value).sort(),
		i = Object.keys(t.value).sort(); if (r.length < i.length) return -1; if (r.length > i.length) return 1; for (let a = 0; a < r.length; a++) { let o = r[a],
			s = i[a]; if (o < s) return -1; if (o > s) return 1; let c = e.value[o] ?? null,
			l = t.value[s] ?? null,
			u = V.compare(c, l, n); if (u !== 0) return u } return 0 }

function wt(e) { return { type: F.ResponsiveImage, value: e.readJson() } }

function Tt(e, t) { e.writeJson(t.value) }

function Et(e, t) { let n = JSON.stringify(e.value),
		r = JSON.stringify(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function Dt(e) { let t = e.readInt8(); if (t === 0) return { type: F.RichText, value: e.readUint32() }; if (t === 1) return { type: F.RichText, value: e.readString() }; throw Error(`Invalid rich text pointer`) }

function Ot(e, t) { if (B(t.value)) { e.writeInt8(0), e.writeUint32(t.value); return } if (Je(t.value)) { e.writeInt8(1), e.writeString(t.value); return } throw Error(`Invalid rich text pointer`) }

function kt(e, t) { let n = e.value,
		r = t.value; if (B(n) && B(r) || Je(n) && Je(r)) return n < r ? -1 : n > r ? 1 : 0; throw Error(`Invalid rich text pointer`) }

function At(e) { return { type: F.String, value: e.readString() } }

function jt(e, t) { e.writeString(t.value) }

function Mt(e, t, n) { let r = e.value,
		i = t.value; return n.type === 0 && (r = e.value.toLowerCase(), i = t.value.toLowerCase()), r < i ? -1 : r > i ? 1 : 0 }

function Nt(e) { return { type: F.VectorSetItem, value: e.readUint32() } }

function Pt(e, t) { e.writeUint32(t.value) }

function Ft(e, t) { let n = e.value,
		r = t.value; return n < r ? -1 : n > r ? 1 : 0 } async function It(e) { let t = Math.floor(nn * (Math.random() + 1) * 2 ** (e - 1));
	await new Promise(e => { setTimeout(e, t) }) } async function Lt(e, t) { let n = zt(t),
		r = [],
		i = 0; for (let e of n) r.push(`${e.from}-${e.to-1}`), i += e.to - e.from; let a = new URL(e),
		o = r.join(`,`);
	a.searchParams.set(`range`, o); let s = await an(a); if (s.status !== 200) throw Error(`Request failed: ${s.status} ${s.statusText}`); let c = await s.arrayBuffer(),
		l = new Uint8Array(c); if (l.length !== i) throw Error(`Request failed: Unexpected response length`); let u = new on,
		d = 0; for (let e of n) { let t = e.to - e.from,
			n = d + t,
			r = l.subarray(d, n);
		u.write(e.from, r), d = n } return t.map(e => u.read(e.from, e.to - e.from)) }

function Rt(e, t) { let n = e.length + t.length,
		r = new Uint8Array(n); return r.set(e, 0), r.set(t, e.length), r }

function zt(e) { z(e.length > 0, `Must have at least one range`); let t = [...e].sort((e, t) => e.from - t.from),
		n = []; for (let e of t) { let t = n.length - 1,
			r = n[t];
		r && e.from <= r.to ? n[t] = { from: r.from, to: Math.max(r.to, e.to) } : n.push(e) } return n }
var V, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, H, Xt, U, Zt, Qt, $t, en, W, tn, nn, rn, an, on, sn, cn, ln, un = e((() => { m(), I(), Bt = Object.create, Vt = Object.defineProperty, Ht = Object.getOwnPropertyDescriptor, Ut = Object.getOwnPropertyNames, Wt = Object.getPrototypeOf, Gt = Object.prototype.hasOwnProperty, Kt = (e, t, n) => t in e ? Vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, qt = (e, t) => function() { return t || (0, e[Ut(e)[0]])((t = { exports: {} }).exports, t), t.exports }, Jt = (e, t, n, r) => { if (t && typeof t == `object` || typeof t == `function`)
			for (let i of Ut(t)) Gt.call(e, i) || i === n || Vt(e, i, { get: () => t[i], enumerable: !(r = Ht(t, i)) || r.enumerable }); return e }, Yt = (e, t, n) => (n = e == null ? {} : Bt(Wt(e)), Jt(!t && e && e.__esModule ? n : Vt(n, `default`, { value: e, enumerable: !0 }), e)), H = (e, t, n) => Kt(e, typeof t == `symbol` ? t : t + ``, n), Xt = Yt(qt({ "../../../node_modules/dataloader/index.js"(e, t) { var n, r = function() {
					function e(e, t) { if (typeof e != `function`) throw TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but got: ` + e + `.`);
						this._batchLoadFn = e, this._maxBatchSize = function(e) { if (!(!e || !1 !== e.batch)) return 1; var t = e && e.maxBatchSize; if (t === void 0) return 1 / 0; if (typeof t != `number` || t < 1) throw TypeError(`maxBatchSize must be a positive number: ` + t); return t }(t), this._batchScheduleFn = function(e) { var t = e && e.batchScheduleFn; if (t === void 0) return i; if (typeof t != `function`) throw TypeError(`batchScheduleFn must be a function: ` + t); return t }(t), this._cacheKeyFn = function(e) { var t = e && e.cacheKeyFn; if (t === void 0) return function(e) { return e }; if (typeof t != `function`) throw TypeError(`cacheKeyFn must be a function: ` + t); return t }(t), this._cacheMap = function(e) { if (!(!e || !1 !== e.cache)) return null; var t = e && e.cacheMap; if (t === void 0) return new Map; if (t !== null) { var n = [`get`, `set`, `delete`, `clear`].filter(function(e) { return t && typeof t[e] != `function` }); if (n.length !== 0) throw TypeError(`Custom cacheMap missing methods: ` + n.join(`, `)) } return t }(t), this._batch = null, this.name = t && t.name ? t.name : null } var t = e.prototype; return t.load = function(e) { if (e == null) throw TypeError(`The loader.load() function must be called with a value, but got: ` + String(e) + `.`); var t = function(e) { var t = e._batch; if (t !== null && !t.hasDispatched && t.keys.length < e._maxBatchSize) return t; var n = { hasDispatched: !1, keys: [], callbacks: [] }; return e._batch = n, e._batchScheduleFn(function() {
									(function(e, t) { var n; if (t.hasDispatched = !0, t.keys.length === 0) { o(t); return } try { n = e._batchLoadFn(t.keys) } catch (n) { return a(e, t, TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function errored synchronously: ` + String(n) + `.`)) } if (!n || typeof n.then != `function`) return a(e, t, TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise: ` + String(n) + `.`));
										n.then(function(e) { if (!s(e)) throw TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array: ` + String(e) + `.`); if (e.length !== t.keys.length) throw TypeError(`DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.

Keys:
` + String(t.keys) + `

Values:
` + String(e));
											o(t); for (var n = 0; n < t.callbacks.length; n++) { var r = e[n];
												r instanceof Error ? t.callbacks[n].reject(r) : t.callbacks[n].resolve(r) } }).catch(function(n) { a(e, t, n) }) })(e, n) }), n }(this),
							n = this._cacheMap,
							r = this._cacheKeyFn(e); if (n) { var i = n.get(r); if (i) { var c = t.cacheHits ||= []; return new Promise(function(e) { c.push(function() { e(i) }) }) } } t.keys.push(e); var l = new Promise(function(e, n) { t.callbacks.push({ resolve: e, reject: n }) }); return n && n.set(r, l), l }, t.loadMany = function(e) { if (!s(e)) throw TypeError(`The loader.loadMany() function must be called with Array<key> but got: ` + e + `.`); for (var t = [], n = 0; n < e.length; n++) t.push(this.load(e[n]).catch(function(e) { return e })); return Promise.all(t) }, t.clear = function(e) { var t = this._cacheMap; if (t) { var n = this._cacheKeyFn(e);
							t.delete(n) } return this }, t.clearAll = function() { var e = this._cacheMap; return e && e.clear(), this }, t.prime = function(e, t) { var n = this._cacheMap; if (n) { var r, i = this._cacheKeyFn(e);
							n.get(i) === void 0 && (t instanceof Error ? (r = Promise.reject(t)).catch(function() {}) : r = Promise.resolve(t), n.set(i, r)) } return this }, e }(),
				i = typeof process == `object` && typeof process.nextTick == `function` ? function(e) { n ||= Promise.resolve(), n.then(function() { process.nextTick(e) }) } : typeof setImmediate == `function` ? function(e) { setImmediate(e) } : function(e) { setTimeout(e) };

			function a(e, t, n) { o(t); for (var r = 0; r < t.keys.length; r++) e.clear(t.keys[r]), t.callbacks[r].reject(n) }

			function o(e) { if (e.cacheHits)
					for (var t = 0; t < e.cacheHits.length; t++) e.cacheHits[t]() }

			function s(e) { return typeof e == `object` && !!e && typeof e.length == `number` && (e.length === 0 || e.length > 0 && Object.prototype.hasOwnProperty.call(e, e.length - 1)) } t.exports = r } })(), 1), U = { Uint8: 1, Uint16: 2, Uint32: 4, BigUint64: 8, Int8: 1, Int16: 2, Int32: 4, BigInt64: 8, Float32: 4, Float64: 8 }, Zt = class { getOffset() { return this.offset } ensureLength(e) { let t = this.bytes.length; if (!(this.offset + e <= t)) throw Error(`Reading out of bounds`) } readUint8() { let e = U.Uint8;
			this.ensureLength(e); let t = this.view.getUint8(this.offset); return this.offset += e, t } readUint16() { let e = U.Uint16;
			this.ensureLength(e); let t = this.view.getUint16(this.offset); return this.offset += e, t } readUint32() { let e = U.Uint32;
			this.ensureLength(e); let t = this.view.getUint32(this.offset); return this.offset += e, t } readUint64() { let e = this.readBigUint64(); return Number(e) } readBigUint64() { let e = U.BigUint64;
			this.ensureLength(e); let t = this.view.getBigUint64(this.offset); return this.offset += e, t } readInt8() { let e = U.Int8;
			this.ensureLength(e); let t = this.view.getInt8(this.offset); return this.offset += e, t } readInt16() { let e = U.Int16;
			this.ensureLength(e); let t = this.view.getInt16(this.offset); return this.offset += e, t } readInt32() { let e = U.Int32;
			this.ensureLength(e); let t = this.view.getInt32(this.offset); return this.offset += e, t } readInt64() { let e = this.readBigInt64(); return Number(e) } readBigInt64() { let e = U.BigInt64;
			this.ensureLength(e); let t = this.view.getBigInt64(this.offset); return this.offset += e, t } readFloat32() { let e = U.Float32;
			this.ensureLength(e); let t = this.view.getFloat32(this.offset); return this.offset += e, t } readFloat64() { let e = U.Float64;
			this.ensureLength(e); let t = this.view.getFloat64(this.offset); return this.offset += e, t } readBytes(e) { let t = this.offset,
				n = t + e,
				r = this.bytes.subarray(t, n); return this.offset = n, r } readString() { let e = this.readUint32(),
				t = this.readBytes(e); return this.decoder.decode(t) } readJson() { let e = this.readString(); return JSON.parse(e) } constructor(e) { this.bytes = e, H(this, `offset`, 0), H(this, `view`), H(this, `decoder`, new TextDecoder), this.view = Ke(this.bytes) } }, o !== void 0 && o.requestIdleCallback, Qt = e => 2 ** e - 1, $t = e => -(2 ** (e - 1)), en = e => 2 ** (e - 1) - 1, $t(8), $t(16), $t(32), -(BigInt(2) ** BigInt(63)), Qt(8), Qt(16), Qt(32), BigInt(2) ** BigInt(64) - BigInt(1), en(8), en(16), en(32), BigInt(2) ** BigInt(63) - BigInt(1), W = class e { static fromString(t) { let [n, r, i] = t.split(`/`).map(Number); return z(B(n), `Invalid chunkId`), z(B(r), `Invalid offset`), z(B(i), `Invalid length`), new e(n, r, i) } toString() { return `${this.chunkId}/${this.offset}/${this.length}` } static read(t) { return new e(t.readUint16(), t.readUint32(), t.readUint32()) } write(e) { e.writeUint16(this.chunkId), e.writeUint32(this.offset), e.writeUint32(this.length) } compare(e) { return this.chunkId < e.chunkId ? -1 : this.chunkId > e.chunkId ? 1 : this.offset < e.offset ? -1 : this.offset > e.offset ? 1 : (z(this.length === e.length), 0) } constructor(e, t, n) { this.chunkId = e, this.offset = t, this.length = n } }, (e => { e.read = function(e) { let t = e.readUint8(); switch (t) {
				case 0:
					return null;
				case 1:
					return Ze(e);
				case 2:
					return et(e);
				case 3:
					return rt(e);
				case 4:
					return ot(e);
				case 5:
					return lt(e);
				case 6:
					return ft(e);
				case 7:
					return ht(e);
				case 8:
					return vt(e);
				case 9:
					return xt(e);
				case 10:
					return wt(e);
				case 11:
					return Dt(e);
				case 12:
					return At(e);
				case 13:
					return Nt(e);
				default:
					qe(t) } }, e.write = function(e, t) { let n = Xe(t); if (e.writeUint8(n), !Ye(t)) switch (t.type) {
				case F.Array:
					return Qe(e, t);
				case F.Boolean:
					return tt(e, t);
				case F.Color:
					return it(e, t);
				case F.Date:
					return st(e, t);
				case F.Enum:
					return ut(e, t);
				case F.File:
					return pt(e, t);
				case F.Link:
					return gt(e, t);
				case F.Number:
					return yt(e, t);
				case F.Object:
					return St(e, t);
				case F.ResponsiveImage:
					return Tt(e, t);
				case F.RichText:
					return Ot(e, t);
				case F.VectorSetItem:
					return Pt(e, t);
				case F.String:
					return jt(e, t);
				default:
					qe(t) } }, e.compare = function(e, t, n) { let r = Xe(e),
				i = Xe(t); if (r < i) return -1; if (r > i) return 1; if (Ye(e) || Ye(t)) return 0; switch (e.type) {
				case F.Array:
					return z(t.type === F.Array), $e(e, t, n);
				case F.Boolean:
					return z(t.type === F.Boolean), nt(e, t);
				case F.Color:
					return z(t.type === F.Color), at(e, t);
				case F.Date:
					return z(t.type === F.Date), ct(e, t);
				case F.Enum:
					return z(t.type === F.Enum), dt(e, t);
				case F.File:
					return z(t.type === F.File), mt(e, t);
				case F.Link:
					return z(t.type === F.Link), _t(e, t);
				case F.Number:
					return z(t.type === F.Number), bt(e, t);
				case F.Object:
					return z(t.type === F.Object), Ct(e, t, n);
				case F.ResponsiveImage:
					return z(t.type === F.ResponsiveImage), Et(e, t);
				case F.RichText:
					return z(t.type === F.RichText), kt(e, t);
				case F.VectorSetItem:
					return z(t.type === F.VectorSetItem), Ft(e, t);
				case F.String:
					return z(t.type === F.String), Mt(e, t, n);
				default:
					qe(e) } } })(V ||= {}), tn = 3, nn = 250, rn = [408, 429, 500, 502, 503, 504], an = async (e, t) => { let n = 0; for (;;) { try { let r = await fetch(e, t); if (!rn.includes(r.status) || ++n > tn) return r } catch (e) { if (t?.signal?.aborted || ++n > tn) throw e } await It(n) } }, on = class { read(e, t) { for (let n of this.chunks) { if (e < n.start) break; if (e > n.end) continue; if (e + t > n.end) break; let r = e - n.start,
					i = r + t; return n.data.slice(r, i) } throw Error(`Missing data`) } write(e, t) { let n = e,
				r = n + t.length,
				i = 0,
				a = this.chunks.length; for (; i < a; i++) { let e = this.chunks[i]; if (z(e, `Missing chunk`), !(n > e.end)) { if (n > e.start) { let r = n - e.start;
						t = Rt(e.data.subarray(0, r), t), n = e.start } break } } for (; a > i; a--) { let e = this.chunks[a - 1]; if (z(e, `Missing chunk`), !(r < e.start)) { if (r < e.end) { let n = r - e.start,
							i = e.data.subarray(n);
						t = Rt(t, i), r = e.end } break } } let o = { start: n, end: r, data: t },
				s = a - i;
			this.chunks.splice(i, s, o) } constructor() { H(this, `chunks`, []) } }, sn = class e { static read(t) { let n = new e,
				r = t.readUint16(); for (let e = 0; e < r; e++) { let e = t.readString(),
					r = V.read(t);
				n.setField(e, r) } return n } write(e) { for (let [t, n] of(e.writeUint16(this.fields.size), this.fields)) e.writeString(t), V.write(e, n) } getData() { let e = {}; for (let [t, n] of this.fields) e[t] = n; return e } setField(e, t) { this.fields.set(e, t) } getField(e) { return this.fields.get(e) } constructor() { H(this, `fields`, new Map) } }, cn = class { scanItems() { return this.itemsPromise ??= an(this.url).then(async e => { if (!e.ok) throw Error(`Request failed: ${e.status} ${e.statusText}`); let t = await e.arrayBuffer(),
					n = new Zt(new Uint8Array(t)),
					r = [],
					i = n.readUint32(); for (let e = 0; e < i; e++) { let e = n.getOffset(),
						t = sn.read(n),
						i = n.getOffset() - e,
						a = new W(this.id, e, i).toString(),
						o = { pointer: a, data: t.getData() };
					this.itemLoader.prime(a, o), r.push(o) } return r }), this.itemsPromise } resolveItem(e) { return this.itemLoader.load(e) } constructor(e, t) { this.id = e, this.url = t, H(this, `itemsPromise`), H(this, `itemLoader`, new Xt.default(async e => { let t = e.map(e => { let t = W.fromString(e); return { from: t.offset, to: t.offset + t.length } }); return (await Lt(this.url, t)).map((t, n) => { let r = new Zt(t),
						i = sn.read(r),
						a = e[n]; return z(a, `Missing pointer`), { pointer: a, data: i.getData() } }) })) } }, ln = class { async scanItems() { return (await Promise.all(this.chunks.map(async e => e.scanItems()))).flat() } resolveItems(e) { return Promise.all(e.map(e => { let t = W.fromString(e),
					n = this.chunks[t.chunkId]; return z(n, `Missing chunk`), n.resolveItem(e) })) } compareItems(e, t) { let n = W.fromString(e.pointer),
				r = W.fromString(t.pointer); return n.compare(r) } compareValues(e, t, n) { return V.compare(e, t, n) } constructor(e) { this.options = e, H(this, `id`), H(this, `schema`), H(this, `indexes`), H(this, `resolveRichText`), H(this, `resolveVectorSetItem`), H(this, `chunks`), this.chunks = this.options.chunks.map((e, t) => new cn(t, e)), this.schema = e.schema, this.indexes = e.indexes, this.resolveRichText = e.resolveRichText, this.resolveVectorSetItem = e.resolveVectorSetItem, this.id = e.id } } }));

function dn(e) { return typeof e == `object` && !!e && !u(e) && mn in e }

function fn(e, ...t) { if (!e) throw Error(`Assertion Error` + (t.length > 0 ? `: ` + t.join(` `) : ``)) }

function pn(e) { let t = new Map; return n => { let i = t.get(n); if (i) return i; let a = function t(n) { switch (n[0]) {
				case 1: { let [, ...e] = n; return c(r, void 0, ...e.map(t)) }
				case 2: { let [, e, ...r] = n; return c(ae, e, ...r.map(t)) }
				case 3: { let [, r, i, a] = n; for (let e of a) { let n = i[e];
						n && (i[e] = t(n)) } let o = e[r]; return fn(o, `Module not found`), dn(o) && o.preload(), l(de, { componentIdentifier: r, children: e => l(o, { ...e, ...i }) }) }
				case 4: { let [, e, r, ...i] = n, a = i.map(t); return c(e === `a` ? h.a : e, r, ...a) }
				case 5: { let [, e] = n; return e } } }(JSON.parse(n)); return t.set(n, a), a } }
var G, mn, hn, gn = e((() => { m(), d(), I(), n(), o !== void 0 && o.requestIdleCallback, mn = `preload`, hn = ((G = hn || {})[G.Fragment = 1] = `Fragment`, G[G.Link = 2] = `Link`, G[G.Module = 3] = `Module`, G[G.Tag = 4] = `Tag`, G[G.Text = 5] = `Text`, G) })),
	_n, vn, yn, bn, xn, K, Sn = e((() => { I(), un(), gn(), _n = { bpiA3S2Kt: { isNullable: !0, type: F.String }, createdAt: { isNullable: !0, type: F.Date }, id: { isNullable: !1, type: F.String }, MIzIeBpZJ: { isNullable: !0, type: F.String }, nextItemId: { isNullable: !0, type: F.String }, previousItemId: { isNullable: !0, type: F.String }, updatedAt: { isNullable: !0, type: F.Date } }, vn = [], yn = e => { let t = vn[e]; if (t) return t().then(e => e.default) }, bn = pn({}), new E, xn = { collectionByLocaleId: { default: new ln({ chunks: [new URL("js/y_n5tdkoa-chunk-default-0.framercms", window.location.origin)], id: `8ee67dd7-d236-4ab4-87ad-02f04bf36a3bdefault`, indexes: [], resolveRichText: bn, resolveVectorSetItem: yn, schema: _n }) }, displayName: `Resource Price`, id: `8ee67dd7-d236-4ab4-87ad-02f04bf36a3b` }, K = xn, T(xn, { MIzIeBpZJ: { defaultValue: ``, title: `Title`, type: F.String }, bpiA3S2Kt: { preventLocalization: !1, title: `Slug`, type: F.String }, createdAt: { title: `Created`, type: F.Date }, updatedAt: { title: `Updated`, type: F.Date }, previousItemId: { dataIdentifier: `local-module:collection/y_N5tDKoa:default`, title: `Previous`, type: F.CollectionReference }, nextItemId: { dataIdentifier: `local-module:collection/y_N5tDKoa:default`, title: `Next`, type: F.CollectionReference } }) }));

function Cn(e, ...t) { let n = {}; return t?.forEach(t => t && Object.assign(n, e[t])), n }
var wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, q, Ln, Rn = e((() => { d(), I(), v(), n(), ye(), wn = C(h.div), Tn = S(C(h.div)), En = [`z_MuUBPCE`, `d3Gfu5obV`, `CVj9tovNX`], Dn = `framer-wEd8z`, On = { CVj9tovNX: `framer-v-1ycttvd`, d3Gfu5obV: `framer-v-1chxl90`, z_MuUBPCE: `framer-v-1cpot5t` }, kn = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, transition: { delay: 0, duration: .3, ease: [.44, 0, .56, 1], type: `tween` }, x: 0, y: 0 }, An = { opacity: .001, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 }, jn = { delay: 0, duration: 1, ease: [0, 0, 1, 1], type: `tween` }, Mn = { opacity: 1, rotate: 360, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 }, Nn = { Default: `z_MuUBPCE`, Hidden: `CVj9tovNX`, Loading: `d3Gfu5obV` }, Pn = h.create(r), Fn = ({ click: e, height: t, id: n, width: r, ...i }) => ({ ...i, variant: Nn[i.variant] ?? i.variant ?? `z_MuUBPCE`, Wld3NDzSj: e ?? i.Wld3NDzSj }), In = (e, t) => e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`), q = b(p(function(e, n) { let i = t(null),
			a = n ?? i,
			o = ee(),
			{ activeLocale: s, setLocale: c } = le();
		re(); let { style: u, className: d, layoutId: p, variant: m, Wld3NDzSj: g, ...v } = Fn(e), { baseVariant: y, classNames: b, clearLoadingGesture: x, gestureHandlers: S, gestureVariant: te, isLoading: C, setGestureState: w, setVariant: T, variants: E } = ne({ cycleOrder: En, defaultVariant: `z_MuUBPCE`, ref: a, variant: m, variantClassNames: On }), O = In(e, E), { activeVariantCallback: ie, delay: k } = se(y), A = ie(async (...e) => { if (w({ isPressed: !1 }), g && await g(...e) === !1) return !1 }), j = [be], M = () => y !== `CVj9tovNX`, ae = P(Dn, ...j), oe = () => y !== `d3Gfu5obV`, N = () => y === `d3Gfu5obV`; return l(_, { id: p ?? o, children: l(Pn, { animate: E, initial: !1, children: M() && f(h.button, { ...v, ...S, className: P(ae, `framer-1cpot5t`, d, b), "data-framer-name": `Default`, "data-highlight": !0, "data-reset": `button`, layoutDependency: O, layoutId: `z_MuUBPCE`, onTap: A, ref: a, style: { backgroundColor: `var(--token-2d34bfd8-b866-40b0-9c7f-80f38421ba05, rgb(235, 235, 235))`, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6, ...u }, ...Cn({ d3Gfu5obV: { "data-framer-name": `Loading` } }, y, te), children: [oe() && l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.p, { className: `framer-styles-preset-1yqs7cs`, "data-styles-preset": `FIoFviEj_`, dir: `auto`, style: { "--framer-text-color": `var(--extracted-r6o4lv, var(--token-2071f887-a813-449a-b145-01e2e3b7c695, rgb(0, 0, 0)))` }, children: `Load More` }) }), className: `framer-1to0w0l`, fonts: [`Inter`], layoutDependency: O, layoutId: `GEFhlJa4h`, style: { "--extracted-r6o4lv": `var(--token-2071f887-a813-449a-b145-01e2e3b7c695, rgb(0, 0, 0))` }, verticalAlignment: `top`, withExternalLayout: !0 }), N() && l(Tn, { __perspectiveFX: !1, __smartComponentFX: !0, __targetOpacity: 1, animate: kn, className: `framer-1hhwqrg`, "data-framer-appear-id": `1hhwqrg`, "data-framer-name": `Spinner`, initial: An, layoutDependency: O, layoutId: `B5dky6DVA`, optimized: !0, style: { mask: `url('../images/pgixyozq3me4cilnoitfe2l2fua.svg?width=20&height=20') alpha no-repeat center / cover add`, WebkitMask: `url('../images/pgixyozq3me4cilnoitfe2l2fua.svg?width=20&height=20') alpha no-repeat center / cover add` }, children: l(wn, { __framer__loop: Mn, __framer__loopEffectEnabled: !0, __framer__loopRepeatDelay: 0, __framer__loopRepeatType: `loop`, __framer__loopTransition: jn, __perspectiveFX: !1, __smartComponentFX: !0, __targetOpacity: 1, className: `framer-1bqfkh3`, "data-framer-name": `Conic`, layoutDependency: O, layoutId: `qCgl3eWre`, style: { background: `conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, rgb(255, 255, 255) 342deg)` }, children: l(h.div, { className: `framer-163xkbl`, "data-framer-name": `Round`, layoutDependency: O, layoutId: `h1gkG8FcN`, style: { backgroundColor: `rgb(255, 255, 255)`, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1 } }) }) })] }) }) }) }), [`@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`, `.framer-wEd8z.framer-1yi5o19, .framer-wEd8z .framer-1yi5o19 { display: block; }`, `.framer-wEd8z.framer-1cpot5t { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 40px; justify-content: center; padding: 0px 16px 0px 16px; position: relative; width: min-content; }`, `.framer-wEd8z .framer-1to0w0l { -webkit-user-select: none; flex: none; height: auto; position: relative; user-select: none; white-space: pre; width: auto; }`, `.framer-wEd8z .framer-1hhwqrg { aspect-ratio: 1 / 1; flex: none; gap: 10px; height: var(--framer-aspect-ratio-supported, 20px); overflow: visible; position: relative; width: 20px; }`, `.framer-wEd8z .framer-1bqfkh3 { bottom: 0px; flex: none; gap: 10px; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; }`, `.framer-wEd8z .framer-163xkbl { flex: none; height: 2px; left: calc(50.00000000000002% - 2px / 2); overflow: visible; position: absolute; top: 0px; width: 2px; }`, `.framer-wEd8z.framer-v-1chxl90.framer-1cpot5t { width: 140px; }`, ..._e], `framer-wEd8z`), Ln = q, q.displayName = `Load More Resources`, q.defaultProps = { height: 40, width: 139 }, T(q, { variant: { options: [`z_MuUBPCE`, `d3Gfu5obV`, `CVj9tovNX`], optionTitles: [`Default`, `Loading`, `Hidden`], title: `Variant`, type: F.Enum }, Wld3NDzSj: { title: `Click`, type: F.EventHandler } }), x(q, [{ explicitInter: !0, fonts: [{ cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`, url: `../images/5vvr9vy74if2i6bqbjvbw7sy1pq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`, url: `../images/eor0mi4hntlgwnn9if640ezzxco.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+1F00-1FFF`, url: `../images/y9k9qrlzaqio88klkmbd8vomqc.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0370-03FF`, url: `../images/oyrd2tbibpvojxiihnlooxny9m.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF`, url: `../images/jeywfuapfzhqheg8u5gtpdz7wq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`, url: `../images/grgckwrn6d3uz8ewclhzxwefc4.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB`, url: `../images/b6y37fthzealdunqhicbt6futy.woff2`, weight: `400` }] }, ...y(ge)], { supportsExplicitInterCodegen: !0 }) }));

function J(e, ...t) { let n = {}; return t?.forEach(t => t && Object.assign(n, e[t])), n }
var zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Y, X, Yn, Xn, Zn, Qn, $n, er, tr, nr, rr, Z, ir, ar, or, sr, cr, lr, Q, ur, dr = e((() => { d(), I(), v(), n(), Ie(), ke(), Sn(), Re(), ze(), we(), Rn(), Se(), zn = R(Ce), Bn = C(te), Vn = R(Le), Hn = C(h.a), Un = R(Ln), Wn = [`R7WknvXWX`, `rUDSlx6QU`, `qHeOimhOs`, `mMNPzEabC`, `iqItsUotZ`, `o8Bozf2XL`], Gn = `framer-XSrRC`, Kn = { iqItsUotZ: `framer-v-15kmnrp`, mMNPzEabC: `framer-v-1560tv3`, o8Bozf2XL: `framer-v-1gmbb4h`, qHeOimhOs: `framer-v-us7fpv`, R7WknvXWX: `framer-v-gixsih`, rUDSlx6QU: `framer-v-1m4v38q` }, qn = { bounce: .2, delay: 0, duration: .4, type: `spring` }, Jn = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: -20, y: 0 }, Y = { bounce: 0, delay: 0, duration: 1, type: `spring` }, X = (...e) => { for (let t of e)
				if (t && typeof t == `string`) return t }, Yn = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 20 }, Xn = (e, t) => ({ ...e, delay: (e.delay ?? 0) + t }), Zn = { bounce: 0, delay: 0, duration: .6, type: `spring` }, Qn = { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1.1, skewX: 0, skewY: 0, transition: qn }, $n = e => typeof e == `object` && e && typeof e.src == `string` ? e : typeof e == `string` ? { src: e } : void 0, er = e => Array.isArray(e) ? e.length > 0 : e != null && e !== ``, tr = (e, t) => typeof e == `string` && typeof t == `string` ? e.toLowerCase() === t.toLowerCase() : e === t, nr = (e, t, n) => e.currentPage >= e.totalPages ? t.disabled ?? n : e.isLoading ? t.loading ?? n : n, rr = () => ({ from: { constraint: { left: { collection: `xuMTTfwM5`, name: `dLgDaJTTW`, type: `Identifier` }, operator: `==`, right: { collection: `dLgDaJTTW`, name: `id`, type: `Identifier` }, type: `BinaryOperation` }, left: { alias: `xuMTTfwM5`, data: Oe, type: `Collection` }, right: { alias: `dLgDaJTTW`, data: K, type: `Collection` }, type: `LeftJoin` }, select: [{ collection: `xuMTTfwM5`, name: `TnhS6eELQ`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `oucWStTpN`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `qr2qKvGCk`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `gVwJ8gw2W`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `r9Yo9uPLX`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `id`, type: `Identifier` }, { alias: `FAQhYlFOA`, arguments: [{ from: { alias: `FAQhYlFOA`, data: K, type: `Collection` }, limit: { type: `LiteralValue`, value: 10 }, select: [{ collection: `FAQhYlFOA`, name: `MIzIeBpZJ`, type: `Identifier` }, { collection: `FAQhYlFOA`, name: `bpiA3S2Kt`, type: `Identifier` }, { collection: `FAQhYlFOA`, name: `id`, type: `Identifier` }], type: `Select`, where: { left: { collection: `FAQhYlFOA`, name: `id`, type: `Identifier` }, operator: `==`, right: { collection: `xuMTTfwM5`, name: `dLgDaJTTW`, type: `Identifier` }, type: `BinaryOperation` } }], functionName: `ARRAY`, type: `FunctionCall` }, { alias: `dfSnZTcJm`, arguments: [{ from: { alias: `dfSnZTcJm`, data: Ve, type: `Collection` }, limit: { type: `LiteralValue`, value: 10 }, select: [{ collection: `dfSnZTcJm`, name: `WSgOjCgvi`, type: `Identifier` }, { collection: `dfSnZTcJm`, name: `JZdNGwdHX`, type: `Identifier` }, { collection: `dfSnZTcJm`, name: `id`, type: `Identifier` }], type: `Select`, where: { left: { collection: `dfSnZTcJm`, name: `id`, type: `Identifier` }, operator: `==`, right: { collection: `xuMTTfwM5`, name: `cT5P2gMIq`, type: `Identifier` }, type: `BinaryOperation` } }], functionName: `ARRAY`, type: `FunctionCall` }], where: { left: { collection: `dLgDaJTTW`, name: `id`, type: `Identifier` }, operator: `==`, right: { type: `LiteralValue`, value: `xwEypg7V9` }, type: `BinaryOperation` } }), Z = () => ({ from: { constraint: { left: { collection: `xuMTTfwM5`, name: `dLgDaJTTW`, type: `Identifier` }, operator: `==`, right: { collection: `dLgDaJTTW`, name: `id`, type: `Identifier` }, type: `BinaryOperation` }, left: { alias: `xuMTTfwM5`, data: Oe, type: `Collection` }, right: { alias: `dLgDaJTTW`, data: K, type: `Collection` }, type: `LeftJoin` }, select: [{ collection: `xuMTTfwM5`, name: `TnhS6eELQ`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `oucWStTpN`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `qr2qKvGCk`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `gVwJ8gw2W`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `r9Yo9uPLX`, type: `Identifier` }, { collection: `xuMTTfwM5`, name: `id`, type: `Identifier` }, { alias: `FAQhYlFOA`, arguments: [{ from: { alias: `FAQhYlFOA`, data: K, type: `Collection` }, limit: { type: `LiteralValue`, value: 10 }, select: [{ collection: `FAQhYlFOA`, name: `MIzIeBpZJ`, type: `Identifier` }, { collection: `FAQhYlFOA`, name: `bpiA3S2Kt`, type: `Identifier` }, { collection: `FAQhYlFOA`, name: `id`, type: `Identifier` }], type: `Select`, where: { left: { collection: `FAQhYlFOA`, name: `id`, type: `Identifier` }, operator: `==`, right: { collection: `xuMTTfwM5`, name: `dLgDaJTTW`, type: `Identifier` }, type: `BinaryOperation` } }], functionName: `ARRAY`, type: `FunctionCall` }, { alias: `dfSnZTcJm`, arguments: [{ from: { alias: `dfSnZTcJm`, data: Ve, type: `Collection` }, limit: { type: `LiteralValue`, value: 10 }, select: [{ collection: `dfSnZTcJm`, name: `WSgOjCgvi`, type: `Identifier` }, { collection: `dfSnZTcJm`, name: `JZdNGwdHX`, type: `Identifier` }, { collection: `dfSnZTcJm`, name: `id`, type: `Identifier` }], type: `Select`, where: { left: { collection: `dfSnZTcJm`, name: `id`, type: `Identifier` }, operator: `==`, right: { collection: `xuMTTfwM5`, name: `cT5P2gMIq`, type: `Identifier` }, type: `BinaryOperation` } }], functionName: `ARRAY`, type: `FunctionCall` }], where: { left: { collection: `dLgDaJTTW`, name: `id`, type: `Identifier` }, operator: `==`, right: { type: `LiteralValue`, value: `hTBeiRgWm` }, type: `BinaryOperation` } }), ir = ({ query: e, pageSize: t, children: n }) => { let { paginatedQuery: r, paginationInfo: i, loadMore: a } = M(e, t, `xuMTTfwM5`); return n(pe(r), i, a) }, ar = ({ value: e, children: t }) => { let n = i(g),
				r = e ?? n.transition,
				o = a(() => ({ ...n, transition: r }), [JSON.stringify(r)]); return l(g.Provider, { value: o, children: t }) }, or = { "Desktop Free": `R7WknvXWX`, "Desktop Paid": `rUDSlx6QU`, "Mobile Free": `iqItsUotZ`, "Mobile Paid": `o8Bozf2XL`, "Tablet Free": `qHeOimhOs`, "Tablet Paid": `mMNPzEabC` }, sr = h.create(r), cr = ({ click: e, height: t, id: n, width: r, ...i }) => ({ ...i, US4D8lS25: e ?? i.US4D8lS25, variant: or[i.variant] ?? i.variant ?? `R7WknvXWX` }), lr = (e, t) => e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`), Q = b(p(function(e, n) { let i = t(null),
				a = n ?? i,
				o = ee(),
				{ activeLocale: c, setLocale: u } = le(),
				d = re(),
				{ style: p, className: m, layoutId: g, variant: v, US4D8lS25: y, ...b } = cr(e),
				{ baseVariant: x, classNames: S, clearLoadingGesture: C, gestureHandlers: w, gestureVariant: T, isLoading: E, setGestureState: O, setVariant: k, variants: A } = ne({ cycleOrder: Wn, defaultVariant: `R7WknvXWX`, ref: a, variant: v, variantClassNames: Kn }),
				j = lr(e, A),
				{ activeVariantCallback: M, delay: oe } = se(x),
				ce = M(async (...e) => { k(`R7WknvXWX`) }),
				F = M(async (...e) => { k(`qHeOimhOs`) }),
				I = M(async (...e) => { k(`iqItsUotZ`) }),
				de = M(async (...e) => { if (y && await y(...e) === !1) return !1;
					k(`rUDSlx6QU`) }),
				fe = M(async (...e) => { if (y && await y(...e) === !1) return !1;
					k(`mMNPzEabC`) }),
				pe = M(async (...e) => { if (y && await y(...e) === !1) return !1;
					k(`o8Bozf2XL`) }),
				L = ({ loadMore: e }) => M(async (...t) => { e() }),
				me = P(Gn, De, Ue); return l(_, { id: g ?? o, children: l(sr, { animate: A, initial: !1, children: l(ar, { value: qn, children: f(h.div, { ...b, ...w, className: P(me, `framer-gixsih`, m, S), "data-framer-name": `Desktop Free`, layoutDependency: j, layoutId: `R7WknvXWX`, ref: a, style: { backgroundColor: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, ...p }, ...J({ iqItsUotZ: { "data-framer-name": `Mobile Free` }, mMNPzEabC: { "data-framer-name": `Tablet Paid` }, o8Bozf2XL: { "data-framer-name": `Mobile Paid` }, qHeOimhOs: { "data-framer-name": `Tablet Free` }, rUDSlx6QU: { "data-framer-name": `Desktop Paid` } }, x, T), children: [f(h.div, { className: `framer-391rtq`, "data-framer-name": `Buttons`, layoutDependency: j, layoutId: `PCCmeUU_f`, children: [l(N, { height: 41, y: (d?.y || 0) + 0 + (((d?.height || 601) - 0 - 601) / 2 + 0 + 0) + 0, ...J({ iqItsUotZ: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 0 + 0) + 0 }, mMNPzEabC: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 0 + 0) + 0 }, o8Bozf2XL: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 0 + 0) + 0 }, qHeOimhOs: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 0 + 0) + 0 } }, x, T), children: l(Bn, { __framer__animate: { transition: Y }, __framer__animateOnce: !0, __framer__enter: Jn, __framer__styleAppearEffectEnabled: !0, __framer__threshold: .5, __perspectiveFX: !1, __smartComponentFX: !0, __targetOpacity: 1, className: `framer-1h0dyfx-container`, "data-framer-name": `Free`, layoutDependency: j, layoutId: `GSgvaToVs-container`, name: `Free`, nodeId: `GSgvaToVs`, rendersWithMotion: !0, scopeId: `I9qFEsQNe`, ...J({ iqItsUotZ: { __framer__enter: Yn } }, x, T), children: l(Ce, { etHunOWc1: { borderColor: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, borderStyle: `solid`, borderWidth: 1 }, height: `100%`, id: `GSgvaToVs`, layoutId: `GSgvaToVs`, mKi96qKcw: `Free`, name: `Free`, RY2bbLR80: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, style: { height: `100%` }, variant: X(`Cg0QvxDna`), width: `100%`, wNn0NkXF8: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, ...J({ iqItsUotZ: { variant: X(`e50I5ulHN`) }, mMNPzEabC: { RY2bbLR80: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, ufZYce0mQ: F, wNn0NkXF8: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))` }, o8Bozf2XL: { RY2bbLR80: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, ufZYce0mQ: I, variant: X(`e50I5ulHN`), wNn0NkXF8: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))` }, rUDSlx6QU: { RY2bbLR80: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, ufZYce0mQ: ce, wNn0NkXF8: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))` } }, x, T) }) }) }), l(N, { height: 41, y: (d?.y || 0) + 0 + (((d?.height || 601) - 0 - 601) / 2 + 0 + 0) + 0, ...J({ iqItsUotZ: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 0 + 0) + 0 }, mMNPzEabC: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 0 + 0) + 0 }, o8Bozf2XL: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 0 + 0) + 0 }, qHeOimhOs: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 0 + 0) + 0 } }, x, T), children: l(Bn, { __framer__animate: { transition: Y }, __framer__animateOnce: !0, __framer__enter: Jn, __framer__styleAppearEffectEnabled: !0, __framer__threshold: .5, __perspectiveFX: !1, __smartComponentFX: !0, __targetOpacity: 1, className: `framer-rtp62f-container`, "data-framer-name": `Paid`, layoutDependency: j, layoutId: `fdoy7lTQP-container`, name: `Paid`, nodeId: `fdoy7lTQP`, rendersWithMotion: !0, scopeId: `I9qFEsQNe`, ...J({ iqItsUotZ: { __framer__enter: Yn } }, x, T), children: l(Ce, { etHunOWc1: { borderColor: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))`, borderStyle: `solid`, borderWidth: 1 }, height: `100%`, id: `fdoy7lTQP`, layoutId: `fdoy7lTQP`, mKi96qKcw: `Paid`, name: `Paid`, RY2bbLR80: `var(--token-2071f887-a813-449a-b145-01e2e3b7c695, rgb(0, 0, 0))`, style: { height: `100%` }, ufZYce0mQ: de, variant: X(`Cg0QvxDna`), width: `100%`, wNn0NkXF8: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, ...J({ iqItsUotZ: { ufZYce0mQ: pe, variant: X(`e50I5ulHN`) }, mMNPzEabC: { RY2bbLR80: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, ufZYce0mQ: fe, wNn0NkXF8: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))` }, o8Bozf2XL: { RY2bbLR80: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, ufZYce0mQ: pe, variant: X(`e50I5ulHN`), wNn0NkXF8: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))` }, qHeOimhOs: { ufZYce0mQ: fe }, rUDSlx6QU: { RY2bbLR80: `var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255))`, wNn0NkXF8: `var(--token-2aec4972-158d-4c59-ad6e-07ce5adaca9c, rgb(41, 41, 41))` } }, x, T) }) }) })] }), l(h.div, { className: `framer-19qrt1`, "data-framer-name": `Resources`, layoutDependency: j, layoutId: `JqwVNJ1rr`, children: l(h.article, { className: `framer-g2d768`, "data-framer-name": `Resource List`, layoutDependency: j, layoutId: `xuMTTfwM5`, children: l(ue, { children: l(ir, { pageSize: 6, query: rr(), ...J({ mMNPzEabC: { pageSize: 6, query: Z() }, o8Bozf2XL: { pageSize: 6, query: Z() }, rUDSlx6QU: { pageSize: 6, query: Z() } }, x, T), children: (e, t, n) => f(s, { children: [e?.map(({ dfSnZTcJm: e, FAQhYlFOA: t, gVwJ8gw2W: n, id: i, oucWStTpN: a, qr2qKvGCk: o, r9Yo9uPLX: s, TnhS6eELQ: c }, u) => { c ??= ``, o ??= ``, n ??= ``, s ??= ``; let d = er(s); return l(_, { id: `xuMTTfwM5-${i}`, children: l(ie.Provider, { value: { TnhS6eELQ: c }, children: l(ae, { href: { pathVariables: { TnhS6eELQ: c }, webPageId: `j71x5a3jG` }, motionChild: !0, nodeId: `bi0p_031U`, openInNewTab: !1, scopeId: `I9qFEsQNe`, children: f(Hn, { __framer__animate: { transition: Xn(Y, u % 6 * .1) }, __framer__animateOnce: !0, __framer__enter: Jn, __framer__styleAppearEffectEnabled: !0, __framer__threshold: .5, __perspectiveFX: !1, __smartComponentFX: !0, __targetOpacity: 1, className: `framer-1acm7n1 framer-1uygxxn`, layoutDependency: j, layoutId: `bi0p_031U`, ...J({ iqItsUotZ: { __framer__animate: { transition: Xn(Zn, u % 6 * .1) }, __framer__enter: Yn } }, x, T), children: [l(h.div, { className: `framer-uqwpfw`, "data-border": !0, "data-framer-name": `Image`, layoutDependency: j, layoutId: `CCZ_4AWG3`, style: { "--border-bottom-width": `1px`, "--border-color": `rgba(0, 0, 0, 0.06)`, "--border-left-width": `1px`, "--border-right-width": `1px`, "--border-style": `solid`, "--border-top-width": `1px`, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }, children: l(N, { children: l(te, { className: `framer-he8t54-container`, "data-framer-name": `Image`, isAuthoredByUser: !0, isModuleExternal: !0, layoutDependency: j, layoutId: `xFyvbxTkG-container`, name: `Image`, nodeId: `xFyvbxTkG`, rendersWithMotion: !0, scopeId: `I9qFEsQNe`, whileHover: Qn, children: l(Le, { accessibility: { compatibility: !1, enableAria: !1, reduce: !1, renderer: `auto` }, advance: { dispersion: .2, falloffType: 0, noise: 1, noiseBlend: 0, originX: 0, originY: .5, scale: 0 }, angle: 45, animateProp: { amount: 0, custom: { angle: 0, blur: 40, dispersion: .2, enable: !1, falloff: 1, noise: 1, scale: 0 }, replay: !0, trigger: `layer`, type: `appear`, viewport: `center` }, ariaLabel: ``, blur: 200, defaultImage: $n(a), falloff: 1, file: `url`, fit: `cover`, height: `100%`, id: `xFyvbxTkG`, layoutId: `xFyvbxTkG`, loop: !0, name: `Image`, style: { height: `100%`, width: `100%` }, transition: { delay: 0, duration: 2, ease: [.44, 0, .56, 1], type: `tween` }, type: `image`, urlVideo: `../images/jhocnrz23gm4pk1ct7mbiwau5u.mp4`, width: `100%` }) }) }) }), f(h.div, { className: `framer-1mhnuyq`, "data-framer-name": `Text`, layoutDependency: j, layoutId: `MgRbWG__w`, children: [f(h.div, { className: `framer-bhslv7`, "data-framer-name": `Title`, layoutDependency: j, layoutId: `ceVnyovRa`, children: [l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.h2, { className: `framer-styles-preset-j0e2f3`, "data-styles-preset": `fSubtPlWB`, dir: `auto`, children: `Pricing Toolkit` }) }), className: `framer-patdcm`, "data-framer-name": `Description`, fonts: [`Inter`], layoutDependency: j, layoutId: `rpQqkxcz1`, text: o, verticalAlignment: `top`, withExternalLayout: !0 }), l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.p, { dir: `auto`, style: { "--font-selector": `RlM7U3dpdHplci1yZWd1bGFy`, "--framer-font-family": `"Switzer", "Switzer Placeholder", sans-serif`, "--framer-font-size": `14px`, "--framer-line-height": `1.4em`, "--framer-text-color": `var(--extracted-r6o4lv, var(--token-3cb769b5-510d-47ab-911b-3e2d7599220b, rgb(122, 122, 122)))` }, children: `It reduces ambiguity, sets expectations early, and supports confident client conversations.` }) }), className: `framer-1sxouzn`, "data-framer-name": `Description`, fonts: [`FS;Switzer-regular`], layoutDependency: j, layoutId: `KlmVQbALG`, style: { "--extracted-r6o4lv": `var(--token-3cb769b5-510d-47ab-911b-3e2d7599220b, rgb(122, 122, 122))` }, text: n, verticalAlignment: `top`, withExternalLayout: !0 })] }), f(h.div, { className: `framer-1hyr8hr`, "data-framer-name": `Price `, layoutDependency: j, layoutId: `tPQ3zqxSf`, children: [f(h.div, { className: `framer-1k00ry1`, layoutDependency: j, layoutId: `UuR28UmRK`, children: [d !== !1 && l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.p, { dir: `auto`, style: { "--font-selector": `RlM7U3dpdHplci1yZWd1bGFy`, "--framer-font-family": `"Switzer", "Switzer Placeholder", sans-serif`, "--framer-font-size": `14px`, "--framer-line-height": `1.4em`, "--framer-text-color": `var(--extracted-r6o4lv, rgb(136, 136, 136))` }, children: `Content` }) }), className: `framer-1g3hz7d`, "data-framer-name": `Price`, fonts: [`FS;Switzer-regular`], layoutDependency: j, layoutId: `hx9LO7TG7`, style: { "--extracted-r6o4lv": `rgb(136, 136, 136)` }, text: s, verticalAlignment: `top`, withExternalLayout: !0 }), l(h.div, { className: `framer-1cncqxm`, layoutDependency: j, layoutId: `FAQhYlFOA`, children: t?.map(({ bpiA3S2Kt: e, id: t, MIzIeBpZJ: n }, i) => { n ??= ``, e ??= ``; let a = tr(n, `FREE`); return l(_, { id: `FAQhYlFOA-${t}`, children: l(ie.Provider, { value: { bpiA3S2Kt: e }, children: l(h.div, { className: `framer-2lil35`, layoutDependency: j, layoutId: `x9JrNY43R`, children: a !== !1 && l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.p, { dir: `auto`, style: { "--font-selector": `R0Y7QXplcmV0IE1vbm8tNTAw`, "--framer-font-family": `"Azeret Mono", monospace`, "--framer-font-size": `10px`, "--framer-font-weight": `500`, "--framer-letter-spacing": `0.2em`, "--framer-line-height": `1.4em`, "--framer-text-color": `var(--extracted-r6o4lv, rgb(136, 136, 136))`, "--framer-text-transform": `uppercase` }, children: `Free` }) }), className: `framer-71emil`, "data-framer-name": `Title`, fonts: [`GF;Azeret Mono-500`], layoutDependency: j, layoutId: `GXhaolO3X`, style: { "--extracted-r6o4lv": `rgb(136, 136, 136)` }, text: n, verticalAlignment: `top`, withExternalLayout: !0 }) }) }) }, t) }) })] }), l(h.div, { className: `framer-11jbyk5`, layoutDependency: j, layoutId: `dfSnZTcJm`, children: e?.map(({ id: e, JZdNGwdHX: t, WSgOjCgvi: n }, i) => (n ??= ``, t ??= ``, l(_, { id: `dfSnZTcJm-${e}`, children: l(ie.Provider, { value: { JZdNGwdHX: t }, children: l(h.div, { className: `framer-bdc7uf`, layoutDependency: j, layoutId: `di7cFm_IC`, children: l(h.div, { className: `framer-behb85`, layoutDependency: j, layoutId: `JucMjvV6a`, style: { backgroundColor: `rgba(0, 0, 0, 0.03)`, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }, children: l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(h.p, { className: `framer-styles-preset-usr43n`, "data-styles-preset": `AHp7WIPee`, dir: `auto`, children: `Toolkits` }) }), className: `framer-1yn2v2q`, "data-framer-name": `Title`, fonts: [`Inter`], layoutDependency: j, layoutId: `Gt729chfp`, text: n, verticalAlignment: `top`, withExternalLayout: !0 }) }) }) }) }, e))) })] })] })] }) }) }) }, i) }), l(h.div, { className: `framer-xuycic`, "data-framer-name": `Button`, layoutDependency: j, layoutId: `iXfiydbOg`, children: l(N, { height: 40, y: (d?.y || 0) + 0 + (((d?.height || 601) - 0 - 601) / 2 + 41 + 40) + 0 + 520 - 40 + 0, ...J({ iqItsUotZ: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 41 + 40) + 0 + 520 - 40 + 0 }, mMNPzEabC: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 41 + 40) + 0 + 520 - 40 + 0 }, o8Bozf2XL: { y: (d?.y || 0) + 0 + (((d?.height || 200) - 0 - 601) / 2 + 41 + 40) + 0 + 520 - 40 + 0 }, qHeOimhOs: { y: (d?.y || 0) + 0 + (((d?.height || 831) - 0 - 601) / 2 + 41 + 40) + 0 + 520 - 40 + 0 } }, x, T), children: l(te, { className: `framer-wyo1i8-container`, layoutDependency: j, layoutId: `AoYxZ7wvr-container`, nodeId: `AoYxZ7wvr`, rendersWithMotion: !0, scopeId: `I9qFEsQNe`, children: l(Ln, { height: `100%`, id: `AoYxZ7wvr`, layoutId: `AoYxZ7wvr`, variant: nr(t, { disabled: `CVj9tovNX`, loading: `d3Gfu5obV` }, X(`z_MuUBPCE`)), width: `100%`, Wld3NDzSj: L({ loadMore: n }) }) }) }) })] }) }) }) }) })] }) }) }) }) }), [`@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`, `.framer-XSrRC.framer-1uygxxn, .framer-XSrRC .framer-1uygxxn { display: block; }`, `.framer-XSrRC.framer-gixsih { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1376px; }`, `.framer-XSrRC .framer-391rtq { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`, `.framer-XSrRC .framer-1h0dyfx-container, .framer-XSrRC .framer-rtp62f-container { flex: none; height: 41px; position: relative; width: auto; }`, `.framer-XSrRC .framer-19qrt1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 1px; height: min-content; justify-content: center; max-width: 2000px; overflow: visible; padding: 0px; position: relative; width: 100%; }`, `.framer-XSrRC .framer-g2d768 { display: grid; flex: 1 0 0px; gap: 40px 40px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(3, minmax(50px, 1fr)); height: min-content; justify-content: center; padding: 0px 0px 100px 0px; position: relative; width: 1px; }`, `.framer-XSrRC .framer-1acm7n1 { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: row; flex-wrap: wrap; gap: 20px 20px; height: 190px; justify-content: flex-start; justify-self: start; max-width: 500px; padding: 0px; position: relative; text-decoration: none; width: 100%; }`, `.framer-XSrRC .framer-uqwpfw { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100%; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 30%; will-change: var(--framer-will-change-override, transform); }`, `.framer-XSrRC .framer-he8t54-container { flex: none; height: 100%; position: relative; width: 100%; will-change: var(--framer-will-change-effect-override, transform); }`, `.framer-XSrRC .framer-1mhnuyq { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; height: 100%; justify-content: space-between; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1px; }`, `.framer-XSrRC .framer-bhslv7 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; padding: 0px; position: relative; width: 100%; }`, `.framer-XSrRC .framer-patdcm, .framer-XSrRC .framer-1sxouzn { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`, `.framer-XSrRC .framer-1hyr8hr { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 100%; }`, `.framer-XSrRC .framer-1k00ry1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 20px; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: min-content; }`, `.framer-XSrRC .framer-1g3hz7d, .framer-XSrRC .framer-71emil, .framer-XSrRC .framer-1yn2v2q { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`, `.framer-XSrRC .framer-1cncqxm, .framer-XSrRC .framer-11jbyk5 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; padding: 0px; position: relative; width: min-content; }`, `.framer-XSrRC .framer-2lil35, .framer-XSrRC .framer-bdc7uf { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; padding: 0px; position: relative; width: min-content; }`, `.framer-XSrRC .framer-behb85 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; padding: 8px; position: relative; width: min-content; }`, `.framer-XSrRC .framer-xuycic { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 1px; height: min-content; justify-content: flex-end; left: 0px; overflow: visible; padding: 0px; position: absolute; width: 100%; }`, `.framer-XSrRC .framer-wyo1i8-container { flex: none; height: auto; position: relative; width: auto; }`, `.framer-XSrRC.framer-v-us7fpv.framer-gixsih, .framer-XSrRC.framer-v-1560tv3.framer-gixsih { width: 810px; }`, `.framer-XSrRC.framer-v-us7fpv .framer-g2d768, .framer-XSrRC.framer-v-1560tv3 .framer-g2d768 { gap: 40px 20px; grid-template-columns: repeat(2, minmax(50px, 1fr)); }`, `.framer-XSrRC.framer-v-15kmnrp.framer-gixsih, .framer-XSrRC.framer-v-1gmbb4h.framer-gixsih { width: 390px; }`, `.framer-XSrRC.framer-v-15kmnrp .framer-g2d768, .framer-XSrRC.framer-v-1gmbb4h .framer-g2d768 { grid-template-columns: repeat(1, minmax(50px, 1fr)); }`, ...Te, ...Be, `.framer-XSrRC[data-border="true"]::after, .framer-XSrRC [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }`], `framer-XSrRC`), ur = Q, Q.displayName = `Resources Index`, Q.defaultProps = { height: 601, width: 1376 }, T(Q, { variant: { options: [`R7WknvXWX`, `rUDSlx6QU`, `qHeOimhOs`, `mMNPzEabC`, `iqItsUotZ`, `o8Bozf2XL`], optionTitles: [`Desktop Free`, `Desktop Paid`, `Tablet Free`, `Tablet Paid`, `Mobile Free`, `Mobile Paid`], title: `Variant`, type: F.Enum }, US4D8lS25: { title: `Click`, type: F.EventHandler } }), x(Q, [{ explicitInter: !0, fonts: [{ cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`, url: `../images/5vvr9vy74if2i6bqbjvbw7sy1pq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`, url: `../images/eor0mi4hntlgwnn9if640ezzxco.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+1F00-1FFF`, url: `../images/y9k9qrlzaqio88klkmbd8vomqc.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0370-03FF`, url: `../images/oyrd2tbibpvojxiihnlooxny9m.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF`, url: `../images/jeywfuapfzhqheg8u5gtpdz7wq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`, url: `../images/grgckwrn6d3uz8ewclhzxwefc4.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB`, url: `../images/b6y37fthzealdunqhicbt6futy.woff2`, weight: `400` }, { cssFamilyName: `Switzer`, source: `fontshare`, style: `normal`, uiFamilyName: `Switzer`, url: `../images/6in5wolrcyp4g4mocohomxnon6q7mdar.woff2`, weight: `400` }, { cssFamilyName: `Azeret Mono`, source: `google`, style: `normal`, uiFamilyName: `Azeret Mono`, url: `https://fonts.gstatic.com/s/azeretmono/v21/3XF5ErsiyJsY9O_Gepph-FvtTQgMQUdNekSfrvVh17aa-5s3AA.woff2`, weight: `500` }] }, ...zn, ...Vn, ...Un, ...y(Ee), ...y(He)], { supportsExplicitInterCodegen: !0 }), Q.loader = { load: (e, t) => { let n = t.locale,
					r = j.get(rr(), n),
					i = j.get(Z(), n); return Promise.allSettled([r.preload(), i.preload(), w(Ce, {}, t), (async () => { let e = await r.readMaybeAsync() ?? []; return Promise.allSettled(e.flatMap(e => w(Ln, {}, t))) })()]) } } })),
	fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr, $, Fr, Ir;
e((() => { d(), I(), v(), n(), ve(), Pe(), dr(), Ae(), We(), fr = R(Fe), pr = C(D), mr = C(h.div), hr = R(ur), gr = R(xe), _r = { kESJNXBnx: `(min-width: 1200px)`, s31NvObUG: `(min-width: 810px) and (max-width: 1199.98px)`, Z0ttYQm_T: `(max-width: 809.98px)` }, vr = [], yr = `framer-UbNlY`, br = { kESJNXBnx: `framer-v-1yc28lm`, s31NvObUG: `framer-v-146w3et`, Z0ttYQm_T: `framer-v-13pihhw` }, xr = (e, t, n) => e && t ? `position` : n, Sr = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: -20, y: 0 }, Cr = { bounce: 0, delay: .2, duration: 1, type: `spring` }, wr = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 20 }, Tr = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 10 }, Er = { bounce: 0, delay: 0, duration: .6, type: `spring` }, Dr = { filter: `blur(10px)`, opacity: .001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: -20, y: 0 }, Or = { bounce: 0, delay: .05, duration: .6, type: `spring` }, kr = { effect: Dr, tokenization: `word`, transition: Or, trigger: `onInView`, type: `appear` }, Ar = { effect: { filter: `blur(10px)`, opacity: .001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 20 }, tokenization: `word`, transition: Or, trigger: `onInView`, type: `appear` }, jr = (...e) => { for (let t of e)
			if (t && typeof t == `string`) return t }, Mr = { Desktop: `kESJNXBnx`, Phone: `Z0ttYQm_T`, Tablet: `s31NvObUG` }, Nr = ({ value: e }) => fe() ? null : l(`style`, { dangerouslySetInnerHTML: { __html: e }, "data-framer-html-style": `` }), Pr = ({ height: e, id: t, width: n, ...r }) => ({ ...r, variant: Mr[r.variant] ?? r.variant ?? `kESJNXBnx` }), $ = b(p(function(e, n) { let o = t(null),
			s = n ?? o,
			c = ee(),
			{ activeLocale: u, setLocale: d } = le(),
			p = re(),
			{ style: m, className: v, layoutId: y, variant: b, ...x } = Pr(e);
		oe(a(() => Ge({}, u), [u])); let [S, te] = ce(b, _r, !1), C = P(yr, Ne), w = i(A)?.isLayoutTemplate, T = xr(w, !!i(g)?.transition?.layout), E = he(`ZlvcDuOB7`), ne = me(); return k({}), l(A.Provider, { value: { activeVariantId: S, humanReadableVariantMap: Mr, primaryVariantId: `kESJNXBnx`, variantClassNames: br }, children: f(_, { id: y ?? c, children: [l(Nr, { value: `html body { background: var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, rgb(255, 255, 255)); }` }), l(h.div, { ...x, className: P(C, `framer-1yc28lm`, v), ref: s, style: { ...m }, children: f(h.div, { className: `framer-qcn0d9`, "data-framer-name": `Main`, id: E, layout: T, ref: ne(E), children: [f(`div`, { className: `framer-1yuz6n4`, "data-framer-name": `Title`, children: [l(L, { breakpoint: S, overrides: { Z0ttYQm_T: { __framer__enter: wr } }, children: f(mr, { __framer__animate: { transition: Cr }, __framer__animateOnce: !0, __framer__enter: Sr, __framer__styleAppearEffectEnabled: !0, __framer__threshold: .5, __perspectiveFX: !1, __targetOpacity: 1, className: `framer-15hy5uh`, "data-framer-name": `Title`, children: [l(L, { breakpoint: S, overrides: { s31NvObUG: { y: (p?.y || 0) + 160 + 0 + 100 + 0 + 0 + 0 + 1.4 }, Z0ttYQm_T: { y: (p?.y || 0) + 160 + 0 + 100 + 0 + 0 + 0 + 1.4 } }, children: l(N, { height: 14, width: `14px`, y: (p?.y || 0) + 160 + 0 + 120 + 0 + 0 + 0 + 1.4, children: l(O, { className: `framer-1rsg4yb-container`, nodeId: `IsSkuaUAZ`, scopeId: `VwdWHxpTK`, children: l(Fe, { height: `100%`, id: `IsSkuaUAZ`, layoutId: `IsSkuaUAZ`, style: { height: `100%`, width: `100%` }, width: `100%` }) }) }) }), l(pr, { __framer__animate: { transition: Er }, __framer__animateOnce: !0, __framer__enter: Tr, __framer__styleAppearEffectEnabled: !0, __framer__threshold: 0, __fromCanvasComponent: !0, __perspectiveFX: !1, __targetOpacity: 1, children: l(r, { children: l(`h1`, { dir: `auto`, style: { "--font-selector": `R0Y7QXplcmV0IE1vbm8tNTAw`, "--framer-font-family": `"Azeret Mono", monospace`, "--framer-font-size": `12px`, "--framer-font-weight": `500`, "--framer-letter-spacing": `0.2em`, "--framer-line-height": `1.4em`, "--framer-text-color": `var(--token-2071f887-a813-449a-b145-01e2e3b7c695, rgb(0, 0, 0))`, "--framer-text-transform": `uppercase` }, children: `OUR RESOURCES` }) }), className: `framer-7me1ww`, "data-framer-name": `Monthly Retainer`, fonts: [`GF;Azeret Mono-500`], verticalAlignment: `top`, withExternalLayout: !0 })] }) }), l(L, { breakpoint: S, overrides: { Z0ttYQm_T: { effect: Ar } }, children: l(D, { __fromCanvasComponent: !0, children: l(r, { children: l(`p`, { className: `framer-styles-preset-1bhs3ck`, "data-styles-preset": `rVTlpQ7dR`, dir: `auto`, children: `Explore practical resources we use in real client work, from free essentials to in-depth, paid systems.` }) }), className: `framer-yl5ue3`, "data-framer-name": `Title`, effect: kr, fonts: [`Inter`], verticalAlignment: `top`, withExternalLayout: !0 }) })] }), l(L, { breakpoint: S, overrides: { s31NvObUG: { width: `calc(${p?.width||`100vw`} - 80px)`, y: (p?.y || 0) + 160 + 0 + 100 + 360.8 }, Z0ttYQm_T: { width: `calc(${p?.width||`100vw`} - 80px)`, y: (p?.y || 0) + 160 + 0 + 100 + 360.8 } }, children: l(N, { height: 541, width: `calc(${p?.width||`100vw`} - 120px)`, y: (p?.y || 0) + 160 + 0 + 120 + 400.8, children: l(O, { className: `framer-a8asp0-container`, nodeId: `vcLrZ5xwf`, scopeId: `VwdWHxpTK`, children: l(L, { breakpoint: S, overrides: { s31NvObUG: { variant: jr(`qHeOimhOs`) }, Z0ttYQm_T: { variant: jr(`iqItsUotZ`) } }, children: l(ur, { height: `100%`, id: `vcLrZ5xwf`, layoutId: `vcLrZ5xwf`, style: { width: `100%` }, variant: jr(`R7WknvXWX`), width: `100%` }) }) }) }) }), l(N, { children: l(O, { className: `framer-1rxwxnd-container`, isAuthoredByUser: !0, isModuleExternal: !0, nodeId: `bxxBs9YZt`, scopeId: `VwdWHxpTK`, children: l(xe, { height: `100%`, id: `bxxBs9YZt`, intensity: 15, layoutId: `bxxBs9YZt`, width: `100%` }) }) })] }) }), l(`div`, { id: `overlay` })] }) }) }), [`@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`, `.framer-UbNlY.framer-l02vdl, .framer-UbNlY .framer-l02vdl { display: block; }`, `.framer-UbNlY.framer-1yc28lm { align-content: center; align-items: center; background-color: var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, #ffffff); display: flex; flex-direction: column; flex-wrap: nowrap; gap: 160px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 160px 20px 160px 20px; position: relative; width: 1200px; }`, `.framer-UbNlY .framer-qcn0d9 { align-content: flex-start; align-items: flex-start; background-color: var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, #ffffff); border-bottom-left-radius: 40px; border-bottom-right-radius: 40px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 100px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 120px 40px 0px 40px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); z-index: 2; }`, `.framer-UbNlY .framer-1yuz6n4 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: center; max-width: 80%; overflow: visible; padding: 0px; position: relative; width: 100%; }`, `.framer-UbNlY .framer-15hy5uh { align-content: center; align-items: center; background-color: var(--token-d329e734-9220-4861-9ec2-5a7ff3e039a6, #ffffff); display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 2; }`, `.framer-UbNlY .framer-1rsg4yb-container { flex: none; height: 14px; position: relative; width: 14px; }`, `.framer-UbNlY .framer-7me1ww { --framer-paragraph-spacing: 0px; flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }`, `.framer-UbNlY .framer-yl5ue3 { --framer-paragraph-spacing: 0px; --framer-text-wrap-override: balance; flex: none; height: auto; max-width: 1000px; position: relative; width: 100%; }`, `.framer-UbNlY .framer-a8asp0-container { flex: none; height: auto; position: relative; width: 100%; }`, `.framer-UbNlY .framer-1rxwxnd-container { flex: none; height: auto; position: relative; width: auto; }`, ...je, `@media (min-width: 810px) and (max-width: 1199.98px) { .framer-UbNlY.framer-1yc28lm { width: 810px; } .framer-UbNlY .framer-qcn0d9 { gap: 60px; padding: 100px 20px 20px 20px; } .framer-UbNlY .framer-1yuz6n4, .framer-UbNlY .framer-15hy5uh { order: 0; } .framer-UbNlY .framer-yl5ue3, .framer-UbNlY .framer-a8asp0-container { order: 1; } .framer-UbNlY .framer-1rxwxnd-container { order: 2; }}`, `@media (max-width: 809.98px) { .framer-UbNlY.framer-1yc28lm { width: 390px; } .framer-UbNlY .framer-qcn0d9 { gap: 60px; padding: 100px 20px 0px 20px; } .framer-UbNlY .framer-1yuz6n4, .framer-UbNlY .framer-yl5ue3 { max-width: unset; }}`], `framer-UbNlY`), Fr = $, $.displayName = `Resources 2`, $.defaultProps = { height: 1556, width: 1200 }, x($, [{ explicitInter: !0, fonts: [{ cssFamilyName: `Azeret Mono`, source: `google`, style: `normal`, uiFamilyName: `Azeret Mono`, url: `https://fonts.gstatic.com/s/azeretmono/v21/3XF5ErsiyJsY9O_Gepph-FvtTQgMQUdNekSfrvVh17aa-5s3AA.woff2`, weight: `500` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`, url: `../images/5vvr9vy74if2i6bqbjvbw7sy1pq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`, url: `../images/eor0mi4hntlgwnn9if640ezzxco.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+1F00-1FFF`, url: `../images/y9k9qrlzaqio88klkmbd8vomqc.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0370-03FF`, url: `../images/oyrd2tbibpvojxiihnlooxny9m.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF`, url: `../images/jeywfuapfzhqheg8u5gtpdz7wq.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`, url: `../images/grgckwrn6d3uz8ewclhzxwefc4.woff2`, weight: `400` }, { cssFamilyName: `Inter`, source: `framer`, style: `normal`, uiFamilyName: `Inter`, unicodeRange: `U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB`, url: `../images/b6y37fthzealdunqhicbt6futy.woff2`, weight: `400` }] }, ...fr, ...hr, ...gr, ...y(Me)], { supportsExplicitInterCodegen: !0 }), $.loader = { load: (e, t) => (t.locale, Promise.allSettled([w(Fe, {}, t), w(ur, {}, t)])) }, Ir = { exports: { default: { type: `reactComponent`, name: `FramerVwdWHxpTK`, slots: [], annotations: { framerAutoSizeImages: `true`, framerComponentViewportWidth: `true`, framerCanvasComponentVariantDetails: `{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"s31NvObUG":{"layout":["fixed","auto"]},"Z0ttYQm_T":{"layout":["fixed","auto"]}}}`, framerAcceptsLayoutTemplate: `true`, framerLayoutTemplateFlowEffect: `true`, framerScrollSections: `{"ZlvcDuOB7":{"pattern":":ZlvcDuOB7","name":"grow"}}`, framerDisplayContentsDiv: `false`, framerContractVersion: `1`, framerColorSyntax: `true`, framerIntrinsicWidth: `1200`, framerResponsiveScreen: `true`, framerImmutableVariables: `true`, framerIntrinsicHeight: `1556` } }, queryParamNames: { type: `variable`, annotations: { framerContractVersion: `1` } }, Props: { type: `tsType`, annotations: { framerContractVersion: `1` } }, __FramerMetadata__: { type: `variable` } } } }))();
export { Ir as __FramerMetadata__, Fr as default, vr as queryParamNames };
//# sourceMappingURL=SZrKpdXO66igYYfutt-WPe9DgRi0OUQR-0Ytm8t0S8s.DYtAN1QU.mjs.map