create or replace table comment
(
	ID1 int not null comment 'Người đánh giá',
	ID2 int not null comment 'Người bị đánh giá',
	Date datetime default current_timestamp() null,
	Score tinyint(1) not null,
	Opinion varchar(150) null,
	ProID int not null,
	constraint `PRIMARY`
		primary key (ID1, ID2, ProID)
)
charset=utf8;

