---
layout: page
title: Collaborative Piano
description: A networked real-time piano application with recording, playback, and chat features
img: assets/img/projects/collaborative_piano.jpg
importance: 3
category: projects
related_publications: false
---

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
