import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {db} from './fb'
import Link from 'next/link'
import {useState, UseState} from 'react'

export default function Home({Allblogs}) {
  const [blogs,setblogs] = useState(Allblogs)
  const[end,setEnd] = useState(false)
  const loadMore = async ()=>{
    const last = blogs[blogs.length-1]
   const res = await db.collection('blogs')
    .orderBy('createdAt', 'desc')
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()
    const newblogs = res.docs.map(docSnap=>{
      return{
        ...docSnap.data(),
      createdAt:docSnap.data().createdAt.toMillis(),
      id:docSnap.id,
      }
    })
    setblogs(blogs.concat(newblogs))

    if(newblogs.length < 3){
      setEnd(true)
    }
  }
  return (
    <div className="center">
     {blogs.map(blog=>{
       return(
        <div className="card" key={blog.createdAt}>
        <div className="card-image">
          <img src={blog.imageUrl} />
          <span className="card-title">{blog.title}</span>
        </div>
        <div className="card-content">
          <p>{blog.body}</p>
        </div>
        <div className="card-action">
          <Link href={`/blogs/${blog.id}`}><a>Read more</a></Link>
        </div>
      </div>
       )
     })}

     {end==false?
      <button  className=" btn #d500f9 purple accent-3" onClick={()=>loadMore()}>Load more</button>
     :<h3>OOps! you reached end</h3>
     }
    

     <style jsx>
       {`
         .card{
           max-width:500px;
           margin:22px auto

         }
         p{
           display: -webkit-box;
           overflow:hidden;
           -webkit-line-clamp: 1;
           -webkit-line-orient: vertical;
          }
       `}
     </style>
    </div>
  )
}


export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy("createdAt","desc")
  .limit(3)
  .get()
  const Allblogs = querySnap.docs.map(docSnap=>{
    return {
      ...docSnap.data(),
      createdAt:docSnap.data().createdAt.toMillis(),
      id:docSnap.id
    }
  })
 
  return {
    props: {Allblogs}, // will be passed to the page component as props
  }
}
