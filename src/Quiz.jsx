import { useEffect, useRef, useState } from "react";
import { quiz } from "./assets/data/questions";
import "./quiz.css";
import Result from "./Result";

const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const ref = useRef();
  const ref2 = useRef();
  var counter = useRef();

  const StartButton = () => (
    <div className="start_btn">
      <button onClick={ShowQuiz}>Start Quiz</button>
    </div>
  );

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  // counter
  let timeValue = 10;

  function startTimer(time) {
    counter.current = setInterval(timer, 1000);
    console.log("counter is: ", counter);
    function timer() {
      time--;
      ref.current.textContent = time;
      console.log("time is ", ref.current.textContent);
      if (time <= 9) {
        let addZero = ref.current.textContent;
        ref.current.textContent = "0" + addZero;
      }
      if (time == 0) {
        clearInterval(counter.current);
        ref2.current.textContent = "Time Off";
      }
      // activeQuestion !== questions.length - 2
      //   ? time == 0
      //     ? (clearInterval(counter),
      //       setActiveQuestion((prev) => prev + 1),
      //       startTimer(timeValue))
      //     : // : (setActiveQuestion(0), setShowResult(true))
      //       time != 0
      //   : setShowResult(true);

      // if (time == 0 && activeQuestion !== questions.length - 2) {
      //   clearInterval(counter);
      //   setActiveQuestion((prev) => prev + 1);
      //   startTimer(timeValue);
      // }
    }
  }
  const ShowQuiz = () => {
    setStartQuiz(true);
    clearInterval(counter);
    startTimer(timeValue);
  };

  const onClickNext = () => {
    clearInterval(counter.current);
    ref2.current.textContent = "Time Left";
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      clearInterval(counter.current);
      setActiveQuestion((prev) => prev + 1);
      startTimer(timeValue);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      clearInterval(counter.current);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div id="body">
      {!startQuiz ? (
        <StartButton />
      ) : (
        <div className="quiz-container">
          {!showResult ? (
            <div>
              <div>
                <span className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question">
                  /{addLeadingZero(questions.length)}
                </span>
                <span className="time_left" ref={ref2}>
                  Time left
                </span>
                <span className="timer_sec" ref={ref}>
                  10
                </span>
              </div>
              <h2>{question}</h2>
              <ul>
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }
                  >
                    {answer}
                  </li>
                ))}
              </ul>
              <div className="flex-right">
                <button
                  onClick={onClickNext}
                  disabled={selectedAnswerIndex === null}
                >
                  {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <Result questions={questions} result={result} />
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
