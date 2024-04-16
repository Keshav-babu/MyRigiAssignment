
import React, { useMemo } from "react";
import "./style.css"


const Post=({attachments})=>{

  const attachmentsData=useMemo(()=>{

    return attachments.sort((a, b) => {
      if (a.type === 'video' && b.type !== 'video') {
        return -1;
      } else if (a.type !== 'video' && b.type === 'video') {
        return 1;
      } else {
        return 0;
      }
    });
    
  },[attachments])

  function renderItem(item) {

    console.log("renderItem",{item})
    switch (item.type) {
      case 'image':
        return <img style={{height:'100%',display:'flex',margin:'auto'}}
                  src={item.url} alt={item.type} 
                  loading='lazy'

                />;
      case 'video':
        return (
          <video controls
          style={{width:'100%' ,height:'100%',display:'flex',margin:'auto'}}
          
          >
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'text':
      default:
        return <p 
        style={{height:'inherit'}}
        
        >{item.content}</p>;
    }
  }
    
    if(attachmentsData.length===1){
        return <div className="post-attachments-container-one">
            {renderItem(attachmentsData[0])}
        </div>
    }
    return <div className="post-attachments-container">
      <div className="post-attachments-container-left">{renderItem(attachmentsData[0])}</div>
      <div className="post-attachments-container-right">
        {attachmentsData.slice(1).map((item,index)=><div key={item.id}>{renderItem(item)}</div>)}
      </div>

    
    </div>
      
}

export default Post