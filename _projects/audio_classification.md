---
layout: page
title: '<span class="lang-en">Music Snippet Classification</span><span class="lang-zh">音乐片段分类</span>'
description: '<span class="lang-en">Ensemble of ResNet34 models for classifying music audio snippets by singer gender</span><span class="lang-zh">基于 ResNet34 集成模型的音乐片段歌者性别分类</span>'
img: assets/img/projects/audio_classification.jpg
importance: 4
category: projects
---

<div class="lang-zh" markdown="1">

## 项目概览

本项目实现了一个深度学习模型集成系统，将 3 秒长的音频片段分类为基于歌者性别的 4 个类别，最终准确率达到 80.42%。流水线结合了人声分离、自定义的梅尔频率特征提取与集成学习技术。

**课程：** CSCI-SHU 360 机器学习

**所属机构：** 上海纽约大学

**最终准确率：** 80.42%

**代码仓库：** [GitHub - Audio-Classification](https://github.com/zhaodong-liu/Audio-Classification)

**报告：** [Final Report (PDF)](/assets/pdf/audio_classification_report.pdf)

## 问题描述

任务挑战是基于歌者性别将短音乐片段（3 秒）分类为 4 个类别。该任务需要在以下条件下区分人声特征：

- 背景伴奏对人声特征的遮蔽
- 时间上下文有限（每个样本仅 3 秒）
- 各类别间人声特征高度相似
- 需要从原始音频中构建鲁棒的特征表示

## 方法

### 1. 预处理流水线

#### 人声分离

- 利用 **Spleeter** 从背景音乐中分离出人声轨道
- 准确率提升约 5%
- 让模型聚焦于歌者特征而非伴奏

#### 特征提取

实现自定义的梅尔频率滤波器组特征提取：

```python
# 配置
采样率: 16kHz
片段长度: 3 秒
预加重滤波器: α = 0.97
帧长: 25ms (400 个采样点)
帧移: 10ms (160 个采样点)
窗函数: Hamming
FFT 大小: 1024
梅尔滤波器组: 40 个滤波器 (0-8000 Hz)
输出形状: 每个样本 (299, 40)
```

相比使用现成的 MFCC 函数，我从零实现了梅尔频率滤波器组计算，从而带来：

- 对音频表示的精细控制
- 针对 3 秒片段的自定义优化
- 对特征提取过程更深入的理解

特征保存为独立的 `.npz` 文件，以便训练时高效加载。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/weight_computation.png" title="Weight Computation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    梅尔滤波器组权重计算与应用过程
</div>

### 2. 模型架构

**基础模型：ResNet34**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/resnet34.jpg" title="ResNet34 Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    针对音频分类调整的 ResNet34 架构
</div>

架构修改：

- 修改输入层以接受单通道频谱图（299×40）
- 在最终分类层之前加入 dropout 层（p=0.2）
- 4 类输出层
- 从零训练（不使用预训练权重）

**集成方法**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/ensemble1.png" title="Ensemble Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    由 20 个独立 ResNet34 模型组成的集成，预测结果取平均
</div>

- 20 个独立的 ResNet34 模型
- 每个模型使用相同的数据但不同的打乱顺序进行训练
- 对所有模型的预测结果取平均
- 集成方法相比单模型准确率提升 2-3%

### 3. 训练配置

**优化器与损失函数：**

- 优化器：AdamW（lr=3e-4，weight_decay=1e-5）
- 损失函数：CrossEntropyLoss
- 学习率调度器：CosineAnnealingWarmRestarts

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/audio_classification/lr_scheduler.png" title="Learning Rate Schedule" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    带热重启的余弦退火学习率调度
</div>

**训练细节：**

- 批大小：32
- 训练轮数：10-20
- 训练/验证集划分：70/30（random_state=8）
- 平台：Kaggle（GPU 加速）

**高级技术：**

- Dropout（rate=0.2）防止过拟合
- 带热重启的余弦退火学习率调度
- 20 模型集成以获得鲁棒预测
- 探索 mixup 数据增强（实验性）

## 数据集

- **训练集：** 11,886 个音频样本（每个 3 秒）
- **测试集：** 2,447 个音频样本
- **类别：** 4 类（基于性别的分类）
- **格式：** MP3 → 人声分离 → 梅尔滤波器组 → NPZ

## 结果

| 模型                           | 准确率     |
| ------------------------------ | ---------- |
| 单层 CNN（3 个卷积层）         | ~65%       |
| 单个 ResNet34                  | ~74%       |
| ResNet34 集成（4-5 个模型）    | ~77-78%    |
| **ResNet34 集成（20 个模型）** | **80.42%** |

20 个模型的集成方法表现最佳。主要提升来自：

1. 人声分离预处理：约 5% 提升
2. 自定义梅尔频率特征：比标准 MFCC 提供更好的表示
3. 集成学习：相比单模型提升 2-3%
4. 合理的正则化与学习率调度

## 技术亮点

1. **自定义梅尔滤波器组：** 手工实现梅尔频率特征提取，而非使用现成的 MFCC 函数，提供对音频表示的精细控制以及对信号处理流水线的更深入理解。

2. **人声分离：** 基于 Spleeter 的人声分离让模型聚焦于歌者特征而非背景伴奏，显著提升分类准确率。

3. **大规模集成：** 训练 20 个独立模型并对预测取平均显著提升鲁棒性与泛化能力，代价是计算开销。

4. **改造的 ResNet 架构：** 通过将频谱图视为单通道图像，成功将计算机视觉架构（ResNet34）应用于音频分类。

## 挑战与经验

**挑战：**

- 由于计算资源限制，超参数探索有限
- 训练受 Kaggle 平台限制（随机断连）
- 在集成规模与计算成本之间需要权衡
- 数据增强实验受时间所限

**主要收获：**

- 预处理（人声分离）对模型性能影响巨大
- 集成方法带来稳定提升，但存在边际递减
- 自定义特征提取带来更好的理解与控制
- 合理的学习率调度对收敛至关重要

## 技术栈与工具

**机器学习与深度学习：**

- ResNet34 架构与卷积神经网络
- 集成学习技术
- 迁移学习概念（将视觉模型适配于音频）
- 正则化技术（dropout、weight decay）
- 学习率调度（余弦退火）

**音频处理：**

- 梅尔频率滤波器组实现
- STFT（短时傅里叶变换）
- 音频特征提取（MFCC、频谱图）
- 使用 Spleeter 进行人声分离

**开发与工具：**

- PyTorch 深度学习框架
- Librosa 音频处理库
- NumPy 数值计算
- Kaggle 平台进行 GPU 训练
- Python 科学计算生态

## 未来方向

- **超参数调优：** 系统地探索学习率、训练轮数与模型架构
- **更先进的架构：** 探索基于 Transformer 的模型或专为音频设计的架构（如 WaveNet）
- **数据增强：** 进一步实验 mixup、SpecAugment 与时间拉伸
- **模型效率：** 研究知识蒸馏，将集成压缩为单模型
- **实时推理：** 针对部署进行优化以降低延迟

## 参考文献

- ResNet：[Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
- Spleeter：[Audio Source Separation](https://github.com/deezer/spleeter)
- 梅尔频率滤波器组：用于语音与音乐处理的标准音频特征提取技术

</div>

<div class="lang-en" markdown="1">

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

| Model                             | Accuracy   |
| --------------------------------- | ---------- |
| Single CNN (3 conv layers)        | ~65%       |
| Single ResNet34                   | ~74%       |
| ResNet34 Ensemble (4-5 models)    | ~77-78%    |
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

</div>
