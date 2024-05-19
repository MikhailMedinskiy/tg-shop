export type Id = number | string;

export type LoginResponseT = {
  auth_token: string;
};

export type Variant = {
  id: Id;
  name: string;
  image: string;
};

export type Category = {
  id: Id;
  name: string;
  image: string;
};

export type ProductProps = {
  id: Id;
  name: string;
  description: string;
  price: number;
  is_liked: boolean;
  category: Category;
  variants: Variant[];
  image: string;
};

export type ProductsResponse = {
  products: ProductProps[];
};

export type ProductResponse = {
  product: ProductProps;
};

export type CategoriesResponse = {
  categories: Category[];
};

export type Login = {
  userName: string;
  chatId: string;
};

export type AddCart = {
  variantId: Id;
  quantity: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  variant: Variant;
  product: Omit<ProductProps, 'variants'>;
};

export type CartResponse = {
  line_items: CartItem[];
};

export type OrderRequest = {
  payMethod: 'string';
  comment: 'string';
  fullName: 'string';
  phone: 'string';
  city: {
    label: 'string';
    value: 'string';
  };
  np: {
    label: 'string';
    value: 'string';
  };
};

export type Order = {
  id: number;
  comment: string;
  status: string;
  pay_method: string;
  full_name: string;
  phone: string;
  city: {};
  np: string;
  line_items: LineItem[];
};

export type LineItem = {
  id: number;
  quantity: number;
  order_price: number;
  variant: Variant;
};

export type OrderList = {
  orders: Order[];
};

export type SelectedCategory = string | null;

export type Discount = {
  code: string;
  id: number;
  percentage_discount: string;
};
