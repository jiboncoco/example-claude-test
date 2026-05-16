import { Injectable } from '@angular/core';

export interface Category { id: string; name: string; count: number; color: string; }
export interface Supplier { id: string; name: string; city: string; contact: string; email: string; products: number; ontime: number; }
export interface Marketplace { id: string; name: string; initials: string; color: string; orders: number; revenue: number; }
export interface Product { id: string; sku: string; name: string; category: string; brand: string; supplier: string; stock: number; min: number; purchase: number; price: number; status: string; updated: string; sold30: number; }
export interface IncomingReceipt { id: string; supplier: string; items: number; qty: number; value: number; date: string; status: string; notes: string; }
export interface OnlineOrder { id: string; marketplace: string; customer: string; items: number; qty: number; value: number; date: string; status: string; payment: string; }
export interface OfflineSale { id: string; cashier: string; items: number; qty: number; value: number; date: string; payment: string; }
export interface CustomerReturn { id: string; customer: string; product: string; qty: number; value: number; reason: string; date: string; status: string; ref: string; method: string; submittedBy: string; }
export interface SupplierReturn { id: string; supplier: string; reason: string; items: number; qty: number; value: number; date: string; status: string; }
export interface DamagedGoods { id: string; supplier: string; reason: string; items: number; qty: number; value: number; date: string; status: string; }
export interface User { id: string; name: string; email: string; role: string; status: string; last: string; joined: string; initials: string; color: string; }
export interface Role { id: string; name: string; desc: string; users: number; badge: string; }
export interface ReportType { id: string; name: string; desc: string; icon: string; color: string; last: string; size: string; }

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly currentUser = { name: 'Alesia Karpova', short: 'Alesia K.', initials: 'AK', role: 'Super Admin', email: 'alesia@waresync.io' };

  readonly categories: Category[] = [
    { id: 'cat-1', name: 'Electronics', count: 248, color: 'purple' },
    { id: 'cat-2', name: 'Apparel', count: 412, color: 'pink' },
    { id: 'cat-3', name: 'Home & Living', count: 186, color: 'yellow' },
    { id: 'cat-4', name: 'Beauty', count: 95, color: 'coral' },
    { id: 'cat-5', name: 'Grocery', count: 327, color: 'green' },
    { id: 'cat-6', name: 'Sports', count: 71, color: 'blue' },
  ];

  readonly brands = ['Northwind','Aurelia','Kobold','Mercato','Pellucid','Saltmark','Tessera','Verdure','Halcyon','Brackle'];

  readonly suppliers: Supplier[] = [
    { id: 'sup-1', name: 'Northwind Distribution', city: 'Jakarta', contact: 'Riza Pranoto', email: 'riza@northwind.id', products: 84, ontime: 96 },
    { id: 'sup-2', name: 'Pacific Trading Co.', city: 'Surabaya', contact: 'Maya Wirawan', email: 'maya@pacifictrade.co', products: 142, ontime: 91 },
    { id: 'sup-3', name: 'Mercato Grosir', city: 'Bandung', contact: 'Budi Santoso', email: 'budi@mercato.id', products: 67, ontime: 88 },
    { id: 'sup-4', name: 'Halcyon Beauty Lab', city: 'Tangerang', contact: 'Sari Mulia', email: 'sari@halcyon.lab', products: 38, ontime: 94 },
    { id: 'sup-5', name: 'Verdure Fresh', city: 'Bekasi', contact: 'Andre Putra', email: 'andre@verdure.fresh', products: 211, ontime: 89 },
    { id: 'sup-6', name: 'Brackle Hardware', city: 'Semarang', contact: 'Lina Hadi', email: 'lina@brackle.co', products: 53, ontime: 92 },
  ];

  readonly marketplaces: Marketplace[] = [
    { id: 'tokopedia', name: 'Tokopedia', initials: 'TP', color: '#22c55e', orders: 1842, revenue: 286400000 },
    { id: 'shopee', name: 'Shopee', initials: 'SP', color: '#f97316', orders: 2210, revenue: 312800000 },
    { id: 'lazada', name: 'Lazada', initials: 'LZ', color: '#1e3a8a', orders: 762, revenue: 118200000 },
    { id: 'tiktok', name: 'TikTok Shop', initials: 'TS', color: '#0f172a', orders: 1486, revenue: 224500000 },
    { id: 'bukalapak', name: 'Bukalapak', initials: 'BL', color: '#dc2626', orders: 412, revenue: 64800000 },
    { id: 'blibli', name: 'Blibli', initials: 'BB', color: '#0ea5e9', orders: 588, revenue: 92100000 },
    { id: 'website', name: 'Website Store', initials: 'WS', color: '#7c5cf5', orders: 314, revenue: 51600000 },
  ];

  products: Product[] = [
    { id: 'p-001', sku: 'NW-AUD-481', name: 'Northwind Wireless Earbuds Pro', category: 'Electronics', brand: 'Northwind', supplier: 'Northwind Distribution', stock: 142, min: 30, purchase: 285000, price: 489000, status: 'active', updated: '2 hours ago', sold30: 234 },
    { id: 'p-002', sku: 'AU-TEE-118', name: 'Aurelia Cotton Crew Tee', category: 'Apparel', brand: 'Aurelia', supplier: 'Pacific Trading Co.', stock: 8, min: 25, purchase: 42000, price: 119000, status: 'active', updated: '5 hours ago', sold30: 168 },
    { id: 'p-003', sku: 'KB-BLD-220', name: 'Kobold 8L Stand Mixer', category: 'Home & Living', brand: 'Kobold', supplier: 'Mercato Grosir', stock: 24, min: 10, purchase: 1240000, price: 1890000, status: 'active', updated: '1 day ago', sold30: 41 },
    { id: 'p-004', sku: 'HL-SRM-091', name: 'Halcyon Vitamin C Serum 30ml', category: 'Beauty', brand: 'Halcyon', supplier: 'Halcyon Beauty Lab', stock: 0, min: 40, purchase: 78000, price: 169000, status: 'active', updated: '3 days ago', sold30: 312 },
    { id: 'p-005', sku: 'VD-OAT-552', name: 'Verdure Organic Oat Milk 1L', category: 'Grocery', brand: 'Verdure', supplier: 'Verdure Fresh', stock: 386, min: 60, purchase: 18500, price: 32000, status: 'active', updated: '6 hours ago', sold30: 894 },
    { id: 'p-006', sku: 'BR-DRL-014', name: 'Brackle 18V Cordless Drill', category: 'Sports', brand: 'Brackle', supplier: 'Brackle Hardware', stock: 19, min: 15, purchase: 620000, price: 998000, status: 'active', updated: '2 days ago', sold30: 27 },
    { id: 'p-007', sku: 'PL-CDL-307', name: 'Pellucid Soy Candle — Cedar', category: 'Home & Living', brand: 'Pellucid', supplier: 'Mercato Grosir', stock: 67, min: 20, purchase: 56000, price: 145000, status: 'active', updated: '4 hours ago', sold30: 89 },
    { id: 'p-008', sku: 'TS-NB-201', name: 'Tessera Linen Notebook A5', category: 'Apparel', brand: 'Tessera', supplier: 'Pacific Trading Co.', stock: 4, min: 30, purchase: 24000, price: 75000, status: 'active', updated: '8 hours ago', sold30: 142 },
    { id: 'p-009', sku: 'SM-SLT-660', name: 'Saltmark Sea Salt Flakes 250g', category: 'Grocery', brand: 'Saltmark', supplier: 'Verdure Fresh', stock: 124, min: 40, purchase: 38000, price: 78000, status: 'active', updated: '1 day ago', sold30: 211 },
    { id: 'p-010', sku: 'NW-CHG-732', name: 'Northwind 65W USB-C Charger', category: 'Electronics', brand: 'Northwind', supplier: 'Northwind Distribution', stock: 218, min: 50, purchase: 124000, price: 245000, status: 'active', updated: '11 hours ago', sold30: 178 },
    { id: 'p-011', sku: 'AU-JKT-409', name: 'Aurelia Quilted Field Jacket', category: 'Apparel', brand: 'Aurelia', supplier: 'Pacific Trading Co.', stock: 31, min: 12, purchase: 380000, price: 749000, status: 'active', updated: '2 days ago', sold30: 22 },
    { id: 'p-012', sku: 'HL-LIP-118', name: 'Halcyon Tinted Lip Balm', category: 'Beauty', brand: 'Halcyon', supplier: 'Halcyon Beauty Lab', stock: 56, min: 35, purchase: 22000, price: 65000, status: 'active', updated: '12 hours ago', sold30: 198 },
    { id: 'p-013', sku: 'VD-HNY-330', name: 'Verdure Wildflower Honey 500g', category: 'Grocery', brand: 'Verdure', supplier: 'Verdure Fresh', stock: 92, min: 25, purchase: 64000, price: 125000, status: 'inactive', updated: '5 days ago', sold30: 0 },
    { id: 'p-014', sku: 'KB-KTL-558', name: 'Kobold Electric Kettle 1.7L', category: 'Home & Living', brand: 'Kobold', supplier: 'Mercato Grosir', stock: 47, min: 18, purchase: 285000, price: 459000, status: 'active', updated: '1 day ago', sold30: 38 },
    { id: 'p-015', sku: 'BR-SCR-099', name: 'Brackle Stainless Screwdriver Set', category: 'Sports', brand: 'Brackle', supplier: 'Brackle Hardware', stock: 12, min: 20, purchase: 145000, price: 249000, status: 'active', updated: '3 days ago', sold30: 16 },
  ];

  readonly incoming: IncomingReceipt[] = [
    { id: 'GR-2026-0148', supplier: 'Northwind Distribution', items: 12, qty: 480, value: 84200000, date: '2026-05-08', status: 'received', notes: 'Weekly electronics restock' },
    { id: 'GR-2026-0147', supplier: 'Verdure Fresh', items: 8, qty: 920, value: 28400000, date: '2026-05-08', status: 'received', notes: 'Cold chain — verified temp logs' },
    { id: 'GR-2026-0146', supplier: 'Pacific Trading Co.', items: 22, qty: 612, value: 96100000, date: '2026-05-07', status: 'partial', notes: '4 SKUs short — supplier notified' },
    { id: 'GR-2026-0145', supplier: 'Halcyon Beauty Lab', items: 6, qty: 240, value: 21800000, date: '2026-05-07', status: 'received', notes: '' },
    { id: 'GR-2026-0144', supplier: 'Mercato Grosir', items: 15, qty: 188, value: 51400000, date: '2026-05-06', status: 'pending', notes: 'Awaiting QC sign-off' },
    { id: 'GR-2026-0143', supplier: 'Brackle Hardware', items: 9, qty: 142, value: 18200000, date: '2026-05-06', status: 'received', notes: '' },
    { id: 'GR-2026-0142', supplier: 'Verdure Fresh', items: 11, qty: 740, value: 22600000, date: '2026-05-05', status: 'received', notes: '' },
    { id: 'GR-2026-0141', supplier: 'Northwind Distribution', items: 7, qty: 168, value: 39800000, date: '2026-05-04', status: 'received', notes: '' },
    { id: 'GR-2026-0140', supplier: 'Pacific Trading Co.', items: 18, qty: 412, value: 64500000, date: '2026-05-03', status: 'received', notes: '' },
  ];

  readonly onlineOrders: OnlineOrder[] = [
    { id: 'SO-26-018421', marketplace: 'shopee', customer: 'Anandita W.', items: 3, qty: 5, value: 487000, date: '2026-05-09 14:22', status: 'shipped', payment: 'paid' },
    { id: 'SO-26-018420', marketplace: 'tokopedia', customer: 'Reza H.', items: 1, qty: 1, value: 489000, date: '2026-05-09 13:48', status: 'packed', payment: 'paid' },
    { id: 'SO-26-018419', marketplace: 'tiktok', customer: 'Putri D.', items: 2, qty: 2, value: 234000, date: '2026-05-09 13:11', status: 'shipped', payment: 'paid' },
    { id: 'SO-26-018418', marketplace: 'shopee', customer: 'Galang S.', items: 4, qty: 7, value: 612000, date: '2026-05-09 12:44', status: 'pending', payment: 'pending' },
    { id: 'SO-26-018417', marketplace: 'lazada', customer: 'Mira K.', items: 1, qty: 2, value: 158000, date: '2026-05-09 11:30', status: 'shipped', payment: 'paid' },
    { id: 'SO-26-018416', marketplace: 'tokopedia', customer: 'Doni P.', items: 2, qty: 3, value: 1380000, date: '2026-05-09 10:18', status: 'shipped', payment: 'paid' },
    { id: 'SO-26-018415', marketplace: 'website', customer: 'Ayu N.', items: 5, qty: 9, value: 824000, date: '2026-05-09 09:55', status: 'packed', payment: 'paid' },
    { id: 'SO-26-018414', marketplace: 'bukalapak', customer: 'Tomi R.', items: 1, qty: 1, value: 119000, date: '2026-05-09 09:12', status: 'cancelled', payment: 'refunded' },
    { id: 'SO-26-018413', marketplace: 'blibli', customer: 'Sinta L.', items: 3, qty: 4, value: 312000, date: '2026-05-09 08:40', status: 'shipped', payment: 'paid' },
  ];

  readonly offlineSales: OfflineSale[] = [
    { id: 'POS-26-002841', cashier: 'Bess A.', items: 4, qty: 6, value: 412000, date: '2026-05-09 15:02', payment: 'cash' },
    { id: 'POS-26-002840', cashier: 'Tahsan K.', items: 2, qty: 2, value: 268000, date: '2026-05-09 14:48', payment: 'card' },
    { id: 'POS-26-002839', cashier: 'Sanika S.', items: 6, qty: 11, value: 894000, date: '2026-05-09 14:21', payment: 'qris' },
    { id: 'POS-26-002838', cashier: 'Bess A.', items: 1, qty: 1, value: 1890000, date: '2026-05-09 13:55', payment: 'card' },
    { id: 'POS-26-002837', cashier: 'Demon O.', items: 3, qty: 4, value: 327000, date: '2026-05-09 13:12', payment: 'cash' },
    { id: 'POS-26-002836', cashier: 'Cardi B.', items: 2, qty: 3, value: 198000, date: '2026-05-09 12:40', payment: 'qris' },
  ];

  readonly customerReturns: CustomerReturn[] = [
    { id: 'RC-26-00142', customer: 'Anandita W.', product: 'Northwind Wireless Earbuds Pro', qty: 1, value: 489000, reason: 'Defective on arrival', date: '2026-05-09', status: 'pending', ref: 'SO-26-018421', method: 'Original payment', submittedBy: 'Tahsan Khan' },
    { id: 'RC-26-00141', customer: 'Reza H.', product: 'Aurelia Cotton Crew Tee', qty: 2, value: 238000, reason: 'Wrong size shipped', date: '2026-05-08', status: 'approved', ref: 'SO-26-018413', method: 'Store credit', submittedBy: 'Sanika Suny' },
    { id: 'RC-26-00140', customer: 'Putri D.', product: 'Halcyon Vitamin C Serum 30ml', qty: 1, value: 169000, reason: 'Allergic reaction', date: '2026-05-08', status: 'completed', ref: 'SO-26-018407', method: 'Original payment', submittedBy: 'Lucinda Wills' },
    { id: 'RC-26-00139', customer: 'Galang S.', product: 'Kobold 8L Stand Mixer', qty: 1, value: 1890000, reason: 'Damaged in transit', date: '2026-05-07', status: 'approved', ref: 'SO-26-018401', method: 'Original payment', submittedBy: 'Bess Alkins' },
    { id: 'RC-26-00138', customer: 'Mira K.', product: 'Tessera Linen Notebook A5', qty: 3, value: 225000, reason: 'Customer changed mind', date: '2026-05-07', status: 'rejected', ref: 'SO-26-018394', method: '—', submittedBy: 'Tahsan Khan' },
  ];

  readonly supplierReturns: SupplierReturn[] = [
    { id: 'RS-26-00088', supplier: 'Pacific Trading Co.', reason: 'Customer return — sizing defect', items: 2, qty: 4, value: 476000, date: '2026-05-08', status: 'approved' },
    { id: 'RS-26-00087', supplier: 'Northwind Distribution', reason: 'DOA — battery defect', items: 1, qty: 2, value: 978000, date: '2026-05-07', status: 'approved' },
    { id: 'RS-26-00086', supplier: 'Halcyon Beauty Lab', reason: 'Allergic reaction reported', items: 1, qty: 1, value: 169000, date: '2026-05-07', status: 'pending' },
    { id: 'RS-26-00085', supplier: 'Mercato Grosir', reason: 'Wrong size shipped to customer', items: 3, qty: 3, value: 1377000, date: '2026-05-06', status: 'approved' },
  ];

  readonly damagedGoods: DamagedGoods[] = [
    { id: 'DG-26-00214', supplier: 'Verdure Fresh', reason: 'Expired before sale', items: 4, qty: 88, value: 1840000, date: '2026-05-08', status: 'returned' },
    { id: 'DG-26-00213', supplier: 'Mercato Grosir', reason: 'Warehouse forklift damage', items: 2, qty: 3, value: 5670000, date: '2026-05-07', status: 'pending' },
    { id: 'DG-26-00212', supplier: 'Halcyon Beauty Lab', reason: 'Packaging breach — leaked', items: 1, qty: 12, value: 2028000, date: '2026-05-06', status: 'returned' },
  ];

  users: User[] = [
    { id: 'u-1', name: 'Alesia Karpova', email: 'alesia@waresync.io', role: 'Super Admin', status: 'active', last: 'Active now', joined: '2024-01-12', initials: 'AK', color: 'purple' },
    { id: 'u-2', name: 'Bess Alkins', email: 'bess@waresync.io', role: 'Warehouse Staff', status: 'active', last: '2 hours ago', joined: '2024-03-04', initials: 'BA', color: 'coral' },
    { id: 'u-3', name: 'Tahsan Khan', email: 'tahsan@waresync.io', role: 'Sales Staff', status: 'active', last: '30 min ago', joined: '2024-04-19', initials: 'TK', color: 'yellow' },
    { id: 'u-4', name: 'Sanika Suny', email: 'sanika@waresync.io', role: 'Sales Staff', status: 'active', last: 'Active now', joined: '2024-06-21', initials: 'SS', color: 'green' },
    { id: 'u-5', name: 'Demon Owusu', email: 'demon@waresync.io', role: 'Warehouse Staff', status: 'active', last: '20 min ago', joined: '2024-08-02', initials: 'DO', color: 'blue' },
    { id: 'u-6', name: 'Cardi Bautista', email: 'cardi@waresync.io', role: 'Manager', status: 'active', last: 'Active now', joined: '2024-02-28', initials: 'CB', color: 'pink' },
    { id: 'u-7', name: 'Josh Dunset', email: 'josh@waresync.io', role: 'Finance Staff', status: 'active', last: '1 hour ago', joined: '2024-09-14', initials: 'JD', color: 'purple' },
    { id: 'u-8', name: 'Erik Pitman', email: 'erik@waresync.io', role: 'Warehouse Staff', status: 'inactive', last: '3 weeks ago', joined: '2025-01-08', initials: 'EP', color: 'coral' },
    { id: 'u-9', name: 'May Padilla', email: 'may@waresync.io', role: 'Manager', status: 'active', last: '4 hours ago', joined: '2025-02-22', initials: 'MP', color: 'yellow' },
    { id: 'u-10', name: 'Lucinda Wills', email: 'lucinda@waresync.io', role: 'Sales Staff', status: 'active', last: '12 min ago', joined: '2025-03-30', initials: 'LW', color: 'blue' },
  ];

  readonly roles: Role[] = [
    { id: 'r-1', name: 'Super Admin', desc: 'Full system access — all modules + settings', users: 1, badge: 'purple' },
    { id: 'r-2', name: 'Manager', desc: 'Approve returns, view all transactions and analytics', users: 2, badge: 'pink' },
    { id: 'r-3', name: 'Warehouse Staff', desc: 'Manage inventory, incoming and outgoing goods', users: 3, badge: 'coral' },
    { id: 'r-4', name: 'Sales Staff', desc: 'Create sales transactions, view sales reports', users: 3, badge: 'yellow' },
    { id: 'r-5', name: 'Finance Staff', desc: 'View and export reports, no transaction access', users: 1, badge: 'blue' },
  ];

  readonly reportTypes: ReportType[] = [
    { id: 'rep-stock', name: 'Stock Report', desc: 'Live snapshot of all SKUs by warehouse, category and brand', icon: 'box', color: 'purple', last: 'Today, 09:14', size: '4.2 MB' },
    { id: 'rep-incoming', name: 'Incoming Goods Report', desc: 'All supplier receipts with line-item detail and value totals', icon: 'inbox', color: 'green', last: 'Yesterday, 18:00', size: '2.8 MB' },
    { id: 'rep-outgoing', name: 'Outgoing Goods Report', desc: 'All four outgoing types — online, offline, returns, damages', icon: 'truck', color: 'coral', last: 'Today, 11:42', size: '6.1 MB' },
    { id: 'rep-online', name: 'Online Sales Report', desc: 'Sales by marketplace channel with payment + fulfillment status', icon: 'shop', color: 'pink', last: 'Today, 08:30', size: '5.4 MB' },
    { id: 'rep-offline', name: 'Offline Sales Report', desc: 'POS transactions by cashier and payment method', icon: 'cash', color: 'yellow', last: '3 days ago', size: '1.9 MB' },
    { id: 'rep-returns', name: 'Returns Report', desc: 'Sales returns and damaged-goods returns with approval trail', icon: 'rotate', color: 'blue', last: 'Yesterday, 14:11', size: '1.2 MB' },
    { id: 'rep-supplier', name: 'Supplier Report', desc: 'Performance — on-time %, fill rate, return rate per supplier', icon: 'building', color: 'purple', last: 'This week', size: '3.6 MB' },
    { id: 'rep-movement', name: 'Product Movement Report', desc: 'Per-SKU stock movement history with running balance', icon: 'flow', color: 'green', last: 'Today, 06:00', size: '8.4 MB' },
  ];

  readonly userStatSeries = [380,420,395,440,360,300,340,420,460,440,395,350,310,280,330,400,380,450,470,440,395,350,310,260,210,180,150,160,135,150,130];

  readonly statsToday = [
    { name: 'Visitors', value: 10113, color: '#4f46e5', pct: 90 },
    { name: 'Subscriber', value: 1123, color: '#dc2626', pct: 80 },
    { name: 'Contributor', value: 1100, color: '#d97706', pct: 75 },
    { name: 'Author', value: 56, color: '#2563eb', pct: 50 },
  ];

  formatIDR(n: number): string {
    if (n >= 1e9) return `Rp ${(n/1e9).toFixed(1)}B`;
    if (n >= 1e6) return `Rp ${(n/1e6).toFixed(1)}M`;
    if (n >= 1e3) return `Rp ${(n/1e3).toFixed(0)}K`;
    return `Rp ${n}`;
  }

  formatIDRfull(n: number): string {
    return 'Rp ' + n.toLocaleString('en-US');
  }

  getMarketplace(id: string): Marketplace | undefined {
    return this.marketplaces.find(m => m.id === id);
  }
}
