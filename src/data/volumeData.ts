export const volumeData = Array(12)
  .fill(0)
  .map((_, i) => ({
    name: `Month ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500,
  }))

