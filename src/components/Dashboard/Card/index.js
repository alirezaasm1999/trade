import React from "react";
import { Modal, Button, Card } from "antd";

import { useCookies } from "react-cookie";
const { Meta } = Card;

const Caard = (props) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [cookies, setCookie] = useCookies(["favorites"]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addToFavorites = async (id) => {
    let fovoritesIndexes = [];
    if (cookies.favorites && cookies.favorites.length > 0) {
      fovoritesIndexes = cookies.favorites;

      if (fovoritesIndexes.includes(id)) {
        console.log("fovoritesIndexes here", fovoritesIndexes);
        delete fovoritesIndexes[fovoritesIndexes.indexOf(id)];
      } else {
        console.log("here");

        fovoritesIndexes.push(id);
      }
    } else {
      console.log("here");

      fovoritesIndexes = [];
      fovoritesIndexes.push(id);
    }
    console.log("here", fovoritesIndexes);

    setCookie("favorites", fovoritesIndexes);
    props.update();
  };
  React.useEffect(() => {
    let log = () => {
      console.log("here", props);
    };
    log();
  }, []);

  return (
    <Card
      hoverable
      style={{ width: 240, height: "fit-content", margin: "20px" }}
      cover={
        <img alt="example" src={props.data.currency1.image} height="150px" />
      }
    >
      <Meta title="code :" description={props.data.code} />
      <Meta
        title="decimal_amount :"
        description={props.data.currency1.decimal_amount}
      />
      <Meta title="price :" description={props.data.price} />
      <Meta
        title="trading_view_source :"
        description={props.data.trading_view_source}
      />
      <Meta
        title="Is Fovorite?"
        description={
          <input
            type="checkbox"
            name="is_fovorite"
            onChange={(e) => addToFavorites(props.data.id)}
            checked={props.is_fovorite}
          />
        }
      ></Meta>
      <Meta
        title="Details :"
        description={
          <Button type="primary" onClick={showModal}>
            Show last trades
          </Button>
        }
      ></Meta>
      <Modal
        title="Last Trades"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Card>
  );
};

export default Caard;
