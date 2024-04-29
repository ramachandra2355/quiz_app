import React, { useState } from 'react';

function QuizApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter both username and password.');
    }
  };

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
      correctAnswer: 'Jupiter'
    },
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Chennai', 'New Delhi', 'Pune'],
      correctAnswer: 'New Delhi'
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic', 'Arctic'],
      correctAnswer: 'Pacific Ocean'
    }
  ];

  const [page, setPage] = useState(0); // Current question index
  const [answers, setAnswers] = useState(Array(questions.length).fill('')); // Array to store user answers
  const [quizResult, setQuizResult] = useState(null); // State to store quiz result

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[page] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    // Calculate quiz score
    const correctCount = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    const score = (correctCount / questions.length) * 100;

    // Display quiz results
    setPage('result');
    setQuizResult({ score });
  };

  return (
    <div className="container">
      {!isLoggedIn && (
        <div className="loginPage">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {isLoggedIn && typeof page === 'number' && page >= 0 && page < questions.length && (
        <div className="questionPage">
          <h1>Question {page + 1}</h1>
          <h2>{questions[page].question}</h2>
          <ul className="options">
            {questions[page].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`q${page}`} // Corrected template literal syntax
                    value={option}
                    onChange={() => handleAnswerSelect(option)}
                    checked={answers[page] === option}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {page === questions.length - 1 && (
            <button onClick={handleQuizSubmit}>Submit</button>
          )}
          <button onClick={handlePrevClick} disabled={page === 0}>
            Previous
          </button>
          <button onClick={handleNextClick} disabled={page === questions.length - 1}>
            Next
          </button>
        </div>
      )}

      {isLoggedIn && page === 'result' && (
        <div className="resultPage">
          <h1>Quiz Results</h1>
          <div id="result">
            {/* Corrected template literal syntax */}
            <p>Your score: {quizResult ? `${quizResult.score}%` : 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
