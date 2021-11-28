const interval = function (begin, end) {
    let beginTime = new Date(begin).getTime();
    let endTime = new Date(end).getTime();
    return endTime - beginTime;
}

function untilNow(begin) {
    let now = new Date().getTime();
    let beginTime = new Date(begin).getTime();

    return now - beginTime;
}

const OneSec = 1000;
const OneMin = 1000 * 60;
const OneHour = 1000 * 60 * 60;
const OneDay = 1000 * 60 * 60 * 24;

const list = [
    { ProID: "1", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: new Date(), EndDate: "2021-12-26", BidNumber: "100"},
    { ProID: "2", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-28T22:00:00", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "3", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "4", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "5", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
    { ProID: "6", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: "2021-11-21", EndDate: "2021-11-26", BidNumber: "100"},
    { ProID: "7", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-25", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "8", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "9", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "10", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
    { ProID: "11", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: "2021-11-21", EndDate: "2021-11-26", BidNumber: "100"},
    { ProID: "12", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-25", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "13", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "14", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "15", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
    { ProID: "16", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: "2021-11-21", EndDate: "2021-11-26", BidNumber: "100"},
    { ProID: "17", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-25", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "18", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "19", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "20", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
    { ProID: "21", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: "2021-11-21", EndDate: "2021-11-26", BidNumber: "100"},
    { ProID: "22", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-25", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "23", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "24", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "25", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
    { ProID: "26", ProName: "Sneaker ABC", Price: "1000000000", BidderID: "1", Bidder: "MR.Phong", PriceBuyNow: "1000000000", UploadDate: "2021-11-21", EndDate: "2021-11-26", BidNumber: "100"},
    { ProID: "27", ProName: "Clothes XYZ", Price: "300000", BidderID: "2",Bidder: "MissThu", PriceBuyNow: "", UploadDate: "2021-11-25", EndDate: "2022-02-01", BidNumber: "5"},
    { ProID: "28", ProName: "Cute Cat MNDdasdasdas", Price: "400000", BidderID: "3", Bidder: "RainDog", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-28", BidNumber: "13"},
    { ProID: "29", ProName: "Good Dog BAB", Price: "500000", BidderID: "4", Bidder: "RainCat", PriceBuyNow: "200000", UploadDate: "2021-11-21", EndDate: "2021-11-29", BidNumber: "414"},
    { ProID: "30", ProName: "Classes JKL", Price: "600000", BidderID: "5", Bidder: "SunnyMoon", PriceBuyNow: "300000", UploadDate: "2021-11-21", EndDate: "2021-11-30", BidNumber: "1241"},
];

export default {
    splitList(list, chunk) {
        let i,j, temporary;
        let result = [];
        for (i = 0,j = list.length; i < j; i += chunk) {
            temporary = list.slice(i, i + chunk);
            result.push(temporary);
        }
        return result;
    },
    findAll() {
        // check new items ( New items are uploaded 45 minutes ago )
        for (let x in list)
        {
            let distance = untilNow(list[x].UploadDate);
            list[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return list;
    },
    findByCat(CatId) {
        // check new items ( New items are uploaded 45 minutes ago )
        for (let x in list)
        {
            let distance = untilNow(list[x].UploadDate);
            list[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return list;
    },
    findTopEnd() {
        const chosen_products = list.slice(0, 5);
        // check new items ( New items are uploaded 45 minutes ago )
        for (let x in chosen_products)
        {
            let distance = untilNow(list[x].UploadDate);
            chosen_products[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return chosen_products;
    },

    findTopBid() {
        const chosen_products = list.slice(0, 5);
        // check new items ( New items are uploaded 45 minutes ago )
        for (let x in chosen_products)
        {
            let distance = untilNow(list[x].UploadDate);
            chosen_products[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return chosen_products;
    },

    findTopPrice() {
        const chosen_products = list.slice(0, 5);
        // check new items ( New items are uploaded 45 minutes ago )
        for (let x in chosen_products)
        {
            let distance = untilNow(list[x].UploadDate);
            chosen_products[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return chosen_products;
    }
}