import React, {Component} from 'react'
import injectSheet from 'react-jss'
import {styles} from './styles'
import {User} from '../../components/User'
import EthConsumer from '../../context/EthConsumer'
import EthProvider from '../../context/EthProvider'

class home extends Component {
  state = {
    searchString: '',
  }
  handleSearch = ({target: {value: searchString}}) => this.setState({searchString})

  render() {
    const {classes} = this.props
    const {searchString} = this.state
    return (
      <EthProvider>
        <EthConsumer>
          {({users}) =>
            <div className={classes.root}>
              <input type="text" onChange={this.handleSearch}
                     value={searchString} className={classes.input}
                     placeholder='search gravatars'/>
              {users
                .filter(user => JSON.stringify(user).includes(searchString))
                .map(user => <User key={JSON.stringify(user)} {...user}/>)}
            </div>}
        </EthConsumer>
      </EthProvider>
    )
  }
}

export const Home = injectSheet(styles)(home)
