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
      <section className="section-show">
        <div className="container-show">
          <Link
            to={{
              pathname: "/",
            }}
          >
            <div className="arrow">
              <span className="icon is-small">
                <i className="fas fa-long-arrow-alt-left"></i>
              </span>
              <span className="results">RESULTS</span>
            </div>
          </Link>
          <div className="flex-container">
            <div>
              <figure className="image-show">
                <img
                  src={this.state.user.picture.thumbnail}
                  alt={this.state.user.name}
                />
              </figure>
            </div>
            <div className="userdetails">
              <h1 className="title is-2">
                {this.state.user.name.title}. {this.state.user.name.first}{" "}
                {this.state.user.name.last}{" "}
                <span className="title is-2">{this.state.user.dob.age}</span>
              </h1>

              <h3 className="subtitle is-4">
                {this.state.user.location.street.number}{" "}
                {this.state.user.location.street.name},{" "}
                {this.state.user.location.city},{" "}
                {this.state.user.location.state}
              </h3>
              <h4 className="subtitle is-4 email">
                ✉️ {this.state.user.email}
              </h4>
              <h4 className="subtitle is-4 join">JOINED: {fDate}</h4>
              <h4 className="subtitle is-4">📞 {this.state.user.phone}</h4>
              <h4 className="subtitle is-4">📱 {this.state.user.cell}</h4>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UserShow;
