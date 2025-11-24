---
layout: page
title: Traffic-Aware Route Optimization
description: Optimizing driving routes considering real-time traffic light timings
img: assets/img/projects/route_optimization.jpg
importance: 1
category: research projects
---

## Overview

This project develops a traffic-aware routing optimization system using SUMO (Simulation of Urban MObility) that considers both travel time and energy efficiency. By simulating real-world traffic conditions and traffic light timings, the system optimizes driving routes to minimize travel time and improve energy efficiency. The project features distinct modeling approaches for two vehicle types: traditional gasoline vehicles (with coasting) and electric vehicles (with regenerative braking).

**Duration:** May 2024 - August 2024

**Institution:** New York University Shanghai

**Advisor:** [Prof. Zhibin Chen](https://shanghai.nyu.edu/academics/faculty/directory/zhibin-chen)

**Simulation Platform:** SUMO (Simulation of Urban MObility)

## Motivation

Traditional routing systems optimize primarily for distance or travel time, neglecting the significant impact of traffic lights on energy consumption. This project addresses critical gaps:

- **Traffic Light Impact**: Frequent stops at red lights increase fuel consumption and reduce efficiency
- **Vehicle-Specific Dynamics**: Gasoline and electric vehicles have fundamentally different energy profiles
  - **Gasoline Vehicles**: Benefit from coasting to reduce fuel consumption before stops
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
  - **Gasoline Vehicle Model**: Parameters for coasting behavior, fuel consumption during idle/acceleration
  - **Electric Vehicle Model**: Regenerative braking efficiency, battery discharge/charge rates
- **Traffic Patterns**: Time-varying traffic flows affecting vehicle speeds and stops

### Problem Formulation

Formulated the route optimization as a multi-objective graph problem:
- **Nodes**: Intersections with traffic signals and timing information
- **Edges**: Road segments with vehicle-type-specific cost functions
  - **Gasoline Vehicle Costs**: Travel time + fuel consumption (accounting for coasting opportunities)
  - **Electric Vehicle Costs**: Travel time + net energy consumption (including regenerative braking recovery)
- **Constraints**: Traffic light timings, signal phase predictions, vehicle dynamics

### Algorithm Development

#### Core Implementation: Vehicle-Aware Routing Algorithm

Extended Dijkstra's algorithm with vehicle-specific energy modeling:

**For Gasoline Vehicles:**
- Detects opportunities to coast before red lights (reducing fuel waste from braking)
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
  - Gasoline vehicle: Engine efficiency curves, idle fuel consumption, coasting deceleration rates
  - Electric vehicle: Motor efficiency, battery characteristics, regenerative braking coefficients
- **Traffic Patterns**: Time-varying traffic flows affecting vehicle speeds

### SUMO Simulation Framework

Implemented a complete SUMO-based simulation environment:
- **Network Import**: Converted OSM data to SUMO road network format with elevation data
- **Traffic Light Configuration**: Programmed realistic signal timing and phase patterns
- **Vehicle Type Definitions**:
  - **Gasoline Vehicle**: Custom vehicle class with fuel consumption model and coasting parameters
  - **Electric Vehicle**: Battery-electric vehicle with regenerative braking enabled
- **Energy Tracking**: Integrated SUMO's energy consumption models for both vehicle types
- **Scenario Testing**: Multiple test scenarios with varying traffic densities and signal timings

### Simulation Scenarios

Compared routing strategies for both vehicle types:

**Gasoline Vehicle Routes:**
1. **Time-Optimal**: Fastest route ignoring energy
2. **Coasting-Optimized**: Route maximizing coasting opportunities before red lights
3. **Hybrid**: Balanced time and fuel efficiency

**Electric Vehicle Routes:**
1. **Time-Optimal**: Fastest route ignoring energy
2. **Regeneration-Aware**: Route considering regenerative braking opportunities
3. **Battery-Optimal**: Minimizing net energy consumption

## Results

The vehicle-specific traffic-aware optimization demonstrated:

**Gasoline Vehicles:**
- **Fuel Savings**: Reduced fuel consumption through strategic coasting
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

## Technical Challenges Addressed

1. **Vehicle-Specific Modeling**: Accurately capturing different energy consumption patterns
2. **Multi-Objective Optimization**: Balancing travel time and energy efficiency
3. **Regenerative Braking Modeling**: Quantifying energy recovery in electric vehicles
4. **Coasting Strategy**: Determining optimal deceleration points for gasoline vehicles
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
