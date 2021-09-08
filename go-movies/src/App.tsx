// src/App.tsx
import { Dispatch, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setJWTAction } from './redux/actions/setJWTAction'
import Home from './components/Home'
import Movies from './components/Movies'
import Admin from './components/Admin'
import Genres from './components/Genres'
import OneMovie from './components/OneMovie'
import OneGenre from './components/OneGenre'
import EditMovie from './components/EditMovie'
import Login from './components/Login'
import GraphQL from './components/GraphQL'

const App = (props: any) => {

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt")
    if (jwtToken) {
      if (props.jwt === "") {
        props.setJWT(JSON.parse(jwtToken))
      }
    }
  })

  const logout = () => {
    props.setJWT("")
    window.localStorage.removeItem("jwt")
  }

  let loginLink
  if (props.jwt === "") {
    loginLink = <Link to="/login">Login</Link>
	} else {
    loginLink = <Link to="/logout" onClick={logout}>Logout</Link>
	}

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">
              Go Watch a Movie!
            </h1>
          </div>
          <div className="col mt-3 text-end">
            {loginLink}
          </div>
          <hr className="mb-3" />
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                {
                  props.jwt !== "" &&
                  <Fragment>
                    <li className="list-group-item">
                      <Link to="/admin/movie/0">Add Movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalog</Link>
                    </li>
                  </Fragment>
                }
                <li className="list-group-item">
                  <Link to="/graphql">GraphQL</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route path="/movies/:id" component={OneMovie} />

              <Route path="/movies">
                <Movies />
              </Route>

              <Route path="/genre/:id" component={OneGenre} />

              <Route exact path="/login" component={(props: any) => <Login {...props} />} />

              <Route exact path="/genres">
                <Genres />
              </Route>

              <Route exact path="/graphql">
                <GraphQL />
              </Route>

              <Route path="/admin/movie/:id" component={EditMovie} />

              <Route path="/admin" component={Admin} />

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

// State -> Props
const mapStateToProps = (state: {jwt: string}) => ({
  jwt: state.jwt
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setJWT: (jwt: string) => dispatch(setJWTAction(jwt))
})

// AppコンポーネントをRedux Storeに登録
export default connect(mapStateToProps, mapDispatchToProps)(App)
