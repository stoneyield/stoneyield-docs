---
title: "hUSDC Wrapper"
description: "ERC20 wrapper enabling liquidity while preserving security"
prev: "protocol/yield-generation"
next: "features/key-features"
---

# hUSDC Wrapper

The hUSDC wrapper contract enables liquidity access for soul-bound sUSDC holders without compromising the security guarantees that make HedgeCore resilient to exploitation. This architecture separates the security layer (sUSDC) from the liquidity layer (hUSDC).

## Contract Architecture

### StUSDCWrapper Contract

The wrapper contract manages bidirectional conversion between sUSDC and hUSDC:

```solidity
contract StUSDCWrapper {
    // Core conversion functions
    function wrap(uint256 amount) external
    function unwrap(uint256 amount) external
    function wrapAndLock(address to, uint256 amount, uint256 unlockTime) external

    // Lock administration
    mapping(address => LockInfo) public lockedBalances
    function getLockInfo(address account) external view returns (uint256, uint256)
}
```

### Key Functions

#### wrap(uint256 amount)
- Converts sUSDC to hUSDC at 1:1 ratio
- Requires sUSDC approval
- Burns sUSDC and mints equivalent hUSDC
- No conversion fees

#### unwrap(uint256 amount)
- Converts hUSDC back to sUSDC at 1:1 ratio
- Validates lock status before unwrap
- Burns hUSDC and mints equivalent sUSDC
- Locked tokens cannot unwrap

#### wrapAndLock(address to, uint256 amount, uint256 unlockTime)
- Wraps sUSDC to hUSDC with time-lock
- Used for vesting schedules
- Lock enforced at wrapper level
- Requires LOCKER_ROLE permission

## hUSDC Token Implementation

### Lock-Aware Transfers

hUSDC implements transfer validation that checks wrapper locks:

```solidity
contract HUSDC is ERC20, AccessControl {
    function _update(address from, address to, uint256 amount) internal override {
        // Confirm sender possesses adequate unlocked balance
        (uint256 locked, uint256 unlockTime) = IStUSDCWrapper(wrapper).getLockInfo(from);
        require(balanceOf(from) - amount >= locked, "HUSDC: Tokens locked");
        super._update(from, to, amount);
    }
}
```

### Role-Based Access

- **DEFAULT_ADMIN_ROLE**: Contract administration
- **LOCKER_ROLE**: Can create locked hUSDC positions
- **WRAPPER_ROLE**: Wrapper contract permissions

## Use Cases

### 1. Liquidity Access
Wrap sUSDC to hUSDC and trade on DEXs for immediate liquidity without unstaking and losing future yields.

### 2. DeFi Integration
Use hUSDC as collateral in lending protocols or provide liquidity to earn trading fees on top of sUSDC yields.

### 3. Token Vesting
Lock hUSDC for team/investor distributions with programmable unlock schedules using `wrapAndLock()`.

### 4. Yield Optimization
Provide hUSDC/USDC liquidity while underlying sUSDC continues earning Venus yields.

## Security Features

### Immutable Design
- No admin functions for fund drainage
- Conversion rates hardcoded at 1:1
- No upgrade mechanism for wrapper logic

### Lock Enforcement
- Prevents unwrapping of locked tokens
- On-chain lock verification
- Time-based automatic unlock

### Reentrancy Protection
- Guards on all state-changing functions
- Safe token transfer patterns
- No external call vulnerabilities

## Economic Model

### Peg Maintenance

1. **Arbitrage Mechanism**
   - hUSDC < $1: Buy hUSDC → Unwrap to sUSDC → Profit
   - hUSDC > $1: Wrap sUSDC → Sell hUSDC → Profit

2. **1:1 Backing**
   - Every hUSDC backed by exactly 1 sUSDC
   - No algorithmic mechanisms
   - Direct convertibility enforces peg

3. **Deep Liquidity**
   - Protocol-owned liquidity pools
   - Incentivized LP programs
   - Minimal slippage for large trades

## Integration Guide

### For Developers

```solidity
// Check if tokens are locked
(uint256 locked, uint256 unlockTime) = wrapper.getLockInfo(userAddress);

// Wrap sUSDC to hUSDC
sUSDC.approve(address(wrapper), amount);
wrapper.wrap(amount);

// Unwrap hUSDC to sUSDC
hUSDC.approve(address(wrapper), amount);
wrapper.unwrap(amount);
```

### For Protocols

hUSDC integrates seamlessly with:
- DEXs (PancakeSwap, etc.)
- Lending protocols
- Yield aggregators
- Liquidity mining programs

## Summary

The hUSDC wrapper provides participants with liquidity options while maintaining the security guarantees of soul-bound sUSDC. Through 1:1 backing, lock enforcement, and immutable design, the wrapper enables DeFi composability without compromising protocol integrity.
