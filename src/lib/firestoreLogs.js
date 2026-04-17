import { getAdminFirestore } from "@/lib/firebaseAdmin";

function serializeFirestoreValue(value) {
  if (value === null || value === undefined) return value;
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeFirestoreValue);
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeFirestoreValue(v)])
    );
  }
  return value;
}

/**
 * Firestore `logs` 컬렉션에서 최신 문서를 조회합니다.
 * `createdAt` 필드가 있으면 내림차순 정렬을 시도하고, 실패 시 정렬 없이 조회합니다.
 * @param {number} limit
 */
export async function fetchLatestLogs(limit = 5) {
  const db = getAdminFirestore();
  const colRef = db.collection("logs");

  try {
    const snap = await colRef.orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      data: serializeFirestoreValue(doc.data()),
    }));
  } catch {
    const snap = await colRef.limit(limit).get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      data: serializeFirestoreValue(doc.data()),
    }));
  }
}