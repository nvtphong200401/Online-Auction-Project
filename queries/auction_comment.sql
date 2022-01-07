create table comment
(
    ID1     int                                  not null comment 'Người đánh giá',
    ID2     int                                  not null comment 'Người bị đánh giá',
    Date    datetime default current_timestamp() null,
    Score   tinyint(1)                           not null,
    Opinion varchar(150)                         null,
    ProID   int                                  not null,
    primary key (ID1, ID2, ProID)
)
    charset = utf8;

INSERT INTO auction.comment (ID1, ID2, Date, Score, Opinion, ProID) VALUES (1, 4, '2021-12-31 10:57:19', 1, 'Người bán hàng quá đẹp trai và tốt bụng', 1);
INSERT INTO auction.comment (ID1, ID2, Date, Score, Opinion, ProID) VALUES (2, 4, '2021-12-31 11:01:42', 0, 'Mua hàng không trả tiền ??? Sống lỗi quá vậy :(', 2);
INSERT INTO auction.comment (ID1, ID2, Date, Score, Opinion, ProID) VALUES (4, 1, '2021-12-31 10:59:35', 1, 'Mua hàng và trả tiền siêu nhanh. Good +1', 1);
INSERT INTO auction.comment (ID1, ID2, Date, Score, Opinion, ProID) VALUES (4, 2, '2021-12-31 11:02:07', 0, 'Thích thì không trả đấy làm gì đươc nhau', 2);