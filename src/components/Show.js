import React, { Component } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free";

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    if (!this.props.location.state) return this.props.history.replace("/");
    this.setState({ user: this.props.location.state });
  }

  render() {
    console.log(this.state.user);
    if (!this.state.user) return <h1>...Loading</h1>;
    let regDate = new Date(Date.parse(this.state.user.registered.date));
    console.log(regDate);
    let fDate = `${regDate.getFullYear()}-${
      regDate.getMonth() + 1
    }-${regDate.getDate()}`;
    console.log(fDate);

    return (
      <div>
        <section className="section">
          <div className="container">
            <Link
              to={{
                pathname: "/",
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-long-arrow-alt-left"></i>
              </span>{" "}
              <span>Results</span>
            </Link>
            <figure className="image">
              <img
                src={this.state.user.picture.thumbnail}
                alt={this.state.user.name}
              />
            </figure>
            <h1 className="title is-2">
              {this.state.user.name.title}. {this.state.user.name.first}{" "}
              {this.state.user.name.last} {this.state.user.dob.age}
            </h1>
            <h3 className="subtitle is-4">
              {this.state.user.location.street.number}{" "}
              {this.state.user.location.street.name},{" "}
              {this.state.user.location.city}, {this.state.user.location.state}
            </h3>
            <h4 className="subtitle is-4">✉️ {this.state.user.email}</h4>
            <h4 className="subtitle is-4">JOINED: {fDate}</h4>
            <h4 className="subtitle is-4">📞 {this.state.user.phone}</h4>
            <h4 className="subtitle is-4">📱 {this.state.user.cell}</h4>
          </div>
        </section>
      </div>
    );
  }
}

export default UserShow;
