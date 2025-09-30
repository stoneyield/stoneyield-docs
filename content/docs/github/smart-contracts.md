---
title: "Smart Contracts"
description: "HedgeCore protocol smart contract repository"
next: "github/frontend"
---

# Smart Contracts

The HedgeCore smart contracts are open-source and available for review, audit, and contribution.

## Repository

🔗 **GitHub**: [github.com/xia-zhang-web3/hedgecore](https://github.com/xia-zhang-web3/hedgecore)

## Contract Architecture

### Core Contracts

- **StakeableAssetImpl**: sUSDC token implementation with soul-bound logic
- **StrategyRouter**: Yield strategy routing and management
- **VenusUSDCVault**: ERC-4626 vault for Venus Protocol integration
- **StUSDCWrapper**: hUSDC wrapper for liquidity layer
- **HUSDC**: ERC20 token with lock-aware transfers

## Technology Stack

- **Solidity**: ^0.8.28
- **Framework**: Hardhat
- **Testing**: Hardhat + Chai
- **Network**: Binance Smart Chain (BSC)
- **Standards**: ERC20, ERC-4626, EIP-2612

## Repository Structure

```
contracts/
├── StakeableAssetImpl.sol    # sUSDC token
├── StrategyRouter.sol         # Yield routing
├── VenusUSDCVault.sol        # Venus integration
├── StUSDCWrapper.sol         # Wrapper contract
├── HUSDC.sol                 # hUSDC token
└── interfaces/               # Contract interfaces

test/
├── StakeableAsset.test.js
├── StrategyRouter.test.js
└── Wrapper.test.js

scripts/
├── deploy.js
└── verify.js
```

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or similar wallet

### Installation

```bash
git clone https://github.com/xia-zhang-web3/hedgecore.git
cd hedgecore
npm install
```

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy to BSC Testnet

```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

## Contract Addresses

### BSC Mainnet

- **sUSDC Token**: `TBA`
- **StrategyRouter**: `TBA`
- **VenusUSDCVault**: `TBA`
- **StUSDCWrapper**: `TBA`
- **hUSDC Token**: `TBA`

### BSC Testnet

- **sUSDC Token**: `TBA`
- **StrategyRouter**: `TBA`
- **VenusUSDCVault**: `TBA`
- **StUSDCWrapper**: `TBA`
- **hUSDC Token**: `TBA`

## Security

### Audits

- **Status**: Pending
- **Firms**: TBA

### Bug Bounty

We encourage responsible disclosure of security vulnerabilities:
- **Contact**: security@hedgecore.io
- **Rewards**: Based on severity

### Best Practices

- All contracts use OpenZeppelin libraries
- Comprehensive test coverage
- Reentrancy guards on external calls
- Time-locked upgrades
- Multisig ownership

## Contributing

We welcome contributions from the community:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

Please read our contribution guidelines before submitting.

## License

MIT License - see LICENSE file for details
