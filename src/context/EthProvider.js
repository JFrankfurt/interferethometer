import React, {Component} from 'react'
import Eth from 'ethjs'
import EthContext from './EthContext'
import Gravity from '../contract/gravity.js'

export default class EthProvider extends Component {
  state = {
    loading: true,
    users: [],
  }

  async componentDidMount() {
    const ethOptions = {interval: 3000}
    if (
      typeof window.web3 !== 'undefined' &&
      typeof window.web3.currentProvider !== 'undefined'
    ) {
      this.eth = new Eth(window.web3.currentProvider, ethOptions)
    }
    window.eth = this.eth
    if (this.eth) {
      this.gravity = new Gravity(this.eth)
      const users = await this.gravity.getUsers()
      this.setState({users: Object.values(users).reverse()})
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <EthContext.Provider value={{
        eth: this.eth,
        gravity: this.gravity,
        users: this.state.users
      }}>
        {!this.eth && !this.state.loading
          ? <a href="https://metamask.io/"
               style={{color: 'white'}}
               target="_blank" rel="noopener noreferrer">
            Come back once you have MetaMask!
          </a>
          : this.state.loading
            ? <div>Loading Gravity...</div>
            : this.props.children}
      </EthContext.Provider>
    )
  }
}

