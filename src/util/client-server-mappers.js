// Call to map data after the client receives it
export const mapForLocal = (mappedKeyPairs, data) => {
  let mappedObj = { ...data } // This is so that key value pairs added on the client side are included in the mapping.
  Object.keys(mappedKeyPairs).map((localKey) => {
    const serverKey = mappedKeyPairs[localKey]
    mappedObj[localKey] = data[serverKey]

    if (!mappedKeyPairs[serverKey]) {
      delete mappedObj[serverKey] // Duplicate values are deleted, unless the client key is the same as the server key
    }
  })
  return mappedObj
}

// Call to map data before the client sends it
export const mapForServer = (mappedKeyPairs, data) => {
  let mappedObj = {} // Values added by client are left out

  Object.keys(mappedKeyPairs).map((localKey) => {
    const serverKey = mappedKeyPairs[localKey]

    if (data && data.hasOwnProperty(localKey)) {
      if (data[localKey] === 'NULL_VALUE') {
        mappedObj[serverKey] = null
      } else {
        mappedObj[serverKey] = data[localKey]
      }
    }
  })
  return mappedObj
}
