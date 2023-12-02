package com.github.luc527.demo.genre;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

public class GenreRepositoryImpl implements GenreRepositoryCustom {

    @Autowired
    @Lazy
    GenreRepository genreRepo;

    public List<Genre> saveAllByName(List<String> names) {
        if (names == null) {
            return List.of();
        }
        var existingGenres = genreRepo.findByNameIn(names);
        if (existingGenres.size() == names.size()) {
            return existingGenres;
        }
        var newGenres = genreRepo.saveAll(
            names
                .stream()
                .filter(s -> existingGenres.stream().noneMatch(e -> e.getName().equals(s)))
                .map(Genre::new)
                .collect(Collectors.toList())
        );
        var genres = Stream.concat(
            existingGenres.stream(),
            newGenres.stream()
        ).collect(Collectors.toList());
        return genres;
    }
}
