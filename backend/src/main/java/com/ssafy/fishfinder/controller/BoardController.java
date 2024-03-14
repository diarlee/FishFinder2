package com.ssafy.fishfinder.controller;


import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.entity.PostType;
import com.ssafy.fishfinder.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Message> createBoard(
            @RequestPart(value = "data") BoardDto.CreateRequest request,
            @RequestPart(value = "images", required = false)List<MultipartFile> images
    ) {
        Message message = new Message("게시글 생성 완료", boardService.createBoard(request, images));
        return ResponseEntity.ok(message);
    }

    @GetMapping
    public ResponseEntity<Message> getBoardList(
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(value = "likeCount", required = false, defaultValue = "2147483647") int likeCount,
            @RequestParam(value = "createdAt", required = false, defaultValue = "#{T(java.time.LocalDateTime).now()}") LocalDateTime createdAt,
            @RequestParam(value = "postType", required = false, defaultValue = "all") PostType postType
    ) {
        BoardDto.GetListRequest request = BoardDto.GetListRequest.builder()
                .sortBy(sortBy)
                .limit(limit)
                .likeCount(likeCount)
                .createdAt(createdAt)
                .postType(postType)
                .build();

        return ResponseEntity.ok(new Message("게시글 목록 조회 완료", boardService.getBoardList(request)));
    }

}