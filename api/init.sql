create table genre (
    id serial primary key,
    name text
);

create table artist (
    id serial primary key,
    name text
);

create table artist_genres (
    artist_id bigint references artist (id),
    genre_id bigint references genre (id),
    primary key (artist_id, genre_id)
);