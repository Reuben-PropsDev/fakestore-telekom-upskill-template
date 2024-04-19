export type User = {
  address: UserAddress
  id: number
  email: string
  username: string
  password: string
  name: UserName
  phone: string
  __v: number
}

type UserAddress = {
  geolocation: UserLocation
  city: string
  street: string
  number: number
  zipcode: string
}

type UserLocation = {
  lat: string
  long: string
}

type UserName = {
  firstname: string
  lastname: string
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
  quantity?: number;
}

type ProductRating = {
  rate: number
  count: number
}

export type Login = {
  token: string
}

export interface LoginUser {
  username: string
  password: string
}

export type ICart = {
  userId: number
  date: string
  products: CartProduct[]
}

export type CartProduct = {
  productId: number
  quantity: number
}
