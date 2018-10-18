import React, {Component} from 'react'

class MessageComp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span><span style={{color: 'red'}}>{this.props.label}</span> {this.props.errMsg}!</span>
        )
    }
}

export default MessageComp
