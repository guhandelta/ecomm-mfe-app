import {
  Controller,
  Get,
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
    1: initialCart([2, 4, 6]), 
    2: initialCart([1, 3]),
  };

  constructor() {}

  @Get()
  @UseGuards(JwtAuthGuard) //Guard this method by applying that JWT
  // The JWT is passed through the req, from which the userId is extarcted
  async index(@Request() req): Promise<Cart> {
    return this.carts[req.user.userId] ?? { cartItems: [] };
  }
}
