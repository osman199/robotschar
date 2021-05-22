import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [   ],
            searchfield: ''
        }
    }

    componentDidMount() {
        // When Page refreses this is run.
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { 
                return response.json();
            })
            .then(users => {
                return this.setState({ robots: users });
            })
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
    render () {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if(this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>Robo Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;