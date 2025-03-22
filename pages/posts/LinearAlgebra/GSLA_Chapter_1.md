---
title: GSLA Chapter 1 Problem Set (Optional)
date: 2024-10-5 23:25:38
author: Shy_Vector
tags:
  - 数学
  - 线性代数
  - GSLA
sponsor: true
copyright: true
nav: true
---

## Problem Set 1.1

1. *Compute $\boldsymbol{u} + \boldsymbol{v} + \boldsymbol{w}$ and $2\boldsymbol{u} + 2\boldsymbol{v} + \boldsymbol{w}$. How do you know $\boldsymbol{u}$, $\boldsymbol{v}$, $\boldsymbol{w}$ lie in a plane?*

$$
\boldsymbol{u} = \begin{bmatrix*}[r] 1 \\ 2 \\ 3\end{bmatrix*}, \quad \boldsymbol{v} = \begin{bmatrix*}[r] -3 \\ 1 \\ -2\end{bmatrix*}, \quad \boldsymbol{w} = \begin{bmatrix*}[r] 2 \\ -3 \\ -1\end{bmatrix*}.
$$

> **Proof**
> We can find $c$ and $d$ s.t. $\boldsymbol{w} = c \boldsymbol{u} + d \boldsymbol{v}$, which can be done by solving three linear equations
> $$
>  \left\{
>  \begin{align*}
>  c - 3d &= 2 \\
>  2c + d &= -3 \\
>  3c - 2d &= 1
>  \end{align*}
>  \right.
> $$
> The solution to these equations is
> $$
>  \left\{
>  \begin{align*}
>  c = -1\\
>  d = -1
>  \end{align*}
>  \right.
> $$
> Hence $\boldsymbol{u}$, $\boldsymbol{v}$, $\boldsymbol{w}$ lie in a plane.

2. *Every combination of $\boldsymbol{v} = (1, -2, 1)$ and $\boldsymbol{w} = (0, 1, -1)$ has components that add to $\_\_\_\_$ . Find $c$ and $d$ so that $c \boldsymbol{v} + d \boldsymbol{w} = (3, 3, -6)$. Why is $(3, 3, 6)$ impossible?*

> **Blank**
> $0$
> **Solution**
> Solving the system of equations
> $$
> \left\{
> \begin{align*}
> c &= 3 \\
> -2c + d &= 3 \\
> c - d &= -6
> \end{align*}
> \right.
> $$
> we get
> $$
> \left\{
> \begin{align*}
> c &= 3\\
> d &= 9
> \end{align*}
> \right.
> $$
> **Proof**
> In the process of solving the system of equations
> $$
> \left\{
> \begin{align*}
> c &= 3 \\
> -2c + d &= 3 \\
> c - d &= 6
> \end{align*}
> \right.
> $$
> we will get the formula $0 = 1$, which is ridiculous. Thus $(3, 3, 6)$ is impossible.

3. *Find vectors $\boldsymbol{v}$ and $\boldsymbol{v}$ so that $\boldsymbol{v} + \boldsymbol{w} = (4, 5, 6)$ and $\boldsymbol{v} - \boldsymbol{w} = (2, 5, 8)$. This is a question with $\_\_\_\_$ unknown numbers, and an equal number of equations to find those numbers.*

> **Blank**
> $6$

## Problem Set 1.2

1. *For any unit vectors v and w, find the dot products (actual numbers) of*
   $$
   \text{(a)}\quad \boldsymbol{v} \,\,\text{and}\, -\boldsymbol{v} \qquad \text{(b)}\quad \boldsymbol{v} + \boldsymbol{w} \,\,\text{and}\,\, \boldsymbol{v} - \boldsymbol{w} \qquad \text{(c)}\quad \boldsymbol{v} - 2 \boldsymbol{w} \,\,\text{and}\,\, \boldsymbol{v} + 2 \boldsymbol{w}
   $$

> **Solution**
> $\boldsymbol{v}$ and $\boldsymbol{w}$ are both unit vectors, which implies that $\boldsymbol{v} \cdot \boldsymbol{v} = 1$ and $\boldsymbol{w} \cdot \boldsymbol{w} = 1$.
> (a) $\boldsymbol{v} \cdot (-\boldsymbol{v}) = -\boldsymbol{v} \cdot \boldsymbol{v} = -1$.
> (b) $(\boldsymbol{v} + \boldsymbol{w}) \cdot (\boldsymbol{v} - \boldsymbol{w}) = \boldsymbol{v} \cdot \boldsymbol{v} - \boldsymbol{w} \cdot \boldsymbol{w} = 1 - 1 = 0$.
> (c) $(\boldsymbol{v} - 2\boldsymbol{w}) \cdot (\boldsymbol{v} + 2\boldsymbol{w}) = \boldsymbol{v} \cdot \boldsymbol{v} + \boldsymbol{v} \cdot 2\boldsymbol{w} -2\boldsymbol{w} \cdot \boldsymbol{v} - 4 \boldsymbol{w} \cdot \boldsymbol{w} = 1 - 4 = -3$

2. *Find the angle $\theta$ (from its cosine) between these pairs of vectors:*

$$
\begin{aligned}
  &\text{(a)}\quad \boldsymbol{v} = \begin{bmatrix*}[c] 1 \\ \sqrt{3}\end{bmatrix*} \,\,\text{and}\,\, \boldsymbol{w} = \begin{bmatrix*}[c] 1 \\ 0\end{bmatrix*} & &
  \text{(b)}\quad \boldsymbol{v} = \begin{bmatrix*}[r] 2 \\ 2 \\ -1\end{bmatrix*} \,\,\text{and}\,\, \boldsymbol{w} = \begin{bmatrix*}[r] 2 \\ -1 \\ 2\end{bmatrix*} \\
  &\text{(c)}\quad \boldsymbol{v} = \begin{bmatrix*}[c] 1 \\ \sqrt{3}\end{bmatrix*} \,\,\text{and}\,\, \boldsymbol{w} = \begin{bmatrix*}[c] -1 \\ \sqrt{3}\end{bmatrix*} & &
  \text{(d)}\quad \boldsymbol{v} = \begin{bmatrix*}[c] 3 \\ 1\end{bmatrix*} \,\,\text{and}\,\, \boldsymbol{w} = \begin{bmatrix*}[c] -1 \\ -2\end{bmatrix*} \\
  \end{aligned}
$$

> **Solution**
> (a) $\cos \theta = \dfrac{\boldsymbol{v} \cdot \boldsymbol{w} }{||\boldsymbol{v}||\,||\boldsymbol{w}||} = \dfrac{1 \cdot 1 + \sqrt{3} \cdot 0}{\sqrt{1^2 + (\sqrt{3})^2} \, \sqrt{\vphantom{(\sqrt{3})}1^2 + 0^2} } = \dfrac{1}{2}$, so $\theta$ is equal to $\dfrac{\pi}{3}$.
> (b) $\cos \theta = \dfrac{\boldsymbol{v} \cdot \boldsymbol{w} }{||\boldsymbol{v}||\,||\boldsymbol{w}||} = \dfrac{2 \cdot 2 + 2 \cdot (-1) + (-1) \cdot 2}{\sqrt{2^2 + 2^2 + (-1)^2} \, \sqrt{2^2 + (-1)^2 + 2^2} } = 0$, so $\theta$ is equal to $\dfrac{\pi}{2}$.
> (c) $\cos \theta = \dfrac{\boldsymbol{v} \cdot \boldsymbol{w} }{||\boldsymbol{v}||\,||\boldsymbol{w}||} = \dfrac{1 \cdot (-1) + \sqrt{3} \cdot \sqrt{3} }{\sqrt{1^2 + (\sqrt{3})^2} \, \sqrt{(-1)^2 + (\sqrt{3})^2} } = \dfrac{1}{2}$, so $\theta$ is equal to $\dfrac{\pi}{3}$.
> (d) $\cos \theta = \dfrac{\boldsymbol{v} \cdot \boldsymbol{w} }{||\boldsymbol{v}||\,||\boldsymbol{w}||} = \dfrac{3 \cdot (-1) + 1 \cdot (-2)}{\sqrt{3^2 + 1^2} \, \sqrt{(-1)^2 + (-2)^2} } = -\dfrac{\sqrt{2} }{2}$, so $\theta$ is equal to $\dfrac{3\pi}{4}$.

3. *With $\boldsymbol{v} = (1, 1)$ and $\boldsymbol{w} = (1, 5)$ choose a number $c$ so that $\boldsymbol{w} - c \boldsymbol{v}$ is perpendicular to $\boldsymbol{v}$. Then find the formula for $c$ starting from any nonzero $\boldsymbol{v}$ and $\boldsymbol{w}$.*

> **Solution**
> To make $\boldsymbol{w} - c \boldsymbol{v}$ is perpendicular to $\boldsymbol{v}$, we have $(\boldsymbol{w} - c \boldsymbol{v}) \cdot \boldsymbol{v} = 0$, which can be simplified to
> $$
> c = \dfrac{\boldsymbol{w} \cdot \boldsymbol{v} }{\boldsymbol{v} \cdot \boldsymbol{v} }
> $$
> When $\boldsymbol{v} = (1, 1)$ and $\boldsymbol{w} = (1, 5)$, $c$ is equal to $3$.

4. *How could you prove $\sqrt[3]{xyz} \le \frac{1}{3}(x + y + z)$ (geometric mean is not greater than arithmetic mean)?*

> **Proof**
> Let $a = \sqrt[3]{x}$, $b = \sqrt[3]{y}$ and $c = \sqrt[3]{z}$, where they are all positive numbers. We have
> $$
> \begin{aligned}
> \dfrac{1}{3}(x+y+z) - \sqrt[3]{xyz}
> &= \dfrac{1}{3} (a^3 + b^3 + c^3 - 3abc) \\
> &= \dfrac{1}{3}((a+b)(a^2-ab+b^2) + c^3 - 3abc)\\
> &= \dfrac{1}{3}((a+b+c)(a^2-ab+b^2) + c^3 - 3abc - a^2c + abc - b^2c) \\
> &= \dfrac{1}{3}((a+b+c)(a^2-ab+b^2) + c(c^2 - 2ab - a^2 - b^2)) \\
> &= \dfrac{1}{3}((a+b+c)(a^2-ab+b^2) - c((a + b)^2 - c^2)) \\
> &= \dfrac{1}{3}((a+b+c)(a^2-ab+b^2) - c(a + b + c)(a + b - c)) \\
> &= \dfrac{1}{3}(a+b+c)(a^2-ab+b^2 - c(a+b-c)) \\
> &= \dfrac{1}{3}(a+b+c)(a^2 + b^2 + c^2 - (ab + bc + ca)) \\
> &= \dfrac{1}{3}(a+b+c)\left(\dfrac{1}{2}(a - b)^2 + \dfrac{1}{2}(b - c)^2 + \dfrac{1}{2}(c - a)^2\right) \\
> &= \dfrac{1}{6}(a+b+c)((a-b)^2 + (b-c)^2 + (c-a)^2) \\
> &\ge 0
> \end{aligned}
> $$
> Hence $\sqrt[3]{xyz} \le \frac{1}{3}(x + y + z)$, which is strict unless $a = b = c$, i.e. $x = y = z$.

## Problem Set 1.3

1. *Find the linear combination $3\boldsymbol{s}_1 + 4\boldsymbol{s}_2 + 5\boldsymbol{s}_3 = \boldsymbol{b}$. Then write $\boldsymbol{b}$ as a matrix-vector multiplication $S \boldsymbol{x}$, with $3$, $4$, $5$ in $\boldsymbol{x}$. Compute the three dot products (row of $S$) $\cdot\,\, \boldsymbol{x}$:*
   $$
   \boldsymbol{s}_1 = \begin{bmatrix*}[r] 1 \\ 1 \\ 1\end{bmatrix*}, \quad \boldsymbol{s}_2 = \begin{bmatrix*}[r] 0 \\ 1 \\ 1\end{bmatrix*}, \quad \boldsymbol{s}_3 = \begin{bmatrix*}[r] 0 \\ 0 \\ 1\end{bmatrix*} \quad \text{go into the columns of } S.
   $$

> **Solution**
> $\boldsymbol{b} = 3\boldsymbol{s}_1 + 4\boldsymbol{s}_2 + 5\boldsymbol{s}_3 = 3\begin{bmatrix*}[c] 1 \\ 1 \\ 1\end{bmatrix*} + 4\begin{bmatrix*}[c] 0 \\ 1 \\ 1\end{bmatrix*} + 5\begin{bmatrix*}[c] 0 \\ 0 \\ 1\end{bmatrix*} = \begin{bmatrix*}[c] 3 \\ 7 \\ 12\end{bmatrix*}$
>
> $\boldsymbol{b} = S \boldsymbol{x} = \begin{bmatrix*} 1 & 0 & 0 \\ 1 & 1 & 0 \\ 1 & 1 & 1\end{bmatrix*} \negthinspace \begin{bmatrix*}3 \\ 4 \\ 5\end{bmatrix*} = \begin{bmatrix*}(1, 0, 0) \cdot (3, 4, 5) \\ (1, 1, 0) \cdot (3, 4, 5) \\ (1, 1, 1) \cdot (3, 4, 5) \end{bmatrix*} = \begin{bmatrix*}1 \cdot 3 + 0 \cdot 4 + 0 \cdot 5 \\ 1 \cdot 3 + 1 \cdot 4 + 0 \cdot 5 \\ 1 \cdot 3 + 1 \cdot 4 + 1 \cdot 5 \end{bmatrix*} = \begin{bmatrix*} 3 \\ 7 \\ 12 \end{bmatrix*}$

2. *The last lines of the Worked Example say that the 4 by 4 centered difference matrix in (16) is invertible. Solve $C \boldsymbol{x} = (b_1, b_2, b_3, b_4)$ to find its inverse in $\boldsymbol{x} = C^{-1} \boldsymbol{b}$.*

> **Solution**
> Since
> $$
> C \boldsymbol{x} = \begin{bmatrix*}0 & 1 & 0 & 0 \\ -1 & 0 & 1 & 0 \\ 0 & -1 & 0 & 1 \\ 0 & 0 & -1 & 0\end{bmatrix*}\begin{bmatrix*}x_1 \\ x_2 \\ x_3 \\ x_4\end{bmatrix*} = \begin{bmatrix*}x_2\hphantom{.- x_1} \\ x_3-x_1 \\ x_4-x_2 \\ \hphantom{x_4}-x_3\end{bmatrix*} = \begin{bmatrix*}b_1 \\ b_2 \\ b_3 \\ b_4\end{bmatrix*}
> $$
> we have
> $$
> \boldsymbol{x} = \begin{bmatrix*}x_1 \\ x_2 \\ x_3 \\ x_4\end{bmatrix*} = \begin{bmatrix*} {}- b_2 - b_4 \\ \hphantom{-}b_1\hphantom{-b_4} \\ \hphantom{ {}-b_4}-b_4 \\ \hphantom{ {}-{} }b_1 + b_3\end{bmatrix*} = \begin{bmatrix*}0 & -1 & 0 & -1 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 1 & 0 & 1 & 0\end{bmatrix*}\begin{bmatrix*}b_1 \\ b_2 \\ b_3 \\ b_4\end{bmatrix*}
> $$
> which implies that
> $$
> C^{-1} = \begin{bmatrix*}0 & -1 & 0 & -1 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 1 & 0 & 1 & 0\end{bmatrix*}
> $$

3. *If $(a, b)$ is a multiple of $(c, d)$ with $abcd \ne 0$, show that $(a, c)$ is a multiple of $(b, d)$. This is surprisingly important; two columns are falling on one line. You could use numbers first to see how $a$, $b$, $c$, $d$ are related. The question will lead to: If $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ has dependent rows, then it also has dependent columns.*

> **Proof**
> Let $(a, b) = \lambda(c, d)$ with $\lambda \ne 0$, i.e. $a = \lambda c$ and $b = \lambda d$.
> Then $(a, c) = (a, \frac{1}{\lambda}a)$ and $(b, d) = (b, \frac{1}{\lambda}b)$.
> Since $abcd \ne 0$, let $a = \mu b$ with $\mu \ne 0$.
> Then $(a, c) = \left(\mu b, \frac{\mu}{\lambda}b\right) = \mu \left(b, \frac{1}{\lambda}b\right) = \mu(b, d)$, which shows that $(a, c)$ is a multiple of $(b, d)$.
