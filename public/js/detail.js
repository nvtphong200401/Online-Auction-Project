$(document).ready(function () {
    $('.bidForm').submit((e) => {

        var currentHighest = $('.price > h5').html().split(' ');
        currentHighest = numeral(currentHighest[1]).value();
        const currentBid = numeral($('#bidprice').val()).value();
        var buyPrice = [99999999];
        try {
            buyPrice = $('.buynow > h5 > div').html().trim().split(' ');
        } catch (error) {
            
        } 
        buyPrice = numeral(buyPrice[0]).value();
        if(currentHighest > currentBid){
            $('.price').append('<div class="alert alert-danger" role="alert">Your bid is lower than the highest price! Please make a higher bid</div>')
            e.preventDefault();
        }
        else if (buyPrice && buyPrice !== 0 && currentBid > buyPrice){
            $('.price').append('<div class="alert alert-warning" role="alert">You can buy now with that amount of money! Please click Buy now button</div>')
            e.preventDefault();
        }
        
    })
})