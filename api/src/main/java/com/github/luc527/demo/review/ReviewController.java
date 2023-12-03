package com.github.luc527.demo.review;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*")
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

    @GetMapping("{id}")
    public Optional<ReviewDTO> findReviewById(@PathVariable Long id) {
        return reviewRepo.findById(id).map(ReviewDTO::from);
    }

    @PutMapping("{id}")
    public ReviewDTO saveReview(@RequestBody ReviewDTO dto, @PathVariable Long id) {
        var review = new Review();
        review.setId(id);
        review.setAuthor(dto.getAuthor());
        review.setRating(dto.getRating());
        review.setContent(dto.getContent());

        // HACK to solve some weird ORM bug
        review.setAlbum(reviewRepo.findById(dto.getId()).orElseThrow().getAlbum());

        return ReviewDTO.from(reviewRepo.save(review));
    }

    @DeleteMapping("{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewRepo.deleteById(id);
    }
}
