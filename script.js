function Display(props) {
  return (
    React.createElement(React.Fragment, null,
    React.createElement("div", { className: "topDisplay" },
    props.top),

    React.createElement("div", { className: "mainDisplay" },
    props.main)));



}

class RenderButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement("div", { id: "zero", className: "number-button", onClick: () => this.props.numberPressed('0') }, "0"),


      React.createElement("div", { id: "one", className: "number-button", onClick: () => this.props.numberPressed('1') }, "1"),


      React.createElement("div", { id: "two", className: "number-button", onClick: () => this.props.numberPressed('2') }, "2"),


      React.createElement("div", { id: "three", className: "number-button", onClick: () => this.props.numberPressed('3') }, "3"),


      React.createElement("div", { id: "four", className: "number-button", onClick: () => this.props.numberPressed('4') }, "4"),


      React.createElement("div", { id: "five", className: "number-button", onClick: () => this.props.numberPressed('5') }, "5"),


      React.createElement("div", { id: "six", className: "number-button", onClick: () => this.props.numberPressed('6') }, "6"),


      React.createElement("div", { id: "seven", className: "number-button", onClick: () => this.props.numberPressed('7') }, "7"),


      React.createElement("div", { id: "eight", className: "number-button", onClick: () => this.props.numberPressed('8') }, "8"),


      React.createElement("div", { id: "nine", className: "number-button", onClick: () => this.props.numberPressed('9') }, "9"),


      React.createElement("div", { id: "add", className: "operation-button", onClick: () => this.props.operationPressed('+') }, "+"),


      React.createElement("div", { id: "subtract", className: "operation-button", onClick: () => this.props.operationPressed('-') }, "-"),


      React.createElement("div", { id: "multiply", className: "operation-button", onClick: () => this.props.operationPressed('X') }, "X"),


      React.createElement("div", { id: "divide", className: "operation-button", onClick: () => this.props.operationPressed('/') }, "/"),


      React.createElement("div", { id: "decimal", className: "operation-button", onClick: this.props.decimalPressed }, "."),


      React.createElement("div", { id: "clear", className: "operation-button", onClick: this.props.clearPressed }, "AC"),


      React.createElement("div", { id: "equals", className: "operation-button", onClick: this.props.equalsPressed }, "=")));




  }}


function Wrapper(props) {
  return (
    React.createElement("div", { className: "wrapper" },
    React.createElement(Display, null),
    React.createElement(RenderButtons, null)));


}

//Redux
const NUMBER = 'NUMBER';
const OPERATION = 'OPERATION';
const DECIMAL = 'DECIMAL';
const EQUALS = 'EQUALS';
const CLEAR = 'CLEAR';

const initialState = {
  main: '0',
  top: '' };

const rootReducer = (state, action) => {
  let newMain = state.main;
  let newTop = state.top;

  switch (action.type) {
    case NUMBER:
      if (newMain == 'X' || newMain == '+' || newMain == '-' || newMain == '/') {
        newMain = '0';
      }
      if (newTop.split('').indexOf('=') != -1) {
        newMain = '0';
        newTop = '';
      }
      if (newMain == '0') {
        if (action.data == '0')
        break;else
        {
          newMain = action.data;
          if (newTop.length > 1)
          newTop += action.data;else

          newTop = action.data;
        }
      } else
      {
        newMain += action.data;
        newTop += action.data;
      }
      break;
    case DECIMAL:
      if (newMain == 'X' || newMain == '+' || newMain == '-' || newMain == '/') {
        newMain = '0';
      }
      if (newTop.split('').indexOf('=') != -1) {
        newMain = '0';
        newTop = '';
      }
      if (newMain == '0') {
        newMain = '0.';
        if (newTop.length > 1)
        newTop += '0.';else

        newTop = '0.';
      } else
      {
        mainArr = newMain.split('');
        if (mainArr.indexOf('.') != -1)
        break;
        newMain += '.';
        newTop += '.';
      }
      break;
    case OPERATION:
      if (newTop.split('').indexOf('=') != -1) {
        newTop = newMain;
      }
      if (newMain == 'X' || newMain == '+' || newMain == '-' || newMain == '/') {
        const topArr = newTop.split('');
        topArr.pop();
        newTop = topArr.join('');
        console.log(newTop);
      }
      if (newMain == '0')
      break;else
      if (action.data == 'X')
      newTop += '·';else

      newTop += action.data;
      newMain = action.data;
      break;
    case CLEAR:
      newMain = '0';
      newTop = '';
      break;
    case EQUALS:
      if (!newTop)
      break;
      const stringEquation = newTop.replace(/·/g, '*');
      const answer = eval(stringEquation);
      newTop = newTop + '=' + answer;
      newMain = answer;
      break;
    default:
      return state;}


  return { main: newMain, top: newTop };
};

const store = Redux.createStore(rootReducer, initialState);

//Action Creators
const numberPressed = number => {
  return {
    type: NUMBER,
    data: number };

};

const operationPressed = operation => {
  return {
    type: OPERATION,
    data: operation };

};

const decimalPressed = () => {
  return {
    type: DECIMAL };

};

const clearPressed = () => {
  return {
    type: CLEAR };

};

const equalsPressed = () => {
  return {
    type: EQUALS };

};

//ReactRedux
const mapDispatchToProps = dispatch => {
  return {
    numberPressed: number => dispatch(numberPressed(number)),
    decimalPressed: () => dispatch(decimalPressed()),
    operationPressed: operation => dispatch(operationPressed(operation)),
    clearPressed: () => dispatch(clearPressed()),
    equalsPressed: () => dispatch(equalsPressed()) };

};

const mapStateToProps = state => {
  return {
    main: state.main,
    top: state.top };

};

RenderButtons = ReactRedux.connect(null, mapDispatchToProps)(RenderButtons);
Display = ReactRedux.connect(mapStateToProps, null)(Display);

ReactDOM.render(
React.createElement(ReactRedux.Provider, { store: store },
React.createElement(Wrapper, null)),
document.getElementById('root'));