package com.github.luc527.demo.album;

import java.util.List;

public interface AlbumRepositoryCustom {
    public List<Album> findByArtistId(Long artistId);
}
