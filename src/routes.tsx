import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH } from "@/constants/path";
import MainLayout from "@/components/layouts/mainLayout/mainLayout";
import Home from "@/pages/home";
import Exam from "@/pages/exam";
import ProgrammingTest from "@/pages/programmingTest";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={PATH.EXAM} element={<Exam />} />
          <Route path={PATH.PROGRAMMING_TEST} element={<ProgrammingTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
