import { t as e } from "./rolldown-runtime.blwatvxf.mjs";
import { S as t, U as n, q as r } from "./framer.ce8ktlrq.mjs";
import { i, r as a } from "./tjhdfhvyt.dk7ddcdt.mjs";
import { n as o, t as s } from "./sitemetadata.cj4jgjao.mjs";

function c(e, t) { let n = e?.qr2qKvGCk; return { breakpoints: [{ hash: `1ggsp19`, mediaQuery: `(min-width: 1200px)` }, { hash: `x97nbn`, mediaQuery: `(min-width: 810px) and (max-width: 1199.98px)` }, { hash: `98qas`, mediaQuery: `(max-width: 809.98px)` }], description: o(e, t).description, elements: { bm9sJ295m: `breadcrumbs` }, framerSearch: { index: !0 }, robots: `max-image-preview:large`, serializationId: `framer-Qh2dI`, socialImage: `../images/wwm2waimiwnvahhxgmjc07jgew.jpg`, title: `${n===void 0?`{{qr2qKvGCk}}`:d(n)} - Ramp Marketing`, viewport: `width=device-width` } } async function l(e, r) { let a = new t,
		o = { from: { alias: `j71x5a3jG`, data: i, type: `Collection` }, select: [{ collection: `j71x5a3jG`, name: `qr2qKvGCk`, type: `Identifier` }], where: n(e, `j71x5a3jG`) },
		s = await a.query(o, r); if (s.length === 0) throw Error(`No data matches pathVariables`); let l = s[0]; return c(l, r) } async function u(e, n) { let r = new t,
		a = { from: { alias: `j71x5a3jG`, data: i, type: `Collection` }, select: [{ collection: `j71x5a3jG`, name: `qr2qKvGCk`, type: `Identifier` }] }; for (let t of e) a.select.push({ collection: `j71x5a3jG`, name: t, type: `Identifier` }); return (await r.query(a, n)).map(t => ({ metadata: c(t, n), pathVariables: Object.fromEntries(e.map(e => [e, t[e]])) })) }
var d, f, p, m = e((() => { r(), a(), s(), d = e => typeof e == `string` ? e : String(e), f = 1, p = { exports: { default: { type: `function`, annotations: { framerContractVersion: `1` } }, fetchMetadata: { type: `function`, annotations: { framerContractVersion: `1` } }, fetchAllMetadata: { type: `function`, annotations: { framerContractVersion: `1` } }, metadataVersion: { type: `variable`, annotations: { framerContractVersion: `1` } }, __FramerMetadata__: { type: `variable` } } } }));
export { c as a, m as i, u as n, f as o, l as r, p as t };
//# sourceMappingURL=j71x5a3jG.BUsSZSq_.mjs.map