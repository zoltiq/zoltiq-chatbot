var Kt = Array.isArray, Gt = Array.from, gi = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, Jn = Object.getOwnPropertyDescriptors, bi = Object.prototype, mi = Array.prototype, st = Object.getPrototypeOf;
const Ee = () => {
};
function wi(e) {
  return e();
}
function Pt(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const W = 2, Xn = 4, Ge = 8, Yt = 16, K = 32, Ye = 64, me = 128, at = 256, N = 512, ce = 1024, Je = 2048, J = 4096, Xe = 8192, yi = 16384, Jt = 32768, ki = 65536, $i = 1 << 18, Zn = 1 << 19, ge = Symbol("$state"), xi = Symbol("legacy props"), Ci = Symbol("");
function Qn(e) {
  return e === this.v;
}
function er(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Xt(e) {
  return !er(e, this.v);
}
function Si(e) {
  throw new Error("effect_in_teardown");
}
function Ei() {
  throw new Error("effect_in_unowned_derived");
}
function ji(e) {
  throw new Error("effect_orphan");
}
function Mi() {
  throw new Error("effect_update_depth_exceeded");
}
function zi(e) {
  throw new Error("props_invalid_value");
}
function Li() {
  throw new Error("state_descriptors_fixed");
}
function Ri() {
  throw new Error("state_prototype_fixed");
}
function Di() {
  throw new Error("state_unsafe_local_read");
}
function Ti() {
  throw new Error("state_unsafe_mutation");
}
let Te = !1;
function Pi() {
  Te = !0;
}
function q(e) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Qn,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function gt(e, t = !1) {
  var r;
  const n = q(e);
  return t || (n.equals = Xt), Te && L !== null && L.l !== null && ((r = L.l).s ?? (r.s = [])).push(n), n;
}
function he(e, t = !1) {
  return /* @__PURE__ */ Ai(/* @__PURE__ */ gt(e, t));
}
// @__NO_SIDE_EFFECTS__
function Ai(e) {
  return S !== null && S.f & W && (X === null ? oo([e]) : X.push(e)), e;
}
function He(e, t) {
  return D(
    e,
    be(() => w(e))
  ), t;
}
function D(e, t) {
  return S !== null && nn() && S.f & (W | Yt) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (X === null || !X.includes(e)) && Ti(), tr(e, t);
}
function tr(e, t) {
  return e.equals(t) || (e.v = t, e.version = kr(), nr(e, ce), nn() && $ !== null && $.f & N && !($.f & K) && (A !== null && A.includes(e) ? (ee($, ce), yt($)) : ae === null ? so([e]) : ae.push(e))), t;
}
function nr(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = nn(), o = n.length, i = 0; i < o; i++) {
      var s = n[i], u = s.f;
      u & ce || !r && s === $ || (ee(s, t), u & (N | me) && (u & W ? nr(
        /** @type {Derived} */
        s,
        Je
      ) : yt(
        /** @type {Effect} */
        s
      )));
    }
}
const Ii = 1, Bi = 2, Oi = 16, Hi = 1, Ni = 2, Vi = 4, Fi = 8, Ui = 16, qi = 1, Wi = 2, V = Symbol();
let rr = !1;
function xe(e, t = null, n) {
  if (typeof e != "object" || e === null || ge in e)
    return e;
  const r = st(e);
  if (r !== bi && r !== mi)
    return e;
  var o = /* @__PURE__ */ new Map(), i = Kt(e), s = q(0);
  i && o.set("length", q(
    /** @type {any[]} */
    e.length
  ));
  var u;
  return new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, c, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && Li();
        var f = o.get(c);
        return f === void 0 ? (f = q(a.value), o.set(c, f)) : D(f, xe(a.value, u)), !0;
      },
      deleteProperty(l, c) {
        var a = o.get(c);
        if (a === void 0)
          c in l && o.set(c, q(V));
        else {
          if (i && typeof c == "string") {
            var f = (
              /** @type {Source<number>} */
              o.get("length")
            ), d = Number(c);
            Number.isInteger(d) && d < f.v && D(f, d);
          }
          D(a, V), hn(s);
        }
        return !0;
      },
      get(l, c, a) {
        var v;
        if (c === ge)
          return e;
        var f = o.get(c), d = c in l;
        if (f === void 0 && (!d || (v = Se(l, c)) != null && v.writable) && (f = q(xe(d ? l[c] : V, u)), o.set(c, f)), f !== void 0) {
          var h = w(f);
          return h === V ? void 0 : h;
        }
        return Reflect.get(l, c, a);
      },
      getOwnPropertyDescriptor(l, c) {
        var a = Reflect.getOwnPropertyDescriptor(l, c);
        if (a && "value" in a) {
          var f = o.get(c);
          f && (a.value = w(f));
        } else if (a === void 0) {
          var d = o.get(c), h = d == null ? void 0 : d.v;
          if (d !== void 0 && h !== V)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return a;
      },
      has(l, c) {
        var h;
        if (c === ge)
          return !0;
        var a = o.get(c), f = a !== void 0 && a.v !== V || Reflect.has(l, c);
        if (a !== void 0 || $ !== null && (!f || (h = Se(l, c)) != null && h.writable)) {
          a === void 0 && (a = q(f ? xe(l[c], u) : V), o.set(c, a));
          var d = w(a);
          if (d === V)
            return !1;
        }
        return f;
      },
      set(l, c, a, f) {
        var R;
        var d = o.get(c), h = c in l;
        if (i && c === "length")
          for (var v = a; v < /** @type {Source<number>} */
          d.v; v += 1) {
            var b = o.get(v + "");
            b !== void 0 ? D(b, V) : v in l && (b = q(V), o.set(v + "", b));
          }
        d === void 0 ? (!h || (R = Se(l, c)) != null && R.writable) && (d = q(void 0), D(d, xe(a, u)), o.set(c, d)) : (h = d.v !== V, D(d, xe(a, u)));
        var g = Reflect.getOwnPropertyDescriptor(l, c);
        if (g != null && g.set && g.set.call(f, a), !h) {
          if (i && typeof c == "string") {
            var _ = (
              /** @type {Source<number>} */
              o.get("length")
            ), y = Number(c);
            Number.isInteger(y) && y >= _.v && D(_, y + 1);
          }
          hn(s);
        }
        return !0;
      },
      ownKeys(l) {
        w(s);
        var c = Reflect.ownKeys(l).filter((d) => {
          var h = o.get(d);
          return h === void 0 || h.v !== V;
        });
        for (var [a, f] of o)
          f.v !== V && !(a in l) && c.push(a);
        return c;
      },
      setPrototypeOf() {
        Ri();
      }
    }
  );
}
function hn(e, t = 1) {
  D(e, e.v + t);
}
var pn, ir, or;
function Ki() {
  if (pn === void 0) {
    pn = window;
    var e = Element.prototype, t = Node.prototype;
    ir = Se(t, "firstChild").get, or = Se(t, "nextSibling").get, e.__click = void 0, e.__className = "", e.__attributes = null, e.__styles = null, e.__e = void 0, Text.prototype.__t = void 0;
  }
}
function Gi(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function qe(e) {
  return ir.call(e);
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return or.call(e);
}
function B(e, t) {
  return /* @__PURE__ */ qe(e);
}
function vn(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ qe(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ bt(n) : n;
  }
}
function H(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ bt(r);
  return r;
}
function Yi(e) {
  e.textContent = "";
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  var t = W | ce;
  $ === null ? t |= me : $.f |= Zn;
  var n = S !== null && S.f & W ? (
    /** @type {Derived} */
    S
  ) : null;
  const r = {
    children: null,
    ctx: L,
    deps: null,
    equals: Qn,
    f: t,
    fn: e,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: n ?? $
  };
  return n !== null && (n.children ?? (n.children = [])).push(r), r;
}
// @__NO_SIDE_EFFECTS__
function Ji(e) {
  const t = /* @__PURE__ */ lt(e);
  return t.equals = Xt, t;
}
function sr(e) {
  var t = e.children;
  if (t !== null) {
    e.children = null;
    for (var n = 0; n < t.length; n += 1) {
      var r = t[n];
      r.f & W ? Zt(
        /** @type {Derived} */
        r
      ) : de(
        /** @type {Effect} */
        r
      );
    }
  }
}
function Xi(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & W))
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function ar(e) {
  var t, n = $;
  Q(Xi(e));
  try {
    sr(e), t = $r(e);
  } finally {
    Q(n);
  }
  return t;
}
function lr(e) {
  var t = ar(e), n = (Ce || e.f & me) && e.deps !== null ? Je : N;
  ee(e, n), e.equals(t) || (e.v = t, e.version = kr());
}
function Zt(e) {
  sr(e), Ke(e, 0), ee(e, Xe), e.v = e.children = e.deps = e.ctx = e.reactions = null;
}
function cr(e) {
  $ === null && S === null && ji(), S !== null && S.f & me && Ei(), tn && Si();
}
function Zi(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Pe(e, t, n, r = !0) {
  var o = (e & Ye) !== 0, i = $, s = {
    ctx: L,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: e | ce,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: o ? null : i,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (n) {
    var u = je;
    try {
      _n(!0), wt(s), s.f |= yi;
    } catch (a) {
      throw de(s), a;
    } finally {
      _n(u);
    }
  } else t !== null && yt(s);
  var l = n && s.deps === null && s.first === null && s.nodes_start === null && s.teardown === null && (s.f & Zn) === 0;
  if (!l && !o && r && (i !== null && Zi(s, i), S !== null && S.f & W)) {
    var c = (
      /** @type {Derived} */
      S
    );
    (c.children ?? (c.children = [])).push(s);
  }
  return s;
}
function ur(e) {
  const t = Pe(Ge, null, !1);
  return ee(t, N), t.teardown = e, t;
}
function At(e) {
  cr();
  var t = $ !== null && ($.f & K) !== 0 && L !== null && !L.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      L
    );
    (n.e ?? (n.e = [])).push({
      fn: e,
      effect: $,
      reaction: S
    });
  } else {
    var r = Qt(e);
    return r;
  }
}
function Qi(e) {
  return cr(), dr(e);
}
function eo(e) {
  const t = Pe(Ye, e, !0);
  return () => {
    de(t);
  };
}
function Qt(e) {
  return Pe(Xn, e, !1);
}
function dr(e) {
  return Pe(Ge, e, !0);
}
function ye(e) {
  return mt(e);
}
function mt(e, t = 0) {
  return Pe(Ge | Yt | t, e, !0);
}
function Le(e, t = !0) {
  return Pe(Ge | K, e, !0, t);
}
function fr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = tn, r = S;
    gn(!0), ue(null);
    try {
      t.call(null);
    } finally {
      gn(n), ue(r);
    }
  }
}
function hr(e) {
  var t = e.deriveds;
  if (t !== null) {
    e.deriveds = null;
    for (var n = 0; n < t.length; n += 1)
      Zt(t[n]);
  }
}
function pr(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    var r = n.next;
    de(n, t), n = r;
  }
}
function to(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    t.f & K || de(t), t = n;
  }
}
function de(e, t = !0) {
  var n = !1;
  if ((t || e.f & $i) && e.nodes_start !== null) {
    for (var r = e.nodes_start, o = e.nodes_end; r !== null; ) {
      var i = r === o ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ bt(r)
      );
      r.remove(), r = i;
    }
    n = !0;
  }
  pr(e, t && !n), hr(e), Ke(e, 0), ee(e, Xe);
  var s = e.transitions;
  if (s !== null)
    for (const l of s)
      l.stop();
  fr(e);
  var u = e.parent;
  u !== null && u.first !== null && vr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.parent = e.fn = e.nodes_start = e.nodes_end = null;
}
function vr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function It(e, t) {
  var n = [];
  en(e, n, !0), _r(n, () => {
    de(e), t && t();
  });
}
function _r(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var o of e)
      o.out(r);
  } else
    t();
}
function en(e, t, n) {
  if (!(e.f & J)) {
    if (e.f ^= J, e.transitions !== null)
      for (const s of e.transitions)
        (s.is_global || n) && t.push(s);
    for (var r = e.first; r !== null; ) {
      var o = r.next, i = (r.f & Jt) !== 0 || (r.f & K) !== 0;
      en(r, t, i ? n : !1), r = o;
    }
  }
}
function ct(e) {
  gr(e, !0);
}
function gr(e, t) {
  if (e.f & J) {
    Ze(e) && wt(e), e.f ^= J;
    for (var n = e.first; n !== null; ) {
      var r = n.next, o = (n.f & Jt) !== 0 || (n.f & K) !== 0;
      gr(n, o ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let ut = !1, Bt = [];
function br() {
  ut = !1;
  const e = Bt.slice();
  Bt = [], Pt(e);
}
function mr(e) {
  ut || (ut = !0, queueMicrotask(br)), Bt.push(e);
}
function no() {
  ut && br();
}
function ro(e) {
  throw new Error("lifecycle_outside_component");
}
const wr = 0, io = 1;
let rt = wr, We = !1, je = !1, tn = !1;
function _n(e) {
  je = e;
}
function gn(e) {
  tn = e;
}
let _e = [], Me = 0;
let S = null;
function ue(e) {
  S = e;
}
let $ = null;
function Q(e) {
  $ = e;
}
let X = null;
function oo(e) {
  X = e;
}
let A = null, F = 0, ae = null;
function so(e) {
  ae = e;
}
let yr = 0, Ce = !1, L = null;
function kr() {
  return ++yr;
}
function nn() {
  return !Te || L !== null && L.l === null;
}
function Ze(e) {
  var s, u;
  var t = e.f;
  if (t & ce)
    return !0;
  if (t & Je) {
    var n = e.deps, r = (t & me) !== 0;
    if (n !== null) {
      var o;
      if (t & at) {
        for (o = 0; o < n.length; o++)
          ((s = n[o]).reactions ?? (s.reactions = [])).push(e);
        e.f ^= at;
      }
      for (o = 0; o < n.length; o++) {
        var i = n[o];
        if (Ze(
          /** @type {Derived} */
          i
        ) && lr(
          /** @type {Derived} */
          i
        ), r && $ !== null && !Ce && !((u = i == null ? void 0 : i.reactions) != null && u.includes(e)) && (i.reactions ?? (i.reactions = [])).push(e), i.version > e.version)
          return !0;
      }
    }
    r || ee(e, N);
  }
  return !1;
}
function ao(e, t, n) {
  throw e;
}
function $r(e) {
  var d;
  var t = A, n = F, r = ae, o = S, i = Ce, s = X, u = L, l = e.f;
  A = /** @type {null | Value[]} */
  null, F = 0, ae = null, S = l & (K | Ye) ? null : e, Ce = !je && (l & me) !== 0, X = null, L = e.ctx;
  try {
    var c = (
      /** @type {Function} */
      (0, e.fn)()
    ), a = e.deps;
    if (A !== null) {
      var f;
      if (Ke(e, F), a !== null && F > 0)
        for (a.length = F + A.length, f = 0; f < A.length; f++)
          a[F + f] = A[f];
      else
        e.deps = a = A;
      if (!Ce)
        for (f = F; f < a.length; f++)
          ((d = a[f]).reactions ?? (d.reactions = [])).push(e);
    } else a !== null && F < a.length && (Ke(e, F), a.length = F);
    return c;
  } finally {
    A = t, F = n, ae = r, S = o, Ce = i, X = s, L = u;
  }
}
function lo(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = n.indexOf(e);
    if (r !== -1) {
      var o = n.length - 1;
      o === 0 ? n = t.reactions = null : (n[r] = n[o], n.pop());
    }
  }
  n === null && t.f & W && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !A.includes(t)) && (ee(t, Je), t.f & (me | at) || (t.f ^= at), Ke(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Ke(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      lo(e, n[r]);
}
function wt(e) {
  var t = e.f;
  if (!(t & Xe)) {
    ee(e, N);
    var n = $;
    $ = e;
    try {
      t & Yt ? to(e) : pr(e), hr(e), fr(e);
      var r = $r(e);
      e.teardown = typeof r == "function" ? r : null, e.version = yr;
    } catch (o) {
      ao(
        /** @type {Error} */
        o
      );
    } finally {
      $ = n;
    }
  }
}
function xr() {
  Me > 1e3 && (Me = 0, Mi()), Me++;
}
function Cr(e) {
  var t = e.length;
  if (t !== 0) {
    xr();
    var n = je;
    je = !0;
    try {
      for (var r = 0; r < t; r++) {
        var o = e[r];
        o.f & N || (o.f ^= N);
        var i = [];
        Sr(o, i), co(i);
      }
    } finally {
      je = n;
    }
  }
}
function co(e) {
  var t = e.length;
  if (t !== 0)
    for (var n = 0; n < t; n++) {
      var r = e[n];
      !(r.f & (Xe | J)) && Ze(r) && (wt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? vr(r) : r.fn = null));
    }
}
function uo() {
  if (We = !1, Me > 1001)
    return;
  const e = _e;
  _e = [], Cr(e), We || (Me = 0);
}
function yt(e) {
  rt === wr && (We || (We = !0, queueMicrotask(uo)));
  for (var t = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (n & (Ye | K)) {
      if (!(n & N)) return;
      t.f ^= N;
    }
  }
  _e.push(t);
}
function Sr(e, t) {
  var n = e.first, r = [];
  e: for (; n !== null; ) {
    var o = n.f, i = (o & K) !== 0, s = i && (o & N) !== 0;
    if (!s && !(o & J))
      if (o & Ge) {
        i ? n.f ^= N : Ze(n) && wt(n);
        var u = n.first;
        if (u !== null) {
          n = u;
          continue;
        }
      } else o & Xn && r.push(n);
    var l = n.next;
    if (l === null) {
      let f = n.parent;
      for (; f !== null; ) {
        if (e === f)
          break e;
        var c = f.next;
        if (c !== null) {
          n = c;
          continue e;
        }
        f = f.parent;
      }
    }
    n = l;
  }
  for (var a = 0; a < r.length; a++)
    u = r[a], t.push(u), Sr(u, t);
}
function Er(e) {
  var t = rt, n = _e;
  try {
    xr();
    const o = [];
    rt = io, _e = o, We = !1, Cr(n);
    var r = e == null ? void 0 : e();
    return no(), (_e.length > 0 || o.length > 0) && Er(), Me = 0, r;
  } finally {
    rt = t, _e = n;
  }
}
async function Mt() {
  await Promise.resolve(), Er();
}
function w(e) {
  var a;
  var t = e.f, n = (t & W) !== 0;
  if (n && t & Xe) {
    var r = ar(
      /** @type {Derived} */
      e
    );
    return Zt(
      /** @type {Derived} */
      e
    ), r;
  }
  if (S !== null) {
    X !== null && X.includes(e) && Di();
    var o = S.deps;
    A === null && o !== null && o[F] === e ? F++ : A === null ? A = [e] : A.push(e), ae !== null && $ !== null && $.f & N && !($.f & K) && ae.includes(e) && (ee($, ce), yt($));
  } else if (n && /** @type {Derived} */
  e.deps === null)
    for (var i = (
      /** @type {Derived} */
      e
    ), s = i.parent, u = i; s !== null; )
      if (s.f & W) {
        var l = (
          /** @type {Derived} */
          s
        );
        u = l, s = l.parent;
      } else {
        var c = (
          /** @type {Effect} */
          s
        );
        (a = c.deriveds) != null && a.includes(u) || (c.deriveds ?? (c.deriveds = [])).push(u);
        break;
      }
  return n && (i = /** @type {Derived} */
  e, Ze(i) && lr(i)), e.v;
}
function be(e) {
  const t = S;
  try {
    return S = null, e();
  } finally {
    S = t;
  }
}
const fo = ~(ce | Je | N);
function ee(e, t) {
  e.f = e.f & fo | t;
}
function jr(e, t = !1, n) {
  L = {
    p: L,
    c: null,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  }, Te && !t && (L.l = {
    s: null,
    u: null,
    r1: [],
    r2: q(!1)
  });
}
function Mr(e) {
  const t = L;
  if (t !== null) {
    const s = t.e;
    if (s !== null) {
      var n = $, r = S;
      t.e = null;
      try {
        for (var o = 0; o < s.length; o++) {
          var i = s[o];
          Q(i.effect), ue(i.reaction), Qt(i.fn);
        }
      } finally {
        Q(n), ue(r);
      }
    }
    L = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function ho(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (ge in e)
      Ot(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && ge in n && Ot(n);
      }
  }
}
function Ot(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        Ot(e[r], t);
      } catch {
      }
    const n = st(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = Jn(n);
      for (let o in r) {
        const i = r[o].get;
        if (i)
          try {
            i.call(e);
          } catch {
          }
      }
    }
  }
}
function po(e) {
  var t = S, n = $;
  ue(null), Q(null);
  try {
    return e();
  } finally {
    ue(t), Q(n);
  }
}
const vo = /* @__PURE__ */ new Set(), bn = /* @__PURE__ */ new Set();
function _o(e, t, n, r) {
  function o(i) {
    if (r.capture || Fe.call(t, i), !i.cancelBubble)
      return po(() => n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? mr(() => {
    t.addEventListener(e, o, r);
  }) : t.addEventListener(e, o, r), o;
}
function pe(e, t, n, r, o) {
  var i = { capture: r, passive: o }, s = _o(e, t, n, i);
  (t === document.body || t === window || t === document) && ur(() => {
    t.removeEventListener(e, s, i);
  });
}
function Fe(e) {
  var y;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, o = ((y = e.composedPath) == null ? void 0 : y.call(e)) || [], i = (
    /** @type {null | Element} */
    o[0] || e.target
  ), s = 0, u = e.__root;
  if (u) {
    var l = o.indexOf(u);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var c = o.indexOf(t);
    if (c === -1)
      return;
    l <= c && (s = l);
  }
  if (i = /** @type {Element} */
  o[s] || e.target, i !== t) {
    gi(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var a = S, f = $;
    ue(null), Q(null);
    try {
      for (var d, h = []; i !== null; ) {
        var v = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var b = i["__" + r];
          if (b !== void 0 && !/** @type {any} */
          i.disabled)
            if (Kt(b)) {
              var [g, ..._] = b;
              g.apply(i, [e, ..._]);
            } else
              b.call(i, e);
        } catch (R) {
          d ? h.push(R) : d = R;
        }
        if (e.cancelBubble || v === t || v === null)
          break;
        i = v;
      }
      if (d) {
        for (let R of h)
          queueMicrotask(() => {
            throw R;
          });
        throw d;
      }
    } finally {
      e.__root = t, delete e.currentTarget, ue(a), Q(f);
    }
  }
}
function zr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function Ht(e, t) {
  var n = (
    /** @type {Effect} */
    $
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function we(e, t) {
  var n = (t & qi) !== 0, r = (t & Wi) !== 0, o, i = !e.startsWith("<!>");
  return () => {
    o === void 0 && (o = zr(i ? e : "<!>" + e), n || (o = /** @type {Node} */
    /* @__PURE__ */ qe(o)));
    var s = (
      /** @type {TemplateNode} */
      r ? document.importNode(o, !0) : o.cloneNode(!0)
    );
    if (n) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ qe(s)
      ), l = (
        /** @type {TemplateNode} */
        s.lastChild
      );
      Ht(u, l);
    } else
      Ht(s, s);
    return s;
  };
}
function ve(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const go = ["touchstart", "touchmove"];
function bo(e) {
  return go.includes(e);
}
function mn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n == null ? "" : n + "");
}
function mo(e, t) {
  return wo(e, t);
}
const ke = /* @__PURE__ */ new Map();
function wo(e, { target: t, anchor: n, props: r = {}, events: o, context: i, intro: s = !0 }) {
  Ki();
  var u = /* @__PURE__ */ new Set(), l = (f) => {
    for (var d = 0; d < f.length; d++) {
      var h = f[d];
      if (!u.has(h)) {
        u.add(h);
        var v = bo(h);
        t.addEventListener(h, Fe, { passive: v });
        var b = ke.get(h);
        b === void 0 ? (document.addEventListener(h, Fe, { passive: v }), ke.set(h, 1)) : ke.set(h, b + 1);
      }
    }
  };
  l(Gt(vo)), bn.add(l);
  var c = void 0, a = eo(() => {
    var f = n ?? t.appendChild(Gi());
    return Le(() => {
      if (i) {
        jr({});
        var d = (
          /** @type {ComponentContext} */
          L
        );
        d.c = i;
      }
      o && (r.$$events = o), c = e(f, r) || {}, i && Mr();
    }), () => {
      var v;
      for (var d of u) {
        t.removeEventListener(d, Fe);
        var h = (
          /** @type {number} */
          ke.get(d)
        );
        --h === 0 ? (document.removeEventListener(d, Fe), ke.delete(d)) : ke.set(d, h);
      }
      bn.delete(l), wn.delete(c), f !== n && ((v = f.parentNode) == null || v.removeChild(f));
    };
  });
  return wn.set(c, a), c;
}
let wn = /* @__PURE__ */ new WeakMap();
function Qe(e, t, n, r = null, o = !1) {
  var i = e, s = null, u = null, l = null, c = o ? Jt : 0;
  mt(() => {
    l !== (l = !!t()) && (l ? (s ? ct(s) : s = Le(() => n(i)), u && It(u, () => {
      u = null;
    })) : (u ? ct(u) : r && (u = Le(() => r(i))), s && It(s, () => {
      s = null;
    })));
  }, c);
}
function yo(e, t) {
  return t;
}
function ko(e, t, n, r) {
  for (var o = [], i = t.length, s = 0; s < i; s++)
    en(t[s].e, o, !0);
  var u = i > 0 && o.length === 0 && n !== null;
  if (u) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Yi(l), l.append(
      /** @type {Element} */
      n
    ), r.clear(), oe(e, t[0].prev, t[i - 1].next);
  }
  _r(o, () => {
    for (var c = 0; c < i; c++) {
      var a = t[c];
      u || (r.delete(a.k), oe(e, a.prev, a.next)), de(a.e, !u);
    }
  });
}
function $o(e, t, n, r, o, i = null) {
  var s = e, u = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, l = null, c = !1;
  mt(() => {
    var a = n(), f = Kt(a) ? a : a == null ? [] : Gt(a), d = f.length;
    if (!(c && d === 0)) {
      c = d === 0;
      {
        var h = (
          /** @type {Effect} */
          S
        );
        xo(f, u, s, o, t, (h.f & J) !== 0, r);
      }
      i !== null && (d === 0 ? l ? ct(l) : l = Le(() => i(s)) : l !== null && It(l, () => {
        l = null;
      })), n();
    }
  });
}
function xo(e, t, n, r, o, i, s) {
  var u = e.length, l = t.items, c = t.first, a = c, f, d = null, h = [], v = [], b, g, _, y;
  for (y = 0; y < u; y += 1) {
    if (b = e[y], g = s(b, y), _ = l.get(g), _ === void 0) {
      var R = a ? (
        /** @type {TemplateNode} */
        a.e.nodes_start
      ) : n;
      d = So(
        R,
        t,
        d,
        d === null ? t.first : d.next,
        b,
        g,
        y,
        r,
        o
      ), l.set(g, d), h = [], v = [], a = d.next;
      continue;
    }
    if (Co(_, b, y), _.e.f & J && ct(_.e), _ !== a) {
      if (f !== void 0 && f.has(_)) {
        if (h.length < v.length) {
          var j = v[0], M;
          d = j.prev;
          var O = h[0], re = h[h.length - 1];
          for (M = 0; M < h.length; M += 1)
            yn(h[M], j, n);
          for (M = 0; M < v.length; M += 1)
            f.delete(v[M]);
          oe(t, O.prev, re.next), oe(t, d, O), oe(t, re, j), a = j, d = re, y -= 1, h = [], v = [];
        } else
          f.delete(_), yn(_, a, n), oe(t, _.prev, _.next), oe(t, _, d === null ? t.first : d.next), oe(t, d, _), d = _;
        continue;
      }
      for (h = [], v = []; a !== null && a.k !== g; )
        (i || !(a.e.f & J)) && (f ?? (f = /* @__PURE__ */ new Set())).add(a), v.push(a), a = a.next;
      if (a === null)
        continue;
      _ = a;
    }
    h.push(_), d = _, a = _.next;
  }
  if (a !== null || f !== void 0) {
    for (var z = f === void 0 ? [] : Gt(f); a !== null; )
      (i || !(a.e.f & J)) && z.push(a), a = a.next;
    var G = z.length;
    if (G > 0) {
      var fe = null;
      ko(t, z, fe, l);
    }
  }
  $.first = t.first && t.first.e, $.last = d && d.e;
}
function Co(e, t, n, r) {
  tr(e.v, t), e.i = n;
}
function So(e, t, n, r, o, i, s, u, l) {
  var c = (l & Ii) !== 0, a = (l & Oi) === 0, f = c ? a ? /* @__PURE__ */ gt(o) : q(o) : o, d = l & Bi ? q(s) : s, h = {
    i: d,
    v: f,
    k: i,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    return h.e = Le(() => u(e, f, d), rr), h.e.prev = n && n.e, h.e.next = r && r.e, n === null ? t.first = h : (n.next = h, n.e.next = h.e), r !== null && (r.prev = h, r.e.prev = h.e), h;
  } finally {
  }
}
function yn(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, o = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, i = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); i !== r; ) {
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ bt(i)
    );
    o.before(i), i = s;
  }
}
function oe(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function kn(e, t, n, r, o) {
  var i = e, s = "", u;
  mt(() => {
    s !== (s = t() ?? "") && (u !== void 0 && (de(u), u = void 0), s !== "" && (u = Le(() => {
      var l = s + "", c = zr(l);
      Ht(
        /** @type {TemplateNode} */
        /* @__PURE__ */ qe(c),
        /** @type {TemplateNode} */
        c.lastChild
      ), i.before(c);
    })));
  });
}
function zt(e, t, n, r) {
  var o = e.__attributes ?? (e.__attributes = {});
  o[t] !== (o[t] = n) && (t === "style" && "__styles" in e && (e.__styles = {}), t === "loading" && (e[Ci] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Eo(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
var $n = /* @__PURE__ */ new Map();
function Eo(e) {
  var t = $n.get(e.nodeName);
  if (t) return t;
  $n.set(e.nodeName, t = []);
  for (var n, r = st(e), o = Element.prototype; o !== r; ) {
    n = Jn(r);
    for (var i in n)
      n[i].set && t.push(i);
    r = st(r);
  }
  return t;
}
function jo(e, t) {
  var n = e.__className, r = Mo(t);
  (n !== r || rr) && (t == null ? e.removeAttribute("class") : e.className = r, e.__className = r);
}
function Mo(e) {
  return e ?? "";
}
function xn(e, t, n) {
  if (n) {
    if (e.classList.contains(t)) return;
    e.classList.add(t);
  } else {
    if (!e.classList.contains(t)) return;
    e.classList.remove(t);
  }
}
function Cn(e, t) {
  return e === t || (e == null ? void 0 : e[ge]) === t;
}
function Ne(e = {}, t, n, r) {
  return Qt(() => {
    var o, i;
    return dr(() => {
      o = i, i = [], be(() => {
        e !== n(...i) && (t(e, ...i), o && Cn(n(...o), e) && t(null, ...o));
      });
    }), () => {
      mr(() => {
        i && Cn(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
function zo(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    L
  ), n = t.l.u;
  if (!n) return;
  let r = () => ho(t.s);
  if (e) {
    let o = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const s = /* @__PURE__ */ lt(() => {
      let u = !1;
      const l = t.s;
      for (const c in l)
        l[c] !== i[c] && (i[c] = l[c], u = !0);
      return u && o++, o;
    });
    r = () => w(s);
  }
  n.b.length && Qi(() => {
    Sn(t, r), Pt(n.b);
  }), At(() => {
    const o = be(() => n.m.map(wi));
    return () => {
      for (const i of o)
        typeof i == "function" && i();
    };
  }), n.a.length && At(() => {
    Sn(t, r), Pt(n.a);
  });
}
function Sn(e, t) {
  if (e.l.s)
    for (const n of e.l.s) w(n);
  t();
}
function Lo(e, t, n) {
  if (e == null)
    return t(void 0), Ee;
  const r = be(
    () => e.subscribe(
      t,
      // @ts-expect-error
      n
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
let et = !1;
function Ro(e, t, n) {
  const r = n[t] ?? (n[t] = {
    store: null,
    source: /* @__PURE__ */ gt(void 0),
    unsubscribe: Ee
  });
  if (r.store !== e)
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = Ee;
    else {
      var o = !0;
      r.unsubscribe = Lo(e, (i) => {
        o ? r.source.v = i : D(r.source, i);
      }), o = !1;
    }
  return w(r.source);
}
function Do() {
  const e = {};
  return ur(() => {
    for (var t in e)
      e[t].unsubscribe();
  }), e;
}
function To(e) {
  var t = et;
  try {
    return et = !1, [e(), et];
  } finally {
    et = t;
  }
}
function En(e) {
  for (var t = $, n = $; t !== null && !(t.f & (K | Ye)); )
    t = t.parent;
  try {
    return Q(t), e();
  } finally {
    Q(n);
  }
}
function ie(e, t, n, r) {
  var re;
  var o = (n & Hi) !== 0, i = !Te || (n & Ni) !== 0, s = (n & Fi) !== 0, u = (n & Ui) !== 0, l = !1, c;
  s ? [c, l] = To(() => (
    /** @type {V} */
    e[t]
  )) : c = /** @type {V} */
  e[t];
  var a = ge in e || xi in e, f = ((re = Se(e, t)) == null ? void 0 : re.set) ?? (a && s && t in e ? (z) => e[t] = z : void 0), d = (
    /** @type {V} */
    r
  ), h = !0, v = !1, b = () => (v = !0, h && (h = !1, u ? d = be(
    /** @type {() => V} */
    r
  ) : d = /** @type {V} */
  r), d);
  c === void 0 && r !== void 0 && (f && i && zi(), c = b(), f && f(c));
  var g;
  if (i)
    g = () => {
      var z = (
        /** @type {V} */
        e[t]
      );
      return z === void 0 ? b() : (h = !0, v = !1, z);
    };
  else {
    var _ = En(
      () => (o ? lt : Ji)(() => (
        /** @type {V} */
        e[t]
      ))
    );
    _.f |= ki, g = () => {
      var z = w(_);
      return z !== void 0 && (d = /** @type {V} */
      void 0), z === void 0 ? d : z;
    };
  }
  if (!(n & Vi))
    return g;
  if (f) {
    var y = e.$$legacy;
    return function(z, G) {
      return arguments.length > 0 ? ((!i || !G || y || l) && f(G ? g() : z), z) : g();
    };
  }
  var R = !1, j = !1, M = /* @__PURE__ */ gt(c), O = En(
    () => /* @__PURE__ */ lt(() => {
      var z = g(), G = w(M);
      return R ? (R = !1, j = !0, G) : (j = !1, M.v = z);
    })
  );
  return o || (O.equals = Xt), function(z, G) {
    if (arguments.length > 0) {
      const fe = G ? w(O) : i && s ? xe(z) : z;
      return O.equals(fe) || (R = !0, D(M, fe), v && d !== void 0 && (d = fe), be(() => w(O))), z;
    }
    return w(O);
  };
}
function Po(e) {
  L === null && ro(), Te && L.l !== null ? Ao(L).m.push(e) : At(() => {
    const t = be(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Ao(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
const Io = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Io);
Pi();
const $e = [];
function Bo(e, t = Ee) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function o(u) {
    if (er(e, u) && (e = u, n)) {
      const l = !$e.length;
      for (const c of r)
        c[1](), $e.push(c, e);
      if (l) {
        for (let c = 0; c < $e.length; c += 2)
          $e[c][0]($e[c + 1]);
        $e.length = 0;
      }
    }
  }
  function i(u) {
    o(u(
      /** @type {T} */
      e
    ));
  }
  function s(u, l = Ee) {
    const c = [u, l];
    return r.add(c), r.size === 1 && (n = t(o, i) || Ee), u(
      /** @type {T} */
      e
    ), () => {
      r.delete(c), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: o, update: i, subscribe: s };
}
function Oo(e, t) {
  const n = sessionStorage.getItem(e), r = Bo(n ? JSON.parse(n) : t);
  return r.subscribe((o) => {
    sessionStorage.setItem(e, JSON.stringify(o));
  }), r;
}
const Ve = Oo("messages", []);
function Lr(e) {
  return e && e.__esModule ? e.default : e;
}
function U(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var kt, m, Rr, Ue, Dr, jn, dt = {}, Tr = [], Ho = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function se(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Pr(e) {
  var t = e.parentNode;
  t && t.removeChild(e);
}
function Nt(e, t, n) {
  var r, o, i, s = {};
  for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : s[i] = t[i];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? kt.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) s[i] === void 0 && (s[i] = e.defaultProps[i]);
  return it(e, s, r, o, null);
}
function it(e, t, n, r, o) {
  var i = {
    type: e,
    props: t,
    key: n,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: o ?? ++Rr
  };
  return o == null && m.vnode != null && m.vnode(i), i;
}
function te() {
  return {
    current: null
  };
}
function Re(e) {
  return e.children;
}
function Z(e, t) {
  this.props = e, this.context = t;
}
function De(e, t) {
  if (t == null) return e.__ ? De(e.__, e.__.__k.indexOf(e) + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? De(e) : null;
}
function Ar(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return Ar(e);
  }
}
function Mn(e) {
  (!e.__d && (e.__d = !0) && Ue.push(e) && !ft.__r++ || jn !== m.debounceRendering) && ((jn = m.debounceRendering) || Dr)(ft);
}
function ft() {
  for (var e; ft.__r = Ue.length; ) e = Ue.sort(function(t, n) {
    return t.__v.__b - n.__v.__b;
  }), Ue = [], e.some(function(t) {
    var n, r, o, i, s, u;
    t.__d && (s = (i = (n = t).__v).__e, (u = n.__P) && (r = [], (o = se({}, i)).__v = i.__v + 1, rn(u, i, o, n.__n, u.ownerSVGElement !== void 0, i.__h != null ? [
      s
    ] : null, r, s ?? De(i), i.__h), Hr(r, i), i.__e != s && Ar(i)));
  });
}
function Ir(e, t, n, r, o, i, s, u, l, c) {
  var a, f, d, h, v, b, g, _ = r && r.__k || Tr, y = _.length;
  for (n.__k = [], a = 0; a < t.length; a++) if ((h = n.__k[a] = (h = t[a]) == null || typeof h == "boolean" ? null : typeof h == "string" || typeof h == "number" || typeof h == "bigint" ? it(null, h, null, null, h) : Array.isArray(h) ? it(Re, {
    children: h
  }, null, null, null) : h.__b > 0 ? it(h.type, h.props, h.key, null, h.__v) : h) != null) {
    if (h.__ = n, h.__b = n.__b + 1, (d = _[a]) === null || d && h.key == d.key && h.type === d.type) _[a] = void 0;
    else for (f = 0; f < y; f++) {
      if ((d = _[f]) && h.key == d.key && h.type === d.type) {
        _[f] = void 0;
        break;
      }
      d = null;
    }
    rn(e, h, d = d || dt, o, i, s, u, l, c), v = h.__e, (f = h.ref) && d.ref != f && (g || (g = []), d.ref && g.push(d.ref, null, h), g.push(f, h.__c || v, h)), v != null ? (b == null && (b = v), typeof h.type == "function" && h.__k === d.__k ? h.__d = l = Br(h, l, e) : l = Or(e, h, d, _, v, l), typeof n.type == "function" && (n.__d = l)) : l && d.__e == l && l.parentNode != e && (l = De(d));
  }
  for (n.__e = b, a = y; a--; ) _[a] != null && (typeof n.type == "function" && _[a].__e != null && _[a].__e == n.__d && (n.__d = De(r, a + 1)), Vr(_[a], _[a]));
  if (g) for (a = 0; a < g.length; a++) Nr(g[a], g[++a], g[++a]);
}
function Br(e, t, n) {
  for (var r, o = e.__k, i = 0; o && i < o.length; i++) (r = o[i]) && (r.__ = e, t = typeof r.type == "function" ? Br(r, t, n) : Or(n, r, r, o, r.__e, t));
  return t;
}
function ht(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Array.isArray(e) ? e.some(function(n) {
    ht(n, t);
  }) : t.push(e)), t;
}
function Or(e, t, n, r, o, i) {
  var s, u, l;
  if (t.__d !== void 0) s = t.__d, t.__d = void 0;
  else if (n == null || o != i || o.parentNode == null) e: if (i == null || i.parentNode !== e) e.appendChild(o), s = null;
  else {
    for (u = i, l = 0; (u = u.nextSibling) && l < r.length; l += 2) if (u == o) break e;
    e.insertBefore(o, i), s = i;
  }
  return s !== void 0 ? s : o.nextSibling;
}
function No(e, t, n, r, o) {
  var i;
  for (i in n) i === "children" || i === "key" || i in t || pt(e, i, null, n[i], r);
  for (i in t) o && typeof t[i] != "function" || i === "children" || i === "key" || i === "value" || i === "checked" || n[i] === t[i] || pt(e, i, t[i], n[i], r);
}
function zn(e, t, n) {
  t[0] === "-" ? e.setProperty(t, n) : e[t] = n == null ? "" : typeof n != "number" || Ho.test(t) ? n : n + "px";
}
function pt(e, t, n, r, o) {
  var i;
  e: if (t === "style")
    if (typeof n == "string") e.style.cssText = n;
    else {
      if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || zn(e.style, t, "");
      if (n) for (t in n) r && n[t] === r[t] || zn(e.style, t, n[t]);
    }
  else if (t[0] === "o" && t[1] === "n") i = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? r || e.addEventListener(t, i ? Rn : Ln, i) : e.removeEventListener(t, i ? Rn : Ln, i);
  else if (t !== "dangerouslySetInnerHTML") {
    if (o) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
    else if (t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n != null && (n !== !1 || t[0] === "a" && t[1] === "r") ? e.setAttribute(t, n) : e.removeAttribute(t));
  }
}
function Ln(e) {
  this.l[e.type + !1](m.event ? m.event(e) : e);
}
function Rn(e) {
  this.l[e.type + !0](m.event ? m.event(e) : e);
}
function rn(e, t, n, r, o, i, s, u, l) {
  var c, a, f, d, h, v, b, g, _, y, R, j = t.type;
  if (t.constructor !== void 0) return null;
  n.__h != null && (l = n.__h, u = t.__e = n.__e, t.__h = null, i = [
    u
  ]), (c = m.__b) && c(t);
  try {
    e: if (typeof j == "function") {
      if (g = t.props, _ = (c = j.contextType) && r[c.__c], y = c ? _ ? _.props.value : c.__ : r, n.__c ? b = (a = t.__c = n.__c).__ = a.__E : ("prototype" in j && j.prototype.render ? t.__c = a = new j(g, y) : (t.__c = a = new Z(g, y), a.constructor = j, a.render = Fo), _ && _.sub(a), a.props = g, a.state || (a.state = {}), a.context = y, a.__n = r, f = a.__d = !0, a.__h = []), a.__s == null && (a.__s = a.state), j.getDerivedStateFromProps != null && (a.__s == a.state && (a.__s = se({}, a.__s)), se(a.__s, j.getDerivedStateFromProps(g, a.__s))), d = a.props, h = a.state, f) j.getDerivedStateFromProps == null && a.componentWillMount != null && a.componentWillMount(), a.componentDidMount != null && a.__h.push(a.componentDidMount);
      else {
        if (j.getDerivedStateFromProps == null && g !== d && a.componentWillReceiveProps != null && a.componentWillReceiveProps(g, y), !a.__e && a.shouldComponentUpdate != null && a.shouldComponentUpdate(g, a.__s, y) === !1 || t.__v === n.__v) {
          a.props = g, a.state = a.__s, t.__v !== n.__v && (a.__d = !1), a.__v = t, t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(M) {
            M && (M.__ = t);
          }), a.__h.length && s.push(a);
          break e;
        }
        a.componentWillUpdate != null && a.componentWillUpdate(g, a.__s, y), a.componentDidUpdate != null && a.__h.push(function() {
          a.componentDidUpdate(d, h, v);
        });
      }
      a.context = y, a.props = g, a.state = a.__s, (c = m.__r) && c(t), a.__d = !1, a.__v = t, a.__P = e, c = a.render(a.props, a.state, a.context), a.state = a.__s, a.getChildContext != null && (r = se(se({}, r), a.getChildContext())), f || a.getSnapshotBeforeUpdate == null || (v = a.getSnapshotBeforeUpdate(d, h)), R = c != null && c.type === Re && c.key == null ? c.props.children : c, Ir(e, Array.isArray(R) ? R : [
        R
      ], t, n, r, o, i, s, u, l), a.base = t.__e, t.__h = null, a.__h.length && s.push(a), b && (a.__E = a.__ = null), a.__e = !1;
    } else i == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = Vo(n.__e, t, n, r, o, i, s, l);
    (c = m.diffed) && c(t);
  } catch (M) {
    t.__v = null, (l || i != null) && (t.__e = u, t.__h = !!l, i[i.indexOf(u)] = null), m.__e(M, t, n);
  }
}
function Hr(e, t) {
  m.__c && m.__c(t, e), e.some(function(n) {
    try {
      e = n.__h, n.__h = [], e.some(function(r) {
        r.call(n);
      });
    } catch (r) {
      m.__e(r, n.__v);
    }
  });
}
function Vo(e, t, n, r, o, i, s, u) {
  var l, c, a, f = n.props, d = t.props, h = t.type, v = 0;
  if (h === "svg" && (o = !0), i != null) {
    for (; v < i.length; v++) if ((l = i[v]) && "setAttribute" in l == !!h && (h ? l.localName === h : l.nodeType === 3)) {
      e = l, i[v] = null;
      break;
    }
  }
  if (e == null) {
    if (h === null) return document.createTextNode(d);
    e = o ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h, d.is && d), i = null, u = !1;
  }
  if (h === null) f === d || u && e.data === d || (e.data = d);
  else {
    if (i = i && kt.call(e.childNodes), c = (f = n.props || dt).dangerouslySetInnerHTML, a = d.dangerouslySetInnerHTML, !u) {
      if (i != null) for (f = {}, v = 0; v < e.attributes.length; v++) f[e.attributes[v].name] = e.attributes[v].value;
      (a || c) && (a && (c && a.__html == c.__html || a.__html === e.innerHTML) || (e.innerHTML = a && a.__html || ""));
    }
    if (No(e, d, f, o, u), a) t.__k = [];
    else if (v = t.props.children, Ir(e, Array.isArray(v) ? v : [
      v
    ], t, n, r, o && h !== "foreignObject", i, s, i ? i[0] : n.__k && De(n, 0), u), i != null) for (v = i.length; v--; ) i[v] != null && Pr(i[v]);
    u || ("value" in d && (v = d.value) !== void 0 && (v !== f.value || v !== e.value || h === "progress" && !v) && pt(e, "value", v, f.value, !1), "checked" in d && (v = d.checked) !== void 0 && v !== e.checked && pt(e, "checked", v, f.checked, !1));
  }
  return e;
}
function Nr(e, t, n) {
  try {
    typeof e == "function" ? e(t) : e.current = t;
  } catch (r) {
    m.__e(r, n);
  }
}
function Vr(e, t, n) {
  var r, o;
  if (m.unmount && m.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || Nr(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (i) {
      m.__e(i, t);
    }
    r.base = r.__P = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && Vr(r[o], t, typeof e.type != "function");
  n || e.__e == null || Pr(e.__e), e.__e = e.__d = void 0;
}
function Fo(e, t, n) {
  return this.constructor(e, n);
}
function Fr(e, t, n) {
  var r, o, i;
  m.__ && m.__(e, t), o = (r = typeof n == "function") ? null : n && n.__k || t.__k, i = [], rn(t, e = (!r && n || t).__k = Nt(Re, null, [
    e
  ]), o || dt, dt, t.ownerSVGElement !== void 0, !r && n ? [
    n
  ] : o ? null : t.firstChild ? kt.call(t.childNodes) : null, i, !r && n ? n : o ? o.__e : t.firstChild, r), Hr(i, e);
}
kt = Tr.slice, m = {
  __e: function(e, t) {
    for (var n, r, o; t = t.__; ) if ((n = t.__c) && !n.__) try {
      if ((r = n.constructor) && r.getDerivedStateFromError != null && (n.setState(r.getDerivedStateFromError(e)), o = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), o = n.__d), o) return n.__E = n;
    } catch (i) {
      e = i;
    }
    throw e;
  }
}, Rr = 0, Z.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = se({}, this.state), typeof e == "function" && (e = e(se({}, n), this.props)), e && se(n, e), e != null && this.__v && (t && this.__h.push(t), Mn(this));
}, Z.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Mn(this));
}, Z.prototype.render = Re, Ue = [], Dr = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ft.__r = 0;
var Uo = 0;
function p(e, t, n, r, o) {
  var i, s, u = {};
  for (s in t) s == "ref" ? i = t[s] : u[s] = t[s];
  var l = {
    type: e,
    props: u,
    key: n,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: --Uo,
    __source: r,
    __self: o
  };
  if (typeof e == "function" && (i = e.defaultProps)) for (s in i) u[s] === void 0 && (u[s] = i[s]);
  return m.vnode && m.vnode(l), l;
}
function qo(e, t) {
  try {
    window.localStorage[`emoji-mart.${e}`] = JSON.stringify(t);
  } catch {
  }
}
function Wo(e) {
  try {
    const t = window.localStorage[`emoji-mart.${e}`];
    if (t) return JSON.parse(t);
  } catch {
  }
}
var le = {
  set: qo,
  get: Wo
};
const Lt = /* @__PURE__ */ new Map(), Ko = [
  {
    v: 15,
    emoji: "🫨"
  },
  {
    v: 14,
    emoji: "🫠"
  },
  {
    v: 13.1,
    emoji: "😶‍🌫️"
  },
  {
    v: 13,
    emoji: "🥸"
  },
  {
    v: 12.1,
    emoji: "🧑‍🦰"
  },
  {
    v: 12,
    emoji: "🥱"
  },
  {
    v: 11,
    emoji: "🥰"
  },
  {
    v: 5,
    emoji: "🤩"
  },
  {
    v: 4,
    emoji: "👱‍♀️"
  },
  {
    v: 3,
    emoji: "🤣"
  },
  {
    v: 2,
    emoji: "👋🏻"
  },
  {
    v: 1,
    emoji: "🙃"
  }
];
function Go() {
  for (const { v: e, emoji: t } of Ko)
    if (Ur(t)) return e;
}
function Yo() {
  return !Ur("🇨🇦");
}
function Ur(e) {
  if (Lt.has(e)) return Lt.get(e);
  const t = Jo(e);
  return Lt.set(e, t), t;
}
const Jo = (() => {
  let e = null;
  try {
    navigator.userAgent.includes("jsdom") || (e = document.createElement("canvas").getContext("2d", {
      willReadFrequently: !0
    }));
  } catch {
  }
  if (!e) return () => !1;
  const t = 25, n = 20, r = Math.floor(t / 2);
  return e.font = r + "px Arial, Sans-Serif", e.textBaseline = "top", e.canvas.width = n * 2, e.canvas.height = t, (o) => {
    e.clearRect(0, 0, n * 2, t), e.fillStyle = "#FF0000", e.fillText(o, 0, 22), e.fillStyle = "#0000FF", e.fillText(o, n, 22);
    const i = e.getImageData(0, 0, n, t).data, s = i.length;
    let u = 0;
    for (; u < s && !i[u + 3]; u += 4) ;
    if (u >= s) return !1;
    const l = n + u / 4 % n, c = Math.floor(u / 4 / n), a = e.getImageData(l, c, 1, 1).data;
    return !(i[u] !== a[0] || i[u + 2] !== a[2] || e.measureText(o).width >= n);
  };
})();
var Dn = {
  latestVersion: Go,
  noCountryFlags: Yo
};
const Vt = [
  "+1",
  "grinning",
  "kissing_heart",
  "heart_eyes",
  "laughing",
  "stuck_out_tongue_winking_eye",
  "sweat_smile",
  "joy",
  "scream",
  "disappointed",
  "unamused",
  "weary",
  "sob",
  "sunglasses",
  "heart"
];
let T = null;
function Xo(e) {
  T || (T = le.get("frequently") || {});
  const t = e.id || e;
  t && (T[t] || (T[t] = 0), T[t] += 1, le.set("last", t), le.set("frequently", T));
}
function Zo({ maxFrequentRows: e, perLine: t }) {
  if (!e) return [];
  T || (T = le.get("frequently"));
  let n = [];
  if (!T) {
    T = {};
    for (let i in Vt.slice(0, t)) {
      const s = Vt[i];
      T[s] = t - i, n.push(s);
    }
    return n;
  }
  const r = e * t, o = le.get("last");
  for (let i in T) n.push(i);
  if (n.sort((i, s) => {
    const u = T[s], l = T[i];
    return u == l ? i.localeCompare(s) : u - l;
  }), n.length > r) {
    const i = n.slice(r);
    n = n.slice(0, r);
    for (let s of i)
      s != o && delete T[s];
    o && n.indexOf(o) == -1 && (delete T[n[n.length - 1]], n.splice(-1, 1, o)), le.set("frequently", T);
  }
  return n;
}
var qr = {
  add: Xo,
  get: Zo,
  DEFAULTS: Vt
}, Wr = {};
Wr = JSON.parse('{"search":"Search","search_no_results_1":"Oh no!","search_no_results_2":"That emoji couldn’t be found","pick":"Pick an emoji…","add_custom":"Add custom emoji","categories":{"activity":"Activity","custom":"Custom","flags":"Flags","foods":"Food & Drink","frequent":"Frequently used","nature":"Animals & Nature","objects":"Objects","people":"Smileys & People","places":"Travel & Places","search":"Search Results","symbols":"Symbols"},"skins":{"1":"Default","2":"Light","3":"Medium-Light","4":"Medium","5":"Medium-Dark","6":"Dark","choose":"Choose default skin tone"}}');
var ne = {
  autoFocus: {
    value: !1
  },
  dynamicWidth: {
    value: !1
  },
  emojiButtonColors: {
    value: null
  },
  emojiButtonRadius: {
    value: "100%"
  },
  emojiButtonSize: {
    value: 36
  },
  emojiSize: {
    value: 24
  },
  emojiVersion: {
    value: 15,
    choices: [
      1,
      2,
      3,
      4,
      5,
      11,
      12,
      12.1,
      13,
      13.1,
      14,
      15
    ]
  },
  exceptEmojis: {
    value: []
  },
  icons: {
    value: "auto",
    choices: [
      "auto",
      "outline",
      "solid"
    ]
  },
  locale: {
    value: "en",
    choices: [
      "en",
      "ar",
      "be",
      "cs",
      "de",
      "es",
      "fa",
      "fi",
      "fr",
      "hi",
      "it",
      "ja",
      "ko",
      "nl",
      "pl",
      "pt",
      "ru",
      "sa",
      "tr",
      "uk",
      "vi",
      "zh"
    ]
  },
  maxFrequentRows: {
    value: 4
  },
  navPosition: {
    value: "top",
    choices: [
      "top",
      "bottom",
      "none"
    ]
  },
  noCountryFlags: {
    value: !1
  },
  noResultsEmoji: {
    value: null
  },
  perLine: {
    value: 9
  },
  previewEmoji: {
    value: null
  },
  previewPosition: {
    value: "bottom",
    choices: [
      "top",
      "bottom",
      "none"
    ]
  },
  searchPosition: {
    value: "sticky",
    choices: [
      "sticky",
      "static",
      "none"
    ]
  },
  set: {
    value: "native",
    choices: [
      "native",
      "apple",
      "facebook",
      "google",
      "twitter"
    ]
  },
  skin: {
    value: 1,
    choices: [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  skinTonePosition: {
    value: "preview",
    choices: [
      "preview",
      "search",
      "none"
    ]
  },
  theme: {
    value: "auto",
    choices: [
      "auto",
      "light",
      "dark"
    ]
  },
  // Data
  categories: null,
  categoryIcons: null,
  custom: null,
  data: null,
  i18n: null,
  // Callbacks
  getImageURL: null,
  getSpritesheetURL: null,
  onAddCustomEmoji: null,
  onClickOutside: null,
  onEmojiSelect: null,
  // Deprecated
  stickySearch: {
    deprecated: !0,
    value: !0
  }
};
let P = null, k = null;
const Rt = {};
async function Tn(e) {
  if (Rt[e]) return Rt[e];
  const n = await (await fetch(e)).json();
  return Rt[e] = n, n;
}
let Dt = null, Kr = null, Gr = !1;
function $t(e, { caller: t } = {}) {
  return Dt || (Dt = new Promise((n) => {
    Kr = n;
  })), e ? Qo(e) : t && !Gr && console.warn(`\`${t}\` requires data to be initialized first. Promise will be pending until \`init\` is called.`), Dt;
}
async function Qo(e) {
  Gr = !0;
  let { emojiVersion: t, set: n, locale: r } = e;
  if (t || (t = ne.emojiVersion.value), n || (n = ne.set.value), r || (r = ne.locale.value), k)
    k.categories = k.categories.filter((l) => !l.name);
  else {
    k = (typeof e.data == "function" ? await e.data() : e.data) || await Tn(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${t}/${n}.json`), k.emoticons = {}, k.natives = {}, k.categories.unshift({
      id: "frequent",
      emojis: []
    });
    for (const l in k.aliases) {
      const c = k.aliases[l], a = k.emojis[c];
      a && (a.aliases || (a.aliases = []), a.aliases.push(l));
    }
    k.originalCategories = k.categories;
  }
  if (P = (typeof e.i18n == "function" ? await e.i18n() : e.i18n) || (r == "en" ? /* @__PURE__ */ Lr(Wr) : await Tn(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/${r}.json`)), e.custom) for (let l in e.custom) {
    l = parseInt(l);
    const c = e.custom[l], a = e.custom[l - 1];
    if (!(!c.emojis || !c.emojis.length)) {
      c.id || (c.id = `custom_${l + 1}`), c.name || (c.name = P.categories.custom), a && !c.icon && (c.target = a.target || a), k.categories.push(c);
      for (const f of c.emojis) k.emojis[f.id] = f;
    }
  }
  e.categories && (k.categories = k.originalCategories.filter((l) => e.categories.indexOf(l.id) != -1).sort((l, c) => {
    const a = e.categories.indexOf(l.id), f = e.categories.indexOf(c.id);
    return a - f;
  }));
  let o = null, i = null;
  n == "native" && (o = Dn.latestVersion(), i = e.noCountryFlags || Dn.noCountryFlags());
  let s = k.categories.length, u = !1;
  for (; s--; ) {
    const l = k.categories[s];
    if (l.id == "frequent") {
      let { maxFrequentRows: f, perLine: d } = e;
      f = f >= 0 ? f : ne.maxFrequentRows.value, d || (d = ne.perLine.value), l.emojis = qr.get({
        maxFrequentRows: f,
        perLine: d
      });
    }
    if (!l.emojis || !l.emojis.length) {
      k.categories.splice(s, 1);
      continue;
    }
    const { categoryIcons: c } = e;
    if (c) {
      const f = c[l.id];
      f && !l.icon && (l.icon = f);
    }
    let a = l.emojis.length;
    for (; a--; ) {
      const f = l.emojis[a], d = f.id ? f : k.emojis[f], h = () => {
        l.emojis.splice(a, 1);
      };
      if (!d || e.exceptEmojis && e.exceptEmojis.includes(d.id)) {
        h();
        continue;
      }
      if (o && d.version > o) {
        h();
        continue;
      }
      if (i && l.id == "flags" && !is.includes(d.id)) {
        h();
        continue;
      }
      if (!d.search) {
        if (u = !0, d.search = "," + [
          [
            d.id,
            !1
          ],
          [
            d.name,
            !0
          ],
          [
            d.keywords,
            !1
          ],
          [
            d.emoticons,
            !1
          ]
        ].map(([b, g]) => {
          if (b)
            return (Array.isArray(b) ? b : [
              b
            ]).map((_) => (g ? _.split(/[-|_|\s]+/) : [
              _
            ]).map((y) => y.toLowerCase())).flat();
        }).flat().filter((b) => b && b.trim()).join(","), d.emoticons) for (const b of d.emoticons)
          k.emoticons[b] || (k.emoticons[b] = d.id);
        let v = 0;
        for (const b of d.skins) {
          if (!b) continue;
          v++;
          const { native: g } = b;
          g && (k.natives[g] = d.id, d.search += `,${g}`);
          const _ = v == 1 ? "" : `:skin-tone-${v}:`;
          b.shortcodes = `:${d.id}:${_}`;
        }
      }
    }
  }
  u && ze.reset(), Kr();
}
function Yr(e, t, n) {
  e || (e = {});
  const r = {};
  for (let o in t) r[o] = Jr(o, e, t, n);
  return r;
}
function Jr(e, t, n, r) {
  const o = n[e];
  let i = r && r.getAttribute(e) || (t[e] != null && t[e] != null ? t[e] : null);
  return o && (i != null && o.value && typeof o.value != typeof i && (typeof o.value == "boolean" ? i = i != "false" : i = o.value.constructor(i)), o.transform && i && (i = o.transform(i)), (i == null || o.choices && o.choices.indexOf(i) == -1) && (i = o.value)), i;
}
const es = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
let Ft = null;
function ts(e) {
  return e.id ? e : k.emojis[e] || k.emojis[k.aliases[e]] || k.emojis[k.natives[e]];
}
function ns() {
  Ft = null;
}
async function rs(e, { maxResults: t, caller: n } = {}) {
  if (!e || !e.trim().length) return null;
  t || (t = 90), await $t(null, {
    caller: n || "SearchIndex.search"
  });
  const r = e.toLowerCase().replace(/(\w)-/, "$1 ").split(/[\s|,]+/).filter((u, l, c) => u.trim() && c.indexOf(u) == l);
  if (!r.length) return;
  let o = Ft || (Ft = Object.values(k.emojis)), i, s;
  for (const u of r) {
    if (!o.length) break;
    i = [], s = {};
    for (const l of o) {
      if (!l.search) continue;
      const c = l.search.indexOf(`,${u}`);
      c != -1 && (i.push(l), s[l.id] || (s[l.id] = 0), s[l.id] += l.id == u ? 0 : c + 1);
    }
    o = i;
  }
  return i.length < 2 || (i.sort((u, l) => {
    const c = s[u.id], a = s[l.id];
    return c == a ? u.id.localeCompare(l.id) : c - a;
  }), i.length > t && (i = i.slice(0, t))), i;
}
var ze = {
  search: rs,
  get: ts,
  reset: ns,
  SHORTCODES_REGEX: es
};
const is = [
  "checkered_flag",
  "crossed_flags",
  "pirate_flag",
  "rainbow-flag",
  "transgender_flag",
  "triangular_flag_on_post",
  "waving_black_flag",
  "waving_white_flag"
];
function os(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === t.length && e.every((n, r) => n == t[r]);
}
async function ss(e = 1) {
  for (let t in [
    ...Array(e).keys()
  ]) await new Promise(requestAnimationFrame);
}
function as(e, { skinIndex: t = 0 } = {}) {
  const n = e.skins[t] || (t = 0, e.skins[t]), r = {
    id: e.id,
    name: e.name,
    native: n.native,
    unified: n.unified,
    keywords: e.keywords,
    shortcodes: n.shortcodes || e.shortcodes
  };
  return e.skins.length > 1 && (r.skin = t + 1), n.src && (r.src = n.src), e.aliases && e.aliases.length && (r.aliases = e.aliases), e.emoticons && e.emoticons.length && (r.emoticons = e.emoticons), r;
}
const ls = {
  activity: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ p("path", {
        d: "M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"
      })
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M16.17 337.5c0 44.98 7.565 83.54 13.98 107.9C35.22 464.3 50.46 496 174.9 496c9.566 0 19.59-.4707 29.84-1.271L17.33 307.3C16.53 317.6 16.17 327.7 16.17 337.5zM495.8 174.5c0-44.98-7.565-83.53-13.98-107.9c-4.688-17.54-18.34-31.23-36.04-35.95C435.5 27.91 392.9 16 337 16c-9.564 0-19.59 .4707-29.84 1.271l187.5 187.5C495.5 194.4 495.8 184.3 495.8 174.5zM26.77 248.8l236.3 236.3c142-36.1 203.9-150.4 222.2-221.1L248.9 26.87C106.9 62.96 45.07 177.2 26.77 248.8zM256 335.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L164.7 283.3C161.6 280.2 160 276.1 160 271.1c0-8.529 6.865-16 16-16c4.095 0 8.189 1.562 11.31 4.688l64.01 64C254.4 327.8 256 331.9 256 335.1zM304 287.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L212.7 235.3C209.6 232.2 208 228.1 208 223.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01C302.5 279.8 304 283.9 304 287.1zM256 175.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01c3.125 3.125 4.688 7.219 4.688 11.31c0 9.133-7.468 16-16 16c-4.094 0-8.189-1.562-11.31-4.688l-64.01-64.01C257.6 184.2 256 180.1 256 175.1z"
      })
    })
  },
  custom: /* @__PURE__ */ p("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    children: /* @__PURE__ */ p("path", {
      d: "M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
    })
  }),
  flags: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ p("path", {
        d: "M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"
      })
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"
      })
    })
  },
  foods: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ p("path", {
        d: "M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"
      })
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8zM372.7 116.7C369.7 119.7 368 123.8 368 128C368 131.2 368.9 134.3 370.7 136.9C372.5 139.5 374.1 141.6 377.9 142.8C380.8 143.1 384 144.3 387.1 143.7C390.2 143.1 393.1 141.6 395.3 139.3C397.6 137.1 399.1 134.2 399.7 131.1C400.3 128 399.1 124.8 398.8 121.9C397.6 118.1 395.5 116.5 392.9 114.7C390.3 112.9 387.2 111.1 384 111.1C379.8 111.1 375.7 113.7 372.7 116.7V116.7zM244.7 84.69C241.7 87.69 240 91.76 240 96C240 99.16 240.9 102.3 242.7 104.9C244.5 107.5 246.1 109.6 249.9 110.8C252.8 111.1 256 112.3 259.1 111.7C262.2 111.1 265.1 109.6 267.3 107.3C269.6 105.1 271.1 102.2 271.7 99.12C272.3 96.02 271.1 92.8 270.8 89.88C269.6 86.95 267.5 84.45 264.9 82.7C262.3 80.94 259.2 79.1 256 79.1C251.8 79.1 247.7 81.69 244.7 84.69V84.69zM116.7 116.7C113.7 119.7 112 123.8 112 128C112 131.2 112.9 134.3 114.7 136.9C116.5 139.5 118.1 141.6 121.9 142.8C124.8 143.1 128 144.3 131.1 143.7C134.2 143.1 137.1 141.6 139.3 139.3C141.6 137.1 143.1 134.2 143.7 131.1C144.3 128 143.1 124.8 142.8 121.9C141.6 118.1 139.5 116.5 136.9 114.7C134.3 112.9 131.2 111.1 128 111.1C123.8 111.1 119.7 113.7 116.7 116.7L116.7 116.7z"
      })
    })
  },
  frequent: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ p("path", {
          d: "M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z"
        }),
        /* @__PURE__ */ p("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        })
      ]
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
      })
    })
  },
  nature: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ p("path", {
          d: "M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"
        }),
        /* @__PURE__ */ p("path", {
          d: "M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"
        })
      ]
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 576 512",
      children: /* @__PURE__ */ p("path", {
        d: "M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"
      })
    })
  },
  objects: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ p("path", {
          d: "M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"
        }),
        /* @__PURE__ */ p("path", {
          d: "M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"
        })
      ]
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512",
      children: /* @__PURE__ */ p("path", {
        d: "M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"
      })
    })
  },
  people: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ p("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        }),
        /* @__PURE__ */ p("path", {
          d: "M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"
        })
      ]
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 432C332.1 432 396.2 382 415.2 314.1C419.1 300.4 407.8 288 393.6 288H118.4C104.2 288 92.92 300.4 96.76 314.1C115.8 382 179.9 432 256 432V432zM176.4 160C158.7 160 144.4 174.3 144.4 192C144.4 209.7 158.7 224 176.4 224C194 224 208.4 209.7 208.4 192C208.4 174.3 194 160 176.4 160zM336.4 224C354 224 368.4 209.7 368.4 192C368.4 174.3 354 160 336.4 160C318.7 160 304.4 174.3 304.4 192C304.4 209.7 318.7 224 336.4 224z"
      })
    })
  },
  places: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ p("path", {
          d: "M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"
        }),
        /* @__PURE__ */ p("path", {
          d: "M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"
        })
      ]
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z"
      })
    })
  },
  symbols: {
    outline: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ p("path", {
        d: "M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"
      })
    }),
    solid: /* @__PURE__ */ p("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ p("path", {
        d: "M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"
      })
    })
  }
}, cs = {
  loupe: /* @__PURE__ */ p("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ p("path", {
      d: "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
    })
  }),
  delete: /* @__PURE__ */ p("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ p("path", {
      d: "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
    })
  })
};
var vt = {
  categories: ls,
  search: cs
};
function Ut(e) {
  let { id: t, skin: n, emoji: r } = e;
  if (e.shortcodes) {
    const u = e.shortcodes.match(ze.SHORTCODES_REGEX);
    u && (t = u[1], u[2] && (n = u[2]));
  }
  if (r || (r = ze.get(t || e.native)), !r) return e.fallback;
  const o = r.skins[n - 1] || r.skins[0], i = o.src || (e.set != "native" && !e.spritesheet ? typeof e.getImageURL == "function" ? e.getImageURL(e.set, o.unified) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@15.0.1/img/${e.set}/64/${o.unified}.png` : void 0), s = typeof e.getSpritesheetURL == "function" ? e.getSpritesheetURL(e.set) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@15.0.1/img/${e.set}/sheets-256/64.png`;
  return /* @__PURE__ */ p("span", {
    class: "emoji-mart-emoji",
    "data-emoji-set": e.set,
    children: i ? /* @__PURE__ */ p("img", {
      style: {
        maxWidth: e.size || "1em",
        maxHeight: e.size || "1em",
        display: "inline-block"
      },
      alt: o.native || o.shortcodes,
      src: i
    }) : e.set == "native" ? /* @__PURE__ */ p("span", {
      style: {
        fontSize: e.size,
        fontFamily: '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      },
      children: o.native
    }) : /* @__PURE__ */ p("span", {
      style: {
        display: "block",
        width: e.size,
        height: e.size,
        backgroundImage: `url(${s})`,
        backgroundSize: `${100 * k.sheet.cols}% ${100 * k.sheet.rows}%`,
        backgroundPosition: `${100 / (k.sheet.cols - 1) * o.x}% ${100 / (k.sheet.rows - 1) * o.y}%`
      }
    })
  });
}
const us = typeof window < "u" && window.HTMLElement ? window.HTMLElement : Object;
class Xr extends us {
  static get observedAttributes() {
    return Object.keys(this.Props);
  }
  update(t = {}) {
    for (let n in t) this.attributeChangedCallback(n, null, t[n]);
  }
  attributeChangedCallback(t, n, r) {
    if (!this.component) return;
    const o = Jr(t, {
      [t]: r
    }, this.constructor.Props, this);
    this.component.componentWillReceiveProps ? this.component.componentWillReceiveProps({
      [t]: o
    }) : (this.component.props[t] = o, this.component.forceUpdate());
  }
  disconnectedCallback() {
    this.disconnected = !0, this.component && this.component.unregister && this.component.unregister();
  }
  constructor(t = {}) {
    if (super(), this.props = t, t.parent || t.ref) {
      let n = null;
      const r = t.parent || (n = t.ref && t.ref.current);
      n && (n.innerHTML = ""), r && r.appendChild(this);
    }
  }
}
class ds extends Xr {
  setShadow() {
    this.attachShadow({
      mode: "open"
    });
  }
  injectStyles(t) {
    if (!t) return;
    const n = document.createElement("style");
    n.textContent = t, this.shadowRoot.insertBefore(n, this.shadowRoot.firstChild);
  }
  constructor(t, { styles: n } = {}) {
    super(t), this.setShadow(), this.injectStyles(n);
  }
}
var Zr = {
  fallback: "",
  id: "",
  native: "",
  shortcodes: "",
  size: {
    value: "",
    transform: (e) => /\D/.test(e) ? e : `${e}px`
  },
  // Shared
  set: ne.set,
  skin: ne.skin
};
class Qr extends Xr {
  async connectedCallback() {
    const t = Yr(this.props, Zr, this);
    t.element = this, t.ref = (n) => {
      this.component = n;
    }, await $t(), !this.disconnected && Fr(/* @__PURE__ */ p(Ut, {
      ...t
    }), this);
  }
  constructor(t) {
    super(t);
  }
}
U(Qr, "Props", Zr);
typeof customElements < "u" && !customElements.get("em-emoji") && customElements.define("em-emoji", Qr);
var Pn, qt = [], An = m.__b, In = m.__r, Bn = m.diffed, On = m.__c, Hn = m.unmount;
function fs() {
  var e;
  for (qt.sort(function(t, n) {
    return t.__v.__b - n.__v.__b;
  }); e = qt.pop(); ) if (e.__P) try {
    e.__H.__h.forEach(ot), e.__H.__h.forEach(Wt), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], m.__e(t, e.__v);
  }
}
m.__b = function(e) {
  An && An(e);
}, m.__r = function(e) {
  In && In(e);
  var t = e.__c.__H;
  t && (t.__h.forEach(ot), t.__h.forEach(Wt), t.__h = []);
}, m.diffed = function(e) {
  Bn && Bn(e);
  var t = e.__c;
  t && t.__H && t.__H.__h.length && (qt.push(t) !== 1 && Pn === m.requestAnimationFrame || ((Pn = m.requestAnimationFrame) || function(n) {
    var r, o = function() {
      clearTimeout(i), Nn && cancelAnimationFrame(r), setTimeout(n);
    }, i = setTimeout(o, 100);
    Nn && (r = requestAnimationFrame(o));
  })(fs));
}, m.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(ot), n.__h = n.__h.filter(function(r) {
        return !r.__ || Wt(r);
      });
    } catch (r) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], m.__e(r, n.__v);
    }
  }), On && On(e, t);
}, m.unmount = function(e) {
  Hn && Hn(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      ot(r);
    } catch (o) {
      t = o;
    }
  }), t && m.__e(t, n.__v));
};
var Nn = typeof requestAnimationFrame == "function";
function ot(e) {
  var t = e.__c;
  typeof t == "function" && (e.__c = void 0, t());
}
function Wt(e) {
  e.__c = e.__();
}
function hs(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Vn(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function _t(e) {
  this.props = e;
}
(_t.prototype = new Z()).isPureReactComponent = !0, _t.prototype.shouldComponentUpdate = function(e, t) {
  return Vn(this.props, e) || Vn(this.state, t);
};
var Fn = m.__b;
m.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Fn && Fn(e);
};
var ps = m.__e;
m.__e = function(e, t, n) {
  if (e.then) {
    for (var r, o = t; o = o.__; ) if ((r = o.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), r.__c(e, t);
  }
  ps(e, t, n);
};
var Un = m.unmount;
function Tt() {
  this.__u = 0, this.t = null, this.__b = null;
}
function ei(e) {
  var t = e.__.__c;
  return t && t.__e && t.__e(e);
}
function tt() {
  this.u = null, this.o = null;
}
m.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && e.__h === !0 && (e.type = null), Un && Un(e);
}, (Tt.prototype = new Z()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var o = ei(r.__v), i = !1, s = function() {
    i || (i = !0, n.__R = null, o ? o(u) : u());
  };
  n.__R = s;
  var u = function() {
    if (!--r.__u) {
      if (r.state.__e) {
        var c = r.state.__e;
        r.__v.__k[0] = function f(d, h, v) {
          return d && (d.__v = null, d.__k = d.__k && d.__k.map(function(b) {
            return f(b, h, v);
          }), d.__c && d.__c.__P === h && (d.__e && v.insertBefore(d.__e, d.__d), d.__c.__e = !0, d.__c.__P = v)), d;
        }(c, c.__c.__P, c.__c.__O);
      }
      var a;
      for (r.setState({
        __e: r.__b = null
      }); a = r.t.pop(); ) a.forceUpdate();
    }
  }, l = t.__h === !0;
  r.__u++ || l || r.setState({
    __e: r.__b = r.__v.__k[0]
  }), e.then(s, s);
}, Tt.prototype.componentWillUnmount = function() {
  this.t = [];
}, Tt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = function i(s, u, l) {
        return s && (s.__c && s.__c.__H && (s.__c.__H.__.forEach(function(c) {
          typeof c.__c == "function" && c.__c();
        }), s.__c.__H = null), (s = hs({}, s)).__c != null && (s.__c.__P === l && (s.__c.__P = u), s.__c = null), s.__k = s.__k && s.__k.map(function(c) {
          return i(c, u, l);
        })), s;
      }(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__e && Nt(Re, null, e.fallback);
  return o && (o.__h = null), [
    Nt(Re, null, t.__e ? null : e.children),
    o
  ];
};
var qn = function(e, t, n) {
  if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size)) for (n = e.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.u = n = n[2];
  }
};
(tt.prototype = new Z()).__e = function(e) {
  var t = this, n = ei(t.__v), r = t.o.get(e);
  return r[0]++, function(o) {
    var i = function() {
      t.props.revealOrder ? (r.push(o), qn(t, e, r)) : o();
    };
    n ? n(i) : i();
  };
}, tt.prototype.render = function(e) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t = ht(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.o.set(t[n], this.u = [
    1,
    0,
    this.u
  ]);
  return e.children;
}, tt.prototype.componentDidUpdate = tt.prototype.componentDidMount = function() {
  var e = this;
  this.o.forEach(function(t, n) {
    qn(e, n, t);
  });
};
var vs = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, _s = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, gs = typeof document < "u", bs = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(e);
};
Z.prototype.isReactComponent = {}, [
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUpdate"
].forEach(function(e) {
  Object.defineProperty(Z.prototype, e, {
    configurable: !0,
    get: function() {
      return this["UNSAFE_" + e];
    },
    set: function(t) {
      Object.defineProperty(this, e, {
        configurable: !0,
        writable: !0,
        value: t
      });
    }
  });
});
var Wn = m.event;
function ms() {
}
function ws() {
  return this.cancelBubble;
}
function ys() {
  return this.defaultPrevented;
}
m.event = function(e) {
  return Wn && (e = Wn(e)), e.persist = ms, e.isPropagationStopped = ws, e.isDefaultPrevented = ys, e.nativeEvent = e;
};
var Kn = {
  configurable: !0,
  get: function() {
    return this.class;
  }
}, Gn = m.vnode;
m.vnode = function(e) {
  var t = e.type, n = e.props, r = n;
  if (typeof t == "string") {
    var o = t.indexOf("-") === -1;
    for (var i in r = {}, n) {
      var s = n[i];
      gs && i === "children" && t === "noscript" || i === "value" && "defaultValue" in n && s == null || (i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && s === !0 ? s = "" : /ondoubleclick/i.test(i) ? i = "ondblclick" : /^onchange(textarea|input)/i.test(i + t) && !bs(n.type) ? i = "oninput" : /^onfocus$/i.test(i) ? i = "onfocusin" : /^onblur$/i.test(i) ? i = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(i) ? i = i.toLowerCase() : o && _s.test(i) ? i = i.replace(/[A-Z0-9]/, "-$&").toLowerCase() : s === null && (s = void 0), r[i] = s);
    }
    t == "select" && r.multiple && Array.isArray(r.value) && (r.value = ht(n.children).forEach(function(u) {
      u.props.selected = r.value.indexOf(u.props.value) != -1;
    })), t == "select" && r.defaultValue != null && (r.value = ht(n.children).forEach(function(u) {
      u.props.selected = r.multiple ? r.defaultValue.indexOf(u.props.value) != -1 : r.defaultValue == u.props.value;
    })), e.props = r, n.class != n.className && (Kn.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", Kn));
  }
  e.$$typeof = vs, Gn && Gn(e);
};
var Yn = m.__r;
m.__r = function(e) {
  Yn && Yn(e), e.__c;
};
const ks = {
  light: "outline",
  dark: "solid"
};
class $s extends _t {
  renderIcon(t) {
    const { icon: n } = t;
    if (n) {
      if (n.svg) return /* @__PURE__ */ p("span", {
        class: "flex",
        dangerouslySetInnerHTML: {
          __html: n.svg
        }
      });
      if (n.src) return /* @__PURE__ */ p("img", {
        src: n.src
      });
    }
    const r = vt.categories[t.id] || vt.categories.custom, o = this.props.icons == "auto" ? ks[this.props.theme] : this.props.icons;
    return r[o] || r;
  }
  render() {
    let t = null;
    return /* @__PURE__ */ p("nav", {
      id: "nav",
      class: "padding",
      "data-position": this.props.position,
      dir: this.props.dir,
      children: /* @__PURE__ */ p("div", {
        class: "flex relative",
        children: [
          this.categories.map((n, r) => {
            const o = n.name || P.categories[n.id], i = !this.props.unfocused && n.id == this.state.categoryId;
            return i && (t = r), /* @__PURE__ */ p("button", {
              "aria-label": o,
              "aria-selected": i || void 0,
              title: o,
              type: "button",
              class: "flex flex-grow flex-center",
              onMouseDown: (s) => s.preventDefault(),
              onClick: () => {
                this.props.onClick({
                  category: n,
                  i: r
                });
              },
              children: this.renderIcon(n)
            });
          }),
          /* @__PURE__ */ p("div", {
            class: "bar",
            style: {
              width: `${100 / this.categories.length}%`,
              opacity: t == null ? 0 : 1,
              transform: this.props.dir === "rtl" ? `scaleX(-1) translateX(${t * 100}%)` : `translateX(${t * 100}%)`
            }
          })
        ]
      })
    });
  }
  constructor() {
    super(), this.categories = k.categories.filter((t) => !t.target), this.state = {
      categoryId: this.categories[0].id
    };
  }
}
class xs extends _t {
  shouldComponentUpdate(t) {
    for (let n in t)
      if (n != "children" && t[n] != this.props[n])
        return !0;
    return !1;
  }
  render() {
    return this.props.children;
  }
}
const nt = {
  rowsPerRender: 10
};
class Cs extends Z {
  getInitialState(t = this.props) {
    return {
      skin: le.get("skin") || t.skin,
      theme: this.initTheme(t.theme)
    };
  }
  componentWillMount() {
    this.dir = P.rtl ? "rtl" : "ltr", this.refs = {
      menu: te(),
      navigation: te(),
      scroll: te(),
      search: te(),
      searchInput: te(),
      skinToneButton: te(),
      skinToneRadio: te()
    }, this.initGrid(), this.props.stickySearch == !1 && this.props.searchPosition == "sticky" && (console.warn("[EmojiMart] Deprecation warning: `stickySearch` has been renamed `searchPosition`."), this.props.searchPosition = "static");
  }
  componentDidMount() {
    if (this.register(), this.shadowRoot = this.base.parentNode, this.props.autoFocus) {
      const { searchInput: t } = this.refs;
      t.current && t.current.focus();
    }
  }
  componentWillReceiveProps(t) {
    this.nextState || (this.nextState = {});
    for (const n in t) this.nextState[n] = t[n];
    clearTimeout(this.nextStateTimer), this.nextStateTimer = setTimeout(() => {
      let n = !1;
      for (const o in this.nextState)
        this.props[o] = this.nextState[o], (o === "custom" || o === "categories") && (n = !0);
      delete this.nextState;
      const r = this.getInitialState();
      if (n) return this.reset(r);
      this.setState(r);
    });
  }
  componentWillUnmount() {
    this.unregister();
  }
  async reset(t = {}) {
    await $t(this.props), this.initGrid(), this.unobserve(), this.setState(t, () => {
      this.observeCategories(), this.observeRows();
    });
  }
  register() {
    document.addEventListener("click", this.handleClickOutside), this.observe();
  }
  unregister() {
    var t;
    document.removeEventListener("click", this.handleClickOutside), (t = this.darkMedia) == null || t.removeEventListener("change", this.darkMediaCallback), this.unobserve();
  }
  observe() {
    this.observeCategories(), this.observeRows();
  }
  unobserve({ except: t = [] } = {}) {
    Array.isArray(t) || (t = [
      t
    ]);
    for (const n of this.observers)
      t.includes(n) || n.disconnect();
    this.observers = [].concat(t);
  }
  initGrid() {
    const { categories: t } = k;
    this.refs.categories = /* @__PURE__ */ new Map();
    const n = k.categories.map((o) => o.id).join(",");
    this.navKey && this.navKey != n && this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0), this.navKey = n, this.grid = [], this.grid.setsize = 0;
    const r = (o, i) => {
      const s = [];
      s.__categoryId = i.id, s.__index = o.length, this.grid.push(s);
      const u = this.grid.length - 1, l = u % nt.rowsPerRender ? {} : te();
      return l.index = u, l.posinset = this.grid.setsize + 1, o.push(l), s;
    };
    for (let o of t) {
      const i = [];
      let s = r(i, o);
      for (let u of o.emojis)
        s.length == this.getPerLine() && (s = r(i, o)), this.grid.setsize += 1, s.push(u);
      this.refs.categories.set(o.id, {
        root: te(),
        rows: i
      });
    }
  }
  initTheme(t) {
    if (t != "auto") return t;
    if (!this.darkMedia) {
      if (this.darkMedia = matchMedia("(prefers-color-scheme: dark)"), this.darkMedia.media.match(/^not/)) return "light";
      this.darkMedia.addEventListener("change", this.darkMediaCallback);
    }
    return this.darkMedia.matches ? "dark" : "light";
  }
  initDynamicPerLine(t = this.props) {
    if (!t.dynamicWidth) return;
    const { element: n, emojiButtonSize: r } = t, o = () => {
      const { width: s } = n.getBoundingClientRect();
      return Math.floor(s / r);
    }, i = new ResizeObserver(() => {
      this.unobserve({
        except: i
      }), this.setState({
        perLine: o()
      }, () => {
        this.initGrid(), this.forceUpdate(() => {
          this.observeCategories(), this.observeRows();
        });
      });
    });
    return i.observe(n), this.observers.push(i), o();
  }
  getPerLine() {
    return this.state.perLine || this.props.perLine;
  }
  getEmojiByPos([t, n]) {
    const r = this.state.searchResults || this.grid, o = r[t] && r[t][n];
    if (o)
      return ze.get(o);
  }
  observeCategories() {
    const t = this.refs.navigation.current;
    if (!t) return;
    const n = /* @__PURE__ */ new Map(), r = (s) => {
      s != t.state.categoryId && t.setState({
        categoryId: s
      });
    }, o = {
      root: this.refs.scroll.current,
      threshold: [
        0,
        1
      ]
    }, i = new IntersectionObserver((s) => {
      for (const l of s) {
        const c = l.target.dataset.id;
        n.set(c, l.intersectionRatio);
      }
      const u = [
        ...n
      ];
      for (const [l, c] of u) if (c) {
        r(l);
        break;
      }
    }, o);
    for (const { root: s } of this.refs.categories.values()) i.observe(s.current);
    this.observers.push(i);
  }
  observeRows() {
    const t = {
      ...this.state.visibleRows
    }, n = new IntersectionObserver((r) => {
      for (const o of r) {
        const i = parseInt(o.target.dataset.index);
        o.isIntersecting ? t[i] = !0 : delete t[i];
      }
      this.setState({
        visibleRows: t
      });
    }, {
      root: this.refs.scroll.current,
      rootMargin: `${this.props.emojiButtonSize * (nt.rowsPerRender + 5)}px 0px ${this.props.emojiButtonSize * nt.rowsPerRender}px`
    });
    for (const { rows: r } of this.refs.categories.values())
      for (const o of r) o.current && n.observe(o.current);
    this.observers.push(n);
  }
  preventDefault(t) {
    t.preventDefault();
  }
  unfocusSearch() {
    const t = this.refs.searchInput.current;
    t && t.blur();
  }
  navigate({ e: t, input: n, left: r, right: o, up: i, down: s }) {
    const u = this.state.searchResults || this.grid;
    if (!u.length) return;
    let [l, c] = this.state.pos;
    const a = (() => {
      if (l == 0 && c == 0 && !t.repeat && (r || i))
        return null;
      if (l == -1)
        return !t.repeat && (o || s) && n.selectionStart == n.value.length ? [
          0,
          0
        ] : null;
      if (r || o) {
        let f = u[l];
        const d = r ? -1 : 1;
        if (c += d, !f[c]) {
          if (l += d, f = u[l], !f)
            return l = r ? 0 : u.length - 1, c = r ? 0 : u[l].length - 1, [
              l,
              c
            ];
          c = r ? f.length - 1 : 0;
        }
        return [
          l,
          c
        ];
      }
      if (i || s) {
        l += i ? -1 : 1;
        const f = u[l];
        return f ? (f[c] || (c = f.length - 1), [
          l,
          c
        ]) : (l = i ? 0 : u.length - 1, c = i ? 0 : u[l].length - 1, [
          l,
          c
        ]);
      }
    })();
    if (a) t.preventDefault();
    else {
      this.state.pos[0] > -1 && this.setState({
        pos: [
          -1,
          -1
        ]
      });
      return;
    }
    this.setState({
      pos: a,
      keyboard: !0
    }, () => {
      this.scrollTo({
        row: a[0]
      });
    });
  }
  scrollTo({ categoryId: t, row: n }) {
    const r = this.state.searchResults || this.grid;
    if (!r.length) return;
    const o = this.refs.scroll.current, i = o.getBoundingClientRect();
    let s = 0;
    if (n >= 0 && (t = r[n].__categoryId), t && (s = (this.refs[t] || this.refs.categories.get(t).root).current.getBoundingClientRect().top - (i.top - o.scrollTop) + 1), n >= 0)
      if (!n) s = 0;
      else {
        const u = r[n].__index, l = s + u * this.props.emojiButtonSize, c = l + this.props.emojiButtonSize + this.props.emojiButtonSize * 0.88;
        if (l < o.scrollTop) s = l;
        else if (c > o.scrollTop + i.height) s = c - i.height;
        else return;
      }
    this.ignoreMouse(), o.scrollTop = s;
  }
  ignoreMouse() {
    this.mouseIsIgnored = !0, clearTimeout(this.ignoreMouseTimer), this.ignoreMouseTimer = setTimeout(() => {
      delete this.mouseIsIgnored;
    }, 100);
  }
  handleEmojiOver(t) {
    this.mouseIsIgnored || this.state.showSkins || this.setState({
      pos: t || [
        -1,
        -1
      ],
      keyboard: !1
    });
  }
  handleEmojiClick({ e: t, emoji: n, pos: r }) {
    if (this.props.onEmojiSelect && (!n && r && (n = this.getEmojiByPos(r)), n)) {
      const o = as(n, {
        skinIndex: this.state.skin - 1
      });
      this.props.maxFrequentRows && qr.add(o, this.props), this.props.onEmojiSelect(o, t);
    }
  }
  closeSkins() {
    this.state.showSkins && (this.setState({
      showSkins: null,
      tempSkin: null
    }), this.base.removeEventListener("click", this.handleBaseClick), this.base.removeEventListener("keydown", this.handleBaseKeydown));
  }
  handleSkinMouseOver(t) {
    this.setState({
      tempSkin: t
    });
  }
  handleSkinClick(t) {
    this.ignoreMouse(), this.closeSkins(), this.setState({
      skin: t,
      tempSkin: null
    }), le.set("skin", t);
  }
  renderNav() {
    return /* @__PURE__ */ p($s, {
      ref: this.refs.navigation,
      icons: this.props.icons,
      theme: this.state.theme,
      dir: this.dir,
      unfocused: !!this.state.searchResults,
      position: this.props.navPosition,
      onClick: this.handleCategoryClick
    }, this.navKey);
  }
  renderPreview() {
    const t = this.getEmojiByPos(this.state.pos), n = this.state.searchResults && !this.state.searchResults.length;
    return /* @__PURE__ */ p("div", {
      id: "preview",
      class: "flex flex-middle",
      dir: this.dir,
      "data-position": this.props.previewPosition,
      children: [
        /* @__PURE__ */ p("div", {
          class: "flex flex-middle flex-grow",
          children: [
            /* @__PURE__ */ p("div", {
              class: "flex flex-auto flex-middle flex-center",
              style: {
                height: this.props.emojiButtonSize,
                fontSize: this.props.emojiButtonSize
              },
              children: /* @__PURE__ */ p(Ut, {
                emoji: t,
                id: n ? this.props.noResultsEmoji || "cry" : this.props.previewEmoji || (this.props.previewPosition == "top" ? "point_down" : "point_up"),
                set: this.props.set,
                size: this.props.emojiButtonSize,
                skin: this.state.tempSkin || this.state.skin,
                spritesheet: !0,
                getSpritesheetURL: this.props.getSpritesheetURL
              })
            }),
            /* @__PURE__ */ p("div", {
              class: `margin-${this.dir[0]}`,
              children: t || n ? /* @__PURE__ */ p("div", {
                class: `padding-${this.dir[2]} align-${this.dir[0]}`,
                children: [
                  /* @__PURE__ */ p("div", {
                    class: "preview-title ellipsis",
                    children: t ? t.name : P.search_no_results_1
                  }),
                  /* @__PURE__ */ p("div", {
                    class: "preview-subtitle ellipsis color-c",
                    children: t ? t.skins[0].shortcodes : P.search_no_results_2
                  })
                ]
              }) : /* @__PURE__ */ p("div", {
                class: "preview-placeholder color-c",
                children: P.pick
              })
            })
          ]
        }),
        !t && this.props.skinTonePosition == "preview" && this.renderSkinToneButton()
      ]
    });
  }
  renderEmojiButton(t, { pos: n, posinset: r, grid: o }) {
    const i = this.props.emojiButtonSize, s = this.state.tempSkin || this.state.skin, l = (t.skins[s - 1] || t.skins[0]).native, c = os(this.state.pos, n), a = n.concat(t.id).join("");
    return /* @__PURE__ */ p(xs, {
      selected: c,
      skin: s,
      size: i,
      children: /* @__PURE__ */ p("button", {
        "aria-label": l,
        "aria-selected": c || void 0,
        "aria-posinset": r,
        "aria-setsize": o.setsize,
        "data-keyboard": this.state.keyboard,
        title: this.props.previewPosition == "none" ? t.name : void 0,
        type: "button",
        class: "flex flex-center flex-middle",
        tabindex: "-1",
        onClick: (f) => this.handleEmojiClick({
          e: f,
          emoji: t
        }),
        onMouseEnter: () => this.handleEmojiOver(n),
        onMouseLeave: () => this.handleEmojiOver(),
        style: {
          width: this.props.emojiButtonSize,
          height: this.props.emojiButtonSize,
          fontSize: this.props.emojiSize,
          lineHeight: 0
        },
        children: [
          /* @__PURE__ */ p("div", {
            "aria-hidden": "true",
            class: "background",
            style: {
              borderRadius: this.props.emojiButtonRadius,
              backgroundColor: this.props.emojiButtonColors ? this.props.emojiButtonColors[(r - 1) % this.props.emojiButtonColors.length] : void 0
            }
          }),
          /* @__PURE__ */ p(Ut, {
            emoji: t,
            set: this.props.set,
            size: this.props.emojiSize,
            skin: s,
            spritesheet: !0,
            getSpritesheetURL: this.props.getSpritesheetURL
          })
        ]
      })
    }, a);
  }
  renderSearch() {
    const t = this.props.previewPosition == "none" || this.props.skinTonePosition == "search";
    return /* @__PURE__ */ p("div", {
      children: [
        /* @__PURE__ */ p("div", {
          class: "spacer"
        }),
        /* @__PURE__ */ p("div", {
          class: "flex flex-middle",
          children: [
            /* @__PURE__ */ p("div", {
              class: "search relative flex-grow",
              children: [
                /* @__PURE__ */ p("input", {
                  type: "search",
                  ref: this.refs.searchInput,
                  placeholder: P.search,
                  onClick: this.handleSearchClick,
                  onInput: this.handleSearchInput,
                  onKeyDown: this.handleSearchKeyDown,
                  autoComplete: "off"
                }),
                /* @__PURE__ */ p("span", {
                  class: "icon loupe flex",
                  children: vt.search.loupe
                }),
                this.state.searchResults && /* @__PURE__ */ p("button", {
                  title: "Clear",
                  "aria-label": "Clear",
                  type: "button",
                  class: "icon delete flex",
                  onClick: this.clearSearch,
                  onMouseDown: this.preventDefault,
                  children: vt.search.delete
                })
              ]
            }),
            t && this.renderSkinToneButton()
          ]
        })
      ]
    });
  }
  renderSearchResults() {
    const { searchResults: t } = this.state;
    return t ? /* @__PURE__ */ p("div", {
      class: "category",
      ref: this.refs.search,
      children: [
        /* @__PURE__ */ p("div", {
          class: `sticky padding-small align-${this.dir[0]}`,
          children: P.categories.search
        }),
        /* @__PURE__ */ p("div", {
          children: t.length ? t.map((n, r) => /* @__PURE__ */ p("div", {
            class: "flex",
            children: n.map((o, i) => this.renderEmojiButton(o, {
              pos: [
                r,
                i
              ],
              posinset: r * this.props.perLine + i + 1,
              grid: t
            }))
          })) : /* @__PURE__ */ p("div", {
            class: `padding-small align-${this.dir[0]}`,
            children: this.props.onAddCustomEmoji && /* @__PURE__ */ p("a", {
              onClick: this.props.onAddCustomEmoji,
              children: P.add_custom
            })
          })
        })
      ]
    }) : null;
  }
  renderCategories() {
    const { categories: t } = k, n = !!this.state.searchResults, r = this.getPerLine();
    return /* @__PURE__ */ p("div", {
      style: {
        visibility: n ? "hidden" : void 0,
        display: n ? "none" : void 0,
        height: "100%"
      },
      children: t.map((o) => {
        const { root: i, rows: s } = this.refs.categories.get(o.id);
        return /* @__PURE__ */ p("div", {
          "data-id": o.target ? o.target.id : o.id,
          class: "category",
          ref: i,
          children: [
            /* @__PURE__ */ p("div", {
              class: `sticky padding-small align-${this.dir[0]}`,
              children: o.name || P.categories[o.id]
            }),
            /* @__PURE__ */ p("div", {
              class: "relative",
              style: {
                height: s.length * this.props.emojiButtonSize
              },
              children: s.map((u, l) => {
                const c = u.index - u.index % nt.rowsPerRender, a = this.state.visibleRows[c], f = "current" in u ? u : void 0;
                if (!a && !f) return null;
                const d = l * r, h = d + r, v = o.emojis.slice(d, h);
                return v.length < r && v.push(...new Array(r - v.length)), /* @__PURE__ */ p("div", {
                  "data-index": u.index,
                  ref: f,
                  class: "flex row",
                  style: {
                    top: l * this.props.emojiButtonSize
                  },
                  children: a && v.map((b, g) => {
                    if (!b) return /* @__PURE__ */ p("div", {
                      style: {
                        width: this.props.emojiButtonSize,
                        height: this.props.emojiButtonSize
                      }
                    });
                    const _ = ze.get(b);
                    return this.renderEmojiButton(_, {
                      pos: [
                        u.index,
                        g
                      ],
                      posinset: u.posinset + g,
                      grid: this.grid
                    });
                  })
                }, u.index);
              })
            })
          ]
        });
      })
    });
  }
  renderSkinToneButton() {
    return this.props.skinTonePosition == "none" ? null : /* @__PURE__ */ p("div", {
      class: "flex flex-auto flex-center flex-middle",
      style: {
        position: "relative",
        width: this.props.emojiButtonSize,
        height: this.props.emojiButtonSize
      },
      children: /* @__PURE__ */ p("button", {
        type: "button",
        ref: this.refs.skinToneButton,
        class: "skin-tone-button flex flex-auto flex-center flex-middle",
        "aria-selected": this.state.showSkins ? "" : void 0,
        "aria-label": P.skins.choose,
        title: P.skins.choose,
        onClick: this.openSkins,
        style: {
          width: this.props.emojiSize,
          height: this.props.emojiSize
        },
        children: /* @__PURE__ */ p("span", {
          class: `skin-tone skin-tone-${this.state.skin}`
        })
      })
    });
  }
  renderLiveRegion() {
    const t = this.getEmojiByPos(this.state.pos), n = t ? t.name : "";
    return /* @__PURE__ */ p("div", {
      "aria-live": "polite",
      class: "sr-only",
      children: n
    });
  }
  renderSkins() {
    const n = this.refs.skinToneButton.current.getBoundingClientRect(), r = this.base.getBoundingClientRect(), o = {};
    return this.dir == "ltr" ? o.right = r.right - n.right - 3 : o.left = n.left - r.left - 3, this.props.previewPosition == "bottom" && this.props.skinTonePosition == "preview" ? o.bottom = r.bottom - n.top + 6 : (o.top = n.bottom - r.top + 3, o.bottom = "auto"), /* @__PURE__ */ p("div", {
      ref: this.refs.menu,
      role: "radiogroup",
      dir: this.dir,
      "aria-label": P.skins.choose,
      class: "menu hidden",
      "data-position": o.top ? "top" : "bottom",
      style: o,
      children: [
        ...Array(6).keys()
      ].map((i) => {
        const s = i + 1, u = this.state.skin == s;
        return /* @__PURE__ */ p("div", {
          children: [
            /* @__PURE__ */ p("input", {
              type: "radio",
              name: "skin-tone",
              value: s,
              "aria-label": P.skins[s],
              ref: u ? this.refs.skinToneRadio : null,
              defaultChecked: u,
              onChange: () => this.handleSkinMouseOver(s),
              onKeyDown: (l) => {
                (l.code == "Enter" || l.code == "Space" || l.code == "Tab") && (l.preventDefault(), this.handleSkinClick(s));
              }
            }),
            /* @__PURE__ */ p("button", {
              "aria-hidden": "true",
              tabindex: "-1",
              onClick: () => this.handleSkinClick(s),
              onMouseEnter: () => this.handleSkinMouseOver(s),
              onMouseLeave: () => this.handleSkinMouseOver(),
              class: "option flex flex-grow flex-middle",
              children: [
                /* @__PURE__ */ p("span", {
                  class: `skin-tone skin-tone-${s}`
                }),
                /* @__PURE__ */ p("span", {
                  class: "margin-small-lr",
                  children: P.skins[s]
                })
              ]
            })
          ]
        });
      })
    });
  }
  render() {
    const t = this.props.perLine * this.props.emojiButtonSize;
    return /* @__PURE__ */ p("section", {
      id: "root",
      class: "flex flex-column",
      dir: this.dir,
      style: {
        width: this.props.dynamicWidth ? "100%" : `calc(${t}px + (var(--padding) + var(--sidebar-width)))`
      },
      "data-emoji-set": this.props.set,
      "data-theme": this.state.theme,
      "data-menu": this.state.showSkins ? "" : void 0,
      children: [
        this.props.previewPosition == "top" && this.renderPreview(),
        this.props.navPosition == "top" && this.renderNav(),
        this.props.searchPosition == "sticky" && /* @__PURE__ */ p("div", {
          class: "padding-lr",
          children: this.renderSearch()
        }),
        /* @__PURE__ */ p("div", {
          ref: this.refs.scroll,
          class: "scroll flex-grow padding-lr",
          children: /* @__PURE__ */ p("div", {
            style: {
              width: this.props.dynamicWidth ? "100%" : t,
              height: "100%"
            },
            children: [
              this.props.searchPosition == "static" && this.renderSearch(),
              this.renderSearchResults(),
              this.renderCategories()
            ]
          })
        }),
        this.props.navPosition == "bottom" && this.renderNav(),
        this.props.previewPosition == "bottom" && this.renderPreview(),
        this.state.showSkins && this.renderSkins(),
        this.renderLiveRegion()
      ]
    });
  }
  constructor(t) {
    super(), U(this, "darkMediaCallback", () => {
      this.props.theme == "auto" && this.setState({
        theme: this.darkMedia.matches ? "dark" : "light"
      });
    }), U(this, "handleClickOutside", (n) => {
      const { element: r } = this.props;
      n.target != r && (this.state.showSkins && this.closeSkins(), this.props.onClickOutside && this.props.onClickOutside(n));
    }), U(this, "handleBaseClick", (n) => {
      this.state.showSkins && (n.target.closest(".menu") || (n.preventDefault(), n.stopImmediatePropagation(), this.closeSkins()));
    }), U(this, "handleBaseKeydown", (n) => {
      this.state.showSkins && n.key == "Escape" && (n.preventDefault(), n.stopImmediatePropagation(), this.closeSkins());
    }), U(this, "handleSearchClick", () => {
      this.getEmojiByPos(this.state.pos) && this.setState({
        pos: [
          -1,
          -1
        ]
      });
    }), U(this, "handleSearchInput", async () => {
      const n = this.refs.searchInput.current;
      if (!n) return;
      const { value: r } = n, o = await ze.search(r), i = () => {
        this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0);
      };
      if (!o) return this.setState({
        searchResults: o,
        pos: [
          -1,
          -1
        ]
      }, i);
      const s = n.selectionStart == n.value.length ? [
        0,
        0
      ] : [
        -1,
        -1
      ], u = [];
      u.setsize = o.length;
      let l = null;
      for (let c of o)
        (!u.length || l.length == this.getPerLine()) && (l = [], l.__categoryId = "search", l.__index = u.length, u.push(l)), l.push(c);
      this.ignoreMouse(), this.setState({
        searchResults: u,
        pos: s
      }, i);
    }), U(this, "handleSearchKeyDown", (n) => {
      const r = n.currentTarget;
      switch (n.stopImmediatePropagation(), n.key) {
        case "ArrowLeft":
          this.navigate({
            e: n,
            input: r,
            left: !0
          });
          break;
        case "ArrowRight":
          this.navigate({
            e: n,
            input: r,
            right: !0
          });
          break;
        case "ArrowUp":
          this.navigate({
            e: n,
            input: r,
            up: !0
          });
          break;
        case "ArrowDown":
          this.navigate({
            e: n,
            input: r,
            down: !0
          });
          break;
        case "Enter":
          n.preventDefault(), this.handleEmojiClick({
            e: n,
            pos: this.state.pos
          });
          break;
        case "Escape":
          n.preventDefault(), this.state.searchResults ? this.clearSearch() : this.unfocusSearch();
          break;
      }
    }), U(this, "clearSearch", () => {
      const n = this.refs.searchInput.current;
      n && (n.value = "", n.focus(), this.handleSearchInput());
    }), U(this, "handleCategoryClick", ({ category: n, i: r }) => {
      this.scrollTo(r == 0 ? {
        row: -1
      } : {
        categoryId: n.id
      });
    }), U(this, "openSkins", (n) => {
      const { currentTarget: r } = n, o = r.getBoundingClientRect();
      this.setState({
        showSkins: o
      }, async () => {
        await ss(2);
        const i = this.refs.menu.current;
        i && (i.classList.remove("hidden"), this.refs.skinToneRadio.current.focus(), this.base.addEventListener("click", this.handleBaseClick, !0), this.base.addEventListener("keydown", this.handleBaseKeydown, !0));
      });
    }), this.observers = [], this.state = {
      pos: [
        -1,
        -1
      ],
      perLine: this.initDynamicPerLine(t),
      visibleRows: {
        0: !0
      },
      ...this.getInitialState(t)
    };
  }
}
class on extends ds {
  async connectedCallback() {
    const t = Yr(this.props, ne, this);
    t.element = this, t.ref = (n) => {
      this.component = n;
    }, await $t(t), !this.disconnected && Fr(/* @__PURE__ */ p(Cs, {
      ...t
    }), this.shadowRoot);
  }
  constructor(t) {
    super(t, {
      styles: /* @__PURE__ */ Lr(ti)
    });
  }
}
U(on, "Props", ne);
typeof customElements < "u" && !customElements.get("em-emoji-picker") && customElements.define("em-emoji-picker", on);
var ti = {};
ti = `:host {
  width: min-content;
  height: 435px;
  min-height: 230px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  --border-radius: 10px;
  --category-icon-size: 18px;
  --font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  --font-size: 15px;
  --preview-placeholder-size: 21px;
  --preview-title-size: 1.1em;
  --preview-subtitle-size: .9em;
  --shadow-color: 0deg 0% 0%;
  --shadow: .3px .5px 2.7px hsl(var(--shadow-color) / .14), .4px .8px 1px -3.2px hsl(var(--shadow-color) / .14), 1px 2px 2.5px -4.5px hsl(var(--shadow-color) / .14);
  display: flex;
}

[data-theme="light"] {
  --em-rgb-color: var(--rgb-color, 34, 36, 39);
  --em-rgb-accent: var(--rgb-accent, 34, 102, 237);
  --em-rgb-background: var(--rgb-background, 255, 255, 255);
  --em-rgb-input: var(--rgb-input, 255, 255, 255);
  --em-color-border: var(--color-border, rgba(0, 0, 0, .05));
  --em-color-border-over: var(--color-border-over, rgba(0, 0, 0, .1));
}

[data-theme="dark"] {
  --em-rgb-color: var(--rgb-color, 222, 222, 221);
  --em-rgb-accent: var(--rgb-accent, 58, 130, 247);
  --em-rgb-background: var(--rgb-background, 21, 22, 23);
  --em-rgb-input: var(--rgb-input, 0, 0, 0);
  --em-color-border: var(--color-border, rgba(255, 255, 255, .1));
  --em-color-border-over: var(--color-border-over, rgba(255, 255, 255, .2));
}

#root {
  --color-a: rgb(var(--em-rgb-color));
  --color-b: rgba(var(--em-rgb-color), .65);
  --color-c: rgba(var(--em-rgb-color), .45);
  --padding: 12px;
  --padding-small: calc(var(--padding) / 2);
  --sidebar-width: 16px;
  --duration: 225ms;
  --duration-fast: 125ms;
  --duration-instant: 50ms;
  --easing: cubic-bezier(.4, 0, .2, 1);
  width: 100%;
  text-align: left;
  border-radius: var(--border-radius);
  background-color: rgb(var(--em-rgb-background));
  position: relative;
}

@media (prefers-reduced-motion) {
  #root {
    --duration: 0;
    --duration-fast: 0;
    --duration-instant: 0;
  }
}

#root[data-menu] button {
  cursor: auto;
}

#root[data-menu] .menu button {
  cursor: pointer;
}

:host, #root, input, button {
  color: rgb(var(--em-rgb-color));
  font-family: var(--font-family);
  font-size: var(--font-size);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: normal;
}

*, :before, :after {
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
}

.flex-auto {
  flex: none;
}

.flex-center {
  justify-content: center;
}

.flex-column {
  flex-direction: column;
}

.flex-grow {
  flex: auto;
}

.flex-middle {
  align-items: center;
}

.flex-wrap {
  flex-wrap: wrap;
}

.padding {
  padding: var(--padding);
}

.padding-t {
  padding-top: var(--padding);
}

.padding-lr {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.padding-r {
  padding-right: var(--padding);
}

.padding-small {
  padding: var(--padding-small);
}

.padding-small-b {
  padding-bottom: var(--padding-small);
}

.padding-small-lr {
  padding-left: var(--padding-small);
  padding-right: var(--padding-small);
}

.margin {
  margin: var(--padding);
}

.margin-r {
  margin-right: var(--padding);
}

.margin-l {
  margin-left: var(--padding);
}

.margin-small-l {
  margin-left: var(--padding-small);
}

.margin-small-lr {
  margin-left: var(--padding-small);
  margin-right: var(--padding-small);
}

.align-l {
  text-align: left;
}

.align-r {
  text-align: right;
}

.color-a {
  color: var(--color-a);
}

.color-b {
  color: var(--color-b);
}

.color-c {
  color: var(--color-c);
}

.ellipsis {
  white-space: nowrap;
  max-width: 100%;
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sr-only {
  width: 1px;
  height: 1px;
  position: absolute;
  top: auto;
  left: -10000px;
  overflow: hidden;
}

a {
  cursor: pointer;
  color: rgb(var(--em-rgb-accent));
}

a:hover {
  text-decoration: underline;
}

.spacer {
  height: 10px;
}

[dir="rtl"] .scroll {
  padding-left: 0;
  padding-right: var(--padding);
}

.scroll {
  padding-right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  width: var(--sidebar-width);
  height: var(--sidebar-width);
}

.scroll::-webkit-scrollbar-track {
  border: 0;
}

.scroll::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.scroll::-webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
}

.scroll::-webkit-scrollbar-thumb {
  min-height: 20%;
  min-height: 65px;
  border: 4px solid rgb(var(--em-rgb-background));
  border-radius: 8px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--em-color-border-over) !important;
}

.scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--em-color-border);
}

.sticky {
  z-index: 1;
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  font-weight: 500;
  position: sticky;
  top: -1px;
}

[dir="rtl"] .search input[type="search"] {
  padding: 10px 2.2em 10px 2em;
}

[dir="rtl"] .search .loupe {
  left: auto;
  right: .7em;
}

[dir="rtl"] .search .delete {
  left: .7em;
  right: auto;
}

.search {
  z-index: 2;
  position: relative;
}

.search input, .search button {
  font-size: calc(var(--font-size)  - 1px);
}

.search input[type="search"] {
  width: 100%;
  background-color: var(--em-color-border);
  transition-duration: var(--duration);
  transition-property: background-color, box-shadow;
  transition-timing-function: var(--easing);
  border: 0;
  border-radius: 10px;
  outline: 0;
  padding: 10px 2em 10px 2.2em;
  display: block;
}

.search input[type="search"]::-ms-input-placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"]::placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"], .search input[type="search"]::-webkit-search-decoration, .search input[type="search"]::-webkit-search-cancel-button, .search input[type="search"]::-webkit-search-results-button, .search input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
}

.search input[type="search"]:focus {
  background-color: rgb(var(--em-rgb-input));
  box-shadow: inset 0 0 0 1px rgb(var(--em-rgb-accent)), 0 1px 3px rgba(65, 69, 73, .2);
}

.search .icon {
  z-index: 1;
  color: rgba(var(--em-rgb-color), .7);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.search .loupe {
  pointer-events: none;
  left: .7em;
}

.search .delete {
  right: .7em;
}

svg {
  fill: currentColor;
  width: 1em;
  height: 1em;
}

button {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  cursor: pointer;
  color: currentColor;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

#nav {
  z-index: 2;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: var(--sidebar-width);
  position: relative;
}

#nav button {
  color: var(--color-b);
  transition: color var(--duration) var(--easing);
}

#nav button:hover {
  color: var(--color-a);
}

#nav svg, #nav img {
  width: var(--category-icon-size);
  height: var(--category-icon-size);
}

#nav[dir="rtl"] .bar {
  left: auto;
  right: 0;
}

#nav .bar {
  width: 100%;
  height: 3px;
  background-color: rgb(var(--em-rgb-accent));
  transition: transform var(--duration) var(--easing);
  border-radius: 3px 3px 0 0;
  position: absolute;
  bottom: -12px;
  left: 0;
}

#nav button[aria-selected] {
  color: rgb(var(--em-rgb-accent));
}

#preview {
  z-index: 2;
  padding: calc(var(--padding)  + 4px) var(--padding);
  padding-right: var(--sidebar-width);
  position: relative;
}

#preview .preview-placeholder {
  font-size: var(--preview-placeholder-size);
}

#preview .preview-title {
  font-size: var(--preview-title-size);
}

#preview .preview-subtitle {
  font-size: var(--preview-subtitle-size);
}

#nav:before, #preview:before {
  content: "";
  height: 2px;
  position: absolute;
  left: 0;
  right: 0;
}

#nav[data-position="top"]:before, #preview[data-position="top"]:before {
  background: linear-gradient(to bottom, var(--em-color-border), transparent);
  top: 100%;
}

#nav[data-position="bottom"]:before, #preview[data-position="bottom"]:before {
  background: linear-gradient(to top, var(--em-color-border), transparent);
  bottom: 100%;
}

.category:last-child {
  min-height: calc(100% + 1px);
}

.category button {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;
  position: relative;
}

.category button > * {
  position: relative;
}

.category button .background {
  opacity: 0;
  background-color: var(--em-color-border);
  transition: opacity var(--duration-fast) var(--easing) var(--duration-instant);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.category button:hover .background {
  transition-duration: var(--duration-instant);
  transition-delay: 0s;
}

.category button[aria-selected] .background {
  opacity: 1;
}

.category button[data-keyboard] .background {
  transition: none;
}

.row {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.skin-tone-button {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 100%;
}

.skin-tone-button:hover {
  border-color: var(--em-color-border);
}

.skin-tone-button:active .skin-tone {
  transform: scale(.85) !important;
}

.skin-tone-button .skin-tone {
  transition: transform var(--duration) var(--easing);
}

.skin-tone-button[aria-selected] {
  background-color: var(--em-color-border);
  border-top-color: rgba(0, 0, 0, .05);
  border-bottom-color: rgba(0, 0, 0, 0);
  border-left-width: 0;
  border-right-width: 0;
}

.skin-tone-button[aria-selected] .skin-tone {
  transform: scale(.9);
}

.menu {
  z-index: 2;
  white-space: nowrap;
  border: 1px solid var(--em-color-border);
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition-property: opacity, transform;
  transition-duration: var(--duration);
  transition-timing-function: var(--easing);
  border-radius: 10px;
  padding: 4px;
  position: absolute;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .05);
}

.menu.hidden {
  opacity: 0;
}

.menu[data-position="bottom"] {
  transform-origin: 100% 100%;
}

.menu[data-position="bottom"].hidden {
  transform: scale(.9)rotate(-3deg)translateY(5%);
}

.menu[data-position="top"] {
  transform-origin: 100% 0;
}

.menu[data-position="top"].hidden {
  transform: scale(.9)rotate(3deg)translateY(-5%);
}

.menu input[type="radio"] {
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  overflow: hidden;
}

.menu input[type="radio"]:checked + .option {
  box-shadow: 0 0 0 2px rgb(var(--em-rgb-accent));
}

.option {
  width: 100%;
  border-radius: 6px;
  padding: 4px 6px;
}

.option:hover {
  color: #fff;
  background-color: rgb(var(--em-rgb-accent));
}

.skin-tone {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.skin-tone:after {
  content: "";
  mix-blend-mode: overlay;
  background: linear-gradient(rgba(255, 255, 255, .2), rgba(0, 0, 0, 0));
  border: 1px solid rgba(0, 0, 0, .8);
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 2px #fff;
}

.skin-tone-1 {
  background-color: #ffc93a;
}

.skin-tone-2 {
  background-color: #ffdab7;
}

.skin-tone-3 {
  background-color: #e7b98f;
}

.skin-tone-4 {
  background-color: #c88c61;
}

.skin-tone-5 {
  background-color: #a46134;
}

.skin-tone-6 {
  background-color: #5d4437;
}

[data-index] {
  justify-content: space-between;
}

[data-emoji-set="twitter"] .skin-tone:after {
  box-shadow: none;
  border-color: rgba(0, 0, 0, .5);
}

[data-emoji-set="twitter"] .skin-tone-1 {
  background-color: #fade72;
}

[data-emoji-set="twitter"] .skin-tone-2 {
  background-color: #f3dfd0;
}

[data-emoji-set="twitter"] .skin-tone-3 {
  background-color: #eed3a8;
}

[data-emoji-set="twitter"] .skin-tone-4 {
  background-color: #cfad8d;
}

[data-emoji-set="twitter"] .skin-tone-5 {
  background-color: #a8805d;
}

[data-emoji-set="twitter"] .skin-tone-6 {
  background-color: #765542;
}

[data-emoji-set="google"] .skin-tone:after {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, .4);
}

[data-emoji-set="google"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="google"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="google"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="google"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="google"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="google"] .skin-tone-6 {
  background-color: #61493f;
}

[data-emoji-set="facebook"] .skin-tone:after {
  border-color: rgba(0, 0, 0, .4);
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 4px #fff;
}

[data-emoji-set="facebook"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="facebook"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="facebook"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="facebook"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="facebook"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="facebook"] .skin-tone-6 {
  background-color: #61493f;
}

`;
var Ss = /* @__PURE__ */ we('<img class="attachment">'), Es = /* @__PURE__ */ we('<div class="message-text"> </div> <!>', 1), js = /* @__PURE__ */ we('<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <div class="message-text"><!></div>', 1), Ms = /* @__PURE__ */ we("<div><!></div>"), zs = /* @__PURE__ */ we('<button type="button" id="emoji-picker" class="material-symbols-outlined">sentiment_satisfied</button>'), Ls = /* @__PURE__ */ we('<div class="file-upload-wrapper"><input type="file" accept="image/*" id="file-input" hidden> <img> <button type="button" id="file-upload" class="material-symbols-rounded">attach_file</button> <button type="button" id="file-cancel" class="material-symbols-rounded">close</button></div>'), Rs = /* @__PURE__ */ we('<div class="show-chatbot"><div class="chatbot-popup"><div class="chat-header"><div class="header-info"><svg class="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <h2 class="logo-text"> </h2></div> <button id="close-chatbot" class="material-symbols-rounded">keyboard_arrow_down</button></div> <div class="chat-body"><div class="message bot-message"><svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <div class="message-text"><!></div></div> <!></div> <div class="chat-footer"><form action="#" class="chat-form"><textarea class="message-input" required></textarea> <div class="chat-controls"><!> <!> <button type="submit" id="send-message" class="material-symbols-rounded">arrow_upward</button></div></form></div></div></div>');
function Ds(e, t) {
  jr(t, !1);
  const n = Do(), r = () => Ro(Ve, "$messages", n);
  let o = ie(t, "webhookUrl", 8), i = ie(t, "title", 12), s = ie(t, "initialGreeting", 12), u = ie(t, "imageUpload", 12), l = ie(t, "inputPlaceholder", 12), c = ie(t, "emoji", 12), a = ie(t, "locale", 8), f = ie(t, "styles", 8), d = he(), h, v = he(), b, g = he(!1), _ = he(), y = he(), R = he("#"), j = he(), M, O = {
    message: null,
    file: { data: null, mime_type: null }
  };
  Po(() => (Object.entries(f()).forEach(([x, E]) => {
    const I = `--chat-${x.replace(/_/g, "-").toLowerCase()}`;
    w(d).style.setProperty(I, E);
  }), i(i() ?? "Chatbot"), s(s() ?? "Hi there! 👋 <br> How can I assist you today?"), l(l() ?? "Message..."), u(JSON.parse(u())), c(JSON.parse(c())), b = w(v).scrollHeight, h = crypto.randomUUID(), M = new on({
    locale: a(),
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (x) => {
      const { selectionStart: E, selectionEnd: C } = w(v);
      w(v).setRangeText(x.native, E, C, "end"), w(v).focus();
    },
    onClickOutside: (x) => {
      x.target.id === "emoji-picker" ? document.body.classList.toggle("show-emoji-picker") : document.body.classList.remove("show-emoji-picker");
    }
  }), w(j).appendChild(M), w(_).scrollTo({
    top: w(_).scrollHeight,
    behavior: "instant"
  }), () => {
    M && M.parentNode && M.parentNode.removeChild(M);
  }));
  const re = async () => {
    const x = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "sendMessage",
        chatInput: O.message,
        sessionId: h
      })
    };
    try {
      const E = await fetch(o(), x);
      if (!E.ok)
        throw new Error("Failed to connect to the server. Try again later");
      const C = await E.json();
      if (!C.success)
        throw new Error(C.data.message);
      const I = C.data.message.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      Ve.update((Y) => (Y[Y.length - 1] = {
        content: { message: I },
        className: "bot-message"
      }, Y));
    } catch (E) {
      let C = E.toString();
      console.log(C), Ve.update((I) => (I[I.length - 1] = {
        content: { message: C },
        className: "bot-message",
        err: !0
      }, I));
    } finally {
      await Mt(), w(_).scrollTo({
        top: w(_).scrollHeight,
        behavior: "smooth"
      });
    }
  }, z = async (x) => {
    x.preventDefault(), O.message = w(v).value.trim(), He(v, w(v).value = ""), D(g, !1), w(v).dispatchEvent(new Event("input")), Ve.update((C) => (C = [
      ...C,
      {
        content: { ...O },
        className: "user-message"
      }
    ], C)), await Mt(), w(_).scrollTo({
      top: w(_).scrollHeight,
      behavior: "smooth"
    });
    let E = `<div class="thinking-indicator">
                  			<div class="dot"></div>
                  			<div class="dot"></div>
                  			<div class="dot"></div>
               			</div>`;
    Ve.update((C) => (C = [
      ...C,
      {
        content: { message: E },
        className: "bot-message"
      }
    ], C)), await Mt(), w(_).scrollTo({
      top: w(_).scrollHeight,
      behavior: "smooth"
    }), re();
  }, G = (x) => {
    const E = x.target.value.trim();
    x.key === "Enter" && E && !x.shiftKey && window.innerWidth > 768 && z(x);
  };
  function fe(x) {
    const E = x.target.files[0];
    if (!E) return;
    const C = new FileReader();
    C.onload = (I) => {
      D(R, I.target.result.toString());
      const Y = w(R).split(",")[1];
      O.file = { data: Y, mime_type: E.type }, D(g, !0), He(y, w(y).value = "");
    }, C.readAsDataURL(E);
  }
  function ni() {
    He(v, w(v).style.height = `${b}px`), He(v, w(v).style.height = `${w(v).scrollHeight}px`), He(j, w(j).style.borderRadius = w(v).scrollHeight > b ? "15px" : "32px");
  }
  function ri() {
    O.file = { data: null, mime_type: null }, D(g, !1);
  }
  function ii() {
    window.parent.postMessage("close_chatbot", "*");
  }
  zo();
  var xt = Rs(), oi = B(xt), sn = B(oi), an = B(sn), si = H(B(an), 2), ai = B(si), li = H(an, 2), Ct = H(sn, 2), ln = B(Ct), ci = H(B(ln), 2), ui = B(ci);
  kn(ui, s);
  var di = H(ln, 2);
  $o(di, 1, r, yo, (x, E) => {
    let C = () => w(E).content, I = () => w(E).className, Y = () => w(E).err;
    var Ie = Ms(), St = B(Ie);
    Qe(
      St,
      () => I() === "user-message",
      (Et) => {
        var Be = Es(), Oe = vn(Be), jt = B(Oe), vi = H(Oe, 2);
        Qe(vi, () => C().file.data, (_i) => {
          var fn = Ss();
          ye(() => zt(fn, "src", `data:${C().file.mime_type ?? ""};base64,${C().file.data ?? ""}`)), ve(_i, fn);
        }), ye(() => mn(jt, C().message)), ve(Et, Be);
      },
      (Et) => {
        var Be = js(), Oe = H(vn(Be), 2), jt = B(Oe);
        kn(jt, () => C().message), ye(() => xn(Oe, "error", Y())), ve(Et, Be);
      }
    ), ye(() => jo(Ie, `message ${I() ?? ""}`)), ve(x, Ie);
  }), Ne(Ct, (x) => D(_, x), () => w(_));
  var fi = H(Ct, 2), cn = B(fi), Ae = B(cn);
  Ne(Ae, (x) => D(v, x), () => w(v));
  var hi = H(Ae, 2), un = B(hi);
  Qe(un, c, (x) => {
    var E = zs();
    ve(x, E);
  });
  var dn = H(un, 2);
  Qe(dn, u, (x) => {
    var E = Ls(), C = B(E);
    Ne(C, (St) => D(y, St), () => w(y));
    var I = H(C, 2), Y = H(I, 2), Ie = H(Y, 2);
    ye(() => {
      xn(E, "file-uploaded", w(g)), zt(I, "src", w(R));
    }), pe("change", C, fe), pe("click", Y, () => w(y).click()), pe("click", Ie, ri), ve(x, E);
  });
  var pi = H(dn, 2);
  Ne(cn, (x) => D(j, x), () => w(j)), Ne(xt, (x) => D(d, x), () => w(d)), ye(() => {
    mn(ai, i()), zt(Ae, "placeholder", l());
  }), pe("click", li, ii), pe("keydown", Ae, G), pe("input", Ae, ni), pe("click", pi, z), ve(e, xt), Mr();
}
function Ts({ webhook_url: e, title: t, initial_greeting: n, image_upload: r, input_placeholder: o, emoji: i, locale: s, styles: u }) {
  let l = document.querySelector(".chatbot-container");
  l || (l = document.createElement("div"), l.className = "chatbot-container", document.body.appendChild(l)), mo(Ds, {
    target: document.querySelector(".chatbot-container"),
    props: {
      webhookUrl: e,
      title: t,
      initialGreeting: n,
      inputPlaceholder: o,
      imageUpload: r,
      emoji: i,
      locale: s,
      styles: u
    }
  });
}
export {
  Ts as createChat
};
