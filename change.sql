create
or
replace table banned_bidder
(
    BID int not null,
    ProID int not null,
    constraint `PRIMARY`
    primary key (BID, ProID)
)
charset=utf8;

create
or
replace table bid_history
(
    BID int not null,
    ProID int not null,
    Time datetime not null,
    Price decimal not null,
    MaxPrice decimal not null,
    BID_current int not null,
    constraint `PRIMARY`
    primary key (BID, ProID, MaxPrice)
)
charset=utf8;

create
or
replace table category
(
    CatID int auto_increment
    constraint `PRIMARY`
    primary key,
    CatName varchar (50) not null,
    CatParent int null,
    constraint CatName
    unique (CatName)
)
charset=utf8;

create
or
replace table comment
(
    ID1 int not null comment 'Người đánh giá',
    ID2 int not null comment 'Người bị đánh giá',
    Date datetime not null,
    Score tinyint (1) not null,
    Opinion varchar (150) null,
    constraint `PRIMARY`
    primary key (ID1, ID2)
)
charset=utf8;

create
or
replace table product
(
    ProID int auto_increment
    constraint `PRIMARY`
    primary key,
    ProName varchar (50) not null,
    Current_bid decimal not null,
    Buy_now decimal null,
    SellerID int null,
    UploadDate datetime default current_timestamp () not null,
    EndDate datetime null,
    TinyDesc varchar (150) null,
    FullDesc varchar (1000) null,
    CatID int not null,
    PriceStep decimal null,
    AutoTime tinyint (1) default 1 not null,
    Quantity int default 0 not null
)
charset=utf8;

create
or
replace table user
(
    ID int auto_increment
    constraint `PRIMARY`
    primary key,
    Username varchar (50) not null,
    FullName varchar (50) not null,
    Password varchar (500) not null,
    DOB date not null,
    Email varchar (50) not null,
    Role int default 3 not null,
    Pending int default 0 not null,
    constraint Username
    unique (Username)
)
charset=utf8;

create
or
replace table watchlist
(
    BID int not null,
    ProID int not null,
    constraint `PRIMARY`
    primary key (BID, ProID)
)
charset=utf8;


