

function App() {
  return (
    <div class="container">
      <h1>Node JS Express Form </h1>
      <form action="http://127.0.0.1:3001/" method="POST">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter first name" name="first_name"></input>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" class="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Enter last name" name="last_name"></input>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter email"></input>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
export default App;
