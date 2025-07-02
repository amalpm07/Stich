import * as SecureStore from 'expo-secure-store';

export async function setItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export async function removeItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

export async function clearAll(keys: string[]): Promise<void> {
  await Promise.all(keys.map(removeItem));
} 