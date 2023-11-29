package com.github.luc527.demo.review;

import java.util.Date;

import lombok.Data;

@Data
public class AlbumReviewDTO {
    private Long id;
    private String author;
    private Date publicationDate;
    private Date updateDate;
    private Integer rating;
    private String content;

    public static AlbumReviewDTO from(Review review) {
        var dto = new AlbumReviewDTO();
        dto.id = review.getId();
        dto.author = review.getAuthor();
        dto.publicationDate = review.getPublicationDate();
        dto.updateDate = review.getUpdateDate();
        dto.rating = review.getRating();
        dto.content = review.getContent();
        return dto;
    }

    public Review toReview() {
        var review = new Review();
        review.setAuthor(this.author);
        review.setPublicationDate(this.publicationDate);
        review.setUpdateDate(this.updateDate);
        review.setRating(this.rating);
        review.setContent(this.content);
        return review;
    }


}
