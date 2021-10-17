import React, { Component } from "react";
import "./index.css";
import Caard from "../Card/index";
import { Pagination } from "antd";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";

class AllLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      results: [],
      page: 1,
      currentResults: [],
      fovoritesIndexes: [],
      current: 1,
    };
  }
  getAlldate = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: "https://api.bitpin.ir/v1/mkt/markets/",
      });
      await this.setState({
        count: data.count,
        results: data.results,
      });
      await this.sortListBaseOnFavorites();
    } catch (e) {
      console.error("e");
    }
  };

  componentDidMount = async () => {
    await this.getAlldate();
    await this.sortListBaseOnFavorites();
  };
  sortListBaseOnFavorites = async () => {
    try {
      let fovoritesIndexes = JSON.parse(this.props.cookies.cookies.favorites);

      if (
        this.state.results &&
        this.state.results.length > 0 &&
        fovoritesIndexes &&
        fovoritesIndexes !== null &&
        fovoritesIndexes !== undefined &&
        Array.isArray(fovoritesIndexes) &&
        fovoritesIndexes.length > 0
      ) {
        let sortedArray = this.state.results.sort((x, y) => {
          let indexX = fovoritesIndexes.includes(x.id);
          let indexY = fovoritesIndexes.includes(y.id);
          if (indexX < indexY) {
            return 1;
          }
          if (indexX > indexY) {
            return -1;
          }
          return 0;
        });
        await this.setState({
          results: sortedArray,
          fovoritesIndexes,
          currentResults: sortedArray.slice(
            (this.state.current - 1) * 10,
            this.state.current * 10
          ),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  pageChange = async (e) => {
    try {
      if (this.state.results.length > 0) {
        let currentResults = this.state.results.slice((e - 1) * 10, e * 10);
        await this.setState({ currentResults });
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({ current: e });
  };
  render() {
    return (
      <div className="mainListsDiv">
        {this.state.currentResults.map((val, index) => (
          <Caard
            index={index}
            data={val}
            key={index}
            is_fovorite={this.state.fovoritesIndexes.includes(val.id)}
            update={() => this.sortListBaseOnFavorites()}
          />
        ))}
        <div className="pagination">
          <Pagination
            size="small"
            total={this.state.count}
            onChange={(e) => this.pageChange(e)}
            pageSizeOptions={[10]}
            current={this.state.current}
          />
        </div>
      </div>
    );
  }
}

export default withCookies(AllLists);
