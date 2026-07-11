
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Trash2, CheckSquare, Square, Minus, Plus } from 'lucide-react-native';
import { getCart, updateCartQty, toggleCartSelect, toggleSelectAll, clearSelectedCart } from '../store/db';

export default function CartScreen() {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQty = (cartId, currentQty, delta) => {
    updateCartQty(cartId, currentQty + delta);
    loadCart();
  };

  const handleToggleSelect = (cartId, currentStatus) => {
    toggleCartSelect(cartId, !currentStatus);
    loadCart();
  };

  const allSelected = cart.length > 0 && cart.every(item => item.selected);

  const handleToggleAll = () => {
    toggleSelectAll(!allSelected);
    loadCart();
  };

  const handleCheckout = () => {
    const selectedItems = cart.filter(i => i.selected);
    if (selectedItems.length === 0) {
      alert('Selecciona al menos un producto para comprar');
      return;
    }
    alert('¡Compra exitosa! Total pagado: US $' + total.toFixed(2));
    clearSelectedCart();
    loadCart();
  };

  const selectedCount = cart.filter(i => i.selected).reduce((acc, item) => acc + item.qty, 0);
  const total = cart.filter(i => i.selected).reduce((sum, item) => sum + (item.price * item.qty), 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity style={styles.checkbox} onPress={() => handleToggleSelect(item.cartId, item.selected)}>
        {item.selected ? <CheckSquare color="#ff4747" size={22} fill="#ffeeee" /> : <Square color="#ccc" size={22} />}
      </TouchableOpacity>
      
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>US $${item.price.toFixed(2)}</Text>
        
        <View style={styles.actionsRow}>
          <View style={styles.qtyBox}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => handleUpdateQty(item.cartId, item.qty, -1)}>
              <Minus size={16} color="#555" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => handleUpdateQty(item.cartId, item.qty, 1)}>
              <Plus size={16} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingCart color="#ccc" size={80} />
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
        <TouchableOpacity style={styles.shopBtn}>
          <Text style={styles.shopBtnText}>Ir de compras</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.cartId}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkAllWrap} onPress={handleToggleAll}>
          {allSelected ? <CheckSquare color="#ff4747" size={22} fill="#ffeeee" /> : <Square color="#ccc" size={22} />}
          <Text style={styles.checkAllText}>Todo</Text>
        </TouchableOpacity>
        
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>US $${total.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={[styles.checkoutBtn, selectedCount === 0 && styles.checkoutDisabled]} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Pagar ({selectedCount})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#666', fontSize: 16, marginTop: 16, marginBottom: 24 },
  shopBtn: { backgroundColor: '#ff4747', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 },
  shopBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  list: { padding: 10, paddingBottom: 80 },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  checkbox: { marginRight: 12 },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#f9f9f9', marginRight: 12 },
  details: { flex: 1, height: 80, justifyContent: 'space-between' },
  name: { color: '#222', fontSize: 14, lineHeight: 18 },
  price: { color: '#ff4747', fontSize: 16, fontWeight: 'bold' },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%' },
  qtyBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 16, overflow: 'hidden' },
  qtyBtn: { padding: 4, paddingHorizontal: 8, backgroundColor: '#f9f9f9' },
  qtyText: { paddingHorizontal: 12, fontSize: 14, fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  checkAllWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 'auto' },
  checkAllText: { fontSize: 14, color: '#333', marginLeft: 6 },
  totalInfo: { alignItems: 'flex-end', marginRight: 12 },
  totalLabel: { fontSize: 12, color: '#666' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#ff4747' },
  checkoutBtn: { backgroundColor: '#ff4747', paddingHorizontal: 24, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  checkoutDisabled: { backgroundColor: '#ffb3b3' },
  checkoutText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});
  