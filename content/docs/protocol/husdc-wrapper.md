---
title: "hUSDC Wrapper"
description: "One-way wrapper enabling conversion from hUSDC to sUSD with lock support"
prev: "protocol/yield-generation"
next: "features/key-features"
---

# hUSDC Wrapper

The hUSDC wrapper contract implements a one-way conversion mechanism from hUSDC (tradeable ERC20) to sUSD (soul-bound token). This architecture enables participants to convert their liquid hUSDC holdings into yield-bearing sUSD positions while maintaining protocol security.

## Contract Architecture

### HUSDCWrapper Contract

The wrapper contract manages one-way conversion from hUSDC to sUSD:

```solidity
contract HUSDCWrapper {
    // Core conversion function (one-way only)
    function hedgeWrap(uint256 amount) external

    // Lock administration for investor vesting
    function hedgeWrapLocked(address to, uint256 amount, uint256 unlockTime) external
    function hedgeBurnLocked(address from, uint256 amount) external

    // Lock info query
    function getHedgeLockInfo(address account) external view returns (uint256, uint256)

    // Admin functions
    function hedgeSweep(address to, uint256 amount) external
    function hedgeSweepAll(address to) external
}
```

### Key Functions

#### hedgeWrap(uint256 amount)
- Converts hUSDC to sUSD at 1:1 ratio (one-way only)
- Requires hUSDC approval
- Burns hUSDC and mints equivalent sUSD
- No conversion fees
- **No reverse conversion available**

#### hedgeWrapLocked(address to, uint256 amount, uint256 unlockTime)
- Wraps hUSDC to sUSD with time-lock
- Used for vesting schedules
- Lock enforced at wrapper level
- Requires LOCKER_ROLE permission

#### getHedgeLockInfo(address account)
- Returns locked balance and unlock time
- Used by sUSD contract for transfer validation
- Returns (uint256 locked, uint256 unlockTime)

## sUSD Token Implementation

### Lock-Aware Transfers

sUSD implements transfer validation that checks wrapper locks:

```solidity
contract SUDC is ERC20, AccessControl {
    function _update(address from, address to, uint256 amount) internal override {
        // Confirm sender possesses adequate unlocked balance
        (uint256 locked, uint256 unlockTime) = IHUSDCWrapper(wrapper).getHedgeLockInfo(from);
        require(balanceOf(from) - amount >= locked, "SUDC: Tokens locked");
        super._update(from, to, amount);
    }

    // Minting and burning (wrapper only)
    function issueFromWrapper(address to, uint256 amount) external
    function reclaimFromWrapper(address from, uint256 amount) external
}
```

### Role-Based Access

- **DEFAULT_ADMIN_ROLE**: Contract administration
- **LOCKER_ROLE**: Can create locked sUSD positions
- **WRAPPER_ROLE**: Wrapper contract permissions

## Use Cases

### 1. Yield Position Entry
Convert liquid hUSDC holdings into yield-generating sUSD positions to access Venus Protocol returns.

### 2. Token Vesting
Lock sUSD for team/investor distributions with programmable unlock schedules using `hedgeWrapLocked()`.

### 3. Treasury Management
Protocols convert idle hUSDC reserves to sUSD for sustainable yield generation without speculative risk.

## Security Features

### Immutable Design
- No admin functions for fund drainage
- Conversion rate hardcoded at 1:1
- No upgrade mechanism for wrapper logic
- One-way design eliminates exploit vectors

### Lock Enforcement
- Prevents transfers of locked tokens
- On-chain lock verification
- Time-based automatic unlock

### Reentrancy Protection
- Guards on all state-changing functions
- Safe token transfer patterns
- No external call vulnerabilities

## Economic Model

### One-Way Conversion Flow

1. **Entry Path Only**
   - hUSDC → sUSD via `hedgeWrap()`
   - No reverse conversion mechanism
   - Immediate yield accrual upon conversion

2. **Value Proposition**
   - Convert tradeable hUSDC to yield-bearing sUSD
   - Access Venus Protocol yields
   - No way to convert back to hUSDC
   - Simple, secure architecture

## Integration Guide

### For Developers

```solidity
// Check if tokens are locked
(uint256 locked, uint256 unlockTime) = wrapper.getHedgeLockInfo(userAddress);

// Wrap hUSDC to sUSD (one-way only)
hUSDC.approve(address(wrapper), amount);
wrapper.hedgeWrap(amount);
// User now has sUSD earning yield

// Create locked position
hUSDC.approve(address(wrapper), amount);
wrapper.hedgeWrapLocked(recipient, amount, unlockTime);
// Recipient has sUSD but transfers are locked until unlockTime
```

### For Protocols

The one-way wrapper enables:
- Yield position entry for hUSDC holders
- Vesting schedules with time-locks
- Treasury yield optimization
- Simple, secure conversion mechanism

## Summary

The hUSDC wrapper provides a straightforward one-way mechanism for converting liquid hUSDC tokens into yield-bearing sUSD positions. The one-way architecture eliminates complexity and potential exploit vectors while enabling yield generation through Venus Protocol integration. Once converted, sUSD holders earn sustainable yields without the ability to convert back to hUSDC.
