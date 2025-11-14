let question = document.querySelector(".question")
let answers = document.querySelectorAll(".answer")

let difficulty = document.querySelector(".difficulty")

let correct = document.querySelector(".cor")
let incorrect = document.querySelector(".incor")
let precent = document.querySelector(".prec")

difficulty.innerHTML = "Easy"
let minimum = 1
let maximum = 10

let edit = document.querySelector(".edit")
let edit2 = document.querySelector(".edit2")

let bn10 = document.querySelector(".bn10")
let bn1 = document.querySelector(".bn1")
let bcmin = document.querySelector(".bcmin")
let b1 = document.querySelector(".b1")
let b10 = document.querySelector(".b10")

let an10 = document.querySelector(".an10")
let an1 = document.querySelector(".an1")
let acmax = document.querySelector(".acmax")
let a1 = document.querySelector(".a1")
let a10 = document.querySelector(".a10")


difficulty.addEventListener("click", function () {
    if (difficulty.innerHTML == "Easy") {
        difficulty.innerHTML = "Medium"
        minimum = 1
        maximum = 30
        restart()
    }
    else if (difficulty.innerHTML == "Medium") {
        difficulty.innerHTML = "Hard"
        minimum = -100
        maximum = 100
        restart()
    }
    else if (difficulty.innerHTML == "Hard") {
        difficulty.innerHTML = "Torture"
        minimum = -1000
        maximum = 1000
        restart()
    }

    else if (difficulty.innerHTML == "Torture") {
        difficulty.innerHTML = "Custom"
        minimum = 0
        maximum = 0
        acmax.innerHTML = "Maximum"
        bcmin.innerHTML = "Minimum"
        edit.style.scale = "0.5"
        edit2.style.scale = "0.5"

        restart()
    }
    else {
        difficulty.innerHTML = "Easy"
        minimum = 1
        maximum = 10
        edit.style.scale = "0"
        edit2.style.scale = "0"
        restart()
    }

})

function restart() {
    current_question = new Question()
    current_question.display()
    correct.innerHTML = 0
    incorrect.innerHTML = 0
    precent.innerHTML = "%"
    question_counter = 0
}





function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ["+", "-", "*", "/"]

function getRandomSign() {
    return signs[randint(0, 3)]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    }
}

class Question {
    constructor() {
        let a = randint(minimum, maximum)
        let b = randint(minimum, maximum)
        let sign = getRandomSign()


        if (sign == "/") {
            this.question = `${a * b}${sign}${b}`
        }
        else {
            this.question = `${a} ${sign} ${b}`
        }

        if (sign == "+") {
            this.correct = a + b
        } else if (sign == "-") {
            this.correct = a - b
        } else if (sign == "/") {
            this.correct = a
        } else if (sign == "*") {
            this.correct = a * b
        }

        this.answers = [
            randint(this.correct - 15, this.correct + 15),
            randint(this.correct - 15, this.correct + 15),
            this.correct,
            randint(this.correct - 15, this.correct + 15),
            randint(this.correct - 15, this.correct + 15),
        ]

        shuffle(this.answers)
    }

    display() {
        question.innerHTML = this.question
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = this.answers[i]
        }
    }

}




let question_counter = 0

let current_question = new Question()

current_question.display()

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function () {
        if (answers[i].innerHTML == current_question.correct) {
            correct.innerHTML = +correct.innerHTML + 1
            precent.innerHTML = Math.round(+correct.innerHTML / (+correct.innerHTML + +incorrect.innerHTML) * 100) + "%"
            answers[i].style.backgroundColor = "#00FF00"
            anime({
                targets: answers[i],
                backgroundColor: "#rgba(0, 0, 0, 0)",
                delay: 100,
                duration: 50,
                easing: "linear"
            })

        } else {
            incorrect.innerHTML = +incorrect.innerHTML + 1
            precent.innerHTML = Math.round(+correct.innerHTML / (+correct.innerHTML + +incorrect.innerHTML) * 100) + "%"
            answers[i].style.backgroundColor = "#FF0000"
            anime({
                targets: answers[i],
                backgroundColor: "rgba(0, 0, 0, 0)",
                delay: 100,
                duration: 50,
                easing: "linear"
            })
        }
        question_counter++
        current_question = new Question()
        current_question.display()

    })
}


bn10.addEventListener("click", function () {
    minimum = minimum - 10
    bcmin.innerHTML = minimum
    restart()
})
bn1.addEventListener("click", function () {
    minimum = minimum - 1
    bcmin.innerHTML = minimum
    restart()
})
b10.addEventListener("click", function () {
    minimum = minimum + 10
    bcmin.innerHTML = minimum
    restart()
})
b1.addEventListener("click", function () {
    minimum = minimum + 1
    bcmin.innerHTML = minimum
    restart()
})

an10.addEventListener("click", function () {
    maximum = maximum - 10
    acmax.innerHTML = maximum
    restart()
})
an1.addEventListener("click", function () {
    maximum = maximum - 1
    acmax.innerHTML = maximum
    restart()
})
a10.addEventListener("click", function () {
    maximum = maximum + 10
    acmax.innerHTML = maximum
    restart()
})
a1.addEventListener("click", function () {
    maximum = maximum + 1
    acmax.innerHTML = maximum
    restart()
})
