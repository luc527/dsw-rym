package com.github.luc527.demo.genre;

import java.util.List;

public interface GenreRepositoryCustom {
    public List<Genre> saveAllByName(List<String> names);
}
