export default function PostCard({post}){
    return(
        <div className='post'>
        <img src={post.cover} alt="imagem"/>
     <div className='props-content'>
        <h3>
          {post.title}
        </h3>
       <p>{post.body} </p> 
      </div>
        </div>
    )
}