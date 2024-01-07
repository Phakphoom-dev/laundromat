import ProgrammingTest2 from "@/components/programmingTest/programmingTest2";
import { useEffect, useState } from "react";

export default function ProgrammingTest() {
  const [firstInput, setFirstInput] = useState<number[]>([
    2, 3, 4, 4, 34, 6, 7, 2, 3, 7, 8, 8, 8, 7, 9, 10, 41, 8,
  ]);

  const [firstAnswer, setFirstAnswer] = useState<number[]>([]);

  useEffect(() => {
    sortFirstInput();
  }, [firstInput]);

  const sortFirstInput = () => {
    const clone = [...firstInput];
    const countMap: Map<number, number> = new Map();

    for (const num of clone) {
      countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    const sortedArray = clone.sort((a, b) => {
      const countComparison = (countMap.get(a) || 0) - (countMap.get(b) || 0);

      if (countComparison === 0) {
        return a - b;
      }
      return countComparison;
    });

    setFirstAnswer(sortedArray);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="form-control w-full max-w-xl">
          <div className="label">
            <span className="label-text">Custom input</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered max-w-xl"
            defaultValue={firstInput.toString()}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                const inputToNumArr = e.target.value.split(",").map((e) => +e);
                setFirstInput(inputToNumArr);
              }
            }}
          />
        </label>

        <h1>Input: [{firstInput.toString()}]</h1>
        <h1>
          Expected Output:{" "}
          {firstAnswer.length > 0 && `[${firstAnswer.toString()}]`}
        </h1>

        <hr />

        <div className="mt-5">
          <ProgrammingTest2 />
        </div>
      </div>
    </>
  );
}
