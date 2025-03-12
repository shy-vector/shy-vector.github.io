---
title: 神奇的位运算
date: 2025-01-24 16:20:00
author: Shy_Vector
tags:
  - 算法
  - 位运算
sponsor: true
copyright: true
nav: true
---

本文主要记录算法竞赛中简单的位运算知识．

<!-- more -->

## 异或

### 性质

1. 自反律：$a \oplus  a = 0$，$a \oplus  0 = a$;

2. 交换律：$a \oplus  b = b \oplus  a$;

3. 结合律：$(a \oplus  b) \oplus  c = a \oplus  (b \oplus  c)$;

4. ⭐ 三个对象 $a$，$b$，$a \oplus b$ 地位等价：

   $$
   c = a \oplus b \quad \Leftrightarrow \quad a = c \oplus b \quad \Leftrightarrow \quad b = c \oplus a
   $$

5. ⭐ 加法 $\ge$ 异或：$a + b \ge a \oplus b$;

   > 加法会**进位**，而异或不会，因此上式成立．\
   > 何时取等？只要不进位就取等．\
   > 由于三者地位等价，因此 $a \oplus b + b \ge a$，$a + a \oplus b \ge b$，故 $a \oplus b \ge |a - b|$，于是得到异或的大致范围：
   > $$
   > |a - b| \le a \oplus b \le a + b
   > $$

6. 相邻异或和：

   $$
   1 \oplus  2 \oplus  3 \oplus  4 \oplus  5 \oplus  \cdots = 1 \oplus (2 \oplus  3) \oplus  (4 \oplus  5) \oplus  \cdots
   $$
   当 $n$ 为偶数时，$n \oplus  (n + 1) = 1$;

### 异或和

对于序列 $\{a_i\}$，$\{b_j\}$，$1 \le i \le m$，$1 \le j \le n$，求
$$
\sum_{i=1}^m\sum_{j=1}^n(a_i \oplus b_j)
$$
$c_{ij} = a_i \oplus b_j$ 无非就是
$$
c_{ij,0} + c_{ij,1} \cdot 2 + c_{ij,2} \cdot 2 ^2 + \cdots + c_{ij,k} \cdot 2 ^k + \cdots
$$
因此根据乘法分配律，（可以看成上面的式子**混入**了最终的结果，$+$ 号被**解离**）
$$
\sum_{i=1}^m\sum_{j=1}^n(a_i \oplus b_j) = \sum_{k = 0}^{63} \left(\sum_{i=1}^m\sum_{j=1}^nc_{ij,k}\right)\cdot 2^k
$$
核心就是求 $\sum\limits_{i=1}^m\sum\limits_{j=1}^nc_{ij,k}$，但 $c_{ij,k}$ 从哪来？从 $a_{i, k}$ 和 $b_{j, k}$ 来：
$$
c_{ij, k} = a_{i, k} \oplus b_{j, k}
$$
这里 $a_{i, k}$，$b_{j,k}$，$c_{ij,k}$ 要么是 $0$，要么是 $1$．因此从序列 $\{a_i\}$，$\{b_j\}$ 单独拎出比特位第 $k$ 位即可得到新序列 $\{a_{i, k}\}$，$\{b_{j, k}\}$ ，这些新序列其实都是 $01$ 序列．

说是求两组数的异或和，其实要干这样一件事：**只单独看某一比特位，两组数都变成了 $01$ 序列，我们要求的是从这两个 $01$ 序列中分别取出一个比特，能组成 $(1, 0)$ 或者 $(0, 1)$ 对的方案数，最后将这个方案数安置在最终结果比特位第 $k$ 位上．**

> 例如序列 $\{a_i\} = \{1, 2, \cdots, 10\}$，要求
> $$
> \sum_{i=1}^{9}\sum_{j=i+1}^{10}(a_i \oplus a_j)
> $$
> 关注比特位第 $0$ 位到第 $3$ 位，分别有
> $$
> \begin{align*}
> \{a_{i,0}\} &= \{1, 0, 1, 0, 1, 0, 1, 0, 1, 0\} \\
> \{a_{i,1}\} &= \{0, 1, 1, 0, 0, 1, 1, 0, 0, 1\} \\
> \{a_{i,2}\} &= \{0, 0, 0, 1, 1, 1, 1, 0, 0, 0\} \\
> \{a_{i,3}\} &= \{0, 0, 0, 0, 0, 0, 0, 1, 1, 1\} \\
> \end{align*}
> $$
> 从 $\{a_{i,0}\}$ 拎出两个比特，能组成 $(0, 1)$ 无序对的方案有 $5 \times 5 = 25$ 种；
>
> 从 $\{a_{i,1}\}$ 拎出两个比特，能组成 $(0, 1)$ 无序对的方案有 $5 \times 5 = 25$ 种；
>
> 从 $\{a_{i,2}\}$ 拎出两个比特，能组成 $(0, 1)$ 无序对的方案有 $6 \times 4 = 24$ 种；
>
> 从 $\{a_{i, 3}\}$ 拎出两个比特，能组成 $(0, 1)$ 无序对的方案有 $7 \times 3 = 21$ 种；
>
> 把这 $4$ 个数安置在最终答案的比特位里：
> $$
> \text{ans} = 25 + 25 \times 2 + 24 \times 2^2 + 21 \times 2^3 = 339
> $$

参考代码：

```cpp
#define int long long;
constexpr int MAXB = 32;
constexpr int MOD = 1e9 + 7;

int xor_sum(vector<int> &a, vector<int> &b, int n, int m) {
  // 前缀优化
  vector<vector<int>> a0pre(MAXB, vector<int>(n + 1));
  vector<vector<int>> a1pre(MAXB, vector<int>(m + 1));
  vector<vector<int>> b0pre(MAXB, vector<int>(n + 1));
  vector<vector<int>> b1pre(MAXB, vector<int>(m + 1));
  auto _get = [](vector<int> &arr, int L, int R) {
    return arr[R] - arr[L - 1];
  };
  for (int k = 0; k < MAXB; k++) {
    for (int i = 1; i <= n; i++) {
      if ((a[i - 1] >> k) & 1) {
        a1pre[k][i] = a1pre[k][i - 1] + 1; // 统计第 k 位是 1 的个数的前缀和
        a0pre[k][i] = a0pre[k][i - 1];
      } else {
        a0pre[k][i] = a0pre[k][i - 1] + 1; // 统计第 k 位是 0 的个数的前缀和
        a1pre[k][i] = a1pre[k][i - 1];
      }
    }
    for (int j = 1; j <= m; j++) {
      if ((b[j - 1] >> k) & 1) {
        b1pre[k][i] = b1pre[k][i - 1] + 1;
        b0pre[k][i] = b0pre[k][i - 1];
      } else {
        b0pre[k][i] = b0pre[k][i - 1] + 1;
        b1pre[k][i] = b1pre[k][i - 1];
      }
    }
  }
  // 多次查询
  int q;
  cin >> q;
  while (q--) {
    int aL, aR, bL, bR;
    cin >> aL >> aR >> bL >> bR;
    int ans = 0;
    for (int k = 0; k < MAXB; k++) {
      int tmp;
      tmp = _get(a0pre[k], aL, aR) * _get(b1pre[k], bL, bR); // a, b 的第 k 位分别是 0, 1
      tmp %= MOD;
      tmp <<= k; // 容易漏
      tmp %= MOD;
      ans += tmp;
      ans %= MOD;
      tmp = _get(a1pre[k], aL, aR) * _get(b0pre[k], bL, bR); // a, b 的第 k 位分别是 1, 0
      tmp %= MOD;
      tmp <<= k; // 容易漏
      tmp %= MOD;
      ans += tmp;
      ans %= MOD;
    }
    cout << ans << endl;
  }
}
```

## 判定

1. 判断是否为 $2$ 的幂：`x & (x - 1)`
2. 截取第 $k$ 位是否为 $1$：`(x >> k) & 1`
3. 树状数组中的 `lowbit(x)`：`x & -x`

## 其他

1. $a \mid b = a \:\&\: b + a \oplus  b$

2. $a + b = a \mid b + a \:\&\:b$

3. $a + b = (a \oplus  b) + ((a \:\&\: b) \ll 1)$

4. $\left\lfloor\dfrac{a + b}{2}\right\rfloor = ((a \oplus  b) \gg1) + (a \:\&\: b)$
