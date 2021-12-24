$(document).ready(function () {
    $('.bidForm').submit((e) => {
        var currentHighest = $('.price > h5').html().split(' ');
        currentHighest = currentHighest[1];
        const currentBid = $('#bidprice').val();
        if(currentHighest > currentBid){
            $('.price').append('<div class="alert alert-danger" role="alert">Your bid is lower than the highest price! Please make a higher bid</div>')
            e.preventDefault();
        }
    })
})