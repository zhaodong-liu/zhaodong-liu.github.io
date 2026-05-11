---
layout: page
title: '<span class="lang-en">Fantasy Sports League</span><span class="lang-zh">梦幻体育联盟</span>'
description: '<span class="lang-en">A comprehensive database system for managing fantasy sports leagues with real-time tracking</span><span class="lang-zh">面向梦幻体育联盟的综合数据库系统，支持实时追踪</span>'
img: assets/img/projects/fantasy_sports_database.jpg
importance: 5
category: projects
related_publications: false
---

<div class="lang-zh" markdown="1">

## 项目概览

为梦幻体育联盟设计的功能完整的数据库管理系统，使用户能够创建并管理联盟、选秀球员、追踪比赛统计与执行交易。项目展示了先进的数据库设计原则、复杂的关系模式以及面向体育分析应用的真实数据管理。

**课程：** 数据库导论（2024 秋）

**所属机构：** 纽约大学坦登工学院

**指导教师：** [Salim Arfaoui 教授](https://engineering.nyu.edu/faculty/salim-arfaoui)

**团队：** DB Lovers（刘兆东、翁逸蕾、葛欣彦、张冬）

**数据库平台：** 本地 MySQL Server

**代码仓库：** [GitHub - Fantasy_Sports_League](https://github.com/zhaodong-liu/Fantasy_Sports_League)

**演示：** [Project Presentation (PDF)](/assets/pdf/Fantasy_Sports_Database_Presentation.pdf)

## 项目范围

该系统管理梦幻体育联盟运营的全部方面：

- **用户管理：** 账户创建、身份认证与个人资料定制
- **联盟管理：** 多种联盟类型（公开/私有）、专员控制、选秀排程
- **球队管理：** 阵容构建、球员分配、排名与状态追踪
- **球员数据库：** 全面的球员信息，包括统计、可用性与梦幻积分
- **比赛系统：** 比赛排程、比分追踪与结果记录
- **交易系统：** 球员交易、球队交易与豁免名单拾取
- **统计追踪：** 实时球员表现统计与比赛事件

## 数据库架构

### 实体-关系模型

该系统由 13 张相互关联的表构成，建模出梦幻体育的完整生态：

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fantasy_sports_er_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    展示完整数据库模式的实体-关系图，包含 13 张相互关联的表
</div>

**核心实体：**

- **User**：带身份认证与个人资料设置的平台用户
- **League**：具有多种配置的梦幻联盟（足球、篮球、足球）
- **Team**：用户所拥有的梦幻球队，含排名与积分
- **Player**：真实的体育选手，含位置、所属队与梦幻数据

**关系表：**

- **Draft**：选秀排程与球员选择跟踪
- **MatchDetail**：含日期、比分与胜方的比赛结果
- **MatchTeam**：球队在比赛中的参与（主/客）
- **PlayerStats**：球员个人表现指标
- **MatchEvent**：比赛中的事件（达阵、进球、助攻等）

**交易表：**

- **Trade**：带时间戳的交易记录
- **PlayerTrade**：球队间的球员流动
- **TeamTrade**：多球员的球队对球队交易
- **Waiver**：自由球员的豁免名单申领

### 数据库模式

#### 复杂关系

**多对多关系：**

- 用户 ↔ 联盟（通过球队管理）
- 球员 ↔ 球队（通过选秀与交易）
- 球队 ↔ 比赛（通过 MatchTeam 参与）

**一对多关系：**

- 联盟 → 多支球队
- 球队 → 多名球员
- 比赛 → 多个事件
- 球员 → 多条统计记录

#### 关键设计特性

1. **复合主键：**

   - `MatchTeam`（MatchID + TeamID）
   - `PlayerTrade`（TradeID + PlayerID）

2. **外键约束：**

   - 所有相关表间的引用完整性
   - 级联更新以保持数据一致性

3. **默认值：**

   - `Team.TotalPoints` 默认为 0
   - `Player.FantasyPoints` 默认为 0
   - `MatchDetail.Winner` 默认为 "Draw"
   - `PlayerStats.InjuryStatus` 默认为 "Healthy"

4. **状态追踪：**
   - 选秀状态：Pending/Completed
   - 球队状态：Active/Inactive
   - 球员可用性：Available/Traded/Injured
   - 豁免状态：Pending/Approved/Denied

## 主要功能

### 1. **联盟管理**

- 创建公开或私有联盟
- 设置最大球队数与选秀日期
- 分配带管理权限的专员角色
- 同时支持多种体育联盟

### 2. **选秀系统**

- 带状态追踪的排程选秀事件
- 选秀顺序随机化
- 实时球员可用性检查
- 选秀后阵容自动更新

### 3. **球队运营**

- 基于总积分的动态排名
- 活跃/非活跃状态管理
- 阵容上限强制执行
- 经理分配与转让

### 4. **球员统计**

- 逐场比赛表现追踪
- 伤病状态监控
- 梦幻积分计算
- 历史统计聚合

### 5. **交易机制**

- 球员对球员交易
- 多球员球队交易
- 交易验证（阵容上限、球员可用性）
- 交易历史追踪

### 6. **豁免名单**

- 自由球员拾取系统
- 豁免优先级管理
- 批准/驳回工作流
- 拾取日期追踪

### 7. **比赛追踪**

- 实时比分更新
- 事件记录（达阵、进球、助攻等）
- 主客队指定
- 胜方判定与平局处理

## 已应对的技术挑战

### 1. **数据一致性**

- 实现触发器，在球员得分时自动更新球队积分
- 外键约束防止孤立记录
- 交易操作的事务管理

### 2. **复杂查询**

为以下场景开发了复杂查询：

- 含平局规则的联盟排名
- 跨多联盟的球员可用性
- 交易历史与影响分析
- 表现统计聚合

### 3. **可扩展性考虑**

- 为外键建立索引以提升联接性能
- 范式化模式以最小化数据冗余
- 针对常见操作的高效查询模式

### 4. **数据完整性**

- 约束强制执行（如选秀日期须早于联盟开始日期）
- 状态校验（如不能交易受伤球员）
- 所有关系间的引用完整性

## 数据库统计

**总记录数：** 13 张表中共 390+ 条

| 表          | 记录数 | 用途         |
| ----------- | ------ | ------------ |
| User        | 25     | 平台用户     |
| League      | 25     | 梦幻联盟     |
| Team        | 25     | 用户球队     |
| Draft       | 25     | 选秀会议     |
| Player      | 60     | 体育选手     |
| MatchDetail | 12     | 比赛结果     |
| MatchTeam   | 24     | 比赛参与方   |
| PlayerStats | 25     | 表现数据     |
| MatchEvent  | 25     | 比赛事件     |
| Trade       | 25     | 交易记录     |
| PlayerTrade | 30     | 球员流动     |
| TeamTrade   | 24     | 多球员交易   |
| Waiver      | 11     | 自由球员拾取 |

## 展示的技能

**数据库设计：**

- ER 建模与范式化（3NF）
- 复杂关系映射
- 约束定义与执行
- 用于查询优化的索引策略

**SQL 编程：**

- 用于模式创建的 DDL
- 用于数据操作的 DML
- 高级联接与子查询
- 聚合函数与分组

**PL/SQL 开发：**

- 用于自动化工作流的触发器
- 用于业务逻辑的存储过程
- 事务管理
- 错误处理

**数据管理：**

- 示例数据生成与校验
- 数据完整性验证
- 使用真实数据集进行性能测试
- 备份与恢复规划

**系统集成：**

- 多表事务协调
- 实时数据更新
- 跨实体状态追踪
- 审计追踪维护

## 真实世界应用

该数据库设计可适配于：

1. **梦幻体育平台：** ESPN、Yahoo Fantasy、DraftKings
2. **体育分析：** 球队管理系统、球探数据库
3. **游戏联盟：** 电竞赛事、游戏比赛
4. **赛事管理：** 任何竞技联盟或锦标赛系统
5. **社交游戏：** 预测市场、对阵挑战

## 项目成果

- 成功设计并实现了一个**包含 13 张表的关系型数据库**
- 填充了**390+ 条**真实示例数据
- 通过合理的事务处理证明了 **ACID 一致性**
- 实现了**高级数据库功能**（触发器、过程）
- 通过合理索引实现了**高效查询性能**
- 通过全面约束验证了**数据完整性**
- 使用 ER 图与表定义记录了**完整模式**

## 未来增强

该系统的潜在扩展：

1. **分析仪表盘：** 高级统计与趋势分析
2. **移动 API：** 用于移动应用集成的 RESTful 接口
3. **实时更新：** WebSocket 集成以实现实时比分
4. **机器学习：** 球员表现的预测模型
5. **社交功能：** 球员聊天、联盟论坛、成就系统
6. **支付集成：** 报名费与奖金分发
7. **多赛季支持：** 跨赛季的历史数据追踪

---

本项目展示了对关系型数据库设计、SQL 编程以及面向复杂体育分析应用的真实数据管理的全面理解。

</div>

<div class="lang-en" markdown="1">

## Overview

A fully-featured database management system designed for fantasy sports leagues, enabling users to create and manage leagues, draft players, track game statistics, and execute trades. This project demonstrates advanced database design principles, complex relational schemas, and real-world data management for sports analytics applications.

**Course:** Introduction to Databases (Fall 2024)

**Institution:** NYU Tandon School of Engineering

**Advisor:** [Prof. Salim Arfaoui](https://engineering.nyu.edu/faculty/salim-arfaoui)

**Team:** DB Lovers (Zhaodong Liu, Yilei Weng, Xinyan Ge, Dong Zhang)

**Database Platform:** Local MySQL Server

**Repository:** [GitHub - Fantasy_Sports_League](https://github.com/zhaodong-liu/Fantasy_Sports_League)

**Presentation:** [Project Presentation (PDF)](/assets/pdf/Fantasy_Sports_Database_Presentation.pdf)

## Project Scope

The system manages all aspects of fantasy sports league operations:

- **User Management:** Account creation, authentication, and profile customization
- **League Administration:** Multiple league types (public/private), commissioner controls, draft scheduling
- **Team Management:** Roster building, player assignments, rankings, and status tracking
- **Player Database:** Comprehensive player information including stats, availability, and fantasy points
- **Match System:** Game scheduling, score tracking, and results recording
- **Trading System:** Player trades, team trades, and waiver wire pickups
- **Statistics Tracking:** Real-time player performance stats and match events

## Database Architecture

### Entity-Relationship Model

The system comprises 13 interconnected tables modeling the complete fantasy sports ecosystem:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/fantasy_sports_er_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Entity-Relationship Diagram showing the complete database schema with 13 interconnected tables
</div>

**Core Entities:**

- **User**: Platform users with authentication and profile settings
- **League**: Fantasy leagues with various configurations (Football, Basketball, Soccer)
- **Team**: User-owned fantasy teams with rankings and points
- **Player**: Real sports players with positions, teams, and fantasy stats

**Relational Tables:**

- **Draft**: Draft scheduling and player selection tracking
- **MatchDetail**: Game results with dates, scores, and winners
- **MatchTeam**: Team participation in matches (home/away)
- **PlayerStats**: Individual player performance metrics
- **MatchEvent**: In-game events (touchdowns, goals, assists, etc.)

**Transaction Tables:**

- **Trade**: Trade transaction records with timestamps
- **PlayerTrade**: Player movements between teams
- **TeamTrade**: Multi-player team-to-team transactions
- **Waiver**: Waiver wire claims for free agents

### Database Schema

#### Complex Relationships

**Many-to-Many Relationships:**

- Users ↔ Leagues (through Team management)
- Players ↔ Teams (through draft picks and trades)
- Teams ↔ Matches (through MatchTeam participation)

**One-to-Many Relationships:**

- League → Multiple Teams
- Team → Multiple Players
- Match → Multiple Events
- Player → Multiple Stats Records

#### Key Design Features

1. **Composite Primary Keys:**

   - `MatchTeam` (MatchID + TeamID)
   - `PlayerTrade` (TradeID + PlayerID)

2. **Foreign Key Constraints:**

   - Referential integrity across all related tables
   - Cascading updates for maintaining data consistency

3. **Default Values:**

   - `Team.TotalPoints` defaults to 0
   - `Player.FantasyPoints` defaults to 0
   - `MatchDetail.Winner` defaults to "Draw"
   - `PlayerStats.InjuryStatus` defaults to "Healthy"

4. **Status Tracking:**
   - Draft status: Pending/Completed
   - Team status: Active/Inactive
   - Player availability: Available/Traded/Injured
   - Waiver status: Pending/Approved/Denied

## Key Features & Functionality

### 1. **League Management**

- Create public or private leagues
- Set maximum team limits and draft dates
- Assign commissioner roles with administrative privileges
- Support for multiple sports leagues simultaneously

### 2. **Draft System**

- Scheduled draft events with status tracking
- Draft order randomization
- Real-time player availability checking
- Automatic roster updates post-draft

### 3. **Team Operations**

- Dynamic ranking based on total points
- Active/Inactive status management
- Roster limits enforcement
- Manager assignment and transfers

### 4. **Player Statistics**

- Game-by-game performance tracking
- Injury status monitoring
- Fantasy point calculation
- Historical stat aggregation

### 5. **Trading Mechanism**

- Player-for-player trades
- Multi-player team trades
- Trade validation (roster limits, player availability)
- Transaction history tracking

### 6. **Waiver Wire**

- Free agent pickup system
- Waiver priority management
- Approval/denial workflow
- Pickup date tracking

### 7. **Match Tracking**

- Live score updates
- Event recording (touchdowns, goals, assists, etc.)
- Home/away team designation
- Winner determination and tie handling

## Technical Challenges Addressed

### 1. **Data Consistency**

- Implemented triggers to automatically update team points when players score
- Foreign key constraints prevent orphaned records
- Transaction management for trade operations

### 2. **Complex Queries**

Developed sophisticated queries for:

- League standings with tie-breaking rules
- Player availability across multiple leagues
- Trade history and impact analysis
- Performance statistics aggregation

### 3. **Scalability Considerations**

- Indexed foreign keys for join performance
- Normalized schema to minimize data redundancy
- Efficient query patterns for common operations

### 4. **Data Integrity**

- Constraint enforcement (e.g., draft dates must precede league start)
- Status validation (e.g., can't trade injured players)
- Referential integrity across all relationships

## Database Statistics

**Total Records:** 390+ across 13 tables

| Table       | Records | Purpose             |
| ----------- | ------- | ------------------- |
| User        | 25      | Platform users      |
| League      | 25      | Fantasy leagues     |
| Team        | 25      | User teams          |
| Draft       | 25      | Draft sessions      |
| Player      | 60      | Sports athletes     |
| MatchDetail | 12      | Game results        |
| MatchTeam   | 24      | Match participants  |
| PlayerStats | 25      | Performance data    |
| MatchEvent  | 25      | In-game events      |
| Trade       | 25      | Trade transactions  |
| PlayerTrade | 30      | Player movements    |
| TeamTrade   | 24      | Multi-player trades |
| Waiver      | 11      | Free agent pickups  |

## Skills Demonstrated

**Database Design:**

- ER modeling and normalization (3NF)
- Complex relationship mapping
- Constraint definition and enforcement
- Index strategy for query optimization

**SQL Programming:**

- DDL for schema creation
- DML for data manipulation
- Advanced joins and subqueries
- Aggregate functions and grouping

**PL/SQL Development:**

- Trigger creation for automated workflows
- Stored procedures for business logic
- Transaction management
- Error handling

**Data Management:**

- Sample data generation and validation
- Data integrity verification
- Performance testing with realistic datasets
- Backup and recovery planning

**System Integration:**

- Multi-table transaction coordination
- Real-time data updates
- Status tracking across entities
- Audit trail maintenance

## Real-World Applications

This database design can be adapted for:

1. **Fantasy Sports Platforms:** ESPN, Yahoo Fantasy, DraftKings
2. **Sports Analytics:** Team management systems, scouting databases
3. **Gaming Leagues:** Esports tournaments, gaming competitions
4. **Event Management:** Any competitive league or tournament system
5. **Social Gaming:** Prediction markets, bracket challenges

## Project Outcomes

- Successfully designed and implemented a **13-table relational database**
- Populated with **390+ records** of realistic sample data
- Demonstrated **ACID compliance** through proper transaction handling
- Implemented **advanced database features** (triggers, procedures)
- Achieved **efficient query performance** through proper indexing
- Validated **data integrity** through comprehensive constraints
- Documented **complete schema** with ER diagrams and table definitions

## Future Enhancements

Potential extensions to the system:

1. **Analytics Dashboard:** Advanced statistics and trend analysis
2. **Mobile API:** RESTful endpoints for mobile app integration
3. **Real-time Updates:** WebSocket integration for live scoring
4. **Machine Learning:** Predictive models for player performance
5. **Social Features:** Player chat, league forums, achievement system
6. **Payment Integration:** Entry fees and prize distribution
7. **Multi-season Support:** Historical data tracking across seasons

---

This project demonstrates comprehensive understanding of relational database design, SQL programming, and real-world data management for complex sports analytics applications.

</div>
