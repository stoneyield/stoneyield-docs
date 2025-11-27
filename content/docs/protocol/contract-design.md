---
title: "Contract Design"
description: "Modular smart contract architecture for secure yield generation"
prev: "protocol/transfer-restrictions"
next: "protocol/security-limits"
---

# Contract Design

StoneYield uses a modular contract stack tuned for secure yield and clear separation of concerns: token controls, routing, and strategy execution live in distinct modules.

## Architecture Overview

### Core Contracts

#### 1. StakeableAssetImpl (STUSD Token)
Built on OpenZeppelin upgradeable pieces:
- `ERC20Upgradeable` – upgradeable ERC20 base
- `ERC20PermitUpgradeable` – EIP-2612 approvals
- `Ownable2StepUpgradeable` – two-step ownership handoff
- `PausableUpgradeable` – emergency pause switch
- `ReentrancyGuardUpgradeable` – reentrancy protection

#### 2. StrategyRouter
Coordinates yield strategies:
- Sends USDC deposits to Venus
- Manages weights/allocations
- Handles withdrawals from strategies
- Owner steers configuration

#### 3. VenuSTUSDVault
ERC-4626 compliant vault for Venus integration:
- Deposits USDC into Venus Protocol
- Manages vUSDC tokens
- Tracks yield accrual
- Provides standardized interface for router

## Key Features

### Token Administration (StakeableAssetImpl)
- **Soul-bound logic**: `_update()` hook blocks transfers by default.
- **Timed locks**: `unlockAt` timestamps per wallet.
- **Explicit unlock**: Users call `unlock()` to lift lock when eligible.
- **Whitelist**: DEX/pool addresses settable via `setDex()`.
- **Reward minting**: Admin can mint locked/placeholder STUSD via `rewardMint()`.
- **Emergency controls**: `pause()`, `adminUnlock()`, `sweepUSDC()`.

### Yield Production (StrategyRouter + VenuSTUSDVault)
- **Automated routing**: USDC deposits automatically route to Venus Protocol
- **Yield optimization**: Deposits earn lending interest on Venus
- **Strategy management**: Owner can adjust weights and introduce new strategies
- **Transparent yields**: Venus APY publicly verifiable on-chain
- **Protocol fee**: 7% of Venus yields retained as protocol revenue

## Events

All critical actions emit events for external tracking and transparency:

- `Deposited`, `Unlocked`, `RewardsDistributed`, `EarlyRedeemed`
- `DexWhitelisted`, `TreasurySweep`, `SpecialAddressSet`
- `StakedTokensBurned`, `EmergencyWithdraw`

These events facilitate frontend updates, subgraph indexing, and audit logging.

## Versioning and Deployment

- Solidity version: `^0.8.28`
- Deployed on: Binance Smart Chain (BSC)
- USDC target: BSC USDC uses 18 decimals
- Upgradeability: StakeableAssetImpl uses transparent proxy pattern for upgradeability
- Venus Integration: Connects to Venus Protocol's vUSDC market on BSC
- Multisig recommended: Contract ownership should transfer to Gnosis Safe multisig for operational security

## Gas and Efficiency

The contract optimizes for gas usage:
- Batch operations available for minting and deposit (`batchDepositAndMint`)
- Single ERC20 balance storage per participant
- Lock information stored in lightweight `uint40` timestamps

## Yield Flow Architecture

```
User Deposits USDC
       ↓
StakeableAssetImpl (mints STUSD)
       ↓
StrategyRouter (routes to strategies)
       ↓
VenuSTUSDVault (deposits to Venus)
       ↓
Venus Protocol (generates yield)
       ↓
Protocol retains 7% fee
       ↓
93% of yield distributed to users
```

## Summary

StoneYield blends soul-bound token logic with automated Venus yield routing. The modular split keeps security tight, yields transparent, and operations sustainable (7% protocol fee, ~93% to users).
