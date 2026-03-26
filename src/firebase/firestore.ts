import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  type WhereFilterOp,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './config';

export function getCollection(path: string) {
  return collection(db, path);
}

export function getDocument(path: string, id: string) {
  return doc(db, path, id);
}

export async function fetchDoc<T = DocumentData>(path: string, id: string) {
  const snap = await getDoc(doc(db, path, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function fetchCollection<T = DocumentData>(path: string) {
  const snap = await getDocs(collection(db, path));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function fetchWhere<T = DocumentData>(
  path: string,
  field: string,
  op: WhereFilterOp,
  value: unknown,
) {
  const q = query(collection(db, path), where(field, op, value));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function fetchOrdered<T = DocumentData>(
  path: string,
  field: string,
  direction: 'asc' | 'desc' = 'asc',
) {
  const q = query(collection(db, path), orderBy(field, direction));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export function createDoc(path: string, data: DocumentData) {
  return addDoc(collection(db, path), data);
}

export function patchDoc(path: string, id: string, data: Partial<DocumentData>) {
  return updateDoc(doc(db, path, id), data);
}

export function removeDoc(path: string, id: string) {
  return deleteDoc(doc(db, path, id));
}

export function subscribe<T = DocumentData>(
  path: string,
  callback: (items: T[]) => void,
) {
  return onSnapshot(collection(db, path), (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
  });
}
