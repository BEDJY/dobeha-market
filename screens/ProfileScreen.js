
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Settings, CreditCard, Package, MessageCircle, MapPin, Heart, HelpCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const renderOption = (Icon, label) => (
    <TouchableOpacity style={styles.optionItem}>
      <Icon color="#555" size={24} />
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera Roja */}
      <View style={styles.headerArea}>
        <View style={styles.headerTop}>
          <TouchableOpacity><Settings color="#fff" size={24} /></TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Image source={{uri: 'https://ui-avatars.com/api/?name=Ali+Express&background=random'}} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>Usuario Invitado</Text>
            <Text style={styles.userSub}>Miembro Plata</Text>
          </View>
        </View>
      </View>

      {/* Mis Pedidos */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Mis pedidos</Text>
          <Text style={styles.cardLink}>Ver todo {'>'}</Text>
        </View>
        <View style={styles.optionsRow}>
          {renderOption(CreditCard, 'Pendiente')}
          {renderOption(Package, 'Enviado')}
          {renderOption(MessageCircle, 'Revisar')}
          {renderOption(Heart, 'Devolución')}
        </View>
      </View>

      {/* Servicios */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Servicios</Text>
        </View>
        <View style={styles.listOptions}>
          <TouchableOpacity style={styles.listItem}>
            <MapPin color="#ff4747" size={24} />
            <Text style={styles.listItemText}>Dirección de envío</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <HelpCircle color="#ff9000" size={24} />
            <Text style={styles.listItemText}>Centro de Ayuda</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  headerArea: { backgroundColor: '#ff4747', padding: 20, paddingTop: 60, paddingBottom: 40, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTop: { alignItems: 'flex-end', marginBottom: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff', marginRight: 16, borderWidth: 2, borderColor: '#fff' },
  userName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  userSub: { color: '#ffeeee', fontSize: 13 },
  card: { backgroundColor: '#fff', margin: 12, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  cardLink: { fontSize: 13, color: '#999' },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  optionItem: { alignItems: 'center', width: '25%' },
  optionLabel: { fontSize: 11, color: '#555', marginTop: 8 },
  listOptions: { marginTop: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
  listItemText: { fontSize: 15, color: '#333', marginLeft: 16 }
});
  