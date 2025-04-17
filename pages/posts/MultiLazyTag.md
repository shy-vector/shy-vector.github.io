---
title: 线段树 - 多 Tag 下放的优先级问题
date: 2025-04-16 1:14:51
author: Shy_Vector
tags:
  - 算法
  - 数据结构
  - 线段树
sponsor: true
copyright: true
nav: true
---

Tag 是**线段树**实现区间修改的重要技巧，它能够延迟更新子树从而达到降低时间复杂度．在只有一种区间修改类型的情况下，Tag 的 push 处理十分简单．但在**多种区间修改类型**的情况下，情况就变得不容乐观了：直接根据 Tag 施加的先后顺序来维护 Tag 队列，时间复杂度并不好看．设法将当前节点的 Tag 与子节点的旧 Tag 合并，就成了优化复杂度的关键．其中，**不同修改操作之间的影响关系决定了 Tag 被 push 的先后顺序**．

<!-- more -->

## 单 Tag

先回顾下单 Tag 的情况：

> 能对区间 $[L, R)$ 进行以下操作：\
> $T_1$：将区间里每个数加上 $b$；\
> $Q_1$：查询区间平方和．

区间信息 Info 设计不难，只需维护区间和与区间平方和即可．

> Info 和 Tag 的设计是相辅相成的，这在后面会充分体现．\
> 在这里，可以先试试直接对每个数加上 $b$ 后，看看区间平方和的形式发生了什么变化：
>
> $$
> \sum (x_i + b)^2 = \sum x_i^2 + 2b \sum x_i + (R - L + 1)b^2
> $$
>
> 可以看到，我们必须要实时维护区间信息 $\sum x_i^2$ 和 $\sum x_i$，才能够实时更新区间平方和信息，因此 Info 必须被设计成能够维护区间和与区间平方和的形式．此时
>
> $$
> \sum (x_i + b) = \sum x_i + (R - L + 1)b
> $$
>
> 当然设计 Info 的时候也需要注意，只有满足 **结合律** 和 **封闭性** 的统计量才能够用线段树维护：最值、区间和、最大公约数等．

区间修改信息 Tag 设计十分简单． 因为只有一种修改操作 $T_1$，Tag 的合并轻而易举：

$$
b = b_1 + b_2
$$

```cpp
using i64 = long long;
constexpr i64 MOD = 1e9 + 7;

struct Tag {
  i64 b;
  Tag() : b(0LL) {} // 恒等元
  Tag(i64 b) : b(b) {}

  void apply(Tag t) { // Tag 合并
    b = (b + t.b) % MOD;
  }
};

struct Info {
  i64 S, S2;
  Info() : S(0LL), S2(0LL) {} // 与目标区域无交集
  Info(i64 leaf) : S(leaf), S2(leaf * leaf % MOD) {} // 叶节点初始化 Info
  Info operator+(const Info &o) { // 区间 Info 合并
    Info res;
    res.S = S + o.S;
    res.S2 = S2 + o.S2;
    return res;
  }

  void apply(Tag t, int l, int r) { // Tag 作用于 Info
    i64 nS = (S + (r - l + 1) * t.b % MOD) % MOD;

    i64 nS2 = (
      S2 + (
        2 * t.b % MOD * S % MOD + (
          (r - l + 1) * t.b % MOD * t.b % MOD
        ) % MOD
      ) % MOD
    ) % MOD;

    S = nS, S2 = nS2;
  }
};

```

## 多 Tag

### 加、乘、赋值

现在我们有了多种修改操作：

> 给定一个长度为 $n$ 的序列 $a$，要求支持如下四个操作：\
> $T_1$：将区间 $[l, r]$ 内每个数都加上 $b$；\
> $T_2$：将区间 $[l, r]$ 内每个数都乘上 $k$；\
> $T_3$：将区间 $[l, r]$ 内每个数都赋值 $c$；\
> $Q_1$：求区间 $[l, r]$ 的立方和．

我们设计的 Tag 存着有关修改操作的信息，这个信息可以用四元组 $(b, k, c, \text{flag})$ 表示（其中 $\text{flag}$ 表示是否进行赋值操作），但这个形式并没有 **操作顺序** 这个信息，难道我们还要定义一个量用来明确先后吗？大可不必．

我们直接 **人为规定** Tag 里三种操作的顺序，这为我们合并 Tag 省去很多麻烦（你也不想要 $3!$ 种顺序，带来 $(3!)^2$ 的分类讨论吧）．那问题来了，怎样个顺序呢？标答是先赋值，再做乘，最后加：$(c, k, b, \text{flag})$ ．

> 比如 $(2, 5, 1, \text{true}) \gets (114514, 8, 6, \text{false})$，得到 $(2, 5 \times 8, 1 \times 8 + 6, \text{true})$，意思是：「区间内所有数赋值 $2$ 后，集体乘以 $5$，集体加上 $1$，紧接着集体乘以 $8$，集体加上 $1$」完全等价于「区间内所有数赋值 $2$ 后，集体乘以 $40$，集体加上 $14$」

> 凭什么是这个顺序？实际上，**只要我们规定的顺序能够实现 Tag 的合并，都是可行的顺序**．我们当然可以先赋值，然后加，最后乘，但这会带来不必要的麻烦：\
> 先乘后加：$k_2(k_1x + b_1) + b_2 = (k_2k_1)x + (k_2b_1 + b_2)$；\
> 先加后乘：$k_2(k_1(x + b_1) + b_2) = (k_2k_1)(x+(b_1+ b_2/k_1))$；\
> 这会带来精度丢失，且不优雅．\
> 那赋值呢？你可以去试试，如果不先赋值，你甚至都做不到 Tag 的合并，因为赋值会抹去加和乘的意义，无法保留加和乘的信息．

因此 Tag 的合并如下：当 $\text{flag}_2 = \text{false}$ 时，

$$
\begin{align*}
c &= c_1 \\
k &= k_2k_1 \\
b &= k_2b_1 + b_2 \\
\text{flag} &= \text{flag}_1
\end{align*}
$$

当 $\text{flag}_2 = \text{true}$ 时，

$$
\begin{align*}
c &= c_2 \\
k &= k_2 \\
b &= b_2 \\
\text{flag} &= \text{flag}_2
\end{align*}
$$

Info 的设计反倒不难：当 $\text{flag} = \text{false}$ 时，Info 的立方和变为

$$
\sum(kx+b)^3 = k^3 \sum x^3 + 3k^2b \sum x^2 + 3kb^2 \sum x + (r - l + 1)b^3
$$

可以看出我们的 Info 还需要额外维护平方和还有和：

$$
\begin{align*}
&\sum(kx+b)^2 = k^2 \sum x^2 + 2kb \sum x + (r - l + 1)b^2 \\
&\sum(kx+b) \:\,= k \sum x + (r - l + 1)b
\end{align*}
$$

当 $\text{flag} = \text{true}$ 时，不依赖 Info 原有值，Info 的三种和直接修改为

$$
\begin{align*}
&(r - l + 1)(kc + b)^3 \\
&(r - l + 1)(kc + b)^2 \\
&(r - l + 1)(kc + b) \\

\end{align*}
$$

```cpp
using i64 = long long;
constexpr i64 MOD = 1e9 + 7;

struct Tag {
  i64 c, k, b;
  bool flag;
  Tag() : c(0LL), k(1LL), b(0LL), flag(false) {} // 恒等元
  Tag(i64 c, i64 k, i64 b, bool flag) : c(c), k(k), b(b), flag(flag) {}

  void apply(Tag t) { // Tag 合并
    if (t.flag) {
      c = t.c, k = t.k, b = t.b, flag = t.flag;
    } else {
      k = k * t.k % MOD;
      b = (b * t.k % MOD + t.b) % MOD;
    }
  }
};

struct Info {
  i64 S, S2, S3;
  Info() : S(0LL), S2(0LL), S3(0LL) {} // 与目标区域无交集
  Info(i64 leaf) : S(leaf), S2(leaf * leaf % MOD), S3(leaf * leaf % MOD * leaf % MOD) {} // 叶节点初始化 Info
  Info(i64 S, i64 S2, i64 S3) : S(S), S2(S2), S3(S3) {}
  Info operator+(const Info &o) { // 区间 Info 合并
    return Info(S + o.S, S2 + o.S2, S3 + o.S3);
  }

  void apply(Tag t, int l, int r) { // Tag 作用于 Info
    i64 c = t.c, k = t.k, b = t.b;
    if (t.flag) {
      S  = (r - l + 1) * (k * c % MOD + b) % MOD;
      S2 = (r - l + 1) * (k * c % MOD + b) % MOD
                       * (k * c % MOD + b) % MOD;
      S3 = (r - l + 1) * (k * c % MOD + b) % MOD
                       * (k * c % MOD + b) % MOD
                       * (k * c % MOD + b) % MOD;
    } else {
      i64 nS = (k * S % MOD + (r - l + 1) * b % MOD) % MOD;

      i64 nS2 = (
        k * k % MOD * S2 % MOD + (
          2 * k % MOD * b % MOD * S % MOD + (
            (r - l + 1) * b % MOD * b % MOD
          ) % MOD
        ) % MOD
      ) % MOD;

      i64 nS3 = (
        k * K % MOD * k % MOD * S3 % MOD + (
          3 * k % MOD * k % MOD * b % MOD * S2 % MOD + (
            3 * k % MOD * b % MOD * b % MOD * S % MOD + (
              (r - l + 1) * b % MOD * b % MOD * b % MOD
            ) % MOD
          ) % MOD
        ) % MOD
      ) % MOD;

      S = nS, S2 = nS2, S3 = nS3;
    }
  }
};

```

### 加、乘、轮换

> 给你 $n$ 个三元组 $(x, y, z)$，进行若干次如下操作：\
> $T_1$：对 $[l, r]$ 内的所有三元组都加上 $(a, b, c)$；\
> $T_2$：对 $[l, r]$ 内的所有三元组都乘上 $k$；\
> $T_3$：对 $[l, r]$ 内的所有三元组 $(x, y, z)$ 置换成 $(y, z, x)$；\
> $Q_1$：查询 $[l, r]$ 内的所有三元组和的模。

如何叠加 Tag？首先乘的优先级比加高，因此只需要考虑轮换相对于这两种操作的优先级。

直观上讲，轮换对其他操作的影响程度更大（赋值影响程度更大），我们先试试这个优先级：置换 $>$ 乘法 $>$ 加法。设三元组 $\mathbf{x} = (x, y, z)$，加法操作数 $\mathbf{b} = (a, b, c)$，记置换操作为 $\text{rot}\,\mathbf{x}$。

我们初步定义 $\text{Tag}_{k, \mathbf{b}}\, \mathbf{x} = k\,\text{rot}\,\mathbf{x} + \mathbf{b}$，那么 Tag 合并时：

$$
\begin{align*}
& \text{Tag}_{k_2, \mathbf{b}_2}\text{Tag}_{k_1, \mathbf{b}_1} \mathbf{x} \\
=\,& k_2\,\text{rot}(k_1\,\text{rot}\,\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 \\
=\,& k_2(k_1\,\text{rot}^2\,\mathbf{x} + \text{rot}\,\mathbf{b}_1) + \mathbf{b}_2 \\
=\,& (k_2k_1)\,\text{rot}^2\,\mathbf{x} + (k_2\,\text{rot}\,\mathbf{b}_1 + \mathbf{b}_2)
\end{align*}
$$

没法重新合并成一个 Tag。观察形式，我们需要把 Tag 重新定义成 $\text{Tag}_{t, k, \mathbf{b}} = k\,\text{rot}^t\,\mathbf{x} + \mathbf{b}$，$t \in \{0, 1, 2\}$，重新推导 Tag 合并：

$$
\begin{align*}
& \text{Tag}_{t_2, k_2, \mathbf{b}_2}\text{Tag}_{t_1, k_1, \mathbf{b}_1}\,\mathbf{x} \\
=\,& k_2\,\text{rot}^{t_2}(k_1\,\text{rot}^{t_1}\,\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 \\
=\,& k_2(k_1\,\text{rot}^{t_2 + t_1}\,\mathbf{x} + \text{rot}^{t_2}\,\mathbf{b}_1) + \mathbf{b}_2 \\
=\,& (k_2k_1)\,\text{rot}^{(t_2 + t_1) \:\text{mod}\: 3}\,\mathbf{x} + (k_2\,\text{rot}^{t_2 \:\text{mod}\: 3}\,\mathbf{b}_1 + \mathbf{b}_2) \\
=\,& \text{Tag}_{t, k, \mathbf{b}}\,\mathbf{x}
\end{align*}
$$

合并成功，此时 Tag 的合并为：

$$
\begin{align*}
t &= (t_1 + t_2) \:\text{mod}\:3 \\
k &= k_2k_1 \\
\mathbf{b} &= k_2\,\text{rot}^{t_2 \:\text{mod}\: 3}\,\mathbf{b}_1 + \mathbf{b}_2
\end{align*}
$$

到设计 Info 的时候了，我们需要维护区间所有三元组的和，才能获得模。

当 $\text{Tag}_{t, k, \mathbf{b}}$ 作用于区间时，区间内所有三元组的和

$$
\sum (k\,\text{rot}^t\,\mathbf{x} + \mathbf{b}) = k\,\text{rot}^t\sum \mathbf{x} + (r - l + 1) \mathbf{b}
$$

看来不需要额外维护其它量，搞定收工！

```cpp
using i64 = long long;
constexpr i64 MOD = 1e9 + 7;

struct Vec {
  std::array<i64, 3> v;
  Vec() : v() {}
  Vec(const Vec &o) : v(o.v) {}
  Vec(i64 x, i64 y, i64 z) : v({x % MOD, y % MOD, z % MOD}) {}

  Vec operator+(const Vec &o) {
    return Vec((v[0] + o.v[0]) % MOD,
               (v[1] + o.v[1]) % MOD,
               (v[2] + o.v[2]) % MOD);
  }

  Vec operator*(i64 k) {
    return Vec(v[0] * k % MOD,
               v[1] * k % MOD,
               v[2] * k % MOD);
  }

  Vec rot(int t) {
    return Vec(v[t % 3], v[(t + 1) % 3], v[(t + 2) % 3]);
  }
};

struct Tag {
  int t;
  i64 k;
  Vec b;
  Tag() : t(0), k(1LL), b() {} // 恒等元
  Tag(int t, i64 k, Vec b) : c(c), k(k), b(b) {}

  void apply(Tag _t) { // Tag 合并
    int t2 = _t.t;
    i64 k2 = _t.k;
    Vec b2 = _t.b;
    t = (t + t2) % 3;
    k = k * k2 % MOD;
    b = b.rot(t2 % 3) * k2 + b2;
  }
};

struct Info {
  Vec S;
  Info() : S() {} // 与目标区域无交集
  Info(Vec leaf) : S(leaf) {} // 叶节点初始化 Info
  Info operator+(const Info &o) { // 区间 Info 合并
    return Info(S + o.S);
  }

  void apply(Tag _t, int l, int r) { // Tag 作用于 Info
    int t = _t.t;
    i64 k = _t.k;
    Vec b = _t.b;
    S = S.rot(t) * k + b * (r - l + 1LL);
  }
};

```

未完待续...
