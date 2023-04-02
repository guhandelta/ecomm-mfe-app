import React, { Component } from 'react'

class SafeComponent extends Component {

    constructor(props){
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error){
        return { hasError: true }
    }

    componentDidCatch(){
        // The error can be analyzed and handled appropriately here
    }

  render() {

    if(this.state.hasError){
        return <h1>Something went wrong</h1>
    }

    return this.props.children;
  }
}

export default SafeComponent