import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../data/constants';
import { documents, users } from '../data/mockDB';
import { isExpired, isNearExpiry, isNew } from '../utils/documentHelpers';

const currentUser = users.find((u) => u.user_id === 'u-ibtesam') || users[0];

const generateNotifications = () => {
  return documents
    .filter((doc) => doc.user_id === currentUser.user_id)
    .flatMap((doc) => {
      const result = [];

      if (isExpired(doc.expiry_date)) {
        result.push({
          id: `end-${doc.doc_id}`,
          title: `انتهاء ${doc.type_label}`,
          message: `${doc.type_label} انتهت صلاحيتها – يرجى التجديد`,
          action_label: 'جدد الآن',
          icon: 'error',
          related_doc: doc.doc_id,
          read: false,
          timeAgo: 'منذ 3 أيام',
        });
      } else if (isNearExpiry(doc.expiry_date)) {
        result.push({
          id: `exp-${doc.doc_id}`,
          title: `قرب انتهاء ${doc.type_label}`,
          message: `${doc.type_label} تنتهي قريبًا – سارع بالتجديد`,
          action_label: 'جدد الآن',
          icon: 'schedule',
          related_doc: doc.doc_id,
          read: false,
          timeAgo: 'منذ ساعتين',
        });
      }

      if (isNew(doc.uploaded_at)) {
        result.push({
          id: `new-${doc.doc_id}`,
          title: `وثيقة جديدة`,
          message: `تم إضافة ${doc.type_label} إلى ملفك`,
          action_label: 'عرض',
          icon: 'new-releases',
          related_doc: doc.doc_id,
          read: false,
          timeAgo: 'منذ ساعة',
        });
      }

      return result;
    });
};

export default function NotificationsScreen() {
  const [items, setItems] = useState(generateNotifications());
  const unreadCount = items.filter((n) => !n.read).length;

  const handleNotificationAction = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getStyleByStatus = (item) => {
    if (item.id.startsWith('exp')) {
      return {
        backgroundColor: '#FFF3E0',
        textColor: '#E65100',
        icon: 'schedule',
      };
    }
    if (item.id.startsWith('new')) {
      return {
        backgroundColor: '#E8F5E9',
        textColor: '#2E7D32',
        icon: 'new-releases',
      };
    }
    if (item.id.startsWith('end')) {
      return {
        backgroundColor: '#FFEBEE',
        textColor: '#C62828',
        icon: 'error',
      };
    }
    return {
      backgroundColor: '#f9f9f9',
      textColor: COLORS.text,
      icon: 'notifications',
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>تنبيهات الوثائق الرسمية</Text>
        </View>

        <View style={styles.headerSectionCenter}>
          <View style={styles.bellIconWrapper}>
            <MaterialIcons
              name="notifications"
              size={32}
              color={unreadCount > 0 ? '#c62828' : COLORS.text}
            />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.headerSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.filter((n) => !n.read).length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              لا توجد تنبيهات حالياً{"\n"}جميع وثائقك الرسمية في حالة جيدة .. شكراً لك
            </Text>
          </View>
        ) : (
          items.map((item) => {
            if (item.read) return null;
            const style = getStyleByStatus(item);
            return (
              <View
                key={item.id}
                style={[styles.card, { backgroundColor: style.backgroundColor }]}
              >
                <View style={styles.topRow}>
                  <Text style={styles.timeAgo}>{item.timeAgo}</Text>
<MaterialIcons
  name={
    item.id.startsWith('exp')
      ? 'schedule'
      : item.id.startsWith('new')
      ? 'new-releases'
      : item.id.startsWith('end')
      ? 'error'
      : 'notifications'
  }
  size={20}
  color={style.textColor}
/>                </View>
                <Text style={[styles.title, { color: style.textColor }]}>{item.title}</Text>
                <Text style={[styles.message, { color: style.textColor }]}>{item.message}</Text>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: style.textColor }]}
                  onPress={() => handleNotificationAction(item.id)}
                >
                  <Text style={styles.actionText}>{item.action_label}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={styles.clearBtn} onPress={clearAllNotifications}>
        <MaterialIcons name="delete-sweep" size={20} color="#444" />
        <Text style={styles.clearText}>مسح الكل</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
  },
  headerSectionCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.brandDark,
  textAlign: 'right',  
  alignSelf: 'flex-end' 
  },
  logo: {
    width: 100,
    height: 100,
  resizeMode: 'contain',
  alignSelf: 'flex-start' 
  },
  bellIconWrapper: {
    position: 'relative',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#c62828',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'right',
  },
  message: {
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'right',
    lineHeight: 18,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  clearBtn: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});
