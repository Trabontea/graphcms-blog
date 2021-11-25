// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN; 


export default async function comments(req, res) {
  
  //   name: req.body.name,
  //   email: req.body.email,
  //   comment: req.body.comment,
  //   slug: req.body.slug,

  const {name, email, slug, comment} = req.body;


  // console.log('graphcmsToke', {graphcmsToken})
  
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: { slug: $slug } } }) {id}
    }
  `
  // pentru testare
    // try {
    //   const result = await graphQLClient.request(query, req.body)
    //   return res.status(200).send(result);
    // } catch(error) {
    //   console.log('error', error)
    // }

    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result);
}
