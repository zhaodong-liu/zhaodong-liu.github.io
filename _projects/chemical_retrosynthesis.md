---
layout: page
title: LLM-based Chemical Retrosynthesis
description: Fine-tuning pretrained language models for predicting chemical reaction pathways
importance: 2
category: course project
---

## Overview

This project applies Large Language Models to the critical challenge of chemical retrosynthesis prediction—determining the reactants needed to synthesize a target molecule. This work sits at the intersection of AI and chemistry, representing a significant application of AI for Science (AI4S).

**Course:** DS-GA-1011 NLP with Representation Learning (Grad Level)(Fall 2024)

**Institution:** New York University Center of Data Science

**Advisor:** [Prof. He He](https://hhexiy.github.io)

**Team Members:** Hongjia Huang, Zhaodong Liu, Haoqi (Kevin) Zhang

**Repository:** [GitHub - NLP_project](https://github.com/scaliaven/NLP_project)

**Dataset:** [HuggingFace - USPTO-50K](https://huggingface.co/datasets/scaliaven/Ustop50k)

**Report:** [Final Report (PDF)](/assets/pdf/DS_GA_1011_Final_Report.pdf)

## Problem Statement

Chemical retrosynthesis is crucial for drug discovery but traditionally requires extensive laboratory experimentation. The challenge is compounded by:
- **Data scarcity**: Limited training data compared to typical NLP tasks
- **Data quality issues**: Expensive to obtain, difficult to validate
- **Data scale**: Insufficient for effectively training language models

## Innovation: LLM-based Data Augmentation

Rather than accepting data constraints, we proposed using a fine-tuned LLM to intelligently reconstruct and augment the USPTO-50K dataset, creating the enhanced **USPTO-50K_γ** dataset:

### Data Engineering Pipeline

1. **Filtering**: Identified and removed incorrect or incomplete reaction data from the original USPTO-50K dataset
2. **Generation**: Used fine-tuned LLM (GPT-3.5-turbo) to generate valid, chemically sound examples
3. **Validation**: Ensured generated data followed SMILES notation rules and chemical principles
4. **Integration**: Created USPTO-50K_γ with carefully balanced original and generated data

The augmented dataset is publicly available on [HuggingFace](https://huggingface.co/datasets/scaliaven/Ustop50k) for reproducibility and community use.

## Model Development

### BART-based Architecture

We utilized BART (Bidirectional and Auto-Regressive Transformers) as our base model, which is particularly well-suited for sequence-to-sequence tasks like chemical retrosynthesis. BART combines the strengths of BERT's bidirectional encoder and GPT's autoregressive decoder.

### Fine-tuning Strategies

Implemented and compared multiple parameter-efficient fine-tuning approaches to reduce computational costs:

1. **Frozen Layers**: Selective layer freezing to preserve pre-trained knowledge while only training upper layers
2. **MLP Adapters**: Adding small adapter layers (bottleneck architecture) for task-specific learning without modifying the base model
3. **LoRA (Low-Rank Adaptation)**: Efficient parameter updates using low-rank matrix decomposition, achieving full model performance with minimal trainable parameters

Each approach was evaluated on both the original USPTO-50K dataset and our augmented USPTO-50K_γ dataset to measure the impact of data quality on model performance.

## Results

### Key Findings

The LLM-based data augmentation approach achieved remarkable improvements across all metrics:

**Data Augmentation Impact:**
- **Top-1 Accuracy**: 58.8% (baseline) → 74.2% (with USPTO-50K_γ)
- **Top-3 Accuracy**: 73.9% (baseline) → 85.2% (with USPTO-50K_γ)
- **Top-5 Accuracy**: 79.4% (baseline) → 88.6% (with USPTO-50K_γ)

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

1. **LLM Data Augmentation for Scientific Domains**: Showed that fine-tuned LLMs can effectively generate high-quality training data for specialized scientific tasks, overcoming data scarcity issues
2. **Cost-Aware Model Adaptation**: Proved that parameter-efficient fine-tuning (LoRA) can achieve near full fine-tuning performance with 99.83% fewer trainable parameters
3. **Open Dataset Release**: Created and released USPTO-50K_γ on HuggingFace for community use and reproducibility
4. **Scalable Approach**: Demonstrated a methodology applicable to other chemistry tasks and scientific domains with limited training data
5. **Drug Discovery Applications**: Provided a practical tool for accelerating retrosynthesis planning in pharmaceutical research

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
