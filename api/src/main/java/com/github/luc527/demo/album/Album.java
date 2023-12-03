package com.github.luc527.demo.album;

import java.util.Date;
import java.util.List;

import com.github.luc527.demo.artist.Artist;
import com.github.luc527.demo.genre.Genre;
import com.github.luc527.demo.review.Review;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Album {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Artist artist;

    private String title;

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name="album_genre",
        joinColumns=@JoinColumn(name="album_id"),
        inverseJoinColumns=@JoinColumn(name="genre_id")
    )
    private List<Genre> genres;
}
