import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import products, { Product } from '../../products'

interface CartItem extends Product{
  // CartItem will extent the Product data, with an additional param of quantity
  quantity: number;
}

interface Cart{
  cartItems: CartItem[];
}

const initialCart = (indexes:number[]): Cart =>({
  /* Mapping through the references of the products, that are to preloaded into the cart, for the- 
  particular user */
  cartItems: indexes.map(index =>({
    ...products[index],
    quantity: 1,
  })),
});

@Controller('cart')
export class CartController {
  private carts: Record<number, Cart> = {
    // Just to make the testing easier, a sample cart for sally and maria are created as a private var
    1: initialCart([2, 4, 5]), 
    2: initialCart([1, 3]),
  };

  constructor() {}

  @Get()
  @UseGuards(JwtAuthGuard) //Guard this method by applying that JWT
  // The JWT is passed through the req, from which the userId is extarcted
  async index(@Request() req): Promise<Cart> {
    return this.carts[req.user.userId] ?? { cartItems: [] };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  /* This statement says that the req body has an id of the elementm that the user intends to add, and 
  return the new-updated cart*/
  async create(@Request() req, @Body() { id }: {id: string}): Promise<Cart> {
    const cart = this.carts[req.user.userId];
    const cartItem = cart.cartItems.find(
      // Checking if the item already exists in the cart
      cartItem => cartItem.id === parseInt(id)
    )
    if(cartItem){
      cartItem.quantity += 1;
    } else{
      cart.cartItems.push({
        ...products.find(product => product.id === parseInt(id)),
        quantity: 1,
      });
    };
    return cart;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async destroy(@Request() req): Promise<Cart>{
    this.carts[req.user.userId] = { cartItems : [] };
    return this.carts[req.user.userId]; //Returning the userId of the cart that was emptied
  }
}
