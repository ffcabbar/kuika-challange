import React from "react";
import { Col, Row, Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Book } from "../interfaces/index";

interface FilterProps {
  bookState: [Book[], React.Dispatch<React.SetStateAction<Book[]>>];
}

const FilterDropdown: React.FC<FilterProps> = ({ bookState: [books, setBooks] }) => {
 
  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      orderByDate();
    }
    if (e.key === "2") {
      orderByBookTitle();
    }
    if (e.key === "3") {
      orderByPageCount();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Publish Date</Menu.Item>
      <Menu.Item key="2">Book Title</Menu.Item>
      <Menu.Item key="3">Page Count</Menu.Item>
    </Menu>
  );

  const orderByDate = () => {
    const list = [...books];

    let orderedList = list.sort((a, b) => {
        let c = new Date(a.PublishDate).getTime();
        let d = new Date(b.PublishDate).getTime();
        if (c - d) {
          return -1;
        } else if (d - c) {
          return 1;
        } else {
          return 0;
        }
      });

    setBooks([...orderedList]);
  };

  const orderByBookTitle = () => {
    const list = [...books];

    let orderedList = list.sort((a, b) => {
      let c = a.Title.toLowerCase();
      let d = b.Title.toLowerCase();  
      if (c < d) return -1;
      if (c > d) return 1;
      return 0;
    });

    // with localeCompare
    // let orderedList = list.sort((a, b) => a.Title.localeCompare(b.Title))

    setBooks([...orderedList]);
  };

  const orderByPageCount = () => {
    const list = [...books];

    let orderedList = list.sort((a, b) => {
      if (a.PageCount - b.PageCount) {
        return -1;
      } else if (b.PageCount - a.PageCount) {
        return 1;
      } else {
        return 0;
      }
    });

    setBooks([...orderedList]);
  };

  return (
    <Row justify="end" style={{ marginBottom: "50px" }}>
      <Col>
        <Dropdown overlay={menu}>
          <Button style={{ width: "250px", textAlign: "left", color: "#aaa" }}>
            Order By
            <span style={{ marginLeft: "150px" }}>
              <DownOutlined />
            </span>
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default FilterDropdown;
