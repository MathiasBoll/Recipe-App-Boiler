import { Tabs } from 'expo-router'
import CustomTabBar from '../../components/layout/TabBar';
export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ headerShown: false }} 
      tabBar={(props) => <CustomTabBar {...props} />}

    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home' }}
      />
      <Tabs.Screen name='favorites' />
      <Tabs.Screen name='bootcamp' options={{ title: 'Bootcamp' }} />
    </Tabs>
  );
}