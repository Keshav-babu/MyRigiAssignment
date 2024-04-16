

import React, { useEffect, useRef, useState } from "react";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "./actions";
import Header from "../../component/header";
import Users from "../../component/Users";
import PostLayout from "../../component/Post/component/PostLayout";
import Spinner from "../../component/Spinner";
import { Virtuoso } from "react-virtuoso";
// import { debounce } from "../../config/constants";
import {useLocation, useNavigate} from 'react-router-dom'

const Home = () => {
  const [page, setPage] = useState(1);
  const [post,setPost]=useState([])


  const allUsers = useSelector((state) => state?.home);
  const allPosts = useSelector((state) => state?.home?.allPost);
  const hasMore = useSelector((state) => state?.home?.hasMore);
  const isPostsLoading = useSelector((state) => state?.home?.isPostsLoading);
  

  const dispatch = useDispatch();
  const location =useLocation();
  const navigate = useNavigate()
  const scrollRef = useRef();

  const loadMorePosts = async () => {
    dispatch(getAllPosts({page}));
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(()=>{
    setPost(allPosts)
  },[allPosts])

  useEffect(() => {
    if(location.state){
      const {post,scrollPosition} = location.state;  

      setPost(post)
      setTimeout(() => {
        scrollRef.current?.scrollToIndex({index: scrollPosition,});
      }, (10));
    }else{
      loadMorePosts();
    }

    dispatch(getAllUsers());

    window.addEventListener('beforeunload', deletelocationState);

    return () => {
        window.removeEventListener('beforeunload', deletelocationState);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const Footer = () => {
    if(isPostsLoading){
      return (
        <div 
          style={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </div>
      )
    }
    if(isPostsLoading===false &&allPosts.length>0){
      return <p  style={{
        color:'red'
      }}>That's all for now! Check back later for more updates.</p>
    }
    if(isPostsLoading===false &&allPosts.length===0){
      return <>
          <p>We can't find any posts </p>
          <button onClick={handleRefresh}>refresh the page</button>
      </>

    }
    

  }

  


  const deletelocationState=()=>{
    window.history.replaceState({}, document.title, window.location.pathname);
}


  
  return (
    <section>
      <Header />
      <div className="container">
        <div className="left">
          <Virtuoso
            increaseViewportBy={200}
            data={post}
            endReached={hasMore&&loadMorePosts}
            style={{ height: '80vh' }}
            totalCount={post?.length}
            itemContent={(index) => <div
            onClick={()=>{
              navigate( `/post/${post[index]?.id}`,{state: {post: post,scrollPosition:index,postInfo: post[index]}});
            }}>
                <PostLayout  key={index} post={post[index]} />
            </div>}

            ref={scrollRef}
            components={{Footer}}
          />
        </div>
        {allUsers?.isUsersLoading && (
          <div className="right">
            <p>Members</p>
            <div className="memberss-container">
              {allUsers?.allUsers?.map((user) => <Users key={user.id} user={user} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
