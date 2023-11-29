package com.github.luc527.demo.artist;

import java.util.List;

import com.github.luc527.demo.album.Album;
import com.github.luc527.demo.genre.Genre;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Artist {

    Artist(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name="album", joinColumns=@JoinColumn(name="artist_id"))
    public List<Album> albums;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "artist_genre",
        joinColumns = @JoinColumn(name = "artist_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    public List<Genre> genres;
}
