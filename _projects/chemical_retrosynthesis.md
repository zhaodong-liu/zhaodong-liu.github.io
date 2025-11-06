---
layout: page
title: LLM-based Chemical Retrosynthesis
description: Fine-tuning pretrained language models for predicting chemical reaction pathways
img: assets/img/chemistry_preview.jpg
importance: 2
category: research
---

## Overview

This project applies Large Language Models to the critical challenge of chemical retrosynthesis prediction—determining the reactants needed to synthesize a target molecule. This work sits at the intersection of AI and chemistry, representing a significant application of AI for Science (AI4S).

**Duration:** September 2024 - December 2024
**Institution:** New York University (Center for Data Science)
**Advisor:** Prof. He He

## Problem Statement

Chemical retrosynthesis is crucial for drug discovery but traditionally requires extensive laboratory experimentation. The challenge is compounded by:
- **Data scarcity**: Limited training data compared to typical NLP tasks
- **Data quality issues**: Expensive to obtain, difficult to validate
- **Data scale**: Insufficient for effectively training language models

## Innovation: LLM-based Data Augmentation

Rather than accepting data constraints, I proposed using a fine-tuned LLM to intelligently reconstruct and augment the dataset:

### Data Engineering Pipeline

1. **Filtering**: Identified and removed incorrect or incomplete reaction data
2. **Generation**: Used LLM to generate valid, chemically sound examples
3. **Validation**: Ensured generated data followed SMILES notation rules and chemical principles
4. **Integration**: Carefully balanced original and generated data

## Model Development

### Fine-tuning Strategies

Implemented and compared multiple parameter-efficient fine-tuning approaches:
- **Frozen Layers**: Selective layer freezing to preserve pre-trained knowledge
- **MLP Adapters**: Adding small adapter layers for task-specific learning
- **LoRA (Low-Rank Adaptation)**: Efficient parameter updates using low-rank matrices

## Results

The LLM-based data augmentation approach achieved remarkable improvements:

- **Top-1 Accuracy**: 58.8% → 74.2% (15.4% improvement)
- **Parameter Efficiency**: Over 90% reduction in trainable parameters
- **Resource Efficiency**: Maintained 98% accuracy of full fine-tuning while dramatically reducing:
  - GPU memory usage
  - Training time
  - Computational costs

## Impact

This research demonstrates:
1. The power of LLMs for scientific domain applications
2. How data engineering can overcome scarcity constraints
3. The viability of parameter-efficient fine-tuning for specialized tasks
4. A scalable approach to chemical reaction prediction

## Technical Skills

- Large Language Model fine-tuning
- SMILES notation processing
- PyTorch and Transformers library
- LoRA and adapter-based fine-tuning
- Chemical dataset preprocessing
- Model evaluation and benchmarking

## Future Directions

- Extending to multi-step retrosynthesis
- Incorporating 3D molecular structure information
- Exploring other chemistry-related prediction tasks
