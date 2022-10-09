type CartType = {
  id: string | number;
  author: string;
  title: string;
  price: number;
  description: string;
  images: [string];
  qty: number;
};

export default CartType;
