        //Time
        const timecont = document.querySelector('.logo');
        function time() {
            let time = new Date();
            let hour = time.getHours();
            let min = (time.getMinutes() < 10) ? `0${time.getMinutes()}`: time.getMinutes();
            let ext = (hour >= 12) ? 'PM' : 'AM';
            let hournew = ['12','1','2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1','2','3', '4', '5', '6', '7', '8', '9', '10', '11'];
            timecont.innerHTML = hournew[hour] +" <span class='dot'> : </span> "+ min + " " + ext;
        }
        setInterval(time, 1000);