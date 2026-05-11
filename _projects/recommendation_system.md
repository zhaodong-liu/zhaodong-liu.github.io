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

传统推荐系统面临两个核心挑战：**长尾物品**（很少被看见的商品）和**冷启动用户**（交互历史有限的用户）。现有方法多采用候选-排序流水线，偏向热门物品，难以挖掘海量长尾内容。

我们提出 **CLAIRO**（基于行为感知的图文表征协同学习与优化），一种多模态生成式推荐系统，将推荐重新建模为自回归生成任务。CLAIRO 在 ActionPiece 上下文感知分词框架中引入视觉特征，学习共现的图文模式，构建更丰富的物品表征，在保持计算效率的同时显著提升推荐准确率。

**时间：** 2025 年 5 月 — 至今  
**所属机构：** 上海纽约大学  
**指导教师：** [文宏毅 教授](https://whongyi.github.io)  
**团队成员：** 刘兆东、胡宇泉、刘拓野  
**[查看完整报告](/assets/pdf/CLAIRO_Final_Report.pdf)** 了解详细方法、实验结果与深入分析。

## 核心创新

CLAIRO 的核心创新是 **多模态 token 合并**——将 ActionPiece 受 BPE 启发的算法扩展到视觉与文本特征的联合学习。与现有将不同模态分开处理的方法不同，CLAIRO 在词表构建阶段就发现跨模态共现模式，使模型能够捕获视觉与文本描述对齐时所涌现的语义关系。

## 主要结果

- **CDs 与黑胶**：相对文本基线 ActionPiece 提升 **+45.1% NDCG@5**，相对多模态基线 MQL4GRec 提升 **+135.3% NDCG@5**
- **体育**：相对文本基线 +47.2% NDCG@5  
- 关键发现：在 OPQ 之前跳过最后一阶段 PCA 可获得 **37-42%** 的提升

## 主要贡献

1. 首个将 ActionPiece 协同 token 合并扩展至图文联合学习，捕获跨模态共现模式
2. 发现跳过最终阶段 PCA 即可在保持效率的同时获得 37-42% 性能提升
3. 提供视觉特征效果因品类而异的系统性实验证据
4. 在视觉语义丰富的品类上相对现有多模态基线取得最高 135.3% 的提升

完整方法、消融实验与结果请见 [完整技术报告](/assets/pdf/CLAIRO_Final_Report.pdf)。

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

| Category | vs ActionPiece (text-only) | vs MQL4GRec (multimodal) |
|----------|---------------------------|--------------------------|
| **CDs and Vinyl** | +45.1% NDCG@5 | **+135.3% NDCG@5** |
| **Sports** | +47.2% NDCG@5 | -22.5% NDCG@5 |
| **Arts** | +2.2% NDCG@5 | +43.5% NDCG@5 |
| **Instruments** | +1.7% NDCG@5 | +10.9% NDCG@5 |

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
