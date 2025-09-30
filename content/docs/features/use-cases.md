---
title: "Use Cases"
description: "Real-world applications and scenarios for HedgeCore protocol"
prev: "features/key-features"
---

# Use Cases

## 1. Conservative Yield Generation

### Scenario
Risk-averse participants seeking stable returns without exposure to volatile DeFi strategies.

### HedgeCore Solution
- Deposit USDC to receive soul-bound sUSDC
- Earn sustainable yields through Venus Protocol lending
- 93% of generated APY distributed to holders
- No impermanent loss or complex strategy risk
- Soul-bound design prevents flash loan exploits

### Benefits
- Predictable, transparent returns
- Battle-tested yield source
- Enhanced security through non-transferability
- Emergency withdrawal mechanisms

## 2. Liquidity Access Without Unstaking

### Scenario
Participants need immediate liquidity but don't want to forfeit future yield.

### HedgeCore Solution
- Wrap sUSDC to hUSDC through wrapper contract
- Trade hUSDC on DEXs (PancakeSwap, etc.)
- Underlying sUSDC continues earning Venus yields
- Convert back to sUSDC anytime via unwrap

### Benefits
- Access liquidity without unstaking
- Maintain yield exposure
- No conversion fees
- 1:1 backing ensures price stability

## 3. Institutional Token Vesting

### Scenario
Teams and investors require programmable token vesting schedules with built-in security.

### HedgeCore Solution
- Use `wrapAndLock()` function for time-locked hUSDC
- Set custom unlock schedules per recipient
- Lock enforcement at contract level
- Yield continues accruing during vesting

### Benefits
- Automated vesting without custom contracts
- Yields accrue during lock period
- On-chain verification and transparency
- Prevents premature token liquidation

## 4. DeFi Yield Stacking

### Scenario
Advanced users want to maximize returns by combining multiple yield sources.

### HedgeCore Solution
- Deposit USDC to earn Venus yields (base layer)
- Wrap sUSDC to hUSDC (maintains base yield)
- Provide hUSDC/USDC liquidity on DEXs
- Earn trading fees + Venus yields simultaneously

### Benefits
- Multiple yield streams from single deposit
- Base Venus yield never interrupted
- Additional DEX trading fee income
- Flexible liquidity provision

## 5. Collateralized Lending

### Scenario
Participants want to use stablecoin holdings as collateral without selling.

### HedgeCore Solution
- Wrap sUSDC to hUSDC
- Deposit hUSDC as collateral in lending protocols
- Borrow other assets against hUSDC
- Underlying sUSDC continues earning yields

### Benefits
- Leverage stablecoin position
- Maintain yield generation
- Access capital without liquidating
- Standard ERC20 compatibility

## 6. Protocol Treasury Management

### Scenario
DAOs and protocols need secure, yield-generating reserves management.

### HedgeCore Solution
- Allocate treasury USDC to HedgeCore
- Earn sustainable yields through Venus integration
- Multisig control over deposits and withdrawals
- Special address designation for operational flexibility

### Benefits
- Secure yield generation for idle capital
- Transparent on-chain tracking
- Integration with existing multisig infrastructure
- Emergency controls for risk management

## 7. Arbitrage and Market Making

### Scenario
Sophisticated traders maintain hUSDC peg stability while earning returns.

### HedgeCore Solution
- Monitor hUSDC price on DEXs
- Buy below peg → unwrap to sUSDC → profit
- Wrap sUSDC → sell above peg → profit
- Provide liquidity for trading fee income

### Benefits
- Natural peg enforcement through arbitrage
- Earn yields from price discrepancies
- DEX liquidity provision rewards
- Support protocol ecosystem health

## 8. Cross-Protocol Yield Strategies

### Scenario
Yield aggregators want to integrate HedgeCore into complex strategies.

### HedgeCore Solution
- Integrate hUSDC into automated yield strategies
- Rebalance between protocols as rates change
- Maintain base Venus yield while strategy active
- Standard ERC20 interface simplifies integration

### Benefits
- Plug into existing DeFi infrastructure
- Add stable yield component to strategies
- Reduce overall portfolio volatility
- Diversify yield sources

## Summary

HedgeCore's dual-token architecture enables diverse use cases from conservative yield generation to sophisticated DeFi strategies. The separation of security (sUSDC) and liquidity (hUSDC) layers allows participants to choose their optimal balance of safety and flexibility without compromise.
