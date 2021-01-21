import React, { Component } from 'react';

class Footer extends Component {
   
    render() { 
        return (
          <footer className="footer">
            <div className="footer-bottom">
              <p className="buttons">
                <button className="button is-link is-rounded">
                  <span className="icon is-small">
                    <i className="fas fa-cloud-download-alt"></i>
                  </span>
                  <span>Download results</span>
                </button>
                <div className="direction">
                  <button className="button is-light">
                    <span className="icon is-small">
                      <i className="fas fa-less-than"></i>
                    </span>
                  </button>
                  <button className="button is-black">
                    <span className="icon is-small">
                      <i className="fas fa-greater-than"></i>
                    </span>
                  </button>
                </div>
              </p>
            </div>
          </footer>
        );
    }
}
 
export default Footer;