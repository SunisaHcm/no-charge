import { OrderItem, SubCategoryOption } from '../types/types';

// Generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Categories and order names
export const SUB_CATEGORIES: SubCategoryOption[] = [
  {
    value: 'all',
    label: 'All',
    orderNames: [
      { value: 'boneGraft', label: 'Bone graft' },
      { value: 'gumSurgery', label: 'ผ่าตัดเหงือก' }
    ]
  },
  {
    value: 'boneGraft',
    label: 'Bone graft',
    orderNames: [
      { value: 'boneGraft', label: 'Bone graft' }
    ]
  },
  {
    value: 'gumSurgery',
    label: 'ผ่าตัดเหงือก',
    orderNames: [
      { value: 'gumSurgery', label: 'ผ่าตัดเหงือก' }
    ]
  }
];

// Options for Bone graft
export const BONE_TYPE_OPTIONS = [
  { value: 'boneType1', label: 'Bone Type 1' },
  { value: 'boneType2', label: 'Bone Type 2' },
  { value: 'boneType3', label: 'Bone Type 3' },
  { value: 'boneType4', label: 'Bone Type 4' },
  { value: 'boneType5', label: 'Bone Type 5' },
];

export const BONE_MATERIAL_OPTIONS = [
  { value: 'boneMaterial1', label: 'Bone material 1' },
  { value: 'boneMaterial2', label: 'Bone material 2' },
  { value: 'boneMaterial3', label: 'Bone material 3' },
];

export const MEMBRANE_OPTIONS = [
  { value: 'membrane1', label: 'Membrane 1' },
  { value: 'membrane2', label: 'Membrane 2' },
  { value: 'membrane3', label: 'Membrane 3' },
];

export const TENTING_SCREW_OPTIONS = [
  { value: '7mm', label: '7mm' },
  { value: '10mm', label: '10mm' },
  { value: '13mm', label: '13mm' },
  { value: '15mm', label: '15mm' },
];

export const FIXING_SCREW_OPTIONS = [
  { value: 'fixingScrew1', label: 'Fixing Screw 1' },
  { value: 'fixingScrew2', label: 'Fixing Screw 2' },
  { value: 'fixingScrew3', label: 'Fixing Screw 3' },
];

export const SUTURE_MATERIAL_OPTIONS = [
  { value: 'mersilk3-0', label: 'Mersilk3-0' },
  { value: 'thysilk3-0', label: 'Thysilk3-0' },
  { value: 'thysilk4-0', label: 'Thysilk4-0' },
  { value: 'ethilon4-0', label: 'Ethilon4-0' },
  { value: 'ethilon5-0', label: 'Ethilon5-0' },
  { value: 'vicryl3-0', label: 'Vicryl3-0' },
  { value: 'optime4-0', label: 'Optime4-0' },
  { value: 'polysorb5-0', label: 'Polysorb5-0' },
];

// Options for Gum Surgery (ผ่าตัดเหงือก)
export const PERIODENTAL_DRESSING_OPTIONS = [
  { value: 'coePack', label: 'Coe pack' },
  { value: 'periacryl', label: 'Periacryl' },
];

// Mock data for Summary Page
export const mockOrders: OrderItem[] = [
  {
    id: generateId(),
    code: 'BG001',
    orderName: 'Bone graft',
    netPrice: 5500,
    status: 'Processing',
    qty: 1,
    doctorShare: 550,
    careProvider: 'Dr. Smith',
    details: {
      subCategory: 'Bone graft',
      orderName: 'Bone graft',
      boneType: 'Bone Type 1',
      boneMaterial: 'Bone material 1',
      membrane: 'Membrane 1',
      tentingScrew: '7mm',
      fixingScrew: ['Fixing Screw 1'],
      sutureMaterial: 'Mersilk3-0',
      anestheticUsed: true
    }
  },
  {
    id: generateId(),
    code: 'GS001',
    orderName: 'ผ่าตัดเหงือก',
    netPrice: 4800,
    status: 'Processing',
    qty: 1,
    doctorShare: 480,
    careProvider: 'Dr. Lee',
    details: {
      subCategory: 'ผ่าตัดเหงือก',
      orderName: 'ผ่าตัดเหงือก',
      boneMaterial: 'Bone material 2',
      membrane: 'Membrane 2',
      tentingScrew: '10mm',
      fixingScrew: ['Fixing Screw 2', 'Fixing Screw 3'],
      periodentalDressing: 'Coe pack',
      sutureMaterial: 'Vicryl3-0',
      anestheticUsed: true
    }
  },
  {
    id: generateId(),
    code: 'BG002',
    orderName: 'Bone graft',
    netPrice: 6200,
    status: 'Completed',
    qty: 1,
    doctorShare: 620,
    careProvider: 'Dr. Wilson',
    details: {
      subCategory: 'Bone graft',
      orderName: 'Bone graft',
      boneType: 'Bone Type 2',
      boneMaterial: 'Bone material 3',
      membrane: 'Membrane 2',
      tentingScrew: '13mm',
      fixingScrew: ['Fixing Screw 2'],
      sutureMaterial: 'Ethilon4-0',
      anestheticUsed: true
    }
  },
  {
    id: generateId(),
    code: 'GS002',
    orderName: 'ผ่าตัดเหงือก',
    netPrice: 5100,
    status: 'Cancelled',
    qty: 1,
    doctorShare: 510,
    careProvider: 'Dr. Anderson',
    details: {
      subCategory: 'ผ่าตัดเหงือก',
      orderName: 'ผ่าตัดเหงือก',
      boneMaterial: 'Bone material 1',
      membrane: 'Membrane 3',
      tentingScrew: '15mm',
      fixingScrew: ['Fixing Screw 1', 'Fixing Screw 3'],
      periodentalDressing: 'Periacryl',
      sutureMaterial: 'Thysilk4-0',
      anestheticUsed: false
    }
  }
];