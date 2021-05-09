import {useState} from 'react'
import {db} from '../../fb'
import {useRouter} from 'next/router'

export default function blogpage({blog,user,allComments}) {
    const [myComment,setmyComment] = useState('')
    const [allCommentsBlog,setAllComments] = useState(allComments)
    const router = useRouter()
  const { blogid } = router.query
    const makeComment = async ()=>{

        await db.collection('blogs').doc(blogid).collection('comments').add({
            text:myComment,
            name:user.displayName
        })
        const commentQury = await db.collection('blogs').doc(blogid).collection('comment').get()
        setAllComments(commentQury.docs.map(docSnap=>docSnap.data()))
    }

    return (
        <div className="container center">
            <h2>{blog.title} </h2>
            <h5> Created on -{new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl}  alt={blog.title} />
            <p>{blog.body}</p>

            {user ?
            <>

            <div className="input-field">
                <input type = "text" placeholder = "add a comment" value={myComment} onChange={(e)=>setmyComment(e.target.value)} />
            </div>
            <button className= "btn #d500f9 purple accent-3" onClick={()=>makeComment()}>Leave a  comment</button>
            </>
            :<h3>please login to make comment</h3>
            }
            <hr />
            <div className="left-align">
                {allCommentsBlog.map(item=>{
                    return <h6 key={item.name}><span>{item.name}</span>{item.text}</h6>
                })}
            </div>

            <style jsx global>
                {`span{
                    font-weight:500
                }
                    body{
                        color:red
                    }
                    img{
                        width:100%;
                        max-width:500px;
                    }
                `}
            </style>
        </div>
    )
}

export async function getServerSideProps({params:{blogid}}) {
    const result = await db.collection('blogs').doc(blogid).get()
    const allCommentsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

    const allComments = allCommentsSnap.docs.map(comDocsSnap=>comDocsSnap.data())
    return {
      props: {
          blog:{
              ...result.data(),
              createdAt:result.data().createdAt.toMillis()
          } ,
          allComments
       },
    }
}  
