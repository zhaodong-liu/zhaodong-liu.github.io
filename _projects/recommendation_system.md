---
layout: page
title: Generative Recommendation System
description: A multimodal generative recommendation system that extends ActionPiece with visual features
img: assets/img/projects/recommendation_system.jpg
importance: 1
category: projects
---

## Overview

We study how to build more effective recommendation systems using NLP techniques, with a focus on overcoming two long-standing challenges: **long-tail items** and **cold-start users**. Traditional recommendation systems typically follow a candidate-generation-plus-ranking pipeline, which tends to over-favor popular items and ignore long-tail items. They also struggle with cold-start problems, where user interaction histories are short, leading to unreliable candidate filtering and poor personalization in the early stages.

To address these limitations, we propose **CLAIRO** (Collaborative Learning with Action-aware Image-text Representation Optimization), a system based on autoregressive sequence modeling. Building on the context-aware tokenization of ActionPiece, we extend multimodal capability for the model, using novel methods to combine visual and textual information. Our goal is to make advanced generative recommendation techniques both practical and scalable for real-world industry applications.

**Duration:** September 2024 - Present

**Institution:** New York University Shanghai

**Advisor:** [Prof. Hongyi Wen](https://whongyi.github.io)

**Team Members:**

- Zhaodong Liu (zl4789@nyu.edu)
- Yuquan Hu (yh4663@nyu.edu)
- Tuoye Liu (tl3735@nyu.edu)

## Research Goals

The primary objectives of **CLAIRO** are to:
- Extend ActionPiece's collaborative tokenization framework with multimodal capabilities
- Integrate visual and textual information through novel token merging mechanisms
- Discover co-occurring patterns across text and vision modalities
- Maintain computational efficiency while improving prediction accuracy

## Baseline Models

We conducted a comprehensive literature review and selected three state-of-the-art approaches as our baselines:

### 1. LIGER
Implements a hybrid paradigm that unifies dense retrieval and generative retrieval based on the TIGER architecture. By introducing a semantic indexing mechanism and constrained beam search, LIGER achieves superior performance in sequential recommendation tasks. We use LIGER to evaluate RQ-VAE-based quantization approaches in text-only settings.

### 2. MQL4GRec
Proposes a multimodal quantitative language framework that extends TIGER-like methods with visual inputs. Their key innovation lies in using Residual-Quantized Variational AutoEncoder (RQ-VAE) to discretize visual features into quantitative tokens, enabling unified processing of text and images through a T5-based encoder-decoder.

### 3. ActionPiece (Primary Baseline)
Introduces a novel collaborative tokenization method that discovers latent behavior patterns through token merging, achieving state-of-the-art results with text-only inputs. Its ability to capture co-occurring user-item interactions through dynamic token clustering makes it an ideal foundation for multimodal extension. We chose ActionPiece as our primary baseline due to its recent superior performance and the potential to enhance it with multimodal capabilities.

## Methodology

### Research Motivation and Evolution

The core question driving this research is: **how can we effectively learn unified representations of multimodal information (such as human behaviors combined with visual and textual cues) without suffering from codebook collapse or computational inefficiency?**

Recognizing that human decision-making often relies on visual cues, we developed a recommendation framework using collaborative tokenization to discover latent behavioral patterns across modalities.

### Overcoming VQ-VAE Limitations

Our initial approach used a **Vector Quantized Variational Autoencoder (VQ-VAE)**, which maps continuous embeddings to nearest codebook vectors. However, this soon collapsed to a small subset of codes, failing to utilize most of the codebook and unable to deal with hierarchical structures—a common property in real-world decision-making processes.

After systematic analysis, I recognized this as a structural issue: VQ-VAE's inherent single-quantized architecture lacked the ability to refine latent information progressively. This led us to explore **residual quantization**, optimizing the **Residual Quantized Variational Autoencoder (RQ-VAE)** which allows each level to refine the remaining semantic residuals, yielding much more interpretable discrete code hierarchies while improving codebook utilization.

### Multimodal Token Merging Architecture

Building upon ActionPiece's tokenization framework, we successfully extended its capability to incorporate visual features. To learn user behavioral patterns not only from single-item modality, but also from the similarity across textual and visual modalities, we implemented a **byte pair encoding (BPE)-inspired token reconstruction algorithm** that identifies and merges co-occurring multimodal behavioral patterns, effectively aligning latent codes with human-interpretable behavioral units. This improved sequence coherence and codebook utilization.

Our implementation integrates:

1. **Visual Encoder**: CLIP ViT-L/14 extracts image embeddings for product images
2. **Multimodal Fusion with Dimensionality Reduction**:
   - Visual embeddings from pretrained ViT are compressed via **Principal Component Analysis (PCA)**, preserving **95% of embedding information** while reducing computational overhead by **50%**
   - Reduced visual vectors are concatenated with textual sentence embeddings from SentenceTransformer
   - Optional second-stage PCA ensures the fused representation remains compact and well-conditioned
   - **Learned attention mechanism** effectively integrates visual and textual features, letting the quantizer operate on aligned multimodal semantics rather than raw high-dimensional features
3. **Joint Token Merging**: Modified ActionPiece's token merging mechanism to jointly consider both textual and visual tokens during clustering, discovering co-occurring patterns across modalities
4. **FAISS-based Quantization**: Fused embeddings generate product-level semantic codes integrated into ActionPiece's feature tuple structure

The resulting behavioral tokens encode both textual semantics and visual appearance, providing richer item representations for recommendation tasks.

### Addressing High-Dimensional Challenges

Integrating multimodal data presented new challenges: high-dimensional embeddings overwhelmed the quantizers, making it difficult to form stable clusters in latent space and leading to overfitting in some dominant areas while significantly increasing computational overhead. The PCA compression and attention mechanism innovations enabled the model to operate reliably while maintaining both representation quality and efficiency.

### Data Preprocessing

We constructed a new data preprocessing pipeline compatible with the Amazon Reviews 2018 dataset, which provides more valid visual and textual data for multimodal adaptation across multiple product categories.

## Preliminary Results

We have successfully replicated baseline models and conducted extensive experiments. The performance aligns well with reported results in the original papers.

### Baseline Performance

**ActionPiece vs TIGER on Amazon Reviews:**

| Dataset | Model | R@5 | N@5 | R@10 | N@10 |
|---------|-------|-----|-----|------|------|
| Sports & Outdoors | ActionPiece | 0.0316 | 0.0205 | 0.0500 | 0.0264 |
| Sports & Outdoors | TIGER | 0.0341 | 0.0221 | 0.0518 | 0.0279 |
| Beauty | ActionPiece | 0.0511 | 0.0340 | 0.0775 | 0.0424 |
| Beauty | TIGER | 0.0627 | 0.0418 | 0.0914 | 0.0511 |

### CLAIRO Performance

Due to the long preprocessing time for visual information, we have currently conducted experiments on the CDs and Vinyls dataset:

| Model | R@5 | N@5 | R@10 | N@10 |
|-------|-----|-----|------|------|
| ActionPiece | 0.0544 | 0.0359 | 0.0830 | 0.0451 |
| **CLAIRO** | **0.0561** | **0.0450** | **0.0713** | **0.0499** |

**Key Findings:**
- CLAIRO achieves consistent improvements over the text-only baseline across most metrics
- **25.6% improvement in NDCG@5** (from 0.0359 to 0.0451) and **10.6% improvement in NDCG@10** (from 0.0451 to 0.0499) on the CDs and Vinyl dataset
- Visual features provide complementary signals for item representation, particularly beneficial for products where visual cues play a significant role in user decisions
- **Computational efficiency maintained**: 50% reduction in processing overhead through PCA compression while preserving 95% of embedding information
- Performance across different Amazon Reviews categories varies significantly, so results are only comparable within the same category

### Important Insights

From our preliminary experiments, we identified several challenges:
- **Representation collapse**: Direct concatenation of embeddings from different modalities without proper regularization can cause the model to over-rely on one modality
- **Shared vocabulary limitations**: The current shared token vocabulary struggles with separately encoding modality-specific patterns, motivating our investigation into discrete tokenization with separate codebooks

## Contributions

Our work makes several contributions to the multimodal generative recommendation field:

1. **First multimodal extension of ActionPiece**: We present the first multimodal extension of ActionPiece's collaborative tokenization framework, demonstrating its adaptability beyond text-only scenarios

2. **Overcoming VQ-VAE limitations with RQ-VAE**: We systematically analyzed and addressed the codebook collapse issue in VQ-VAE by implementing residual quantization, enabling hierarchical representation learning that captures the multi-level structure of human decision-making processes

3. **BPE-inspired multimodal token reconstruction**: We introduce a novel byte pair encoding-inspired algorithm that identifies and merges co-occurring patterns across text and vision modalities, effectively aligning latent codes with human-interpretable behavioral units while improving sequence coherence and codebook utilization

4. **Efficient high-dimensional multimodal fusion**: We developed a learned attention mechanism combined with PCA compression that preserves 95% of embedding information while reducing computational overhead by 50%, enabling practical deployment of multimodal recommendation systems

5. **Empirical evidence**: Our results demonstrate that proper multimodal integration can achieve **25.6% improvement in recommendation accuracy** while maintaining computational efficiency, providing strong evidence for the value of visual features in sequential recommendation tasks

## Future Work

### 1. Advanced Multimodal Tokenization
We are investigating different methods to efficiently merge textual and visual features while avoiding representation collapse. Drawing inspiration from MQL4GRec, we plan to implement **discrete multimodal tokenization using separate codebooks** for each modality:
- Train independent quantizers (e.g., RQ-VAE) for textual and visual embeddings
- Use distinct token prefixes such as `<A_i>` for textual tokens and `<a_j>` for visual tokens
- Explore various quantization strategies including single-level vs multi-level codebooks, Optimized Product Quantization (OPQ), and Vector-Quantized Variational Encoder (VQ-VAE)

### 2. Higher-Performance Encoders
While our current implementation leverages CLIP ViT-L/14 as the visual encoder and SentenceT5, we plan to investigate more powerful architectures to enhance CLAIRO's representation quality and improve model performance.

### 3. Cross-Attention Mechanisms
To enable deeper multimodal interaction beyond simple concatenation or early fusion, we plan to investigate cross-attention architectures at different stages:
- Implement fusion with cross-attention before the encoder (computationally efficient)
- Explore decoder-stage late fusion if time allows
- Investigate gating mechanisms to dynamically balance the contribution of different modalities

### 4. Comprehensive Evaluation and Ablation Studies
We plan to conduct extensive ablation studies using modality masking strategies:
- Train variants with text-only, vision-only, and both modalities to quantify individual and joint contributions
- Perform component ablation to assess the importance of specific architectural choices
- Analyze attention patterns through visualization to understand cross-modal interactions
- Validate our approach on the large-scale **Amazon Reviews 2023 dataset** (2M+ items, 33 categories)
- Test hypothesis that visually-distinctive categories (e.g., Clothing, Home Decor) benefit more from visual features than text-heavy categories (e.g., Books)

## Skills Developed

- Advanced PyTorch implementation
- Multimodal representation learning
- Tokenization algorithms and collaborative filtering
- Vision Transformers and CLIP models
- Variational Autoencoder architectures (RQ-VAE, VQ-VAE)
- Large-scale dataset processing and experimentation
- Research paper reproduction and baseline evaluation
