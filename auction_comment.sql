create table comment
(
    ID1     int          not null comment 'Người đánh giá',
    ID2     int          not null comment 'Người bị đánh giá',
    Date    datetime     not null,
    Score   tinyint(1)   not null,
    Opinion varchar(150) null,
    primary key (ID1, ID2)
)
    charset = utf8;

