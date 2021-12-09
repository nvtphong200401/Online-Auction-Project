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
});
let countDown = function (className, endTime) {

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
            clearInterval(x);
            document.getElementById(className).innerHTML = "Ended";
        }
        console.log("Running")
    }

    // Update the count down every 1 second
    let x = setInterval(myfunc, 1000, className, endTime);
}

const f = function (className, endDate) {
    countDown(className, endDate);
}
