package com.github.luc527.demo.review;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.github.luc527.demo.album.Album;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Review {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Album album;

    private String author;

    private Integer rating;

    private String content;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    private Date publicationDate;

    @UpdateTimestamp
    @Temporal(TemporalType.DATE)
    private Date updateDate;
}
