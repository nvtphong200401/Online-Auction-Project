create table banned_bidder
(
    BID   int not null,
    ProID int not null,
    primary key (BID, ProID)
)
    charset = utf8;

