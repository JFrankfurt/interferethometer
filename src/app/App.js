import React from 'react'
import {hot} from 'react-hot-loader'
import {Home} from './screens/Home'
import EthProvider from './context/EthProvider'


export const Root = hot(module)(() =>
  <EthProvider>
    <Home/>
  </EthProvider>
)
