import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`Error setting key ${key} and value ${value}`, error);
      throw new Error(`Error setting key ${key} and value ${value}`);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(`Error removing key ${key}`, error);
      throw new Error(`Error removing key ${key}`);
    }
  }
}
