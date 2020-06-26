import React from "react";
import { Book } from "../interfaces/index";
import { Card, Col, Row, message, Modal, Skeleton } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { months } from "../helpers/months";

interface CardProps {
  bookState: [Book[], React.Dispatch<React.SetStateAction<Book[]>>, number];
}

const BookCard: React.FC<CardProps> = ({ bookState: [books, setBooks, load] }) => {
  
  const { confirm } = Modal;

  const deleteBook = (id: number, title: string) => {
    confirm({
      title: "Are you sure delete this book?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // console.log("OK");
        const list = [...books];
        let newList = list.filter((a) => a.ID !== id);
        setBooks([...newList]);
        message.success(`${title} deleted`);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="site-card-wrapper">
      <Skeleton active loading={books.length > 0 ? false : true}>
        <Row gutter={[24, 48]}>
          {books?.slice(0, load).map((book) => {
            const date = new Date(book.PublishDate);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const fullDate = `${day} ${month} ${year}`;
            return (
              <Col span={8} key={book.ID}>
                <Card
                  title={book.Title}
                  extra={<span style={{ color: "#1890ff" }}>{fullDate}</span>}
                  bordered={false}
                >
                  <Row>{book.Description}</Row>

                  <Row justify="end">
                    <DeleteOutlined
                      style={{ fontSize: "25px" }}
                      onClick={() => deleteBook(book.ID, book.Title)}
                    />
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Skeleton>
    </div>
  );
};

export default BookCard;
