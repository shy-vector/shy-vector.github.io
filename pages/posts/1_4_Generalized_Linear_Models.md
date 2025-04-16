---
title: (ML-1-4) 广义线性模型
date: 2025-03-11 17:35:24
author: Shy_Vector
tags:
  - 机器学习
  - 线性回归
  - 逻辑回归
  - 概率论与数理统计
sponsor: true
copyright: true
nav: true
---

回归仅仅是让曲线尽可能靠近数据点吗？我们将从 **概率与统计** 的视角重新看待回归这件事．

<!-- more -->

[以下内容总结自up主“迷路的小画家”的视频](https://space.bilibili.com/2138402997/lists/1187937)

## 线性回归

对于数据中的每个数据点 $(x_{i}, y_{i})$，都有 $y_{i} \in \mathbf{R}$．我们 **把标签 $y_{i}$ 看成某个分布的一个采样**，而这个 **分布的参数和数据点所处位置 $x_{i}$ 有关**．

如果我们认为存在 $\omega \in \mathbf{R}$，使得已标准化的所有数据点满足

$$
y_{i} = \omega x_{i} + \varepsilon_{i}
$$

其中所有 $\varepsilon_{i}$ 都服从 $\mathcal N(0, \sigma^2)$ ，即 $y_{i}$ 是 $\mathcal N(\omega x_{i}, \sigma^2)$ 的一个采样，且所有 $y_{i}$ 的采样相互独立．由于采样的随机性，我们只能做到尽可能找出一个 $\omega$，使得所有的 $y_{i}$ 都是从 $\mathcal N(\omega x_{i}, \sigma^2)$ 采样得来的 **可能性** 最大．

像这样，若 **已知分布类型**，通过 **采样** 数据 **反推** 出最有可能的 **分布参数**，叫 **极大似然估计**．

> 为什么估计出分布参数后就能得到最终的模型参数估计呢？在这里看起来模型参数 $\omega$ 恰好出现在分布参数 (期望 $\mu$) 上，这是巧合吗？这背后是 **链接函数** 的功劳，这里先按下不表，后文将提及．

由于 $y_{i}$ 采样独立，该过程可以被描述成：求使得联合概率 (**似然**) 取到最大值的 $\omega$

$$
\arg\max_{\omega}\prod_{i}\mathcal N(y_{i} \,|\, \omega x_{i}, \sigma^2)
$$

这里 $\mathcal N(y_{i} \,|\, \mu, \sigma^2)$ 是概率密度函数

$$
f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left( -\frac{1}{2}\left( \frac{x-\mu}{\sigma} \right)^2 \right)
$$

在 $x=y_{i}$ 上的取值．

连乘会导致数值极小，故取其对数变为 **对数似然**，累加不会使得数值减小，并且自然对数函数是单调递增的，不会影响最值点．

$$
\begin{align*} \arg\max_{\omega}\sum_{i}\ln\mathcal N(y_{i} \,|\, \omega x_{i}, \sigma^2) &= \arg\max_{\omega}\sum_{i}\ln \frac{1}{\sigma\sqrt{2\pi}}\exp\left( -\frac{1}{2}\left( \frac{y_{i}-\omega x_{i}}{\sigma} \right)^2 \right) \\ &= \arg\min_{\omega}\sum_{i}(y_{i}-\omega x_{i})^2\end{align*}
$$

可以看到这正是最小二乘估计出来的 $\omega$，等价于让直线 $y=\omega x$ 尽可能拟合数据点 $(x_{i}, y_{i})$．

> 最小化几何距离的拟合是回归的表面目的，回归更多是为了找到每个位置 $x_{i}$ 的分布均值．

## 逻辑回归

在这里，每个 $y^{(i)}$ 都是位置 $(x_{1}^{(i)}, x_{2}^{(i)})$ 上某种分布的一个独立采样，只可能为 $0$ 或者 $1$，因此这种分布是参数 $p$ 随位置变化的 **伯努利分布** (即两点分布、0-1分布)，设为 $\mathcal B(p)$，其中 $p(x_{1}^{(i)}, x_{2}^{(i)})$，伯努利分布的概率质量函数

$$
\mathcal B(y^{(i)}|p) = p^{y^{(i)}}(1-p)^{1-y^{(i)}}
$$

我们使用 sigmoid 函数作为模型参数 $\theta_{0}, \theta_{1}, \theta_{2}$ 与分布参数 $p$ 的链接函数 (暂时可以理解成 sigmoid 函数值看起来适合作为 $y^{(i)}$ 为 $1$ 的概率)，即令

$$
\begin{align*} \eta^{(i)} = \theta_{0}+\theta_{1}x_{1}^{(i)} + \theta_{2}x_{2}^{(i)} &= {x^{(i)}}^\text{T}\theta \\ p(x_{1}^{(i)}, x_{2}^{(i)}) = p(x^{(i)}) = S({\eta^{(i)}}) = \text{sigmoid}\, {\eta^{(i)}} &= \frac{1}{1+e^{-{\eta^{(i)}}}} = \frac{e^{\eta^{(i)}}}{1+e^{\eta^{(i)}}}\end{align*}
$$

此时 “所有 $y^{(i)}$ 都采样自 $\mathcal B(p)$ 的对数似然”

$$
\begin{align*} \ln\prod_{i}\mathcal B(y^{(i)}|p) &= \sum_{i}\ln p^{y^{(i)}}(1-p)^{1-y^{(i)}} \\ &= \sum_{i}(y^{(i)}\ln p + (1-y^{(i)}) \ln (1-p)) \\ &= \sum_{i}\left( y^{(i)}\ln \frac{e^{\eta^{(i)}}}{1+e^{\eta^{(i)}}} + (1-y^{(i)}) \ln \frac{1}{1+e^{\eta^{(i)}}}\right) \\ &= \sum_{i}(y^{(i)}{\eta^{(i)}} - \ln (1+e^{\eta^{(i)}}))\end{align*}$$

最大化对数似然

$$
\arg\max_{\theta}\ln\prod_{i}\mathcal B(y^{(i)}|p) = \arg\min_{\theta}\sum_{i}(- y^{(i)}{\eta^{(i)}} + \ln(1+e^{\eta^{(i)}}))
$$

因此损失函数形式为

$$
J(\theta) = \frac{1}{m}\sum_{i=1}^m (- y^{(i)}{\eta^{(i)}} + \ln(1+e^{\eta^{(i)}}))
$$

这是高阶可导的凹函数．在梯度下降法中，步进

$$
\begin{align*}\Delta \theta &= -\alpha \nabla_{\theta} \,J(\theta) \\ &= -\frac{\alpha}{m} \sum_{i=1}^m \left( - y^{(i)}\frac{\partial {\eta^{(i)}}}{\partial \theta} + \frac{\mathrm{d}}{\mathrm{d}{\eta^{(i)}}}\ln(1+e^{\eta^{(i)}}) \cdot \frac{\partial {\eta^{(i)}}}{\partial \theta} \right) \\ &= -\frac{\alpha}{m} \sum_{i=1}^m \left( -y^{(i)} + \frac{e^{\eta^{(i)}}}{1+e^{\eta^{(i)}}} \right)\frac{\partial {\eta^{(i)}}}{\partial \theta} \\ &= -\frac{\alpha}{m} \sum_{i=1}^m \left( -y^{(i)} + \text{sigmoid}\, {\eta^{(i)}} \right)\frac{\partial}{\partial \theta}{x^{(i)}}^\text{T}\theta \\ &= -\frac{\alpha}{m} \sum_{i=1}^m \left( -y^{(i)} + \text{sigmoid}\, {\eta^{(i)}} \right)x^{(i)} \end{align*}
$$

可能用到的矩阵微积分公式：[(ML-0) 微积分与线性代数]

## 分布参数与模型参数的桥梁——链接函数

> *在逻辑回归中，为什么非要用 sigmoid 函数而不是用其它具有 S 形曲线图象的函数去拟合呢？*
>
> 模型参数与伯努利分布参数 (期望 $\mu$) 的桥梁必然是 sigmoid 函数．类似地，模型参数与正态分布参数 (期望 $\mu$) 的桥梁必然是恒等函数．

**模型是线性的**，模型参数 $\theta_{j}$ 和特征 $x_{j}$ 的关系是线性的，当线性模型的输入是 $x^{(i)}$ 时，输出是 $\eta^{(i)} = {x^{(i)}}^\text{T} \theta$，是确定的值；

**我们认为需要预测的目标值是随机变量**，我们假设出它的某种分布 (比如在回归任务中，由于预测值遍及 $\mathbf{R}$，我们可以合理假设目标值的分布是正态分布，期望随着特征的值变化而变化；又比如在二分类任务中，预测值只可能是 $0$ 和 $1$，因此我们合理假设目标值的分布是伯努利分布，期望随着特征的值变化而变化)，期望 $\mu$、方差 $\sigma^2$ 这些 **分布参数理应限制着模型的输出**；

因为我们有极大似然估计这种能根据采样估计出分布参数的工具，所有我们希望能够 **将分布参数跟模型参数联系在一起**，这样就能一并估计出模型的参数．

**广义线性模型** 中，分布从正态分布拓展为 **指数族分布**，并要求模型参数只与 **期望** 有关．

> *为什么预测的是期望而不是其他分布参数呢？*
>
> 目标值的期望反映了“数据出现的中心”这一重要特点，“回归”的概念就在于此：在指定所有特征的值的情况下，对目标值多次采样，即便采出极端值，只要采样次数足够大，采出的值总会回归到某个值上．
>
> 如果要预测像方差这种参数，需要用到广义矩估计等更高级的估计方法．

> *指数族分布是什么？*
>
> 正态分布、拉普拉斯分布、伽马分布、指数分布、伯努利分布都是指数族分布，它们满足许多优良的性质：满足最大熵原理、共轭先验、充分统计量等．
>
> 在广义线性模型中，线性模型在某个位置 $x$ 下的输出 $\eta = x^\text{T}\theta$，此时指数族分布都可以写成统一的指数形式：
>
> $$
> P(y\,|\,\eta) = h(y) e^{ \eta^\text{T} T(y) - A(\eta) }
> $$
>
> 其中 $P(y\,|\,\eta)$ 是在 $\eta$ 条件下的分布的概率密度 (质量) 函数，$T(y)$ 是充分统计量，$A(\theta)$ 用于归一化．模型参数 $\eta$ 所对应的分布参数设为 $\mu, \sigma^2$，由于广义线性模型要求模型参数只与期望有关，此时 $\sigma$ 是无关量，
>
> $$
> P(y \,|\, \eta) = P(y \,|\, \mu, \sigma^2) = P(y \,|\, \mu)
> $$

正态分布可以写成指数形式

$$
\begin{align*} P(y \,|\, \mu) &= \frac{1}{\sqrt{ 2\pi }} \exp \left( -\frac{1}{2} (y - \mu)^2\right) \\ &= \frac{1}{\sqrt{ 2 \pi }} \exp \left(  \begin{bmatrix*} \mu & -\frac{1}{2} \end{bmatrix*} \begin{bmatrix*} y \\ y^2 \end{bmatrix*} - \frac{\mu^2}{2} \right)\end{align*}
$$

由于预测的是期望，充分统计量中 $y$ 对应于 $\eta^\text{T}$ 的第一个元素 $\mu$，因此链接函数 $\eta = \mu$ 是恒等函数．

再比如伯努利分布，期望就是 $p$ 也可以写成指数形式

$$
P(y \,|\, p) = \exp\left( \ln \frac{p}{1-p} \cdot y + \ln(1-p)\right)
$$

充分统计量 $y$ 对应 $\ln \frac{p}{1-p}$ (对数几率)，因此链接函数 $\eta = \ln \frac{p}{1-p}$，其反函数就是 $p = \text{sigmoid}\, \eta$．
