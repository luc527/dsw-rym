package com.github.luc527.demo.album;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.github.luc527.demo.artist.ArtistDTO;
import com.github.luc527.demo.genre.Genre;

import lombok.Data;

@Data
public class AlbumDTO {
    private Long id;
    private ArtistDTO artist;
    private String title;
    private Date releaseDate;
    private List<String> genres;

    public static AlbumDTO from(Album album) {
        var dto = new AlbumDTO();
        dto.setId(album.getId());
        dto.setArtist(ArtistDTO.from(album.getArtist()));
        dto.setTitle(album.getTitle());
        dto.setReleaseDate(album.getReleaseDate());
        dto.setGenres(
            album.getGenres()
                .stream()
                .map(Genre::getName)
                .collect(Collectors.toList())
        );
        return dto;
    }
}
