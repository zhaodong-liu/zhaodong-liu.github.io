---
layout: page
title: Generative Retrieval for Recommendation System
description: Multimodal user behavior prediction using advanced tokenization methods
importance: 1
category: research
---

## Overview

This project focuses on developing advanced generative retrieval models for recommendation systems, with a particular emphasis on predicting user click sequences in e-commerce environments. The research explores how Natural Language Processing techniques can be adapted to understand and predict human behavior patterns.

**Duration:** May 2025 - Present
**Institution:** New York University Shanghai
**Advisor:** Prof. Hongyi Wen

## Research Goals

The primary objective is to develop models that can effectively:
- Predict user click sequences on the Amazon dataset
- Capture discrete behavior patterns using sophisticated encoding techniques
- Integrate multimodal information (text and visual) for improved recommendations
- Maintain computational efficiency while improving prediction accuracy

## Methodology

### Architecture Design

I designed and evaluated multiple model architectures:
- **RQ-VAE (Residual Quantized Variational Autoencoder)**: Captures hierarchical patterns in user behavior
- **VQ-VAE (Vector Quantized Variational Autoencoder)**: Learns discrete representations of user preferences

### Tokenization Innovation

Developed a BPE (Byte Pair Encoding)-inspired token reconstruction method that:
- Identifies co-occurring patterns in user behavior
- Merges frequently occurring sequences to improve representation quality
- Enhances sequence coherence for better predictions

### Multimodal Integration

Extended the model to incorporate both visual and textual information:
- Applied Principal Component Analysis (PCA) to process high-dimensional visual data
- Preserved 95% of embedding information while reducing computational overhead by 50%
- Developed an innovative token merging algorithm for multimodal data

## Results

The multimodal approach with optimized tokenization achieved:
- **Accuracy improvement**: from 0.18 to 0.20
- **Computational efficiency**: 50% reduction in processing overhead
- **Better representation quality**: Enhanced sequence coherence through BPE-inspired tokenization

## Key Takeaways

This project demonstrates the power of:
1. Adapting NLP techniques to recommendation systems
2. Multimodal learning for capturing human decision-making processes
3. Efficient dimensionality reduction without sacrificing performance
4. Novel tokenization methods for sequential behavior modeling

## Skills Developed

- Advanced PyTorch implementation
- Variational Autoencoder architectures
- Tokenization algorithms
- Multimodal representation learning
- Large-scale dataset processing
