function getPercentage (seek, duration) {
  return seek / duration
}

test('adds 1 + 2 to equal 3', () => {
  var seek = 0.1
  var duration = 100
  var D2 = 200
  var D2_SEEK = 0.1

  function percentageToD2seek (p) {
    return p * D2
  }
  expect(getPercentage(seek, duration)).toBe(0.001)

  var halfp = getPercentage(50, duration)
  expect(halfp).toBe(0.5)
  expect(percentageToD2seek(halfp)).toBe(100)
})
