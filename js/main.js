'use strict'

{
  const header = document.getElementById('header');
  const questionType = document.getElementById('questionType');
  const content = document.getElementById('content');
  const fieldset = document.querySelector('fieldset');

  class Answer {
    constructor(question) {
      this.quiz = question.quiz;
      this.question = question;
      this.data = question.data;
      this.el = document.createElement('input');
      this.el.type = 'button';
      this.el.addEventListener('click', () => {
        if (this.el.value === 'ホームに戻る') {
          this.question.clearButton();
          this.quiz.setHome();
          const start = ['開始'];
          this.question.createButtons(start);
        } else if (this.el.value !== '開始') {
          this.check();
        }
      });
    }

    setButtonText(text) {
      this.el.value = text;
    }

    getEl() {
      return this.el;
    }

    check() {
      if (this.quiz.getQuizCount() < this.data.length - 1) {
        this.quiz.addQuizCount();
        if (this.el.value === this.question.correctAnswer) {
          this.quiz.addCorrentNum();
        }
        this.question.progress();
      } else {
        this.question.endQuiz();
      }
    }
  }

  class Question {
    constructor(data, quiz) {
      this.data = data;
      this.quiz = quiz;
      this.progress();
    }
    progress() {
      this.clearButton();
      header.textContent = `問題${this.quiz.getQuizCount() + 1}`;
      questionType.innerText = `[ジャンル]${this.data[this.quiz.getQuizCount()].category} \n[難易度]${this.data[this.quiz.getQuizCount()].difficulty}`;
      content.textContent = this.data[this.quiz.getQuizCount()].question;
      this.correctAnswer = this.data[this.quiz.getQuizCount()].correct_answer;
      this.incorrectAnswers = this.data[this.quiz.getQuizCount()].incorrect_answers;
      this.answers = [this.correctAnswer,...this.incorrectAnswers];
      this.createButtons(this.answers);
    }

    createButtons(contents) {
      this.buttons = [];
      for (let i = 0; i < contents.length; i++) {
        this.buttons.push(new Answer(this));
      }
 
      this.buttons.forEach(button => {
        const text = contents.splice(Math.floor(Math.random() * this.answers.length), 1)[0];
        button.setButtonText(text);
        fieldset.appendChild(button.getEl());
      });
    }

    clearButton() {
      while (fieldset.firstChild) {
        fieldset.removeChild(fieldset.firstChild);
      }
    }

    endQuiz() {
      header.textContent = `あなたの正解数は${this.quiz.getCorrectNum()}です！！`;
      questionType.innerText = '';
      content.textContent = '再チャレンジしたい場合は以下をクリック！！';
      this.clearButton();
      const home = ['ホームに戻る']
      this.createButtons(home);
    }

  }

  class Quiz {
    constructor() {
      this.fetchAPI();
      this.correctNum = 0;
      this.quizCount = 0;
    }
    fetchAPI() {
      header.textContent = '取得中';
      questionType.innerText = '';
      content.textContent = '少々お待ちください。';
      const startButton = document.querySelector('input');
      fieldset.removeChild(startButton);
      fetch("https://opentdb.com/api.php?amount=10")
        .then(response => {
          return response.json();
        })
        .then(data => {
          new Question(data.results, this);
        })
        .catch(error => {
          console.log("失敗しました");
        });
    }

    setHome() {
      this.correctNum = 0;
      this.quizCount = 0;
      header.textContent = 'ようこそ';
      questionType.innerText = '';
      content.textContent = '以下のボタンをクリック';
    }

    addQuizCount() {
      this.quizCount++;
    }

    getQuizCount() {
      return this.quizCount;
    }

    addCorrentNum() {
      this.correctNum++;
    }

    getCorrectNum() {
      return this.correctNum;
    }
  }

  window.addEventListener('click',e => {
    if (e.target.value === '開始') {
      new Quiz();
    }
  });
}