var on = Array.isArray, sn = Array.from, ki = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, nr = Object.getOwnPropertyDescriptors, $i = Object.prototype, xi = Array.prototype, ht = Object.getPrototypeOf;
const ue = () => {
};
function Ci(e) {
  return e();
}
function vt(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const X = 2, rr = 4, et = 8, an = 16, Z = 32, tt = 64, ke = 128, pt = 256, V = 512, he = 1024, Be = 2048, ne = 4096, nt = 8192, Si = 16384, jt = 32768, Ei = 65536, ji = 1 << 18, ir = 1 << 19, we = Symbol("$state"), Mi = Symbol("legacy props"), zi = Symbol("");
function or(e) {
  return e === this.v;
}
function sr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function ln(e) {
  return !sr(e, this.v);
}
function Li(e) {
  throw new Error("effect_in_teardown");
}
function Ti() {
  throw new Error("effect_in_unowned_derived");
}
function Di(e) {
  throw new Error("effect_orphan");
}
function Pi() {
  throw new Error("effect_update_depth_exceeded");
}
function Ri(e) {
  throw new Error("props_invalid_value");
}
function Ii() {
  throw new Error("state_descriptors_fixed");
}
function Ai() {
  throw new Error("state_prototype_fixed");
}
function Bi() {
  throw new Error("state_unsafe_local_read");
}
function Oi() {
  throw new Error("state_unsafe_mutation");
}
let Oe = !1;
function Hi() {
  Oe = !0;
}
function Y(e) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: or,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function Mt(e, t = !1) {
  var r;
  const n = Y(e);
  return t || (n.equals = ln), Oe && T !== null && T.l !== null && ((r = T.l).s ?? (r.s = [])).push(n), n;
}
function Ce(e, t = !1) {
  return /* @__PURE__ */ Ni(/* @__PURE__ */ Mt(e, t));
}
// @__NO_SIDE_EFFECTS__
function Ni(e) {
  return M !== null && M.f & X && (re === null ? fo([e]) : re.push(e)), e;
}
function ot(e, t) {
  return R(
    e,
    pe(() => m(e))
  ), t;
}
function R(e, t) {
  return M !== null && hn() && M.f & (X | an) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (re === null || !re.includes(e)) && Oi(), ar(e, t);
}
function ar(e, t) {
  return e.equals(t) || (e.v = t, e.version = jr(), lr(e, he), hn() && x !== null && x.f & V && !(x.f & Z) && (O !== null && O.includes(e) ? (Q(x, he), Tt(x)) : de === null ? ho([e]) : de.push(e))), t;
}
function lr(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = hn(), o = n.length, i = 0; i < o; i++) {
      var a = n[i], u = a.f;
      u & he || !r && a === x || (Q(a, t), u & (V | ke) && (u & X ? lr(
        /** @type {Derived} */
        a,
        Be
      ) : Tt(
        /** @type {Effect} */
        a
      )));
    }
}
const Vi = 1, Fi = 2, Ui = 16, qi = 1, Wi = 2, Ki = 4, Gi = 8, Yi = 16, Ji = 1, Xi = 2, F = Symbol();
let cr = !1;
function je(e, t = null, n) {
  if (typeof e != "object" || e === null || we in e)
    return e;
  const r = ht(e);
  if (r !== $i && r !== xi)
    return e;
  var o = /* @__PURE__ */ new Map(), i = on(e), a = Y(0);
  i && o.set("length", Y(
    /** @type {any[]} */
    e.length
  ));
  var u;
  return new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, c, s) {
        (!("value" in s) || s.configurable === !1 || s.enumerable === !1 || s.writable === !1) && Ii();
        var f = o.get(c);
        return f === void 0 ? (f = Y(s.value), o.set(c, f)) : R(f, je(s.value, u)), !0;
      },
      deleteProperty(l, c) {
        var s = o.get(c);
        if (s === void 0)
          c in l && o.set(c, Y(F));
        else {
          if (i && typeof c == "string") {
            var f = (
              /** @type {Source<number>} */
              o.get("length")
            ), d = Number(c);
            Number.isInteger(d) && d < f.v && R(f, d);
          }
          R(s, F), kn(a);
        }
        return !0;
      },
      get(l, c, s) {
        var p;
        if (c === we)
          return e;
        var f = o.get(c), d = c in l;
        if (f === void 0 && (!d || (p = Te(l, c)) != null && p.writable) && (f = Y(je(d ? l[c] : F, u)), o.set(c, f)), f !== void 0) {
          var h = m(f);
          return h === F ? void 0 : h;
        }
        return Reflect.get(l, c, s);
      },
      getOwnPropertyDescriptor(l, c) {
        var s = Reflect.getOwnPropertyDescriptor(l, c);
        if (s && "value" in s) {
          var f = o.get(c);
          f && (s.value = m(f));
        } else if (s === void 0) {
          var d = o.get(c), h = d == null ? void 0 : d.v;
          if (d !== void 0 && h !== F)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return s;
      },
      has(l, c) {
        var h;
        if (c === we)
          return !0;
        var s = o.get(c), f = s !== void 0 && s.v !== F || Reflect.has(l, c);
        if (s !== void 0 || x !== null && (!f || (h = Te(l, c)) != null && h.writable)) {
          s === void 0 && (s = Y(f ? je(l[c], u) : F), o.set(c, s));
          var d = m(s);
          if (d === F)
            return !1;
        }
        return f;
      },
      set(l, c, s, f) {
        var E;
        var d = o.get(c), h = c in l;
        if (i && c === "length")
          for (var p = s; p < /** @type {Source<number>} */
          d.v; p += 1) {
            var _ = o.get(p + "");
            _ !== void 0 ? R(_, F) : p in l && (_ = Y(F), o.set(p + "", _));
          }
        d === void 0 ? (!h || (E = Te(l, c)) != null && E.writable) && (d = Y(void 0), R(d, je(s, u)), o.set(c, d)) : (h = d.v !== F, R(d, je(s, u)));
        var b = Reflect.getOwnPropertyDescriptor(l, c);
        if (b != null && b.set && b.set.call(f, s), !h) {
          if (i && typeof c == "string") {
            var g = (
              /** @type {Source<number>} */
              o.get("length")
            ), y = Number(c);
            Number.isInteger(y) && y >= g.v && R(g, y + 1);
          }
          kn(a);
        }
        return !0;
      },
      ownKeys(l) {
        m(a);
        var c = Reflect.ownKeys(l).filter((d) => {
          var h = o.get(d);
          return h === void 0 || h.v !== F;
        });
        for (var [s, f] of o)
          f.v !== F && !(s in l) && c.push(s);
        return c;
      },
      setPrototypeOf() {
        Ai();
      }
    }
  );
}
function kn(e, t = 1) {
  R(e, e.v + t);
}
var $n, ur, dr;
function Zi() {
  if ($n === void 0) {
    $n = window;
    var e = Element.prototype, t = Node.prototype;
    ur = Te(t, "firstChild").get, dr = Te(t, "nextSibling").get, e.__click = void 0, e.__className = "", e.__attributes = null, e.__styles = null, e.__e = void 0, Text.prototype.__t = void 0;
  }
}
function fr(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return ur.call(e);
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
  return dr.call(e);
}
function j(e, t) {
  return /* @__PURE__ */ Xe(e);
}
function Ke(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Xe(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ zt(n) : n;
  }
}
function P(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ zt(r);
  return r;
}
function Qi(e) {
  e.textContent = "";
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  var t = X | he;
  x === null ? t |= ke : x.f |= ir;
  var n = M !== null && M.f & X ? (
    /** @type {Derived} */
    M
  ) : null;
  const r = {
    children: null,
    ctx: T,
    deps: null,
    equals: or,
    f: t,
    fn: e,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: n ?? x
  };
  return n !== null && (n.children ?? (n.children = [])).push(r), r;
}
// @__NO_SIDE_EFFECTS__
function eo(e) {
  const t = /* @__PURE__ */ _t(e);
  return t.equals = ln, t;
}
function hr(e) {
  var t = e.children;
  if (t !== null) {
    e.children = null;
    for (var n = 0; n < t.length; n += 1) {
      var r = t[n];
      r.f & X ? cn(
        /** @type {Derived} */
        r
      ) : _e(
        /** @type {Effect} */
        r
      );
    }
  }
}
function to(e) {
  for (var t = e.parent; t !== null; ) {
    if (!(t.f & X))
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function vr(e) {
  var t, n = x;
  oe(to(e));
  try {
    hr(e), t = Mr(e);
  } finally {
    oe(n);
  }
  return t;
}
function pr(e) {
  var t = vr(e), n = (Le || e.f & ke) && e.deps !== null ? Be : V;
  Q(e, n), e.equals(t) || (e.v = t, e.version = jr());
}
function cn(e) {
  hr(e), Qe(e, 0), Q(e, nt), e.v = e.children = e.deps = e.ctx = e.reactions = null;
}
function _r(e) {
  x === null && M === null && Di(), M !== null && M.f & ke && Ti(), fn && Li();
}
function no(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function He(e, t, n, r = !0) {
  var o = (e & tt) !== 0, i = x, a = {
    ctx: T,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: e | he,
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
    var u = De;
    try {
      xn(!0), it(a), a.f |= Si;
    } catch (s) {
      throw _e(a), s;
    } finally {
      xn(u);
    }
  } else t !== null && Tt(a);
  var l = n && a.deps === null && a.first === null && a.nodes_start === null && a.teardown === null && (a.f & ir) === 0;
  if (!l && !o && r && (i !== null && no(a, i), M !== null && M.f & X)) {
    var c = (
      /** @type {Derived} */
      M
    );
    (c.children ?? (c.children = [])).push(a);
  }
  return a;
}
function gr(e) {
  const t = He(et, null, !1);
  return Q(t, V), t.teardown = e, t;
}
function Kt(e) {
  _r();
  var t = x !== null && (x.f & Z) !== 0 && T !== null && !T.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      T
    );
    (n.e ?? (n.e = [])).push({
      fn: e,
      effect: x,
      reaction: M
    });
  } else {
    var r = un(e);
    return r;
  }
}
function ro(e) {
  return _r(), Lt(e);
}
function io(e) {
  const t = He(tt, e, !0);
  return () => {
    _e(t);
  };
}
function un(e) {
  return He(rr, e, !1);
}
function oo(e, t) {
  var n = (
    /** @type {ComponentContextLegacy} */
    T
  ), r = { effect: null, ran: !1 };
  n.l.r1.push(r), r.effect = Lt(() => {
    e(), !r.ran && (r.ran = !0, R(n.l.r2, !0), pe(t));
  });
}
function so() {
  var e = (
    /** @type {ComponentContextLegacy} */
    T
  );
  Lt(() => {
    if (m(e.l.r2)) {
      for (var t of e.l.r1) {
        var n = t.effect;
        n.f & V && Q(n, Be), Ne(n) && it(n), t.ran = !1;
      }
      e.l.r2.v = !1;
    }
  });
}
function Lt(e) {
  return He(et, e, !0);
}
function J(e) {
  return rt(e);
}
function rt(e, t = 0) {
  return He(et | an | t, e, !0);
}
function ye(e, t = !0) {
  return He(et | Z, e, !0, t);
}
function mr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = fn, r = M;
    Cn(!0), ve(null);
    try {
      t.call(null);
    } finally {
      Cn(n), ve(r);
    }
  }
}
function br(e) {
  var t = e.deriveds;
  if (t !== null) {
    e.deriveds = null;
    for (var n = 0; n < t.length; n += 1)
      cn(t[n]);
  }
}
function wr(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    var r = n.next;
    _e(n, t), n = r;
  }
}
function ao(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    t.f & Z || _e(t), t = n;
  }
}
function _e(e, t = !0) {
  var n = !1;
  if ((t || e.f & ji) && e.nodes_start !== null) {
    for (var r = e.nodes_start, o = e.nodes_end; r !== null; ) {
      var i = r === o ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ zt(r)
      );
      r.remove(), r = i;
    }
    n = !0;
  }
  wr(e, t && !n), br(e), Qe(e, 0), Q(e, nt);
  var a = e.transitions;
  if (a !== null)
    for (const l of a)
      l.stop();
  mr(e);
  var u = e.parent;
  u !== null && u.first !== null && yr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.parent = e.fn = e.nodes_start = e.nodes_end = null;
}
function yr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function gt(e, t) {
  var n = [];
  dn(e, n, !0), kr(n, () => {
    _e(e), t && t();
  });
}
function kr(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var o of e)
      o.out(r);
  } else
    t();
}
function dn(e, t, n) {
  if (!(e.f & ne)) {
    if (e.f ^= ne, e.transitions !== null)
      for (const a of e.transitions)
        (a.is_global || n) && t.push(a);
    for (var r = e.first; r !== null; ) {
      var o = r.next, i = (r.f & jt) !== 0 || (r.f & Z) !== 0;
      dn(r, t, i ? n : !1), r = o;
    }
  }
}
function mt(e) {
  $r(e, !0);
}
function $r(e, t) {
  if (e.f & ne) {
    Ne(e) && it(e), e.f ^= ne;
    for (var n = e.first; n !== null; ) {
      var r = n.next, o = (n.f & jt) !== 0 || (n.f & Z) !== 0;
      $r(n, o ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let bt = !1, Gt = [];
function xr() {
  bt = !1;
  const e = Gt.slice();
  Gt = [], vt(e);
}
function Cr(e) {
  bt || (bt = !0, queueMicrotask(xr)), Gt.push(e);
}
function lo() {
  bt && xr();
}
function co(e) {
  throw new Error("lifecycle_outside_component");
}
const Sr = 0, uo = 1;
let ut = Sr, Ze = !1, De = !1, fn = !1;
function xn(e) {
  De = e;
}
function Cn(e) {
  fn = e;
}
let be = [], Pe = 0;
let M = null;
function ve(e) {
  M = e;
}
let x = null;
function oe(e) {
  x = e;
}
let re = null;
function fo(e) {
  re = e;
}
let O = null, U = 0, de = null;
function ho(e) {
  de = e;
}
let Er = 0, Le = !1, T = null;
function jr() {
  return ++Er;
}
function hn() {
  return !Oe || T !== null && T.l === null;
}
function Ne(e) {
  var a, u;
  var t = e.f;
  if (t & he)
    return !0;
  if (t & Be) {
    var n = e.deps, r = (t & ke) !== 0;
    if (n !== null) {
      var o;
      if (t & pt) {
        for (o = 0; o < n.length; o++)
          ((a = n[o]).reactions ?? (a.reactions = [])).push(e);
        e.f ^= pt;
      }
      for (o = 0; o < n.length; o++) {
        var i = n[o];
        if (Ne(
          /** @type {Derived} */
          i
        ) && pr(
          /** @type {Derived} */
          i
        ), r && x !== null && !Le && !((u = i == null ? void 0 : i.reactions) != null && u.includes(e)) && (i.reactions ?? (i.reactions = [])).push(e), i.version > e.version)
          return !0;
      }
    }
    r || Q(e, V);
  }
  return !1;
}
function vo(e, t, n) {
  throw e;
}
function Mr(e) {
  var d;
  var t = O, n = U, r = de, o = M, i = Le, a = re, u = T, l = e.f;
  O = /** @type {null | Value[]} */
  null, U = 0, de = null, M = l & (Z | tt) ? null : e, Le = !De && (l & ke) !== 0, re = null, T = e.ctx;
  try {
    var c = (
      /** @type {Function} */
      (0, e.fn)()
    ), s = e.deps;
    if (O !== null) {
      var f;
      if (Qe(e, U), s !== null && U > 0)
        for (s.length = U + O.length, f = 0; f < O.length; f++)
          s[U + f] = O[f];
      else
        e.deps = s = O;
      if (!Le)
        for (f = U; f < s.length; f++)
          ((d = s[f]).reactions ?? (d.reactions = [])).push(e);
    } else s !== null && U < s.length && (Qe(e, U), s.length = U);
    return c;
  } finally {
    O = t, U = n, de = r, M = o, Le = i, re = a, T = u;
  }
}
function po(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = n.indexOf(e);
    if (r !== -1) {
      var o = n.length - 1;
      o === 0 ? n = t.reactions = null : (n[r] = n[o], n.pop());
    }
  }
  n === null && t.f & X && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (O === null || !O.includes(t)) && (Q(t, Be), t.f & (ke | pt) || (t.f ^= pt), Qe(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Qe(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      po(e, n[r]);
}
function it(e) {
  var t = e.f;
  if (!(t & nt)) {
    Q(e, V);
    var n = x;
    x = e;
    try {
      t & an ? ao(e) : wr(e), br(e), mr(e);
      var r = Mr(e);
      e.teardown = typeof r == "function" ? r : null, e.version = Er;
    } catch (o) {
      vo(
        /** @type {Error} */
        o
      );
    } finally {
      x = n;
    }
  }
}
function zr() {
  Pe > 1e3 && (Pe = 0, Pi()), Pe++;
}
function Lr(e) {
  var t = e.length;
  if (t !== 0) {
    zr();
    var n = De;
    De = !0;
    try {
      for (var r = 0; r < t; r++) {
        var o = e[r];
        o.f & V || (o.f ^= V);
        var i = [];
        Tr(o, i), _o(i);
      }
    } finally {
      De = n;
    }
  }
}
function _o(e) {
  var t = e.length;
  if (t !== 0)
    for (var n = 0; n < t; n++) {
      var r = e[n];
      !(r.f & (nt | ne)) && Ne(r) && (it(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? yr(r) : r.fn = null));
    }
}
function go() {
  if (Ze = !1, Pe > 1001)
    return;
  const e = be;
  be = [], Lr(e), Ze || (Pe = 0);
}
function Tt(e) {
  ut === Sr && (Ze || (Ze = !0, queueMicrotask(go)));
  for (var t = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (n & (tt | Z)) {
      if (!(n & V)) return;
      t.f ^= V;
    }
  }
  be.push(t);
}
function Tr(e, t) {
  var n = e.first, r = [];
  e: for (; n !== null; ) {
    var o = n.f, i = (o & Z) !== 0, a = i && (o & V) !== 0;
    if (!a && !(o & ne))
      if (o & et) {
        i ? n.f ^= V : Ne(n) && it(n);
        var u = n.first;
        if (u !== null) {
          n = u;
          continue;
        }
      } else o & rr && r.push(n);
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
  for (var s = 0; s < r.length; s++)
    u = r[s], t.push(u), Tr(u, t);
}
function Dr(e) {
  var t = ut, n = be;
  try {
    zr();
    const o = [];
    ut = uo, be = o, Ze = !1, Lr(n);
    var r = e == null ? void 0 : e();
    return lo(), (be.length > 0 || o.length > 0) && Dr(), Pe = 0, r;
  } finally {
    ut = t, be = n;
  }
}
async function Vt() {
  await Promise.resolve(), Dr();
}
function m(e) {
  var s;
  var t = e.f, n = (t & X) !== 0;
  if (n && t & nt) {
    var r = vr(
      /** @type {Derived} */
      e
    );
    return cn(
      /** @type {Derived} */
      e
    ), r;
  }
  if (M !== null) {
    re !== null && re.includes(e) && Bi();
    var o = M.deps;
    O === null && o !== null && o[U] === e ? U++ : O === null ? O = [e] : O.push(e), de !== null && x !== null && x.f & V && !(x.f & Z) && de.includes(e) && (Q(x, he), Tt(x));
  } else if (n && /** @type {Derived} */
  e.deps === null)
    for (var i = (
      /** @type {Derived} */
      e
    ), a = i.parent, u = i; a !== null; )
      if (a.f & X) {
        var l = (
          /** @type {Derived} */
          a
        );
        u = l, a = l.parent;
      } else {
        var c = (
          /** @type {Effect} */
          a
        );
        (s = c.deriveds) != null && s.includes(u) || (c.deriveds ?? (c.deriveds = [])).push(u);
        break;
      }
  return n && (i = /** @type {Derived} */
  e, Ne(i) && pr(i)), e.v;
}
function pe(e) {
  const t = M;
  try {
    return M = null, e();
  } finally {
    M = t;
  }
}
const mo = ~(he | Be | V);
function Q(e, t) {
  e.f = e.f & mo | t;
}
function Dt(e, t = !1, n) {
  T = {
    p: T,
    c: null,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  }, Oe && !t && (T.l = {
    s: null,
    u: null,
    r1: [],
    r2: Y(!1)
  });
}
function Pt(e) {
  const t = T;
  if (t !== null) {
    const a = t.e;
    if (a !== null) {
      var n = x, r = M;
      t.e = null;
      try {
        for (var o = 0; o < a.length; o++) {
          var i = a[o];
          oe(i.effect), ve(i.reaction), un(i.fn);
        }
      } finally {
        oe(n), ve(r);
      }
    }
    T = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function bo(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (we in e)
      Yt(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && we in n && Yt(n);
      }
  }
}
function Yt(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        Yt(e[r], t);
      } catch {
      }
    const n = ht(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = nr(n);
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
function wo(e) {
  var t = M, n = x;
  ve(null), oe(null);
  try {
    return e();
  } finally {
    ve(t), oe(n);
  }
}
const yo = /* @__PURE__ */ new Set(), Sn = /* @__PURE__ */ new Set();
function ko(e, t, n, r) {
  function o(i) {
    if (r.capture || Ge.call(t, i), !i.cancelBubble)
      return wo(() => n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Cr(() => {
    t.addEventListener(e, o, r);
  }) : t.addEventListener(e, o, r), o;
}
function Ye(e, t, n, r, o) {
  var i = { capture: r, passive: o }, a = ko(e, t, n, i);
  (t === document.body || t === window || t === document) && gr(() => {
    t.removeEventListener(e, a, i);
  });
}
function Ge(e) {
  var y;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, o = ((y = e.composedPath) == null ? void 0 : y.call(e)) || [], i = (
    /** @type {null | Element} */
    o[0] || e.target
  ), a = 0, u = e.__root;
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
    l <= c && (a = l);
  }
  if (i = /** @type {Element} */
  o[a] || e.target, i !== t) {
    ki(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var s = M, f = x;
    ve(null), oe(null);
    try {
      for (var d, h = []; i !== null; ) {
        var p = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var _ = i["__" + r];
          if (_ !== void 0 && !/** @type {any} */
          i.disabled)
            if (on(_)) {
              var [b, ...g] = _;
              b.apply(i, [e, ...g]);
            } else
              _.call(i, e);
        } catch (E) {
          d ? h.push(E) : d = E;
        }
        if (e.cancelBubble || p === t || p === null)
          break;
        i = p;
      }
      if (d) {
        for (let E of h)
          queueMicrotask(() => {
            throw E;
          });
        throw d;
      }
    } finally {
      e.__root = t, delete e.currentTarget, ve(s), oe(f);
    }
  }
}
function Pr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function wt(e, t) {
  var n = (
    /** @type {Effect} */
    x
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function W(e, t) {
  var n = (t & Ji) !== 0, r = (t & Xi) !== 0, o, i = !e.startsWith("<!>");
  return () => {
    o === void 0 && (o = Pr(i ? e : "<!>" + e), n || (o = /** @type {Node} */
    /* @__PURE__ */ Xe(o)));
    var a = (
      /** @type {TemplateNode} */
      r ? document.importNode(o, !0) : o.cloneNode(!0)
    );
    if (n) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xe(a)
      ), l = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      wt(u, l);
    } else
      wt(a, a);
    return a;
  };
}
function En() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = fr();
  return e.append(t, n), wt(t, n), e;
}
function N(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const $o = ["touchstart", "touchmove"];
function xo(e) {
  return $o.includes(e);
}
function te(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n == null ? "" : n + "");
}
function Co(e, t) {
  return So(e, t);
}
const Se = /* @__PURE__ */ new Map();
function So(e, { target: t, anchor: n, props: r = {}, events: o, context: i, intro: a = !0 }) {
  Zi();
  var u = /* @__PURE__ */ new Set(), l = (f) => {
    for (var d = 0; d < f.length; d++) {
      var h = f[d];
      if (!u.has(h)) {
        u.add(h);
        var p = xo(h);
        t.addEventListener(h, Ge, { passive: p });
        var _ = Se.get(h);
        _ === void 0 ? (document.addEventListener(h, Ge, { passive: p }), Se.set(h, 1)) : Se.set(h, _ + 1);
      }
    }
  };
  l(sn(yo)), Sn.add(l);
  var c = void 0, s = io(() => {
    var f = n ?? t.appendChild(fr());
    return ye(() => {
      if (i) {
        Dt({});
        var d = (
          /** @type {ComponentContext} */
          T
        );
        d.c = i;
      }
      o && (r.$$events = o), c = e(f, r) || {}, i && Pt();
    }), () => {
      var p;
      for (var d of u) {
        t.removeEventListener(d, Ge);
        var h = (
          /** @type {number} */
          Se.get(d)
        );
        --h === 0 ? (document.removeEventListener(d, Ge), Se.delete(d)) : Se.set(d, h);
      }
      Sn.delete(l), jn.delete(c), f !== n && ((p = f.parentNode) == null || p.removeChild(f));
    };
  });
  return jn.set(c, s), c;
}
let jn = /* @__PURE__ */ new WeakMap();
function Me(e, t, n, r = null, o = !1) {
  var i = e, a = null, u = null, l = null, c = o ? jt : 0;
  rt(() => {
    l !== (l = !!t()) && (l ? (a ? mt(a) : a = ye(() => n(i)), u && gt(u, () => {
      u = null;
    })) : (u ? mt(u) : r && (u = ye(() => r(i))), a && gt(a, () => {
      a = null;
    })));
  }, c);
}
function Rr(e, t) {
  return t;
}
function Eo(e, t, n, r) {
  for (var o = [], i = t.length, a = 0; a < i; a++)
    dn(t[a].e, o, !0);
  var u = i > 0 && o.length === 0 && n !== null;
  if (u) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Qi(l), l.append(
      /** @type {Element} */
      n
    ), r.clear(), le(e, t[0].prev, t[i - 1].next);
  }
  kr(o, () => {
    for (var c = 0; c < i; c++) {
      var s = t[c];
      u || (r.delete(s.k), le(e, s.prev, s.next)), _e(s.e, !u);
    }
  });
}
function Ir(e, t, n, r, o, i = null) {
  var a = e, u = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, l = null, c = !1;
  rt(() => {
    var s = n(), f = on(s) ? s : s == null ? [] : sn(s), d = f.length;
    if (!(c && d === 0)) {
      c = d === 0;
      {
        var h = (
          /** @type {Effect} */
          M
        );
        jo(f, u, a, o, t, (h.f & ne) !== 0, r);
      }
      i !== null && (d === 0 ? l ? mt(l) : l = ye(() => i(a)) : l !== null && gt(l, () => {
        l = null;
      })), n();
    }
  });
}
function jo(e, t, n, r, o, i, a) {
  var u = e.length, l = t.items, c = t.first, s = c, f, d = null, h = [], p = [], _, b, g, y;
  for (y = 0; y < u; y += 1) {
    if (_ = e[y], b = a(_, y), g = l.get(b), g === void 0) {
      var E = s ? (
        /** @type {TemplateNode} */
        s.e.nodes_start
      ) : n;
      d = zo(
        E,
        t,
        d,
        d === null ? t.first : d.next,
        _,
        b,
        y,
        r,
        o
      ), l.set(b, d), h = [], p = [], s = d.next;
      continue;
    }
    if (Mo(g, _, y), g.e.f & ne && mt(g.e), g !== s) {
      if (f !== void 0 && f.has(g)) {
        if (h.length < p.length) {
          var L = p[0], C;
          d = L.prev;
          var A = h[0], H = h[h.length - 1];
          for (C = 0; C < h.length; C += 1)
            Mn(h[C], L, n);
          for (C = 0; C < p.length; C += 1)
            f.delete(p[C]);
          le(t, A.prev, H.next), le(t, d, A), le(t, H, L), s = L, d = H, y -= 1, h = [], p = [];
        } else
          f.delete(g), Mn(g, s, n), le(t, g.prev, g.next), le(t, g, d === null ? t.first : d.next), le(t, d, g), d = g;
        continue;
      }
      for (h = [], p = []; s !== null && s.k !== b; )
        (i || !(s.e.f & ne)) && (f ?? (f = /* @__PURE__ */ new Set())).add(s), p.push(s), s = s.next;
      if (s === null)
        continue;
      g = s;
    }
    h.push(g), d = g, s = g.next;
  }
  if (s !== null || f !== void 0) {
    for (var z = f === void 0 ? [] : sn(f); s !== null; )
      (i || !(s.e.f & ne)) && z.push(s), s = s.next;
    var ee = z.length;
    if (ee > 0) {
      var ge = null;
      Eo(t, z, ge, l);
    }
  }
  x.first = t.first && t.first.e, x.last = d && d.e;
}
function Mo(e, t, n, r) {
  ar(e.v, t), e.i = n;
}
function zo(e, t, n, r, o, i, a, u, l) {
  var c = (l & Vi) !== 0, s = (l & Ui) === 0, f = c ? s ? /* @__PURE__ */ Mt(o) : Y(o) : o, d = l & Fi ? Y(a) : a, h = {
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
    return h.e = ye(() => u(e, f, d), cr), h.e.prev = n && n.e, h.e.next = r && r.e, n === null ? t.first = h : (n.next = h, n.e.next = h.e), r !== null && (r.prev = h, r.e.prev = h.e), h;
  } finally {
  }
}
function Mn(e, t, n) {
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
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ zt(i)
    );
    o.before(i), i = a;
  }
}
function le(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function Jt(e, t, n, r, o) {
  var i = e, a = "", u;
  rt(() => {
    a !== (a = t() ?? "") && (u !== void 0 && (_e(u), u = void 0), a !== "" && (u = ye(() => {
      var l = a + "", c = Pr(l);
      wt(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xe(c),
        /** @type {TemplateNode} */
        c.lastChild
      ), i.before(c);
    })));
  });
}
function Lo(e, t, n) {
  var r = e, o, i;
  rt(() => {
    o !== (o = t()) && (i && (gt(i), i = null), o && (i = ye(() => n(r, o))));
  }, jt);
}
function yt(e, t, n, r) {
  var o = e.__attributes ?? (e.__attributes = {});
  o[t] !== (o[t] = n) && (t === "style" && "__styles" in e && (e.__styles = {}), t === "loading" && (e[zi] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && To(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
var zn = /* @__PURE__ */ new Map();
function To(e) {
  var t = zn.get(e.nodeName);
  if (t) return t;
  zn.set(e.nodeName, t = []);
  for (var n, r = ht(e), o = Element.prototype; o !== r; ) {
    n = nr(r);
    for (var i in n)
      n[i].set && t.push(i);
    r = ht(r);
  }
  return t;
}
function Do(e, t) {
  var n = e.__className, r = Po(t);
  (n !== r || cr) && (t == null ? e.removeAttribute("class") : e.className = r, e.__className = r);
}
function Po(e) {
  return e ?? "";
}
function Ro(e, t, n) {
  if (n) {
    if (e.classList.contains(t)) return;
    e.classList.add(t);
  } else {
    if (!e.classList.contains(t)) return;
    e.classList.remove(t);
  }
}
function Ln(e, t) {
  return e === t || (e == null ? void 0 : e[we]) === t;
}
function st(e = {}, t, n, r) {
  return un(() => {
    var o, i;
    return Lt(() => {
      o = i, i = [], pe(() => {
        e !== n(...i) && (t(e, ...i), o && Ln(n(...o), e) && t(null, ...o));
      });
    }), () => {
      Cr(() => {
        i && Ln(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
function vn(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    T
  ), n = t.l.u;
  if (!n) return;
  let r = () => bo(t.s);
  if (e) {
    let o = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const a = /* @__PURE__ */ _t(() => {
      let u = !1;
      const l = t.s;
      for (const c in l)
        l[c] !== i[c] && (i[c] = l[c], u = !0);
      return u && o++, o;
    });
    r = () => m(a);
  }
  n.b.length && ro(() => {
    Tn(t, r), vt(n.b);
  }), Kt(() => {
    const o = pe(() => n.m.map(Ci));
    return () => {
      for (const i of o)
        typeof i == "function" && i();
    };
  }), n.a.length && Kt(() => {
    Tn(t, r), vt(n.a);
  });
}
function Tn(e, t) {
  if (e.l.s)
    for (const n of e.l.s) m(n);
  t();
}
function Ar(e, t, n) {
  if (e == null)
    return t(void 0), n && n(void 0), ue;
  const r = pe(
    () => e.subscribe(
      t,
      // @ts-expect-error
      n
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
let at = !1;
function Xt(e, t, n) {
  const r = n[t] ?? (n[t] = {
    store: null,
    source: /* @__PURE__ */ Mt(void 0),
    unsubscribe: ue
  });
  if (r.store !== e)
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = ue;
    else {
      var o = !0;
      r.unsubscribe = Ar(e, (i) => {
        o ? r.source.v = i : R(r.source, i);
      }), o = !1;
    }
  return m(r.source);
}
function Io(e, t) {
  return e.set(t), t;
}
function Br() {
  const e = {};
  return gr(() => {
    for (var t in e)
      e[t].unsubscribe();
  }), e;
}
function Ao(e) {
  var t = at;
  try {
    return at = !1, [e(), at];
  } finally {
    at = t;
  }
}
function Dn(e) {
  for (var t = x, n = x; t !== null && !(t.f & (Z | tt)); )
    t = t.parent;
  try {
    return oe(t), e();
  } finally {
    oe(n);
  }
}
function q(e, t, n, r) {
  var H;
  var o = (n & qi) !== 0, i = !Oe || (n & Wi) !== 0, a = (n & Gi) !== 0, u = (n & Yi) !== 0, l = !1, c;
  a ? [c, l] = Ao(() => (
    /** @type {V} */
    e[t]
  )) : c = /** @type {V} */
  e[t];
  var s = we in e || Mi in e, f = ((H = Te(e, t)) == null ? void 0 : H.set) ?? (s && a && t in e ? (z) => e[t] = z : void 0), d = (
    /** @type {V} */
    r
  ), h = !0, p = !1, _ = () => (p = !0, h && (h = !1, u ? d = pe(
    /** @type {() => V} */
    r
  ) : d = /** @type {V} */
  r), d);
  c === void 0 && r !== void 0 && (f && i && Ri(), c = _(), f && f(c));
  var b;
  if (i)
    b = () => {
      var z = (
        /** @type {V} */
        e[t]
      );
      return z === void 0 ? _() : (h = !0, p = !1, z);
    };
  else {
    var g = Dn(
      () => (o ? _t : eo)(() => (
        /** @type {V} */
        e[t]
      ))
    );
    g.f |= Ei, b = () => {
      var z = m(g);
      return z !== void 0 && (d = /** @type {V} */
      void 0), z === void 0 ? d : z;
    };
  }
  if (!(n & Ki))
    return b;
  if (f) {
    var y = e.$$legacy;
    return function(z, ee) {
      return arguments.length > 0 ? ((!i || !ee || y || l) && f(ee ? b() : z), z) : b();
    };
  }
  var E = !1, L = !1, C = /* @__PURE__ */ Mt(c), A = Dn(
    () => /* @__PURE__ */ _t(() => {
      var z = b(), ee = m(C);
      return E ? (E = !1, L = !0, ee) : (L = !1, C.v = z);
    })
  );
  return o || (A.equals = ln), function(z, ee) {
    if (arguments.length > 0) {
      const ge = ee ? m(A) : i && a ? je(z) : z;
      return A.equals(ge) || (E = !0, R(C, ge), p && d !== void 0 && (d = ge), pe(() => m(A))), z;
    }
    return m(A);
  };
}
function Bo(e) {
  T === null && co(), Oe && T.l !== null ? Oo(T).m.push(e) : Kt(() => {
    const t = pe(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Oo(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
const Ho = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Ho);
Hi();
const Ee = [];
function No(e, t) {
  return {
    subscribe: pn(e, t).subscribe
  };
}
function pn(e, t = ue) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function o(u) {
    if (sr(e, u) && (e = u, n)) {
      const l = !Ee.length;
      for (const c of r)
        c[1](), Ee.push(c, e);
      if (l) {
        for (let c = 0; c < Ee.length; c += 2)
          Ee[c][0](Ee[c + 1]);
        Ee.length = 0;
      }
    }
  }
  function i(u) {
    o(u(
      /** @type {T} */
      e
    ));
  }
  function a(u, l = ue) {
    const c = [u, l];
    return r.add(c), r.size === 1 && (n = t(o, i) || ue), u(
      /** @type {T} */
      e
    ), () => {
      r.delete(c), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: o, update: i, subscribe: a };
}
function Vo(e, t, n) {
  const r = !Array.isArray(e), o = r ? [e] : e;
  if (!o.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const i = t.length < 2;
  return No(n, (a, u) => {
    let l = !1;
    const c = [];
    let s = 0, f = ue;
    const d = () => {
      if (s)
        return;
      f();
      const p = t(r ? c[0] : c, a, u);
      i ? a(p) : f = typeof p == "function" ? p : ue;
    }, h = o.map(
      (p, _) => Ar(
        p,
        (b) => {
          c[_] = b, s &= ~(1 << _), l && d();
        },
        () => {
          s |= 1 << _;
        }
      )
    );
    return l = !0, d(), function() {
      vt(h), f(), l = !1;
    };
  });
}
function Fo(e, t) {
  const n = sessionStorage.getItem(e), r = pn(n ? JSON.parse(n) : t);
  return r.subscribe((o) => {
    sessionStorage.setItem(e, JSON.stringify(o));
  }), r;
}
const ze = Fo("messages", []), Uo = {
  en: {
    "tooltip.clear_history_msg": "Clear conversation history",
    "tooltip.minimize": "Minimize",
    "msg.error_loading_component": "Error loading component",
    "tool.price": "Price"
  },
  pl: {
    "tooltip.clear_history_msg": "Wyczyść historię rozmowy",
    "tooltip.minimize": "Minimalizuj",
    "msg.error_loading_component": "Błąd ładowania komponentu",
    "tool.price": "Cena"
  }
}, Or = pn("en");
function qo(e, t, n) {
  if (!t) throw new Error("no key provided to $t()");
  if (!e) throw new Error(`no translation for key "${t}"`);
  let r = Uo[e][t];
  if (!r) throw new Error(`no translation found for ${e}.${t}`);
  return Object.keys(n).map((o) => {
    const i = new RegExp(`{{${o}}}`, "g");
    r = r.replace(i, n[o]);
  }), r;
}
const Hr = Vo(
  Or,
  (e) => (t, n = {}) => qo(e, t, n)
);
function Nr(e) {
  return e && e.__esModule ? e.default : e;
}
function G(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Rt, w, Vr, Je, Fr, Pn, kt = {}, Ur = [], Wo = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function ce(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function qr(e) {
  var t = e.parentNode;
  t && t.removeChild(e);
}
function Zt(e, t, n) {
  var r, o, i, a = {};
  for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : a[i] = t[i];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? Rt.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) a[i] === void 0 && (a[i] = e.defaultProps[i]);
  return dt(e, a, r, o, null);
}
function dt(e, t, n, r, o) {
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
    __v: o ?? ++Vr
  };
  return o == null && w.vnode != null && w.vnode(i), i;
}
function se() {
  return {
    current: null
  };
}
function Ie(e) {
  return e.children;
}
function ie(e, t) {
  this.props = e, this.context = t;
}
function Ae(e, t) {
  if (t == null) return e.__ ? Ae(e.__, e.__.__k.indexOf(e) + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Ae(e) : null;
}
function Wr(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return Wr(e);
  }
}
function Rn(e) {
  (!e.__d && (e.__d = !0) && Je.push(e) && !$t.__r++ || Pn !== w.debounceRendering) && ((Pn = w.debounceRendering) || Fr)($t);
}
function $t() {
  for (var e; $t.__r = Je.length; ) e = Je.sort(function(t, n) {
    return t.__v.__b - n.__v.__b;
  }), Je = [], e.some(function(t) {
    var n, r, o, i, a, u;
    t.__d && (a = (i = (n = t).__v).__e, (u = n.__P) && (r = [], (o = ce({}, i)).__v = i.__v + 1, _n(u, i, o, n.__n, u.ownerSVGElement !== void 0, i.__h != null ? [
      a
    ] : null, r, a ?? Ae(i), i.__h), Jr(r, i), i.__e != a && Wr(i)));
  });
}
function Kr(e, t, n, r, o, i, a, u, l, c) {
  var s, f, d, h, p, _, b, g = r && r.__k || Ur, y = g.length;
  for (n.__k = [], s = 0; s < t.length; s++) if ((h = n.__k[s] = (h = t[s]) == null || typeof h == "boolean" ? null : typeof h == "string" || typeof h == "number" || typeof h == "bigint" ? dt(null, h, null, null, h) : Array.isArray(h) ? dt(Ie, {
    children: h
  }, null, null, null) : h.__b > 0 ? dt(h.type, h.props, h.key, null, h.__v) : h) != null) {
    if (h.__ = n, h.__b = n.__b + 1, (d = g[s]) === null || d && h.key == d.key && h.type === d.type) g[s] = void 0;
    else for (f = 0; f < y; f++) {
      if ((d = g[f]) && h.key == d.key && h.type === d.type) {
        g[f] = void 0;
        break;
      }
      d = null;
    }
    _n(e, h, d = d || kt, o, i, a, u, l, c), p = h.__e, (f = h.ref) && d.ref != f && (b || (b = []), d.ref && b.push(d.ref, null, h), b.push(f, h.__c || p, h)), p != null ? (_ == null && (_ = p), typeof h.type == "function" && h.__k === d.__k ? h.__d = l = Gr(h, l, e) : l = Yr(e, h, d, g, p, l), typeof n.type == "function" && (n.__d = l)) : l && d.__e == l && l.parentNode != e && (l = Ae(d));
  }
  for (n.__e = _, s = y; s--; ) g[s] != null && (typeof n.type == "function" && g[s].__e != null && g[s].__e == n.__d && (n.__d = Ae(r, s + 1)), Zr(g[s], g[s]));
  if (b) for (s = 0; s < b.length; s++) Xr(b[s], b[++s], b[++s]);
}
function Gr(e, t, n) {
  for (var r, o = e.__k, i = 0; o && i < o.length; i++) (r = o[i]) && (r.__ = e, t = typeof r.type == "function" ? Gr(r, t, n) : Yr(n, r, r, o, r.__e, t));
  return t;
}
function xt(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Array.isArray(e) ? e.some(function(n) {
    xt(n, t);
  }) : t.push(e)), t;
}
function Yr(e, t, n, r, o, i) {
  var a, u, l;
  if (t.__d !== void 0) a = t.__d, t.__d = void 0;
  else if (n == null || o != i || o.parentNode == null) e: if (i == null || i.parentNode !== e) e.appendChild(o), a = null;
  else {
    for (u = i, l = 0; (u = u.nextSibling) && l < r.length; l += 2) if (u == o) break e;
    e.insertBefore(o, i), a = i;
  }
  return a !== void 0 ? a : o.nextSibling;
}
function Ko(e, t, n, r, o) {
  var i;
  for (i in n) i === "children" || i === "key" || i in t || Ct(e, i, null, n[i], r);
  for (i in t) o && typeof t[i] != "function" || i === "children" || i === "key" || i === "value" || i === "checked" || n[i] === t[i] || Ct(e, i, t[i], n[i], r);
}
function In(e, t, n) {
  t[0] === "-" ? e.setProperty(t, n) : e[t] = n == null ? "" : typeof n != "number" || Wo.test(t) ? n : n + "px";
}
function Ct(e, t, n, r, o) {
  var i;
  e: if (t === "style")
    if (typeof n == "string") e.style.cssText = n;
    else {
      if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || In(e.style, t, "");
      if (n) for (t in n) r && n[t] === r[t] || In(e.style, t, n[t]);
    }
  else if (t[0] === "o" && t[1] === "n") i = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? r || e.addEventListener(t, i ? Bn : An, i) : e.removeEventListener(t, i ? Bn : An, i);
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
function An(e) {
  this.l[e.type + !1](w.event ? w.event(e) : e);
}
function Bn(e) {
  this.l[e.type + !0](w.event ? w.event(e) : e);
}
function _n(e, t, n, r, o, i, a, u, l) {
  var c, s, f, d, h, p, _, b, g, y, E, L = t.type;
  if (t.constructor !== void 0) return null;
  n.__h != null && (l = n.__h, u = t.__e = n.__e, t.__h = null, i = [
    u
  ]), (c = w.__b) && c(t);
  try {
    e: if (typeof L == "function") {
      if (b = t.props, g = (c = L.contextType) && r[c.__c], y = c ? g ? g.props.value : c.__ : r, n.__c ? _ = (s = t.__c = n.__c).__ = s.__E : ("prototype" in L && L.prototype.render ? t.__c = s = new L(b, y) : (t.__c = s = new ie(b, y), s.constructor = L, s.render = Yo), g && g.sub(s), s.props = b, s.state || (s.state = {}), s.context = y, s.__n = r, f = s.__d = !0, s.__h = []), s.__s == null && (s.__s = s.state), L.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = ce({}, s.__s)), ce(s.__s, L.getDerivedStateFromProps(b, s.__s))), d = s.props, h = s.state, f) L.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), s.componentDidMount != null && s.__h.push(s.componentDidMount);
      else {
        if (L.getDerivedStateFromProps == null && b !== d && s.componentWillReceiveProps != null && s.componentWillReceiveProps(b, y), !s.__e && s.shouldComponentUpdate != null && s.shouldComponentUpdate(b, s.__s, y) === !1 || t.__v === n.__v) {
          s.props = b, s.state = s.__s, t.__v !== n.__v && (s.__d = !1), s.__v = t, t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(C) {
            C && (C.__ = t);
          }), s.__h.length && a.push(s);
          break e;
        }
        s.componentWillUpdate != null && s.componentWillUpdate(b, s.__s, y), s.componentDidUpdate != null && s.__h.push(function() {
          s.componentDidUpdate(d, h, p);
        });
      }
      s.context = y, s.props = b, s.state = s.__s, (c = w.__r) && c(t), s.__d = !1, s.__v = t, s.__P = e, c = s.render(s.props, s.state, s.context), s.state = s.__s, s.getChildContext != null && (r = ce(ce({}, r), s.getChildContext())), f || s.getSnapshotBeforeUpdate == null || (p = s.getSnapshotBeforeUpdate(d, h)), E = c != null && c.type === Ie && c.key == null ? c.props.children : c, Kr(e, Array.isArray(E) ? E : [
        E
      ], t, n, r, o, i, a, u, l), s.base = t.__e, t.__h = null, s.__h.length && a.push(s), _ && (s.__E = s.__ = null), s.__e = !1;
    } else i == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = Go(n.__e, t, n, r, o, i, a, l);
    (c = w.diffed) && c(t);
  } catch (C) {
    t.__v = null, (l || i != null) && (t.__e = u, t.__h = !!l, i[i.indexOf(u)] = null), w.__e(C, t, n);
  }
}
function Jr(e, t) {
  w.__c && w.__c(t, e), e.some(function(n) {
    try {
      e = n.__h, n.__h = [], e.some(function(r) {
        r.call(n);
      });
    } catch (r) {
      w.__e(r, n.__v);
    }
  });
}
function Go(e, t, n, r, o, i, a, u) {
  var l, c, s, f = n.props, d = t.props, h = t.type, p = 0;
  if (h === "svg" && (o = !0), i != null) {
    for (; p < i.length; p++) if ((l = i[p]) && "setAttribute" in l == !!h && (h ? l.localName === h : l.nodeType === 3)) {
      e = l, i[p] = null;
      break;
    }
  }
  if (e == null) {
    if (h === null) return document.createTextNode(d);
    e = o ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h, d.is && d), i = null, u = !1;
  }
  if (h === null) f === d || u && e.data === d || (e.data = d);
  else {
    if (i = i && Rt.call(e.childNodes), c = (f = n.props || kt).dangerouslySetInnerHTML, s = d.dangerouslySetInnerHTML, !u) {
      if (i != null) for (f = {}, p = 0; p < e.attributes.length; p++) f[e.attributes[p].name] = e.attributes[p].value;
      (s || c) && (s && (c && s.__html == c.__html || s.__html === e.innerHTML) || (e.innerHTML = s && s.__html || ""));
    }
    if (Ko(e, d, f, o, u), s) t.__k = [];
    else if (p = t.props.children, Kr(e, Array.isArray(p) ? p : [
      p
    ], t, n, r, o && h !== "foreignObject", i, a, i ? i[0] : n.__k && Ae(n, 0), u), i != null) for (p = i.length; p--; ) i[p] != null && qr(i[p]);
    u || ("value" in d && (p = d.value) !== void 0 && (p !== f.value || p !== e.value || h === "progress" && !p) && Ct(e, "value", p, f.value, !1), "checked" in d && (p = d.checked) !== void 0 && p !== e.checked && Ct(e, "checked", p, f.checked, !1));
  }
  return e;
}
function Xr(e, t, n) {
  try {
    typeof e == "function" ? e(t) : e.current = t;
  } catch (r) {
    w.__e(r, n);
  }
}
function Zr(e, t, n) {
  var r, o;
  if (w.unmount && w.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || Xr(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (i) {
      w.__e(i, t);
    }
    r.base = r.__P = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && Zr(r[o], t, typeof e.type != "function");
  n || e.__e == null || qr(e.__e), e.__e = e.__d = void 0;
}
function Yo(e, t, n) {
  return this.constructor(e, n);
}
function Qr(e, t, n) {
  var r, o, i;
  w.__ && w.__(e, t), o = (r = typeof n == "function") ? null : n && n.__k || t.__k, i = [], _n(t, e = (!r && n || t).__k = Zt(Ie, null, [
    e
  ]), o || kt, kt, t.ownerSVGElement !== void 0, !r && n ? [
    n
  ] : o ? null : t.firstChild ? Rt.call(t.childNodes) : null, i, !r && n ? n : o ? o.__e : t.firstChild, r), Jr(i, e);
}
Rt = Ur.slice, w = {
  __e: function(e, t) {
    for (var n, r, o; t = t.__; ) if ((n = t.__c) && !n.__) try {
      if ((r = n.constructor) && r.getDerivedStateFromError != null && (n.setState(r.getDerivedStateFromError(e)), o = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), o = n.__d), o) return n.__E = n;
    } catch (i) {
      e = i;
    }
    throw e;
  }
}, Vr = 0, ie.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ce({}, this.state), typeof e == "function" && (e = e(ce({}, n), this.props)), e && ce(n, e), e != null && this.__v && (t && this.__h.push(t), Rn(this));
}, ie.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Rn(this));
}, ie.prototype.render = Ie, Je = [], Fr = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $t.__r = 0;
var Jo = 0;
function v(e, t, n, r, o) {
  var i, a, u = {};
  for (a in t) a == "ref" ? i = t[a] : u[a] = t[a];
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
    __v: --Jo,
    __source: r,
    __self: o
  };
  if (typeof e == "function" && (i = e.defaultProps)) for (a in i) u[a] === void 0 && (u[a] = i[a]);
  return w.vnode && w.vnode(l), l;
}
function Xo(e, t) {
  try {
    window.localStorage[`emoji-mart.${e}`] = JSON.stringify(t);
  } catch {
  }
}
function Zo(e) {
  try {
    const t = window.localStorage[`emoji-mart.${e}`];
    if (t) return JSON.parse(t);
  } catch {
  }
}
var fe = {
  set: Xo,
  get: Zo
};
const Ft = /* @__PURE__ */ new Map(), Qo = [
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
function es() {
  for (const { v: e, emoji: t } of Qo)
    if (ei(t)) return e;
}
function ts() {
  return !ei("🇨🇦");
}
function ei(e) {
  if (Ft.has(e)) return Ft.get(e);
  const t = ns(e);
  return Ft.set(e, t), t;
}
const ns = (() => {
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
    const i = e.getImageData(0, 0, n, t).data, a = i.length;
    let u = 0;
    for (; u < a && !i[u + 3]; u += 4) ;
    if (u >= a) return !1;
    const l = n + u / 4 % n, c = Math.floor(u / 4 / n), s = e.getImageData(l, c, 1, 1).data;
    return !(i[u] !== s[0] || i[u + 2] !== s[2] || e.measureText(o).width >= n);
  };
})();
var On = {
  latestVersion: es,
  noCountryFlags: ts
};
const Qt = [
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
let I = null;
function rs(e) {
  I || (I = fe.get("frequently") || {});
  const t = e.id || e;
  t && (I[t] || (I[t] = 0), I[t] += 1, fe.set("last", t), fe.set("frequently", I));
}
function is({ maxFrequentRows: e, perLine: t }) {
  if (!e) return [];
  I || (I = fe.get("frequently"));
  let n = [];
  if (!I) {
    I = {};
    for (let i in Qt.slice(0, t)) {
      const a = Qt[i];
      I[a] = t - i, n.push(a);
    }
    return n;
  }
  const r = e * t, o = fe.get("last");
  for (let i in I) n.push(i);
  if (n.sort((i, a) => {
    const u = I[a], l = I[i];
    return u == l ? i.localeCompare(a) : u - l;
  }), n.length > r) {
    const i = n.slice(r);
    n = n.slice(0, r);
    for (let a of i)
      a != o && delete I[a];
    o && n.indexOf(o) == -1 && (delete I[n[n.length - 1]], n.splice(-1, 1, o)), fe.set("frequently", I);
  }
  return n;
}
var ti = {
  add: rs,
  get: is,
  DEFAULTS: Qt
}, ni = {};
ni = JSON.parse('{"search":"Search","search_no_results_1":"Oh no!","search_no_results_2":"That emoji couldn’t be found","pick":"Pick an emoji…","add_custom":"Add custom emoji","categories":{"activity":"Activity","custom":"Custom","flags":"Flags","foods":"Food & Drink","frequent":"Frequently used","nature":"Animals & Nature","objects":"Objects","people":"Smileys & People","places":"Travel & Places","search":"Search Results","symbols":"Symbols"},"skins":{"1":"Default","2":"Light","3":"Medium-Light","4":"Medium","5":"Medium-Dark","6":"Dark","choose":"Choose default skin tone"}}');
var ae = {
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
let B = null, $ = null;
const Ut = {};
async function Hn(e) {
  if (Ut[e]) return Ut[e];
  const n = await (await fetch(e)).json();
  return Ut[e] = n, n;
}
let qt = null, ri = null, ii = !1;
function It(e, { caller: t } = {}) {
  return qt || (qt = new Promise((n) => {
    ri = n;
  })), e ? os(e) : t && !ii && console.warn(`\`${t}\` requires data to be initialized first. Promise will be pending until \`init\` is called.`), qt;
}
async function os(e) {
  ii = !0;
  let { emojiVersion: t, set: n, locale: r } = e;
  if (t || (t = ae.emojiVersion.value), n || (n = ae.set.value), r || (r = ae.locale.value), $)
    $.categories = $.categories.filter((l) => !l.name);
  else {
    $ = (typeof e.data == "function" ? await e.data() : e.data) || await Hn(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${t}/${n}.json`), $.emoticons = {}, $.natives = {}, $.categories.unshift({
      id: "frequent",
      emojis: []
    });
    for (const l in $.aliases) {
      const c = $.aliases[l], s = $.emojis[c];
      s && (s.aliases || (s.aliases = []), s.aliases.push(l));
    }
    $.originalCategories = $.categories;
  }
  if (B = (typeof e.i18n == "function" ? await e.i18n() : e.i18n) || (r == "en" ? /* @__PURE__ */ Nr(ni) : await Hn(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/${r}.json`)), e.custom) for (let l in e.custom) {
    l = parseInt(l);
    const c = e.custom[l], s = e.custom[l - 1];
    if (!(!c.emojis || !c.emojis.length)) {
      c.id || (c.id = `custom_${l + 1}`), c.name || (c.name = B.categories.custom), s && !c.icon && (c.target = s.target || s), $.categories.push(c);
      for (const f of c.emojis) $.emojis[f.id] = f;
    }
  }
  e.categories && ($.categories = $.originalCategories.filter((l) => e.categories.indexOf(l.id) != -1).sort((l, c) => {
    const s = e.categories.indexOf(l.id), f = e.categories.indexOf(c.id);
    return s - f;
  }));
  let o = null, i = null;
  n == "native" && (o = On.latestVersion(), i = e.noCountryFlags || On.noCountryFlags());
  let a = $.categories.length, u = !1;
  for (; a--; ) {
    const l = $.categories[a];
    if (l.id == "frequent") {
      let { maxFrequentRows: f, perLine: d } = e;
      f = f >= 0 ? f : ae.maxFrequentRows.value, d || (d = ae.perLine.value), l.emojis = ti.get({
        maxFrequentRows: f,
        perLine: d
      });
    }
    if (!l.emojis || !l.emojis.length) {
      $.categories.splice(a, 1);
      continue;
    }
    const { categoryIcons: c } = e;
    if (c) {
      const f = c[l.id];
      f && !l.icon && (l.icon = f);
    }
    let s = l.emojis.length;
    for (; s--; ) {
      const f = l.emojis[s], d = f.id ? f : $.emojis[f], h = () => {
        l.emojis.splice(s, 1);
      };
      if (!d || e.exceptEmojis && e.exceptEmojis.includes(d.id)) {
        h();
        continue;
      }
      if (o && d.version > o) {
        h();
        continue;
      }
      if (i && l.id == "flags" && !us.includes(d.id)) {
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
        ].map(([_, b]) => {
          if (_)
            return (Array.isArray(_) ? _ : [
              _
            ]).map((g) => (b ? g.split(/[-|_|\s]+/) : [
              g
            ]).map((y) => y.toLowerCase())).flat();
        }).flat().filter((_) => _ && _.trim()).join(","), d.emoticons) for (const _ of d.emoticons)
          $.emoticons[_] || ($.emoticons[_] = d.id);
        let p = 0;
        for (const _ of d.skins) {
          if (!_) continue;
          p++;
          const { native: b } = _;
          b && ($.natives[b] = d.id, d.search += `,${b}`);
          const g = p == 1 ? "" : `:skin-tone-${p}:`;
          _.shortcodes = `:${d.id}:${g}`;
        }
      }
    }
  }
  u && Re.reset(), ri();
}
function oi(e, t, n) {
  e || (e = {});
  const r = {};
  for (let o in t) r[o] = si(o, e, t, n);
  return r;
}
function si(e, t, n, r) {
  const o = n[e];
  let i = r && r.getAttribute(e) || (t[e] != null && t[e] != null ? t[e] : null);
  return o && (i != null && o.value && typeof o.value != typeof i && (typeof o.value == "boolean" ? i = i != "false" : i = o.value.constructor(i)), o.transform && i && (i = o.transform(i)), (i == null || o.choices && o.choices.indexOf(i) == -1) && (i = o.value)), i;
}
const ss = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
let en = null;
function as(e) {
  return e.id ? e : $.emojis[e] || $.emojis[$.aliases[e]] || $.emojis[$.natives[e]];
}
function ls() {
  en = null;
}
async function cs(e, { maxResults: t, caller: n } = {}) {
  if (!e || !e.trim().length) return null;
  t || (t = 90), await It(null, {
    caller: n || "SearchIndex.search"
  });
  const r = e.toLowerCase().replace(/(\w)-/, "$1 ").split(/[\s|,]+/).filter((u, l, c) => u.trim() && c.indexOf(u) == l);
  if (!r.length) return;
  let o = en || (en = Object.values($.emojis)), i, a;
  for (const u of r) {
    if (!o.length) break;
    i = [], a = {};
    for (const l of o) {
      if (!l.search) continue;
      const c = l.search.indexOf(`,${u}`);
      c != -1 && (i.push(l), a[l.id] || (a[l.id] = 0), a[l.id] += l.id == u ? 0 : c + 1);
    }
    o = i;
  }
  return i.length < 2 || (i.sort((u, l) => {
    const c = a[u.id], s = a[l.id];
    return c == s ? u.id.localeCompare(l.id) : c - s;
  }), i.length > t && (i = i.slice(0, t))), i;
}
var Re = {
  search: cs,
  get: as,
  reset: ls,
  SHORTCODES_REGEX: ss
};
const us = [
  "checkered_flag",
  "crossed_flags",
  "pirate_flag",
  "rainbow-flag",
  "transgender_flag",
  "triangular_flag_on_post",
  "waving_black_flag",
  "waving_white_flag"
];
function ds(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === t.length && e.every((n, r) => n == t[r]);
}
async function fs(e = 1) {
  for (let t in [
    ...Array(e).keys()
  ]) await new Promise(requestAnimationFrame);
}
function hs(e, { skinIndex: t = 0 } = {}) {
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
const vs = {
  activity: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ v("path", {
        d: "M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"
      })
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M16.17 337.5c0 44.98 7.565 83.54 13.98 107.9C35.22 464.3 50.46 496 174.9 496c9.566 0 19.59-.4707 29.84-1.271L17.33 307.3C16.53 317.6 16.17 327.7 16.17 337.5zM495.8 174.5c0-44.98-7.565-83.53-13.98-107.9c-4.688-17.54-18.34-31.23-36.04-35.95C435.5 27.91 392.9 16 337 16c-9.564 0-19.59 .4707-29.84 1.271l187.5 187.5C495.5 194.4 495.8 184.3 495.8 174.5zM26.77 248.8l236.3 236.3c142-36.1 203.9-150.4 222.2-221.1L248.9 26.87C106.9 62.96 45.07 177.2 26.77 248.8zM256 335.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L164.7 283.3C161.6 280.2 160 276.1 160 271.1c0-8.529 6.865-16 16-16c4.095 0 8.189 1.562 11.31 4.688l64.01 64C254.4 327.8 256 331.9 256 335.1zM304 287.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L212.7 235.3C209.6 232.2 208 228.1 208 223.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01C302.5 279.8 304 283.9 304 287.1zM256 175.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01c3.125 3.125 4.688 7.219 4.688 11.31c0 9.133-7.468 16-16 16c-4.094 0-8.189-1.562-11.31-4.688l-64.01-64.01C257.6 184.2 256 180.1 256 175.1z"
      })
    })
  },
  custom: /* @__PURE__ */ v("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    children: /* @__PURE__ */ v("path", {
      d: "M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
    })
  }),
  flags: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ v("path", {
        d: "M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"
      })
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"
      })
    })
  },
  foods: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ v("path", {
        d: "M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"
      })
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8zM372.7 116.7C369.7 119.7 368 123.8 368 128C368 131.2 368.9 134.3 370.7 136.9C372.5 139.5 374.1 141.6 377.9 142.8C380.8 143.1 384 144.3 387.1 143.7C390.2 143.1 393.1 141.6 395.3 139.3C397.6 137.1 399.1 134.2 399.7 131.1C400.3 128 399.1 124.8 398.8 121.9C397.6 118.1 395.5 116.5 392.9 114.7C390.3 112.9 387.2 111.1 384 111.1C379.8 111.1 375.7 113.7 372.7 116.7V116.7zM244.7 84.69C241.7 87.69 240 91.76 240 96C240 99.16 240.9 102.3 242.7 104.9C244.5 107.5 246.1 109.6 249.9 110.8C252.8 111.1 256 112.3 259.1 111.7C262.2 111.1 265.1 109.6 267.3 107.3C269.6 105.1 271.1 102.2 271.7 99.12C272.3 96.02 271.1 92.8 270.8 89.88C269.6 86.95 267.5 84.45 264.9 82.7C262.3 80.94 259.2 79.1 256 79.1C251.8 79.1 247.7 81.69 244.7 84.69V84.69zM116.7 116.7C113.7 119.7 112 123.8 112 128C112 131.2 112.9 134.3 114.7 136.9C116.5 139.5 118.1 141.6 121.9 142.8C124.8 143.1 128 144.3 131.1 143.7C134.2 143.1 137.1 141.6 139.3 139.3C141.6 137.1 143.1 134.2 143.7 131.1C144.3 128 143.1 124.8 142.8 121.9C141.6 118.1 139.5 116.5 136.9 114.7C134.3 112.9 131.2 111.1 128 111.1C123.8 111.1 119.7 113.7 116.7 116.7L116.7 116.7z"
      })
    })
  },
  frequent: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ v("path", {
          d: "M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z"
        }),
        /* @__PURE__ */ v("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        })
      ]
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
      })
    })
  },
  nature: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ v("path", {
          d: "M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"
        }),
        /* @__PURE__ */ v("path", {
          d: "M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"
        })
      ]
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 576 512",
      children: /* @__PURE__ */ v("path", {
        d: "M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"
      })
    })
  },
  objects: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ v("path", {
          d: "M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"
        }),
        /* @__PURE__ */ v("path", {
          d: "M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"
        })
      ]
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512",
      children: /* @__PURE__ */ v("path", {
        d: "M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"
      })
    })
  },
  people: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ v("path", {
          d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
        }),
        /* @__PURE__ */ v("path", {
          d: "M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"
        })
      ]
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 432C332.1 432 396.2 382 415.2 314.1C419.1 300.4 407.8 288 393.6 288H118.4C104.2 288 92.92 300.4 96.76 314.1C115.8 382 179.9 432 256 432V432zM176.4 160C158.7 160 144.4 174.3 144.4 192C144.4 209.7 158.7 224 176.4 224C194 224 208.4 209.7 208.4 192C208.4 174.3 194 160 176.4 160zM336.4 224C354 224 368.4 209.7 368.4 192C368.4 174.3 354 160 336.4 160C318.7 160 304.4 174.3 304.4 192C304.4 209.7 318.7 224 336.4 224z"
      })
    })
  },
  places: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ v("path", {
          d: "M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"
        }),
        /* @__PURE__ */ v("path", {
          d: "M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"
        })
      ]
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z"
      })
    })
  },
  symbols: {
    outline: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ v("path", {
        d: "M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"
      })
    }),
    solid: /* @__PURE__ */ v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: /* @__PURE__ */ v("path", {
        d: "M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"
      })
    })
  }
}, ps = {
  loupe: /* @__PURE__ */ v("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ v("path", {
      d: "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
    })
  }),
  delete: /* @__PURE__ */ v("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    children: /* @__PURE__ */ v("path", {
      d: "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
    })
  })
};
var St = {
  categories: vs,
  search: ps
};
function tn(e) {
  let { id: t, skin: n, emoji: r } = e;
  if (e.shortcodes) {
    const u = e.shortcodes.match(Re.SHORTCODES_REGEX);
    u && (t = u[1], u[2] && (n = u[2]));
  }
  if (r || (r = Re.get(t || e.native)), !r) return e.fallback;
  const o = r.skins[n - 1] || r.skins[0], i = o.src || (e.set != "native" && !e.spritesheet ? typeof e.getImageURL == "function" ? e.getImageURL(e.set, o.unified) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@15.0.1/img/${e.set}/64/${o.unified}.png` : void 0), a = typeof e.getSpritesheetURL == "function" ? e.getSpritesheetURL(e.set) : `https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@15.0.1/img/${e.set}/sheets-256/64.png`;
  return /* @__PURE__ */ v("span", {
    class: "emoji-mart-emoji",
    "data-emoji-set": e.set,
    children: i ? /* @__PURE__ */ v("img", {
      style: {
        maxWidth: e.size || "1em",
        maxHeight: e.size || "1em",
        display: "inline-block"
      },
      alt: o.native || o.shortcodes,
      src: i
    }) : e.set == "native" ? /* @__PURE__ */ v("span", {
      style: {
        fontSize: e.size,
        fontFamily: '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      },
      children: o.native
    }) : /* @__PURE__ */ v("span", {
      style: {
        display: "block",
        width: e.size,
        height: e.size,
        backgroundImage: `url(${a})`,
        backgroundSize: `${100 * $.sheet.cols}% ${100 * $.sheet.rows}%`,
        backgroundPosition: `${100 / ($.sheet.cols - 1) * o.x}% ${100 / ($.sheet.rows - 1) * o.y}%`
      }
    })
  });
}
const _s = typeof window < "u" && window.HTMLElement ? window.HTMLElement : Object;
class ai extends _s {
  static get observedAttributes() {
    return Object.keys(this.Props);
  }
  update(t = {}) {
    for (let n in t) this.attributeChangedCallback(n, null, t[n]);
  }
  attributeChangedCallback(t, n, r) {
    if (!this.component) return;
    const o = si(t, {
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
class gs extends ai {
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
var li = {
  fallback: "",
  id: "",
  native: "",
  shortcodes: "",
  size: {
    value: "",
    transform: (e) => /\D/.test(e) ? e : `${e}px`
  },
  // Shared
  set: ae.set,
  skin: ae.skin
};
class ci extends ai {
  async connectedCallback() {
    const t = oi(this.props, li, this);
    t.element = this, t.ref = (n) => {
      this.component = n;
    }, await It(), !this.disconnected && Qr(/* @__PURE__ */ v(tn, {
      ...t
    }), this);
  }
  constructor(t) {
    super(t);
  }
}
G(ci, "Props", li);
typeof customElements < "u" && !customElements.get("em-emoji") && customElements.define("em-emoji", ci);
var Nn, nn = [], Vn = w.__b, Fn = w.__r, Un = w.diffed, qn = w.__c, Wn = w.unmount;
function ms() {
  var e;
  for (nn.sort(function(t, n) {
    return t.__v.__b - n.__v.__b;
  }); e = nn.pop(); ) if (e.__P) try {
    e.__H.__h.forEach(ft), e.__H.__h.forEach(rn), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], w.__e(t, e.__v);
  }
}
w.__b = function(e) {
  Vn && Vn(e);
}, w.__r = function(e) {
  Fn && Fn(e);
  var t = e.__c.__H;
  t && (t.__h.forEach(ft), t.__h.forEach(rn), t.__h = []);
}, w.diffed = function(e) {
  Un && Un(e);
  var t = e.__c;
  t && t.__H && t.__H.__h.length && (nn.push(t) !== 1 && Nn === w.requestAnimationFrame || ((Nn = w.requestAnimationFrame) || function(n) {
    var r, o = function() {
      clearTimeout(i), Kn && cancelAnimationFrame(r), setTimeout(n);
    }, i = setTimeout(o, 100);
    Kn && (r = requestAnimationFrame(o));
  })(ms));
}, w.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(ft), n.__h = n.__h.filter(function(r) {
        return !r.__ || rn(r);
      });
    } catch (r) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], w.__e(r, n.__v);
    }
  }), qn && qn(e, t);
}, w.unmount = function(e) {
  Wn && Wn(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      ft(r);
    } catch (o) {
      t = o;
    }
  }), t && w.__e(t, n.__v));
};
var Kn = typeof requestAnimationFrame == "function";
function ft(e) {
  var t = e.__c;
  typeof t == "function" && (e.__c = void 0, t());
}
function rn(e) {
  e.__c = e.__();
}
function bs(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Gn(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function Et(e) {
  this.props = e;
}
(Et.prototype = new ie()).isPureReactComponent = !0, Et.prototype.shouldComponentUpdate = function(e, t) {
  return Gn(this.props, e) || Gn(this.state, t);
};
var Yn = w.__b;
w.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Yn && Yn(e);
};
var ws = w.__e;
w.__e = function(e, t, n) {
  if (e.then) {
    for (var r, o = t; o = o.__; ) if ((r = o.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), r.__c(e, t);
  }
  ws(e, t, n);
};
var Jn = w.unmount;
function Wt() {
  this.__u = 0, this.t = null, this.__b = null;
}
function ui(e) {
  var t = e.__.__c;
  return t && t.__e && t.__e(e);
}
function lt() {
  this.u = null, this.o = null;
}
w.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && e.__h === !0 && (e.type = null), Jn && Jn(e);
}, (Wt.prototype = new ie()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var o = ui(r.__v), i = !1, a = function() {
    i || (i = !0, n.__R = null, o ? o(u) : u());
  };
  n.__R = a;
  var u = function() {
    if (!--r.__u) {
      if (r.state.__e) {
        var c = r.state.__e;
        r.__v.__k[0] = function f(d, h, p) {
          return d && (d.__v = null, d.__k = d.__k && d.__k.map(function(_) {
            return f(_, h, p);
          }), d.__c && d.__c.__P === h && (d.__e && p.insertBefore(d.__e, d.__d), d.__c.__e = !0, d.__c.__P = p)), d;
        }(c, c.__c.__P, c.__c.__O);
      }
      var s;
      for (r.setState({
        __e: r.__b = null
      }); s = r.t.pop(); ) s.forceUpdate();
    }
  }, l = t.__h === !0;
  r.__u++ || l || r.setState({
    __e: r.__b = r.__v.__k[0]
  }), e.then(a, a);
}, Wt.prototype.componentWillUnmount = function() {
  this.t = [];
}, Wt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = function i(a, u, l) {
        return a && (a.__c && a.__c.__H && (a.__c.__H.__.forEach(function(c) {
          typeof c.__c == "function" && c.__c();
        }), a.__c.__H = null), (a = bs({}, a)).__c != null && (a.__c.__P === l && (a.__c.__P = u), a.__c = null), a.__k = a.__k && a.__k.map(function(c) {
          return i(c, u, l);
        })), a;
      }(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__e && Zt(Ie, null, e.fallback);
  return o && (o.__h = null), [
    Zt(Ie, null, t.__e ? null : e.children),
    o
  ];
};
var Xn = function(e, t, n) {
  if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size)) for (n = e.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.u = n = n[2];
  }
};
(lt.prototype = new ie()).__e = function(e) {
  var t = this, n = ui(t.__v), r = t.o.get(e);
  return r[0]++, function(o) {
    var i = function() {
      t.props.revealOrder ? (r.push(o), Xn(t, e, r)) : o();
    };
    n ? n(i) : i();
  };
}, lt.prototype.render = function(e) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t = xt(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.o.set(t[n], this.u = [
    1,
    0,
    this.u
  ]);
  return e.children;
}, lt.prototype.componentDidUpdate = lt.prototype.componentDidMount = function() {
  var e = this;
  this.o.forEach(function(t, n) {
    Xn(e, n, t);
  });
};
var ys = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ks = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, $s = typeof document < "u", xs = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(e);
};
ie.prototype.isReactComponent = {}, [
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUpdate"
].forEach(function(e) {
  Object.defineProperty(ie.prototype, e, {
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
var Zn = w.event;
function Cs() {
}
function Ss() {
  return this.cancelBubble;
}
function Es() {
  return this.defaultPrevented;
}
w.event = function(e) {
  return Zn && (e = Zn(e)), e.persist = Cs, e.isPropagationStopped = Ss, e.isDefaultPrevented = Es, e.nativeEvent = e;
};
var Qn = {
  configurable: !0,
  get: function() {
    return this.class;
  }
}, er = w.vnode;
w.vnode = function(e) {
  var t = e.type, n = e.props, r = n;
  if (typeof t == "string") {
    var o = t.indexOf("-") === -1;
    for (var i in r = {}, n) {
      var a = n[i];
      $s && i === "children" && t === "noscript" || i === "value" && "defaultValue" in n && a == null || (i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : /ondoubleclick/i.test(i) ? i = "ondblclick" : /^onchange(textarea|input)/i.test(i + t) && !xs(n.type) ? i = "oninput" : /^onfocus$/i.test(i) ? i = "onfocusin" : /^onblur$/i.test(i) ? i = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(i) ? i = i.toLowerCase() : o && ks.test(i) ? i = i.replace(/[A-Z0-9]/, "-$&").toLowerCase() : a === null && (a = void 0), r[i] = a);
    }
    t == "select" && r.multiple && Array.isArray(r.value) && (r.value = xt(n.children).forEach(function(u) {
      u.props.selected = r.value.indexOf(u.props.value) != -1;
    })), t == "select" && r.defaultValue != null && (r.value = xt(n.children).forEach(function(u) {
      u.props.selected = r.multiple ? r.defaultValue.indexOf(u.props.value) != -1 : r.defaultValue == u.props.value;
    })), e.props = r, n.class != n.className && (Qn.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", Qn));
  }
  e.$$typeof = ys, er && er(e);
};
var tr = w.__r;
w.__r = function(e) {
  tr && tr(e), e.__c;
};
const js = {
  light: "outline",
  dark: "solid"
};
class Ms extends Et {
  renderIcon(t) {
    const { icon: n } = t;
    if (n) {
      if (n.svg) return /* @__PURE__ */ v("span", {
        class: "flex",
        dangerouslySetInnerHTML: {
          __html: n.svg
        }
      });
      if (n.src) return /* @__PURE__ */ v("img", {
        src: n.src
      });
    }
    const r = St.categories[t.id] || St.categories.custom, o = this.props.icons == "auto" ? js[this.props.theme] : this.props.icons;
    return r[o] || r;
  }
  render() {
    let t = null;
    return /* @__PURE__ */ v("nav", {
      id: "nav",
      class: "padding",
      "data-position": this.props.position,
      dir: this.props.dir,
      children: /* @__PURE__ */ v("div", {
        class: "flex relative",
        children: [
          this.categories.map((n, r) => {
            const o = n.name || B.categories[n.id], i = !this.props.unfocused && n.id == this.state.categoryId;
            return i && (t = r), /* @__PURE__ */ v("button", {
              "aria-label": o,
              "aria-selected": i || void 0,
              title: o,
              type: "button",
              class: "flex flex-grow flex-center",
              onMouseDown: (a) => a.preventDefault(),
              onClick: () => {
                this.props.onClick({
                  category: n,
                  i: r
                });
              },
              children: this.renderIcon(n)
            });
          }),
          /* @__PURE__ */ v("div", {
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
    super(), this.categories = $.categories.filter((t) => !t.target), this.state = {
      categoryId: this.categories[0].id
    };
  }
}
class zs extends Et {
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
const ct = {
  rowsPerRender: 10
};
class Ls extends ie {
  getInitialState(t = this.props) {
    return {
      skin: fe.get("skin") || t.skin,
      theme: this.initTheme(t.theme)
    };
  }
  componentWillMount() {
    this.dir = B.rtl ? "rtl" : "ltr", this.refs = {
      menu: se(),
      navigation: se(),
      scroll: se(),
      search: se(),
      searchInput: se(),
      skinToneButton: se(),
      skinToneRadio: se()
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
    await It(this.props), this.initGrid(), this.unobserve(), this.setState(t, () => {
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
    const { categories: t } = $;
    this.refs.categories = /* @__PURE__ */ new Map();
    const n = $.categories.map((o) => o.id).join(",");
    this.navKey && this.navKey != n && this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0), this.navKey = n, this.grid = [], this.grid.setsize = 0;
    const r = (o, i) => {
      const a = [];
      a.__categoryId = i.id, a.__index = o.length, this.grid.push(a);
      const u = this.grid.length - 1, l = u % ct.rowsPerRender ? {} : se();
      return l.index = u, l.posinset = this.grid.setsize + 1, o.push(l), a;
    };
    for (let o of t) {
      const i = [];
      let a = r(i, o);
      for (let u of o.emojis)
        a.length == this.getPerLine() && (a = r(i, o)), this.grid.setsize += 1, a.push(u);
      this.refs.categories.set(o.id, {
        root: se(),
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
      const { width: a } = n.getBoundingClientRect();
      return Math.floor(a / r);
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
      return Re.get(o);
  }
  observeCategories() {
    const t = this.refs.navigation.current;
    if (!t) return;
    const n = /* @__PURE__ */ new Map(), r = (a) => {
      a != t.state.categoryId && t.setState({
        categoryId: a
      });
    }, o = {
      root: this.refs.scroll.current,
      threshold: [
        0,
        1
      ]
    }, i = new IntersectionObserver((a) => {
      for (const l of a) {
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
    for (const { root: a } of this.refs.categories.values()) i.observe(a.current);
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
      rootMargin: `${this.props.emojiButtonSize * (ct.rowsPerRender + 5)}px 0px ${this.props.emojiButtonSize * ct.rowsPerRender}px`
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
  navigate({ e: t, input: n, left: r, right: o, up: i, down: a }) {
    const u = this.state.searchResults || this.grid;
    if (!u.length) return;
    let [l, c] = this.state.pos;
    const s = (() => {
      if (l == 0 && c == 0 && !t.repeat && (r || i))
        return null;
      if (l == -1)
        return !t.repeat && (o || a) && n.selectionStart == n.value.length ? [
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
      if (i || a) {
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
    if (s) t.preventDefault();
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
      pos: s,
      keyboard: !0
    }, () => {
      this.scrollTo({
        row: s[0]
      });
    });
  }
  scrollTo({ categoryId: t, row: n }) {
    const r = this.state.searchResults || this.grid;
    if (!r.length) return;
    const o = this.refs.scroll.current, i = o.getBoundingClientRect();
    let a = 0;
    if (n >= 0 && (t = r[n].__categoryId), t && (a = (this.refs[t] || this.refs.categories.get(t).root).current.getBoundingClientRect().top - (i.top - o.scrollTop) + 1), n >= 0)
      if (!n) a = 0;
      else {
        const u = r[n].__index, l = a + u * this.props.emojiButtonSize, c = l + this.props.emojiButtonSize + this.props.emojiButtonSize * 0.88;
        if (l < o.scrollTop) a = l;
        else if (c > o.scrollTop + i.height) a = c - i.height;
        else return;
      }
    this.ignoreMouse(), o.scrollTop = a;
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
      const o = hs(n, {
        skinIndex: this.state.skin - 1
      });
      this.props.maxFrequentRows && ti.add(o, this.props), this.props.onEmojiSelect(o, t);
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
    }), fe.set("skin", t);
  }
  renderNav() {
    return /* @__PURE__ */ v(Ms, {
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
    return /* @__PURE__ */ v("div", {
      id: "preview",
      class: "flex flex-middle",
      dir: this.dir,
      "data-position": this.props.previewPosition,
      children: [
        /* @__PURE__ */ v("div", {
          class: "flex flex-middle flex-grow",
          children: [
            /* @__PURE__ */ v("div", {
              class: "flex flex-auto flex-middle flex-center",
              style: {
                height: this.props.emojiButtonSize,
                fontSize: this.props.emojiButtonSize
              },
              children: /* @__PURE__ */ v(tn, {
                emoji: t,
                id: n ? this.props.noResultsEmoji || "cry" : this.props.previewEmoji || (this.props.previewPosition == "top" ? "point_down" : "point_up"),
                set: this.props.set,
                size: this.props.emojiButtonSize,
                skin: this.state.tempSkin || this.state.skin,
                spritesheet: !0,
                getSpritesheetURL: this.props.getSpritesheetURL
              })
            }),
            /* @__PURE__ */ v("div", {
              class: `margin-${this.dir[0]}`,
              children: t || n ? /* @__PURE__ */ v("div", {
                class: `padding-${this.dir[2]} align-${this.dir[0]}`,
                children: [
                  /* @__PURE__ */ v("div", {
                    class: "preview-title ellipsis",
                    children: t ? t.name : B.search_no_results_1
                  }),
                  /* @__PURE__ */ v("div", {
                    class: "preview-subtitle ellipsis color-c",
                    children: t ? t.skins[0].shortcodes : B.search_no_results_2
                  })
                ]
              }) : /* @__PURE__ */ v("div", {
                class: "preview-placeholder color-c",
                children: B.pick
              })
            })
          ]
        }),
        !t && this.props.skinTonePosition == "preview" && this.renderSkinToneButton()
      ]
    });
  }
  renderEmojiButton(t, { pos: n, posinset: r, grid: o }) {
    const i = this.props.emojiButtonSize, a = this.state.tempSkin || this.state.skin, l = (t.skins[a - 1] || t.skins[0]).native, c = ds(this.state.pos, n), s = n.concat(t.id).join("");
    return /* @__PURE__ */ v(zs, {
      selected: c,
      skin: a,
      size: i,
      children: /* @__PURE__ */ v("button", {
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
          /* @__PURE__ */ v("div", {
            "aria-hidden": "true",
            class: "background",
            style: {
              borderRadius: this.props.emojiButtonRadius,
              backgroundColor: this.props.emojiButtonColors ? this.props.emojiButtonColors[(r - 1) % this.props.emojiButtonColors.length] : void 0
            }
          }),
          /* @__PURE__ */ v(tn, {
            emoji: t,
            set: this.props.set,
            size: this.props.emojiSize,
            skin: a,
            spritesheet: !0,
            getSpritesheetURL: this.props.getSpritesheetURL
          })
        ]
      })
    }, s);
  }
  renderSearch() {
    const t = this.props.previewPosition == "none" || this.props.skinTonePosition == "search";
    return /* @__PURE__ */ v("div", {
      children: [
        /* @__PURE__ */ v("div", {
          class: "spacer"
        }),
        /* @__PURE__ */ v("div", {
          class: "flex flex-middle",
          children: [
            /* @__PURE__ */ v("div", {
              class: "search relative flex-grow",
              children: [
                /* @__PURE__ */ v("input", {
                  type: "search",
                  ref: this.refs.searchInput,
                  placeholder: B.search,
                  onClick: this.handleSearchClick,
                  onInput: this.handleSearchInput,
                  onKeyDown: this.handleSearchKeyDown,
                  autoComplete: "off"
                }),
                /* @__PURE__ */ v("span", {
                  class: "icon loupe flex",
                  children: St.search.loupe
                }),
                this.state.searchResults && /* @__PURE__ */ v("button", {
                  title: "Clear",
                  "aria-label": "Clear",
                  type: "button",
                  class: "icon delete flex",
                  onClick: this.clearSearch,
                  onMouseDown: this.preventDefault,
                  children: St.search.delete
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
    return t ? /* @__PURE__ */ v("div", {
      class: "category",
      ref: this.refs.search,
      children: [
        /* @__PURE__ */ v("div", {
          class: `sticky padding-small align-${this.dir[0]}`,
          children: B.categories.search
        }),
        /* @__PURE__ */ v("div", {
          children: t.length ? t.map((n, r) => /* @__PURE__ */ v("div", {
            class: "flex",
            children: n.map((o, i) => this.renderEmojiButton(o, {
              pos: [
                r,
                i
              ],
              posinset: r * this.props.perLine + i + 1,
              grid: t
            }))
          })) : /* @__PURE__ */ v("div", {
            class: `padding-small align-${this.dir[0]}`,
            children: this.props.onAddCustomEmoji && /* @__PURE__ */ v("a", {
              onClick: this.props.onAddCustomEmoji,
              children: B.add_custom
            })
          })
        })
      ]
    }) : null;
  }
  renderCategories() {
    const { categories: t } = $, n = !!this.state.searchResults, r = this.getPerLine();
    return /* @__PURE__ */ v("div", {
      style: {
        visibility: n ? "hidden" : void 0,
        display: n ? "none" : void 0,
        height: "100%"
      },
      children: t.map((o) => {
        const { root: i, rows: a } = this.refs.categories.get(o.id);
        return /* @__PURE__ */ v("div", {
          "data-id": o.target ? o.target.id : o.id,
          class: "category",
          ref: i,
          children: [
            /* @__PURE__ */ v("div", {
              class: `sticky padding-small align-${this.dir[0]}`,
              children: o.name || B.categories[o.id]
            }),
            /* @__PURE__ */ v("div", {
              class: "relative",
              style: {
                height: a.length * this.props.emojiButtonSize
              },
              children: a.map((u, l) => {
                const c = u.index - u.index % ct.rowsPerRender, s = this.state.visibleRows[c], f = "current" in u ? u : void 0;
                if (!s && !f) return null;
                const d = l * r, h = d + r, p = o.emojis.slice(d, h);
                return p.length < r && p.push(...new Array(r - p.length)), /* @__PURE__ */ v("div", {
                  "data-index": u.index,
                  ref: f,
                  class: "flex row",
                  style: {
                    top: l * this.props.emojiButtonSize
                  },
                  children: s && p.map((_, b) => {
                    if (!_) return /* @__PURE__ */ v("div", {
                      style: {
                        width: this.props.emojiButtonSize,
                        height: this.props.emojiButtonSize
                      }
                    });
                    const g = Re.get(_);
                    return this.renderEmojiButton(g, {
                      pos: [
                        u.index,
                        b
                      ],
                      posinset: u.posinset + b,
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
    return this.props.skinTonePosition == "none" ? null : /* @__PURE__ */ v("div", {
      class: "flex flex-auto flex-center flex-middle",
      style: {
        position: "relative",
        width: this.props.emojiButtonSize,
        height: this.props.emojiButtonSize
      },
      children: /* @__PURE__ */ v("button", {
        type: "button",
        ref: this.refs.skinToneButton,
        class: "skin-tone-button flex flex-auto flex-center flex-middle",
        "aria-selected": this.state.showSkins ? "" : void 0,
        "aria-label": B.skins.choose,
        title: B.skins.choose,
        onClick: this.openSkins,
        style: {
          width: this.props.emojiSize,
          height: this.props.emojiSize
        },
        children: /* @__PURE__ */ v("span", {
          class: `skin-tone skin-tone-${this.state.skin}`
        })
      })
    });
  }
  renderLiveRegion() {
    const t = this.getEmojiByPos(this.state.pos), n = t ? t.name : "";
    return /* @__PURE__ */ v("div", {
      "aria-live": "polite",
      class: "sr-only",
      children: n
    });
  }
  renderSkins() {
    const n = this.refs.skinToneButton.current.getBoundingClientRect(), r = this.base.getBoundingClientRect(), o = {};
    return this.dir == "ltr" ? o.right = r.right - n.right - 3 : o.left = n.left - r.left - 3, this.props.previewPosition == "bottom" && this.props.skinTonePosition == "preview" ? o.bottom = r.bottom - n.top + 6 : (o.top = n.bottom - r.top + 3, o.bottom = "auto"), /* @__PURE__ */ v("div", {
      ref: this.refs.menu,
      role: "radiogroup",
      dir: this.dir,
      "aria-label": B.skins.choose,
      class: "menu hidden",
      "data-position": o.top ? "top" : "bottom",
      style: o,
      children: [
        ...Array(6).keys()
      ].map((i) => {
        const a = i + 1, u = this.state.skin == a;
        return /* @__PURE__ */ v("div", {
          children: [
            /* @__PURE__ */ v("input", {
              type: "radio",
              name: "skin-tone",
              value: a,
              "aria-label": B.skins[a],
              ref: u ? this.refs.skinToneRadio : null,
              defaultChecked: u,
              onChange: () => this.handleSkinMouseOver(a),
              onKeyDown: (l) => {
                (l.code == "Enter" || l.code == "Space" || l.code == "Tab") && (l.preventDefault(), this.handleSkinClick(a));
              }
            }),
            /* @__PURE__ */ v("button", {
              "aria-hidden": "true",
              tabindex: "-1",
              onClick: () => this.handleSkinClick(a),
              onMouseEnter: () => this.handleSkinMouseOver(a),
              onMouseLeave: () => this.handleSkinMouseOver(),
              class: "option flex flex-grow flex-middle",
              children: [
                /* @__PURE__ */ v("span", {
                  class: `skin-tone skin-tone-${a}`
                }),
                /* @__PURE__ */ v("span", {
                  class: "margin-small-lr",
                  children: B.skins[a]
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
    return /* @__PURE__ */ v("section", {
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
        this.props.searchPosition == "sticky" && /* @__PURE__ */ v("div", {
          class: "padding-lr",
          children: this.renderSearch()
        }),
        /* @__PURE__ */ v("div", {
          ref: this.refs.scroll,
          class: "scroll flex-grow padding-lr",
          children: /* @__PURE__ */ v("div", {
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
    super(), G(this, "darkMediaCallback", () => {
      this.props.theme == "auto" && this.setState({
        theme: this.darkMedia.matches ? "dark" : "light"
      });
    }), G(this, "handleClickOutside", (n) => {
      const { element: r } = this.props;
      n.target != r && (this.state.showSkins && this.closeSkins(), this.props.onClickOutside && this.props.onClickOutside(n));
    }), G(this, "handleBaseClick", (n) => {
      this.state.showSkins && (n.target.closest(".menu") || (n.preventDefault(), n.stopImmediatePropagation(), this.closeSkins()));
    }), G(this, "handleBaseKeydown", (n) => {
      this.state.showSkins && n.key == "Escape" && (n.preventDefault(), n.stopImmediatePropagation(), this.closeSkins());
    }), G(this, "handleSearchClick", () => {
      this.getEmojiByPos(this.state.pos) && this.setState({
        pos: [
          -1,
          -1
        ]
      });
    }), G(this, "handleSearchInput", async () => {
      const n = this.refs.searchInput.current;
      if (!n) return;
      const { value: r } = n, o = await Re.search(r), i = () => {
        this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0);
      };
      if (!o) return this.setState({
        searchResults: o,
        pos: [
          -1,
          -1
        ]
      }, i);
      const a = n.selectionStart == n.value.length ? [
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
        pos: a
      }, i);
    }), G(this, "handleSearchKeyDown", (n) => {
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
    }), G(this, "clearSearch", () => {
      const n = this.refs.searchInput.current;
      n && (n.value = "", n.focus(), this.handleSearchInput());
    }), G(this, "handleCategoryClick", ({ category: n, i: r }) => {
      this.scrollTo(r == 0 ? {
        row: -1
      } : {
        categoryId: n.id
      });
    }), G(this, "openSkins", (n) => {
      const { currentTarget: r } = n, o = r.getBoundingClientRect();
      this.setState({
        showSkins: o
      }, async () => {
        await fs(2);
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
class gn extends gs {
  async connectedCallback() {
    const t = oi(this.props, ae, this);
    t.element = this, t.ref = (n) => {
      this.component = n;
    }, await It(t), !this.disconnected && Qr(/* @__PURE__ */ v(Ls, {
      ...t
    }), this.shadowRoot);
  }
  constructor(t) {
    super(t, {
      styles: /* @__PURE__ */ Nr(di)
    });
  }
}
G(gn, "Props", ae);
typeof customElements < "u" && !customElements.get("em-emoji-picker") && customElements.define("em-emoji-picker", gn);
var di = {};
di = `:host {
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
var Ts = /* @__PURE__ */ W('<div class="chat-header"><div class="header-info"><svg class="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <h2 class="logo-text"> </h2></div> <div><div class="chat-tooltip"><span class="chat-tooltiptext"> </span> <button class="chat-btn-header material-symbols-rounded">delete_history</button></div> <div class="chat-tooltip"><span class="chat-tooltiptext"> </span> <button class="chat-btn-header material-symbols-rounded">keyboard_arrow_down</button></div></div></div>');
function Ds(e, t) {
  Dt(t, !1);
  const n = Br(), r = () => Xt(Hr, "$t", n);
  let o = q(t, "webhookUrl", 8), i = q(t, "title", 8), a = q(t, "sessionId", 8);
  function u() {
    window.parent.postMessage("close_chatbot", "*");
  }
  async function l() {
    ze.set([]);
    const A = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: a() })
    };
    try {
      const H = await fetch(`${o()}?action=delete_history`, A);
      if (!H.ok)
        throw new Error("Failed to connect to the server. Try again later");
      const z = await H.json();
      if (!z.success)
        throw new Error(z.data.message);
    } catch (H) {
      console.log(H.toString());
    }
  }
  vn();
  var c = Ts(), s = j(c), f = P(j(s), 2), d = j(f), h = P(s, 2), p = j(h), _ = j(p), b = j(_);
  J(() => te(b, r()("tooltip.clear_history_msg")));
  var g = P(_, 2), y = P(p, 2), E = j(y), L = j(E);
  J(() => te(L, r()("tooltip.minimize")));
  var C = P(E, 2);
  J(() => te(d, i())), Ye("click", g, l), Ye("click", C, u), N(e, c), Pt();
}
var Ps = /* @__PURE__ */ W("<del><!></del>"), Rs = /* @__PURE__ */ W("<div><b> </b> <img> <span> </span><br> <b>Price:</b> <!> <b><!></b></div><br>", 1), Is = /* @__PURE__ */ W("<div><p> </p> <br> <!> <p> </p></div>");
function As(e, t) {
  Dt(t, !1);
  let n = q(t, "data", 8);
  vn();
  var r = Is(), o = j(r), i = j(o), a = P(o, 4);
  Ir(a, 1, () => n().list, Rr, (c, s) => {
    var f = Rs(), d = Ke(f), h = j(d), p = j(h), _ = P(h, 2), b = P(_, 2), g = j(b), y = P(b, 5);
    Me(y, () => m(s).regular_price !== "", (C) => {
      var A = Ps(), H = j(A);
      Jt(H, () => m(s).regular_price), N(C, A);
    });
    var E = P(y, 2), L = j(E);
    Jt(L, () => m(s).price), J(() => {
      te(p, m(s).title), yt(_, "src", m(s).image_url), yt(_, "alt", m(s).title), te(g, m(s).description);
    }), N(c, f);
  });
  var u = P(a, 2), l = j(u);
  J(() => {
    te(i, n().header), te(l, n().footer);
  }), N(e, r), Pt();
}
var Bs = /* @__PURE__ */ W("<div><p> </p></div>");
function Os(e, t) {
  let n = q(t, "data", 8);
  var r = Bs(), o = j(r), i = j(o);
  J(() => te(i, n())), N(e, r);
}
var Hs = /* @__PURE__ */ W('<img class="attachment">'), Ns = /* @__PURE__ */ W('<div class="message-text"> </div> <!>', 1), Vs = /* @__PURE__ */ W('<p style="color: red;"> </p>'), Fs = /* @__PURE__ */ W('<div class="thinking-indicator"><div class="dot"></div> <div class="dot"></div> <div class="dot"></div></div>'), Us = /* @__PURE__ */ W('<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <div class="message-text"><!></div>', 1), qs = /* @__PURE__ */ W("<div><!></div>"), Ws = /* @__PURE__ */ W('<button type="button" id="emoji-picker" class="material-symbols-outlined">sentiment_satisfied</button>'), Ks = /* @__PURE__ */ W('<div class="show-chatbot"><div class="chatbot-popup"><!> <div class="chat-body"><div class="message bot-message"><svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path></svg> <div class="message-text"><!></div></div> <!></div> <div class="chat-footer"><form action="#" class="chat-form"><textarea class="message-input" required></textarea> <div class="chat-controls"><!> <button type="submit" id="send-message" class="material-symbols-rounded">arrow_upward</button></div></form></div></div></div>');
function Gs(e, t) {
  Dt(t, !1);
  const n = Br(), r = () => Xt(ze, "$messages", n), o = () => Xt(Hr, "$t", n);
  let i = q(t, "webhookUrl", 8), a = q(t, "title", 12), u = q(t, "initialGreeting", 12), l = q(t, "imageUpload", 12), c = q(t, "inputPlaceholder", 12), s = q(t, "emoji", 12), f = q(t, "locale", 8), d = q(t, "styles", 8), h = Ce(), p = Ce(), _ = Ce(), b, g = Ce(), y = Ce(), E;
  Io(Or, f());
  let L = {
    message: null,
    file: { data: null, mime_type: null }
  }, C = Ce({});
  const A = { ProductList: As, Text: Os };
  Bo(() => (Object.entries(d()).forEach(([S, k]) => {
    const K = `--chat-${S.replace(/_/g, "-").toLowerCase()}`;
    m(h).style.setProperty(K, k);
  }), a(a() ?? "Chatbot"), u(u() ?? "Hi there! 👋 <br> How can I assist you today?"), c(c() ?? "Message..."), l(JSON.parse(l(l() ?? "true"))), s(JSON.parse(s(s() ?? "true"))), b = m(_).scrollHeight, R(p, crypto.randomUUID()), E = new gn({
    locale: f(),
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (S) => {
      const { selectionStart: k, selectionEnd: D } = m(_);
      m(_).setRangeText(S.native, k, D, "end"), m(_).focus();
    },
    onClickOutside: (S) => {
      S.target.id === "emoji-picker" ? document.body.classList.toggle("show-emoji-picker") : document.body.classList.remove("show-emoji-picker");
    }
  }), m(y).appendChild(E), m(g).scrollTo({
    top: m(g).scrollHeight,
    behavior: "instant"
  }), () => {
    E && E.parentNode && E.parentNode.removeChild(E);
  }));
  const H = async () => {
    const S = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //action: "chatbot_request",
        chatInput: L.message,
        sessionId: m(p)
      })
    };
    try {
      const k = await fetch(`${i()}?action=chatbot_request`, S);
      if (!k.ok)
        throw new Error("Failed to connect to the server. Try again later");
      const D = await k.json();
      if (!D.success)
        throw new Error(D.data.message);
      ze.update((K) => (K[K.length - 1] = {
        content: { message: D.data },
        className: "bot-message"
      }, K));
    } catch (k) {
      let D = k.toString();
      console.log(D), ze.update((K) => (K[K.length - 1] = {
        content: { message: D },
        className: "bot-message",
        err: !0
      }, K));
    } finally {
      await Vt(), m(g).scrollTo({
        top: m(g).scrollHeight,
        behavior: "smooth"
      });
    }
  }, z = async (S) => {
    S.preventDefault(), L.message = m(_).value.trim(), ot(_, m(_).value = ""), m(_).dispatchEvent(new Event("input")), ze.update((k) => (k[k.length] = {
      content: { ...L },
      className: "user-message"
    }, k)), await Vt(), m(g).scrollTo({
      top: m(g).scrollHeight,
      behavior: "smooth"
    }), ze.update((k) => (k[k.length] = {
      content: { message: "" },
      className: "bot-message"
    }, k)), await Vt(), m(g).scrollTo({
      top: m(g).scrollHeight,
      behavior: "smooth"
    }), H();
  }, ee = (S) => {
    const k = S.target.value.trim();
    S.key === "Enter" && k && !S.shiftKey && z(S);
  };
  function ge() {
    const S = window.getComputedStyle(m(_));
    ot(_, m(_).style.height = `${b}px`), ot(_, m(_).style.height = `${m(_).scrollHeight}px`);
    const k = Math.floor(m(_).scrollHeight / parseInt(S.lineHeight, 10));
    ot(y, m(y).style.borderRadius = k > 1 ? "15px" : "32px");
  }
  oo(() => (r(), m(C)), () => {
    const S = /* @__PURE__ */ new Set();
    for (const k of r())
      k.content && k.content.message && k.content.message.name && S.add(k.content.message.name);
    S.forEach((k) => {
      m(C)[k] || (A[k] ? R(C, {
        ...m(C),
        [k]: A[k]
      }) : (console.error(`Component not found: ${k}`), R(C, {
        ...m(C),
        [k]: "error"
      })));
    });
  }), so(), vn();
  var At = Ks(), fi = j(At), mn = j(fi);
  Ds(mn, {
    get webhookUrl() {
      return i();
    },
    get title() {
      return a();
    },
    get sessionId() {
      return m(p);
    }
  });
  var Bt = P(mn, 2), bn = j(Bt), hi = P(j(bn), 2), vi = j(hi);
  Jt(vi, u);
  var pi = P(bn, 2);
  Ir(pi, 1, r, Rr, (S, k) => {
    let D = () => m(k).content, K = () => m(k).className, bi = () => m(k).err;
    var Ot = qs(), wi = j(Ot);
    Me(
      wi,
      () => K() === "user-message",
      (Ht) => {
        var Fe = Ns(), Ue = Ke(Fe), Nt = j(Ue), qe = P(Ue, 2);
        Me(qe, () => D().file.data, (me) => {
          var $e = Hs();
          J(() => yt($e, "src", `data:${D().file.mime_type ?? ""};base64,${D().file.data ?? ""}`)), N(me, $e);
        }), J(() => te(Nt, D().message)), N(Ht, Fe);
      },
      (Ht) => {
        var Fe = Us(), Ue = P(Ke(Fe), 2), Nt = j(Ue);
        Me(
          Nt,
          () => m(C)[D().message.name] && m(C)[D().message.name] !== "error",
          (qe) => {
            var me = En(), $e = Ke(me);
            Lo($e, () => m(C)[D().message.name], (We, xe) => {
              xe(We, {
                get data() {
                  return D().message.content;
                }
              });
            }), N(qe, me);
          },
          (qe) => {
            var me = En(), $e = Ke(me);
            Me(
              $e,
              () => m(C)[D().message.name] === "error",
              (We) => {
                var xe = Vs(), yi = j(xe);
                J(() => te(yi, `${o()("msg.error_loading_component") ?? ""} ${D().message.name ?? ""}`)), N(We, xe);
              },
              (We) => {
                var xe = Fs();
                N(We, xe);
              },
              !0
            ), N(qe, me);
          }
        ), J(() => Ro(Ue, "error", bi())), N(Ht, Fe);
      }
    ), J(() => Do(Ot, `message ${K() ?? ""}`)), N(S, Ot);
  }), st(Bt, (S) => R(g, S), () => m(g));
  var _i = P(Bt, 2), wn = j(_i), Ve = j(wn);
  st(Ve, (S) => R(_, S), () => m(_));
  var gi = P(Ve, 2), yn = j(gi);
  Me(yn, s, (S) => {
    var k = Ws();
    N(S, k);
  });
  var mi = P(yn, 2);
  st(wn, (S) => R(y, S), () => m(y)), st(At, (S) => R(h, S), () => m(h)), J(() => yt(Ve, "placeholder", c())), Ye("keydown", Ve, ee), Ye("input", Ve, ge), Ye("click", mi, z), N(e, At), Pt();
}
function Ys({ webhook_url: e, title: t, initial_greeting: n, image_upload: r, input_placeholder: o, emoji: i, locale: a, styles: u }) {
  let l = document.querySelector(".chatbot-container");
  l || (l = document.createElement("div"), l.className = "chatbot-container", document.body.appendChild(l)), Co(Gs, {
    target: document.querySelector(".chatbot-container"),
    props: {
      webhookUrl: e,
      title: t,
      initialGreeting: n,
      inputPlaceholder: o,
      imageUpload: r,
      emoji: i,
      locale: a,
      styles: u
    }
  });
}
export {
  Ys as createChat
};
