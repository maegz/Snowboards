import React, { Component } from 'react'
import Slider from 'react-slick'
import NextArrow from '../media/nextarrow.png'
import PrevArrow from '../media/prevarrow.png'
// import '../styles/ShopComponent.css'

export default class Shop extends Component {
  state = {
    nav1: null,
    nav2: null
  }

  componentDidMount () {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    })
  }

  importAll = (r) => {
    let images = {}
    r.keys().map((item, index) => { return images[item.replace('./', '', '.png', '').replace('.png', '')] = r(item); })
    return images
  }

  render () {
    // SLIDER SETTINGS //
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      swipeToSlide: true,
      slidesToShow: 4,
      speed: 500,
      nextArrow: <nextArrow><img src={ NextArrow } alt="Next" /></nextArrow>,
      prevArrow: <prevArrow><img src={ PrevArrow } alt="Previous" /></prevArrow>,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 2 } },
        { breakpoint: 800, settings: { slidesToShow: 1 } }
      ]
    }

    const images = this.importAll(require.context('../media', false, /\.(png|jpe?g|svg)$/));

    return (
      <div id='carouselComponent'>
        <h1>Snowboards</h1>
        <h6>Aliquam Erat volutpat curabitur ut consequat arcu eget laoreet est</h6>
        <Slider {...settings} asNavFor={this.state.nav2} ref={slider => this.slider1 = slider} >
          <div><img src={ images['board1'] } alt="Board 1" /></div>
          <div><img src={ images['board2'] } alt="Board 2" /></div>
          <div><img src={ images['board3'] } alt="Board 3" /></div>
          <div><img src={ images['board4'] } alt="Board 4" /></div>
          <div><img src={ images['board5'] } alt="Board 5" /></div>
        </Slider>
        <Slider asNavFor={this.state.nav1} ref={slider => this.slider2 = slider} slidesToShow={1} infinite={true}>
          <div><h5>Snowboard extreme series 1</h5></div>
          <div><h5>Snowboard extreme series 2</h5></div>
          <div><h5>Snowboard extreme series 3</h5></div>
          <div><h5>Snowboard extreme series 4</h5></div>
          <div><h5>Snowboard extreme series 5</h5></div>
        </Slider>
      </div>
    )
  }
}
