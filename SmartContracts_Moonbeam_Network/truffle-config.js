const HDWalletProvider = require('@truffle/hdwallet-provider');

// Moonbeam Development Node Private Key
const privateKeyDev = '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';
// Moonbase Alpha Private Key --> Please change this to your own Private Key with funds
// NOTE: Do not store your private key in plaintext files
//       this is only for demostration purposes only
const privateKeyMoonbase = '19318b8634925ea867dede4398155e6d0f9b44258a7dc78dd93c58bf0b5491ea';

module.exports = {
   networks: {
      // Moonbeam Development Network
      dev: {
         provider: () => {
            if (!privateKeyDev.trim()) {
               throw new Error(
                  'Please enter a private key with funds, you can use the default one'
               );
            }
            return new HDWalletProvider(
               privateKeyDev,
               'http://localhost:9933/'
            );
         },
         network_id: 1281,
      },
      // Moonbase Alpha TestNet
      moonbase: {
         provider: () => {
            if (!privateKeyMoonbase.trim()) {
               throw new Error(
                  'Please enter a private key with funds to send transactions to TestNet'
               );
            }
            if (privateKeyDev == privateKeyMoonbase) {
               throw new Error(
                  'Please change the private key used for Moonbase to your own with funds'
               );
            }
            return new HDWalletProvider(
               privateKeyMoonbase,
               'https://rpc.api.moonbase.moonbeam.network'
            );
         },
         network_id: 1287,
      },
   },
   // Solidity >=0.5.16 Compiler
   compilers: {
      solc: {
         version: '>=0.5.16',
      },
   },
   // Moonbeam Truffle Plugin & Truffle Plugin for Verifying Smart Contracts
   plugins: ['moonbeam-truffle-plugin', 'truffle-plugin-verify'],
};
