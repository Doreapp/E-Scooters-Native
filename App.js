/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView
} from 'react-native';

import Maps from './components/Maps';

const App: () => Node = () => {
  console.log("App()")
  return (
    <SafeAreaView>
      <Maps></Maps>
    </SafeAreaView>
  );
};

export default App;
