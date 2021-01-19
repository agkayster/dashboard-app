import React, { Component } from "react";
import Card from "./Card";
import Axios from "axios";
import _ from "lodash";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "bulma-switch";
import "@fortawesome/fontawesome-free";

import UserShow from "./components/Show";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: { results: [] },
      searchTerm: "",
    };
    this.userGroup = this.userGroup.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount() {
    this.userGroup();
  }

  userGroup() {
    Axios.get("https://randomuser.me/api/?results=10").then((res) =>
      this.setState({ userData: res.data })
    );
  }

  filterUsers() {
    const re = new RegExp(this.state.searchTerm, "i");

    const filterUsers = _.filter(this.state.userData.results, (user) => {
      return re.test(user.gender);
    });
    return filterUsers;
  }

  render() {
    if (!this.state.userData) return <h1>...Loading</h1>;

    let firstUser = _.head(this.filterUsers());
    console.log(firstUser);

    let newAddy = this.filterUsers().map((user) => user.location.street);
    console.log(newAddy);

    // let userObj = this.state.userData.results;
    // console.log(userObj);

    // let femaleUsers = userObj.filter((ele) => ele.gender === "female");
    // console.log(femaleUsers);

    // let maleUsers = userObj.filter((ele) => ele.gender === "male");
    // console.log(maleUsers);

    // let newUserObj = userObj.map((item) => {
    //   return {
    //     name: item.name,
    //     address: item.location,
    //     email: item.email,
    //     phone: item.phone,
    //     image: item.picture.thumbnail,
    //     joined: item.registered,
    //     age: item.dob.age,
    //     mobile: item.cell,
    //     gender: item.gender,
    //   };
    // });
    // console.log(newUserObj);

    return (
      <div>
        <section className="section">
          <div className="container">
            <h1>ALL USERS</h1>
            <h4>Filter by</h4>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <input placeholder="🔍  Find in list" className="input" />
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="country">country</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <input
                    id="switchRoundedDefault"
                    type="checkbox"
                    name="switchRoundedDefault"
                    className="switch is-rounded"
                    defaultChecked="checked"
                  />
                  <label htmlFor="switchRoundedDefault">Show country</label>
                </div>
              </div>
            </div>
            <HashRouter>
              <Switch>
                <Route path="/show" component={UserShow} />
                <div className="columns-is-multiline">
                  {this.filterUsers().map((user) => (
                    <React.Fragment key={user.name.first}>
                      <Card
                        picture={user.picture}
                        name={user.name}
                        dob={user.dob.age}
                        location={user.location}
                        email={user.email}
                        phone={user.phone}
                      />
                      <Link
                        to={{
                          pathname: "/show",
                          state: user,
                        }}
                      >
                        <button className="button is-success">
                          <span className="icon is-small">
                            <i className="fas fa-long-arrow-alt-right"></i>
                          </span>
                        </button>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </Switch>
            </HashRouter>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
