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
    } else {
      this.eth = new Eth(
        new Eth.HttpProvider('http://localhost:8545'),
        ethOptions
      )
    }
    window.eth = this.eth
    this.gravity = new Gravity(this.eth)
    const users = await this.gravity.getUsers()
    this.setState({loading: false, users: Object.values(users).reverse()})
  }

  render() {
    return (
      <EthContext.Provider value={{
        eth: this.eth,
        gravity: this.gravity,
        users: this.state.users
      }}>
        {this.state.loading
          ? <div>loading...</div>
          : this.props.children}
      </EthContext.Provider>
    )
  }
}

