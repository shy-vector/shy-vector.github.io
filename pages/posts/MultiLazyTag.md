---
title: 线段树 - 多 Tag 优先级问题
date: 2025-04-16 1:14:51
author: Shy_Vector
tags:
  - 算法
  - 数据结构
  - 线段树
  - Tag
sponsor: true
copyright: true
nav: true
---

Tag 是**线段树**实现区间修改的重要技巧，它能够延迟更新子树从而达到降低时间复杂度．在只有一种区间修改类型的情况下，Tag 的 push 处理十分简单．但在**多种区间修改类型**的情况下，情况就变得不容乐观了：直接根据 Tag 施加的先后顺序来维护 Tag 队列，时间复杂度并不好看．设法将当前节点的 Tag 与子节点的旧 Tag 合并，就成了优化复杂度的关键．其中，**不同修改操作之间的影响关系决定了 Tag 被 push 的先后顺序**．

<!-- more -->

## 单 Tag

先回顾下单 Tag 的情况：

> 能对区间 $[L, R)$ 进行以下操作：\
> $T_1$：将每个数乘上 $k$\
> $Q_1$：查询区间平方和

Info 和 Tag 的设计十分简单：

```cpp
using i64 = long long;
constexpr i64 MOD = 1e9 + 7;

template <typename T>
class SegmentTree {
  private:
  // 自定义想要对区间的操作
  struct Tag {
    i64 mul;
    Tag() : mul(1LL) {} // 单位元
    Tag(i64 _mul) : mul(_mul) {}
    // 合并 Tag
    void apply(const Tag &o) {
      mul = mul * o.mul % MOD;
    }
  };

  struct Info {
    i64 sq_sum;
    Info() : sq_sum(0LL) {} // 与目标区间无交集
    Info(const T &single) : sq_sum(single * single % MOD) {} // 叶子节点
    Info(i64 _sq_sum) : sq_sum(_sq_sum) {}

    // 合并区间信息
    Info operator+(const Info &o) {
      return Info((sq_sum + o.sq_sum) % MOD);
    }
    // 使用 Tag 修改区间信息
    void apply(const Tag &t, int len) {
      sq_sum = sq_sum * t.mul % MOD * t.mul % MOD;
    }
  };

  // ...
};
```

## 多 Tag - 不存在相同优先级的 Tag
