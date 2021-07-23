import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  // Connecting to 
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // Load blockchain data
  async loadBlockchainData() {
    // Fetch blockchain data
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken 
    // Find networks key and pass in Id to get the address
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      // This creates a javascript version of the smart contract using web3
      // Create new variable that points to the smart contract by passing in the abi and address
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      // Update state of daiToken
      this.setState({ daiToken })
      // Fetch the balance of the daiToken account in state
      // Have to use .call() to read the information
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      // Update state of daiTokenBalance
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken 
    // Find networks key and pass in Id to get the address
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      // This creates a javascript version of the smart contract using web3
      // Create new variable that points to the smart contract by passing in the abi and address
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      // Update state of daiToken
      this.setState({ dappToken })
      // Fetch the balance of the dappToken account in state
      // Have to use .call() to read the information
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      // Update state of dappTokenBalance
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load tokenFarm 
    // Find networks key and pass in Id to get the address
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      // This creates a javascript version of the smart contract using web3
      // Create new variable that points to the smart contract by passing in the abi and address
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      // Update state of daiToken
      this.setState({ tokenFarm })
      // Fetch the balance of the tokenFarm account in state
      // Have to use .call() to read the information
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      // Update state of dappTokenBalance
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    // Update loading state to false
    this.setState({ loading: false })
  }

  // Load client side app to the blockchain using web3
  async loadWeb3() {
    // If ethereum object exists
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    // If web3 object exists
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    // If not, install  in order to use this app
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying !')
    }
  }

  // Approve tokens so they can be spent 
  // Send the transaction from the current account
  // Stake the mDAI tokens into tokenFarm
  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      // User's Account
      account: '0x0',

      // Smart contracts
      daiToken: {},
      dappToken: {},
      tokenFarm: {},

      // User's balances
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',

      // Loading status
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
        daiTokenBalance={this.state.daiTokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
      />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
