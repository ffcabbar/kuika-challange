import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BookCard, FilterDropdown } from "./components/index";
import { Book } from "./interfaces/index";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [load, setLoad] = useState<number>(6);

  const getBookService = () => {
    Axios.get("http://fakerestapi.azurewebsites.net/api/Books")
      .then((res) => {
        // console.log(res, "heyyyy");
        setBooks([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBookService();
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 6
      ) {
        setLoad(load + 6);
      }
    };
  }, [load]);

  return (
    <div className="App">
      <FilterDropdown bookState={[books, setBooks]} />
      <BookCard bookState={[books, setBooks, load]} />
    </div>
  );
};

export default App;
