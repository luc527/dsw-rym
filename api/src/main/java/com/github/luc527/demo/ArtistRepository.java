package com.github.luc527.demo;

import org.springframework.data.repository.ListCrudRepository;

public interface ArtistRepository extends ListCrudRepository<Artist, Long> {
}
