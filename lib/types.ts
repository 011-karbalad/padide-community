export interface Product {
  id: string
  source?: 'local' | 'woocommerce'
  wcId?: number
  slug: string
  name: string
  nameEn: string
  brand: string
  model: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  installmentPrice?: number
  monthlyPayment?: number
  downPayment?: number
  installmentMonths?: number
  images: string[]
  thumbnail: string
  rating: number
  reviewCount: number
  stock: number
  sold: number
  isNew?: boolean
  isFeatured?: boolean
  isBestSeller?: boolean
  hasInstallment?: boolean
  discount?: number
  description: string
  specifications: Record<string, string>
  tags: string[]
  warranty?: string
  sku?: string
  badge?: 'new' | 'bestseller' | 'sale' | 'installment'
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  color: string
  count: number
  description?: string
  image?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant?: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: CartItem[]
  total: number
  paymentMethod: string
  address: Address
  trackingCode?: string
}

export interface RepairOrder {
  id: string
  ticketNumber: string
  deviceBrand: string
  deviceModel: string
  problem: string
  status: 'pending' | 'diagnosed' | 'in-progress' | 'waiting-parts' | 'completed' | 'delivered'
  estimatedCost?: number
  finalCost?: number
  createdAt: string
  updatedAt: string
  technicianName?: string
  warranty?: string
  timeline: RepairTimeline[]
}

export interface RepairTimeline {
  id: string
  status: string
  note: string
  timestamp: string
}

export interface Address {
  id: string
  title: string
  fullName: string
  phone: string
  province: string
  city: string
  street: string
  postalCode: string
  isDefault: boolean
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'order' | 'repair' | 'payment' | 'promotion' | 'system'
  read: boolean
  date: string
}

export interface InstallmentPlan {
  months: number
  interestRate: number
  minDownPayment: number
}
