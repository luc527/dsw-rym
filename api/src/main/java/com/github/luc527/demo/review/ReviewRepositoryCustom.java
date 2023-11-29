package com.github.luc527.demo.review;

import java.util.List;

public interface ReviewRepositoryCustom {
    public List<Review> findByAlbumId(Long albumId);
    public List<Review> findByAuthor(String author);
}
