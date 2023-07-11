import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PostCard, CategoriesComponent, PostWidget } from '../components' 
import { getPosts } from '../services'

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>OLI Baustoffe Blog</title>
        <meta name="description" content="Der Offizielle OLI Baustoffe Blog für alle informationen zu Dachbaustoffen wie Dachplatten, Trapezplatten und Dachpaneele" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relatve top-8'>
            <PostWidget />
            <CategoriesComponent />
          </div>  
        </div>
      </main>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  )
}

export default Home;