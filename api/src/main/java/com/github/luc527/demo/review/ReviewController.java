package com.github.luc527.demo.review;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private ReviewRepository reviewRepo;

    public ReviewController(ReviewRepository reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    @GetMapping("author/{author}")
    public List<AuthorReviewDTO> findByAuthor(@PathVariable String author) {
        return reviewRepo.findByAuthor(author)
            .stream()
            .map(AuthorReviewDTO::from)
            .toList();
    }

    @DeleteMapping("{reviewId}")
    public void deleteReview(@PathVariable Long id) {
        reviewRepo.deleteById(id);
    }
}
