---
layout: page
title: '<span class="lang-en">Collaborative Piano</span><span class="lang-zh">协作钢琴</span>'
description: '<span class="lang-en">A networked real-time piano application with recording, playback, and chat features</span><span class="lang-zh">支持联网实时演奏、录音、回放与聊天功能的钢琴应用</span>'
img: assets/img/projects/collaborative_piano.jpg
importance: 5
category: projects
related_publications: false
---

<div class="lang-zh" markdown="1">

## 项目概览

完全使用 Java 构建的联网钢琴应用：两名用户可实时同步演奏与聊天，并支持完整的录音与回放功能。项目通过整合四大核心计算机科学主题——线程并发与同步、文件 I/O、Socket 网络通信、GUI 图形编程，展示了先进的软件工程理念。

**课程：** Java 与 Web 设计（2025 春）

**所属机构：** 纽约大学坦登工学院

**指导教师：** [Daniel Katz-Braunschweig 教授](https://engineering.nyu.edu/faculty/daniel-katz-braunschweig)

**代码仓库：** [GitHub - Cooperating-Piano](https://github.com/zhaodong-liu/Cooperating-Piano)

**报告：** [Project Report (PDF)](/assets/pdf/Java_Piano_Project_Report.pdf)

**用户手册：** [User Guide (PDF)](/assets/pdf/Cooperating Piano User Guide.pdf)



## 界面

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/PianoAppDemo.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>


## 主要功能

### 🎹 实时协同演奏

- 基于 TCP Socket 的多用户钢琴演奏
- 在已连接的客户端之间同步音频播放
- 内置聊天功能用于演奏者之间的沟通
- 多种音色选择（正弦波、方波、三角波、锯齿波 + 真实钢琴采样）

### 🎨 带动画节拍器的高级 GUI
- 使用 Java Swing 实现的完整钢琴键盘界面
- 使用 **Graphics2D** 与 **AffineTransform** 自绘节拍器
- 通过旋转变换实现平滑的钟摆动画
- 直观的速度、音色选择与录音控制

### 🎵 音频系统
- 基于 **SourceDataLine** 的多线程音频播放
- 真实钢琴采样（.wav）来自开源 TEDAgame 的 Piano Pack
- 通过数学波形生成的合成电子音色
- 支持和弦，可配置音高映射

### 💾 录音与回放
- 会话录制保留精确的时间戳
- 基于文件的存储格式：`note,startTime,endTime,timbre`
- 完整的回放系统可重建录制的演奏
- 暂停/继续功能保持时序同步

## 技术实现

### 架构组件

#### 1. **图形（Java Swing/AWT）**
- 使用 **Graphics2D** 原语进行矢量绘制
- 使用 **AffineTransform** 实现节拍器钟摆旋转与动画
- 为按键按下时的视觉反馈定制绘制方法
- 多控制面板的响应式布局

#### 2. **网络（TCP Socket）**
- **客户端-服务器架构：**
  - 服务器：在 5190 端口的 `ServerSocket`，多线程处理客户端
  - 客户端：基于 Socket 的连接，使用 JSON 编码消息
- **通信协议：**
  - 消息类型："MUSIC"（音符事件）与 "CHAT"（文本消息）
  - 服务器向所有已连接客户端广播事件以实现同步
  - 使用 `DataInputStream/DataOutputStream` 进行帧式消息传递

#### 3. **线程并发**
- **多线程音频播放：**
  - 每个音符通过 `ExecutorService` 启动一个新线程
  - 多音同响时使用独立的音频流
- **网络 I/O 线程：**
  - 为读/写 Socket 数据使用专用线程
  - 线程安全的消息队列
- **同步结构：**
  - 使用 `ConcurrentHashMap` 跟踪活跃音符
  - 使用 `ConcurrentSkipListSet` 管理共享状态
  - 通过时间戳跟踪实现暂停/继续

#### 4. **文件 I/O**
- **录音管理：**
  - 在 `FileWriter` 之上使用 `BufferedWriter` 实现高效录制
  - 事件日志包含音符、音色与时间戳数据
  - 回放时使用 `BufferedReader` 解析文件
- **音频采样加载：**
  - 预先加载 .wav 文件至内存以实现低延迟播放
  - 多个音频文件的资源管理



## 已解决的技术挑战

### 1. **实时同步**
实现了一套健壮的客户端-服务器协议，以确保：
- 音符事件传播延迟极小
- 多客户端间的音频播放同步
- 聊天消息传递不阻塞音频

### 2. **并发音频管理**
- 在不冲突的情况下管理多个同时播放的音频流
- 优化播放线程的线程池
- 干净的资源清理以避免音频通道耗尽

### 3. **时序精度**
- 精确的时间戳记录以实现忠实回放
- 暂停/继续逻辑保持时序一致性
- 节拍器与音频事件同步

### 4. **图形性能**
- 为节拍器动画实现高效重绘
- 通过仿射变换实现平滑的钟摆旋转
- 按键反馈无延迟

## 展示的技能

**编程与软件工程：**
- 高级 Java 编程（Swing、AWT、I/O、Socket）
- 多线程应用设计
- 网络协议设计与实现
- 面向对象架构与模块化设计

**技术概念：**
- TCP Socket 编程
- 线程同步与并发控制
- 使用 Java Sound API 进行音频处理
- 使用 2D 变换进行图形编程
- 文件 I/O 与数据序列化

**工具与技术：**
- Java Swing/AWT
- 使用 ExecutorService 管理线程
- ConcurrentHashMap 与线程安全集合
- Graphics2D 与 AffineTransform
- 使用 BufferedReader/Writer 进行文件操作

## 未来增强

该项目架构支持多项潜在扩展：

1. **数据库集成：** JDBC 支持用于存储用户会话、偏好与音色预设
2. **多房间支持：** 可扩展的服务器架构支持多个并发会话
3. **用户认证：** 带用户档案与会话历史的登录系统
4. **可扩展音频：** 用于导入自定义音色与和弦映射的插件系统
5. **MIDI 支持：** 导入/导出 MIDI 文件以兼容其他音乐软件

## 收获与学习成果

本项目提供了以下方面深入的实践经验：
- 从零构建实时联网应用
- 安全且高效地管理复杂的并发系统
- 将多个子系统（GUI、网络、音频、文件 I/O）整合为一个协同的应用
- 设计模块化、可维护的代码架构
- 调试多线程的竞态条件与同步问题

协作钢琴展示了基础计算机科学概念（线程、Socket、I/O、图形）如何结合在一起，构建出一款交互式、实时的多媒体应用。

</div>

<div class="lang-en" markdown="1">

## Overview

A sophisticated networked piano application built entirely in Java that enables two users to play piano and chat together in real-time, with full recording and playback capabilities. This project demonstrates advanced software engineering principles by integrating four core computer science topics: thread concurrency with synchronization, file I/O, socket networking, and GUI graphics programming.

**Course:** Java and Web Design (Spring 2025)

**Institution:** NYU Tandon School of Engineering 

**Advisor:** [Prof. Daniel Katz-Braunschweig](https://engineering.nyu.edu/faculty/daniel-katz-braunschweig)

**Repository:** [GitHub - Cooperating-Piano](https://github.com/zhaodong-liu/Cooperating-Piano)

**Report:** [Project Report (PDF)](/assets/pdf/Java_Piano_Project_Report.pdf)

**User Guide:** [User Guide (PDF)](/assets/pdf/Cooperating Piano User Guide.pdf)



## Interface

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/PianoAppDemo.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>


## Key Features

### 🎹 Real-Time Collaborative Performance

- Multi-user piano playing over TCP sockets
- Synchronized audio playback across connected clients
- Built-in chat functionality for communication between players
- Multiple timbre options (sine, square, triangle, sawtooth waves + real piano samples)

### 🎨 Advanced GUI with Animated Metronome
- Full-featured piano keyboard interface using Java Swing
- Custom-drawn metronome with **Graphics2D** and **AffineTransform**
- Smooth pendulum animation using rotation transforms
- Intuitive controls for tempo, timbre selection, and recording

### 🎵 Audio System
- Thread-based audio playback using **SourceDataLine**
- Real piano samples (.wav) loaded from open-source TEDAgame's Piano Pack
- Synthesized electronic timbres with mathematical waveform generation
- Chord support with configurable pitch mappings

### 💾 Recording & Playback
- Session recording with accurate timestamp preservation
- File-based storage format: `note,startTime,endTime,timbre`
- Full playback system that reconstructs recorded performances
- Pause/resume functionality with timing synchronization

## Technical Implementation

### Architecture Components

#### 1. **Graphics (Java Swing/AWT)**
- Vector-based drawing using **Graphics2D** primitives
- **AffineTransform** for metronome pendulum rotation and animation
- Custom painting methods for visual feedback on key presses
- Responsive layout with multiple control panels

#### 2. **Networking (TCP Sockets)**
- **Client-Server Architecture:**
  - Server: `ServerSocket` on port 5190, multi-threaded client handling
  - Client: Socket-based connection with JSON message encoding
- **Communication Protocol:**
  - Message types: "MUSIC" (note events) and "CHAT" (text messages)
  - Server broadcasts all events to connected clients for synchronization
  - Framed messages using `DataInputStream/DataOutputStream`

#### 3. **Thread Concurrency**
- **Multi-threaded Audio Playback:**
  - Each note spawns a new thread via `ExecutorService`
  - Independent audio streams for simultaneous notes
- **Network I/O Threads:**
  - Dedicated threads for reading/writing socket data
  - Thread-safe message queuing
- **Synchronization Structures:**
  - `ConcurrentHashMap` for active note tracking
  - `ConcurrentSkipListSet` for shared state management
  - Timestamp tracking for pause/resume functionality

#### 4. **File I/O**
- **Recording Management:**
  - `BufferedWriter` over `FileWriter` for efficient recording
  - Event logging with note, timbre, and timestamp data
  - `BufferedReader` for file parsing during playback
- **Audio Sample Loading:**
  - Preloaded .wav files cached in memory for low-latency playback
  - Resource management for multiple audio files



## Technical Challenges Solved

### 1. **Real-Time Synchronization**
Implemented a robust client-server protocol to ensure:
- Minimal latency in note event propagation
- Synchronized playback across multiple clients
- Chat messages delivered without blocking audio

### 2. **Concurrent Audio Management**
- Managed multiple simultaneous audio streams without conflicts
- Thread pool optimization for playback threads
- Clean resource cleanup to prevent audio line exhaustion

### 3. **Timing Accuracy**
- Precise timestamp recording for faithful playback
- Pause/resume logic that maintains timing consistency
- Metronome synchronization with audio events

### 4. **Graphics Performance**
- Efficient redrawing for metronome animation
- Smooth pendulum rotation using affine transforms
- Visual feedback for key presses without lag

## Skills Demonstrated

**Programming & Software Engineering:**
- Advanced Java programming (Swing, AWT, I/O, Sockets)
- Multi-threaded application design
- Network protocol design and implementation
- Object-oriented architecture and modular design

**Technical Concepts:**
- TCP socket programming
- Thread synchronization and concurrency control
- Audio processing with Java Sound API
- Graphics programming with 2D transforms
- File I/O and data serialization

**Tools & Technologies:**
- Java Swing/AWT
- ExecutorService for thread management
- ConcurrentHashMap and thread-safe collections
- Graphics2D and AffineTransform
- BufferedReader/Writer for file operations

## Future Enhancements

The project architecture supports several potential extensions:

1. **Database Integration:** JDBC support for storing user sessions, preferences, and timbre presets
2. **Multi-Room Support:** Scalable server architecture for multiple concurrent sessions
3. **User Authentication:** Login system with user profiles and session history
4. **Extensible Audio:** Plugin system for importing custom timbres and chord maps
5. **MIDI Support:** Import/export MIDI files for compatibility with other music software

## Impact & Learning Outcomes

This project provided deep hands-on experience with:
- Building real-time networked applications from scratch
- Managing complex concurrent systems safely and efficiently
- Integrating multiple subsystems (GUI, networking, audio, file I/O) into a cohesive application
- Designing modular, maintainable code architecture
- Debugging multi-threaded race conditions and synchronization issues

The collaborative piano demonstrates how fundamental CS concepts (threads, sockets, I/O, graphics) combine to create an interactive, real-time multimedia application.

</div>
