
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ArrowLeft, Share2, ShoppingCart, MessageSquare, Store, Star, ChevronRight } from 'lucide-react-native';
import { addToCart } from '../store/db';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  const handleAdd = () => {
    addToCart(product.id);
  };

  const handleBuyNow = () => {
    addToCart(product.id);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagen Cabecera */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity style={styles.topBtn} onPress={navigation.goBack}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.topBtn, { right: 15, left: 'auto' }]}>
            <Share2 color="#fff" size={22} />
          </TouchableOpacity>
        </View>

        {/* Precio y Título */}
        <View style={styles.priceSection}>
          <Text style={styles.pricePrefix}>US $</Text>
          <Text style={styles.price}>{product.price.toFixed(2)}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{(100 - (product.price / product.oldPrice) * 100).toFixed(0)}%</Text>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.oldPriceInfo}>Precio anterior: US $${product.oldPrice.toFixed(2)}</Text>
          <Text style={styles.title}>{product.name}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              <Star color="#ff9000" fill="#ff9000" size={14} />
              <Text style={styles.ratingNum}>{product.rating}</Text>
            </View>
            <Text style={styles.soldNum}>{product.sold} vendidos</Text>
          </View>
        </View>

        {/* Envío */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Envío</Text>
          <View style={{flex: 1, paddingLeft: 12}}>
            {product.freeShipping === 1 ? (
              <Text style={styles.shippingHighlight}>Envío gratis</Text>
            ) : (
              <Text style={styles.shippingHighlight}>Envío: US $1.99</Text>
            )}
            <Text style={styles.shippingDesc}>Entrega garantizada en 15 días</Text>
          </View>
          <ChevronRight color="#ccc" size={20} />
        </View>

        {/* Detalles */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionLabel}>Servicio</Text>
          <View style={{flex: 1, paddingLeft: 12}}>
            <Text style={styles.serviceText}>✓ Protección al comprador 90 días</Text>
          </View>
          <ChevronRight color="#ccc" size={20} />
        </View>
        
        {/* Descripción */}
        <View style={styles.descSection}>
          <Text style={styles.descTitle}>Descripción del Artículo</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Bar Pegajosa */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconAction}>
          <Store color="#555" size={22} />
          <Text style={styles.iconText}>Tienda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconAction}>
          <MessageSquare color="#555" size={22} />
          <Text style={styles.iconText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>Añadir a la cesta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow}>
          <Text style={styles.btnText}>Comprar ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  imageContainer: { width: '100%', height: 380, position: 'relative', backgroundColor: '#fff' },
  image: { width: '100%', height: '100%' },
  topBtn: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 20, left: 15, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  priceSection: { backgroundColor: '#ff4747', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'baseline' },
  pricePrefix: { color: '#fff', fontSize: 16, fontWeight: '600', marginRight: 4 },
  price: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  discountBadge: { backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 10 },
  discountText: { color: '#ff4747', fontSize: 12, fontWeight: 'bold' },
  infoSection: { backgroundColor: '#fff', padding: 16, marginBottom: 8 },
  oldPriceInfo: { color: '#999', fontSize: 13, textDecorationLine: 'line-through', marginBottom: 8 },
  title: { color: '#222', fontSize: 16, fontWeight: '600', lineHeight: 22, marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  stars: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  ratingNum: { color: '#222', fontSize: 13, fontWeight: 'bold', marginLeft: 4 },
  soldNum: { color: '#666', fontSize: 13 },
  sectionBlock: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, marginBottom: 8 },
  sectionLabel: { color: '#999', fontSize: 14, fontWeight: '500', width: 60 },
  shippingHighlight: { color: '#222', fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  shippingDesc: { color: '#666', fontSize: 12 },
  serviceText: { color: '#222', fontSize: 14 },
  descSection: { backgroundColor: '#fff', padding: 16, marginBottom: 80 },
  descTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  descText: { fontSize: 14, color: '#444', lineHeight: 22 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, borderTopWidth: 1, borderTopColor: '#eee' },
  iconAction: { alignItems: 'center', justifyContent: 'center', width: 50 },
  iconText: { fontSize: 10, color: '#555', marginTop: 4 },
  addToCartBtn: { flex: 1, backgroundColor: '#ff9000', height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
  buyNowBtn: { flex: 1, backgroundColor: '#ff4747', height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  btnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});
  