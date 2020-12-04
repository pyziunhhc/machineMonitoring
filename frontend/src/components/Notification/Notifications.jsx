import React from 'react'
import './style.css'
export default class Notification extends React.Component {
    render(){
        return(<div className={`notification__container --${this.props.type}`}>
            <div className="notification__message">
                <p>{this.props.message}</p>
            </div>
        </div>)
    }
}