type PromotionType = {
  id: string | number;
  type: string;
  name: string;
  targetIds: [string | number];
  discounts: [string];
};

export default PromotionType;
