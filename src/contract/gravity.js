import EthContract from 'ethjs-contract'
import EthAbi from 'ethjs-abi'
import GravityABI from './gravity.json'

const address = '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'

export default class Gravity {
  constructor(provider) {
    if (!provider) {
      throw new Error('gravity constructor isn\'t getting a provider')
    } else {
      this.provider = provider
      this.contractInstance = EthContract(provider)(GravityABI).at(address)
    }
  }

  decodeLogs = logs => EthAbi.logDecoder(GravityABI)(logs)

  getUsers = () =>
    new Promise((resolve, reject) => {
      this.provider.getLogs({
        fromBlock: 6175000,
        toBlock: 'latest',
        address,
        topics: [ // topics *filters out* events you are not interested in
          // '0x9ab3aefb2ba6dc12910ac1bce4692cf5c3c0d06cff16327c64a3ef78228b130b', // NewGravatar
          // '0x76571b7a897a1509c641587568218a290018fbdc8b9a724f17b77ff0eec22c0c' // UpdatedGravatar
        ]
      }, (err, logs) => {
        if (err) reject(err)
        resolve(this.decodeLogs(logs).reduce((acc, {displayName, imageUrl, owner}) => ({
          ...acc,
          [owner]: {
            displayName,
            imageUrl,
            owner
          }
        }), {}))
      })
    })
}
