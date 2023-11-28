package com.github.luc527.demo;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
public class Artist {

    Artist(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "artist_genre",
        joinColumns = @JoinColumn(name = "artist_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    public List<Genre> genres;
}
