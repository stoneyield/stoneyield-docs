---
title: "STUSD Wrapper"
description: "Bridge the gap between soul-bound sUSDC and transferable STUSD liquidity"
prev: "protocol/yield-generation"
next: "features/key-features"
---

# STUSD Wrapper

The STUSD wrapper turns **sUSDC** (soul-bound) into **STUSD**, a portable ERC20. It preserves the hedge while giving treasuries liquidity for trading, lending, or settlements.

## Contract Architecture

### Wrapper Contract

```solidity
contract STUSDWrapper {
    /// Wrap sUSDC into STUSD (1:1)
    function wrap(uint256 amount) external;

    /// Lock state
    function getLockInfo(address account) external view returns (uint256 locked, uint256 unlockAt);
}
```

Key behaviors:

- 1:1 minting between sUSDC and STUSD
- Wrapper is the only entity allowed to mint STUSD
- Optional lock schedules enforced at the wrapper level (no unwrap flow)
- Governed controls around minting and reserves

### STUSD Token

```solidity
contract STUSD is ERC20Permit, AccessControl {
    IWrapper public immutable wrapper;

    function _update(address from, address to, uint256 amount) internal override {
        (uint256 locked,) = wrapper.getLockInfo(from);
        require(balanceOf(from) - amount >= locked, "STUSD: amount locked");
        super._update(from, to, amount);
    }

    function issueFromWrapper(address to, uint256 amount) external onlyRole(WRAPPER_ROLE) { ... }
}
```

The token contract checks wrapper lock data before every transfer, guaranteeing that vesting or compliance constraints are upheld even after wrapping.

## Why the Wrapper Matters

- **Capital efficiency** – desks can deploy STUSD across DeFi venues without dismantling the hedge.
- **Proof of collateral** – every STUSD maps back to a verifiable sUSDC position.
- **Programmable liquidity** – locks, thaw windows, and governance switches offer fine-grained control.

## Primary Workflows

### 1. Liquidity Deployment
1. Deposit USDC → mint sUSDC.
2. `wrap(amount)` to receive STUSD.
3. Use STUSD in DEX pools, lending markets, or automation strategies.
4. Return to sUSDC by sweeping reserves (no public unwrap function).

### 2. Vesting & Locks
- `wrapLocked()` issues STUSD with an enforced unlock timestamp.
- Wrapper + token guard transfers until the schedule matures.
- Ideal for team distributions, partner deals, or compliance programs.

### 3. Emergency Controls
- Global pausing of wrap/unwrap flows if venues report anomalies.
- Admin multi-sig can sweep stuck tokens back to treasury wallets.
- Daily mint ceilings prevent runaway issuance.

## Security Features

- **One contract surface**: only the wrapper mints/burns STUSD.
- **Lock auditing**: `getLockInfo()` exposes every time-lock on-chain.
- **Reentrancy guards + safe transfers** baked into state mutations.
- **Transparent telemetry**: dashboard surfaces show minted STUSD, pending unwraps, and unlock readiness.

## Integration Tips

```solidity
// Wrap 10k sUSDC into STUSD
SUSDC.approve(address(wrapper), 10_000e18);
wrapper.wrap(10_000e18);

// Query lock data before transferring
(uint256 locked, uint256 unlockAt) = wrapper.getLockInfo(msg.sender);

// No public unwrap: liquidity return is managed via wrapper reserves
```

- Always check lock info if you expose STUSD transfers in your app.
- Display wrapper telemetry (minted supply, pending unwraps) for end-user trust.
- Treat STUSD like any ERC20 when integrating with AMMs or money markets.

## Summary

The STUSD wrapper bridges StoneYield’s locked core to the rest of DeFi. Every liquid STUSD stays fully collateralized by sUSDC, while treasuries get programmable, auditable liquidity on demand.
