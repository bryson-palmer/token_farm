# Dapp Token Farm
A yield farming DeFi app based on the [defi_tutorial](https://github.com/dappuniversity/defi_tutorial) by [Gregory McCubbin](https://www.dappuniversity.com/) from [dappuniversity](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ).

## Purpose
As a MERN developer new to blockchain databases, I want to gain exposure and experience with the tech stack needed to write smart contracts and Dapps.

## Back Story
Developing for blockchains have piqued my curiosity recently. The thought of building in a new frontier and exploring it's applications is very intriguing. So what are the differences between building a Dapp for a blockchain versus building a MERN app? I discovered a YouTube channel, [dappuniversity](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ), that has a lot of content for developers on building Dapps, smart contracts, and other useful information on the Ethereum blockchain. After watching one of his videos, [How to Become a Blockchain Developer in 2021](https://www.youtube.com/watch?v=OwSl2xwl2-w), I outlined a strategy on how to become an Ethereum blockchain developer. The first step on this journey is to follow a guided [Blockchain Tutorial for Beginners](https://www.youtube.com/watch?v=CgXQC4dbGUE). 

## Tutorial
This will show the developer how to install the tools and technologies needed to build a local token staking app using Ganache for some fake `eth` to spend. It's also hooked up to MetaMask for our investor's browser wallet. We can take a fake stable coin called Dai and stake it with the Token Farm. Here the Investor is rewarded with a 100 Dapp tokens. The investor can unstake their tokens and keep the rewards. It's missing many features to be useable but it's a great introduction to this new blockchain tech. 

## Technologies
<p>
<img src="https://img.shields.io/badge/Solidity-blue" />
  <img src="https://img.shields.io/badge/MetaMask-greenBright" />
  <img src="https://img.shields.io/badge/Truffle-blue" />
  <img src="https://img.shields.io/badge/-web3.js-greenBright" />
  <img src="https://img.shields.io/badge/-Ganache-blue" >
  <img src="https://img.shields.io/badge/-node.js-greenBright" >
  <img src="https://img.shields.io/badge/Javascript-blue" />
  <img src="https://img.shields.io/badge/React Bootstrap-greenBright" />
  <img src="https://img.shields.io/badge/-React-blue" >
  <img src="https://img.shields.io/badge/-chai-greenBright" >
</p>

## Dapp Token Farm
![](TokenFarm.gif)

## Process

### Dependencies
Going through the process of installing new software for a new developer can be intimidating but it's not impossible. The first part of this tutorial was to install all the tools needed to complete the tutorial.

* Step one: Install node.js ✅ </br>
    I already had this installed so all good there (except).
    * I specifically needed version `12.18.3`
    * I had to install and learn how to use [NVM](https://github.com/nvm-sh/nvm#install--update-script).
    * I found this video by [Dev Café](https://youtu.be/ohBFbA0O6hs) on YouTube that was very helpful for getting started.
    * The solution </br>
        for mac `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh`
* Step two: Install Ganache ✅ </br>
  Very easy just go to [Ganache | Truffle Suite](https://www.trufflesuite.com/ganache) and download the app.
* Step three: Install Truffle Suite ✅ </br>
  This step proved harder than I thought.
    * First I ran the global dependency install of [npm install --g truffle@5.1.39](https://www.trufflesuite.com/truffle) (specifically) in my mac terminal.
    * I got an error that said </br>
        `compaudit` </br>
        `There are insecure directories:` </br>
        `/usr/local/share/zsh/site-functions` </br> 
        `/usr/local/share/zsh`
    * The solution (In my case)</br>
        `chmod g-w /usr/local/share/zsh` </br>
        `chmod g-w /usr/local/share/zsh/site-functions` </br>
        Fixed my global permissions conflict. </br>
    * The explanation I found on [stackoverflow](https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories) </br>
        * Specifically the answer by **Brandt** was very helpful.
* Step four:  Install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon) Chrome extension from the Google Web Store. ✅

### Set up project
Since I wanted to commit this project to my GitHub, I did this a little differently than the tutorial suggested. </br>
* Made a new repo on GitHub and cloned my own ssh key instead of cloning his. </br>
* Made a new file for the project, created a new react application with the same title in the terminal, and pathed down to the root of the project. </br>
* Copied the starter files supplied by the tutorial at [dappuniversity/defi_tutorial](https://github.com/dappuniversity/defi_tutorial) on GitHub. </br>
* Ran a `npm install` to get all the local dependencies installed for the project. </br>

### Coding
Since I've never used the solidity language in VSCode before, I needed an extension to handle that. I used the solidity [extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) in VSCode by Juan Blanco. </br>
I also needed to make sure I used a specific version of the solidity compiler for this project. In a solidity file `.sol` I had to right click and choose </br>
`Solidity: Change workspace compiler version (Remote)` and choose version `0.5.0`.
Now I was ready to code. </br>
I pretty much followed the tutorial and code exactly so I could see how he set up his smart contract and tech stack. I did take really good notes so I could come back and study how he engineered his app to work.
* Wrote the smart contract for how the app works in `TokenFarm.sol`. 
* Created a test file `TokenFarm.test.js` to test all of the functions that handle the transaction information.
* Built the file `deploy_contracts` to deploy the TokenFarm, DaiToken, and DappToken to the blockchain.
* Added a custom script `issue-token.js` to reward investors who stake with TokenFarm.
* Created a custom network on MetaMask to connect Ganache to the wallet.
* Built out the `App.js` and `Main.js` components which handle the functionality and UI/UX.
* Staked the investro's 100 Dai tokens, whatched the balances change, issued Dapp token rewards to staker, and unstaked Dai tokens.

### Learning experience
* Exposure on how to set up a smart contract and deploy it to an Ethereum blockchain test network for development.
* Experience on how to use Truffle commands and using the Truffle console to compile, migrate, and check values.
* How to set up tests with chai and ensure the correctness of the functions governing the transaction.
* How to connect your MetaMask wallet to the Ganache accounts to the Dapp.
* What you need to do to connect the smart contracts to the front end.
* I also learned about Wei. toWei transforms the number into a number with 18 zeros behind it. fromWei turns it back into a standard number.

### Challenges
* It was definitely challenging navigating all of the installs and configurations required in order to get to the coding. I had never needed to use an NVM in the past but the tutorial suggested using an older version. I had to trouble shoot the error that came up when I tried to globaly install truffle which ended up being permission issues. I'm still not sure why the packages needed older to be older versions but I obliged trying to keep the experience true to the tutorial. 
* I also had a syntax error that caused me to go through and scrutinize the code against the tutorial repo. The typo was `toWei` instead of `fromWei`.
Once I fixed that and had my Ganache accounts hooked up correctly, the app worked as expected as in the tutorial.
