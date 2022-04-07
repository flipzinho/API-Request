
import './App.css';
import {Component} from 'react'

import Posts from './components/Posts';
import Button from './components/Button';
import Input from './components/Input';
class App extends Component  {
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 10,
      searchValue: ''
    }
    componentDidMount(){
      this.loadPosts()
    } 
    loadPosts = async () => {
    
      const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
      const [posts, photos] = await Promise.all([postsResponse, photosResponse])
      const postsJson = await posts.json()
    
      const photosJson = await photos.json()
      const {page, postsPerPage} = this.state
      
      const postsAndPhotos = postsJson.map((post, index) => {
        return {...post, cover: photosJson[index].url}
      })
      this.setState({
        
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      
      })
    }
    loadMorePosts = () => {
        const {
          page, 
          postsPerPage,
          posts,
          allPosts
        } = this.state;
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
        posts.push(...nextPosts)
        this.setState({posts, page: nextPage})
    }
handleChange = (e) => {
const {value} = e.target;
this.setState({searchValue: value})

}

  render(){
   const {posts, postsPerPage, page, allPosts, searchValue} = this.state
   const noMorePosts = page + postsPerPage >= allPosts.length
  const filteredPosts =  !!searchValue ? allPosts.filter(post =>
    {
    return(
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  } ) 
  : posts
    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1> Search Value: {searchValue}</h1>
          )}
          <Input value={searchValue} handleChange={this.handleChange}/>
        </div>
     
       <Posts  posts={filteredPosts}/>
                  {filteredPosts.length === 0 && (
                    <p>Post não encontrado =( </p>
                  )}
       
         <div className='button-container'>
           
           {!searchValue && (
             <>
               <Button onClick={this.loadMorePosts} 
               disabled={noMorePosts}
                 text="Carregar mais posts"/>
             </>
           )}
       
         </div>
        

      </section>
    
    );
  }
 
}

export default App;
