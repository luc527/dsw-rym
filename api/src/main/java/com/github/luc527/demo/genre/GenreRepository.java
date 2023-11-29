package com.github.luc527.demo.genre;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface GenreRepository extends ListCrudRepository<Genre, Long>, GenreRepositoryCustom {
    public List<Genre> findByNameIn(List<String> names);
}
