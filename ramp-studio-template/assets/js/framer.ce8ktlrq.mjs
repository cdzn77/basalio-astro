import { t as e } from "js/rolldown-runtime.blwatvxf.mjs";
import { A as t, B as n, C as r, D as i, E as a, F as o, I as s, L as c, M as l, N as u, O as d, P as f, R as p, T as m, V as h, _ as g, a as _, b as v, c as y, d as b, f as x, g as S, h as C, i as w, j as T, l as E, o as D, p as O, s as k, u as ee, v as A, w as j, x as te, y as M, z as ne } from "js/react.p9wvsw7c.mjs";
import { $ as re, A as ie, B as ae, C as oe, D as se, E as ce, F as le, G as ue, H as de, I as fe, J as pe, K as me, L as he, M as ge, O as N, Q as _e, R as ve, S as ye, T as P, U as be, V as xe, W as Se, X as F, Y as Ce, Z as I, _ as we, a as Te, b as Ee, c as De, d as Oe, et as L, f as ke, g as Ae, h as je, i as Me, j as Ne, k as Pe, l as Fe, m as Ie, n as Le, nt as Re, o as ze, p as Be, q as Ve, r as He, rt as Ue, s as We, tt as Ge, u as Ke, v as qe, w as Je, x as Ye, y as Xe } from "js/motion.dmld-do.mjs";

function Ze(e) { return typeof e == `function` }

function Qe(e) { return typeof e == `boolean` }

function R(e) { return typeof e == `string` }

function z(e) { return Number.isFinite(e) }

function $e(e) { return Array.isArray(e) }

function B(e) { return typeof e == `object` && !!e && !$e(e) }

function et(e) { for (let t in e) return !1; return !0 }

function tt(e) { return e === void 0 }

function nt(e) { return e === null }

function rt(e) { return e == null }

function it(e) { return e instanceof Date && !Number.isNaN(e.getTime()) }

function at(e) { return B(e) && Ze(e.return) }

function ot(e) { return B(e) && Ze(e.then) }

function st(e) { return e instanceof Promise }

function ct(e) { return `url('${lt(e)}')` }

function lt(e) { return `data:image/svg+xml,${e.replaceAll(`#`,`%23`).replaceAll(`'`,`%27`).replaceAll(`"`,`%22`)}` }

function ut(e, t) { let n = t instanceof Error ? t.stack ?? t.message : t; return `${e?`${e}
`:``}In case the issue persists, report this to the Framer team via https://www.framer.com/contact/${n?`:
${n}`:`.`}` }

function dt() { if (!hg) return; let e = document.querySelectorAll(`[rel="modulepreload"][data-framer-lazy]`); for (let t of e) { let e = t.getAttribute(`data-framer-lazy`),
         n = t.getAttribute(`href`); if (!e || !n) continue; let r = import(n).then(t => (Sg.set(e, t), t)).catch(t => { throw Sg.delete(e), console.warn(`Failed to import lazy module: ${n}`, t), t });
      r.catch(mg), Sg.set(e, r) } }

function ft(e) { return typeof e == `object` && !!e && !O(e) && wg in e }

function pt(e, t) { if (t in e) return e[t]; throw Error(`Module does not contain export '${t}'`) }

function mt(e, t = `default`, n) { let r, i, a, s = () => { if (i || !n || !Sg.has(n)) return; let e = Sg.get(n);
         st(e) ? c(() => e) : i = pt(e, t) },
      c = e => i ? Promise.resolve(i) : (r ||= e().then(e => { let n = pt(e, t); return i = n, n }).catch(e => { a = e }), r),
      l = !1,
      u = A(function(t, r) { if (o(() => { l = !0 }, []), a) throw a; if (s(), n !== void 0 && Cg !== void 0 && Cg.add(n), !i) throw c(e); return E(i, { ref: r, ...t }) }); return u.preload = () => (s(), c(e)), u.getStatus = () => ({ hasLoaded: i !== void 0, hasRendered: l }), u }

function ht(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }

function gt(e) { return e === null || !(Eg in e) ? !1 : typeof e.equals == `function` }

function _t(e, t) { return e === t ? !0 : e !== e && t !== t }

function vt(e, t) { let n = e.length; if (n !== t.length) return !1; for (let r = n; r-- !== 0;)
      if (!_t(e[r], t[r])) return !1; return !0 }

function yt(e, t) { let n = e.length; if (n !== t.length) return !1; for (let r = n; r-- !== 0;)
      if (!Tt(e[r], t[r], !0)) return !1; return !0 }

function bt(e, t) { if (e.size !== t.size) return !1; for (let [n, r] of e.entries())
      if (!_t(r, t.get(n))) return !1; return !0 }

function xt(e, t) { if (e.size !== t.size) return !1; for (let [n, r] of e.entries())
      if (!Tt(r, t.get(n), !0)) return !1; return !0 }

function St(e, t) { if (e.size !== t.size) return !1; for (let n of e.keys())
      if (!t.has(n)) return !1; return !0 }

function Ct(e, t) { let n = Tg(e); if (n.length !== Tg(t).length) return !1; for (let r of n)
      if (!ht(t, r) || !(r === `_owner` && ht(e, `$$typeof`) && e.$$typeof) && !_t(e[r], t[r])) return !1; return !0 }

function wt(e, t) { let n = Tg(e); if (n.length !== Tg(t).length) return !1; for (let r of n)
      if (!ht(t, r) || !(r === `_owner` && ht(e, `$$typeof`) && e.$$typeof) && !Tt(e[r], t[r], !0)) return !1; return !0 }

function Tt(e, t, n) { if (e === t) return !0; if (!e || !t) return e !== e && t !== t; let r = typeof e; if (r !== typeof t || r !== `object`) return !1; let i = Array.isArray(e),
      a = Array.isArray(t); if (i && a) return n ? yt(e, t) : vt(e, t); if (i !== a) return !1; let o = e instanceof Map,
      s = t instanceof Map; if (o && s) return n ? xt(e, t) : bt(e, t); if (o !== s) return !1; let c = e instanceof Set,
      l = t instanceof Set; if (c && l) return St(e, t); if (c !== l) return !1; let u = e instanceof Date,
      d = t instanceof Date; if (u && d) return e.getTime() === t.getTime(); if (u !== d) return !1; let f = e instanceof RegExp,
      p = t instanceof RegExp; return f && p ? e.toString() === t.toString() : f === p ? gt(e) && gt(t) ? e.equals(t) : n ? wt(e, t) : Ct(e, t) : !1 }

function Et(e, t, n = !0) { try { return Tt(e, t, n) } catch (e) { if (e instanceof Error && /stack|recursion/iu.exec(e.message)) return console.warn(`Warning: isEqual does not handle circular references.`, e.name, e.message), !1; throw e } }

function Dt(e) { return j.useCallback(t => e[t], [e]) }

function Ot({ api: e, children: t }) { return E(Dg.Provider, { value: e, children: t }) }

function kt() { return j.useContext(Dg) }

function At({ routes: e, children: t }) { let n = Dt(e),
      r = u(() => ({ getRoute: n }), [n]); return E(Dg.Provider, { value: r, children: t }) }

function jt() { let e = kt(),
      t = l(Og),
      n = t?.routeId ?? e.currentRouteId,
      r = t?.routeId ? t.pathVariables : e.currentPathVariables,
      i = n ? e.getRoute?.(n) : void 0; return u(() => { if (!(!n || !i)) return { ...i, id: n, pathVariables: r } }, [n, r, i]) }

function Mt() { let e = jt(); if (e) return `${e.id}-${JSON.stringify(e.pathVariables)}` }

function Nt(e) { let t = jt(),
      n = j.useRef(t);
   Et(n.current, t) || !t || (n.current = t, e(t)) }

function Pt(e) { let t = kt(); if (e) return t.getRoute?.(e) }

function Ft(e, t) { if (t && e) return e.elements && t in e.elements ? e.elements[t] : t }

function It(e) { let t = [`pointerdown`, `pointerup`, `keydown`, `keyup`],
      n = e => { let n = e.type;
         t.includes(n) && performance.mark(`framer-navigation-input`, { detail: { type: n } }) }; for (let r = 0; r < t.length; r++) document.addEventListener(t[r], n, { signal: e }); return () => { for (let e = 0; e < t.length; e++) document.removeEventListener(t[e], n) } }

function Lt(e, t) { let n = jt(),
      r = Pt(t) ?? n; return j.useMemo(() => r ? Ft(r, e) : e, [e, r]) }

function Rt() { return jt()?.pathVariables }

function V(e, ...t) { if (e) return; let n = Error(`Assertion Error` + (t.length > 0 ? `: ` + t.join(` `) : ``)); if (n.stack) try { let e = n.stack.split(`
`);
      e[1]?.includes(`assert`) ? (e.splice(1, 1), n.stack = e.join(`
`)) : e[0]?.includes(`assert`) && (e.splice(0, 1), n.stack = e.join(`
`)) } catch {}
   throw n }

function H(e, t) { throw t instanceof Error ? t : t === void 0 ? Error(e ? `Unexpected value: ${e}` : `Application entered invalid state`) : Error(String(t)) }

function zt(e) { return Object(e) !== e }

function Bt(e) { let t = Object.getPrototypeOf(e); return t === Object.prototype || t === null || Object.getPrototypeOf(t) === null || Object.getOwnPropertyNames(t).sort().join(`\0`) === Lg }

function Vt(e) { return Object.prototype.toString.call(e).slice(8, -1) }

function Ht(e) { switch (e) {
      case `"`:
         return `\\"`;
      case `<`:
         return `\\u003C`;
      case `\\`:
         return `\\\\`;
      case `
`:
         return `\\n`;
      case `\r`:
         return `\\r`;
      case `	`:
         return `\\t`;
      case `\b`:
         return `\\b`;
      case `\f`:
         return `\\f`;
      case `\u2028`:
         return `\\u2028`;
      case `\u2029`:
         return `\\u2029`;
      default:
         return e < ` ` ? `\\u${e.charCodeAt(0).toString(16).padStart(4,`0`)}` : `` } }

function Ut(e) { let t = ``,
      n = 0,
      r = e.length; for (let i = 0; i < r; i += 1) { let r = e[i],
         a = Ht(r);
      a && (t += e.slice(n, i) + a, n = i + 1) } return `"${n===0?e:t+e.slice(n)}"` }

function Wt(e) { return Object.getOwnPropertySymbols(e).filter(t => Object.getOwnPropertyDescriptor(e, t).enumerable) }

function Gt(e) { return Rg.test(e) ? `.` + e : `[` + JSON.stringify(e) + `]` }

function Kt(e) { if (e.length === 0 || e.length > 1 && e.charCodeAt(0) === 48) return !1; for (let t = 0; t < e.length; t++) { let n = e.charCodeAt(t); if (n < 48 || n > 57) return !1 } let t = +e; return !(t >= 2 ** 32 - 1 || t < 0) }

function qt(e) { let t = Object.keys(e); for (var n = t.length - 1; n >= 0 && !Kt(t[n]); n--); return t.length = n + 1, t }

function Jt(e) { let t = new DataView(e),
      n = ``; for (let r = 0; r < e.byteLength; r++) n += String.fromCharCode(t.getUint8(r)); return Zt(n) }

function Yt(e) { let t = Xt(e),
      n = new ArrayBuffer(t.length),
      r = new DataView(n); for (let e = 0; e < n.byteLength; e++) r.setUint8(e, t.charCodeAt(e)); return n }

function Xt(e) { e.length % 4 == 0 && (e = e.replace(/==?$/, ``)); let t = ``,
      n = 0,
      r = 0; for (let i = 0; i < e.length; i++) n <<= 6, n |= zg.indexOf(e[i]), r += 6, r === 24 && (t += String.fromCharCode((n & 16711680) >> 16), t += String.fromCharCode((n & 65280) >> 8), t += String.fromCharCode(n & 255), n = r = 0); return r === 12 ? (n >>= 4, t += String.fromCharCode(n)) : r === 18 && (n >>= 2, t += String.fromCharCode((n & 65280) >> 8), t += String.fromCharCode(n & 255)), t }

function Zt(e) { let t = ``; for (let n = 0; n < e.length; n += 3) { let r = [void 0, void 0, void 0, void 0];
      r[0] = e.charCodeAt(n) >> 2, r[1] = (e.charCodeAt(n) & 3) << 4, e.length > n + 1 && (r[1] |= e.charCodeAt(n + 1) >> 4, r[2] = (e.charCodeAt(n + 1) & 15) << 2), e.length > n + 2 && (r[2] |= e.charCodeAt(n + 2) >> 6, r[3] = e.charCodeAt(n + 2) & 63); for (let e = 0; e < r.length; e++) r[e] === void 0 ? t += `=` : t += zg[r[e]] } return t }

function Qt(e, t) { return $t(JSON.parse(e), t) }

function $t(e, t) { if (typeof e == `number`) return a(e, !0); if (!Array.isArray(e) || e.length === 0) throw Error(`Invalid input`); let n = e,
      r = Array(n.length),
      i = null;

   function a(e, o = !1) { if (e === Bg) return; if (e === Hg) return NaN; if (e === Ug) return 1 / 0; if (e === Wg) return -1 / 0; if (e === Gg) return -0; if (o || typeof e != `number`) throw Error(`Invalid input`); if (e in r) return r[e]; let s = n[e]; if (!s || typeof s != `object`) r[e] = s;
      else if (Array.isArray(s))
         if (typeof s[0] == `string`) { let o = s[0],
               c = t && Object.hasOwn(t, o) ? t[o] : void 0; if (c) { let t = s[1]; if (typeof t != `number` && (t = n.push(s[1]) - 1), i ??= new Set, i.has(t)) throw Error(`Invalid circular reference`); return i.add(t), r[e] = c(a(t)), i.delete(t), r[e] } switch (o) {
               case `Date`:
                  r[e] = new Date(s[1]); break;
               case `Set`:
                  let t = new Set;
                  r[e] = t; for (let e = 1; e < s.length; e += 1) t.add(a(s[e])); break;
               case `Map`:
                  let i = new Map;
                  r[e] = i; for (let e = 1; e < s.length; e += 2) i.set(a(s[e]), a(s[e + 1])); break;
               case `RegExp`:
                  r[e] = new RegExp(s[1], s[2]); break;
               case `Object`:
                  let c = Object(s[1]); if (Object.hasOwn(c, `__proto__`)) throw Error("Cannot parse an object with a `__proto__` property");
                  r[e] = c; break;
               case `BigInt`:
                  r[e] = BigInt(s[1]); break;
               case `null`:
                  let l = Object.create(null);
                  r[e] = l; for (let e = 1; e < s.length; e += 2) { if (s[e] === `__proto__`) throw Error("Cannot parse an object with a `__proto__` property");
                     l[s[e]] = a(s[e + 1]) } break;
               case `Int8Array`:
               case `Uint8Array`:
               case `Uint8ClampedArray`:
               case `Int16Array`:
               case `Uint16Array`:
               case `Int32Array`:
               case `Uint32Array`:
               case `Float32Array`:
               case `Float64Array`:
               case `BigInt64Array`:
               case `BigUint64Array`: { if (n[s[1]][0] !== `ArrayBuffer`) throw Error(`Invalid data`); let t = globalThis[o],
                     i = new t(a(s[1]));
                  r[e] = s[2] === void 0 ? i : i.subarray(s[2], s[3]); break }
               case `ArrayBuffer`: { let t = s[1]; if (typeof t != `string`) throw Error(`Invalid ArrayBuffer encoding`);
                  r[e] = Yt(t); break }
               case `Temporal.Duration`:
               case `Temporal.Instant`:
               case `Temporal.PlainDate`:
               case `Temporal.PlainTime`:
               case `Temporal.PlainDateTime`:
               case `Temporal.PlainMonthDay`:
               case `Temporal.PlainYearMonth`:
               case `Temporal.ZonedDateTime`: { let t = o.slice(9);
                  r[e] = Temporal[t].from(s[1]); break }
               case `URL`:
                  r[e] = new URL(s[1]); break;
               case `URLSearchParams`:
                  r[e] = new URLSearchParams(s[1]); break;
               default:
                  throw Error(`Unknown type ${o}`) } } else if (s[0] === Kg) { let t = s[1]; if (!Number.isInteger(t) || t < 0) throw Error(`Invalid input`); let n = Array(t);
         r[e] = n; for (let e = 2; e < s.length; e += 2) { let r = s[e]; if (!Number.isInteger(r) || r < 0 || r >= t) throw Error(`Invalid input`);
            n[r] = a(s[e + 1]) } } else { let t = Array(s.length);
         r[e] = t; for (let e = 0; e < s.length; e += 1) { let n = s[e];
            n !== Vg && (t[e] = a(n)) } } else { let t = {};
         r[e] = t; for (let e of Object.keys(s)) { if (e === `__proto__`) throw Error("Cannot parse an object with a `__proto__` property"); let n = s[e];
            t[e] = a(n) } } return r[e] } return a(0) }

function en(e, t) { let n = [],
      r = new Map,
      i = []; if (t)
      for (let e of Object.getOwnPropertyNames(t)) i.push({ key: e, fn: t[e] }); let a = [],
      o = 0;

   function s(t) { if (t === void 0) return Bg; if (Number.isNaN(t)) return Hg; if (t === 1 / 0) return Ug; if (t === -1 / 0) return Wg; if (t === 0 && 1 / t < 0) return Gg; if (r.has(t)) return r.get(t); let c = o++;
      r.set(t, c); for (let { key: e, fn: r } of i) { let i = r(t); if (i) return n[c] = `["${e}",${s(i)}]`, c } if (typeof t == `function`) throw new Ig(`Cannot stringify a function`, a, t, e); let l = ``; if (zt(t)) l = tn(t);
      else { let n = Vt(t); switch (n) {
            case `Number`:
            case `String`:
            case `Boolean`:
               l = `["Object",${tn(t)}]`; break;
            case `BigInt`:
               l = `["BigInt",${t}]`; break;
            case `Date`:
               l = `["Date","${isNaN(t.getDate())?``:t.toISOString()}"]`; break;
            case `URL`:
               l = `["URL",${Ut(t.toString())}]`; break;
            case `URLSearchParams`:
               l = `["URLSearchParams",${Ut(t.toString())}]`; break;
            case `RegExp`:
               let { source: r, flags: i } = t;
               l = i ? `["RegExp",${Ut(r)},"${i}"]` : `["RegExp",${Ut(r)}]`; break;
            case `Array`: { let e = !1;
               l = `[`; for (let n = 0; n < t.length; n += 1)
                  if (n > 0 && (l += `,`), Object.hasOwn(t, n)) a.push(`[${n}]`), l += s(t[n]), a.pop();
                  else if (e) l += Vg;
               else { let n = qt(t),
                     r = n.length,
                     i = String(t.length).length; if ((t.length - r) * 3 > 4 + i + r * (i + 1)) { l = `[` + Kg + `,` + t.length; for (let e = 0; e < n.length; e++) { let r = n[e];
                        a.push(`[${r}]`), l += `,` + r + `,` + s(t[r]), a.pop() } break } else e = !0, l += Vg } l += `]`; break }
            case `Set`:
               l = `["Set"`; for (let e of t) l += `,${s(e)}`;
               l += `]`; break;
            case `Map`:
               l = `["Map"`; for (let [e, n] of t) a.push(`.get(${zt(e)?tn(e):`...`})`), l += `,${s(e)},${s(n)}`, a.pop();
               l += `]`; break;
            case `Int8Array`:
            case `Uint8Array`:
            case `Uint8ClampedArray`:
            case `Int16Array`:
            case `Uint16Array`:
            case `Int32Array`:
            case `Uint32Array`:
            case `Float32Array`:
            case `Float64Array`:
            case `BigInt64Array`:
            case `BigUint64Array`: { let e = t;
               l = `["` + n + `",` + s(e.buffer); let r = t.byteOffset,
                  i = r + t.byteLength; if (r > 0 || i !== e.buffer.byteLength) { let e = /(\d+)/.exec(n)[1] / 8;
                  l += `,${r/e},${i/e}` } l += `]`; break }
            case `ArrayBuffer`:
               l = `["ArrayBuffer","${Jt(t)}"]`; break;
            case `Temporal.Duration`:
            case `Temporal.Instant`:
            case `Temporal.PlainDate`:
            case `Temporal.PlainTime`:
            case `Temporal.PlainDateTime`:
            case `Temporal.PlainMonthDay`:
            case `Temporal.PlainYearMonth`:
            case `Temporal.ZonedDateTime`:
               l = `["${n}",${Ut(t.toString())}]`; break;
            default:
               if (!Bt(t)) throw new Ig(`Cannot stringify arbitrary non-POJOs`, a, t, e); if (Wt(t).length > 0) throw new Ig(`Cannot stringify POJOs with symbolic keys`, a, t, e); if (Object.getPrototypeOf(t) === null) { l = `["null"`; for (let n of Object.keys(t)) { if (n === `__proto__`) throw new Ig(`Cannot stringify objects with __proto__ keys`, a, t, e);
                     a.push(Gt(n)), l += `,${Ut(n)},${s(t[n])}`, a.pop() } l += `]` } else { l = `{`; let n = !1; for (let r of Object.keys(t)) { if (r === `__proto__`) throw new Ig(`Cannot stringify objects with __proto__ keys`, a, t, e);
                     n && (l += `,`), n = !0, a.push(Gt(r)), l += `${Ut(r)}:${s(t[r])}`, a.pop() } l += `}` } } } return n[c] = l, c } let c = s(e); return c < 0 ? `${c}` : `[${n.join(`,`)}]` }

function tn(e) { let t = typeof e; return t === `string` ? Ut(e) : e instanceof String ? Ut(e.toString()) : e === void 0 ? Bg.toString() : e === 0 && 1 / e < 0 ? Gg.toString() : t === `bigint` ? `["BigInt","${e}"]` : String(e) }

function nn(e, t, n = `lazy`) { switch (K.__framer_events?.push([e, t, n]), e) {
      case `published_site_click`: { let { trackingId: e, href: n } = t;
         e && document.dispatchEvent(new CustomEvent(`framer:click`, { detail: { trackingId: e, href: n } })); break }
      case `published_site_form_submit`: { let { trackingId: e } = t;
         e && document.dispatchEvent(new CustomEvent(`framer:formsubmit`, { detail: { trackingId: e } })); break }
      case `published_site_pageview`: { let { framerLocale: e } = t;
         document.dispatchEvent(new CustomEvent(`framer:pageview`, { detail: { framerLocale: e } })); break }
      case `published_site_trigger_invoke`: { let { trackingId: e } = t;
         e && document.dispatchEvent(new CustomEvent(`framer:triggerinvoke`, { detail: { trackingId: e } })); break } } }

function rn(e) { return R(e) && (e === `` || Jg.test(e)) }

function an() { return {
      [Yg.QueryCache]: new Map, [Yg.CollectionUtilsCache]: new Map } }

function on() { if (!hg) return; if (Xg !== void 0) return Xg; let e = document.getElementById(`__framer__handoverData`); if (e) { try { Xg = Qt(e.text) ?? an() } catch (e) { Xg = an(), console.warn(`Failed to parse handover data. Falling back to network.`, e) } return vg(() => { e?.remove(), e = null }), Xg } }

function sn(e, t) { if (console.warn(ut(`Failed to resolve raw query result from DOM during hydration for: ${t}. This might make the page load slightly slower.`)), Math.random() < .01) { let t = e instanceof Error && typeof e.stack == `string` ? e.stack : null;
      nn(`published_site_load_error`, { message: String(e), stack: t }) } }

function cn(e, t) { let n = on(); return n ? n[e].has(t) : !1 }

function ln(e, t) { let n = on(); if (!n) return; let r = n[e]; if (!r.has(t)) return; let i = r.get(t); return r.delete(t), i }

function un(e) { return e?.id ?? Ng }

function dn(e, t, n, r) { return `${e}|${t}|${n}|${r}` }

function fn(e) { return t => { if (!e) return; let n = e[t]; if (!n) return; if (e_.has(n)) return e_.get(n); let r = new n_(n, t); return e_.set(n, r), r } }

function pn({ children: e, collectionUtils: t }) { let n = u(() => ({ get: fn(t) }), [t]); return E(t_.Provider, { value: n, children: e }) }

function mn() { return l(t_) }

function hn() { for (let e of a_) e();
   a_.clear() }

function gn(e) { return new Promise(t => { if (a_.add(t), document.hidden) { hn(); return } document.addEventListener(`visibilitychange`, hn), document.addEventListener(`pagehide`, hn), je.read(() => { vn(e).then(() => { a_.delete(t), !e?.signal?.aborted && t() }) }) }) }

function _n(e) { return new Promise(t => { setTimeout(t, 100), je.read(() => { vn(e).then(t) }, !1, !0) }) }

function vn(e) { let t = e?.priority; return r_ || i_ ? t === `background` ? new Promise(e => { setTimeout(e, 1) }) : r_ ? K.scheduler.yield(e).catch(mg) : K.scheduler.postTask(() => {}, e).catch(mg) : t === `user-blocking` ? Promise.resolve() : new Promise(e => { setTimeout(e, t === `background` ? 1 : 0) }) }

function yn(e) { let { continueAfter: t, ensureContinueBeforeUnload: n, ...r } = e ?? {}; return n ? gn(r) : t === `paint` ? _n(r) : vn(r) }

function bn() { let e = mn(),
      { autobahnNavigation: t } = Mg(),
      { getRoute: n } = kt(); return f((r, i, a = !0, o = !0) => { if (!r || !n) return; let s = n(r),
         { pathVariables: c, locale: l } = i; return Sn(s, { routeId: r, pathVariables: c, locale: l, collectionUtils: e }, a, o && t) }, [n, e, t]) }

function xn(e, t = !0) { let n = bn();
   o(() => { if (!(!t || !o_))
         for (let t of e) n(t, {}) }, [e, t, n]) } async function Sn(e, t, n = !0, r = !0) { if (!o_ || !e) return; let i = e.page; if (!(!i || !ft(i))) { n && await yn(); try { let e = await i.preload();
         r && t && e && await Cn(e, t) } catch {} } } async function Cn(e, t) { let n = e.loader; if (!n?.load) return; let r = { signal: t.signal ?? new AbortController().signal, pathVariables: t.pathVariables ?? {}, routeId: t.routeId, locale: t.locale, collectionUtils: t.collectionUtils }; try { await n.load({}, r) } catch {} }

function wn(e, t) { if (!e.startsWith(`/`) || !t.startsWith(`/`)) throw Error(`from/to paths are expected to be absolute`); let [n] = Tn(e), [r, i] = Tn(t), a = En(n, r); return a === `` && (a = `.`), !a.startsWith(`.`) && !a.startsWith(`/`) && (a = `./` + a), a + `/` + i }

function Tn(e) { let t = e.lastIndexOf(`/`); return [e.substring(0, t + 1), e.substring(t + 1)] }

function En(e, t) { if (e === t || (e = `/` + Dn(e), t = `/` + Dn(t), e === t)) return ``; let n = e.length,
      r = n - 1,
      i = t.length - 1,
      a = r < i ? r : i,
      o = -1,
      s = 0; for (; s < a; s++) { let n = l_(e, 1 + s); if (n !== l_(t, 1 + s)) break;
      n === c_ && (o = s) } if (s === a)
      if (i > a) { if (l_(t, 1 + s) === c_) return d_(t, 1 + s + 1); if (s === 0) return d_(t, 1 + s) } else r > a && (l_(e, 1 + s) === c_ ? o = s : s === 0 && (o = 0)); let c = ``; for (s = 1 + o + 1; s <= n; ++s)(s === n || l_(e, s) === c_) && (c += c.length === 0 ? `..` : `/..`); return `${c}${d_(t,1+o)}` }

function Dn(e) { let t = ``,
      n = 0,
      r = -1,
      i = 0,
      a = 0; for (let o = 0; o <= e.length; ++o) { if (o < e.length) a = l_(e, o);
      else if (m_(a)) break;
      else a = c_; if (m_(a)) { if (!(r === o - 1 || i === 1))
            if (i === 2) { if (t.length < 2 || n !== 2 || l_(t, t.length - 1) !== s_ || l_(t, t.length - 2) !== s_) { if (t.length > 2) { let e = u_(t, p_);
                     e === -1 ? (t = ``, n = 0) : (t = d_(t, 0, e), n = t.length - 1 - u_(t, p_)), r = o, i = 0; continue } else if (t.length !== 0) { t = ``, n = 0, r = o, i = 0; continue } } f_ && (t += t.length > 0 ? `${p_}..` : `..`, n = 2) } else t.length > 0 ? t += `${p_}${d_(e,r+1,o)}` : t = d_(e, r + 1, o), n = o - r - 1;
         r = o, i = 0 } else a === s_ && i !== -1 ? ++i : i = -1 } return t }

function On(e, t) { return e.replace(g_, (e, n) => { let r = t[n]; return typeof r != `string` || r.length === 0 ? e : encodeURIComponent(r) }) }

function kn(e, t = !1) { let n = ``; if (h !== void 0)
      if (t) n = h.location.search;
      else { let e = h.history?.state?.queryParamBackAnchorSearch;
         n = e === void 0 ? h.location.search : e === `` ? `` : `?${e}` } return n ? An(n, e) : e }

function An(e, t) { let n = t.indexOf(`#`),
      r = n === -1 ? t : t.substring(0, n),
      i = n === -1 ? `` : t.substring(n),
      a = r.indexOf(`?`),
      o = a === -1 ? r : r.substring(0, a),
      s = a === -1 ? `` : r.substring(a),
      c = new URLSearchParams(s),
      l = new URLSearchParams(e); for (let [e, t] of l) c.has(e) || e !== __ && c.append(e, t); let u = c.toString(); return u === `` ? r + i : o + `?` + u + i } async function jn(e, t, n, r, i, a, o) { let s = e,
      c = !1,
      l = { ...a },
      u = Array.from(s.matchAll(g_)),
      d = await Promise.all(u.map(async e => { let s = e?.[0],
            u = e?.[1]; if (!s || !u) throw Error(`Failed to replace path variables: unexpected regex match group`); let d = a[u]; if (!d || !R(d)) throw Error(`No slug found for path variable ${u}`); let f = o?.get(i); if (!f || !t) return d; let p = f.getRecordIdBySlug(d, t),
            m = st(p) ? await p : p; if (!m) return d; let h = f.getSlugByRecordId(m, n),
            g = st(h) ? await h : h; if (!g) { c = !0; let e = f.getSlugByRecordId(m, r),
               t = st(e) ? await e : e; return t && (l[u] = t), t ?? d } return l[u] = g, g })),
      f = 0,
      p = ``,
      m = !1; for (let e = 0; e < u.length; e++) { let t = u[e],
         n = d[e];!t || !n || (p += s.substring(f, t.index), f = (t.index ?? 0) + (t[0]?.length ?? 0), p += d[e], m = !0) } return m && (p += s.substring(f), s = p), { path: s, pathVariables: l, isMissingInLocale: c } } async function Mn({ currentLocale: e, nextLocale: t, defaultLocale: n, route: r, pathVariables: i, collectionUtils: a, preserveQueryParams: o }) { let { path: s, pathLocalized: c } = r, l = c?.[t.id] ?? s, u = { path: l, pathVariables: i, isMissingInLocale: !1 }; if (!l) return u; if (i && r.collectionId) try { u = await jn(l, e, t, n, r.collectionId, i, a) } catch {}
   return t.slug && (u.path = `/` + t.slug + u.path), o && u.path && (u.path = kn(u.path, !0)), u }

function Nn(e) { if (!e) return ``; let t; try { t = new URL(e) } catch { return `` } return t.pathname === `/` || h.location.origin !== t.origin ? `` : t.pathname.endsWith(`/`) ? t.pathname.slice(0, -1) : t.pathname }

function Pn({ children: e, value: t }) { return E(v_.Provider, { value: t, children: e }) }

function Fn() { return j.useContext(v_) }

function In(e, t, { global: n, routes: r }) { return r[e]?.[t] || n }

function Ln(e) { let t = y_,
      n = e.next(0),
      r = [n.value]; for (; !n.done && t < b_;) n = e.next(t), r.push(n.value), t += y_; return r.length === 1 && r.push(n.value), { easing: `linear(${r.join(`,`)})`, duration: t - y_ } }

function Rn(e) { return [parseFloat(e), e.endsWith(`px`) ? `px` : `%`] }

function zn(e) { let { innerWidth: t, innerHeight: n } = h, [r, i] = Rn(e.x), [a, o] = Rn(e.y); return { x: i === `px` ? r : r / 100 * t, y: o === `px` ? a : a / 100 * n } }

function Bn(e, t, n, r) { let i = `
      opacity: ${e.opacity};
      transform: translate(${e.x}, ${e.y}) scale(${e.scale}) rotateX(${e.rotateX}deg) rotateY(${e.rotateY}deg) rotateZ(${e.rotate}deg);
    `; return e.mask && (i += r?.makeKeyframe?.(e.mask, t, n) || ``), i }

function Vn(e) { return e ? S_[e] : void 0 }

function Hn(e, { transition: t, ...n }) { let r = `view-transition-` + e,
      i = { duration: `0s`, easing: `linear` }; if (t.type === `tween`) i.duration = t.duration + `s`, i.easing = `cubic-bezier(${t.ease.join(`,`)})`;
   else if (Un(t)) { let { easing: e, duration: n } = Ln(se({ keyframes: [0, 1], ...Wn(t), restDelta: .001, restSpeed: 1e-4 }));
      i.duration = n + `ms`, i.easing = e } let a = Vn(n?.mask?.type),
      o = Bn(n, `start`, e, a),
      s = Bn({ ...C_, mask: n.mask }, `end`, e, a); return e === `exit` && ([o, s] = [s, o]), `
        ${n.mask&&a?.makePropertyRules?a.makePropertyRules(n.mask):``}

        @keyframes ${r} {
            0% {
                ${o}
            }

            100% {
                ${s}
            }
        }

        ::view-transition-${e===`enter`?`new`:`old`}(root) {
            animation-name: ${r};
            animation-duration: ${i.duration};
            animation-delay: ${t.delay}s;
            animation-timing-function: ${i.easing};
            animation-fill-mode: both;
            ${n.mask&&a?.makeStyles?a.makeStyles(n.mask,e):``}
        }
    ` }

function Un(e) { return e.type === `spring` }

function Wn(e) { return e.durationBasedSpring ? { duration: e.duration * 1e3, bounce: e.bounce } : { stiffness: e.stiffness, damping: e.damping, mass: e.mass } }

function Gn({ exit: e = T_, enter: t }) { let n = document.createElement(`style`);
   n.id = w_; let r = `
        @media (prefers-reduced-motion) {
            ::view-transition-group(*),
            ::view-transition-old(*),
            ::view-transition-new(*) {
                animation: none !important;
            }
        }
    `;
   (e.mask || t.mask || e.opacity || t.opacity || e.transition.delay || t.transition.delay) && (r += `
            ::view-transition-old(*),
            ::view-transition-new(*) {
                mix-blend-mode: normal;
            }
        `), r += `
        ::view-transition-old(*),
        ::view-transition-new(*) {
            backface-visibility: hidden;
        }
    `, r += Hn(`exit`, e), r += Hn(`enter`, t), n.textContent = r, document.head.appendChild(n) }

function Kn() { vg(() => { je.render(() => { performance.mark(`framer-vt-remove`); let e = document.getElementById(w_);
         e && document.head.removeChild(e) }) }) }

function qn() { return !!document.startViewTransition }

function Jn(e) { return new Promise(t => { je.render(() => { performance.mark(`framer-vt-style`), Gn(e), t() }) }) } async function Yn(e, t, n) { if (!qn()) { e(); return } if (await Jn(t), n?.aborted) return;
   performance.mark(`framer-vt`); let r = document.startViewTransition(async () => { performance.mark(`framer-vt-freeze`), !n?.aborted && (n?.addEventListener(`abort`, () => r.skipTransition()), await e()) }); return r.updateCallbackDone.then(() => { performance.mark(`framer-vt-unfreeze`) }).catch(E_), Promise.all([r.ready, r.finished]).then(() => { performance.mark(`framer-vt-finished`), Kn() }).catch(E_), r }

function Xn() { let e = Fn(),
      n = t(void 0); return o(() => { n.current &&= (n.current(), void 0) }), f((t, r, i, a) => { let o = In(t, r, e); if (o) { let e = new Promise(e => { n.current = e }); return Yn(async () => { i(), await e }, o, a) } i() }, [e]) }

function Zn(e, t) { vg(() => { let n = document.querySelector(`link[rel='canonical']`); if (!n) return; let r = new URL(e, t);
      r.search = ``, n.setAttribute(`href`, r.toString()) }) }

function Qn(e, t, n, r = m) { r(() => { let t = async e => (await yn({ ...n, continueAfter: `paint` }), e()), r = t(e); return () => {
         (async () => { let e = await r;
            e && t(e) })() } }, t) }

function $n(e) { let n = t(void 0); return Qn(() => { n.current &&= (n.current(), void 0) }, void 0, { priority: `user-blocking` }), f(t => { let r = new Promise(e => { n.current = e }); if (!e) return { promise: r, measureDetail: t, ignore: null }; let i = `${e}-start`,
         a = `${e}-end`,
         o = !1; return performance.mark(i), r.finally(() => { o || (performance.mark(a), performance.measure(e, { start: i, end: a, detail: t })) }).catch(e => { console.error(e) }), { promise: r, measureDetail: t, ignore: () => { o = !0, n.current?.(), n.current = void 0 } } }, [e]) } async function er(e, t, { currentRoutePath: n, currentRoutePathLocalized: r, currentPathVariables: i, hash: a, pathVariables: o, localeId: s, preserveQueryParams: c, siteCanonicalURL: l }, u = !1) { let { path: d } = t; if (!d) return; let f = sr(t, { currentRoutePath: n, currentRoutePathLocalized: r, currentPathVariables: i, hash: a, pathVariables: o, preserveQueryParams: c, siteCanonicalURL: l, localeId: s }); try { return await rr({ routeId: e, hash: a, pathVariables: o, localeId: s }, f, u) } catch {} }

function tr(e) { return B(e) && R(e.routeId) }

function nr(e, t, n = !1) { performance.mark(`framer-history-replace`), t && Zn(t, h.location.href), (n ? h.history.__proto__.replaceState : h.history.replaceState).call(h.history, e, ``, t) } async function rr(e, t, n = !1) { if (performance.mark(`framer-history-push`), Zn(t, h.location.href), !n) { h.history.pushState(e, ``, t); return } let r = !1,
      i;
   k_ && (i = () => { if (r = !0, A_) return; let e = `Popstate called after intercept(). Please report this to the Framer team.`;
      console.error(e), nn(`published_site_load_recoverable_error`, { message: e }) }, h.addEventListener(`popstate`, i, { once: !0 })), A_ && k_ ? h.history.__proto__.pushState.call(h.history, e, ``, t) : h.history.pushState(e, ``, t), k_ && queueMicrotask(() => { r || (k_ = !1, h.removeEventListener(`popstate`, i)) }) }

function ir({ disabled: e, routeId: t, initialPathVariables: n, initialLocaleId: r }) { m(() => { if (e) return;
      performance.mark(`framer-history-set-initial-state`); let i = B(h.history.state) ? h.history.state : {},
         a = h.location.hash ? h.location.hash.slice(1) : void 0;
      nr({ ...i, routeId: t, hash: a, pathVariables: n, localeId: r }, void 0, !0) }, []) }

function ar(e, n) { let r = Xn(),
      i = $n(`framer-route-change`),
      a = t(void 0),
      s = f(async ({ state: t }) => { if (h.navigation?.transition && h.navigation?.transition?.navigationType !== `traverse` || !B(t)) return; let { routeId: o, hash: s, pathVariables: c, localeId: l } = t; if (!R(o)) return; let u = i({ popstate: !0 }),
            d = It();
         u.promise.finally(d); let f = await r(e.current, o, () => { n(o, R(l) ? l : void 0, R(s) ? s : void 0, h.location.pathname + h.location.search + h.location.hash, B(c) ? c : void 0, !0, u, !1) }),
            p = h.navigation?.transition;
         await (f?.updateCallbackDone ?? Promise.resolve()).then(a.current?.resolve).catch(a.current?.reject), await u.promise; try { await p?.finished } catch (e) { console.warn(`Popstate transition failed`, e) } O_(), Zn(h.location.href) }, [e, i, n, r]),
      c = f(e => { e.navigationType !== `traverse` || !e.canIntercept || e.intercept({ async handler() { await new Promise((e, t) => { a.current = { resolve: e, reject: t } }), a.current = void 0 }, scroll: `after-transition` }) }, []);
   o(() => (h.addEventListener(`popstate`, s), j_ && h.navigation.addEventListener(`navigate`, c), () => { h.removeEventListener(`popstate`, s), j_ && h.navigation.removeEventListener(`navigate`, c) }), [s, c]) }

function or(e, t, n) { let r = Ft(t, e); if (!r) return; let i = Object.assign({}, t?.elements, n); return r.replace(g_, (e, t) => i[t] ?? e) }

function sr(e, { currentRoutePath: t, currentRoutePathLocalized: n, currentPathVariables: r, hash: i, pathVariables: a, hashVariables: o, relative: s = !0, preserveQueryParams: c, onlyHash: l = !1, siteCanonicalURL: u, localeId: d }) { let f = or(i, e, o); if (l) return f ?? ``; let p = t ?? `/`;
   n && d && (p = n[d] ?? p), r && (p = p.replace(g_, (e, t) => String(r[t] || e))); let m = (d ? e?.pathLocalized?.[d] : void 0) ?? e?.path ?? `/`;
   a && (m = m.replace(g_, (e, t) => String(a[t] || e))); let g = !!(p === m && f); if (s)
      if (h_.has(p) && h !== void 0) { let e = Nn(u);
         m = wn(h.location.pathname, e + m) } else m = wn(p, m); return (c || g) && (m = kn(m, g)), f && (m = `${m}#${f}`), m } async function cr(e, t, n) { if (!e.path || !t) return !1; let r = `${n.slug?`/${n.slug}`:``}${On(e.path,t)}`; return (await fetch(r, { method: `HEAD`, redirect: `manual` })).type === `opaqueredirect` ? (h.location.href = h.location.origin + r, !0) : !1 }

function lr() { let e = mn(); return f(t => ur({ ...t, collectionUtils: e }), [e]) } async function ur(e) { let t = await Mn(e); if (t) { try { localStorage.preferredLocale = e.nextLocale.code } catch {} try { if (!R(t.path)) throw Error(`Expected result.path to be a string`); if (t.isMissingInLocale && await cr(e.route, t.pathVariables, e.nextLocale)) return } catch {} return t } }

function dr(e, t) { try { let n = h.history.state; if (!tr(n)) return; let r = n?.paginationInfo === void 0 || n.paginationInfo[e] === void 0,
         i = { ...n.paginationInfo, [e]: t };
      nr({ ...n, paginationInfo: i }, void 0, r) } catch {} }

function fr() { let e = t(Promise.resolve()),
      n = t(),
      r = f(t => { if (t.navigationType === `traverse` || !t.canIntercept) return; let r = n.current;
         r?.signal.addEventListener(`abort`, () => { r.abort(`user aborted`) }), t.intercept({ handler: () => e.current }) }, []); return f((t, i, a) => { if (!j_) { i(); return } e.current = t, n.current = a, h.navigation.addEventListener(`navigate`, r), i(!0), t.finally(() => { h.navigation.removeEventListener(`navigate`, r) }) }, [r]) }

function pr(e) { let t = 0,
      n = e.length; for (; t < n && e[t] === `-`;) t++; for (; n > t && e[n - 1] === `-`;) n--; return e.slice(t, n) }

function mr(e) { return pr(e.trim().toLowerCase().replace(M_, `-`)) }

function hr({ children: e, value: t }) { return E(P_.Provider, { value: t, children: e }) }

function gr() { return l(P_) }

function _r(e, n) { let r = c(() => ({ inputs: n, result: e() }))[0],
      i = t(!0),
      a = t(r),
      s = i.current || n && a.current.inputs && Et(n, a.current.inputs, !1) ? a.current : { inputs: n, result: e() }; return o(() => { i.current = !1, a.current = s }, [s]), s.result }

function vr(e, t) { return _r(() => e, t) }

function yr() { return j.useContext(L_) }

function br() { return yr().activeLocale?.code ?? `en-US` }

function xr({ children: e }) { let t = gr(),
      [n, r] = c(() => t === `preview` || h === void 0 ? `` : h.location.search);
   o(() => { if (t === `preview`) return;
      M(() => { r(h.location.search) }); let e = () => { M(() => { r(h.location.search) }) }; return h.addEventListener(`popstate`, e), () => { h.removeEventListener(`popstate`, e) } }, []); let i = f(async e => { if (t === `preview`) { M(() => { r(t => e(new URLSearchParams(t)).toString()) }); return } await yn({ continueAfter: `paint` }); let n = h.history.state,
            i = new URL(h.location.href),
            a = e(i.searchParams).toString();
         i.search = a; let o = n?.queryParamBackAnchorSearch,
            s = h.location.search.slice(1),
            c = o === void 0 && a !== s,
            l = o !== void 0 && a === o,
            u = { ...n, queryParamBackAnchorSearch: l ? void 0 : o ?? (c ? s : void 0) },
            d = i.toString();
         c || l ? await rr(u, d) : nr(u, d), M(() => { r(a) }) }, []),
      a = _r(() => ({ urlSearchParams: new URLSearchParams(n), replaceSearchParams: i }), [n, i]); return E(z_.Provider, { value: a, children: e }) }

function Sr() { let e = new Event(`change`, { bubbles: !0 }); return e[B_] = 1, e }

function Cr() { let e = new MouseEvent(`click`, { bubbles: !0 }); return e[B_] = 1, e }

function wr(e) { return e instanceof HTMLInputElement && (e.type === `checkbox` || e.type === `radio`) ? `checked` : `value` }

function Tr(e) { return B_ in e && e[B_] === 1 }

function Er(e) { return V_ in e.nativeEvent && e.nativeEvent[V_] === 1 }

function Dr(e) { let n = t(!1),
      i = t(null),
      a = r(yg, xg, H_); return o(() => { if (!a) return; let t = i.current; if (n.current || !t) return;
      n.current = !0; let r = wr(t),
         o = t[r]; if (o === e) return; if (t.type === `radio` && o === !0) { t.checked = !1, t.dispatchEvent(Cr()); return } if (r === `checked`) { let e = Cr();
         e[V_] = 1, t.dispatchEvent(e), t.dispatchEvent(Cr()); return } if (t.nodeName === `SELECT`) { t.dispatchEvent(Sr()); return } let s = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), r)?.set; if (!s) return;
      s.call(t, ``); let c = Sr();
      c[V_] = 1, t.dispatchEvent(c), queueMicrotask(() => { s.call(t, o), t.dispatchEvent(Sr()) }) }, [a]), i }

function Or() { if (!U_) return;
   G_ = !0, performance.mark(`framer-react-event-handling-start`); let e = { capture: !0 },
      t = document.body;
   U_.forEach(n => t.addEventListener(n, W_, e)) }

function kr() { return o(() => { if (!G_ || !U_) return; let e = { capture: !0 },
         t = document.body;
      U_.forEach(n => t.removeEventListener(n, W_, e)), U_ = void 0, performance.mark(`framer-react-event-handling-end`) }, []), null }

function Ar(e) { let t = !1; return function(...n) { if (!t) return t = !0, e.apply(this, n) } }

function jr(e, t, n) { try { performance.measure(e, t, n) } catch (t) { console.warn(`Could not measure ${e}`, t) } }

function Mr() { dv = new uv, dv.render.markStart() }

function Nr() { a(() => { dv?.useInsertionEffects.markRouterStart() }, []), m(() => { dv?.useLayoutEffects.markRouterStart() }, []), o(() => { dv?.useEffects.markRouterStart() }, []) }

function Pr() { a(() => { dv?.render.markEnd(), dv?.useInsertionEffects.markStart() }, []), m(() => { if (dv?.useLayoutEffects.markStart(), document.visibilityState !== `visible`) { fv = !0; return } je.read(() => { dv?.browserRendering.requestAnimationFrame.markStart(), dv?.unattributedHydrationOverhead.measure() }) }, []), o(() => { dv?.useEffects.markStart(), dv?.browserRendering.hasStarted || (dv?.mutationEffects.measure(), dv?.useEffects.markAreSynchronous()) }, []) }

function Fr() { a(() => { dv?.useInsertionEffects.markEnd() }, []), m(() => { dv?.useLayoutEffects.markEnd(), !(fv || document.visibilityState !== `visible`) && je.read(() => { dv?.browserRendering.requestAnimationFrame.markEnd(), yn().then(() => { dv?.browserRendering.layoutStylePaint.markEnd() }) }) }, []), o(() => { dv?.useEffects.markEnd() }, []) }

function Ir() { return Pr(), null }

function Lr() { return Fr(), null }

function Rr(e, t) { let n = { style: t, "data-framer-root": `` }; return j.isValidElement(e) ? j.cloneElement(e, n) : E(e, { ...n }) }

function zr() { return gv }

function Br(e) { if (_v?.lastRoutes !== e) { let t = {},
         n = {},
         r = [],
         i = {},
         a = e; for (let r in e) { let i = e[r];
         V(i, `route must be defined`); let { path: a, pathLocalized: o } = i; if (a && (t[a] = { path: a, depth: Ur(a), routeId: r }, o))
            for (let e in o) { let t = o[e];
               V(t, `localizedPath must be defined`); let i = Ur(t),
                  a = n[e] ||= {};
               a[t] = { path: t, depth: i, routeId: r } } } for (let e in r = Object.values(t), r.sort(({ depth: e }, { depth: t }) => t - e), n) { let t = n[e]; if (!t) continue; let r = Object.values(t);
         r.sort(({ depth: e }, { depth: t }) => t - e), i[e] = r } _v = { pathRoutes: t, pathRoutesLocalized: n, paths: r, pathsLocalized: i, lastRoutes: a } } return { pathRoutes: _v.pathRoutes, paths: _v.paths, pathRoutesLocalized: _v.pathRoutesLocalized, pathsLocalized: _v.pathsLocalized } }

function Vr(e, t, n = !0, r = zr()) { return Hr(e, t, r, n) }

function Hr(e, t, n, r = !0) { let { pathRoutes: i, paths: a, pathRoutesLocalized: o, pathsLocalized: s } = Br(e), c, l, u = !1; if (n.length > 0) { let e = t.split(`/`).find(Boolean); if (e && (c = n.find(({ slug: t }) => t === e), c && (l = c.id, t = t.substring(c.slug.length + 1), u = !0)), !l) { let e = n.find(({ slug: e }) => e === ``);
         e && (l = e.id) } } if (l && u) { let e = o[l],
         n = e ? e[t] : void 0; if (n) { let e = Wr(t, n.path); if (e.isMatch) return { routeId: n.routeId, localeId: l, pathVariables: e.pathVariables } } } let d = i[t]; if (d) { let e = Wr(t, d.path); if (e.isMatch) return { routeId: d.routeId, localeId: l, pathVariables: e.pathVariables } } if (l && u) { let e = s[l]; if (e)
         for (let { path: n, routeId: r } of e) { let e = Wr(t, n); if (e.isMatch) return { routeId: r, localeId: l, pathVariables: e.pathVariables } } } for (let { path: e, routeId: n } of a) { let r = Wr(t, e); if (r.isMatch) return { routeId: n, localeId: l, pathVariables: r.pathVariables } } if (!r) throw Error(`No exact match found for path`); let f = i[`/`]; if (f) return { routeId: f.routeId, localeId: l }; let p = Object.keys(e)[0]; if (!p) throw Error(`Router should not have undefined routes`); return { routeId: p, localeId: l } }

function Ur(e) { let t = e.replace(/^\/|\/$/gu, ``); return t === `` ? 0 : t.split(`/`).length }

function Wr(e, t) { let n = [],
      r = Gr(t).replace(g_, (e, t) => (n.push(t), `([^/]+)`)),
      i = RegExp(r + `$`),
      a = e.match(i); if (!a) return { isMatch: !1 }; if (a.length === 1) return { isMatch: !0 }; let o = {},
      s = a.slice(1); for (let e = 0; e < n.length; ++e) { let t = n[e]; if (t === void 0) continue; let r = s[e],
         i = o[t]; if (i) { if (i !== r) return { isMatch: !1 }; continue } if (r === void 0) throw Error(`Path variable values cannot be undefined`);
      o[t] = r } return { isMatch: !0, pathVariables: o } }

function Gr(e) { return e.replace(/[|\\{}()[\]^$+*?.]/gu, `\\$&`).replace(/-/gu, `\\x2d`) }

function Kr() { if (`PerformanceServerTiming` in h) { let e = performance.getEntriesByType(`navigation`)[0]?.serverTiming; if (!e || e.length === 0) return new URLSearchParams; let t = e.find(e => e.name === `abtests`); return t ? new URLSearchParams(t.description) : new URLSearchParams } return new URLSearchParams }

function qr(e, t, n) { let r = e[n]; if (!r) return; let i = r.abTestingParentId ?? n; if (!e[i]) return; let { abTestingParentId: a, ...o } = r, s = e[i].elements || r.elements ? { ...e[i].elements, ...r.elements } : void 0;
   e[i] = { ...o, elements: s, abTestingVariantId: n, abTestId: t } }

function Jr(e, t) { for (let [n, r] of t) qr(e, n, r) }

function Yr(e) { for (let t in e) e[t]?.abTestingParentId && delete e[t] }

function Xr(e, t) { if (!e[t] || !e[t].abTestingParentId) return; let n = e[t].abTestingParentId,
      { abTestingParentId: r, ...i } = e[t],
      a = e[n]?.elements || i.elements ? { ...e[n]?.elements, ...i.elements } : void 0;
   e[n] = { ...i, elements: a, abTestingVariantId: t } }

function Zr(e, t) { if (h === void 0) return t; let n = t; if (t) { Xr(e, t); let r = e[t]?.abTestingParentId;
      r && (n = r) } return Jr(e, Kr()), Yr(e), n }

function Qr(e) { o(() => { if (e.robots) { let t = document.querySelector(`meta[name="robots"]`);
         t ? t.setAttribute(`content`, e.robots) : (t = document.createElement(`meta`), t.setAttribute(`name`, `robots`), t.setAttribute(`content`, e.robots), document.head.appendChild(t)) } }, [e.robots]), a(() => { document.title = e.title || ``, e.viewport && document.querySelector(`meta[name="viewport"]`)?.setAttribute(`content`, e.viewport) }, [e.title, e.viewport]) }

function $r(e, ...t) { vv.has(e) || (vv.add(e), console.warn(e, ...t)) }

function ei(e, t, n) { $r(`Deprecation warning: ${e} will be removed in version ${t}${n?`, use ${n} instead`:``}.`) }

function ti(e) { return typeof e == `object` && !!e && xv in e && e[xv] instanceof Function && Sv in e && e[Sv] instanceof Function }

function ni(e, t) { return { interpolate(e, n) { let r = e.get(),
            i = n.get(),
            a = bv(r); return e => { let n = t.interpolate(r, i)(e); return a.set(n), a } }, difference(e, n) { let r = e.get(); return t.difference(r, n.get()) } } }

function ri(e, t) { let n = 10 ** Math.round(Math.abs(t)); return Math.round(e * n) / n }

function ii(e, t) { return t === 0 ? Math.round(e) : (t -= t | 0, t < 0 && (t = 1 - t), Math.round(e - t) + t) }

function ai(e) { return Math.round(e * 2) / 2 }

function oi(e, t) { return { x: e, y: t } }

function si(e, t, n, r = !1) { let [i, a] = t, [o, s] = n, c = a - i; if (c === 0) return (s + o) / 2; let l = s - o; if (l === 0) return o; let u = o + (e - i) / c * l; if (r === !0)
      if (o < s) { if (u < o) return o; if (u > s) return s } else { if (u > o) return o; if (u < s) return s } return u }

function ci(e) { return !Number.isNaN(e) && Number.isFinite(e) }

function li(e) { let t = ui(e); return t === void 0 ? 0 : e.includes(`%`) ? t / 100 : t }

function ui(e) { let t = /\d?\.?\d+/u.exec(e); return t ? Number(t[0]) : void 0 }

function di(e, t, n) { return Tv.rgb_r = e / 255, Tv.rgb_g = t / 255, Tv.rgb_b = n / 255, Tv.rgbToHsluv(), { h: Tv.hsluv_h, s: Tv.hsluv_s, l: Tv.hsluv_l } }

function fi(e, t, n, r = 1) { return Tv.hsluv_h = e, Tv.hsluv_s = t, Tv.hsluv_l = n, Tv.hsluvToRgb(), { r: Tv.rgb_r * 255, g: Tv.rgb_g * 255, b: Tv.rgb_b * 255, a: r } }

function pi(e, t, n, r) { let i = Math.round(e),
      a = Math.round(t * 100),
      o = Math.round(n * 100); return r === void 0 || r === 1 ? `hsv(` + i + `, ` + a + `%, ` + o + `%)` : `hsva(` + i + `, ` + a + `%, ` + o + `%, ` + r + `)` }

function mi(e, t, n) { return { r: ci(e) ? xi(e, 255) * 255 : 0, g: ci(t) ? xi(t, 255) * 255 : 0, b: ci(n) ? xi(n, 255) * 255 : 0 } }

function hi(e, t, n, r) { let i = [wi(Math.round(e).toString(16)), wi(Math.round(t).toString(16)), wi(Math.round(n).toString(16))]; return r && i[0].charAt(0) === i[0].charAt(1) && i[1].charAt(0) === i[1].charAt(1) && i[2].charAt(0) === i[2].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join(``) }

function gi(e, t, n) { let r, i, a = xi(e, 255),
      o = xi(t, 255),
      s = xi(n, 255),
      c = Math.max(a, o, s),
      l = Math.min(a, o, s),
      u = i = r = (c + l) / 2; if (c === l) u = i = 0;
   else { let e = c - l; switch (i = r > .5 ? e / (2 - c - l) : e / (c + l), c) {
         case a:
            u = (o - s) / e + (o < s ? 6 : 0); break;
         case o:
            u = (s - a) / e + 2; break;
         case s:
            u = (a - o) / e + 4; break } u /= 6 } return { h: u * 360, s: i, l: r } }

function _i(e, t, n) { return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e }

function vi(e, t, n) { let r, i, a; if (e = xi(e, 360), t = xi(t * 100, 100), n = xi(n * 100, 100), t === 0) r = i = a = n;
   else { let o = n < .5 ? n * (1 + t) : n + t - n * t,
         s = 2 * n - o;
      r = _i(s, o, e + 1 / 3), i = _i(s, o, e), a = _i(s, o, e - 1 / 3) } return { r: r * 255, g: i * 255, b: a * 255 } }

function yi(e, t, n) { e = xi(e, 255), t = xi(t, 255), n = xi(n, 255); let r = Math.max(e, t, n),
      i = Math.min(e, t, n),
      a = r - i,
      o = 0,
      s = r === 0 ? 0 : a / r,
      c = r; if (r === i) o = 0;
   else { switch (r) {
         case e:
            o = (t - n) / a + (t < n ? 6 : 0); break;
         case t:
            o = (n - e) / a + 2; break;
         case n:
            o = (e - t) / a + 4; break } o /= 6 } return { h: o, s, v: c } }

function bi(e, t, n) { e = xi(e, 360) * 6, t = xi(t * 100, 100), n = xi(n * 100, 100); let r = Math.floor(e),
      i = e - r,
      a = n * (1 - t),
      o = n * (1 - i * t),
      s = n * (1 - (1 - i) * t),
      c = r % 6,
      l = [n, o, a, a, s, n][c],
      u = [s, n, n, o, a, a][c],
      d = [a, a, s, n, n, o][c]; return { r: l * 255, g: u * 255, b: d * 255 } }

function xi(e, t) { let n, r; if (n = typeof t == `string` ? parseFloat(t) : t, typeof e == `string`) { Si(e) && (e = `100%`); let t = Ci(e);
      r = Math.min(n, Math.max(0, parseFloat(e))), t && (r = Math.floor(r * n) / 100) } else r = e; return Math.abs(r - n) < 1e-6 ? 1 : r % n / n }

function Si(e) { return typeof e == `string` && e.includes(`.`) && parseFloat(e) === 1 }

function Ci(e) { return typeof e == `string` && e.includes(`%`) }

function wi(e) { return e.length === 1 ? `0` + e : `` + e }

function Ti(e) { if (e.includes(`gradient(`) || e.includes(`var(`)) return !1; let t = e.replace(/^[\s,#]+/u, ``).trimEnd().toLowerCase(),
      n = wv[t]; if (n && (t = n), t === `transparent`) return { r: 0, g: 0, b: 0, a: 0, format: `name` }; let r; return (r = Ev.rgb.exec(t)) ? { r: parseInt(r[1] ?? ``), g: parseInt(r[2] ?? ``), b: parseInt(r[3] ?? ``), a: 1, format: `rgb` } : (r = Ev.rgba.exec(t)) ? { r: parseInt(r[1] ?? ``), g: parseInt(r[2] ?? ``), b: parseInt(r[3] ?? ``), a: parseFloat(r[4] ?? ``), format: `rgb` } : (r = Ev.hsl.exec(t)) ? { h: parseInt(r[1] ?? ``), s: li(r[2] ?? ``), l: li(r[3] ?? ``), a: 1, format: `hsl` } : (r = Ev.hsla.exec(t)) ? { h: parseInt(r[1] ?? ``), s: li(r[2] ?? ``), l: li(r[3] ?? ``), a: parseFloat(r[4] ?? ``), format: `hsl` } : (r = Ev.hsv.exec(t)) ? { h: parseInt(r[1] ?? ``), s: li(r[2] ?? ``), v: li(r[3] ?? ``), a: 1, format: `hsv` } : (r = Ev.hsva.exec(t)) ? { h: parseInt(r[1] ?? ``), s: li(r[2] ?? ``), v: li(r[3] ?? ``), a: parseFloat(r[4] ?? ``), format: `hsv` } : (r = Ev.hex8.exec(t)) ? { r: Ei(r[1] ?? ``), g: Ei(r[2] ?? ``), b: Ei(r[3] ?? ``), a: Di(r[4] ?? ``), format: n ? `name` : `hex` } : (r = Ev.hex6.exec(t)) ? { r: Ei(r[1] ?? ``), g: Ei(r[2] ?? ``), b: Ei(r[3] ?? ``), a: 1, format: n ? `name` : `hex` } : (r = Ev.hex4.exec(t)) ? { r: Ei(`${r[1]}${r[1]}`), g: Ei(`${r[2]}${r[2]}`), b: Ei(`${r[3]}${r[3]}`), a: Di(r[4] + `` + r[4]), format: n ? `name` : `hex` } : (r = Ev.hex3.exec(t)) ? { r: Ei(`${r[1]}${r[1]}`), g: Ei(`${r[2]}${r[2]}`), b: Ei(`${r[3]}${r[3]}`), a: 1, format: n ? `name` : `hex` } : !1 }

function Ei(e) { return parseInt(e, 16) }

function Di(e) { return Ei(e) / 255 }

function Oi(e) { let t = Dv.exec(e); if (!t) return null; let { r: n = `0`, g: r = `0`, b: i = `0`, a } = t.groups ?? {}; return { r: parseFloat(n), g: parseFloat(r), b: parseFloat(i), a: a ? parseFloat(a) : 1 } }

function ki(e = 0) { let t = Math.abs(e); return t <= .04045 ? e / 12.92 : (Math.sign(e) || 1) * ((t + .055) / 1.055) ** 2.4 }

function Ai({ r: e, g: t, b: n, a: r }) { return { r: ki(e), g: ki(t), b: ki(n), a: r } }

function ji(e = 0) { let t = Math.abs(e); return t > .0031308 ? (Math.sign(e) || 1) * (1.055 * t ** (1 / 2.4) - .055) : e * 12.92 }

function Mi({ r: e, g: t, b: n, a: r }) { return { r: ji(e), g: ji(t), b: ji(n), a: r } }

function Ni({ r: e, g: t, b: n, a: r }) { let i = Math.max(e, t, n),
      a = Math.min(e, t, n),
      o = { h: 0, s: i === 0 ? 0 : 1 - a / i, v: i, a: r }; return i - a !== 0 && (o.h = (i === e ? (t - n) / (i - a) + (t < n ? 6 : 0) : i === t ? (n - e) / (i - a) + 2 : (e - t) / (i - a) + 4) * 60), o }

function Pi(e) { return (e %= 360) < 0 ? e + 360 : e }

function Fi({ h: e = 0, s: t = 0, v: n = 0, a: r = 1 }) { let i = Pi(e),
      a = Math.abs(i / 60 % 2 - 1); switch (Math.floor(i / 60)) {
      case 0:
         return { r: n, g: n * (1 - t * a), b: n * (1 - t), a: r };
      case 1:
         return { r: n * (1 - t * a), g: n, b: n * (1 - t), a: r };
      case 2:
         return { r: n * (1 - t), g: n, b: n * (1 - t * a), a: r };
      case 3:
         return { r: n * (1 - t), g: n * (1 - t * a), b: n, a: r };
      case 4:
         return { r: n * (1 - t * a), g: n * (1 - t), b: n, a: r };
      case 5:
         return { r: n, g: n * (1 - t), b: n * (1 - t * a), a: r };
      default:
         return { r: n * (1 - t), g: n * (1 - t), b: n * (1 - t), a: r } } }

function Ii(e) { return jv(Av(e)) }

function Li(e) { return kv(Ov(e)) }

function Ri(e, t, n, r = 1) { let i; return typeof e == `number` && !Number.isNaN(e) && typeof t == `number` && !Number.isNaN(t) && typeof n == `number` && !Number.isNaN(n) ? i = Vi({ r: e, g: t, b: n, a: r }) : typeof e == `string` ? i = zi(e) : typeof e == `object` && (i = e.hasOwnProperty(`r`) && e.hasOwnProperty(`g`) && e.hasOwnProperty(`b`) ? Vi(e) : Hi(e)), i }

function zi(e) { let t = Ti(e); if (t) return t.format === `hsl` ? Hi(t) : t.format === `hsv` ? Bi(t) : Vi(t) }

function Bi(e) { let t = bi(e.h, e.s, e.v); return { ...gi(t.r, t.g, t.b), ...t, format: `rgb`, a: e.a === void 0 ? 1 : Ui(e.a) } }

function Vi(e) { let t = mi(e.r, e.g, e.b); return { ...gi(t.r, t.g, t.b), ...t, format: `rgb`, a: e.a === void 0 ? 1 : Ui(e.a) } }

function Hi(e) { let t, n, r, i = { r: 0, g: 0, b: 0 },
      a = { h: 0, s: 0, l: 0 }; return t = ci(e.h) ? e.h : 0, t = (t + 360) % 360, n = ci(e.s) ? e.s : 1, typeof e.s == `string` && (n = ui(e.s)), r = ci(e.l) ? e.l : .5, typeof e.l == `string` && (r = ui(e.l)), i = vi(t, n, r), a = { h: t, s: n, l: r }, { ...i, ...a, a: e.a === void 0 ? 1 : e.a, format: `hsl` } }

function Ui(e) { return e = parseFloat(e), e < 0 && (e = 0), (Number.isNaN(e) || e > 1) && (e = 1), e }

function Wi({ children: e }) { if (l(Gv).top) return E(y, { children: e }); let n = t({ byId: {}, byName: {}, byLastId: {}, byPossibleId: {}, byLastName: {}, byLayoutId: {}, count: { byId: {}, byName: {} } }),
      r = t({ byId: {}, byName: {}, byLastId: {}, byPossibleId: {}, byLastName: {}, byLayoutId: {} }),
      i = t(new Set).current,
      a = t({ getLayoutId: f(({ id: e, name: t, duplicatedFrom: a }) => { if (!e) return null; let o = t ? `byName` : `byId`,
               s = n.current[o][e]; if (s) return s; let c = t || e; if (!a && !i.has(c) && (!n.current.byLayoutId[c] || n.current.byLayoutId[c] === c)) return n.current.count[o][c] === void 0 && (n.current.count[o][c] = 0, n.current.byLayoutId[c] = c, r.current[o][e] = c), i.add(c), c; let l; if (a?.length)
               for (let s = a.length - 1; s >= 0; s--) { let c = a[s];
                  V(!!c, `duplicatedId must be defined`); let u = n.current[o][c],
                     d = n.current.byLastId[c]; if (d && !l) { let e = n.current.byLayoutId[d],
                        r = !e || e === t;
                     d && !i.has(d) && (!t || r) && (l = [d, c]) } let f = u ? n.current.byLayoutId[u] : void 0,
                     p = !f || f === t; if (u && !i.has(u) && (!t || p)) return r.current[o][e] = u, r.current.byLastId[c] = u, i.add(u), u }
            let u = n.current.byLastId[e]; if (u && !i.has(u)) return i.add(u), r.current.byId[e] = u, u; if (l) { let [t, n] = l; return r.current[o][e] = t, r.current.byLastId[n] = t, i.add(t), t } let d = n.current.byPossibleId[e]; if (d && !i.has(d)) return i.add(d), r.current.byId[e] = d, d; let f = a?.[0],
               p = t || f || e,
               { layoutId: m, value: h } = Gi(p, (n.current.count[o][p] ?? -1) + 1, i); if (n.current.count[o][p] = h, r.current[o][e] = m, a?.length && !t) { let e = a[a.length - 1]; if (e && (r.current.byLastId[e] = m), a.length > 1)
                  for (let e = 0; e < a.length - 1; e++) { let t = a[e];
                     t !== void 0 && (r.current.byPossibleId[t] || (r.current.byPossibleId[t] = m)) } } return r.current.byLayoutId[m] = c, i.add(m), m }, []), persistLayoutIdCache: f(() => { n.current = { byId: { ...n.current.byId, ...r.current.byId }, byLastId: { ...n.current.byLastId, ...r.current.byLastId }, byPossibleId: { ...n.current.byPossibleId, ...r.current.byPossibleId }, byName: { ...n.current.byName, ...r.current.byName }, byLastName: { ...n.current.byLastName, ...r.current.byLastName }, byLayoutId: { ...n.current.byLayoutId, ...r.current.byLayoutId }, count: { ...n.current.count, byName: {} } }, r.current = { byId: {}, byName: {}, byLastId: {}, byPossibleId: {}, byLastName: {}, byLayoutId: {} }, i.clear() }, []), top: !0, enabled: !0 }).current; return E(Gv.Provider, { value: a, children: e }) }

function Gi(e, t, n) { let r = t,
      i = r ? `${e}-${r}` : e; for (; n.has(i);) r++, i = `${e}-${r}`; return { layoutId: i, value: r } }

function Ki({ enabled: e = !0, ...t }) { let n = l(Gv),
      r = u(() => ({ ...n, enabled: e }), [e]); return E(Gv.Provider, { ...t, value: r }) }

function qi(e) { let n = t(null); return n.current === null && (n.current = e()), n.current }

function Ji(e) { let { error: t, file: n } = e, r = n ? `Error in ${Yi(n)}` : `Error`, i = t instanceof Error ? t.message : `` + t; return ee(`div`, { style: qv, children: [E(`div`, { className: `text`, style: Yv, children: r }), i && E(`div`, { className: `text`, style: Xv, children: i })] }) }

function Yi(e) { return e.startsWith(`./`) ? e.replace(`./`, ``) : e }

function U(e) { return Number.isFinite(e) }

function Xi(e) { return !e || !Object.keys(e).length && e.constructor === Object }

function Zi(e) { return typeof e != `string` && typeof e != `number` }

function Qi(e) { return e != null && typeof e != `boolean` && !Xi(e) }

function $i(e) { return e * (Math.PI / 180) }

function ea(e) { return tt(e) ? !1 : e === 2 || e === 5 }

function ta(e) { if (typeof e == `string`) { let t = e.trim(); if (t === `auto`) return 2; if (t.endsWith(`fr`)) return 3; if (t.endsWith(`%`)) return 1; if (t.endsWith(`vw`) || t.endsWith(`vh`)) return 4 } return 0 }

function na(e, t, n, r) { if (typeof t == `string`) { if (t.endsWith(`%`) && n) switch (e) {
         case `maxWidth`:
         case `minWidth`:
            return parseFloat(t) / 100 * n.width;
         case `maxHeight`:
         case `minHeight`:
            return parseFloat(t) / 100 * n.height;
         default:
            break }
      if (t.endsWith(`vh`)) { if (!r) return ra(e); switch (e) {
            case `maxWidth`:
            case `minWidth`:
               return parseFloat(t) / 100 * r.width;
            case `maxHeight`:
            case `minHeight`:
               return parseFloat(t) / 100 * r.height;
            default:
               break } } return parseFloat(t) } return t }

function ra(e) { switch (e) {
      case `minWidth`:
      case `minHeight`:
         return -1 / 0;
      case `maxWidth`:
      case `maxHeight`:
         return 1 / 0;
      default:
         H(e, `unknown constraint key`) } }

function ia(e, t, n, r) { return t.minHeight && (e = Math.max(na(`minHeight`, t.minHeight, n, r), e)), t.maxHeight && (e = Math.min(na(`maxHeight`, t.maxHeight, n, r), e)), e }

function aa(e, t, n, r) { return t.minWidth && (e = Math.max(na(`minWidth`, t.minWidth, n, r), e)), t.maxWidth && (e = Math.min(na(`maxWidth`, t.maxWidth, n, r), e)), e }

function oa(e, t, n, r, i) { let a = aa(U(e) ? e : ty, n, r, i),
      o = ia(U(t) ? t : ny, n, r, i); return U(n.aspectRatio) && n.aspectRatio > 0 && (U(n.left) && U(n.right) ? o = a / n.aspectRatio : U(n.top) && U(n.bottom) || n.widthType === 0 ? a = o * n.aspectRatio : o = a / n.aspectRatio), { width: a, height: o } }

function sa(e, t) { return !U(e) || !U(t) ? null : e + t }

function ca(e) { return typeof e.right == `string` || typeof e.bottom == `string` || typeof e.left == `string` && (!e.center || e.center === `y`) || typeof e.top == `string` && (!e.center || e.center === `x`) }

function la(e) { return !e._constraints || ca(e) ? !1 : e._constraints.enabled }

function ua(e) { let { size: t } = e, { width: n, height: r } = e; return U(t) && (n === void 0 && (n = t), r === void 0 && (r = t)), U(n) && U(r) ? { width: n, height: r } : null }

function da(e) { let t = ua(e); if (t === null) return null; let { left: n, top: r } = e; return U(n) && U(r) ? { x: n, y: r, ...t } : null }

function fa(e, t, n = !0) { if (e.positionFixed || e.positionAbsolute) return null; let r = t === 1 || t === 2; if (!la(e) || r) return da(e); let i = pa(e),
      a = ma(t),
      o = a ? { sizing: a, positioning: a, viewport: null } : null; return ey.toRect(i, o, null, n, null) }

function pa(e) { let { left: t, right: n, top: r, bottom: i, center: a, _constraints: o, size: s } = e, { width: c, height: l } = e;
   c === void 0 && (c = s), l === void 0 && (l = s); let { aspectRatio: u, autoSize: d } = o, f = $v.quickfix({ left: U(t), right: U(n), top: U(r), bottom: U(i), widthType: ta(c), heightType: ta(l), aspectRatio: u || null, fixedSize: d === !0 }), p = null, m = null, h = 0, g = 0; if (f.widthType !== 0 && typeof c == `string`) { let e = parseFloat(c);
      c.endsWith(`fr`) ? (h = 3, p = e) : c === `auto` ? h = 2 : (h = 1, p = e / 100) } else c !== void 0 && typeof c != `string` && (p = c); if (f.heightType !== 0 && typeof l == `string`) { let e = parseFloat(l);
      l.endsWith(`fr`) ? (g = 3, m = e) : l === `auto` ? g = 2 : (g = 1, m = parseFloat(l) / 100) } else l !== void 0 && typeof l != `string` && (m = l); let _ = .5,
      v = .5; return (a === !0 || a === `x`) && (f.left = !1, typeof t == `string` && (_ = parseFloat(t) / 100)), (a === !0 || a === `y`) && (f.top = !1, typeof r == `string` && (v = parseFloat(r) / 100)), { left: f.left ? t : null, right: f.right ? n : null, top: f.top ? r : null, bottom: f.bottom ? i : null, widthType: h, heightType: g, width: p, height: m, aspectRatio: f.aspectRatio || null, centerAnchorX: _, centerAnchorY: v, minHeight: e.minHeight, maxHeight: e.maxHeight, minWidth: e.minWidth, maxWidth: e.maxWidth } }

function ma(e) { return e === 0 || e === 1 || e === 2 ? null : e }

function ha() { return j.useContext(ry).parentSize }

function ga(e) { return typeof e == `object` }

function _a(e) { return ga(e) ? e.width : e }

function va(e) { return ga(e) ? e.height : e }

function ya(e, t) { return E(iy, { parentSize: t, children: e }) }

function ba(e) { return fa(e, ha(), !0) }

function xa({ width: e, height: t }) { return e === `auto` || e === `min-content` || t === `auto` || t === `min-content` }

function Sa() { return n === void 0 ? void 0 : n }

function Ca() { let e = Sa(); return e ? oy.test(e.platform) : !1 }

function wa() { let e = Sa(); return e ? sy.test(e.platform) ? !0 : cy.test(e.platform) && e.maxTouchPoints != null && e.maxTouchPoints > 2 : !1 }

function Ta() { return Ca() || wa() }

function Ea() { let e = Sa(); return e ? ly.test(e.userAgent) : !1 }

function Da() { let e = Sa(); return e ? uy.test(e.userAgent) && dy.test(e.vendor) && !Ea() : !1 }

function Oa() { let e = Sa(); return e ? fy.test(e.userAgent) && py.test(e.vendor) : !1 }

function ka() { let e = Sa(); return e ? my.test(e.userAgent) : !1 }

function Aa() { return typeof document == `object` }

function ja() { let e = Sa(); return e ? hy.test(e.userAgent) : !1 }

function Ma() { return !1 }

function Na() { let e = Sa(); return e && gy.test(e.userAgent) ? `tablet` : e && _y.test(e.userAgent) ? `phone` : `desktop` }

function Pa() { return Na() === `desktop` }

function Fa(e) { return Ta() ? e.metaKey : e.ctrlKey }

function Ia(e, t, n = yy) { if (!(!e || n.has(e) || typeof document > `u`)) { if (n.add(e), !t) { if (!by) { let e = document.createElement(`style`); if (e.setAttribute(`type`, `text/css`), e.setAttribute(`data-framer-css`, `true`), !document.head) { console.warn(`not injecting CSS: the document is missing a <head> element`); return } if (document.head.appendChild(e), e.sheet) by = e.sheet;
            else { console.warn(`not injecting CSS: injected <style> element does not have a sheet`, e); return } } t = by } try { t.insertRule(e, t.cssRules.length) } catch {} } }

function La() { if (Dy !== void 0) return Dy; let e = document.createElement(`div`);
   Object.assign(e.style, { position: `absolute`, display: `flex`, flexDirection: `column`, rowGap: `1px` }), e.appendChild(document.createElement(`div`)), e.appendChild(document.createElement(`div`)), document.body.appendChild(e); let t = e.scrollHeight === 1; return e.parentNode && e.parentNode.removeChild(e), Dy = t, t }

function Ra() { ky || (ky = !0, !La() && document.body.classList.add(Oy)) }

function za(e) { return typeof e == `number` ? e : e.startsWith(`--`) ? Z.variable(e) : e === `` ? `""` : e }

function Ba(e) { return e !== By && e !== Vy }

function Va(e) { for (let t in e)
      if (Ba(t) && e?.[t] === !0) return !0; return !1 }

function Ha(e, t, n, r, i) { let a = j.useRef(null),
      o = j.useCallback(e => { t && a.current !== !1 && (a.current = !1, e.currentTarget.setCustomValidity(` `), e.currentTarget.reportValidity(), t(e)) }, [t]),
      s = j.useCallback(r => { if (n?.(r), !t && !e) return; let i = r.target.validity;
         a.current === !1 && !Va(i) && (r.currentTarget.setCustomValidity(``), r.target.reportValidity(), a.current = !0, e?.()) }, [t, e, n]),
      c = j.useCallback(e => { if (!t) { r?.(e); return } if (a.current === !1) return; let n = e.currentTarget.validity; if (Va(n)) { o(e); return } r?.(e) }, [o, r, t]); return j.useMemo(() => ({ onInvalid: o, onChange: s, onBlur: c, onFocus: i }), [o, s, c, i]) }

function Ua(e, t) { return Z.variable(...e.flatMap(e => [`${e}-rgb`, e]), t) }

function Wa(e, t) { return `${e} > ${t}, ${e} > .ssr-variant > ${t}` }

function Ga() { return J.current() === J.preview ? zb : Rb }

function Ka(e) { return wy(e, Ga, `framer-lib-combinedCSSRules`) }

function qa(e) { return B(e) || Ze(e) }

function Ja(e) { return !!e && Bb in e && e[Bb] === !0 }

function Ya(e) { try { switch (e.type) {
         case `string`:
         case `collectionreference`:
         case `color`:
         case `date`:
         case `link`:
         case `boxshadow`:
         case `padding`:
         case `borderradius`:
         case `gap`:
            return R(e.defaultValue) ? e.defaultValue : void 0;
         case `boolean`:
            return Qe(e.defaultValue) ? e.defaultValue : void 0;
         case `enum`:
            return tt(e.defaultValue) ? void 0 : e.options.includes(e.defaultValue) ? e.defaultValue : void 0;
         case `fusednumber`:
         case `number`:
            return z(e.defaultValue) ? e.defaultValue : void 0;
         case `transition`:
            return B(e.defaultValue) ? e.defaultValue : void 0;
         case `border`:
            return B(e.defaultValue) ? e.defaultValue : void 0;
         case `font`:
         case `location`:
            return B(e.defaultValue) ? e.defaultValue : void 0;
         case `linkrelvalues`:
            return $e(e.defaultValue) ? e.defaultValue : void 0;
         case `multicollectionreference`:
            return $e(e.defaultValue) ? e.defaultValue : void 0;
         case `object`: { let t = B(e.defaultValue) ? e.defaultValue : {}; return B(e.controls) && Xa(t, e.controls), t }
         case `array`:
            return $e(e.defaultValue) ? e.defaultValue : void 0;
         case `file`:
         case `image`:
         case `richtext`:
         case `pagescope`:
         case `eventhandler`:
         case `changehandler`:
         case `segmentedenum`:
         case `responsiveimage`:
         case `componentinstance`:
         case `slot`:
         case `scrollsectionref`:
         case `customcursor`:
         case `cursor`:
         case `trackingid`:
         case `vectorsetitem`:
            return;
         default:
            return } } catch { return } }

function Xa(e, t) { for (let n in t) { let r = t[n]; if (!r) continue; let i = e[n]; if (!tt(i) || Ja(r)) continue; let a = Ya(r);
      tt(a) || (e[n] = a) } }

function Za(e) { if (B(e.defaultProps)) return e.defaultProps; let t = {}; return e.defaultProps = t, t }

function Qa(e, t) { qa(e) && Xa(Za(e), t) }

function $a(e, t) { Object.assign(e, { propertyControls: t }), Qa(e, t) }

function eo(e) { return e.propertyControls }

function to() { let e = J.current(); return e === J.canvas || e === J.export }

function no() { let [e] = c(() => to()); return e }

function ro(e) { let t = Object.create(Object.prototype); return n => (t[n] === void 0 && (t[n] = e(n)), t[n]) }

function io(e, t) { if (e === void 0 || t === void 0) return; let n = e,
      r = t,
      i = 0;
   t > e && (n = t, r = e, i = 1); let a = n / r,
      o = []; for (let e of Zb) { if (n <= e) return o;
      o.push({ maxSideSize: e, width: i === 0 ? e : Math.trunc(e / a) }) } return o }

function ao(e, t) { try { let n = new URL(e); return t ? n.searchParams.set(`scale-down-to`, `${t}`) : n.searchParams.delete(`scale-down-to`), n.toString() } catch { return e } }

function oo(e, t, n) { if (!n || n.length === 0 || !t.pixelWidth) return; let r = []; for (let t of n) { if (t.width < Qb) continue; let n = ao(e, t.maxSideSize);
      r.push(`${n} ${t.width}w`) } return r.push(`${ao(e,null)} ${t.pixelWidth}w`), r.join(`, `) || void 0 }

function so(e, t, n) { if (!t.pixelWidth || !t.pixelHeight || !n?.width || !n?.height) return; let r = [],
      i = Math.max(t.pixelWidth, t.pixelHeight),
      a = Math.max(n.width / t.pixelWidth, n.height / t.pixelHeight); for (let t of Xb) { let n = ao(e, Math.round(i * t * a));
      r.push({ src: n, scale: t }) } return r }

function co(e, t, n) { if (![`auto`, `lossless`].includes(t.preferredSize ?? ``)) return { src: n, srcSet: void 0 }; if (e) { let r = so(n, t, e); if (!r?.length) return { src: n, srcSet: void 0 }; let [i, ...a] = r; return { src: i?.src, srcSet: a.map(({ src: e, scale: t }) => `${e} ${t}x`).join(`, `) } } else return { src: n, srcSet: oo(n, t, io(t.pixelWidth, t.pixelHeight)) } }

function lo() { return { backgroundRepeat: `repeat`, backgroundPosition: `left top`, backgroundSize: `64px auto`, backgroundImage: ct(Jb.imagePlaceholderSvg) } }

function uo(e) { switch (e) {
      case `fit`:
         return `contain`;
      case `stretch`:
         return `fill`;
      default:
         return `cover` } }

function fo(e, t) { let n = e ?? `center`,
      r = t ?? `center`; return n === `center` && r === `center` ? `center` : n + ` ` + r }

function po(e) { return { display: `block`, width: `100%`, height: `100%`, ...Yb, objectPosition: fo(e.positionX, e.positionY), objectFit: uo(e.fit) } }

function mo(e) { let t = j.useRef(e ? `auto` : `async`),
      n = f(e => { t.current = `auto`, e.decoding = `auto` }, []),
      r = f(e => { n(e.currentTarget) }, [n]),
      i = f(e => { e?.complete && n(e) }, [n]); return { decoding: t.current, onImageLoad: r, onImageMount: i } }

function ho({ image: e, containerSize: t, nodeId: n, alt: r, draggable: i, avoidAsyncDecoding: a }) { let o = Jb.useImageSource(e, t, n),
      s = po(e),
      { decoding: c, onImageLoad: l, onImageMount: u } = mo(a),
      { srcSet: d, src: f } = `srcSet` in e ? { src: o, srcSet: e.srcSet } : co(e.nodeFixedSize, e, o); return E(`img`, { suppressHydrationWarning: !0, ref: u, decoding: c, fetchpriority: e.fetchPriority, loading: e.loading, width: e.pixelWidth, height: e.pixelHeight, sizes: d ? e.sizes : void 0, srcSet: d, src: f, onLoad: l, alt: r ?? e.alt ?? ``, style: s, draggable: i }) }

function go({ image: e, containerSize: t, nodeId: n }) { let r = j.useRef(null),
      i = Jb.useImageElement(e, t, n),
      a = po(e); return j.useLayoutEffect(() => { let e = r.current; if (e !== null) return e.appendChild(i), () => { e.removeChild(i) } }, [i]), Object.assign(i.style, a), E(`div`, { ref: r, style: { display: `contents`, ...Yb } }) }

function _o({ nodeId: e, image: t, containerSize: n }) { let r = j.useRef(null),
      i = Jb.useImageSource(t, n, e); return j.useLayoutEffect(() => { let n = r.current; if (n === null) return; let a = po(t);
      Jb.renderOptimizedCanvasImage(n, i, a, e) }, [e, t, i]), E(`div`, { ref: r, style: { display: `contents`, ...Yb } }) }

function vo({ layoutId: e, image: t, ...n }) { e && (e += `-background`); let r = null,
      i = !!e,
      a = null; if (R(t.src))
      if (t.fit === `tile` && t.pixelWidth && t.pixelHeight) { let e = z(t.backgroundSize) ? t.backgroundSize : 1,
            n = { width: Math.round(e * t.pixelWidth), height: Math.round(e * t.pixelHeight) },
            o = ai(e * (t.pixelWidth / 2)),
            s = Jb.useImageSource(t, n);
         r = { ...$b, backgroundImage: `url(${s})`, backgroundRepeat: `repeat`, backgroundPosition: fo(t.positionX, t.positionY), opacity: void 0, border: 0, backgroundSize: `${o}px auto` }, a = null, i = !0 } else a = J.current() === J.canvas ? Jb.canRenderOptimizedCanvasImage(Jb.useImageSource(t)) ? E(_o, { image: t, ...n }) : E(go, { image: t, ...n }) : E(ho, { image: t, avoidAsyncDecoding: J.current() === J.export, ...n }); let o = a ? $b : r ?? { ...$b, ...lo() }; return i ? E(ye.div, { layoutId: e, style: o, "data-framer-background-image-wrapper": !0, children: a }) : E(`div`, { style: o, "data-framer-background-image-wrapper": !0, children: a }) }

function yo(e, t, n = !0) { let { borderWidth: r, borderStyle: i, borderColor: a } = e; if (!r) return; let o, s, c, l; if (typeof r == `number` ? o = s = c = l = r : (o = r.top || 0, s = r.bottom || 0, c = r.left || 0, l = r.right || 0), !(o === 0 && s === 0 && c === 0 && l === 0)) { if (n && o === s && o === c && o === l) { t.border = `${o}px ${i} ${a}`; return } t.borderStyle = e.borderStyle, t.borderColor = e.borderColor, t.borderTopWidth = `${o}px`, t.borderBottomWidth = `${s}px`, t.borderLeftWidth = `${c}px`, t.borderRightWidth = `${l}px` } }

function bo(e) { let t = e.layoutId ? `${e.layoutId}-border` : void 0; if (!e.borderWidth) return null; let n = { position: `absolute`, left: 0, right: 0, top: 0, bottom: 0, ...Yb, pointerEvents: `none` }; return e.border ? (n.border = e.border, E(ye.div, { style: n })) : (yo(e, n, !1), E(ye.div, { "data-frame-border": !0, style: n, layoutId: t })) }

function xo(e, t) { let { _forwardedOverrideId: n, _forwardedOverrides: r, id: i } = t, a = n ?? i, o = r && a ? r[a] : void 0; return o && typeof o == `string` && (e = { ...e, src: o }), e }

function So(e) { let { background: t, image: n } = e; if (n !== void 0 && t && !tx.isImageObject(t)) return; let r = null; if (r = R(n) ? { alt: ``, src: n } : bv.get(t, null), tx.isImageObject(r)) return xo(r, e) }

function Co(e) { if (e) { if (e.pixelHeight && e.pixelWidth) return { width: e.pixelWidth, height: e.pixelHeight }; if (e.src === void 0) return { width: 1, height: 1 } } }

function wo(e) { return e && e !== `search` && e !== `slot` && e !== `template` ? ye[e] : ye.div }

function To(e, t) { e[`data-framer-layout-hint-center-x`] = t === !0 || t === `x` ? !0 : void 0, e[`data-framer-layout-hint-center-y`] = t === !0 || t === `y` ? !0 : void 0 }

function Eo(e) { let t = {}; return !e || !nx || J.current() !== J.canvas || To(t, e), t }

function Do(e) { return e.replace(/^id_/u, ``).replace(/\\/gu, ``) }

function Oo(e, t) { if (!t && (t = e.children, !t)) return { props: e, children: t }; let n = e._forwardedOverrides; return n && (t = j.Children.map(t, e => j.isValidElement(e) ? j.cloneElement(e, { _forwardedOverrides: n }) : e)), { props: e, children: t } }

function ko(e) { return (t, n) => e === !0 ? `translate(-50%, -50%) ${n}` : e === `x` ? `translateX(-50%) ${n}` : e === `y` ? `translateY(-50%) ${n}` : n || `none` }

function Ao(e, { specificLayoutId: t, postfix: n } = {}) { let { name: r, layoutIdKey: i, duplicatedFrom: a, __fromCodeComponentNode: o = !1, drag: s } = e, { getLayoutId: c, enabled: d } = l(Gv); return u(() => { if (!d) return e.layoutId; let l = t || e.layoutId; if (!l && (s || !i || o)) return; let u = l || c({ id: i, name: r, duplicatedFrom: a }); if (u) return n ? `${u}-${n}` : u }, [d]) }

function jo() { let [e, t] = j.useState(0); return j.useCallback(() => t(e => e + 1), []) }

function Mo(e) { let t = jo();
   o(() => { let n = e?.current; if (n) return ox?.observeElementWithCallback(e.current, t), () => { ox?.unobserve(n) } }, [e, t]) }

function No(e) { return [...e.firstElementChild && e.firstElementChild.hasAttribute(sx) ? e.firstElementChild.children : e.children].filter(Po).map(Fo) }

function Po(e) { return e instanceof HTMLBaseElement || e instanceof HTMLHeadElement || e instanceof HTMLLinkElement || e instanceof HTMLMetaElement || e instanceof HTMLScriptElement || e instanceof HTMLStyleElement || e instanceof HTMLTitleElement ? !1 : e instanceof HTMLElement || e instanceof SVGElement }

function Fo(e) { if (!(e instanceof HTMLElement) || e.children.length === 0 || e.style.display !== `contents`) return e; let t = [...e.children].find(Po); return t ? Fo(t) : e }

function Io(e, t, n = () => [], r = {}) { let { id: i, visible: a, _needsMeasure: o } = e, { skipHook: s = !1 } = r, c = l(ix), u = J.current() === J.canvas;
   rx(() => {!u || c || s || t.current && i && a && o && Jb.queueMeasureRequest(Do(i), t.current, n(t.current)) }) }

function Lo(e) { let t = e.closest(`[data-framer-component-container]`);
   t && Jb.queueMeasureRequest(Do(t.id), t, No(t)) }

function Ro(e) { e.willChange = `transform`; let t = J.current() === J.canvas;
   ux && t && (e.translateZ = cx) }

function zo(e) { e.willChange = `transform`, Bo(e, !0) }

function Bo(e, t) { let n = J.current() === J.canvas; if (!ux || !n) return; let r = R(e.transform) && e.transform || ``;
   t ? r.includes(lx) || (e.transform = r + lx) : e.transform = r.replace(lx, ``) }

function Vo(e, t, n, r = !0) { if (!e) return; let i = Vb(e.style),
      a = n || i[t],
      o = () => { Ho(a) && (i[t] = a) };
   i[t] = null, r ? Promise.resolve().then(o) : setTimeout(o, 0) }

function Ho(e) { return R(e) || z(e) || nt(e) }

function Uo(e, t) { if (e.size < t) return; let n = Math.round(Math.random()); for (let t of e.keys())(++n & 1) != 1 && e.delete(t) }

function Wo(e, t, n, r) { let i = t.get(n); if (i) return i;
   Uo(t, e); let a = r(n); return t.set(n, a), a }

function Go(e, t) { let n = [e, t]; return mx.test(e) ? e : Wo(1e3, hx, n, () => px.multiplyAlpha(e, t)) }

function Ko(e, t = 1) { let n; return n = `stops` in e ? e.stops : [{ value: e.start, position: 0 }, { value: e.end, position: 1 }], t === 1 ? n : n.map(e => ({ ...e, value: Go(e.value, t) })) }

function qo(e, t) { let n = 0; return Ko(e, t).forEach(e => { n ^= fx(e.value) ^ e.position }), n }

function Jo(e) { return e && gx.every(t => t in e) }

function Yo(e) { return e && _x.every(t => t in e) }

function Xo({ background: e, backgroundColor: t }, n) { t ? typeof t == `string` || Pv(t) ? n.backgroundColor = t : q.isColorObject(e) && (n.backgroundColor = e.initialValue || q.toRgbString(e)) : e && (e = bv.get(e, null), typeof e == `string` || Pv(e) ? n.background = e : yx.isLinearGradient(e) ? n.background = yx.toCSS(e) : xx.isRadialGradient(e) ? n.background = xx.toCSS(e) : q.isColorObject(e) && (n.backgroundColor = e.initialValue || q.toRgbString(e))) }

function W(e, t, n, r) { if (r === void 0 && (r = t), e[t] !== void 0) { n[r] = e[t]; return } }

function Zo(e) { return e ? e.left !== void 0 && e.right !== void 0 : !1 }

function Qo(e) { return e ? e.top !== void 0 && e.bottom !== void 0 : !1 }

function $o(e) { if (!e) return {}; let t = {};
   e.preserve3d === !0 ? t.transformStyle = `preserve-3d` : e.preserve3d === !1 && (t.transformStyle = `flat`), e.backfaceVisible === !0 ? t.backfaceVisibility = `visible` : e.backfaceVisible === !1 && (t.backfaceVisibility = `hidden`), t.backfaceVisibility && (t.WebkitBackfaceVisibility = t.backfaceVisibility), e.perspective !== void 0 && (t.perspective = t.WebkitPerspective = e.perspective), e.__fromCanvasComponent || (e.center === !0 ? (t.left = `50%`, t.top = `50%`) : e.center === `x` ? t.left = `50%` : e.center === `y` && (t.top = `50%`)); let { cornerShape: n } = e; return Ee(n) ? t.cornerShape = ie(() => `superellipse(${n.get()})`) : n !== void 0 && (t.cornerShape = `superellipse(${n})`), W(e, `size`, t), W(e, `width`, t), W(e, `height`, t), W(e, `minWidth`, t), W(e, `minHeight`, t), W(e, `top`, t), W(e, `right`, t), W(e, `bottom`, t), W(e, `left`, t), W(e, `position`, t), W(e, `overflow`, t), W(e, `opacity`, t), (!e._border || !e._border.borderWidth) && W(e, `border`, t), W(e, `borderRadius`, t), W(e, `radius`, t, `borderRadius`), W(e, `color`, t), W(e, `shadow`, t, `boxShadow`), W(e, `x`, t), W(e, `y`, t), W(e, `z`, t), W(e, `rotate`, t), W(e, `rotateX`, t), W(e, `rotateY`, t), W(e, `rotateZ`, t), W(e, `scale`, t), W(e, `scaleX`, t), W(e, `scaleY`, t), W(e, `skew`, t), W(e, `skewX`, t), W(e, `skewY`, t), W(e, `originX`, t), W(e, `originY`, t), W(e, `originZ`, t), Xo(e, t), t }

function es(e) { for (let t in e)
      if (t === `drag` || t.startsWith(`while`) || typeof Vb(e)[t] == `function` && t.startsWith(`on`) && !t.includes(`Animation`)) return !0; return !1 }

function ts(e) { if (e.drag) return `grab`; for (let t in e)
      if (Cx.has(t)) return `pointer` }

function ns(e) { return rs(e) ? !0 : e.style ? !!rs(e.style) : !1 }

function rs(e) { return wx in e && (e[wx] === `scroll` || e[wx] === `auto`) }

function is(e) { let { left: t, top: n, bottom: r, right: i, width: a, height: o, center: s, _constraints: c, size: l, widthType: u, heightType: d, positionFixed: f, positionAbsolute: p } = e, m = P(e.minWidth), h = P(e.minHeight), g = P(e.maxWidth), _ = P(e.maxHeight); return { top: P(n), left: P(t), bottom: P(r), right: P(i), width: P(a), height: P(o), size: P(l), center: s, _constraints: c, widthType: u, heightType: d, positionFixed: f, positionAbsolute: p, minWidth: m, minHeight: h, maxWidth: g, maxHeight: _ } }

function as(e) { let t = l(ix),
      { style: n, _initialStyle: r, __fromCanvasComponent: i, size: a } = e,
      o = is(e),
      s = ba(o),
      c = { display: `block`, flex: n?.flex ?? `0 0 auto`, userSelect: J.current() === J.preview ? void 0 : `none` };
   e.__fromCanvasComponent || (c.backgroundColor = e.background === void 0 ? `rgba(0, 170, 255, 0.3)` : void 0); let u = !es(e) && !e.__fromCanvasComponent && !ns(e),
      d = e.style ? !(`pointerEvents` in e.style) : !0;
   u && d && (c.pointerEvents = `none`); let f = j.Children.count(e.children) > 0 && j.Children.toArray(e.children).every(e => typeof e == `string` || typeof e == `number`) && { display: `flex`, alignItems: `center`, justifyContent: `center`, textAlign: `center` },
      p = $o(e);
   a === void 0 && !i && (Zo(p) || (c.width = Tx.width), Qo(p) || (c.height = Tx.height)), o.minWidth !== void 0 && (c.minWidth = o.minWidth), o.minHeight !== void 0 && (c.minHeight = o.minHeight); let m = {};
   la(o) && s && !xa(e) && (m = { left: s.x, top: s.y, width: s.width, height: s.height, right: void 0, bottom: void 0 }), Object.assign(c, f, r, p, m, n), Object.assign(c, { overflowX: c.overflowX ?? c.overflow, overflowY: c.overflowY ?? c.overflow, overflow: void 0 }), dx.applyWillChange(e, c, !0); let h = c;
   c.transform || (h = { x: 0, y: 0, ...c }); let g = to(); return e.positionSticky ? (!g || Jb.isOnPageCanvas || t) && (h.position = `sticky`, h.willChange = `transform`, h.top = e.positionStickyTop, h.right = e.positionStickyRight, h.bottom = e.positionStickyBottom, h.left = e.positionStickyLeft) : g && (e.positionFixed ? h.position = Jb.isOnPageCanvas ? `fixed` : `absolute` : e.positionAbsolute && (h.position = `absolute`)), `rotate` in h && h.rotate === void 0 && delete h.rotate, [h, s] }

function os(e) { let t = {}; for (let n in e)(Ye(n) || Ub(n)) && !Ex.has(n) ? t[n] = Vb(e)[n] : (n === `positionTransition` || n === `layoutTransition`) && (t.layout = !0, typeof Vb(e)[n] != `boolean` && !e.transition && (t.transition = Vb(e)[n])); return t }

function ss(e) { return `data-framer-name` in e }

function cs(e, t, n, r) { if (r) return n ? { width: n.width, height: n.height } : 1; let { _usesDOMRect: i } = e, { widthType: a = 0, heightType: o = 0, width: s, height: c } = t; return n && !i ? n : a === 0 && o === 0 && typeof s == `number` && typeof c == `number` ? { width: s, height: c } : i || e.positionFixed || e.positionAbsolute ? 2 : 0 }

function ls(e) { return E(ye.div, { layoutId: kx, style: Mx, children: e.children }) }

function us(e, t) { Ze(e) ? e(t) : ds(e) && (e.current = t) }

function ds(e) { return B(e) && `current` in e }

function fs(e) { return ds(e) && e.current !== null }

function ps() { let e = qi(() => new Set),
      t = qi(() => new Map); return qi(() => (n, r) => ({ get current() { return n.current }, set current(i) { if (i !== n.current) { if (n.current = i, r && r(i), t.forEach((e, t) => { e ? e() : t(null) }), i === null) { t.clear(), e.clear(); return } e.forEach(e => { let n = e(i);
               t.set(e, n) }) } }, observe(r) { e.add(r); let i = n.current; if (i) { let e = r(i);
            t.set(r, e) } }, unobserve(n) { if (!n || (e.delete(n), !t.has(n))) return; let r = t.get(n);
         r ? r() : n(null), t.delete(n) } })) }

function ms(e) { let n = t(null),
      r = ps(); return qi(() => ds(e) ? r(e) : Ze(e) ? r(n, e) : r(n)) }

function hs(e, n, r) { let i = t(),
      a = t();
   _r(() => { a.current !== void 0 && (a.current = !0) }, r ?? [{}]), e && a.current !== !1 && (a.current = !1, e.unobserve(i.current), e.observe(n), i.current = n) }

function gs(e, t, n, r, i, a, o) { let s = e.get(t); return (!s || s.root !== r?.current) && (s = new Nx({ root: r?.current, rootMargin: a, threshold: o }), e.set(t, s)), s.observeElementWithCallback(n, i), () => { s.unobserve(n) } }

function _s(e, t, n) { let r = qi(() => `${n.rootMargin}`),
      i = l(Px),
      { enabled: a, root: o, rootMargin: s, threshold: c } = n;
   hs(e, e => { if (a && e !== null) return gs(i, r, e, o, t, s, c) }, [a, t, o, s, c]) }

function vs(e, t, n) { let r = j.useRef({ isInView: !1, hasAnimatedOnce: !1 }),
      { enabled: i, animateOnce: a, threshold: o, rootMargin: s = `0px 0px 0px 0px` } = n;
   Fx(e, j.useCallback(e => { let { isInView: n, hasAnimatedOnce: i } = r.current, s = bs(e, o?.y ?? 0); if (s && !n) { if (a && i) return;
         r.current.hasAnimatedOnce = !0, r.current.isInView = !0, t(!0); return } if (!s && n) { if (r.current.isInView = !1, a) return;
         t(!1); return } }, [a, o?.y, t]), { threshold: Ix, rootMargin: s, enabled: i ?? !0 }) }

function ys(e, t) { return t.height === 0 ? 0 : e.height / Math.min(t.height, K.innerHeight) }

function bs({ boundingClientRect: e, intersectionRect: t, isIntersecting: n }, r) { return e.height === 0 ? n : n && ys(t, e) >= r }

function xs() { return new Map }

function Ss() { return qi(xs) }

function Cs(e, t = []) { let { register: n, deregister: r } = l(Vx);
   o(() => { if (e) return n(e), () => r(e) }, [n, r, ...t]) }

function ws(e, t) { return !(t.isCurrent === void 0 || e.isCurrent !== t.isCurrent || e.isPrevious !== t.isPrevious || t.isCurrent && e.isOverlayed !== t.isOverlayed) }

function Ts(e, t, n) { let r = { ...e }; return t && (U(t.originX) && (r.originX = t.originX), U(t.originY) && (r.originY = t.originY), U(t.originZ) && (r.originZ = t.originZ)), n && (U(n.originX) && (r.originX = n.originX), U(n.originY) && (r.originY = n.originY), U(n.originZ) && (r.originZ = n.originZ)), r }

function Es(e) { if (!e || !(`rotateX` in e || `rotateY` in e || `z` in e)) return !1; let t = e.rotateX !== 0 || e.rotateY !== 0 || e.z !== 0,
      n = e?.transition?.rotateX.from !== 0 || e?.transition?.rotateY.from !== 0 || e?.transition?.z.from !== 0; return t || n }

function Ds(e) { switch (e && e.appearsFrom ? e.appearsFrom : `right`) {
      case `right`:
         return qx.PushLeft;
      case `left`:
         return qx.PushRight;
      case `bottom`:
         return qx.PushUp;
      case `top`:
         return qx.PushDown } }

function Os(e) { switch (e && e.appearsFrom ? e.appearsFrom : `bottom`) {
      case `right`:
         return qx.OverlayLeft;
      case `left`:
         return qx.OverlayRight;
      case `bottom`:
         return qx.OverlayUp;
      case `top`:
         return qx.OverlayDown } }

function ks(e) { switch (e && e.appearsFrom ? e.appearsFrom : `bottom`) {
      case `right`:
         return qx.FlipLeft;
      case `left`:
         return qx.FlipRight;
      case `bottom`:
         return qx.FlipUp;
      case `top`:
         return qx.FlipDown } }

function As(e, t) { switch (t.type) {
      case `addOverlay`:
         return Ms(e, t.transition, t.component);
      case `removeOverlay`:
         return Ns(e);
      case `add`:
         return Ps(e, t.key, t.transition, t.component);
      case `remove`:
         return Ls(e);
      case `update`:
         return js(e, t.key, t.component);
      case `back`:
         return Fs(e);
      case `forward`:
         return Is(e);
      default:
         return } }

function js(e, t, n) { return { ...e, containers: { ...e.containers, [t]: n } } }

function Ms(e, t, n) { let r = e.overlayStack[e.currentOverlay]; if (r && r.component === n) return; let i = e.overlayItemId + 1,
      a = [...e.overlayStack, { key: `stack-${i}`, component: n, transition: t }]; return { ...e, overlayStack: a, overlayItemId: i, currentOverlay: Math.max(0, Math.min(e.currentOverlay + 1, a.length - 1)), previousOverlay: e.currentOverlay } }

function Ns(e) { return { ...e, overlayStack: [], currentOverlay: -1, previousOverlay: e.currentOverlay } }

function Ps(e, t, n, r) { e.containers[t] || (e.containers[t] = r), e.history = e.history.slice(0, e.current + 1), e.visualIndex = Math.max(e.history.length, 0); let i = e.history[e.history.length - 1],
      a = i && i.key === t; if (e.overlayStack = [], a && e.currentOverlay > -1) return { ...e, currentOverlay: -1, previousOverlay: e.currentOverlay }; if (a) return; let o = e.containerVisualIndex[t],
      s = e.containerIsRemoved[t],
      c = i?.key && n.withMagicMotion ? Hs(t, o, s, e.history) : !0;
   e.history.push({ key: t, transition: n, visualIndex: c ? Math.max(e.visualIndex, 0) : e.containerVisualIndex[t] }); let l = e.current + 1,
      u = e.current; for (let t in e.containerIndex) e.containerIndex[t] === l && (e.containerIndex[t] = Bs(t, e.history));
   e.containerIndex[t] = l; let { containerVisualIndex: d, containerIsRemoved: f } = Rs(e, t, c), p = Vs(l, u, e.history, e.containerIndex, e.transitionForContainer); return { ...e, current: l, previous: u, containerVisualIndex: d, containerIsRemoved: f, transitionForContainer: p, previousTransition: null, currentOverlay: -1, historyItemId: e.historyItemId + 1, previousOverlay: e.currentOverlay } }

function Fs(e) { let t = { ...e.containers },
      n = Ls(e); if (n) return n.containers = t, n }

function Is(e) { let t = e.history[e.current + 1]; if (!t) return; let { key: n, transition: r, component: i } = t, a = [...e.history], o = Ps(e, n, r, i); if (o) return o.history = a, o }

function Ls(e) { let t = [...e.history.slice(0, e.current + 1)]; if (t.length === 1) return; let n = t.pop(); if (!n) return; let r = t[t.length - 1];
   V(r, `The navigation history must have at least one component`), e.containerIndex[r.key] = t.length - 1, t.every(e => e.key !== n.key) && delete e.containers[n.key]; let i = e.current - 1,
      a = e.current,
      { containerIsRemoved: o, containerVisualIndex: s, previousTransition: c, visualIndex: l } = zs(e, r, n),
      u = Vs(i, a, e.history, e.containerIndex, e.transitionForContainer); return { ...e, current: i, previous: a, containerIsRemoved: o, containerVisualIndex: s, previousTransition: c, visualIndex: l, transitionForContainer: u } }

function Rs(e, t, n) { let r = { containerVisualIndex: { ...e.containerVisualIndex }, containerIsRemoved: { ...e.containerIsRemoved } }; if (n) r.containerVisualIndex[t] = e.history.length - 1, r.containerIsRemoved[t] = !1;
   else { let n = e.containerVisualIndex[t]; for (let [t, i] of Object.entries(e.containerVisualIndex)) n !== void 0 && i > n && (r.containerIsRemoved[t] = !0) } return r }

function zs(e, t, n) { let r = [t.key, n.key],
      i = e.history[e.history.length - 2],
      a = e.previousTransition === null ? null : { ...e.previousTransition },
      o = { containerIsRemoved: { ...e.containerIsRemoved }, containerVisualIndex: { ...e.containerVisualIndex }, previousTransition: a, visualIndex: e.visualIndex };
   i && r.push(i.key); let s = e.containerVisualIndex[t.key],
      c = e.containerVisualIndex[n.key],
      l = s !== void 0 && c !== void 0 && s <= c || t.visualIndex !== void 0 && t.visualIndex < e.history.length - 1,
      u = t.visualIndex; return l ? (o.containerIsRemoved[n.key] = !0, o.containerVisualIndex[t.key] = u === void 0 ? e.history.length - 1 : u) : (o.visualIndex = e.visualIndex + 1, o.containerVisualIndex[t.key] = e.visualIndex + 1), n.transition.withMagicMotion && (o.previousTransition = n.transition || null), e.containerIsRemoved[t.key] = !1, o }

function Bs(e, t) { for (let n = t.length; n > t.length; n--)
      if (t[n]?.key === e) return n; return -1 }

function Vs(e, t, n, r, i) { let a = { ...i }; for (let [i, o] of Object.entries(r)) { let r = Us(o, { current: e, previous: t, history: n });
      r && (a[i] = r) } return a }

function Hs(e, t, n, r) { return n || t === void 0 ? !0 : t === 0 ? !1 : r.slice(t, r.length).findIndex(t => t.key === e) > -1 ? !0 : !(r.slice(0, t - 1).findIndex(t => t.key === e) > -1) }

function Us(e, t) { let { current: n, previous: r, history: i } = t; if (!(e !== n && e !== r)) { if (e === n && n > r) { let t = i[e]; return Ws(`enter`, t?.transition.enter, t?.transition.animation) } if (e === r && n > r) { let t = i[e + 1]; return Ws(`exit`, t?.transition.exit, t?.transition.animation) } if (e === n && n < r) { let t = i[e + 1]; return Ws(`enter`, t?.transition.exit, t?.transition.animation) } if (e === r && n < r) { let t = i[e]; return Ws(`exit`, t?.transition.enter, t?.transition.animation) } } }

function Ws(e, t, n) { let r = {},
      i = {}; return Yx.forEach(e => { r[e] = Wx[e], i[e] = { ...n, from: Wx[e] } }), t && Object.keys(t).forEach(a => { if (t[a] === void 0) return; let o = t[a],
         s = typeof t[a] == `string` ? `${Vb(Wx)[a]}%` : Vb(Wx)[a];
      Vb(r)[a] = e === `enter` ? s : o, i[a] = { ...n, from: e === `enter` ? o : s, velocity: 0 } }), { ...r, transition: { ...i } } }

function Gs(e) { let t, n; return e.current === -1 ? n = e.history[e.previous] : t = e.history[e.current], { currentOverlayItem: t, previousOverlayItem: n } }

function Ks({ currentOverlayItem: e }) { return e && e.transition.exit }

function qs({ currentOverlayItem: e, previousOverlayItem: t }) { return e && e.transition.animation ? e.transition.animation : t && t.transition.animation ? t.transition.animation : $x }

function Js({ currentOverlayItem: e, previousOverlayItem: t }) { return e ? e.transition.backfaceVisible : t && t.transition.backfaceVisible }

function Ys(e) { if (e.backdropColor) return e.backdropColor; if (e.overCurrentContext) return `rgba(4,4,15,.4)` }

function Xs(e, t) { let { current: n, history: r } = t; if (e === n) { let t = r[e]; return t && t.transition ? t.transition.backfaceVisible : !0 } else if (e < n) { let t = r[e + 1]; return t && t.transition ? t.transition.backfaceVisible : !0 } else { let t = r[e]; return t && t.transition ? t.transition.backfaceVisible : !0 } }

function Zs(e, t) { let n = t.history[e]; if (n) return n.transition.enter }

function Qs(e, t) { let { current: n, previous: r, history: i } = t; return e === r && n > r || e === n && n < r ? i[e + 1]?.transition?.backfaceVisible : i[e]?.transition?.backfaceVisible }

function $s(e, t) { let { current: n, history: r } = t; if (e !== n)
      if (e < n) { let t = r[e + 1]; if (t && t.transition) return t.transition.exit } else { let t = r[e]; if (t && t.transition) return t.transition.enter } }

function ec(e, t) { let { current: n, previous: r, history: i } = t, a = r > n ? r : n; if (e < a) { let t = i[e + 1]; if (t && t.transition.animation) return t.transition.animation } else if (e !== a) { let t = i[e]; if (t && t.transition.animation) return t.transition.animation } else { let t = i[e]; if (t?.transition.animation) return t.transition.animation } return $x }

function tc(e, t, n) { let { current: r, previous: i, history: a } = t; return !!(n && a.length > 1 || e !== i && e !== r || r === i) }

function nc(e, t) { let { current: n, previous: r } = t; return e > n && e > r ? !1 : e === n }

function rc(e) { return j.Children.map(e.component, t => { if (!Qi(t) || !Zi(t) || !t.props) return t; let n = { style: t.props.style ?? {} },
         r = e?.transition?.position,
         i = !r || r.left !== void 0 && r.right !== void 0,
         a = !r || r.top !== void 0 && r.bottom !== void 0,
         o = `style` in t.props ? B(t.props.style) : !0; return i && (`width` in t.props && (n.width = `100%`), o && (n.style.width = `100%`)), a && (`height` in t.props && (n.height = `100%`), o && (n.style.height = `100%`)), j.cloneElement(t, n) }) }

function ic(e, t) { if (e.goBackOnTapOutside !== !1) return t }

function ac(e) { let t = xe(),
      n = le(); return E(Qx, { ...e, resetProjection: t, skipLayoutAnimation: n, children: e.children }) }

function oc(e) { let t = []; if (e && e.length) { let n = e.map(e => `drop-shadow(${e.x}px ${e.y}px ${e.blur}px ${e.color})`);
      t.push(...n) } return t }

function sc(e, t) { if (!e.shadows || e.shadows.length === 0) return; let n = e.shadows.map(e => `${e.x}px ${e.y}px ${e.blur}px ${e.color}`).join(`, `);
   n && (t.textShadow = n) }

function cc(e, t) { let n = [];
   U(e.brightness) && n.push(`brightness(${e.brightness/100})`), U(e.contrast) && n.push(`contrast(${e.contrast/100})`), U(e.grayscale) && n.push(`grayscale(${e.grayscale/100})`), U(e.hueRotate) && n.push(`hue-rotate(${e.hueRotate}deg)`), U(e.invert) && n.push(`invert(${e.invert/100})`), U(e.saturate) && n.push(`saturate(${e.saturate/100})`), U(e.sepia) && n.push(`sepia(${e.sepia/100})`), U(e.blur) && n.push(`blur(${e.blur}px)`), e.dropShadows && n.push(...oc(e.dropShadows)), n.length !== 0 && (t.filter = t.WebkitFilter = n.join(` `)) }

function lc(e, t) { U(e.backgroundBlur) && (t.backdropFilter = t.WebkitBackdropFilter = `blur(${e.backgroundBlur}px)`) }

function uc(e, t) { lc(e, t), cc(e, t) }

function dc(e, t) { let n, r = (...r) => { K.clearTimeout(n), n = K.setTimeout(e, t, ...r) }; return r.cancel = () => { K.clearTimeout(n) }, r }

function fc(...e) { return e.filter(Boolean).join(` `) }

function pc(e, t) { let n = {},
      r = {}; for (let i in e) { let a = mc(i); if (a && t.has(a)) { n[a] = e[i]; continue } r[i] = e[i] } return [n, r] }

function mc(e) { if (e.startsWith(uS)) return e.substr(dS) }

function hc(e, t, n) { let r = d.map(e, e => O(e) ? T(e, t) : e); return n ? r : E(y, { children: r }) }

function gc(e) { let t = qi(() => _c(e)); return t.useSetup(e), t.cloneAsElement }

function _c(e) { let t = { forwardedRef: e, childRef: null, ref: null };
   t.ref = vc(t); let n = (e, n) => { if (!t.forwardedRef && t.forwardedRef === e) { t.ref = n; return } let r = !1;
         t.childRef !== n && (t.childRef = n, r = !0), t.forwardedRef !== e && (t.forwardedRef = e, r = !0), r && (t.ref = vc(t)) },
      r = !1;

   function i(i, a) { if (r) throw ReferenceError(`useCloneChildrenWithPropsAndRef: You should not call cloneChildrenWithPropsAndRef more than once during the render cycle.`); return r = !0, d.count(i) > 1 && e && (t.forwardedRef = void 0, t.ref = t.childRef), d.map(i, e => { if (O(e)) { let r = `ref` in e ? e.ref : void 0;
            n(t.forwardedRef, r); let i = Ze(a) ? a(e.props) : a; return T(e, t.ref === r ? i : { ...i, ref: t.ref }) } return e }) } let a = function(e, t) { return E(y, { children: i(e, t) }) }; return a.cloneAsArray = i, { useSetup: e => { r = !1, n(e, t.childRef) }, cloneAsElement: a } }

function vc(e) { if (!e.forwardedRef) return e.childRef; let { forwardedRef: t, childRef: n } = e; return e => { us(n, e), us(t, e) } }

function yc(e, t, n, r, i, a, o, s) { let c = j.Children.toArray(t),
      l = c[0]; if (c.length !== 1 || !j.isValidElement(l)) return console.warn(`PropertyOverrides: expected exactly one React element for a child`, t), o(t, n); let u = [],
      d = []; for (let [t] of Object.entries(r)) { if (t === i) continue; let n = e[t]; if (!n || !Cc(l.props, n)) { d.push(t); continue } let r = Sc([t], a);
      r.length && u.push({ variants: r, propOverrides: n }) } if (u.length === 0) return o(l, n); let f = Sc([i, ...d], a);
   f.length && u.unshift({ variants: f }); let p = []; for (let { variants: e, propOverrides: t } of u) { if (s && !e.includes(s)) continue; let c = e.join(`+`),
         d = E(pS.Provider, { value: { primaryVariantId: i, variants: new Set(e) }, children: o(l, t ? { ...n, ...t } : n) }, c),
         f = xc(e, a, r);
      f.length ? (V(u.length > 1, `Must branch out when there are hiddenClassNames`), d = E(`div`, { className: `${mS} ${f.join(` `)}`, suppressHydrationWarning: !0, children: d }, c)) : V(u.length === 1, `Cannot branch out when hiddenClassNames is empty`), p.push(d) } return V(!s || p.length === 1, `Must render exactly one branch when activeVariantId is given`), s ? p : [...p, E(`div`, { className: hS }, `property-overrides-separator`)] }

function bc(e) { return e.split(`-`)[2] }

function xc(e, t, n) { let r = []; for (let [i, a] of Object.entries(n)) { let n = t && !t.has(i);
      e.includes(i) || n || r.push(`hidden-${bc(a)}`) } return r }

function Sc(e, t) { return t ? e.filter(e => t.has(e)) : e }

function Cc(e, t) { for (let n of Object.keys(t))
      if (!Et(e[n], t[n], !0)) return !0; return !1 }

function wc(e, t, n) { return !n || !e ? t : { ...t, ...n[e] } }

function Tc(e) { return j.forwardRef(({ optimized: t, ...n }, r) => { let i = j.useContext(fS),
         a = j.useContext(pS)?.variants,
         o = n[wS];
      o && !Aa() && SS.setAll(o, a, t ? n : null, i); let s = ES(n); return E(e, { ref: r, ...n, ...s }) }) }

function Ec(e) { return R(e) || Array.isArray(e) }

function Dc(e) { return e in kS }

function Oc(e, t) { let n = qi(() => ({ values: OS(t ? e : void 0) })); return j.useEffect(() => { if (!t)
         for (let e of DS) { let t = kS[e];
            tt(t) || n.values[e].set(t) } }, [t]), n }

function kc({ loopEffectEnabled: e, loopRepeatDelay: n, loopTransition: r, loopRepeatType: i, loop: a, loopPauseOffscreen: s }, l) { let d = ae(),
      p = qi(OS),
      m = t(!1),
      h = NS(),
      g = t(null),
      _ = f(async () => { if (!a) return; let e = r || void 0,
            t = m.current && i === `mirror`,
            n = t ? kS : a,
            o = t ? a : kS; return m.current = !m.current, g.current = Promise.all(DS.map(t => { if (!(d && t !== `opacity`)) return p[t].jump(o[t] ?? kS[t]), new Promise(r => { let i = { ...e, onComplete: () => r() },
                  a = n[t] ?? o[t];
               typeof a == `number` && ke(p[t], a, i) }) })), g.current }, [a, i, r, d]),
      [v, y] = c(!1),
      b = t(!1),
      x = f(async () => {!e || !b.current || (await _(), await h(n ?? 0), x()) }, [_, h, e, n]),
      S = f(() => { b.current || (b.current = !0, M(() => y(!0)), x()) }, [x]),
      C = f((e = !0) => { DS.forEach(e => { p[e].stop() }), DS.forEach(e => { p[e].set(kS[e]) }), m.current = !1, e && (b.current = !1, M(() => y(!1))) }, []),
      w = e && a,
      T = f(() => { document.hidden ? C(!1) : b.current && (b.current = !1, S()) }, [S, C]);
   o(() => { if (w) return document.addEventListener(`visibilitychange`, T), () => { document.removeEventListener(`visibilitychange`, T) } }, [w, T]), o(() => { w && s || (w ? S() : C()) }, [S, C, s, w]), o(() => () => C(), [C]); let E = t(!1),
      D = f(async () => { g.current && (await g.current, !E.current && C()) }, [C]);
   Fx(l, f(e => { e.isIntersecting ? (E.current = !0, S()) : (E.current = !1, D()) }, [S, D]), { enabled: w && s }); let O = v || !s; return u(() => ({ values: p, style: w && O ? AS : jS }), [w, O]) }

function Ac(e, t, n, r, i) { let a = n / 100 - 1; return (i ? (t - r) * a : 0) + -e * a }

function jc(e, t, n) { let { speed: r = 100, offset: i = 0, adjustPosition: a = !1, parallaxTransformEnabled: o } = e, s = j.useRef(null), c = ae(), u = j.useCallback(e => s.current === null || r === 100 ? 0 : Ac(e, s.current, r, i, a), [r, i, a]), { scrollY: d } = de(), f = Se(d, u), p = he(a && s.current === null ? `hidden` : n), m = he(0), h = l(Px); return hs(t, e => { if (e === null || !o) return; let t = gs(h, `undefined`, e, null, e => { s.current = e.boundingClientRect.top, je.update(() => { f.set(u(d.get())), a && p.set(n ?? `initial`) }), t() }); return t }, [a, o]), Nt(() => { o && f.set(0) }), { values: { y: c || !o ? m : f }, style: o ? { ...AS, visibility: p } : jS } }

function Mc(e) { return typeof e == `object` && !!e }

function Nc(e) { if (Mc(e)) return e?.transition }

function Pc(e, t, n, r, i, a) { let o = Nc(e); return Promise.all(DS.map(s => new Promise(c => { if (n && s !== `opacity`) return c(); let l = t.values[s];
      l.stop(); let u = Mc(e) ? e?.[s] ?? kS[s] : kS[s]; if (Ee(u) && (u = u.get()), !z(u)) return c(); let d = ue.get(r.current);
      d && d.setBaseTarget(s, u); let f; if (R(i) && !l?.hasAnimated && K.MotionHandoffAnimation) { let e = K.MotionHandoffAnimation(i, s, je);
         e && (f = e) } a ? l.set(u) : ke(l, u, { ...o, velocity: 0, startTime: f, onComplete: () => c() }) }))) }

function Fc({ initial: e, animate: n, exit: r, presenceInitial: i, presenceAnimate: a, presenceExit: o }, s, c, l, d) { let f = i ?? e,
      p = a ?? n,
      m = o ?? r,
      [h, g] = ve(),
      _ = t({ lastPresence: !1, lastAnimate: p, hasMounted: !1, running: !1 }),
      v = qi(() => { let e = f ?? l; if (!B(e)) return { values: OS() }; let t = {}; for (let n in e) { let r = B(e) ? e[n] : void 0;
            z(r) && (t[n] = r) } return { values: OS(t) } });
   hs(s, e => { let { hasMounted: t } = _.current; if (t && p) return; let n = ue.get(e); if (n)
         for (let e in Object.assign(_.current, { hasMounted: !0 }), v.values) { if (!Dc(e)) continue; let t = l?.[e];
            n.setBaseTarget(e, z(t) ? t : kS[e]) } }, [p]); let y = ae();
   hs(s, e => { if (!c) { g?.(); return } if (e === null) return; if (h !== _.current.lastPresence) { Object.assign(_.current, { lastPresence: h }), h ? f && p && (Object.assign(_.current, { running: !0 }), Pc(p, v, y, s, d).then(() => Object.assign(_.current, { running: !1 }))) : m ? (Object.assign(_.current, { running: !0 }), Pc(m, v, y, s, d).then(() => Object.assign(_.current, { running: !1 })).then(() => g())) : g(); return } let { lastAnimate: t, running: n } = _.current;
      Et(p, t) || !p || (Object.assign(_.current, { lastAnimate: p }), Pc(p, v, y, s, d, !n).then(() => Object.assign(_.current, { running: !1 }))) }); let b = c && p; return u(() => ({ values: v.values, style: b ? AS : jS }), [b]) }

function Ic(e, t) { let n = 0,
      r = e; for (; r && r !== t && r instanceof HTMLElement;) n += r.offsetTop, r = r.offsetParent; return n }

function Lc(e, t = 0, n) { let r = [],
      i = []; for (let a = e.length; a >= 0; a--) { let { ref: o, offset: s } = e[a] ?? {}; if (!o || !o.current) continue; let c = Ic(o.current, document.documentElement) - IS - (s ?? 0) - t,
         l = o.current?.clientHeight ?? 0,
         u = r[r.length - 1],
         d = Math.max(c + l, 0);
      r.push(c), i.unshift(Math.max(c, 0), u === void 0 ? d : Math.min(d, Math.max(u - 1, 0))), n?.(a) } return i }

function Rc(e, t = 0) { return e < t ? `up` : `down` }

function zc(e, t, n = {}) { let { direction: r, target: i } = e ?? {}, { repeat: a = !0, enabled: o = !0 } = n, s = Mt();
   j.useEffect(() => { if (!r || !o) return; let e, n = 0,
         s, c; return ce((o, { y: l }) => { if (!a && c === i || l.current > l.scrollLength || l.current < 0) return; let u = Rc(l.current, e);
         e = l.current; let d = u !== s; if (s = u, d) n = l.current;
         else { if (Math.abs(l.current - n) < LS) return; let e = u === r ? i : void 0;
            e !== c && t(e), c = e } }) }, [s, r, a, i, o, t]) }

function Bc(e, t, n) { let r = Lc(e, t),
      i = [...zS],
      a = r[0]; if (!z(a)) return BS; if (a > 1 && (r.unshift(0, a - 1), i.unshift(`initial`, `initial`)), n) { let e = r[r.length - 1]; if (!z(e)) return BS;
      r.push(e + 1), i.push(`exit`) } return { inputRange: r, outputRange: i } }

function Vc(e) { return { x: e?.x ?? kS.x, y: e?.y ?? kS.y, scale: e?.scale ?? kS.scale, opacity: e?.opacity ?? kS.opacity, transformPerspective: e?.transformPerspective ?? kS.transformPerspective, rotate: e?.rotate ?? kS.rotate, rotateX: e?.rotateX ?? kS.rotateX, rotateY: e?.rotateY ?? kS.rotateY, skewX: e?.skewX ?? kS.skewX, skewY: e?.skewY ?? kS.skewY, transition: e?.transition ?? void 0 } }

function Hc({ opacity: e, targetOpacity: t, perspective: n, enter: r, exit: i, animate: a, ...o }) { return j.useMemo(() => ({ initial: r ?? Vc({ ...o, opacity: e ?? t ?? 1, transformPerspective: n }), animate: a ?? Vc({ opacity: t }), exit: i ?? Vc() }), [a, o, r, i, e, t, n]) }

function Uc(e, t) { let n = ae(),
      r = Hc(e),
      i = e.styleAppearEffectEnabled,
      a = Oc(i ? r.initial : r.animate, i),
      o = j.useRef({ isPlaying: !1, scheduledAppearState: void 0, lastAppearState: !e.styleAppearEffectEnabled }),
      s = Mt(),
      c = j.useRef(),
      l = j.useCallback(async ({ transition: i, ...o }, s) => { let l = i ?? r.animate.transition ?? e.transition;
         await c.current; let u = ue.get(t.current);
         c.current = Promise.all(DS.map(e => { s && a.values[e].set(r.initial[e] ?? kS[e]); let t = o[e] ?? kS[e]; return u && typeof t != `object` && u.setBaseTarget(e, t), new Promise(r => { if (n && e !== `opacity`) z(t) && a.values[e].set(t), r();
               else { let n = { restDelta: e === `scale` ? .001 : void 0, ...l, onComplete: () => r() };
                  typeof t == `number` && ke(a.values[e], t, n) } }) })) }, []),
      d = e.animateOnce && o.current.lastAppearState === !0;
   vs(t, e => { let { isPlaying: t, lastAppearState: n } = o.current; if (t) { o.current.scheduledAppearState = e; return } o.current.scheduledAppearState = void 0, o.current.lastAppearState = e, n !== e && l(e ? r.animate : r.exit, e) }, { enabled: !e.targets && e.styleAppearEffectEnabled && !e.scrollDirection && !d, animateOnce: !!e.animateOnce, threshold: { y: e.threshold } }); let f = e.targets && i && !e.scrollDirection; return j.useEffect(() => { if (!f) return; let t = { initial: !0 },
         n = `initial`; return ce((i, { y: a }) => { let { targets: o } = e; if (!o || !o[0] || o[0].ref && !o[0].ref.current) return; let { inputRange: s, outputRange: c } = Bc(o, (e.threshold ?? 0) * a.containerLength, !!e.exit); if (s.length === 0 || s.length !== c.length) return; let u = Pe(a.current, s, c); if (e.animateOnce && t[u] || (t[u] = !0, n === u)) return;
         n = u; let d = Vb(r)[u];
         d && l(d) }) }, [s, f]), zc(e.scrollDirection, e => void l(e ?? r.animate), { enabled: i, repeat: !e.animateOnce }), Nt(() => { if (i && !(!e.targets && !e.scrollDirection))
         for (let e of DS) a.values[e].set(r.initial?.[e] ?? kS[e]) }), u(() => ({ values: a.values, style: i ? AS : jS }), [i]) }

function Wc(e, t) { let n = j.useRef({});
   j.useEffect(() => { if (t !== void 0)
         for (let r of Tg(e)) { let i = function() { let e = n.current[r];
                  e && e.stop(), n.current[r] = Be({ keyframes: [a.get(), s], velocity: a.getVelocity(), ...t, restDelta: .001, onUpdate: o }) },
               a = e[r],
               o, s;
            a.attach((e, t) => (s = e, o = t, je.postRender(i), a.get())) } }, [JSON.stringify(t)]) }

function Gc(e, t) { let n = US(); return { inputRange: Lc(e, t, t => { let r = e[t - 1]?.target,
            i = e[t]?.target; for (let e of DS) n[e]?.unshift(r?.[e] ?? 0, i?.[e] ?? 0) }), effectKeyOutputRange: n } }

function Kc(e) { let t = US(); for (let { target: n } of e)
      for (let e of DS) t[e]?.push(n[e]); return t }

function qc({ transformTrigger: e, styleTransformEffectEnabled: t, transformTargets: n, spring: r, transformViewportThreshold: i = 0 }, a) { let o = ae(),
      s = Oc(HS(n, o), t),
      c = !t || !n,
      l = e === `onScrollTarget`,
      u = Mt(); return m(() => { if (!(c || !l)) return ce((e, { y: t }) => { if (!n[0] || n[0].ref && !n[0].ref.current) return; let { inputRange: r, effectKeyOutputRange: a } = Gc(n, i * t.containerLength); if (r.length !== 0)
            for (let e of DS) o && e !== `opacity` || r.length === a[e].length && a[e][0] !== void 0 && s.values[e].set(Pe(t.current, r, a[e])) }) }, [o, l, i, n, c]), hs(a, t => { if (c || l || t === null) return; let r = Kc(n); return ce((e, { y: t }) => { for (let e of DS) o && e !== `opacity` || WS.length === r[e].length && r[e][0] !== void 0 && s.values[e].set(Pe(t.progress, WS, r[e])) }, e === `onInView` ? { target: t ?? void 0, offset: [`start end`, `end end`] } : void 0) }, [u, o, e, l, n, c]), Wc(s.values, r), Nt(() => { if (c) return; let e = HS(n, o); for (let t of DS) s.values[t].set(e?.[t] ?? kS[t]) }), j.useMemo(() => ({ values: s.values, style: t ? AS : jS }), [t]) }

function Jc(e, t, n) { return !(e in n) && t in n || n[e] === !0 }

function Yc(e) { let t = { parallax: {}, styleAppear: {}, styleTransform: {}, presence: { animate: e.animate, initial: e.initial, exit: e.exit }, loop: {}, forwardedProps: {}, targetOpacityValue: e.__targetOpacity, withPerspective: e.__perspectiveFX, inSmartComponent: e.__smartComponentFX }; for (let n in e) { if (n === `__targetOpacity` || n === `__perspectiveFX` || n === `__smartComponentFX`) continue; let r = mc(n); if (r) { for (let i of KS)
            if (GS[i]?.has(r)) { t[i][r] = Vb(e)[n]; break } } else t.forwardedProps[n] = Vb(e)[n] } return t.parallax.parallaxTransformEnabled = Jc(`parallaxTransformEnabled`, `speed`, t.parallax), t.styleAppear.styleAppearEffectEnabled = Jc(`styleAppearEffectEnabled`, `animateOnce`, t.styleAppear), t }

function Xc(e) { return B(e) && YS in e }

function Zc(e, t) { if (!e || !B(e)) return t; for (let n in e) { let r = e[n];!Ee(r) || !Dc(n) || z(r.get()) && t[n].push(r) } }

function Qc(e) { return R(e) || Array.isArray(e) }

function $c({ componentIdentifier: e, children: t }) { return t(l(ZS)[e] ?? {}) }

function el() { return j.useContext(QS) }

function tl(e) { return e instanceof Error && (e.message.includes(`A component suspended while responding to synchronous input.`) || e.message.includes(`Minified React error #426`)) }

function nl() { if (h === void 0 || tC) return E(`div`, { hidden: !0, dangerouslySetInnerHTML: { __html: `<!-- SuspenseThatPreservesDOM fallback rendered -->` } }); throw rC }

function rl({ children: e }) { return l(aC) ? E(y, { children: e }) : E(C, { fallback: iC, children: e }) }

function il() { return E(`div`, { hidden: !0, dangerouslySetInnerHTML: { __html: `<!-- Code boundary fallback rendered -->` } }) }

function al(e, t) { if (!hg || Math.random() > .01) return; let n = e instanceof Error && typeof e.stack == `string` ? e.stack : null,
      r = t?.componentStack;
   nn(`published_site_load_recoverable_error`, { message: String(e), stack: n, componentStack: n ? void 0 : r }) }

function ol(...e) { console.error(...e) }

function sl() { return J.current() !== J.canvas }

function cl({ getErrorMessage: e, fallback: t, children: n }) { return sl() ? E(ll, { fallback: t, children: E(sC, { fallback: t, getErrorMessage: e, children: n }) }) : n }

function ll({ children: e, fallback: t = oC }) { return h === void 0 ? E(C, { fallback: t, children: e }) : E(rl, { children: e }) }

function ul() { return j.useContext(lC) }

function dl() { let e = ul(); return j.useMemo(() => { if (!e) return; let t = e; for (; t.parent && t.parent.level > 0;) t = t.parent; return t }, [e]) }

function fl({ children: e, scopeId: t, nodeId: n }) { let r = ul(),
      i = j.useMemo(() => ({ level: (r?.level ?? 0) + 1, scopeId: t, nodeId: n, parent: r }), [t, n, r]); return E(lC.Provider, { value: i, children: e }) }

function pl(e, t) { return `${uC}${e}:${t}` }

function ml(e, t) { return gl(`component`, e, t) }

function hl(e, t) { return gl(`override`, e, t) }

function gl(e, t, n) { return `A code ${e} crashed while rendering due to the error above. To find and fix it, open the project in the editor \u2192 open Quick Actions (press Cmd+K or Ctrl+K) \u2192 paste this: ${pl(t,n)} \u2192 click \u201CShow Layer\u201D.` }

function _l(e, t, n, r, i, a) { let o = yl(e, t, n, a); return o && !i && r || o && i }

function vl(e, t, n, r) { return yl(e, t, n, r) }

function yl(e, t, n, r) { return !!(tt(n) || n === 1 && r && e === t) }

function bl(e, t, n, r, i, a) { let o = ul(),
      { disableCustomCode: s } = Mg(); return tt(t) || tt(n) ? E(cC, { children: e }) : s && r ? E(`div`, { style: { padding: `12px 16px`, borderWidth: 1, borderRadius: 6, borderStyle: `solid`, borderColor: `rgba(149, 149, 149, 0.15)`, backgroundColor: `rgba(149, 149, 149, 0.1)`, fontSize: 12, color: `#a5a5a5` }, children: `Code component disabled` }) : (_l(t, o?.scopeId, o?.level, r ?? !1, i ?? !1, a ?? !1) && (e = E(cl, { getErrorMessage: ml.bind(null, t, n), fallback: null, children: e })), i && (e = E(fl, { scopeId: t, nodeId: n, children: e })), e) }

function xl(e, t, n) { let r = {}; for (let [, i] of e)
      for (let e of i) { let i = r[e] ?? t[e] ?? n[e];
         i && (r[e] = i) }
   return r }

function Sl(e) { return !(!e || e.placement || e.alignment) }

function Cl(e) { switch (e) {
      case `start`:
         return `0%`;
      case `center`:
         return `-50%`;
      case `end`:
         return `-100%`;
      default:
         H(e) } }

function wl(e, t = `center`) { switch (e) {
      case `top`:
         return `${Cl(t)}, -100%`;
      case `right`:
         return `0%, ${Cl(t)}`;
      case `bottom`:
         return `${Cl(t)}, 0%`;
      case `left`:
         return `-100%, ${Cl(t)}`;
      default:
         return `-50%, -50%` } }

function Tl(e, t) { let n = document.elementFromPoint(e, t); for (; n;) { if (n === document.body) return; let e = n.getAttribute(`data-framer-cursor`); if (e) return e; if (n.hasAttribute(yC)) { let e = n.getAttribute(yC);
         n = n.parentElement, e && (n = document.getElementById(e) ?? n) } else n = n.parentElement } }

function El(e) { let { registerCursors: t } = l(pC), n = qi(() => e), r = te();
   m(() => t(n, r), [t, r]) }

function Dl(e) { return !!(e && typeof e == `object` && xC in e) }

function Ol(e) { return `${e.scopeId}:${e.nodeId}:${e.furthestExternalComponent?.scopeId}:${e.furthestExternalComponent?.nodeId}` }

function kl() { return J.current() === J.canvas }

function Al(e) { return e === void 0 ? !1 : !!(e.startsWith(`#`) || e.startsWith(`/`) || e.startsWith(`.`)) }

function jl(e, t) { try { return !!new URL(e).protocol } catch {} return t }

function Ml(e, t, n, r) { if (R(e)) { let i = Al(e); if (!t.routes || !t.getRoute || !n || !i) return; let [a] = e.split(`#`, 2); if (a === void 0) return; let [o] = a.split(`?`, 2); if (o === void 0) return; let { routeId: s } = Vr(t.routes, o, void 0, r); return t.getRoute(s) } let { webPageId: i } = e; return t.getRoute?.(i) }

function Nl(e) { return R(e) && e.startsWith(`data:${OC}`) }

function Pl(e) { if (Nl(e)) try { let t = new URL(e),
         n = t.pathname.substring(OC.length),
         r = t.searchParams,
         i = r.has(wC) ? r.get(wC) : void 0,
         a, o = r.get(TC),
         s = r.get(EC),
         c = r.get(DC); return o && s && c && (a = { collection: o, collectionItemId: s, pathVariables: Object.fromEntries(new URLSearchParams(c).entries()) }), { target: n === `none` ? null : n, element: i === `none` ? void 0 : i, collectionItem: a } } catch { return } }

function Fl(e, t, n) { let r = t.getAttribute(`data-framer-page-link-target`),
      i, a; if (r) { i = t.getAttribute(`data-framer-page-link-element`) ?? void 0; let e = t.getAttribute(`data-framer-page-link-path-variables`);
      e && (a = Object.fromEntries(new URLSearchParams(e).entries())) } else { let e = t.getAttribute(`href`); if (!e) return !1; let n = Pl(e); if (!n || !n.target) return !1;
      r = n.target, i = n.element ?? void 0, a = n.collectionItem?.pathVariables } let o = i ? t.dataset.framerSmoothScroll !== void 0 : void 0; return e(r, i, Object.assign({}, n, a), o), !0 }

function Il(e) { if (!Nl(e)) return e; let t = Pl(e); if (!t) return; let { target: n, element: r, collectionItem: i } = t; if (n) return { webPageId: n, hash: r ?? void 0, pathVariables: Ll(i) } }

function Ll(e) { if (!e) return; let t = {}; for (let n in e.pathVariables) { let r = e.pathVariables[n];
      r && (t[n] = r) } return t }

function Rl({ children: e }) { return E(kC.Provider, { value: void 0, children: e }) }

function zl(e, t, n, r, i, a) { let o = l(kC),
      s = dl(),
      c = u(() => ({ scopeId: t, nodeId: n, furthestExternalComponent: s }), [t, n, s]),
      p = kt(),
      m = jt(),
      { locales: h } = yr(),
      g = u(() => { let e = Dl(r) ? r : Il(r); if (e) return Ml(e, p, m, h) }, [m, r, p, h]),
      _ = !!(!kl() && o?.nodeId && c.nodeId),
      v = f(e => { if (i.href) { if (e.preventDefault(), e.stopPropagation(), Fa(e)) { Hl(i.href, ``, `_blank`); return } g ? i.navigate?.() : Hl(i.href, i.rel, i.target) } }, [i, g]),
      y = f(e => { i.href && (e.preventDefault(), e.stopPropagation(), Hl(i.href, ``, `_blank`)) }, [i]),
      x = f(e => { i.href && e.key === `Enter` && (e.preventDefault(), e.stopPropagation(), g ? i.navigate?.() : Hl(i.href, i.rel, i.target)) }, [i, g]);
   hs(a, e => { e !== null && _ && (e.dataset.hydrated = `true`) }, [_]); let S = e; return _ && (d.forEach(e, e => { Vl(e) && (V(Bl(o), "outerLink must have nodeId defined at this point; this was verified with `shouldReplaceLink` above"), V(Bl(c), "innerLink must have nodeId defined at this point; this was verified with `shouldReplaceLink` above"), CC.collectNestedLink(o, c)) }), S = d.map(e, e => { if (!Vl(e)) return e; let t = Ul(e.type),
         { children: n, ...r } = e.props,
         i = { ...r, "data-nested-link": !0, role: `link`, tabIndex: 0, onClick: v, onAuxClick: y, onKeyDown: x, as: r.as && Ul(r.as) },
         a = `ref` in e ? e.ref : void 0; return b(t, { ...i, ref: a }, n) })), E(kC.Provider, { value: c, children: S }) }

function Bl(e) { return !tt(e?.nodeId) }

function Vl(e) { return O(e) && (Ul(e.type) !== e.type || Ul(e.props.as) !== e.props.as) }

function Hl(e, t, n) { let r = document.createElement(`a`);
   r.href = e, t && (r.rel = t), n && (r.target = n), document.body.appendChild(r), r.click(), r.remove() }

function Ul(e) { return e === `a` ? `span` : Xe(e) && Ne(e) === `a` ? ye.span : e }

function Wl(e) { e && je.read(() => { let t = document.getElementById(e); if (!t) return; let n = getComputedStyle(t),
         r = n.getPropertyValue(`--selection-color`).trim(),
         i = n.getPropertyValue(`--selection-background-color`).trim();
      je.render(() => { let t = document.querySelectorAll(`[data-framer-portal-id="${e}"]`);
         t.length !== 0 && (r && t.forEach(e => e.style.setProperty(AC, r)), i && t.forEach(e => e.style.setProperty(jC, i))) }) }) }

function Gl(e) { return [`[data-framer-portal-id="${e}"] * ::selection {
    color: var(${AC});
    background-color: var(${jC});
}`] }

function Kl({ triggerId: e, children: t }) { return j.useLayoutEffect(() => { e && Wl(e) }, [e]), t }

function ql(e) { return `${e?.x}-${e?.y}` }

function Jl(e) { switch (e) {
      case `top`:
         return `bottom`;
      case `right`:
         return `left`;
      case `bottom`:
         return `top`;
      case `left`:
         return `right`;
      default:
         H(e) } }

function Yl(e, t, n, r = 0) { let i = Math.max(e, r); if (e < i) return i; let a = t + r; return i + a > n ? n - a : i }

function Xl(e, t, n) { switch (e) {
      case `top`:
      case `bottom`:
         return t.y < 0 || t.y + t.height > n.height ? `y` : void 0;
      case `left`:
      case `right`:
         return t.x < 0 || t.x + t.width > n.width ? `x` : void 0;
      default:
         H(e) } }

function Zl(e, t, n, r) { switch (Xl(t, e, r)) {
      case `x`:
         return { placement: Jl(t), x: n.x * -1, y: n.y };
      case `y`:
         return { placement: Jl(t), x: n.x, y: n.y * -1 };
      default:
         return { placement: t, x: n.x, y: n.y } } }

function Ql(e, t, n, r, i, a, o) { let s = Y.rebaseRectOnto(t, e, n, r),
      c = { x: s.x + i.x, y: s.y + i.y, width: t.width, height: t.height }; if (!a) return [n, c]; let { x: l, y: u, placement: d } = Zl(c, n, i, a), f = Y.rebaseRectOnto(t, e, d, r); return [d, { x: Yl(f.x + l, t.width, a.width, o), y: Yl(f.y + u, t.height, a.height, o), width: t.width, height: t.height }] }

function $l(e, t, n) { return NC.containsPoint([t, ...n], e) ? t : e }

function eu(e) { return { constrainX: t => Math.min(Math.max(t, e.x + PC), e.x + e.width - PC), constrainY: t => Math.min(Math.max(t, e.y + PC), e.y + e.height - PC) } }

function tu({ x: e, y: t }, n, r, { constrainX: i, constrainY: a }) { let [o, s, c, l] = Y.points(r); switch (n) {
      case `left`: { let n = { x: i(e - FC), y: t }; return [n, $l(l, s, [n, c]), $l(c, o, [n, l])] }
      case `right`: { let n = { x: i(e + FC), y: t }; return [n, $l(s, l, [n, o]), $l(o, c, [n, s])] }
      case `top`: { let n = { x: e, y: a(t - FC) }; return [n, $l(s, o, [n, l]), $l(l, c, [n, s])] }
      case `bottom`: { let n = { x: e, y: a(t + FC) }; return [n, $l(o, s, [n, c]), $l(c, l, [n, o])] }
      default:
         H(n) } }

function nu(e, t) { switch (e) {
      case `left`:
         return `${Math.min(t.y,0)}px auto auto 0px`;
      case `right`:
         return `${Math.min(t.y,0)}px 0px auto auto`;
      case `top`:
         return `0px auto auto ${Math.min(t.x,0)}px`;
      case `bottom`:
         return `auto auto 0px ${Math.min(t.x,0)}px`;
      default:
         H(e) } }

function ru(e, t, n, r, i) { let a = Math.min(i.x, r.x),
      o = Math.min(i.y, r.y),
      s = Y.merge(r, i),
      c = tu({ x: e, y: t }, n, i, eu(r)).map(e => `${e.x-a}px ${e.y-o}px`).join(`, `); return { height: `${s.height}px`, width: `${s.width}px`, clipPath: `polygon(${c})`, inset: nu(n, Y.delta(r, i)) } }

function iu(e) { switch (e) {
      case `start`:
         return 0;
      case `center`:
         return .5;
      case `end`:
         return 1;
      default:
         H(e) } }

function au(e = `bottom`, t = `center`) { switch (e) {
      case `top`:
         return { originX: iu(t), originY: 1 };
      case `right`:
         return { originX: 0, originY: iu(t) };
      case `bottom`:
         return { originX: iu(t), originY: 0 };
      case `left`:
         return { originX: 1, originY: iu(t) };
      default:
         H(e) } }

function ou(e) { let t = e.current,
      n = { position: `absolute`, scrolls: !1 }; for (; t;) { if (t?.tagName === `BODY` || (getComputedStyle(t)?.position === `fixed` && (n.position = `fixed`), (t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) && (n.scrolls = !0), n.scrolls && n.position === `fixed`)) return n;
      t = t.parentElement } return n }

function su(e) { return je.read(e, !0), () => Ie(e) }

function cu(e) { let t = 0,
      n = 0; return (r, i, a, o) => { e.current?.style && (t = o?.clientX ?? t, n = o?.clientY ?? n, Object.assign(e.current.style, ru(t, n, a, r, i))) } }

function lu(e, t, n, r, i) { e.current && Object.assign(e.current.style, { position: t, visibility: `visible`, left: (n?.x ?? 0) + r + `px`, top: (n?.y ?? 0) + i + `px` }) }

function uu(e, t, n, { safeArea: r, onDismiss: i }) { let a = qi(() => new Set),
      o = j.useContext(IC),
      [s, c] = ve(); return j.useEffect(() => { if (s) { if (!t.current) return;
         t.current.style.pointerEvents = ``, o.add(t.current) } else { if (!t.current) return;
         t.current.style.pointerEvents = `none`, o.delete(t.current), c() } }, [s, c, t, o]), j.useEffect(() => { if (!r) { let e = e => { e.key === `Escape` && i() }; return K.addEventListener(`keyup`, e), () => K.removeEventListener(`keyup`, e) } let o;

      function s() { if (!(!o || a.size !== 0)) { for (let r of document.elementsFromPoint(o.x, o.y))
               if (r === e.current || r === t.current || r === n.current) return;
            i() } }

      function c(e) { o = e, je.read(s) } return K.addEventListener(`mousemove`, c), () => { K.removeEventListener(`mousemove`, c) } }, [i, r, e, n, t]), a }

function du({ placement: e, alignment: t, offset: n, collisionDetectionSize: r, collisionDetectionPadding: i }) { return (a, o) => Ql(a, o, e, t, n, r, i) }

function fu(e, t) { return qi(() => { let { originX: n, originY: r } = au(e, t), i = { x: oe(n), y: oe(r) }; return [i, e => { let n = au(e, t);
         i.x.set(n.originX), i.y.set(n.originY) }] }) }

function pu(e, { x: t, y: n }) { if (!e || !Qi(e) || !Zi(e) || !B(e.props.style) && !tt(e.props.style)) return null; let r = { ...e.props.style, originX: t, originY: n }; return j.cloneElement(e, { style: r }) }

function mu(e, t) { if (t || tt(e)) { let e = document.querySelector(`#${RC}`) ?? document.querySelector(`#${LC}`); if (e) return e } return (R(e) ? document.querySelector(e) : void 0) || document.body }

function hu({ alignment: e, placement: t, safeArea: n, offsetX: r, offsetY: i, anchorRef: a, className: o, children: s, portalSelector: c, zIndex: u, collisionDetection: d = !1, collisionDetectionPadding: f, onDismiss: p, ...m }) { let h = j.useRef(null),
      g = j.useRef(null),
      v = j.useRef(null),
      [y, b] = fu(t, e);
   j.useLayoutEffect(() => { if (!fs(a) || !v.current || !t || !e) return; let o = { x: r ?? 0, y: i ?? 0 },
         s, c = !1,
         l = !1,
         u, p, m, _, y, x = 0,
         S = 0,
         C = ou(a),
         w = C.position,
         T = v.current.getBoundingClientRect(),
         E = du({ placement: t, alignment: e, offset: o, collisionDetectionSize: d ? { width: K.innerWidth, height: K.innerHeight } : void 0, collisionDetectionPadding: f }),
         D = () => { c || (lu(h, w, m, x, S), n && y(u, m, p, _), _ = void 0) },
         O = () => { y = cu(g), _ ? D() : lu(h, w, m, x, S), l = !0 },
         k = () => { c || b(p) },
         ee = () => { if (!E || c) return;
            w === `fixed` ? (x = 0, S = 0) : (x = K.scrollX, S = K.scrollY), u = a.current.getBoundingClientRect(); let e = E(u, T);
            p = e[0], m = e[1] }; if (ee(), k(), O(), C.scrolls && (s = su(ee)), !n) return () => { s?.(), c = !0 }; let A = e => { _ = e, l && (je.read(ee, !1, !0), je.update(k, !1, !0), je.render(D, !1, !0)) },
         j = a.current; return j.addEventListener(`mousemove`, A), () => { j.removeEventListener(`mousemove`, A), s?.(), c = !0 } }, [n, t, e, r, i, a, d, f, b]); let x = uu(a, h, g, { safeArea: n, onDismiss: p }),
      S = l(ix); return _.createPortal(ee(ye.div, { ref: h, className: o, style: { top: 0, left: 0, visibility: `hidden`, width: `auto`, height: `auto`, position: `absolute`, zIndex: u }, ...m, children: [n ? E(`div`, { ref: g, style: { position: `absolute` }, "data-safearea": !0 }) : E(`div`, { style: { position: `fixed`, inset: 0 }, "aria-hidden": !0, onClick: p }), E(IC.Provider, { value: x, children: E(Rl, { children: E(MC, { triggerId: a.current?.id ?? void 0, children: E(`div`, { ref: v, children: pu(s, y) }) }) }) })] }), mu(c, S)) }

function gu({ component: e, props: t }) { let n = l(fS),
      r = b(e, t); if (`variant` in t && t.variant != null || !n) return r; let { activeVariantId: i, humanReadableVariantMap: a } = n; if (!i || !a) return r; let o = {}; for (let [e, t] of Object.entries(a)) o[t] = { variant: e }; return E(_S, { overrides: o, breakpoint: i, children: r }) }

function _u(e, t) { return e instanceof HTMLAnchorElement ? e : e instanceof Element ? e === t ? null : _u(e.parentElement, t) : null }

function vu({ children: e }) { return E(rl, { children: e }) }

function yu(e) { return A(function(t, n) { return E(vu, { children: E(e, { ...t, ref: n }) }) }) }

function bu(e, t, n, r, i, a) { let { webPageId: o, hash: s, pathVariables: c, hashVariables: l } = n; return Su(e, t, o, s, a, c, l, i, r) }

function xu(e, t, n, r) { if (!(!e.routes || !e.getRoute) && Al(t)) try { let [i, a] = t.split(`#`, 2);
      V(i !== void 0, `A href must have a defined pathname.`); let [o] = i.split(`?`, 2);
      V(o !== void 0, `A href must have a defined pathname.`); let { routeId: s, pathVariables: c, localeId: l } = Vr(e.routes, o, void 0, r), u = e.getRoute(s); if (u) return { routeId: s, route: u, href: t, elementId: a, pathVariables: Object.assign({}, n, c), locale: l ? r?.find(({ id: e }) => e === l) : void 0 } } catch {} }

function Su(e, t, n, r, i, a, o, s, c) { let l = { ...i, ...a, ...s?.path },
      u = { ...i, ...o, ...s?.hash },
      d = e.getRoute?.(n),
      f = sr(d, { currentRoutePath: t?.path, currentRoutePathLocalized: t?.pathLocalized, currentPathVariables: t?.pathVariables, hash: r, pathVariables: l, hashVariables: u, preserveQueryParams: e.preserveQueryParams, siteCanonicalURL: e.siteCanonicalURL, localeId: c?.id }); return { routeId: n, route: d, href: f, elementId: f.split(`#`, 2)[1], pathVariables: l, locale: c ?? void 0 } }

function Cu() { let e = l(VC),
      t = jt()?.pathVariables; return e || t }

function wu(e, { webPageId: t, hash: n, pathVariables: r }, i) { if (t !== e.id || n) return !1; if (e.path && e.pathVariables) { let t = Object.assign({}, i, r); for (let [, n] of e.path.matchAll(BC))
         if (!n || e.pathVariables[n] !== t[n]) return !1 } return !0 }

function Tu() { let e = n.connection || n.mozConnection || n.webkitConnection || {},
      t = n.deviceMemory && n.deviceMemory > WC,
      r, i, a;

   function o() { r = e.effectiveType || ``, i = e.saveData || r.includes(`2g`), a = r === `3g` || t ? GC : KC } e.addEventListener?.(`change`, o), o(); let s = new IntersectionObserver(u, { threshold: UC }),
      c = 0;
   async function l(e, t) { if (i) return; let { id: n, preload: r } = e, a = YC.get(n); if (!a?.size || JC.has(n)) return;++c, JC.add(n); let o = r()?.catch(() => {});
      s.unobserve(t), qC.delete(t); for (let e of a) s.unobserve(e), qC.delete(e);
      a.clear(), YC.delete(n), await o, --c }

   function u(e) { for (let t of e) { let e = t.target,
            n = qC.get(e); if (!n || JC.has(n.id)) { s.unobserve(e), qC.delete(e); continue } let r = n.id,
            i = YC.get(r),
            o = YC.get(r)?.size ?? 0; if (t.isIntersecting) { if (c >= a) continue;
            i ? i.add(e) : YC.set(r, new Set([e])), setTimeout(l, HC, n, e) } else i && i.delete(e), o <= 1 && YC.delete(r) } } return (e, t, n) => { if (!JC.has(n)) return qC.set(e, { id: n, preload: t }), s.observe(e), () => { qC.delete(e), s.unobserve(e) } } }

function Eu(e, t) { let n = Al(e),
      r = { href: e === `` || jl(e, n) ? e : `https://${e}`, target: Du(t?.openInNewTab, n), rel: n ? void 0 : Ou(`noopener`, t?.rel) }; return t?.preserveParams && (r.href = kn(r.href ?? e), r[`data-framer-preserve-params`] = !0), t?.trackLinkClick && (r.onClick = () => { t.trackLinkClick(e) }), r }

function Du(e, t) { return e === void 0 ? t ? void 0 : `_blank` : e ? `_blank` : void 0 }

function Ou(e, t) { if (e && !t) return e; if (!e && t) return t; if (e && t) return `${e} ${t}` }

function ku(e, t) { console.warn(ut(`Failed to resolve slug: ${e instanceof Error?e.message:t??`Unknown error`}`)) }

function Au(e, t, n) { try { let r = t?.get(e.collectionId); if (!r) return ku(void 0, `Couldn't find collection utils for collection id: "${e.collectionId}"`); let i = r.getSlugByRecordId(e.collectionItemId, n ?? void 0); return st(i) ? i.catch(ku) : i } catch (e) { ku(e) } } async function ju(e, t, n, r) { async function i(e) { if (!e) return {}; let t = {}; for (let i in e) { let a = e[i];
         V(a, `unresolvedSlug should be defined`); let o = Au(a, r, n),
            s = st(o) ? await o : o;
         s && (t[i] = s) } return t }
   let [a, o] = await Promise.allSettled([i(e), i(t)]); return { path: a.status === `fulfilled` ? a.value : void 0, hash: o.status === `fulfilled` ? o.value : void 0 } }

function Mu(e, t, n, r, i = []) {
   function a(e) { if (!e) return; let t = {}; for (let a in e) { let o = e[a]; if (!o) continue; let s = Au(o, r, n);
         st(s) ? i.push(s) : s && (t[a] = s) } return t } let o = { path: a(e), hash: a(t) }; return i.length > 0 ? Promise.allSettled(i) : o }

function Nu() { let e = mn(); return f((t, n, r, i = []) => Mu(t, n, r, e, i), [e]) }

function Pu({ nodeId: e, clickTrackingId: t, router: n, href: r, activeLocale: i }) { let a = mn(); return f(async o => { if (!n.pageviewEventData?.current) return; let s = n.pageviewEventData.current instanceof Promise ? await n.pageviewEventData.current : n.pageviewEventData.current,
         c = Dl(r) ? r : Il(r); if (!Dl(c)) return nn(`published_site_click`, { ...s, href: o ? Fu(o) : null, nodeId: e ?? null, trackingId: t || null, targetRoutePath: null, targetWebPageId: null, targetCollectionItemId: null }, `eager`); let l = c.webPageId,
         u = n?.getRoute?.(l),
         d = u?.path ?? null,
         f = null; if (u?.collectionId && c.pathVariables) { let e = a?.get(u.collectionId); if (!e) return; let [t] = Object.values(c.pathVariables); if (R(t)) { let n = e.getRecordIdBySlug(t, i || void 0);
            f = (st(n) ? await n : n) ?? null } } return nn(`published_site_click`, { ...s, href: o ? Fu(o) : null, nodeId: e ?? null, trackingId: t ?? null, targetRoutePath: d, targetWebPageId: l, targetCollectionItemId: f }, `eager`) }, [e, t, n, r, i, a]) }

function Fu(e) { try { let t = new URL(e, K.document.baseURI); return t.origin === K.location.origin ? t.pathname + t.search + t.hash : t.href } catch { return e } }

function Iu(e, t, n, r, i, a, o) { n(), e.navigate?.(t, r, i, a, o) }

function Lu(e, t, n) { return async r => { let i = Fa(r),
         a = _u(r.target),
         o = !a || a.getAttribute(`target`) === `_blank`,
         s = !i && !o,
         c = () => void t(e); if (!s) { await yn({ priority: `user-blocking`, ensureContinueBeforeUnload: !0, continueAfter: `paint` }), c(); return } r.preventDefault(), n(c) } }

function Ru(e, t, n, r, i, a, o, s) { if (!n) return Eu(e, r); let c = xu(t, e, s, o); if (!c) return Eu(e, r); let { routeId: l, route: u, elementId: d, pathVariables: f, locale: p } = c; if (!u) return Eu(e, r); let m = sr(u, { currentRoutePath: n.path, currentRoutePathLocalized: n.pathLocalized, currentPathVariables: n.pathVariables, hash: d, pathVariables: f, preserveQueryParams: t.preserveQueryParams && !gg, siteCanonicalURL: t.siteCanonicalURL, localeId: a }),
      h = Du(r.openInNewTab, !0),
      g = h === `_blank`,
      _ = { pathVariables: f, locale: p },
      v = e => Iu(t, l, () => i(l, _, !1, !g), d, f, r.smoothScroll, e); return { href: m, target: h, onClick: Lu(m, r.trackLinkClick, v), navigate: v, "data-framer-page-link-current": n && wu(n, { webPageId: l, hash: d, pathVariables: f }, s) || void 0, preload: () => i(l, _, !0, !g), _routeId: l, _pathVariables: f, _locale: p } }

function zu(e, t, n) { let r = Bu(e.style, t.style),
      i = { ...e, ...t, ...r && { style: r }, ref: n },
      { onTap: a, onClick: o } = t; if (!a && !o) return i; let { onClick: s, onTap: c } = e; return { ...i, onClick: o || s ? e => { Ze(s) && s?.(e), o?.(e) } : void 0, onTap: a || c ? (e, t) => { Ze(c) && c?.(e, t), a?.(e, t) } : void 0 } }

function Bu(e, t) { let n = B(e) ? e : void 0,
      r = n && !et(n),
      i = t && !et(t); if (!(!r && !i)) return { ...n, ...t } }

function Vu(e, t, n) { if (!(t && wa())) return e; let { onClick: r, ...i } = e; return r ? n ? { ...i, onTap: r, onClick: Hu } : { ...i, onTap: r } : e }

function Hu(e) { let t = _u(e.target);!t || t.getAttribute(`target`) === `_blank` || e.preventDefault() }

function Uu(e, t, n, r, i, a) { let o = Dl(e) ? e : Il(e); if (!Dl(o)) return R(e) ? Eu(e).href : void 0; if (!t.getRoute || !t.currentRouteId) return; let s = t.getRoute(t.currentRouteId),
      { webPageId: c, hash: l, pathVariables: u, hashVariables: d, unresolvedHashSlugs: f, unresolvedPathSlugs: p } = o,
      m = t.getRoute(c),
      h = p || f ? a?.(p, f) : void 0; if (st(h)) return; let g = Object.assign({}, t.currentPathVariables, n, u, h?.path),
      _ = Object.assign({}, t.currentPathVariables, n, d, h?.hash),
      v = sr(m, { currentRoutePath: s?.path, currentRoutePathLocalized: s?.pathLocalized, currentPathVariables: t.currentPathVariables, hash: l, pathVariables: g, hashVariables: _, relative: !1, preserveQueryParams: t.preserveQueryParams, onlyHash: r, siteCanonicalURL: t.siteCanonicalURL, localeId: i?.id }); return r ? v : (i?.slug ? `/${i.slug}` : ``) + v }

function Wu() { return (function() { async function e(e) { let t = new TextEncoder().encode(e),
            n = await crypto.subtle.digest(`SHA-256`, t); return Array.from(new Uint8Array(n)).map(e => e.toString(16).padStart(2, `0`)).join(``) }

      function t(e) { let t = ``; for (let n = 0; n < e; n++) t += `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(Math.floor(Math.random() * 62)); return t } addEventListener(`message`, async n => { let { salt: r, difficulty: i, tokenLength: a, maxTime: o } = n.data, s = `0`.repeat(i), c = performance.now(), l = !0; for (; l;) { if (performance.now() - c > o) { l = !1, postMessage({ success: !1 }); return } let n = t(a),
               i = `${Date.now()}:${n}`,
               u = await e(r + i); if (u.startsWith(s)) { postMessage({ success: !0, secret: i, hash: u }); return } } }) }).toString() } async function Gu() { return new Promise((e, t) => { let n = URL.createObjectURL(new Blob([`(`, Wu(), `)()`], { type: `application/javascript` })),
         r = new Worker(n);
      r.onmessage = t => { r.terminate(), URL.revokeObjectURL(n), t.data.success ? e({ secret: t.data.secret, hash: t.data.hash }) : e(void 0) }, r.onerror = e => { r.terminate(), URL.revokeObjectURL(n), t(e) }, r.postMessage({ salt: QC, difficulty: $C, tokenLength: ew, maxTime: tw }) }) }

function Ku(e) { return Array.from(e.keys()).map(encodeURIComponent).join(`,`) }

function qu(e, t) { try { let n = t.cookie.match(`(^|;) ?framerFormsUTMTags=([^;]*)(;|$)`); if (n !== null && n[2]) { let t = JSON.parse(decodeURIComponent(n[2])); if (!t || typeof t != `object`) return;
         [`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`].forEach(n => { typeof t[n] == `string` && e.append(n, t[n]) }) } } catch {} }

function Ju(e) { let t = j.useContext(_w),
      n = j.useMemo(() => e ? iw.map(e => ({ inputRef: j.createRef(), originalName: e, methodsUsed: { setAttribute: !1, valueProperty: !1 } })) : [], [e]); return { states: n, convertHoneypotFieldsForSubmission: j.useCallback(() => { n.forEach(e => { let t = e.inputRef.current;
            t && (t.name = `${rw}_${e.originalName}`) }) }, [n]), replaceHoneypotWithMetadata: j.useCallback(r => { if (!e) return; let i = n.length,
            a = 0,
            o = [];
         n.forEach(e => { let t = e.inputRef.current; if (t) { let n = t.name,
                  i = t.value; if (i) { a++; let t = {
                     [ow.name]: e.originalName, [ow.value]: i, [ow.setAttribute]: e.methodsUsed.setAttribute, [ow.valueProperty]: e.methodsUsed.valueProperty, [ow.isInputEventTrusted]: e.methodsUsed.isInputEventTrusted, [ow.inputChangeTimeSinceModuleLoad]: e.methodsUsed.inputChangeTimeSinceModuleLoad, [ow.wasFilledBeforeHydration]: e.methodsUsed.wasFilledBeforeHydration };
                  o.push(JSON.stringify(t)) } r.delete(n), t.name = e.originalName } }), r.append(`${rw}_${sw.fieldData}`, `[${o.join(`,`)}]`), r.append(`${rw}_${sw.fieldCount}`, i.toString()), r.append(`${rw}_${sw.fieldFilledCount}`, a.toString()), r.append(`${rw}_${sw.hpVersion}`, nw), r.append(`${rw}_${sw.siteId}`, t || ``), r.append(`${rw}_${sw.timeToSubmissionSinceModuleLoad}`, cw()) }, [e, n, t]) } }

function Yu({ states: e }) { return E(y, { children: e.map(e => E(lw, { inputStateRef: e }, `hp_${e.originalName}`)) }) }

function Xu({ router: e, nodeId: t, submitTrackingId: n }) { e?.pageviewEventData?.current && (e.pageviewEventData.current instanceof Promise ? e.pageviewEventData.current.then(e => { Zu(e, t, n) }) : Zu(e.pageviewEventData.current, t, n)) }

function Zu(e, t, n) { return nn(`published_site_form_submit`, { ...e, nodeId: t ?? null, trackingId: n || null }, `eager`) }

function Qu(e) { return `${uw}?render=${encodeURIComponent(e)}&badge=bottomleft` }

function $u(e) { let t = dw.get(e); if (t) return t; let n = Qu(e); if (document.querySelector(`script[src="${n}"]`)) { let t = Promise.resolve(); return dw.set(e, t), t } let r = new Promise((t, r) => { let i = document.createElement(`script`);
      i.src = n, i.onload = () => t(), i.onerror = () => { dw.delete(e), i.remove(), r(Error(`Failed to load captcha script`)) }, document.head.appendChild(i) }); return dw.set(e, r), r }

function ed(e, t) { return new Promise((t, n) => { let { grecaptcha: r } = h; if (!r) { n(Error(`Captcha script not available`)); return } r.ready(() => { r.execute(e).then(t, n) }) }) }

function td({ provider: e, siteKey: t }) { return j.useEffect(() => { e === `recaptcha_v3` && t && vg(() => { $u(t).catch(() => {}) }) }, [e, t]), { executeChallenge: j.useCallback(async n => { if (!(e !== `recaptcha_v3` || !t)) return await $u(t), ed(t, n) }, [e, t]) } }

function nd({ state: e }, { type: t }) { switch (t) {
      case `complete`:
         return e === `error` ? gw : hw;
      case `incomplete`:
         return e === `error` ? gw : mw;
      case `submit`:
         return fw;
      case `success`:
         return pw;
      case `error`:
         return gw;
      default:
         H(t) } }

function rd({ state: e }) { return e === `incomplete` || e === `complete` }

function id(e) { e.preventDefault() }

function ad(e, t) { let n = jl(e, !1) ? e : `https://${e}`,
      r = document.createElement(`a`);
   r.href = n, r.target = `_self`, r.style.display = `none`, `current` in t && t.current && (t.current.appendChild(r), r.click(), r.remove()) }

function od(e) { if (e.children.length === 0) return !1; for (let t of e.children)
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) { if (t.required && t.value === ``) return !0 } else if (od(t)) return !0; return !1 } async function sd(e, t, n, r) { let i = await Gu(); if (!i) throw Error(`Failed to calculate proof of work`); let a = await r(`submit`),
      o = { "Framer-Site-Id": n, "Framer-POW": i.secret, "Framer-Form-Fields": Ku(t) };
   a && (o[`Framer-Captcha-Response`] = a); let s = await fetch(e, { body: t, method: `POST`, headers: o }); if (s.ok) return s; { let e = await s.json(),
         t = `Failed to submit form`; throw cd(e) ? Error(`${t} - ${e.error.message}`) : Error(t) } }

function cd(e) { return typeof e == `object` && !!e && `error` in e && B(e.error) && `message` in e.error && typeof e.error.message == `string` }

function ld({ EditorBar: e, fast: t = !1 }) { let n = Mg(),
      i = l(_w),
      a = r(yg, t ? xw : Sw, xg),
      o = u(() => { let e = {},
            t; for (t in n) n.hasOwnProperty(t) && (t.startsWith(`editorBar`) || t.startsWith(`onPage`)) && (e[t] = n[t]); return e }, [n]); return !e || !i || !a ? null : E(bw, { children: E(C, { children: E(e, { framerSiteId: i, features: o }) }) }) }

function ud({ currentRoutePath: e, routerAPI: n, children: r }) { let i = t(),
      a = t(),
      s = t(n),
      l = t(null);
   s.current = n, o(() => { e && (i.current ??= new Set, i.current.add(e), a.current?.(e)) }, [e]); let [u] = c(() => ({ getInitialState: () => ({ visitedPages: i.current ?? new Set, getCurrentRoutePath: () => s.current ? fd(s.current, s.current.currentRouteId, s.current.currentPathVariables) : ``, resolveRoute: e => s.current ? fd(s.current, e.webPageId, e.pathVariables) : ``, setRouteChangeHandler: e => { a.current = e }, sendTrackingEvent: async e => { s.current && dd(s.current.pageviewEventData.current, e) } }), triggerStateRef: l })); return E(Cw.Provider, { value: u, children: r }) } async function dd(e, t) { if (!rn(t.trackingId)) return; let n = e instanceof Promise ? await e : e;
   n && nn(`published_site_trigger_invoke`, { ...n, ...t, trackingId: t.trackingId || null }, `lazy`) }

function fd(e, t, n) { let r = e.getRoute(t); return !r || !r.path ? `` : n ? On(r.path, n) : r.path }

function pd({ children: e, loadSnippetsModule: t }) { return E(Pw.Provider, { value: t, children: e }) }

function md() { return j.useContext(Pw) }

function hd(e) { return { start: `<!-- Snippet: ${e} -->`, end: `<!-- SnippetEnd: ${e} -->` } } async function gd(e, t, n = `beforeend`) { let r, i; switch (n) {
      case `beforebegin`:
         V(t.parentNode, `Can't use 'beforebegin' with a referenceNode at the top level`), r = t.parentNode, i = t; break;
      case `afterend`:
         V(t.parentNode, `Can't use 'afterend' with a referenceNode at the top level`), r = t.parentNode, i = t.nextSibling; break;
      case `afterbegin`:
         r = t, i = t.firstChild; break;
      case `beforeend`:
         r = t, i = null; break;
      default:
         H(n) } let a = document.createRange();
   a.selectNodeContents(r), await _d(a.createContextualFragment(e), r, i) } async function _d(e, t, n) { for (let r = e.firstChild; r; r = r.nextSibling) { if (r instanceof HTMLScriptElement) { let e = vd(r, t, n);
         e !== void 0 && await e; continue } let e = r.cloneNode(!1);
      t.insertBefore(e, n), r.firstChild && await _d(r, e, null) } }

function vd(e, t, n) { let r = e.cloneNode(!0); if (!e.hasAttribute(`src`) || e.hasAttribute(`async`) || e.hasAttribute(`defer`) || e.getAttribute(`type`)?.toLowerCase() === `module`) t.insertBefore(r, n);
   else return yd(r, t, n) }

function yd(e, t, n) { return new Promise(r => { e.onload = e.onerror = r, t.insertBefore(e, n) }) }

function bd(e) { let t, n; switch (e) {
      case `bodyStart`:
         t = Aw, n = jw; break;
      case `bodyEnd`:
         t = Mw, n = Nw; break;
      case `headStart`:
         t = Ew, n = Dw; break;
      case `headEnd`:
         t = Ow, n = kw; break } let r = e === `bodyStart` || e === `bodyEnd` ? document.body : document.head,
      i = null,
      a = null; for (let e of r.childNodes) { if (e.nodeType !== Node.COMMENT_NODE) continue; let r = `<!--${e.nodeValue}-->`;
      r === t ? i = e : r === n && (a = e) } return { start: i, end: a } }

function xd(e, t, n) { if (!t || !n) return { start: null, end: null }; let r = null,
      i = null,
      { start: a, end: o } = hd(e),
      s = t.nextSibling; for (; s && s !== n;) { if (s.nodeType !== Node.COMMENT_NODE) { s = s.nextSibling; continue } let e = `<!--${s.nodeValue}-->`; if (e === a) r = s;
      else if (e === o) { i = s; break } s = s.nextSibling } return { start: r, end: i } } async function Sd(e, t, n) { if (t.length === 0) return; let { start: r, end: i } = bd(e), a = e === `bodyStart` || e === `bodyEnd` ? document.body : document.head; for (let e of t) { let { start: t, end: o } = xd(e.id, r, i), s = t && o; if (s && e.loadMode === `once`) continue; if (Cd(t, o), s) { await gd(e.code, o, `beforebegin`); continue } let { start: c, end: l } = hd(e.id), u = `${c}
${e.code}
${l}`, d = Td(e.id, n, r, i);
      d ? await gd(u, d, `afterend`) : await gd(u, r ?? a, r ? `afterend` : `beforeend`) } }

function Cd(e, t) { if (!e || !t) return; let n = e.nextSibling; for (; n && n !== t;) { let e = n.nextSibling;
      wd(n) && n.remove(), n = e } }

function wd(e) { if (e.nodeType !== Node.ELEMENT_NODE) return !0; if (e.nodeName === `SCRIPT`) { let t = e.type; if (!t || t === `text/javascript` || t === `module`) return !1 } return !0 }

function Td(e, t, n, r) { let i = t.indexOf(e) - 1; if (i < 0) return null; for (let e = i; e >= 0; e--) { let i = t[e]; if (!i) continue; let a = xd(i, n, r).end; if (a) return a } return null }

function Ed() { let e = md(); return f(async (t, n, r, i) => { if (!e) return; let a = document.getElementById(ww),
         o = a && a.dataset[Tw] !== void 0; if (i && o) return; let { getSnippets: s, snippetsSorting: c } = await e.readMaybeAsync(), l = await s(t, n, r); for (let e in l) { let t = e,
            n = l[t],
            r = c[t];
         await Sd(t, n, r) } }, [e]) }

function Dd(e, t) { if (e.routeId !== t.routeId) return !1; if (e.pathVariables === t.pathVariables) return !0; let n = e.pathVariables || {},
      r = t.pathVariables || {}; return n.length === r.length && Object.keys(n).every(e => n[e] === r[e]) }

function Od() { let e = Intl.DateTimeFormat().resolvedOptions();
   Fw = e.timeZone, Iw = e.locale }

function kd() { let [e, t] = j.useState(0); return [e, j.useCallback(() => t(e => e + 1), [])] }

function Ad(e, t, n) { let r = e && document.getElementById(e); if (r) { Id(r, t); return } n || h.scrollTo(0, 0) }

function jd(e) { let n = t([]); return m(() => { n.current?.length && (n.current.forEach(e => e()), n.current = []) }, [e]), f(e => { n.current.push(e) }, []) }

function Md(e) { if (!e) return mg; let t = !1; return () => { t || (t = !0, e?.()) } }

function Nd() { let e = fr(),
      n = t(void 0); return f(async (t, r, i, a = !0) => { let o = i !== void 0;
      n.current?.abort(); let s = a ? new AbortController : void 0;
      n.current = s; let c = s?.signal,
         l = It(c); if (r.promise.finally(l), !o) return n.current = void 0, t(c), r.promise;
      t(c); let u; if (e(new Promise((e, t) => { u = e, c?.addEventListener(`abort`, t) }).catch(mg), i, s), await r.promise, c?.aborted) return; let d = h.navigation?.transition;
      u(); try { await d?.finished } catch (e) { console.error(`Navigation transition failed`, e) } c?.aborted || O_() }, [e]) }

function Pd({ defaultPageStyle: e, disableHistory: n, initialPathVariables: r, initialRoute: i, notFoundPage: a, collectionUtils: c, routes: l, initialLocaleId: d, initialCollectionItemId: p, locales: g = kg, preserveQueryParams: _ = !1, LayoutTemplate: v, EditorBar: y, siteCanonicalURL: b, adaptLayoutToTextDirection: x }) { Nr(), ir({ disabled: n, routeId: i, initialPathVariables: r, initialLocaleId: d }); let S = Xn(),
      [C, w] = kd(),
      T = jd(C),
      D = Nd(),
      O = $n(`framer-route-change`),
      { synchronousNavigationOnDesktop: k } = Mg(),
      A = u(() => !k || !Pa() ? M : e => e(), [k]),
      j = Ed(),
      te = t(!0),
      ne = t(),
      re = t(i),
      ie = t(r),
      ae = t(d),
      oe = ae.current,
      se = u(() => g.find(({ id: e }) => oe ? e === oe : e === Ng) ?? null, [oe, g]),
      ce = se?.textDirection ?? `ltr`,
      le = x ? ce : `ltr`;
   m(() => { x && document.documentElement.setAttribute(`dir`, ce) }, [ce, x]); let ue = lr(),
      de = u(() => ({ activeLocale: se, locales: g, setLocale: async e => { let t = O({ localized: !0 });
            await yn({ priority: `user-blocking`, continueAfter: `paint` }); let n;
            R(e) ? n = e : B(e) && (n = e.id); let r = g.find(({ id: e }) => e === Ng),
               i = g.find(({ id: e }) => e === n); if (!i) return; let a = re.current,
               o = l[a]; if (o) try { let e = await ue({ currentLocale: se, nextLocale: i, route: o, routeId: a, defaultLocale: r, pathVariables: ie.current, preserveQueryParams: _ }); if (!e) return; let n = tr(h.history.state) ? h.history.state.paginationInfo : void 0,
                  s = e.path;
               te.current = !1, ie.current = e.pathVariables, ae.current = i.id, D(() => { S(a, a, () => A(w)) }, t, async (t = !1) => { if (s) return rr({ routeId: a, pathVariables: e.pathVariables, localeId: i.id, paginationInfo: n }, s, t) }, !1) } catch {} } }), [se, w, g, _, l, D, S, O, A, ue]),
      fe = f((e, t, n, r, i, a, o, s = !1, c) => { te.current = !1; let l = re.current; if (re.current = e, ie.current = i, ae.current = t, ne.current = r, T(() => { Ad(n, s, a) }), a) { A(w); return } D(t => { S(l, e, () => A(w), t) }, o, c, !0) }, [w, T, D, S, A]);
   ar(re, fe); let pe = f(async (e, t, r, i, a) => { let o = l[e],
            s = ft(o?.page) ? o.page.getStatus() : void 0,
            c = s?.hasRendered,
            u = O({ cached: c, preloaded: c ? void 0 : s?.hasLoaded }),
            d = Md(a); if (yn({ priority: `background`, ensureContinueBeforeUnload: !0, continueAfter: `paint` }).then(d), await yn({ priority: `user-blocking`, continueAfter: `paint` }), r) { let e = new Set,
               t = o?.path ?? `/`; for (let n of t.matchAll(g_)) { let t = n[1]; if (t === void 0) throw Error(`A matching path variable should not be undefined`);
               e.add(t) } r = Object.fromEntries(Object.entries(r).filter(([t]) => e.has(t))) } let f = Ft(o, t),
            p = ie.current,
            m = ae.current; if (Dd({ routeId: re.current, pathVariables: p }, { routeId: e, pathVariables: r })) { u.ignore?.(); let a = l[e];
            h.history.state?.hash !== t && !n && a && (d(), await er(e, a, { currentRoutePath: a.path, currentPathVariables: p, pathVariables: r, hash: t, localeId: m, preserveQueryParams: _, siteCanonicalURL: b, currentRoutePathLocalized: a.pathLocalized })), Ad(f, i, !1); return } if (!o) return; let g = l[re.current];
         fe(e, m, f, Nn(b) + sr(o, { currentRoutePath: g?.path, currentRoutePathLocalized: g?.pathLocalized, currentPathVariables: p, hash: t, pathVariables: r, localeId: m, preserveQueryParams: _, siteCanonicalURL: b, relative: !1 }), r, !1, u, i, n ? void 0 : async (n = !1) => (d(), er(e, o, { currentRoutePath: g?.path, currentPathVariables: p, currentRoutePathLocalized: g?.pathLocalized, hash: t, pathVariables: r, localeId: m, preserveQueryParams: _, siteCanonicalURL: b }, n))) }, [l, fe, n, _, b, O]),
      me = Dt(l),
      he = re.current,
      ge = ne.current,
      N = ie.current,
      _e = l[he],
      ve = _e?.path,
      ye = Lw(_e, he, ge, N, se, p),
      P = te.current;
   o(() => { j(he, N ?? {}, de.activeLocale, P) }, [j, he, N, de, P]); let be = u(() => ({ navigate: pe, getRoute: me, currentRouteId: he, currentPathVariables: N, routes: l, collectionUtils: c, preserveQueryParams: _, pageviewEventData: ye, siteCanonicalURL: b, isInitialNavigation: P }), [pe, me, he, N, l, c, _, b, ye, P]); if (!_e) throw Error(`Router cannot find route for ${he}`); let xe = !se || !_e.includedLocales || _e.includedLocales.includes(se.id),
      Se = ve && N ? On(ve, N) : ve,
      F = String(oe) + Se,
      Ce = qi(() => ({ ...e, display: `contents` })); return E(Ot, { api: be, children: E(L_.Provider, { value: de, children: E(R_.Provider, { value: le, children: E(_C, { children: E(xr, { children: ee(ud, { currentRoutePath: Se, routerAPI: be, children: [y && E(ld, { EditorBar: y, fast: !0 }), E(nC, { children: ee(rl, { children: [ee(hv, { notFoundPage: a, defaultPageStyle: e, forceUpdateKey: C, children: [E(pv.Start, {}), E(Fd, { LayoutTemplate: v, webPageId: _e?.abTestingVariantId ?? he, style: e, children: t => E(s, { children: xe ? Rr(_e.page, t ? Ce : e) : a && Rr(a, e) }, F) })] }), y && E(ld, { EditorBar: y }), E(kr, {}), E(pv.End, {})] }) })] }) }) }) }) }) }) }

function Fd({ LayoutTemplate: e, webPageId: t, style: n, children: r }) { return e ? E(e, { webPageId: t, style: n, children: r }) : r(!1) }

function Id(e, t) { let n = t ? { behavior: `smooth`, block: `start`, inline: `nearest` } : void 0;
   e.scrollIntoView(n) }

function Ld(e) { return new Promise((t, n) => { try { new URL(e); let r = new Image;
         r.onload = () => t(), r.onerror = n, r.src = e } catch (e) { n(e) } }) }

function Rd(e) { return typeof e == `object` && !!e }

function zd(e, t) { if (t === ``) return e; let n = t.split(/[.[\]]+/u).filter(e => e.length > 0),
      r = e; for (let e of n) { if (!Rd(r)) return;
      r = r[e] } return r }

function Bd(e) { return `${e.credentials}:${e.url}` }

function Vd(e) { return R(e) && !Number.isNaN(Number(e)) }

function Hd(e, t) { switch (e) {
      case `string`:
         return R(t) || z(t);
      case `color`:
         return R(t);
      case `boolean`:
         return Qe(t);
      case `number`:
         return z(t) || Vd(t);
      case `link`:
      case `image`:
         return R(t) && jl(t, !1);
      default:
         return !1 } }

function Ud(e, t) { if (e.status === `loading`) return t.fallbackValue; if (e.status === `error`) throw e.error; let n = zd(e.data, t.resultKeyPath); if (tt(n)) throw Error(`Key '${t.resultKeyPath}' not found in response`); if (!Hd(t.resultOutputType, n)) throw Error(`Resolved value '${n}' is not valid for type '${t.resultOutputType}'`); return n }

function Wd(e, t) { if (J.current() === J.canvas) return !1; let n = Math.max(t * 1e3, zw); return Date.now() >= e + n }

function Gd(e) { let { RootComponent: t, isWebsite: n, environment: r, routeId: i, framerSiteId: a, pathVariables: o, routes: s, collectionUtils: c, notFoundPage: l, isReducedMotion: u = !1, skipAnimations: d = !1, includeDataObserver: f = !1, localeId: p, locales: m, preserveQueryParams: h, EditorBar: g, defaultPageStyle: _, disableHistory: v, LayoutTemplate: y, siteCanonicalURL: b, adaptLayoutToTextDirection: x, loadSnippetsModule: S, initialCollectionItemId: C } = e; return j.useEffect(() => { n || Hv.start() }, []), n ? E(hr, { value: r ?? `preview`, children: E(Me, { reducedMotion: d ? `always` : u ? `user` : `never`, skipAnimations: d, children: E(pn, { collectionUtils: c, children: E(Zw, { children: E(_w.Provider, { value: a, children: E(pd, { loadSnippetsModule: S, children: E(Pd, { initialRoute: i, initialPathVariables: o, initialLocaleId: p, initialCollectionItemId: C, routes: s, collectionUtils: c, notFoundPage: l, locales: m, defaultPageStyle: _ ?? { minHeight: `100vh`, width: `auto` }, preserveQueryParams: h, EditorBar: g, disableHistory: v, LayoutTemplate: y, siteCanonicalURL: b, adaptLayoutToTextDirection: x }) }) }) }) }) }) }) : E(f ? lS : j.Fragment, { children: E(At, { routes: s, children: E(eS, { children: j.isValidElement(t) ? t : j.createElement(t, { key: i }) }) }) }) }

function Kd(e) { return { trace(...t) { return Jb.getLogger(e)?.trace(...t) }, debug(...t) { return Jb.getLogger(e)?.debug(...t) }, info(...t) { return Jb.getLogger(e)?.info(...t) }, warn(...t) { return Jb.getLogger(e)?.warn(...t) }, error(...t) { return Jb.getLogger(e)?.error(...t) }, get enabled() { return Jb.getLogger(e) !== void 0 } } }

function qd(e) { let t = e.next(); return V(t.done, `Generator must not yield`), t.value } async function Jd(e, t = e.next()) { for (; !t.done;) { let n = await t.value;
      t = e.next(n) } return t.value }

function Yd(e) { let t = e.next(); return t.done ? t.value : Jd(e, t) }

function* Xd(e) { let t = {},
      n = Object.keys(e),
      r = []; for (let i of n) { let n = e[i]; if (at(n)) { let e = n.next();
         e.done ? t[i] = e.value : r.push(Jd(n, e).then(e => { t[i] = e })) } else t[i] = n } return r.length > 0 && (yield Promise.all(r)), t }

function* Zd(e) { let t = [],
      n = e.keys(),
      r = []; for (let i of n) { let n = e[i]; if (at(n)) { let e = n.next();
         e.done ? t[i] = e.value : r.push(Jd(n, e).then(e => { t[i] = e })) } else t[i] = n } return r.length > 0 && (yield Promise.all(r)), t }

function Qd(e) { return tf(e) || af(e) }

function $d(e) { return $e(e) && e.every(B) }

function ef(e) { return B(e) && Ze(e.read) && Ze(e.preload) }

function tf(e) { return $d(e) || ef(e) }

function nf(e) { return B(e) && B(e.schema) }

function rf(e) { return B(e) && B(e.collectionByLocaleId) }

function af(e) { return nf(e) || rf(e) }

function of(e, t, n) { let r = e.value.length,
      i = t.value.length; if (r < i) return -1; if (r > i) return 1; for (let i = 0; i < r; i++) { let r = e.value[i],
         a = t.value[i],
         o = Ff(r, a, n); if (o !== 0) return o } return 0 }

function sf(e, t) { switch (e?.type) {
      case `array`:
         return { type: `array`, value: e.value.map(e => $w.cast(e, t.definition)) } } return null }

function cf(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function lf(e) { switch (e?.type) {
      case `boolean`:
         return e;
      case `number`:
      case `string`:
         return { type: `boolean`, value: !!e.value } } return null }

function uf(e) { return lf(e)?.value ?? !1 }

function df(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function ff(e) { switch (e?.type) {
      case `color`:
         return e } return null }

function pf(e, t) { let n = new Date(e.value),
      r = new Date(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function mf(e) { switch (e?.type) {
      case `date`:
         return e;
      case `number`:
      case `string`: { let t = new Date(e.value); return it(t) ? { type: `date`, value: t.toISOString() } : null } } return null }

function hf(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function gf(e) { switch (e?.type) {
      case `enum`:
         return e;
      case `string`:
         return { type: `enum`, value: e.value } } return null }

function _f(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function vf(e) { switch (e?.type) {
      case `file`:
         return e } return null }

function yf(e, t) { let n = JSON.stringify(e.value),
      r = JSON.stringify(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function bf(e) { switch (e?.type) {
      case `link`:
         return e;
      case `string`:
         try { let { protocol: t } = new URL(e.value); return t === `http:` || t === `https:` ? { type: `link`, value: e.value } : null } catch { return null } } return null }

function xf(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }

function Sf(e) { switch (e?.type) {
      case `number`:
      case `string`: { let t = Number(e.value); return Number.isFinite(t) ? { type: `number`, value: t } : null } } return null }

function Cf(e) { return Sf(e)?.value ?? null }

function wf(e, t, n) { let r = Object.keys(e.value).sort(),
      i = Object.keys(t.value).sort(); if (r.length < i.length) return -1; if (r.length > i.length) return 1; for (let a = 0; a < r.length; a++) { let o = r[a],
         s = i[a]; if (o < s) return -1; if (o > s) return 1; let c = Ff(e.value[o] ?? null, t.value[s] ?? null, n); if (c !== 0) return c } return 0 }

function Tf(e, t) { switch (e?.type) {
      case `object`: { let n = {},
            r = Object.entries(t.definitions); for (let [t, i] of r) { let r = e.value[t] ?? null;
            n[t] = $w.cast(r, i) } return { type: `object`, value: n } } } return null }

function Ef(e, t) { let n = JSON.stringify(e.value),
      r = JSON.stringify(t.value); return n < r ? -1 : n > r ? 1 : 0 }

function Df(e) { switch (e?.type) {
      case `responsiveimage`:
         return e } return null }

function Of(e, t) { let n = e.value,
      r = t.value; return n < r ? -1 : n > r ? 1 : 0 }

function kf(e) { switch (e?.type) {
      case `richtext`:
         return e } return null }

function Af(e, t) { let n = e.value,
      r = t.value; return n < r ? -1 : n > r ? 1 : 0 }

function jf(e) { switch (e?.type) {
      case `vectorsetitem`:
         return e } return null }

function Mf(e, t, n) { let r = e.value,
      i = t.value; return n.type === 0 && (r = e.value.toLowerCase(), i = t.value.toLowerCase()), r < i ? -1 : r > i ? 1 : 0 }

function Nf(e) { switch (e?.type) {
      case `string`:
         return e;
      case `number`:
         return { type: `string`, value: String(e.value) } } return null }

function Pf(e) { return Nf(e)?.value ?? null }

function Ff(e, t, n) { if (nt(e) || nt(t)) return V(e === t), 0; switch (e.type) {
      case `array`:
         return V(e.type === t.type), of(e, t, n);
      case `boolean`:
         return V(e.type === t.type), cf(e, t);
      case `color`:
         return V(e.type === t.type), df(e, t);
      case `date`:
         return V(e.type === t.type), pf(e, t);
      case `enum`:
         return V(e.type === t.type), hf(e, t);
      case `file`:
         return V(e.type === t.type), _f(e, t);
      case `link`:
         return V(e.type === t.type), yf(e, t);
      case `number`:
         return V(e.type === t.type), xf(e, t);
      case `object`:
         return V(e.type === t.type), wf(e, t, n);
      case `responsiveimage`:
         return V(e.type === t.type), Ef(e, t);
      case `richtext`:
         return V(e.type === t.type), Of(e, t);
      case `vectorsetitem`:
         return V(e.type === t.type), Af(e, t);
      case `string`:
         return V(e.type === t.type), Mf(e, t, n);
      default:
         H(e) } } async function If(e, t) { return ef(e) ? (await e.preload(t), e.read(t)) : e }

function Lf(e) { return e.includes(iT) }

function Rf(e) { if (!af(e) || !e.id) return; let t = nT.get(e.id); if (!t) return nT.set(e.id, new WeakRef(e)), e.id; if (t.deref() === e) return e.id }

function zf(e) { let t = Rf(e); if (t) return t; let n = rT.get(e); if (n) return n; let r = `${iT}${Math.random().toString(16).slice(2)}`; return rT.set(e, r), r }

function Bf(e, t) { if (tf(e)) { let n = zf(e) + (t?.id ?? Ng),
         r = aT.get(n); if (r) return r; let i = new tT(e, t); return aT.set(n, i), i } if (nf(e)) return e; if (rf(e)) { for (; t;) { let n = e.collectionByLocaleId[t.id]; if (n) return n;
         t = t.fallback } return e.collectionByLocaleId.default } H(e, `Unsupported collection type`) }

function Vf() { return 25 }

function Hf() { return 12500 }

function Uf(e) { return e }

function Wf(e) { return e }

function Gf(e) { return B(e) && Ze(e.getHash) }

function G(e, ...t) { return Wf(`${e}(${t.map(e=>(V(!(e instanceof mT),`Pass CollectionMetadata.id instead`),V(!(e instanceof _T),`Pass FieldMetadata.id instead`),V(!(e instanceof hT),`Pass IndexMetadata.id instead`),V(!(e instanceof uT),`Pass RelationalNode.group.id instead`),V(!(e instanceof sT),`Pass Group.id instead`),Gf(e)?e.getHash():JSON.stringify(e))).join(`, `)})`) }

function Kf(e, t) { return { collectionId: zf(e), pointer: t } }

function qf(e) { return B(e) && R(e.collectionId) }

function Jf(e, t) { return { collectionId: zf(e), pointer: t } }

function Yf(e) { return B(e) && R(e.collectionId) }

function Xf(e, t) { let n = new Map;

   function r(e) { if (B(e))
         if (e.type === `Collection` && Qd(e.data)) { let r = Bf(e.data, t),
               i = zf(r);
            n.set(i, r) } else
            for (let t in e) { let n = e[t];
               r(n) } else if ($e(e))
               for (let t of e) r(t) } return r(e), n }

function Zf(e) { return e }

function Qf(e) { return e }

function $f(e) { return e }

function ep(e) { return Array(e).fill({ type: `All` }) }

function tp(e, ...t) { if (e) return; let n = Error(`Assertion Error` + (t.length > 0 ? `: ` + t.join(` `) : ``)); if (n.stack) try { let e = n.stack.split(`
`);
      e[1]?.includes(`assert`) ? (e.splice(1, 1), n.stack = e.join(`
`)) : e[0]?.includes(`assert`) && (e.splice(0, 1), n.stack = e.join(`
`)) } catch {}
   throw n }

function np(e) { let t = new Set; if (!e) return t;
   tp(e.type === `array`, `ScalarIntersection expects an array, got:`, e.type); for (let n of e.value) n && (tp(n.type === `string`, `ScalarIntersection expects an array of strings, got an array with:`, n.type), t.add(n.value)); return t }

function rp(e) { return e.collection ? `"${e.collection}"."${e.name}"` : `"${e.name}"` }

function ip(e) { return typeof e.value == `string` ? `'${e.value}'` : e.value }

function ap(e) { return `${e.functionName}(${e.arguments.map(e=>up(e)).join(`, `)})` }

function op(e) { let t = `CASE`;
   e.value && (t += ` ${up(e.value)}`); for (let n of e.conditions) t += ` WHEN ${up(n.when)} THEN ${up(n.then)}`; return e.else && (t += ` ELSE ${up(e.else)}`), t += ` END`, t }

function sp(e) { let t = up(e.value); return `${e.operator.toUpperCase()} ${t}` }

function cp(e) { let t = up(e.left),
      n = up(e.right); return `${t} ${e.operator.toUpperCase()} ${n}` }

function lp(e) { return `CAST(${up(e.value)} as ${e.dataType})` }

function up(e) { switch (e.type) {
      case `Identifier`:
         return rp(e);
      case `LiteralValue`:
         return ip(e);
      case `FunctionCall`:
         return ap(e);
      case `Case`:
         return op(e);
      case `UnaryOperation`:
         return sp(e);
      case `BinaryOperation`:
         return cp(e);
      case `TypeCast`:
         return lp(e);
      case `Select`:
         return `${hp(e)}`;
      default:
         H(e) } }

function dp(e) { return nf(e.data) ? `Collection` : e.alias ? `"${e.data.displayName}" AS "${e.alias}"` : `"${e.data.displayName}"` }

function fp(e) { let t = `${pp(e.left)} LEFT JOIN ${pp(e.right)}`; return e.constraint && (t += ` ON ${up(e.constraint)}`), t }

function pp(e) { switch (e.type) {
      case `Collection`:
         return dp(e);
      case `LeftJoin`:
         return fp(e);
      default:
         H(e) } }

function mp(e) { let t = ``; return e.split(/\s+/u).forEach(e => { e !== `` && ([`SELECT`, `FROM`, `WHERE`, `ORDER`, `LIMIT`, `OFFSET`].includes(e) ? t += `
${e}` : [`AND`, `OR`].includes(e) ? t += `
	${e}` : t += ` ${e}`) }), t.trim() }

function hp(e) { let t = ``; return t += `SELECT ${e.select.map(e=>{let t=up(e);return e.alias?`${t} AS "${e.alias}"`:t}).join(`, `)}`, t += ` FROM ${pp(e.from)}`, e.where && (t += ` WHERE ${up(e.where)}`), e.orderBy && (t += ` ORDER BY ${e.orderBy.map(e=>`${up(e)} ${e.direction??`asc`}`).join(`, `)}`), e.limit && (t += ` LIMIT ${up(e.limit)}`), e.offset && (t += ` OFFSET ${up(e.offset)}`), mp(t) }

function gp(e) { return B(e) && e.type === `Collection` }

function _p(e, t) { return gp(t) && Qd(t.data) ? zf(t.data) : t }

function vp(e, t) { let n = t?.id ?? `default`; return JSON.stringify(e, _p) + n }

function yp(e) { let { activeLocale: t } = yr(); return OE.get(e, t).use() }

function bp(e) { return yp({ ...e, select: [] }).length }

function xp(e, t) { let n = Object.entries(e ?? {}).filter(([, e]) => !(tt(e) || B(e))).map(([e, n]) => ({ type: `BinaryOperation`, operator: `==`, left: { type: `TypeCast`, value: { type: `Identifier`, name: e, collection: t }, dataType: `STRING` }, right: { type: `LiteralValue`, value: String(n) } })); return n.length === 0 ? { type: `LiteralValue`, value: !1 } : n.reduce((e, t) => ({ type: `BinaryOperation`, operator: `and`, left: e, right: t })) }

function Sp(e) { let n = t(e); return a(() => { n.current = e }, [e]), vr((...e) => { let t = n.current; return t(...e) }, []) }

function Cp(e, t) { e.forEach(e => clearTimeout(e)), e.clear(), t.forEach(e => e?.(`Callback cancelled by variant change`)), t.clear() }

function wp() { return new Set }

function Tp(e) { let n = qi(wp),
      r = qi(wp); return Cs(() => () => Cp(r, n)), o(() => () => Cp(r, n), []), o(() => { Cp(r, n) }, [e]), t({ activeVariantCallback: e => async (...t) => new Promise((r, i) => { n.add(i), e(...t).then(r) }).catch(() => {}), delay: async (e, t) => { await new Promise(e => { r.add(globalThis.setTimeout(() => e(!0), t)) }), e() } }).current }

function Ep(e, t, n) { return j.useCallback(r => !n || !e ? {} : t ? Object.assign({}, n[e]?.[r], n[t]?.[r]) : n[e]?.[r] || {}, [e, t, n]) }

function Dp(e) { for (let [t, n] of Object.entries(e))
      if (K.matchMedia(n).matches) return t }

function Op(e) { let t = []; for (let { hash: n, mediaQuery: r } of e) r && K.matchMedia(r).matches && t.push(n); if (t.length > 0) return t; let n = e[0]?.hash; if (n) return [n] }

function kp(e, n, r = !0) { let i = l(Zx),
      a = no(),
      s = t(!a && Aa() ? Dp(n) ?? e : e),
      c = t(r && i ? e : s.current),
      u = jo(),
      d = fe(),
      p = f(e => { if (e !== s.current || e !== c.current) { let t = function() { s.current = c.current = e, M(() => { u() }) };
            a ? t() : d(() => { t() }) } }, [d, u, a]); return rx(() => { a && p(e) }, [e, a, p]), rx(() => {!r || i !== !0 || p(s.current) }, []), o(() => { let e = []; for (let [t, r] of Object.entries(n)) { let n = K.matchMedia(r),
            i = e => { e.matches && p(t) };
         Ap(n, i), e.push([n, i]) } return () => e.forEach(([e, t]) => jp(e, t)) }, [n, p]), [s.current, c.current] }

function Ap(e, t) { e.addEventListener ? e.addEventListener(`change`, t) : e.addListener(t) }

function jp(e, t) { e.removeEventListener ? e.removeEventListener(`change`, t) : e.removeListener(t) }

function Mp(e) { setTimeout(e, 1) }

function Np(e) { let t = new Set,
      n = Op(e); if (n)
      for (let e of n)
         for (let n of document.querySelectorAll(`.hidden-` + e)) Pp(n.previousSibling) && t.add(n.previousSibling), n.parentNode?.removeChild(n);
   (_g ? K.requestIdleCallback : Mp)(() => { document.querySelector(kE)?.remove() }); for (let e of document.querySelectorAll(`.ssr-variant:empty`)) Pp(e.previousSibling) && t.add(e.previousSibling), e.parentNode?.removeChild(e); for (let e of t) Fp(e.nextSibling) && (e.parentNode?.removeChild(e.nextSibling), e.parentNode?.removeChild(e)) }

function Pp(e) { return e?.nodeType === Node.COMMENT_NODE && e.textContent === `$` }

function Fp(e) { return e?.nodeType === Node.COMMENT_NODE && e.textContent === `/$` }

function Ip() { let e = jt(),
      { activeLocale: t } = yr(),
      n = u(() => sr(e, { currentRoutePath: e?.path, currentRoutePathLocalized: e?.pathLocalized, currentPathVariables: e?.pathVariables, preserveQueryParams: !1, relative: !1, siteCanonicalURL: void 0, localeId: t?.id }), [e, t?.id]); return j.useCallback(e => { if (!e) return; let t = `${n}-${e}`,
         r = AE.get(t); if (r) return r; let i = S(); return AE.set(t, i), i }, [n]) }

function Lp(e, t) { if (e[t]) return e[t]; if (!(t in e)) return e.default }

function Rp(e, t) { if (to()) return; let n = j.useRef(!0),
      r = j.useRef(t);
   Cs((t, i) => { let a = t && !i; if (!n.current && a) { let t = Lp(r.current, e);
         t && t() } n.current = a }, []), j.useEffect(() => { if (n.current) { let t = Lp(r.current, e);
         t && t() } }, [e]) }

function zp(e, t) { e !== !1 && je.render(() => { let e = document.documentElement.style;
      t ? e.setProperty(`overflow`, `hidden`) : e.removeProperty(`overflow`) }) }

function Bp({ blockDocumentScrolling: e = !0, dismissWithEsc: t = !1 } = {}) { let [n, r] = j.useState(!1), i = j.useCallback(async t => { await yn({ priority: `user-blocking`, continueAfter: `paint` }), M(() => r(t)), zp(e, t) }, [e]); return j.useEffect(() => () => { yn({ priority: `user-blocking`, continueAfter: `paint` }).then(() => { zp(e, !1) }) }, [e]), j.useEffect(() => { if (!t) return; let e = e => { e.key === `Escape` && (e.preventDefault(), e.stopPropagation(), i(!1)) }; return K.addEventListener(`keydown`, e), () => K.removeEventListener(`keydown`, e) }, [t, i]), [n, i] }

function Vp(e) { return B(e) && jE in e && e.page !== void 0 }

function Hp(e, n, r, i = !1) { let [a, s] = v(), l = Math.ceil(e / n), [d, p] = c(globalThis?.history?.state?.paginationInfo?.[r]?.currentPage ?? 1), m = t(d), h = u(() => ({ currentPage: d, totalPages: l, isLoading: a }), [d, l, a]);
   o(() => { dr(r, h) }, [r, h]); let g = kl(); return { paginationInfo: h, loadMore: f(async () => g || m.current >= l || (await yn({ priority: `user-blocking`, continueAfter: `paint` }), m.current >= l) ? void 0 : (e => { e(() => { p(e => { let t = Math.min(e + 1, l); return m.current = t, t }) }) })(i ? s : M), [l, i]) } }

function Up(e, t, n) { let { paginationInfo: r, loadMore: i } = Hp(bp(e), t, n, !0); return { paginatedQuery: u(() => { let n = t * r.currentPage; if (e.limit) { if (e.limit.type !== `LiteralValue` || typeof e.limit.value != `number`) throw Error(`Unexpected type for query limit`);
            n = Math.min(n, e.limit.value) } return { ...e, limit: { type: `LiteralValue`, value: n } } }, [e, t, r]), paginationInfo: r, loadMore: i } }

function Wp(e, t) { return `${e}-${t}` }

function Gp(e, t) { let n = e.indexOf(t) + 1;
   n >= e.length && (n = 0); let r = e[n]; return V(r !== void 0, `nextVariant should be defined`), r }

function Kp(e, t) { if (e) { if (t) { let n = e[t]; if (n) return n } return e.default } }

function qp(e, t, n, r, i) { let { hover: a, pressed: o, loading: s, error: c } = e || {}; if (c && i) return `error`; if (s && r) return `loading`; if (o && n) return `pressed`; if (a && t) return `hover` }

function Jp(e, t) { return t[e] || `framer-v-${e}` }

function Yp(e, t, n) { return e && n.has(e) ? e : t }

function Xp() { let e = t(),
      n = t(),
      r = f(() => { e.current && (document.removeEventListener(`visibilitychange`, e.current), e.current = void 0, n.current = void 0) }, []); return o(() => () => { r() }, [r]), f(t => { if (!document.hidden) { t(), r(); return } if (n.current = t, e.current) return; let i = () => { document.hidden || (n.current?.(), r()) };
      e.current = i, document.addEventListener(`visibilitychange`, i) }, [r]) }

function Zp() { let e = t(),
      n = t(!1),
      r = t(),
      i = l(Px); return o(() => () => { e.current?.(), r.current = void 0, e.current = void 0 }, []), f((t, a) => { if (!a?.current || n.current) { t(); return } if (r.current = t, e.current) return; let o = !1;
      e.current = gs(i, `undefined`, a.current, null, e => { n.current = e.isIntersecting, !o && (o = !0, queueMicrotask(() => { o = !1, n.current && r.current?.() })) }) }, [i]) }

function Qp(e) { let t = Xp(),
      n = Zp(); return f((r, i = !1) => { if (gg) { r(); return } t(i && e ? () => n(r, e) : r) }, [t, n, e]) } async function $p() { return new Promise(e => { let t = e;
      setTimeout(() => { t && (performance.mark(`wait-for-click-fallback`), t()) }, 150), PE = () => { e(), t = void 0 } }) }

function em(e) { e.button === 0 && (performance.mark(`pointerdown-listener`), NE = $p()) }

function tm() { performance.mark(`click-received-listener`), NE = void 0, PE?.(), PE = void 0 }

function nm(e = !1) { o(() => { e && (document.addEventListener(`pointerup`, em, !0), document.__proto__.addEventListener.call(document, `click`, tm, !0)) }, [e]) }

function rm({ variant: e, defaultVariant: n, transitions: r, enabledGestures: i, cycleOrder: a = [], variantProps: o = {}, variantClassNames: s = {}, ref: c }) { let l = jo(),
      d = kl(),
      p = qi(() => new Set(a)),
      { yieldOnTap: m } = Mg();
   nm(m); let h = Qp(c),
      g = t({ isHovered: !1, isHoveredHasUpdated: !1, isPressed: !1, isPressedHasUpdated: !1, isError: !1, hasPressedVariants: !0, baseVariant: Yp(e, n, p), lastVariant: e, gestureVariant: void 0, loadedBaseVariant: {}, defaultVariant: n, enabledGestures: i, cycleOrder: a, transitions: r }),
      _ = f(e => { let { isHovered: t, isPressed: n, isError: r, enabledGestures: i, defaultVariant: a } = g.current, o = Yp(e, a, p), s = qp(i?.[o], t, n, !1, r); return [o, s ? Wp(o, s) : void 0] }, []),
      v = f(async (e, t, n, r, i = !1, a = !1) => { let [o, s] = _(r); if (o === e && s === t) return;
         a && (g.current.isError = !1), g.current.baseVariant = o || n, g.current.gestureVariant = s; let c = m && g.current.isPressedHasUpdated;
         c && NE && (performance.mark(`wait-for-tap-start`), await NE, performance.measure(`wait-for-tap`, `wait-for-tap-start`)), c && (performance.mark(`yield-on-tap-start`), await yn({ priority: `user-blocking`, continueAfter: `paint` }), performance.measure(`yield-on-tap`, `yield-on-tap-start`)); let { isHovered: u, isPressed: d, isHoveredHasUpdated: f, isPressedHasUpdated: p } = g.current; if (u || f || d || p) { M(l); return } h(() => M(l), i) }, [_, l, h, m]),
      y = f(({ isHovered: e, isPressed: t, isError: n }) => { let r = t !== g.current.isPressed,
            i = e !== g.current.isHovered;
         e !== void 0 && (g.current.isHovered = e), t !== void 0 && (g.current.isPressed = t), n !== void 0 && (g.current.isError = n); let { baseVariant: a, gestureVariant: o, defaultVariant: s } = g.current;
         g.current.isPressedHasUpdated = r, g.current.isHoveredHasUpdated = i, v(a, o, s, a, !1) }, [v]),
      b = f((e, t = !1) => { let { defaultVariant: n, cycleOrder: r, baseVariant: i, gestureVariant: a } = g.current;
         v(i, a, n, e === ME ? Gp(r || [], i || n) : e, t, !0) }, [v]),
      x = f(() => { let { baseVariant: e } = g.current;
         g.current.loadedBaseVariant[e] = !0, h(() => M(l), !0) }, [l, h]); if (e !== g.current.lastVariant) { let [t, n] = _(e);
      g.current.lastVariant = t, (t !== g.current.baseVariant || n !== g.current.gestureVariant) && (g.current.baseVariant = t, g.current.gestureVariant = n) } let { baseVariant: S, gestureVariant: C, defaultVariant: w, enabledGestures: T, isHovered: E, isPressed: D, isError: O, loadedBaseVariant: k } = g.current, ee = Ep(g.current.baseVariant, g.current.gestureVariant, o); return u(() => { let e = [];
      S !== w && e.push(S); let t = T?.[S]?.loading,
         n = !O && !d && !!t && !k[S],
         r = n ? Wp(S, `loading`) : C;
      r && e.push(r); let i = T?.[S],
         a = { onMouseEnter: () => y({ isHovered: !0 }), onMouseLeave: () => y({ isHovered: !1 }) }; return i?.pressed && Object.assign(a, { onTapStart: () => y({ isPressed: !0 }), onTapCancel: () => y({ isPressed: !1 }), onTap: () => y({ isPressed: !1 }) }), { variants: e, baseVariant: S, gestureVariant: r, isLoading: n, transition: Kp(g.current.transitions, S), setVariant: b, setGestureState: y, clearLoadingGesture: x, addVariantProps: ee, gestureHandlers: a, classNames: fc(Jp(S, s), qp(i, E, D, n, O)) } }, [S, C, E, D, k, ee, b, w, T, y, x, s]) }

function im(e, { scopeId: t, nodeId: n, override: r, inComponentSlot: i }) { if (!sl()) return r(e); let a = am(e, r),
      o = !1;

   function s(r, s) { let { disableCustomCode: c } = Mg(), l = ul(); if (c) return E(e, { ...r, ref: s }); if (vl(t, l?.scopeId, l?.level, i ?? !1)) return a.status === `success` ? E(N_.Provider, { value: n, children: E(cl, { getErrorMessage: hl.bind(null, t, n), fallback: E(e, { ...r, ref: s }), children: E(a.Component, { ...r, ref: s }) }) }) : (o ||= (ol(a.error), ol(hl(t, n)), al(a.error), !0), E(e, { ...r, ref: s })); if (a.status === `success`) return E(N_.Provider, { value: n, children: E(a.Component, { ...r, ref: s }) }); throw a.error } return j.forwardRef(s) }

function am(e, t) { try { return { status: `success`, Component: t(e) } } catch (e) { return { status: `error`, error: e } } }

function om(e, t, n) { let r = [],
      i = Lc(e, t, e => r.unshift(e, e)); if (n) { let e = i[i.length - 1]; if (!z(e)) return LE;
      i.push(e + 1), r.push(-1) } let a = i[0]; return z(a) ? a <= 1 ? { inputRange: i, outputRange: r } : { inputRange: [0, Math.max(a - 1, 0), ...i], outputRange: [-1, -1, ...r] } : LE }

function sm(e) { return e.weight !== void 0 && e.style !== void 0 }

function cm(e, t) { let n = t === `normal` ? `Regular` : `Italic`; return e === 400 ? n : t === `normal` ? `${WE[e]}` : `${WE[e]} ${n}` }

function lm() { return h === void 0 ? {} : KE || (KE = um(), KE) }

function um() { let e = h.location,
      t = h?.bootstrap?.services; if (t) return t; let n; try { if (n = h.top.location.origin, t = h.top?.bootstrap?.services, t) return t } catch {} if (n && n !== e.origin) throw Error(`Unexpectedly embedded by ${n} (expected ${e.origin})`); if (e.origin.endsWith(`framer.com`) || e.origin.endsWith(`framer.dev`)) throw Error(`ServiceMap data was not provided in document`); try { let n = new URLSearchParams(e.search).get(`services`) || new URLSearchParams(e.hash.substring(1)).get(`services`);
      n && (t = JSON.parse(n)) } catch {} if (t && typeof t == `object` && t.api) return t; throw Error(`ServiceMap requested but not available`) }

function dm(e) { return e.key + e.extension }

function fm(e) { return `${lm().userContent}/assets/${e}` }

function pm(e) { return fm(dm(e)) }

function mm(e, t) { return t ? `${e} ${qE}` : e }

function hm(e, t) { switch (t) {
      case `custom`:
         throw Error(`Custom fonts are not supported`);
      default:
         return mm(e.name, e.isVariable) } }

function gm(e) { return !!(e && Array.isArray(e)) }

function _m(e) { if (!e || !Array.isArray(e)) return; let t = []; for (let n of e) ym(n) && t.push({ tag: n.tag, name: n.name, minValue: n.minValue, maxValue: n.maxValue, defaultValue: n.defaultValue }); return t }

function vm(e) { return !(typeof e != `object` || !e || !(`tag` in e) || typeof e.tag != `string` || `coverage` in e && e.coverage !== void 0 && !Array.isArray(e.coverage)) }

function ym(e) { return !(typeof e != `object` || !e || !(`tag` in e) || typeof e.tag != `string` || `name` in e && typeof e.name != `string` || !(`minValue` in e) || typeof e.minValue != `number` || !(`maxValue` in e) || typeof e.maxValue != `number` || !(`defaultValue` in e) || typeof e.defaultValue != `number`) }

function bm(e) { return XE[xm(e)] }

function xm(e) { return e.toLowerCase().replace(/\s+/gu, `-`) }

function Sm(e) { return e = e.toLowerCase(), e.includes(`italic`) || e.includes(`oblique`) || e.includes(`slanted`) ? `italic` : `normal` }

function Cm(e, t) { return { ...wm(e, t), ...Tm(e, t) } }

function wm(e, t) { if (t.length === 0) return { variantBold: void 0, variantBoldItalic: void 0, variantItalic: void 0 }; let { weight: n, style: r } = e, i = new Map, a = new Map; for (let r of t) r.isVariable === e.isVariable && (i.set(`${r.weight}-${r.style}`, r), !(r.weight <= n) && (a.has(r.style) || a.set(r.style, r))); let o = a.get(r),
      s = a.get(`italic`),
      c = e.weight;
   c <= 300 ? (o = i.get(`400-${r}`) ?? o, s = i.get(`400-italic`) ?? s) : c <= 500 ? (o = i.get(`700-${r}`) ?? o, s = i.get(`700-italic`) ?? s) : (o = i.get(`900-${r}`) ?? o, s = i.get(`900-italic`) ?? s); let l = i.get(`${n}-italic`); return { variantBold: o, variantItalic: l, variantBoldItalic: s } }

function Tm(e, t) { if (t.length === 0) return { variantVariable: void 0, variantVariableItalic: void 0 }; let n, r, i, a; for (let o of t) { if (!o.isVariable) continue; let t = o.weight === e.weight,
         s = o.weight === 400;
      o.style === `normal` ? t ? n = o : s ? i = o : i ||= o : o.style === `italic` && (t ? r = o : s ? a = o : a ||= o) } return { variantVariable: n ?? i, variantVariableItalic: r ?? a } }

function Em(e) { return !!e.variationAxes }

function Dm(e) { return Om(e) || km(e) }

function Om(e) { return e.startsWith($E) }

function km(e) { return e.startsWith(QE) }

function Am(e, t) { for (let n = 0; n < e.length; n++) { let r = e[n]; if (r) { if (r.owner !== t.owner && r.file === t.file) return { existingFont: r, index: n, projectDuplicate: !0 }; if (r && r.selector === t.selector) return { existingFont: r, index: n, projectDuplicate: !1 } } } }

function jm(e) { let { font: t } = e, n = t.fontFamily, r = Array.isArray(t.variationAxes); if (r && n.toLowerCase().includes(`variable`)) return n; let i = r ? qE : t.fontSubFamily.trim(); return i === `` ? n : `${n} ${i}` }

function Mm({ fontFamily: e, fontSubFamily: t, variationAxes: n, faceDescriptors: r }) { let i = t.trim() || `Regular`,
      a = i.toLocaleLowerCase().includes(`variable`),
      o = _m(n) && !a ? `Variable ${i}` : i,
      s = `normal`,
      c = 400; return r && (c = r.weight, s = r.italic || r.oblique ? `italic` : `normal`), { family: e, variant: o, weight: c, style: s } }

function Nm(e) { if (!(!e.weight || !e.style)) return { weight: e.weight, style: e.style, isVariable: Em(e), selector: e.selector } }

function Pm(e) { let t = e.fonts.map(e => Nm(e)).filter(e => e !== void 0); for (let n of e.fonts) { let e = Nm(n); if (!e) continue; let r = Cm(e, t);
      n.selectorVariable = r.variantVariable?.selector, n.selectorVariableItalic = r.variantVariableItalic?.selector, n.selectorBold = r.variantBold?.selector, n.selectorBoldItalic = r.variantBoldItalic?.selector, n.selectorItalic = r.variantItalic?.selector } }

function Fm(e) { return e.ownerTypes.includes(`team`) ? `team` : `project` } async function Im(e) { switch (e) {
      case `google`:
         return (await import(`js/google-ogwbhvgi.dy5ljtkx.mjs`)).default;
      case `fontshare`:
         return (await import(`js/fontshare-ltyjmi6q.b78lsncg.mjs`)).default;
      default:
         throw Error(`Unknown font source: ${e}`) } } async function Lm(e) { switch (e) {
      case `google`:
         return (await import(`js/google-bhsmrpxk.cm2vvfh1.mjs`)).default;
      case `fontshare`:
         return (await import(`js/fontshare-xmkn2fod.cynzhmmm.mjs`)).default;
      case `framer`:
         return (await import(`js/framer-font-d6rmcrv4.8vjzkcf9.mjs`)).default;
      default:
         throw Error(`Unknown font source: ${e}`) } }

function Rm(e) { return e.split(`,`).map(e => e.trim().toLowerCase()).filter(zm) }

function zm(e) { return tD.includes(e) }

function Bm(e) { let t = { serif: `serif`, sans: `sans-serif`, slab: `slab`, display: `display`, handwritten: `handwriting`, script: `handwriting` },
      n = Rm(e)[0]; return n && t[n] }

function Vm(e) { let t = { serif: `serif`, "sans-serif": `sans-serif`, display: `display`, handwriting: `handwriting`, monospace: `monospace` }; if (e) return t[e] }

function Hm(e, t) { return e.reduce((e, n) => (e[t(n)] = n, e), {}) } async function Um(e, t, n = 0) { let { family: r, url: i, stretch: a, unicodeRange: o } = e, s = e.weight, c = e.style || `normal`, l = `${r}-${c}-${s}-${i}`; if (!_D.has(l) || n > 0) { let u = new FontFace(r, `url(${i})`, { weight: R(s) ? s : s?.toString(), style: c, stretch: a, unicodeRange: o }),
         d = u.load().then(() => (t.fonts.add(u), Wm(r, c, s))).catch(l => { if (l.name !== `NetworkError`) throw l; if (n < hD) return Um(e, t, n + 1); throw new gD(`Font loading failed after ${n} retries due to network error: ${JSON.stringify({family:r,style:c,weight:s,url:i,stretch:a,unicodeRange:o})}`) });
      _D.set(l, d) } await _D.get(l) } async function Wm(e, t, n) { let r = `${e}-${t}-${n}`; if (!vD.has(r)) { let i = new pD.default(e, { style: t, weight: n }).load(null, mD);
      vD.set(r, i) } try { await vD.get(r) } catch { throw new gD(`Failed to check if font is ready (${mD}ms timeout exceeded): ${JSON.stringify({family:e,style:t,weight:n})}`) } }

function Gm(e) { try { if (e === `framer`) return Km(bD) ? bD : void 0; { let t = (async () => { switch (e) {
               case `google`:
                  return (await import(`js/google-5nzomg37.d5nizlxf.mjs`)).default;
               case `fontshare`:
                  return (await import(`js/fontshare-x63nxwgb.c0_zaeqz.mjs`)).default;
               default:
                  H(e) } })(); return Km(t) ? t : void 0 } } catch (e) { console.error(e); return } }

function Km(e) { return B(e) && Object.values(e).every(Jm) }

function qm(e) { return B(e) && R(e.tag) }

function Jm(e) { return Array.isArray(e) && e.every(qm) }

function Ym(e, t, n, r = CD) { let [i, a] = j.useState(e), [o, s] = j.useState(e); return t && e !== o && (s(e), a(e)), [i, a, j.useCallback(e => { Er(e) || (t && a(r(e)), n && j.startTransition(() => { n(e) })) }, [r, n, t])] }

function Xm(e, t) { return !e || t !== `date` ? e : e.includes(`T`) ? e.split(`T`)[0] : e }

function Zm() { return E(`svg`, { xmlns: `http://www.w3.org/2000/svg`, width: `8`, height: `8`, viewBox: `0 0 8 8`, "aria-hidden": `true`, children: E(`path`, { d: `m1.5 6.5 5-5M6.5 6.5l-5-5`, fill: `none`, stroke: `currentColor`, strokeWidth: `1.5`, strokeLinecap: `round` }) }) }

function Qm(e, t) { o(() => {
      function n(n) { n.key === `Escape` && e && (n.preventDefault(), n.stopPropagation(), t()) } return h.addEventListener(`keyup`, n), () => h.removeEventListener(`keyup`, n) }, [e, t]) }

function $m(e, t, n, r) { let i = h.innerHeight - r,
      a = Math.min(h.innerWidth - n, t),
      o = i / e; return Math.min(a, o) }

function eh(e, { width: t, height: n }) { if (!e.src || !e.srcSet) return; let r = new h.Image; return r.src = e.src, r.srcset = e.srcSet, r.sizes = e.sizes || ``, r.width = t, r.height = n, r.decode() }

function th() { return document.getElementById(RC) ?? document.getElementById(LC) ?? document.body }

function nh(e, t) { return z(e) ? e : t ?? 0 }

function rh(e) { return nh(e?.paddingTop, e?.padding) + nh(e?.paddingBottom, e?.padding) }

function ih(e) { return nh(e?.paddingLeft, e?.padding) + nh(e?.paddingRight, e?.padding) }

function ah(e, t) { if (!e || !t || !t.src) return t; let n = new URL(t.src); return n.searchParams.delete(`scale-down-to`), n.searchParams.delete(`lossless`), { ...t, sizes: `min(100vw, ${e.maxWidth-ih(e)}px)`, srcSet: co(t.nodeFixedSize, t, t.src).srcSet } }

function oh(e) { if (!e) return !1; for (let t in e) { if (!(t in FD)) continue; let n = FD[t],
         r = e[t]; if (!(!z(n) || !z(r)) && n !== r) return !0 } return !1 }

function sh(e) { let t = ue.get(e.current); if (!t) return !1; if (oh(t.projection?.latestValues)) return !0; let n = t.projection?.path; if (!n || n.length === 0) return !1; for (let e of n)
      if (oh(e.latestValues)) return !0; return !1 }

function ch(e) { return A(function({ lightbox: n, lightboxClassName: r, onClick: i, ...a }, d) { let p = l(Te),
         m = l(FE),
         h = !!m,
         g = t(null),
         _ = d ?? g,
         v = t(),
         b = u(() => ah(n, a.background), [n, a.background]),
         [x, S] = c(!1),
         [C, T] = c(),
         D = f(() => { if (n) { if (x) { M(() => { S(!0) }); return } je.read(() => { if (!_.current) return; let e = getComputedStyle(_.current),
                     t = _.current.getAttribute(`data-border`) === `true` ? getComputedStyle(_.current, `::after`) : void 0,
                     r = _.current.offsetWidth ?? 1,
                     i = _.current.offsetHeight ?? 1,
                     a = sh(_) || h ? { duration: 0 } : n.transition;
                  M(() => { T({ borderRadius: e.borderRadius, aspectRatio: r / (i || 1), borderTop: t?.borderTopWidth, borderRight: t?.borderRightWidth, borderBottom: t?.borderBottomWidth, borderLeft: t?.borderLeftWidth, borderStyle: t?.borderStyle, borderColor: t?.borderColor, transition: a, imageRendering: e.imageRendering, filter: e.filter }), S(!0), m?.stop() }) }) } }, [n, x, _, m?.stop, h]),
         O = C?.aspectRatio ?? 1,
         k = Sp(() => { if (!n || !b || !b.src) return; let e = v.current?.[b.src]; if (e) return e; let t = $m(O, n.maxWidth, ih(n), rh(n)),
               r = eh(b, { width: t, height: t * O }); return v.current = {
               [b.src]: r }, r }),
         A = f(async e => { i?.(e), !(x || !n || !b) && (await k(), D()) }, [i, D, x, b, n, k]),
         j = f(e => { e?.stopPropagation(), M(() => { S(!1) }) }, []);
      Qm(x, j), o(() => { if (!n) return; let e;

         function t() { e = setTimeout(() => { k() }, 50) }

         function r() { clearTimeout(e) } let i = _.current; return i?.addEventListener(`mouseenter`, t), i?.addEventListener(`mouseleave`, r), i?.addEventListener(`pointerdown`, k), () => { r(), i?.removeEventListener(`mouseenter`, t), i?.removeEventListener(`mouseleave`, r), i?.removeEventListener(`pointerdown`, k) } }, [k, _, n]); let ne = te(),
         re = C?.transition ?? a.transition ?? p.transition,
         ie = C?.borderRadius,
         ae = C?.imageRendering,
         oe = C?.filter,
         se = C?.borderTop,
         ce = C?.borderRight,
         le = C?.borderBottom,
         ue = C?.borderLeft,
         de = C?.borderStyle,
         fe = C?.borderColor,
         pe = !!(se || ce || le || ue || de || fe),
         me = pe ? { "--border-top-width": se, "--border-right-width": ce, "--border-bottom-width": le, "--border-left-width": ue, "--border-style": de, "--border-color": fe } : void 0,
         he = {
            [yC]: a.id },
         ge = nh(n?.paddingTop, n?.padding),
         N = nh(n?.paddingBottom, n?.padding),
         _e = nh(n?.paddingLeft, n?.padding),
         ve = nh(n?.paddingRight, n?.padding),
         P = C?.borderRadius ? { ...a.style, borderRadius: C.borderRadius } : a.style,
         be = x ? a.layoutDependency ? `${a.layoutDependency}-open` : `open` : a.layoutDependency,
         xe = h && x ? void 0 : a.layoutId ?? (n ? ne : void 0); return ee(y, { children: [E(e, { ...a, style: P, onClick: A, layoutId: xe, ref: _, layoutDependency: be, transition: re }), E(Le, { onExitComplete: () => { M(() => { T(void 0), m?.start() }) }, children: x && n && b && E(s, { children: w(ee(y, { children: [E(ye.div, { ...he, className: r, onClick: j, style: { position: `fixed`, inset: 0, zIndex: n.zIndex, backgroundColor: n.backdrop ?? `transparent` }, transition: re, initial: ID, animate: LD, exit: ID }), E(ye.div, { ...he, className: r, style: { alignItems: `center`, display: `flex`, inset: `${ge}px ${ve}px ${N}px ${_e}px`, justifyContent: `center`, pointerEvents: `none`, position: `fixed`, zIndex: n.zIndex }, children: E(`div`, { style: { alignItems: `center`, aspectRatio: O, display: `flex`, justifyContent: `center`, maxHeight: `100%`, position: `relative`, width: `100%`, maxWidth: n.maxWidth }, children: E(ye.div, { layoutId: xe, transition: re, onClick: D, className: `framer-lightbox-container`, "data-border": pe, style: { aspectRatio: O, borderRadius: ie, bottom: 0, position: `absolute`, top: 0, userSelect: `none`, imageRendering: ae, filter: oe, ...me }, children: E(vo, { image: b, alt: b.alt, draggable: a.draggable }) }) }) })] }), th()) }, `backdrop`) })] }) }) }

function lh(e) { return j.isValidElement(e) ? e.props[`data-framer-order-id`] : void 0 }

function uh(e, t) { let n = new Map,
      r = [],
      i = new Set(t); for (let t of e) { let e = lh(t);
      e && i.has(e) ? n.set(e, t) : r.push(t) } let a = []; for (let e of t) { let t = n.get(e);
      t && a.push(t) } return [...a, ...r] }

function dh(e, t) { let n = j.Children.toArray(e); return t ? n.flatMap(e => j.isValidElement(e) && e.type === j.Fragment ? j.Children.toArray(e.props.children) : e) : n }

function fh(e, t) { let n = Array.from({ length: e }, () => []); return t.forEach((t, r) => { n[hh(e, r)]?.push(t) }), n }

function ph(e) { return { display: `flex`, flexDirection: `column`, rowGap: e, width: `100%` } }

function mh(e) { return `masonry-stack-${e}` }

function hh(e, t) { return e <= 0 ? 0 : t % e }

function gh(e, t) { return HD && !t ? Document.parseHTMLUnsafe(e) : (VD ??= new DOMParser, VD.parseFromString(e, t ?? `text/html`)) }

function _h(e) { return e.replaceAll(`&`, `&amp;`).replaceAll(`<`, `&lt;`).replaceAll(`>`, `&gt;`).replaceAll(`"`, `&quot;`).replaceAll(`'`, `&#39;`) }

function vh(e, t, n, r) { return e.replace(UD, (e, i, a, o, s, c, l) => { if (a.toLowerCase() !== `a`) return e; let u = s || c,
         d = Pl(u.replace(/&amp;/gu, `&`)); if (!d || !d.target) return e; let f = t(d.target); if (!Vp(f) || !Vp(n)) return e; let p = f.path,
         m = n.path; if (!p || !m) return e; let h = ` data-framer-page-link-target="${d.target}"`,
         g = Ft(f, d.element ?? void 0);
      g && (h += ` data-framer-page-link-element="${d.element}"`); let _ = Il(u); if (!_ || R(_)) return e;
      wu(n, _, r) && (h += ` data-framer-page-link-current`); let v = p,
         y = Object.assign({}, r, d.collectionItem?.pathVariables); if (Object.keys(y).length > 0 && (v = v.replace(BC, (e, t) => `` + y[t])), d.collectionItem?.pathVariables) { let e = new URLSearchParams(d.collectionItem.pathVariables);
         h += ` data-framer-page-link-path-variables="${e}"` } return v = wn(m, v), i + o + `"${_h(v+(g?`#${g}`:``))}"` + h + l }) }

function yh(e, t) { return e.length === t.length && e.every((e, n) => e === t[n]) }

function bh(e) { switch (e) {
      case `top`:
         return `flex-start`;
      case `center`:
         return `center`;
      case `bottom`:
         return `flex-end` } }

function xh(e, n, r) { let i = t([]);
   yh(i.current, e) || (i.current = e, SD.loadFonts(e).then(({ newlyLoadedFontCount: e }) => {!n || !r.current || J.current() !== J.canvas || e > 0 && Lo(r.current) })) }

function Sh() { return { current: null } } async function Ch(e, t) { let n = e.current; if (n) return n; let r, i = new Promise((e, n) => { r = e, t.signal.addEventListener(`abort`, () => n()) }); return Object.defineProperty(e, `current`, { get() { return n }, set(e) { if (n = e, e === null) { t.abort(); return } r(e) }, configurable: !0 }), i }

function wh(e) { return e in qD }

function Th(e, t) { let n = {}; for (let r in e) { if (!wh(r)) continue; let i = e[r],
         a = qD[r];
      tt(i) || tt(a) || t && r !== `opacity` || (n[r] = [i, a]) } return n }

function Eh(e, t = `character`, n, r, i) { if (r) { let t = Sh(); return n.add(t), E(`span`, { ref: t, style: i, children: e }) } switch (t) {
      case `character`:
      case `line`: { let t = e.split(` `),
            r = t.length - 1; return t.map((e, t) => { let a = t === r; return ee(s, { children: [E(`span`, { style: { whiteSpace: e.length <= 12 ? `nowrap` : `unset` }, children: e.match(JD)?.map((e, t) => { let r = Sh(); return n.add(r), E(`span`, { ref: r, style: i, children: e }, e + t) }) }), a ? null : ` `] }, e + t + a) }) }
      case `word`: { let t = e.split(` `),
            r = t.length - 1; return t.map((e, t) => { let a = t === r,
               o = Sh(); return n.add(o), ee(s, { children: [E(`span`, { ref: o, style: i, children: e }), a ? null : ` `] }, e + t + a) }) }
      case `element`:
      default:
         return e } }

function Dh(e) { let t = e.type; switch (t) {
      case `appear`:
         return e.tokenization ?? `character`;
      default:
         H(t) } }

function Oh(e) { let t = []; return z(e.x) && t.push(`translateX(${e.x}px)`), z(e.y) && t.push(`translateY(${e.y}px)`), z(e.scale) && t.push(`scale(${e.scale})`), z(e.rotate) && t.push(`rotate(${e.rotate}deg)`), z(e.rotateX) && t.push(`rotateX(${e.rotateX}deg)`), z(e.rotateY) && t.push(`rotateY(${e.rotateY}deg)`), z(e.skewX) && t.push(`skewX(${e.skewX}deg)`), z(e.skewY) && t.push(`skewY(${e.skewY}deg)`), t.join(` `) }

function kh(e, t, n, r) { if (!n || !n.effect) return; let i = n.type; switch (i) {
      case `appear`:
         switch (n.tokenization) {
            case `element`:
               return !e || !t ? void 0 : { opacity: n.effect.opacity, filter: r ? void 0 : n.effect.filter, transform: r ? void 0 : Oh(n.effect) };
            case `line`:
            case `word`:
            case `character`:
            default:
               return !e || !t ? { display: `inline-block` } : { display: `inline-block`, opacity: n.effect.opacity, filter: r ? void 0 : n.effect.filter, transform: r ? void 0 : Oh(n.effect) } }
      default:
         H(i) } }

function Ah(e, n, r) { let i = qi(() => new Set),
      a = to(),
      s = r || !a,
      c = ae(),
      l = t({ hasMounted: !1, hasAnimatedOnce: !1, isAnimating: !1, effect: e });
   l.current.effect = e; let d = e?.trigger ?? `onMount`,
      f = e?.target,
      p = e?.threshold;
   o(() => { if (!s || r) return;
      l.current.hasMounted = !0;

      function e() { let { effect: e } = l.current; if (!s || !e || e?.repeat !== !0 && l.current.hasAnimatedOnce || e?.type === `appear` && l.current.isAnimating) return;
         Object.assign(l.current, { hasAnimatedOnce: !0, isAnimating: !0 }); let t = e.type; switch (t) {
            case `appear`: { let { transition: t, startDelay: n, repeat: r, tokenization: a } = e, o = { current: void 0 }; return Mh(a, e.effect, i, t, n, r, c, () => { Object.assign(l.current, { isAnimating: !1 }) }, o), () => o.current?.() }
            default:
               H(t) } } switch (d) {
         case `onMount`:
            e(); return;
         case `onInView`: { let t = n?.current; return t ? Ae(t, e, { amount: p ?? 0 }) : void 0 }
         case `onScrollTarget`: { let t = f?.ref?.current; return t ? Ae(t, e, { amount: p ?? 0, root: document, margin: f?.offset ? `${f.offset}px 0px 0px 0px` : void 0 }) : void 0 }
         default:
            H(d) } }, [s, i, r, n, f, p, d]); let m = !!e,
      h = e ? Dh(e) : void 0; return u(() => ({ getTokenizer: () => { if (i.clear(), !m) return; let { hasMounted: e, hasAnimatedOnce: t, effect: n } = l.current, a = kh(s, r || jh(e, t, n), l.current.effect, c); return { text: e => Eh(e, h, i, c, a), props: e => { if (n?.tokenization !== `element`) return; let t = Sh(); return i.add(t), { ref: t, style: { ...e, ...a } } } } }, play: () => { let { effect: e } = l.current; if (!e) return; let t = e.type; switch (t) {
            case `appear`: { let { transition: t, startDelay: n } = e;
               Mh(h, e.effect, i, t, n, !1, c); break }
            default:
               H(t) } } }), [s, m, i, r, h]) }

function jh(e, t, n) { return !(e && n?.trigger === `onMount` || t && !n?.repeat && (n?.trigger === `onInView` || n?.trigger === `onScrollTarget`)) } async function Mh(e = `character`, t, n, r, i = 0, a = !1, o, s, c) { let l = Th(t, o),
      u = new AbortController; switch (c && (c.current = () => u.abort()), e) {
      case `character`:
      case `element`:
      case `word`: { let e = await Nh(n, u); if (e === null || (ke(e, l, { ...r, restDelta: .001, delay: N(r?.delay ?? 0, { startDelay: i }) }).then(() => s?.()), !a || !c)) return;
         c.current = () => { ke(e, o ? { opacity: t.opacity } : t, { ...r, restDelta: .001, delay: N(r?.delay ?? 0, { startDelay: i }) }) }; return }
      case `line`: { try { for (let e of n) await Ch(e, u) } catch { return } let e; if (je.read(() => { e = Ph(n), e.length !== 0 && je.update(() => { let t = e.map((e, t) => ke(e, l, { ...r, restDelta: .001, delay: i + t * (r?.delay ?? 0) }));
                  Promise.all(t).then(() => s?.()) }) }), !a || !c) return;
         c.current = () => { if (e.length === 0) return; let n = o ? { opacity: t.opacity } : t;
            e.forEach((e, t) => { ke(e, n, { ...r, restDelta: .001, delay: i + t * (r?.delay ?? 0) }) }) }; return }
      default:
         H(e) } } async function Nh(e, t) { if (e.size === 0) return null; let n = []; for (let r of e) try { let e = await Ch(r, t);
      e && n.push(e) } catch { return null }
   return n }

function Ph(e) { let t = [],
      n = [],
      r = null; for (let i of e) { if (!i.current) continue; let e = i.current.offsetTop,
         a = i.current.offsetHeight;!a || r === null || e === r ? n.push(i.current) : (t.push(n), n = [i.current]), a && (r = e) } return t.push(n), t }

function Fh(e) { let t = {}; for (let n in e)(Ye(n) || Ub(n)) && (t[n] = e[n]); return t }

function Ih(e) { return e.type === s }

function Lh(e) { return e.type === `br` }

function Rh(e, t, n, r, i = {}, a, o = Ih(e) ? -1 : 0) { let s = d.toArray(e.props.children);
   tt(n) || (s = s.slice(0, 1)); let c = !0;
   s = s.map(e => { if ((!O(e) || !Lh(e)) && (c = !1), O(e)) return Rh(e, t, n, r, i, a, o + 1); let s = tt(n) ? e : n; return R(s) && a ? a.text(s) : s }); let { "data-preset-tag": l, ...u } = e.props; if (R(e.type) || Xe(e.type)) { let n = Ne(e.type) || e.type,
         d = l || n,
         f = R(d) ? t?.[d] : void 0;
      u.className = fc(`framer-text`, u.className, f), a && o === 0 && !c && Object.assign(u, a.props(u.style)); let p = n === `h1` || n === `h2` || n === `h3` || n === `h4` || n === `h5` || n === `h6`,
         m = t?.anchor; if (p && m) { let e = zh(s, i);
         u.id = e; let t = fc(`framer-text`, m),
            n = E(`a`, { href: `#${e}`, className: t, children: s });
         u.style = { ...u.style ?? {}, scrollMarginTop: r }, s = [n] } } return T(e, u, ...s) }

function zh(e, t) { let n = mr(e.map(Bh).join(``)),
      r = t[n] ?? 0; return r > 0 && (n += `-${r}`), t[n] = r + 1, n }

function Bh(e) { return R(e) || z(e) ? e.toString() : O(e) ? Bh(e.props.children) : Array.isArray(e) ? e.map(Bh).join(``) : `` }

function Vh(e) { try { let t = gh(e).getElementsByTagName(`svg`)[0]; if (!t) throw Error(`no svg element found`); return t } catch { return } }

function Hh(e, t) { Wh(e, Uh(t)) }

function Uh(e) { return e.replace(/[^\w\-:.]|^[^a-z]+/gi, ``) }

function Wh(e, t) { Gh(e, t), Array.from(e.children).forEach(e => { Wh(e, t) }) }

function Gh(e, t) { e.getAttributeNames().forEach(n => { let r = e.getAttribute(n); if (!r) return; if (n === `id` && e.setAttribute(n, `${t}_${r}`), n === `href` || n === `xlink:href`) { let [i, a] = r.split(`#`); if (i) return;
         e.setAttribute(n, `#${t}_${a}`); return } let i = `url(#`; if (r.includes(i)) { let a = r.replace(i, `${i}${t}_`);
         e.setAttribute(n, a) } }) }

function Kh(e) { if (!e) return; let t = /(-?[\d.]+)([a-z%]*)/u.exec(e); if (!(t?.[1] === void 0 || t?.[2] === void 0) && !t[2]?.startsWith(`%`)) return Math.round(parseFloat(t[1]) * (sO[t[2]] || 1)) }

function qh(e) { let t = Kh(e.getAttribute(`width`)),
      n = Kh(e.getAttribute(`height`)); if (!(typeof t != `number` || typeof n != `number`) && !(t <= 0 || n <= 0)) return { width: t, height: n } }

function Jh(e) { return e > cO ? `lazy` : void 0 }

function Yh(e, t, n) { let r = Qh(t);!n?.supportsExplicitInterCodegen && !r.some(e => e.explicitInter === !1) && r.push({ explicitInter: !1, fonts: [] }), Object.assign(e, { fonts: r }) }

function Xh(e) { return e ? e.fonts ?? zr() : zr() }

function Zh(e) { return e.length === 0 ? [{ explicitInter: !1, fonts: [] }] : Qh(e) }

function Qh(e) { let t = { explicitInter: !1, fonts: [] },
      n = []; for (let r of e) $h(r) ? n.push({ explicitInter: r.explicitInter, fonts: r.fonts.map(eg) }) : t.fonts.push(eg(r)); return t.fonts.length > 0 && n.push(t), n }

function $h(e) { return lO in e }

function eg(e) { let t = tg(e) || ng(e) ? e : rg(e); return ng(t) ? t : ig(t) }

function tg(e) { return `source` in e }

function ng(e) { return `cssFamilyName` in e }

function rg(e) { let t; return t = e.url.startsWith(`https://fonts.gstatic.com/s/`) ? `google` : e.url.startsWith(`https://framerusercontent.com/third-party-assets/fontshare/`) ? `fontshare` : `custom`, { ...e, source: t } }

function ig(e) { let { family: t, ...n } = e, r = e.variationAxes && e.source !== `custom` ? `${t} ${qE}` : t; return { ...n, uiFamilyName: t, cssFamilyName: r } }

function ag(e, t) { let n = `${e}-start`;
   performance.mark(n), t(); let r = `${e}-end`;
   performance.mark(r), performance.measure(e, n, r) }

function og(e) { return e.loader }

function sg(e, t, n) { let r = og(e); return r ? r.load(t, n) : Promise.resolve(void 0) }
var cg, lg, ug, dg, fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg, Ig, Lg, Rg, zg, Bg, Vg, Hg, Ug, Wg, Gg, Kg, K, qg, Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_, c_, l_, u_, d_, f_, p_, m_, h_, g_, __, v_, y_, b_, x_, S_, C_, w_, T_, E_, D_, O_, k_, A_, j_, M_, N_, P_, F_, I_, L_, R_, z_, B_, V_, H_, U_, W_, G_, K_, q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv, rv, iv, av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv, Tv, Ev, Dv, Ov, kv, Av, jv, Mv, Nv, q, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, J, Wv, Gv, Kv, qv, Jv, Yv, Xv, Zv, Y, Qv, $v, ey, ty, ny, ry, iy, ay, oy, sy, cy, ly, uy, dy, fy, py, my, hy, gy, _y, vy, yy, by, xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, X, My, Ny, Py, Fy, Z, Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky, qy, Jy, Yy, Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb, Rb, zb, Bb, Vb, Hb, Ub, Wb, Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb, $b, ex, tx, nx, rx, ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox, kx, Ax, jx, Mx, Nx, Px, Fx, Ix, Lx, Rx, zx, Bx, Vx, Hx, Ux, Wx, Gx, Kx, qx, Jx, Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS, jS, MS, NS, PS, FS, IS, LS, RS, zS, BS, VS, HS, US, WS, GS, KS, qS, JS, YS, XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC, SC, CC, wC, TC, EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC, BC, VC, HC, UC, WC, GC, KC, qC, JC, YC, XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw, ow, sw, cw, lw, uw, dw, fw, pw, mw, hw, gw, _w, vw, yw, bw, xw, Sw, Cw, ww, Tw, Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw, Fw, Iw, Lw, Rw, zw, Bw, Vw, Hw, Uw, Ww, Gw, Kw, qw, Jw, Yw, Xw, Zw, Qw, $w, eT, tT, nT, rT, iT, aT, oT, Q, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, $, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT, AT, jT, MT, NT, PT, FT, IT, LT, RT, zT, BT, VT, HT, UT, WT, GT, KT, qT, JT, YT, XT, ZT, QT, $T, eE, tE, nE, rE, iE, aE, oE, sE, cE, lE, uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, DE, OE, kE, AE, jE, ME, NE, PE, FE, IE, LE, RE, zE, BE, VE, HE, UE, WE, GE, KE, qE, JE, YE, XE, ZE, QE, $E, eD, tD, nD, rD, iD, aD, oD, sD, cD, lD, uD, dD, fD, pD, mD, hD, gD, _D, vD, yD, bD, xD, SD, CD, wD, TD, ED, DD, OD, kD, AD, jD, MD, ND, PD, FD, ID, LD, RD, zD, BD, VD, HD, UD, WD, GD, KD, qD, JD, YD, XD, ZD, QD, $D, eO, tO, nO, rO, iO, aO, oO, sO, cO, lO, uO = e((() => {
   ne(
      //! Credit to Astro | MIT License
      /**
       * @license Emotion v11.0.0
       * MIT License
       *
       * Copyright (c) Emotion team and other contributors
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in all
       * copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
       * SOFTWARE.
       */
      /*! Bundled license information:

      react-is/cjs/react-is.production.min.js:
      (** @license React v16.13.1
      * react-is.production.min.js
      *
      * Copyright (c) Facebook, Inc. and its affiliates.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE file in the root directory of this source tree.
      *)
      */
   ), we(), Ue(), i(), k(), D(), cg = me({ "../../../node_modules/hsluv/dist/hsluv.cjs"(e) { Object.defineProperty(e, `__esModule`, { value: !0 }), e.Hsluv = void 0; var t = class e { constructor() { this.hex = `#000000`, this.rgb_r = 0, this.rgb_g = 0, this.rgb_b = 0, this.xyz_x = 0, this.xyz_y = 0, this.xyz_z = 0, this.luv_l = 0, this.luv_u = 0, this.luv_v = 0, this.lch_l = 0, this.lch_c = 0, this.lch_h = 0, this.hsluv_h = 0, this.hsluv_s = 0, this.hsluv_l = 0, this.hpluv_h = 0, this.hpluv_p = 0, this.hpluv_l = 0, this.r0s = 0, this.r0i = 0, this.r1s = 0, this.r1i = 0, this.g0s = 0, this.g0i = 0, this.g1s = 0, this.g1i = 0, this.b0s = 0, this.b0i = 0, this.b1s = 0, this.b1i = 0 } static fromLinear(e) { return e <= .0031308 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - .055 } static toLinear(e) { return e > .04045 ? ((e + .055) / 1.055) ** 2.4 : e / 12.92 } static yToL(t) { return t <= e.epsilon ? t / e.refY * e.kappa : 116 * (t / e.refY) ** (1 / 3) - 16 } static lToY(t) { return t <= 8 ? e.refY * t / e.kappa : e.refY * ((t + 16) / 116) ** 3 } static rgbChannelToHex(t) { let n = Math.round(t * 255),
                  r = n % 16,
                  i = (n - r) / 16 | 0; return e.hexChars.charAt(i) + e.hexChars.charAt(r) } static hexToRgbChannel(t, n) { let r = e.hexChars.indexOf(t.charAt(n)),
                  i = e.hexChars.indexOf(t.charAt(n + 1)); return (r * 16 + i) / 255 } static distanceFromOriginAngle(e, t, n) { let r = t / (Math.sin(n) - e * Math.cos(n)); return r < 0 ? 1 / 0 : r } static distanceFromOrigin(e, t) { return Math.abs(t) / Math.sqrt(e ** 2 + 1) } static min6(e, t, n, r, i, a) { return Math.min(e, Math.min(t, Math.min(n, Math.min(r, Math.min(i, a))))) } rgbToHex() { this.hex = `#`, this.hex += e.rgbChannelToHex(this.rgb_r), this.hex += e.rgbChannelToHex(this.rgb_g), this.hex += e.rgbChannelToHex(this.rgb_b) } hexToRgb() { this.hex = this.hex.toLowerCase(), this.rgb_r = e.hexToRgbChannel(this.hex, 1), this.rgb_g = e.hexToRgbChannel(this.hex, 3), this.rgb_b = e.hexToRgbChannel(this.hex, 5) } xyzToRgb() { this.rgb_r = e.fromLinear(e.m_r0 * this.xyz_x + e.m_r1 * this.xyz_y + e.m_r2 * this.xyz_z), this.rgb_g = e.fromLinear(e.m_g0 * this.xyz_x + e.m_g1 * this.xyz_y + e.m_g2 * this.xyz_z), this.rgb_b = e.fromLinear(e.m_b0 * this.xyz_x + e.m_b1 * this.xyz_y + e.m_b2 * this.xyz_z) } rgbToXyz() { let t = e.toLinear(this.rgb_r),
                  n = e.toLinear(this.rgb_g),
                  r = e.toLinear(this.rgb_b);
               this.xyz_x = .41239079926595 * t + .35758433938387 * n + .18048078840183 * r, this.xyz_y = .21263900587151 * t + .71516867876775 * n + .072192315360733 * r, this.xyz_z = .019330818715591 * t + .11919477979462 * n + .95053215224966 * r } xyzToLuv() { let t = this.xyz_x + 15 * this.xyz_y + 3 * this.xyz_z,
                  n = 4 * this.xyz_x,
                  r = 9 * this.xyz_y;
               t === 0 ? (n = NaN, r = NaN) : (n /= t, r /= t), this.luv_l = e.yToL(this.xyz_y), this.luv_l === 0 ? (this.luv_u = 0, this.luv_v = 0) : (this.luv_u = 13 * this.luv_l * (n - e.refU), this.luv_v = 13 * this.luv_l * (r - e.refV)) } luvToXyz() { if (this.luv_l === 0) { this.xyz_x = 0, this.xyz_y = 0, this.xyz_z = 0; return } let t = this.luv_u / (13 * this.luv_l) + e.refU,
                  n = this.luv_v / (13 * this.luv_l) + e.refV;
               this.xyz_y = e.lToY(this.luv_l), this.xyz_x = 0 - 9 * this.xyz_y * t / ((t - 4) * n - t * n), this.xyz_z = (9 * this.xyz_y - 15 * n * this.xyz_y - n * this.xyz_x) / (3 * n) } luvToLch() { this.lch_l = this.luv_l, this.lch_c = Math.sqrt(this.luv_u * this.luv_u + this.luv_v * this.luv_v), this.lch_c < 1e-8 ? this.lch_h = 0 : (this.lch_h = Math.atan2(this.luv_v, this.luv_u) * 180 / Math.PI, this.lch_h < 0 && (this.lch_h = 360 + this.lch_h)) } lchToLuv() { let e = this.lch_h / 180 * Math.PI;
               this.luv_l = this.lch_l, this.luv_u = Math.cos(e) * this.lch_c, this.luv_v = Math.sin(e) * this.lch_c } calculateBoundingLines(t) { let n = (t + 16) ** 3 / 1560896,
                  r = n > e.epsilon ? n : t / e.kappa,
                  i = r * (284517 * e.m_r0 - 94839 * e.m_r2),
                  a = r * (838422 * e.m_r2 + 769860 * e.m_r1 + 731718 * e.m_r0),
                  o = r * (632260 * e.m_r2 - 126452 * e.m_r1),
                  s = r * (284517 * e.m_g0 - 94839 * e.m_g2),
                  c = r * (838422 * e.m_g2 + 769860 * e.m_g1 + 731718 * e.m_g0),
                  l = r * (632260 * e.m_g2 - 126452 * e.m_g1),
                  u = r * (284517 * e.m_b0 - 94839 * e.m_b2),
                  d = r * (838422 * e.m_b2 + 769860 * e.m_b1 + 731718 * e.m_b0),
                  f = r * (632260 * e.m_b2 - 126452 * e.m_b1);
               this.r0s = i / o, this.r0i = a * t / o, this.r1s = i / (o + 126452), this.r1i = (a - 769860) * t / (o + 126452), this.g0s = s / l, this.g0i = c * t / l, this.g1s = s / (l + 126452), this.g1i = (c - 769860) * t / (l + 126452), this.b0s = u / f, this.b0i = d * t / f, this.b1s = u / (f + 126452), this.b1i = (d - 769860) * t / (f + 126452) } calcMaxChromaHpluv() { let t = e.distanceFromOrigin(this.r0s, this.r0i),
                  n = e.distanceFromOrigin(this.r1s, this.r1i),
                  r = e.distanceFromOrigin(this.g0s, this.g0i),
                  i = e.distanceFromOrigin(this.g1s, this.g1i),
                  a = e.distanceFromOrigin(this.b0s, this.b0i),
                  o = e.distanceFromOrigin(this.b1s, this.b1i); return e.min6(t, n, r, i, a, o) } calcMaxChromaHsluv(t) { let n = t / 360 * Math.PI * 2,
                  r = e.distanceFromOriginAngle(this.r0s, this.r0i, n),
                  i = e.distanceFromOriginAngle(this.r1s, this.r1i, n),
                  a = e.distanceFromOriginAngle(this.g0s, this.g0i, n),
                  o = e.distanceFromOriginAngle(this.g1s, this.g1i, n),
                  s = e.distanceFromOriginAngle(this.b0s, this.b0i, n),
                  c = e.distanceFromOriginAngle(this.b1s, this.b1i, n); return e.min6(r, i, a, o, s, c) } hsluvToLch() { this.hsluv_l > 99.9999999 ? (this.lch_l = 100, this.lch_c = 0) : this.hsluv_l < 1e-8 ? (this.lch_l = 0, this.lch_c = 0) : (this.lch_l = this.hsluv_l, this.calculateBoundingLines(this.hsluv_l), this.lch_c = this.calcMaxChromaHsluv(this.hsluv_h) / 100 * this.hsluv_s), this.lch_h = this.hsluv_h } lchToHsluv() { if (this.lch_l > 99.9999999) this.hsluv_s = 0, this.hsluv_l = 100;
               else if (this.lch_l < 1e-8) this.hsluv_s = 0, this.hsluv_l = 0;
               else { this.calculateBoundingLines(this.lch_l); let e = this.calcMaxChromaHsluv(this.lch_h);
                  this.hsluv_s = this.lch_c / e * 100, this.hsluv_l = this.lch_l } this.hsluv_h = this.lch_h } hpluvToLch() { this.hpluv_l > 99.9999999 ? (this.lch_l = 100, this.lch_c = 0) : this.hpluv_l < 1e-8 ? (this.lch_l = 0, this.lch_c = 0) : (this.lch_l = this.hpluv_l, this.calculateBoundingLines(this.hpluv_l), this.lch_c = this.calcMaxChromaHpluv() / 100 * this.hpluv_p), this.lch_h = this.hpluv_h } lchToHpluv() { if (this.lch_l > 99.9999999) this.hpluv_p = 0, this.hpluv_l = 100;
               else if (this.lch_l < 1e-8) this.hpluv_p = 0, this.hpluv_l = 0;
               else { this.calculateBoundingLines(this.lch_l); let e = this.calcMaxChromaHpluv();
                  this.hpluv_p = this.lch_c / e * 100, this.hpluv_l = this.lch_l } this.hpluv_h = this.lch_h } hsluvToRgb() { this.hsluvToLch(), this.lchToLuv(), this.luvToXyz(), this.xyzToRgb() } hpluvToRgb() { this.hpluvToLch(), this.lchToLuv(), this.luvToXyz(), this.xyzToRgb() } hsluvToHex() { this.hsluvToRgb(), this.rgbToHex() } hpluvToHex() { this.hpluvToRgb(), this.rgbToHex() } rgbToHsluv() { this.rgbToXyz(), this.xyzToLuv(), this.luvToLch(), this.lchToHpluv(), this.lchToHsluv() } rgbToHpluv() { this.rgbToXyz(), this.xyzToLuv(), this.luvToLch(), this.lchToHpluv(), this.lchToHpluv() } hexToHsluv() { this.hexToRgb(), this.rgbToHsluv() } hexToHpluv() { this.hexToRgb(), this.rgbToHpluv() } };
         e.Hsluv = t, t.hexChars = `0123456789abcdef`, t.refY = 1, t.refU = .19783000664283, t.refV = .46831999493879, t.kappa = 903.2962962, t.epsilon = .0088564516, t.m_r0 = 3.240969941904521, t.m_r1 = -1.537383177570093, t.m_r2 = -.498610760293, t.m_g0 = -.96924363628087, t.m_g1 = 1.87596750150772, t.m_g2 = .041555057407175, t.m_b0 = .055630079696993, t.m_b1 = -.20397695888897, t.m_b2 = 1.056971514242878 } }), lg = me({ "../../../node_modules/eventemitter3/index.js"(e, t) { var n = Object.prototype.hasOwnProperty,
            r = `~`;

         function i() {} Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));

         function a(e, t, n) { this.fn = e, this.context = t, this.once = n || !1 }

         function o(e, t, n, i, o) { if (typeof n != `function`) throw TypeError(`The listener must be a function`); var s = new a(n, i || e, o),
               c = r ? r + t : t; return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e }

         function s(e, t) {--e._eventsCount === 0 ? e._events = new i : delete e._events[t] }

         function c() { this._events = new i, this._eventsCount = 0 } c.prototype.eventNames = function() { var e = [],
               t, i; if (this._eventsCount === 0) return e; for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i); return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e }, c.prototype.listeners = function(e) { var t = r ? r + e : e,
               n = this._events[t]; if (!n) return []; if (n.fn) return [n.fn]; for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn; return o }, c.prototype.listenerCount = function(e) { var t = r ? r + e : e,
               n = this._events[t]; return n ? n.fn ? 1 : n.length : 0 }, c.prototype.emit = function(e, t, n, i, a, o) { var s = r ? r + e : e; if (!this._events[s]) return !1; var c = this._events[s],
               l = arguments.length,
               u, d; if (c.fn) { switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
                  case 1:
                     return c.fn.call(c.context), !0;
                  case 2:
                     return c.fn.call(c.context, t), !0;
                  case 3:
                     return c.fn.call(c.context, t, n), !0;
                  case 4:
                     return c.fn.call(c.context, t, n, i), !0;
                  case 5:
                     return c.fn.call(c.context, t, n, i, a), !0;
                  case 6:
                     return c.fn.call(c.context, t, n, i, a, o), !0 } for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
               c.fn.apply(c.context, u) } else { var f = c.length,
                  p; for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
                  case 1:
                     c[d].fn.call(c[d].context); break;
                  case 2:
                     c[d].fn.call(c[d].context, t); break;
                  case 3:
                     c[d].fn.call(c[d].context, t, n); break;
                  case 4:
                     c[d].fn.call(c[d].context, t, n, i); break;
                  default:
                     if (!u)
                        for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
                     c[d].fn.apply(c[d].context, u) } } return !0 }, c.prototype.on = function(e, t, n) { return o(this, e, t, n, !1) }, c.prototype.once = function(e, t, n) { return o(this, e, t, n, !0) }, c.prototype.removeListener = function(e, t, n, i) { var a = r ? r + e : e; if (!this._events[a]) return this; if (!t) return s(this, a), this; var o = this._events[a]; if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
            else { for (var c = 0, l = [], u = o.length; c < u; c++)(o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
               l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a) } return this }, c.prototype.removeAllListeners = function(e) { var t; return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i, this._eventsCount = 0), this }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c) } }), ug = me({ "../../../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js"(e) { var t = typeof Symbol == `function` && Symbol.for,
            n = t ? Symbol.for(`react.element`) : 60103,
            r = t ? Symbol.for(`react.portal`) : 60106,
            i = t ? Symbol.for(`react.fragment`) : 60107,
            a = t ? Symbol.for(`react.strict_mode`) : 60108,
            o = t ? Symbol.for(`react.profiler`) : 60114,
            s = t ? Symbol.for(`react.provider`) : 60109,
            c = t ? Symbol.for(`react.context`) : 60110,
            l = t ? Symbol.for(`react.async_mode`) : 60111,
            u = t ? Symbol.for(`react.concurrent_mode`) : 60111,
            d = t ? Symbol.for(`react.forward_ref`) : 60112,
            f = t ? Symbol.for(`react.suspense`) : 60113,
            p = t ? Symbol.for(`react.suspense_list`) : 60120,
            m = t ? Symbol.for(`react.memo`) : 60115,
            h = t ? Symbol.for(`react.lazy`) : 60116,
            g = t ? Symbol.for(`react.block`) : 60121,
            _ = t ? Symbol.for(`react.fundamental`) : 60117,
            v = t ? Symbol.for(`react.responder`) : 60118,
            y = t ? Symbol.for(`react.scope`) : 60119;

         function b(e) { if (typeof e == `object` && e) { var t = e.$$typeof; switch (t) {
                  case n:
                     switch (e = e.type, e) {
                        case l:
                        case u:
                        case i:
                        case o:
                        case a:
                        case f:
                           return e;
                        default:
                           switch (e &&= e.$$typeof, e) {
                              case c:
                              case d:
                              case h:
                              case m:
                              case s:
                                 return e;
                              default:
                                 return t } }
                  case r:
                     return t } } }

         function x(e) { return b(e) === u } e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) { return x(e) || b(e) === l }, e.isConcurrentMode = x, e.isContextConsumer = function(e) { return b(e) === c }, e.isContextProvider = function(e) { return b(e) === s }, e.isElement = function(e) { return typeof e == `object` && !!e && e.$$typeof === n }, e.isForwardRef = function(e) { return b(e) === d }, e.isFragment = function(e) { return b(e) === i }, e.isLazy = function(e) { return b(e) === h }, e.isMemo = function(e) { return b(e) === m }, e.isPortal = function(e) { return b(e) === r }, e.isProfiler = function(e) { return b(e) === o }, e.isStrictMode = function(e) { return b(e) === a }, e.isSuspense = function(e) { return b(e) === f }, e.isValidElementType = function(e) { return typeof e == `string` || typeof e == `function` || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == `object` && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g) }, e.typeOf = b } }), dg = me({ "../../../node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(e, t) { t.exports = ug() } }), fg = me({ "../../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(e, t) { var n = dg(),
            r = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 },
            i = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
            a = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
            o = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
            s = {};
         s[n.ForwardRef] = a, s[n.Memo] = o;

         function c(e) { return n.isMemo(e) ? o : s[e.$$typeof] || r } var l = Object.defineProperty,
            u = Object.getOwnPropertyNames,
            d = Object.getOwnPropertySymbols,
            f = Object.getOwnPropertyDescriptor,
            p = Object.getPrototypeOf,
            m = Object.prototype;

         function h(e, t, n) { if (typeof t != `string`) { if (m) { var r = p(t);
                  r && r !== m && h(e, r, n) } var a = u(t);
               d && (a = a.concat(d(t))); for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) { var _ = a[g]; if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) { var v = f(t, _); try { l(e, _, v) } catch {} } } } return e } t.exports = h } }), pg = me({ "../../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js"(e, t) {
         (function() {
            function e(e, t) { document.addEventListener ? e.addEventListener(`scroll`, t, !1) : e.attachEvent(`scroll`, t) }

            function n(e) { document.body ? e() : document.addEventListener ? document.addEventListener(`DOMContentLoaded`, function t() { document.removeEventListener(`DOMContentLoaded`, t), e() }) : document.attachEvent(`onreadystatechange`, function t() {
                  (document.readyState == `interactive` || document.readyState == `complete`) && (document.detachEvent(`onreadystatechange`, t), e()) }) }

            function r(e) { this.g = document.createElement(`div`), this.g.setAttribute(`aria-hidden`, `true`), this.g.appendChild(document.createTextNode(e)), this.h = document.createElement(`span`), this.i = document.createElement(`span`), this.m = document.createElement(`span`), this.j = document.createElement(`span`), this.l = -1, this.h.style.cssText = `max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;`, this.i.style.cssText = `max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;`, this.j.style.cssText = `max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;`, this.m.style.cssText = `display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;`, this.h.appendChild(this.m), this.i.appendChild(this.j), this.g.appendChild(this.h), this.g.appendChild(this.i) }

            function i(e, t) { e.g.style.cssText = `max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:` + t + `;` }

            function a(e) { var t = e.g.offsetWidth,
                  n = t + 100; return e.j.style.width = n + `px`, e.i.scrollLeft = n, e.h.scrollLeft = e.h.scrollWidth + 100, e.l === t ? !1 : (e.l = t, !0) }

            function o(t, n) {
               function r() { var e = i;
                  a(e) && e.g.parentNode !== null && n(e.l) } var i = t;
               e(t.h, r), e(t.i, r), a(t) }

            function s(e, t, n) { t ||= {}, n ||= h, this.family = e, this.style = t.style || `normal`, this.weight = t.weight || `normal`, this.stretch = t.stretch || `normal`, this.context = n } var c = null,
               l = null,
               u = null,
               d = null;

            function f(e) { return l === null && (p(e) && /Apple/.test(h.navigator.vendor) ? (e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(h.navigator.userAgent), l = !!e && 603 > parseInt(e[1], 10)) : l = !1), l }

            function p(e) { return d === null && (d = !!e.document.fonts), d }

            function m(e, t) { var n = e.style,
                  r = e.weight; if (u === null) { var i = document.createElement(`div`); try { i.style.font = `condensed 100px sans-serif` } catch {} u = i.style.font !== `` } return [n, r, u ? e.stretch : ``, `100px`, t].join(` `) } s.prototype.load = function(e, t) { var a = this,
                  s = e || `BESbswy`,
                  l = 0,
                  u = t || 3e3,
                  d = new Date().getTime(); return new Promise(function(e, t) { if (p(a.context) && !f(a.context)) { var g = new Promise(function(e, t) {
                           function n() { new Date().getTime() - d >= u ? t(Error(`` + u + `ms timeout exceeded`)) : a.context.document.fonts.load(m(a, `"` + a.family + `"`), s).then(function(t) { 1 <= t.length ? e() : setTimeout(n, 25) }, t) } n() }),
                        _ = new Promise(function(e, t) { l = setTimeout(function() { t(Error(`` + u + `ms timeout exceeded`)) }, u) });
                     Promise.race([_, g]).then(function() { clearTimeout(l), e(a) }, t) } else n(function() {
                     function n() { var t;
                        (t = v != -1 && y != -1 || v != -1 && b != -1 || y != -1 && b != -1) && ((t = v != y && v != b && y != b) || (c === null && (t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(h.navigator.userAgent), c = !!t && (536 > parseInt(t[1], 10) || parseInt(t[1], 10) === 536 && 11 >= parseInt(t[2], 10))), t = c && (v == x && y == x && b == x || v == S && y == S && b == S || v == C && y == C && b == C)), t = !t), t && (w.parentNode !== null && w.parentNode.removeChild(w), clearTimeout(l), e(a)) }

                     function f() { if (new Date().getTime() - d >= u) w.parentNode !== null && w.parentNode.removeChild(w), t(Error(`` + u + `ms timeout exceeded`));
                        else { var e = a.context.document.hidden;
                           (!0 === e || e === void 0) && (v = p.g.offsetWidth, y = g.g.offsetWidth, b = _.g.offsetWidth, n()), l = setTimeout(f, 50) } } var p = new r(s),
                        g = new r(s),
                        _ = new r(s),
                        v = -1,
                        y = -1,
                        b = -1,
                        x = -1,
                        S = -1,
                        C = -1,
                        w = document.createElement(`div`);
                     w.dir = `ltr`, i(p, m(a, `sans-serif`)), i(g, m(a, `serif`)), i(_, m(a, `monospace`)), w.appendChild(p.g), w.appendChild(g.g), w.appendChild(_.g), a.context.document.body.appendChild(w), x = p.g.offsetWidth, S = g.g.offsetWidth, C = _.g.offsetWidth, f(), o(p, function(e) { v = e, n() }), i(p, m(a, `"` + a.family + `",sans-serif`)), o(g, function(e) { y = e, n() }), i(g, m(a, `"` + a.family + `",serif`)), o(_, function(e) { b = e, n() }), i(_, m(a, `"` + a.family + `",monospace`)) }) }) }, typeof t == `object` ? t.exports = s : (h.FontFaceObserver = s, h.FontFaceObserver.prototype.load = s.prototype.load) })() } }), mg = () => {}, hg = h !== void 0, gg = (() => hg && (n.webdriver || /bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(n.userAgent)))(), _g = hg && typeof h.requestIdleCallback == `function`, vg = (() => _g ? h.requestIdleCallback : setTimeout)(), yg = () => () => {}, bg = () => !0, xg = () => !1, Sg = new Map, Cg = hg ? void 0 : new Set, wg = `preload`, Tg = Object.keys, Eg = `equals`, Dg = (() => j.createContext({}))(), Og = (() => j.createContext({}))(), kg = [], Ag = j.createContext(void 0), Ag.displayName = `LibraryFeaturesContext`, jg = (() => Ag.Provider)(), Mg = () => j.useContext(Ag) ?? {}, Ng = `default`, Pg = { Pending: `pending`, Fulfilled: `fulfilled`, Rejected: `rejected` }, Fg = class e { constructor(e, t) { this.resolver = e, this.cacheHash = t, L(this, `promiseState`, Pg.Pending), L(this, `preloadPromise`), L(this, `value`), L(this, `reason`), L(this, `read`, () => { if (this.promiseState === Pg.Fulfilled) return this.value; throw this.promiseState === Pg.Rejected ? this.reason : Error(`Need to call preload() before read()`) }) } static is(t) { return t instanceof e } get status() { return this.preload(), this.state } get state() { return this.promiseState } then(e, t) { return this.promiseState === Pg.Fulfilled ? Promise.resolve(this.value).then(e, t) : this.promiseState === Pg.Rejected ? Promise.reject(this.reason).then(e, t) : this.readAsync().then(e, t) } preload() { if (this.promiseState !== Pg.Pending) return; if (this.preloadPromise) return this.preloadPromise;
         this.cacheHash !== void 0 && Cg !== void 0 && Cg.add(this.cacheHash); let e = e => { this.promiseState = Pg.Fulfilled, this.value = e },
            t = e => { this.promiseState = Pg.Rejected, this.reason = e },
            n; try { n = this.cacheHash && Sg.has(this.cacheHash) ? Sg.get(this.cacheHash) : this.resolver() } catch (e) { t(e); return } if (!st(n)) { e(n); return } let r = n.then(e, t); return this.preloadPromise = r, r } async readAsync() { return this.readMaybeAsync() } readMaybeAsync() { let e = this.preload(); return e ? e.then(this.read) : this.read() } use() { let e = this.preload(); if (e) throw e; return this.read() } }, Ig = class extends Error { constructor(e, t, n, r) { super(e), this.name = `DevalueError`, this.path = t.join(``), this.value = n, this.root = r } }, Lg = Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`), Rg = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/, zg = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`, Bg = -1, Vg = -2, Hg = -3, Ug = -4, Wg = -5, Gg = -6, Kg = -7, K = hg ? h : { addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => !1, ResizeObserver: void 0, onpointerdown: !1, onpointermove: !1, onpointerup: !1, ontouchstart: !1, ontouchmove: !1, ontouchend: !1, onmousedown: !1, onmousemove: !1, onmouseup: !1, devicePixelRatio: 1, scrollX: 0, scrollY: 0, location: { hash: ``, hostname: ``, href: ``, origin: ``, pathname: ``, search: `` }, document: { baseURI: ``, cookie: ``, referrer: null }, setTimeout: () => 0, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {}, requestAnimationFrame: () => 0, cancelAnimationFrame: () => {}, requestIdleCallback: () => 0, getSelection: () => null, matchMedia: e => ({ matches: !1, media: e, onchange: () => {}, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => !1 }), innerHeight: 0, innerWidth: 0, SVGSVGElement: {}, scheduler: void 0, open: function(e, t, n) {}, __framer_events: [] }, qg = 2, Jg = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u, Yg = { QueryCache: 0, CollectionUtilsCache: 1 }, Zg = class { constructor() { L(this, `payload`, an()), L(this, `isEmpty`, !0) } set(e, t, n) { this.payload[e].set(t, n), this.isEmpty = !1 } has(e, t) { return this.payload[e].has(t) } get(e, t) { return this.payload[e].get(t) } toString() { if (!this.isEmpty) try { return en(this.payload) } catch (e) { console.error(`Failed to serialize handover data.`, e); return } } clear() { for (let e of Object.values(this.payload)) e.clear();
         this.isEmpty = !0 } }, Qg = (() => hg ? void 0 : new Zg)(), $g = (() => Yg.CollectionUtilsCache)(), e_ = new WeakMap, t_ = p(void 0), n_ = class { constructor(e, t) { this.collectionId = t, L(this, `module`), L(this, `cacheMap`, new Map), this.module = new Fg(async () => { try { let t = await e(); return V(t, `Couldn't find CollectionUtils`), t } catch (e) { console.error(ut(`Failed to import collection module.`, e)); return } }) } callUtilsMethod(e, t, n) { let r = un(n),
            i = dn(e, this.collectionId, r, t); if (this.cacheMap.has(i)) { let e = this.cacheMap.get(i)?.readMaybeAsync(); if (Qg !== void 0) { if (st(e)) return e.then(e => (Qg.set($g, i, e), e));
               Qg.set($g, i, e) } return e } if (cn($g, i)) { let e = ln($g, i); return this.cacheMap.set(i, new Fg(() => e)), e } let a = this.module.readMaybeAsync(),
            o = st(a),
            s; try { s = o ? a.then(r => r?.[e](t, n)) : a?.[e](t, n) } catch (e) { console.error(ut(`Failed to call CollectionUtils method.`, e)), s = void 0 } if (s === void 0) { Qg !== void 0 && Qg.set($g, i, s), this.cacheMap.set(i, s); return } let c = new Fg(() => s.then(e => (Qg !== void 0 && Qg.set($g, i, e), e)).catch(e => { console.error(ut(`Failed to call CollectionUtils method.`, e)) })); return this.cacheMap.set(i, c), c.readMaybeAsync() } getSlugByRecordId(e, t) { return this.callUtilsMethod(`getSlugByRecordId`, e, t) } getRecordIdBySlug(e, t) { return this.callUtilsMethod(`getRecordIdBySlug`, e, t) } }, r_ = (() => K.scheduler && `yield` in K.scheduler)(), i_ = (() => K.scheduler && `postTask` in K.scheduler)(), a_ = new Set, o_ = !gg, s_ = 46, c_ = 47, l_ = (e, t) => e.charCodeAt(t), u_ = (e, t) => e.lastIndexOf(t), d_ = (e, t, n) => e.slice(t, n), f_ = !1, p_ = `/`, m_ = e => e === c_, h_ = new Set([`/404.html`, `/404`, `/404/`]), g_ = RegExp(`:([a-z]\\w*)`, `gi`), __ = `framer_variant`, v_ = j.createContext({ global: void 0, routes: {} }), y_ = 10, b_ = 1e4, x_ = e => `--view-transition-${e}`, S_ = { circle: { makeKeyframe: (e, t) => { let { x: n, y: r } = zn(e); return t === `start` ? `clip-path: circle(0 at ${n}px ${r}px);` : `clip-path: circle(${Math.hypot(Math.max(n,h.innerWidth-n),Math.max(r,h.innerHeight-r))}px at ${n}px ${r}px);` } }, conic: { makeKeyframe: (e, t, n) => { let r = 0; return (n === `exit` && e.angularDirection === `clockwise` && t === `start` || n === `exit` && e.angularDirection === `counter-clockwise` && t === `end` || n === `enter` && e.angularDirection === `counter-clockwise` && t === `start` || n === `enter` && e.angularDirection === `clockwise` && t === `end`) && (r = e.sweepAngle / 360 * 100), `${x_(`conic-offset`)}: ${r}%;` }, makeStyles: (e, t) => { let n = `var(${x_(`conic-offset`)})`,
               r = t === `exit` && e.angularDirection === `clockwise` || t === `enter` && e.angularDirection === `counter-clockwise`,
               i = r ? `transparent` : `black`,
               a = r ? `black` : `transparent`,
               o = `conic-gradient(from `; return o += `${e.angle}deg at ${e.x} ${e.y}, `, o += `${i} 0%, ${i} ${n}, `, o += `${a} ${n}, ${a} 100%)`, `mask-image: ${o}; -webkit-mask-image: ${o};` }, makePropertyRules: () => `
        @property ${x_(`conic-offset`)} {
            syntax: '<percentage>';
            initial-value: 0%;
            inherits: false;
        }
    ` }, inset: { makeKeyframe: (e, t) => { let { x: n, y: r } = zn(e), i = h.innerHeight - r, a = h.innerWidth - n; return t === `start` ? `clip-path: inset(${r}px ${a}px ${i}px ${n}px round ${e.round}px);` : `clip-path: inset(0 round 0);` } }, blinds: { makeKeyframe: (e, t, n) => { let [, r] = Rn(e.width), i = `0${r}`; return (t === `start` && n === `exit` || t === `end` && n === `enter`) && (i = e.width), `${x_(`blinds-width`)}: ${i};` }, makeStyles: (e, t) => { let n = `var(${x_(`blinds-width`)})`,
               r = t === `exit` ? `transparent` : `black`,
               i = t === `exit` ? `black` : `transparent`,
               a = `repeating-linear-gradient(`; return a += e.angle + 90 + `deg, `, a += `${r} 0px, ${r} ${n}, `, a += `${i} ${n}, ${i} ${e.width})`, `mask-image: ${a}; -webkit-mask-image: ${a};` }, makePropertyRules: () => `
            @property ${x_(`blinds-width`)} {
                syntax: '<length-percentage>';
                initial-value: 0px;
                inherits: false;
            }
        ` }, wipe: { makeKeyframe: (e, t, n) => { let r = t === `start` && n === `exit` || t === `end` && n === `enter` ? 1 : 0; return `${x_(`wipe-offset`)}: ${r};` }, makeStyles: (e, t) => { let n = `var(${x_(`wipe-offset`)})`,
               r = t === `exit` ? `transparent` : `black`,
               i = t === `exit` ? `black` : `transparent`,
               a = `linear-gradient(`; return a += e.angle + 90 + `deg, `, a += `${r} calc(calc(0% - ${e.width}) + calc(calc(100% + ${e.width}) * ${n})), `, a += `${i} calc(calc(100% + ${e.width}) * ${n}))`, `mask-image: ${a}; -webkit-mask-image: ${a};` }, makePropertyRules: () => `
            @property ${x_(`wipe-offset`)} {
                syntax: '<number>';
                initial-value: 0;
                inherits: false;
            }
        ` } }, C_ = { opacity: 1, x: `0px`, y: `0px`, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, mask: void 0 }, w_ = `view-transition-styles`, T_ = { x: `0px`, y: `0px`, scale: 1, opacity: 1, rotate3d: !1, rotate: 0, rotateX: 0, rotateY: 0, mask: void 0, transition: { type: `tween`, delay: 0, duration: .2, ease: [.27, 0, .51, 1], stiffness: 400, damping: 30, mass: 1 } }, E_ = () => {}, O_ = () => { D_ || (D_ = document.createElement(`div`), D_.setAttribute(`aria-live`, `assertive`), D_.setAttribute(`aria-atomic`, `true`), D_.style.position = `absolute`, D_.style.transform = `scale(0)`, document.body.append(D_)), setTimeout(() => { D_.textContent = document.title }, 60) }, k_ = !0, A_ = (() => { if (n === void 0) return !1; let e = n.userAgent,
         t = e.indexOf(`Chrome/`),
         r = +e.slice(t + 7, e.indexOf(`.`, t)); return r > 101 && r < 128 })(), j_ = (() => hg && typeof h.navigation?.back == `function`)(), M_ = /[\s?#[\]@!$&'*+,;:="<>%{}|\\^`/]+/gu, N_ = j.createContext(null), P_ = (() => { let e = p(`preview`); return e.displayName = `RenderTargetEnvironmentContext`, e })(), F_ = async () => {}, I_ = { activeLocale: null, locales: [], setLocale: F_ }, L_ = (() => { let e = j.createContext(I_); return e.displayName = `LocaleInfoContext`, e })(), R_ = (() => { let e = j.createContext(`ltr`); return e.displayName = `LayoutDirectionContext`, e })(), z_ = (() => { let e = p({ urlSearchParams: new URLSearchParams, replaceSearchParams: async () => {} }); return e.displayName = `URLSearchParamsContext`, e })(), B_ = `__f_replay`, V_ = `__f_replay_ignore`, H_ = () => hg, U_ = `mousedown.mouseup.touchcancel.touchend.touchstart.auxclick.dblclick.pointercancel.pointerdown.pointerup.dragend.dragstart.drop.compositionend.compositionstart.keydown.keypress.keyup.input.textInput.copy.cut.paste.click.change.contextmenu.reset`.split(`.`), W_ = e => { e.target?.closest?.(`#main`) && (Tr(e) || (e.stopPropagation(), performance.mark(`framer-react-event-handling-prevented`))) }, G_ = !1, cv = [Ar], sv = [Ar], ov = [Ar], av = [Ar], iv = [Ar], rv = [Ar], nv = [Ar], tv = [Ar], ev = [Ar], $_ = [Ar], Q_ = [Ar], Z_ = [Ar], X_ = [Ar], Y_ = [Ar], J_ = [Ar], q_ = [Ar], K_ = [Ar], uv = class { constructor() { Ge(lv, 5, this), L(this, `render`, { markStart: () => this.markRenderStart(), markEnd: () => this.markRenderEnd() }), L(this, `mutationEffects`, { measure: () => this.measureMutationEffects() }), L(this, `useInsertionEffects`, { markStart: () => this.markUseInsertionEffectsStart(), markRouterStart: () => this.markUseInsertionEffectRouterStart(), markEnd: () => this.markUseInsertionEffectsEnd() }), L(this, `useLayoutEffects`, { markStart: () => this.markUseLayoutEffectsStart(), markRouterStart: () => this.markRouterUseLayoutEffectStart(), markEnd: () => this.markUseLayoutEffectsEnd() }), L(this, `useEffects`, { markStart: () => this.markUseEffectsStart(), markRouterStart: () => this.markUseEffectsRouterStart(), markEnd: () => this.markUseEffectsEnd(), markAreSynchronous: () => this.markUseEffectsAreSynchronous() }), L(this, `browserRendering`, { hasStarted: !1, requestAnimationFrame: { markStart: () => this.markRafStart(), markEnd: () => this.markRafEnd() }, layoutStylePaint: { markEnd: () => this.markLayoutStylePaintEnd() } }), L(this, `unattributedHydrationOverhead`, { measure: () => this.measureUnattributedHydrationOverhead() }) } markRenderStart() { performance.mark(`framer-hydration-start`) } markRenderEnd() { performance.mark(`framer-hydration-render-end`), jr(`framer-hydration-render`, `framer-hydration-start`, `framer-hydration-render-end`) } markUseInsertionEffectsStart() { performance.mark(`framer-hydration-insertion-effects-start`) } markUseInsertionEffectRouterStart() { performance.mark(`framer-hydration-router-insertion-effect`) } markUseInsertionEffectsEnd() { performance.mark(`framer-hydration-insertion-effects-end`), jr(`framer-hydration-insertion-effects`, `framer-hydration-insertion-effects-start`, `framer-hydration-insertion-effects-end`) } markUseLayoutEffectsStart() { performance.mark(`framer-hydration-layout-effects-start`) } markRouterUseLayoutEffectStart() { performance.mark(`framer-hydration-router-layout-effect`) } markUseLayoutEffectsEnd() { performance.mark(`framer-hydration-layout-effects-end`), jr(`framer-hydration-layout-effects`, `framer-hydration-layout-effects-start`, `framer-hydration-layout-effects-end`) } markUseEffectsStart() { performance.mark(`framer-hydration-effects-start`) } markUseEffectsRouterStart() { performance.mark(`framer-hydration-router-effect`) } markUseEffectsAreSynchronous() { performance.mark(`framer-hydration-effects-sync`) } markUseEffectsEnd() { performance.mark(`framer-hydration-effects-end`), jr(`framer-hydration-effects`, performance.getEntriesByName(`framer-hydration-first-paint`)[0]?.name ?? performance.getEntriesByName(`framer-hydration-effects-start`)[0]?.name, `framer-hydration-effects-end`) } markRafStart() { this.browserRendering.hasStarted = !0, performance.mark(`framer-hydration-browser-render-start`) } markRafEnd() { performance.mark(`framer-hydration-browser-raf-end`), jr(`framer-hydration-raf`, `framer-hydration-browser-render-start`, `framer-hydration-browser-raf-end`) } markLayoutStylePaintEnd() { performance.mark(`framer-hydration-first-paint`), jr(`framer-hydration-time-to-first-paint`, `framer-hydration-start`, `framer-hydration-first-paint`), jr(`framer-hydration-browser-render`, `framer-hydration-browser-raf-end`, `framer-hydration-first-paint`) } measureMutationEffects() { jr(`framer-hydration-commit`, `framer-hydration-layout-effects-end`, `framer-hydration-effects-start`) } measureUnattributedHydrationOverhead() { jr(`framer-hydration-uho`, performance.getEntriesByName(`framer-hydration-effects-end`)[0]?.name ?? performance.getEntriesByName(`framer-hydration-layout-effects-end`)[0]?.name, `framer-hydration-browser-render-start`) } }, lv = Ce(null), Ve(lv, 1, `markRenderStart`, cv, uv), Ve(lv, 1, `markRenderEnd`, sv, uv), Ve(lv, 1, `markUseInsertionEffectsStart`, ov, uv), Ve(lv, 1, `markUseInsertionEffectRouterStart`, av, uv), Ve(lv, 1, `markUseInsertionEffectsEnd`, iv, uv), Ve(lv, 1, `markUseLayoutEffectsStart`, rv, uv), Ve(lv, 1, `markRouterUseLayoutEffectStart`, nv, uv), Ve(lv, 1, `markUseLayoutEffectsEnd`, tv, uv), Ve(lv, 1, `markUseEffectsStart`, ev, uv), Ve(lv, 1, `markUseEffectsRouterStart`, $_, uv), Ve(lv, 1, `markUseEffectsAreSynchronous`, Q_, uv), Ve(lv, 1, `markUseEffectsEnd`, Z_, uv), Ve(lv, 1, `markRafStart`, X_, uv), Ve(lv, 1, `markRafEnd`, Y_, uv), Ve(lv, 1, `markLayoutStylePaintEnd`, J_, uv), Ve(lv, 1, `measureMutationEffects`, q_, uv), Ve(lv, 1, `measureUnattributedHydrationOverhead`, K_, uv), pe(lv, uv), fv = !1, pv = { Start: Ir, End: Lr }, mv = class extends Error {}, hv = class extends x { constructor(e) { super(e), this.state = { error: void 0, forceUpdateKey: e.forceUpdateKey } } static getDerivedStateFromError(e) { return { error: e } } static getDerivedStateFromProps(e, t) { if (e.forceUpdateKey !== t.forceUpdateKey) { let n = { forceUpdateKey: e.forceUpdateKey }; return t.error && (n.error = void 0), n } return null } render() { if (this.state.error === void 0) return this.props.children; if (!(this.state.error instanceof mv)) throw this.state.error; let { notFoundPage: e, defaultPageStyle: t } = this.props; if (!e) throw this.state.error; return Rr(e, t) } }, gv = Object.freeze([]), vv = new Set, yv = class { constructor() { L(this, `observers`, new Set), L(this, `transactions`, {}) } add(e) { this.observers.add(e); let t = !1; return () => { t || (t = !0, this.remove(e)) } } remove(e) { this.observers.delete(e) } notify(e, t) { if (t) { let n = this.transactions[t] || e;
            n.value = e.value, this.transactions[t] = n } else this.callObservers(e) } finishTransaction(e) { let t = this.transactions[e]; return delete this.transactions[e], this.callObservers(t, e) } callObservers(e, t) { let n = []; return new Set(this.observers).forEach(r => { typeof r == `function` ? r(e, t) : (r.update(e, t), n.push(r.finish)) }), n } }, bv = (() => {
      function e(e) { return ei(`Animatable()`, `2.0.0`, `the new animation API (https://www.framer.com/api/animation/)`), ti(e) ? e : new Cv(e) } return e.transaction = e => { let t = Math.random(),
            n = new Set;
         e((e, r) => { e.set(r, t), n.add(e) }, t); let r = [];
         n.forEach(e => { r.push(...e.finishTransaction(t)) }), r.forEach(e => { e(t) }) }, e.getNumber = (t, n = 0) => e.get(t, n), e.get = (e, t) => e == null ? t : ti(e) ? e.get() : e, e.objectToValues = e => { if (!e) return e; let t = {}; for (let n in e) { let r = e[n];
            ti(r) ? t[n] = r.get() : t[n] = r } return t }, e })(), xv = `onUpdate`, Sv = `finishTransaction`, Cv = class { constructor(e) { this.value = e, L(this, `observers`, new yv) } static interpolationFor(e, t) { if (ti(e)) return ni(e, t) } get() { return this.value } set(e, t) { let n = this.value;
         ti(e) && (e = e.get()), this.value = e; let r = { value: e, oldValue: n };
         this.observers.notify(r, t) } finishTransaction(e) { return this.observers.finishTransaction(e) } onUpdate(e) { return this.observers.add(e) } }, (e => { e.isQuadrilateralPoints = e => e?.length === 4, e.add = (...e) => e.reduce((e, t) => ({ x: e.x + t.x, y: e.y + t.y }), { x: 0, y: 0 }), e.subtract = (e, t) => ({ x: e.x - t.x, y: e.y - t.y }), e.multiply = (e, t) => ({ x: e.x * t, y: e.y * t }), e.divide = (e, t) => ({ x: e.x / t, y: e.y / t }), e.absolute = e => ({ x: Math.abs(e.x), y: Math.abs(e.y) }), e.reverse = e => ({ x: e.x * -1, y: e.y * -1 }), e.pixelAligned = (e, t = { x: 0, y: 0 }) => ({ x: ii(e.x, t.x), y: ii(e.y, t.y) }), e.distance = (e, t) => { let n = Math.abs(e.x - t.x),
            r = Math.abs(e.y - t.y); return Math.sqrt(n * n + r * r) }, e.angle = (e, t) => Math.atan2(t.y - e.y, t.x - e.x) * 180 / Math.PI - 90, e.angleFromX = (e, t) => Math.atan2(t.y - e.y, t.x - e.x) * 180 / Math.PI, e.isEqual = (e, t) => e.x === t.x && e.y === t.y, e.rotationNormalizer = () => { let e; return t => { typeof e != `number` && (e = t); let n = e - t,
               r = Math.abs(n) + 180,
               i = Math.floor(r / 360); return n < 180 && (t -= i * 360), n > 180 && (t += i * 360), e = t, t } };

      function t(e, t) { return { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 } } e.center = t;

      function n(e) { let t = 0,
            n = 0; return e.forEach(e => { t += e.x, n += e.y }), { x: t / e.length, y: n / e.length } } e.centroid = n;

      function r(t) { let n = e.centroid(t),
            r = new Map; for (let e = 0; e < t.length; e++) { let i = t[e];
            i && r.set(i, Math.atan2(i.y - n.y, i.x - n.x)) } return t.sort((e, t) => (r.get(e) ?? 0) - (r.get(t) ?? 0)) } e.sortClockwise = r })(oi ||= {}), wv = { aliceblue: `f0f8ff`, antiquewhite: `faebd7`, aqua: `0ff`, aquamarine: `7fffd4`, azure: `f0ffff`, beige: `f5f5dc`, bisque: `ffe4c4`, black: `000`, blanchedalmond: `ffebcd`, blue: `00f`, blueviolet: `8a2be2`, brown: `a52a2a`, burlywood: `deb887`, burntsienna: `ea7e5d`, cadetblue: `5f9ea0`, chartreuse: `7fff00`, chocolate: `d2691e`, coral: `ff7f50`, cornflowerblue: `6495ed`, cornsilk: `fff8dc`, crimson: `dc143c`, cyan: `0ff`, darkblue: `00008b`, darkcyan: `008b8b`, darkgoldenrod: `b8860b`, darkgray: `a9a9a9`, darkgreen: `006400`, darkgrey: `a9a9a9`, darkkhaki: `bdb76b`, darkmagenta: `8b008b`, darkolivegreen: `556b2f`, darkorange: `ff8c00`, darkorchid: `9932cc`, darkred: `8b0000`, darksalmon: `e9967a`, darkseagreen: `8fbc8f`, darkslateblue: `483d8b`, darkslategray: `2f4f4f`, darkslategrey: `2f4f4f`, darkturquoise: `00ced1`, darkviolet: `9400d3`, deeppink: `ff1493`, deepskyblue: `00bfff`, dimgray: `696969`, dimgrey: `696969`, dodgerblue: `1e90ff`, firebrick: `b22222`, floralwhite: `fffaf0`, forestgreen: `228b22`, fuchsia: `f0f`, gainsboro: `dcdcdc`, ghostwhite: `f8f8ff`, gold: `ffd700`, goldenrod: `daa520`, gray: `808080`, green: `008000`, greenyellow: `adff2f`, grey: `808080`, honeydew: `f0fff0`, hotpink: `ff69b4`, indianred: `cd5c5c`, indigo: `4b0082`, ivory: `fffff0`, khaki: `f0e68c`, lavender: `e6e6fa`, lavenderblush: `fff0f5`, lawngreen: `7cfc00`, lemonchiffon: `fffacd`, lightblue: `add8e6`, lightcoral: `f08080`, lightcyan: `e0ffff`, lightgoldenrodyellow: `fafad2`, lightgray: `d3d3d3`, lightgreen: `90ee90`, lightgrey: `d3d3d3`, lightpink: `ffb6c1`, lightsalmon: `ffa07a`, lightseagreen: `20b2aa`, lightskyblue: `87cefa`, lightslategray: `789`, lightslategrey: `789`, lightsteelblue: `b0c4de`, lightyellow: `ffffe0`, lime: `0f0`, limegreen: `32cd32`, linen: `faf0e6`, magenta: `f0f`, maroon: `800000`, mediumaquamarine: `66cdaa`, mediumblue: `0000cd`, mediumorchid: `ba55d3`, mediumpurple: `9370db`, mediumseagreen: `3cb371`, mediumslateblue: `7b68ee`, mediumspringgreen: `00fa9a`, mediumturquoise: `48d1cc`, mediumvioletred: `c71585`, midnightblue: `191970`, mintcream: `f5fffa`, mistyrose: `ffe4e1`, moccasin: `ffe4b5`, navajowhite: `ffdead`, navy: `000080`, oldlace: `fdf5e6`, olive: `808000`, olivedrab: `6b8e23`, orange: `ffa500`, orangered: `ff4500`, orchid: `da70d6`, palegoldenrod: `eee8aa`, palegreen: `98fb98`, paleturquoise: `afeeee`, palevioletred: `db7093`, papayawhip: `ffefd5`, peachpuff: `ffdab9`, peru: `cd853f`, pink: `ffc0cb`, plum: `dda0dd`, powderblue: `b0e0e6`, purple: `800080`, rebeccapurple: `663399`, red: `f00`, rosybrown: `bc8f8f`, royalblue: `4169e1`, saddlebrown: `8b4513`, salmon: `fa8072`, sandybrown: `f4a460`, seagreen: `2e8b57`, seashell: `fff5ee`, sienna: `a0522d`, silver: `c0c0c0`, skyblue: `87ceeb`, slateblue: `6a5acd`, slategray: `708090`, slategrey: `708090`, snow: `fffafa`, springgreen: `00ff7f`, steelblue: `4682b4`, tan: `d2b48c`, teal: `008080`, thistle: `d8bfd8`, tomato: `ff6347`, turquoise: `40e0d0`, violet: `ee82ee`, wheat: `f5deb3`, white: `fff`, whitesmoke: `f5f5f5`, yellow: `ff0`, yellowgreen: `9acd32` }, Tv = new((() => cg().Hsluv)()), Ev = (() => { let e = `(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`,
         t = `[\\s|\\(]+(` + e + `)[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?`,
         n = `[\\s|\\(]+(` + e + `)[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?`; return { rgb: RegExp(`rgb` + t), rgba: RegExp(`rgba` + n), hsl: RegExp(`hsl` + t), hsla: RegExp(`hsla` + n), hsv: RegExp(`hsv` + t), hsva: RegExp(`hsva` + n), hex3: /^([\da-f])([\da-f])([\da-f])$/iu, hex6: /^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/iu, hex4: /^#?([\da-f])([\da-f])([\da-f])([\da-f])$/iu, hex8: /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})$/iu } })(), Dv = /^color\(display-p3\s+(?<r>\d+\.\d+|\d+|\.\d+)\s+(?<g>\d+\.\d+|\d+|\.\d+)\s+(?<b>\d+\.\d+|\d+|\.\d+)(?:\s*\/\s*(?<a>\d+\.\d+|\d+|\.\d+))?\)$/u, Ov = e => { let { r: t, g: n, b: r, a: i } = Ai(e); return { x: .486570948648216 * t + .265667693169093 * n + .1982172852343625 * r, y: .2289745640697487 * t + .6917385218365062 * n + .079286914093745 * r, z: 0 * t + .0451133818589026 * n + 1.043944368900976 * r, a: i } }, kv = ({ x: e = 0, y: t = 0, z: n = 0, a: r = 1 }) => Mi({ r: e * 3.2409699419045226 - t * 1.537383177570094 - .4986107602930034 * n, g: e * -.9692436362808796 + t * 1.8759675015077204 + .0415550574071756 * n, b: e * .0556300796969936 - t * .2039769588889765 + 1.0569715142428784 * n, a: r }), Av = e => { let { r: t, g: n, b: r, a: i } = Ai(e); return { x: .4123907992659593 * t + .357584339383878 * n + .1804807884018343 * r, y: .2126390058715102 * t + .715168678767756 * n + .0721923153607337 * r, z: .0193308187155918 * t + .119194779794626 * n + .9505321522496607 * r, a: i } }, jv = ({ x: e = 0, y: t = 0, z: n = 0, a: r = 1 }) => Mi({ r: e * 2.4934969119414263 - t * .9313836179191242 - .402710784450717 * n, g: e * -.8294889695615749 + t * 1.7626640603183465 + .0236246858419436 * n, b: e * .0358458302437845 - t * .0761723892680418 + .9568845240076871 * n, a: r }), Mv = class e { constructor(e) { L(this, `format`, `p3`), L(this, `r`), L(this, `g`), L(this, `b`), L(this, `a`), this.r = e.r ?? 0, this.g = e.g ?? 0, this.b = e.b ?? 0, this.a = e.a ?? 1 } hsv() { return Ni(this) } rgb() { return Li(this) } hsl() { return gi(this.r, this.g, this.b) } toString(e = `p3`, t) { switch (e) {
            case `p3`: { let e = t?.r ?? this.r,
                  n = t?.g ?? this.g,
                  r = t?.b ?? this.b,
                  i = t?.a ?? this.a; return i === 1 ? `color(display-p3 ${e} ${n} ${r})` : `color(display-p3 ${e} ${n} ${r} / ${i})` }
            case `srgb`: { let e = this.rgb(),
                  n = Math.round(Math.max(0, Math.min(e.r, 1)) * 100) / 100,
                  r = Math.round(Math.max(0, Math.min(e.g, 1)) * 100) / 100,
                  i = Math.round(Math.max(0, Math.min(e.b, 1)) * 100) / 100,
                  a = t?.r ?? n * 255,
                  o = t?.g ?? r * 255,
                  s = t?.b ?? i * 255,
                  c = t?.a ?? e.a ?? 1; return c === 1 ? `rgb(${a}, ${o}, ${s})` : `rgba(${a}, ${o}, ${s}, ${c})` } } } static isP3String(e) { return e.startsWith(`color(display-p3`) } static fromHSV(t, n = `p3`) { switch (n) {
            case `p3`:
               return new e(Fi(t));
            case `srgb`:
               return new e(Ii(Fi(t))) } } static fromRGB(t) { return new e(Ii({ r: Math.round(t.r / 255 * 1e4) / 1e4, g: Math.round(t.g / 255 * 1e4) / 1e4, b: Math.round(t.b / 255 * 1e4) / 1e4, a: t.a ?? 1 })) } static fromRGBString(t) { let n = q(t); if (n) return e.fromRGB(n) } static fromString(t) { if (!e.isP3String(t)) return; let n = Oi(t); if (n) return new e({ r: n.r, g: n.g, b: n.b, a: n.a }) } static srgbFromValue(t) { if (!R(t) || !q.isP3String(t)) return t; let n = e.fromString(t); return n ? n.toString(`srgb`) : t } static multiplyAlpha(t, n) { return new e({ r: t.r, g: t.g, b: t.b, a: t.a * n }) } }, Nv = new Map, q = (() => {
      function e(n, r, i, a) { if (typeof n == `string`) { let r = Nv.get(n); return r || (r = t(n), r === void 0 ? { ...e(`black`), isValid: !1 } : (Nv.set(n, r), r)) } let o = t(n, r, i, a); return o === void 0 ? { ...e(`black`), isValid: !1 } : o }

      function t(t, n, r, i) { if (t === ``) return; let a = Ri(t, n, r, i); if (a) { let n = { r: a.r, g: a.g, b: a.b, a: a.a, h: a.h, s: a.s, l: a.l, initialValue: typeof t == `string` && a.format !== `hsv` ? t : void 0, roundA: Math.round(100 * a.a) / 100, format: a.format, mix: e.mix, toValue: () => e.toRgbString(n) }; return n } else return } let n = { isRGB(e) { return e === `rgb` || e === `rgba` }, isHSL(e) { return e === `hsl` || e === `hsla` } };
      e.inspect = (e, t) => e.format === `hsl` ? `<${e.constructor.name} h:${e.h} s:${e.s} l:${e.l} a:${e.a}>` : e.format === `hex` || e.format === `name` ? `<${e.constructor.name} "${t}">` : `<${e.constructor.name} r:${e.r} g:${e.g} b:${e.b} a:${e.a}>`, e.isColor = t => typeof t == `string` ? e.isColorString(t) : e.isColorObject(t), e.isColorString = e => typeof e == `string` ? Ti(e) !== !1 : !1, e.isColorObject = e => B(e) && typeof e.r == `number` && typeof e.g == `number` && typeof e.b == `number` && typeof e.h == `number` && typeof e.s == `number` && typeof e.l == `number` && typeof e.a == `number` && typeof e.roundA == `number` && typeof e.format == `string`, e.toString = t => e.toRgbString(t), e.toHex = (e, t = !1) => hi(e.r, e.g, e.b, t), e.toHexString = (t, n = !1) => `#${e.toHex(t,n)}`, e.isP3String = e => typeof e == `string` ? Mv.isP3String(e) : !1, e.toRgbString = e => e.a === 1 ? `rgb(` + Math.round(e.r) + `, ` + Math.round(e.g) + `, ` + Math.round(e.b) + `)` : `rgba(` + Math.round(e.r) + `, ` + Math.round(e.g) + `, ` + Math.round(e.b) + `, ` + e.roundA + `)`, e.toHusl = e => ({ ...di(e.r, e.g, e.b), a: e.roundA }), e.toHslString = t => { let n = e.toHsl(t),
            r = Math.round(n.h),
            i = Math.round(n.s * 100),
            a = Math.round(n.l * 100); return t.a === 1 ? `hsl(` + r + `, ` + i + `%, ` + a + `%)` : `hsla(` + r + `, ` + i + `%, ` + a + `%, ` + t.roundA + `)` }, e.toHsv = e => { let t = yi(e.r, e.g, e.b); return { h: t.h * 360, s: t.s, v: t.v, a: e.a } }, e.toHsvString = e => { let t = yi(e.r, e.g, e.b),
            n = Math.round(t.h * 360),
            r = Math.round(t.s * 100),
            i = Math.round(t.v * 100); return e.a === 1 ? `hsv(` + n + `, ` + r + `%, ` + i + `%)` : `hsva(` + n + `, ` + r + `%, ` + i + `%, ` + e.roundA + `)` }, e.toName = e => { if (e.a === 0) return `transparent`; if (e.a < 1) return !1; let t = hi(e.r, e.g, e.b, !0); for (let e of Object.keys(wv))
            if (wv[e] === t) return e; return !1 }, e.toHsl = e => ({ h: Math.round(e.h), s: e.s, l: e.l, a: e.a }), e.toRgb = e => ({ r: Math.round(e.r), g: Math.round(e.g), b: Math.round(e.b), a: e.a }), e.brighten = (t, n = 10) => { let r = e.toRgb(t); return r.r = Math.max(0, Math.min(255, r.r - Math.round(255 * -(n / 100)))), r.g = Math.max(0, Math.min(255, r.g - Math.round(255 * -(n / 100)))), r.b = Math.max(0, Math.min(255, r.b - Math.round(255 * -(n / 100)))), e(r) }, e.lighten = (t, n = 10) => { let r = e.toHsl(t); return r.l += n / 100, r.l = Math.min(1, Math.max(0, r.l)), e(r) }, e.darken = (t, n = 10) => { let r = e.toHsl(t); return r.l -= n / 100, r.l = Math.min(1, Math.max(0, r.l)), e(r) }, e.saturate = (t, n = 10) => { let r = e.toHsl(t); return r.s += n / 100, r.s = Math.min(1, Math.max(0, r.s)), e(r) }, e.desaturate = (t, n = 10) => { let r = e.toHsl(t); return r.s -= n / 100, r.s = Math.min(1, Math.max(0, r.s)), e(r) }, e.grayscale = t => e.desaturate(t, 100), e.hueRotate = (t, n) => { let r = e.toHsl(t); return r.h += n, r.h = r.h > 360 ? r.h - 360 : r.h, e(r) }, e.alpha = (t, n = 1) => e({ r: t.r, g: t.g, b: t.b, a: n }), e.transparent = t => e.alpha(t, 0), e.multiplyAlpha = (t, n = 1) => e({ r: t.r, g: t.g, b: t.b, a: t.a * n }), e.alphaComposite = (t, n) => { if (t.a === 1) return t; if (n.a < 1) throw Error("Bottom color must be fully opaque for alpha blending, you should check and determine your own strategy for resolving alpha bottom layers, ie. `Color.alphaComposite(bottom, Color('white'))`"); return t.a === 0 ? n : e({ r: Math.round(t.r * t.a + n.r * (1 - t.a)), g: Math.round(t.g * t.a + n.g * (1 - t.a)), b: Math.round(t.b * t.a + n.b * (1 - t.a)), a: 1 }) }, e.interpolate = (t, n, r = `rgb`) => { if (!e.isColorObject(t) || !e.isColorObject(n)) throw TypeError(`Both arguments for Color.interpolate must be Color objects`); return i => e.mixAsColor(t, n, i, !1, r) }, e.mix = (t, n, { model: r = `rgb` } = {}) => { let i = typeof t == `string` ? e(t) : t,
            a = e.interpolate(i, n, r); return t => e.toRgbString(a(t)) }, e.mixAsColor = (t, r, i = .5, a = !1, o = `rgb`) => { let s = null; if (n.isRGB(o)) s = e({ r: si(i, [0, 1], [t.r, r.r], a), g: si(i, [0, 1], [t.g, r.g], a), b: si(i, [0, 1], [t.b, r.b], a), a: si(i, [0, 1], [t.a, r.a], a) });
         else { let c, l;
            n.isHSL(o) ? (c = e.toHsl(t), l = e.toHsl(r)) : (c = e.toHusl(t), l = e.toHusl(r)), c.s === 0 ? c.h = l.h : l.s === 0 && (l.h = c.h); let u = c.h,
               d = l.h,
               f = d - u;
            f > 180 ? f = d - 360 - u : f < -180 && (f = d + 360 - u); let p = { h: si(i, [0, 1], [u, u + f], a), s: si(i, [0, 1], [c.s, l.s], a), l: si(i, [0, 1], [c.l, l.l], a), a: si(i, [0, 1], [t.a, r.a], a) };
            s = n.isHSL(o) ? e(p) : e(fi(p.h, p.s, p.l, p.a)) } return s }, e.random = (t = 1) => {
         function n() { return Math.floor(Math.random() * 255) } return e(`rgba(` + n() + `, ` + n() + `, ` + n() + `, ` + t + `)`) }, e.grey = (t = .5, n = 1) => (t = Math.floor(t * 255), e(`rgba(` + t + `, ` + t + `, ` + t + `, ` + n + `)`)), e.gray = e.grey, e.rgbToHsl = (e, t, n) => gi(e, t, n), e.isValidColorProperty = (t, n) => !!((t.toLowerCase().slice(-5) === `color` || t === `fill` || t === `stroke`) && typeof n == `string` && e.isColorString(n)), e.difference = (e, t) => { let n = (e.r + t.r) / 2,
            r = e.r - t.r,
            i = e.g - t.g,
            a = e.b - t.b,
            o = r ** 2,
            s = i ** 2,
            c = a ** 2; return Math.sqrt(2 * o + 4 * s + 3 * c + n * (o - c) / 256) }, e.equal = (e, t, n = .1) => !(Math.abs(e.r - t.r) >= n || Math.abs(e.g - t.g) >= n || Math.abs(e.b - t.b) >= n || Math.abs(e.a - t.a) * 256 >= n); let r = qe([0, 255], [0, 1]);

      function i(e) { e = r(e); let t = Math.abs(e); return t < .04045 ? e / 12.92 : (Math.sign(e) || 1) * ((t + .055) / 1.055) ** 2.4 } return e.luminance = t => { let { r: n, g: r, b: a } = e.toRgb(t); return .2126 * i(n) + .7152 * i(r) + .0722 * i(a) }, e.contrast = (t, n) => { let r = e.luminance(t),
            i = e.luminance(n); return (Math.max(r, i) + .05) / (Math.min(r, i) + .05) }, e })(), Pv = e => e instanceof We, Fv = (() => lg().EventEmitter)(), Iv = class { constructor() { L(this, `_emitter`, new Fv) } eventNames() { return this._emitter.eventNames() } eventListeners() { let e = {}; for (let t of this._emitter.eventNames()) e[t] = this._emitter.listeners(t); return e } on(e, t) { this.addEventListener(e, t, !1, !1, this) } off(e, t) { this.removeEventListeners(e, t) } once(e, t) { this.addEventListener(e, t, !0, !1, this) } unique(e, t) { this.addEventListener(e, t, !1, !0, this) } addEventListener(e, t, n, r, i) { if (r) { for (let e of this._emitter.eventNames())
               if (t === this._emitter.listeners(e)) return } n === !0 ? this._emitter.once(e, t, i) : this._emitter.addListener(e, t, i) } removeEventListeners(e, t) { e ? this._emitter.removeListener(e, t) : this.removeAllEventListeners() } removeAllEventListeners() { this._emitter.removeAllListeners() } countEventListeners(e) { if (e) return this._emitter.listeners(e).length; { let e = 0; for (let t of this._emitter.eventNames()) e += this._emitter.listeners(t).length; return e } } emit(e, ...t) { this._emitter.emit(e, ...t) } }, Lv = e => { setTimeout(e, 1 / 60) }, Rv = (() => K.requestAnimationFrame || Lv)(), zv = e => Rv(e), Bv = (() => 1 / 60)(), Vv = class extends Iv { constructor(e = !1) { super(), L(this, `_started`, !1), L(this, `_frame`, 0), L(this, `_frameTasks`, []), L(this, `tick`, () => { this._started && (zv(this.tick), this.emit(`update`, this._frame, Bv), this.emit(`render`, this._frame, Bv), this._processFrameTasks(), this._frame++) }), e && this.start() } addFrameTask(e) { this._frameTasks.push(e) } _processFrameTasks() { let e = this._frameTasks,
            t = e.length; if (t !== 0) { for (let n = 0; n < t; n++) e[n]?.();
            e.length = 0 } } static set TimeStep(e) { Bv = e } static get TimeStep() { return Bv } start() { return this._started ? this : (this._frame = 0, this._started = !0, zv(this.tick), this) } stop() { return this._started = !1, this } get frame() { return this._frame } get time() { return this._frame * Bv } }, Hv = new Vv, Uv = { target: K.location.origin === `https://screenshot.framer.invalid` ? `EXPORT` : `PREVIEW`, zoom: 1 }, J = { canvas: `CANVAS`, export: `EXPORT`, thumbnail: `THUMBNAIL`, preview: `PREVIEW`, current: () => Uv.target, hasRestrictions: () => { let e = Uv.target; return e === `CANVAS` || e === `EXPORT` } }, Wv = e => ({ correct: (t, { projectionDelta: n, treeScale: r }) => { if (typeof t == `string` && (t = parseFloat(t)), t === 0) return `0px`; let i = t; return n && r && (i = Math.round(t / n[e].scale / r[e]), i = Math.max(i, 1)), i + `px` } }), Oe({ borderTopWidth: Wv(`y`), borderLeftWidth: Wv(`x`), borderRightWidth: Wv(`x`), borderBottomWidth: Wv(`y`) }), Gv = j.createContext({ getLayoutId: e => null, persistLayoutIdCache: () => {}, top: !1, enabled: !0 }), Kv = { background: void 0, display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, lineHeight: `1.4em`, textOverflow: `ellipsis`, overflow: `hidden`, minHeight: 0, width: `100%`, height: `100%` }, qv = (() => ({ ...Kv, border: `1px solid rgba(149, 149, 149, 0.15)`, borderRadius: 6, fontSize: `12px`, backgroundColor: `rgba(149, 149, 149, 0.1)`, color: `#a5a5a5` }))(), Jv = { overflow: `hidden`, whiteSpace: `nowrap`, textOverflow: `ellipsis`, maxWidth: `100%`, flexShrink: 0, padding: `0 10px` }, Yv = (() => ({ ...Jv, fontWeight: 500 }))(), Xv = (() => ({ ...Jv, whiteSpace: `pre`, maxHeight: `calc(50% - calc(20px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)))`, WebkitMaskImage: `linear-gradient(to bottom, black 80%, transparent 100%)` }))(), Zv = (() => {
      function e(e, t) { return { a: e, b: t } } return e.offset = (t, n) => { let r = $i(oi.angleFromX(t.a, t.b)),
            i = n * Math.sin(r),
            a = n * Math.cos(r); return e({ x: t.a.x + i, y: t.a.y - a }, { x: t.b.x + i, y: t.b.y - a }) }, e.intersection = (e, t, n) => { let r = e.a.x,
            i = e.a.y,
            a = e.b.x,
            o = e.b.y,
            s = t.a.x,
            c = t.a.y,
            l = t.b.x,
            u = t.b.y,
            d = (l - s) * (c - i) - (u - c) * (s - r),
            f = (l - s) * (o - i) - (u - c) * (a - r),
            p = (a - r) * (c - i) - (o - i) * (s - r); if (d === 0 && f === 0 || f === 0) return null; let m = d / f,
            h = p / f; return n && (m < 0 || m > 1 || h < 0 || h > 1) ? null : { x: r + m * (a - r), y: i + m * (o - i) } }, e.intersectionAngle = (e, t) => { let n = e.b.x - e.a.x,
            r = e.b.y - e.a.y,
            i = t.b.x - t.a.x,
            a = t.b.y - t.a.y; return Math.atan2(n * a - r * i, n * i + r * a) * (180 / Math.PI) }, e.isOrthogonal = e => e.a.x === e.b.x || e.a.y === e.b.y, e.perpendicular = (t, n) => { let r = t.a.x - t.b.x,
            i = t.a.y - t.b.y; return e(oi(n.x - i, n.y + r), n) }, e.projectPoint = (t, n) => { let r = e.perpendicular(t, n); return e.intersection(t, r) }, e.pointAtPercentDistance = (t, n) => { let r = e.distance(t),
            i = n * r / r; return { x: i * t.b.x + (1 - i) * t.a.x, y: i * t.b.y + (1 - i) * t.a.y } }, e.distance = e => oi.distance(e.a, e.b), e })(), Y = { equals: function(e, t) { return e === t ? !0 : !e || !t ? !1 : e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height }, from: e => ({ x: e.x, y: e.y, width: e.width, height: e.height }), atOrigin: e => ({ x: 0, y: 0, width: e.width, height: e.height }), fromTwoPoints: (e, t) => ({ x: Math.min(e.x, t.x), y: Math.min(e.y, t.y), width: Math.abs(e.x - t.x), height: Math.abs(e.y - t.y) }), fromRect: e => ({ x: e.left, y: e.top, width: e.right - e.left, height: e.bottom - e.top }), multiply: (e, t) => ({ x: e.x * t, y: e.y * t, width: e.width * t, height: e.height * t }), divide: (e, t) => Y.multiply(e, 1 / t), offset: (e, t) => { let n = typeof t.x == `number` ? t.x : 0,
            r = typeof t.y == `number` ? t.y : 0; return { ...e, x: e.x + n, y: e.y + r } }, inflate: (e, t) => { if (t === 0) return e; let n = 2 * t; return { x: e.x - t, y: e.y - t, width: e.width + n, height: e.height + n } }, pixelAligned: e => { let t = Math.round(e.x),
            n = Math.round(e.y),
            r = Math.round(e.x + e.width),
            i = Math.round(e.y + e.height); return { x: t, y: n, width: Math.max(r - t, 0), height: Math.max(i - n, 0) } }, halfPixelAligned: e => { let t = Math.round(e.x * 2) / 2,
            n = Math.round(e.y * 2) / 2,
            r = Math.round((e.x + e.width) * 2) / 2,
            i = Math.round((e.y + e.height) * 2) / 2; return { x: t, y: n, width: Math.max(r - t, 1), height: Math.max(i - n, 1) } }, round: (e, t = 0) => ({ x: ri(e.x, t), y: ri(e.y, t), width: ri(e.width, t), height: ri(e.height, t) }), roundToOutside: e => { let t = Math.floor(e.x),
            n = Math.floor(e.y),
            r = Math.ceil(e.x + e.width),
            i = Math.ceil(e.y + e.height); return { x: t, y: n, width: Math.max(r - t, 0), height: Math.max(i - n, 0) } }, minX: e => e.x, maxX: e => e.x + e.width, minY: e => e.y, maxY: e => e.y + e.height, positions: e => ({ minX: e.x, midX: e.x + e.width / 2, maxX: Y.maxX(e), minY: e.y, midY: e.y + e.height / 2, maxY: Y.maxY(e) }), center: e => ({ x: e.x + e.width / 2, y: e.y + e.height / 2 }), boundingRectFromPoints: e => { let t = 1 / 0,
            n = -1 / 0,
            r = 1 / 0,
            i = -1 / 0; for (let a = 0; a < e.length; a++) { let o = e[a];
            t = Math.min(t, o.x), n = Math.max(n, o.x), r = Math.min(r, o.y), i = Math.max(i, o.y) } return { x: t, y: r, width: n - t, height: i - r } }, fromPoints: e => { let [t, n, r, i] = e, { x: a, y: o } = t; return { x: a, y: o, width: oi.distance(t, n), height: oi.distance(t, i) } }, merge: (...e) => { let t = { x: Math.min(...e.map(Y.minX)), y: Math.min(...e.map(Y.minY)) },
            n = { x: Math.max(...e.map(Y.maxX)), y: Math.max(...e.map(Y.maxY)) }; return Y.fromTwoPoints(t, n) }, intersection: (e, t) => { let n = Math.max(e.x, t.x),
            r = Math.min(e.x + e.width, t.x + t.width),
            i = Math.max(e.y, t.y),
            a = Math.min(e.y + e.height, t.y + t.height); return { x: n, y: i, width: r - n, height: a - i } }, points: e => [{ x: Y.minX(e), y: Y.minY(e) }, { x: Y.minX(e), y: Y.maxY(e) }, { x: Y.maxX(e), y: Y.minY(e) }, { x: Y.maxX(e), y: Y.maxY(e) }], pointsAtOrigin: e => [{ x: 0, y: 0 }, { x: e.width, y: 0 }, { x: e.width, y: e.height }, { x: 0, y: e.height }], transform: (e, t) => { let { x: n, y: r } = t.transformPoint({ x: e.x, y: e.y }), { x: i, y: a } = t.transformPoint({ x: e.x + e.width, y: e.y }), { x: o, y: s } = t.transformPoint({ x: e.x + e.width, y: e.y + e.height }), { x: c, y: l } = t.transformPoint({ x: e.x, y: e.y + e.height }), u = Math.min(n, i, o, c), d = Math.max(n, i, o, c) - u, f = Math.min(r, a, s, l); return { x: u, y: f, width: d, height: Math.max(r, a, s, l) - f } }, containsPoint: (e, t) => !(t.x < Y.minX(e) || t.x > Y.maxX(e) || t.y < Y.minY(e) || t.y > Y.maxY(e) || Number.isNaN(e.x) || Number.isNaN(e.y)), containsRect: (e, t) => { for (let n of Y.points(t))
            if (!Y.containsPoint(e, n)) return !1; return !0 }, toCSS: e => ({ display: `block`, transform: `translate(${e.x}px, ${e.y}px)`, width: `${e.width}px`, height: `${e.height}px` }), inset: (e, t) => ({ x: e.x + t, y: e.y + t, width: Math.max(0, e.width - 2 * t), height: Math.max(0, e.height - 2 * t) }), intersects: (e, t) => !(t.x >= Y.maxX(e) || Y.maxX(t) <= e.x || t.y >= Y.maxY(e) || Y.maxY(t) <= e.y), overlapHorizontally: (e, t) => { let n = Y.maxX(e),
            r = Y.maxX(t); return n > t.x && r > e.x }, overlapVertically: (e, t) => { let n = Y.maxY(e),
            r = Y.maxY(t); return n > t.y && r > e.y }, doesNotIntersect: (e, t) => t.find(t => Y.intersects(t, e)) === void 0, isEqual: (e, t) => Y.equals(e, t), cornerPoints: e => { let t = e.x,
            n = e.x + e.width,
            r = e.y,
            i = e.y + e.height; return [{ x: t, y: r }, { x: n, y: r }, { x: n, y: i }, { x: t, y: i }] }, midPoints: e => { let t = e.x,
            n = e.x + e.width / 2,
            r = e.x + e.width,
            i = e.y,
            a = e.y + e.height / 2,
            o = e.y + e.height; return [{ x: n, y: i }, { x: r, y: a }, { x: n, y: o }, { x: t, y: a }] }, pointDistance: (e, t) => { let n = 0,
            r = 0; return t.x < e.x ? n = e.x - t.x : t.x > Y.maxX(e) && (n = t.x - Y.maxX(e)), t.y < e.y ? r = e.y - t.y : t.y > Y.maxY(e) && (r = t.y - Y.maxY(e)), oi.distance({ x: n, y: r }, { x: 0, y: 0 }) }, delta: (e, t) => { let n = { x: Y.minX(e), y: Y.minY(e) },
            r = { x: Y.minX(t), y: Y.minY(t) }; return { x: n.x - r.x, y: n.y - r.y } }, withMinSize: (e, t) => { let { width: n, height: r } = t, i = e.width - n, a = e.height - r; return { width: Math.max(e.width, n), height: Math.max(e.height, r), x: e.width < n ? e.x + i / 2 : e.x, y: e.height < r ? e.y + a / 2 : e.y } }, anyPointsOutsideRect: (e, t) => { let n = Y.minX(e),
            r = Y.minY(e),
            i = Y.maxX(e),
            a = Y.maxY(e); for (let e of t)
            if (e.x < n || e.x > i || e.y < r || e.y > a) return !0; return !1 }, edges: e => { let [t, n, r, i] = Y.cornerPoints(e); return [Zv(t, n), Zv(n, r), Zv(r, i), Zv(i, t)] }, rebaseRectOnto: (e, t, n, r) => { let i = { ...e }; switch (n) {
            case `bottom`:
            case `top`:
               switch (r) {
                  case `start`:
                     i.x = t.x; break;
                  case `center`:
                     i.x = t.x + t.width / 2 - e.width / 2; break;
                  case `end`:
                     i.x = t.x + t.width - e.width; break;
                  default:
                     H(r) } break;
            case `left`:
               i.x = t.x - e.width; break;
            case `right`:
               i.x = t.x + t.width; break;
            default:
               H(n) } switch (n) {
            case `left`:
            case `right`:
               switch (r) {
                  case `start`:
                     i.y = t.y; break;
                  case `center`:
                     i.y = t.y + t.height / 2 - e.height / 2; break;
                  case `end`:
                     i.y = t.y + t.height - e.height; break;
                  default:
                     H(r) } break;
            case `top`:
               i.y = t.y - e.height; break;
            case `bottom`:
               i.y = t.y + t.height; break;
            default:
               H(n) } return i }, constrain: (e, t) => { if (!t) return e; let n = Math.max(e.y, t.y);
         n = Math.min(n, t.y + t.height - e.height); let r = Math.max(e.x, t.x); return r = Math.min(r, t.x + t.width - e.width), { x: r, y: n, width: e.width, height: e.height } }, closestEdge: (e, t) => { let n = Zv(t, Y.center(e)),
            r = Y.edges(e); for (let e = 0; e < r.length; e++) { let t = r[e]; if (t && Zv.intersection(n, t, !0)) { let n = Qv[e]; return V(n, `Invalid edge name`, Qv), { edge: t, name: n } } } }, closestRect: (e, t) => { let n = 0,
            r = e[0];
         V(r, `Rect array is empty`); let i = Y.pointDistance(r, t); for (let a = 1; a < e.length; a += 1) { let o = e[a];
            V(o); let s = Y.pointDistance(o, t); if (s < i && (n = a, r = o, i = s), i === 0) break } return { rect: r, index: n } } }, Qv = [`top`, `right`, `bottom`, `left`], $v = { quickfix: e => ((ea(e.widthType) || ea(e.heightType)) && (e.aspectRatio = null), U(e.aspectRatio) && (e.left && e.right && (e.widthType = 0), e.top && e.bottom && (e.heightType = 0), e.left && e.right && e.top && e.bottom && (e.bottom = !1), e.widthType !== 0 && e.heightType !== 0 && (e.heightType = 0)), e.left && e.right && ((e.fixedSize || ea(e.widthType) || U(e.maxWidth)) && (e.right = !1), e.widthType = 0), e.top && e.bottom && ((e.fixedSize || ea(e.heightType) || U(e.maxHeight)) && (e.bottom = !1), e.heightType = 0), e) }, ey = { fromProperties: e => { let { left: t, right: n, top: r, bottom: i, width: a, height: o, centerX: s, centerY: c, aspectRatio: l, autoSize: u } = e, d = $v.quickfix({ left: U(t) || ti(t), right: U(n) || ti(n), top: U(r) || ti(r), bottom: U(i) || ti(i), widthType: ta(a), heightType: ta(o), aspectRatio: l || null, fixedSize: u === !0 }), f = null, p = null, m = 0, h = 0; if (d.widthType !== 0 && typeof a == `string`) { let e = parseFloat(a);
            a.endsWith(`fr`) ? (m = 3, f = e) : a === `auto` ? m = 2 : (m = 1, f = e / 100) } else a !== void 0 && typeof a != `string` && (f = bv.getNumber(a)); if (d.heightType !== 0 && typeof o == `string`) { let e = parseFloat(o);
            o.endsWith(`fr`) ? (h = 3, p = e) : o === `auto` ? h = 2 : (h = 1, p = parseFloat(o) / 100) } else o !== void 0 && typeof o != `string` && (p = bv.getNumber(o)); let g = .5,
            _ = .5; return s && (g = parseFloat(s) / 100), c && (_ = parseFloat(c) / 100), { left: d.left ? bv.getNumber(t) : null, right: d.right ? bv.getNumber(n) : null, top: d.top ? bv.getNumber(r) : null, bottom: d.bottom ? bv.getNumber(i) : null, widthType: m, heightType: h, width: f, height: p, aspectRatio: d.aspectRatio || null, centerAnchorX: g, centerAnchorY: _ } }, toSize: (e, t, n, r) => { let i = null,
            a = null,
            o = t?.sizing ? bv.getNumber(t?.sizing.width) : null,
            s = t?.sizing ? bv.getNumber(t?.sizing.height) : null,
            c = sa(e.left, e.right); if (o && U(c)) i = o - c;
         else if (n && ea(e.widthType)) i = n.width;
         else if (U(e.width)) switch (e.widthType) {
            case 0:
               i = e.width; break;
            case 3:
               i = r ? r.freeSpaceInParent.width / r.freeSpaceUnitDivisor.width * e.width : null; break;
            case 1:
            case 4:
               o && (i = o * e.width); break;
            case 2:
            case 5:
               break;
            default:
               H(e.widthType) }
         let l = sa(e.top, e.bottom); if (s && U(l)) a = s - l;
         else if (n && ea(e.heightType)) a = n.height;
         else if (U(e.height)) switch (e.heightType) {
            case 0:
               a = e.height; break;
            case 3:
               a = r ? r.freeSpaceInParent.height / r.freeSpaceUnitDivisor.height * e.height : null; break;
            case 1:
            case 4:
               s && (a = s * e.height); break;
            case 2:
            case 5:
               break;
            default:
               H(e.heightType) }
         return oa(i, a, e, { height: s ?? 0, width: o ?? 0 }, t?.viewport) }, toRect: (e, t = null, n = null, r = !1, i = null) => { let a = e.left || 0,
            o = e.top || 0,
            { width: s, height: c } = ey.toSize(e, t, n, i),
            l = t?.positioning ?? null,
            u = l ? bv.getNumber(l.width) : null,
            d = l ? bv.getNumber(l.height) : null;
         e.left === null ? u && e.right !== null ? a = u - e.right - s : u && (a = e.centerAnchorX * u - s / 2) : a = e.left, e.top === null ? d && e.bottom !== null ? o = d - e.bottom - c : d && (o = e.centerAnchorY * d - c / 2) : o = e.top; let f = { x: a, y: o, width: s, height: c }; return r ? Y.pixelAligned(f) : f } }, ty = 200, ny = 200, ry = j.createContext({ parentSize: 0 }), iy = e => { let t = ha(),
         { parentSize: n, children: r } = e,
         i = j.useMemo(() => ({ parentSize: n }), [_a(n), va(n)]); return t === 1 ? r ? E(y, { children: r }) : null : E(ry.Provider, { value: i, children: r }) }, ay = (e => (e.Boolean = `boolean`, e.Number = `number`, e.String = `string`, e.RichText = `richtext`, e.FusedNumber = `fusednumber`, e.Enum = `enum`, e.SegmentedEnum = `segmentedenum`, e.Color = `color`, e.Image = `image`, e.ResponsiveImage = `responsiveimage`, e.File = `file`, e.ComponentInstance = `componentinstance`, e.Slot = `slot`, e.Array = `array`, e.EventHandler = `eventhandler`, e.ChangeHandler = `changehandler`, e.Transition = `transition`, e.BoxShadow = `boxshadow`, e.Link = `link`, e.Date = `date`, e.Object = `object`, e.Font = `font`, e.PageScope = `pagescope`, e.ScrollSectionRef = `scrollsectionref`, e.CustomCursor = `customcursor`, e.Border = `border`, e.Cursor = `cursor`, e.Padding = `padding`, e.BorderRadius = `borderradius`, e.Gap = `gap`, e.CollectionReference = `collectionreference`, e.MultiCollectionReference = `multicollectionreference`, e.TrackingId = `trackingid`, e.VectorSetItem = `vectorsetitem`, e.LinkRelValues = `linkrelvalues`, e.Location = `location`, e))(ay || {}), oy = /Mac/u, sy = /iPhone|iPod|iPad/iu, cy = /MacIntel/iu, ly = /Edg\//u, uy = /Chrome/u, dy = /Google Inc/u, fy = /Safari/u, py = /Apple Computer/u, my = /Firefox\/\d+\.\d+$/u, hy = /FramerX/u, gy = /tablet|iPad|Nexus 9/iu, _y = /mobi/iu, vy = j.createContext(void 0), yy = new Set, xy = `style[data-framer-css-ssr-minified]`, Sy = (() => { if (!Aa()) return new Set; let e = document.querySelector(xy)?.getAttribute(`data-framer-components`); return e ? new Set(e.split(` `)) : new Set })(), Cy = `data-framer-css-ssr`, wy = (e, t, n) => j.forwardRef((r, i) => { let { sheet: o, cache: s } = j.useContext(vy) ?? {}, c = n; if (!Aa()) { Ze(t) && (t = t(J.current(), r)); let e = Array.isArray(t) ? t.join(`
`) : t;
         Ey.add(e, c) } return a(() => { c && Sy.has(c) || (Ze(t) ? t(J.current(), r) : Array.isArray(t) ? t : t.split(`
`)).forEach(e => e && Ia(e, o, s)) }, []), E(e, { ...r, ref: i }) }), Ty = class { constructor() { L(this, `styles`, new Set), L(this, `componentIds`, new Set) } add(e, t) { this.styles.add(e), t && this.componentIds.add(t) } getStyles() { return this.styles } getComponentIds() { return this.componentIds } clear() { this.styles.clear(), this.componentIds.clear() } }, Ey = new Ty, Oy = `flexbox-gap-not-supported`, ky = !1, Ay = [`[data-framer-component-type="DeprecatedRichText"] { cursor: inherit; }`, `
[data-framer-component-type="DeprecatedRichText"] .text-styles-preset-reset {
    --framer-font-family: Inter, Inter Placeholder, sans-serif;
    --framer-font-style: normal;
    --framer-font-weight: 500;
    --framer-text-color: #000;
    --framer-font-size: 16px;
    --framer-letter-spacing: 0;
    --framer-text-transform: none;
    --framer-text-decoration: none;
    --framer-line-height: 1.2em;
    --framer-text-alignment: start;
    --framer-font-open-type-features: normal;
    --font-variation-settings: normal;
}
`, `
[data-framer-component-type="DeprecatedRichText"] p,
[data-framer-component-type="DeprecatedRichText"] div,
[data-framer-component-type="DeprecatedRichText"] h1,
[data-framer-component-type="DeprecatedRichText"] h2,
[data-framer-component-type="DeprecatedRichText"] h3,
[data-framer-component-type="DeprecatedRichText"] h4,
[data-framer-component-type="DeprecatedRichText"] h5,
[data-framer-component-type="DeprecatedRichText"] h6 {
    margin: 0;
    padding: 0;
}
`, `
[data-framer-component-type="DeprecatedRichText"] p,
[data-framer-component-type="DeprecatedRichText"] div,
[data-framer-component-type="DeprecatedRichText"] h1,
[data-framer-component-type="DeprecatedRichText"] h2,
[data-framer-component-type="DeprecatedRichText"] h3,
[data-framer-component-type="DeprecatedRichText"] h4,
[data-framer-component-type="DeprecatedRichText"] h5,
[data-framer-component-type="DeprecatedRichText"] h6,
[data-framer-component-type="DeprecatedRichText"] li,
[data-framer-component-type="DeprecatedRichText"] ol,
[data-framer-component-type="DeprecatedRichText"] ul,
[data-framer-component-type="DeprecatedRichText"] span:not([data-text-fill]) {
    font-family: var(--framer-font-family, Inter, Inter Placeholder, sans-serif);
    font-style: var(--framer-font-style, normal);
    font-weight: var(--framer-font-weight, 400);
    color: var(--framer-text-color, #000);
    font-size: var(--framer-font-size, 16px);
    letter-spacing: var(--framer-letter-spacing, 0);
    text-transform: var(--framer-text-transform, none);
    text-decoration: var(--framer-text-decoration, none);
    line-height: var(--framer-line-height, 1.2em);
    text-align: var(--framer-text-alignment, start);
}
`, `
[data-framer-component-type="DeprecatedRichText"] p:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] div:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h1:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h2:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h3:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h4:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h5:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] h6:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] ol:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] ul:not(:first-child),
[data-framer-component-type="DeprecatedRichText"] .framer-image:not(:first-child) {
    margin-top: var(--framer-paragraph-spacing, 0);
}
`, `
[data-framer-component-type="DeprecatedRichText"] span[data-text-fill] {
    display: inline-block;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
`, `
[data-framer-component-type="DeprecatedRichText"] a,
[data-framer-component-type="DeprecatedRichText"] a span:not([data-text-fill]) {
    font-family: var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
    font-style: var(--framer-link-font-style, var(--framer-font-style, normal));
    font-weight: var(--framer-link-font-weight, var(--framer-font-weight, 400));
    color: var(--framer-link-text-color, var(--framer-text-color, #000));
    font-size: var(--framer-link-font-size, var(--framer-font-size, 16px));
    text-transform: var(--framer-link-text-transform, var(--framer-text-transform, none));
    text-decoration: var(--framer-link-text-decoration, var(--framer-text-decoration, none));
}
`, `
[data-framer-component-type="DeprecatedRichText"] a:hover,
[data-framer-component-type="DeprecatedRichText"] a:hover span:not([data-text-fill]) {
    font-family: var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
    font-style: var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
    font-weight: var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
    color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
    font-size: var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)));
    text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
    text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
}
`, `
[data-framer-component-type="DeprecatedRichText"] a[data-framer-page-link-current],
[data-framer-component-type="DeprecatedRichText"] a[data-framer-page-link-current] span:not([data-text-fill]):not([data-nested-link]) {
    font-family: var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
    font-style: var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)));
    font-weight: var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)));
    color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
    font-size: var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)));
    text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
    text-decoration: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none)));
}
`, `
[data-framer-component-type="DeprecatedRichText"] a[data-framer-page-link-current]:hover,
[data-framer-component-type="DeprecatedRichText"] a[data-framer-page-link-current]:hover span:not([data-text-fill]):not([data-nested-link]) {
    font-family: var(--framer-link-hover-font-family, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
    font-style: var(--framer-link-hover-font-style, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
    font-weight: var(--framer-link-hover-font-weight, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
    color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
    font-size: var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))));
    text-transform: var(--framer-link-hover-text-transform, var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
    text-decoration: var(--framer-link-hover-text-decoration, var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none))));
}
`, `
[data-framer-component-type="DeprecatedRichText"] strong {
    font-weight: bolder;
}
`, `
[data-framer-component-type="DeprecatedRichText"] em {
    font-style: italic;
}
`, `
[data-framer-component-type="DeprecatedRichText"] .framer-image {
    display: block;
    max-width: 100%;
    height: auto;
}
`, `
[data-framer-component-type="DeprecatedRichText"] ul,
[data-framer-component-type="DeprecatedRichText"] ol {
    display: table;
    width: 100%;
    padding-left: 0;
    margin: 0;
}
`, `
[data-framer-component-type="DeprecatedRichText"] li {
    display: table-row;
    counter-increment: list-item;
    list-style: none;
}
`, `
[data-framer-component-type="DeprecatedRichText"] ol > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: counter(list-item) ".";
    white-space: nowrap;
}
`, `
[data-framer-component-type="DeprecatedRichText"] ul > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: "•";
}
`], jy = (e => (e.Padding = `--framer-input-padding`, e.BorderRadiusTopLeft = `--framer-input-border-radius-top-left`, e.BorderRadiusTopRight = `--framer-input-border-radius-top-right`, e.BorderRadiusBottomRight = `--framer-input-border-radius-bottom-right`, e.BorderRadiusBottomLeft = `--framer-input-border-radius-bottom-left`, e.CornerShape = `--framer-input-corner-shape`, e.BorderColor = `--framer-input-border-color`, e.BorderTopWidth = `--framer-input-border-top-width`, e.BorderRightWidth = `--framer-input-border-right-width`, e.BorderBottomWidth = `--framer-input-border-bottom-width`, e.BorderLeftWidth = `--framer-input-border-left-width`, e.BorderStyle = `--framer-input-border-style`, e.Background = `--framer-input-background`, e.FontFamily = `--framer-input-font-family`, e.FontWeight = `--framer-input-font-weight`, e.FontSize = `--framer-input-font-size`, e.FontColor = `--framer-input-font-color`, e.FontStyle = `--framer-input-font-style`, e.FontLetterSpacing = `--framer-input-font-letter-spacing`, e.FontTextAlignment = `--framer-input-font-text-alignment`, e.FontLineHeight = `--framer-input-font-line-height`, e.FontOpenType = `--framer-input-font-open-type-features`, e.FontVariationAxes = `--framer-input-font-variation-axes`, e.PlaceholderColor = `--framer-input-placeholder-color`, e.BoxShadow = `--framer-input-box-shadow`, e.FocusedBorderColor = `--framer-input-focused-border-color`, e.FocusedBorderWidth = `--framer-input-focused-border-width`, e.FocusedBorderStyle = `--framer-input-focused-border-style`, e.FocusedBackground = `--framer-input-focused-background`, e.FocusedBoxShadow = `--framer-input-focused-box-shadow`, e.FocusedTransition = `--framer-input-focused-transition`, e.BooleanCheckedBackground = `--framer-input-boolean-checked-background`, e.BooleanCheckedBorderColor = `--framer-input-boolean-checked-border-color`, e.BooleanCheckedBorderWidth = `--framer-input-boolean-checked-border-width`, e.BooleanCheckedBorderStyle = `--framer-input-boolean-checked-border-style`, e.BooleanCheckedBoxShadow = `--framer-input-boolean-checked-box-shadow`, e.BooleanCheckedTransition = `--framer-input-boolean-checked-transition`, e.InvalidTextColor = `--framer-input-invalid-text-color`, e.IconBackgroundImage = `--framer-input-icon-image`, e.IconMaskImage = `--framer-input-icon-mask-image`, e.IconColor = `--framer-input-icon-color`, e.IconContent = `--framer-input-icon-content`, e.WrapperHeight = `--framer-input-wrapper-height`, e))(jy || {}), X = jy, My = `framer-form-input`, Ny = `framer-form-input-wrapper`, Py = `framer-form-input-empty`, Fy = `framer-form-input-forced-focus`, Z = (() => {
      function e(e, t) { let n = ` `; for (let e in t) { let r = t[e];
            V(r !== void 0, "Encountered `undefined` in CSSDeclaration"), n += `${e.replace(/([A-Z])/gu,`-$1`).toLowerCase()}: ${za(r)}; ` } return e + ` {` + n + `}` } return e.variable = (...e) => { let t = e[e.length - 1];
         V(t !== void 0, "Zero variables passed to `css.variable`"); let n = t.startsWith(`--`) ? `var(${t})` : t; for (let t = e.length - 2; t >= 0; t--) n = `var(${e[t]}, ${n})`; return n }, e })(), Iy = (() => [Z(`.${My}`, { padding: Z.variable(X.Padding), background: `transparent`, fontFamily: Z.variable(X.FontFamily), fontWeight: Z.variable(X.FontWeight), fontSize: Z.variable(X.FontSize), fontStyle: Z.variable(X.FontStyle), color: Z.variable(X.FontColor), fontFeatureSettings: Z.variable(X.FontOpenType), fontVariationSettings: Z.variable(X.FontVariationAxes), border: `none`, textOverflow: `ellipsis`, whiteSpace: `nowrap`, overflow: `hidden`, width: `100%`, height: Z.variable(X.WrapperHeight, `100%`), letterSpacing: Z.variable(X.FontLetterSpacing), textAlign: Z.variable(X.FontTextAlignment), lineHeight: Z.variable(X.FontLineHeight) }), Z(`.${My}:focus-visible`, { outline: `none` })])(), Ly = (() => [Z(`.${Ny}`, { overflow: `hidden` })])(), Ry = `var(${X.BorderTopWidth}) var(${X.BorderRightWidth}) var(${X.BorderBottomWidth}) var(${X.BorderLeftWidth})`, zy = (() => [`.${Ny}:after {
        content: "";
        pointer-events: none;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-top-left-radius: var(${X.BorderRadiusTopLeft});
        border-top-right-radius: var(${X.BorderRadiusTopRight});
        border-bottom-right-radius: var(${X.BorderRadiusBottomRight});
        border-bottom-left-radius: var(${X.BorderRadiusBottomLeft});
        corner-shape: var(${X.CornerShape});
        border-color: var(${X.BorderColor});
        border-top-width: var(${X.BorderTopWidth});
        border-right-width: var(${X.BorderRightWidth});
        border-bottom-width: var(${X.BorderBottomWidth});
        border-left-width: var(${X.BorderLeftWidth});
        border-style: var(${X.BorderStyle});
        transition: var(${X.FocusedTransition});
        transition-property: border-color, border-width, border-style, border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius, corner-shape;
    }`])(), By = `customError`, Vy = `valid`, Hy = 10, Uy = 8, Wy = 16, Gy = (() => ({ backgroundRepeat: `no-repeat`, backgroundSize: `${Wy}px`, maskRepeat: `no-repeat`, maskSize: `${Wy}px`, backgroundColor: Z.variable(X.IconColor) }))(), Ky = (() => ({ content: ``, display: `block`, position: `absolute`, right: 0, top: 0, bottom: 0, width: `${Wy}px`, boxSizing: `content-box`, padding: Z.variable(X.Padding), border: `none`, pointerEvents: `none`, ...Gy }))(), qy = { display: `flex`, flexDirection: `column`, justifyContent: `flex-start` }, Jy = { display: `inline-block` }, Yy = { display: `block` }, Xy = (() => [`
        [data-framer-component-type="RichTextContainer"] {
            display: ${qy.display};
            flex-direction: ${qy.flexDirection};
            justify-content: ${qy.justifyContent};
            outline: none;
            flex-shrink: 0;
        }
    `, `
        p.framer-text,
        div.framer-text,
        figure.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        ol.framer-text,
        ul.framer-text {
            margin: 0;
            padding: 0;
        }
    `, `
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text,
        mark.framer-text,
        span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
            font-style: var(--framer-font-style-preview, var(--framer-blockquote-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-font-weight-preview, var(--framer-blockquote-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
            text-transform: var(--framer-blockquote-text-transform, var(--framer-text-transform, none));
            text-decoration-line: var(--framer-blockquote-text-decoration, var(--framer-text-decoration, initial));
            text-decoration-style: var(--framer-blockquote-text-decoration-style, var(--framer-text-decoration-style, initial));
            text-decoration-color: var(--framer-blockquote-text-decoration-color, var(--framer-text-decoration-color, initial));
            text-decoration-thickness: var(--framer-blockquote-text-decoration-thickness, var(--framer-text-decoration-thickness, initial));
            text-decoration-skip-ink: var(--framer-blockquote-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial));
            text-underline-offset: var(--framer-blockquote-text-decoration-offset, var(--framer-text-decoration-offset, initial));
            line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
            text-align: var(--framer-blockquote-text-alignment, var(--framer-text-alignment, start));
            -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
            -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
            -moz-font-feature-settings: var(--framer-font-open-type-features, initial);
            -webkit-font-feature-settings: var(--framer-font-open-type-features, initial);
            font-feature-settings: var(--framer-font-open-type-features, initial);
            font-variation-settings: var(--framer-font-variation-axes-preview, var(--framer-font-variation-axes, normal));
            text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));
        }
    `, `
        mark.framer-text,
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text {
            background-color: var(--framer-blockquote-text-background-color, var(--framer-text-background-color, initial));
            border-radius: var(--framer-blockquote-text-background-radius, var(--framer-text-background-radius, initial));
            corner-shape: var(--framer-blockquote-text-background-corner-shape, var(--framer-text-background-corner-shape, initial));
            padding: var(--framer-blockquote-text-background-padding, var(--framer-text-background-padding, initial));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            p.framer-text,
            div.framer-text,
            h1.framer-text,
            h2.framer-text,
            h3.framer-text,
            h4.framer-text,
            h5.framer-text,
            h6.framer-text,
            li.framer-text,
            ol.framer-text,
            ul.framer-text,
            span.framer-text:not([data-text-fill]) {
                color: ${Ua([`--framer-blockquote-text-color`,`--framer-text-color`],`#000`)};
                -webkit-text-stroke-color: ${Ua([`--framer-text-stroke-color`],`initial`)};
            }

            mark.framer-text {
                background-color: ${Ua([`--framer-blockquote-text-background-color`,`--framer-text-background-color`],`initial`)};
            }
        }
    `, `
        .framer-fit-text .framer-text {
            white-space: nowrap;
            white-space-collapse: preserve;
        }
    `, `
        strong.framer-text {
            font-family: var(--framer-blockquote-font-family-bold, var(--framer-font-family-bold));
            font-style: var(--framer-blockquote-font-style-bold, var(--framer-font-style-bold));
            font-weight: var(--framer-blockquote-font-weight-bold, var(--framer-font-weight-bold, bolder));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-bold, var(--framer-font-variation-axes-bold));
        }
    `, `
        em.framer-text {
            font-family: var(--framer-blockquote-font-family-italic, var(--framer-font-family-italic));
            font-style: var(--framer-blockquote-font-style-italic, var(--framer-font-style-italic, italic));
            font-weight: var(--framer-blockquote-font-weight-italic, var(--framer-font-weight-italic));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-italic, var(--framer-font-variation-axes-italic));
        }
    `, `
        em.framer-text > strong.framer-text {
            font-family: var(--framer-blockquote-font-family-bold-italic, var(--framer-font-family-bold-italic));
            font-style: var(--framer-blockquote-font-style-bold-italic, var(--framer-font-style-bold-italic, italic));
            font-weight: var(--framer-blockquote-font-weight-bold-italic, var(--framer-font-weight-bold-italic, bolder));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-bold-italic, var(--framer-font-variation-axes-bold-italic));
        }
    `, `
        p.framer-text:not(:first-child),
        div.framer-text:not(:first-child),
        h1.framer-text:not(:first-child),
        h2.framer-text:not(:first-child),
        h3.framer-text:not(:first-child),
        h4.framer-text:not(:first-child),
        h5.framer-text:not(:first-child),
        h6.framer-text:not(:first-child),
        ol.framer-text:not(:first-child),
        ul.framer-text:not(:first-child),
        blockquote.framer-text:not(:first-child),
        table.framer-text:not(:first-child),
        figure.framer-text:not(:first-child),
        .framer-image.framer-text:not(:first-child) {
            margin-top: var(--framer-blockquote-paragraph-spacing, var(--framer-paragraph-spacing, 0));
        }
    `, `
        li.framer-text > ul.framer-text:nth-child(2),
        li.framer-text > ol.framer-text:nth-child(2) {
            margin-top: 0;
        }
    `, `
        .framer-text[data-text-fill] {
            display: ${Jy.display};
            background-clip: text;
            -webkit-background-clip: text;
            /* make this a transparent color if you want to visualise the clipping  */
            -webkit-text-fill-color: transparent;
            padding: max(0em, calc(calc(1.3em - var(--framer-blockquote-line-height, var(--framer-line-height, 1.3em))) / 2));
            margin: min(0em, calc(calc(1.3em - var(--framer-blockquote-line-height, var(--framer-line-height, 1.3em))) / -2));
        }
    `, `
        code.framer-text,
        code.framer-text span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-blockquote-font-style, var(--framer-code-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-blockquote-font-weight, var(--framer-code-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-blockquote-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
            line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text,
            code.framer-text span.framer-text:not([data-text-fill]) {
                color: ${Ua([`--framer-blockquote-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
            }
        }
    `, `
        blockquote.framer-text {
            margin-block-start: initial;
            margin-block-end: initial;
            margin-inline-start: initial;
            margin-inline-end: initial;
            unicode-bidi: initial;
        }
    `, `
        a.framer-text,
        a.framer-text span.framer-text:not([data-text-fill]),
        span.framer-text[data-nested-link],
        span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
            /* Ensure the color is inherited from the link style rather than the parent text for nested spans */
            color: inherit;
            font-family: var(--framer-font-family-preview, var(--framer-blockquote-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
            font-style: var(--framer-font-style-preview, var(--framer-blockquote-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
            font-weight: var(--framer-font-weight-preview, var(--framer-blockquote-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-blockquote-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
            /* Cursor inherit to overwrite the user agent stylesheet on rich text links. */
            cursor: var(--framer-custom-cursors, pointer);
            /* Don't inherit background styles from any parent text style. */
            background-color: initial;
            border-radius: var(--framer-link-text-background-radius, initial);
            corner-shape: var(--framer-link-text-background-corner-shape, initial);
            padding: var(--framer-link-text-background-padding, initial);
        }
    `, `
        a.framer-text,
        span.framer-text[data-nested-link] {
            color: var(--framer-blockquote-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
            text-decoration-line: var(--framer-blockquote-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial)));
            text-decoration-style: var(--framer-blockquote-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial)));
            text-decoration-color: var(--framer-blockquote-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial)));
            text-decoration-thickness: var(--framer-blockquote-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial)));
            text-decoration-skip-ink: var(--framer-blockquote-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial)));
            text-underline-offset: var(--framer-blockquote-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial)));
            /* Don't inherit background styles from any parent text style. */
            background-color: var(--framer-link-text-background-color, initial);
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text,
            span.framer-text[data-nested-link] {
                color: ${Ua([`--framer-blockquote-text-color`,`--framer-link-text-color`,`--framer-text-color`],`#000`)};
                background-color: ${Ua([`--framer-link-text-background-color`],`initial`)};
                text-decoration-color: ${Ua([`--framer-link-text-decoration-color`,`--framer-text-decoration-color`],`currentcolor`)};
            }
        }
    `, `
    code.framer-text a.framer-text,
    code.framer-text a.framer-text span.framer-text:not([data-text-fill]),
    code.framer-text span.framer-text[data-nested-link],
    code.framer-text span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
        font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
        font-style: var(--framer-blockquote-font-style, var(--framer-code-font-style, var(--framer-font-style, normal)));
        font-weight: var(--framer-blockquote-font-weight, var(--framer-code-font-weight, var(--framer-font-weight, 400)));
        color: inherit;
        font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
    }
`, `
    code.framer-text a.framer-text,
    code.framer-text span.framer-text[data-nested-link] {
        color: var(--framer-blockquote-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
    }
`, `
    @supports not (color: color(display-p3 1 1 1)) {
        code.framer-text a.framer-text,
        code.framer-text a.framer-text span.framer-text:not([data-text-fill]),
        code.framer-text span.framer-text[data-nested-link],
        code.framer-text span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
            color: ${Ua([`--framer-blockquote-text-color`,`--framer-link-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
        }
    }
`, `
        a.framer-text:hover,
        a.framer-text:hover span.framer-text:not([data-text-fill]),
        span.framer-text[data-nested-link]:hover,
        span.framer-text[data-nested-link]:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-link-hover-font-family, var(--framer-blockquote-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)))));
            font-style: var(--framer-font-style-preview, var(--framer-link-hover-font-style, var(--framer-blockquote-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-hover-font-weight, var(--framer-blockquote-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-blockquote-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-blockquote-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
            border-radius: var(--framer-link-hover-text-background-radius, var(--framer-link-text-background-radius, var(--framer-text-background-radius, initial)));
            corner-shape: var(--framer-link-hover-text-background-corner-shape, var(--framer-link-text-background-corner-shape, var(--framer-text-background-corner-shape, initial)));
            padding: var(--framer-link-hover-text-background-padding, var(--framer-link-text-background-padding, var(--framer-text-background-padding, initial)));
        }
    `, `
        a.framer-text:hover,
        span.framer-text[data-nested-link]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-blockquote-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
            text-decoration-line: var(--framer-link-hover-text-decoration, var(--framer-blockquote-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial))));
            text-decoration-style: var(--framer-link-hover-text-decoration-style, var(--framer-blockquote-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial))));
            text-decoration-color: var(--framer-link-hover-text-decoration-color, var(--framer-blockquote-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial))));
            text-decoration-thickness: var(--framer-link-hover-text-decoration-thickness, var(--framer-blockquote-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial))));
            text-decoration-skip-ink: var(--framer-link-hover-text-decoration-skip-ink, var(--framer-blockquote-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial))));
            text-underline-offset: var(--framer-link-hover-text-decoration-offset, var(--framer-blockquote-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial))));
            background-color: var(--framer-link-hover-text-background-color, var(--framer-link-text-background-color, var(--framer-text-background-color, initial)));
        }
    `, `
    @supports not (color: color(display-p3 1 1 1)) {
        a.framer-text:hover,
        span.framer-text[data-nested-link]:hover {
            color: ${Ua([`--framer-link-hover-text-color`,`--framer-blockquote-text-color`,`--framer-link-text-color`,`--framer-text-color`],`#000`)};
            background-color: ${Ua([`--framer-link-hover-text-background-color`,`--framer-link-text-background-color`,`--framer-text-background-color`],`initial`)};
            text-decoration-color: ${Ua([`--framer-link-hover-text-decoration-color`,`--framer-link-text-decoration-color`,`--framer-text-decoration-color`],`currentcolor`)};
        }
    }
    `, `
        code.framer-text a.framer-text:hover,
        code.framer-text span.framer-text[data-nested-link]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-blockquote-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)))));
        }
    `, `
    @supports not (color: color(display-p3 1 1 1)) {
        code.framer-text a.framer-text:hover,
        code.framer-text span.framer-text[data-nested-link]:hover {
            color: ${Ua([`--framer-link-hover-text-color`,`--framer-blockquote-text-color`,`--framer-link-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
        }
    }
   `, `
        a.framer-text[data-framer-page-link-current],
        a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
        span.framer-text[data-framer-page-link-current],
        span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
            font-style: var(--framer-font-style-preview, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
            border-radius: var(--framer-link-current-text-background-radius, var(--framer-link-text-background-radius, initial));
            corner-shape: var(--framer-link-current-text-background-corner-shape, var(--framer-link-text-background-corner-shape, initial));
            padding: var(--framer-link-current-text-background-padding, var(--framer-link-text-background-padding, initial));
        }
    `, `
        a.framer-text[data-framer-page-link-current],
        span.framer-text[data-framer-page-link-current] {
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
            text-decoration-line: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial)));
            text-decoration-style: var(--framer-link-current-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial)));
            text-decoration-color: var(--framer-link-current-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial)));
            text-decoration-thickness: var(--framer-link-current-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial)));
            text-decoration-skip-ink: var(--framer-link-current-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial)));
            text-underline-offset: var(--framer-link-current-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial)));
            background-color: var(--framer-link-current-text-background-color, var(--framer-link-text-background-color, var(--framer-text-background-color, initial)));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text[data-framer-page-link-current],
            span.framer-text[data-framer-page-link-current]{
                color: ${Ua([`--framer-link-current-text-color`,`--framer-link-text-color`,`--framer-text-color`],`#000`)};
                background-color: ${Ua([`--framer-link-current-text-background-color`,`--framer-link-text-background-color`,`--framer-text-background-color`],`initial`)};
                text-decoration-color: ${Ua([`--framer-link-current-text-decoration-color`,`--framer-link-text-decoration-color`,`--framer-text-decoration-color`],`currentcolor`)};
            }
        }
    `, `
        code.framer-text a.framer-text[data-framer-page-link-current],
        code.framer-text a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
        code.framer-text span.framer-text[data-framer-page-link-current],
        code.framer-text span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: inherit;
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
        }
    `, `
        code.framer-text a.framer-text[data-framer-page-link-current],
        code.framer-text span.framer-text[data-framer-page-link-current] {
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text a.framer-text[data-framer-page-link-current],
            code.framer-text a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
            code.framer-text span.framer-text[data-framer-page-link-current],
            code.framer-text span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
                color: ${Ua([`--framer-link-current-text-color`,`--framer-link-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
                background-color: ${Ua([`--framer-link-current-text-background-color`,`--framer-link-text-background-color`,`--framer-text-background-color`],`initial`)};
            }
        }
    `, `
        a.framer-text[data-framer-page-link-current]:hover,
        a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]),
        span.framer-text[data-framer-page-link-current]:hover,
        span.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
            color: inherit;
            font-family: var(--framer-font-family-preview, var(--framer-link-hover-font-family, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)))));
            font-style: var(--framer-font-style-preview, var(--framer-link-hover-font-style, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-hover-font-weight, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
            border-radius: var(--framer-link-hover-text-background-radius, var(--framer-link-current-text-background-radius, var(--framer-link-text-background-radius, initial)));
            corner-shape: var(--framer-link-hover-text-background-corner-shape, var(--framer-link-current-text-background-corner-shape, var(--framer-link-text-background-corner-shape, initial)));
            padding: var(--framer-link-hover-text-background-padding, var(--framer-link-current-text-background-padding, var(--framer-link-text-background-padding, initial)));
        }
    `, `
        a.framer-text[data-framer-page-link-current]:hover,
        span.framer-text[data-framer-page-link-current]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
            text-decoration-line: var(--framer-link-hover-text-decoration, var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial))));
            text-decoration-style: var(--framer-link-hover-text-decoration-style, var(--framer-link-current-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial))));
            text-decoration-color: var(--framer-link-hover-text-decoration-color, var(--framer-link-current-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial))));
            text-decoration-thickness: var(--framer-link-hover-text-decoration-thickness, var(--framer-link-current-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial))));
            text-decoration-skip-ink: var(--framer-link-hover-text-decoration-skip-ink, var(--framer-link-current-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial))));
            text-underline-offset: var(--framer-link-hover-text-decoration-offset, var(--framer-link-current-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial))));
            background-color: var(--framer-link-hover-text-background-color, var(--framer-link-current-text-background-color, var(--framer-link-text-background-color, initial)));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text[data-framer-page-link-current]:hover,
            span.framer-text[data-framer-page-link-current]:hover {
                color: ${Ua([`--framer-link-hover-text-color`,`--framer-link-current-text-color`,`--framer-link-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
                background-color: ${Ua([`--framer-link-hover-text-background-color`,`--framer-link-current-text-background-color`,`--framer-link-text-background-color`],`initial`)};
                text-decoration-color: ${Ua([`--framer-link-hover-text-decoration-color`,`--framer-link-current-text-decoration-color`,`--framer-link-text-decoration-color`,`--framer-text-decoration-color`],`currentcolor`)};
            }
        }
    `, `
        code.framer-text a.framer-text[data-framer-page-link-current]:hover,
        code.framer-text span.framer-text[data-framer-page-link-current]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)))));
        }
    `, `
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text a.framer-text[data-framer-page-link-current]:hover,
            code.framer-text a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]),
            code.framer-text span.framer-text[data-framer-page-link-current]:hover,
            code.framer-text span.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
                color: ${Ua([`--framer-link-hover-text-color`,`--framer-link-current-text-color`,`--framer-link-text-color`,`--framer-code-text-color`,`--framer-text-color`],`#000`)};
                background-color: ${Ua([`--framer-link-hover-text-background-color`,`--framer-link-current-text-background-color`,`--framer-link-text-background-color`],`initial`)};
            }
        }
    `, `
        .framer-image.framer-text {
            display: ${Yy.display};
            max-width: 100%;
            height: auto;
        }
    `, `
        .text-styles-preset-reset.framer-text {
            --framer-font-family: Inter, Inter Placeholder, sans-serif;
            --framer-font-style: normal;
            --framer-font-weight: 500;
            --framer-text-color: #000;
            --framer-font-size: 16px;
            --framer-letter-spacing: 0;
            --framer-text-transform: none;
            --framer-text-decoration: none;
            --framer-text-decoration-style: none;
            --framer-text-decoration-color: none;
            --framer-text-decoration-thickness: none;
            --framer-text-decoration-skip-ink: none;
            --framer-text-decoration-offset: none;
            --framer-line-height: 1.2em;
            --framer-text-alignment: start;
            --framer-font-open-type-features: normal;
            --framer-text-background-color: initial;
            --framer-text-background-radius: initial;
            --framer-text-background-corner-shape: initial;
            --framer-text-background-padding: initial;
        }
    `, `
        ol.framer-text {
            --list-style-type: decimal;
        }
    `, `
        ul.framer-text,
        ol.framer-text {
            padding-inline-start: 0;
            position: relative;
        }
    `, `
        li.framer-text {
            counter-increment: list-item;
            list-style: none;
            padding-inline-start: 2ch;
        }
    `, `
        ol.framer-text > li.framer-text::before {
            position: absolute;
            inset-inline-start: 0;
            content: counter(list-item, var(--list-style-type)) ".";
            font-variant-numeric: tabular-nums;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 10),
        ol.framer-text > li.framer-text:nth-last-child(n + 10) ~ li {
            padding-inline-start: 3ch;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 100),
        ol.framer-text > li.framer-text:nth-last-child(n + 100) ~ li {
            padding-inline-start: 4ch;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 1000),
        ol.framer-text > li.framer-text:nth-last-child(n + 1000) ~ li {
            padding-inline-start: 5ch;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 10000),
        ol.framer-text > li.framer-text:nth-last-child(n + 10000) ~ li {
            padding-inline-start: 6ch;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 100000),
        ol.framer-text > li.framer-text:nth-last-child(n + 100000) ~ li {
            padding-inline-start: 7ch;
        }
    `, `
        ol.framer-text > li.framer-text:nth-last-child(n + 1000000),
        ol.framer-text > li.framer-text:nth-last-child(n + 1000000) ~ li {
            padding-inline-start: 8ch;
        }
    `, `
        ul.framer-text > li.framer-text::before {
            position: absolute;
            inset-inline-start: 0;
            content: "•";
        }
    `, `
        .framer-table-wrapper {
            overflow-x: auto;
        }
    `, `
        table.framer-text,
        .framer-table-wrapper table.framer-text {
            border-collapse: separate;
            border-spacing: 0;
            table-layout: auto;
            word-break: normal;
            width: 100%;
        }
    `, `
        td.framer-text,
        th.framer-text {
            min-width: 16ch;
            vertical-align: top;
        }
    `, `
        ${Wa(`.framer-text-module[data-width="fill"]`,`:first-child`)},
        ${Wa(`.framer-text-module:not([data-width="fit"])[style*="aspect-ratio"]`,`:first-child`)} {
            width: 100% !important;
        }
    `, `
        @supports not (aspect-ratio: 1) {
            .framer-text-module:not([data-width="fit"])[style*="aspect-ratio"] {
                position: relative !important;
            }
        }
    `, `
        @supports not (aspect-ratio: 1) {
            .framer-text-module:not([data-width="fit"])[style*="aspect-ratio"]::before {
                content: "";
                display: block;
                padding-bottom: calc(100% / calc(var(--aspect-ratio)));
            }
        }
    `, `
        @supports not (aspect-ratio: 1) {
            ${Wa(`.framer-text-module[data-width="fill"]`,`:first-child`)},
            ${Wa(`.framer-text-module:not([data-width="fit"])[style*="aspect-ratio"]`,`:first-child`)} {
                position: absolute;
                top: 0;
                left: 0;
                height: 100% !important;
            }
        }
    `])(), Zy = `--text-truncation-display-inline-for-safari-16`, Qy = `--text-truncation-display-none-for-safari-16`, $y = `--text-truncation-line-break-for-safari-16`, eb = [`div.framer-text`, `p.framer-text`, `h1.framer-text`, `h2.framer-text`, `h3.framer-text`, `h4.framer-text`, `h5.framer-text`, `h6.framer-text`, `ol.framer-text`, `ul.framer-text`, `li.framer-text`, `blockquote.framer-text`, `.framer-text.framer-image`], tb = `(background: -webkit-named-image(i))`, nb = `(contain-intrinsic-size: inherit)`, rb = (() => [`@supports ${tb} and (not ${nb}) {
        /* Render block-like elements inline when text is truncated, otherwise default to user agent (revert)  */
        ${eb.join(`, `)} { display: var(${Zy}, revert) }

        /* Add a line break after each block-like element that we render inline, to resemble the block-like behavior */
        ${eb.map(e=>`${e}::after`).join(`, `)} { content: var(${$y}); white-space: pre; }

        /* Don't render modules (e.g. videos, code-blocks), or tables when text is truncated, because often these can't be truncated and their children might be block elements */
        .framer-text.framer-text-module,
        .framer-text.framer-table-wrapper { display: var(${Qy}, revert) }

        /* Render text-fill elements inline when text is truncated, otherwise default to their default value (e.g. inline-block) */
        p.framer-text[data-text-fill] { display: var(${Zy}, ${Jy.display}) }
    }`])(), ib = [`[data-framer-component-type] { position: absolute; }`], ab = [`[data-framer-component-type="Text"] { cursor: inherit; }`, `[data-framer-component-text-autosized] * { white-space: pre; }`, `
[data-framer-component-type="Text"] > * {
    text-align: var(--framer-text-alignment, start);
}`, `
[data-framer-component-type="Text"] span span,
[data-framer-component-type="Text"] p span,
[data-framer-component-type="Text"] h1 span,
[data-framer-component-type="Text"] h2 span,
[data-framer-component-type="Text"] h3 span,
[data-framer-component-type="Text"] h4 span,
[data-framer-component-type="Text"] h5 span,
[data-framer-component-type="Text"] h6 span {
    display: block;
}`, `
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span {
    display: unset;
}`, `
[data-framer-component-type="Text"] div div span,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span,
[data-framer-component-type="Text"] a {
    font-family: var(--font-family);
    font-style: var(--font-style);
    font-weight: min(calc(var(--framer-font-weight-increase, 0) + var(--font-weight, 400)), 900);
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    font-size: var(--font-size);
    text-transform: var(--text-transform);
    --text-decoration: var(--framer-text-decoration-style, solid) var(--framer-text-decoration, none) var(--framer-text-decoration-color, currentcolor) var(--framer-text-decoration-thickness, auto);
    --text-decoration-skip-ink: var(--framer-text-decoration-skip-ink);
    --text-underline-offset: var(--framer-text-decoration-offset);
    line-height: var(--line-height);
}`, `
[data-framer-component-type="Text"] div div span,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] span span span,
[data-framer-component-type="Text"] p span span,
[data-framer-component-type="Text"] h1 span span,
[data-framer-component-type="Text"] h2 span span,
[data-framer-component-type="Text"] h3 span span,
[data-framer-component-type="Text"] h4 span span,
[data-framer-component-type="Text"] h5 span span,
[data-framer-component-type="Text"] h6 span span,
[data-framer-component-type="Text"] a {
    --font-family: var(--framer-font-family);
    --font-style: var(--framer-font-style);
    --font-weight: var(--framer-font-weight);
    --text-color: var(--framer-text-color);
    --letter-spacing: var(--framer-letter-spacing);
    --font-size: var(--framer-font-size);
    --text-transform: var(--framer-text-transform);
    --text-decoration: var(--framer-text-decoration-style, solid) var(--framer-text-decoration, none) var(--framer-text-decoration-color, currentcolor) var(--framer-text-decoration-thickness, auto);
    --text-decoration-skip-ink: var(--framer-text-decoration-skip-ink);
    --text-underline-offset: var(--framer-text-decoration-offset);
    --line-height: var(--framer-line-height);
}`, `
[data-framer-component-type="Text"] a,
[data-framer-component-type="Text"] a div span,
[data-framer-component-type="Text"] a span span span,
[data-framer-component-type="Text"] a p span span,
[data-framer-component-type="Text"] a h1 span span,
[data-framer-component-type="Text"] a h2 span span,
[data-framer-component-type="Text"] a h3 span span,
[data-framer-component-type="Text"] a h4 span span,
[data-framer-component-type="Text"] a h5 span span,
[data-framer-component-type="Text"] a h6 span span {
    --font-family: var(--framer-link-font-family, var(--framer-font-family));
    --font-style: var(--framer-link-font-style, var(--framer-font-style));
    --font-weight: var(--framer-link-font-weight, var(--framer-font-weight));
    --text-color: var(--framer-link-text-color, var(--framer-text-color));
    --font-size: var(--framer-link-font-size, var(--framer-font-size));
    --text-transform: var(--framer-link-text-transform, var(--framer-text-transform));
    --text-decoration: var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, solid)) var(--framer-link-text-decoration, var(--framer-text-decoration, none)) var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, currentcolor)) var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, auto));
    --text-decoration-skip-ink: var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink));
    --text-underline-offset: var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset));
}`, `
[data-framer-component-type="Text"] a:hover,
[data-framer-component-type="Text"] a div span:hover,
[data-framer-component-type="Text"] a span span span:hover,
[data-framer-component-type="Text"] a p span span:hover,
[data-framer-component-type="Text"] a h1 span span:hover,
[data-framer-component-type="Text"] a h2 span span:hover,
[data-framer-component-type="Text"] a h3 span span:hover,
[data-framer-component-type="Text"] a h4 span span:hover,
[data-framer-component-type="Text"] a h5 span span:hover,
[data-framer-component-type="Text"] a h6 span span:hover {
    --font-family: var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-font-family)));
    --font-style: var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-font-style)));
    --font-weight: var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-font-weight)));
    --text-color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-text-color)));
    --font-size: var(--framer-link-hover-font-size, var(--framer-link-font-size, var(--framer-font-size)));
    --text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-text-transform)));
    --text-decoration: var(--framer-link-hover-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, solid))) var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none))) var(--framer-link-hover-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, currentcolor))) var(--framer-link-hover-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, auto)));
    --text-decoration-skip-ink: var(--framer-link-hover-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink)));
    --text-underline-offset: var(--framer-link-hover-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset)));
}`, `
[data-framer-component-type="Text"].isCurrent a,
[data-framer-component-type="Text"].isCurrent a div span,
[data-framer-component-type="Text"].isCurrent a span span span,
[data-framer-component-type="Text"].isCurrent a p span span,
[data-framer-component-type="Text"].isCurrent a h1 span span,
[data-framer-component-type="Text"].isCurrent a h2 span span,
[data-framer-component-type="Text"].isCurrent a h3 span span,
[data-framer-component-type="Text"].isCurrent a h4 span span,
[data-framer-component-type="Text"].isCurrent a h5 span span,
[data-framer-component-type="Text"].isCurrent a h6 span span {
    --font-family: var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family)));
    --font-style: var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style)));
    --font-weight: var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight)));
    --text-color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color)));
    --font-size: var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size)));
    --text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform)));
    --text-decoration: var(--framer-link-current-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, solid))) var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, none))) var(--framer-link-current-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, currentcolor))) var(--framer-link-current-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, auto)));
    --text-decoration-skip-ink: var(--framer-link-current-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink)));
    --text-underline-offset: var(--framer-link-current-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset)));
}`], ob = `
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > *,
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-component-type],
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-legacy-stack-gap-enabled] > *,
:not([data-framer-generated]) > [data-framer-stack-content-wrapper] > [data-framer-legacy-stack-gap-enabled] > [data-framer-component-type] {
    position: relative;
}`, sb = (() => [`[data-framer-stack-content-wrapper][data-framer-stack-gap-enabled="true"] {
        row-gap: var(--stack-native-row-gap);
        column-gap: var(--stack-native-column-gap);
    }`, `.${Oy} [data-framer-stack-content-wrapper][data-framer-stack-gap-enabled="true"] {
        row-gap: unset;
        column-gap: unset;
    }`])(), cb = (() => `
.${Oy} [data-framer-legacy-stack-gap-enabled="true"] > *, [data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"] {
    margin-top: calc(var(--stack-gap-y) / 2);
    margin-bottom: calc(var(--stack-gap-y) / 2);
    margin-right: calc(var(--stack-gap-x) / 2);
    margin-left: calc(var(--stack-gap-x) / 2);
}
`)(), lb = (() => `
.${Oy}
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:first-child,
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:first-child,
.${Oy}
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:last-child,
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:last-child {
    margin-top: 0;
    margin-left: 0;
}`)(), ub = (() => `
.${Oy}
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:last-child,
[data-framer-stack-direction-reverse="false"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:last-child,
.${Oy}
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"]
> *:first-child,
[data-framer-stack-direction-reverse="true"]
[data-framer-legacy-stack-gap-enabled="true"][data-framer-stack-flexbox-gap="false"]
> *:first-child {
    margin-right: 0;
    margin-bottom: 0;
}`)(), db = (() => [ob, cb, ...sb, lb, ub])(), fb = [`
NavigationContainer
[data-framer-component-type="NavigationContainer"] > *,
[data-framer-component-type="NavigationContainer"] > [data-framer-component-type] {
    position: relative;
}`], pb = [`[data-framer-component-type="Scroll"]::-webkit-scrollbar { display: none; }`, `[data-framer-component-type="ScrollContentWrapper"] > * { position: relative; }`], mb = [`[data-framer-component-type="NativeScroll"] { -webkit-overflow-scrolling: touch; }`, `[data-framer-component-type="NativeScroll"] > * { position: relative; }`, `[data-framer-component-type="NativeScroll"].direction-both { overflow-x: auto; overflow-y: auto; }`, `[data-framer-component-type="NativeScroll"].direction-vertical { overflow-x: hidden; overflow-y: auto; }`, `[data-framer-component-type="NativeScroll"].direction-horizontal { overflow-x: auto; overflow-y: hidden; }`, `[data-framer-component-type="NativeScroll"].direction-vertical > * { width: 100% !important; }`, `[data-framer-component-type="NativeScroll"].direction-horizontal > * { height: 100% !important; }`, `[data-framer-component-type="NativeScroll"].scrollbar-hidden::-webkit-scrollbar { display: none; }`], hb = [`[data-framer-component-type="DeviceComponent"].no-device > * { width: 100% !important; height: 100% !important; }`], gb = [`[data-framer-component-type="PageContentWrapper"] > *, [data-framer-component-type="PageContentWrapper"] > [data-framer-component-type] { position: relative; }`], _b = [`[data-is-present="false"], [data-is-present="false"] * { pointer-events: none !important; }`], vb = [`.framer-lightbox-container { opacity: 1 !important; pointer-events: auto !important; }`], yb = [`[data-framer-cursor="pointer"] { cursor: pointer; }`, `[data-framer-cursor="grab"] { cursor: grab; }`, `[data-framer-cursor="grab"]:active { cursor: grabbing; }`], bb = [`[data-framer-component-type="Frame"] *, [data-framer-component-type="Stack"] * { pointer-events: auto; }`, `[data-framer-generated] * { pointer-events: unset }`], xb = [`[data-reset="button"] {
        border-width: 0;
        padding: 0;
        background: none;
}`], Sb = [`[data-hide-scrollbars="true"]::-webkit-scrollbar { width: 0px; height: 0px; }`, `[data-hide-scrollbars="true"]::-webkit-scrollbar-thumb { background: transparent; }`, `[data-hide-scrollbars="true"] { scrollbar-width: none; }`], Cb = `--framer-will-change-override`, wb = `--framer-will-change-effect-override`, Tb = `--framer-will-change-filter-override`, Eb = `(background: -webkit-named-image(i))`, Db = `(grid-template-rows: subgrid)`, Ob = `(position-area: top right)`, kb = e => e ? [`body { ${Cb}: none; }`, `@supports ${Eb} and (not ${Db}) { body { ${Cb}: transform; } }`] : [`body { ${Cb}: none; ${wb}: none; }`], Ab = e => e ? [`body { ${Tb}: none; }`, `@supports ${Eb} and (not ${Ob}) { body { ${Tb}: filter; } }`] : [`body { ${Tb}: none; }`], jb = e => e ? bb : [], Mb = [`.svgContainer svg { display: block; }`], Nb = `--overflow-clip-fallback`, Pb = (() => [`@supports (not (overflow: clip)) {
        :root { ${Nb}: hidden; }
    }`])(), Fb = `--one-if-corner-shape-supported`, Ib = (() => [`@supports (corner-shape: superellipse(2)) { :root { ${Fb}: 1 } }`])(), Lb = e => [...kb(e), ...Ab(e), ...ib, ...ab, ...Xy, ...Ay, ...db, ...fb, ...pb, ...mb, ...gb, ...hb, ..._b, ...yb, ...jb(e), ...Mb, ...xb, ...Sb, ...Pb, ...vb, ...rb, ...Ib], Rb = Lb(!1), zb = Lb(!0), Bb = `optional`, Vb = e => e, Hb = /^(?:children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|[dkrxyz]|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y1|y2|yChannelSelector|zoomAndPan|for|class|autofocus|(?:[Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*)$/u, Ub = ro(e => Hb.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91), Wb = e => () => { $r(e) }, Gb = () => () => {}, Kb = { imagePlaceholderSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126"><path id="a" d="M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z" fill="rgb(136, 136, 136, 0.2)" fill-rule="evenodd"/></svg>`, useImageSource(e) { return e.src ?? `` }, useImageElement(e, t, n) { let r = Jb.useImageSource(e, t, n); return u(() => { let t = new Image; return t.src = r, e.srcSet && (t.srcset = e.srcSet), t }, [r, e.srcSet]) }, canRenderOptimizedCanvasImage() { return !1 }, isOnPageCanvas: !1 }, qb = !1, Jb = new Proxy(Kb, { get(e, t, n) { return Reflect.has(e, t) ? Reflect.get(e, t, n) : [`getLogger`].includes(String(t)) ? Gb() : Wb(qb ? `${String(t)} is not available in this version of Framer.` : `${String(t)} is only available inside of Framer. https://www.framer.com/`) } }), Yb = { borderRadius: `inherit`, cornerShape: `inherit` }, Xb = [1, 2, 2.2], Zb = [512, 1024, 2048, 4096], Qb = 512, $b = (() => ({ position: `absolute`, ...Yb, top: 0, right: 0, bottom: 0, left: 0 }))(), ex = `src`, tx = { isImageObject: function(e) { return !e || typeof e == `string` ? !1 : typeof e == `object` && ex in e } }, nx = Da(), rx = typeof document < `u` ? m : o, ix = j.createContext(!1), ax = class { constructor() { L(this, `sharedResizeObserver`), L(this, `callbacks`, new WeakMap), this.sharedResizeObserver = new ResizeObserver(this.updateResizedElements.bind(this)) } updateResizedElements(e) { for (let t of e) { let e = this.callbacks.get(t.target);
            e && e(t.contentRect) } } observeElementWithCallback(e, t) { this.sharedResizeObserver.observe(e), this.callbacks.set(e, t) } unobserve(e) { this.sharedResizeObserver.unobserve(e), this.callbacks.delete(e) } }, ox = (() => Aa() ? new ax : void 0)(), sx = `data-framer-size-compatibility-wrapper`, cx = `0.000001px`, lx = (() => ` translateZ(${cx})`)(), ux = (() => ja() || Oa() || Ma())(), dx = (() => { class e extends x { constructor() { super(...arguments), L(this, `layerElement`, null), L(this, `setLayerElement`, e => { this.layerElement = e }) } static applyWillChange(e, t, n) { e.willChangeTransform && (n ? Ro(t) : zo(t)) } shouldComponentUpdate(e, t) { return e._needsMeasure || this.state !== t || !Et(this.props, e) } componentDidUpdate(e) { Vb(this.props).clip && Vb(this.props).radius === 0 && Vb(e).radius !== 0 && Vo(this.layerElement, `overflow`, `hidden`, !1) } } return L(e, `defaultProps`, {}), e })(), fx = e => { let t = 0,
         n, r; if (e.length === 0) return t; for (n = 0; n < e.length; n++) r = e.charCodeAt(n), t = (t << 5) - t + r, t |= 0; return t }, px = { hueRotate: (e, t) => q.toHslString(q.hueRotate(q(e), t)), setAlpha: (e, t) => q.toRgbString(q.alpha(q(e), t)), getAlpha: e => { let t = Ti(e); return t ? t.a : 1 }, multiplyAlpha: (e, t) => q.toRgbString(q.multiplyAlpha(q(e), t)), toHexValue: e => q.toHex(q(e)).toUpperCase(), toHex: e => q.toHexString(q(e)).toUpperCase(), toRgb: e => q.toRgb(q(e)), toRgbString: e => q.toRgbString(q(e)), toHSV: e => q.toHsv(q(e)), toHSL: e => q.toHsl(q(e)), toHslString: e => q.toHslString(q(e)), toHsvString: e => q.toHsvString(q(e)), hsvToHSLString: e => q.toHslString(q(pi(e.h, e.s, e.v, e.a))), hsvToHexValue: e => q.toHex(q(pi(e.h, e.s, e.v, e.a))).toUpperCase(), hsvToHex: e => q.toHexString(q(pi(e.h, e.s, e.v, e.a))).toUpperCase(), hsvToRgbString: e => q.toRgbString(q(pi(e.h, e.s, e.v, e.a))), hsvToString: e => pi(e.h, e.s, e.v), rgbaToString: e => q.toRgbString(q(e)), rgbToHexValue: e => q.toHex(q(e)), rgbToHexString: e => q.toHexString(q(e)), hslToString: e => q.toHslString(q(e)), hslToRgbString: e => q.toRgbString(q(e)), toColorPickerSquare: e => q.toRgbString(q({ h: e, s: 1, l: .5, a: 1 })), isValid: e => q(e).isValid !== !1, equals: (e, t) => q.isP3String(e) || q.isP3String(t) ? e === t : (typeof e == `string` && (e = q(e)), typeof t == `string` && (t = q(t)), q.equal(e, t)), toHexOrRgbaString: e => { let t = q(e); return t.a === 1 ? q.toHexString(t) : q.toRgbString(t) }, toFormatString: e => q.isP3String(e) ? e : q.toRgbString(q(e)) }, mx = /var\(.+\)/u, hx = new Map, gx = [`stops`], _x = [`start`, `end`], vx = [`angle`, `alpha`], yx = { isLinearGradient: e => B(e) && vx.every(t => t in e) && (Yo(e) || Jo(e)), hash: e => e.angle ^ qo(e, e.alpha), toCSS: (e, t, n) => { let r = Ko(e, e.alpha),
            i = t === void 0 ? e.angle : t; return `linear-gradient(${Math.round(i)}deg, ${r.map(e=>`${n?.(e.value)??e.value} ${e.position*100}%`).join(`, `)})` } }, bx = [`widthFactor`, `heightFactor`, `centerAnchorX`, `centerAnchorY`, `alpha`], xx = { isRadialGradient: e => B(e) && bx.every(t => t in e) && (Yo(e) || Jo(e)), hash: e => e.centerAnchorX ^ e.centerAnchorY ^ e.widthFactor ^ e.heightFactor ^ qo(e, e.alpha), toCSS: (e, t) => { let { alpha: n, widthFactor: r, heightFactor: i, centerAnchorX: a, centerAnchorY: o } = e, s = Ko(e, n), c = s.map((e, n) => { let r = s[n + 1],
               i = e.position === 1 && r?.position === 1 ? e.position - 1e-4 : e.position; return `${t?.(e.value)??e.value} ${i*100}%` }); return `radial-gradient(${r*100}% ${i*100}% at ${a*100}% ${o*100}%, ${c.join(`, `)})` } }, Sx = [`onClick`, `onDoubleClick`, `onMouse`, `onMouseDown`, `onMouseUp`, `onTapDown`, `onTap`, `onTapUp`, `onPointer`, `onPointerDown`, `onPointerUp`, `onTouch`, `onTouchDown`, `onTouchUp`], Cx = (() => new Set([...Sx, ...Sx.map(e => `${e}Capture`)]))(), wx = `overflow`, Tx = { x: 0, y: 0, width: 200, height: 200 }, Ex = new Set([`width`, `height`, `opacity`, `overflow`, `radius`, `background`, `color`, `x`, `y`, `z`, `rotate`, `rotateX`, `rotateY`, `rotateZ`, `scale`, `scaleX`, `scaleY`, `skew`, `skewX`, `skewY`, `originX`, `originY`, `originZ`]), Dx = A(function(e, n) { let { name: r, center: i, border: a, _border: o, __portal: s } = e, { props: c, children: u } = Oo(e), d = os(c), f = Ao(e), p = ts(e), m = t(null), h = n ?? m, g = { "data-framer-component-type": e.componentType ?? `Frame`, "data-framer-cursor": p, "data-framer-highlight": p === `pointer` ? !0 : void 0, "data-layoutid": f, "data-framer-offset-parent-id": Vb(e)[`data-framer-offset-parent-id`] };!ss(e) && r && (Vb(g)[`data-framer-name`] = r); let [_, v] = as(c), b = is(c), x = xa(b);
      i && !(v && !x && la(b)) ? (d.transformTemplate ||= ko(i), Object.assign(g, Eo(i))) : d.transformTemplate ||= void 0, Io(e, h); let S = So(e),
         C = cs(c, b, v, l(ix)),
         w = ya(ee(y, { children: [S ? E(vo, { alt: e.alt ?? ``, image: S, containerSize: v ?? void 0, nodeId: e.id && Do(e.id), layoutId: f }) : null, u, E(bo, { ...o, border: a, layoutId: f })] }), C),
         T = wo(e.as),
         D = Co(S); return e.fitImageDimension && D && (_[e.fitImageDimension] = `auto`, _.aspectRatio = D.width / D.height), ee(T, { ...g, ...d, layoutId: f, style: _, ref: h, children: [w, s] }) }), Ox = Ka(A(function(e, t) { let { visible: n = !0 } = e; return n ? E(Dx, { ...e, ref: t }) : null })), kx = `__LAYOUT_TREE_ROOT`, Ax = j.createContext({ schedulePromoteTree: () => {}, scheduleProjectionDidUpdate: () => {}, initLead: () => {} }), jx = class extends x { constructor() { super(...arguments), L(this, `shouldAnimate`, !1), L(this, `transition`), L(this, `lead`), L(this, `follow`), L(this, `scheduledPromotion`, !1), L(this, `scheduledDidUpdate`, !1), L(this, `scheduleProjectionDidUpdate`, () => { this.scheduledDidUpdate = !0 }), L(this, `schedulePromoteTree`, (e, t, n) => { this.follow = this.lead, this.shouldAnimate = n, this.lead = e, this.transition = t, this.scheduledPromotion = !0 }), L(this, `initLead`, (e, t) => { this.follow = this.lead, this.lead = e, this.follow && t && (this.follow.layoutMaybeMutated = !0) }), L(this, `sharedLayoutContext`, { schedulePromoteTree: this.schedulePromoteTree, scheduleProjectionDidUpdate: this.scheduleProjectionDidUpdate, initLead: this.initLead }) } getSnapshotBeforeUpdate() { if (!this.scheduledPromotion || !this.lead || !this.follow) return null; let e = this.lead?.layoutMaybeMutated && !this.shouldAnimate; return this.lead.projectionNodes.forEach(t => { t?.promote({ needsReset: e, transition: this.shouldAnimate ? this.transition : void 0, preserveFollowOpacity: t.options.layoutId === kx && !this.follow?.isExiting }) }), this.shouldAnimate ? this.follow.layoutMaybeMutated = !0 : this.scheduleProjectionDidUpdate(), this.lead.layoutMaybeMutated = !1, this.transition = void 0, this.scheduledPromotion = !1, null } componentDidUpdate() { if (!this.lead) return null;
         this.scheduledDidUpdate &&= (this.lead.rootProjectionNode?.root?.didUpdate(), !1) } render() { return E(Ax.Provider, { value: this.sharedLayoutContext, children: this.props.children }) } }, Mx = { width: `100%`, height: `100%`, backgroundColor: `none` }, Nx = class { constructor(e) { L(this, `sharedIntersectionObserver`), L(this, `callbacks`, new WeakMap), this.sharedIntersectionObserver = new IntersectionObserver(this.intersectionObserverCallback.bind(this), e) } intersectionObserverCallback(e, t) { for (let n of e) { let e = this.callbacks.get(n.target);
            e && e(n, t) } } observeElementWithCallback(e, t) { this.sharedIntersectionObserver && (this.sharedIntersectionObserver.observe(e), this.callbacks.set(e, t)) } unobserve(e) { this.sharedIntersectionObserver && (this.sharedIntersectionObserver.unobserve(e), this.callbacks.delete(e)) } get root() { return this.sharedIntersectionObserver?.root } }, Px = p(new Map), Fx = typeof IntersectionObserver > `u` ? mg : _s, Ix = Array(100).fill(void 0).map((e, t) => t * .01), Lx = j.createContext(null), Rx = class extends x { constructor() { super(...arguments), L(this, `layoutMaybeMutated`, !1), L(this, `projectionNodes`, new Map), L(this, `rootProjectionNode`), L(this, `isExiting`), L(this, `shouldPreserveFollowOpacity`, e => e.options.layoutId === kx && !this.props.isExiting), L(this, `switchLayoutGroupContext`, { register: e => this.addChild(e), deregister: e => this.removeChild(e), transition: this.props.isLead !== void 0 && this.props.animatesLayout ? this.props.transition : void 0, shouldPreserveFollowOpacity: this.shouldPreserveFollowOpacity }) } componentDidMount() { this.props.isLead && this.props.sharedLayoutContext.initLead(this, !!this.props.animatesLayout) } shouldComponentUpdate(e) { let { isLead: t, isExiting: n, isOverlayed: r, animatesLayout: i, transition: a, sharedLayoutContext: o } = e; if (this.isExiting = n, t === void 0) return !0; let s = !this.props.isLead && t,
            c = this.props.isExiting && !n,
            l = s || c,
            u = !!this.props.isLead && !t,
            d = this.props.isOverlayed !== r; return (l || u) && this.projectionNodes.forEach(e => e?.willUpdate()), l ? o.schedulePromoteTree(this, a, !!i) : d && o.scheduleProjectionDidUpdate(), !!l && !!i } addChild(e) { let t = e.options.layoutId;
         t && (this.projectionNodes.set(t, e), this.setRootChild(e)) } setRootChild(e) { if (!this.rootProjectionNode) return this.rootProjectionNode = e;
         this.rootProjectionNode = this.rootProjectionNode.depth < e.depth ? this.rootProjectionNode : e } removeChild(e) { let t = e.options.layoutId;
         t && this.projectionNodes.delete(t) } render() { return E(Fe.Provider, { value: this.switchLayoutGroupContext, children: this.props.children }) } }, zx = e => { let t = j.useContext(Ax); return E(Rx, { ...e, sharedLayoutContext: t }) }, Bx = j.createContext(!0), Vx = p({ register: () => {}, deregister: () => {} }), Hx = ({ isCurrent: e, isOverlayed: n, children: r }) => { let i = Ss(),
         a = t({ register: f(e => { if (i.has(e)) { console.warn(`NavigationTargetWrapper: already registered`); return } i.set(e, void 0) }, [i]), deregister: f(e => { i.get(e)?.(), i.delete(e) }, [i]) }).current; return o(() => (i.forEach((t, r) => { let a = r(e, n);
         i.set(r, Ze(a) ? a : void 0) }), () => { i.forEach((e, t) => { e && (e(), i.set(t, void 0)) }) }), [e, n, i]), E(Vx.Provider, { value: a, children: r }) }, Ux = j.memo(function({ isLayeredContainer: e, isCurrent: n, isPrevious: r, isOverlayed: i = !1, visible: a, transitionProps: s, children: c, backdropColor: u, onTapBackdrop: d, backfaceVisible: f, exitBackfaceVisible: p, animation: m, exitAnimation: h, instant: g, initialProps: _, exitProps: v, position: y = { top: 0, right: 0, bottom: 0, left: 0 }, withMagicMotion: b, index: x, areMagicMotionLayersPresent: S, id: C, isInitial: w }) { let T = ge(),
         D = l(De),
         { persistLayoutIdCache: O } = l(Gv),
         k = t({ wasCurrent: void 0, wasPrevious: !1, wasBeingRemoved: !1, wasReset: !0, origins: Ts({}, _, s) }),
         A = t(null),
         j = D !== null && !D.isPresent;
      n && k.current.wasCurrent === void 0 && O(), o(() => { if (e || !T) return; if (j) { k.current = { ...k.current, wasBeingRemoved: j }; return } let { wasPrevious: t, wasCurrent: i } = k.current, a = n && !i || !j && k.current.wasBeingRemoved && n, o = r && !t, c = Ts(k.current.origins, _, s), l = k.current.wasReset;
         a || o ? (T.stop(), T.start({ zIndex: x, ...c, ...s }), l = !1) : l === !1 && (T.stop(), T.set({ zIndex: x, ...Wx, opacity: 0 }), l = !0), k.current = { wasCurrent: !!n, wasPrevious: !!r, wasBeingRemoved: !1, wasReset: l, origins: c } }, [n, r, j]); let te = g ? { type: !1 } : `velocity` in m ? { ...m, velocity: 0 } : m,
         M = g ? { type: !1 } : h || m,
         ne = { ...y };
      (ne.left === void 0 || ne.right === void 0) && (ne.width = `auto`), (ne.top === void 0 || ne.bottom === void 0) && (ne.height = `auto`); let re = (Es(s) || Es(_)) && (e || n || r) ? 1200 : void 0,
         ie = { ...Wx, ...k.current.origins },
         ae = e ? { initial: { ...ie, ..._ }, animate: { ...ie, ...s, transition: te }, exit: { ...ie, ...v, transition: m } } : { animate: T, exit: { ...ie, ...v, transition: M } },
         oe = !(j || S === !1),
         se = !!n && oe,
         ce = n && w; return ee(Ox, { "data-framer-component-type": `NavigationContainerWrapper`, width: `100%`, height: `100%`, style: { position: `absolute`, transformStyle: `flat`, backgroundColor: `transparent`, overflow: `hidden`, zIndex: e || j || n && b ? x : void 0, pointerEvents: void 0, visibility: a ? `visible` : `hidden`, perspective: re }, children: [e && E(Ox, { width: `100%`, height: `100%`, "data-framer-component-type": `NavigationContainerBackdrop`, transition: m, initial: { opacity: g && a ? 1 : 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, backgroundColor: u || `transparent`, onTap: j ? void 0 : d }), E(Ox, { ...ne, ...ae, transition: { default: te, originX: { type: !1 }, originY: { type: !1 }, originZ: { type: !1 } }, backgroundColor: `transparent`, backfaceVisible: j ? p : f, "data-framer-component-type": `NavigationContainer`, "data-framer-is-current-navigation-target": !!n, style: { pointerEvents: void 0, opacity: ce || e || n && b ? 1 : 0 }, "data-is-present": oe ? void 0 : !1, ref: A, children: E(Lx.Provider, { value: A, children: E(Bx.Provider, { value: se, children: E(Hx, { isCurrent: se, isOverlayed: i, children: E(zx, { isLead: n, animatesLayout: !!b, transition: te, isExiting: !oe, isOverlayed: i, id: C, children: c }) }) }) }) })] }) }, ws), Wx = { x: 0, y: 0, z: 0, rotate: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, scaleX: 1, scaleY: 1, scaleZ: 1, skew: 0, skewX: 0, skewY: 0, originX: .5, originY: .5, originZ: 0, opacity: 1 }, Gx = class { constructor() { L(this, `warning`, () => { $r(`The Navigator API is only available inside of Framer: https://www.framer.com/`) }), L(this, `goBack`, () => this.warning()), L(this, `instant`, () => this.warning()), L(this, `fade`, () => this.warning()), L(this, `push`, () => this.warning()), L(this, `modal`, () => this.warning()), L(this, `overlay`, () => this.warning()), L(this, `flip`, () => this.warning()), L(this, `customTransition`, () => this.warning()), L(this, `magicMotion`, () => this.warning()) } }, Kx = p(new Gx), qx = { Fade: { exit: { opacity: 0 }, enter: { opacity: 0 } }, PushLeft: { exit: { x: `-30%` }, enter: { x: `100%` } }, PushRight: { exit: { x: `30%` }, enter: { x: `-100%` } }, PushUp: { exit: { y: `-30%` }, enter: { y: `100%` } }, PushDown: { exit: { y: `30%` }, enter: { y: `-100%` } }, Instant: { animation: { type: !1 }, enter: { opacity: 0 } }, Modal: { overCurrentContext: !0, goBackOnTapOutside: !0, position: { center: !0 }, enter: { opacity: 0, scale: 1.2 } }, OverlayLeft: { overCurrentContext: !0, goBackOnTapOutside: !0, position: { right: 0, top: 0, bottom: 0 }, enter: { x: `100%` } }, OverlayRight: { overCurrentContext: !0, goBackOnTapOutside: !0, position: { left: 0, top: 0, bottom: 0 }, enter: { x: `-100%` } }, OverlayUp: { overCurrentContext: !0, goBackOnTapOutside: !0, position: { bottom: 0, left: 0, right: 0 }, enter: { y: `100%` } }, OverlayDown: { overCurrentContext: !0, goBackOnTapOutside: !0, position: { top: 0, left: 0, right: 0 }, enter: { y: `-100%` } }, FlipLeft: { backfaceVisible: !1, exit: { rotateY: -180 }, enter: { rotateY: 180 } }, FlipRight: { backfaceVisible: !1, exit: { rotateY: 180 }, enter: { rotateY: -180 } }, FlipUp: { backfaceVisible: !1, exit: { rotateX: 180 }, enter: { rotateX: -180 } }, FlipDown: { backfaceVisible: !1, exit: { rotateX: -180 }, enter: { rotateX: 180 } }, MagicMotion: { withMagicMotion: !0 } }, Jx = () => ({ current: -1, previous: -1, currentOverlay: -1, previousOverlay: -1, visualIndex: 0, overlayItemId: 0, historyItemId: 0, history: [], overlayStack: [], containers: {}, containerIndex: {}, containerVisualIndex: {}, containerIsRemoved: {}, transitionForContainer: {}, previousTransition: null }), Yx = Tg(Wx), Xx = j.createContext(void 0), Zx = j.createContext(void 0), Qx = (() => { var e, t, n, r, i, a, o; return t = class extends x { constructor(t) { super(t), F(this, n), F(this, e, null), L(this, `state`, Jx()), F(this, a, e => { if (!this.props.enabled && this.state.history.length > 0) return; let t = As(this.state, e); if (!t) return; let { skipLayoutAnimation: n } = this.props, r = t.history[t.current], i = e.type === `add` && e.transition.withMagicMotion || e.type === `forward` && r?.transition.withMagicMotion || e.type === `remove` && !!t.previousTransition, a = () => { this.setState(t), r?.key && this.context?.(r.key) };
               n && !i ? n(a) : a() }), L(this, `goBack`, () => { if (!_e(this, n, i).call(this)) return re(this, e, globalThis.event?.timeStamp || null), this.state.currentOverlay === -1 ? I(this, a).call(this, { type: `remove` }) : I(this, a).call(this, { type: `removeOverlay` }) }); let r = this.props.children; if (!r || !Qi(r) || !Zi(r)) return; let o = { ...qx.Instant },
               s = { type: `add`, key: r.key?.toString() || `stack-${this.state.historyItemId+1}`, transition: o, component: r },
               c = As(this.state, s);
            c && (this.state = c) } componentDidMount() { let e = this.state.history[this.state.current];
            e && this.context?.(e.key) } UNSAFE_componentWillReceiveProps(e) { let t = e.children; if (!Qi(t) || !Zi(t)) return; let r = t.key?.toString();
            r && (this.state.history.length === 0 ? _e(this, n, o).call(this, t, qx.Instant) : I(this, a).call(this, { type: `update`, key: r, component: t })) } componentWillUnmount() { this.props.resetProjection?.() } instant(e) { _e(this, n, o).call(this, e, qx.Instant, void 0) } fade(e, t) { _e(this, n, o).call(this, e, qx.Fade, t) } push(e, t) { _e(this, n, o).call(this, e, Ds(t), t) } modal(e, t) { _e(this, n, o).call(this, e, qx.Modal, t) } overlay(e, t) { _e(this, n, o).call(this, e, Os(t), t) } flip(e, t) { _e(this, n, o).call(this, e, ks(t), t) } magicMotion(e, t) { _e(this, n, o).call(this, e, qx.MagicMotion, t) } customTransition(e, t) { _e(this, n, o).call(this, e, t) } render() { let e = _e(this, n, r).call(this, { overCurrentContext: !1 }),
               t = _e(this, n, r).call(this, { overCurrentContext: !0 }),
               i = Gs(t),
               a = t.current > -1,
               o = this.state.history.length === 1,
               s = []; for (let [t, n] of Object.entries(this.state.containers)) { let r = this.state.containerIndex[t];
               V(r !== void 0, `Container's index must be registered`); let i = this.state.containerVisualIndex[t];
               V(i !== void 0, `Container's visual index must be registered`); let c = this.state.containerIsRemoved[t],
                  l = this.state.history[r],
                  u = this.state.transitionForContainer[t],
                  d = r === this.state.current,
                  f = r === this.state.previous,
                  p = d ? !1 : c,
                  m = l?.transition?.withMagicMotion || d && !!this.state.previousTransition;
               s.push(E(Ux, { id: t, index: i, isInitial: o, isCurrent: d, isPrevious: f, isOverlayed: a, visible: d || f, position: l?.transition?.position, instant: tc(r, e), transitionProps: u, animation: ec(r, e), backfaceVisible: Qs(r, e), exitAnimation: l?.transition?.animation, exitBackfaceVisible: l?.transition?.backfaceVisible, exitProps: l?.transition?.enter, withMagicMotion: m, areMagicMotionLayersPresent: p ? !1 : void 0, children: E(ls, { children: rc({ component: n, transition: l?.transition }) }) }, t)) } let c = this.state.overlayStack.map((e, n) => E(Ux, { isLayeredContainer: !0, isCurrent: n === this.state.currentOverlay, position: e.transition.position, initialProps: Zs(n, t), transitionProps: $s(n, t), instant: tc(n, t, !0), animation: ec(n, t), exitProps: e.transition.enter, visible: nc(n, t), backdropColor: Ys(e.transition), backfaceVisible: Xs(n, t), onTapBackdrop: ic(e.transition, this.goBack), index: this.state.current + 1 + n, children: rc({ component: e.component, transition: e.transition }) }, e.key)); return E(Ox, { "data-framer-component-type": `NavigationRoot`, top: 0, left: 0, width: `100%`, height: `100%`, position: `relative`, style: { overflow: `hidden`, backgroundColor: `unset`, pointerEvents: void 0, ...this.props.style }, children: E(Kx.Provider, { value: this, children: ee(Zx.Provider, { value: o, children: [E(Ux, { isLayeredContainer: !0, position: void 0, initialProps: {}, instant: !1, transitionProps: Ks(i), animation: qs(i), backfaceVisible: Js(i), visible: !0, backdropColor: void 0, onTapBackdrop: void 0, index: 0, children: E(Wi, { children: E(jx, { children: E(Le, { presenceAffectsLayout: !1, children: s }) }) }) }), E(Le, { children: c })] }) }) }) } }, e = new WeakMap, n = new WeakSet, r = function(e) { let { current: t, previous: n, currentOverlay: r, previousOverlay: i } = this.state; return e.overCurrentContext ? { current: r, previous: i, history: this.state.overlayStack } : { current: t, previous: n, history: this.state.history } }, i = function() { return globalThis.event ? I(this, e) === globalThis.event.timeStamp : !1 }, a = new WeakMap, o = function(t, r, o) { if (_e(this, n, i).call(this) || (re(this, e, globalThis.event?.timeStamp || null), !t || !Qi(t) || !Zi(t))) return; let s = { ...r, ...o }; if (s.overCurrentContext) return I(this, a).call(this, { type: `addOverlay`, transition: s, component: t }); let c = t.key?.toString() || `stack-${this.state.historyItemId+1}`;
         I(this, a).call(this, { type: `add`, key: c, transition: s, component: t }) }, L(t, `defaultProps`, { enabled: !0 }), L(t, `contextType`, Xx), t })(), $x = { stiffness: 500, damping: 50, restDelta: 1, type: `spring` }, eS = Ka(ac), Re(fg(), 1), Re(fg(), 1), Re(fg(), 1), tS = (e, t) => Object.prototype.hasOwnProperty.call(e, t), nS = Symbol(`private`), rS = (() => {
      function e(e = {}, t = !1, n = !0) { let r = {
               [nS]: { makeAnimatables: t, observeAnimatables: n, observers: new yv, reset() { for (let t in i)
                        if (tS(i, t)) { let n = tS(e, t) ? Vb(e)[t] : void 0;
                           n === void 0 ? delete i[t] : i[t] = n } }, transactions: new Set } },
            i = new Proxy(r, aS); return Object.assign(i, e), i } return e.resetObject = e => e[nS].reset(), e.addObserver = (e, t) => e[nS].observers.add(t), e })(), iS = class { constructor() { L(this, `set`, (e, t, n, r) => { if (t === nS) return !1; let i = e[nS],
               a, o; if (ti(n) ? (a = n, o = a.get()) : o = n, i.makeAnimatables && typeof n != `function` && typeof n != `object` && !a && (a = bv(n)), i.observeAnimatables && a) { let e = i.transactions;
               a.onUpdate({ update: (t, n) => { n && e.add(n), i.observers.notify({ value: r }, n) }, finish: t => { e.delete(t) && i.observers.finishTransaction(t) } }) } let s = !1,
               c = !0,
               l = Vb(e)[t]; if (l !== void 0) { ti(l) ? (c = l.get() !== o, l.set(o)) : (c = l !== o, Vb(e)[t] = o); let n = typeof o == `object` && !!o;
               (Array.isArray(o) || n) && (c = !0), s = !0 } else a && (n = a), s = Reflect.set(e, t, n); return c && i.observers.notify({ value: r }), s }), L(this, `get`, (e, t, n) => { if (t === nS) return Vb(e)[t]; let r = Reflect.get(e, t, n); return typeof r == `function` ? r.bind(n) : r }) } deleteProperty(e, t) { let n = Reflect.deleteProperty(e, t); return e[nS].observers.notify({ value: e }), n } ownKeys(e) { let t = Reflect.ownKeys(e),
            n = t.indexOf(nS); return n !== -1 && t.splice(n, 1), t } getOwnPropertyDescriptor(e, t) { if (t !== nS) return Reflect.getOwnPropertyDescriptor(e, t) } }, aS = new iS, oS = (() => {
      function e(t = {}) { let n = rS(t, !1, !1); return e.addData(n), n } return e._stores = [], e.addData = t => { e._stores.push(t) }, e.reset = () => { e._stores.forEach(e => rS.resetObject(e)) }, e.addObserver = (e, t) => rS.addObserver(e, t), e })(), sS = { update: 0 }, cS = j.createContext({ update: NaN }), lS = class extends x { constructor() { super(...arguments), L(this, `observers`, []), L(this, `state`, sS), L(this, `taskAdded`, !1), L(this, `frameTask`, () => { this.setState({ update: this.state.update + 1 }), this.taskAdded = !1 }), L(this, `observer`, () => { this.taskAdded || (this.taskAdded = !0, Hv.addFrameTask(this.frameTask)) }) } componentWillUnmount() { this.observers.map(e => e()), oS.reset() } render() { let { children: e } = this.props; return this.observers.map(e => e()), this.observers = [], oS._stores.forEach(e => { let t = oS.addObserver(e, this.observer);
            this.observers.push(t) }), E(cS.Provider, { value: { ...this.state }, children: e }) } }, Re(fg(), 1), uS = `__framer__`, dS = (() => uS.length)(), fS = j.createContext(void 0), pS = j.createContext(void 0), mS = `ssr-variant`, hS = `ssr-variant-group-separator`, gS = j.forwardRef(function(e, t) { let n = gc(t),
         r = j.useContext(pS),
         i = j.useSyncExternalStore(yg, xg, bg),
         a = qi(() => i ? Aa() ? 1 : 2 : 0),
         o = j.useContext(fS); return _r(() => { let { breakpoint: t, overrides: i, children: s, ...c } = e; if (!o) return console.warn(`PropertyOverrides is missing GeneratedComponentContext`), n(s, c); let { primaryVariantId: l, variantClassNames: u } = o, d = r?.primaryVariantId === l ? r?.variants : void 0; switch (a) {
            case 0:
               return n(s, wc(t, c, i));
            case 1:
               return yc(i, s, c, u, l, d, n, t);
            case 2:
               return yc(i, s, c, u, l, d, hc, void 0);
            default:
               H(a) } }, [o, r, n, e]) }), _S = (() => wy(gS, `.${mS} { display: contents }`, `PropertyOverrides`))(), vS = `default`, yS = new Set([vS]), xS = class { constructor() { L(this, `entries`, new Map), F(this, bS, {}) } set(e, t, n, r) { switch (t) {
            case `transformTemplate`:
               V(typeof n == `string`, `transformTemplate must be a string, received: ${n}`), this.setHash(e, r, { transformTemplate: n, legacy: !0 }); break;
            case `initial`:
            case `animate`:
               V(typeof n == `object`, `${t} must be a valid object, received: ${n}`), this.setHash(e, r, {
                  [t]: n, legacy: !0 }); break;
            default:
               break } } setHash(e, t = vS, n) { let r = this.entries.get(e) ?? {},
            i = r[t] ?? {};
         r[t] = n === null ? null : { ...i, ...n }, this.entries.set(e, r) } variantHash(e, t) { if (e === t?.primaryVariantId) return vS; let n = I(this, bS)[e]; if (n) return n; let r = t?.variantClassNames[e]; return r ? I(this, bS)[e] = bc(r) : vS } setAll(e, t = yS, n, r) { if (n === null) { for (let n of t) this.setHash(e, this.variantHash(n, r), null); return } let i = Ze(n.transformTemplate) ? n.transformTemplate?.({}, CS) : void 0,
            a = n.__framer__presenceInitial ?? n.initial,
            o = n.__framer__presenceAnimate ?? n.animate,
            s = { initial: B(a) ? a : void 0, animate: B(o) ? o : void 0, transformTemplate: R(i) ? i : void 0 }; for (let n of t) this.setHash(e, this.variantHash(n, r), s) } clear() { this.entries.clear() } toObject() { return Object.fromEntries(this.entries) } }, bS = new WeakMap, SS = new xS, CS = `__Appear_Animation_Transform__`, wS = `data-framer-appear-id`, TS = `data-framer-appear-animation`, ES = e => { if (to()) return { animate: Ec(e.animate) ? e.animate : void 0, initial: Ec(e.initial) ? e.initial : void 0, exit: void 0 } }, DS = [`opacity`, `x`, `y`, `scale`, `rotate`, `rotateX`, `rotateY`, `skewX`, `skewY`, `transformPerspective`], OS = e => ({ x: oe(e?.x ?? 0), y: oe(e?.y ?? 0), opacity: oe(e?.opacity ?? 1), scale: oe(e?.scale ?? 1), rotate: oe(e?.rotate ?? 0), rotateX: oe(e?.rotateX ?? 0), rotateY: oe(e?.rotateY ?? 0), skewX: oe(e?.skewX ?? 0), skewY: oe(e?.skewY ?? 0), transformPerspective: oe(e?.transformPerspective ?? 0) }), kS = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0, transformPerspective: 0 }, AS = { willChange: `transform` }, Object.freeze(AS), jS = {}, Object.freeze(jS), MS = new Set([`loopEffectEnabled`, `loopTransition`, `loop`, `loopRepeatType`, `loopRepeatDelay`, `loopPauseOffscreen`]), NS = () => { let e = t(); return o(() => () => { clearTimeout(e.current) }, []), async t => new Promise(n => { e.current = setTimeout(() => { n(!0) }, t * 1e3) }) }, PS = new Set([`speed`, `adjustPosition`, `offset`, `parallaxTransformEnabled`]), FS = new Set([`presenceInitial`, `presenceAnimate`, `presenceExit`]), IS = 1, LS = 4, RS = new Set([`threshold`, `animateOnce`, `opacity`, `targetOpacity`, `x`, `y`, `scale`, `transition`, `rotate`, `rotateX`, `rotateY`, `perspective`, `enter`, `exit`, `animate`, `styleAppearEffectEnabled`, `targets`, `scrollDirection`]), zS = [`animate`, `animate`], BS = { inputRange: [], outputRange: [] }, VS = new Set([`transformViewportThreshold`, `styleTransformEffectEnabled`, `transformTargets`, `spring`, `transformTrigger`]), HS = (e, t) => { let n = e?.[0]?.target; return t ? { opacity: n?.opacity ?? 1 } : n }, US = () => ({ opacity: [], x: [], y: [], scale: [], rotate: [], rotateX: [], rotateY: [], skewX: [], skewY: [], transformPerspective: [] }), WS = [0, 1], GS = { parallax: PS, styleAppear: RS, styleTransform: VS, loop: MS, presence: FS }, KS = Tg(GS), qS = e => e.reduce((e, t) => e += t, 0), JS = e => e.reduce((e, t) => e *= t, 1), YS = `current`, XS = e => j.forwardRef((t, n) => { if (t.__withFX) return E(e, { ...t, animate: void 0, initial: void 0, exit: void 0, ref: n }); let r = ES(t); if (r) return E(e, { ...t, ...r, ref: n }); let { parallax: i = {}, styleAppear: a = {}, styleTransform: o = {}, presence: s = {}, loop: c = {}, forwardedProps: l, targetOpacityValue: u, withPerspective: d, inSmartComponent: f = !1 } = Yc(t), p = ms(n), { values: m, style: h } = Fc(s, p, f, t.style, t[Je]), { values: g, style: _ } = jc(i, p, t.style?.visibility), { values: v, style: y } = qc(o, p), { values: b, style: x } = Uc(a, p), { values: S, style: C } = kc(c, p), w = j.useMemo(() => { let e = new We(u ?? 1); return { scale: [b.scale, S.scale, m.scale, v.scale], opacity: [b.opacity, S.opacity, m.opacity, e, v.opacity], x: [b.x, S.x, m.x, v.x], y: [b.y, S.y, g.y, m.y, v.y], rotate: [b.rotate, S.rotate, m.rotate, v.rotate], rotateX: [b.rotateX, S.rotateX, m.rotateX, v.rotateX], rotateY: [b.rotateY, S.rotateY, m.rotateY, v.rotateY], skewX: [b.skewX, S.skewX, m.skewX, v.skewX], skewY: [b.skewY, S.skewY, m.skewY, v.skewY], transformPerspective: [v.transformPerspective, b.transformPerspective] } }, [u, v, g, b, S, m]);
      Zc(t.style, w); let T = Se(w.scale, JS),
         D = Se(w.opacity, JS),
         O = Se(w.x, qS),
         k = Se(w.y, qS),
         ee = Se(w.rotate, qS),
         A = Se(w.rotateX, qS),
         te = Se(w.rotateY, qS),
         M = Se(w.skewX, qS),
         ne = Se(w.skewY, qS),
         re = Se(w.transformPerspective, qS),
         { drag: ie, dragConstraints: ae } = l;
      Mo(ie && Xc(ae) ? ae : void 0); let oe = { opacity: D, scale: T, x: O, y: k, rotate: ee, rotateX: A, rotateY: te, skewX: M, skewY: ne };
      tt(d) && (oe.transformPerspective = re); let se = Qc(t.animate) ? t.animate : void 0,
         ce = Qc(t.initial) ? t.initial : void 0,
         le = Qc(t.exit) ? t.exit : void 0,
         ue = f && !s.presenceInitial ? { initial: ce, animate: se, exit: le } : {}; return E(e, { ...l, ...ue, __withFX: !0, style: { ...t.style, ..._, ...y, ...C, ...oe, ...x, ...h }, values: m, ref: p }) }), ZS = p({}), QS = j.createContext({}), $S = j.forwardRef(function({ width: e, height: t, y: n, children: r, ...i }, a) { let o = j.useMemo(() => ({ width: e, height: t, y: n }), [e, t, n]),
         s = gc(a); return E(QS.Provider, { value: o, children: s(r, i) }) }), eC = e => j.forwardRef((t, n) => E(e, { layoutId: Ao(t), ...t, layoutIdKey: void 0, duplicatedFrom: void 0, ref: n })), tC = !1, nC = class extends x { constructor() { super(...arguments), L(this, `state`, { error: void 0 }) } static getDerivedStateFromError(e) { return { error: e } } componentDidCatch(e, t) { if (!tl(e)) return; let n = t?.componentStack;
         console.error(`Caught an error in SynchronousSuspenseErrorBoundary:

`, e, `

Component stack:
`, n, `

This error indicates a state update wasn’t wrapped with \`startTransition\`. Some of the UI might flash as a result. ` + ut(`If you are the author of this website, update external components and check recently added custom code or code overrides.`)); let r = e instanceof Error && typeof e.stack == `string` ? e.stack : void 0;
         nn(`published_site_load_recoverable_error`, { message: String(e), stack: r, componentStack: r ? void 0 : n }) } render() { let e = this.state.error; if (e === void 0) return this.props.children; if (!tl(e)) throw e; return tC = !0, this.props.children } }, rC = (() => h === void 0 ? null : new Promise(() => {}))(), iC = E(nl, {}), aC = p(!1), aC.displayName = `DisableSuspenseSuspenseThatPreservesDomContext`, oC = E(il, {}), sC = class extends x { constructor() { super(...arguments), L(this, `state`, { hasError: !1 }) } static getDerivedStateFromError() { return { hasError: !0 } } componentDidCatch(e, t) { ol(this.props.getErrorMessage(), t?.componentStack), al(e, t) } render() { let { children: e, fallback: t = oC } = this.props, { hasError: n } = this.state; return n ? t : e } }, cC = class extends x { constructor() { super(...arguments), L(this, `state`, { hasError: !1 }) } componentDidCatch(e, t) { let n = t?.componentStack;
         console.error(`Error in component (see previous log). This component has been hidden. Please check any custom code or code overrides to fix.`, n), this.setState({ hasError: !0 }), al(e, t) } render() { let { children: e } = this.props, { hasError: t } = this.state; return t ? null : e } }, lC = (() => j.createContext(void 0))(), uC = `code-crash:`, dC = eC(j.forwardRef(function({ children: e, layoutId: t, as: n, scopeId: r, nodeId: i, isAuthoredByUser: a, isModuleExternal: o, inComponentSlot: s, ...c }, l) { let u = qi(() => t ? `${t}-container` : void 0),
         d = wo(n),
         f = bl(j.Children.map(e, e => j.isValidElement(e) ? j.cloneElement(e, { layoutId: t }) : e), r, i, a, o, s); return E(d, { layoutId: u, ...c, ref: l, children: E(ix.Provider, { value: !0, children: E(N_.Provider, { value: i ?? null, children: E(Ki, { enabled: !1, children: E(He, { id: t ?? ``, inherit: c.layout ? !0 : `id`, children: f }) }) }) }) }) })), fC = j.forwardRef(function(e, t) { let { as: n, children: r, scopeId: i, nodeId: a, isAuthoredByUser: o, rendersWithMotion: s, isModuleExternal: c, inComponentSlot: l, ...u } = e, d = bl(r, i, a, o, c, l), f = e.as ?? `div`; if (e.rendersWithMotion) { let n = wo(f); return E(N_.Provider, { value: a ?? null, children: E(n, { ...u, ref: t, style: e.style, children: d }) }) } else { let n = f,
            { layoutId: r, layoutDependency: i, ...o } = u; return E(N_.Provider, { value: a ?? null, children: E(n, { ...o, ref: t, style: e.style, children: d }) }) } }), pC = p({ onRegisterCursors: () => () => {}, registerCursors: () => {} }), mC = `framer-cursor-none`, hC = `framer-pointer-events-none`, gC = g(function({ children: e }) { let t = qi(() => { let e = new Set,
               t = {},
               n = new Map; return { onRegisterCursors: n => (n(t), e.add(n), () => e.delete(n)), registerCursors: (r, i) => { n.set(i, Object.keys(r)), t = xl(n, t, r); for (let n of e) n(t); return () => { n.delete(i) } } } }),
         n = ae(); return ee(pC.Provider, { value: t, children: [e, !n && E(bC, {})] }) }), _C = (() => wy(gC, [`.${mC}, .${mC} * { cursor: none !important; }`, `.${hC}, .${hC} * { pointer-events: none !important; }`], `framer-lib-cursors-host`))(), vC = (() => ({ position: `fixed`, top: 0, left: 0, zIndex: 13, pointerEvents: `none` }))(), yC = `data-framer-portal-id`, bC = g(function() { let { onRegisterCursors: e } = l(pC), [n, r] = c(!1), i = he(0), a = he(0), s = he(0), u = t(null), d = t({ cursors: {}, cursorHash: void 0 }), p = jo();
      m(() => { let e = K.matchMedia(`(any-hover: none)`);

         function t(e) { e.matches ? M(() => r(!1)) : r(!0) } return e.addEventListener(`change`, t), e.matches || r(!0), () => { e.removeEventListener(`change`, t) } }, []), o(() => { if (!n) return; let e = 0,
            t = 0;

         function r() { i.set(e), a.set(t), ke(s, 1, { type: `tween`, duration: .2 }) } let o = () => { if (et(d.current.cursors)) return; let n = Tl(e, t);
            n !== d.current.cursorHash && (d.current.cursorHash = n, je.update(() => p())) };

         function c(n) { if (n.pointerType === `touch`) { Ie(o); return } je.read(o, !0), e = n.clientX, t = n.clientY, je.update(r) }

         function l(e) { if (e.target === u.current || !u.current) return; let t = new PointerEvent(e.type, { bubbles: !0, cancelable: e.cancelable, pointerType: e.pointerType, pointerId: e.pointerId, composed: e.composed, isPrimary: e.isPrimary, buttons: e.buttons, button: e.button });
            je.update(() => { u.current?.dispatchEvent(t) }) } return K.addEventListener(`pointermove`, c), document.addEventListener(`pointerdown`, l), document.addEventListener(`pointerup`, l), je.read(o, !0), () => { K.removeEventListener(`pointermove`, c), document.removeEventListener(`pointerdown`, l), document.removeEventListener(`pointerup`, l), Ie(o) } }, [s, i, a, p, n]), o(() => { if (!n) return;

         function e() { ke(s, 0, { type: `tween`, duration: .2 }) } return document.addEventListener(`mouseleave`, e), K.addEventListener(`blur`, e), () => { document.removeEventListener(`mouseleave`, e), K.removeEventListener(`blur`, e) } }, [s, n]), m(() => {
         function t(e) { d.current.cursors = e, d.current.cursorHash = et(e) ? null : Tl(i.get(), a.get()), p() } let n = e(t); return () => { n(), document.body.classList.toggle(mC, !1) } }, [i, a, e, p]); let { cursors: h, cursorHash: g } = d.current, _ = g ? h[g] : null, v = Sl(_);
      m(() => { n && document.body.classList.toggle(mC, v) }, [v, n]); let y = _?.component,
         b = _?.transition ?? { duration: 0 },
         x = b.duration === void 0 ? b : { ...b, duration: b.duration * 1e3 },
         S = be(i, x),
         w = be(a, x),
         T = Se(() => S.get() + (_?.offset?.x ?? 0)),
         D = Se(() => w.get() + (_?.offset?.y ?? 0)),
         O = _?.alignment,
         k = _?.placement,
         ee = f((e, t) => `translate(${wl(k,O)}) ${t}`, [O, k]); return !n || !_ || !y ? null : E(C, { children: E(y, { transformTemplate: ee, style: { ...vC, x: T, y: D, opacity: s }, globalTapTarget: !0, variant: _?.variant, ref: u, className: hC }) }) }), xC = `webPageId`, SC = class { constructor() { L(this, `collectedLinks`, new Map), L(this, `nestingInfo`, new Map) } clear() { this.collectedLinks.clear(), this.nestingInfo.clear() } getLinks() { let e = new Map; for (let [t, n] of this.nestingInfo) { let r = this.collectedLinks.get(t);
            V(r, `Outer link not found: ${t}`); let i = Array.from(n).map(e => { let t = this.collectedLinks.get(e); return V(t, `Inner link not found: ${e}`), t });
            e.set(r, i) } return e } collectNestedLink(e, t) { if (hg && !Ma() || !e.nodeId || !t.nodeId) return;
         this.collectedLinks.set(Ol(e), e), this.collectedLinks.set(Ol(t), t); let n = this.nestingInfo.get(Ol(e)) ?? new Set;
         n.add(Ol(t)), this.nestingInfo.set(Ol(e), n) } }, CC = new SC, wC = `element`, TC = `collection`, EC = `collectionItemId`, DC = `pathVariables`, OC = `framer/page-link,`, kC = p(void 0), AC = `--text-selection-color`, jC = `--text-selection-background-color`, MC = (() => wy(Kl, (e, t) => Gl(t?.triggerId), `InjectSelectionStyle`))(), NC = { isClockwise: e => NC.signedArea(e) <= 0, signedArea: e => { let t = 0,
            n = e.length; for (let r = 0; r < n; r++) { let i = e[r],
               a = e[(r + 1) % n];!i || !a || (t += i.x * -a.y - a.x * -i.y) } return 1 / 2 * t }, containsPoint: (e, t) => { let n; for (let r = 0; r < e.length; r++) { if (oi.isEqual(e[r], t)) return !0; let i = e[r]?.x ?? 0,
               a = e[r]?.y ?? 0,
               o = (r + 1) % e.length; if (oi.isEqual(e[o], t)) return !0; let s = e[o]?.x ?? 0,
               c = e[o]?.y ?? 0,
               l = (t.x - i) * (c - a) - (t.y - a) * (s - i); if (l === 0) continue; let u = l > 0; if (n ??= u, n !== u) return !1 } return !0 }, intersects: (e, t) => { if (e.length < 1 || t.length < 1) return !1; let n = Y.boundingRectFromPoints(e),
            r = Y.boundingRectFromPoints(t); if (!Y.intersects(n, r)) return !1; let i = [],
            a = e.length;
         e.forEach((t, n) => { let r = e[(n + 1) % a];
            r && i.push(Zv(t, r)) }); let o = [],
            s = t.length;
         t.forEach((e, n) => { let r = t[(n + 1) % s];
            r && o.push(Zv(e, r)) }); for (let e of i)
            for (let t of o)
               if (Zv.intersection(e, t, !0)) return !0; return !!(NC.containsPoint(t, e[0]) || NC.containsPoint(e, t[0])) }, contains: (e, t) => { for (let n = 0; n < t.length; n++)
            if (!NC.containsPoint(e, t[n])) return !1; return !0 }, clipToRect: (e, t) => { let n = Y.edges(t),
            r = new Set,
            i = e.length,
            a = [],
            o = []; for (let s = 0; s < i; s++) { let c = e[s],
               l = e[(s + 1) % i]; if (Y.containsPoint(t, c)) { let e = ql(c); if (r.add(e), o.push(c), Y.containsPoint(t, l)) continue } let u = Zv(c, l);
            n.forEach(e => { let t = Zv.intersection(u, e, !0); if (!t) return; let n = ql(t);
               r.has(n) || (r.add(n), a.push(t)) }) } return a.length === 0 ? o : (Y.points(t).forEach(t => { NC.containsPoint(e, t) && (r.add(ql(t)), a.push(t)) }), oi.sortClockwise([...o, ...a])) } }, PC = 5, FC = 4, IC = (() => { let e = j.createContext(new Set); return e.displayName = `FloatingStackingContext`, e })(), LC = `overlay`, RC = `template-overlay`, zC = class extends x { constructor() { super(...arguments), L(this, `state`, { error: void 0 }), L(this, `message`, `Made UI non-interactive due to an error.`), L(this, `messageFatal`, `Fatal error.`) } static getDerivedStateFromError(e) { return { error: e } } componentDidCatch(e) { if (h.__framer_hadFatalError = !0, `cause` in e && (e = e.cause), console.error(ut(gg ? this.message : this.messageFatal, e)), Math.random() > .5) return; let t = e instanceof Error && typeof e.stack == `string` ? e.stack : null;
         nn(`published_site_load_error`, { message: String(e), stack: t }) } render() { let e = this.state.error; if (!e) return this.props.children; let t = `cause` in e ? e.cause : e,
            n = /-->/gu,
            r = gg && document.getElementById(`main`)?.innerHTML || ``; return E(`div`, { style: { display: `contents` }, suppressHydrationWarning: !0, dangerouslySetInnerHTML: { __html: `<!-- DOM replaced by GracefullyDegradingErrorBoundary due to "${t.message.replace(n,`--!>`)}". ${ut()}: --><!-- Stack: ${e.stack?.replace(n,`--!>`)} -->` + r } }) } }, BC = /:([a-z]\w*)/gi, VC = p(void 0), HC = 500, UC = .9, WC = 1.7, GC = 4, KC = 1 / 0, qC = new WeakMap, JC = new Set, YC = new Map, XC = !o_ || typeof IntersectionObserver > `u` ? null : Tu(), ZC = yu(A(function({ children: e, href: t, openInNewTab: n, smoothScroll: r, clickTrackingId: i, relValues: a, preserveParams: o, nodeId: s, scopeId: c, motionChild: l, ...d }, f) { let p = kt(),
         m = jt(),
         h = Cu(),
         { activeLocale: g, locales: _ } = yr(),
         v = Nu(),
         y = bn(),
         b = kl(),
         x = Pu({ nodeId: s, clickTrackingId: i, router: p, href: t, activeLocale: g }),
         S = u(() => { if (!t) return {}; let e = Dl(t) ? t : Il(t); if (!e) return {}; if (R(e)) return Ru(e, p, m, { openInNewTab: n, trackLinkClick: x, rel: a?.join(` `), preserveParams: o, smoothScroll: r }, y, g?.id, _, h); let { unresolvedPathSlugs: i, unresolvedHashSlugs: s } = e, c = v(i, s, g); if (st(c)) throw c; let { routeId: l, href: u, elementId: d, pathVariables: f, locale: b } = bu(p, m, e, g, c, h), S = Du(n, !0), C = S === `_blank`, w = { pathVariables: f, locale: b }, T = e => Iu(p, l, () => y(l, w, !1, !C), d, f, r, e); return { href: u, target: S, onClick: Lu(u, x, T), "data-framer-page-link-current": m && wu(m, e, h) || void 0, navigate: T, preload: () => y(l, w, !0, !C), _routeId: l, _pathVariables: f, _locale: b } }, [t, p, g, h, n, m, r, x, a, _, o, v, y]),
         C = ms(O(e) && `ref` in e ? e.ref : void 0),
         { navigate: w, preload: T, _routeId: E, _pathVariables: D, _locale: k, ...ee } = S;
      hs(C, e => { if (!(e === null || !E || !T || b)) return XC?.(e, T, `${E}:${k?.id}:${JSON.stringify(D)}`) }, [T, E, D, k]); let A = !!w; return zl(gc(f).cloneAsArray(e, e => zu(e, { ...d, ...Vu(ee, l, A) }, C)), c, s, t, S, C) })), QC = `framer`, $C = 3, ew = 30, tw = 1e4, nw = `3`, rw = `__framer`, iw = [`website`, `company`, `message`, `subject`, `title`, `description`, `feedback`, `notes`, `details`, `remarks`, `comments`], aw = (() => Date.now())(), ow = { name: 0, value: 1, setAttribute: 2, valueProperty: 3, isInputEventTrusted: 4, inputChangeTimeSinceModuleLoad: 5, wasFilledBeforeHydration: 6 }, sw = { fieldData: 0, fieldCount: 1, fieldFilledCount: 2, hpVersion: 3, siteId: 4, timeToSubmissionSinceModuleLoad: 5 }, cw = () => ((Date.now() - aw) / 1e3).toFixed(2), lw = ({ inputStateRef: e }) => { let { inputRef: t, originalName: n } = e; return j.useLayoutEffect(() => { let n = t.current; if (!n) return; let r = e.methodsUsed;
         n.value && (r.wasFilledBeforeHydration = !0) }, [t, e]), j.useEffect(() => { let n = t.current; if (!n) return; let r = e.methodsUsed,
            i = Element.prototype.setAttribute,
            a = i.bind(n);
         n.setAttribute = function(e, t) { e === `value` && (r.setAttribute = !0, r.inputChangeTimeSinceModuleLoad = cw()), a(e, t) }; let o = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, `value`);
         o && Object.defineProperty(n, `value`, { configurable: !0, enumerable: !0, get: function() { return o.get?.call(this) ?? `` }, set: function(e) { r.valueProperty = !0, r.inputChangeTimeSinceModuleLoad = cw(), o.set?.call(this, e) } }); let s = e => { r.isInputEventTrusted = e.isTrusted, r.inputChangeTimeSinceModuleLoad = cw() }; return n.addEventListener(`input`, s), () => { n.setAttribute = i.bind(n), o && Object.defineProperty(n, `value`, o), n.removeEventListener(`input`, s) } }, [t, e]), E(`input`, { ref: t, type: `text`, name: n, suppressHydrationWarning: !0, tabIndex: -1, autoComplete: `one-time-code`, "aria-hidden": `true`, style: { position: `absolute`, transform: `scale(0)` }, defaultValue: ``, "data-1p-ignore": !0, "data-lpignore": `true`, "data-form-type": `other`, "data-bwignore": !0 }) }, uw = `https://www.google.com/recaptcha/api.js`, dw = new Map, fw = { state: `pending` }, pw = { state: `success` }, mw = { state: `incomplete` }, hw = { state: `complete` }, gw = { state: `error` }, _w = j.createContext(void 0), vw = j.forwardRef(function({ action: e, children: t, redirectUrl: n, onSuccess: r, onError: i, onLoading: a, submitTrackingId: o, nodeId: s, formCaptchaProvider: c, formCaptchaSiteKey: u, ...d }, f) { let p = j.useRef(null),
         m = f ?? p,
         h = !(c && u),
         { states: g, convertHoneypotFieldsForSubmission: _, replaceHoneypotWithMetadata: v } = Ju(h),
         y = kt(),
         b = jt(),
         x = Cu(),
         S = mn(),
         { executeChallenge: C } = td({ provider: c, siteKey: u }),
         [w, T] = j.useReducer(nd, mw),
         { activeLocale: D, locales: O } = yr(),
         k = l(_w),
         A = j.useRef({ onSuccess: r, onError: i, onLoading: a });
      A.current = { onSuccess: r, onError: i, onLoading: a }; let te = j.useRef(!1);
      async function ne(e) { if (R(e)) { let t = xu(y, e, x, O); if (!t) { ad(e, m); return } let { routeId: n, elementId: r, pathVariables: i } = t;
            y.navigate?.(n, r, i); return } V(Dl(e), `Expected link to be either a LinkToWebPage or a string`, e); let { routeId: t, elementId: n, pathVariables: r } = bu(y, b, e, D, await ju(e.unresolvedPathSlugs, e.unresolvedHashSlugs, D, S), x);
         y.navigate?.(t, n, r) }
      let re = async t => { if (t.preventDefault(), !e || !k || te.current) return;
         te.current = !0, _(); let r = new FormData(t.currentTarget);
         await yn({ priority: `user-visible`, continueAfter: `paint` }), v(r), M(() => T({ type: `submit` })), qu(r, K.document); for (let [e, t] of r) t instanceof File && r.delete(e); try { A.current.onLoading?.(), Xu({ router: y, nodeId: s, submitTrackingId: o, activeLocale: D }), await sd(e, r, k, C), M(() => T({ type: `success` })), A.current.onSuccess?.(), n && await ne(n) } catch (e) { M(() => T({ type: `error` })), A.current.onError?.(), console.error(e) } te.current = !1 }, ie = e => { let { target: t, currentTarget: n, key: r } = e;
         t instanceof HTMLTextAreaElement || r === `Enter` && n.checkValidity() && (e.preventDefault(), re(e)) }, ae = async e => { let t = e.currentTarget;
         await yn({ priority: `background`, continueAfter: `paint` }), M(() => T({ type: od(t) ? `incomplete` : `complete` })) }; return ee(ye.form, { ...d, onSubmit: rd(w) ? re : id, onKeyDown: ie, onChange: ae, ref: m, children: [t(w), h && E(Yu, { states: g })] }) }), yw = `__framer_force_showing_editorbar_since`, bw = class extends x { constructor() { super(...arguments), L(this, `state`, { error: void 0 }) } static getDerivedStateFromError(e) { return { error: e } } render() { return this.state.error ? null : this.props.children } }, xw = () => { try { return !!localStorage[yw] } catch { return !1 } }, Sw = () => !xw(), Cw = (() => { let e = p(void 0); return e.displayName = `TriggerStateContext`, e })(), ww = `main`, Tw = `framerGeneratedPage`, Ew = `<!-- Start of headStart -->`, Dw = `<!-- End of headStart -->`, Ow = `<!-- Start of headEnd -->`, kw = `<!-- End of headEnd -->`, Aw = `<!-- Start of bodyStart -->`, jw = `<!-- End of bodyStart -->`, Mw = `<!-- Start of bodyEnd -->`, Nw = `<!-- End of bodyEnd -->`, Pw = (() => j.createContext(void 0))(), Fw = null, Iw = null, vg(Od), Lw = (e, n, r, i, a, s) => { let c = l(_w),
         u = t(),
         d = mn(),
         f = t(!0); return o(() => {
         function t() {
            (!Fw || !Iw) && Od(); let t = r ? new URL(K.location.origin + r) : K.location,
               o = { version: qg, abTestId: e?.abTestId, framerSiteId: c ?? null, webPageId: e?.abTestingVariantId ?? n, routePath: e?.path || `/`, collectionItemId: null, framerLocale: a?.code || null, referrer: null, url: t.href, hostname: t.hostname, pathname: t.pathname, search: t.search || null, hash: t.hash || null, timezone: Fw, locale: Iw },
               l = f.current && s !== void 0 ? s : void 0; return e?.collectionId && i ? (async () => { let t = l ?? null; if (l === void 0) { let n = e.collectionId && d?.get(e.collectionId),
                     [r] = Object.values(i); if (n && R(r)) { let e = n.getRecordIdBySlug(r, a || void 0);
                     t = (st(e) ? await e : e) ?? null } } return { ...o, collectionItemId: t } })() : o }(async () => { let e = u.current = t(),
               n = e instanceof Promise ? await e : e;
            u.current = n, f.current ? f.current = !1 : nn(`published_site_pageview`, n, `eager`) })(); let o = async e => { if (e.persisted) { let e = u.current = t(),
                  n = e instanceof Promise ? await e : e;
               u.current = n, nn(`published_site_pageview`, n, `eager`) } }; return h.addEventListener(`pageshow`, o), () => { h.removeEventListener(`pageshow`, o) } }, [e, n, r, i, a, c, d, s]), u }, Rw = { status: `loading`, data: void 0 }, zw = 5e3, Bw = () => {}, qw = class e { constructor() { L(this, `responseValues`, new Map), F(this, Vw, new Map), F(this, Hw, new Set), F(this, Uw, new Map), F(this, Ww, new Map), F(this, Gw, new Map), F(this, Kw, new Map), L(this, `persistCache`, dc(() => { let t = {}; for (let [e, n] of this.responseValues) { if (!n || n.status !== `success`) continue; let r = I(this, Uw).get(e); if (!r || r === 0) continue; let i = I(this, Ww).get(e);
               i && (i && Wd(i, r) || (t[e] = [i, r, n.data])) } try { localStorage.setItem(e.cacheKey, JSON.stringify(t)) } catch {} }, 500)) } unmount() { for (let [e, t] of I(this, Kw)) clearInterval(t), I(this, Kw).delete(e) } stopQueryRefetching(e) { let t = Bd(e),
            n = I(this, Kw).get(t);
         n && (clearInterval(n), I(this, Kw).delete(t)) } startQueryRefetching(e) { let t = Bd(e),
            n = I(this, Kw).get(t),
            r = I(this, Uw).get(t); if (n || !r) return; let i = K.setInterval(() => { if (document.visibilityState === `hidden`) return; let n = I(this, Ww).get(t);!r || !n || this.fetchWithCache({ ...e, cacheDuration: r }) }, r);
         I(this, Kw).set(t, i) } hydrateCache() { try { let t = localStorage.getItem(e.cacheKey); if (!t) return; let n = JSON.parse(t); if (typeof n != `object`) throw Error(`Invalid cache data`); for (let e in n) { let t = n[e]; if (!Array.isArray(t) || t.length !== 3) throw Error(`Invalid cache data`); let [r, i, a] = t;
               Wd(r, i) || (I(this, Ww).set(e, r), I(this, Uw).set(e, i), this.responseValues.set(e, { status: `success`, data: a })) } } catch { try { localStorage.removeItem(e.cacheKey) } catch {} } } setResponseValue(e, t) { this.responseValues.set(e, t), this.persistCache(); let n = I(this, Vw).get(e); if (n)
            for (let e of n) e() } async prefetch(e) { if (!Aa() || !jl(e.url, !1)) return; let t = Bd(e);
         I(this, Hw).add(t), await this.fetchWithCache(e); let n = this.getValue(t); if (!n || n.status === `loading`) throw Error(`Unexpected result status for prefetch`); let r = I(this, Vw).get(t); for (let e of r ?? []) e(); let i = Ud(n, e); return e.resultOutputType === `image` && R(i) && await Ld(i).catch(Bw), i } async fetchWithCache(e) { if (!Aa()) return; let t = Bd(e),
            n = I(this, Gw).get(t); if (n) return n; let r = I(this, Ww).get(t),
            i = r && Wd(r, e.cacheDuration); if (this.responseValues.has(t) && !i) return;
         this.responseValues.get(t) || this.setResponseValue(t, Rw); let a = (async () => { try { let n = await fetch(e.url, { method: `GET`, credentials: e.credentials }); if (!n.ok) { this.setResponseValue(t, { status: `error`, error: Error(`Invalid Response Status`), data: void 0 }); return } let r = await n.json();
               this.setResponseValue(t, { status: `success`, data: r }), I(this, Ww).set(t, Date.now()) } catch (e) { this.setResponseValue(t, { status: `error`, error: e, data: void 0 }) } })(); return I(this, Gw).set(t, a), a.finally(() => { I(this, Gw).delete(t) }), a } getValue(e, t = !1) { if (!(t && !I(this, Hw).has(e))) return this.responseValues.get(e) } subscribe(e, t, n = !1) { let { url: r, cacheDuration: i } = e; if (!jl(r, !1)) return Bw; let a = Bd(e),
            o = I(this, Uw).get(a);
         (!o || i < o) && I(this, Uw).set(a, i), n || (this.startQueryRefetching(e), this.fetchWithCache(e)); let s = I(this, Vw).get(a) ?? new Set; return s.add(t), I(this, Vw).set(a, s), () => { let n = I(this, Vw).get(a);
            n && (n.delete(t), n.size === 0 && I(this, Vw).delete(a), I(this, Vw).size === 0 && this.stopQueryRefetching(e)) } } }, Vw = new WeakMap, Hw = new WeakMap, Uw = new WeakMap, Ww = new WeakMap, Gw = new WeakMap, Kw = new WeakMap, L(qw, `cacheKey`, `framer-fetch-client-cache`), Jw = qw, Yw = p(void 0), Xw = p(!0), Zw = ({ children: e, client: t }) => { let [n] = c(() => t ?? new Jw), [r, i] = c(!0); return o(() => (n.hydrateCache(), M(() => { i(!1) }), () => n.unmount()), [n]), E(Xw.Provider, { value: r, children: E(Yw.Provider, { value: n, children: e }) }) }, ze.WillChange = Ke, Qw = yu(A(function({ links: e, children: t, ...n }, r) { let i = kt(),
         { activeLocale: a } = yr(),
         o = gc(r),
         s = Nu(),
         c = [],
         l = e.map(e => { if (e) return R(e) ? Uu(e, i, void 0, void 0, a) : Uu(e.href, i, e.implicitPathVariables, e.refKey, a, (e, t) => s(e, t, a, c)) }); if (c.length > 0) throw Promise.allSettled(c); return o(t(l), n) })), $w = { cast(e, t) { switch (t.type) {
            case `array`:
               return sf(e, t);
            case `boolean`:
               return lf(e);
            case `color`:
               return ff(e);
            case `date`:
               return mf(e);
            case `enum`:
               return gf(e);
            case `file`:
               return vf(e);
            case `link`:
               return bf(e);
            case `number`:
               return Sf(e);
            case `object`:
               return Tf(e, t);
            case `responsiveimage`:
               return Df(e);
            case `richtext`:
               return kf(e);
            case `string`:
               return Nf(e);
            case `vectorsetitem`:
               return jf(e);
            case `unknown`:
               return e;
            default:
               H(t, `Unsupported cast`) } }, parse(e) { return Qe(e) ? { type: `boolean`, value: e } : it(e) ? { type: `date`, value: e.toISOString() } : z(e) ? { type: `number`, value: e } : R(e) ? { type: `string`, value: e } : $e(e) ? { type: `array`, value: e.map($w.parse) } : null }, equal(e, t, n) { return e?.type === t?.type ? Ff(e, t, n) === 0 : !1 }, lessThan(e, t, n) { return e?.type === t?.type ? Ff(e, t, n) < 0 : !1 }, lessThanOrEqual(e, t, n) { return e?.type === t?.type ? Ff(e, t, n) <= 0 : !1 }, greaterThan(e, t, n) { return e?.type === t?.type ? Ff(e, t, n) > 0 : !1 }, greaterThanOrEqual(e, t, n) { return e?.type === t?.type ? Ff(e, t, n) >= 0 : !1 }, in(e, t, n) { return t?.type === `array` ? t.value.some(t => $w.equal(t, e, n)) : !1 }, indexOf(e, t, n) { return e?.type === `array` ? e.value.findIndex(e => $w.equal(e, t, n)) : -1 }, contains(e, t, n) { let r = Pf(e),
            i = Pf(t); return nt(r) || nt(i) ? !1 : (n.type === 0 && (r = r.toLowerCase(), i = i.toLowerCase()), r.includes(i)) }, startsWith(e, t, n) { let r = Pf(e),
            i = Pf(t); return nt(r) || nt(i) ? !1 : (n.type === 0 && (r = r.toLowerCase(), i = i.toLowerCase()), r.startsWith(i)) }, endsWith(e, t, n) { let r = Pf(e),
            i = Pf(t); return nt(r) || nt(i) ? !1 : (n.type === 0 && (r = r.toLowerCase(), i = i.toLowerCase()), r.endsWith(i)) }, length(e) { switch (e?.type) {
            case `array`:
               return e.value.length } return 0 }, stringify(e) { if (e === null) return `null`; switch (e.type) {
            case `array`:
               return `[${e.value.map($w.stringify).join(`, `)}]`;
            case `boolean`:
            case `number`:
               return String(e.value);
            case `string`:
               return `'${e.value}'`;
            case `enum`:
               return `'${e.value}' /* Enum */`;
            case `color`:
               return `'${e.value}' /* Color */`;
            case `date`:
               return `'${e.value}' /* Date */`;
            case `richtext`:
               return `RichText`;
            case `vectorsetitem`:
               return `VectorSetItem`;
            case `responsiveimage`:
               return `ResponsiveImage`;
            case `file`:
               return `File`;
            case `link`:
               return R(e.value) ? `'${e.value}' /* Link */` : `Link`;
            case `object`:
               return `Object`;
            default:
               H(e) } } }, eT = { type: `unknown`, isNullable: !0 }, tT = class { constructor(e, t) { this.collection = e, this.locale = t, L(this, `schema`), L(this, `indexes`, []); let n = eo(e);
         V(n, `Collection does not have properties`); let r = { id: { type: `string`, isNullable: !1 } },
            i = Object.entries(n); for (let [e, t] of i) { if (!t) continue; let n = t.type;
            V(n !== `array`, `Array properties are not supported`), V(n !== `object`, `Object properties are not supported`), r[e] = { type: n, isNullable: !0 } } this.schema = r } getDatabaseItem(e, t) { let n = {},
            r = Number(t); for (let t in this.schema) { let i = e[t]; if (rt(i)) continue; let a = this.schema[t]; if (!tt(a)) { if (V(a.type !== `unknown`, `Invalid definition type`), a.type === `richtext`) { n[t] = { type: a.type, value: { itemIndex: r, key: t } }; continue } n[t] = { type: a.type, value: i } } } return { pointer: t, data: n } } async resolveRichText(e) { let { itemIndex: t, key: n } = e, r = (await If(this.collection, this.locale))[t]?.[n]; return Fg.is(r) ? r.readMaybeAsync() : r } async scanItems() { return (await If(this.collection, this.locale)).map((e, t) => { let n = String(t); return this.getDatabaseItem(e, n) }) } async resolveItems(e) { let t = await If(this.collection, this.locale); return e.map(e => { let n = t[Number(e)]; return V(n, `Can't find collection item`), this.getDatabaseItem(n, e) }) } compareItems(e, t) { return Number(e.pointer) - Number(t.pointer) } }, nT = new Map, rT = new WeakMap, iT = `$r_`, aT = new Map, oT = 1e3, Q = class e { constructor(e) { this.network = e } static estimate(t, n) { let r = Vf(),
            i = Hf(); return new e(t * r + n / i) } static max(t, n) { return new e(Math.max(t.network, n.network)) } static compare(e, t) { return e.network < t.network ? -1 : e.network > t.network ? 1 : 0 } add(e) { return this.network += e.network, this } toString() { return `${this.network}ms` } }, sT = class { constructor(e, t) { this.id = e, this.relational = t, L(this, `nodes`, []), L(this, `winners`, new Map) } addNode(e) { this.nodes.push(e), e.setGroup(this) } getWinner(e) { let t = e.getHash(),
            n = this.winners.get(t); if (n) return n; let r = new cT; return this.winners.set(t, r), r } getOptimized(e) { let t = this.getWinner(e);
         V(t.node, `Group not optimized`); let n = t.node.getOptimized(e); return n.setGroup(this), n } }, cT = class { constructor() { L(this, `node`), L(this, `cost`, new Q(1 / 0)), L(this, `nodes`, []) } update(e, t) { this.nodes.push(e), Q.compare(t, this.cost) < 0 && (this.node = e, this.cost = t) } }, lT = class { constructor(e) { this.isSynchronous = e } }, uT = class extends lT { constructor() { super(...arguments), L(this, `group`) } getGroup() { return V(this.group, `Node must be in a group`), this.group } setGroup(e) { V(!this.group, `Node is already in a group`), this.group = e } evaluateSync() { return qd(this.evaluate(void 0)) } evaluateAsync() { return Jd(this.evaluate(void 0)) } }, dT = class { constructor(e, t, n = {}) { this.options = n, L(this, `collections`), L(this, `richTextCache`, new WeakMap), L(this, `vectorSetItemCache`, new WeakMap), this.collections = Xf(e, t) }* resolveArrayValue(e) { return yield* Zd(e.value.map(e => this.resolveValue(e))) }* resolveObjectValue(e) { let t = {}; for (let n in e.value) { let r = e.value[n];
            t[n] = this.resolveValue(r) } return yield* Xd(t) } loadRichTextValue(e) { let t = e.value;
         V(qf(t), `Rich text pointer must be wrapped`); let n = this.collections.get(t.collectionId);
         V(n, `Can't find collection for rich text pointer`); let r = this.richTextCache.get(n) ?? new Map;
         this.richTextCache.set(n, r); let i = r.get(t.pointer); if (i) return i; let a = this.options.richTextMode === `raw` ? t.pointer : n.resolveRichText(t.pointer); return r.set(t.pointer, a), a } preloadRichTextValue(e) { this.loadRichTextValue(e) }* resolveRichTextValue(e) { let t = this.loadRichTextValue(e); return ot(t) ? yield t: t } loadVectorSetItemValue(e) { let t = e.value;
         V(Yf(t), `Vector set item pointer must be wrapped`); let n = this.collections.get(t.collectionId);
         V(n, `Can't find collection for vector set item pointer`), V(n.resolveVectorSetItem, `Can't resolve vector set item pointer`); let r = this.vectorSetItemCache.get(n) ?? new Map;
         this.vectorSetItemCache.set(n, r); let i = r.get(t.pointer); if (i) return i; let a = n.resolveVectorSetItem(t.pointer); return r.set(t.pointer, a), a } preloadVectorSetItemValue(e) { this.loadVectorSetItemValue(e) }* resolveVectorSetItemValue(e) { let t = this.loadVectorSetItemValue(e); return ot(t) ? yield t: t }* resolveValue(e) { switch (e?.type) {
            case `array`:
               return yield* this.resolveArrayValue(e);
            case `object`:
               return yield* this.resolveObjectValue(e);
            case `richtext`:
               return yield* this.resolveRichTextValue(e);
            case `vectorsetitem`:
               return yield* this.resolveVectorSetItemValue(e) } return e?.value ?? null } }, fT = `index`, pT = class extends Set { merge(e) { for (let t of e) this.add(t) } equals(e) { if (this === e) return !0; if (this.size !== e.size) return !1; for (let t of this)
            if (!e.has(t)) return !1; return !0 } subsetOf(e) { if (this === e) return !0; if (this.size > e.size) return !1; for (let t of this)
            if (!e.has(t)) return !1; return !0 } getHash() { let e = []; for (let t of this) e.push(t.id); return e.sort((e, t) => e - t), G(this.name, ...e) } }, mT = class { constructor(e, t, n) { this.id = e, this.name = t, this.data = n, L(this, `indexes`, new gT), L(this, `fields`, new $) } }, hT = class { constructor(e, t, n, r, i, a) { for (let o in this.id = e, this.data = t, this.collection = n, this.lookupNodes = r, this.constraint = i, this.ordering = a, L(this, `resolvedFields`, new $), t.schema)
            for (let e of n.fields) e.name === o && this.resolvedFields.add(e) } }, gT = class extends pT { constructor() { super(...arguments), L(this, `name`, `Indexes`) } }, _T = class { constructor(e, t, n, r) { this.id = e, this.name = t, this.definition = n, this.collection = r } getValue(e) { V(this.name, `Can only get value of field with a name`); let t = e.data[this.name]; switch (t?.type) {
            case `richtext`:
               return V(this.collection, `Rich text field must have a collection`), { type: `richtext`, value: Kf(this.collection.data, t.value) };
            case `vectorsetitem`:
               return V(this.collection, `Vector set item field must have a collection`), { type: `vectorsetitem`, value: Jf(this.collection.data, t.value) } } return t ?? null } }, $ = class extends pT { constructor() { super(...arguments), L(this, `name`, `Fields`) } }, vT = class { constructor(e, t = `asc`) { this.field = e, this.direction = t } getHash() { return G(`OrderingField`, this.field.id, this.direction) } }, yT = class { constructor(e) { L(this, `fields`, []), e && this.merge(e) } get length() { return this.fields.length } getHash() { return G(`Ordering`, ...this.fields) } push(e) { this.fields.push(e) } merge(e) { this.fields.push(...e.fields) } equals(e) { return this === e ? !0 : this.length === e.length ? this.getHash() === e.getHash() : !1 } providedByFields(e) { for (let { field: t } of this.fields)
            if (!e.has(t) && t.name !== fT) return !1; return !0 } }, bT = class { constructor(e, t) { this.ordering = e, this.resolvedFields = t } getHash() { return G(`RequiredProps`, this.ordering, this.resolvedFields) } get isMinimal() { return this.ordering.length === 0 && this.resolvedFields.size === 0 } canProvide(e) { return this.canProvideOrdering(e) && this.canProvideResolvedFields(e) } canProvideOrdering(e) { return this.ordering.length === 0 ? !0 : e.canProvideOrdering(this.ordering) } canProvideResolvedFields(e) { return this.resolvedFields.size === 0 ? !0 : e.canProvideResolvedFields(this.resolvedFields) } }, xT = class e { constructor(e) { this.parent = e, L(this, `node`), L(this, `ordering`), L(this, `fields`, []) } takeNode() { let e = this.node; return V(e, `Node is missing`), this.node = void 0, e } setNode(e) { V(!this.node, `Node already set`), this.node = e } setOrdering(e) { this.ordering = e } push() { return new e(this) } replace() { return new e(this.parent) } addField(e) { this.fields.push(e) } addFieldsFromScope(e) { for (let t of e.fields) this.addField(t) } resolveField(e, t) { let n = []; for (let r of this.fields) r.name === e && (t && r.collectionName !== t || n.push(r)); if (n.length === 1) return n[0]; if (n.length > 1) throw Error(`Ambiguous fields`); return this.parent?.resolveField(e, t) } has(e) { return this.fields.includes(e) ? !0 : this.parent?.has(e) ?? !1 } getRequiredOrdering() { return this.ordering ?? new yT } getRequiredResolvedFields() { let e = new $; for (let { field: t } of this.fields) t.collection && e.add(t); return e } getRequiredProps() { return new bT(this.getRequiredOrdering(), this.getRequiredResolvedFields()) } getNamedFields() { let e = {}; for (let { name: t, field: n } of this.fields) e[t] = n; return e } getSingleField() { V(this.fields.length === 1, `Scope must contain exactly one field`); let e = this.fields[0]; return V(e, `Field must exist`), e.field } }, ST = class { constructor() { L(this, `pointers`, new Map), L(this, `values`, new Map) } getKey() { let e = []; for (let [t, n] of this.pointers) e.push(`${t.id}-${n}`); return e.sort().join(`-`) } addValue(e, t) { this.values.set(e, t) } getValue(e) { return this.values.get(e) ?? null } mergeValues(e) { for (let [t, n] of e.values) this.addValue(t, n) } addPointer(e, t) { this.pointers.set(e, t) } getPointer(e) { return this.pointers.get(e) } mergePointers(e) { for (let [t, n] of e.pointers) this.addPointer(t, n) } merge(e) { this.mergeValues(e), this.mergePointers(e) } }, CT = class e { constructor(e, t = []) { this.fields = e, this.tuples = t } push(e) { this.tuples.push(e) } filter(t) { let n = this.tuples.filter(t); return new e(this.fields, n) } map(t, n) { return new e(t, this.tuples.map(n)) } sort(t) { let n = Array.from(this.tuples).sort(t); return new e(this.fields, n) } slice(t, n) { let r = this.tuples.slice(t, n); return new e(this.fields, r) } union(t) { let n = new $; for (let e of this.fields) t.fields.has(e) && n.add(e); let r = new Set,
            i = new e(n); for (let e of this.tuples) { let t = e.getKey();
            r.add(t), i.push(e) } for (let e of t.tuples) { let t = e.getKey();
            r.has(t) || i.push(e) } return i } intersection(t) { let n = new $; for (let e of this.fields) t.fields.has(e) && n.add(e); let r = new Set,
            i = new e(n); for (let e of this.tuples) { let t = e.getKey();
            r.add(t) } for (let e of t.tuples) { let t = e.getKey();
            r.has(t) && i.push(e) } return i } }, wT = class { constructor(e, t) { this.input = e, this.field = t } getHash() { return G(`ProjectionField`, this.input, this.field.id) } }, TT = class e extends uT { constructor(e, t, n) { let r = e.isSynchronous; for (let e of t) r &&= e.input.isSynchronous;
         super(r), this.input = e, this.projections = t, this.passthrough = n, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`RelationalProject`, this.inputGroup.id, ...this.projections, this.passthrough) } getOutputFields() { let e = new $;
         e.merge(this.passthrough); for (let t of this.projections) e.add(t.field); return e } canProvideOrdering(e) { let t = new $; for (let e of this.projections) t.add(e.field); for (let { field: n } of e.fields)
            if (t.has(n)) return !1; return !0 } canProvideResolvedFields() { return !0 } getInputRequiredProps(e) { let t = new $(e.resolvedFields); for (let e of this.projections) t.merge(e.input.referencedFields), t.delete(e.field); return new bT(e.ordering, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n),
            i = new Q(0); for (let t of this.projections) { let n = t.input.optimize(e);
            i = Q.max(i, n) } return new Q(0).add(Q.max(r, i)) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.projections.map(e => new wT(e.input.getOptimized(), e.field)), this.passthrough) }* evaluate(e) { let t = this.getOutputFields(),
            n = yield* this.input.evaluate(e), r = yield* Zd(n.tuples.map(t => Zd(this.projections.map(n => Xd({ field: n.field, value: n.input.evaluate(e, t) }))))); return n.map(t, (e, t) => { let n = new ST;
            n.mergePointers(e); for (let t of this.passthrough) { let r = e.getValue(t);
               n.addValue(t, r) } let i = r[t];
            V(i, `Projections must exist`); for (let { field: e, value: t } of i) n.addValue(e, t); return n }) } }, ET = { type: 0 }, DT = class extends lT { constructor(e, t, n) { super(n), this.referencedFields = e, this.referencedOuterFields = t, this.isSynchronous = n } evaluateSync() { return qd(this.evaluate(void 0, void 0)) } evaluateAsync() { return Jd(this.evaluate(void 0, void 0)) } }, OT = { type: 0 }, kT = class { constructor(e, t) { this.when = e, this.then = t } getHash() { return G(`CaseCondition`, this.when, this.then) } }, AT = class e extends DT { constructor(e, t, n) { let r = new $,
            i = new $,
            a = !0;
         e && (r.merge(e.referencedFields), i.merge(e.referencedOuterFields), a &&= e.isSynchronous); for (let { when: e, then: n } of t) r.merge(e.referencedFields), i.merge(e.referencedOuterFields), a &&= e.isSynchronous, r.merge(n.referencedFields), i.merge(n.referencedOuterFields), a &&= n.isSynchronous;
         n && (r.merge(n.referencedFields), i.merge(n.referencedOuterFields), a &&= n.isSynchronous), super(r, i, a), this.input = e, this.conditions = t, this.otherwise = n, L(this, `definition`, { type: `unknown`, isNullable: !0 }) } getHash() { return G(`ScalarCase`, this.input, ...this.conditions, this.otherwise) } optimize(e) { this.input?.optimize(e); for (let t of this.conditions) t.when.optimize(e), t.then.optimize(e); return this.otherwise?.optimize(e), new Q(0) } getOptimized() { let t = this.input?.getOptimized(),
            n = this.conditions.map(e => new kT(e.when.getOptimized(), e.then.getOptimized())),
            r = this.otherwise?.getOptimized(); return new e(t, n, r) }* evaluate(e, t) { let { input: n, conditions: r, otherwise: i } = yield* Xd({ input: this.input?.evaluate(e, t) ?? null, conditions: Zd(this.conditions.map(n => Xd({ when: n.when.evaluate(e, t), then: n.then.evaluate(e, t) }))), otherwise: this.otherwise?.evaluate(e, t) ?? null }); if (this.input) { for (let { when: e, then: t } of r)
               if ($w.equal(n, e, OT)) return t } else
            for (let { when: e, then: t } of r)
               if (uf(e)) return t; return i } }, jT = class { constructor(e, t, n) { this.normalizer = e, this.query = t, this.locale = n, L(this, `collectionId`, 0), L(this, `indexId`, 0), L(this, `fieldId`, 0), L(this, `subqueries`, []) } build() { let e = new xT; return this.buildQuery(e, this.query) } buildQuery(e, t) { let n = { type: `Select`, ...t }; return this.buildSelect(e, n) } buildSelect(e, t) { let n = this.buildFrom(e, t.from),
            r = n.getRequiredOrdering(); if (t.where) { let e = n.takeNode(),
               r = this.buildExpression(n, t.where),
               i = this.normalizer.newRelationalFilter(e, r);
            n.setNode(i) } let i = [],
            a = new $,
            o; if (t.orderBy) { o = new yT; for (let e of t.orderBy)
               if (e.type === `Identifier`) { let t = n.resolveField(e.name, e.collection); if (tt(t)) continue;
                  a.add(t.field); let r = new vT(t.field, e.direction);
                  o.push(r) } else { let t = this.buildExpression(n, e),
                     r = new _T($f(this.fieldId++), void 0, t.definition, void 0),
                     a = new wT(t, r);
                  i.push(a); let s = new vT(r, e.direction);
                  o.push(s) } o.merge(r) } else o = r; let s = this.buildSelectList(n, t.select, a, i); if (s.setOrdering(o), t.offset) { let n = s.takeNode(),
               r = this.buildExpression(e, t.offset),
               i = this.normalizer.newRelationalOffset(n, r, o);
            s.setNode(i) } if (t.limit) { let n = s.takeNode(),
               r = this.buildExpression(e, t.limit),
               i = this.normalizer.newRelationalLimit(n, r, o);
            s.setNode(i) } return s } buildSelectList(e, t, n, r) { let i = e.push(),
            a = new $(n),
            o = [...r]; for (let n of t)
            if (n.type === `Identifier`) { let t = e.resolveField(n.name, n.collection); if (tt(t)) continue;
               a.add(t.field), i.addField({ ...t, name: n.alias ?? t.name }) } else { let t = this.buildExpression(e, n);
               V(n.alias, `Subqueries should have an alias`); let r = $f(this.fieldId++),
                  a = n.alias,
                  s = new _T(r, a, t.definition, void 0),
                  c = new wT(t, s);
               o.push(c), i.addField({ field: s, name: a }) } let s = e.takeNode(),
            c = this.normalizer.newRelationalProject(s, o, a); return i.setNode(c), i } buildFrom(e, t) { switch (t.type) {
            case `Collection`:
               return this.buildCollection(e, t);
            case `LeftJoin`:
               return this.buildJoin(e, t);
            default:
               H(t, `Unsupported from type`) } } buildCollection(e, t) { let n = e.push(),
            r = Bf(t.data, this.locale),
            i = t.alias,
            a = new mT(Zf(this.collectionId++), i, r); for (let [e, t] of Object.entries(r.schema)) { let r = new _T($f(this.fieldId++), e, t, a);
            n.addField({ field: r, name: e, collectionName: i }), a.fields.add(r) } { let e = new _T($f(this.fieldId++), fT, { type: `number`, isNullable: !1 }, a);
            n.addField({ field: e, name: fT, collectionName: i }); let t = new yT,
               r = new vT(e);
            t.push(r), n.setOrdering(t) } for (let e of r.indexes) { let t = []; for (let r of e.fields) { let e = this.buildExpression(n, r);
               t.push(e) } let r;
            e.where && (r = this.buildExpression(n, e.where)); let i = new yT,
               o = new hT(Qf(this.indexId++), e, a, t, r, i);
            a.indexes.add(o) } let o = this.normalizer.newRelationalScan(a); return n.setNode(o), n } buildJoin(e, t) { let n = this.buildFrom(e, t.left),
            r = this.buildFrom(e, t.right),
            i = new yT,
            a = n.getRequiredOrdering();
         i.merge(a); let o = r.getRequiredOrdering();
         i.merge(o); let s = e.push();
         s.addFieldsFromScope(n), s.addFieldsFromScope(r), s.setOrdering(i); let c = this.buildExpression(s, t.constraint),
            l = n.takeNode(),
            u = r.takeNode(),
            d; switch (t.type) {
            case `LeftJoin`:
               d = this.normalizer.newRelationalLeftJoin(l, u, c); break;
            default:
               H(t.type, `Unsupported join type`) } return s.setNode(d), s } buildExpression(e, t) { switch (t.type) {
            case `Identifier`:
               return this.buildIdentifier(e, t);
            case `LiteralValue`:
               return this.buildLiteralValue(t);
            case `FunctionCall`:
               return this.buildFunctionCall(e, t);
            case `Case`:
               return this.buildCase(e, t);
            case `UnaryOperation`:
               return this.buildUnaryOperation(e, t);
            case `BinaryOperation`:
               return this.buildBinaryOperation(e, t);
            case `TypeCast`:
               return this.buildTypeCast(e, t);
            case `Select`:
               throw Error(`Subqueries are only supported inside subquery function calls`);
            default:
               H(t, `Unsupported expression`) } } buildIdentifier(e, t) { let n = e.resolveField(t.name, t.collection); if (n) { let e = !1; for (let t of this.subqueries) e ? t.referencedOuterFields.add(n.field) : (e = t.inScope.has(n), e && t.referencedFields.add(n.field)); return this.normalizer.newScalarVariable(n.field, e) } return this.normalizer.newScalarConstant(eT, null) } buildLiteralValue(e) { let t = $w.parse(e.value); return this.normalizer.newScalarConstant(eT, t) } buildFunctionCall(e, t) { let n = n => { let r = t.arguments[n]; return V(r, `Missing argument`), this.buildExpression(e, r) },
            r = t.functionName; switch (r) {
            case `CONTAINS`: { let e = n(0),
                  t = n(1); return this.normalizer.newScalarContains(e, t) }
            case `STARTS_WITH`: { let e = n(0),
                  t = n(1); return this.normalizer.newScalarStartsWith(e, t) }
            case `ENDS_WITH`: { let e = n(0),
                  t = n(1); return this.normalizer.newScalarEndsWith(e, t) }
            case `LENGTH`: { let e = n(0); return this.normalizer.newScalarLength(e) }
            case `INDEX_OF`: { let e = n(0),
                  t = n(1); return this.normalizer.newScalarIndexOf(e, t) }
            case `ARRAY`: { let n = t.arguments[0]; return V(n, `Missing argument`), V(n.type === `Select`, `Subqueries require a select expression`), this.buildSubqueryArray(e, n) }
            case `FLAT_ARRAY`: { let n = t.arguments[0]; return V(n, `Missing argument`), V(n.type === `Select`, `Subqueries require a select expression`), this.buildSubqueryFlatArray(e, n) }
            case `INTERSECT`: { let e = n(0),
                  t = n(1); return this.normalizer.newScalarIntersection(e, t) }
            default:
               H(r, `Unsupported function name`) } } buildSubqueryArray(e, t) { try { let n = new MT(e);
            this.subqueries.push(n); let r = this.buildSelect(e, t),
               i = r.takeNode(),
               a = r.getNamedFields(),
               o = r.getRequiredOrdering(),
               s = n.referencedFields,
               c = n.referencedOuterFields; return this.normalizer.newScalarArray(i, a, o, s, c) } finally { this.subqueries.pop() } } buildSubqueryFlatArray(e, t) { try { let n = new MT(e);
            this.subqueries.push(n); let r = this.buildSelect(e, t),
               i = r.takeNode(),
               a = r.getSingleField(),
               o = r.getRequiredOrdering(),
               s = n.referencedFields,
               c = n.referencedOuterFields; return this.normalizer.newScalarFlatArray(i, a, o, s, c) } finally { this.subqueries.pop() } } buildCase(e, t) { let n;
         t.value && (n = this.buildExpression(e, t.value)); let r = t.conditions.map(t => new kT(this.buildExpression(e, t.when), this.buildExpression(e, t.then))),
            i; return t.else && (i = this.buildExpression(e, t.else)), this.normalizer.newScalarCase(n, r, i) } buildUnaryOperation(e, t) { let n = this.buildExpression(e, t.value); switch (t.operator) {
            case `not`:
               return this.normalizer.newScalarNot(n);
            default:
               H(t.operator, `Unsupported unary operator`) } } buildBinaryOperation(e, t) { let n = this.buildExpression(e, t.left),
            r = this.buildExpression(e, t.right); switch (t.operator) {
            case `and`:
               return this.normalizer.newScalarAnd(n, r);
            case `or`:
               return this.normalizer.newScalarOr(n, r);
            case `==`:
               return this.normalizer.newScalarEquals(n, r);
            case `!=`:
               return this.normalizer.newScalarNotEquals(n, r);
            case `<`:
               return this.normalizer.newScalarLessThan(n, r);
            case `<=`:
               return this.normalizer.newScalarLessThanOrEqual(n, r);
            case `>`:
               return this.normalizer.newScalarGreaterThan(n, r);
            case `>=`:
               return this.normalizer.newScalarGreaterThanOrEqual(n, r);
            case `in`:
               return this.normalizer.newScalarIn(n, r);
            default:
               H(t.operator, `Unsupported binary operator`) } } buildTypeCast(e, t) { let n = this.buildExpression(e, t.value); switch (t.dataType) {
            case `BOOLEAN`:
               return this.normalizer.newScalarCast(n, { type: `boolean`, isNullable: !0 });
            case `DATE`:
               return this.normalizer.newScalarCast(n, { type: `date`, isNullable: !0 });
            case `NUMBER`:
               return this.normalizer.newScalarCast(n, { type: `number`, isNullable: !0 });
            case `STRING`:
               return this.normalizer.newScalarCast(n, { type: `string`, isNullable: !0 });
            default:
               throw Error(`Unsupported data type`) } } }, MT = class { constructor(e) { this.inScope = e, L(this, `referencedFields`, new $), L(this, `referencedOuterFields`, new $) } }, NT = class e extends uT { constructor(e, t) { super(e.isSynchronous && t.isSynchronous), this.input = e, this.predicate = t, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`RelationalFilter`, this.inputGroup.id, this.predicate) } getOutputFields() { return this.inputGroup.relational.outputFields } canProvideOrdering() { return !0 } canProvideResolvedFields() { return !0 } getInputRequiredProps(e) { let t = new $(e.resolvedFields); return t.merge(this.predicate.referencedFields), new bT(e.ordering, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n),
            i = this.predicate.optimize(e); return new Q(0).add(Q.max(r, i)) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.predicate.getOptimized()) }* evaluate(e) { let t = yield* this.input.evaluate(e), n = yield* Zd(t.tuples.map(t => this.predicate.evaluate(e, t))); return t.filter((e, t) => uf(n[t] ?? null)) } }, PT = class e extends uT { constructor(e, t) { super(!1), this.index = e, this.query = t } getHash() { return G(`RelationalIndexLookup`, this.index.id, ...this.query) } getOutputFields() { return this.index.collection.fields } canProvideOrdering(e) { return e.equals(this.index.ordering) } canProvideResolvedFields(e) { return e.subsetOf(this.index.resolvedFields) } optimize() { let e = this.query.every(e => e.type === `All`); return Q.estimate(1, e ? 100 * oT : 50 * oT) } getOptimized() { return new e(this.index, this.query) }* evaluate() { let e = this.index,
            t = e.collection; return new CT(this.getOutputFields(), (yield e.data.lookupItems(this.query)).map(n => { let r = new ST; for (let i of e.resolvedFields) { let e = i.getValue(n);
               r.addPointer(t, n.pointer), r.addValue(i, e) } return r })) } }, FT = class e extends uT { constructor(e, t) { super(e.isSynchronous && t.isSynchronous), this.left = e, this.right = t, L(this, `leftGroup`), L(this, `rightGroup`), this.leftGroup = e.getGroup(), this.rightGroup = t.getGroup() } getHash() { return G(`RelationalIntersection`, this.leftGroup.id, this.rightGroup.id) } getOutputFields() { let e = new $,
            t = this.leftGroup.relational.outputFields,
            n = this.rightGroup.relational.outputFields; for (let r of t) n.has(r) && e.add(r); return e } canProvideOrdering() { return !1 } canProvideResolvedFields() { return !0 } getChildRequiredProps(e) { return new bT(new yT, e.resolvedFields) } optimize(e, t) { let n = this.getChildRequiredProps(t),
            r = e.optimizeGroup(this.leftGroup, n),
            i = this.getChildRequiredProps(t),
            a = e.optimizeGroup(this.rightGroup, i); return Q.max(r, a) } getOptimized(t) { let n = this.getChildRequiredProps(t),
            r = this.leftGroup.getOptimized(n),
            i = this.getChildRequiredProps(t); return new e(r, this.rightGroup.getOptimized(i)) }* evaluate(e) { let { left: t, right: n } = yield* Xd({ left: this.left.evaluate(e), right: this.right.evaluate(e) }); return t.intersection(n) } }, IT = class e extends uT { constructor(e) { super(!1), this.collection = e } getHash() { return G(`RelationalScan`, this.collection.id) } getOutputFields() { return this.collection.fields } canProvideOrdering() { return !1 } canProvideResolvedFields(e) { return e.subsetOf(this.collection.fields) } optimize() { return Q.estimate(1, 200 * oT) } getOptimized() { return new e(this.collection) }* evaluate() { let e = this.collection,
            t = this.getOutputFields(); return new CT(t, (yield e.data.scanItems()).map(n => { let r = new ST; for (let i of t) { let t = i.getValue(n);
               r.addPointer(e, n.pointer), r.addValue(i, t) } return r })) } }, LT = class e extends uT { constructor(e, t) { super(e.isSynchronous && t.isSynchronous), this.left = e, this.right = t, L(this, `leftGroup`), L(this, `rightGroup`), this.leftGroup = e.getGroup(), this.rightGroup = t.getGroup() } getHash() { return G(`RelationalUnion`, this.leftGroup.id, this.rightGroup.id) } getOutputFields() { let e = new $,
            t = this.leftGroup.relational.outputFields,
            n = this.rightGroup.relational.outputFields; for (let r of t) n.has(r) && e.add(r); return e } canProvideOrdering() { return !1 } canProvideResolvedFields() { return !0 } getChildRequiredProps(e) { return new bT(new yT, e.resolvedFields) } optimize(e, t) { let n = this.getChildRequiredProps(t),
            r = e.optimizeGroup(this.leftGroup, n),
            i = this.getChildRequiredProps(t),
            a = e.optimizeGroup(this.rightGroup, i); return Q.max(r, a) } getOptimized(t) { let n = this.getChildRequiredProps(t),
            r = this.leftGroup.getOptimized(n),
            i = this.getChildRequiredProps(t); return new e(r, this.rightGroup.getOptimized(i)) }* evaluate(e) { let { left: t, right: n } = yield* Xd({ left: this.left.evaluate(e), right: this.right.evaluate(e) }); return t.union(n) } }, RT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarAnd`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: uf(n) && uf(r) } } }, zT = class extends DT { constructor(e, t) { let n = new $,
            r = new $;
         super(n, r, !0), this.definition = e, this.value = t } getHash() { return G(`ScalarConstant`, this.definition, this.value) } optimize() { return new Q(0) } getOptimized() { return this }* evaluate() { return this.value } }, BT = { type: 0 }, VT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.source = e, this.target = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarContains`, this.source, this.target) } optimize(e) { let t = this.source.optimize(e),
            n = this.target.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.source.getOptimized(), this.target.getOptimized()) }* evaluate(e, t) { let { source: n, target: r } = yield* Xd({ source: this.source.evaluate(e, t), target: this.target.evaluate(e, t) }); return { type: `boolean`, value: $w.contains(n, r, BT) } } }, HT = { type: 0 }, UT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.source = e, this.target = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarEndsWith`, this.source, this.target) } optimize(e) { let t = this.source.optimize(e),
            n = this.target.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.source.getOptimized(), this.target.getOptimized()) }* evaluate(e, t) { let { source: n, target: r } = yield* Xd({ source: this.source.evaluate(e, t), target: this.target.evaluate(e, t) }); return { type: `boolean`, value: $w.endsWith(n, r, HT) } } }, WT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarEquals`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.equal(n, r, ET) } } }, GT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarGreaterThan`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.greaterThan(n, r, ET) } } }, KT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarGreaterThanOrEqual`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.greaterThanOrEqual(n, r, ET) } } }, qT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarLessThan`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.lessThan(n, r, ET) } } }, JT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarLessThanOrEqual`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.lessThanOrEqual(n, r, ET) } } }, YT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarNotEquals`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: !$w.equal(n, r, ET) } } }, XT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarOr`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: uf(n) || uf(r) } } }, ZT = { type: 0 }, QT = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.source = e, this.target = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarStartsWith`, this.source, this.target) } optimize(e) { let t = this.source.optimize(e),
            n = this.target.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.source.getOptimized(), this.target.getOptimized()) }* evaluate(e, t) { let { source: n, target: r } = yield* Xd({ source: this.source.evaluate(e, t), target: this.target.evaluate(e, t) }); return { type: `boolean`, value: $w.startsWith(n, r, ZT) } } }, $T = class { constructor(e) { this.normalizer = e, L(this, `memo`), this.memo = e.memo } explore(e) { let t = e.getGroup(); if (e instanceof NT) { if (e.predicate instanceof RT) { let n = new FT(this.normalizer.newRelationalFilter(e.input, e.predicate.left), this.normalizer.newRelationalFilter(e.input, e.predicate.right));
               this.memo.addRelational(n, t) } if (e.predicate instanceof XT) { let n = new LT(this.normalizer.newRelationalFilter(e.input, e.predicate.left), this.normalizer.newRelationalFilter(e.input, e.predicate.right));
               this.memo.addRelational(n, t) } } if (e instanceof IT)
            for (let n of e.collection.indexes) { if (n.constraint) continue; let e = new PT(n, ep(n.lookupNodes.length));
               this.memo.addRelational(e, t) }
         if (e instanceof NT) { for (let n of e.inputGroup.nodes)
               if (n instanceof IT)
                  for (let r of n.collection.indexes) { if (e.predicate instanceof WT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`Equals`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `Equals`, value: e.predicate.right.value }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof YT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`NotEquals`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `NotEquals`, value: e.predicate.right.value }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof qT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`LessThan`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `LessThan`, value: e.predicate.right.value, inclusive: !1 }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof JT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`LessThan`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `LessThan`, value: e.predicate.right.value, inclusive: !0 }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof GT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`GreaterThan`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `GreaterThan`, value: e.predicate.right.value, inclusive: !1 }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof KT && e.predicate.left === r.lookupNodes[0] && e.predicate.right instanceof zT && r.data.supportedLookupTypes.includes(`GreaterThan`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `GreaterThan`, value: e.predicate.right.value, inclusive: !0 }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof VT && e.predicate.source === r.lookupNodes[0] && e.predicate.target instanceof zT && r.data.supportedLookupTypes.includes(`Contains`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `Contains`, value: e.predicate.target.value }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof QT && e.predicate.source === r.lookupNodes[0] && e.predicate.target instanceof zT && r.data.supportedLookupTypes.includes(`StartsWith`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `StartsWith`, value: e.predicate.target.value }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } if (e.predicate instanceof UT && e.predicate.source === r.lookupNodes[0] && e.predicate.target instanceof zT && r.data.supportedLookupTypes.includes(`EndsWith`)) { let n = ep(r.lookupNodes.length);
                        n[0] = { type: `EndsWith`, value: e.predicate.target.value }; let i = new PT(r, n);
                        this.memo.addRelational(i, t) } } } } }, eE = class { constructor(e) { this.outputFields = e } isCompatible(e) { return this.outputFields.equals(e.outputFields) } }, tE = class { constructor() { L(this, `nodes`, new Map), L(this, `groups`, []) } addGroup(e) { let t = new sT(Uf(this.groups.length), e); return this.groups.push(t), t } addRelational(e, t) { let n = e.getHash(),
            r = this.nodes.get(n); if (r) return r;
         this.nodes.set(n, e); let i = new eE(e.getOutputFields()); return t ??= this.addGroup(i), t.addNode(e), V(i.isCompatible(t.relational), `Group has inconsistent relational props`), e } addScalar(e) { let t = e.getHash(); return this.nodes.get(t) || (this.nodes.set(t, e), e) } }, nE = class e extends uT { constructor(e, t, n) { super(e.isSynchronous && t.isSynchronous && n.isSynchronous), this.left = e, this.right = t, this.constraint = n, L(this, `leftGroup`), L(this, `rightGroup`), this.leftGroup = e.getGroup(), this.rightGroup = t.getGroup() } getHash() { return G(`RelationalLeftJoin`, this.leftGroup.id, this.rightGroup.id, this.constraint) } getOutputFields() { let e = new $; return e.merge(this.leftGroup.relational.outputFields), e.merge(this.rightGroup.relational.outputFields), e } canProvideOrdering() { return !1 } canProvideResolvedFields() { return !0 } getChildRequiredProps(e, t) { let n = new $,
            r = e.relational.outputFields; for (let e of t.resolvedFields) r.has(e) && n.add(e); for (let e of this.constraint.referencedFields) r.has(e) && n.add(e); return new bT(new yT, n) } optimize(e, t) { let n = this.getChildRequiredProps(this.leftGroup, t),
            r = e.optimizeGroup(this.leftGroup, n),
            i = this.getChildRequiredProps(this.rightGroup, t),
            a = e.optimizeGroup(this.rightGroup, i),
            o = this.constraint.optimize(e); return Q.max(Q.max(r, a), o) } getOptimized(t) { let n = this.getChildRequiredProps(this.leftGroup, t),
            r = this.leftGroup.getOptimized(n),
            i = this.getChildRequiredProps(this.rightGroup, t); return new e(r, this.rightGroup.getOptimized(i), this.constraint.getOptimized()) }* evaluateScalarEquals(e, t, n, r, i) { let a = new Map; for (let e of t.tuples) { let t = yield* r.evaluate(i, e), n = JSON.stringify(t?.value ?? null), o = a.get(n) ?? [];
            o.push(e), a.set(n, o) } let o = new CT(this.getOutputFields()); for (let t of e.tuples) { let e = yield* n.evaluate(i, t), r = JSON.stringify(e?.value ?? null), s = a.get(r) ?? []; if (s.length === 0) o.push(t);
            else
               for (let e of s) { let n = new ST;
                  n.merge(t), n.merge(e), o.push(n) } } return o }* evaluate(e) { let { left: t, right: n } = yield* Xd({ left: this.left.evaluate(e), right: this.right.evaluate(e) }); if (this.constraint instanceof WT) { if (this.constraint.left.referencedFields.subsetOf(this.leftGroup.relational.outputFields) && this.constraint.right.referencedFields.subsetOf(this.rightGroup.relational.outputFields)) return yield* this.evaluateScalarEquals(t, n, this.constraint.left, this.constraint.right, e); if (this.constraint.right.referencedFields.subsetOf(this.leftGroup.relational.outputFields) && this.constraint.left.referencedFields.subsetOf(this.rightGroup.relational.outputFields)) return yield* this.evaluateScalarEquals(t, n, this.constraint.right, this.constraint.left, e) } let r = new CT(this.getOutputFields()); for (let i of t.tuples) { let t = !1; for (let a of n.tuples) { let n = new ST;
               n.merge(i), n.merge(a), uf(yield* this.constraint.evaluate(e, n)) && (r.push(n), t = !0) } t || r.push(i) } return r } }, rE = class e extends uT { constructor(e, t, n) { super(e.isSynchronous && t.isSynchronous), this.input = e, this.limit = t, this.ordering = n, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`RelationalLimit`, this.inputGroup.id, this.limit) } getOutputFields() { return this.inputGroup.relational.outputFields } canProvideOrdering(e) { return e.equals(this.ordering) } canProvideResolvedFields() { return !0 } getInputRequiredProps(e) { let t = new $(e.resolvedFields); return t.merge(this.limit.referencedFields), new bT(this.ordering, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n),
            i = this.limit.optimize(e); return new Q(0).add(Q.max(r, i)) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.limit.getOptimized(), this.ordering) }* evaluate(e) { let { input: t, limit: n } = yield* Xd({ input: this.input.evaluate(e), limit: this.limit.evaluate(e, void 0) }), r = Cf(n) ?? 1 / 0; return r === 1 / 0 ? t : t.slice(0, r) } }, iE = class e extends uT { constructor(e, t, n) { super(e.isSynchronous && t.isSynchronous), this.input = e, this.offset = t, this.ordering = n, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`RelationalOffset`, this.inputGroup.id, this.offset) } getOutputFields() { return this.inputGroup.relational.outputFields } canProvideOrdering(e) { return e.equals(this.ordering) } canProvideResolvedFields() { return !0 } getInputRequiredProps(e) { let t = new $(e.resolvedFields); return t.merge(this.offset.referencedFields), new bT(this.ordering, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n),
            i = this.offset.optimize(e); return new Q(0).add(Q.max(r, i)) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.offset.getOptimized(), this.ordering) }* evaluate(e) { let { input: t, offset: n } = yield* Xd({ input: this.input.evaluate(e), offset: this.offset.evaluate(e, void 0) }), r = Cf(n) ?? 0; return r === 0 ? t : t.slice(r) } }, aE = class e extends DT { constructor(e, t, n, r, i) { super(r, i, e.isSynchronous), this.input = e, this.namedFields = t, this.ordering = n, this.referencedFields = r, this.referencedOuterFields = i, L(this, `inputGroup`), L(this, `definition`), this.inputGroup = e.getGroup(); let a = {},
            o = Object.entries(t); for (let [e, t] of o) a[e] = t.definition;
         this.definition = { type: `array`, isNullable: !1, definition: { type: `object`, isNullable: !1, definitions: a } } } getHash() { let e = {},
            t = Object.entries(this.namedFields); for (let [n, r] of t) e[n] = r.id; return G(`ScalarArray`, this.inputGroup.id, e, this.ordering, this.referencedFields, this.referencedOuterFields) } getInputRequiredProps() { let e = new $,
            t = Object.values(this.namedFields); for (let n of t) tt(n.collection) || e.add(n); return new bT(this.ordering, e) } optimize(e) { let t = this.getInputRequiredProps(),
            n = e.optimizeGroup(this.inputGroup, t); return new Q(0).add(n) } getOptimized() { let t = this.getInputRequiredProps(); return new e(this.inputGroup.getOptimized(t), this.namedFields, this.ordering, this.referencedFields, this.referencedOuterFields) }* evaluate(e, t) { let n = new ST;
         e && n.merge(e), t && n.merge(t); let r = yield* this.input.evaluate(n), i = Object.entries(this.namedFields); return { type: `array`, value: r.tuples.map(e => { let t = {}; for (let [n, r] of i) t[n] = e.getValue(r); return { type: `object`, value: t } }) } } }, oE = class e extends DT { constructor(e, t) { super(e.referencedFields, e.referencedOuterFields, e.isSynchronous), this.input = e, this.definition = t, V(t.isNullable, `Unsupported non-nullable cast`) } getHash() { return G(`ScalarCast`, this.input, this.definition) } optimize(e) { return this.input.optimize(e) } getOptimized() { return new e(this.input.getOptimized(), this.definition) }* evaluate(e, t) { let n = yield* this.input.evaluate(e, t); return $w.cast(n, this.definition) } }, sE = class e extends DT { constructor(e, t, n, r, i) { super(r, i, e.isSynchronous), this.input = e, this.field = t, this.ordering = n, this.referencedFields = r, this.referencedOuterFields = i, L(this, `inputGroup`), L(this, `definition`), this.inputGroup = e.getGroup(), this.definition = { type: `array`, isNullable: !1, definition: t.definition } } getHash() { return G(`ScalarFlatArray`, this.inputGroup.id, this.field.id, this.ordering, this.referencedFields, this.referencedOuterFields) } getInputRequiredProps() { let e = new $; return tt(this.field.collection) || e.add(this.field), new bT(this.ordering, e) } optimize(e) { let t = this.getInputRequiredProps(),
            n = e.optimizeGroup(this.inputGroup, t); return new Q(0).add(n) } getOptimized() { let t = this.getInputRequiredProps(); return new e(this.inputGroup.getOptimized(t), this.field, this.ordering, this.referencedFields, this.referencedOuterFields) }* evaluate(e, t) { let n = new ST; return e && n.merge(e), t && n.merge(t), { type: `array`, value: (yield* this.input.evaluate(n)).tuples.map(e => e.getValue(this.field)) } } }, cE = { type: 0 }, lE = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarIn`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: $w.in(n, r, cE) } } }, uE = { type: 1 }, dE = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.source = e, this.target = t, L(this, `definition`, { type: `number`, isNullable: !1 }) } getHash() { return G(`ScalarIndexOf`, this.source, this.target) } optimize(e) { let t = this.source.optimize(e),
            n = this.target.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.source.getOptimized(), this.target.getOptimized()) }* evaluate(e, t) { let { source: n, target: r } = yield* Xd({ source: this.source.evaluate(e, t), target: this.target.evaluate(e, t) }); return { type: `number`, value: $w.indexOf(n, r, uE) } } }, fE = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `array`, definition: { type: `string`, isNullable: !1 }, isNullable: !1 }) } getHash() { return G(`ScalarIntersection`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }), i = np(n), a = np(r), o = [], s = i.size < a.size ? i : a, c = s === i ? a : i; for (let e of s) c.has(e) && o.push({ type: `string`, value: e }); return { type: `array`, value: o } } }, pE = class e extends DT { constructor(e) { super(e.referencedFields, e.referencedOuterFields, e.isSynchronous), this.input = e, L(this, `definition`, { type: `number`, isNullable: !1 }) } getHash() { return G(`ScalarLength`, this.input) } optimize(e) { return this.input.optimize(e) } getOptimized() { return new e(this.input.getOptimized()) }* evaluate(e, t) { let n = yield* this.input.evaluate(e, t); return { type: `number`, value: $w.length(n) } } }, mE = class e extends DT { constructor(e) { super(e.referencedFields, e.referencedOuterFields, e.isSynchronous), this.input = e, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarNot`, this.input) } optimize(e) { return this.input.optimize(e) } getOptimized() { return new e(this.input.getOptimized()) }* evaluate(e, t) { return { type: `boolean`, value: !uf(yield* this.input.evaluate(e, t)) } } }, hE = { type: 0 }, gE = class e extends DT { constructor(e, t) { let n = new $;
         n.merge(e.referencedFields), n.merge(t.referencedFields); let r = new $;
         r.merge(e.referencedOuterFields), r.merge(t.referencedOuterFields); let i = e.isSynchronous && t.isSynchronous;
         super(n, r, i), this.left = e, this.right = t, L(this, `definition`, { type: `boolean`, isNullable: !1 }) } getHash() { return G(`ScalarNotIn`, this.left, this.right) } optimize(e) { let t = this.left.optimize(e),
            n = this.right.optimize(e); return Q.max(t, n) } getOptimized() { return new e(this.left.getOptimized(), this.right.getOptimized()) }* evaluate(e, t) { let { left: n, right: r } = yield* Xd({ left: this.left.evaluate(e, t), right: this.right.evaluate(e, t) }); return { type: `boolean`, value: !$w.in(n, r, hE) } } }, _E = class extends DT { constructor(e, t) { V(e.name !== fT, `Invalid field name`); let n = new $,
            r = new $;
         t ? r.add(e) : n.add(e), super(n, r, !0), this.field = e, this.isOuterField = t, L(this, `definition`), this.definition = e.definition } getHash() { return G(`ScalarVariable`, this.field.id, this.isOuterField) } optimize() { return new Q(0) } getOptimized() { return this }* evaluate(e, t) { return this.isOuterField ? (V(e, `Context must exist`), e.getValue(this.field)) : (V(t, `Tuple must exist`), t.getValue(this.field)) } }, vE = class { constructor(e) { this.memo = e } finishRelational(e) { return this.memo.addRelational(e) } newRelationalScan(e) { let t = new IT(e); return this.finishRelational(t) } newRelationalIndexLookup(e, t) { let n = new PT(e, t); return this.finishRelational(n) } newRelationalLeftJoin(e, t, n) { let r = new nE(e, t, n); return this.finishRelational(r) } newRelationalRightJoin(e, t, n) { return this.newRelationalLeftJoin(t, e, n) } newRelationalFilter(e, t) { if (t instanceof zT && t.value?.type === `boolean` && t.value.value === !0) return e; if (e instanceof nE && t.referencedFields.subsetOf(e.leftGroup.relational.outputFields)) { let n = this.newRelationalFilter(e.left, t); return this.newRelationalLeftJoin(n, e.right, e.constraint) } let n = new NT(e, t); return this.finishRelational(n) } newRelationalProject(e, t, n) { let r = new TT(e, t, n); return this.finishRelational(r) } newRelationalLimit(e, t, n) { if (e instanceof TT && t.referencedFields.subsetOf(e.inputGroup.relational.outputFields) && n.providedByFields(e.inputGroup.relational.outputFields)) { let r = this.newRelationalLimit(e.input, t, n); return this.newRelationalProject(r, e.projections, e.passthrough) } let r = new rE(e, t, n); return this.finishRelational(r) } newRelationalOffset(e, t, n) { let r = new iE(e, t, n); return this.finishRelational(r) } finishScalar(e) { if (!(e instanceof zT) && e.isSynchronous && e.referencedFields.size === 0 && e.referencedOuterFields.size === 0) { let t = e.evaluateSync(); return this.newScalarConstant(e.definition, t) } return this.memo.addScalar(e) } removeUnknown(e, t) { if (e.definition.type !== `unknown` || t.type === `unknown`) return e; let n = { ...t, isNullable: !0 }; return this.newScalarCast(e, n) } newScalarVariable(e, t) { let n = new _E(e, t); return this.finishScalar(n) } newScalarConstant(e, t) { let n = new zT(e, t); return this.finishScalar(n) } newScalarNot(e) { if (e instanceof mE) return e.input.definition.type === `boolean` ? e.input : this.newScalarCast(e.input, { type: `boolean`, isNullable: !0 }); if (e instanceof WT) return this.newScalarNotEquals(e.left, e.right); if (e instanceof YT) return this.newScalarEquals(e.left, e.right); if (e instanceof qT) return this.newScalarGreaterThanOrEqual(e.left, e.right); if (e instanceof JT) return this.newScalarGreaterThan(e.left, e.right); if (e instanceof GT) return this.newScalarLessThanOrEqual(e.left, e.right); if (e instanceof KT) return this.newScalarLessThan(e.left, e.right); if (e instanceof RT) { let t = this.newScalarNot(e.left),
               n = this.newScalarNot(e.right); return this.newScalarOr(t, n) } if (e instanceof XT) { let t = this.newScalarNot(e.left),
               n = this.newScalarNot(e.right); return this.newScalarAnd(t, n) } let t = new mE(e); return this.finishScalar(t) } newScalarAnd(e, t) { if (t instanceof zT && t.value?.type === `boolean` && t.value.value === !0) return e; if (e instanceof zT && e.value?.type === `boolean` && e.value.value === !0 || t instanceof zT && t.value?.type === `boolean` && t.value.value === !1) return t; if (e instanceof zT && e.value?.type === `boolean` && e.value.value === !1) return e; let n = new RT(e, t); return this.finishScalar(n) } newScalarOr(e, t) { if (t instanceof zT && t.value?.type === `boolean` && t.value.value === !0) return t; if (e instanceof zT && e.value?.type === `boolean` && e.value.value === !0 || t instanceof zT && t.value?.type === `boolean` && t.value.value === !1) return e; if (e instanceof zT && e.value?.type === `boolean` && e.value.value === !1) return t; let n = new XT(e, t); return this.finishScalar(n) } newScalarEquals(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarEquals(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new WT(e, t); return this.finishScalar(r) } newScalarNotEquals(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarNotEquals(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new YT(e, t); return this.finishScalar(r) } newScalarLessThan(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarGreaterThan(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new qT(e, t); return this.finishScalar(r) } newScalarLessThanOrEqual(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarGreaterThanOrEqual(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new JT(e, t); return this.finishScalar(r) } newScalarGreaterThan(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarLessThan(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new GT(e, t); return this.finishScalar(r) } newScalarGreaterThanOrEqual(e, t) { let n = e instanceof _E; if (t instanceof _E && !n) return this.newScalarLessThanOrEqual(t, e);
         e = this.removeUnknown(e, t.definition), t = this.removeUnknown(t, e.definition); let r = new KT(e, t); return this.finishScalar(r) } newScalarIn(e, t) { t.definition.type === `array` && (e = this.removeUnknown(e, t.definition.definition)); let n = { type: `array`, isNullable: !0, definition: e.definition };
         t = this.removeUnknown(t, n); let r = new lE(e, t); return this.finishScalar(r) } newScalarNotIn(e, t) { t.definition.type === `array` && (e = this.removeUnknown(e, t.definition.definition)); let n = { type: `array`, isNullable: !0, definition: e.definition };
         t = this.removeUnknown(t, n); let r = new gE(e, t); return this.finishScalar(r) } newScalarCase(e, t, n) { if (e) { let n = []; for (let { when: r, then: i } of t) { let t = new kT(this.removeUnknown(r, e.definition), i);
               n.push(t) } t = n } let r = new AT(e, t, n); return this.finishScalar(r) } newScalarContains(e, t) { let n = new VT(e, t); return this.finishScalar(n) } newScalarStartsWith(e, t) { let n = new QT(e, t); return this.finishScalar(n) } newScalarEndsWith(e, t) { let n = new UT(e, t); return this.finishScalar(n) } newScalarLength(e) { let t = new pE(e); return this.finishScalar(t) } newScalarIndexOf(e, t) { let n = new dE(e, t); return this.finishScalar(n) } newScalarArray(e, t, n, r, i) { let a = new aE(e, t, n, r, i); return this.finishScalar(a) } newScalarFlatArray(e, t, n, r, i) { let a = new sE(e, t, n, r, i); return this.finishScalar(a) } newScalarIntersection(e, t) { let n = new fE(e, t); return this.finishScalar(n) } newScalarCast(e, t) { if (e.definition.type === t.type) return e; let n = new oE(e, t); return this.finishScalar(n) } }, yE = class extends uT {}, bE = class e extends yE { constructor(e, t, n) { super(!1), this.input = e, this.fields = t, this.resolver = n, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`EnforcerResolve`, this.inputGroup.id, this.fields) } getOutputFields() { return this.inputGroup.relational.outputFields } canProvideOrdering() { return !0 } canProvideResolvedFields(e) { return e.subsetOf(this.fields) } getInputRequiredProps(e) { let t = new $; return new bT(e.ordering, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n); return Q.estimate(0, 100 * oT).add(r) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.fields, this.resolver) }* evaluate(e) { let t = yield* this.input.evaluate(e);
         V(this.fields.subsetOf(t.fields), `Fields can't be resolved`); let n = new Set; for (let e of this.fields) V(e.collection, `Collection required to resolve field`), n.add(e.collection); for (let e of t.tuples)
            for (let t of this.fields) { let n = e.getValue(t);
               n?.type === `richtext` ? this.resolver.preloadRichTextValue(n) : n?.type === `vectorsetitem` && this.resolver.preloadVectorSetItemValue(n) }
         let r = yield Promise.all(Array.from(n).map(async e => { let n = []; for (let r of t.tuples) { let t = r.getPointer(e);
               t && n.push(t) } let r = await e.data.resolveItems(n); return V(r.length === n.length, `Invalid number of items`), [e, r] })); return t.map(t.fields, e => { let t = new ST;
            t.merge(e); for (let [n, i] of r) { let r = e.getPointer(n); if (!r) continue; let a = i.shift();
               V(a, `Item not found`), V(a.pointer === r, `Pointer mismatch`); for (let e of n.fields) { let n = e.getValue(a);
                  t.addValue(e, n) } } return t }) } }, xE = { type: 0 }, SE = class e extends yE { constructor(e, t) { super(e.isSynchronous), this.input = e, this.ordering = t, L(this, `inputGroup`), this.inputGroup = e.getGroup() } getHash() { return G(`EnforcerSort`, this.inputGroup.id, this.ordering) } getOutputFields() { return this.inputGroup.relational.outputFields } canProvideOrdering(e) { return e.equals(this.ordering) } canProvideResolvedFields() { return !0 } getInputRequiredProps(e) { let t = new $(e.resolvedFields); for (let { field: e } of this.ordering.fields) e.name !== fT && (tt(e.collection) || t.add(e)); return new bT(new yT, t) } optimize(e, t) { let n = this.getInputRequiredProps(t),
            r = e.optimizeGroup(this.inputGroup, n); return new Q(0).add(r) } getOptimized(t) { let n = this.getInputRequiredProps(t); return new e(this.inputGroup.getOptimized(n), this.ordering) }* evaluate(e) { return (yield* this.input.evaluate(e)).sort((e, t) => { for (let { field: n, direction: r } of this.ordering.fields) { let i = r === `asc`; if (n.name === fT) { let r = n.collection;
                  V(r, `Collection required for sorting`); let a = e.getPointer(r);
                  V(a, `Pointer required for sorting`); let o = { pointer: a, data: {} },
                     s = t.getPointer(r);
                  V(s, `Pointer required for sorting`); let c = { pointer: s, data: {} },
                     l = r.data.compareItems(o, c); return i ? l : -l } let a = e.getValue(n),
                  o = t.getValue(n); if (!$w.equal(a, o, xE)) { if (nt(a) || $w.lessThan(a, o, xE)) return i ? -1 : 1; if (nt(o) || $w.greaterThan(a, o, xE)) return i ? 1 : -1; throw Error(`Invalid comparison`) } } return 0 }) } }, CE = class { constructor(e, t, n) { this.query = e, this.locale = t, this.resolver = n, L(this, `memo`, new tE), L(this, `normalizer`, new vE(this.memo)), L(this, `explorer`, new $T(this.normalizer)) } optimize() { let e = new jT(this.normalizer, this.query, this.locale).build(),
            t = e.takeNode().getGroup(),
            n = e.getRequiredProps(); return this.optimizeGroup(t, n), [t.getOptimized(n), e.getNamedFields()] } optimizeGroup(e, t) { let n = e.getWinner(t); if (n.node) return n.cost; let r = e.nodes[0];
         V(r, `Normalized node not found`), this.createEnforcer(n, r, t); for (let r of e.nodes) { if (t.canProvide(r)) { let e = r.optimize(this, t);
               n.update(r, e) } t.isMinimal && this.explorer.explore(r) } return n.cost } createEnforcer(e, t, n) { if (n.resolvedFields.size > 0) { let r = new bE(t, n.resolvedFields, this.resolver),
               i = r.optimize(this, n);
            e.update(r, i) } if (n.ordering.length > 0) { let r = new SE(t, n.ordering),
               i = r.optimize(this, n);
            e.update(r, i) } } }, wE = Kd(`query-engine`), TE = class { async evalQuery(e, t, n, r = {}) { wE.enabled && wE.debug(`Query:
${hp(e)}`); let i = new dT(e, t, r),
            [a, o] = new CE(e, t, i).optimize(),
            s = await a.evaluateAsync(),
            c = Object.entries(o),
            l = [],
            u = Yd(Zd(s.tuples.map(e => { let t = {},
                  r = {}; for (let [a, o] of c) { let s = e.getValue(o);
                  t[a] = i.resolveValue(s), n && (r[a] = s) } return n && l.push(r), Xd(t) }))); return n ? [st(u) ? await u : u, l] : u } async serializeableQuery(e, t) { return this.evalQuery(e, t, !0) } async query(e, t, n) { return this.evalQuery(e, t, !1, n) } resolveSerializableQueryResult(e, t, n) { let r = new dT(t, n); return Yd(Zd(e.map(e => { let t = {},
               n; for (n in e) { let i = e[n];
               t[n] = r.resolveValue(i) } return Xd(t) }))) } }, EE = (() => Yg.QueryCache)(), DE = class { constructor(e, t = 1 / 0) { this.queryEngine = e, this.maxSize = t, L(this, `cache`, new Map), L(this, `serializedCache`, Qg === void 0 ? void 0 : new Map) } prune() { if (!(this.cache.size <= this.maxSize))
            for (let [e, t] of this.cache) { if (this.cache.size <= this.maxSize) break;
               t.state !== `pending` && (this.cache.delete(e), this.serializedCache?.delete(e)) } } get(e, t) { let n = vp(e, t),
            r = this.cache.get(n); if (r) { if (this.cache.delete(n), this.cache.set(n, r), Qg !== void 0 && this.serializedCache !== void 0 && !Lf(n) && r.state === `fulfilled`) { let e = this.serializedCache.get(n);
               e !== void 0 && Qg.set(EE, n, e) } return r } let i = new Fg(() => { let r = Lf(n),
               i = r ? void 0 : ln(EE, n); if (i) try { return this.queryEngine.resolveSerializableQueryResult(i, e, t) } catch (e) { sn(e, n) }
            return Qg !== void 0 && !r ? this.queryEngine.serializeableQuery(e, t).then(([e, t]) => (this.serializedCache?.set(n, t), Qg.set(EE, n, t), e)) : this.queryEngine.query(e, t) }); return this.cache.set(n, i), this.prune(), i } }, OE = new DE(new TE), kE = `style[data-framer-breakpoint-css]`, AE = new Map, jE = `page`, ME = Symbol(`cycle`), FE = (() => { let e = p(void 0); return e.displayName = `TickerContext`, e })(), IE = new Set([`visibleVariantId`, `obscuredVariantId`, `threshold`, `animateOnce`, `variantAppearEffectEnabled`, `targets`, `exitTarget`, `scrollDirection`]), LE = { inputRange: [], outputRange: [] }, RE = e => j.forwardRef((t, n) => { if (J.current() === J.canvas) return E(e, { ...t, ref: n }); let [r, i] = pc(t, IE), { visibleVariantId: a, obscuredVariantId: o, animateOnce: s, threshold: c, variantAppearEffectEnabled: l, targets: u, exitTarget: d, scrollDirection: f } = r, [p, m] = j.useState(o), h = j.useRef(!1), g = ms(n);
      vs(g, e => { r.targets || r.scrollDirection || s && h.current === !0 || h.current !== e && (h.current = e, j.startTransition(() => { m(e ? a : o) })) }, { enabled: l, animateOnce: s, threshold: { y: c } }); let _ = Mt(),
         v = j.useRef(_); return j.useEffect(() => { if (f || !u) return;
         v.current !== _ && (v.current = _, j.startTransition(() => m(o))); let e = {},
            t; return ce((n, { y: r }) => { if (!u[0] || u[0].ref && !u[0].ref.current) return; let { inputRange: i, outputRange: a } = om(u, (c ?? 0) * r.containerLength, d); if (i.length === 0 || i.length !== a.length) return; let o = Math.floor(Pe(r.current, i, a)); if (s && e[o]) return;
            e[o] = !0; let l = u[o]?.target ?? void 0;
            l !== t && (t = l, j.startTransition(() => { m(l) })) }) }, [_, s, c, u, t.variant, f, d]), zc(f, e => j.startTransition(() => m(e)), { enabled: l, repeat: !s }), Nt(() => { if (!l) return; let e = !r.targets && !r.scrollDirection ? r.obscuredVariantId : void 0;
         j.startTransition(() => m(e)) }), !(`variantAppearEffectEnabled` in r) || l === !0 ? E(e, { ...i, variant: p ?? t.variant, ref: g }) : E(e, { ...i }) }), zE = { Arial: { Regular: { selector: `Arial`, weight: void 0 }, Black: { selector: `Arial-Black`, weight: void 0 }, Narrow: { selector: `Arial Narrow`, weight: void 0 }, "Rounded Bold": { selector: `Arial Rounded MT Bold`, weight: void 0 } }, Avenir: { Book: { selector: `Avenir`, weight: void 0 }, Light: { selector: `Avenir-Light`, weight: void 0 }, Medium: { selector: `Avenir-Medium`, weight: void 0 }, Heavy: { selector: `Avenir-Heavy`, weight: void 0 }, Black: { selector: `Avenir-Black`, weight: void 0 } }, "Avenir Next": { Regular: { selector: `Avenir Next`, weight: void 0 }, "Ultra Light": { selector: `AvenirNext-UltraLight`, weight: void 0 }, Medium: { selector: `AvenirNext-Medium`, weight: void 0 }, "Demi Bold": { selector: `AvenirNext-DemiBold`, weight: void 0 }, Heavy: { selector: `AvenirNext-Heavy`, weight: void 0 } }, "Avenir Next Condensed": { Regular: { selector: `Avenir Next Condensed`, weight: void 0 }, "Ultra Light": { selector: `AvenirNextCondensed-UltraLight`, weight: void 0 }, Medium: { selector: `AvenirNextCondensed-Medium`, weight: void 0 }, "Demi Bold": { selector: `AvenirNextCondensed-DemiBold`, weight: void 0 }, Heavy: { selector: `AvenirNextCondensed-Heavy`, weight: void 0 } }, Baskerville: { Regular: { selector: `Baskerville`, weight: void 0 }, "Semi Bold": { selector: `Baskerville-SemiBold`, weight: void 0 } }, "Bodoni 72": { Book: { selector: `Bodoni 72`, weight: void 0 }, Oldstyle: { selector: `Bodoni 72 Oldstyle`, weight: void 0 }, Smallcaps: { selector: `Bodoni 72 Smallcaps`, weight: void 0 } }, Courier: { Regular: { selector: `Courier`, weight: void 0 } }, "Courier New": { Regular: { selector: `Courier New`, weight: void 0 } }, Futura: { Medium: { selector: `Futura`, weight: void 0 }, Condensed: { selector: `Futura-CondensedMedium`, weight: void 0 }, "Condensed ExtraBold": { selector: `Futura-CondensedExtraBold`, weight: void 0 } }, Georgia: { Regular: { selector: `Georgia`, weight: void 0 } }, "Gill Sans": { Regular: { selector: `Gill Sans`, weight: void 0 }, Light: { selector: `GillSans-Light`, weight: void 0 }, SemiBold: { selector: `GillSans-SemiBold`, weight: void 0 }, UltraBold: { selector: `GillSans-UltraBold`, weight: void 0 } }, Helvetica: { Regular: { selector: `Helvetica`, weight: void 0 }, Light: { selector: `Helvetica-Light`, weight: void 0 }, Bold: { selector: `Helvetica-Bold`, weight: void 0 }, Oblique: { selector: `Helvetica-Oblique`, weight: void 0 }, "Light Oblique": { selector: `Helvetica-LightOblique`, weight: void 0 }, "Bold Oblique": { selector: `Helvetica-BoldOblique`, weight: void 0 } }, "Helvetica Neue": { Regular: { selector: `Helvetica Neue`, weight: void 0 }, UltraLight: { selector: `HelveticaNeue-UltraLight`, weight: void 0 }, Thin: { selector: `HelveticaNeue-Thin`, weight: void 0 }, Light: { selector: `HelveticaNeue-Light`, weight: void 0 }, Medium: { selector: `HelveticaNeue-Medium`, weight: void 0 }, Bold: { selector: `HelveticaNeue-Bold`, weight: void 0 }, Italic: { selector: `HelveticaNeue-Italic`, weight: void 0 }, "UltraLight Italic": { selector: `HelveticaNeue-UltraLightItalic`, weight: void 0 }, "Thin Italic": { selector: `HelveticaNeue-ThinItalic`, weight: void 0 }, "Light Italic": { selector: `HelveticaNeue-LightItalic`, weight: void 0 }, "Medium Italic": { selector: `HelveticaNeue-MediumItalic`, weight: void 0 }, "Bold Italic": { selector: `HelveticaNeue-BoldItalic`, weight: void 0 }, "Condensed Bold": { selector: `HelveticaNeue-CondensedBold`, weight: void 0 }, "Condensed Black": { selector: `HelveticaNeue-CondensedBlack`, weight: void 0 } }, "Hoefler Text": { Regular: { selector: `Hoefler Text`, weight: void 0 } }, Impact: { Regular: { selector: `Impact`, weight: void 0 } }, "Lucida Grande": { Regular: { selector: `Lucida Grande`, weight: void 0 } }, Menlo: { Regular: { selector: `Menlo`, weight: void 0 } }, Monaco: { Regular: { selector: `Monaco`, weight: void 0 } }, Optima: { Regular: { selector: `Optima`, weight: void 0 }, ExtraBlack: { selector: `Optima-ExtraBlack`, weight: void 0 } }, Palatino: { Regular: { selector: `Palatino`, weight: void 0 } }, "SF Pro Display": { Regular: { selector: `__SF-UI-Display-Regular__`, weight: 400 }, Ultralight: { selector: `__SF-UI-Display-Ultralight__`, weight: 100 }, Thin: { selector: `__SF-UI-Display-Thin__`, weight: 200 }, Light: { selector: `__SF-UI-Display-Light__`, weight: 300 }, Medium: { selector: `__SF-UI-Display-Medium__`, weight: 500 }, Semibold: { selector: `__SF-UI-Display-Semibold__`, weight: 600 }, Bold: { selector: `__SF-UI-Display-Bold__`, weight: 700 }, Heavy: { selector: `__SF-UI-Display-Heavy__`, weight: 800 }, Black: { selector: `__SF-UI-Display-Black__`, weight: 900 }, Italic: { selector: `__SF-UI-Display-Italic__`, weight: 400 }, "Ultralight Italic": { selector: `__SF-UI-Display-Ultralight-Italic__`, weight: 100 }, "Thin Italic": { selector: `__SF-UI-Display-Thin-Italic__`, weight: 200 }, "Light Italic": { selector: `__SF-UI-Display-Light-Italic__`, weight: 300 }, "Medium Italic": { selector: `__SF-UI-Display-Medium-Italic__`, weight: 500 }, "Semibold Italic": { selector: `__SF-UI-Display-Semibold-Italic__`, weight: 600 }, "Bold Italic": { selector: `__SF-UI-Display-Bold-Italic__`, weight: 700 }, "Heavy Italic": { selector: `__SF-UI-Display-Heavy-Italic__`, weight: 800 }, "Black Italic": { selector: `__SF-UI-Display-Black-Italic__`, weight: 900 } }, "SF Pro Display Condensed": { Regular: { selector: `__SF-UI-Display-Condensed-Regular__`, weight: 400 }, Ultralight: { selector: `__SF-UI-Display-Condensed-Ultralight__`, weight: 100 }, Thin: { selector: `__SF-UI-Display-Condensed-Thin__`, weight: 200 }, Light: { selector: `__SF-UI-Display-Condensed-Light__`, weight: 300 }, Medium: { selector: `__SF-UI-Display-Condensed-Medium__`, weight: 500 }, Semibold: { selector: `__SF-UI-Display-Condensed-Semibold__`, weight: 600 }, Bold: { selector: `__SF-UI-Display-Condensed-Bold__`, weight: 700 }, Heavy: { selector: `__SF-UI-Display-Condensed-Heavy__`, weight: 800 }, Black: { selector: `__SF-UI-Display-Condensed-Black__`, weight: 900 } }, "SF Pro Text": { Regular: { selector: `__SF-UI-Text-Regular__`, weight: 400 }, Light: { selector: `__SF-UI-Text-Light__`, weight: 200 }, Medium: { selector: `__SF-UI-Text-Medium__`, weight: 500 }, Semibold: { selector: `__SF-UI-Text-Semibold__`, weight: 600 }, Bold: { selector: `__SF-UI-Text-Bold__`, weight: 700 }, Heavy: { selector: `__SF-UI-Text-Heavy__`, weight: 800 }, Italic: { selector: `__SF-UI-Text-Italic__`, weight: 400 }, "Light Italic": { selector: `__SF-UI-Text-Light-Italic__`, weight: 200 }, "Medium Italic": { selector: `__SF-UI-Text-Medium-Italic__`, weight: 500 }, "Semibold Italic": { selector: `__SF-UI-Text-Semibold-Italic__`, weight: 600 }, "Bold Italic": { selector: `__SF-UI-Text-Bold-Italic__`, weight: 700 }, "Heavy Italic": { selector: `__SF-UI-Text-Heavy-Italic__`, weight: 800 } }, "SF Pro Text Condensed": { Regular: { selector: `__SF-UI-Text-Condensed-Regular__`, weight: 400 }, Light: { selector: `__SF-UI-Text-Condensed-Light__`, weight: 200 }, Medium: { selector: `__SF-UI-Text-Condensed-Medium__`, weight: 500 }, Semibold: { selector: `__SF-UI-Text-Condensed-Semibold__`, weight: 600 }, Bold: { selector: `__SF-UI-Text-Condensed-Bold__`, weight: 700 }, Heavy: { selector: `__SF-UI-Text-Condensed-Heavy__`, weight: 800 } }, Tahoma: { Regular: { selector: `Tahoma`, weight: void 0 } }, Times: { Regular: { selector: `Times`, weight: void 0 } }, "Times New Roman": { Regular: { selector: `Times New Roman`, weight: void 0 } }, Trebuchet: { Regular: { selector: `Trebuchet MS`, weight: void 0 } }, Verdana: { Regular: { selector: `Verdana`, weight: void 0 } } }, BE = { "__SF-Compact-Display-Regular__": `SFCompactDisplay-Regular|.SFCompactDisplay-Regular`, "__SF-Compact-Display-Ultralight__": `SFCompactDisplay-Ultralight|.SFCompactDisplay-Ultralight`, "__SF-Compact-Display-Thin__": `SFCompactDisplay-Thin|.SFCompactDisplay-Thin`, "__SF-Compact-Display-Light__": `SFCompactDisplay-Light|.SFCompactDisplay-Light`, "__SF-Compact-Display-Medium__": `SFCompactDisplay-Medium|.SFCompactDisplay-Medium`, "__SF-Compact-Display-Semibold__": `SFCompactDisplay-Semibold|.SFCompactDisplay-Semibold`, "__SF-Compact-Display-Heavy__": `SFCompactDisplay-Heavy|.SFCompactDisplay-Heavy`, "__SF-Compact-Display-Black__": `SFCompactDisplay-Black|.SFCompactDisplay-Black`, "__SF-Compact-Display-Bold__": `SFCompactDisplay-Bold|.SFCompactDisplay-Bold`, "__SF-UI-Text-Regular__": `.SFNSText|SFProText-Regular|SFUIText-Regular|.SFUIText`, "__SF-UI-Text-Light__": `.SFNSText-Light|SFProText-Light|SFUIText-Light|.SFUIText-Light`, "__SF-UI-Text-Medium__": `.SFNSText-Medium|SFProText-Medium|SFUIText-Medium|.SFUIText-Medium`, "__SF-UI-Text-Semibold__": `.SFNSText-Semibold|SFProText-Semibold|SFUIText-Semibold|.SFUIText-Semibold`, "__SF-UI-Text-Bold__": `.SFNSText-Bold|SFProText-Bold|SFUIText-Bold|.SFUIText-Bold`, "__SF-UI-Text-Heavy__": `.SFNSText-Heavy|SFProText-Heavy|.SFUIText-Heavy`, "__SF-UI-Text-Italic__": `.SFNSText-Italic|SFProText-Italic|SFUIText-Italic|.SFUIText-Italic`, "__SF-UI-Text-Light-Italic__": `.SFNSText-LightItalic|SFProText-LightItalic|SFUIText-LightItalic|.SFUIText-LightItalic`, "__SF-UI-Text-Medium-Italic__": `.SFNSText-MediumItalic|SFProText-MediumItalic|SFUIText-MediumItalic|.SFUIText-MediumItalic`, "__SF-UI-Text-Semibold-Italic__": `.SFNSText-SemiboldItalic|SFProText-SemiboldItalic|SFUIText-SemiboldItalic|.SFUIText-SemiboldItalic`, "__SF-UI-Text-Bold-Italic__": `.SFNSText-BoldItalic|SFProText-BoldItalic|SFUIText-BoldItalic|.SFUIText-BoldItalic`, "__SF-UI-Text-Heavy-Italic__": `.SFNSText-HeavyItalic|SFProText-HeavyItalic|.SFUIText-HeavyItalic`, "__SF-Compact-Text-Regular__": `SFCompactText-Regular|.SFCompactText-Regular`, "__SF-Compact-Text-Light__": `SFCompactText-Light|.SFCompactText-Light`, "__SF-Compact-Text-Medium__": `SFCompactText-Medium|.SFCompactText-Medium`, "__SF-Compact-Text-Semibold__": `SFCompactText-Semibold|.SFCompactText-Semibold`, "__SF-Compact-Text-Bold__": `SFCompactText-Bold|.SFCompactText-Bold`, "__SF-Compact-Text-Heavy__": `SFCompactText-Heavy|.SFCompactText-Heavy`, "__SF-Compact-Text-Italic__": `SFCompactText-Italic|.SFCompactText-Italic`, "__SF-Compact-Text-Light-Italic__": `SFCompactText-LightItalic|.SFCompactText-LightItalic`, "__SF-Compact-Text-Medium-Italic__": `SFCompactText-MediumItalic|.SFCompactText-MediumItalic`, "__SF-Compact-Text-Semibold-Italic__": `SFCompactText-SemiboldItalic|.SFCompactText-SemiboldItalic`, "__SF-Compact-Text-Bold-Italic__": `SFCompactText-BoldItalic|.SFCompactText-BoldItalic`, "__SF-Compact-Text-Heavy-Italic__": `SFCompactText-HeavyItalic|.SFCompactText-HeavyItalic`, "__SF-UI-Display-Condensed-Regular__": `.SFNSDisplayCondensed-Regular|SFUIDisplayCondensed-Regular|.SFUIDisplayCondensed-Regular`, "__SF-UI-Display-Condensed-Ultralight__": `.SFNSDisplayCondensed-Ultralight|SFUIDisplayCondensed-Ultralight|.SFUIDisplayCondensed-Ultralight`, "__SF-UI-Display-Condensed-Thin__": `.SFNSDisplayCondensed-Thin|SFUIDisplayCondensed-Thin|.SFUIDisplayCondensed-Thin`, "__SF-UI-Display-Condensed-Light__": `.SFNSDisplayCondensed-Light|SFUIDisplayCondensed-Light|.SFUIDisplayCondensed-Light`, "__SF-UI-Display-Condensed-Medium__": `.SFNSDisplayCondensed-Medium|SFUIDisplayCondensed-Medium|.SFUIDisplayCondensed-Medium`, "__SF-UI-Display-Condensed-Semibold__": `.SFNSDisplayCondensed-Semibold|SFUIDisplayCondensed-Semibold|.SFUIDisplayCondensed-Semibold`, "__SF-UI-Display-Condensed-Bold__": `.SFNSDisplayCondensed-Bold|SFUIDisplayCondensed-Bold|.SFUIDisplayCondensed-Bold`, "__SF-UI-Display-Condensed-Heavy__": `.SFNSDisplayCondensed-Heavy|SFUIDisplayCondensed-Heavy|.SFUIDisplayCondensed-Heavy`, "__SF-UI-Display-Condensed-Black__": `.SFNSDisplayCondensed-Black|.SFUIDisplayCondensed-Black`, "__SF-UI-Display-Regular__": `.SFNSDisplay|SFProDisplay-Regular|SFUIDisplay-Regular|.SFUIDisplay`, "__SF-UI-Display-Ultralight__": `.SFNSDisplay-Ultralight|SFProDisplay-Ultralight|SFUIDisplay-Ultralight|.SFUIDisplay-Ultralight`, "__SF-UI-Display-Thin__": `.SFNSDisplay-Thin|SFProDisplay-Thin|SFUIDisplay-Thin|.SFUIDisplay-Thin`, "__SF-UI-Display-Light__": `.SFNSDisplay-Light|SFProDisplay-Light|SFUIDisplay-Light|.SFUIDisplay-Light`, "__SF-UI-Display-Medium__": `.SFNSDisplay-Medium|SFProDisplay-Medium|SFUIDisplay-Medium|.SFUIDisplay-Medium`, "__SF-UI-Display-Semibold__": `.SFNSDisplay-Semibold|SFProDisplay-Semibold|SFUIDisplay-Semibold|.SFUIDisplay-Semibold`, "__SF-UI-Display-Bold__": `.SFNSDisplay-Bold|SFProDisplay-Bold|SFUIDisplay-Bold|.SFUIDisplay-Bold`, "__SF-UI-Display-Heavy__": `.SFNSDisplay-Heavy|SFProDisplay-Heavy|SFUIDisplay-Heavy|.SFUIDisplay-Heavy`, "__SF-UI-Display-Black__": `.SFNSDisplay-Black|SFProDisplay-Black|.SFUIDisplay-Black`, "__SF-UI-Display-Italic__": `.SFNSDisplay-Italic|SFProDisplay-Italic|SFUIDisplay-Italic`, "__SF-UI-Display-Ultralight-Italic__": `.SFNSDisplay-UltralightItalic|SFProDisplay-UltralightItalic|SFUIDisplay-UltralightItalic|.SFUIDisplay-UltralightItalic`, "__SF-UI-Display-Thin-Italic__": `.SFNSDisplay-ThinItalic|SFProDisplay-ThinItalic|SFUIDisplay-ThinItalic|.SFUIDisplay-ThinItalic`, "__SF-UI-Display-Light-Italic__": `.SFNSDisplay-LightItalic|SFProDisplay-LightItalic|SFUIDisplay-LightItalic|.SFUIDisplay-LightItalic`, "__SF-UI-Display-Medium-Italic__": `.SFNSDisplay-MediumItalic|SFProDisplay-MediumItalic|SFUIDisplay-MediumItalic|.SFUIDisplay-MediumItalic`, "__SF-UI-Display-Semibold-Italic__": `.SFNSDisplay-SemiboldItalic|SFProDisplay-SemiboldItalic|SFUIDisplay-SemiboldItalic|.SFUIDisplay-SemiboldItalic`, "__SF-UI-Display-Bold-Italic__": `.SFNSDisplay-BoldItalic|SFProDisplay-BoldItalic|SFUIDisplay-BoldItalic|.SFUIDisplay-BoldItalic`, "__SF-UI-Display-Heavy-Italic__": `.SFNSDisplay-HeavyItalic|SFProDisplay-HeavyItalic|SFUIDisplay-HeavyItalic|.SFUIDisplay-HeavyItalic`, "__SF-UI-Display-Black-Italic__": `.SFNSDisplay-BlackItalic|SFProDisplay-BlackItalic|.SFUIDisplay-BlackItalic`, "__SF-UI-Text-Condensed-Regular__": `.SFNSTextCondensed-Regular|SFUITextCondensed-Regular|.SFUITextCondensed-Regular`, "__SF-UI-Text-Condensed-Light__": `.SFNSTextCondensed-Light|SFUITextCondensed-Light|.SFUITextCondensed-Light`, "__SF-UI-Text-Condensed-Medium__": `.SFNSTextCondensed-Medium|SFUITextCondensed-Medium|.SFUITextCondensed-Medium`, "__SF-UI-Text-Condensed-Semibold__": `.SFNSTextCondensed-Semibold|SFUITextCondensed-Semibold|.SFUITextCondensed-Semibold`, "__SF-UI-Text-Condensed-Bold__": `.SFNSTextCondensed-Bold|SFUITextCondensed-Bold|.SFUITextCondensed-Bold`, "__SF-UI-Text-Condensed-Heavy__": `.SFNSTextCondensed-Heavy|.SFUITextCondensed-Heavy`, "__SF-Compact-Rounded-Regular__": `SFCompactRounded-Regular|.SFCompactRounded-Regular`, "__SF-Compact-Rounded-Ultralight__": `SFCompactRounded-Ultralight|.SFCompactRounded-Ultralight`, "__SF-Compact-Rounded-Thin__": `SFCompactRounded-Thin|.SFCompactRounded-Thin`, "__SF-Compact-Rounded-Light__": `SFCompactRounded-Light|.SFCompactRounded-Light`, "__SF-Compact-Rounded-Medium__": `SFCompactRounded-Medium|.SFCompactRounded-Medium`, "__SF-Compact-Rounded-Semibold__": `SFCompactRounded-Semibold|.SFCompactRounded-Semibold`, "__SF-Compact-Rounded-Bold__": `SFCompactRounded-Bold|.SFCompactRounded-Bold`, "__SF-Compact-Rounded-Heavy__": `SFCompactRounded-Heavy|.SFCompactRounded-Heavy`, "__SF-Compact-Rounded-Black__": `SFCompactRounded-Black|.SFCompactRounded-Black` }, VE = zE, HE = `System Default`, UE = class { constructor() { L(this, `name`, `local`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map), L(this, `fontAliasBySelector`, new Map), L(this, `fontAliases`, new Map) } getFontFamilyByName(e) { return this.byFamilyName.get(e) ?? null } createFontFamily(e) { let t = { name: e, fonts: [], source: this.name }; return this.addFontFamily(t), t } addFontFamily(e) { this.fontFamilies.push(e), this.byFamilyName.set(e.name, e) } importFonts() { let e = []; for (let t of Object.keys(VE)) { let n = VE[t]; if (!n) continue; let r = this.createFontFamily(t); for (let e of Object.keys(n)) { let t = n[e]; if (!t) continue; let { selector: i, weight: a } = t, o = { variant: e, selector: i, weight: a, family: r, cssFamilyName: r.name };
               r.fonts.push(o) } e.push(...r.fonts) } for (let [e, t] of Object.entries(BE)) this.addFontAlias(e, t); let { fontFamily: t, aliases: n } = this.getSystemFontFamily();
         this.addFontFamily(t); for (let [e, t] of n) this.addFontAlias(e, t); return e.push(...t.fonts), e } addFontAlias(e, t) { this.fontAliases.set(e, t), this.fontAliasBySelector.set(t, e) } getSystemFontFamily() { let e = { name: HE, fonts: [], source: this.name },
            t = new Map,
            n = [400, 100, 200, 300, 500, 600, 700, 800, 900]; for (let r of [`normal`, `italic`])
            for (let i of n) { let n = cm(i, r),
                  a = `__SystemDefault-${i}-${r}__`,
                  o = { variant: n, selector: a, style: r, weight: i, family: e, cssFamilyName: e.name };
               e.fonts.push(o), t.set(a, `system-ui|-apple-system|BlinkMacSystemFont|Segoe UI|Roboto|Oxygen|Ubuntu|Cantarell|Fira Sans|Droid Sans|Helvetica Neue|sans-serif`) }
         return { fontFamily: e, aliases: t } } getFontAliasBySelector(e) { return this.fontAliasBySelector.get(e) || null } getFontSelectorByAlias(e) { return this.fontAliases.get(e) || null } isFontFamilyAlias(e) { return !!(e && /^__.*__$/u.exec(e)) } }, WE = { 100: `Thin`, 200: `Extra Light`, 300: `Light`, 400: `Normal`, 500: `Medium`, 600: `Semi Bold`, 700: `Bold`, 800: `Extra Bold`, 900: `Black` }, GE = class extends Map { constructor() { super(...arguments), L(this, `_hash`, 0) } get hash() { return this._hash } set(e, t) { return this._hash++, super.set(e, t) } delete(e) { return this._hash++, super.delete(e) } clear() { return this._hash++, super.clear() } }, qE = `Variable`, JE = `BI;`, YE = class { constructor() { L(this, `name`, `builtIn`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map), L(this, `assetByKey`, new Map) } importFonts(e) { this.fontFamilies.length = 0, this.byFamilyName.clear(), this.assetByKey.clear(); let t = []; for (let n of e) { if (!this.isValidBuiltInFont(n)) continue; let { properties: e } = n, r = e.font.fontFamily, i = this.createFontFamily(r, e.font.foundryName, e.font.fontVersion), a = e.font.openTypeData, o = e.font.variationAxes, s = Array.isArray(o), c = s ? `variable` : e.font.fontSubFamily || `regular`, l = pm(n), u = { assetKey: n.key, family: i, selector: this.createSelector(r, c, e.font.fontVersion), variant: c, file: l, hasOpenTypeFeatures: gm(a), variationAxes: _m(o), category: e.font.fontCategory, weight: bm(c), style: Sm(c), cssFamilyName: mm(r, s) };
            i.fonts.push(u), this.assetByKey.set(n.key, n), t.push(u) } for (let e of this.fontFamilies) e.fonts.sort((e, t) => { let n = bm(e.variant),
               r = bm(t.variant); return !n || !r ? 1 : n - r }); return t } static parseVariant(e) { return { weight: XE[xm(e)], style: Sm(e) } } getFontBySelector(e) { let t = this.parseSelector(e); if (!t) return; let n = this.getFontFamilyByName(t.name); if (n) return n.fonts.find(t => t.selector === e) } getFontFamilyByName(e) { return this.byFamilyName.get(e) ?? null } createFontFamily(e, t, n) { let r = this.byFamilyName.get(e); if (r && r.version === n) return r; let i = { source: this.name, name: e, fonts: [], foundryName: t, version: n }; return this.addFontFamily(i), i } getOpenTypeFeatures(e) { V(e.assetKey, `Font must have an asset key`); let t = this.assetByKey.get(e.assetKey)?.properties?.font?.openTypeData; return gm(t) ? t?.map(e => { if (vm(e)) return { tag: e.tag, coverage: e.coverage } }) : [] } isValidBuiltInFont(e) { return !e.mimeType.startsWith(`font/`) || e.properties?.kind !== `font` || !e.properties.font || !e.properties.font.fontVersion || !e.properties.font.fontFamily ? !1 : `fontFamily` in e.properties.font } createSelector(e, t, n) { return `${JE}${e}/${t}/${n}` } parseSelector(e) { if (!e.startsWith(JE)) return null; let [t, n] = e.split(JE); if (n === void 0) return null; let [r, i, a] = n.split(`/`); return !r || !i || !a ? null : { name: r, variant: i, source: this.name, isVariable: i.toLowerCase().includes(`variable`) } } addFontFamily(e) { this.fontFamilies.push(e), this.byFamilyName.set(e.name, e) } }, XE = { ultralight: 100, "ultralight-italic": 100, thin: 200, "thin-italic": 200, demi: 200, light: 300, "light-italic": 300, normal: 350, base: 400, regular: 400, classic: 400, "regular-slanted": 400, italic: 400, oblique: 400, dense: 400, brukt: 300, book: 400, "book-italic": 400, text: 400, "text-italic": 400, medium: 500, solid: 500, "medium-oblique": 500, "medium-italic": 500, mittel: 500, semibold: 600, "semibold-italic": 600, bold: 700, "bold-italic": 700, "bold-oblique": 700, fett: 700, ultrabold: 800, "ultrabold-italic": 800, extrabold: 800, "extrabold-italic": 800, black: 900, extralight: 100, "extralight-italic": 100, "black-italic": 900, "extra-italic": 900, "extra-italic-bold": 900, satt: 900, heavy: 900, "heavy-italic": 900, serif: 100, school: 200, expanded: 300, gothique: 500, "dense-light": 200, "dense-regular": 300, "dense-medium": 400, "dense-bold": 500, "solid-light": 600, "solid-regular": 700, "solid-medium": 800, "solid-bold": 900, 53: 400, 55: 600, "narrow-regular": 350, "narrow-black": 850, variable: 1e3, "variable-italic": 1e3 }, ZE = Kd(`custom-font-source`), QE = `CUSTOM;`, $E = `CUSTOMV2;`, eD = class e { constructor() { L(this, `name`, `custom`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map), L(this, `assetsByKey`, new Map) } deprecatedImportFonts(t) { this.fontFamilies.length = 0, this.byFamilyName.clear(), this.assetsByKey.clear(); let n = []; for (let r of t) { if (!this.isValidCustomFontAsset(r)) continue; let t = r.properties?.font.variationAxes,
               i = Array.isArray(t),
               a = jm(r.properties),
               o = this.createFontFamily(a),
               s = r.properties?.font.openTypeData,
               c = i ? `variable` : this.inferVariantName(a),
               l = pm(r),
               u = e.createLegacySelector(a),
               { family: d, variant: f } = Mm(r.properties.font),
               p = e.createSelector(d, f),
               m = { assetKey: r.key, family: o, selector: u, variant: c, file: l, hasOpenTypeFeatures: gm(s), variationAxes: _m(t), owner: Fm(r), cssFamilyName: e.cssFontFamilyFromSelector(u), alternativeSelectors: {
                     [p]: { variant: f, cssFamilyName: e.cssFontFamilyFromSelector(p) } } };
            o.fonts.push(m), this.assetsByKey.set(r.key, r), n.push(...o.fonts) } return n } importFonts(t, n) { if (!n) return this.deprecatedImportFonts(t);
         this.fontFamilies.length = 0, this.byFamilyName.clear(), this.assetsByKey.clear(); let r = {}; for (let n of t) { if (!this.isValidCustomFontAsset(n)) continue; let { family: t, variant: i, weight: a, style: o } = Mm(n.properties.font), s = n.properties.font.variationAxes, c = Array.isArray(s), l = n.properties.font.openTypeData, u = pm(n), d = Fm(n), f = jm(n.properties), p = e.createLegacySelector(f), m = this.createFontFamily(t), h = e.createSelector(m.name, i), g = { assetKey: n.key, family: m, selector: h, variant: i, weight: a, style: o, file: u, hasOpenTypeFeatures: gm(l), variationAxes: _m(s), owner: d, alternativeSelectors: {
                  [p]: { variant: c ? `variable` : this.inferVariantName(f), cssFamilyName: e.cssFontFamilyFromSelector(p) } }, cssFamilyName: e.cssFontFamilyFromSelector(h) }, _ = Am(m.fonts, g); if (_?.projectDuplicate) g.owner === `project` && (m.fonts[_.index] = g, r[h] = g);
            else if (_) { ZE.debug(`Duplicate font found for:`, g, `with existing font:`, _.existingFont); let e = _.existingFont,
                  t = g.file?.endsWith(`.woff2`) ?? !1,
                  n = e.file?.endsWith(`.woff2`) ?? !1;
               t && !n && (m.fonts[_.index] = g, r[h] = g) } else m.fonts.push(g), r[h] = g;
            this.assetsByKey.set(n.key, n) } for (let e of this.fontFamilies) e.fonts.length > 0 && Pm(e); return Object.values(r) } static createSelector(e, t) { return `${$E}${e}${t?` ${t}`:``}` } static createLegacySelector(e) { return `${QE}${e}` } static cssFontFamilyFromSelector(e) { return V(Dm(e), `Selector must be a custom font selector`), km(e) ? e.slice(QE.length) : e.slice($E.length) } isValidCustomFontAsset(e) { return !e.mimeType.startsWith(`font/`) || e.properties?.kind !== `font` || !e.properties.font ? !1 : `fontFamily` in e.properties.font } getOpenTypeFeatures(e) { V(e.assetKey, `Font must have an asset key`); let t = this.assetsByKey.get(e.assetKey)?.properties?.font?.openTypeData; return gm(t) ? t?.map(e => { if (vm(e)) return { tag: e.tag, coverage: e.coverage } }) : [] } inferVariantName(e) { let t = [`thin`, `ultra light`, `extra light`, `light`, `normal`, `medium`, `semi bold`, `bold`, `extra bold`, `black`],
            n = [...t.map(e => `${e} italic`), ...t],
            r = e.toLowerCase(),
            i = [...r.split(` `), ...r.split(`-`), ...r.split(`_`)],
            a = n.find(e => i.includes(e) || i.includes(e.replace(/\s+/gu, ``))); return a ? a.replace(/^\w|\s\w/gu, e => e.toUpperCase()) : `Regular` } createFontFamily(e) { let t = this.byFamilyName.get(e); if (t) return t; let n = { source: this.name, name: e, fonts: [] }; return this.addFontFamily(n), n } addFontFamily(e) { this.fontFamilies.push(e), this.byFamilyName.set(e.name, e) } getFontFamilyByName(e) { return this.byFamilyName.get(e) || null } }, tD = [`display`, `sans`, `serif`, `slab`, `handwritten`, `script`], nD = `FS;`, rD = { thin: 100, hairline: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, ultra: 800, black: 900, heavy: 900 }, iD = Object.keys(rD), aD = (() => RegExp(`^(?:${[...iD,`italic`,`variable`].join(`|`)})`, `u`))(), oD = class e { constructor() { L(this, `name`, `fontshare`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map) } getFontFamilyByName(e) { return this.byFamilyName.get(e) ?? null } static parseVariant(e) { let t = e.toLowerCase().split(` `),
            n = iD.find(e => t.includes(e)),
            r = e.toLowerCase().includes(`italic`) ? `italic` : `normal`; return { weight: n && rD[n] || 400, style: r === `italic` ? r : `normal` } } parseSelector(e) { if (!e.startsWith(nD)) return null; let t = e.split(`-`); if (t.length !== 2) return null; let [n, r] = t; return !n || !r ? null : { name: n.replace(nD, ``), variant: r, source: this.name, isVariable: r.toLowerCase().includes(`variable`) } } static createSelector(e, t) { return `${nD}${e}-${t.toLowerCase()}` } static createMetadataSelector(e) { return `${nD}${e}` } addFontFamily(e) { this.fontFamilies.push(e), this.byFamilyName.set(e.name, e) } async importFonts(t, n) { this.fontFamilies.length = 0, this.byFamilyName.clear(); let r = await Im(`fontshare`),
            i = []; for (let a of t) { let t = a.font_styles.filter(e => { let t = e.name.toLowerCase(); return !(!aD.exec(t) || t.split(` `).includes(`wide`)) }).map(t => ({ ...e.parseVariant(t.name), selector: e.createSelector(a.name, t.name), isVariable: t.is_variable, fontshareVariantName: t.name, file: t.file })),
               o = e.createMetadataSelector(a.name),
               s = n?.[o],
               c = a.name,
               l = this.getFontFamilyByName(c);
            l || (l = { name: c, fonts: [], source: this.name }, this.addFontFamily(l)); let u = r[e.createMetadataSelector(a.name)]; for (let e of t) { let { variantBold: n, variantBoldItalic: r, variantItalic: o, variantVariable: c, variantVariableItalic: d } = Cm(e, t), f = { family: l, variant: e.fontshareVariantName.toLowerCase(), selector: e.selector, selectorBold: n?.selector, selectorBoldItalic: r?.selector, selectorItalic: o?.selector, selectorVariable: c?.selector, selectorVariableItalic: d?.selector, weight: e.weight, style: e.style, file: e.file, category: Bm(a.category), hasOpenTypeFeatures: u, variationAxes: e.isVariable ? s : void 0, cssFamilyName: mm(l.name, e.isVariable) };
               l.fonts.push(f), i.push(f) } } return i } async getOpenTypeFeatures(t) { return (await Lm(`fontshare`))[e.createMetadataSelector(t.family.name)] } }, sD = `Inter`, cD = `FR;`, lD = { Thin: 100, ExtraLight: 200, Light: 300, "": 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 }, uD = class e { constructor() { L(this, `name`, `framer`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map) } getFontFamilyByName(e) { return this.byFamilyName.get(e) ?? null } addFontFamily(e) { let t = { name: e, fonts: [], source: this.name }; return this.fontFamilies.push(t), this.byFamilyName.set(t.name, t), t } static getDraftFontPropertiesBySelector(e) { if (!e.startsWith(cD) && !e.startsWith(sD)) return null; let [t, n = ``] = e.split(`-`); if (!t) return null; let r = n.includes(`Italic`) ? `italic` : `normal`,
            i = n.replace(`Italic`, ``); return { cssFamilyName: t, style: r, weight: i && lD[i] || 400, source: `framer`, variant: void 0, category: `sans-serif` } } static createMetadataSelector(e) { return `${cD}${e}` } importFonts(t, n) { this.fontFamilies.length = 0, this.byFamilyName.clear(); let r = []; return t.forEach(t => { let { uiFamilyName: i, ...a } = t, o = e.createMetadataSelector(t.uiFamilyName), s = n?.[o], c = this.getFontFamilyByName(i);
            c ||= this.addFontFamily(i); let l = t.selector === t.selectorVariable || t.selector === t.selectorVariableItalic,
               u = { ...a, family: c, variationAxes: l ? s : void 0 };
            c.fonts.push(u), r.push(u) }), r } async getOpenTypeFeatures(t) { return (await Lm(`framer`))[e.createMetadataSelector(t.family.name)] } }, dD = `GF;`, fD = class e { constructor() { L(this, `name`, `google`), L(this, `fontFamilies`, []), L(this, `byFamilyName`, new Map) } getFontFamilyByName(e) { return this.byFamilyName.get(e) ?? null } static parseVariant(e) { if (e === `regular`) return { style: `normal`, weight: 400 }; let t = /(\d*)(normal|italic)?/u.exec(e); return t ? { weight: parseInt(t[1] || `400`), style: t[2] === `italic` ? `italic` : `normal` } : {} } parseSelector(e) { if (!e.startsWith(dD)) return null; let t = e.includes(`-variable-`),
            n = t ? e.split(`-variable-`) : e.split(`-`); if (n.length !== 2) return null; let [r, i] = n; return !r || !i ? null : { name: r.replace(dD, ``), variant: i, source: this.name, isVariable: t } } static createSelector(e, t, n) { return `${dD}${e}-${n?`variable-`:``}${t}` } static createMetadataSelector(e) { return `${dD}${e}` } addFontFamily(e) { let t = { name: e, fonts: [], source: this.name }; return this.fontFamilies.push(t), this.byFamilyName.set(t.name, t), t } async importFonts(t, n, r) { this.fontFamilies.length = 0, this.byFamilyName.clear(); let i = await Im(`google`),
            a = [],
            o = Hm(t, e => e.family),
            s = Hm(n, e => e.family); for (let t in o) { let n = o[t]; if (!n) continue; let c = this.getFontFamilyByName(n.family);
            c ||= this.addFontFamily(n.family); let l = n.variants.map(r => ({ ...e.parseVariant(r), googleFontsVariantName: r, selector: e.createSelector(t, r, !1), isVariable: !1, file: n.files[r] })),
               u = s[t],
               d = u?.axes ? u.variants.map(n => ({ ...e.parseVariant(n), googleFontsVariantName: n, selector: e.createSelector(t, n, !0), isVariable: !0, file: u.files[n] })) : [],
               f = e.createMetadataSelector(n.family),
               p = r?.[f],
               m = [...l, ...d],
               h = m.filter(sm),
               g = i[e.createMetadataSelector(t)]; for (let e of m) { let { weight: t, style: r, selector: i, googleFontsVariantName: o } = e, { variantBold: s, variantItalic: l, variantBoldItalic: u, variantVariable: d, variantVariableItalic: f } = (sm(e) ? Cm(e, h) : void 0) ?? {}, m = { family: c, variant: o, selector: i, selectorBold: s?.selector, selectorBoldItalic: u?.selector, selectorItalic: l?.selector, selectorVariable: d?.selector, selectorVariableItalic: f?.selector, weight: t, style: r, category: Vm(n.category), file: e.file?.replace(`http://`, `https://`), variationAxes: e.isVariable ? p : void 0, hasOpenTypeFeatures: g, cssFamilyName: mm(c.name, e.isVariable) };
               c.fonts.push(m), a.push(m) } } return a } async getOpenTypeFeatures(t) { return (await Lm(`google`))[e.createMetadataSelector(t.family.name)] } }, pD = Re(pg(), 1), mD = 5e3, hD = 3, gD = class extends Error { constructor(e) { super(e), this.name = `FontLoadingError` } }, _D = new Map, vD = new Map, yD = (e, t) => Um(e, t), bD = { "FR;Inter": [{ tag: `opsz`, minValue: 14, maxValue: 32, defaultValue: 14, name: `Optical size` }, { tag: `wght`, minValue: 100, maxValue: 900, defaultValue: 400, name: `Weight` }] }, xD = class { constructor() { L(this, `enabled`, !1), L(this, `bySelector`, new GE), L(this, `loadedSelectors`, new Set), L(this, `getGoogleFontsListPromise`), L(this, `getFontshareFontsListPromise`), L(this, `getBuiltInFontsListPromise`), L(this, `customFontsImportPromise`, new Promise(e => { this.resolveCustomFontsImportPromise = e })), L(this, `local`), L(this, `google`), L(this, `fontshare`), L(this, `builtIn`), L(this, `framer`), L(this, `custom`), L(this, `bySelectorValuesCache`), L(this, `testing`, { addFont: this.addFont.bind(this) }), this.local = new UE, this.google = new fD, this.fontshare = new oD, this.framer = new uD, this.custom = new eD, this.builtIn = new YE, this.importLocalFonts() } get hash() { return this.bySelector.hash } addFont(e) { if (this.bySelector.set(e.selector, e), e.alternativeSelectors)
            for (let t of Object.keys(e.alternativeSelectors)) this.bySelector.set(t, e) } getAvailableFonts() { if (!this.bySelectorValuesCache || this.bySelectorValuesCache.hash !== this.bySelector.hash) { let e = new Map; for (let t of this.bySelector.values()) e.set(t, !0);
            this.bySelectorValuesCache = { result: Array.from(e.keys()), hash: this.bySelector.hash } } return this.bySelectorValuesCache.result } importLocalFonts() { for (let e of this.local.importFonts()) this.addFont(e), this.loadFont(e.selector) } async importGoogleFonts() { return this.getGoogleFontsListPromise ||= Promise.resolve().then(async () => { let { staticFonts: e, variableFonts: t } = await Jb.fetchGoogleFontsList(), n = await Gm(`google`); for (let r of await this.google.importFonts(e, t, n)) this.addFont(r); return { staticFonts: e, variableFonts: t } }), this.getGoogleFontsListPromise } async importFontshareFonts() { if (!this.getFontshareFontsListPromise) { this.getFontshareFontsListPromise = Jb.fetchFontshareFontsList(); let e = await this.getFontshareFontsListPromise,
               t = await Gm(`fontshare`); for (let n of await this.fontshare.importFonts(e, t)) this.addFont(n) } return this.getFontshareFontsListPromise } async importAllWebFonts() { await Promise.all([this.importGoogleFonts(), this.importFontshareFonts(), this.importBuiltInFonts()]) } async importBuiltInFonts() { if (!this.getBuiltInFontsListPromise) { this.getBuiltInFontsListPromise = Jb.fetchBuiltInFontsList(); let e = await this.getBuiltInFontsListPromise; for (let t of await this.builtIn.importFonts(e)) this.addFont(t) } return this.getBuiltInFontsListPromise } importFramerFonts(e) { let t = Gm(`framer`);
         this.framer.importFonts(e, t).forEach(e => { this.addFont(e) }) } importCustomFonts(e, t) { this.bySelector.forEach((e, t) => { Dm(t) && this.bySelector.delete(t) }); let n = this.custom.importFonts(e, t); for (let e of n) this.addFont(e);
         this.resolveCustomFontsImportPromise() } getCustomFontsImportPromise() { return this.customFontsImportPromise } getFontFamily(e) { return this[e.source].getFontFamilyByName(e.name) } getFontBySelector(e) { if (!e) return; let t; if (t = this.bySelector.get(e), t) return t.alternativeSelectors && e in t.alternativeSelectors ? { ...t, ...t.alternativeSelectors[e] } : t } getDraftPropertiesBySelector(e) { let t = this.getFontBySelector(e); if (t) return { style: t.style, weight: t.weight, variant: t.variant, cssFamilyName: t.cssFamilyName, source: t.family.source, category: t.category }; let n = this.google.parseSelector(e); if (n) { let e = fD.parseVariant(n.variant); if (sm(e)) return { style: e.style, weight: e.weight, variant: n.variant, cssFamilyName: hm(n, `google`), source: `google`, category: void 0 } } let r = this.fontshare.parseSelector(e); if (r) { let e = oD.parseVariant(r.variant); if (sm(e)) return { style: e.style, weight: e.weight, variant: r.variant, cssFamilyName: hm(r, `fontshare`), source: `fontshare`, category: void 0 } } let i = this.builtIn.parseSelector(e); if (i) { let e = YE.parseVariant(i.variant); if (sm(e)) return { style: e.style, weight: e.weight, variant: i.variant, cssFamilyName: hm(i, `builtIn`), source: `builtIn`, category: void 0 } } return uD.getDraftFontPropertiesBySelector(e) || null } isSelectorLoaded(e) { return this.loadedSelectors.has(e) } async loadFont(e) { let t = this.getFontBySelector(e); if (!t) return 2; if (this.loadedSelectors.has(e)) return 0; let n = t.cssFamilyName,
            r = t.family.source,
            i = Em(t); switch (r) {
            case `local`:
               return this.loadedSelectors.add(e), 1;
            case `framer`:
               if (Ma() || await Wm(t.family.name, t.style, t.weight), i) { if (!t.file) return Promise.reject(`Unable to load font: ${e}`);
                  await yD({ family: n, url: t.file, weight: t.weight, style: t.style }, document) } return this.loadedSelectors.add(e), 1;
            case `google`:
            case `fontshare`:
            case `builtIn`:
            case `custom`:
               return t.file ? (await yD({ family: n, url: t.file, weight: t.weight, style: t.style }, document), this.loadedSelectors.add(e), 1) : Promise.reject(`Unable to load font: ${e}`);
            default:
               H(r) } } async loadFontsFromSelectors(e) { if (!this.enabled) return []; let t = [];
         e.some(e => e.startsWith(nD)) && t.push(this.importFontshareFonts().catch(e => { $r(`Failed to load Fontshare fonts:`, e) })), e.some(e => e.startsWith(dD)) && t.push(this.importGoogleFonts().catch(e => { $r(`Failed to load Google fonts:`, e) })), e.some(e => e.startsWith(JE)) && t.push(this.importBuiltInFonts().catch(e => { $r(`Failed to load built-in fonts:`, e) })), e.some(Dm) && t.push(this.customFontsImportPromise.catch(e => { $r(`Failed to load custom fonts:`, e) })), t.length > 0 && await Promise.all(t); let n = []; for (let t of e) n.push(this.loadFont(t)); return Promise.allSettled(n) } async loadFonts(e) { return { newlyLoadedFontCount: (await this.loadFontsFromSelectors(e)).filter(e => e.status === `fulfilled` && e.value === 1).length } } async loadMissingFonts(e, t) { let n = e.filter(e => !SD.loadedSelectors.has(e));
         n.length !== 0 && (await SD.loadWebFontsFromSelectors(n), n.every(e => SD.loadedSelectors.has(e)) && t && t()) } async loadWebFontsFromSelectors(e) { return this.loadFontsFromSelectors(e) } get defaultFont() { let e = this.getFontBySelector(`Inter`); return V(e, `Can’t find Inter font`), e } }, SD = new xD, CD = e => e.target.value, wD = { "data-1p-ignore": !0, "data-lpignore": !0, "data-form-type": `other`, autocomplete: `off` }, TD = A(function(e, t) { let { autoFocus: n, className: r, inputName: i, max: a, min: o, placeholder: s, required: c, step: l, style: u, type: d, maxLength: p, value: m, defaultValue: h, autofillEnabled: g, onChange: _, onBlur: v, onInvalid: y, onFocus: b, onValid: x, onClear: S, ...C } = e, w = Xm(m ?? h, d), [T, D, O] = Ym(w ?? ``, !0, _), k = Dr(w), A = f(() => { D(``), S && M(() => S()) }, [S, D]), j = Ha(x, y, O, v, b), te = f(e => { e.target === e.currentTarget && k.current?.focus() }, [k]); if (d === `hidden`) return E(ye.input, { type: `hidden`, name: i, defaultValue: h }); let ne = g === !1 ? wD : void 0,
         re = !!T,
         ie = !!S && re,
         ae = fc(ED, Ny, r, d === `text` && DD, d === `textarea` && OD); return ee(ye.div, { ref: t, onClick: te, style: u, className: ae, ...C, children: [d === `textarea` ? E(ye.textarea, { ref: k, ...ne, ...j, required: c, autoFocus: n, name: i, placeholder: s, className: My, value: T, maxLength: p }) : E(ye.input, { ref: k, ...ne, ...j, type: d, required: c, autoFocus: n, name: i, placeholder: s, className: fc(My, !re && Py), value: T, min: o, max: a, step: l, maxLength: p }), ie && E(`button`, { type: `button`, className: kD, onClick: A, "aria-label": `Clear`, children: E(Zm, {}) })] }) }), ED = `framer-form-text-input`, DD = `framer-form-text-input-type`, OD = `framer-form-textarea-input-type`, kD = `framer-form-text-input-clear`, AD = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="m1.5 8 7-7M9 5.5l-3 3" stroke="%23999" stroke-width="1.5" stroke-linecap="round"></path></svg>`, jD = `<svg xmlns="http://www.w3.org/2000/svg" transform="scale(-1, 1)" width="14" height="14"><path d="m1.5 8 7-7M9 5.5l-3 3" stroke="%23999" stroke-width="1.5" stroke-linecap="round"></path></svg>`, MD = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgb(153, 153, 153)" d="M3 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2H3Z" opacity=".3"/><path fill="transparent" stroke="rgb(153, 153, 153)" stroke-width="1.5" d="M3.25 5.25a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-5.5a2 2 0 0 1-2-2ZM3 6.75h9.5"/></svg>`, ND = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="transparent" stroke="rgb(153, 153, 153)" stroke-width="1.5" d="M2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 1 1-11 0Z"/><path fill="transparent" stroke="rgb(153, 153, 153)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 8.25v-3m0 3h2"/></svg>`, PD = wy(TD, (() => [...Iy, ...zy, ...Ly, Z(`.${Ny}`, { boxShadow: Z.variable(`--framer-input-box-shadow`), borderTopLeftRadius: Z.variable(`--framer-input-border-radius-top-left`), borderTopRightRadius: Z.variable(`--framer-input-border-radius-top-right`), borderBottomRightRadius: Z.variable(`--framer-input-border-radius-bottom-right`), borderBottomLeftRadius: Z.variable(`--framer-input-border-radius-bottom-left`), cornerShape: Z.variable(`--framer-input-corner-shape`), background: Z.variable(`--framer-input-background`), transition: Z.variable(`--framer-input-focused-transition`), transitionProperty: `background, box-shadow` }), Z(`.${ED} .${My}::placeholder`, { color: Z.variable(`--framer-input-placeholder-color`) }), Z(`.${ED}`, { display: `flex`, alignItems: `center`, padding: Z.variable(`--framer-input-padding`) }), Z(`.${ED} .${My}`, { flex: 1, minWidth: 0, width: `auto`, padding: 0 }), Z(`.${ED}.${OD}`, { padding: 0 }), Z(`.${ED}.${OD} textarea.${My}`, { width: `100%`, padding: Z.variable(`--framer-input-padding`) }), Z(`.${ED} .${My}[type="date"], .${ED} .${My}[type="time"]`, { "-webkit-appearance": `none`, appearance: `none` }), Z(`.${ED} .${My}::-webkit-date-and-time-value`, { textAlign: `start` }), Z(`.${ED} textarea`, { display: `flex`, resize: Z.variable(`--framer-textarea-resize`), overflowY: `auto`, minHeight: `inherit`, maxHeight: `inherit`, whiteSpace: `break-spaces` }), Z(`.${ED} textarea::-webkit-resizer`, { background: `no-repeat ${ct(AD)}` }), Z(`.${ED}:dir(rtl) textarea::-webkit-resizer`, { background: `no-repeat ${ct(jD)}` }), Z(`.${ED} textarea::-webkit-scrollbar`, { cursor: `pointer`, background: `transparent` }), Z(`.${ED} textarea::-webkit-scrollbar-thumb:window-inactive`, { opacity: 0 }), Z(`.${ED} textarea::-webkit-scrollbar-corner`, { background: `none`, backgroundColor: `transparent`, outline: `none` }), Z(`.${ED} .${My}::-webkit-datetime-edit`, { height: Z.variable(`--framer-input-font-line-height`) }), Z(`.${ED} .${My}.${Py}::-webkit-datetime-edit`, { color: Z.variable(`--framer-input-placeholder-color`), "-webkit-text-fill-color": Z.variable(`--framer-input-placeholder-color`), overflow: `visible` }), Z(`.${ED}.${DD}::before`, { content: Z.variable(`--framer-input-icon-content`, `none`), display: `block`, flexShrink: 0, width: `${Wy}px`, height: `${Wy}px`, marginRight: `${Uy}px`, ...Gy, backgroundPosition: `center`, maskPosition: `center`, maskImage: Z.variable(`--framer-input-icon-mask-image`), backgroundImage: Z.variable(`--framer-input-icon-image`) }), Z(`.${ED} .${My}[type="date"]::before, .${ED} .${My}[type="time"]::before`, { ...Ky, paddingLeft: `${Hy}px`, maskPosition: `${Hy}px center`, backgroundPosition: `${Hy}px center` }), Z(`.${ED} .${My}[type="date"]::before`, { maskImage: Z.variable(`--framer-input-icon-mask-image`, ct(MD)), backgroundImage: Z.variable(`--framer-input-icon-image`) }), Z(`.${ED} .${My}[type="time"]::before`, { maskImage: Z.variable(`--framer-input-icon-mask-image`, ct(ND)), backgroundImage: Z.variable(`--framer-input-icon-image`) }), Z(`.${ED} .${My}::-webkit-calendar-picker-indicator`, { opacity: 0, position: `absolute`, right: 0, top: 0, bottom: 0, padding: Z.variable(`--framer-input-padding`), paddingTop: 0, paddingBottom: 0, width: `${Wy}px`, height: `100%` }), Z(`.${ED}:focus-within, .${ED}.${Fy}`, { boxShadow: Z.variable(`--framer-input-focused-box-shadow`, `--framer-input-box-shadow`), background: Z.variable(`--framer-input-focused-background`, `--framer-input-background`) }), Z(`.${ED}:focus-within::after, .${ED}.${Fy}::after`, { borderColor: Z.variable(`--framer-input-focused-border-color`, `--framer-input-border-color`), borderStyle: Z.variable(`--framer-input-focused-border-style`, `--framer-input-border-style`), borderWidth: Z.variable(`--framer-input-focused-border-width`, Ry) }), Z(`.${kD}`, { display: `flex`, order: 2, alignItems: `center`, justifyContent: `center`, flexShrink: 0, width: `${Wy}px`, height: `${Wy}px`, marginLeft: `${Uy}px`, padding: 0, border: `none`, background: `transparent`, cursor: `pointer`, color: Z.variable(`--framer-input-placeholder-color`), transition: `color 0.15s ease`, outline: `none` }), Z(`.${kD}:hover, .${kD}:focus-visible`, { color: Z.variable(`--framer-input-font-color`) })])(), `framer-lib-form-plain-text-input`), FD = (() => ({ x: void 0, y: void 0, z: 0, translateX: void 0, translateY: void 0, translateZ: 0, rotate: void 0, rotateX: 0, rotateY: 0, rotateZ: void 0, scale: 1, scaleX: 1, scaleY: 1, scaleZ: 1, skew: 0, skewX: 0, skewY: 0, originX: void 0, originY: void 0, originZ: void 0, perspective: 0, transformPerspective: 0 }))(), ID = { opacity: 0 }, LD = { opacity: 1 }, RD = ch(j.forwardRef(function(e, t) { let { background: n, children: r, alt: i, draggable: a, fitImageDimension: o, style: s, ...l } = e, d = { ...s }, f = u(() => Co(n), [n]), [p, m] = c();
      j.useLayoutEffect(() => { if (!n?.src || !o || f) return; let e = document.createElement(`img`);
         e.onload = () => { e.naturalWidth && e.naturalHeight && m({ width: e.naturalWidth, height: e.naturalHeight }) }, e.src = n.src }, [n?.src, o, f]); let h = f ?? p; return o && h && (d[o] = `auto`, d.aspectRatio = h.width / h.height), n && delete d.background, ee(wo(e.as), { ...l, style: d, ref: t, draggable: a, children: [n && E(vo, { image: n, alt: i, draggable: a }), r] }) })), zD = j.memo(function({ trackCount: e, rowGap: t, parentIsDataRepeater: n = !1, itemsOrder: r, children: i }) { let a = dh(i, n);
      r?.length && (a = uh(a, r)); let o = fh(e, a),
         s = ph(t); return o.map((e, t) => E(`div`, { style: s, children: e }, mh(t))) }), BD = e => A(function({ columnMasonryLayoutEnabled: t, trackCount: n = 1, rowGap: r, parentIsDataRepeater: i, itemsOrder: a, children: o, style: s, ...c }, l) { return t ? E(e, { ref: l, style: { ...s, gridTemplateColumns: `repeat(${n}, 1fr)` }, ...c, children: E(zD, { trackCount: n, rowGap: r, parentIsDataRepeater: i, itemsOrder: a, children: o }) }) : E(e, { ref: l, style: s, ...c, children: o }) }), HD = (() => !ka() && typeof Document < `u` && typeof Document.parseHTMLUnsafe == `function`)(), UD = /(<([a-z]+)(?:\s+(?!href[\s=])[^=\s]+=(?:'[^']*'|"[^"]*"))*)(?:(\s+href\s*=)(?:'([^']*)'|"([^"]*)"))?((?:\s+[^=\s]+=(?:'[^']*'|"[^"]*"))*>)/gi, WD = `{{ text-placeholder }}`, GD = `rich-text-wrapper`, KD = Ka(A(function(e, n) { let { id: r, name: i, html: a, htmlFromDesign: s, text: c, textFromDesign: d, fonts: f = [], width: p, height: m, left: h, right: g, top: _, bottom: v, center: y, className: b, stylesPresetsClassName: x, visible: S = !0, opacity: C, rotation: w = 0, verticalAlignment: T = `top`, isEditable: D = !1, environment: O = J.current, withExternalLayout: k = !1, positionSticky: ee, positionStickyTop: A, positionStickyRight: j, positionStickyBottom: te, positionStickyLeft: M, __htmlStructure: ne, __fromCanvasComponent: re = !1, _forwardedOverrideId: ie, _forwardedOverrides: ae, _usesDOMRect: oe, children: se, ...ce } = e, le = ha(), ue = Ao(e), de = t(null), fe = n ?? de, { navigate: pe, getRoute: me } = kt(), he = jt();
      xn(e.preload ?? []), Io(e, fe); let ge = l(ix),
         N = kl(),
         _e = c,
         ve = ie ?? r; if (ve && ae) { let e = ae[ve];
         typeof e == `string` && (_e = e) } let P = ``; if (_e) { let e = _h(_e);
         P = ne ? ne.replace(WD, e) : `<p>${e}</p>` } else if (a) P = a;
      else if (d) { let e = _h(d);
         P = ne ? ne.replace(WD, e) : `<p>${e}</p>` } else s && (P = s); let be = Cu(),
         xe = u(() => N || !me || !he ? P : vh(P, me, he, be), [P, me, he, be]); if (o(() => { let e = fe.current; if (e === null) return;

            function t(e) { let t = _u(e.target, fe.current);
               Fa(e) || !pe || !t || t.getAttribute(`target`) === `_blank` || Fl(pe, t, be) && e.preventDefault() } return e.addEventListener(`click`, t), () => { e.removeEventListener(`click`, t) } }, [pe, be]), xh(f, re, fe), !S) return null; let Se = D && O() === J.canvas,
         F = { outline: `none`, display: `flex`, flexDirection: `column`, justifyContent: bh(T), opacity: Se ? 0 : C, flexShrink: 0 },
         Ce = J.hasRestrictions(),
         I = fa(e, le || 0, !1),
         we = oe && (p === `auto` || m === `auto`),
         Te = e.transformTemplate || !I || !Ce || re || we ? e.transformTemplate ?? ko(y) : void 0; if (!k) { if (I && Ce && !we) { let e = bv.getNumber(w).toFixed(4);
            F.transform = `translate(${I.x}px, ${I.y}px) rotate(${e}deg)`, F.width = I.width, F.minWidth = I.width, F.height = I.height } else F.left = h, F.right = g, F.top = _, F.bottom = v, F.width = p, F.height = m, F.rotate = w;
         ee ? (!N || ge) && (F.position = `sticky`, F.willChange = `transform`, F.top = A, F.right = j, F.bottom = te, F.left = M) : N && (e.positionFixed || e.positionAbsolute) && (F.position = `absolute`) } return uc(e, F), sc(e, F), Object.assign(F, e.style), E(ye.div, { id: r, ref: fe, ...ce, style: F, layoutId: ue, "data-framer-name": i, "data-framer-component-type": `DeprecatedRichText`, "data-center": y, className: fc(b, x, GD), transformTemplate: Te, dangerouslySetInnerHTML: { __html: xe } }) })), qD = { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0, filter: `none` }, JD = (() => RegExp(`\\p{Regional_Indicator}{2}|\\p{Emoji}\\p{Emoji_Modifier}?\\p{Variation_Selector}?(?:\\u{200d}\\p{Emoji}\\p{Emoji_Modifier}?\\p{Variation_Selector}?)*|.`, `gu`))(), YD = A(function(e, t) { return E(`svg`, { ...e, ref: t, children: e.children }) }), XD = ye.create(YD), ZD = A(function({ viewBoxScale: e, viewBox: t, children: n, ...r }, i) { return E(XD, { ...r, ref: i, viewBox: t, children: E(ye.foreignObject, { width: `100%`, height: `100%`, className: `framer-fit-text`, transform: `scale(${e})`, style: { overflow: `visible`, transformOrigin: `center center` }, children: n }) }) }), QD = [], $D = `RichTextContainer`, eO = A(function(e, n) { let { __fromCanvasComponent: r = !1, _forwardedOverrideId: i, _forwardedOverrides: a, _usesDOMRect: o, anchorLinkOffsetY: s, as: c, bottom: d, center: f, children: p, environment: m = J.current, fonts: h = QD, height: g, isEditable: _ = !1, left: v, name: y, opacity: b, positionSticky: x, positionStickyBottom: S, positionStickyLeft: C, positionStickyRight: w, positionStickyTop: T, right: D, rotation: O = 0, style: k, _initialStyle: ee, stylesPresetsClassNames: A, text: j, top: te, verticalAlignment: M = `top`, visible: ne = !0, width: re, withExternalLayout: ie = !1, viewBox: ae, viewBoxScale: oe = 1, effect: se, ...ce } = e, le = ha(), ue = m() === J.canvas, de = l(ix), fe = Ao(e), pe = t(null), me = n ?? pe;
      Io(e, me), xh(h, r, me); let he = Ah(se, me),
         ge = u(() => { if (p) return Rh(p, A, j, s, void 0, he.getTokenizer()) }, [p, A, j, s, he]); if (!ne) return null; let N = { opacity: _ && ue ? 0 : b },
         _e = bh(M);
      _e !== qy.justifyContent && (N.justifyContent = _e); let ve = {},
         ye = J.hasRestrictions(),
         P = fa(e, le || 0, !1),
         be = o && (re === `auto` || g === `auto`),
         xe = e.transformTemplate || !P || !ye || r || be ? e.transformTemplate ?? ko(f) : void 0;
      ie || (P && ye && !be ? (ve.x = P.x + (z(k?.x) ? k.x : 0), ve.y = P.y + (z(k?.y) ? k.y : 0), ve.left = 0, ve.top = 0, N.rotate = bv.getNumber(O), N.width = P.width, N.minWidth = P.width, N.height = P.height) : (N.left = v, N.right = D, N.top = te, N.bottom = d, N.width = re, N.height = g, N.rotate = O), x ? (!ue || de) && (N.position = `sticky`, N.willChange = `transform`, N.top = T, N.right = w, N.bottom = S, N.left = C) : ue && (e.positionFixed || e.positionAbsolute) && (N.position = `absolute`)), uc(e, N), sc(e, N), Object.assign(N, ee, k, ve), fe && (ce.layout = `preserve-aspect`); let Se = wo(e.as),
         F = ce[`data-framer-name`] ?? y,
         Ce = ue ? Fh(Vb(ce)) : ce; return R(e.viewBox) ? e.as === void 0 ? E(ZD, { ...Ce, ref: me, style: N, layoutId: fe, viewBox: ae, viewBoxScale: oe, transformTemplate: xe, "data-framer-name": F, "data-framer-component-type": $D, children: ge }) : E(Se, { ...Ce, ref: me, style: N, layoutId: fe, transformTemplate: xe, "data-framer-name": F, "data-framer-component-type": $D, children: E(ZD, { viewBox: ae, viewBoxScale: oe, style: { width: `100%`, height: `100%` }, children: ge }) }) : E(Se, { ...Ce, ref: me, style: N, layoutId: fe, transformTemplate: xe, "data-framer-name": F, "data-framer-component-type": $D, children: ge }) }), tO = Ka(A(function({ children: e, html: t, htmlFromDesign: n, ...r }, i) { let a = t || e || n; if (R(a)) {!r.stylesPresetsClassName && B(r.stylesPresetsClassNames) && (r.stylesPresetsClassName = Object.values(r.stylesPresetsClassNames).join(` `)); let e = {
            [R(t) ? `html` : `htmlFromDesign`]: a }; return E(KD, { ...r, ...e, ref: i }) } if (!r.stylesPresetsClassNames && R(r.stylesPresetsClassName)) { let [e, t, n, i, a] = r.stylesPresetsClassName.split(` `);
         e === void 0 || t === void 0 || n === void 0 || i === void 0 || a === void 0 ? console.warn(`Encountered invalid stylesPresetsClassNames: ${r.stylesPresetsClassNames}`) : r.stylesPresetsClassNames = { h1: e, h2: t, h3: n, p: i, a } } return E(eO, { ...r, ref: i, children: O(a) ? a : void 0 }) })), nO = Aa(), rO = class { constructor(e, t, n, r, i = 0) { this.id = e, this.svg = t, this.innerHTML = n, this.viewBox = r, this.count = i } }, iO = `position: absolute; overflow: hidden; bottom: 0; left: 0; width: 0; height: 0; z-index: 0; contain: strict`, aO = class { constructor() { L(this, `entries`, new Map), L(this, `vectorSetItems`, new Map) } debugGetEntries() { return this.entries } subscribe(e, t, n, r) { if (!e || e === ``) return ``; let i = this.entries.get(e); if (!i) { n ||= `svg${String(fx(e))}_${String(e.length)}`; let a = e,
               o, s = Vh(e);
            s && (t && Hh(s, n), s.id = n, o = qh(s), s.removeAttribute(`xmlns`), s.removeAttribute(`xlink`), s.removeAttribute(`xmlns:xlink`), a = s.outerHTML), i = this.createDOMElementFor(a, n, o, r), this.entries.set(e, i) } return i.count += 1, i.innerHTML } getViewBox(e) { if (!(!e || e === ``)) return this.entries.get(e)?.viewBox } unsubscribe(e) { if (!e || e === ``) return; let t = this.entries.get(e);
         t && (--t.count, !(t.count > 0) && setTimeout(() => this.maybeRemoveEntry(e), 5e3)) } maybeRemoveEntry(e) { let t = this.entries.get(e);
         t && (t.count > 0 || (this.entries.delete(e), this.removeDOMElement(t))) } removeDOMElement(e) { nO && (document?.getElementById(e.id))?.remove() } getOrCreateTemplateContainer() { let e = document.getElementById(`svg-templates`); if (e) return e; let t = document.createElement(`div`); return t.id = `svg-templates`, t.ariaHidden = `true`, t.style.cssText = iO, document.body.appendChild(t), t } maybeAppendTemplate(e, t) { if (document.getElementById(e)) return; let n = document.createElement(`div`);
         n.innerHTML = t; let r = n.firstElementChild;
         r && (r.id = e, this.getOrCreateTemplateContainer().appendChild(r)) } createDOMElementFor(e, t, n, r) { nO && this.maybeAppendTemplate(t, e); let i = n ? `0 0 ${n.width} ${n.height}` : void 0,
            a = i ? ` viewBox="${i}"` : ``; return new rO(t, e, `<svg style="width:100%;height:100%;${r?`overflow: visible;`:``}"${a}><use href="#${t}"/></svg>`, i) } template(e, t) { return this.vectorSetItems.get(e) || (this.vectorSetItems.set(e, { svg: t, count: 0 }), !nO) || this.maybeAppendTemplate(e, t), `#${e}` } subscribeToTemplate(e) { let t = this.vectorSetItems.get(e); if (t) return t.count++, () => { let t = this.vectorSetItems.get(e);
            t && (t.count--, !(t.count > 0) && setTimeout(() => { this.vectorSetItems.get(e)?.count || (this.vectorSetItems.delete(e), nO && document?.getElementById(e)?.remove()) }, 5e3)) } } clear() { this.entries.clear() } generateTemplates() { let e = []; return e.push(`<div id="svg-templates" style="${iO}" aria-hidden="true">`), this.entries.forEach(t => e.push(t.svg)), this.vectorSetItems.forEach(t => e.push(t.svg)), e.push(`</div>`), e.join(`
`) } }, oO = new aO, sO = (() => ({ cm: 96 / 2.54, mm: 96 / 2.54 / 10, Q: 96 / 2.54 / 40, in: 96, pc: 96 / 6, pt: 96 / 72, px: 1, em: 16, ex: 8, ch: 8, rem: 16 }))(), cO = 1e3, lO = `explicitInter`, We.prototype.addChild = function({ transformer: e = e => e }) { let t = oe(e(this.get())); return this.onChange(n => t.set(e(n))), t }
}));
export { Zr as $, Ey as A, yn as At, Zh as B, J as C, wy as Ct, Yh as D, Tc as Dt, fC as E, XS as Et, SS as F, Vr as G, eo as H, wS as I, Ra as J, dt as K, CS as L, SD as M, sg as N, $a as O, ag as Ot, TS as P, CC as Q, Cy as R, TE as S, rm as St, tO as T, BD as Tt, xp as U, Jh as V, Qg as W, Cg as X, mt as Y, Mr as Z, mv as _, Bp as _t, dC as a, el as at, VC as b, kt as bt, hu as c, El as ct, fS as d, no as dt, OE as et, zC as f, Up as ft, ZC as g, Rp as gt, jg as h, Qr as ht, $S as i, Tp as it, fc as j, zb as k, RE as kt, vw as l, kp as lt, Fg as m, yr as mt, vu as n, oO as nt, ay as o, Rt as ot, RD as p, br as pt, uO as q, $c as r, Or as rt, Ji as s, jt as st, gu as t, Np as tt, PD as u, kl as ut, Pn as v, yp as vt, Qw as w, im as wt, _S as x, Ip as xt, Gd as y, Lt as yt, Xh as z };
//# sourceMappingURL=framer.Ce8kTlRq.mjs.map