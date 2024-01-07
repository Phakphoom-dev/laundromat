import { useState } from "react";

interface IUser {
  name: string;
  position: string;
}

export default function ProgrammingTest2() {
  const [search, setSearch] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answer, setAnswer] = useState<IUser | string>();
  const input: IUser[] = [
    { name: "Arm", position: "FrontEnd" },
    {
      name: "Game",
      position: "BackEnd",
    },
  ];

  const searchUser = () => {
    const findUser = input.find((e: IUser) => {
      return e.name === search;
    });

    setAnswer(findUser);
    setShowAnswer(true);
  };

  const displayAnswer = (answer: string | IUser | undefined): string => {
    switch (typeof answer) {
      case "object":
        return `ชื่อ ${answer.name} ตํา แหน่ง ${answer.position}`;
      case "undefined":
        return `Employee with name ${search} not found.`;
      default:
        return "";
    }
  };

  return (
    <>
      <label className="form-control w-full max-w-xl">
        <div className="label">
          <span className="label-text">Search</span>
        </div>
        <input
          type="text"
          placeholder="Search Input"
          className="input input-bordered max-w-xl"
          defaultValue={search}
          onChange={(e) => {
            setShowAnswer(false);
            setSearch(e.target.value);
          }}
        />
      </label>

      <div className="mt-3">{showAnswer && displayAnswer(answer)}</div>

      <button className="btn btn-primary mt-3" onClick={() => searchUser()}>
        Search
      </button>
    </>
  );
}
