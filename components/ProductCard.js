
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';

export default function ProductCard({ product, onPress, onAdd }) {
  const formatSold = (num) => num > 1000 ? +(num/1000).toFixed(1) + 'k' : num;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)} activeOpacity={0.9}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        {/* Etiqueta roja de ofertas */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>Oferta de Bienvenida</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.currency}>US $</Text>
          <Text style={styles.price}>{product.price.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.oldPrice}>US $${product.oldPrice.toFixed(2)}</Text>
        
        <View style={styles.ratingRow}>
          <Star color="#ff9000" fill="#ff9000" size={12} />
          <Text style={styles.ratingText}>{product.rating} | ${formatSold(product.sold)}+ vend.</Text>
        </View>

        {product.freeShipping === 1 && (
          <Text style={styles.freeShipping}>Envío gratis</Text>
        )}
      </View>
      
      {/* Botón flotante para añadir directo al carrito */}
      <TouchableOpacity style={styles.addBtn} onPress={(e) => { e.stopPropagation(); onAdd(product); }}>
        <ShoppingCart color="#ff4747" size={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    overflow: 'hidden', 
    flex: 1, 
    margin: 6,
    borderWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8
  },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#f9f9f9' },
  info: { padding: 8, position: 'relative' },
  name: { color: '#222', fontSize: 13, lineHeight: 18, marginBottom: 4 },
  tagContainer: { 
    backgroundColor: '#ffeeee', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 4, 
    paddingVertical: 2, 
    borderRadius: 4, 
    marginBottom: 6 
  },
  tagText: { color: '#ff4747', fontSize: 10, fontWeight: 'bold' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  currency: { color: '#ff4747', fontSize: 12, fontWeight: 'bold', marginRight: 2 },
  price: { color: '#ff4747', fontSize: 18, fontWeight: 'bold' },
  oldPrice: { color: '#999', fontSize: 11, textDecorationLine: 'line-through', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  ratingText: { color: '#999', fontSize: 11, marginLeft: 4 },
  freeShipping: { color: '#00a36c', fontSize: 11, fontWeight: 'bold' },
  addBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffeeee',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
  