---
layout: page
title: LLM-based Chemical Retrosynthesis
description: Fine-tuning pretrained language models for predicting chemical reaction pathways
img: assets/img/projects/chemical_retrosynthesis.jpg
importance: 2
category: selected projects
---

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
