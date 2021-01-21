import React, { Component } from "react";
import Card from "./Card";
import Axios from "axios";
import _ from "lodash";
import { HashRouter, Link, Switch, Route } from "react-router-dom";

// import "./App.css";
import "bulma-switch";
import "@fortawesome/fontawesome-free";

import Footer from "./components/Footer";
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
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.userGroup();
  }

  handleSearch(e) {
    console.log("event", e.target.value);
    this.setState({ searchTerm: e.target.value });
  }

  userGroup() {
    Axios.get("https://randomuser.me/api/?results=3").then((res) =>
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
    console.log("all users", this.filterUsers());

    let firstUser = _.head(this.filterUsers());
    console.log("first user", firstUser);

    return (
      <section className="section">
        <div className="flex-container intro">
          <div className="introemerald">
            <h1 className="hello">
              Hello, <span className="helloeme">Emerald</span>
            </h1>
            <h4 className="dashboard">
              Welcome to your dashboard, kindly sort through your user base
            </h4>
            <div className="columns">
              <div className="column is-fullwidth">
                <div className="field">
                  <input placeholder="🔍  Find a user" className="emerald" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="emeusers">Show Users</h3>
            </div>
            <div className="buttonemerald">
              <button className="button is-large users">
                <span className="icon is-small">
                  <i className="fas fa-users"></i>
                </span>
              </button>
              <button
                type="button"
                value="male"
                onClick={this.handleSearch}
                className="button is-large male"
              >
                <span className="icon is-small">
                  <i className="fas fa-male"></i>
                </span>
              </button>
              <button className="button is-large female">
                <span className="icon is-small">
                  <i className="fas fa-female"></i>
                </span>
              </button>
              <div className="flexusers">
                <div>
                  <h4 className="allusers">All Users</h4>
                </div>
                <div>
                  <h4 className="maleusers">Male Users</h4>
                </div>
                <div>
                  <h4 className="femaleusers">Female Users</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="container-one">
            <h1>All Users</h1>
            <h4>Filter by</h4>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <input placeholder="🔍  Find in list" className="input" />
                </div>
              </div>
              <div className="column">
                <div className="field country">
                  <div className="select">
                    <select>
                      <option className="country" value="country">
                        Country
                      </option>
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
                  <label className="country1" htmlFor="switchRoundedDefault">
                    Show country
                  </label>
                </div>
              </div>
            </div>
            <HashRouter>
              <Switch>
                <Route path="/show" component={UserShow} />
                <div className="columns-is-multiline">
                  {this.filterUsers().map((user) => (
                    <div className="container-card" key={user.name.first}>
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
                    </div>
                  ))}
                </div>
              </Switch>
            </HashRouter>
            <Footer />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
