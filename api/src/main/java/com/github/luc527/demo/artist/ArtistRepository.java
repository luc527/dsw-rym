package com.github.luc527.demo.artist;

import org.springframework.data.repository.ListCrudRepository;

public interface ArtistRepository extends ListCrudRepository<Artist, Long> {
}
