import React, {Component} from 'react'

export default class MG extends Component {
    
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImg: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState ({
                    allMemeImg: memes
                })
            })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImg.length)
        const randImg = this.state.allMemeImg[randNum].url
        this.setState({
            randImg: randImg
        })
    }
    
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randImg}/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
    
}