---
title: (ML-0) 微积分与线性代数
date: 2025-02-22 10:19:00
author: Shy_Vector
tags:
  - 机器学习
  - 数学
  - 微积分
  - 线性代数
sponsor: true
copyright: true
nav: true
---

机器学习的梯度下降法离不开微积分（尤其是 **涉及矩阵乃至高维张量的微积分**），机器学习涉及的大量元素的批量操作离不开线性代数（科学计算工具为批量操作提供了一系列的优化）．

<!-- more -->

参考：[Matrix calculus - Wikipedia](https://en.wikipedia.org/wiki/Matrix_calculus)

## 变量说明

不加说明的情况下：

1. 非粗体小写字母 ($x$，$a$，$u$，$v$) 为标量；
2. 粗体小写字母 ($\mathbf{x}$，$\mathbf{a}$，$\mathbf{u}$，$\mathbf{v}$) 为向量；
3. 非粗体大写字母 ($X$，$A$，$U$，$V$) 为矩阵；
4. $x$、$\mathbf{x}$、$X$ 表示自变量；
5. $a$，$\mathbf{a}$，$A$ 表示常量；
6. $u$，$v$，$\mathbf{u}$，$\mathbf{v}$，$U$，$V$ 表示关于 $x$、$\mathbf{x}$、$X$ 的因变量；
7. $f$，$g$ 表示标量函数 (标量场)；
8. $\mathbf{F}$，$\mathbf{G}$ 表示向量函数 (向量场)．

## 向量对标量的导数

1. 常向量

$$
\begin{align*} \frac{\mathrm{d} \mathbf{a}}{\mathrm{d} x} = \mathbf{0} \\ \frac{\mathrm{d}}{\mathrm{d} x}(f(x) \mathbf{a}) = \mathbf{0}\end{align*}
$$

2. 标量乘向量

$$
\frac{\mathrm{d}}{\mathrm{d} x}(a \mathbf{v}) = a \frac{\mathrm{d} \mathbf{v}}{\mathrm{d} x}
$$

3. 矩阵乘向量

$$
\frac{\mathrm{d}}{\mathrm{d} x}(A \mathbf{v}) = A\frac{\mathrm{d} \mathbf{v}}{\mathrm{d} x}
$$

4. 转置

$$
\frac{\mathrm{d} \mathbf{v}^\top}{\mathrm{d} x} = \left( \frac{\mathrm{d} \mathbf{v}}{\mathrm{d} x} \right)^\top
$$

5. 外积

$$
\begin{align*}\frac{\mathrm{d}}{\mathrm{d} x}(\mathbf{u} \times \mathbf{v}) &= \frac{\mathrm{d} \mathbf{u}}{\mathrm{d} x} \times \mathbf{v} + \mathbf{u} \times \frac{\mathrm{d} \mathbf{v}}{\mathrm{d} x} \\ \frac{\mathrm{d}}{\mathrm{d} x}(\mathbf{a} \times \mathbf{v}) &= \mathbf{a} \times \frac{\mathrm{d} \mathbf{v}}{\mathrm{d} x}\end{align*}
$$

6. 向量场

$$
\frac{\mathrm{d}}{\mathrm{d} x}\mathbf{F}(\mathbf{u}) = \frac{\partial \mathbf{F}}{\partial \mathbf{u}}\frac{\mathrm{d} \mathbf{u}}{\mathrm{d} x}
$$

即雅可比矩阵和向量的乘积．

## 标量对向量的导数 (梯度)

1. 常数

$$
\nabla_{\mathbf{x}}(a)=\frac{\partial a}{\partial \mathbf{x}} = \mathbf{0}
$$

2. 乘积

$$
\nabla_{\mathbf{x}}(uv) = \frac{\partial}{\partial \mathbf{x}} (uv) = v\frac{\partial u}{\partial \mathbf{x}} + u\frac{\partial v}{\partial \mathbf{x}} = v\nabla_{\mathbf{x}}u + u\nabla_{\mathbf{x}}v
$$

3. 链式法则

$$
\begin{align*} \nabla_{\mathbf{x}}f(u) &= \frac{\partial}{\partial \mathbf{x}} f(u) = \frac{\mathrm{d}f(u)}{\mathrm{d} u}\frac{\partial u}{\partial \mathbf{x}} = f'(u) \nabla_{\mathbf{x}} u \\ \nabla_{\mathbf{x}}f &= \frac{\partial f}{\partial \mathbf{x}} = \left( \frac{\partial \mathbf{u}}{\partial \mathbf{x}} \right)^\top \frac{\partial f}{\partial \mathbf{u}} = \left( \frac{\partial \mathbf{v}}{\partial \mathbf{u}}\frac{\partial \mathbf{u}}{\partial \mathbf{x}} \right)^\top \frac{\partial f}{\partial \mathbf{v}} = \left( \frac{\partial \mathbf{w}}{\partial \mathbf{v}}\frac{\partial \mathbf{v}}{\partial \mathbf{u}}\frac{\partial \mathbf{u}}{\partial \mathbf{x}} \right)^\top \frac{\partial f}{\partial \mathbf{w}}\end{align*}
$$

4. 内积

$$
\begin{align*}\nabla_{\mathbf{x}} (\mathbf{u}^\top\mathbf{v}) = \frac{\partial}{\partial \mathbf{x}}(\mathbf{u}^\top\mathbf{v}) &= \frac{\partial \mathbf{u}}{\partial \mathbf{x}}\mathbf{v} + \frac{\partial \mathbf{v}}{\partial \mathbf{x}}\mathbf{u} \\ \nabla_{\mathbf{x}} (\mathbf{a}^\top\mathbf{v}) = \frac{\partial}{\partial \mathbf{x}}(\mathbf{a}^\top\mathbf{v}) &= \frac{\partial \mathbf{v}}{\partial \mathbf{x}}\mathbf{a} \\ \nabla_{\mathbf{x}} (\mathbf{a}^\top\mathbf{x}) = \frac{\partial}{\partial \mathbf{x}}(\mathbf{a}^\top\mathbf{x}) &= \mathbf{a} \\ \nabla_{\mathbf{x}} (\mathbf{x}^\top\mathbf{x}) = \frac{\partial}{\partial \mathbf{x}}(\mathbf{x}^\top\mathbf{x}) &= 2\mathbf{x}\end{align*}
$$

其中 $\frac{\partial \mathbf{u}}{\partial \mathbf{x}}$，$\frac{\partial \mathbf{v}}{\partial \mathbf{x}}$ 是雅可比矩阵．

5. 二次型 ($A$ 为对称矩阵)

$$
\begin{align*} \nabla_{\mathbf{x}}(\mathbf{x}^\top A \mathbf{x}) = \frac{\partial}{\partial \mathbf{x}}(\mathbf{x}^\top A \mathbf{x}) = 2A\mathbf{x} \\ \nabla_{\mathbf{x}}\nabla_{\mathbf{x}}^\top (\mathbf{x}^\top A \mathbf{x}) = \frac{\partial^2}{\partial \mathbf{x} \partial \mathbf{x}^\top }(\mathbf{x}^\top A \mathbf{x}) = 2A \end{align*}
$$

## 向量对向量的导数 (雅可比矩阵)

1. 常向量

$$
\frac{\partial \mathbf{a}}{\partial \mathbf{x}} = O
$$

2. 自身向量

$$
\frac{\partial \mathbf{x}}{\partial \mathbf{x}} = I
$$

3. 标量乘向量

$$
\begin{align*} \frac{\partial}{\partial \mathbf{x}}(a\mathbf{v}) &= a\frac{\partial \mathbf{v}}{\partial \mathbf{x}} \\ \frac{\partial}{\partial \mathbf{x}}(v \mathbf{a}) &= \frac{\partial v}{\partial \mathbf{x}} \mathbf{a}^\top \\ \frac{\partial}{\partial \mathbf{x}}(a\mathbf{x}) &= a I\end{align*}
$$

4. 矩阵乘向量

$$
\begin{align*}\frac{\partial}{\partial \mathbf{x}}(A\mathbf{v}) &= \frac{\partial \mathbf{v}}{\partial \mathbf{x}} A^\top \\ \frac{\partial}{\partial \mathbf{x}}(A \mathbf{x}) &= A^\top\end{align*}
$$

5. 向量场

$$
\frac{\partial}{\partial \mathbf{x}} \mathbf{F}(\mathbf{u}) = \frac{\partial \mathbf{F}}{\partial \mathbf{u}}\frac{\partial \mathbf{u}}{\partial \mathbf{x}}
$$
即两个雅可比矩阵的乘积．

## 正定

若 $A$ 正定，则

1. （**对称性**）$A$ 是对称矩阵；
2. （**二次型**）$\forall\, \mathbf{x} \ne 0$，$\mathbf{x}^\top A \mathbf{x} > 0$．类似 $y = ax^2$，$a > 0$；
3. （特征值）$A$ 的所有特征值 $\lambda_{i} > 0$．相当于在线性变换中，空间不被压缩或被翻转任何方向；
4. （椭球）$\mathbf{x}^\top A \mathbf{x} = 1$ 在二维上是椭圆、三维上是椭球；
5. （Sylvester 准则）各阶顺序主子式全正；
6. （可逆性）$A$ 可逆（非奇异、满秩、行列式非零），且 $A^{-1}$ 正定；
7. （​Cholesky 分解）$A$ 可被唯一分解成 $A=LL^\top$，其中 $L$ 为下三角矩阵且主对角线元素全正；
8. （**凹凸性**）$\mathbf{x}^\top A \mathbf{x}$ 为严格凸函数（convex），在 $\mathbf{x} = \mathbf{0}$ 处取全局唯一最小值 $0$，用于 **凸优化**；
9. （对角线）$A$ 的主对角线元素全正；
10. （标准型）$A$ 合同于 $I$，即存在可逆矩阵 $P$ 使得 $P^\top AP = I$，即二次型可化为标准型 $\sum y_{i}^2$；
11. （迹为正）$\mathrm{tr}\,A = \sum \lambda_{i} > 0$；
12. （惯性）正惯性指数为 $n$，负惯性指数为 $0$，二次型仅含正平方项；
13. （平方根）存在唯一的正定矩阵 $B$，使得 $B^2 = A$．类似正数的算术平方根；

正定矩阵在优化问题、数值计算中具有广泛的应用，例如 **共轭梯度法**．

## 合同：保持类型的变形

对于同型矩阵 $A$，$B$，若存在可逆矩阵 $P$，使得 $P^\top A P = B$，则称 $A$ 与 $B$ 合同．

合同矩阵描述的是 **同一个二次型** 在 **不同坐标变换** 下的表现形式，**保持几何体的形状类型**（椭球、双曲面）．

> 想象一个橡皮泥捏成的球体，你可以拉伸或压缩它，使其变成椭球，但无法将其变成马鞍形．

在这里，“拉伸或压缩” 对应可逆的合同变换 $P$，尽管形状、大小发生改变（不保持特征值），但 **类型不变**：你不可能通过捏椭球（正定：正惯性指数为 $n$，负惯性指数为 $0$）捏出一个双曲面（正惯性指数小于 $n$，负惯性指数大于 $0$）！这就是合同变换的 **惯性定理**：合同变换保持惯性指数．特别地，合同变换保持正定性．

> 比如二次型 $x^2 + 2y^2$ 对应矩阵 $\begin{bmatrix*} 1 & 0 \\ 0 & 2 \end{bmatrix*}$，通过合同变换 $P = \begin{bmatrix*} 1 & 1 \\ 0 & 1 \end{bmatrix*}$ 得到
>
> $$
> B = P^\top A P = \begin{bmatrix*} 1 & 1 \\ 0 & 1 \end{bmatrix*}^\top\begin{bmatrix*} 1 & 0 \\ 0 & 2 \end{bmatrix*}\begin{bmatrix*} 1 & 1 \\ 0 & 1 \end{bmatrix*} = \begin{bmatrix*} 3 & 2 \\ 2 & 3 \end{bmatrix*}
> $$
>
> 对应的新二次型为 $3x'^2 + 4x'y' + 3y'^2$，尽管大小变化，形状变化、倾斜，但仍是椭圆（正定）．

除此之外，合同变换还保持秩、**对称性**，但不保持特征值．

## 相似：同一变换的不同视角

对于同型矩阵 $A$，$B$，若存在可逆矩阵 $P$，使得 $P^{-1} A P = B$，则称 $A$ 与 $B$ 相似．

相似矩阵描述的是 **同一个线性变换** 在 **不同基** 下的表现形式，**保持变换的数量特征**（特征值、行列式、迹、秩）．

> 小明从 $A$ 点走到 $B$ 点．你在正视情况下，小明从左边走到了右边；在斜视情况下，小明从左上方走到了右下方．小明客观上就是从 $A$ 点走到了 $B$ 点，走过的路程（数量特征）不受你视角的影响，但走的方向（非数量特征）会随着你的视角不同而改变．“正视着看到小明从左边走到右边”和“斜视着看到小明从左上走到右下”描述了同一个事实：小明从 $A$ 点走到了 $B$ 点．

在这里，小明走路是线性变换，矩阵“小明从左边走到右边”与矩阵“小明从左上走到右下”相似，$P$ 就是视角的切换．

## 凸性分析

考虑二次型

$$
f(\mathbf{x}) = \frac{1}{2}\mathbf{x}^\top A\mathbf{x} - \mathbf{x}^\top \mathbf{b} + c
$$

其凸性由 Hessian 矩阵

$$
(\nabla_{\mathbf{x}}\nabla_{\mathbf{x}}^\top) f = \frac{\partial^2 f}{\partial \mathbf{x} \partial \mathbf{x}^\top } = A
$$

的正定性决定．要判断该矩阵是否正定，一般通过 **惯性指数判定**（低阶手算一般用各阶顺序主子式的正负性）．这时由于原矩阵的惯性指数不好直接得到，我们需要对其进行 **合同变换**（保持惯性指数均不变），转化成易得惯性指数的 **对角矩阵**：

$$
P^\top AP = D
$$

1. 如果 $A$ 对称，那么可以对 $A$ 进行对角化，即可得到正交矩阵 $P$ 和对角矩阵 $D$；
2. 更进一步，如果 $A$ 正定，那么可以对 $A$ 进行 ​Cholesky 分解 $A = L L^\top$，得 $P = L^{-1}$ 和 $D = I$．

若 $A$ 正定，则令一阶导

$$
\nabla_{\mathbf{x}}f = \frac{\partial f}{\partial \mathbf{x}} = A \mathbf{x} - \mathbf{b} = \mathbf{0}
$$

若有解，得到线性方程

$$
A \mathbf{x} = \mathbf{b}
$$

的解 $\mathbf{x}^*$ 即为最小值点．由于 $A$ 正定，$A$ 满秩，$A$ 可逆，于是该最小值点有唯一性．
