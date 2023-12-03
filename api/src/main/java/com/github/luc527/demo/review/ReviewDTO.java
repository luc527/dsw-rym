package com.github.luc527.demo.review;

import java.util.Date;

import com.github.luc527.demo.album.AlbumDTO;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private AlbumDTO album;
    private String author;
    private Integer rating;
    private String content;
    private Date publicationDate;
    private Date updateDate;

    public static ReviewDTO from(Review r) {
        var d = new ReviewDTO();
        d.setId(r.getId());
        d.setAlbum(AlbumDTO.from(r.getAlbum()));
        d.setAuthor(r.getAuthor());
        d.setRating(r.getRating());
        d.setContent(r.getContent());
        d.setPublicationDate(r.getPublicationDate());
        d.setUpdateDate(r.getUpdateDate());
        return d;
    }
}
