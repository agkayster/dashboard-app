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
      genderTerm: "",
    };
    // this.userGroup = this.userGroup.bind(this);
   
    // this.handleGenderChange = this.handleGenderChange.bind(this);
  }

  componentDidMount() {
    this.userGroup();
  }

  handleGenderChange = (value) => this.setState({ genderTerm: value });
  // console.log("value", value);

  userGroup = () => {
    Axios.get("https://randomuser.me/api/?results=3").then((res) =>
      this.setState({ userData: res.data })
    );
  }

  filterUsers(){
    const {searchTerm, genderTerm, userData} = this.state
    const {results} = userData
    const testSearch = new RegExp(searchTerm, "i")

    const filters = _.filter(results, (result) => {
      const {title, first, last} = result.name
      const fullName = `${title} ${first} ${last}`
      if(searchTerm.length > 0 && genderTerm.length > 0){
        return genderTerm === result.gender && testSearch.test(fullName)
      }else if (searchTerm.length <= 0 && genderTerm.length > 0){
        return genderTerm === result.gender
      }
      return true
    })
    return filters
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
              <div className="field is-grouped">
                <div className="control">
                  <button
                    onClick={() => this.handleGenderChange("")}
                    className="button is-large users"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-users"></i>
                    </span>
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    onClick={() => this.handleGenderChange("male")}
                    className="button is-large male"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-male"></i>
                    </span>
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => this.handleGenderChange("female")}
                    className="button is-large female"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-female"></i>
                    </span>
                  </button>
                </div>
              </div>

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

// filterUsers() {
//   const { searchTerm, genderTerm, userData } = this.state;
//   console.log(searchTerm, "searchTerm", genderTerm, "gender term");
//   const { results } = userData;
//   const testSearch = new RegExp(searchTerm, "i");
//   const filter = results.filter((result) => {
//     const { title, first, last } = result.name;
//     const fullName = `${title} ${first} ${last}`;
//     if (searchTerm.length > 0 && genderTerm.length > 0) {
//       return (
//         genderTerm === result.gender && testSearch.test(fullName)
//         // || append the remaining of your test here
//       );
//     } else if (searchTerm.length <= 0 && genderTerm.length > 0) {
//       return genderTerm === result.gender;
//     }
//     return true;
//   });
//   return filter;
// }
