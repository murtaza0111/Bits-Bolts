import { Flasher } from "react-universal-flash";
import Message from "./components/Message";
function App(props) {
  return (
    <div className="App">
      <Flasher position="bottom_left">
        <Message />
      </Flasher>
      {props.children}
    </div>
  );
}

export default App;
