
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Percent, Clock, Zap, Flame } from 'lucide-react-native';
import { getProducts, addToCart } from '../store/db';
import ProductCard from '../components/ProductCard';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAdd = (prod) => {
    addToCart(prod.id);
  };

  const categories = [
    { name: 'Súper', icon: '🌟' },
    { name: 'Monedas', icon: '💰' },
    { name: 'Cupones', icon: '🎟️' },
    { name: 'Tecnología', icon: '📱' },
    { name: 'Moda', icon: '👗' }
  ];

  const renderHeader = () => (
    <View>
      {/* Carrusel / Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80'}} 
          style={styles.bannerImg} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>BIG SALE</Text>
          <Text style={styles.bannerSub}>Hasta 70% Dto.</Text>
        </View>
      </View>

      {/* Categorías redondas */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((cat, i) => (
          <TouchableOpacity key={i} style={styles.catItem}>
            <View style={styles.catIconWrap}>
              <Text style={styles.catEmoji}>{cat.icon}</Text>
            </View>
            <Text style={styles.catName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Súper Ofertas */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Súper Ofertas</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={products}
      numColumns={2}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ProductCard 
          product={item} 
          onPress={(prod) => navigation.navigate('ProductDetail', { product: prod })} 
          onAdd={handleAdd} 
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  list: { padding: 8, paddingBottom: 20 },
  bannerContainer: { margin: 6, borderRadius: 12, overflow: 'hidden', height: 140, position: 'relative' },
  bannerImg: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', left: 20, top: 30 },
  bannerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', fontStyle: 'italic', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 3 },
  bannerSub: { color: '#fff', fontSize: 16, fontWeight: 'bold', backgroundColor: '#ff4747', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, marginTop: 4, borderRadius: 4 },
  categories: { paddingVertical: 12, paddingHorizontal: 6, marginBottom: 8 },
  catItem: { alignItems: 'center', marginRight: 16, width: 60 },
  catIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  catEmoji: { fontSize: 24 },
  catName: { fontSize: 11, color: '#444', textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 6, marginTop: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#222' },
  seeMore: { fontSize: 13, color: '#ff4747', fontWeight: 'bold' }
});
  