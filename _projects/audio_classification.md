---
layout: page
title: Music Snippet Classification
description: Ensemble of ResNet34 models for classifying music audio snippets by singer gender
img: assets/img/projects/audio_classification.jpg
importance: 3
category: projects
---

## Overview

This project implements an ensemble of deep learning models to classify 3-second audio snippets into 4 gender-based categories, achieving 80.42% accuracy. The pipeline combines vocal separation, custom mel-frequency feature extraction, and ensemble learning techniques.

**Course:** CSCI-SHU 360 Machine Learning

**Institution:** New York University Shanghai

**Final Accuracy:** 80.42%

**Repository:** [GitHub - Audio-Classification](https://github.com/zhaodong-liu/Audio-Classification)

**Report:** [Final Report (PDF)](/assets/pdf/audio_classification_report.pdf)

## Problem Statement

The challenge was to classify short music snippets (3 seconds) into 4 categories based on singer gender. This task required distinguishing vocal characteristics while handling:
- Background instrumentation that obscures vocal features
- Limited temporal context (only 3 seconds per sample)
- High inter-class similarity in vocal characteristics
- Need for robust feature representation from raw audio

## Methodology

### 1. Preprocessing Pipeline

#### Vocal Separation
- Utilized **Spleeter** to isolate vocal tracks from background music
- Achieved approximately 5% accuracy improvement
- Focused model attention on singer characteristics rather than instrumentation

#### Feature Extraction

Implemented custom mel-frequency filter bank feature extraction:

```python
# Configuration
Sample rate: 16kHz
Segment length: 3 seconds
Pre-emphasis filter: α = 0.97
Frame size: 25ms (400 samples)
Frame stride: 10ms (160 samples)
Window: Hamming
FFT size: 1024
Mel filter banks: 40 banks (0-8000 Hz)
Output shape: (299, 40) per sample
```

Rather than using pre-built MFCC functions, I implemented the mel-frequency filter bank computation from scratch, providing:
- Fine-grained control over audio representation
- Custom optimization for 3-second snippets
- Better understanding of the feature extraction process

Features are saved as individual `.npz` files for efficient loading during training.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/weight_computation.png" title="Weight Computation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Mel filter bank weight computation and application process
</div>

### 2. Model Architecture

**Base Model: ResNet34**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/resnet34.jpg" title="ResNet34 Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ResNet34 architecture adapted for audio classification
</div>

Architecture modifications:
- Modified input layer to accept 1-channel spectrograms (299×40)
- Added dropout layer (p=0.2) before final classification
- 4-class output layer
- Trained from scratch (no pre-trained weights)

**Ensemble Method**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/ensemble1.png" title="Ensemble Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ensemble of 20 independent ResNet34 models with averaged predictions
</div>

- 20 independent ResNet34 models
- Each model trained on the same data with different shuffling
- Predictions averaged across all models
- Ensemble improved accuracy by 2-3% over single models

### 3. Training Configuration

**Optimizer & Loss:**
- Optimizer: AdamW (lr=3e-4, weight_decay=1e-5)
- Loss Function: CrossEntropyLoss
- Learning Rate Scheduler: CosineAnnealingWarmRestarts

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/lr_scheduler.png" title="Learning Rate Schedule" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cosine annealing with warm restarts learning rate schedule
</div>

**Training Details:**
- Batch Size: 32
- Epochs: 10-20
- Train/Validation Split: 70/30 (random_state=8)
- Platform: Kaggle (GPU acceleration)

**Advanced Techniques:**
- Dropout (rate=0.2) to prevent overfitting
- Cosine annealing with warm restarts for learning rate scheduling
- 20-model ensemble for robust predictions
- Explored mixup augmentation (experimental)

## Dataset

- **Training Set:** 11,886 audio samples (3 seconds each)
- **Test Set:** 2,447 audio samples
- **Categories:** 4 classes (gender-based classification)
- **Format:** MP3 → Vocal separation → Mel filter banks → NPZ

## Results

| Model | Accuracy |
|-------|----------|
| Single CNN (3 conv layers) | ~65% |
| Single ResNet34 | ~74% |
| ResNet34 Ensemble (4-5 models) | ~77-78% |
| **ResNet34 Ensemble (20 models)** | **80.42%** |

The ensemble approach with 20 models provided the best performance. Key improvements came from:
1. Vocal separation preprocessing: ~5% improvement
2. Custom mel-frequency features: Better representation than standard MFCCs
3. Ensemble learning: 2-3% improvement over single models
4. Proper regularization and learning rate scheduling

## Technical Highlights

1. **Custom Mel Filter Banks:** Hand-implemented mel-frequency feature extraction instead of using pre-built MFCC functions, providing fine-grained control over the audio representation and deeper understanding of the signal processing pipeline.

2. **Vocal Isolation:** Spleeter-based vocal separation focuses the model on singer characteristics rather than background instrumentation, significantly improving classification accuracy.

3. **Large-Scale Ensemble:** Training 20 independent models and averaging predictions significantly improves robustness and generalization, though at the cost of computational expense.

4. **Modified ResNet Architecture:** Successfully adapted computer vision architecture (ResNet34) for audio classification by treating spectrograms as single-channel images.

## Challenges & Lessons Learned

**Challenges:**
- Limited hyperparameter exploration due to computational constraints
- Training constrained by Kaggle platform limitations (random disconnections)
- Balancing ensemble size with computational cost
- Data augmentation experimentation limited by time constraints

**Key Learnings:**
- Preprocessing (vocal separation) can have major impact on model performance
- Ensemble methods provide consistent improvements with diminishing returns
- Custom feature extraction provides better understanding and control
- Proper learning rate scheduling is crucial for convergence

## Technical Skills & Tools

**Machine Learning & Deep Learning:**
- ResNet34 architecture and convolutional neural networks
- Ensemble learning techniques
- Transfer learning concepts (adapting vision models for audio)
- Regularization techniques (dropout, weight decay)
- Learning rate scheduling (cosine annealing)

**Audio Processing:**
- Mel-frequency filter banks implementation
- STFT (Short-Time Fourier Transform)
- Audio feature extraction (MFCCs, spectrograms)
- Vocal separation using Spleeter

**Development & Tools:**
- PyTorch deep learning framework
- Librosa for audio processing
- NumPy for numerical computing
- Kaggle platform for GPU training
- Python scientific computing stack

## Future Directions

- **Hyperparameter Tuning:** Systematic exploration of learning rates, epochs, and model architectures
- **Advanced Architectures:** Explore transformer-based models or audio-specific architectures like WaveNet
- **Data Augmentation:** Further experimentation with mixup, SpecAugment, and time-stretching
- **Model Efficiency:** Investigate knowledge distillation to compress the ensemble into a single model
- **Real-time Inference:** Optimize for deployment with reduced latency

## References

- ResNet: [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
- Spleeter: [Audio Source Separation](https://github.com/deezer/spleeter)
- Mel-Frequency Filter Banks: Standard audio feature extraction technique for speech and music processing
