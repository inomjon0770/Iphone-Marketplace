import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Zap, 
  Settings, 
  ArrowLeft, 
  RotateCcw, 
  Crown,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminInventory } from './AdminInventory';
import { AdminOrders } from './AdminOrders';
import { AdminPOS } from './AdminPOS';
import { AdminProductModal } from './AdminProductModal';

export const AdminLayout = ({
  products,
  orders,
  currency,
  analytics,
  onBackToStore,
  onSaveProduct,
  onDeleteProduct,
  onUpdateStock,
  onUpdateOrderStatus,
  onCompletePOSSale,
  onPrintReceipt,
  onResetDemoData
}) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, inventory, orders, pos, settings
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const navTabs = [
    { id: 'dashboard', label: 'Tahlil & Statistika', icon: LayoutDashboard },
    { id: 'inventory', label: 'Tovarlar & Ombor', icon: Package },
    { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag, badge: orders.length },
    { id: 'pos', label: 'Tezkor Kassa', icon: Zap },
    { id: 'settings', label: 'Sozlamalar', icon: Settings }
  ];

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setProductModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setProductModalOpen(true);
  };

  return (
    <div style={{ padding: '24px 0 60px 0', minHeight: '80vh' }}>
      <div className="app-container">
        
        {/* Top Header of Admin */}
        <div className="admin-header-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px'
        }}>
          {/* Top Actions Row: Back to Store + Online Badge */}
          <div className="admin-header-actions" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <button
              onClick={onBackToStore}
              className="btn-apple btn-apple-glass"
              style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={15} />
              <span>Do'konga Qaytish</span>
            </button>

            <span className="admin-status-pill" style={{
              background: 'rgba(48, 209, 88, 0.14)',
              color: 'var(--apple-green, #30d158)',
              border: '1px solid rgba(48, 209, 88, 0.3)',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}>
              <CheckCircle size={13} />
              <span>Tizim Online</span>
            </span>
          </div>

          {/* Title and Subtitle Box */}
          <div className="admin-header-title-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={18} color="var(--accent-cyan, #73c4ff)" />
              <span style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>iLux Admin & Sotuvchilar Tizimi</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Do'kon boshqaruvi, tovarlar hisobi va oylik reytinglar
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div 
          className="admin-nav-tabs-bar"
          style={{
            display: 'flex',
            gap: '6px',
            background: 'var(--bg-secondary, #121519)',
            padding: '6px',
            borderRadius: 'var(--radius-lg, 16px)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '26px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'var(--accent-btn-bg, #73c4ff)' : 'transparent',
                  color: isActive ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-md, 12px)',
                  padding: '9px 18px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease'
                }}
              >
                <Icon size={15} color="currentColor" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span style={{
                    background: isActive ? 'rgba(0, 0, 0, 0.18)' : 'var(--badge-bg)',
                    color: isActive ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-primary)',
                    fontSize: '0.66rem',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    fontWeight: 800
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <div>
          {activeTab === 'dashboard' && (
            <AdminDashboard
              analytics={analytics}
              currency={currency}
              onQuickAddStock={(id, delta) => onUpdateStock(id, delta)}
              onOpenInventory={() => setActiveTab('inventory')}
              onOpenOrders={() => setActiveTab('orders')}
              onOpenPOS={() => setActiveTab('pos')}
            />
          )}

          {activeTab === 'inventory' && (
            <AdminInventory
              products={products}
              currency={currency}
              onOpenAddModal={handleOpenAdd}
              onOpenEditModal={handleOpenEdit}
              onDeleteProduct={onDeleteProduct}
              onUpdateStock={onUpdateStock}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders
              orders={orders}
              currency={currency}
              onUpdateOrderStatus={onUpdateOrderStatus}
              onPrintReceipt={onPrintReceipt}
            />
          )}

          {activeTab === 'pos' && (
            <AdminPOS
              products={products}
              currency={currency}
              onCompletePOSSale={onCompletePOSSale}
            />
          )}

          {activeTab === 'settings' && (
            <div className="glass-panel" style={{ padding: '30px', maxWidth: '680px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>
                Tizim Sozlamalari & Ma'lumotlarni Qayta Tiklash
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                Agar test qilish jarayonida yangi tovarlar qo'shib yoki buyurtmalarni o'chirib yuborgan bo'lsangiz, 
                tizimni birlamchi namunaviy holatiga qayta tiklashingiz mumkin.
              </p>

              <div style={{
                background: 'rgba(255, 69, 58, 0.08)',
                border: '1px solid rgba(255, 69, 58, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ flex: '1 1 240px' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                    Namunaviy Bazani Qayta Tiklash (Reset Demo Data)
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    15 ta original va 24K tovarlar, oylik statistika va namunaviy buyurtmalarni tiklaydi.
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Haqiqatan ham barcha ma'lumotlarni asl namunaviy holatiga qaytarmoqchimisiz?")) {
                      onResetDemoData();
                      alert("Ma'lumotlar muvaffaqiyatli qayta tiklandi!");
                    }
                  }}
                  className="btn-apple btn-apple-danger"
                  style={{ padding: '9px 16px', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  <RotateCcw size={14} />
                  <span>Qayta Tiklash</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Product Add / Edit Modal */}
      <AdminProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        productToEdit={productToEdit}
        onSaveProduct={onSaveProduct}
      />
    </div>
  );
};
