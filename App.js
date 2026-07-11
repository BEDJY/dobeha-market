
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Home, LayoutGrid, ShoppingCart, User, ArrowLeft, Search, Camera } from 'lucide-react-native';

import { initDB } from './store/db';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Store');
  const [stack, setStack] = useState([{ route: 'Store', params: {} }]);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      initDB();
      setDbReady(true);
    }, 100);
  }, []);

  if (!dbReady) {
    return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Iniciando Base de Datos...</Text></View>;
  }

  const currentRoute = stack[stack.length - 1];

  const navigate = (route, params = {}) => {
    setStack([...stack, { route, params }]);
  };

  const goBack = () => {
    if (stack.length > 1) {
      setStack(stack.slice(0, -1));
    }
  };

  const switchTab = (tab) => {
    setCurrentTab(tab);
    setStack([{ route: tab, params: {} }]);
  };

  const renderScreen = () => {
    const routeName = currentRoute.route;
    const navigation = { navigate, goBack };
    
    if (routeName === 'Store') return <HomeScreen navigation={navigation} />;
    if (routeName === 'Categories') return <View style={styles.placeholder}><Text>Categorías Próximamente</Text></View>;
    if (routeName === 'ProductDetail') return <ProductDetailScreen route={{ params: currentRoute.params }} navigation={navigation} />;
    if (routeName === 'Cart') return <CartScreen navigation={navigation} />;
    if (routeName === 'Profile') return <ProfileScreen navigation={navigation} />;
    return <View />;
  };

  const renderHeader = () => {
    const routeName = currentRoute.route;
    if (routeName === 'Store') {
      return (
        <View style={styles.homeHeader}>
          <View style={styles.searchBar}>
            <Search color="#999" size={20} />
            <Text style={styles.searchText}>Buscar "Zapatillas deportivas"</Text>
            <View style={{flex: 1}} />
            <Camera color="#999" size={20} />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (routeName === 'Profile' || routeName === 'Categories') return null;

    let title = 'Detalles';
    if (routeName === 'ProductDetail') return null; // Detail has its own header over image
    if (routeName === 'Cart') title = 'Carrito (2)';

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backBtnPlaceholder} />
      </View>
    );
  };

  const renderTabBar = () => {
    const isMainTab = ['Store', 'Categories', 'Cart', 'Profile'].includes(currentRoute.route);
    if (!isMainTab) return null;

    return (
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => switchTab('Store')}>
          <Home color={currentTab === 'Store' ? '#ff4747' : '#999'} size={24} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Store' ? '#ff4747' : '#999' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => switchTab('Categories')}>
          <LayoutGrid color={currentTab === 'Categories' ? '#ff4747' : '#999'} size={24} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Categories' ? '#ff4747' : '#999' }]}>Categorías</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => switchTab('Cart')}>
          <ShoppingCart color={currentTab === 'Cart' ? '#ff4747' : '#999'} size={24} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Cart' ? '#ff4747' : '#999' }]}>Carrito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => switchTab('Profile')}>
          <User color={currentTab === 'Profile' ? '#ff4747' : '#999'} size={24} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Profile' ? '#ff4747' : '#999' }]}>Mi Cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={['Store'].includes(currentRoute.route) ? "light-content" : "dark-content"} />
      {renderHeader()}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {renderTabBar()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  loadingContainer: { flex: 1, backgroundColor: '#ff4747', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  homeHeader: { 
    backgroundColor: '#ff4747', 
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingHorizontal: 12, 
    paddingBottom: 12 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    gap: 8
  },
  searchText: { color: '#999', fontSize: 14 },
  searchButton: {
    backgroundColor: '#ff4747',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 4
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  header: { 
    height: 56, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backBtn: { padding: 16 },
  backBtnPlaceholder: { width: 56 },
  headerTitle: { color: '#333', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  tabLabel: { fontSize: 11, fontWeight: '500' }
});
  