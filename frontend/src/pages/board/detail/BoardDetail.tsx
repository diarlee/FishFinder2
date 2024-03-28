import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import Header from '../../../components/board/detail/Header';
import TopContents from '../../../components/board/detail/TopContents';
import MidContent from '../../../components/board/detail/MidContent';
import BottomContent from '../../../components/board/detail/BottomContent';
import CommentContainer from '../../../components/board/detail/CommentContainer';
import CommentInput from '../../../components/board/detail/CommentInput';
import { Wrapper } from '../../../components/common/Wrapper';

import { axiosInstance } from "../../../services/axios";
import { AxiosResponse } from "axios";
// import { userStore } from "../../../stores/userStore";



interface BoardType{
  boardId : number
  title : string
  content : string
  createdAt : string
  writerId : number
  writerNickname : string
  postType : string
  reviews : review[]
  images : image[]
  likeCount : number
  scrapCount : number
  commentCount : number
  comments : comment[]
  liked : boolean
  scraped : boolean
}

interface review{
  reviewId : number
  fishId : number
  weight : number
  pricePerKg : number
  totalPrice : number
}

interface image{
  imageId : number
  imageUri : string
}

interface comment{
  commentId : number, 
  commentWriterId : number, 
  commentCreatedAt : string,
  commentWriterNickname : string, 
  commentContent : string 
}

const StyledWrapper = styled(Wrapper)`
  display : flex;
  flex-direction : column;

  padding-bottom : 40px;
`

const Contents = styled.div`
  width : 100%;
  height: auto;

  padding-top : 65px;
`


export default function BoardDetail() {
  const [board, setBoard] = useState<BoardType>();
  const {boardId} = useParams();
  // const {userId} = userStore();

  useEffect(()=>{
    // if(userId==-1){
    //   axiosInstance.get(`/api/board/${boardId}`)
    //   .then((res:AxiosResponse)=>{
    //     setBoard(res.data.data)
    //   })
    // }
    // else{
      axiosInstance.get(`/api/board/${boardId}`,
      {
        headers : {
          memberId : 1
        }
      }
    )
      .then((res:AxiosResponse)=>{
        setBoard(res.data.data)
      })
    // }
  },[])

  return (
    <StyledWrapper>
      <Header/>
      {
        board && (
          <Contents>
            <TopContents
              postType={board.postType}
              title={board.title}
              writer={board.writerNickname}
              createdAt={board.createdAt}
            />
            <MidContent reviews = {board.reviews} content={board.content} thumbnail={board.images} />
            <BottomContent
              boardId={board.boardId}
              likeCount={board.likeCount}
              commentCount={board.comments.length}
              liked = {board.liked}
              scraped = {board.scraped}
            />
            <hr style={{width : '100%'}}></hr>
            <CommentContainer
              comments = {board.comments}
            />
          </Contents>
        )
      }
      <CommentInput/>
    </StyledWrapper>
  )
}