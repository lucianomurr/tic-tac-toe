export default function Square(props) {
    return (
      <button 
        className={'square ' + props.color}
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }