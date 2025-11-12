---
layout: page
title: Fantasy Sports League
description: A comprehensive database system for managing fantasy sports leagues with real-time tracking
img: assets/img/fantasy_sports_er_diagram.png
importance: 2
category: course project
related_publications: false
---

## Overview

A fully-featured database management system designed for fantasy sports leagues, enabling users to create and manage leagues, draft players, track game statistics, and execute trades. This project demonstrates advanced database design principles, complex relational schemas, and real-world data management for sports analytics applications.

**Course:** Introduction to Databases (Fall 2024)

**Institution:** NYU Tandon School of Engineering 

**Advisor:** [Prof. Salim Arfaoui](https://engineering.nyu.edu/faculty/salim-arfaoui)

**Team:** DB Lovers (Zhaodong Liu, Yilei Weng, Xinyan Ge, Dong Zhang)

**Database Platform:** Local MySQL Server

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

| Table | Records | Purpose |
|-------|---------|---------|
| User | 25 | Platform users |
| League | 25 | Fantasy leagues |
| Team | 25 | User teams |
| Draft | 25 | Draft sessions |
| Player | 60 | Sports athletes |
| MatchDetail | 12 | Game results |
| MatchTeam | 24 | Match participants |
| PlayerStats | 25 | Performance data |
| MatchEvent | 25 | In-game events |
| Trade | 25 | Trade transactions |
| PlayerTrade | 30 | Player movements |
| TeamTrade | 24 | Multi-player trades |
| Waiver | 11 | Free agent pickups |

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
