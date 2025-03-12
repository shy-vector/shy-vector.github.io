---
title: 简单数论
date: 2024-12-03 00:25:00
author: Shy_Vector
tags:
  - 数学
  - 数论
  - 算法
sponsor: true
copyright: true
nav: true
---

本文主要记录算法竞赛中简单的数论知识．

<!-- more -->

## 快速幂

用 $p-1$ 对 $B$ 进行带余除法，并根据模的乘法法则、费马小定理，得
$$
A^B \equiv a^{q(p-1)+b}\equiv \left(a^q\right)^{p-1} \cdot a^b\equiv a^b\:(\text{mod}\:p)
$$
考虑将 $b$ 写成二进制形式
$$
\begin{aligned}
b &= c_0 \cdot 2^0 + c_1 \cdot 2^1 + c_2 \cdot 2^2 + \cdots + c_n \cdot 2^n \\
  &= 2^{k_0} + 2^{k_1} + \cdots + 2^{k_m}
\end{aligned}
$$
其中 $c_i \in \{0, 1\}$，$i = 0, 1, 2, \cdots, n$，此时
$$
\begin{aligned}
a^b &= a^{2^{k_0} + 2^{k_1} + \cdots + 2^{k_m}} \\
    &= a^{2^{k_0}} a^{2^{k_1}} \cdots a^{2^{k_m}}
\end{aligned}
$$
记 $a^{2^{k_i}}$ 为 $\text{bas}$，那么就可以不断平方
$$
(a^{2^{k_i}})^2=a^{2^{k_i+1}}
$$
即可得到一系列的 $\text{bas}$，只需不断在二进制数位为 $1$ 的时候，将 $\text{bas}$ 乘到结果 $\text{res}$ 即可．

```cpp
using ll = long long;
ll fpow(ll x, ll y, ll MOD) {
  x %= MOD; y %= MOD - 1;
  ll res = 1, bas = x;
  while (y) {
    if (y & 1) res = res * bas % MOD;
    bas = bas * bas % MOD;
    y >>= 1;
  }
  return res;
}
```

## 单逆（素数模）

$p$ 为质数，且 $a$ 不是 $p$ 的倍数，由费马小定理得
$$
a^{p-1} \equiv a \cdot a^{p-2} \equiv 1 \:(\text{mod}\:p)
$$
故 $a^{p-2}$ 即为$a$的逆．

```cpp
using ll = long long;
ll inv(ll a, ll MOD) {
  return fpow(a, MOD - 2, MOD);
}
```

## 多逆（素数模）

$p$ 为质数，使用递推法求多个逆．假设小于 $i$ 的整数的逆均以求出 ($i > 1$)，此时欲求 $i^{-1}$：

用 $i$ 对 $p$ 进行带余除法得
$$
p = \lfloor p\,/\,i\rfloor \cdot i + p\:\text{mod}\:i
$$
即
$$
\lfloor p\,/\,i\rfloor \cdot i + p\:\text{mod}\:i \equiv 0 \:(\text{mod}\:p)
$$
由于 $p \:\text{mod}\: i < i < p$，且 $p$ 为质数，故 $p \:\text{mod}\: i$ 必然可逆．上式两边同时乘以 $i^{-1}\cdot(p\:\text{mod}\:i)^{-1}$ 得
$$
\lfloor p\,/\,i\rfloor \cdot (p\:\text{mod}\:i)^{-1} + i^{-1} \equiv 0 \:(\text{mod}\:p)
$$
移项得
$$
\begin{aligned}
i^{-1} &\equiv -\lfloor p\,/\,i\rfloor \cdot (p\:\text{mod}\:i)^{-1} \\
&\equiv (p-\lfloor p\,/\,i\rfloor) \cdot (p\:\text{mod}\:i)^{-1}\:\:(\text{mod}\:p)
\end{aligned}
$$
由于 $p \:\text{mod}\: i < i$，故 $(p\:\text{mod}\:i)^{-1}$ 已求出，上式即为递推式．

初始条件：当 $i = 1$ 时，$i^{-1} = 1$．

```cpp
using ll = long long;
ll inv[N];
void get_invs(ll p) {
  inv[1] = 1;
  for (ll i = 2; i < N; i++) {
    inv[i] = (p - p / i) * inv[p % i] % p;
  }
}
```

时间复杂度为 $O(n)$.

## GCD

1. 值域：$\text{gcd}(a, b) \le \min(a, b)$;

2. $\gcd\left(\dfrac{a}{\gcd(a, b)}, \dfrac{b}{\gcd(a, b)}\right) = 1$;

3. 更相减损术：当 $a > b$ 时，$\text{gcd}(a, b) = \text{gcd}(a - b, b) \le \min(a - b, b)$，

   当 $a \gg b$ 时，最坏复杂度 $O(n)$;

4. 辗转相除法：当 $a > b$ 时，$\text{gcd}(a, b) = \text{gcd}(b, a \:\text{mod}\: b) \le a \:\text{mod}\: b$，

   当 $a$，$b$ 是斐波那契数列邻项时，最坏复杂度 $O(n)$;

5. 已知公有因子：$\gcd(ka, kb) = k\gcd(a, b)$;

6. 幂的最大公约数：$\gcd(a^n, b^n) = \gcd^n(a, b)$;

7. 单方素因子缺失：若 $p \mid a$ 且 $p \nmid b$，$p$ 为素数，则 $\gcd(a, b) = \gcd\left(\dfrac{a}{p^k}, b\right)$，其中 $p \nmid \dfrac{a}{p^k}$;

8. Stein算法：当 $a > b$ 时，$\gcd(a, b) = \begin{cases}2\gcd(a \,/\, 2, b \,/\, 2), &a, b\:\text{are even} \\ \gcd(a \,/\, 2, b), &a \:\text{is even,}\:b\:\text{is odd} \\ \gcd(a, b \,/\, 2), &a\:\text{is odd,}\:b\:\text{is even}\\ \gcd(a - b, b), &a, b\:\text{are odd}\end{cases}$

   最坏复杂度 $O(\log n)$.

## EGCD

欲求丢番图方程
$$
ax+by=\text{gcd}(a, b)
$$
特解，需使用拓展欧几里得算法，模板如下：

```cpp
using ll = long long;
// return gcd, particular solution x and y.
ll exgcd(ll a, ll b, ll &x, ll &y) {
  if (b == 0) { x = 1; y = 0; return a; } // ax = a
  ll res = exgcd(b, a % b, y, x); // x <-> y
  y -= a / b * x; // wtf
  return res;
}
```

欲求
$$
aX+bY=c
$$
通解，由于方程有解，故 $\text{gcd}(a, b)\,|\,c$，两边同时乘以 $\text{gcd}(a, b)\,/\,c$ 得
$$
a\cdot\frac{\text{gcd}(a, b)}{c}X+b\cdot\frac{\text{gcd}(a, b)}{c}Y=\text{gcd}(a, b)
$$
使用拓展欧几里得算法，得 $x_0 = \text{gcd}(a, b) \cdot X_0 \,/\, c$，$y_0 = \text{gcd}(a, b) \cdot Y_0 \,/\, c$，即特解
$$
X_0 = \frac{c}{\text{gcd}(a, b)}x_0, \quad Y_0 = \frac{c}{\text{gcd}(a, b)}y_0
$$
通解
$$
X = X_0 + k \cdot \frac{b}{\text{gcd}(a,b)}, \quad Y = Y_0 - k \cdot \frac{a}{\text{gcd}(a,b)}
$$
其中 $k$ 为任意整数．$X$ 的最小正整数解为
$$
X_\text{min} = \left(X_0 \:\text{mod}\:\frac{b}{\text{gcd}(a,b)} + \frac{b}{\text{gcd}(a,b)}\right)\:\text{mod}\:\frac{b}{\text{gcd}(a,b)}
$$

## 单逆

$\text{gcd}(a, m) = 1$，同余方程
$$
ax \equiv 1 \:(\text{mod}\:m)
$$
即丢番图方程
$$
ax + my = 1
$$
欲求 $x$，只需使用拓展欧几里得算法求出该丢番图方程的一组特解 $x_0$ 与 $y_0$，再推出最小整数解即可．

```cpp
using ll = long long;
ll inv(ll a, ll MOD) {
  ll x, y;
  exgcd(a, MOD, x, y);
  return ((x % MOD) + MOD) % MOD; // b / gcd = b
}
```

## 除法化为乘以逆

定义除法的模
$$
(a \,/\, b) \:\text{mod}\:m = (ab^{-1}) \:\text{mod}\:m
$$
特别地，若 $p$ 为质数，则
$$
(a \,/\, b) \:\text{mod}\:p = (ab^{-1}) \:\text{mod}\:p = (ab^{p-2}) \:\text{mod}\:p
$$

## 排列数之和

$$
\begin{aligned}
\text{A}_n^1 &= n \\
\text{A}_n^2 &= n(n-1) \\
\text{A}_n^3 &= n(n-1)(n-2) \\
&\:\:\,\vdots \\
\text{A}_n^{n-1} &= n(n-1)(n-2) \cdots \times 2 \\
\text{A}_n^n &= n(n-1)(n-2) \cdots \times 2 \times 1\\
\end{aligned}
$$

观察可知
$$
 \sum\limits_{k=1}^n \text{A}_n^k = n\left(1 + \sum\limits_{k=1}^{n-1}\text{A}_n^k\right)
$$
这实质上是递推式，时间复杂度为 $O(n)$．

## 组合数（素数模）

一般使用逆元求组合数
$$
\text{C}_n^k \equiv \frac{n!}{k!(n-k)!} \equiv n!(k!)^{-1}((n-k)!)^{-1} \:(\text{mod}\:p)
$$
其中阶乘与阶乘的逆均可以 $O(n)$ 的时间预处理．对于阶乘的逆，如果从小到大递推
$$
(i!)^{-1}\equiv i^{-1}((i-1)!)^{-1}\:(\text{mod}\:p)
$$
实质上仍求了 $n$次 逆元，没有达到优化的效果，但从大到小递推
$$
(i!)^{-1}\equiv(i+1)((i+1)!)^{-1}\:(\text{mod}\:p)
$$
总共只求了一次逆元：$(n!)^{-1}$．总时间复杂度为 $O(n \log p)$．

```cpp
#define MAXN (2e5 + 5)
#define MOD (1e9 + 7)
using ll = long long;

ll fpow(ll x, ll y) {
  x %= MOD; y %= MOD - 1;
  ll bas = x, res = 1;
  while (y) {
    if (y & 1) res = res * bas % MOD;
    bas = bas * bas % MOD;
    y >>= 1;
  }
}

ll inv(ll a) {
  return fpow(a, MOD - 2);
}

ll fac[MAXN + 1], fac_inv[MAXN + 1];
void fac_init() {
  fac[0] = 1;
  for (ll i = 1; i <= MAXN; i++) {
    fac[i] = fac[i-1] * i % MOD;
  }
  fac_inv[MAXN] = inv(fac[MAXN]);
  for (ll i = MAXN - 1; i >= 0; i--) {
    fac_inv[i] = fac_inv[i+1] * (i+1) % MOD;
  }
}

ll comb(ll n, ll k){
  if (k > n || k < 0) return 0;
  return fac[n] * fac_inv[k] % MOD * fac_inv[n-k] % MOD;
}
```

若 $n$ 或 $k$ 大于 $p$，以至于 $k!$ 或 $(n-k)!$ 产生了因数 $p$，即 $p\,|\,k!$ 或 $p\,|\,(n-k)!$，不能保证其逆元存在，此时便可以使用卢卡斯定理化归
$$
\text{C}_n^k\equiv\text{C}_{n/p}^{k/p}\cdot\text{C}_{n\:\text{mod}\:p}^{k\:\text{mod}\:p}\:(\text{mod}\:p)
$$
其中 $\text{C}_{n\:\text{mod}\:p}^{k\:\text{mod}\:p}$ 可以使用逆元以 $O(1)$ 的时间求解，对剩下的 $\text{C}_{n/p}^{k/p}$ 继续使用卢卡斯定理，递归实现（数据过大没法预处理，直接单解）

```cpp
ll Lucas(ll n, ll k) {
  if (k == 0) return 1; // Don't forget that it's a recursion! And for n, k, k->0 faster!
  return comb(n % MOD, k % MOD) * Lucas(n / MOD, k / MOD);
}
```
