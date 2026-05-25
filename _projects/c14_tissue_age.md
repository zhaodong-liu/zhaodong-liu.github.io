---
layout: page
title: '<span class="lang-en">Carbon-14 Bomb-Pulse Modeling for Tissue Age</span><span class="lang-zh">基于碳-14 弹丸脉冲模型的组织年龄分析</span>'
description: '<span class="lang-en">From deterministic PDEs to stochastic agent-based models for inferring tissue and cell age from atmospheric Carbon-14</span><span class="lang-zh">从确定性 PDE 到随机粒子模型，基于大气碳-14 推断组织与细胞年龄</span>'
img: assets/img/projects/c14_tissue_age.jpg
importance: 2
category: projects
---

<div class="lang-zh" markdown="1">

## 项目概览

本项目基于大气碳-14 弹丸脉冲（bomb-pulse）数据，构建并比较了三类数学模型，用于推断人体动脉组织的细胞年龄。研究覆盖了从**确定性偏微分方程（PDE）**、到**随机常微分方程（SODE）**、再到**随机偏微分方程（SPDE）** 的方法演进，并对三种血管组织（ACI、CA、AVM）实施了完整的参数拟合与误差分析流水线。

**课程：** MATH-SHU 997 独立研究（2026 年春）

**所属机构：** 上海纽约大学

**指导教师：** Roberto Fernandez 教授

**代码仓库：** [GitHub - Carbon-14-Bomb-Pulse-Modeling](https://github.com/zhaodong-liu/Carbon-14-Bomb-Pulse-Modeling)

**报告：** [Final Report (PDF)](/assets/pdf/Math_Independent_Study_Final_Report.pdf)

## 研究背景

20 世纪 50–60 年代的核试验使大气中 ¹⁴C 浓度短暂飙升，形成一条已知曲线的"弹丸脉冲"。生物体在生长期摄入的 ¹⁴C 浓度与其形成时的大气浓度一致，因此**测量组织中残留 ¹⁴C 即可反推组织（或细胞群体）的平均"出生年份"**。这一方法广泛用于研究神经元、心肌细胞、动脉平滑肌等终末分化或慢周转细胞群体的更新动力学。

本研究关注三类血管组织：

- **ACI**（颈内动脉）
- **CA**（大脑动脉）
- **AVM**（脑动静脉畸形——病灶组织，发育起点未知，需要额外拟合一个偏移量 τ）

## 数学建模演进

### 1. 确定性 PDE 模型

以年龄 *a* 与时间 *t* 为变量，对细胞密度 *n(a, t)* 建立 McKendrick–von Foerster 型输运方程，并结合 ¹⁴C 衰变与组织形成时间的卷积公式，得到组织 ¹⁴C 含量的解析表达式：

- 通过特征线法（Method of Characteristics）求解一阶 PDE
- 引入参数 `γ`（细胞死亡率）与 `b`（细胞增殖率）
- 对 `λ = γ - b = 0` 时使用洛必达极限保持数值稳定

### 2. 随机常微分方程（SODE）模型——基于个体的模拟

将确定性死亡率/增殖率替换为**随机出生–死亡过程**：

- 跟踪 N = 2000 个独立细胞个体
- 每步 dt = 0.1 年：死亡服从伯努利分布、出生服从泊松分布
- 累积多次重复以估计 ¹⁴C 期望曲线

这一框架捕捉了小种群中的随机涨落，更贴近真实生物学情景。

### 3. 随机偏微分方程（SPDE）模型——基于队列的蒙特卡洛

进一步将连续年龄结构与随机性结合：

- 以"队列字典"形式追踪不同出生时间的细胞群
- 初始种群 N = 10000 以降低方差
- 每个时间步使用二项死亡与泊松出生
- 在保留年龄结构信息的同时获得收敛更好的随机解

## 计算与拟合流水线

每个模型均执行相同的三阶段流水线：

1. **Nelder–Mead 优化**——以 `scipy.optimize.minimize` 拟合 `(γ, b)`，初值 `[0.10, 0.10]`
2. **二维网格搜索**——在 `γ ∈ [0.01, 0.30]`、`b ∈ [0.00, 0.30]`（步长 0.01，共 930 个点）上穷举
3. **方法对比**——读取两阶段的拟合结果，在 RMSE / AIC 指标下比较，并输出曲线与误差图

### AVM 的 τ 联合拟合

由于 AVM 为病灶组织，起始时间 τ 未知。我设计了一个**带正则项的 τ 联合拟合过程**：

- 在每位患者寿命范围内以 0.5 年为步长穷举候选 τ
- 引入相对于样本均值的惩罚项 `λ = 0.1`，避免 τ 退化为极端值
- 与 `(γ, b)` 共同优化

## 关键结果

### 1. 三组织 RMSE 比较（网格 vs 优化）

| 组织 | n   | RMSE 观测值（网格） | RMSE 观测值（优化） |
| ---- | --- | ------------------: | ------------------: |
| ACI  | 20  |              0.0678 |              0.0676 |
| CA   | 65  |              0.0708 |              0.0706 |
| AVM  | 14  |              0.0162 |              0.0292 |

- ACI 与 CA：网格搜索与 Nelder–Mead 几乎一致
- AVM：网格搜索显著优于优化，反映出该组织的目标函数存在多个局部极小，使 Nelder–Mead 易陷入次优解

### 2. AVM 起始时间 τ 的差异

- 网格解：`τ_age ≈ 28.5` 年（较晚发生）
- 优化解：`τ_age ≈ 10.4` 年（较早发生）

不同参数解对应了截然不同的生物学解释，凸显了**目标景观非凸性**在医学建模中的实际影响。

### 3. 方法论权衡

- **优化法（Nelder–Mead）**：速度快、易实现，但对初值敏感、易陷入局部极小
- **网格搜索**：参数空间覆盖完整、可解释性强，但计算成本随维数指数增长
- **随机模型（SODE / SPDE）**：更贴近真实生物学，但增加方差与运行时间——SPDE 用 10000 初始种群换取更平滑的曲线

## 贡献与意义

1. **数学演进的系统记录**：从一阶输运 PDE 到带乘性噪声的随机粒子系统，本研究完整呈现了确定性到随机建模的过渡，并在同一组数据上做了一致比较
2. **统一可复现的流水线**：三个模型共用数据加载、AVM τ 拟合、输出逻辑，唯一差别在 `convo_*` 卷积函数，便于横向比较
3. **AVM 联合 τ 拟合的正则化策略**：通过对均值的惩罚有效避免了 τ 在小样本下的过拟合
4. **方法对比的实践证据**：定量展示了在生物医学小样本场景下，简单网格搜索往往优于经典优化器
5. **可扩展性**：所搭建的代码与建模框架可直接迁移到其他基于 ¹⁴C 的组织更新研究

## 技术栈

- **数学方法**：McKendrick–von Foerster 输运 PDE、特征线法、随机微分方程、蒙特卡洛模拟、Nelder–Mead 优化、网格搜索、AIC / RMSE
- **科学计算**：Python、NumPy、SciPy、Pandas、Matplotlib
- **数据**：患者组织 ¹⁴C 测量记录（`data.xlsx`）、参考弹丸脉冲曲线（`Bombpulse_14C_Jan2026-1.xlsx`）
- **写作**：LaTeX 报告与图表

## 未来方向

- 引入风险因子分层（当前所有样本归入 "no risk" 单一层）
- 加入年龄–时间二维 SPDE 的精确数值解算器
- 与其他组织类型（神经元、心肌）的公开数据交叉验证

</div>

<div class="lang-en" markdown="1">

## Overview

This project develops and compares three families of mathematical models for inferring cellular age in human arterial tissues from atmospheric Carbon-14 bomb-pulse data. The work traces the methodological evolution from **deterministic partial differential equations (PDE)**, through **stochastic ordinary differential equations (SODE)**, to **stochastic partial differential equations (SPDE)**, with a unified parameter-fitting and error-analysis pipeline applied to three vascular tissues (ACI, CA, AVM).

**Course:** MATH-SHU 997 Independent Study (Spring 2026)

**Institution:** NYU Shanghai

**Advisor:** Prof. Roberto Fernandez

**Repository:** [GitHub - Carbon-14-Bomb-Pulse-Modeling](https://github.com/zhaodong-liu/Carbon-14-Bomb-Pulse-Modeling)

**Report:** [Final Report (PDF)](/assets/pdf/Math_Independent_Study_Final_Report.pdf)

## Background

Above-ground nuclear weapons tests in the 1950s–60s produced a sharp, well-characterized spike in atmospheric ¹⁴C — the "bomb pulse." Biological tissues incorporate ¹⁴C in proportion to atmospheric levels at the time of their formation, so **measuring residual ¹⁴C in a tissue lets us infer the average "birth year" of its cells.** The method has become a standard tool for studying turnover in long-lived or terminally differentiated cell populations (neurons, cardiomyocytes, vascular smooth muscle, etc.).

This study targets three vascular tissues:

- **ACI** — internal carotid artery
- **CA** — cerebral artery
- **AVM** — arteriovenous malformation (a lesion whose formation time is unknown and must be jointly fitted as an offset τ)

## Mathematical Evolution

### 1. Deterministic PDE Model

The cell density `n(a, t)` over age `a` and time `t` is governed by a McKendrick–von Foerster transport equation, which combined with the ¹⁴C decay and bomb-pulse curve yields an analytical convolution formula for tissue ¹⁴C content.

- Solved via the **method of characteristics**
- Two parameters: `γ` (death rate) and `b` (proliferation rate)
- L'Hôpital limit used for the `λ = γ − b = 0` case to keep the solution numerically stable

### 2. Stochastic ODE Model — Agent-Based Simulation

The deterministic rates are replaced by a **stochastic birth–death process** on individual cells:

- Track N = 2000 individual agents
- At each step `dt = 0.1` year, deaths drawn from a Bernoulli, births from a Poisson
- Multiple replicates averaged to estimate the expected ¹⁴C curve

This captures fluctuations invisible to the deterministic model and is closer to the biological reality of small cell populations.

### 3. Stochastic PDE Model — Cohort-Based Monte Carlo

A cohort-based Monte Carlo scheme couples age structure with stochasticity:

- Cells are tracked as a dictionary of birth-year cohorts
- Initial population N = 10,000 to reduce variance
- Binomial deaths and Poisson births per step
- Yields smoother stochastic solutions while preserving age-structure information

## Computation & Fitting Pipeline

Each of the three frameworks runs the same three-stage pipeline:

1. **Nelder–Mead optimization** — `scipy.optimize.minimize` on `(γ, b)`, initial guess `[0.10, 0.10]`
2. **2D grid search** — exhaustive sweep over `γ ∈ [0.01, 0.30]` and `b ∈ [0.00, 0.30]` with step 0.01 (930 points)
3. **Comparison** — read both fits, score by RMSE / AIC, export comparison plots

### Joint τ-fitting for AVM

Because the AVM lesion has no clear birth-time, I designed a **regularized joint fit for τ**:

- Sweep τ candidates at 0.5-year steps up to the patient's lifetime
- Apply a penalty (`λ = 0.1`) anchoring τ to the sample-mean τ-fraction so it doesn't collapse to extremes
- Optimize jointly with `(γ, b)`

## Key Results

### 1. RMSE Across Tissues (Grid vs. Optimization)

| Tissue | n   | RMSE obs (grid) | RMSE obs (optim) |
| ------ | --- | --------------: | ---------------: |
| ACI    | 20  |          0.0678 |           0.0676 |
| CA     | 65  |          0.0708 |           0.0706 |
| AVM    | 14  |          0.0162 |           0.0292 |

- ACI and CA: grid and Nelder–Mead agree almost exactly
- AVM: grid substantially outperforms optimization — the objective surface has multiple local minima that trap Nelder–Mead in a suboptimal basin

### 2. AVM Start-Time τ Diverges Between Methods

- Grid solution: `τ_age ≈ 28.5` years (late onset)
- Optimization solution: `τ_age ≈ 10.4` years (early onset)

The two parameter solutions imply qualitatively different biological histories — a striking illustration of how **non-convex objective landscapes matter in medical modeling**, not just numerics.

### 3. Methodological Trade-offs

- **Optimization (Nelder–Mead):** fast and simple, but sensitive to initialization and local minima
- **Grid search:** exhaustive and interpretable, but cost grows exponentially with parameter count
- **Stochastic models (SODE / SPDE):** biologically more faithful, at the cost of extra variance and runtime — SPDE trades 5× initial population for noticeably smoother curves

## Contributions

1. **A unified record of the deterministic-to-stochastic transition** — from a first-order transport PDE to a multiplicative-noise particle system, compared on the same data with the same fitting protocol
2. **A reproducible, shared pipeline** — the three frameworks share data loading, AVM τ-fitting, and output logic; the only substantive difference is the `convo_*` function, making cross-model comparison clean
3. **A regularization strategy for joint τ-fitting in AVM**, where penalizing toward the sample mean prevents τ from overfitting in a small sample
4. **Quantitative evidence on method choice** — in biomedical small-sample regimes, plain grid search can outperform a classical optimizer because of objective non-convexity
5. **Extensibility** — the code and modeling framework transfer directly to other ¹⁴C-based turnover studies

## Technical Stack

- **Mathematical methods:** McKendrick–von Foerster transport PDE, method of characteristics, stochastic differential equations, Monte Carlo simulation, Nelder–Mead optimization, grid search, AIC / RMSE
- **Scientific computing:** Python, NumPy, SciPy, Pandas, Matplotlib
- **Data:** patient ¹⁴C tissue measurements (`data.xlsx`), reference bomb-pulse curve (`Bombpulse_14C_Jan2026-1.xlsx`)
- **Writing:** LaTeX report with figures

## Future Directions

- Enable risk-factor stratification (currently all samples collapse to a single "no risk" stratum)
- Implement a proper 2D age–time SPDE solver instead of the cohort-Monte-Carlo approximation
- Cross-validate against public ¹⁴C datasets on other tissues (neurons, cardiomyocytes)

</div>
