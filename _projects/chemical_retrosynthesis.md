---
layout: page
title: '<span class="lang-en">LLM-based Chemical Retrosynthesis</span><span class="lang-zh">基于大语言模型的化学逆合成</span>'
description: '<span class="lang-en">Fine-tuning pretrained language models for predicting chemical reaction pathways</span><span class="lang-zh">微调预训练语言模型以预测化学反应路径</span>'
img: assets/img/projects/chemical_retrosynthesis.jpg
importance: 2
category: projects
---

<div class="lang-zh" markdown="1">

## 项目概览

本项目将大语言模型应用于化学逆合成预测这一关键挑战——即给定目标分子，确定合成所需的反应物。该工作位于人工智能与化学的交叉领域，是 AI for Science（AI4S）的重要应用。

**课程：** DS-GA-1011 自然语言处理与表示学习（研究生课程，2024 年秋）

**所属机构：** 纽约大学数据科学中心

**指导教师：** [何赫教授](https://hhexiy.github.io)

**团队成员：** 黄宏嘉、刘兆东、张昊祺

**代码仓库：** [GitHub - NLP_project](https://github.com/zhaodong-liu/Chemical-Retrosynthesis)

**数据集：** [HuggingFace - USPTO-50K](https://huggingface.co/datasets/scaliaven/Ustop50k)

**报告：** [Final Report (PDF)](/assets/pdf/DS_GA_1011_Final_Report.pdf)

## 问题描述

化学逆合成对药物发现至关重要，但传统上需要大量的实验室实验。受大语言模型（LLM）学习与操纵潜在结构方式的启发，本项目针对药物发现中的一项关键挑战展开：基于 SMILES 表示法预测化学逆合成。

核心研究问题是：**鉴于 SMILES 表示缺乏原子位置编码，我们如何有效学习复杂分子转化的鲁棒表征？**

该挑战因以下因素而加剧：
- **数据稀缺：** 原始化学反应数据获取成本高、易出错，且规模不足以支撑鲁棒训练
- **表示局限：** SMILES 是离散表示，缺乏显式的三维结构信息
- **数据质量问题：** 与典型 NLP 任务相比训练数据有限，错误或不完整条目比例较高
- **反应类型不均衡：** 由于特定反应类型样本不足，性能出现下降

## 创新点：基于 LLM 的数据增强

### 研究洞见与方法

在使用基于预训练 BART 的模型在 USPTO-50K 数据集上进行初步实验后，我对错误预测模式进行了深入分析，并检查了不同反应类型间的错误分布。**数据稀缺成为性能下降的关键原因**，尤其是在训练样本有限的特定反应类型上。

我并未止步于接受这些限制，而是提出了一个创新方法：**如果我们能够使用微调后的 LLM 来重构并增强数据集本身，从有限的实验数据中提炼出更好的表征，会如何？**

关键洞见是：LLM 生成的数据可以提供更可学习、更具泛化能力的分子模式，为更小的模型创建一个**更高质量的表征空间**进行学习。通过过滤错误条目并插入有效的、由 LLM 生成的反应，我们构建了一个能够显著提升模型学习鲁棒分子转化模式能力的语料库。

### 数据工程流水线

我设计了实验流水线，并主导了数据集工程与模型开发：

1. **错误分析：** 系统性地检查错误预测，识别不同反应类型间的失败模式
2. **过滤：** 基于错误分析结果，从原始 USPTO-50K 数据集中识别并剔除错误或不完整的反应数据
3. **基于 LLM 的生成：** 使用微调后的 GPT-3.5-turbo 生成有效、化学合理的样本，重点关注样本不足的反应类型
4. **校验：** 确保生成的数据符合 SMILES 表示法规则与化学原理
5. **整合：** 构建 **USPTO-50K_γ**，将原始数据与生成数据精心平衡

这一过程证明了**表征学习对科学领域中的学习稳定性、效率与泛化能力具有显著影响**。

增强后的数据集已在 [HuggingFace](https://huggingface.co/datasets/scaliaven/Ustop50k) 公开，便于复现与社区使用。

## 模型开发

### 基于 BART 的架构

我们采用 BART（双向自回归 Transformer）作为基础模型，它特别适合化学逆合成这样的序列到序列任务。BART 结合了 BERT 双向编码器与 GPT 自回归解码器的优势。

### 参数高效微调（PEFT）策略

为使该方法在实际部署中可行，我应用了**参数高效微调（PEFT）策略**，在保持性能的同时显著降低计算需求。我实现并比较了多种方法：

1. **编码器冻结：** 选择性地冻结部分层，在仅训练上层的同时保留预训练知识，减少可训练参数并保持领域适配能力
2. **MLP Adapter：** 加入小型 adapter 层（瓶颈结构）以进行任务特定学习，无需修改基础模型
3. **LoRA（低秩自适应）：** 使用低秩矩阵分解进行高效参数更新，仅用极少量可训练参数即可达到完整模型的性能

**关键成果：** 通过应用这些 PEFT 策略，我将**可训练参数减少了 90% 以上**，**显著缩短训练时间**，同时**保留了完整微调 98% 以上的准确率**。这一经验表明，恰当的表征学习能够同时实现高性能与计算效率。

每种方法均在原始 USPTO-50K 数据集与我们增强后的 USPTO-50K_γ 数据集上进行评估，以衡量数据质量对模型性能的影响。

## 结果

### 主要发现

基于 LLM 的数据增强方法在所有指标上均取得显著提升：

**数据增强效果：**
- **Top-1 准确率：** 58.8%（基线）→ 74.2%（使用 USPTO-50K_γ）—— **提升 26.2%**
- **Top-3 准确率：** 73.9%（基线）→ 85.2%（使用 USPTO-50K_γ）
- **Top-5 准确率：** 79.4%（基线）→ 88.6%（使用 USPTO-50K_γ）

**Top-1 准确率 26.2% 的提升**表明，LLM 生成的数据提供了更可学习、更具泛化能力的分子模式，为模型创建了更高质量的表征空间。增强后的数据集让模型能够更好地理解分子转化模式，尤其是样本不足的反应类型。

**参数高效微调结果：**
- **LoRA 性能：** 仅用 0.17% 的可训练参数即达到完整微调 98% 的准确率
- **MLP Adapter：** 在最小架构改动下取得有竞争力的性能
- **冻结层：** 在保留预训练知识的同时有效进行领域适配

**计算效率：**
- 使用 LoRA 可训练参数减少 90% 以上
- GPU 显存需求显著降低
- 增强数据带来更快的训练收敛
- 在保持高准确率的同时降低计算成本

数据增强与参数高效微调的结合展示了一种将 LLM 适配于专门科学任务的高性价比方法。

## 影响与贡献

本研究对 AI for Science 做出多项重要贡献：

1. **对表征学习的全新视角：** 揭示了现有离散表示（SMILES 表示法）的局限性，并展示了数据表征质量如何直接影响模型的学习稳定性、效率与泛化能力

2. **基于 LLM 的表征蒸馏：** 提出并验证了一种创新方法，让 LLM 从有限的实验数据中蒸馏出更好的表征，构建更高质量的表征空间（准确率提升 26.2%），让更小的模型能够更有效地学习

3. **系统化错误分析框架：** 设计了涵盖不同反应类型错误分析的综合实验流水线，将数据稀缺识别为根本原因，并针对样本不足的反应类型设计了有针对性的解决方案

4. **参数高效微调：** 证明了 PEFT 策略（编码器冻结、MLP adapter、LoRA）能在保留完整微调 98% 以上准确率的同时将可训练参数减少 90% 以上，表明表征学习可同时实现高性能与计算效率

5. **开放数据集发布：** 在 HuggingFace 上构建并发布 USPTO-50K_γ，便于社区使用与复现，为更广泛的 AI4S 社区做出贡献

6. **可扩展的方法论：** 展示了一套适用于其他化学任务与训练数据有限的科学领域的方法，揭示了表征学习如何在专业领域中克服数据约束

7. **药物发现应用：** 为加速制药研究中的逆合成规划提供了实用工具

## 技术栈与工具

**机器学习与 NLP：**
- BART（双向自回归 Transformer）架构
- 参数高效微调（LoRA、adapter、冻结层）
- 序列到序列建模
- 迁移学习与领域适配
- 基于 LLM 的数据增强（GPT-3.5-turbo）

**化学信息学：**
- SMILES（简化分子线性输入规范）表示法
- 化学反应表示
- 逆合成预测
- 分子结构校验

**开发与工具：**
- PyTorch 深度学习框架
- Hugging Face Transformers 库
- Python 科学计算（NumPy、Pandas）
- 数据集构建与整理
- 模型评估指标（Top-K 准确率）
- 实验跟踪与基准测试

## 未来方向

- 扩展至多步逆合成
- 引入三维分子结构信息
- 探索其他化学相关的预测任务

</div>

<div class="lang-en" markdown="1">

## Overview

This project applies Large Language Models to the critical challenge of chemical retrosynthesis prediction—determining the reactants needed to synthesize a target molecule. This work sits at the intersection of AI and chemistry, representing a significant application of AI for Science (AI4S).

**Course:** DS-GA-1011 NLP with Representation Learning (Grad Level)(Fall 2024)

**Institution:** New York University Center of Data Science

**Advisor:** [Prof. He He](https://hhexiy.github.io)

**Team Members:** Hongjia Huang, Zhaodong Liu, Haoqi (Kevin) Zhang

**Repository:** [GitHub - NLP_project](https://github.com/zhaodong-liu/Chemical-Retrosynthesis)

**Dataset:** [HuggingFace - USPTO-50K](https://huggingface.co/datasets/scaliaven/Ustop50k)

**Report:** [Final Report (PDF)](/assets/pdf/DS_GA_1011_Final_Report.pdf)

## Problem Statement

Chemical retrosynthesis is crucial for drug discovery but traditionally requires extensive laboratory experimentation. Motivated by how large language models (LLMs) learn and manipulate latent structures, this project addresses a critical challenge in drug discovery: predicting chemical retrosynthesis from SMILES notation.

The core research question is: **how can we effectively learn robust representations of complex molecular transformations, given that SMILES notation lacks atomic positional encoding?**

The challenge is compounded by:
- **Data scarcity**: Raw chemical reaction data is expensive to obtain, error-prone, and insufficient in scale for robust training
- **Representation limitations**: SMILES notation is a discrete representation without explicit 3D structural information
- **Data quality issues**: Limited training data compared to typical NLP tasks, with high rates of incorrect or incomplete entries
- **Reaction-type imbalance**: Performance degradation for specific reaction types due to insufficient examples

## Innovation: LLM-based Data Augmentation

### Research Insight and Approach

After initial experiments using a pre-trained BART-based model on the USPTO-50K dataset, I conducted thorough error analysis and examined the incorrect prediction patterns across different reaction types. **Data scarcity emerged as the key cause of performance degradation**, particularly for specific reaction types with limited training examples.

Rather than accepting these constraints, I proposed an innovative approach: **what if we could use a fine-tuned LLM to reconstruct and augment the dataset itself, effectively distilling better representations from limited lab data?**

The key insight was that LLM-generated data could provide more learnable and generalizable molecular patterns, creating a **higher-quality representation space** for the smaller model to learn from. By filtering out incorrect entries and inserting valid, LLM-generated reactions, we created a corpus that dramatically improves the model's ability to learn robust molecular transformation patterns.

### Data Engineering Pipeline

I designed the experimental pipeline and oversaw both dataset engineering and model development:

1. **Error Analysis**: Systematically examined incorrect predictions to identify patterns of failure across different reaction types
2. **Filtering**: Identified and removed incorrect or incomplete reaction data from the original USPTO-50K dataset based on error analysis findings
3. **LLM-based Generation**: Used fine-tuned GPT-3.5-turbo to generate valid, chemically sound examples, focusing on underrepresented reaction types
4. **Validation**: Ensured generated data followed SMILES notation rules and chemical principles
5. **Integration**: Created **USPTO-50K_γ** with carefully balanced original and generated data

This demonstrated that **representation learning has significant impact on learning stability, efficiency, and generalization** in scientific domains.

The augmented dataset is publicly available on [HuggingFace](https://huggingface.co/datasets/scaliaven/Ustop50k) for reproducibility and community use.

## Model Development

### BART-based Architecture

We utilized BART (Bidirectional and Auto-Regressive Transformers) as our base model, which is particularly well-suited for sequence-to-sequence tasks like chemical retrosynthesis. BART combines the strengths of BERT's bidirectional encoder and GPT's autoregressive decoder.

### Parameter-Efficient Fine-tuning (PEFT) Strategies

To make the approach practical for deployment, I applied **parameter-efficient fine-tuning (PEFT) strategies** that dramatically reduce computational requirements while maintaining performance. I implemented and compared multiple approaches:

1. **Encoder Freezing**: Selective layer freezing to preserve pre-trained knowledge while only training upper layers, reducing trainable parameters while maintaining domain-specific adaptation
2. **MLP Adapters**: Adding small adapter layers (bottleneck architecture) for task-specific learning without modifying the base model
3. **LoRA (Low-Rank Adaptation)**: Efficient parameter updates using low-rank matrix decomposition, achieving full model performance with minimal trainable parameters

**Key Achievement**: By applying these PEFT strategies, I **reduced trainable parameters by over 90%** and **cut training time significantly** while **retaining over 98% of full fine-tuning accuracy**. This experience demonstrated that proper representation learning enables both high performance and computational efficiency.

Each approach was evaluated on both the original USPTO-50K dataset and our augmented USPTO-50K_γ dataset to measure the impact of data quality on model performance.

## Results

### Key Findings

The LLM-based data augmentation approach achieved remarkable improvements across all metrics:

**Data Augmentation Impact:**
- **Top-1 Accuracy**: 58.8% (baseline) → 74.2% (with USPTO-50K_γ) — **26.2% improvement**
- **Top-3 Accuracy**: 73.9% (baseline) → 85.2% (with USPTO-50K_γ)
- **Top-5 Accuracy**: 79.4% (baseline) → 88.6% (with USPTO-50K_γ)

This **26.2% improvement in Top-1 Accuracy** indicated that LLM-generated data provided more learnable and generalizable molecular patterns, creating a higher-quality representation space for the model to learn from. The augmented dataset enabled the model to better understand molecular transformation patterns, especially for underrepresented reaction types.

**Parameter-Efficient Fine-tuning Results:**
- **LoRA Performance**: Achieved 98% of full fine-tuning accuracy with only 0.17% trainable parameters
- **MLP Adapters**: Competitive performance with minimal architectural changes
- **Frozen Layers**: Effective for domain adaptation while preserving pre-trained knowledge

**Computational Efficiency:**
- Over 90% reduction in trainable parameters using LoRA
- Significant reduction in GPU memory requirements
- Faster training convergence with augmented data
- Lower computational costs while maintaining high accuracy

The combination of data augmentation and parameter-efficient fine-tuning demonstrates a cost-effective approach to adapting LLMs for specialized scientific tasks.

## Impact & Contributions

This research demonstrates several important contributions to AI for Science:

1. **Novel Perspective on Representation Learning**: Exposed the limitations of existing discrete representations (SMILES notation) and demonstrated how proper data representation quality directly impacts model learning stability, efficiency, and generalization

2. **LLM-based Representation Distillation**: Proposed and validated an innovative approach where LLMs distill better representations from limited lab data, creating a higher-quality representation space (26.2% accuracy improvement) that enables smaller models to learn more effectively

3. **Systematic Error Analysis Framework**: Designed a comprehensive experimental pipeline involving error analysis across reaction types, identifying data scarcity as the root cause and developing targeted solutions for underrepresented reaction types

4. **Parameter-Efficient Fine-tuning**: Proved that PEFT strategies (encoder freezing, MLP adapters, LoRA) can reduce trainable parameters by over 90% while retaining over 98% of full fine-tuning accuracy, demonstrating that representation learning enables both high performance and computational efficiency

5. **Open Dataset Release**: Created and released USPTO-50K_γ on HuggingFace for community use and reproducibility, contributing to the broader AI4S community

6. **Scalable Methodology**: Demonstrated a methodology applicable to other chemistry tasks and scientific domains with limited training data, showing how representation learning can overcome data constraints in specialized domains

7. **Drug Discovery Applications**: Provided a practical tool for accelerating retrosynthesis planning in pharmaceutical research

## Technical Skills & Tools

**Machine Learning & NLP:**
- BART (Bidirectional and Auto-Regressive Transformers) architecture
- Parameter-efficient fine-tuning (LoRA, adapters, frozen layers)
- Sequence-to-sequence modeling
- Transfer learning and domain adaptation
- LLM-based data augmentation (GPT-3.5-turbo)

**Chemical Informatics:**
- SMILES (Simplified Molecular Input Line Entry System) notation
- Chemical reaction representation
- Retrosynthesis prediction
- Molecular structure validation

**Development & Tools:**
- PyTorch deep learning framework
- Hugging Face Transformers library
- Python scientific computing (NumPy, Pandas)
- Dataset creation and curation
- Model evaluation metrics (Top-K accuracy)
- Experiment tracking and benchmarking

## Future Directions

- Extending to multi-step retrosynthesis
- Incorporating 3D molecular structure information
- Exploring other chemistry-related prediction tasks

</div>
