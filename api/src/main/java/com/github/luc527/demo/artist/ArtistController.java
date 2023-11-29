package com.github.luc527.demo.artist;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.github.luc527.demo.album.Album;
import com.github.luc527.demo.album.AlbumRepository;
import com.github.luc527.demo.genre.GenreRepository;

// TODO replace orElseThrow() with something that spring boot can turn into a meaningful return body

@RestController
@RequestMapping("/artists")
public class ArtistController {

    public GenreRepository genreRepo;
    public ArtistRepository artistRepo;
    public AlbumRepository albumRepo;

    public ArtistController(GenreRepository genreRepo, ArtistRepository artistRepo, AlbumRepository albumRepo) {
        this.genreRepo = genreRepo;
        this.artistRepo = artistRepo;
        this.albumRepo = albumRepo;
    }

    @PostMapping
    public ArtistDTO save(@RequestBody ArtistDTO dto) {
        dto.setId(null);
        var artist = dto.toArtist();
        artist.setGenres(genreRepo.saveAllByName(dto.getGenres()));
        artist = artistRepo.save(artist);
        return ArtistDTO.from(artist);
    }

    @PutMapping("{id}")
    public ArtistDTO update(@RequestBody ArtistDTO dto, @PathVariable Long id) {
        var artist = artistRepo.findById(id).orElseThrow();
        artist.setGenres(genreRepo.saveAllByName(dto.getGenres()));
        artist = artistRepo.save(artist);
        return ArtistDTO.from(artist);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        artistRepo.deleteById(id);
    }

    // TODO find endpoint with pagination + search + sort?
    @GetMapping
    public List<ArtistDTO> findAll() {
        return artistRepo.findAll()
            .stream()
            .map(ArtistDTO::from)
            .toList();
    }

    @GetMapping("{artistId}/albums")
    public List<ArtistAlbumDTO> findAlbums(@PathVariable Long artistId) {
        return albumRepo.findByArtistId(artistId)
            .stream()
            .map(ArtistAlbumDTO::from)
            .toList();
    }

    @PostMapping("{artistId}/albums")
    public ArtistAlbumDTO saveAlbum(@RequestBody ArtistAlbumDTO dto, @PathVariable Long artistId) {
        var artist = artistRepo.findById(artistId).orElseThrow();

        var album = new Album();
        album.setArtist(artist);
        album.setTitle(dto.getTitle());
        album.setReleaseDate(dto.getReleaseDate());
        album.setGenres(genreRepo.saveAllByName(dto.getGenres()));
        album = albumRepo.save(album);

        return ArtistAlbumDTO.from(album);
    }

    @PutMapping("{artistId}/albums/{albumId}")
    public ArtistAlbumDTO saveAlbum(
        @RequestBody ArtistAlbumDTO dto,
        @PathVariable Long artistId,
        @PathVariable Long albumId
    ) {
        var currentArtist = artistRepo.findById(artistId).orElseThrow();

        var newArtist = dto.getArtistId() == null
            ? currentArtist
            : artistRepo.findById(dto.getArtistId()).orElseThrow();

        var album = albumRepo.findById(albumId).orElseThrow();

        album.setArtist(newArtist);
        album.setTitle(dto.getTitle());
        album.setReleaseDate(dto.getReleaseDate());
        album.setGenres(genreRepo.saveAllByName(dto.getGenres()));

        return ArtistAlbumDTO.from(album);
    }

    @DeleteMapping("{artistId}/albums/{albumId}")
    public void deleteAlbum(@PathVariable Long artistId, @PathVariable Long albumId) {
        albumRepo.deleteById(albumId);
    }
}
