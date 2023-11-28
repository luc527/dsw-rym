package com.github.luc527.demo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artists")
public class ArtistController {

    public GenreRepository genreRepo;
    public ArtistRepository artistRepo;

    private List<Genre> persistGenres(List<String> genreNames) {
        var existingGenres = genreRepo.findByNameIn(genreNames);
        if (existingGenres.size() == genreNames.size()) {
            return existingGenres;
        }
        var newGenres = genreRepo.saveAll(
            genreNames
                .stream()
                .filter(s -> existingGenres.stream().noneMatch(e -> e.getName().equals(s)))
                .map(Genre::new)
                .collect(Collectors.toList())
        );
        var genres = Stream.concat(existingGenres.stream(), newGenres.stream()).collect(Collectors.toList());
        return genres;
    }

    public ArtistController(GenreRepository genreRepo, ArtistRepository artistRepo) {
        this.genreRepo = genreRepo;
        this.artistRepo = artistRepo;
    }

    @PostMapping
    public ArtistDTO save(@RequestBody ArtistDTO dto) {
        var artist = new Artist();
        artist.setName(dto.getName());
        artist.setGenres(persistGenres(dto.getGenres()));

        artist = artistRepo.save(artist);

        dto.setId(Optional.of(artist.getId()));
        return dto;
    }

    @PutMapping
    public ArtistDTO update(@RequestBody ArtistDTO dto) {
        var id     = dto.getId().orElseThrow();
        var artist = artistRepo.findById(id).orElseThrow();

        artist.setName(dto.getName());
        artist.setGenres(persistGenres(dto.getGenres()));
        artistRepo.save(artist);

        return dto;
    }

    @GetMapping
    public Iterable<ArtistDTO> findAll() {
        return artistRepo.findAll().stream().map(ArtistDTO::from).toList();
    }
}
