const fetch = require('node-fetch')
const crypto = require(`crypto`)

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const foxes = await Promise.all(
    count.map(async (count, i) => {
      return await fetch(`https://randomfox.ca/floof/`).then(res =>
        res.json().then(final => final)
      )
    })
  )
  foxes.forEach((fox, i) => {
    createNode({
      link: fox.link,
      image: fox.image,
      id: `foxNode${i}`,
      parent: null,
      children: [],
      internal: {
        type: `foxNodes`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fox))
          .digest(`hex`),
      },
    })
  })

  return
}
