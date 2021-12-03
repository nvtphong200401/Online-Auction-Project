create table product
(
    ProID       int auto_increment
        primary key,
    ProName     varchar(50)                            not null,
    Current_bid decimal                                not null,
    Buy_now     decimal                                null,
    SellerID    int                                    null,
    UploadDate  datetime   default current_timestamp() not null,
    EndDate     datetime                               null,
    TinyDesc    varchar(150)                           null,
    FullDesc    varchar(1000)                          null,
    CatID       int                                    not null,
    PriceStep   decimal                                null,
    AutoTime    tinyint(1) default 1                   not null,
    Quantity    int        default 0                   not null
)
    charset = utf8;

INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (1, 'Freshwater Cultured Pearl', 1500000, 5500000, null, '2021-12-02 22:08:16', '2022-07-04 09:32:16', 'Freshwater Cultured Pearl, Citrine, Peridot & Amethyst Bracelet, 7.5"', '<UL>
    <LI>Metal stamp: 14k </LI>
    <LI>Metal: yellow-ld</LI>
    <LI>Material Type: amethyst, citrine, ld, pearl, peridot</LI>
    <LI>Gem Type: citrine, peridot, amethyst</LI>
    <LI>Length: 7.5 inches</LI>
    <LI>Clasp Type: filigree-box</LI>
    <LI>Total metal weight: 0.6 Grams</LI>
</UL>
<STRONG>Pearl Information</STRONG><BR>
<UL>
    <LI>Pearl type: freshwater-cultured</LI>
</UL>
<STRONG>Packaging Information</STRONG><BR>
<UL>
    <LI>Package: Regal Blue Sueded-Cloth Pouch</LI>
</UL>', 9, 100000, 0, 83);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (2, 'Pink Sapphire Sterling Silver', 300000, 900000, null, '2021-12-02 08:32:16', '2022-03-15 15:32:16', '14 1/2 Carat Created Pink Sapphire Sterling Silver Bracelet w/ Diamond Accents', '<P><STRONG>Jewelry Information</STRONG></P>
<UL>
    <LI>Loại hàng: Hàng trong nước</LI>
</UL>
', 14, 100000, 1, 64);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (3, 'Torrini KC241', 1600000000, null, null, '2021-12-02 08:41:03', '2022-12-02 21:08:00', 'Nhẫn kim cương - vẻ đẹp kiêu sa', '<P>Không chỉ có kiểu dáng truyền thống chỉ có một hạt kim cương ở giữa, các nhà thiết kế đã tạo những những chiếc nhẫn vô cùng độc đáo và tinh tế. Tuy nhiên, giá của đồ trang sức này thì chỉ có dân chơi mới có thể kham được.</P>
<UL>
    <LI>Kiểu sản phẩm: Nhẫn nữ</LI>
    <LI>Loại đá: To paz</LI>
    <LI>Chất liệu: kim cương, nguyên liệu và công nghệ Italy...</LI>
    <LI>Đơn giá: 2,110,250 VND / Chiếc</LI>
</UL>
', 15, 100000, 0, 86);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (4, 'Torrini KC242', 42000000, null, null, '2021-12-02 08:41:03', '2022-01-27 06:32:16', 'tinh xảo và sang trọng', '<P>Để sở hữu một chiếc nhẫn kim cương lấp lánh trên tay, bạn phải là người chịu chi và sành điệu.<BR>
Với sự kết hợp khéo léo và độc đáo giữa kim cương và Saphia, Ruby... những chiếc nhẫn càng trở nên giá trị.</P>
<UL>
    <LI>Kiểu sản phẩm: Nhẫn nam</LI>
    <LI>Loại đá: To paz</LI>
    <LI>Chất liệu: Vàng tây 24K, nguyên liệu và công nghệ Italy...</LI>
</UL>
', 15, 100000, 1, 63);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (5, 'Nokia 7610', 2900000, 5900000, null, '2021-12-02 08:32:16', '2023-09-06 14:29:16', 'Độ phân giải cao, màn hình màu, chụp ảnh xuất sắc.', '<UL>
    <LI>Máy ảnh có độ phân giải 1 megapixel</LI>
    <LI>Màn hình 65.536 màu, rộng 2,1 inch, 176 X 208 pixel với đồ họa sắc nét, độ phân giải cao</LI>
    <LI>Quay phim video lên đến 10 phút với hình ảnh sắc nét hơn</LI>
    <LI>Kinh nghiệm đa phương tiện được tăng cường</LI>
    <LI>Streaming video &amp; âm thanh với RealOne Player (hỗ trợ các dạng thức MP3/AAC).</LI>
    <LI>Nâng cấp cho những đoạn phim cá nhân của bạn bằng các tính năng chỉnh sửa tự động thông minh</LI>
    <LI>In ảnh chất lượng cao từ nhà, văn phòng, kios và qua mạng</LI>
    <LI>Dễ dàng kết nối vớI máy PC để lưu trữ và chia sẻ (bằng cáp USB, PopPort, công nghệ Bluetooth)</LI>
    <LI>48 nhạc chuông đa âm sắc, True tones. Mạng GSM 900 / GSM 1800 / GSM 1900</LI>
    <LI>Kích thước 109 x 53 x 19 mm, 93 cc</LI>
    <LI>Trọng lượng 118 g</LI>
    <LI>Hiển thị: Loại TFT, 65.536 màu</LI>
    <LI>Kích cở: 176 x 208 pixels </LI>
</UL>
', 7, 100000, 0, 0);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (6, 'Áo thun nữ', 180000, null, null, '2021-12-02 08:41:36', '2022-02-04 09:32:16', 'Màu sắc tươi tắn, kiểu dáng trẻ trung', '<UL>
    <LI>Loại hàng: Hàng trong nước</LI>
    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>
</UL>
', 9, 100000, 1, 62);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (7, 'Simen AP75', 2800000, 8880000, null, '2021-12-02 08:32:16', '2024-08-07 09:32:16', 'Thiết kế tinh xảo, hiện đại', '<UL>
    <LI>Hình ảnh hoàn hảo, rõ nét ở mọi góc màn hình</LI>
    <LI>Giảm thiểu sự phản chiếu ánh sáng</LI>
    <LI>Menu hiển thị tiếng Việt</LI>
    <LI>Hệ thống hình ảnh thông minh</LI>
    <LI>Âm thanh Hifi Stereo mạnh mẽ</LI>
    <LI>Hệ thống âm lượng thông minh</LI>
    <LI>Bộ nhớ 100 chương trình</LI>
    <LI>Chọn kênh ưa thích</LI>
    <LI>Các kiểu sắp đặt sẵn hình ảnh / âm thanh</LI>
    <LI>Kích thước (rộng x cao x dày): 497 x 458 x 487mm</LI>
    <LI>Trọng lượng: 25kg</LI>
    <LI>Màu: vàng, xanh, bạc </LI>
</UL>
', 7, 100000, 1, 15);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (8, 'Áo bé trai', 270000, 10000000, null, '2021-12-02 08:32:16', '2022-07-11 05:32:16', 'Hóm hỉnh dễ thương', '<UL>
    <LI>Quần áo bé trai</LI>
    <LI>Loại hàng: Hàng trong nước</LI>
    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>
</UL>
', 8, 100000, 0, 74);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (9, 'Bông tai nạm hạt rubby', 2400000, null, null, '2021-12-02 08:42:00', '2025-08-11 09:32:16', 'Trẻ trung và quý phái', '<UL>
    <LI>Tên sản phẩm: Bông tai nạm hạt rubby</LI>
    <LI>Đóng nhãn hiệu: Torrini</LI>
    <LI>Nguồn gốc, xuất xứ: Italy</LI>
    <LI>Hình thức thanh toán: L/C T/T M/T CASH</LI>
    <LI>Thời gian giao hàng: trong vòng 3 ngày kể từ ngày mua</LI>
    <LI>Chất lượng/chứng chỉ: od</LI>
</UL>
', 15, 100000, 1, 43);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (10, 'Đầm dạ hội ánh kim', 2800000, null, null, '2021-12-02 08:42:00', '2022-08-11 22:32:16', 'Đủ màu sắc - kiểu dáng', '<UL>
    <LI>Màu sắc: Khuynh hướng ánh kim có thể thể hiện trên vàng, bạc, đỏ tía, xanh biển, vàng tím, trắng và đen.</LI>
    <LI>Một số biến tấu mang tính vui nhộn là vàng chanh, màu hoa vân anh và ngọc lam; trong đó hoàng kim và nhũ bạc khá phổ biến.</LI>
    <LI>Phong cách: Diềm đăng ten, rủ xuống theo chiều thẳng đứng, nhiều lớp, cổ chẻ sâu, eo chít cao tới ngực... được biến tấu tùy theo mỗi nhà thiết kế.</LI>
</UL>
', 9, 100000, 1, 80);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (11, 'Dây chuyền ánh bạc', 250000, 125000, null, '2021-12-02 08:32:16', '2022-10-06 21:32:16', 'Kiểu dáng mới lạ', '<UL>
    <LI>Chất liệu chính: Bạc</LI>
    <LI>Màu sắc: Bạc</LI>
    <LI>Chất lượng: Mới</LI>
    <LI>Phí vận chuyển: Liên hệ</LI>
    <LI>Giá bán có thể thay đổi tùy theo trọng lượng và giá vàng của từng thời điểm.</LI>
</UL>
', 14, 100000, 0, 88);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (12, 'Đồ bộ bé gái', 120000, null, null, '2021-12-02 08:42:28', '2022-11-12 02:32:16', 'Đủ màu sắc - kiểu dáng', '<UL>
    <LI>Màu sắc: đỏ tía, xanh biển, vàng tím, trắng và đen.</LI>
    <LI>Xuất xứ: Tp. Hồ Chí Minh</LI>
    <LI>Chất liệu: cotton</LI>
    <LI>Loại hàng: hàng trong nước</LI>
</UL>
', 9, 100000, 1, 61);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (13, 'Đầm dạ hội Xinh Xinh', 2600000, null, null, '2021-12-02 08:42:28', '2022-05-29 19:25:16', 'Đơn giản nhưng quý phái', '<P>Những đường cong tuyệt đẹp sẽ càng được phô bày khi diện các thiết kế này.</P>
<UL>
    <LI>Nét cắt táo bạo ở ngực giúp bạn gái thêm phần quyến rũ, ngay cả khi không có trang&nbsp; sức nào trên người.</LI>
    <LI>Đầm hai dây thật điệu đà với nơ xinh trước ngực nhưng trông bạn vẫn toát lên vẻ tinh nghịch và bụi bặm nhờ thiết kế đầm bí độc đáo cùng sắc màu sẫm.</LI>
    <LI>Hãng sản xuất: NEM</LI>
    <LI>Kích cỡ : Tất cả các kích cỡ</LI>
    <LI>Kiểu dáng : Quây/Ống</LI>
    <LI>Chất liệu : Satin</LI>
    <LI>Màu : đen, đỏ</LI>
    <LI>Xuất xứ : Việt Nam</LI>
</UL>
', 9, 100000, 0, 92);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (14, 'Đầm dạ hội NEM', 1200000, 2200000, null, '2021-12-02 08:32:16', '2022-09-09 18:32:22', 'Táo bạo và quyến rũ', '<P>Những đường cong tuyệt đẹp sẽ càng được phô bày khi diện các thiết kế này.</P>
<UL>
    <LI>Nét cắt táo bạo ở ngực giúp bạn gái thêm phần quyến rũ, ngay cả khi không có trang&nbsp; sức nào trên người.</LI>
    <LI>Đầm hai dây thật điệu đà với nơ xinh trước ngực nhưng trông bạn vẫn toát lên vẻ tinh nghịch và bụi bặm nhờ thiết kế đầm bí độc đáo cùng sắc màu sẫm.</LI>
    <LI>Hãng sản xuất: NEM</LI>
    <LI>Kích cỡ : Tất cả các kích cỡ</LI>
    <LI>Kiểu dáng : Quây/Ống</LI>
    <LI>Chất liệu : Satin</LI>
    <LI>Màu : đen, đỏ</LI>
    <LI>Xuất xứ : Việt Nam</LI>
</UL>
', 9, 100000, 1, 0);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (15, 'Dây chuyền đá quý', 1925000, null, null, '2021-12-02 08:42:42', '2022-06-09 10:28:16', 'Kết hợp vàng trắng và đá quý', '<UL>
    <LI>Kiểu sản phẩm: Dây chuyền</LI>
    <LI>Chất liệu: Vàng trắng 14K và đá quý, nguyên liệu và công nghệ Italy...</LI>
    <LI>Trọng lượng chất liệu: 1.1 Chỉ </LI>
</UL>
', 14, 100000, 0, 22);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (16, 'Nokia N72', 3200000, 6400000, null, '2021-12-02 08:32:16', '2022-09-27 06:32:16', 'Sành điệu cùng N72', '<UL>
    <LI>Camera mega pixel : 2 mega pixel</LI>
    <LI>Bộ nhớ trong : 16 - 31 mb</LI>
    <LI>Chức năng : quay phim, ghi âm, nghe đài FM</LI>
    <LI>Hỗ trợ: Bluetooth, thẻ nhớ nài, nhạc MP3 &lt;br/&gt;</LI>
    <LI>Trọng lượng (g) : 124g</LI>
    <LI>Kích thước (mm) : 109 x 53 x 21.8 mm</LI>
    <LI>Ngôn ngữ : Có tiếng việt</LI>
    <LI>Hệ điều hành: Symbian OS 8.1</LI>
</UL>
', 7, 100000, 1, 81);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (17, 'Mặt dây chuyền Ruby', 1820000, 5000000, null, '2021-12-02 08:32:16', '2022-06-19 09:42:16', 'Toả sáng cùng Ruby', '<UL>
    <LI>Kiểu sản phẩm:&nbsp; Mặt dây</LI>
    <LI>Chất liệu: Vàng trắng 14K, nguyên liệu và công nghệ Italy...</LI>
    <LI>Trọng lượng chất liệu: 0.32 Chỉ</LI>
</UL>
', 14, 100000, 0, 33);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (18, '1/2 Carat Pink Sapphire Silver', 3400000, null, null, '2021-12-02 08:42:57', '2022-11-24 09:32:25', 'Created Pink Sapphire', '<UL>
    <LI>Brand Name: Ice.com</LI>
    <LI>Material Type: sterling-silver, created-sapphire, diamond</LI>
    <LI>Gem Type: created-sapphire, Diamond</LI>
    <LI>Minimum total gem weight: 14.47 carats</LI>
    <LI>Total metal weight: 15 Grams</LI>
    <LI>Number of stones: 28</LI>
    <LI>Created-sapphire Information</LI>
    <LI>Minimum color: Not Available</LI>
</UL>
', 15, 100000, 1, 10);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (19, 'Netaya', 1820000, null, null, '2021-12-02 08:42:57', '2022-02-02 10:57:20', 'Dây chuyền vàng trắng', '<UL>
    <LI>Kiểu sản phẩm:&nbsp; Dây chuyền</LI>
    <LI>Chất liệu: Vàng tây 18K, nguyên liệu và công nghệ Italy...</LI>
    <LI>Trọng lượng chất liệu: 1 Chỉ</LI>
</UL>
', 14, 100000, 1, 17);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (20, 'Giày nam GN16', 540000, 9500000, null, '2021-12-02 08:32:16', '2022-03-10 16:30:58', 'Êm - đẹp - bề', '<UL>
    <LI>Loại hàng: Hàng trong nước</LI>
    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>
    <LI>Giá: 300 000 VNĐ</LI>
</UL>
', 8, 100000, 0, 0);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (21, 'G3.370A', 300000, 1300000, null, '2021-12-02 08:32:16', '2026-10-07 14:37:19', 'Đen bóng, sang trọng', '<UL>
    <LI>Loại hàng: Hàng trong nước</LI>
    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>
</UL>
', 8, 100000, 1, 74);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (22, 'Giày nữ GN1', 290000, null, null, '2021-12-02 08:43:12', '2022-02-07 12:25:11', 'Kiểu dáng thanh thoát', '<UL>
    <LI>Loại hàng: Hàng trong nước</LI>
    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>
</UL>
', 9, 100000, 1, 30);
INSERT INTO auction.product (ProID, ProName, Current_bid, Buy_now, SellerID, UploadDate, EndDate, TinyDesc, FullDesc, CatID, PriceStep, AutoTime, Quantity) VALUES (23, 'Motorola W377', 2400000, null, null, '2021-12-02 08:43:44', '2023-09-14 20:28:11', 'Nữ tính - trẻ trung', '<UL>
    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>
    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>
    <LI>Weight: 95 g</LI>
    <LI>Display: type TFT, 65K colors</LI>
    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>
</UL>
', 7, 100000, 1, 0);