---
layout: page
title: '<span class="lang-en">Multimodal Gen Rec</span><span class="lang-zh">多模态生成式推荐</span>'
description: '<span class="lang-en">Collaborative Learning with Action-aware Image-text Representation Optimization (CLAIRO)</span><span class="lang-zh">基于行为感知的图文表征协同学习与优化 (CLAIRO)</span>'
img: assets/img/projects/recommendation_system.jpg
importance: 1
category: projects
---

<div class="lang-zh" markdown="1">

## 项目概览

传统推荐系统面临两个根本性挑战：**长尾物品**（很少被看见的商品）和**冷启动用户**（交互历史有限的用户）。这些系统通常依赖于候选-排序流水线，偏向热门物品，无法触达绝大多数可用内容。

我们提出 **CLAIRO**（基于行为感知的图文表征协同学习与优化，Collaborative Learning with Action-aware Image-text Representation Optimization），一种多模态生成式推荐系统，将推荐重新建模为自回归生成任务。通过用视觉特征扩展 ActionPiece 的上下文感知分词框架，CLAIRO 学习合并共现的文本与视觉模式，创建更丰富的物品表征，在保持计算效率的同时提升推荐准确率。

**时间：** 2025 年 5 月 — 至今

**所属机构：** 上海纽约大学

**指导教师：** [文宏毅教授](https://whongyi.github.io)

**团队成员：** 刘兆东、胡宇泉、刘拓野

**[查看完整报告](/assets/pdf/CLAIRO_Final_Report.pdf)** 了解详细方法、完整实验结果与深入分析。

## 核心创新

CLAIRO 的核心创新是 **多模态 token 合并**——将 ActionPiece 受 BPE 启发的算法扩展到视觉与文本特征的联合学习。与现有将不同模态分开处理的方法不同，CLAIRO 在词表构建阶段就发现跨模态共现模式，使模型能够捕获视觉模式与文本描述对齐时所涌现的语义关系。

## 基线

我们将 CLAIRO 与两类最先进的模型进行对比：

**仅文本基线：**

- **[ActionPiece](/assets/pdf/ActionPiece.pdf)**：使用协同 token 合并的上下文感知分词，用于序列推荐

**多模态基线：**

- **[MQL4GRec](/assets/pdf/MQL4GREC.pdf)**：使用 RQ-VAE 将多模态特征离散化为独立的 token 序列

## 方法

### 系统架构

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/pipeline.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    CLAIRO 的多模态融合与分词流水线
</div>

CLAIRO 通过一条精简的流水线扩展了 ActionPiece 的分词框架：

**1. 多模态特征提取**

- **视觉：** CLIP ViT-L/14 提取图像嵌入
- **文本：** SentenceT5 生成句子嵌入
- PCA 压缩统一维度（各 384 维 → 融合后 768 维）

**2. 优化乘积量化（OPQ）**

- 基于 FAISS 的量化将融合嵌入分解为离散语义编码
- 关键洞见：在 OPQ 之前跳过最终阶段 PCA 可获得 **37-42% 的提升**，通过保留细粒度的检索信息

**3. 协同 token 合并**

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/clairo-merge.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    CLAIRO 的多模态 token 合并算法发现视觉与文本模态间的共现模式
</div>

与传统将各模态分开处理的方法不同，CLAIRO 的 token 合并算法基于共现频率对视觉与文本特征进行联合聚类。这使词表能够捕获跨模态语义模式——例如，当专辑封面美学风格与音乐流派描述持续对齐时。

### 数据集

我们在 **Amazon Review Data (2018)** 上跨四个不同品类进行评估：

- Arts、Crafts and Sewing（艺术、手工与缝纫）
- CDs and Vinyl（CD 与黑胶）
- Musical Instruments（乐器）
- Sports and Outdoors（体育与户外）

该数据集提供 2.331 亿条评论，含丰富的多模态信息（产品图片、描述、用户交互历史）。

## 结果

### 性能亮点

CLAIRO 在多个数据集上相对纯文本与多模态基线均取得显著提升：

| 品类              | vs ActionPiece（纯文本） | vs MQL4GRec（多模态） |
| ----------------- | ------------------------ | --------------------- |
| **CDs and Vinyl** | +45.1% NDCG@5            | **+135.3% NDCG@5**    |
| **Sports**        | +47.2% NDCG@5            | -22.5% NDCG@5         |
| **Arts**          | +2.2% NDCG@5             | +43.5% NDCG@5         |
| **Instruments**   | +1.7% NDCG@5             | +10.9% NDCG@5         |

**[查看完整结果](/assets/pdf/CLAIRO_Final_Report.pdf)**，包含详细指标（Recall@5/10、NDCG@5/10）与统计分析。

### 不同品类性能差异原因

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/category-photos.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    来自不同 Amazon 品类的样本产品图片
</div>

我们的分析揭示视觉特征因产品类型不同而贡献各异：

**🎵 CDs and Vinyl**（最大提升：相对 MQL4GRec **+135.3%**）

- 专辑封面包含语义丰富的视觉信息（艺术风格、流派线索、情感基调）
- 强烈的视觉-文本相关性使得共现学习卓有成效
- 视觉模式为文本描述提供高度互补的信号

**⚽ Sports and Outdoors**（结果不一）

- 复杂的上下文信息（运动员、场景、使用环境）
- 丰富的视觉多样性相比纯文本基线带来提升（+47.2%）
- 但与文本描述的不对齐相比多模态基线表现下降（-22.5%）
- 凸显恰当的多模态对齐的重要性

**🎨 Arts 与 🎸 Instruments**（边际提升：约 2-3%）

- 视觉上异质的产品（原材料、工具、单调背景）
- 视觉特征起补充而非主导作用
- 说明仅添加视觉数据不足以解决问题

### 关键技术洞见

**1. 跳过最终阶段 PCA** → 37-42% 提升

- PCA 的全局降维丢弃了细粒度的检索信息
- OPQ 已针对量化误差进行了优化；额外的 PCA 是有害的

**2. 视觉特征是互补的，非主导的**

- 纯文本变体性能与完整模型相近
- 纯视觉变体因嵌入多样性有限而失败
- 最佳结果来自两种模态的恰当对齐

## 主要贡献

1. **跨模态 token 合并：** 首个将 ActionPiece 的协同分词扩展至视觉与文本特征联合学习的工作，捕获跨模态的共现模式

2. **高效融合策略：** 发现在 OPQ 之前跳过最终阶段 PCA 可在保持计算效率的同时将性能提升 37-42%

3. **品类特定分析：** 提供全面的实证证据，揭示视觉特征效果如何因产品类型而异，并给出何时多模态整合最有效的洞见

4. **最先进结果：** 在视觉语义丰富的品类上相对现有多模态基线（MQL4GRec）取得最高 135.3% 的提升

## 未来方向

**1. 更多模态**

- 加入视频与音频特征（尤其对音乐与电子游戏推荐有前景）
- 利用时序动态与声学模式丰富物品表征

**2. 自适应模态加权**

- 基于品类特性动态调整视觉/文本贡献
- 强调信息丰富的模态，同时抑制噪声较大的模态

**3. 增强的编码器**

- 探索超越 CLIP ViT-L/14 的更强大视觉编码器
- 研究领域特定微调以提升视觉嵌入的区分度

**4. 跨域泛化**

- 在多样化数据集上评估：MovieLens（电影）、Steam（游戏）、Yelp（餐厅）
- 研究视觉语义丰富度如何在不同领域影响跨模态学习

**5. 动态词表扩展**

- 实现新 token 模式的增量学习，无需完整重训练
- 随时间适配用户行为与物品属性的演变

## 技术栈

- **深度学习：** PyTorch 实现、Transformer 架构
- **多模态学习：** 视觉-语言融合、CLIP、ViT、SentenceT5
- **推荐系统：** 协同过滤、序列推荐、生成式检索
- **量化：** 乘积量化（OPQ）、向量量化、FAISS
- **数据处理：** 大规模数据集处理（2.33 亿条评论）、特征提取流水线
- **研究：** 基线复现、消融研究、性能分析

---

📄 **资源：**

- [完整技术报告](/assets/pdf/CLAIRO_Final_Report.pdf)
- [ActionPiece 论文](/assets/pdf/ActionPiece.pdf)
- [MQL4GRec 论文](/assets/pdf/MQL4GREC.pdf)

</div>

<div class="lang-en" markdown="1">

## Overview

Traditional recommendation systems struggle with two fundamental challenges: **long-tail items** (rarely seen products) and **cold-start users** (users with limited interaction history). These systems typically rely on candidate-ranking pipelines that favor popular items, failing to surface the vast majority of available content.

We introduce **CLAIRO** (Collaborative Learning with Action-aware Image-text Representation Optimization), a multimodal generative recommendation system that reformulates recommendation as an autoregressive generation task. By extending ActionPiece's context-aware tokenization framework with visual features, CLAIRO learns to merge co-occurring textual and visual patterns, creating richer item representations that improve recommendation accuracy while maintaining computational efficiency.

**Duration:** May 2025 - present

**Institution:** New York University Shanghai

**Advisor:** [Prof. Hongyi Wen](https://whongyi.github.io)

**Team Members:** Zhaodong Liu, Yuquan Hu, Tuoye Liu

**[View Full Report](/assets/pdf/CLAIRO_Final_Report.pdf)** for detailed methodology, comprehensive experimental results, and in-depth analysis.

## Key Innovation

CLAIRO's core innovation is **multimodal token merging** - extending ActionPiece's BPE-inspired algorithm to jointly learn from both visual and textual features. Unlike existing approaches that treat modalities separately, CLAIRO discovers cross-modal co-occurrence patterns during vocabulary construction, enabling the model to capture semantic relationships that emerge when visual patterns align with textual descriptions.

## Baselines

We compare CLAIRO against two categories of state-of-the-art models:

**Text-only Baseline:**

- **[ActionPiece](/assets/pdf/ActionPiece.pdf)**: Context-aware tokenization using collaborative token merging for sequential recommendation

**Multimodal Baseline:**

- **[MQL4GRec](/assets/pdf/MQL4GREC.pdf)**: Uses RQ-VAE to discretize multimodal features into separate token sequences

## Methodology

### System Architecture

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/pipeline.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    CLAIRO's multimodal fusion and tokenization pipeline
</div>

CLAIRO extends ActionPiece's tokenization framework through a streamlined pipeline:

**1. Multimodal Feature Extraction**

- **Visual**: CLIP ViT-L/14 extracts image embeddings
- **Textual**: SentenceT5 generates sentence embeddings
- PCA compression unifies dimensionality (384-dim each → 768-dim fused)

**2. Optimized Product Quantization (OPQ)**

- FAISS-based quantization decomposes fused embeddings into discrete semantic codes
- Key insight: Skipping final-stage PCA before OPQ yields **37-42% improvement** by preserving fine-grained retrieval information

**3. Collaborative Token Merging**

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/clairo-merge.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    CLAIRO's multimodal token merging algorithm discovers co-occurring patterns across visual and textual modalities
</div>

Unlike traditional approaches that process modalities separately, CLAIRO's token merging algorithm jointly clusters visual and textual features based on co-occurrence frequency. This enables the vocabulary to capture cross-modal semantic patterns - for example, when album cover aesthetics consistently align with music genre descriptions.

### Dataset

We evaluate on **Amazon Review Data (2018)** across four diverse categories:

- Arts, Crafts and Sewing
- CDs and Vinyl
- Musical Instruments
- Sports and Outdoors

The dataset provides 233.1M reviews with rich multimodal information (product images, descriptions, user interaction histories).

## Results

### Performance Highlights

CLAIRO achieves significant improvements over both text-only and multimodal baselines across multiple datasets:

| Category          | vs ActionPiece (text-only) | vs MQL4GRec (multimodal) |
| ----------------- | -------------------------- | ------------------------ |
| **CDs and Vinyl** | +45.1% NDCG@5              | **+135.3% NDCG@5**       |
| **Sports**        | +47.2% NDCG@5              | -22.5% NDCG@5            |
| **Arts**          | +2.2% NDCG@5               | +43.5% NDCG@5            |
| **Instruments**   | +1.7% NDCG@5               | +10.9% NDCG@5            |

**[View Full Results](/assets/pdf/CLAIRO_Final_Report.pdf)** with detailed metrics (Recall@5/10, NDCG@5/10) and statistical analysis.

### Why Performance Varies Across Categories

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/clairo/category-photos.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sample product images from different Amazon categories
</div>

Our analysis reveals that visual features contribute differently depending on product type:

**🎵 CDs and Vinyl** (Highest gains: **+135.3%** over MQL4GRec)

- Album covers contain semantically rich visual information (artistic style, genre cues, emotional tone)
- Strong visual-textual correlation enables effective co-occurrence learning
- Visual patterns provide highly complementary signals to text descriptions

**⚽ Sports and Outdoors** (Mixed results)

- Complex contextual information (athletes, scenes, usage environments)
- Rich visual diversity helps vs text-only baseline (+47.2%)
- But misalignment with text descriptions harms vs multimodal baseline (-22.5%)
- Highlights the importance of proper multimodal alignment

**🎨 Arts and 🎸 Instruments** (Marginal gains: ~2-3%)

- Visually heterogeneous products (raw materials, tools, plain backgrounds)
- Visual features play complementary rather than dominant role
- Demonstrates that adding visual data alone isn't sufficient

### Key Technical Insights

**1. Skip Final-stage PCA** → +37-42% improvement

- PCA's global dimensionality reduction discards fine-grained retrieval information
- OPQ already optimizes for quantization error; additional PCA is detrimental

**2. Visual Features are Complementary, Not Dominant**

- Text-only variant performs similarly to full model
- Visual-only variant fails due to limited embedding diversity
- Best results come from proper alignment of both modalities

## Main Contributions

1. **Cross-modal Token Merging**: First work to extend ActionPiece's collaborative tokenization to jointly learn from visual and textual features, capturing co-occurrence patterns across modalities

2. **Efficient Fusion Strategy**: Discovered that skipping final-stage PCA before OPQ improves performance by 37-42% while maintaining computational efficiency

3. **Category-specific Analysis**: Provided comprehensive empirical evidence showing how visual feature effectiveness varies by product type, with insights on when multimodal integration is most beneficial

4. **State-of-the-art Results**: Achieved up to 135.3% improvement over existing multimodal baseline (MQL4GRec) on semantically rich visual categories

## Future Directions

**1. Additional Modalities**

- Incorporate video and audio features (especially promising for music and video game recommendations)
- Leverage temporal dynamics and acoustic patterns to enrich item representations

**2. Adaptive Modality Weighting**

- Dynamically adjust visual/textual contribution based on category characteristics
- Emphasize informative modalities while suppressing noisy ones

**3. Enhanced Encoders**

- Explore more powerful visual encoders beyond CLIP ViT-L/14
- Investigate domain-specific fine-tuning to improve visual embedding discriminability

**4. Cross-domain Generalization**

- Evaluate on diverse datasets: MovieLens (films), Steam (games), Yelp (restaurants)
- Study how visual semantic richness affects cross-modal learning across different domains

**5. Dynamic Vocabulary Expansion**

- Enable incremental learning of new token patterns without full retraining
- Adapt to evolving user behaviors and item attributes over time

## Technical Skills

- **Deep Learning**: PyTorch implementation, transformer architectures
- **Multimodal Learning**: Vision-language fusion, CLIP, ViT, SentenceT5
- **Recommendation Systems**: Collaborative filtering, sequential recommendation, generative retrieval
- **Quantization**: Product quantization (OPQ), vector quantization, FAISS
- **Data Processing**: Large-scale dataset handling (233M reviews), feature extraction pipeline
- **Research**: Baseline reproduction, ablation studies, performance analysis

---

📄 **Resources:**

- [Full Technical Report](/assets/pdf/CLAIRO_Final_Report.pdf)
- [ActionPiece Paper](/assets/pdf/ActionPiece.pdf)
- [MQL4GRec Paper](/assets/pdf/MQL4GREC.pdf)

</div>
