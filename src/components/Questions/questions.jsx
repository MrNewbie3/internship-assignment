import { useState } from "react";
import Countdown from "react-countdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { matchSorter } from "match-sorter";
import { toast } from "react-hot-toast";
const QuestionsComps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let id = useParams();
  let jumlahjawaban = localStorage.getItem("answer") === null ? 0 : localStorage.getItem("answer").split(",");
  const handleAnswer = (e) => {
    if (localStorage.getItem("answer") === null) {
      localStorage.setItem("answer", "");
    }
    let arr = localStorage.getItem("answer").split(",");
    arr.push(e.target.value);
    console.log(arr);
    localStorage.setItem("answer", arr);
    localStorage.setItem("id", parseInt(id.id) + 1);
    const getAnswer = JSON.parse(localStorage.getItem("soal")).map((res) => {
      return res.correct_answer;
    });
    if (matchSorter(getAnswer, e.target.value).length > 0) {
      const nilai = parseInt(localStorage.getItem("nilai")) + 33;
      localStorage.setItem("nilai", nilai);
    }
    if (parseInt(localStorage.getItem("id")) > 3) {
      let removedItems = ["dataSoal", "soal", "timer", "answer"];
      removedItems.forEach((element) => {
        localStorage.removeItem(element);
      });
      localStorage.setItem("finished", true);
      navigate("/pages");
    }
  };
  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("soal")));
  return (
    <section className="h-full w-full flex flex-row justify-center items-center my-10">
      <div className="artboard artboard-horizontal phone-5 flex flex-col px-8 justify-around items-center rounded-xl shadow-lg drop-shadow-xl bg-stone-100">
        <Countdown date={parseInt(localStorage.getItem("timer")) + 10000000} className="self-start" />
        <div className="questions-anwer-option">
          <div>{questions[parseInt(id.id) - 1].question}</div>
          {parseInt(id.id) > 2 ? (
            <div className="answer-option flex flex-row gap-x-4 justify-center">
              {questions[parseInt(id.id) - 1].incorrect_answers.map((res, idx) => {
                return (
                  <button value={res} name={`${idx}`} onClick={handleAnswer} className="bg-red-600 px-4 py-2 rounded-xl max-w-xs text-white">
                    {res}
                  </button>
                );
              })}
              <button onClick={handleAnswer} name={`jwb-${4}`} className="bg-red-600 px-4 py-2 rounded-xl max-w-xs text-white" value={questions[parseInt(id.id) - 1].correct_answer}>
                {questions[parseInt(id.id) - 1].correct_answer}
              </button>
            </div>
          ) : (
            <div className="answer-option flex flex-row gap-x-4 justify-center">
              {questions[parseInt(id.id) - 1].incorrect_answers.map((res, idx) => {
                return (
                  <a href={"/questions/" + (parseInt(id.id) + 1)}>
                    <button value={res} name={`${idx}`} onClick={handleAnswer} className="bg-red-600 px-4 py-2 rounded-xl max-w-xs text-white">
                      {res}
                    </button>
                  </a>
                );
              })}
              <a href={"/questions/" + (parseInt(id.id) + 1)}>
                <button onClick={handleAnswer} name={`jwb-${4}`} className="bg-red-600 px-4 py-2 rounded-xl max-w-xs text-white" value={questions[parseInt(id.id) - 1].correct_answer}>
                  {questions[parseInt(id.id) - 1].correct_answer}
                </button>
              </a>
            </div>
          )}
        </div>
        <div className="info flex flex-row gap-x-10">
          <p>{localStorage.getItem("answer") === null ? 0 : jumlahjawaban.length - 1} Terjawab</p>
          <p>Nilai = {localStorage.getItem("nilai")}</p>
        </div>
      </div>
    </section>
  );
};

export default QuestionsComps;
