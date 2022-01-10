$(document).ready(function () {
    $('#option2').click(function (e) {
        $('.bid').hide('500');
        $('.buy').show('500');
        console.log("test")
    });
    $('#option1').click(function (e) {
        $('.bid').show('500');
        $('.buy').hide('500');
    });
    if ($('.time-left').html() === 'END') {
        $('.bidForm').html('<h5 style="display: inline; color:red">Unavailable to bid</h5>')
    }
});
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years';   
    }
};
const uploadDate =  function PostDate(className, postDate) {
    const now = new Date().getTime();
    const previous = new Date(postDate).getTime();
    $('.' + className).html('Uploaded ' + timeDifference(now, previous) +' ago');
}
const remainingDate = function (className, endTime) {
    const now = new Date().getTime();
    const future = new Date(endTime).getTime();
    const elapsed = future - now;
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    if(elapsed < 3*msPerDay){
        if (elapsed < 1*msPerDay) {
            if (elapsed < 1*msPerHour) {
                if (elapsed < 1*msPerMinute) {
                    if (elapsed <= 0) {
                        $('.' + className).html('END');
                    }
                    // hien giay
                    else {
                        f(className, endTime);
                    }
                }
                // hien phut
                else {
                    $('.' + className).html(Math.floor(elapsed/msPerMinute) + ' min(s)')
                }
            }
            // hien gio
            else {
                $('.' + className).html(Math.floor(elapsed/msPerHour) + ' hour(s)');
            }
        }
        else {
            $('.' + className).html(Math.floor(elapsed/msPerDay) + ' day(s)');
        }
    }
    else {
        f(className, endTime);
    }
}

const f = function (className, endTime) {
    let myfunc = function (className, time) {

        let countDownDate = new Date(time).getTime();
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let str = "";
        if (days > 0) {
            str += days + "d ";
        }
        if (days > 0 || hours > 0) {
            str += hours + "h ";
        }
        if (days > 0 || hours > 0 || minutes > 0) {
            str += minutes + "m ";
        }
        if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
            str += seconds + "s";
        }
        // Output the result in all elements with className="demo"
        if (days === 0) {
            for (let textDangerElement of document.getElementsByClassName(className)) {
                textDangerElement += 'text-danger';
            }
        }
        for (let element of document.getElementsByClassName(className)) {
            element.innerHTML = str;
        }

        // If the count down is over, write some text
        if (distance < 0) {
            $('.' + className).html("Ended");
            $('.' + className).addClass('text-danger');
            clearInterval(x);
        }
        console.log('Running')
    }
    myfunc(className, endTime);
    // Update the count down every 1 second
    let x = setInterval(myfunc, 1000, className, endTime);
}
