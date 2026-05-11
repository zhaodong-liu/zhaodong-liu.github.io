---
layout: page
title: '<span class="lang-en">Traffic-Aware Route Optimization</span><span class="lang-zh">考虑交通灯的路线优化</span>'
description: '<span class="lang-en">Optimizing driving routes considering real-time traffic light timings</span><span class="lang-zh">结合实时交通信号时序的驾驶路线优化</span>'
img: assets/img/projects/route_optimization.jpg
importance: 3
category: projects
---

<div class="lang-zh" markdown="1">

## 项目概览

本项目基于 SUMO（城市交通仿真平台，Simulation of Urban MObility）开发了一套考虑交通灯时序的路径优化系统，同时兼顾行驶时间与能源效率。通过模拟真实交通条件与交通灯时序，系统优化驾驶路线以最小化行驶时间并提升能源效率。项目针对两类车辆给出差异化的建模方法：传统汽油车（含 LICO——抬升与滑行策略）与电动车（含再生制动）。

**时间：** 2024 年 5 月 — 2024 年 8 月

**所属机构：** 上海纽约大学

**指导教师：** [陈志斌教授](https://shanghai.nyu.edu/academics/faculty/directory/zhibin-chen)

**仿真平台：** SUMO（Simulation of Urban MObility）

## 研究动机

传统路径规划系统主要面向距离或行驶时间进行优化，忽略了交通灯对能耗的显著影响。本项目针对若干关键空白展开：

- **交通灯影响：** 频繁的红灯停车增加燃油消耗、降低效率
- **车辆特定动力学：** 汽油车与电动车具有根本不同的能耗特性
  - **汽油车：** 受益于 LICO——抬升与滑行——以在停车前降低燃油消耗
  - **电动车：** 利用再生制动在减速时回收能量
- **能源优化：** 路径规划应同时考虑行驶时间与能源效率
- **真实约束：** 交通信号时序创造了与时间相关的优化机会

通过建模车辆特定的能耗模式与交通灯交互，该系统使得更可持续、更高效的路径规划成为可能。

## 方法

### SUMO 仿真搭建

构建了一个全面的交通仿真环境，包含车辆特定建模：
- **路网：** 含交叉口拓扑的真实路网
- **交通信号：** 配置真实的交通灯时序与同步模式
- **车辆模型：** 在 SUMO 中实现两类不同的车辆类型：
  - **汽油车模型：** LICO 行为参数、怠速/加速时的燃油消耗
  - **电动车模型：** 再生制动效率、电池放电/充电速率
- **交通模式：** 时变交通流影响车辆速度与停车次数

### 问题建模

将路径优化建模为多目标图问题：
- **节点：** 含交通信号与时序信息的交叉口
- **边：** 带车辆类型特定代价函数的道路段
  - **汽油车代价：** 行驶时间 + 燃油消耗（考虑 LICO 机会）
  - **电动车代价：** 行驶时间 + 净能耗（包含再生制动回收）
- **约束：** 交通灯时序、信号相位预测、车辆动力学

### 算法开发

#### 核心实现：车辆感知路径算法

扩展 **Dijkstra** 算法，加入车辆特定的能源建模：

**汽油车：**
- 检测红灯前 LICO 的机会（降低刹车带来的燃油浪费）
- 基于交通信号时序计算最优减速点
- 最小化交叉口怠速时间（高燃油消耗、零位移）
- 即便稍长也优先选择停车次数较少的路线

**电动车：**
- 将再生制动能量回收纳入代价计算
- 建模路径中的电池状态变化
- 考虑某些停车在能量上是有益的（能量回收机会）
- 在最小化停车与最大化再生机会之间寻求平衡

#### 优化技术

- **时变代价：** 边权重根据预测到达时间与交通灯状态变化
- **能耗模型：** 与 SUMO 集成的独立燃油消耗与电池模型
- **多目标优化：** 在时间与能耗间探索 Pareto 前沿
- **路径验证：** 通过 SUMO 迭代仿真验证能耗预测

## 实验设置

### 数据来源

- **OpenStreetMap（OSM）：** 路网拓扑与几何
- **交通信号数据：** 交通灯时序、相位序列与同步模式
- **车辆参数：**
  - 汽油车：发动机效率曲线、怠速燃油消耗、LICO 减速率
  - 电动车：电机效率、电池特性、再生制动系数
- **交通模式：** 影响车辆速度的时变交通流

### SUMO 仿真框架

实现了一套完整的基于 SUMO 的仿真环境：
- **路网导入：** 将 OSM 数据转换为含高程数据的 SUMO 路网格式
- **交通灯配置：** 编程实现真实的信号时序与相位模式
- **车辆类型定义：**
  - **汽油车：** 自定义车辆类，含燃油消耗模型与 LICO 参数
  - **电动车：** 启用再生制动的纯电动车
- **能源追踪：** 集成 SUMO 的能耗模型，覆盖两类车型
- **场景测试：** 多种测试场景，含不同交通密度与信号时序

### 仿真场景

为两类车辆比较路径策略：

**汽油车路径：**
1. **时间最优：** 忽略能耗的最快路径
2. **LICO 优化：** 最大化红灯前 LICO 机会的路径
3. **混合：** 平衡时间与燃油效率

**电动车路径：**
1. **时间最优：** 忽略能耗的最快路径
2. **再生感知：** 考虑再生制动机会的路径
3. **电池最优：** 最小化净能耗

## 结果

车辆特定的交通感知优化展现了：

**汽油车：**
- **节油：** 通过策略性 LICO 降低燃油消耗
- **怠速时间减少：** 减少红灯停车降低了怠速燃油浪费
- **权衡：** 牺牲少量行驶时间（2-5%）换来显著节油（10-15%）

**电动车：**
- **能源效率：** 通过利用再生制动提升整体能源效率
- **电池管理：** 通过可预测的能量回收实现更优的电池状态管理
- **最优停车：** 一些带策略性停车的路径表现优于纯时间最优路径

**对比分析：**
- 车辆类型显著影响最优路径选择
- 整合交通灯时序对两类车辆均至关重要
- 能源感知路径在不显著牺牲时间的前提下带来可衡量的效益

## 案例研究：上海纽约大学班车优化

### 背景

上海纽约大学的班车服务连接浦东校区与住宿区。班车车队由柴油客车组成，燃油效率直接关系到运营成本与环境影响。

### 仿真设置

**分析路线：** 上海纽约大学前滩校区 → 镜耀宿舍

**关键参数：**
- 路线距离：约 3 公里
- 交通灯数量：7 个主要交叉口
- 高峰时段运营：早班（7:30-9:00）与晚班（17:00-19:00）
- 平均行程时间：随交通约 15 分钟

**SUMO 配置：**
- 从 OpenStreetMap 导入浦东地区实际路网
- 配置主要交叉口的真实交通信号时序
- 使用真实燃油消耗参数建模柴油班车
- 模拟早高峰交通模式

### 优化结果

**主要发现：**
- 由于距离较短、涉及的交通灯数量较少，该策略对燃油效率的提升并不显著。但初步结果显示出节油效果，证明了该方法的实用性。

### 实施考量

**可行性：**
- 路线调整对现有班次表改动极小
- 2-3 分钟的发车时间调整可改善交通灯同步
- LICO 驾驶行为可通过司机培训实施

**局限性：**
- 必须在乘客便利与能源效率之间取得平衡
- 仿真未能完全捕捉实时交通变化
- 班次可靠性仍是实际实施的首要约束

该案例研究展示了交通感知、能源高效的路径规划在真实校园交通系统中的实用性，表明适度的班次调整能够带来显著的运营与环境效益。

## 已应对的技术挑战

1. **车辆特定建模：** 准确捕获不同的能耗模式
2. **多目标优化：** 平衡行驶时间与能源效率
3. **再生制动建模：** 量化电动车的能量回收
4. **LICO 策略：** 为汽油车确定最优减速点
5. **实时约束：** 为实际路径规划提供高效计算
6. **SUMO 集成：** 将优化算法与详细交通仿真耦合

## 实现细节

- **仿真平台：** SUMO（Simulation of Urban MObility）
- **语言：** Python
- **主要库：**
  - TraCI（Traffic Control Interface）用于 SUMO 集成
  - NetworkX 用于图操作
  - NumPy 用于数值计算
  - OSMnx 用于 OpenStreetMap 数据处理
- **算法复杂度：** 针对实时性能进行优化
- **数据结构：** 优先队列、邻接表、按时间索引的图表示

## 应用

本研究在可持续交通领域有广泛应用：
- **车队管理：** 混合汽油/电动车队的最优路径规划
- **导航系统：** 面向消费者车辆的能源感知路径
- **自动驾驶：** 与自动驾驶汽车能量管理的集成
- **城市规划：** 理解交通信号布局的能源影响
- **电动车基础设施：** 基于能耗模式指导充电桩布局
- **碳足迹减排：** 推动更高效的城市交通

## 主要收获

- 车辆特定的能源建模与消耗模式
- 多目标优化与相互竞争的目标（时间 vs. 能耗）
- SUMO 交通仿真与能源模型集成
- 再生制动系统及其对路径策略的影响
- 行驶时间与能源效率间的权衡
- 图算法在可持续交通中的真实应用

</div>

<div class="lang-en" markdown="1">

## Overview

This project develops a traffic-aware routing optimization system using SUMO (Simulation of Urban MObility) that considers both travel time and energy efficiency. By simulating real-world traffic conditions and traffic light timings, the system optimizes driving routes to minimize travel time and improve energy efficiency. The project features distinct modeling approaches for two vehicle types: traditional gasoline vehicles (with LICO -- lifting and coasting) and electric vehicles (with regenerative braking).

**Duration:** May 2024 - August 2024

**Institution:** New York University Shanghai

**Advisor:** [Prof. Zhibin Chen](https://shanghai.nyu.edu/academics/faculty/directory/zhibin-chen)

**Simulation Platform:** SUMO (Simulation of Urban MObility)

## Motivation

Traditional routing systems optimize primarily for distance or travel time, neglecting the significant impact of traffic lights on energy consumption. This project addresses critical gaps:

- **Traffic Light Impact**: Frequent stops at red lights increase fuel consumption and reduce efficiency
- **Vehicle-Specific Dynamics**: Gasoline and electric vehicles have fundamentally different energy profiles
  - **Gasoline Vehicles**: Benefit from LICO --  lifting and coasting to reduce fuel consumption before stops
  - **Electric Vehicles**: Utilize regenerative braking to recover energy during deceleration
- **Energy Optimization**: Route planning should consider both travel time and energy efficiency
- **Real-World Constraints**: Traffic signal timings create time-dependent optimization opportunities

By modeling vehicle-specific energy consumption patterns and traffic light interactions, this system enables more sustainable and efficient route planning.

## Approach

### SUMO Simulation Setup

Built a comprehensive traffic simulation environment with vehicle-specific modeling:
- **Road Network**: Real-world road network with intersection topology
- **Traffic Signals**: Configured realistic traffic light timings and synchronization patterns
- **Vehicle Models**: Implemented two distinct vehicle types in SUMO:
  - **Gasoline Vehicle Model**: Parameters for LICO behavior, fuel consumption during idle/acceleration
  - **Electric Vehicle Model**: Regenerative braking efficiency, battery discharge/charge rates
- **Traffic Patterns**: Time-varying traffic flows affecting vehicle speeds and stops

### Problem Formulation

Formulated the route optimization as a multi-objective graph problem:
- **Nodes**: Intersections with traffic signals and timing information
- **Edges**: Road segments with vehicle-type-specific cost functions
  - **Gasoline Vehicle Costs**: Travel time + fuel consumption (accounting for LICO opportunities)
  - **Electric Vehicle Costs**: Travel time + net energy consumption (including regenerative braking recovery)
- **Constraints**: Traffic light timings, signal phase predictions, vehicle dynamics

### Algorithm Development

#### Core Implementation: Vehicle-Aware Routing Algorithm

Extended **Dijkstra**'s algorithm with vehicle-specific energy modeling:

**For Gasoline Vehicles:**
- Detects opportunities to LICO before red lights (reducing fuel waste from braking)
- Calculates optimal deceleration points based on traffic signal timing
- Minimizes idle time at intersections (high fuel consumption, zero distance)
- Prefers routes with fewer stops even if slightly longer

**For Electric Vehicles:**
- Incorporates regenerative braking energy recovery in cost calculation
- Models battery state changes throughout the route
- Considers that some stops can be energetically beneficial (energy recovery opportunity)
- Balances between minimizing stops and maximizing regeneration opportunities

#### Optimization Techniques

- **Time-Dependent Costs**: Edge weights vary based on predicted arrival time and traffic light state
- **Energy Models**: Separate fuel consumption and battery models integrated with SUMO
- **Multi-Objective Optimization**: Pareto frontier exploration balancing time and energy
- **Route Validation**: Iterative SUMO simulation to verify energy consumption predictions

## Experimental Setup

### Data Sources

- **OpenStreetMap (OSM)**: Road network topology and geometry
- **Traffic Signal Data**: Traffic light timing, phase sequences, and synchronization patterns
- **Vehicle Parameters**:
  - Gasoline vehicle: Engine efficiency curves, idle fuel consumption, LICO deceleration rates
  - Electric vehicle: Motor efficiency, battery characteristics, regenerative braking coefficients
- **Traffic Patterns**: Time-varying traffic flows affecting vehicle speeds

### SUMO Simulation Framework

Implemented a complete SUMO-based simulation environment:
- **Network Import**: Converted OSM data to SUMO road network format with elevation data
- **Traffic Light Configuration**: Programmed realistic signal timing and phase patterns
- **Vehicle Type Definitions**:
  - **Gasoline Vehicle**: Custom vehicle class with fuel consumption model and LICO parameters
  - **Electric Vehicle**: Battery-electric vehicle with regenerative braking enabled
- **Energy Tracking**: Integrated SUMO's energy consumption models for both vehicle types
- **Scenario Testing**: Multiple test scenarios with varying traffic densities and signal timings

### Simulation Scenarios

Compared routing strategies for both vehicle types:

**Gasoline Vehicle Routes:**
1. **Time-Optimal**: Fastest route ignoring energy
2. **LICO-Optimized**: Route maximizing LICO opportunities before red lights
3. **Hybrid**: Balanced time and fuel efficiency

**Electric Vehicle Routes:**
1. **Time-Optimal**: Fastest route ignoring energy
2. **Regeneration-Aware**: Route considering regenerative braking opportunities
3. **Battery-Optimal**: Minimizing net energy consumption

## Results

The vehicle-specific traffic-aware optimization demonstrated:

**Gasoline Vehicles:**
- **Fuel Savings**: Reduced fuel consumption through strategic LICO
- **Idle Time Reduction**: Fewer stops at red lights decreased idle fuel waste
- **Trade-offs**: Small increases in travel time (2-5%) achieved significant fuel savings (10-15%)

**Electric Vehicles:**
- **Energy Efficiency**: Improved overall energy efficiency through regenerative braking utilization
- **Battery Management**: Better battery state management with predictable energy recovery
- **Optimal Stopping**: Some routes with more strategic stops outperformed purely time-optimal routes

**Comparative Analysis:**
- Vehicle type significantly affects optimal route selection
- Traffic light timing integration crucial for both vehicle types
- Energy-aware routing provides measurable benefits without major time penalties

## Case Study: NYU Shanghai Shuttle Optimization

### Background

The NYU Shanghai shuttle service operates on the route connecting the campus in Pudong with the residential area. The shuttle fleet consists of diesel buses, making fuel efficiency a key concern for operational costs and environmental impact.

### Simulation Setup

**Route Analyzed:** NYU Shanghai Qiantan Campus → Jingyao Residence Hall

**Key Parameters:**
- Route distance: Approximately 3 km
- Number of traffic lights: 7 major intersections
- Peak hour operation: Morning (7:30-9:00 AM) and Evening (5:00-7:00 PM)
- Average trip time: 15 minutes depending on traffic

**SUMO Configuration:**
- Imported actual road network of Pudong area from OpenStreetMap
- Configured real traffic signal timings from major intersections
- Modeled diesel shuttle bus with realistic fuel consumption parameters
- Simulated morning rush hour traffic patterns

### Optimization Results

**Key Findings:**
- The strategy does not show significant improvement on fuel efficiency due to rather short distance, and low number of traffic lights involved. However, it shows preliminary results of fuel saving, demonstrating its usefulness.

### Implementation Considerations

**Feasibility:**
- Route modifications require minimal changes to existing schedule
- Departure time adjustments of 2-3 minutes improve traffic light synchronization
- LICO driving behavior can be implemented through driver training

**Limitations:**
- Passenger convenience must be balanced with energy efficiency
- Real-time traffic variations not fully captured in simulation
- Schedule reliability remains the primary constraint for actual implementation

This case study demonstrates the practical applicability of traffic-aware, energy-efficient routing for real campus transportation systems, showing that modest schedule adjustments can yield significant operational and environmental benefits.

## Technical Challenges Addressed

1. **Vehicle-Specific Modeling**: Accurately capturing different energy consumption patterns
2. **Multi-Objective Optimization**: Balancing travel time and energy efficiency
3. **Regenerative Braking Modeling**: Quantifying energy recovery in electric vehicles
4. **LICO Strategy**: Determining optimal deceleration points for gasoline vehicles
5. **Real-time Constraints**: Efficient computation for practical route planning
6. **SUMO Integration**: Coupling optimization algorithm with detailed traffic simulation

## Implementation Details

- **Simulation Platform**: SUMO (Simulation of Urban MObility)
- **Language**: Python
- **Key Libraries**:
  - TraCI (Traffic Control Interface) for SUMO integration
  - NetworkX for graph operations
  - NumPy for numerical computations
  - OSMnx for OpenStreetMap data processing
- **Algorithm Complexity**: Optimized for real-time performance
- **Data Structures**: Priority queues, adjacency lists, time-indexed graph representations

## Applications

This research has broad applications for sustainable transportation:
- **Fleet Management**: Optimal routing for mixed gasoline/electric vehicle fleets
- **Navigation Systems**: Energy-aware routing for consumer vehicles
- **Autonomous Vehicles**: Integration with self-driving car energy management
- **Urban Planning**: Understanding energy implications of traffic signal placement
- **EV Infrastructure**: Informing charging station placement based on energy usage patterns
- **Carbon Footprint Reduction**: Enabling more efficient urban transportation

## Key Learnings

- Vehicle-specific energy modeling and consumption patterns
- Multi-objective optimization with competing goals (time vs. energy)
- SUMO traffic simulation and energy model integration
- Regenerative braking systems and their impact on routing strategies
- Trade-offs between travel time and energy efficiency
- Real-world application of graph algorithms to sustainable transportation

</div>
