create table bid_history
(
    BID         int      not null,
    ProID       int      not null,
    Time        datetime not null,
    Price       decimal  not null,
    MaxPrice    decimal  not null,
    BID_current int      not null,
    primary key (BID, ProID, MaxPrice)
)
    charset = utf8;

INSERT INTO auction.bid_history (BID, ProID, Time, Price, MaxPrice, BID_current) VALUES (2, 4, '2021-12-03 11:02:59', 42000000, 50000000, 2);