import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from './actions/cart'

class CartList extends Component {
    constructor() {
        super()
        this.state = {
            cartList:[]
        }
    }
    
    getState = () => {
        this.setState({
            cartList: this.props.cartList
        })
    }

    componentDidMount() {
        this.getState();
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                       <th>id</th>
                       <th>商品名称</th>
                       <th>价格</th>
                       <th>数量</th>
                       <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.cartList.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={this.props.decrement.bind(this, item.id)}>-</button>
                                        <span>{item.amount}</span>
                                        <button onClick={
                                            () => {
                                                this.props.increment(item.id)
                                            }
                                        }>+</button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        cartList: state.cart
    }
}

/* const mapDispathToProps = dispatch => {
    return {
        add: (id) => dispatch(increment(id)),
        reduce: (id) => dispatch(decrement(id))
    }
} */

// export default connect(mapStateToProps, mapDispathToProps)(CartList)
export default connect(mapStateToProps, {increment, decrement})(CartList)
