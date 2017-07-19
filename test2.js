/*
function printLater(number) {
    setTimeout(
        function() { 
            console.log(number); 
        },
        1000
    );
}

printLater(1);
*/

/*
function printLater(number, fn) {
    setTimeout(
        function() { console.log(number); fn(); },
        1000
    );
}

printLater(1, function() {
    printLater(2, function() {
        printLater(3, function() {
            printLater(4);
        })
    })
})
*/

function printLater(number) {
    return new Promise( // new로 Promise 생성
        resolve => {
            setTimeout( // 1초뒤 실행하도록 설정
                () => {
                    console.log(number);
                    resolve(); // promise 종료
                },
                1000
            )
        }
    )
}
 
 
printLater(1)
.then(() => printLater(2))
.then(() => printLater(3))
.then(() => printLater(4))
.then(() => printLater(5))
.then(() => printLater(6))