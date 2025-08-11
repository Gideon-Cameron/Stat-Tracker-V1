export interface Goal {
    id: string; // Unique goal ID (can be generated with uuid for local testing.)
    userId: string; // Useful when syncing to Firestore
    statKey: string; // e.g. "strength", "benchPress", "toeTouch"
    statLabel: string; // Human-readable, e.g. "Bench Press Max"
    targetValue: number; // User goal (e.g. 100kg bench)
    currentValue?: number; // Optional for progress tracking
    dueDate: string; // ISO date string
    createdAt: string; // ISO date string
    completed: boolean; // Whether the goal was marked as done
    note?: string; // Optional user note
  }
  