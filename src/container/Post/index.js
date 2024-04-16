import React, { useEffect } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from './actions';
import leftArrow from "../../assets/leftarrow.svg";
import PostLayout from '../../component/Post/component/PostLayout';


function Post() {
  const { id } = useParams();

    const post= useSelector((state) => state?.post?.posts);
    
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPost(id))
  }, [id]);
  const navigate = useNavigate();
  const location =useLocation()

  return (
    <div className='post-container'>
        <div style={{width:'fit-content'}}
            onClick={()=>{
                navigate('/',{state: location.state})
            }}
        >
            <img src={leftArrow} alt='leftarrow' loading='lazy'/>
        </div>
      {post ? (
        <div>
          <PostLayout post={post} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post