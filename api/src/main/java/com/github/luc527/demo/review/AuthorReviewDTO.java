package com.github.luc527.demo.review;

import java.util.Date;

import com.github.luc527.demo.album.AlbumDTO;

import lombok.Data;

@Data
public class AuthorReviewDTO {
    private Long id;
    private AlbumDTO album;
    private Date publicationDate;
    private Date updateDate;
    private Integer rating;
    private String content;

    public static AuthorReviewDTO from(Review review) {
        var dto = new AuthorReviewDTO();
        dto.id = review.getId();
        dto.publicationDate = review.getPublicationDate();
        dto.updateDate = review.getUpdateDate();
        dto.rating = review.getRating();
        dto.content = review.getContent();
        dto.album = AlbumDTO.from(review.getAlbum());
        return dto;
    }
}
