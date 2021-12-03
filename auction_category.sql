create table category
(
    CatID     int auto_increment
        primary key,
    CatName   varchar(50) not null,
    CatParent int         null,
    constraint CatName
        unique (CatName)
)
    charset = utf8;

INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (1, 'Đồ điện tử', null);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (2, 'Thời trang', null);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (3, 'Mỹ phẩm', null);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (4, 'Nội thất', null);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (5, 'Trang sức', null);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (6, 'Laptop', 1);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (7, 'Điện thoại', 1);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (8, 'Quần áo Nam', 2);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (9, 'Quần áo Nữ', 2);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (10, 'Son', 3);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (11, 'Nước hoa', 3);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (12, 'Bàn', 4);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (13, 'Ghế', 4);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (14, 'Dây chuyền', 5);
INSERT INTO auction.category (CatID, CatName, CatParent) VALUES (15, 'Vòng tay', 5);