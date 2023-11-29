package com.github.luc527.demo.artist;

import java.util.List;
import java.util.stream.Collectors;

import com.github.luc527.demo.genre.Genre;

import lombok.Data;

@Data
public class ArtistDTO {
    private Long id;
    private String name;
    private List<String> genres;

    public static ArtistDTO from(Artist artist) {
        var dto = new ArtistDTO();
        dto.setId(artist.getId());
        dto.setName(artist.getName());
        dto.setGenres(
            artist.getGenres()
            .stream()
            .map(Genre::getName)
            .collect(Collectors.toList())
        );
        return dto;
    }

    public Artist toArtist() {
        var artist = new Artist();
        artist.setId(this.id);
        artist.setName(this.name);
        return artist;
    }
}
