import React from 'react'
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      left: 6,
      top: 2,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  
export default function PostContent({ post }) {

    return (
        <>
            {
                post.text &&
                <div className='small-post-card-content__text-container'>
                    <p>{post.text}</p>
                </div>
            }
            {
                post.imageUrl &&
                <div className='small-post-card-content__image-container'>
                    <img src={post.imageUrl} alt='feed' />
                </div>
            }
            {!post.imageUrl && post.videoUrl &&
                <div className='small-post-card-content__video-container'>
                    <iframe
                        width="560"
                        height="200"
                        src={post.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            }
            <div className='small-post-card-content__like'>
                <Divider>
                <StyledBadge badgeContent={post.likes} color="primary" >
                    <ThumbUpIcon color="action" />
                </StyledBadge>
                </Divider>
            </div>
        </>
    )
}
