package com.github.luc527.demo.album;

import org.springframework.data.repository.ListCrudRepository;

public interface AlbumRepository extends ListCrudRepository<Album, Long>, AlbumRepositoryCustom {
}
