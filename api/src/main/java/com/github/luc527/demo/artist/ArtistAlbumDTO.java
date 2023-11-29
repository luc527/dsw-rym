package com.github.luc527.demo.artist;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.github.luc527.demo.album.Album;
import com.github.luc527.demo.genre.Genre;

import lombok.Data;

@Data
public class ArtistAlbumDTO {
    private Long id;
    private Long artistId;
    private String title;
    private Date releaseDate;
    private List<String> genres;

    public static ArtistAlbumDTO from(Album album) {
        var dto = new ArtistAlbumDTO();
        dto.setId(album.getId());
        dto.setArtistId(album.getArtist().getId());
        dto.setTitle(album.getTitle());
        dto.setReleaseDate(album.getReleaseDate());
        dto.setGenres(
            album.getGenres().stream().map(Genre::getName).collect(Collectors.toList())
        );
        return dto;
    }
}
