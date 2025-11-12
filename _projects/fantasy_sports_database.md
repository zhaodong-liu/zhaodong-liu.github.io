---
layout: page
title: Fantasy Sports League Management System
description: A comprehensive database system for managing fantasy sports leagues with real-time tracking
img:
importance: 2
category: course project
related_publications: false
---

## Overview

A fully-featured database management system designed for fantasy sports leagues, enabling users to create and manage leagues, draft players, track game statistics, and execute trades. This project demonstrates advanced database design principles, complex relational schemas, and real-world data management for sports analytics applications.

**Course:** Introduction to Databases (Fall 2024)
**Team:** DB Lovers
**Team Members:** Zhaodong Liu, Yilei Weng, Xinyan Ge, Dong Zhang
**Database Platform:** Local MySQL Server

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

**Core Entities:**
- **User** (25 records): Platform users with authentication and profile settings
- **League** (25 records): Fantasy leagues with various configurations (Football, Basketball, Soccer)
- **Team** (25 records): User-owned fantasy teams with rankings and points
- **Player** (60 records): Real sports players with positions, teams, and fantasy stats

**Relational Tables:**
- **Draft** (25 records): Draft scheduling and player selection tracking
- **MatchDetail** (12 records): Game results with dates, scores, and winners
- **MatchTeam** (24 records): Team participation in matches (home/away)
- **PlayerStats** (25 records): Individual player performance metrics
- **MatchEvent** (25 records): In-game events (touchdowns, goals, assists, etc.)

**Transaction Tables:**
- **Trade** (25 records): Trade transaction records with timestamps
- **PlayerTrade** (30 records): Player movements between teams
- **TeamTrade** (24 records): Multi-player team-to-team transactions
- **Waiver** (11 records): Waiver wire claims for free agents

### Database Schema Highlights

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

## Technical Implementation

### SQL & Database Operations

#### Non-Advanced SQL Commands

**DDL (Data Definition Language):**
```sql
CREATE TABLE Player (
    PlayerID INT PRIMARY KEY,
    FullName VARCHAR(100),
    Sport VARCHAR(50),
    Position VARCHAR(50),
    RealTeam VARCHAR(100),
    FantasyPoints INT DEFAULT 0,
    AvaiStatus VARCHAR(50) DEFAULT 'Available',
    TeamID INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);
```

**DML (Data Manipulation Language):**
- INSERT: User registration, player drafting, match recording
- SELECT: Complex queries with joins for league standings, player stats
- UPDATE: Score updates, roster changes, trade execution
- DELETE: Transaction cleanup, inactive user removal

#### Advanced PL/SQL Features

**1. Triggers for Automatic Updates**

Implemented triggers to maintain data integrity:

```sql
-- Automatically update team total points when a player is added
CREATE TRIGGER UpdateTeamPoints
AFTER INSERT ON Player
FOR EACH ROW
BEGIN
    UPDATE Team
    SET TotalPoints = TotalPoints + NEW.FantasyPoints
    WHERE TeamID = NEW.TeamID;
END;
```

**2. Stored Procedures for Complex Operations**

**User Registration:**
```sql
CREATE PROCEDURE RegisterNewUser(
    IN p_FullName VARCHAR(100),
    IN p_Email VARCHAR(100),
    IN p_UserName VARCHAR(50),
    IN p_Password VARCHAR(100)
)
BEGIN
    INSERT INTO User (FullName, Email, UserName, Pwd, ProfileSetting)
    VALUES (p_FullName, p_Email, p_UserName, p_Password, 'Public');
END;
```

**Trade Execution:**
```sql
CREATE PROCEDURE ExecuteTrade(
    IN p_PlayerID INT,
    IN p_FromTeam INT,
    IN p_ToTeam INT
)
BEGIN
    -- Create trade record
    INSERT INTO Trade (TradeDate) VALUES (CURDATE());

    -- Record player movement
    INSERT INTO PlayerTrade (TradeID, PlayerID, FromOrTo)
    VALUES (LAST_INSERT_ID(), p_PlayerID, 'From'),
           (LAST_INSERT_ID(), p_PlayerID, 'To');

    -- Update player's team
    UPDATE Player SET TeamID = p_ToTeam WHERE PlayerID = p_PlayerID;

    -- Update fantasy points for both teams
    UPDATE Team SET TotalPoints = TotalPoints -
        (SELECT FantasyPoints FROM Player WHERE PlayerID = p_PlayerID)
    WHERE TeamID = p_FromTeam;

    UPDATE Team SET TotalPoints = TotalPoints +
        (SELECT FantasyPoints FROM Player WHERE PlayerID = p_PlayerID)
    WHERE TeamID = p_ToTeam;
END;
```

## Sample Data & Testing

### Data Population

The database contains comprehensive sample data for testing:

- **25 Users:** Diverse profiles with public/private settings
- **25 Leagues:** Multiple sports (Football, Basketball, Soccer) with varying configurations
- **60 Players:** Real player names across different sports and positions
- **12 Matches:** Complete game records with scores and events
- **25 Trades:** Player movements demonstrating transaction system

### Data Quality Assurance

Each table contains **at least 10 rows** of realistic data:
- User profiles with valid email formats and secure passwords
- Leagues spanning multiple sports with proper commissioner assignments
- Teams with realistic names and point totals
- Player stats reflecting actual game performance patterns
- Trade history with proper date sequencing

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
