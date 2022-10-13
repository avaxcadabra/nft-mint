## Introduction

This tutorial will explain how to create and deploy a subnet, compile and deploy on the fresh subnet a smart contract and then mint some NFT paid with the blcokchain token gournance created with the subnet
    
## Prerequisites

### NodeJS and Yarn
### Subnet-cli 

First, install [nodejs](https://deb.nodesource.com/setup_18.x) Version `18` or more recent
```zsh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Next, install [yarn](https://yarnpkg.com)

```zsh
sudo npm install -g yarn
```

And finally, install [subnet-cli](https://docs.avax.network/quickstart/tools-list#subnet-cli)

```zsh
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s -- -b /usr/local/bin
```

## Create and deploy a Subnet

We install the binary of avalanche of subnet-cli in /usr/local/bin so is in your path

```zsh
echo $PATH (to verify)
```

To install and deploy your subnet, you need to know
1) the name of the subnet
2) the name of the token and the ticker

Create the subnet myfactory with ticker MFY and chain ID number 123

```zsh
avalanche subnet create myfactory 
> Choose your VM: SubnetEVM
> ChainId: 123 (or what you want)
> Select a symbol for your subnet\'s native token: MFY 
> What version of Subnet-EVM would you like?: Use latest version
> How would you like to set fees: Low disk use / Low Throughput 1.5 mil gas/s (C-Chain\'s setting)
> How would you like to distribute funds: Airdrop 1 million tokens to the default address (do not use in production)
> Advanced: Would you like to add a custom precompile to modify the EVM\?: No
```

The subnet are now created
Let deploy on local network

```zsh
avalanche subnet deploy myfactory
> Choose a network to deploy on: Local Network
```
Subnet-cli will print a dashboard with networks and endpoints informations
> RPC URL: the endpoint to request your blockchain
> Funded address and the private key to access funds
> Network name:     myfactory
> Chain ID:         123
> Currency Symbol:  MFY


## Download the web3 app

```zsh
git clone https://github.com/avaxcadabra/nft-mint
cd nft-mint
yarn
```

## Hardhat Config

Hardhat uses `hardhat.config.js` as the configuration file. You can define tasks, networks, compilers and more in that file. For more information see [here](https://hardhat.org/config/).

In our repository we use a pre-configured file hardhat.config.ts.
You need to fill this file with your blockchain information.
On the local network configuration, replace.
> url : ‘put the RPC URL information given when you deploy your subnet'
> chainId: the number you put on Chain ID

Test with some tasks, if everything are ok

```zsh
yarn accounts --network local (the account address with the minted tokens you create when deploy your subnet)
yarn balances --network local (the amount of tokens you mint, will be 1 million (base 18)
```

If everything going well, you are happy :-)
 

## Compile Contracts

Now you'll compile the MyNFT.sol contract

```zsh
yarn compile
```

Now we deploy the contract on the subnet

```zsh
yarn deploy
```
copy somewhere the address of the contract printed in the ouptup of the deploy command

## Mint NFT Web3 APP

First you have to edit the file in src/components/Home.jsx and replace the line :
> const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS" with the address of the contract copied before

## Configure metamask

Now you need to access at the 1 million token you minted with metamask wallet
.To do this, just create a new network
.In metamsk app : parameters > network > create a new network
.fill with the information of your new subnet
> Network Name : myfactory
> New URL RPC : put the RPC URL information given when you deploy your subnet
> Chain ID : the number you put on Chain ID
> Symbol of token : the ticker of you token
.then save

To access the address with the million token, just chose "import an account" and give the private key you got when deploy your subnet

And that's all !!! you got a little beat less then 1 million because when you deploy the contract, you got to pay the fees of your subnet transactions :-)

## Let's mint NFT

Start the web3 app

```zsh
npm run dev
```

Access the url on your browser http://localhost:3000

Mint and have fun !
