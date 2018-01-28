import React from 'react';

class Login extends React.Component {

  constructor(props) {
      super(props);

      this.handleLogin = this.handleLogin.bind(this);
      this.handleLoginFail = this.handleLoginFail.bind(this);

      this.googleLoginInit = this.googleLoginInit.bind(this);
			this.naverLoginInit = this.naverLoginInit.bind(this);

      this.handleClose = this.handleClose.bind(this);
      const listenEscKey = (evt) => {
           evt = evt || window.event;
           if (evt.keyCode === 27) {
               this.handleClose();
           }
       };
       document.onkeydown = listenEscKey;

       this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
       this.handleGoogleLoginFail = this.handleGoogleLoginFail.bind(this);
  }

  componentDidMount() {
      this.googleLoginInit();
      this.naverLoginInit();
  }

  handleGoogleLogin(googleUser) {
      this.handleLogin(window.AUTH_GOOGLE);
  }

  handleGoogleLoginFail(error) {
      this.loginFailHandler(window.AUTH_GOOGLE);
      console.log(error);
  }

  handleLogin(authType) {
    this.props.history.push("/login?authType=" + authType + "&action=success");
    this.handleClose();
  }

  handleLoginFail(authType) {
    this.props.history.push("/Login?action=fail&authType=" + authType);
    this.handleClose();
  }

  googleLoginInit() {
    window.gapi.signin2.render('signin', {
        'scope': 'profile email',
        'width': 'standard',
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.handleGoogleLogin,
        'onfailure': this.handleGoogleLoginFail
    });
  }

  naverLoginInit() {
    var naverLogin = new window.naver.LoginWithNaverId({
        clientId: "18F1ahzVnczJShlz01UB",
        callbackUrl: window.HOST + "login?action=success&authType=naver",
        isPopup: false,
        loginButton: {color: "green", type: 3, height: 53}
      }
    );
    naverLogin.init();
  }

  handleClose() {
      document.onkeydown = null;
      this.props.onClose();
  }

    render() {
      return(
        <div className="login-container">
            <div className = "right">
                <a className = "waves-effect waves-light btn red lighten-1 closeBtn" onClick = {this.handleClose}>CLOSE</a>
            </div>

            <div className="auth">
                <div className="card">
                    <div className="header blue white-text center">
                            <div className="card-content">LOGIN</div>
                    </div>

                    <div className="card-content">
                        <div id="signin"></div>
                    </div>

                    <div className="card-content">
                        <div id="naverIdLogin"></div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

export default Login;
