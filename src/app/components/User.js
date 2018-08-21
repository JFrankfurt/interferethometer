import React, {Component} from 'react'
import injectSheet from 'react-jss'
import EthereumIdenticon from 'ethereum-identicon'

const imageSize = 150

const styles = {
  root: {
    margin: '20px 0',
    display: 'grid',
    gridGap: 12,
    alignItems: 'center',
    gridTemplateRows: `${imageSize / 2}px ${imageSize / 2}px`,
    gridTemplateColumns: `${imageSize + 20}px auto`,
  },
  etherscanLink: {
    color: 'inherit',
  },
  image: {
    width: imageSize,
    height: imageSize,
    gridRow: '1 / 4',
    gridColumn: '1 / 2',
    borderRadius: '50%',
  },
  name: {
    fontSize: '3em'
  }
}

const defaultImage = 'https://metamask.io/img/metamask.png'

class user extends Component {
  state = {
    img: this.props.imageUrl
  }

  defaultImage = () => this.setState({img: defaultImage})

  render() {
    const {classes, displayName, owner} = this.props
    const {img} = this.state
    return (
      <div className={classes.root}>
        {img === defaultImage
          ? <div className={classes.image}>
          <EthereumIdenticon address={owner} diameter={imageSize}/>
          </div>
          : <a href={img} className={classes.image}>
            <img src={img} alt={displayName} className={classes.image} onError={this.defaultImage}/>
          </a>}
        <div className={classes.name}>{displayName}</div>
        <a target='_blank' href={`https://etherscan.io/address/${owner}`}
           className={classes.etherscanLink}
           rel='noopener noreferrer'>{owner}</a>
      </div>
    )
  }
}

export const User = injectSheet(styles)(user)
