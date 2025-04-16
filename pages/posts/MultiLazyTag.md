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

区间修改信息 Tag 设计十分简单． 因为只有一种修改操作 $T_1$，Tag 的合并轻而易举．

```cpp
using i64 = long long;
constexpr i64 MOD = 1e9 + 7;

struct Tag {
  i64 add;
  Tag() : add(0LL) {} // 恒等元
  Tag(i64 add) : add(add) {}

  void apply(Tag t) { // Tag 合并
    add += t.add;
    add %= MOD;
  }
};

struct Info {
  i64 sum, sq_sum;
  Info() : sum(0LL), sq_sum(0LL) {} // 非目标区域
  Info(i64 leaf) : sq_sum(leaf) {} // 叶节点初始化 Info
  Info operator+(const Info &o) { return Info(sq_sum + o.sq_sum); }

  void apply(Tag t, int l, int r) { // Tag 作用于 Info
    i64 b = t.add;

    i64 new_sq_sum = 0LL;
    new_sq_sum += sq_sum;
    new_sq_sum += (2 * b * sum) % MOD;
    new_sq_sum %= MOD;
    new_sq_sum += (R - L + 1) * b % MOD * b % MOD;
    new_sq_sum %= MOD;

    i64 new_sum = (sum + (R - L + 1) * b % MOD) % MOD;

    sq_sum = new_sq_sum, sum = new_sum;
  }
};

```

## 多 Tag - 不存在相同优先级的 Tag

未完待续...
