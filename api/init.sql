create table genre (
    id serial primary key,
    name text
);

create table artist (
    id serial primary key,
    name text
);

create table artist_genre (
    artist_id bigint references artist (id),
    genre_id bigint references genre (id),
    primary key (artist_id, genre_id)
);

create table album (
    id serial primary key,
    artist_id bigint references artist(id),
    title text,
    release_date date
);

create table album_genre (
    album_id bigint references album(id),
    genre_id bigint references genre(id),
    primary key (album_id, genre_id)
)

create table review (
    id serial primary key,
    author text,
    rating int,
    content text,
    publication_date date default current_timestamp,
    update_date date default current_timestamp,
    album_id bigint references album(id),
    check (rating >= 0 and rating <= 10)
);