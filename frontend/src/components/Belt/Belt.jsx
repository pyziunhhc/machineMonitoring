import {Component} from 'react'


export default class Belt extends Component {
    constructor(props){
        super(props)
        this.container = this.props.container
        this.title = this.props.title
    }
render(){
    return(
        <div
          className="belt"
          onMouseDown={(e) => {
            this.container.mouseDown = true;
            this.container.pos1 = 0;
            this.container.pos2 = 0;
            this.container.pos3 = e.clientX;
            this.container.pos4 = e.clientY;
          }}
          onMouseUp={() => {
            this.container.mouseDown = false;
          }}
          onMouseMove={(e) => {
            if (this.container.mouseDown) {
              e.stopPropagation();
              this.container.pos1 = this.container.pos3 - e.clientX;
              this.container.pos2 = this.container.pos4 - e.clientY;
              this.container.pos3 = e.clientX;
              this.container.pos4 = e.clientY;
              this.container.ref.current.style.top = `${
                this.container.ref.current.offsetTop - this.container.pos2
              }px`;
              this.container.ref.current.style.left = `${
                this.container.ref.current.offsetLeft - this.container.pos1
              }px`;
            }
          }}>
          <h1>{`${this.props.title}`}</h1>
          <div className="actions">
            <button>_</button>
            <button onClick={this.props.removeWindow}>X</button>
          </div>
        </div>
    )
}
}