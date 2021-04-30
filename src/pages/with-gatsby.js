import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import React from 'react'
import Layout from '../layouts'

const WithGatsby = ({ data }) => {
  return (
    <Layout>
      {data.allFoxNodes.edges.map(({ node }, i) => (
        <Img
          fluid={node.localImage.childImageSharp.fluid}
          alt={`fox with gatsby plugin ${i + 1}`}
          style={{ borderRadius: '10px' }}
        />
      ))}
    </Layout>
  )
}

export default WithGatsby

export const withGatsbyQuery = graphql`
  {
    allFoxNodes {
      edges {
        node {
          localImage {
            childImageSharp {
              fluid(maxWidth: 600, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
