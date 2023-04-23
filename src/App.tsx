import { Route } from "wouter";
import Nav from './Nav';

function App() {
  return (
    <div className="container">
      <Nav />
      <Route path="/"><div><h1>Home Page</h1></div></Route>
      <Route path="/page/:value">{(params) => <div><h1>Welcome to page {params.value}!</h1></div>}</Route>
    </div>
  )
}

export default App;
