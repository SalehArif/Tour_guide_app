module.exports = {
  plugins: [
    ["module:react-native-dotenv"]
  ],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
