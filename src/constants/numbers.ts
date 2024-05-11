const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    longitudeDelta: 0.01,
    latitudeDelta: 0.005,
  },
} as const;

export {numbers};
