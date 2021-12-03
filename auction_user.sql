create table user
(
    ID       int auto_increment
        primary key,
    Username varchar(50)   not null,
    FullName varchar(50)   not null,
    Password varchar(500)  not null,
    DOB      date          not null,
    Email    varchar(50)   not null,
    Role     int default 3 not null,
    Pending  int default 0 not null,
    constraint Username
        unique (Username)
)
    charset = utf8;

INSERT INTO auction.user (ID, Username, FullName, Password, DOB, Email, Role, Pending) VALUES (1, 'admin', 'admin', '$2a$12$yKN06N8iAi57JPT1o8TQzOT64x3mMsL15tbXlApl4IXfYUdA4j0vC', '2001-04-20', 'nvtphong19@clc.fitus.edu.vn', 1, 0);
INSERT INTO auction.user (ID, Username, FullName, Password, DOB, Email, Role, Pending) VALUES (2, 'nvtPhong', 'Nguyễn Văn Tấn Phong', '123', '2001-12-05', 'nvtphong19@clc.fitus.edu.vn', 0, 0);
INSERT INTO auction.user (ID, Username, FullName, Password, DOB, Email, Role, Pending) VALUES (3, 'tgHy', 'Trần Gia Hy', '123', '2000-12-15', 'tghy@gmail.com', 0, 0);
INSERT INTO auction.user (ID, Username, FullName, Password, DOB, Email, Role, Pending) VALUES (4, 'pvgiai', 'Phan Vĩ Giai', '123', '1999-04-15', 'pvgiai19@clc.fitus.edu.vn', 0, 0);
INSERT INTO auction.user (ID, Username, FullName, Password, DOB, Email, Role, Pending) VALUES (5, 'tthieu', 'Trần Trung Hiếu', '123', '2001-12-07', 'tthieu19@clc.fitus.edu.vn', 0, 0);