const fetch = require('node-fetch')
const crypto = require(`crypto`)

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const foxes = await Promise.all(
    count.map(async (count, i) => {
      return await fetch(`https://source.unsplash.com/300x300/?fox`).then(
        res => res
      )
    })
  )
  foxes.forEach((fox, i) => {
    createNode({
      image: fox.url,
      id: `foxNode${i}`,
      parent: null,
      children: [],
      internal: {
        type: `foxNodes`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fox.url))
          .digest(`hex`),
      },
    })
  })

  return
}
