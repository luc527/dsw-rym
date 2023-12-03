package com.github.luc527.demo.album;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.luc527.demo.genre.GenreRepository;
import com.github.luc527.demo.review.AlbumReviewDTO;
import com.github.luc527.demo.review.ReviewRepository;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/albums")
public class AlbumController {

    private GenreRepository genreRepo;
    private AlbumRepository albumRepo;
    private ReviewRepository reviewRepo;

    public AlbumController(GenreRepository genreRepo, AlbumRepository albumRepo, ReviewRepository reviewRepo) {
        this.genreRepo = genreRepo;
        this.albumRepo = albumRepo;
        this.reviewRepo = reviewRepo;
    }

    @GetMapping("{id}")
    public Optional<AlbumDTO> findById(@PathVariable Long id) {
        return albumRepo.findById(id).map(AlbumDTO::from);
    }

    @PutMapping("{id}")
    public AlbumDTO saveAlbum(@RequestBody AlbumDTO dto, @PathVariable Long id) {
        var album = albumRepo.findById(id).orElseThrow();
        album.setTitle(dto.getTitle());
        album.setReleaseDate(dto.getReleaseDate());
        album.setGenres(genreRepo.saveAllByName(dto.getGenres()));
        return AlbumDTO.from(albumRepo.save(album));
    }

    @DeleteMapping("{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumRepo.deleteById(id);
    }

    // TODO endpoint with search + pagination + sort
    @GetMapping
    public List<AlbumDTO> findAll() {
        return albumRepo.findAll()
            .stream()
            .map(AlbumDTO::from)
            .toList();
    }

    // TODO reviews also with search + pagination + sort
    @GetMapping("{id}/reviews")
    public List<AlbumReviewDTO> findAllReviews(@PathVariable Long id) {
        return reviewRepo.findByAlbumId(id)
            .stream()
            .map(AlbumReviewDTO::from)
            .toList();
    }

    @PostMapping("{albumId}/reviews")
    public AlbumReviewDTO saveReview(@RequestBody AlbumReviewDTO dto, @PathVariable Long albumId) {
        var album = albumRepo.findById(albumId).orElseThrow();
        var review = dto.toReview();
        review.setAlbum(album);
        review = reviewRepo.save(review);
        return AlbumReviewDTO.from(review);
    }

}
