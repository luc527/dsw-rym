package com.github.luc527.demo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.Data;

@Data
public class ArtistDTO {
    private Optional<Long> id;
    private String name;
    private List<String> genres;

    public static ArtistDTO from(Artist artist) {
        var dto = new ArtistDTO();
        dto.setId(Optional.of(artist.getId()));
        dto.setName(artist.getName());
        dto.setGenres(
            artist.genres.stream().map(Genre::getName).collect(Collectors.toList())
        );
        return dto;
    }
}
