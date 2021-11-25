import React from 'react'
import { useRouter } from 'next/router';
import { getPosts, getPostDetails } from '../../services';
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'

const PostDetails = ({post}) => {
  const router = useRouter();

  if(router.isFallback) {
    return <Loader />
  }

  console.log('post', post)
  return (
    <div className="conatiner mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="col-span-1 lg:col-span-8">
         
          <PostDetail post={post}/>
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug}/>
        </main>

        <div className="col-span-1 lg:col-span-4">
        
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div> 
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({params}) {
  const data = (await getPostDetails(params.slug))

  return {
    props: { post: data}
  }
}

// ? Error: getStaticPaths is required for dynamic SSG pages and is missing for '/post/[slug]'

export async function getStaticPaths() {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: {slug}} ) => ({params: {slug}})),

    // ? Error: The `fallback` key must be returned from getStaticPaths in /post/[slug]. Expected: { paths: [], fallback: boolean }
    fallback: true,
  }
}
