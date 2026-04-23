import { getAdminFirestore } from "@/lib/firebaseAdmin";

function hasToDate(value: unknown): value is { toDate: () => Date } {
  return (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  );
}

function serializeFirestoreValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (hasToDate(value)) {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeFirestoreValue);
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        serializeFirestoreValue(v),
      ])
    );
  }
  return value;
}

export type LogEntry = {
  id: string;
  data: unknown;
};

/**
 * Firestore `logs` 컬렉션에서 최신 문서를 조회합니다.
 * `createdAt` 필드가 있으면 내림차순 정렬을 시도하고, 실패 시 정렬 없이 조회합니다.
 */
export async function fetchLatestLogs(limit = 5): Promise<LogEntry[]> {
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