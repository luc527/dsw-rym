package com.github.luc527.demo.review;

import org.springframework.data.repository.ListCrudRepository;

public interface ReviewRepository extends ListCrudRepository<Review, Long>, ReviewRepositoryCustom {
}
