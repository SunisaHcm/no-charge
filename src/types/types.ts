// Order types
export interface OrderItem {
  id: string;
  code: string;
  orderName: string;
  netPrice: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  qty: number;
  doctorShare: number;
  careProvider: string;
  details: OrderDetails;
}

export interface OrderDetails {
  subCategory: string;
  orderName: string;
  [key: string]: any; // For dynamic fields based on order type
}

// Form field types for different order modals
export interface BoneGraftDetails {
  boneType: string;
  boneMaterial: string;
  membrane: string;
  tentingScrew: string;
  fixingScrew: string[];
  sutureMaterial: string;
  anestheticUsed: boolean;
}

export interface GumSurgeryDetails {
  boneMaterial: string;
  membrane: string;
  tentingScrew: string;
  fixingScrew: string[];
  periodentalDressing: string;
  sutureMaterial: string;
  anestheticUsed: boolean;
}

// Options data types
export interface OptionItem {
  value: string;
  label: string;
  price?: number;
}

export interface SubCategoryOption {
  value: string;
  label: string;
  orderNames: OptionItem[];
}